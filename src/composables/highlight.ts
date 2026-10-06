/*
 * 运行期代码高亮：与 mermaid 同一套路 —— 页面挂载后扫 DOM，动态 import shiki 实时渲染
 *
 * 编译期（parseArticle.ts）只产出结构与转义后的源码（pre[data-lang] > code），高亮放这里做：
 *  - 构建不再为每种语言初始化一次高亮器，shiki 只打包进客户端、按页按需加载
 *  - 语言是 md 作者自己写的，遇到什么加载什么，不在编译期穷举
 *
 * 代价：SSG 产出的静态 HTML 里代码块是未高亮的源码，首屏会先显示纯文本再上色（同 mermaid）。
 */
import type { HighlighterCore, ThemeRegistration } from 'shiki/core'

// 高亮器单例：整页共享，跨文章路由复用（语言可后续 loadLanguage 追加）
let highlighter: HighlighterCore | null = null
// css-variables 主题实例：颜色写成 CSS 变量，亮/暗由 content.css 的变量决定，
// 与编译期方案一致，故移动后视觉无差异。必须与注册进高亮器的是同一个对象
let theme: ThemeRegistration | null = null
// 已加载过的语言，避免同一语言重复 import
const loaded = new Set<string>()

/** 取页面上所有待高亮的代码块：pre[data-lang] 里排除 mermaid（那批交给 mermaid.run） */
const blocksOf = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>('pre[data-lang] code')).filter(
    (code) => code.parentElement?.dataset.lang !== 'mermaid',
  )

export const highlight = async () => {
  const codes = blocksOf()
  if (codes.length === 0) return

  try {
    // 按需加载：核心 + oniguruma 引擎（与编译期同一引擎，保证高亮结果一致）
    const [{ createHighlighterCore, createCssVariablesTheme }, { createOnigurumaEngine }] =
      await Promise.all([import('shiki/core'), import('shiki/engine/oniguruma')])

    if (!highlighter) {
      theme = createCssVariablesTheme()
      highlighter = await createHighlighterCore({
        themes: [theme],
        langs: [],
        engine: await createOnigurumaEngine(import('shiki/wasm')),
      })
    }

    // 本页用到的语言，逐个动态 import（未知语言 import 失败即跳过，保留纯文本）
    const langs = [...new Set(codes.map((c) => c.parentElement?.dataset.lang || 'text'))]
    for (const lang of langs) {
      if (loaded.has(lang)) continue
      try {
        const mod = await import(`shiki/dist/langs/${lang}.mjs`)
        await highlighter.loadLanguage(mod.default)
        loaded.add(lang)
      } catch {
        console.warn(`[highlight] 语言 ${lang} 未加载，按纯文本显示`)
      }
    }

    for (const code of codes) {
      const pre = code.parentElement
      if (!pre) continue
      const lang = pre.dataset.lang || 'text'
      const source = code.textContent ?? ''
      // 渲染结果整块替换 pre：shiki 输出 <pre class="shiki" style="--shiki-...">，
      // 外壳 div.language-x 与工具栏在 pre 之外，不受影响（复制按钮读的仍是 pre code）
      const html = highlighter.codeToHtml(source, {
        lang: loaded.has(lang) ? lang : 'text',
        theme: theme!,
      })
      const next = new DOMParser().parseFromString(html, 'text/html').querySelector('pre')
      if (!next) continue
      next.dataset.lang = lang // 保留标记，供重复挂载时识别
      pre.replaceWith(next)
    }
  } catch {
    console.error('[ERR]:代码高亮渲染错误（已降级为纯文本）')
  }
}
