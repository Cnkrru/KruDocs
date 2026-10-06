import '@/assets/px.css'
import '@/assets/color.css'
import '@/assets/common.css'
import '@/assets/content.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, setRouter } from './router'

// 第三参是 ViteSSG 的 app 创建回调：拿到内部 router 实例并持有，供模块级 ts 复用
export const createApp = ViteSSG(App, { routes }, ({ router }) => {
  setRouter(router)
})
