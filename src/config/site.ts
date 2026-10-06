// 站点级常量：sitemap 生成共用，换域名/站名只改这一处
// TODO 部署域名待定：sitemap.xml 的绝对链接都取自这里，上线后改成真实域名
export const SITE_URL = 'https://blog.cnkrru.top'
export const SITE_TITLE = 'KruDoc'
export const SITE_DESCRIPTION =
  '个人技术笔记知识库，记录编程学习与工程实践，涵盖后端、前端、硬件、框架、脚本等多个领域。'
export const SITE_KEYWORDS = 'KruDoc,技术笔记,知识库,后端,前端,硬件,嵌入式,框架,脚本'
// 分享封面：社交平台抓取 og:image 用（Facebook/Twitter 不支持 SVG，必须是 png/jpg）
// 换图只需替换 public/og-cover.png；文章可在 frontmatter 用 cover 字段单独指定
export const SITE_OG_IMAGE = '/og-cover.png'
export const SITE_OG_IMAGE_ALT = 'KruDoc 技术笔记知识库'

// ---- 首页分类卡片：手写在配置里，首页网格按此渲染 ----
// link 与顶栏导航同一套规则：只指向具体文档页（这里统一指向该分类的首篇），不写分组前缀
export type HomeCard = { text: string; link: string; desc: string }
export const HOME_CARDS: HomeCard[] = [
  { text: '电气', link: '/post/电气/电磁场/电磁场-0', desc: 'C51、电机学、电磁场' },
  { text: '工具', link: '/post/工具/vite/vite-1-环境变量与模式', desc: 'Vite 等开发工具' },
  { text: '后端', link: '/post/后端/cpp/Cmake/cmake-1-语法', desc: 'C++、Python、JavaScript、数据、Shell' },
  { text: '计算机原理', link: '/post/计算机原理/computer-1-数据存储', desc: '数据存储、进程与线程' },
  { text: '脚本', link: '/post/脚本/1-check-ports', desc: '常用运维脚本' },
  { text: '框架', link: '/post/框架/express/express-1-基础入门', desc: 'Express、FastAPI、Vue、Electron、Qt' },
  { text: '其他', link: '/post/其他/other-1-博客开发笔记', desc: '博客开发、电脑硬件' },
  { text: '前端', link: '/post/前端/css/css-基础-1-选择器', desc: 'HTML、CSS、JavaScript、SVG、组件' },
  { text: '数学', link: '/post/数学/线代/线代-1', desc: '线性代数、高数、英语' },
  { text: '英语', link: '/post/英语/单词/单词-1', desc: '英语单词、语法' },
  { text: '硬件', link: '/post/硬件/openmv/openmv-1-sensor', desc: 'STM32、OpenMV' },
  { text: '技能', link: '/post/skills/index', desc: '开发工具链、效率工具' },
  { text: 'OS', link: '/post/OS/OS-1-环境变量', desc: '环境变量、注册表、系统操作' },
]

// ---- 顶栏导航：手写在配置里，加/删/改顺序只动这个数组 ----
// link 两种写法，靠是否以 http(s):// 开头区分：
//  站内  /            —— 首页
//        /post/<id>   —— 文章页，id 是 docs/ 下的相对路径去掉 .md（与 sidebar.json 的 link 同一套键，可直接复制）
//  外链  https://...  —— 用原生 a 打开新窗口
// 只指向具体文档页：不认 /post/电气 这类分组前缀（分组没有落地页，点了会落到 404）
export type NavItem = { text: string; link: string }
export const SITE_NAV: NavItem[] = [
  { text: '首页', link: '/' },
  { text: '文档', link: '/post/index' },
]

// ---- 仓库配置：postEdit / postHistory 由此拼出 GitHub 的编辑页与提交历史页 ----
// owner/repo：仓库地址，留空则文章页不渲染「编辑 / 历史」两个入口（避免死链）
export const SITE_REPO = 'Cnkrru/krudoc'
// 分支名：GitHub 默认主分支为 main
export const SITE_REPO_BRANCH = 'main'
// 文档在仓库中的根目录，须与 src/.build/parseArticle.ts 的 ARTICLE_DIR 一致
export const SITE_DOCS_DIR = 'docs'
