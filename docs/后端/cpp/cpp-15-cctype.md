# Cpp-cctype

## 1. 模块介绍

- **cctype**是标准库，判断/转换大小写
- OK

---

## 2. 判断类

| 函数 | 说明 |
| --- | --- |
| `std::isalpha(c)` | 是否为字母 (a-z, A-Z) |
| `std::isdigit(c)` | 是否为数字 (0-9) |
| `std::isalnum(c)` | 是否为字母或数字 |
| `std::isspace(c)` | 是否为空白字符（空格、tab、换行等） |
| `std::ispunct(c)` | 是否为标点符号 |
| `std::isupper(c)` | 是否为大写字母 |
| `std::islower(c)` | 是否为小写字母 |
| `std::iscntrl(c)` | 是否为控制字符 |
| `std::isgraph(c)` | 是否为可打印字符（除空格） |
| `std::isprint(c)` | 是否为可打印字符（含空格） |
| `std::isxdigit(c)` | 是否为十六进制数字 (0-9, a-f, A-F) |

---

## 3. 转换

| 函数 | 说明 |
| --- | --- |
| `std::tolower(c)` | 转换为小写 |
| `std::toupper(c)` | 转换为大写 |