# Py-colorama

## 1. 模块介绍

- **colorama**:用于在Python中添加ANSI颜色支持的库。
- OK

---

## 2. 常用函数

| 函数名 | 必选参数 | 作用 |
|-------|---------|------|
| `colorama.init([autoreset, convert, strip, wrap])` | 无 | 初始化colorama |
| `colorama.Fore` | 无 | 前景色常量 |
| `colorama.Back` | 无 | 背景色常量 |
| `colorama.Style` | 无 | 样式常量 |
| `colorama.deinit()` | 无 | 清理colorama |
| `colorama.reinit()` | 无 | 重新初始化colorama |

### init参数

| 参数名 | 类型 | 作用 |
|-------|------|------|
| `autoreset` | bool | 是否自动重置颜色 |
| `convert` | bool | 是否在Windows上转换ANSI代码 |
| `strip` | bool | 是否在非Windows平台上剥离ANSI代码 |
| `wrap` | bool | 是否包装sys.stdout/stderr |

## 3. 常用常量

### 前景色 Fore 常量

| 常量 | 作用 |
|------|------|
| `Fore.BLACK` | 黑色前景 |
| `Fore.RED` | 红色前景 |
| `Fore.GREEN` | 绿色前景 |
| `Fore.YELLOW` | 黄色前景 |
| `Fore.BLUE` | 蓝色前景 |
| `Fore.MAGENTA` | 洋红色前景 |
| `Fore.CYAN` | 青色前景 |
| `Fore.WHITE` | 白色前景 |
| `Fore.RESET` | 重置前景色 |

### 背景色 Back 常量

| 常量 | 作用 |
|------|------|
| `Back.BLACK` | 黑色背景 |
| `Back.RED` | 红色背景 |
| `Back.GREEN` | 绿色背景 |
| `Back.YELLOW` | 黄色背景 |
| `Back.BLUE` | 蓝色背景 |
| `Back.MAGENTA` | 洋红色背景 |
| `Back.CYAN` | 青色背景 |
| `Back.WHITE` | 白色背景 |
| `Back.RESET` | 重置背景色 |

### 样式 Style 常量

| 常量 | 作用 |
|------|------|
| `Style.DIM` | 暗淡模式 |
| `Style.NORMAL` | 正常模式 |
| `Style.BRIGHT` | 明亮模式 |
| `Style.RESET_ALL` | 重置所有样式 |

## 4. 示例用法

```python
import colorama
import logging

# 1.初始化
colorama.init()

# 2.初始化终端日志
logger = logging.getLogger() 
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
cmd_worker = logging.StreamHandler()
logger.addHandler(cmd_worker)

# 3.测试日志+ANSI库
logging.debug(colorama.Fore.GREEN+'这是一条调试信息')  
logging.info(colorama.Fore.BLUE+'应用启动成功')
logging.warning(colorama.Fore.YELLOW+'配置文件缺失，使用默认配置')
logging.error(colorama.Fore.RED+'API调用失败: 404 Not Found')
logging.critical(colorama.Fore.RED+'数据库连接失败') 
```