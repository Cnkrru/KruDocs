## 系统环境变量（Machine）
> 环境变量用来配置一些路径/参数  
> 用户常用的是给shell解释器挂载子应用，比如python，pip，vcpkg等，一般用户能接触到的就是填一些路径
1. Windows 系统核心变量

| 变量名 | 值 | 作用 |
|--------|----|------|
| `ComSpec` | `C:\Windows\system32\cmd.exe` | 指定命令解释器（CMD）路径 |
| `OS` | `Windows_NT` | 标识操作系统为 Windows |
| `windir` | `C:\Windows` | Windows 安装目录 |
| `ProgramData` | `C:\ProgramData` | 程序公共数据目录 |
| `NUMBER_OF_PROCESSORS` | `20` | CPU 逻辑处理器数量 |
| `PROCESSOR_ARCHITECTURE` | `AMD64` | 处理器架构（64 位） |
| `PROCESSOR_IDENTIFIER` | `Intel64 Family 6...` | 处理器标识 |
| `PROCESSOR_LEVEL` | `6` | 处理器级别/代次 |
| `PROCESSOR_REVISION` | `b701` | 处理器修订版本 |
| `PATHEXT` | `.COM;.EXE;.BAT;...` | 可执行文件扩展名列表 |
| `PSModulePath` | `...\WindowsPowerShell\Modules;...` | PowerShell 模块搜索路径 |
| `DriverData` | `C:\Windows\System32\Drivers\DriverData` | 驱动数据目录 |
| `TEMP` / `TMP` | `C:\Windows\TEMP` | 系统临时文件目录 |
| `USERNAME` | `SYSTEM` | 当前系统账户名 |

2. Windows PATH 系统目录

| PATH 条目 | 作用 |
|-----------|------|
| `C:\Windows\system32` | Windows 核心系统目录 |
| `C:\Windows` | Windows 主目录 |
| `C:\Windows\System32\Wbem` | WMI（Windows 管理规范） |
| `C:\Windows\System32\WindowsPowerShell\v1.0\` | PowerShell |
| `C:\Windows\System32\OpenSSH\` | OpenSSH 客户端 |
| `C:\Program Files (x86)\Windows Kits\10\Windows Performance Toolkit\` | Windows 性能工具包 |

3. 第三方工具链变量

| 变量名 / PATH 条目 | 作用 |
|--------------------|------|
| `Path` 中的 `D:\deps_code\python3.12.7\`、`...\Scripts\` | Python 3.12.7 |
| `Path` 中的 `C:\Program Files\Common Files\Oracle\Java\javapath` | Java 运行时 |
| `Path` 中的 `C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common` | NVIDIA PhysX |
| `Path` 中的 `C:\Program Files\NVIDIA Corporation\NVIDIA NvDLISR` | NVIDIA 驱动服务 |
| `Path` 中的 `D:\deps_code\nvm`、`D:\deps_code\nodejs` | NVM / Node.js |
| `DokanLibrary2` | `C:\Program Files\Dokan\DokanLibrary-2.0.6\` | Dokan 用户态文件系统库 |
| `NIEXTCCOMPILERSUPP` | `...National Instruments\...\C\` | NI 外部编译器支持 |
| `VCPKG_HOST_TRIPLET` | `x64-mingw-dynamic` | vcpkg 主机构建三元组 |
| `ZES_ENABLE_SYSMAN` | `1` | 启用 Intel ZES 系统管理 |
| `VS100COMNTOOLS` | `...Visual Studio 10.0\Common7\Tools\` | VS2010 工具目录 |

---

## 用户环境变量（User）

| 变量名 | 值 | 作用 |
|--------|----|------|
| `JAVA_HOME` | `D:\deps_code\java25` | Java 25 安装目录（已从 java21 统一） |
| `MAVEN_HOME` | `D:\deps_code\maven` | Maven 构建工具目录 |
| `NVM_HOME` | `D:\deps_code\nvm` | NVM 安装目录 |
| `NVM_SYMLINK` | `D:\deps_code\nodejs` | NVM 符号链接（当前 Node 版本） |
| `VCPKG_ROOT` | `D:\deps_code\vcpkg` | vcpkg 包管理器根目录 |
| `TEMP` / `TMP` | `C:\Users\联想\AppData\Local\Temp` | 用户临时文件目录 |
| `OneDrive` | `C:\Users\联想\OneDrive` | OneDrive 同步目录 |
| `OneDriveConsumer` | `C:\Users\联想\OneDrive` | OneDrive 个人版目录 |
| `Path` | （见下方各工具链条目） | 可执行文件搜索路径 |

---
