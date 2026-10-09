# Cpp-cstring

## 1. 模块介绍

- **cstring**是C标准库的Cpp封装，用于内存操作与C风格的字符串操作（在这里只说内存操作）
- OK

---

## 2. memset（内存填充）

```cpp
void* memset(void* ptr, int value, size_t num);     // 给目标指针地址填充num_size大小的value字符
```

### 示例

```cpp
// 1. 清空结构体
struct config {
    int width;
    int heigh;
    std::string des;
}
config test;                            // 创建结构体变量
std::memset(&test, 0, sizeof(config));  // 取变量地址赋初值0

// 2. 填充缓冲区
int suffer[1000];
std::memset(suffer, 'A', 100);
```

---

## 3. memcpy（内存拷贝）

```cpp
void* memcpy(void* dest, const void* src, size_t num);  // 由源码copy到dist
```

### 示例

```cpp
std::memcpy(dist, src, 5 * sizeof(int));
```

---

## 4. memcmp（内存比较）

```cpp
int memcmp(const void* ptr1, const void* ptr2, size_t num);  // 比较两个地址的数值
```

### 示例

```cpp
// 1. 比较两个图片数据的哈希
unsigned char* hash1 = compute_hash(data1);
unsigned char* hash2 = compute_hash(data2);
if (std::memcmp(hash1, hash2, 32) == 0)  // 比较 32 字节的哈希
    fmt::print("图片内容相同\n");

// 2. 检查配置是否一致
if (std::memcmp(&config1, &config2, sizeof(Config)) != 0)
    fmt::print("配置已更改\n");
```

---

## 5. memmove（移动内存）

```cpp
void* memmove(void* dist, const void* src, size_t num);  // 将指定字节数的源地址的数据移动到目标地址，与copy相比，能操作重复地址的内存
```

### 示例

```cpp
int arr[] = {1, 2, 3, 4, 5, 6, 7};
// 将 arr[2..4] 移动到 arr[0..2]
std::memmove(arr, arr + 2, 3 * sizeof(int));  // arr = {3, 4, 5, 4, 5, 6, 7}
```