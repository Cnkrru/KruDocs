# Cpp-fstream

## 1. 模块介绍

- **fstream**是标准库的文件读写库
- OK

---

## 2. 打开模式

| 模式 | 作用 |
| --- | --- |
| in | 读取 |
| out | 写入 |
| app | 追加 |
| binary | 二进制 |

---

## 3. 写入

```cpp
std::ofstream out('<文件名>');              // 打开文件
out << '<内容>';                            // 输出指定字符串，有缓冲区
out.close();                                // 关闭文件
```

---

## 4. 读取

### 4.1 按行读

```cpp
std::ifstream in('<文件名>')                 // 打开文件
std::string var_s;                           // 创建字符串变量
while (std::getline(in, var_s))              // in模式读取指定文件存于字符串变量
    std::fmt::print(var_s)                   // 读一行输出一行
```

### 4.2 一次性全读完

```cpp
std::ifstream in('<文件名>')                                         // 打开文件
std::string var_s((std::istreambuf_iterator<char>(in)),              // 太长了，懒得记，还以为是封装好的get_all
                     std::istreambuf_iterator<char>());              // 大概率需要学习读写库的底层库，懒得学
std::fmt::print(var_s)                                               // 读一行输出一行
```

---

## 5. 追加写入

```cpp
std::ofstream out("test.txt", std::ios::app);       // 输出文件，模式，out+append，追加写入
out << "追加的一行\n";
```

---

## 6. 检查文件是否存在

```cpp
bool file_exists(const std::string& path)       // 取文件地址
{
    std::ifstream f(path);                      // 尝试流式写入
    return f.good();                            // 判断是否正常写入
}
```