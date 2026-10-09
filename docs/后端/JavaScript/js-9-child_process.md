# child_process 子进程

`child_process` 是 Node.js 内置的**子进程**模块，用于在 Node 中启动外部命令 / 程序，或派生新的 Node 进程。核心是 `spawn()`，其余方法都是它的便捷封装。

## 引入方式

| 引入 | 说明 |
|------|------|
| `const { spawn, exec, fork } = require('node:child_process')` | 按需解构引入 |

## 方法总览

| 方法 | 同步/异步 | 是否走 shell | 输出方式 | 适用场景 |
|------|-----------|-------------|----------|----------|
| `spawn(command[, args][, options])` | 异步 | 否 | **流式**（`stdout`/`stderr` 事件） | 大输出、持续输出的命令，最底层最通用 |
| `exec(command[, options][, callback])` | 异步 | **是** | 缓冲后一次性给回调 `(err, stdout, stderr)` | 简单命令、需要管道/重定向/通配符 |
| `execFile(file[, args][, options][, callback])` | 异步 | 否 | 缓冲后一次性给回调 | 直接执行可执行文件，比 exec 高效 |
| `fork(modulePath[, args][, options])` | 异步 | 否 | **IPC 消息**（`send()`/`message` 事件） | 派生 Node 进程做多进程/多核 |
| `execSync(command[, options])` | **同步** | 是 | 直接返回 stdout 字符串 | 一次性脚本、启动初始化 |
| `execFileSync(file[, args][, options])` | **同步** | 否 | 直接返回 stdout 字符串 | 同上，但直接执行文件 |
| `spawnSync(command[, args][, options])` | **同步** | 否 | 返回结果对象 `{stdout, stderr, status, signal}` | 需要同时拿状态码和输出 |

> **选择**：日常优先 **`spawn`**（流式、不经过 shell、无注入风险）；简单取输出用 **`exec`**（但会经过 shell，**切勿传未处理的用户输入**，有命令注入风险）；多进程并行用 **`fork`**；脚本/初始化用同步版。

## 常用 options

| 选项 | 说明 |
|------|------|
| `cwd` | 子进程工作目录（默认 `process.cwd()`） |
| `env` | 子进程环境变量对象（默认 `process.env`） |
| `shell` | 是否经 shell 执行（`exec` 默认 true；`spawn` 默认 false；Windows 跑 `.bat`/`.cmd` 必须 true） |
| `encoding` | 输出编码，默认 `'utf8'`，设 `'buffer'` 拿 Buffer |
| `timeout` | 超时毫秒数，超时发 `killSignal` 终止（默认 0 不限） |
| `maxBuffer` | stdout/stderr 最大缓冲字节，超出则终止进程（默认 1MB，`exec` 系用） |
| `killSignal` | 超时/终止用的信号，默认 `'SIGTERM'` |
| `signal` | 传 `AbortController.signal`，可外部中止子进程 |
| `detached` | `true` 时子进程独立成组，可脱离父进程后台运行（配合 `unref()`） |
| `stdio` | 配置 stdin/stdout/stderr：`'pipe'`（默认管道）/ `'ignore'` / `'inherit'` / `'ipc'` |
| `windowsHide` | Windows 上隐藏子进程控制台窗口（默认 false） |
| `uid` / `gid` | 设置子进程用户 / 组 ID（POSIX） |

> `stdio: 'ignore'` 用于不关心输出时避免管道阻塞；`stdio: 'inherit'` 让子进程直接复用父进程终端（彩色输出、交互命令）。

## ChildProcess 对象（spawn/fork 的返回值）

### 常用事件

| 事件 | 回调参数 | 触发时机 |
|------|----------|----------|
| `'close'` | `(code, signal)` | 进程退出且 stdio 流关闭（**最常用**） |
| `'exit'` | `(code, signal)` | 进程退出（比 close 早，stdio 可能还没关） |
| `'error'` | `(err)` | 启动失败（如命令不存在） |
| `'message'` | `(msg)` | 收到子进程 `send()` 的 IPC 消息（fork） |
| `'spawn'` | — | 子进程成功启动 |
| `'disconnect'` | — | IPC 通道断开（fork） |

### 常用属性

| 属性 | 说明 |
|------|------|
| `pid` | 子进程 PID |
| `exitCode` | 退出码（退出后才有） |
| `signalCode` | 终止信号（被信号杀死时） |
| `killed` | 是否已被 `kill()` 发送过信号 |
| `connected` | IPC 通道是否连接（fork） |
| `stdin` / `stdout` / `stderr` | 子进程的流（`stdio` 为 pipe 时可用） |

### 常用方法

| 方法 | 说明 |
|------|------|
| `kill([signal])` | 向子进程发送信号终止（默认 `SIGTERM`） |
| `send(message)` | 通过 IPC 给子进程发消息（fork） |
| `disconnect()` | 关闭 IPC 通道（fork） |
| `unref()` | 父进程不等待该子进程，可让子进程后台独立存活 |
| `ref()` | 撤销 `unref()` |

## fork 多进程（IPC）

| 概念 | 说明 |
|------|------|
| `fork(modulePath)` | 派生新 Node 进程执行指定模块，自动建立 IPC 通道 |
| `child.send(msg)` | 父 → 子发消息（可传对象，自动序列化） |
| `process.send(msg)` | 子进程内发消息给父进程 |
| `'message'` 事件 | 双方监听对方消息 |
| `process.on('message')` | 子进程内接收消息 |

> `fork` 典型用途：CPU 密集任务拆到多个进程利用多核（配合 `os.availableParallelism()` 决定数量），进程间用 `send`/`message` 通信。
---
