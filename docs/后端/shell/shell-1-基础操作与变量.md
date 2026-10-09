# 后端

---

## 1. 基本操作

### 1.1 脚本创建与执行

| 操作 | 命令 | 说明 |
|------|------|------|
| 创建脚本文件 | `touch script.sh` | 创建一个名为script.sh的脚本文件 |
| 添加执行权限 | `chmod +x script.sh` | 赋予脚本执行权限 |
| 执行脚本 | `./script.sh` | 在当前目录执行脚本 |
| 执行脚本（绝对路径） | `/path/to/script.sh` | 使用绝对路径执行脚本 |
| 通过bash执行 | `bash script.sh` | 即使没有执行权限也可以运行 |

### 1.2 基本命令

| 命令 | 作用 | 示例 |
|------|------|------|
| `echo` | 输出文本 | `echo "Hello World"` |
| `pwd` | 显示当前目录 | `pwd` |
| `ls` | 列出文件和目录 | `ls -la` |
| `cd` | 切换目录 | `cd /home/user` |
| `mkdir` | 创建目录 | `mkdir new_dir` |
| `rm` | 删除文件或目录 | `rm file.txt` |
| `cp` | 复制文件或目录 | `cp file.txt file_copy.txt` |
| `mv` | 移动或重命名文件 | `mv old.txt new.txt` |
| `cat` | 查看文件内容 | `cat file.txt` |
| `grep` | 搜索文本 | `grep "pattern" file.txt` |

---

## 2. 变量

### 2.1 变量定义与使用

```bash
# 定义变量
name="John"
age=25

# 使用变量
echo "Name: $name"
echo "Age: $age"

# 使用花括号避免变量名混淆
echo "${name}_doe"
```

### 2.2 变量类型

| 类型 | 说明 | 示例 |
|------|------|------|
| 局部变量 | 仅在当前脚本中有效 | `local var="value"` |
| 环境变量 | 在当前进程及其子进程中有效 | `export VAR="value"` |
| 位置参数 | 脚本执行时传递的参数 | `$1, $2, $3...` |
| 特殊变量 | 系统预定义的变量 | `$0, $#, $*, $@, $?, $$` |

### 2.3 特殊变量

| 变量 | 作用 |
|------|------|
| `$0` | 脚本名称 |
| `$1-$9` | 第1-9个位置参数 |
| `${10+}` | 第10个及以上位置参数 |
| `$#` | 位置参数个数 |
| `$*` | 所有位置参数作为单个字符串 |
| `$@` | 所有位置参数作为独立字符串 |
| `$?` | 上一个命令的退出状态码 |
| `$$` | 当前进程ID |
| `$!` | 上一个后台命令的进程ID |

### 2.4 变量操作

```bash
# 字符串长度
str="Hello"
echo "Length: ${#str}"

# 字符串截取
echo "${str:1:3}"  # 输出 "ell"

# 字符串替换（仅替换第一个匹配）
echo "${str/el/XX}"  # 输出 "HXXlo"

# 字符串替换（替换所有匹配）
echo "${str//l/XX}"  # 输出 "HeXXXXo"

# 字符串删除（从开头删除最短匹配）
path="/home/user/file.txt"
echo "${path#*/}"  # 输出 "home/user/file.txt"

# 字符串删除（从开头删除最长匹配）
echo "${path##*/}"  # 输出 "file.txt"

# 字符串删除（从结尾删除最短匹配）
echo "${path%/*}"  # 输出 "/home/user"

# 字符串删除（从结尾删除最长匹配）
echo "${path%%/*}"  # 输出 ""
```

### 2.5 变量赋值技巧

```bash
# 命令替换
current_date=$(date)
echo "Current date: $current_date"

# 算术运算
num1=10
num2=5
sum=$((num1 + num2))
echo "Sum: $sum"

# 条件赋值
unset var
default_value="default"
echo "${var:-$default_value}"  # 输出 "default"

# 读取用户输入
read -p "Enter your name: " username
echo "Hello, $username!"
```

---

## 3. 脚本示例

```bash
#!/bin/bash

# 脚本名称：shell_basics.sh
# 功能：演示Shell脚本基本操作和变量使用

# 定义变量
script_name="$0"
arg_count="$#"

# 输出脚本信息
echo "Script name: $script_name"
echo "Number of arguments: $arg_count"
echo "Arguments: $@"

# 检查参数
if [ $arg_count -eq 0 ]; then
    echo "No arguments provided"
elif [ $arg_count -eq 1 ]; then
    echo "One argument provided: $1"
else
    echo "Multiple arguments provided"
fi

# 算术运算
a=10
b=5
sum=$((a + b))
difference=$((a - b))
product=$((a * b))
quotient=$((a / b))

echo "Arithmetic operations:"
echo "$a + $b = $sum"
echo "$a - $b = $difference"
echo "$a * $b = $product"
echo "$a / $b = $quotient"

# 字符串操作
greeting="Hello, World!"
echo "Original string: $greeting"
echo "Length: ${#greeting}"
echo "Substring: ${greeting:7:5}"  # 从第7个字符开始，取5个字符
echo "Replaced: ${greeting/World/Shell}"

# 命令替换
echo "Current directory: $(pwd)"
echo "Current date: $(date)"
echo "Number of files: $(ls -l | wc -l)"

# 输出退出状态码
echo "Script completed with exit code: $?"
```

---

## 4. 注意事项

### 4.1 变量命名规则
- 变量名只能包含字母、数字和下划线
- 变量名不能以数字开头
- 变量名区分大小写

### 4.2 引号使用
- 双引号：允许变量展开，如 `echo "$name"`
- 单引号：禁止变量展开，如 `echo '$name'`
- 反引号：命令替换，如 `echo `date``

### 4.3 空格问题
- 变量赋值时等号两边不能有空格
- 条件判断中操作符两边必须有空格

### 4.4 脚本开头
- 建议在脚本开头添加 `#!/bin/bash` 来指定解释器

### 4.5 执行权限
- 脚本需要执行权限才能直接运行
- 使用 `chmod +x script.sh` 赋予执行权限