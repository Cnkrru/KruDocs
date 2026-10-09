# Cpp-map

## 1. 模块介绍

- **map**是Cpp的kv库，对标py的字典（不如py灵活）
- 如果是有序map，则为红黑树，如果是无序map，则为kv表
- OK

---

## 2. 有序 map

### 2.1 创建

```cpp
std::map<std::string, int> kv;    // 创建一个名为kv的map映射表，表k为string类型，v为int类型
```

### 2.2 方法

| 方法 | 说明 |
| --- | --- |
| `kv['key'] = 1` | k-v的数据类型受到显示 |
| `kv.insert({'key', 1})` | insert方法 |
| `kv.erase('key')` | erase方法 |
| `kv.size()` | size方法 |
| `kv.empty()` | empty方法 |
| `kv.clear()` | clear方法 |
| `if (m.find("key") != m.end())` | find方法返回迭代器 |

### 2.3 遍历

```cpp
for (auto it = m.begin(); it != m.end(); ++it)
    fmt::print("{}: {}\n", it->first, it->second);
```

---

## 3. 无序 map

```cpp
std::unordered_map<std::string, int> kv;
```