# Cpp-vector

## 1. 模块介绍

- **vector**是标准库的动态数组，对标py的数组
- OK

---

## 2. 常用操作

### 2.1 创建

```cpp
std::vector<int> list = {1, 2, 3, 4}                                // 一维数组
std::vector<std::vector<int>> grid(3, std::vector<int>(4, 0));      // 二维数组
```

### 2.2 方法

| 方法 | 说明 |
| --- | --- |
| `list.sort(list.begin(), list.end())` | 从头到尾排序 |
| `list.push_back(<数字>)` | 尾部压入数字 |
| `list.pop_back(<数字>)` | 尾部弹出数字 |
| `list.insert(<参数>)` | 插入数字 |
| `list.erase(<参数>)` | 删除数字 |
| `list.clear()` | 清空 |
| `list.size()` | 查询数组大小 |
| `list.empty()` | 判断是否为空 |
| `list.capacity()` | 计算已分配的内存能容纳多少数 |
| `list.reserve(<参数>)` | 预分配空间 |
| `list.resize(<参数>)` | 改变内存大小 |
| `list.shrink_to_fit()` | 释放多余内存 |

### 2.3 遍历

```cpp
for (size_t i = 0; i < v.size(); i++)
    fmt::print("[{}]={} ", i, v[i]);
```