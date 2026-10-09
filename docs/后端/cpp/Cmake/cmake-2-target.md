## Target 类型

| 类型 | 作用 |代码 |
| --- |---| --- |
| 可执行文件 (EXE) | 二进制文件 | `add_executable()` |
| 静态库 (LIB) | 二进制 |`add_library(<name> STATIC ...)` |
| 动态库 (DLL) | 二进制（共用库） |`add_library(<name> SHARED ...)` |
| 模块库 (MOD) | 运行时加载，不链接 |`add_library(<name> MODULE ...)` |
| 头文件库 (Header-Only) | 只有头文件h |`add_library(<name> INTERFACE ...)` |
| 自定义目标 | 不产生文件，只执行命令 |`add_custom_target()` |
| 导入目标 (Import Target) | 导入外部已编译好的库 |`add_library(<name> IMPORTED ...)` |

## Target 属性
- 查看参数:`get_target_properties()`
- 设置参数:`set_target_properties()`
- 常用 Target 属性

| 属性 | 小写 |含义 | 示例值 |
|---|---|---|---|
| `CXX_STANDARD` | cxx_standard | C++ 标准 | `17`, `20`, `23` |
| `CXX_STANDARD_REQUIRED` | cxx_standard_required | 强制要求标准 | `ON` |
| `CXX_EXTENSIONS` | cxx_extensions | 是否启用编译器扩展 | `OFF` |
| `OUTPUT_NAME` | output_name | 输出文件名 | `myapp` |
| `POSITION_INDEPENDENT_CODE` | position_independent_code | 位置无关代码 | `ON` |
| `INTERFACE_INCLUDE_DIRECTORIES` | interface_include_directories | 对依赖者暴露的头文件路径 | --- |
| `INTERFACE_LINK_LIBRARIES` | interface_link_libraries | 对依赖者传递的链接库 | --- |
| `INTERFACE_COMPILE_DEFINITIONS` | interface_compile_definitions | 对依赖者传递的宏定义 | --- |

## 可见性控制
- public
    - 自己和依赖者都用
- private
    - 自己用
- interface
    - 依赖者用
- 传递规则
## Target 命令
- 头文件:`target_include_directories()`
- 编译宏:`target_compoile_definitions()`
- 链接库:`target_link_libraries()`
- 编译选项:`target_compile_options()`
## 生成器表达式 (Generator Expressions)
> 用来构建时按条件编译
- 按类型构建
    - debug:`$<$<CONFIG:Debug>:-O0 -g>`
    - release:`$<$<CONFIG:Release>:-O3 -DNDEBUG>`
- 按编译器
    - MSVC:`$<$<CXX_COMPILER_ID:MSVC>:/W4 /utf-8>`
    - GUN:`$<$<CXX_COMPILER_ID:GNU>:-Wall -Wextra>`
- 按平台
    - Windows:`target_link_libraries(myapp PRIVATE mylib $<$<PLATFORM_ID:Windows>:ws2_32>)`
