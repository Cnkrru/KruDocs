# C++

## 1. 数据存储

### 1.1 基本数据类型
| 类型 | 描述 | 大小 | 取值范围 | 示例 |
| :- | :- | :- | :- | :- |
| **bool** | 布尔型 | 1字节 | true / false | `bool flag = true;` |
| **char** | 字符型 | 1字节 | -128 到 127 | `char c = 'A';` |
| **int** | 整型 | 4字节 | -2147483648 到 2147483647 | `int i = 100;` |
| **float** | 单精度浮点型 | 4字节 | ±3.4e-38 到 ±3.4e+38 | `float f = 3.14f;` |
| **double** | 双精度浮点型 | 8字节 | ±1.7e-308 到 ±1.7e+308 | `double d = 3.14;` |
| **auto** | 自动类型推导 | 取决于推导 | — | `auto x = 42;` // int |
| **decltype** | 声明类型 | 取决于推导 | — | `decltype(x) y = x;` |
---

### 1.2 复合类型
| 类型 | 描述 | 语法 | 示例 |
| :- | :- | :- | :- |
| **数组** | 相同类型元素的集合 | `类型 数组名[大小]` | `int arr[5] = {1, 2, 3, 4, 5};` |
| **结构体** | 不同类型元素的集合 | `struct 名 { 成员 };` | `struct Point { int x; int y; };` |
| **联合体** | 共用内存的不同类型 | `union 名 { 成员 };` | `union Data { int i; float f; };` |
| **枚举** | 命名的整型常量 | `enum 名 { 常量 };` | `enum Color { RED, GREEN, BLUE };` |
| **枚举类** | 强类型枚举（C++11） | `enum class 名 { 常量 };` | `enum class Color { RED, GREEN };` |
| **类** | 面向对象封装 | `class 名 { 成员 };` | `class Student { ... };` |
---

### 1.3 标准库容器
| 容器 | 头文件 | 描述 | 示例 |
| :- | :- | :- | :- |
| **string** | `<string>` | 字符串 | `string s = "hello";` |
| **vector** | `<vector>` | 动态数组 | `vector<int> v = {1, 2, 3};` |
| **map** | `<map>` | 键值对映射 | `map<string,int> m; m["a"] = 1;` |
| **unordered_map** | `<unordered_map>` | 哈希表 | `unordered_map<string,int> um;` |
| **set** | `<set>` | 有序集合 | `set<int> s = {3, 1, 2};` |
---

### 1.4 类型转换

```cpp
// C++ 风格转换
static_cast<int>(3.14)           // 编译时类型转换
dynamic_cast<Derived*>(base)     // 运行时安全检查（多态）
const_cast<const T*>(ptr)        // 添加/移除 const
reinterpret_cast<int*>(addr)     // 底层位模式转换

// 列表初始化（C++11 起推荐）
int a{42};
vector<int> v{1, 2, 3};
```

---

## 2. IO与流程控制

### 2.1 输入输出（C++ 风格）

#### 标准输出

```cpp
#include <iostream>
using namespace std;

cout << "Hello, world!" << endl;
int x = 42;
cout << "x = " << x << endl;   // 链式输出
```

#### 标准输入

```cpp
int age;
string name;
cin >> age;                    // 读取整数
cin >> name;                   // 读取字符串（遇空格停止）
getline(cin, name);            // 读取一行（含空格）
```

#### 格式化输出

```cpp
#include <iomanip>

cout << fixed << setprecision(2) << 3.14159;     // 3.14
cout << setw(8) << setfill('0') << 42;            // 00000042
cout << hex << 255 << " " << dec << 255;         // ff 255
```

---

### 2.2 流程控制

#### 条件语句

```cpp
if (条件) { ... }
else if (条件) { ... }
else { ... }
```

#### switch 语句

```cpp
switch (表达式) {
    case 值1: ...; break;
    case 值2: ...; break;
    default: ...;
}
```

#### 循环语句

```cpp
for (int i = 0; i < 10; i++) { ... }             // 传统 for
while (条件) { ... }                              // while
do { ... } while (条件);                          // do-while

// 范围 for（C++11）
vector<int> v = {1, 2, 3};
for (int x : v) { cout << x; }                   // 值拷贝
for (int& x : v) { x *= 2; }                     // 引用修改
for (const auto& x : v) { ... }                  // 只读引用（推荐）
```

---

## 3. 函数

### 3.1 函数基础

```cpp
// 函数定义
int add(int a, int b) {
    return a + b;
}

// 函数声明（原型）
int add(int a, int b);

// 函数调用
int result = add(3, 4);
```

---

### 3.2 C++ 函数特性

#### 函数重载（同名不同参）

```cpp
int max(int a, int b) { return a > b ? a : b; }
double max(double a, double b) { return a > b ? a : b; }
// 编译时根据参数类型决定调用哪个
```

#### 默认参数

```cpp
void print(string msg, int times = 1, char prefix = '>') {
    for (int i = 0; i < times; i++)
        cout << prefix << msg << endl;
}
print("hello");           // >hello
print("hi", 3, '*');      // *hi 三行
```

#### 内联函数

```cpp
inline int square(int x) { return x * x; }
// 建议编译器将函数体展开，减少调用开销（适合短小函数）
```

#### 函数模板

```cpp
template <typename T>
T max(T a, T b) {
    return a > b ? a : b;
}
max<int>(3, 4);        // 显式指定类型
max(3.0, 4.0);          // 隐式推导
```

---

### 3.3 参数传递方式

| 方式 | 语法 | 特点 | 适用场景 |
| :- | :- | :- | :- |
| **值传递** | `void f(T x)` | 拷贝副本，不影响原值 | 小对象、不需要修改 |
| **引用传递** | `void f(T& x)` | 直接操作原值，可修改 | 需要修改原值 |
| **const 引用** | `void f(const T& x)` | 不拷贝，不修改 | 大对象只读传递（推荐） |
| **右值引用** | `void f(T&& x)` | 移动语义，避免拷贝 | 临时对象、移动构造 |

```cpp
void by_value(string s) { ... }           // 拷贝
void by_ref(string& s) { s += "!"; }      // 修改原值
void by_cref(const string& s) { ... }     // 只读，不拷贝（高效）
void by_move(vector<int>&& v) { ... }     // 移动语义
```

---

### 3.4 Lambda 表达式（C++11）

```cpp
// 基本语法：[捕获列表](参数) -> 返回类型 { 函数体 }

auto add = [](int a, int b) -> int { return a + b; };
cout << add(3, 4);                              // 7

// 值捕获
int x = 10;
auto f1 = [x]() { return x + 1; };              // 拷贝 x

// 引用捕获
auto f2 = [&x]() { x += 1; };                   // 引用 x

// 隐式捕获
auto f3 = [=]() { ... };                        // 全部值捕获
auto f4 = [&]() { ... };                        // 全部引用捕获

// 泛型 lambda（C++14）
auto generic = [](auto a, auto b) { return a + b; };
```

---

## 4. 指针与引用

### 4.1 指针

```cpp
int a = 42;
int* p = &a;           // 指针声明 & 取地址
cout << *p;            // 解引用 → 42
*p = 100;              // 通过指针修改
cout << a;             // 100

int* q = nullptr;      // 空指针（C++11，推荐替代 NULL）
```

#### 指针运算

```cpp
int arr[3] = {10, 20, 30};
int* p = arr;
p++;                   // 指向下一个元素
cout << *p;            // 20
```

---

### 4.2 引用（C++ 特有）

引用是变量的别名，声明时必须初始化，不能重新绑定。

```cpp
int a = 42;
int& ref = a;           // ref 是 a 的引用
ref = 100;              // 修改 ref 等价于修改 a
cout << a;              // 100
```

| 特性 | 指针 | 引用 |
| :- | :- | :- |
| 初始化 | 可以不初始化，可重新赋值 | 必须初始化，不可重新绑定 |
| 空值 | 可为 `nullptr` | 不能为空 |
| 语法 | 需要 `*` 解引用 | 直接使用 |
| 适用 | 动态分配、数组、可选值 | 函数参数传递、操作符重载 |

---

### 4.3 引用与参数传递

```cpp
// 引用传参（修改原值）
void swap(int& a, int& b) {
    int tmp = a; a = b; b = tmp;
}

// const 引用传参（只读，不拷贝，高效）
void print(const vector<int>& v) {
    for (int x : v) cout << x;
}

// 返回引用（避免拷贝）
const string& getTitle(const Document& doc) {
    return doc.title;
}
```

---

### 4.4 智能指针（C++11）

自动管理内存，避免手动 `new/delete`。

```cpp
#include <memory>

// unique_ptr — 独占所有权
unique_ptr<int> p = make_unique<int>(42);
// 不能拷贝，只能移动

// shared_ptr — 共享所有权（引用计数）
shared_ptr<int> p1 = make_shared<int>(42);
shared_ptr<int> p2 = p1;        // 引用计数 +1
// 最后一个 shared_ptr 析构时自动释放

// weak_ptr — 弱引用，避免循环引用
weak_ptr<int> wp = p1;          // 不影响引用计数
if (auto sp = wp.lock()) {      // 提升为 shared_ptr
    cout << *sp;
}
```

#### 对比

| 类型 | 所有权 | 开销 | 适用场景 |
| :- | :- | :- | :- |
| 裸指针 | 无 | 无 | 非拥有关系、观察者 |
| `unique_ptr` | 独占 | 无额外开销 | 资源独占 |
| `shared_ptr` | 共享 | 引用计数（原子操作） | 多对象共享资源 |
| `weak_ptr` | 弱引用 | 少量 | 打破循环引用、缓存 |