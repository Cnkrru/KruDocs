# Cpp-ctime

## 1. 模块介绍

- **ctime**是标准库，时间戳，年月日时分秒相关库
- OK

---

## 2. 数据类型

| 类型 | 说明 |
| --- | --- |
| `time_t` | 时间戳 |
| `struct tm` | 结构体 |

---

## 3. API

```cpp
// 1. 获取当前时间
std::time_t now = std::time(nullptr);

// 2. 转化为字符串
char* time_str = std::ctime(&now);

// 3. 格式化时间（1.创建容器，2.获取当地时间，3.格式化输出）
char buffer[64];
std::tm* local = std::localtime(&now);
std::strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S", local);
```