# sqlite 数据库

`node:sqlite` 是 Node.js 内置的 **SQLite 数据库**模块（v22.5+ 引入，目前为候选发布阶段），无需安装第三方库即可操作 SQLite。所有 API 均为**同步**执行。

## 引入方式

| 引入 | 说明 |
|------|------|
| `const { DatabaseSync } = require('node:sqlite')` | 仅可通过 `node:` 前缀使用 |

## 打开数据库（DatabaseSync）

| API | 说明 |
|-----|------|
| `new DatabaseSync(path[, options])` | 打开数据库连接；`path` 传文件路径，`':memory:'` 表示**纯内存数据库**（临时用，不落盘） |

常用 options：

| 选项 | 默认 | 说明 |
|------|------|------|
| `open` | `true` | 是否构造时立即打开 |
| `readOnly` | `false` | 只读模式打开（数据库不存在则失败） |
| `enableForeignKeyConstraints` | `true` | 启用外键约束 |
| `timeout` | `0` | 忙碌超时（ms），等待数据库锁释放的最长时间 |
| `readBigInts` | `false` | 整数按 `bigint` 读取（超出安全整数范围时必需） |
| `returnArrays` | `false` | 查询结果以数组而非对象返回 |

## DatabaseSync 常用方法

| API | 说明 |
|-----|------|
| `db.exec(sql)` | 执行一条或多条 SQL 语句（建表、批量操作，无返回值） |
| `db.prepare(sql[, options])` | **预编译** SQL 语句，返回 `StatementSync`，可绑定参数复用 |
| `db.close()` | 关闭连接（用完必须关，避免占用文件锁） |
| `db.function(name, fn)` | 注册自定义 JS 函数，可在 SQL 中调用 |
| `db.isOpen` | 连接是否已打开 |
| `db.isTransaction` | 当前是否在事务中 |

> 支持 `Symbol.dispose`，可用 `using db = new DatabaseSync(...)` 语法自动关闭连接。

## 预编译语句（StatementSync）

| API | 返回 | 说明 |
|-----|------|------|
| `stmt.get(...params)` | 对象或 `undefined` | 取**第一行**结果（按列名对象） |
| `stmt.all(...params)` | 对象数组 | 取**全部**结果 |
| `stmt.iterate(...params)` | 迭代器 | 逐行迭代，适合大结果集省内存 |
| `stmt.run(...params)` | `{changes, lastInsertRowid}` | 执行写操作，返回**受影响行数**和**最后插入的自增 ID** |
| `stmt.columns()` | 数组 | 返回结果列信息 |

> 参数绑定：SQL 中用 `?`（按位置）或 `:name`（按名称）占位，**必须用占位符传值**，不要字符串拼接 SQL（防 SQL 注入）。同一语句可 `prepare` 一次、`run` 多次，性能更好。

## 数据类型转换

| SQLite 存储类 | JS 写入 | JS 读出 |
|---------------|---------|---------|
| `NULL` | `null` | `null` |
| `INTEGER` | `number` / `bigint` | `number` / `bigint`（可配置） |
| `REAL` | `number` | `number` |
| `TEXT` | `string` | `string` |
| `BLOB` | `TypedArray` / `DataView` | `Uint8Array` |

> 超出 JS 安全整数范围的 `INTEGER` 必须开启 `readBigInts`，否则抛 `ERR_OUT_OF_RANGE`。

## 其他

| API | 说明 |
|-----|------|
| `sqlite.backup(sourceDb, path[, options])` | 在线备份数据库到文件 |
| `sqlite.constants` | SQLite 常量（冲突解决、授权等） |
| `db.aggregate(name, options)` | 注册自定义聚合函数（如 `sum` 自定义版） |

> 事务：SQLite 支持 `BEGIN` / `COMMIT` / `ROLLBACK`，多条写操作包在事务里可大幅提速并保证原子性（`db.exec('BEGIN')` ... `db.exec('COMMIT')`）。
---
