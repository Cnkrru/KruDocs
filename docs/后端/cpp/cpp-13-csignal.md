# Cpp-csignal

## 1. 模块介绍

- **csignal**是标准库，专用于捕获操作系统指令集信号
- OK

---

## 2. 用法（状态机）

```cpp
// 全局标志位（用于信号处理与主循环通信）
volatile sig_atomic_t g_running = 1;

// 信号处理函数
void signal_handler(int signal)
{
    if (signal == SIGINT) { g_running = 0; }
}

int main()
{
    // 注册信号处理函数
    std::signal(SIGINT, signal_handler);

    while (g_running) { /* <功能> */ }

    return 0;
}
```

---

## 3. 指令集

| 指令 | 作用 |
| --- | --- |
| SIGINT | 中断信号（Ctrl+C） |
| SIGTERM | 终止请求（kill 命令默认） |
| SIGABRT | 异常终止（abort() 函数调用） |
| SIGFPE | 算术异常（除以零、溢出） |
| SIGILL | 非法指令 |
| SIGSEGV | 段错误（访问非法内存） |
| SIGBUS | 总线错误 |
| SIGPIPE | 写无读者的管道 |