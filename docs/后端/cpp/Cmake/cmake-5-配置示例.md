## 案例一：单文件可执行文件
```cmake
cmake_minimum_required(VERSION 3.16)
project(Hello VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(hello main.cpp)
```
```bash
cmake -B build -S . -DCMAKE_BUILD_TYPE=Release
cmake --build build
```
---
## 示例二：静态库 + 可执行文件
1. **顶层 `CMakeLists.txt`：**
```cmake
cmake_minimum_required(VERSION 3.16)
project(Calculator VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_subdirectory(src/lib)
add_subdirectory(src/app)
```
2. **`src/lib/CMakeLists.txt`：**
```cmake
add_library(calculator STATIC calculator.cpp)

target_include_directories(calculator PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}          # 同目录头文件
)
target_compile_options(calculator PRIVATE -Wall -Wextra)
```
3. **`src/app/CMakeLists.txt`：**
```cmake
add_executable(calc main.cpp)
target_link_libraries(calc PRIVATE calculator)
```
---
## 示例三：Header-Only 库（INTERFACE）
```cmake
add_library(string_utils INTERFACE)
target_include_directories(string_utils INTERFACE include/)
target_compile_features(string_utils INTERFACE cxx_std_20)   # 对使用者传递 C++ 标准
```
---
## 示例四：Qt6 + QML 项
```cmake
cmake_minimum_required(VERSION 3.21)
project(QtDemo VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)     # 处理 Q_OBJECT 宏
set(CMAKE_AUTORCC ON)     # 处理 .qrc 资源
set(CMAKE_AUTOUIC ON)     # 处理 .ui 界面

# Qt6 模块
find_package(Qt6 REQUIRED COMPONENTS Core Gui Widgets Quick)

# C++ 业务逻辑库
add_library(business STATIC
    src/models/task.cpp
    src/services/database.cpp
)
target_include_directories(business PUBLIC src/)
target_link_libraries(business PRIVATE Qt6::Core)

# QML 模块
qt_add_qml_module(app
    URI Demo
    VERSION 1.0
    QML_FILES
        qml/main.qml
        qml/pages/HomePage.qml
    RESOURCES
        resources/resources.qrc
)

# 主程序
qt_add_executable(demo
    src/main.cpp
    src/backend.cpp
)
target_link_libraries(demo PRIVATE
    business
    Qt6::Core Qt6::Gui Qt6::Widgets Qt6::Quick
)
```
---
