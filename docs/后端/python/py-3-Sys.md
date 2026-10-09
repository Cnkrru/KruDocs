# Py-sys

## 1. 模块介绍

- **sys包**用于Python解释器以及系统参数的查看和操作
- OK

---

## 2. 常用函数

| 分类 | 函数名 | 参数 | 作用 | 使用场景 |
| --- | --- | --- | --- | --- |
| 程序相关 | `sys.argv` | 无 | 命令行参数列表，第一个元素是脚本名称 | 处理命令行输入参数 |
| | `sys.exit([arg])` | arg: 退出码(可选) | 退出当前程序，可选指定退出码 | 程序异常或完成时退出 |
| Python 解释器相关 | `sys.platform` | 无 | 返回当前操作系统平台标识符 | 跨平台兼容性判断 |
| | `sys.version_info` | 无 | 返回包含版本号的命名元组 | 版本兼容性检查 |
| | `sys.executable` | 无 | 返回Python解释器可执行文件路径 | 查找Python解释器位置 |
| | `sys.path` | 无 | 模块搜索路径列表 | 动态添加模块搜索路径 |
| | `sys.maxsize` | 无 | 返回Python支持的最大整数 | 整数范围判断 |
| 标准输入输出相关 | `sys.stdin` | 无 | 标准输入流对象 | 自定义输入处理 |
| | `sys.stdout` | 无 | 标准输出流对象 | 自定义输出处理 |
| | `sys.stderr` | 无 | 标准错误流对象 | 自定义错误处理 |

---

## 3. 使用示例

```python
import sys

def split():
    print("="*50)

print("程序开始……")

# 显示sys包所有功能
print("sys包函数如下:")
for i in dir(sys):
    print(i)
split()

# 命令行参数
print(f"命令行参数0: {sys.argv[0]}")
split()

# 查看py信息
print(f"py版本信息: {sys.version}")
split()
print(f"py解释器版本信息: {sys.version_info}")
split()
print(f"解释器位置: {sys.executable}")
split()
print(f"解释器支持最大字节数: {sys.maxsize}")
split()

# 模块搜索路径
print("模块路径如下: ")
for i in sys.path:
    print(i)
split()

# 当前电脑操作系统
print(f"当前操作系统是: {sys.platform}")

# 退出程序
sys.exit(0)
split()
```