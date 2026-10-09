# Py-os

## 1. 模块介绍

- **os包**用于处理文件系统
- OK

---

## 2. 常用函数

| 分类 | 函数名 | 参数 | 作用 |
| --- | --- | --- | --- |
| **增** | `os.mkdir()` | path: 目录路径 | 创建目录 |
| | `os.makedirs()` | path: 目录路径 | 创建多级目录 |
| **删** | `os.rmdir()` | path: 目录路径 | 删除目录 |
| | `os.remove(path)` | path: 文件路径 | 删除文件 |
| **修** | `os.rename(path1, path2)` | path1: 源路径, path2: 目标路径 | 重命名文件或目录 |
| | `os.replace(path1, path2)` | path1: 源路径, path2: 目标路径 | 替换文件或目录 |
| | `os.chdir(path)` | path: 目标目录路径 | 改变当前工作目录 |
| | `os.path.join(path1, path2)` | path1: 路径1, path2: 路径2 | 拼接路径 |
| **查** | `os.getcwd()` | 无 | 获取当前工作目录 |
| | `os.listdir(path)` | 无 | 获取当前工作目录下的所有文件和目录 |
| | `os.stat(path)` | path: 文件或目录路径 | 获取文件或目录的统计信息 |
| | `os.path.basename(path)` | path: 路径 | 获取文件名或目录名 |
| | `os.path.dirname(path)` | path: 路径 | 获取目录名 |
| | `os.path.abspath(path)` | path: 路径 | 获取绝对路径 |
| **校验** | `os.path.exists(path)` | path: 路径 | 校验路径是否存在 |
| | `os.path.isfile(path)` | path: 路径 | 校验是否为文件 |
| | `os.path.isdir(path)` | path: 路径 | 校验是否为目录 |
| | `os.path.isabs(path)` | path: 路径 | 校验是否为绝对路径 |
| **环境变量** | `os.environ` | 无 | 获取环境变量 |
| | `os.getenv(key)` | key: 环境变量名 | 获取环境变量的值 |
| | `os.putenv(key, value)` | key: 环境变量名, value: 环境变量值 | 设置环境变量的值 |
| **操作系统** | `os.name` | 无 | 获取操作系统 |
| | `os.sep` | 无 | 获取路径分隔符 |
| | `os.system(cmd)` | cmd: 系统命令 | 执行系统命令 |