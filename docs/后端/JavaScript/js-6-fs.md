## 引入方式

## 三种 API

| 风格 | 特点 | 示例 |
|------|------|------|
| 回调（callback） | 最后一个参数是回调函数 `(err, data)`，`err` 为 null 表示成功 | `fs.readFile(p, cb)` |
| Promise（fs/promises） | 返回 Promise，配合 `await` 使用，失败会 reject | `await fsp.readFile(p)` |
| 同步（Sync） | 方法名带 `Sync` 后缀，**阻塞**主线程，失败直接抛异常 | `fs.readFileSync(p)` |

---
## 文件读取

| API | 作用 |
|-----|------|
| `fs.readFile(path[, options], cb)` | 一次性读整个文件，返回 Buffer 或字符串 |
| `fs.readFileSync(path[, options])` | 同步版 |
| `fsp.readFile(path[, options])` | Promise 版 |
| `fs.createReadStream(path[, options])` | 创建**可读流**，适合大文件分段读 |

`options` 常用项：`encoding`（如 `'utf8'`，不传则返回 Buffer）、`flag`（默认 `'r'`）。
---
## 文件写入

| API | 作用 |
|-----|------|
| `fs.writeFile(file, data[, options], cb)` | **覆盖**写入，文件不存在则创建 |
| `fs.appendFile(path, data[, options], cb)` | **追加**写入（等价于 flag `'a'`） |
| `fs.createWriteStream(path[, options])` | 创建**可写流**，适合大文件/持续写入 |
| `fsPromises.writeFile / appendFile` | Promise 版 |

`options` 常用项：`encoding`（默认 `'utf8'`）、`flag`（`'w'` 覆盖 / `'a'` 追加）、`mode`（权限，默认 `0o666`）。
---
## 文件复制 / 重命名 / 删除

| API | 作用 |
|-----|------|
| `fs.copyFile(src, dest[, mode], cb)` | 复制单个文件 |
| `fs.rename(oldPath, newPath, cb)` | 重命名 / 移动 |
| `fs.unlink(path, cb)` | 删除**文件**（目录要用 rm/rmdir） |
| `fs.rm(path[, options], cb)` | 删除文件或目录，`recursive: true` 递归删目录 |
| `fs.rmdir(path[, options], cb)` | 删除**空目录**（已不推荐，用 `rm` 代替） |
| `fs.cp(src, dest[, options], cb)` | 递归复制**整个目录**（Node 16.7+） |

---
## 目录操作

| API | 作用 |
|-----|------|
| `fs.mkdir(path[, options], cb)` | 创建目录，`recursive: true` 可递归创建多级 |
| `fs.readdir(path[, options], cb)` | 列出目录内容（文件名数组） |
| `fs.opendir(path[, options], cb)` | 打开目录返回 `Dir` 对象，可迭代 |
| `fs.glob(pattern[, options], cb)` | 按**通配符**匹配文件路径（Node 22+） |

---
## 文件信息与状态

| API | 作用 |
|-----|------|
| `fs.stat(path[, options], cb)` | 获取文件/目录状态（`Stats` 对象） |
| `fs.lstat(path[, options], cb)` | 同 stat，但**不跟随符号链接** |
| `fs.access(path[, mode], cb)` | 检查是否存在 / 权限（`F_OK`/`R_OK`/`W_OK`/`X_OK`） |
| `fs.existsSync(path)` | 判断路径是否存在（**只有同步版**） |
| `fs.statfs(path[, options], cb)` | 获取文件系统信息（剩余空间等） |

`Stats` 对象常用成员：

| 成员 | 说明 |
|------|------|
| `stats.isFile()` / `isDirectory()` / `isSymbolicLink()` | 类型判断 |
| `stats.size` | 字节大小 |
| `stats.mtime` / `atime` / `birthtime` | 修改 / 访问 / 创建时间 |
| `stats.mode` | 权限位 |
| `stats.isBlockDevice()` 等 | 其他设备类型判断 |

---
## 打开文件与文件描述符

| API | 作用 |
|-----|------|
| `fs.open(path[, flags[, mode]], cb)` | 打开文件返回**文件描述符 fd** |
| `fs.close(fd[, cb])` | 关闭 fd |
| `fs.read(fd, buffer, offset, length, position, cb)` | 从 fd 指定位置读 |
| `fs.write(fd, buffer[, offset[, length[, position]]], cb)` | 向 fd 指定位置写 |
| `fs.fstat(fd[, options], cb)` | 按 fd 获取状态 |
| `fs.truncate(path[, len], cb)` | 把文件截断到指定长度 |

---
## 流（Stream）

| API | 作用 |
|-----|------|
| `fs.createReadStream(path[, options])` | 可读流，`data`/`end`/`error` 事件 |
| `fs.createWriteStream(path[, options])` | 可写流，`write()`/`end()` |

---
## 文件监听

| API | 作用 |
|-----|------|
| `fs.watch(filename[, options][, listener])` | 监听文件/目录变化（事件：`rename`/`change`），底层高效 |
| `fs.watchFile(filename[, options], listener)` | 轮询式监听（旧 API，性能差，少用） |
| `fs.unwatchFile(filename[, listener])` | 停止 `watchFile` |

---
## 其他常用 API

| API | 作用 |
|-----|------|
| `fs.mkdtemp(prefix[, options], cb)` | 创建**唯一临时目录**（prefix 建议以路径分隔符结尾） |
| `fs.realpath(path[, options], cb)` | 解析符号链接得到**真实绝对路径** |
| `fs.symlink(target, path[, type], cb)` | 创建**符号链接**（type: `'file'`/`'dir'`/`'junction'`） |
| `fs.link(existingPath, newPath, cb)` | 创建**硬链接** |
| `fs.readlink(path[, options], cb)` | 读取符号链接指向 |
| `fs.chmod(path, mode, cb)` | 修改权限（如 `0o755`） |
| `fs.utimes(path, atime, mtime, cb)` | 修改访问/修改时间 |

---
## 常用 flags（打开模式）

| flag | 含义 |
|------|------|
| `'r'` | 只读，文件不存在报错 |
| `'r+'` | 读写，文件不存在报错 |
| `'w'` | 写入，**截断**原内容，不存在则创建 |
| `'w+'` | 读写，截断，不存在则创建 |
| `'a'` | 追加，不存在则创建 |
| `'a+'` | 读取 + 追加，不存在则创建 |
| `'x'` | 排他模式：文件已存在则**报错**（配合 `w`/`a` 用，如 `'wx'`） |

---
