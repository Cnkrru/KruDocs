/*
 * 站点配置读取：编译期已把 src/config/site.ts 全量写进 .cache/site.json（parseArticle.ts 的 syncSiteConfig），
 * theme 内不 import 配置源文件，统一从这份产物同步读——SSG 预渲染和客户端一致。
 * 改配置后需重新构建才生效（开发模式不热更新配置）。
 * glob 而非静态 import：首次构建该文件可能尚未生成，glob 返回空对象而非编译报错
 */

export type HomeCard = { text: string; link: string; desc: string }
export type NavItem = { text: string; link: string }

export type SiteConfig = {
  SITE_URL: string
  SITE_TITLE: string
  SITE_DESCRIPTION: string
  SITE_KEYWORDS: string
  SITE_OG_IMAGE: string
  SITE_OG_IMAGE_ALT: string
  SITE_COPYRIGHT: string
  HOME_CARDS: HomeCard[]
  SITE_NAV: NavItem[]
  SITE_REPO: string
  SITE_REPO_BRANCH: string
  SITE_DOCS_DIR: string
}

const siteMap = import.meta.glob<SiteConfig>('/.cache/site.json', {
  eager: true,
  import: 'default',
})

/** 站点配置单例：编译期写死进产物，此处只做同步读取 */
export const site: SiteConfig = siteMap['/.cache/site.json'] ?? ({} as SiteConfig)
