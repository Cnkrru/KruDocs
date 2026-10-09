## 概述

Vite 在特殊的 `import.meta.env` 对象下暴露环境相关常量。这些常量在开发阶段被定义为全局变量，在构建阶段被**静态替换**，使 tree-shaking（摇树优化）更有效。

```js
if (import.meta.env.DEV) {   // 生产构建中这段代码会被 tree-shaking 优化掉
  console.log('Dev mode');
}
```

---

## 内置常量

| 常量 | 类型 | 说明 |
|------|------|------|
| `import.meta.env.MODE` | string | 应用运行的**模式**（如 `development` / `production` / `staging`） |
| `import.meta.env.BASE_URL` | string | 部署应用时的**基本 URL**，由 `base` 配置项决定 |
| `import.meta.env.PROD` | boolean | 是否运行在**生产环境**（`NODE_ENV='production'`） |
| `import.meta.env.DEV` | boolean | 是否运行在**开发环境**（永远与 `PROD` 相反） |
| `import.meta.env.SSR` | boolean | 应用是否运行在**服务端**（SSR） |

---

## 环境变量

Vite 自动将环境变量暴露在 `import.meta.env` 对象下，**全部作为字符串**。

- 以 `VITE_` 为前缀的变量会被打包进**客户端源代码**。
- 不带 `VITE_` 前缀的变量不会暴露给客户端（如 `DB_PASSWORD` 返回 `undefined`）。
- 自定义前缀可用配置项 `envPrefix`。

```js
console.log(import.meta.env.VITE_SOME_KEY);  // "123"（字符串）
console.log(import.meta.env.DB_PASSWORD);    // undefined（未暴露）
```

注意点：

- 环境变量解析后都是**字符串**，数字、布尔值需自行转换类型。
- `VITE_*` 变量不应存放 API 密钥等敏感信息，其值会打包进源码；生产环境的密钥应放在后端服务器或边缘函数中。

---

## `.env` 文件

Vite 使用 dotenv 从环境目录加载 `.env` 类文件：

| 文件 | 说明 |
|------|------|
| `.env` | 所有情况下都会加载 |
| `.env.local` | 所有情况下都会加载，但会被 git 忽略 |
| `.env.[mode]` | 只在指定模式下加载（如 `.env.production`） |
| `.env.[mode].local` | 只在指定模式下加载，且被 git 忽略 |

加载优先级（从高到低）：

1. **Vite 启动时已存在的环境变量**（如命令行 `VITE_SOME_KEY=123 vite build`），不会被 `.env` 文件覆盖。
2. 模式特定文件 `.env.[mode]`（如 `.env.production`）。
3. 通用文件 `.env` / `.env.local`。

注意点：

- `.env` 类文件在 Vite **启动时**加载，改动后需**重启服务器**生效。
- 变量支持 `$` 扩展引用，使用 `$` 需用 `\` 转义。
- `.env.*.local` 仅供本地使用，应加入 `.gitignore` 避免提交到仓库。

```bash
# .env 示例
KEY=123
NEW_KEY1=test$foo      # test
NEW_KEY2=test\$foo     # test$foo
NEW_KEY3=test$KEY      # test123
```

---

## TypeScript 智能提示

默认 Vite 在 `vite/client.d.ts` 中为 `import.meta.env` 提供类型定义。想要自定义 `VITE_` 变量的智能提示，在 `src` 下创建 `vite-env.d.ts`：

```typescript
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string   // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

注意点：

- `vite-env.d.ts` 中**不能有 `import` 语句**，否则类型增强会失效。
- 依赖 DOM / WebWorker 类型时，在 `tsconfig.json` 的 `lib` 字段中配置。

---

## HTML 环境变量替换

`import.meta.env` 中的任何属性都可通过 `%CONST_NAME%` 语法在 HTML 文件中使用：

```html
<h1>Vite is running in %MODE%</h1>
<p>Using data from %VITE_API_URL%</p>
```

注意点：

- 不存在的变量（如 `%NON_EXISTENT%`）会被**忽略不替换**，与 JS 中返回 `undefined` 不同。
- 复杂替换（如条件替换）需借助插件或 `transformIndexHtml` 钩子实现。

---

## 模式

- `vite dev` 默认运行在 `development`（开发）模式。
- `vite build` 默认运行在 `production`（生产）模式，并自动加载 `.env.production`。
- 用 `--mode` 可覆盖默认模式，如 `vite build --mode staging` 会加载 `.env.staging`。

```bash
vite build --mode staging   # 加载 .env.staging 中的变量
```

```bash
# .env.staging
VITE_APP_TITLE=My App (staging)
```

### NODE_ENV 和模式的区别

`NODE_ENV`（`process.env.NODE_ENV`）和模式是两个**不同概念**：

| 命令 | NODE_ENV | Mode |
|------|----------|------|
| `vite build` | `"production"` | `"production"` |
| `vite build --mode development` | `"production"` | `"development"` |
| `NODE_ENV=development vite build` | `"development"` | `"production"` |
| `NODE_ENV=development vite build --mode development` | `"development"` | `"development"` |

`NODE_ENV` 与 `import.meta.env` 的对应关系：

| NODE_ENV | `import.meta.env.PROD` | `import.meta.env.DEV` |
|----------|------------------------|------------------------|
| `production` | `true` | `false` |
| `development` | `false` | `true` |
| `other` | `false` | `true` |

| 命令 | `import.meta.env.MODE` |
|------|------------------------|
| `--mode production` | `"production"` |
| `--mode development` | `"development"` |
| `--mode staging` | `"staging"` |

注意点：

- `NODE_ENV` 可在命令中或 `.env` 文件中设置，但两者仍是不同概念。
- 命令中使用 `NODE_ENV=...` 可让 Vite **提前检测**该值，从而能在 Vite 配置中读取 `process.env.NODE_ENV`（Vite 解析配置之后才会加载 `.env` 文件）。

---

## 关键要点

1. 环境常量统一挂在 `import.meta.env` 下，构建时被静态替换，利于 tree-shaking。
2. 内置常量：`MODE` / `BASE_URL` / `PROD` / `DEV` / `SSR`。
3. 只有 `VITE_` 前缀的变量会暴露给客户端，且解析后都是字符串；敏感信息不要放 `VITE_*`。
4. `.env` 加载优先级：已存在环境变量 > `.env.[mode]` > `.env` / `.env.local`，改动需重启生效。
5. `--mode` 可覆盖默认模式；`NODE_ENV` 与模式是两个不同概念，`PROD`/`DEV` 由 `NODE_ENV` 决定，`MODE` 由 `--mode` 决定。
