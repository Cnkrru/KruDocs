# 后端

---

## 1. 运算符

### 1.1 算术运算符

| 运算符 | 描述 | 示例 |
|--------|------|------|
| `+` | 加法 | `$((a + b))` |
| `-` | 减法 | `$((a - b))` |
| `*` | 乘法 | `$((a * b))` |
| `/` | 除法（整数） | `$((a / b))` |
| `%` | 取模（余数） | `$((a % b))` |
| `**` | 幂运算 | `$((a ** b))` |
| `++` | 自增 | `((a++))` |
| `--` | 自减 | `((a--))` |

### 1.2 比较运算符

#### 1.2.1 数值比较

| 运算符 | 描述 | 示例 |
|--------|------|------|
| `-eq` | equal | `if [ $a -eq $b ]` |
| `-ne` | not equal | `if [ $a -ne $b ]` |
| `-gt` | greater than | `if [ $a -gt $b ]` |
| `-lt` | less than | `if [ $a -lt $b ]` |
| `-ge` | greater than or equal | `if [ $a -ge $b ]` |
| `-le` | less than or equal | `if [ $a -le $b ]` |

#### 1.2.2 字符串比较

| 运算符 | 描述 | 示例 |
|--------|------|------|
| `=` | 等于 | `if [ "$a" = "$b" ]` |
| `!=` | 不等于 | `if [ "$a" != "$b" ]` |
| `<` | 小于（按字典序） | `if [[ "$a" < "$b" ]]` |
| `>` | 大于（按字典序） | `if [[ "$a" > "$b" ]]` |
| `-z` | 字符串长度为0 | `if [ -z "$a" ]` |
| `-n` | 字符串长度不为0 | `if [ -n "$a" ]` |

### 1.3 文件测试运算符

| 运算符 | 描述 | 示例 |
|--------|------|------|
| `-e` | 文件存在 | `if [ -e file.txt ]` |
| `-f` | 是普通文件 | `if [ -f file.txt ]` |
| `-d` | 是目录 | `if [ -d dir ]` |
| `-s` | 文件大小不为0 | `if [ -s file.txt ]` |
| `-r` | 有读权限 | `if [ -r file.txt ]` |
| `-w` | 有写权限 | `if [ -w file.txt ]` |
| `-x` | 有执行权限 | `if [ -x file.txt ]` |
| `-L` | 是符号链接 | `if [ -L link.txt ]` |

### 1.4 逻辑运算符

| 运算符 | 描述 | 示例 |
|--------|------|------|
| `&&` | 逻辑与 | `command1 && command2` |
| `||` | 逻辑或 | `command1 || command2` |
| `!` | 逻辑非 | `if [ ! -e file.txt ]` |
| `-a` | 逻辑与（在test中） | `if [ $a -gt 0 -a $b -lt 10 ]` |
| `-o` | 逻辑或（在test中） | `if [ $a -gt 0 -o $b -lt 10 ]` |

### 1.5 赋值运算符

| 运算符 | 描述 | 示例 |
|--------|------|------|
| `=` | 简单赋值 | `a=10` |
| `+=` | 加法赋值 | `a+=5` |
| `-=` | 减法赋值 | `a-=5` |
| `*=` | 乘法赋值 | `a*=5` |
| `/=` | 除法赋值 | `a/=5` |
| `%=` | 取模赋值 | `a%=5` |

---

## 2. 流程控制

### 2.1 if 语句

#### 2.1.1 基本 if 语句

```bash
if [ 条件 ]; then
    # 条件为真时执行的命令
fi
```

#### 2.1.2 if-else 语句

```bash
if [ 条件 ]; then
    # 条件为真时执行的命令
else
    # 条件为假时执行的命令
fi
```

#### 2.1.3 if-elif-else 语句

```bash
if [ 条件1 ]; then
    # 条件1为真时执行的命令
elif [ 条件2 ]; then
    # 条件2为真时执行的命令
else
    # 所有条件都为假时执行的命令
fi
```

#### 2.1.4 使用双括号的条件表达式

```bash
if (( 条件 )); then
    # 条件为真时执行的命令
fi
```

#### 2.1.5 使用双方括号的条件表达式

```bash
if [[ 条件 ]]; then
    # 条件为真时执行的命令
fi
```

### 2.2 case 语句

```bash
case "变量" in
    值1)
        # 匹配值1时执行的命令
        ;;
    值2)
        # 匹配值2时执行的命令
        ;;
    *)
        # 匹配所有其他值时执行的命令
        ;;
esac
```

### 2.3 for 循环

#### 2.3.1 基本 for 循环

```bash
for 变量 in 值1 值2 值3...; do
    # 循环体命令
    echo $变量
done
```

#### 2.3.2 使用通配符的 for 循环

```bash
for 文件 in *.txt; do
    # 处理每个txt文件
    echo $文件
done
```

#### 2.3.3 类C风格的 for 循环

```bash
for ((i=1; i<=10; i++)); do
    # 循环体命令
    echo $i
done
```

### 2.4 while 循环

```bash
while [ 条件 ]; do
    # 循环体命令
done
```

### 2.5 until 循环

```bash
until [ 条件 ]; do
    # 循环体命令（条件为假时执行）
done
```

### 2.6 循环控制

#### 2.6.1 break 命令

```bash
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        break  # 跳出循环
    fi
    echo $i
done
```

#### 2.6.2 continue 命令

```bash
for i in {1..10}; do
    if [ $((i % 2)) -eq 0 ]; then
        continue  # 跳过当前循环，进入下一次循环
    fi
    echo $i
done
```

---

## 3. 示例脚本

### 3.1 算术运算符示例

```bash
#!/bin/bash

# 算术运算符示例
a=10
b=5

echo "a = $a, b = $b"
echo "a + b = $((a + b))"
echo "a - b = $((a - b))"
echo "a * b = $((a * b))"
echo "a / b = $((a / b))"
echo "a % b = $((a % b))"
echo "a ** b = $((a ** b))"

# 自增自减
((a++))
echo "a++ = $a"
((b--))
echo "b-- = $b"
```

### 3.2 条件判断示例

```bash
#!/bin/bash

# 条件判断示例
read -p "Enter a number: " num

if [ $num -gt 0 ]; then
    echo "Positive number"
elif [ $num -lt 0 ]; then
    echo "Negative number"
else
    echo "Zero"
fi

# 字符串比较
read -p "Enter yes or no: " answer

if [[ "$answer" == "yes" ]]; then
    echo "You entered yes"
elif [[ "$answer" == "no" ]]; then
    echo "You entered no"
else
    echo "Invalid input"
fi

# 文件测试
read -p "Enter a filename: " filename

if [ -e "$filename" ]; then
    if [ -f "$filename" ]; then
        echo "$filename is a file"
    elif [ -d "$filename" ]; then
        echo "$filename is a directory"
    fi
else
    echo "$filename does not exist"
fi
```

### 3.3 循环示例

```bash
#!/bin/bash

# for循环示例
echo "For loop with list:"
for fruit in apple banana cherry; do
    echo "I like $fruit"
done

echo "\nFor loop with numbers:"
for ((i=1; i<=5; i++)); do
    echo "Number: $i"
done

# while循环示例
echo "\nWhile loop:"
counter=1
while [ $counter -le 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# until循环示例
echo "\nUntil loop:"
counter=1
until [ $counter -gt 5 ]; do
    echo "Counter: $counter"
    ((counter++))
done

# case语句示例
echo "\nCase statement:"
read -p "Enter a day (1-7): " day

case $day in
    1)
        echo "Monday"
        ;;
    2)
        echo "Tuesday"
        ;;
    3)
        echo "Wednesday"
        ;;
    4)
        echo "Thursday"
        ;;
    5)
        echo "Friday"
        ;;
    6)
        echo "Saturday"
        ;;
    7)
        echo "Sunday"
        ;;
    *)
        echo "Invalid day"
        ;;
esac
```

### 3.4 循环控制示例

```bash
#!/bin/bash

# break示例
echo "Break example:"
for i in {1..10}; do
    if [ $i -eq 6 ]; then
        echo "Breaking at $i"
        break
    fi
    echo "$i"
done

# continue示例
echo "\nContinue example:"
for i in {1..10}; do
    if [ $((i % 2)) -eq 0 ]; then
        continue
    fi
    echo "Odd number: $i"
done
```

---

## 4. 注意事项

### 4.1 条件表达式中的空格
- 条件表达式中的方括号 `[ ]` 前后必须有空格
- 运算符两边也必须有空格，如 `[ $a -eq $b ]` 而不是 `[ $a-eq$b ]`

### 4.2 字符串比较
- 字符串比较时，建议使用双引号包围变量，如 `[ "$a" = "$b" ]`
- 避免因变量为空导致的语法错误

### 4.3 算术运算
- 使用 `$((...))` 进行算术运算
- 或使用 `let` 命令，如 `let "a = b + c"`

### 4.4 双括号与双方括号
- `((...))` 用于算术条件，不需要空格和引号
- `[[...]]` 用于高级字符串比较，支持模式匹配

### 4.5 循环中的变量作用域
- 在循环中声明的变量默认是全局的
- 如需局部变量，使用 `local` 关键字

### 4.6 case 语句的语法
- 每个分支以 `;;` 结束
- 最后的 `*)` 分支用于匹配所有其他情况

### 4.7 命令执行的逻辑
- `command1 && command2`：command1 成功执行后才执行 command2
- `command1 || command2`：command1 执行失败后才执行 command2