# Cpp-cstdlib

## 1. 模块介绍

- **cstdlib**是标准库，与系统信息和系统交互有关
- OK

---

## 2. 查询环境变量

关于环境变量：
- 挂载shell解释器子程序，注册shell子命令
- 一些系统级参数/文件夹路径

```cpp
// 获取环境变量
const char* var = std::getenv('PATH');
if (var) { fmt::print("环境变量存在{}", var); }
else { fmt::print("环境变量不存在\n"); }

// 封装成字符串获取
std::string get_env_or_default(const std::string& key, const std::string& default_val)
{
    const char* val = std::getenv(key.c_str());
    return val ? std::string(val) : default_val;
}
```

---

## 3. 执行系统命令

```cpp
int result = std::system("ls -la");         // Linux/macOS
int result_windows = std::system("dir");    // Windows

// 检查执行结果
if (result == 0) { fmt::print("命令执行成功\n"); }
else { fmt::print(fmt::fg(fmt::color::red), "命令执行失败，退出码: {}\n", result); }
```