# util 工具

`util` 是 Node.js 内置的**通用工具**模块，提供各种实用函数：函数风格转换、调试输出、类型判断、命令行参数解析等。它满足 Node 内部 API 需求，对应用开发同样有用。

## 引入方式

| 引入 | 说明 |
|------|------|
| `const util = require('node:util')` | 官方推荐写法（`node:` 前缀） |
| `const { promisify, inspect } = require('node:util')` | 按需解构引入 |

## 函数风格转换

| API | 说明 |
|-----|------|
| `util.promisify(fn)` | 把**回调式**函数转成 **Promise** 版（最常用，如 `child_process.execFile`） |
| `util.callbackify(fn)` | 反向：把 **async/Promise** 函数转成错误优先**回调式** `(err, value)` |

> `promisify` 要求原函数遵循 Node 惯例：最后一个参数是 `(err, result)` 回调。多数内置模块（fs、child_process 等）的回调 API 都可直接包一层变 `await` 可用。

## 调试输出

| API | 说明 |
|-----|------|
| `util.inspect(obj[, options])` | 把对象转成**可读字符串**（`console.log` 底层就是它），options 有 `depth`（嵌套深度）/ `colors` / `showHidden` 等 |
| `util.format(format[, ...args])` | printf 风格格式化：`%s` 字符串、`%d` 数字、`%j` JSON、`%o` 对象 |
| `util.debuglog(section)` | 创建**条件调试日志**函数，仅当环境变量 `NODE_DEBUG` 含该 section 时才输出到 stderr |
| `util.styleText(format, text)` | 给文本加 ANSI 样式（如 `'red'`/`'bold'`），用于终端彩色输出 |
| `util.stripVTControlCharacters(str)` | 去除字符串中的 ANSI 转义码（清理终端输出） |

> `debuglog` 用法：`const log = util.debuglog('app')`，运行时 `NODE_DEBUG=app node app.js` 才打印，平时零开销。`inspect` 的 `depth: null` 表示不限嵌套深度。

## 比较与类型判断

| API | 说明 |
|-----|------|
| `util.isDeepStrictEqual(a, b)` | **深度严格相等**比较（对象/数组逐层比较，比 `===` 强） |
| `util.types.isXxx(value)` | 一系列类型判断函数：`isPromise` / `isDate` / `isRegExp` / `isMap` / `isSet` / `isTypedArray` / `isNativeError` 等 |

> `isDeepStrictEqual` 适合比较对象内容是否相同（如配置是否变化）；`util.types` 能区分 `new Number(1)` 与原始数字等 `typeof` 区分不了的包装类型。

## 命令行参数解析

| API | 说明 |
|-----|------|
| `util.parseArgs([config])` | 解析命令行参数（`process.argv`），零依赖替代第三方 CLI 库 |

`config` 常用字段：`options`（定义 `{ name: { type: 'string'|'boolean', short, default } }`）、`allowPositionals`（是否允许位置参数）。返回 `{ values, positionals }`。

## 其他常用

| API | 说明 |
|-----|------|
| `util.deprecate(fn, msg[, code])` | 标记函数**已弃用**，调用时打印警告（迁移提示用） |
| `util.inherits(constructor, superConstructor)` | 实现原型链继承（ES6 class 时代已少用） |
| `util.getSystemErrorName(err)` | 把错误码转成名称（如 `-2` → `'ENOENT'`） |
| `util.TextEncoder` / `util.TextDecoder` | 字符串 ↔ UTF-8 字节转换（浏览器同款，全局也有） |
| `util.convertProcessSignalToExitCode(signal)` | 信号名转退出码（`'SIGTERM'` → `143`，即 `128 + 信号号`） |
---
