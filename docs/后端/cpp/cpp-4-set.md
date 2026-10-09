# Cpp-set

## 1. 模块介绍

- **set**是集合，对标py的set集合，不同点在于Cpp的集合可以修改
- OK

---

## 2. 有序集合

### 2.1 创建

```cpp
std::set<int> set = {1, 2, 3};    // 不管你放入的元素是什么顺序，自带排序，py的集合也有这种特点
```

### 2.2 方法

| 方法 | 说明 |
| --- | --- |
| `set.insert(<>);` | 插入元素 |
| `set.erase(<>);` | 删除元素 |
| `set.size();` | 大小 |
| `set.empty();` | 判空 |
| `set.clear();` | 清空 |

---

## 3. 无序集合

```cpp
std::unordered_set<int> un_set = {1, 2, 3};    // 无序，哈希表
```