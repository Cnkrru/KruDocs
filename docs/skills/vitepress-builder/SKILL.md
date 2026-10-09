# VitePress Builder

一键搭建 VitePress 文档站点的 SKILL，只需提供文件夹名称，自动创建完整项目结构。

## 使用方式

用户只需调用此 SKILL 并提供文件夹名称：

```
用户: 用 vitepress-builder 创建 my-docs
系统: 项目 my-docs 创建成功！
系统: 正在安装依赖...
系统: 依赖安装完成！
```

**重要：**
- SKILL 创建项目后会自动执行 `npm install` 安装依赖
- 安装完成后用户可以直接启动开发服务器

## 功能特性

- 极简操作: 只需提供文件夹名称
- 一键生成: 自动创建完整项目结构
- 中文界面: 所有 UI 文本中文化
- 本地搜索: 默认启用，开箱即用
- 自定义主题: 支持个性化定制
- 部署就绪: 包含 Vercel/Netlify 部署配置

## 生成的项目结构

```
{folder-name}/
├── docs/
│   ├── .vitepress/
│   │   ├── theme/
│   │   │   ├── index.ts
│   │   │   └── style.css
│   │   └── config.mts
│   ├── public/
│   │   └── logo.png        (占位，用户自行替换)
│   ├── docs/
│   │   ├── index.md         (文档首页，含完整目录)
│   │   ├── guide/
│   │   │   └── getting-started.md
│   │   └── api/
│   │       └── index.md
│   └── index.md             (hero 首页)
├── .gitignore
├── vercel.json
├── package.json
├── 使用指南.md
└── README.md
```

## 项目创建完成后

项目创建成功后，依赖已自动安装，用户只需执行以下两步：

1. 进入项目目录
   ```bash
   cd {folder-name}
   ```

2. 启动开发服务器
   ```bash
   npm run docs:dev
   ```

访问 http://localhost:5173 查看站点

## 配置说明

### 核心命令

| 命令 | 说明 |
|------|------|
| npm run docs:dev | 启动开发服务器 |
| npm run docs:build | 构建生产版本 |
| npm run docs:preview | 预览构建结果 |

### 配置文件

| 文件 | 说明 |
|------|------|
| docs/.vitepress/config.mts | 主配置文件（ESM） |
| docs/.vitepress/theme/index.ts | 主题入口 |
| docs/.vitepress/theme/style.css | 自定义样式 |
| docs/public/ | 静态资源目录 |
| docs/docs/ | 放置您的文档文件 |

## 搜索功能

默认启用本地搜索，支持中文搜索界面。

## 技术栈

- VitePress: ^1.6.4
- Vue: 3.x
- Node.js: >= 18.x

## 添加文档

1. 在 docs/docs/ 目录下创建 .md 文件
2. 编辑 docs/.vitepress/config.mts 配置侧边栏
3. 重启开发服务器即可预览

## 部署

### Vercel

项目已包含 `vercel.json`，直接导入 Vercel 即可部署：

1. 将项目推送到 GitHub
2. 在 Vercel 中导入仓库
3. Vercel 自动识别配置，无需额外设置

### 其他平台

构建命令: `npm run docs:build`
输出目录: `dist`

---

## 生成文件模板

以下为 AI 生成项目时必须严格遵循的文件模板。

### package.json

```json
{
  "name": "{folder-name}",
  "private": true,
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  "devDependencies": {
    "vitepress": "^1.6.4"
  }
}
```

### .gitignore

```
node_modules/
dist/
docs/.vitepress/dist/
docs/.vitepress/cache/
```

### vercel.json

```json
{
  "buildCommand": "npm run docs:build",
  "outputDirectory": "dist",
  "devCommand": "npm run docs:dev"
}
```

### docs/.vitepress/config.mts

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '{站点标题}',
  description: '{站点描述}',
  ignoreDeadLinks: 'localhostLinks',

  outDir: '../dist',

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    siteTitle: '{站点标题}',

    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/' }
    ],

    sidebar: [
      { text: '首页', link: '/' },
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '快速开始', link: '/docs/guide/getting-started' },
          { text: '配置说明', link: '/docs/guide/configuration' }
        ]
      },
      {
        text: 'API',
        collapsed: true,
        items: [
          { text: 'API 参考', link: '/docs/api/' }
        ]
      }
    ],

    aside: 'right',
    outline: 2,

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2026'
    },

    editLink: {
      pattern: 'https://github.com/you/repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    externalLinkIcon: true
  }
})
```

### docs/.vitepress/theme/index.ts

```typescript
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme
} satisfies Theme
```

### docs/.vitepress/theme/style.css

```css
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
```

### docs/index.md（首页 — hero 布局）

````markdown
---
layout: home

hero:
  name: "{站点标题}"
  text: "{站点描述}"
  tagline: 基于 VitePress 构建的个人知识管理系统
  image:
    src: /logo.png
    alt: logo
  actions:
    - theme: brand
      text: 快速开始
      link: /docs/guide/getting-started
    - theme: alt
      text: 查看文档
      link: /docs/
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}
</style>
````

### docs/docs/index.md（文档首页 — 含完整目录）

````markdown
# 文档

欢迎查看 {站点标题} 文档。

## 目录

### 指南

- [快速开始](/docs/guide/getting-started) - 从零开始搭建
- [配置说明](/docs/guide/configuration) - 详细配置指引

### API

- [API 参考](/docs/api/) - 完整 API 文档
````

### docs/docs/guide/getting-started.md

````markdown
# 快速开始

## 安装依赖

```bash
npm install
```

## 启动开发服务器

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看站点。

## 构建生产版本

```bash
npm run docs:build
```

构建产物在 `dist/` 目录。
````

### docs/docs/api/index.md

```markdown
# API 参考

API 文档内容。
```
### docs/public/ 静态资源

创建 `docs/public/` 目录并放置一个占位说明文件，告知用户可替换 `logo.png`。

### README.md

````markdown
# {文件夹名称}

{站点描述}

## 快速开始

```bash
npm install
npm run docs:dev
```

访问 http://localhost:5173 查看站点。

## 构建

```bash
npm run docs:build
npm run docs:preview
```

## 部署

本项目可直接部署到 Vercel 或 Netlify：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

构建命令: `npm run docs:build`
输出目录: `dist`
````

### 使用指南.md

````markdown
# 使用指南

欢迎使用 VitePress 文档站点！本指南将帮助你从零开始搭建和管理你的文档。

## 快速上手

### 启动开发服务器

```bash
npm run docs:dev
```

浏览器访问 `http://localhost:5173`，即可看到站点。修改文档后页面会自动刷新。

### 构建生产版本

```bash
npm run docs:build
```

构建产物默认输出到 `dist/` 目录，可直接部署到任意静态服务器。

### 本地预览构建结果

```bash
npm run docs:preview
```

预览构建后的静态文件，确保部署前一切正常。

---
````

## 添加文档

### 1. 创建 Markdown 文件

所有文档放在 `docs/docs/` 目录下，按类别组织子目录：

```
docs/docs/
├── guide/
│   ├── getting-started.md    # 快速开始
│   ├── configuration.md      # 配置说明
│   └── advanced.md           # 进阶用法
├── api/
│   ├── index.md              # API 概览
│   └── reference.md          # API 参考
└── examples/
    ├── basic.md              # 基础示例
    └── project.md            # 项目案例
```

Markdown 文件可以包含 frontmatter 元信息（非必须）：

```yaml
---
title: 页面标题
description: 页面描述
---
```

### 2. 配置侧边栏

编辑 `docs/.vitepress/config.mts` 中的 `sidebar` 数组，将新文件加入导航。

**单级侧边栏：**

```typescript
sidebar: [
  {
    text: '指南',
    collapsed: false,
    items: [
      { text: '快速开始', link: '/docs/guide/getting-started' },
      { text: '配置说明', link: '/docs/guide/configuration' },
      { text: '进阶用法', link: '/docs/guide/advanced' }
    ]
  }
]
```

**多级嵌套侧边栏：**

```typescript
sidebar: [
  {
    text: '后端',
    collapsed: true,
    items: [
      {
        text: 'Python',
        collapsed: true,
        items: [
          { text: '基础知识', link: '/docs/backend/python/basics' },
          { text: '进阶教程', link: '/docs/backend/python/advanced' }
        ]
      },
      { text: 'JavaScript', link: '/docs/backend/javascript/' }
    ]
  }
]
```

### 3. 添加导航栏链接

导航栏位于页面顶部，适合放置重要入口：

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '文档', link: '/docs/' },
  { text: 'API', link: '/docs/api/' },
  { text: 'GitHub', link: 'https://github.com/you/repo' }
]
```

### 4. 预览效果

重启开发服务器即可看到新增的文档和导航：

```bash
# Ctrl+C 停止当前服务，然后重新启动
npm run docs:dev
```

---

## 自定义外观

### 主题色

编辑 `docs/.vitepress/theme/style.css`，覆盖 VitePress 的 CSS 变量：

```css
:root {
  /* 品牌色 */
  --vp-c-brand: #3e63dd;
  --vp-c-brand-light: #5b7ce8;
  --vp-c-brand-dark: #2b4fd1;

  /* 首页 Hero 标题渐变色 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #3e63dd 30%, #41d1ff);
}
```

### 首页布局

编辑 `docs/index.md` 可自定义首页 Hero 区域：

```yaml
---
layout: home

hero:
  name: "你的站点名称"
  text: "一句描述性标语"
  tagline: 更详细的副标题
  image:
    src: /logo.png
    alt: logo
  actions:
    - theme: brand
      text: 快速开始
      link: /docs/guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/you/repo
---
```

### Logo 和 Favicon

1. 将 `logo.png` 放到 `docs/public/` 目录
2. 将 `favicon.ico` 放到 `docs/public/` 目录
3. 在 `config.mts` 中确认配置：
   ```typescript
   logo: '/logo.png',
   head: [['link', { rel: 'icon', href: '/favicon.ico' }]]
   ```

---

## Markdown 扩展功能

VitePress 内置了丰富的 Markdown 扩展。

### 自定义容器

```markdown
::: tip 提示
这是一条提示信息。
:::

::: warning 警告
这是一条警告信息。
:::

::: danger 危险
这是一条危险警告。
:::

::: details 点击展开
折叠的详细内容。
:::
```

### 代码块高亮

````markdown
```python
def hello():
    print("Hello, VitePress!")
```
````

支持带行号、高亮特定行：

````markdown
```python{1,3-5}
def hello():      # 高亮
    name = "World"
    print(f"Hello, {name}!")  # 高亮
    return name     # 高亮
```
````

### 表格

```markdown
| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 名称 |
| age | number | 年龄 |
```

### 图片

将图片放入 `docs/public/` 目录，然后在 Markdown 中引用：

```markdown
![描述](/image-name.png)
```

### 数学公式（需额外配置）

安装 `markdown-it-mathjax3` 插件后可支持 LaTeX 数学公式。

---

## 搜索

站点已启用本地搜索，点击导航栏搜索框或按 `Ctrl+K` / `Cmd+K` 即可搜索文档。

- 支持中文分词搜索
- 搜索结果包含标题和内容匹配
- 支持键盘导航（上下箭头选择，回车确认）

---

## 站点信息配置

### 页脚

```typescript
footer: {
  message: '基于 VitePress 构建',
  copyright: '© 2026 你的名字'
}
```

### 最后更新时间

在 `config.mts` 中启用后，每页底部会显示最后更新时间：

```typescript
lastUpdated: {
  text: '最后更新',
  formatOptions: {
    dateStyle: 'full',
    timeStyle: 'medium'
  }
}
```

### 编辑链接

```typescript
editLink: {
  pattern: 'https://github.com/you/repo/edit/main/docs/:path',
  text: '在 GitHub 上编辑此页'
}
```

---

## 部署

### Vercel（推荐）

1. 将项目推送到 GitHub
2. 访问 [vercel.com](https://vercel.com) 导入仓库
3. 无需任何配置，Vercel 自动识别 `vercel.json`

### Netlify

1. 将项目推送到 GitHub
2. 在 Netlify 中导入仓库
3. 配置：
   - Build command: `npm run docs:build`
   - Publish directory: `dist`

### GitHub Pages

使用 GitHub Actions 自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy VitePress to Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: dist
```

---

## 常见问题

### 修改端口

如果默认的 5173 端口被占用，VitePress 会自动选择其他端口。也可以手动指定：

```bash
npm run docs:dev -- --port 8080
```

### 构建报错 "dead link"

如果文档中有指向不存在页面的链接，构建会报错。解决方案：
- 创建对应的目标文档
- 或在 `config.mts` 中设置 `ignoreDeadLinks: 'localhostLinks'`

### 修改输出目录

默认输出到项目根目录的 `dist/`。如需修改，编辑 `config.mts`：

```typescript
outDir: '../dist'   // 当前值，相对于 docs/ 目录
```

### 如何添加评论系统

推荐使用 Giscus（基于 GitHub Discussions）：

```bash
npm install -D vitepress-plugin-comment-with-giscus
```

然后在 theme 中配置即可。

---

## 更多资源

- [VitePress 官方文档](https://vitepress.dev/)
- [VitePress 中文文档](https://vitepress.qzxdp.cn/)
- [Markdown 语法指南](https://www.markdownguide.org/)

---

## 导航栏配置（nav）

导航栏位于页面顶部，用于主要分类导航。

```typescript
nav: [
  { text: '首页', link: '/' },
  { text: '文档', link: '/docs/' },
  // 可添加外部链接
  { text: 'GitHub', link: 'https://github.com/username' }
]
```

## 侧边栏配置（sidebar）

### 扁平结构

适用于文档数量较少的简单项目。

```typescript
sidebar: [
  {
    text: '指南',
    collapsed: false,
    items: [
      { text: '快速开始', link: '/docs/guide/getting-started' },
      { text: 'API', link: '/docs/api/' }
    ]
  }
]
```

### 多级嵌套

适用于大型知识库，支持四级嵌套结构。

```typescript
sidebar: [
  { text: '首页', link: '/' },
  {
    text: '后端',
    collapsed: true,
    items: [
      {
        text: 'Python',
        collapsed: true,
        items: [
          { text: '基础知识', link: '/docs/backend/python/py-1-基础知识' },
          { text: '数据存储', link: '/docs/backend/python/py-2-数据存储' },
          {
            text: '进阶',
            collapsed: true,
            items: [
              { text: '装饰器', link: '/docs/backend/python/advanced-装饰器' },
              { text: '异步编程', link: '/docs/backend/python/advanced-异步' }
            ]
          }
        ]
      },
      { text: 'JavaScript', link: '/docs/backend/javascript/' },
      { text: 'Go', link: '/docs/backend/go/' }
    ]
  },
  {
    text: '前端',
    collapsed: true,
    items: [
      { text: 'Vue', link: '/docs/frontend/vue/' },
      { text: 'React', link: '/docs/frontend/react/' },
      { text: 'CSS', link: '/docs/frontend/css/' }
    ]
  }
]
```

### 路径规范

- 文档路径从 `docs/docs/` 目录开始计算（但不要包含 `docs/docs/` 前缀）
- 例如文件位置：`docs/docs/backend/python/py-1.md`
- 配置路径：`/docs/backend/python/py-1`（去掉 `.md` 后缀）

### 配置要点

| 配置项 | 说明 | 示例 |
|--------|------|------|
| collapsed | 控制分类是否默认折叠 | true 折叠 / false 展开 |
| link | 文档路径，去掉 .md 后缀 | /docs/guide/install |
| text | 显示的导航文本 | Python |
| items | 子菜单数组 | 支持无限嵌套 |

---

## 完整配置示例

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '我的文档站',
  description: '技术文档网站',
  ignoreDeadLinks: 'localhostLinks',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    // Logo
    logo: '/logo.png',
    siteTitle: '我的文档站',

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' }
    ],

    // 侧边栏
    sidebar: [
      { text: '首页', link: '/' },
      {
        text: '指南',
        collapsed: false,
        items: [
          { text: '安装', link: '/guide/install' },
          { text: '快速开始', link: '/guide/quickstart' }
        ]
      }
    ],

    // 侧边栏位置
    aside: 'right',

    // 大纲标题级别
    outline: 2,

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/username' }
    ],

    // 页脚
    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2026 作者'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/you/repo/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    // 本地搜索配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    },

    // 文档翻译
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 深色模式
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    externalLinkIcon: true
  }
})
```

---

## 默认配置

当用户未提供信息时，使用以下默认值：

| 字段 | 默认值 |
|------|--------|
| 站点标题 | 文件夹名称 |
| 站点描述 | "VitePress 文档站点" |
| 作者名称 | 留空 |
| GitHub 链接 | https://github.com |

---

## 注意事项

### 1. ESM 模式支持

VitePress 1.6.x 及以上版本是 ESM-only 包，`package.json` 已默认包含 `"type": "module"`，`config` 使用 `.mts` 后缀。

**错误示例：**
```
"vitepress" resolved to an ESM file. ESM file cannot be loaded by require
```

### 2. Markdown Frontmatter 格式

Markdown 文件的 frontmatter 必须包含正确的开始和结束标记。

**错误示例：**
```yaml
---
layout: home

# Welcome to my site
...
```

**正确格式：**
```yaml
---
layout: home
---

# Welcome to my site
...
```

### 3. Node.js 版本要求

确保使用 Node.js 18.x 或更高版本：
```bash
node --version
# v18.17.0 或更高
```

### 4. 静态资源

所有静态资源（图片、favicon、CNAME 等）放在 `docs/public/` 目录下。引用时使用根路径：
- `docs/public/logo.png` → 通过 `/logo.png` 访问
- `docs/public/favicon.ico` → 通过 `/favicon.ico` 访问

---

## 基于用户 VitePress 项目结构设计 | 面向中文用户优化
