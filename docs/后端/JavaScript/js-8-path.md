# path 路径

`path` 是 Node.js 内置的**路径处理**模块，负责拼接、解析、规范化文件路径。所有方法都是**同步**的。默认按当前操作系统规则处理（Windows 用 `\`，POSIX 用 `/`）。

## 引入方式

| 引入 | 说明 |
|------|------|
| `const path = require('node:path')` | 官方推荐写法（`node:` 前缀） |
| `const path = require('path')` | 同上，省略前缀 |

## 常用方法

| API | 返回 | 说明 |
|-----|------|------|
| `path.join(...paths)` | string | 用平台分隔符**拼接**路径片段并规范化，空片段忽略 |
| `path.resolve(...paths)` | string | 把路径片段解析为**绝对路径**（从右往左拼，直到拼出绝对路径，否则基于当前工作目录） |
| `path.basename(path[, suffix])` | string | 取路径**最后一段**（文件名），可传 `suffix` 去掉扩展名 |
| `path.dirname(path)` | string | 取路径的**目录部分** |
| `path.extname(path)` | string | 取**扩展名**（含点，如 `.html`；无扩展名返回空串） |
| `path.parse(path)` | Object | 把路径拆成 `{root, dir, base, ext, name}` |
| `path.format(obj)` | string | `parse` 的**反向**：由 `{dir, base}` 等拼回路径字符串 |
| `path.isAbsolute(path)` | boolean | 判断是否为**绝对路径** |
| `path.relative(from, to)` | string | 求 `from` 到 `to` 的**相对路径**（如 `../../impl/bbb`） |
| `path.normalize(path)` | string | **规范化**路径：解析 `..` / `.`，合并多余分隔符 |
| `path.matchesGlob(path, pattern)` | boolean | 判断路径是否匹配 **glob 通配符**模式（Node 22+） |

`path.parse()` 返回对象示例（`/home/user/dir/file.txt`）：

| 属性 | 值 | 说明 |
|------|-----|------|
| `root` | `/` | 根目录 |
| `dir` | `/home/user/dir` | 目录部分 |
| `base` | `file.txt` | 文件名（含扩展名） |
| `name` | `file` | 文件名（不含扩展名） |
| `ext` | `.txt` | 扩展名 |

> **join vs resolve**：`join` 只是拼接规范化，不关心是否绝对；`resolve` 会基于当前工作目录生成**绝对路径**。`format` 时若给了 `base`，则 `name`/`ext` 被忽略；若给了 `dir`，则 `root` 被忽略。

## 常用属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `path.sep` | Windows `\` / POSIX `/` | 路径片段分隔符（拼接/拆分路径用） |
| `path.delimiter` | Windows `;` / POSIX `:` | 环境变量 PATH 的分隔符（`process.env.PATH.split(path.delimiter)`） |

## 跨平台处理

| 属性 | 说明 |
|------|------|
| `path.posix` | 强制按 POSIX 规则处理（`/`），任何平台都一致 |
| `path.win32` | 强制按 Windows 规则处理（`\`），任何平台都一致 |

> 默认 `path` 方法跟随运行平台，跨平台结果可能不一致。需要**固定规则**处理路径时（如解析用户传入的 Windows 路径），用 `path.win32` / `path.posix` 前缀。
---
