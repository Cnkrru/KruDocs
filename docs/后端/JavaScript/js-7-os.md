# os 操作系统

`os`（operating system）是 Node.js 内置的**操作系统**模块，提供与系统相关的信息：平台、架构、CPU、内存、网络、用户等。所有方法都是**同步**的，直接返回结果。

## 引入方式

| 引入 | 说明 |
|------|------|
| `const os = require('node:os')` | 官方推荐写法（`node:` 前缀） |
| `const os = require('os')` | 同上，省略前缀 |

## 系统信息

| API | 返回 | 说明 |
|-----|------|------|
| `os.platform()` | string | 平台：`'linux'` / `'darwin'` / `'win32'`（写跨平台逻辑用） |
| `os.type()` | string | 系统名称：Linux 为 `'Linux'`、macOS 为 `'Darwin'`、Windows 为 `'Windows_NT'` |
| `os.arch()` | string | CPU 架构：`'x64'` / `'arm64'` 等 |
| `os.hostname()` | string | 主机名 |
| `os.homedir()` | string | 当前用户主目录 |
| `os.tmpdir()` | string | 系统默认临时目录（Windows 看 `TEMP`/`TMP`，其他看 `TMPDIR`，默认 `/tmp`） |
| `os.userInfo()` | Object | 当前用户信息：`username` / `uid` / `gid` / `shell` / `homedir` |
| `os.EOL` | string | 行尾标记：Windows 为 `\r\n`，POSIX 为 `\n` |

> **区分**：`platform()` 判断"是什么系统"（跨平台逻辑用），`type()` 是正式系统名称，`arch()` 判断 CPU 架构。`EOL` 用于拼接多行文本时保证换行符与平台一致。

## CPU 与内存

| API | 返回 | 说明 |
|-----|------|------|
| `os.cpus()` | Object[] | 每个逻辑 CPU 核心一个对象：`model`（型号）、`speed`（MHz）、`times`（各模式耗时） |
| `os.availableParallelism()` | number | 程序可用的**默认并行度**，计算并发数用它，别用 `cpus().length` |
| `os.totalmem()` | number | 系统**总内存**（字节） |
| `os.freemem()` | number | 系统**空闲内存**（字节） |

> 内存换算：`os.totalmem() / 1024 ** 3` 得到 GB。

## 网络

| API | 返回 | 说明 |
|-----|------|------|
| `os.networkInterfaces()` | Object | 每个网络接口一个键，值为地址对象数组 |

地址对象常用属性：`address`（IP）、`family`（`'IPv4'`/`'IPv6'`）、`netmask`（掩码）、`cidr`（如 `192.168.1.108/24`）、`mac`、`internal`（是否回环/本机接口）。

> 常用场景：遍历所有接口，过滤 `internal === false` 且 `family === 'IPv4'` 来获取本机局域网 IP。
---
