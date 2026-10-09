# Cpp-sstream

## 1. 模块介绍

- **sstream**是标准库，用于字符串拼接与转换，iss流出（空格分），oss流入（转str）
- OK

---

## 2. 拼接

这个用fmt库更优雅，不用这个，标准库：std::ostringstream OSS，输出字符串流

```cpp
std::ostringstream oss;                             // 创建字符串流
oss << '<字符串>' << <数字> << '<字符串>';           // 流入字符串
std::string res = oss.str();                        // 将字符流转换为字符串
```

---

## 3. 字符串转数字

```cpp
std::istringstream iss("42 3.14 hello");            // iss流出字符串
int i;
double d;
std::string s;

iss >> i;    // i = 42
iss >> d;    // d = 3.14
iss >> s;    // s = "hello"
```

---

## 4. 数字转字符串

- oss
- `std::to_string(<数字>)`

---

## 5. 字符串拆分

### 5.1 符号拆分

```cpp
std::string line = "apple,banana,cherry";
std::string token;
std::vector<std::string> tokens;

// 按逗号拆分
std::istringstream iss(line);
while (std::getline(iss, token, ','))       // 以，为结尾为一行拆分iss流，取token存入数组
    tokens.push_back(token);
```

### 5.2 空格拆分

```cpp
std::istringstream iss("hello world foo bar");
std::string word;
while (iss >> word)
    fmt::print("{}\n", word);               // iss流遇到空格自带划分
```