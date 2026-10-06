// 编译期脚本：docs/*.md → .cache/*.vue（正文 SFC）+ public/config/post.json（元数据）
// 并把 post.json 原样复制为 .cache/post.json（可import 同源副本，供 PostUpdate / search 读元数据）
// 由 vite buildStart 调用。
//
// 职责边界：编译期只做「md → html」与「解析元数据」两件事。
// 侧栏树是手写配置 src/theme/config/sidebar.json（结构照 VitePress 的 themeConfig.sidebar），
// 不再由本脚本扫盘生成 —— 分组与顺序属于内容组织决策，写在配置里比让脚本猜目录名更可控。
// 由 vite buildStart 调用。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ARTICLE_DIR, MAX_DEPTH } from '../config/site.config.ts'

import MarkdownIt from 'markdown-it'
import type { Highlighter } from 'shiki'
import { createHighlighter, createCssVariablesTheme } from 'shiki'
import { anchor } from '@mdit/plugin-anchor'
import { tasklist } from '@mdit/plugin-tasklist'
import { katex } from '@mdit/plugin-katex'
import { componentPlugin } from '@mdit-vue/plugin-component'
import { slugify } from '@mdit-vue/shared'
import { container } from '@mdit/plugin-container'

// 文章元数据：无 frontmatter，全部由编译期推导
// title 取文件名末段，updated 取源文件 mtime
type ArticleMeta = {
  title: string
  updated: string
}

const highlightTheme = createCssVariablesTheme()

// 语法高亮器，configLanguage 初始化，fence 规则闭包使用
let highlighter: Highlighter | null = null

// 扫盘最大层级：docs/ 下的第一层目录算第 1 级，超出深度的分支整体不纳入编译
// （侧栏树已改为手写配置 src/theme/config/sidebar.json，此处只约束正文 SFC 的产出深度）

// 脚本文件路径 → 项目根路径 → 各产物路径
const scriptPath = fileURLToPath(import.meta.url)
const dirPath = path.dirname(scriptPath)
const rootPath = path.resolve(dirPath, '../..')
const articlePath = path.join(rootPath, ARTICLE_DIR)
const vuePath = path.join(rootPath, '.cache')
const jsonPath = path.join(rootPath, 'public/config/post.json')
const postMetaPath = path.join(vuePath, 'post.json')

/*
 * id: compileSignature
 * fn: 输入签名。一次 build 会跑"客户端+服务端"两次 vite build，且每次构建都重新 import 本模块
 * —— 内存态无法跨构建存活，改用 `.cache/.compile-sig` 磁盘 sidecar：签名一致则短路复用缓存
 *
 * 签名必须掺入本脚本自身的 mtime/size：元数据提取逻辑（如 updated 的兜底来源）改动后，
 * docs/ 一个字没变，签名却必须变化，否则缓存短路会让新逻辑要手动清 .cache 才生效
 */
const compileSignature = (files: string[]): string => {
  const self = fs.statSync(scriptPath)
  const selfTag = `__self__:${self.mtimeMs}:${self.size}`
  return [
    selfTag,
    ...files.map((f) => {
      const s = fs.statSync(path.join(articlePath, f))
      return `${f}:${s.mtimeMs}:${s.size}`
    }),
  ]
    .sort()
    .join('|')
}

// 语言名消毒：只保留字母数字下划线连字符，防止注入类名/属性
const safeLang = (lang: string): string => String(lang).replace(/[^\w-]/g, '')

/* ====================<代码块外壳模板>==================== */
/*
 * id: codeShell
 * fn: 普通代码块外壳，编译期把shiki高亮结果塞进顶栏+内容区结构
 * 顶栏对齐 blog-map：语言徽章(圆点+文本) + 内联 SVG 复制图标
 */
const codeShell = (lang: string, highlighted: string): string => `
<div class="language-${lang}" v-pre>
    <div class="code-toolbar">
        <span class="lang lang-${lang}">
            <span class="lang-dot"></span>
            <span class="lang-text">${lang}</span>
        </span>
        <button class="copy">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
    </div>
    ${highlighted}
</div>
`

/*
 * id: mermaidShell
 * fn: mermaid代码块外壳，渲染前是源码文本，由运行时mermaid.run替换为图
 */
const mermaidShell = (code: string): string => `
<div class="language-mermaid" v-pre>
    <div class="code-toolbar">
        <span class="lang lang-mermaid">
            <span class="lang-dot"></span>
            <span class="lang-text">mermaid</span>
        </span>
    </div>
    <pre data-lang="mermaid"><code>${code}</code></pre>
</div>
`

/*
 * ====================<提示块外壳模板>====================
 * id: admonitionShellOpen / admonitionShellClose
 * fn: 提示块外壳，编译期把 `:::tip/info/warn/error` 容器内容拼进
 * 标题栏(图标+文字) + 内容区结构，样式由 content.css 按等级配色
 * 语法：`:::type 可选标题` 内容 `:::`（标题省略时用默认文案）
 */
const ADMONITION_META: Record<string, { icon: string; label: string }> = Object.freeze({
  tip: { icon: 'asterisk', label: '提示' },
  info: { icon: 'info', label: '信息' },
  warn: { icon: 'alert', label: '警告' },
  error: { icon: 'close', label: '错误' },
})

const ADMONITION_ICON: Record<string, string> = Object.freeze({
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  alert:
    '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>',
  close: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  asterisk: '<path d="M12 4v16"/><path d="M5 8l5.8 3.7 3.6-2.2"/><path d="m11 20 1-6 6-1"/>',
})

const admonitionShellOpen = (type: string, title: string): string => {
  const meta = ADMONITION_META[type] || ADMONITION_META.info
  const t = title || meta.label
  return (
    `
<!-- == admonition ` +
    type +
    ` == -->
<div class="admonition admonition-` +
    type +
    `">
    <div class="admonition-head">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
    ADMONITION_ICON[meta.icon] +
    `</svg>
        <span class="admonition-title">` +
    t +
    `</span>
    </div>
    <div class="admonition-body">`
  )
}

const admonitionShellClose = (): string => `</div></div>`

/*
 * id: mtimeToDate
 * fn: 源文件最后修改时间 → YYYY-MM-DD（本地时区，不用 toISOString 以免时差把日期挪走）
 * 用于 frontmatter 缺 updated 时兜底：这批文档成批导入，没有可靠的"最后编辑时间"，
 * 拿文件系统 mtime 当近似值，比留空让「最后编辑于」显示空白要诚实可用
 */
const mtimeToDate = (file: string): string => {
  const d = new Date(fs.statSync(path.join(articlePath, file)).mtime)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/*
 * id: walkDocs
 * fn: 递归扫盘，返回相对 docs/ 的 md 相对路径（统一用 / 分隔，id 即该路径去掉 .md）
 * depth 从 1 起算（docs/ 下的第一层文件/目录算第 1 级），超过 MAX_DEPTH 的分支直接剪掉
 */
const walkDocs = (dir: string, prefix: string, depth: number, out: string[]) => {
  if (depth > MAX_DEPTH) {
    console.warn(`[WARN]:${prefix} 超过最大层级 ${MAX_DEPTH}，该分支已跳过`)
    return
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    // 隐藏文件与 .md 之外的产物一律不进文档树
    if (entry.name.startsWith('.')) continue
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      walkDocs(path.join(dir, entry.name), rel, depth + 1, out)
    } else if (entry.name.endsWith('.md')) {
      out.push(rel)
    }
  }
}

/*
 * id: articlePathChecker
 * fn: 检查文章文件夹是否存在，递归收集其中的 md（返回相对路径，含子目录）
 */
const articlePathChecker = () => {
  if (!fs.existsSync(articlePath)) {
    console.error('[ERR]:文章文件夹不存在')
    return []
  }
  console.log('[INFO]:文章文件夹存在')
  const files: string[] = []
  walkDocs(articlePath, '', 1, files)
  if (files.length === 0) {
    console.warn('[WARN]:文章目录下没有文件')
  }
  return files
}

/*
 * id: cleanVueDir
 * fn: 递归清理单个目录下的过时 .vue 产物，返回该目录清理后是否已空（供上层删空目录）
 * post.json / .compile-sig 等非 .vue 文件不在清理范围，但它们的存在意味着目录不能删
 */
const cleanVueDir = (dir: string, ids: Set<string>, relBase = ''): boolean => {
  let empty = true
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      // 子目录清理后为空则删掉，避免 .cache 里留下空目录壳
      if (cleanVueDir(full, ids, rel)) {
        fs.rmdirSync(full)
      } else {
        empty = false
      }
      continue
    }
    if (entry.name.endsWith('.vue') && !ids.has(rel.replace(/\.vue$/, ''))) {
      fs.rmSync(full)
      console.log(`[INFO]:清除过时中间产物${rel}`)
      // 删掉了，本目录可能变空，empty 保持当前值
    } else {
      empty = false
    }
  }
  return empty
}

/*
 * id: vuePathCleaner
 * fn: 只清除"已从docs删除文章"的过时产物；仍在用的SFC保留，供mtime增量复用
 */
const vuePathCleaner = (ids: Set<string>) => {
  cleanVueDir(vuePath, ids)
}

/*
 * id: vuePathChecker
 * fn: 检查.cache文件夹是否存在，如果没有则创建一个
 */
const vuePathChecker = (ids: Set<string>) => {
  try {
    if (fs.existsSync(vuePath)) {
      console.log('[INFO]:vue文件夹存在')
      vuePathCleaner(ids)
    } else {
      fs.mkdirSync(vuePath, { recursive: true })
      if (fs.existsSync(vuePath)) {
        console.log('[INFO]:原路径无vue文件夹,创建文件夹成功')
      } else {
        console.error('[ERR]:原路径无vue文件夹,创建文件夹失败')
      }
    }
  } catch (e) {
    console.error('[ERR]:vue文件夹操作失败', e)
  }
}

/*
 * id: jsonPathChecker
 * fn: 检查post.json是否存在，如果没有则创建一个
 */
const jsonPathChecker = () => {
  try {
    if (fs.existsSync(jsonPath)) {
      console.log('[INFO]:post.json存在')
    } else {
      fs.writeFileSync(jsonPath, '{}', 'utf8')
      if (fs.existsSync(jsonPath)) {
        console.log('[INFO]:原路径无post.json,创建文件成功')
      } else {
        console.error('[ERR]:原路径无post.json,创建文件失败')
      }
    }
  } catch (e) {
    console.error('[ERR]:post.json操作失败', e)
  }
}

/*
 * id: syncPostMeta
 * fn: public/ 下的静态资源不进 Vite 模块图，无法 import；把 post.json 原样复制到 .cache/，
 * 得到可 import 的同源副本，供 Post.vue 在 SSR/客户端同步取 SEO 元数据（单一数据源，不做二次加工）
 */
const syncPostMeta = () => {
  if (fs.existsSync(jsonPath)) {
    fs.copyFileSync(jsonPath, postMetaPath)
  }
}

/*
 * id: syncSiteConfig
 * fn: 把 src/config/site.ts 全量写进 .cache/site.json——站点配置编译期写死进产物，
 * theme 内不再 import 配置源文件，统一从这份产物同步读（SSG 预渲染和客户端一致）
 * 改配置后需重新构建才生效（开发模式不热更新配置）
 */
const syncSiteConfig = () => {
  const sitePath = path.join(rootPath, 'src/config/site.config.ts')
  if (!fs.existsSync(sitePath)) return
  // 动态 import 会引入异步复杂度，配置是纯常量导出，用 Function 构造器同步求值
  const mod = fs.readFileSync(sitePath, 'utf8')
  const exports: Record<string, unknown> = {}
  // 提取全部 export const 声明：export const NAME = value → exports[NAME] = value
  const re = /export\s+const\s+(\w+)\s*=\s*(`[^`]*`|'[^']*'|"[^"]*"|\[[\s\S]*?\]|[^\n]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(mod)) !== null) {
    const name = m[1]!
    const raw = m[2]!.trim()
    try {
      // 模板字符串/数组/对象字面量用 Function 求值；纯字符串也走这里统一处理
      // eslint-disable-next-line no-new-func
      exports[name] = new Function(`return (${raw})`)()
    } catch {
      console.warn(`[WARN]:配置 ${name} 求值失败，已跳过`)
    }
  }
  fs.writeFileSync(path.join(vuePath, 'site.json'), JSON.stringify(exports, null, 4), 'utf8')
  console.log('[INFO]:站点配置已写入 .cache/site.json')
}

/*
 * id: configLanguage
 * fn: 遍历md，扫描代码块，每遇到一种语言，集合追加这门，mermaid排除，按需加载
 */
const configLanguage = async (files: string[]) => {
  const langSet = new Set<string>(['text'])
  for (const file of files) {
    const _ = fs.readFileSync(path.join(articlePath, file), 'utf-8')
    for (const i of _.matchAll(/^```([\w+-]+)/gm)) {
      const lang = (i[1] ?? '').toLowerCase()
      if (lang !== 'mermaid') {
        langSet.add(lang)
      }
    }
  }
  highlighter = await createHighlighter({
    themes: [highlightTheme],
    langs: [...langSet],
  })
}

/*
 * id: initMd
 * fn: 创建markdown-it实例，挂载插件
 */
const initMd = () => {
  const md = new MarkdownIt({ html: true, linkify: true, typographer: false })
    .use(componentPlugin) // 支持原生HTML和vue组件
    .use(anchor, { slugify }) // 支持md'#'标签绑定id
    .use(tasklist) // 支持md的任务列表转HTML
    .use(katex) // 支持KATEX

  return md
}

/*
 * id: configFence
 * fn: 编译期拦截代码块，将指定代码块转义产物注入自定义HTML模块
 */
const configFence = (md: InstanceType<typeof MarkdownIt>) => {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]!
    const info = md.utils.unescapeAll(token.info).trim()
    const lang = info.split(/\s+/)[0] || 'text'
    const safe = safeLang(lang)

    if (lang === 'mermaid') {
      return mermaidShell(md.utils.escapeHtml(token.content))
    }

    // 编译期高亮：highlighter 由 manager 的 configLanguage 初始化，此处必有值
    let highlighted: string
    try {
      highlighted = highlighter!.codeToHtml(token.content, { lang, theme: highlightTheme })
    } catch {
      highlighted = highlighter!.codeToHtml(token.content, { lang: 'text', theme: highlightTheme })
    }
    return codeShell(safe, highlighted)
  }
}

/*
 * id: configContainer
 * fn: 编译期拦截提示块容器（`:::tip/info/warn/error` 包裹内容）
 * @mdit/plugin-container 用 openRenderer/closeRenderer 分两段：
 * open 出锚点+头部+body开标签，中间内容由 markdown-it 正常渲染，close 收尾
 */
const configContainer = (md: InstanceType<typeof MarkdownIt>) => {
  ;['tip', 'info', 'warn', 'error'].forEach((type) => {
    md.use(container, {
      name: type,
      openRenderer(tokens, idx, options, _env, _self) {
        const token = tokens[idx]!
        // 标题：`:::info 标题` 取"标题"，缺省为空串（fallback 到默认文案）
        const raw = token.info.trim().slice(type.length).trim()
        const title = raw === '' ? '' : raw
        return admonitionShellOpen(type, title)
      },
      closeRenderer() {
        return admonitionShellClose()
      },
    })
  })
}

/*
 * id: mdParser
 * fn: 解析md，将md的内容和元数据分别写入对应文件
 */
const mdParser = (files: string[]) => {
  const md = initMd()
  configFence(md)
  configContainer(md)

  const articles: Record<string, ArticleMeta> = {}

  for (const file of files) {
    const id = file.replace(/\.md$/, '') // 把文章名取出来
    const _ = fs.readFileSync(path.join(articlePath, file), 'utf8') // 读取文章内容

    // mtime增量：SFC产物存在且不比源文件旧 → 跳过katex重渲染与重写，直接复用
    // id 含子目录，产物落 .cache/<子目录>/<id>.vue，写前先建目录
    const sfcPath = path.join(vuePath, `${id}.vue`)
    const sfcFresh =
      fs.existsSync(sfcPath) &&
      fs.statSync(sfcPath).mtimeMs >= fs.statSync(path.join(articlePath, file)).mtimeMs

    if (!sfcFresh) {
      const rendered = md.render(_) // 直接把文章内容转义为HTML（无 frontmatter，全文即正文）
      const vue = `<template>${rendered}</template>` // 把文章内容拼接成vue的HTML块
      fs.mkdirSync(path.dirname(sfcPath), { recursive: true })
      fs.writeFileSync(sfcPath, vue, 'utf8') // 把拼接好的块写入对应文件
    }

    // 无 frontmatter：title 从文件名末段推导，updated 从源文件 mtime 推导
    articles[id] = {
      title: id.split('/').pop() || id,
      updated: mtimeToDate(file),
    }
  }

  // ---- 编译期算上下篇：读 sidebar.json 展平取有序文章列表，为每篇算 prev/next ----
  const sidebarFile = path.join(rootPath, 'src/config/sidebar.json')
  if (fs.existsSync(sidebarFile)) {
    const sidebarTree = JSON.parse(fs.readFileSync(sidebarFile, 'utf8'))
    // DFS 展平：只收集有 link 的叶子节点，顺序即配置书写顺序
    const flat: { id: string; title: string; link: string }[] = []
    const walkSidebar = (nodes: any[]) => {
      for (const node of nodes) {
        if (node.link) {
          flat.push({
            id: node.link.replace(/^\/post\//, ''),
            title: node.text || '',
            link: node.link,
          })
        }
        if (Array.isArray(node.items) && node.items.length > 0) {
          walkSidebar(node.items)
        }
      }
    }
    walkSidebar(sidebarTree)
    // 为每篇文章算 prev/next，写进 articles 元数据
    for (let i = 0; i < flat.length; i++) {
      const id = flat[i].id
      if (articles[id]) {
        const prev = i > 0 ? flat[i - 1] : null
        const next = i < flat.length - 1 ? flat[i + 1] : null
        articles[id].prev = prev ? { title: prev.title, link: prev.link } : null
        articles[id].next = next ? { title: next.title, link: next.link } : null
      }
    }
  }

  fs.writeFileSync(jsonPath, JSON.stringify(articles, null, 4), 'utf8')
  return articles
}

/*
 * id: manager
 * fn: 集中管理编译流程：路径检查 → 签名短路 → 缓存清理 → 语言配置 → 文章编译
 */
const manager = async () => {
  // 0. 缓存目录必须先建：docs/ 为空时下面会走"清空产物"分支，且 includedRoutes 无条件 readdirSync 它
  fs.mkdirSync(vuePath, { recursive: true })

  // 1. 检查文章文件夹，拿到md文件列表
  const files = articlePathChecker() || []

  // 空文章目录：走"全清"分支。直接 return 会留下已删文章的过时 SFC 和 post.json 残留，
  // 下游 includedRoutes 会照着这些幽灵产物预渲染出已不存在的文章页
  if (files.length === 0) {
    vuePathChecker(new Set())
    fs.writeFileSync(jsonPath, '{}', 'utf8')
    syncPostMeta()
    fs.writeFileSync(path.join(vuePath, '.compile-sig'), compileSignature([]), 'utf8')
    return
  }
  // 输入签名比对：两次 vite build 乃至无改动重跑都靠磁盘 sidecar 短路复用缓存
  const sig = compileSignature(files)
  const sigFile = path.join(vuePath, '.compile-sig')
  // 产物完整性：post.json 缺失时不短路，否则被删的产物永远不会被重建
  const postJsonExists = fs.existsSync(jsonPath)
  if (postJsonExists && fs.existsSync(sigFile) && fs.readFileSync(sigFile, 'utf8') === sig) {
    console.log('[INFO]:输入未变,短路复用.cache编译缓存')
    syncPostMeta() // .cache 被清时补建可 import 副本，保证 SSR 每次构建都读得到
    syncSiteConfig() // 配置产物同样补建：短路分支也要保证 site.json 存在
    return
  }
  // 2. 检查缓存与元数据文件路径（清除已删除文章的过时产物）
  const ids = new Set(files.map((f) => f.replace(/\.md$/, '')))
  vuePathChecker(ids)
  jsonPathChecker()
  // 3. 初始化 shiki 高亮器（扫描文档中用到的语言，按需加载）
  await configLanguage(files)
  // 4. 配置markdown-it并编译文章（编译期完成 shiki 高亮，运行时无需再处理）
  mdParser(files)
  syncPostMeta() // 复制为可 import 的同源副本，供 PostUpdate / search 读元数据
  syncSiteConfig() // 站点配置写进 .cache/site.json，theme 内同步读
  fs.writeFileSync(sigFile, sig, 'utf8') // 落盘签名，供下次构建短路
}

// 直接运行本文件时编译；作为模块被 vite.config 导入时由 buildStart 调用
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  manager()
}

export default () => manager()
