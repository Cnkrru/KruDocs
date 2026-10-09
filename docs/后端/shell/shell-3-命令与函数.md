# 后端

---

## 1. basename 命令

### 1.1 功能
`basename`命令用于从路径中提取文件名部分，去除路径前缀。

### 1.2 语法
```bash
basename [选项] 路径 [后缀]
```

### 1.3 选项

| 选项 | 描述 |
|------|------|
| `-a` | 支持多个路径参数 |
| `-s <后缀>` | 移除指定的后缀 |
| `-z` | 使用NUL字符分隔输出 |

### 1.4 示例

| 命令 | 输出 | 说明 |
|------|------|------|
| `basename /home/user/file.txt` | `file.txt` | 提取文件名 |
| `basename /home/user/file.txt .txt` | `file` | 提取文件名并移除.txt后缀 |
| `basename -s .txt /home/user/file.txt` | `file` | 使用-s选项移除.txt后缀 |
| `basename -a /home/user/file1.txt /home/user/file2.txt` | `file1.txt`<br>`file2.txt` | 处理多个路径 |
| `basename /home/user/` | `user` | 处理目录路径 |

---

## 2. dirname 命令

### 2.1 功能
`dirname`命令用于从路径中提取目录部分，去除文件名后缀。

### 2.2 语法
```bash
dirname [选项] 路径
```

### 2.3 选项

| 选项 | 描述 |
|------|------|
| `-z` | 使用NUL字符分隔输出 |
| `--help` | 显示帮助信息 |
| `--version` | 显示版本信息 |

### 2.4 示例

| 命令 | 输出 | 说明 |
|------|------|------|
| `dirname /home/user/file.txt` | `/home/user` | 提取目录路径 |
| `dirname /home/user/` | `/home` | 处理目录路径 |
| `dirname file.txt` | `.` | 没有路径时返回当前目录 |
| `dirname /` | `/` | 根目录返回自身 |
| `dirname /home` | `/` | 一级目录返回根目录 |

---

## 3. basename 和 dirname 的组合使用

### 3.1 示例

```bash
# 获取完整路径
full_path="/home/user/documents/report.pdf"

# 提取目录部分
dir_part=$(dirname "$full_path")
echo "目录: $dir_part"  # 输出: 目录: /home/user/documents

# 提取文件名部分
file_part=$(basename "$full_path")
echo "文件名: $file_part"  # 输出: 文件名: report.pdf

# 提取文件名（不含扩展名）
name_part=$(basename "$full_path" .pdf)
echo "文件名（不含扩展名）: $name_part"  # 输出: 文件名（不含扩展名）: report
```

---

## 4. 自定义函数

### 4.1 函数定义

#### 4.1.1 基本语法

```bash
# 方法1
function function_name {
    # 函数体
}

# 方法2
function_name() {
    # 函数体
}
```

### 4.2 函数参数

| 语法 | 说明 |
|------|------|
| `$1`, `$2`, `$3` | 函数参数通过位置参数访问 |
| `$0` | 表示脚本名称，不是函数参数 |
| `$#` | 参数个数 |
| `$*` 和 `$@` | 所有参数 |

### 4.3 函数返回值

| 方式 | 说明 |
|------|------|
| `return` | 返回退出状态码（0-255） |
| `echo` | 如需返回其他值，可使用`echo`输出，然后通过命令替换捕获 |

### 4.4 示例函数

#### 4.4.1 计算两数之和

```bash
add() {
    local a=$1
    local b=$2
    echo $((a + b))
}

# 使用
sum=$(add 5 3)
echo "5 + 3 = $sum"  # 输出: 5 + 3 = 8
```

#### 4.4.2 检查文件是否存在

```bash
file_exists() {
    local file=$1
    if [ -f "$file" ]; then
        return 0  # 文件存在
    else
        return 1  # 文件不存在
    fi
}

# 使用
if file_exists "test.txt"; then
    echo "文件存在"
else
    echo "文件不存在"
fi
```

#### 4.4.3 提取文件名（模拟basename）

```bash
my_basename() {
    local path=$1
    local suffix=$2

    # 提取文件名
    local filename=${path##*/}

    # 移除后缀（如果指定）
    if [ -n "$suffix" ]; then
        filename=${filename%$suffix}
    fi

    echo "$filename"
}

# 使用
echo $(my_basename "/home/user/file.txt")  # 输出: file.txt
echo $(my_basename "/home/user/file.txt" .txt)  # 输出: file
```

#### 4.4.4 提取目录路径（模拟dirname）

```bash
my_dirname() {
    local path=$1

    # 处理特殊情况
    if [ "$path" = "/" ]; then
        echo "/"
        return
    fi

    # 移除末尾的斜杠
    path=${path%/}

    # 提取目录部分
    local dir=${path%/*}

    # 如果没有目录部分，返回当前目录
    if [ -z "$dir" ]; then
        echo "."
    else
        echo "$dir"
    fi
}

# 使用
echo $(my_dirname "/home/user/file.txt")  # 输出: /home/user
echo $(my_dirname "file.txt")  # 输出: .
echo $(my_dirname "/")  # 输出: /
```

#### 4.4.5 递归列出目录内容

```bash
list_dir() {
    local dir=$1
    local indent=${2:-0}

    # 生成缩进
    local prefix=""
    for ((i=0; i<indent; i++)); do
        prefix="$prefix  "
    done

    # 列出目录中的文件
    for item in "$dir"/*; do
        if [ -d "$item" ]; then
            echo "${prefix}$(basename "$item")/"
            list_dir "$item" $((indent + 1))
        else
            echo "${prefix}$(basename "$item")"
        fi
    done
}

# 使用
list_dir "/home/user/documents"
```

### 4.5 函数作用域

#### 4.5.1 局部变量
使用`local`关键字声明局部变量，仅在函数内部有效：

```bash
global_var="全局变量"

my_function() {
    local local_var="局部变量"
    global_var="修改后的全局变量"
    echo "局部变量: $local_var"
    echo "全局变量: $global_var"
}

my_function
echo "函数外部的全局变量: $global_var"
echo "函数外部访问局部变量: $local_var"  # 不会输出任何内容
```

#### 4.5.2 环境变量
使用`export`关键字声明环境变量，可在子进程中访问：

```bash
set_env() {
    export MY_VAR="环境变量值"
}

set_env
echo "环境变量: $MY_VAR"
```

---

## 5. 实际应用示例

### 5.1 批量处理文件

```bash
process_files() {
    local dir=$1
    local extension=$2

    if [ ! -d "$dir" ]; then
        echo "目录不存在"
        return 1
    fi

    echo "处理目录 $dir 中的 $extension 文件..."

    for file in "$dir"/*.$extension; do
        if [ -f "$file" ]; then
            local filename=$(basename "$file")
            echo "处理文件: $filename"
            # 在这里添加处理逻辑
        fi
    done
}

# 使用
process_files "/home/user/documents" "txt"
```

### 5.2 备份文件

```bash
backup_file() {
    local file=$1

    if [ ! -f "$file" ]; then
        echo "文件不存在"
        return 1
    fi

    local dir=$(dirname "$file")
    local filename=$(basename "$file")
    local backup="$dir/${filename}.bak"

    cp "$file" "$backup"
    echo "已备份到: $backup"
}

# 使用
backup_file "/home/user/config.txt"
```

---

## 6. 注意事项

### 6.1 函数命名
- 函数名应使用小写字母和下划线
- 避免使用与系统命令相同的名称

### 6.2 参数处理
- 总是引用变量，避免空格和特殊字符导致的问题
- 使用`local`关键字声明局部变量，避免变量污染

### 6.3 错误处理
- 使用返回值表示函数执行状态
- 对于复杂函数，添加适当的错误检查

### 6.4 性能考虑
- 避免在循环中重复执行耗时操作
- 对于频繁调用的函数，优化其实现

### 6.5 可维护性
- 为复杂函数添加注释
- 将相关函数组织在一起
- 考虑将常用函数放在单独的文件中，通过`source`命令引入