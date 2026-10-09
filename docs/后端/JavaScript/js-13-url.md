# url URL 处理

`url` 是 Node.js 内置的 **URL 解析与处理**模块，负责解析、拼接、转换 URL。现在官方推荐使用实现 **WHATWG 标准**的 `URL` 类（浏览器兼容，node 全局可用）；旧版 `url.parse()` 等 API 标记为 legacy，仅供兼容旧代码。

## 引入方式

| 引入 | 说明 |
|------|------|
| `const url = require('node:url')` | 引入 `url` 模块 |
| `const { URL } = require('node:url')` | 也可直接用全局 `URL`（无需引入，`URL === globalThis.URL`） |

## WHATWG URL 类

`new URL(input[, base])` 根据 `base` 解析 `input` 创建 URL 对象；`input` 为绝对路径时忽略 `base`，为相对路径时必须以 `base` 为基准。`input` 或 `base` 非法会抛 `TypeError`。

### 常用属性（getter/setter）

| 属性 | 只读 | 说明 |
|------|------|------|
| `url.href` | | 序列化后的完整 URL，赋值会整体新建 URL 对象 |
| `url.protocol` | | 协议部分（含冒号，如 `https:`） |
| `url.origin` | 只读 | 源：`协议 + 主机 (+端口)`，不含用户名密码（如 `https://example.org`） |
| `url.host` | | 主机 + 端口（如 `example.org:81`） |
| `url.hostname` | | 仅主机名，**不含端口** |
| `url.port` | | 端口；设成协议默认端口会变成空串 |
| `url.pathname` | | 路径部分（如 `/p/a/t/h`） |
| `url.search` | | 序列化查询串（含 `?`，如 `?query=string`，无查询返回空串） |
| `url.searchParams` | | URLSearchParams 对象，见下 |
| `url.hash` | | 片段（含 `#`，如 `#hash`，无返回空串） |
| `url.username` / `url.password` | | 认证信息里的用户名 / 密码 |

### 常用方法

| 方法 | 返回 | 说明 |
|------|------|------|
| `url.toString()` | string | 与 `url.href` 相同 |
| `url.toJSON()` | string | 序列化（`JSON.stringify` 时自动调用） |
| `URL.canParse(input[, base])` | boolean | 判断能否解析为有效 URL，**不抛异常** |
| `URL.parse(input[, base])` | URL \| null | 解析失败返回 `null` 而非抛错（Node 21+） |

### 特殊方案

`ftp`、`file`、`http`、`https`、`ws`、`wss` 是**特殊协议**：从特殊协议可改为另一特殊协议，但不能改为非特殊协议，反之亦然。例如 `http` → `https` 有效，`http` → `fish` 无效（被忽略）。

## URLSearchParams 类

配合 `url.searchParams` 操作查询参数，也可直接 `new URLSearchParams()` 构造（入参支持字符串、对象、可迭代对象）。

| 方法 | 说明 |
|------|------|
| `searchParams.get(name)` | 取第一个同名值；不存在返回 `null` |
| `searchParams.getAll(name)` | 取所有同名值（数组） |
| `searchParams.has(name)` | 是否含该参数 |
| `searchParams.append(name, value)` | **追加**参数（保留已有同名项） |
| `searchParams.set(name, value)` | **设置**参数（替换所有同名项的新值） |
| `searchParams.delete(name)` | 删除该参数 |
| `searchParams.sort()` | 按键名排序 |
| `searchParams.toString()` | 序列化为 `a=1&b=2`（不含 `?`） |
| `searchParams.size` | 参数数量（只读） |
| `searchParams.forEach(cb)` | 遍历 `(value, name)` |

## 其他工具函数（`url` 模块）

| API | 返回 | 说明 |
|-----|------|------|
| `url.domainToASCII(domain)` | string | 域名（含 Unicode）转 ASCII（Punycode），如 `測試` → `xn--g6w251d` |
| `url.domainToUnicode(domain)` | string | 上面逆向，ASCII 转回 Unicode 域名 |
| `url.fileURLToPath(url)` | string | 文件 URL 转本地文件路径（`file:///a/b` → `C:\a\b`） |
| `url.pathToFileURL(path)` | URL | 本地文件路径转文件 URL |
| `url.urlToHttpOptions(url)` | Object | WHATWG URL 转 `http.request()` 可用的 options 对象 |

`url.fileURLToPath()` 在 `import.meta.url`（ESM 里当前文件的 file URL）配合 `__dirname` 之类用法时很常见：先转成路径，再 `path.dirname()` 定位模块目录。

## 旧版 API（legacy，仅兼容旧代码）

不再推荐，新代码直接用 WHATWG URL / URLSearchParams。

| API | 说明 |
|-----|------|
| `url.parse(urlString[, parseQueryString])` | 解析 URL 字符串为 `urlObject` |
| `url.format(urlObject)` | `urlObject` 序列化为字符串 |
| `url.resolve(from, to)` | 基于 `from` 解析 `to` 为绝对 URL |

## 百分号编码

在属性上写入的非法 URL 字符会被自动**百分号编码**（如空格 → `%20`）。WHATWG 与旧版 `url.parse()`/`url.format()` 的编码选择可能略有不同，以 WHATWG 为准。
---
## 关键要点

1. 新代码一律用全局 WHATWG `URL` 类和 `URLSearchParams`，符合浏览器标准、可跨端复用；旧版 `url.parse()` 仅用于兼容旧代码。
2. `host` 含端口，`hostname` 不含端口；设 `port` 为协议默认端口会变空串。
3. `origin` 只包含 `协议 + host`，不含用户名密码、路径、查询。
4. 相对 URL 必须给 `base`；`new URL('/foo', 'https://example.org/')` 得 `https://example.org/foo`。
5. 查询参数用 `searchParams` 增删改查，比手动拼串安全；`.sort()` 可让参数有序。
6. 需要"是否可解析"而非抛错时用 `URL.canParse()` 或 `URL.parse()`（返回 `null`）。
7. 域名含中文等 Unicode 时，WHATWG 自动转 Punycode，读取 `hostname`/`origin` 得到的是 ASCII 形式。