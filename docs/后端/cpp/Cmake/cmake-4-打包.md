## C++ 标准
1. 标准版本设置:`set(CMAKE_CXX_STANDARD 20)`
2. 编译器CPP标准版本要求:`set(CMAKE_CXX_STANDARD_REQUIRED ON)`
    - 强制要求编译器使用设置的CPP版本
3. 禁用编译器拓展:`set(CMAKE_CXX_EXTENSIONS OFF)`
---
## 构建类型
| 类型 | 优化 | 调试信息 | 用途 |
|------|------|---------|------|
| Debug | -O0 | 有 | 日常开发 |
| Release | -O3 | 无 | 发布 |
| RelWithDebInfo | -O2 | 有 | 性能分析 |
| MinSizeRel | -Os | 无 | 最小体积 |

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Debug
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build                       # 单配置生成器（Ninja/Make）
cmake --build build --config Release      # 多配置生成器（VS/Xcode）
```
---
## 安装
```cmake
# 安装可执行文件
install(TARGETS myapp RUNTIME DESTINATION bin)

# 安装库（DLL 走 RUNTIME）
install(TARGETS mylib
    ARCHIVE DESTINATION lib      # 静态库
    LIBRARY DESTINATION lib      # 动态库
    RUNTIME DESTINATION bin      # DLL (Windows)
)
```

```bash
cmake --install build --prefix dist/   # 安装到指定目录
```
---
## 功能开关（option）
```cmake
option(BUILD_TESTS "Build tests" ON)
option(ENABLE_ASAN "Enable AddressSanitizer" OFF)

if(BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
endif()

if(ENABLE_ASAN)
    add_compile_options(-fsanitize=address)
    add_link_options(-fsanitize=address)
endif()
```