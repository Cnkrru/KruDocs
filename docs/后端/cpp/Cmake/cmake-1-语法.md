- CMake 使用自己的脚本语言，和后端语言比较像，支持条件/循环/函数，支持一些`基础库(列表，字符串，文件IO)`
## 最小 CMakeLists.txt
```cmake
cmake_minimum_required(VERSION 3.16)                # cmake最小版本依赖
project(HelloWorld VERSION 1.0.0 LANGUAGES CXX)     # 项目名和版本以及语言
add_executable(hello main.cpp)                      # 可执行文件
```
## 注释
- 单行注释:`#`
- 多行注释:`#[[]]`

## 变量
1. 定义:`set(var_name var_value)`
2. 引用:`message('')`
3. 作用域:函数体内,使用`PARENT_SCOPE`可传递至函数外
    - parent_scope:`scope -> 范围`，vue的style scoped与之相反，vue的是组件隔离
4. 常用内置变量
> 这些大写宏看着不习惯，弄一列小写的，都是简单单词，一目了然

| 变量 |小写| 含义 |
|---|---|---|
| `CMAKE_SOURCE_DIR` |cmake_source_dir| 顶层源码目录（最外层 CMakeLists.txt 所在） |
| `CMAKE_BINARY_DIR` |cmake_binary_dir| 顶层构建目录 |
| `CMAKE_CURRENT_SOURCE_DIR` |cmake_current_source_dir| 当前 CMakeLists.txt 所在源码目录 |
| `CMAKE_CURRENT_BINARY_DIR` |cmake_current_binary_dir| 当前 CMakeLists.txt 对应的构建目录 |
| `PROJECT_NAME` |project_name| 最近一次 `project()` 的项目名 |
| `PROJECT_SOURCE_DIR` |project_source_dir| 最近一次 `project()` 的源码目录 |
| `CMAKE_CXX_STANDARD` |cmake_cxx_standard| C++ 标准版本 |
| `CMAKE_BUILD_TYPE` |cmake_build_type| 构建类型（Debug/Release/...） |
| `CMAKE_INSTALL_PREFIX` |cmake_install_prefix| 安装目标路径 |

5. 缓存变量
> 用来记录一些载入缓存的配置
1. 写法:`set(变量名 默认值 CACHE 变量类型 描述文本)`
2. 变量类型:bool string path file_path
3. bool类变量的专属写法:
    - `option(变量名 描述文本 默认值)`


## if语句
1. if/elseif/else/endif
```cmake
if(condition)
    # ...
elseif(condition2)
    # ...
else()
    # ...
endif()
```
2. 常用条件表达式
- bool/比较/路径/平台判断
```cmake
# 布尔常量
if(ON)           # 真：ON, YES, TRUE, Y, 非零数
if(OFF)          # 假：OFF, NO, FALSE, N, 0, 空字符串

# 变量比较
if(MY_VAR)                        # 变量已定义且非假值
if(NOT DEFINED MY_VAR)            # 变量未定义
if("${MY_VAR}" STREQUAL "hello")  # 字符串相等
if(MY_VAR MATCHES "^hello")       # 正则匹配

# 数值比较
if(${NUM} EQUAL 5)                # 等于
if(${NUM} GREATER 3)              # 大于
if(${NUM} LESS 10)                # 小于

# 文件/路径
if(EXISTS "${CMAKE_SOURCE_DIR}/config.h")   # 文件/目录存在
if(IS_DIRECTORY "${CMAKE_SOURCE_DIR}/src")  # 是目录

# 平台判断
if(WIN32)                         # Windows（含 MSVC 和 MinGW）
if(APPLE)                         # macOS
if(UNIX)                          # Linux + macOS
if(MSVC)                          # MSVC 编译器
if(MINGW)                         # MinGW 编译器
```

## 循环语句
```cmake
# foreach 遍历列表
foreach(item IN LISTS MY_LIST)
    message("item: ${item}")
endforeach()

# foreach 范围
foreach(i RANGE 1 5)              # 1, 2, 3, 4, 5
    message("i = ${i}")
endforeach()

# foreach 步长
foreach(i RANGE 0 10 2)           # 0, 2, 4, 6, 8, 10
endforeach()

# while 循环
set(count 0)
while(count LESS 5)
    math(EXPR count "${count} + 1")
    message("count = ${count}")
endwhile()

# 提前退出
break()    # 跳出循环
continue() # 跳过本次迭代
```

## 函数与宏

```cmake
# 函数（有自己的作用域）
function(my_function arg1 arg2)
    message("arg1 = ${arg1}, arg2 = ${arg2}")
    message("extra args: ${ARGN}")     # 额外参数列表
    message("all args: ${ARGV}")       # 所有参数列表
    message("arg count: ${ARGC}")      # 参数个数
endfunction()

# 调用
my_function(hello world extra1 extra2)

# 宏（无独立作用域，直接展开到调用处）
macro(my_macro arg1)
    message("macro: ${arg1}")
endmacro()
```

## 列表操作

```cmake
set(MY_LIST a b c d)

# 列表长度
list(LENGTH MY_LIST len)          # len = 4

# 索引访问
list(GET MY_LIST 0 first)         # first = a
list(GET MY_LIST -1 last)         # last = d

# 追加/插入
list(APPEND MY_LIST e)            # a;b;c;d;e
list(INSERT MY_LIST 0 x)          # x;a;b;c;d;e

# 查找/删除
list(FIND MY_LIST b idx)          # idx = 1
list(REMOVE_ITEM MY_LIST c)       # 删除 c
list(REMOVE_AT MY_LIST 0)         # 删除第一个

# 过滤
list(FILTER MY_LIST INCLUDE REGEX "^[ab]")  # 保留以 a 或 b 开头的

# 子列表
list(SUBLIST MY_LIST 1 2 sub)     # sub = b;c

# 去重/排序
list(REMOVE_DUPLICATES MY_LIST)
list(SORT MY_LIST)
```

## 字符串操作

```cmake
set(MY_STR "hello world")

# 拼接
set(FULL "${MY_STR} !!!")         # hello world !!!

# 查找/替换
string(FIND "${MY_STR}" "world" pos)  # pos = 6
string(REPLACE "world" "cmake" out "${MY_STR}")  # hello cmake

# 提取子串
string(SUBSTRING "${MY_STR}" 0 5 sub)  # hello

# 大小写
string(TOUPPER "${MY_STR}" upper)      # HELLO WORLD
string(TOLOWER "${MY_STR}" lower)      # hello world

# 正则匹配/替换
string(REGEX MATCH "[a-z]+" first_word "${MY_STR}")  # hello
string(REGEX REPLACE "([a-z]+) ([a-z]+)" "\\2 \\1" rev "${MY_STR}")  # world hello
```

## 数学运算

```cmake
math(EXPR result "2 + 3 * 4")     # result = 14
math(EXPR result "100 / 3")       # 整数除法, result = 33
```

## 文件操作

```cmake
# 读取文件内容
file(READ "config.json" content)

# 按行读取
file(STRINGS "data.txt" lines)

# 遍历目录
file(GLOB sources "src/*.cpp")           # 不递归
file(GLOB_RECURSE all_sources "src/*.cpp")  # 递归

# 注意：GLOB 不会自动检测新文件，推荐用 CONFIGURE_DEPENDS (CMake 3.12+)
file(GLOB_RECURSE sources CONFIGURE_DEPENDS "src/*.cpp")

# 写入文件
file(WRITE "output.txt" "${content}")

# 创建目录
file(MAKE_DIRECTORY "${CMAKE_BINARY_DIR}/logs")

# 复制/重命名
file(COPY "config.json" DESTINATION "${CMAKE_BINARY_DIR}")
file(RENAME "old.txt" "new.txt")
```


## 项目结构模式

```cmake
# 顶层 CMakeLists.txt
cmake_minimum_required(VERSION 3.16)
project(MyProject VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 添加子目录
add_subdirectory(src)
add_subdirectory(tests)

# src/CMakeLists.txt
add_library(mylib STATIC
    mylib.cpp
    helper.cpp
)
target_include_directories(mylib PUBLIC include/)

add_executable(myapp main.cpp)
target_link_libraries(myapp PRIVATE mylib)

# tests/CMakeLists.txt
enable_testing()
add_executable(test_runner test_main.cpp)
target_link_libraries(test_runner PRIVATE mylib)
add_test(NAME mytests COMMAND test_runner)
```