> 包管理器负责安装库，Cmake负责确定需要用哪些库  
> 在vcpkg里声明的库，在CmakeList里还要再声明一次
## vcpkg
1. 配置工具链
```bash
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE="[vcpkg-root]/scripts/buildsystems/vcpkg.cmake"
```
2. 用 vcpkg.json 声明依赖
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": ["fmt", "spdlog"]
}
```
## find_package
1. 找库`required`
```cmake
find_package(Qt6 REQUIRED COMPONENTS Core Gui Widgets Quick)
find_package(OpenSSL REQUIRED)
```
2. 使用库
```cmake
target_link_libraries(myapp PRIVATE Qt6::Core Qt6::Gui Qt6::Widgets Qt6::Quick)
```