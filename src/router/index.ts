import type { RouteRecordRaw, Router } from 'vue-router'

/*
 * 站点路由表：由 ViteSSG 消费，构建期逐条预渲染为静态页
 * 新增页面在此登记，路由文件本身不创建 router 实例（实例由 ViteSSG 内部持有）
 *
 * /post/:pathMatch 的参数来自构建期编译产物 `.cache/<id>.vue`，不是运行时动态添加的路由
 * —— id 形如 guide/install（docs/ 下的相对路径去掉 .md），含斜杠，故用可重复参数 pathMatch 而非 :id
 * 末尾的 catch-all 是404 兜底，新增具体路由时必须排在它之前，否则会被它先匹配掉
 * 预渲染路由清单由 vite.config.ts 的 ssgOptions.includedRoutes 递归扫 .cache 得出
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/post/:pathMatch(.*)*',
    name: 'post',
    component: () => import('../views/Post.vue'),
  },
  {
    // 404 页面本体：includedRoutes 里显式登记 /404，让 SSG 产出 dist/404.html
    // 托管平台（Vercel / Netlify / GitHub Pages）用它兜底任意未知路径
    path: '/404',
    name: 'notfound-page',
    component: () => import('../views/NotFound.vue'),
  },
  {
    // catch-all 兜底：必须放在最后。匹配任意剩余路径，
    // 含 /post/ 下的失效 id（文章改名或移出 docs/ 后旧链接仍可达）
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/NotFound.vue'),
  },
]

// router 实例由 ViteSSG 内部创建，这里持有其引用，供模块级 ts（如 search 的结果跳转）复用
let router: Router | null = null
export const setRouter = (r: Router) => {
  router = r
}
export const getRouter = () => router
