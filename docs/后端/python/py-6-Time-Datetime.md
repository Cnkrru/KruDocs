# Py-Time-Datetime

## 1. 模块介绍

- **time模块**：提供时间相关的函数，如时间戳获取、程序暂停等
- **datetime模块**：提供更高级的日期和时间处理功能，如日期对象、时间间隔等。
- OK

---

## 2. time模块

| 分类 | 作用 | 函数名 | 参数 |
| --- | --- | --- | --- |
| **时间获取** | 当前时间戳 | `time.time()` | 无 |
| **程序控制** | 暂停执行 | `time.sleep(seconds)` | seconds: 睡眠时间(秒) |

---

## 3. datetime模块

| 分类 | 作用 | 函数名 | 参数 |
| --- | --- | --- | --- |
| **对象创建** | 创建指定时间对象 | `datetime.datetime(year, month, day[, hour, minute, second])` | year: 年, month: 月, day: 日 |
| **当前时间** | 当前本地日期时间 | `datetime.datetime.now([tz])` | tz: 时区(可选) |
| **属性访问** | 获取年、月、日 | `obj.year`, `obj.month`, `obj.day` | 无 |
| | 获取时、分、秒 | `obj.hour`, `obj.minute`, `obj.second` | 无 |
| | 获取星期几 | `obj.weekday()` | 无 |

---

## 4. 时间元组结构

| 索引 | 字段 | 取值范围 |
| --- | --- | --- |
| 0 | 年 | 如2023 |
| 1 | 月 | 1-12 |
| 2 | 日 | 1-31 |
| 3 | 时 | 0-23 |
| 4 | 分 | 0-59 |
| 5 | 秒 | 0-59 |
| 6 | 星期 | 0-6 (0表示周一) |

---

## 5. 使用示例

```python
import time
import datetime

def split():
    print('='*50)

'''
time模块
'''
split()
# 获取时间戳
print(f"时间戳为: {time.time()}")

split()
# 程序暂停1s
time.sleep(1)

'''
datetime模块
'''
now=datetime.datetime.now()     # 创建datetime实例

split()
# 获取当前时间
print(f"当前时间为： {now}")

split()
# 获取当前年月日，时分秒

print(f"当前年份为： {now.year}")
print(f"当前月份为： {now.month}")
print(f"当前日期为： {now.day}")

print(f"当前时刻为： {now.hour}")
print(f"当前分钟为： {now.minute}")
print(f"当前分钟为： {now.second}")

print(f"当前星期为： {now.weekday()+1}")
```