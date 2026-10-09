# 博客开发笔记

> Hexo 博客搭建与使用完整指南

## 一、环境准备

| 软件 | 下载地址 | 安装说明 |
|------|---------|---------|
| Git | https://git-scm.com/downloads | 一路点击"下一步"，无需修改默认设置 |
| Node.js | https://nodejs.org/（选择 LTS 长期支持版） | 勾选"Add to PATH"，自动添加到环境变量 |

**验证安装**：
```bash
node -v      # 显示 Node.js 版本号
npm -v       # 显示 npm 版本号
git --version  # 显示 Git 版本号
```

## 二、Hexo 命令速查表

### 1. 基础操作命令

| 功能 | 指令全称 | 简写指令 | 补充说明 |
|------|---------|---------|----------|
| 初始化博客 | `hexo init <文件夹名>` | - | 不填文件夹名则在当前目录创建 |
| 安装依赖 | `npm install` | - | 初始化后执行 |
| 生成静态文件 | `hexo generate` | `hexo g` | 存到 `public` 目录 |
| 部署博客 | `hexo deploy` | `hexo d` | 需先配置 `_config.yml` |
| 生成并部署 | `hexo generate` + `hexo deploy` | `hexo gd` | 一步完成 |
| 清理缓存 | `hexo clean` | - | 更换主题/配置异常时必用 |

### 2. 文章与页面管理

| 功能 | 指令全称 | 简写指令 | 生成位置 |
|------|---------|---------|---------|
| 新建文章 | `hexo new post <文章名>` | `hexo n post` | `source/_posts/` |
| 新建页面 | `hexo new page <页面名>` | `hexo n page` | `source/<页面名>/` |
| 新建草稿 | `hexo new draft <文章名>` | `hexo n draft` | `source/_drafts/` |
| 发布草稿 | `hexo publish draft <文章名>` | `hexo p draft` | 转为正式文章 |

### 3. 本地预览

| 功能 | 指令 | 说明 |
|------|------|------|
| 启动预览 | `hexo server` / `hexo s` | 默认访问 `http://localhost:4000` |
| 指定端口 | `hexo server -p 5000` | 解决端口占用问题 |
| 预览草稿 | `hexo server --drafts` | 显示草稿文章 |

### 4. 其他实用指令

| 功能 | 指令 | 说明 |
|------|------|------|
| 查看版本号 | `hexo --version` | 查看 Hexo 版本 |
| 查看帮助 | `hexo --help` | 查看所有指令帮助 |
| 查看配置 | `hexo config` | 查看指定配置：`hexo config <配置项>` |
| 修改配置 | 直接编辑 `_config.yml` | 修改后需重启服务 |
| 调试模式 | `hexo --debug` | 查错，显示详细错误信息 |
| 安全模式 | `hexo --safe` | 禁用插件，排查问题 |
| 强制重新生成 | `hexo generate --force` | 强制覆盖生成 |

## 三、Hexo 插件列表

| 插件名称 | 主要功能 | 安装命令 | 推荐指数 |
|----------|---------|---------|--------|
| hexo-generator-index | 生成博客首页 | `npm install hexo-generator-index --save` | ★★★★★ |
| hexo-generator-archive | 生成文章归档页面 | `npm install hexo-generator-archive --save` | ★★★★★ |
| hexo-generator-category | 生成文章分类页面 | `npm install hexo-generator-category --save` | ★★★★★ |
| hexo-generator-tag | 生成文章标签页面 | `npm install hexo-generator-tag --save` | ★★★★★ |
| hexo-server | 本地开发服务器 | `npm install hexo-server --save` | ★★★★★ |
| hexo-deployer-git | 部署到 GitHub Pages | `npm install hexo-deployer-git --save` | ★★★★★ |
| hexo-renderer-marked | Markdown 转 HTML | `npm install hexo-renderer-marked --save` | ★★★★★ |
| hexo-renderer-stylus | Stylus 转 CSS | `npm install hexo-renderer-stylus --save` | ★★★★☆ |
| hexo-generator-sitemap | 生成 sitemap.xml | `npm install hexo-generator-sitemap --save` | ★★★★☆ |
| hexo-generator-baidu-sitemap | 百度专属 sitemap | `npm install hexo-generator-baidu-sitemap --save` | ★★★★☆ |
| hexo-prism-plugin | 代码高亮显示 | `npm install hexo-prism-plugin --save` | ★★★★☆ |
| hexo-toc | 自动生成文章目录 | `npm install hexo-toc --save` | ★★★★☆ |
| hexo-related-popular-posts | 推荐相关文章 | `npm install hexo-related-popular-posts --save` | ★★★☆☆ |
| hexo-wordcount | 统计字数、阅读时间 | `npm install hexo-wordcount --save` | ★★★☆☆ |
| hexo-filter-github-emojis | 支持 GitHub Emoji | `npm install hexo-filter-github-emojis --save` | ★★★☆☆ |

## 四、主题与插件操作

| 操作 | 命令/方法 | 说明 |
|------|----------|------|
| 下载 Next 主题 | `git clone https://github.com/theme-next/hexo-theme-next themes/next` | 克隆到 themes 目录 |
| 更换主题 | 编辑 `_config.yml`，修改 `theme` 字段 | `theme: landscape` → `theme: next` |
| 更新主题 | `git pull`（在主题目录下） | 更新到最新版本 |
| 安装插件 | `npm install <插件名> --save` | 例：`npm install hexo-generator-rss --save` |
| 卸载插件 | `npm uninstall <插件名> --save` | 移除插件 |

## 五、NPM 包管理操作

| 操作 | 步骤/命令 | 说明 |
|------|----------|------|
| 安装更新工具 | `npm install -g npm-check-updates` | 全局安装 ncu |
| 检查可更新包 | `ncu` | 进入 blog 根目录后执行 |
| 更新包版本 | `ncu -u` | 更新 package.json 中的版本 |
| 安装更新 | `npm install` | 安装最新版本的依赖 |
| 查看已安装插件 | `npm ls –depth=0 \| grep hexo-` | 查看 hexo 插件 |
| 查看可更新插件 | `npm outdated \| grep hexo-` | 查看哪些可更新 |

## 六、Hexo 配置示例

```yaml
# 排除某些页面（可选）
exclude:
  - tags/**
  - categories/**

# Sitemap 配置
sitemap:
  template: ./sitemap_template.xml
  rel: false
```

## 七、常见问题及解决方案

| 操作场景 | 遇到的问题 | 解决方案 |
|----------|-----------|----------|
| 部署到 GitHub | 语法错误：`hexo d`/`hexo g` 后未加空格 | 补全空格 |
| 部署到 GitHub | 插件丢失 | `npm install hexo-deployer-git --save` |
| 部署到 GitHub | 网络重置 | 切换 SSH 协议/开科学上网 |
| 部署到 GitHub | 账号不匹配 | `hexo clean` / 重新配置 SSH |
| 配置管理 | SSH 密钥创建失败 | 手动创建文件夹后重新生成密钥 |
| 配置管理 | 路径乱码 | 跳过 SSH，用 HTTPS+ 科学上网部署 |
| 本地预览 | 本地预览无更新 | `hexo clean && hexo s` |
| 部署验证 | 部署验证无反馈 | 回到 Git Bash 查看提示 |
| 文章创建 | new 和引号间无空格 | 确保 `hexo new "标题"` 有空格 |
| 文章创建 | 创建路径不对 | `hexo config \| grep "post_dir"` 检查路径 |

## 八、实际操作流程

1. **进入博客目录**：`cd /d/Blog/my-blog`
2. **创建文章**：`hexo new "你的文章标题"`
3. **编辑文章**：用 Typora 或 VS Code 打开 `source/_posts/` 下的 md 文件
4. **本地预览**：`hexo s`
5. **生成部署**：`hexo clean && hexo deploy`