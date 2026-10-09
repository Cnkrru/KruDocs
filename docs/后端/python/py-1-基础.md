# Python

## 注释与 I/O

### 1. 注释

| 类型 | 语法 |
|------|------|
| 单行注释 | `#` |
| 多行注释 | `"""……"""` |

---

### 2. I/O 操作

#### 输入

| 函数 | 说明 |
|------|------|
| `input()` | 可以把输出语句放里面输出 |

#### 输出

| 函数 | 说明 |
|------|------|
| `print()` | 输出不换行写法：`print("内容", end=" ")` |

#### 格式化输出

| 方法 | 语法 |
|------|------|
| 方法1 | `f"字符串{变量}"` |
| 方法2 | `"字符串%s, 字符串%d, 字符串%f" % (变量1, 变量2, 变量3)` |

---

## 数据存储

### 1. 单体存储

#### 数据类型

| 类型 | 说明 |
|------|------|
| 整形 | int |
| 浮点 | float |
| 字符 | string |
| 布尔 | bool (True/False) |

#### 数据操作

| 操作 | 语法 |
|------|------|
| 转化 | `目标类型(数据)` |
| 查询 | `type(数据)` |

---

### 2. 多项存储

#### 存储类型

| 类别 | 类型 |
|------|------|
| 有序 | 列表、元组、字符 |
| 无序 | 集合、字典 |

#### 存储定义

| 类别 | 类型 | 语法 |
|------|------|------|
| 有序 | 列表 | `[变量1, 变量2, 变量3...]` |
| 有序 | 元组 | `(变量1, 变量2, 变量3...)` |
| 有序 | 字符 | `"内容"` |
| 无序 | 集合 | `{变量1, 变量2, 变量3...}` |
| 无序 | 字典 | `{ID1:value1, ID2:value2, ...}` |

#### 存储操作

##### 有序

###### 列表

| 操作 | 方法 | 说明 |
|------|------|------|
| 增 | `列表.insert(下标, 元素)` | 在指定位置插入 |
| 增 | `列表.append(元素)` | 在末尾追加 |
| 增 | `列表.extend([其他容器])` | 扩展列表 |
| 删 | `列表.pop(下标)` | 删除指定位置元素 |
| 删 | `列表.remove(元素)` | 删除指定元素 |
| 删 | `列表.clear()` | 清空列表 |
| 改 | `列表[下标]=值` | 修改指定位置元素 |
| 查 | `列表.index(元素)` | 查找元素索引 |
| 查 | `列表.count(元素)` | 统计元素出现次数 |
| 查 | `len(列表)` | 获取列表长度 |

###### 元组

| 操作 | 方法 | 说明 |
|------|------|------|
| 增 | - | 元组不可修改 |
| 删 | - | 元组不可修改 |
| 改 | - | 元组不可修改 |
| 查 | `元组.index(元素)` | 查找元素索引 |
| 查 | `元组.count(元素)` | 统计元素出现次数 |
| 查 | `len(元组)` | 获取元组长度 |

> **备注**：元组具有不可修改的性质，所以只能查询。但是嵌套内层的元组可修改（伪修改）。

###### 字符

| 操作 | 方法 | 说明 |
|------|------|------|
| 增 | - | 字符串不可直接修改 |
| 删 | - | 字符串不可直接修改 |
| 改 | `字符.replace("字符1", "字符2")` | 替换字符 |
| 改 | `字符.split("#")` | 分割字符串 |
| 改 | `字符.strip("字符")` | 去除指定字符 |
| 查 | `字符.index("字符")` | 查找字符索引 |
| 查 | `字符.count("字符")` | 统计字符出现次数 |
| 查 | `len(字符)` | 获取字符串长度 |

##### 无序

###### 集合

| 操作 | 方法 | 说明 |
|------|------|------|
| 增 | `集合.add(元素)` | 添加元素 |
| 删 | `集合.remove(元素)` | 移除指定元素 |
| 删 | `集合.pop()` | 随机移除一个元素 |
| 删 | `集合.clear()` | 清空集合 |
| 改 | `集合1.difference(集合2)` | 返回差集 |
| 改 | `集合1.difference_update(集合2)` | 移除交集元素 |
| 改 | `集合1.union(集合2)` | 返回并集 |
| 查 | `len(集合)` | 获取集合长度 |

###### 字典

| 操作 | 方法 | 说明 |
|------|------|------|
| 增 | `字典[key]=value` | 添加键值对 |
| 删 | `字典.pop(key)` | 删除指定键 |
| 删 | `字典.clear()` | 清空字典 |
| 改 | `字典[key]=value` | 修改指定键的值 |
| 查 | `变量=字典[key]` | 通过键获取值 |
| 查 | `变量=字典[key1][key1.1]` | 获取嵌套值 |
| 查 | `字典.keys()` | 获取所有键 |
| 查 | `len(字典)` | 获取字典长度 |

#### 通用操作

| 操作 | 语法 | 说明 |
|------|------|------|
| 遍历 | `for` | 迭代容器 |
| 统计 | `len()` | 获取长度 |
| 最大 | `max()` | 获取最大值 |
| 最小 | `min()` | 获取最小值 |
| 转化 | `指定类型(容器)` | 类型转换 |
| 排序 | `sorted(容器)` | 正向排序 |
| 排序 | `sorted(容器, reverse=True)` | 反向排序 |

---

## 数据操作

### 1. 流程控制

#### 1.1 判断结构

##### 1.1.1 基本判断

| 语句 | 说明 |
|------|------|
| `if` 语句 | 单一条件判断 |
| `if...else` 语句 | 二选一条件判断 |
| `if...elif...elif...else` 语句 | 多条件判断 |

#### 1.2 循环结构

##### 1.2.1 while 循环

```python
while 条件:
    函数体
    break    # 终止循环
```

##### 1.2.2 for 循环

```python
for i in 数据体/range(a, b, step):
    函数体
```

#### 1.3 中止语句

##### 1.3.1 break

| 项目 | 内容 |
|------|------|
| 功能 | 中断循环，跳出本层循环，进入外层代码 |
| 使用场景 | 当满足某个条件时，需要立即终止循环 |

##### 1.3.2 continue

| 项目 | 内容 |
|------|------|
| 功能 | 中断当前迭代，返回循环开始处，继续下一次迭代 |
| 使用场景 | 当需要跳过当前迭代，继续下一次循环时 |

##### 1.3.3 pass

| 项目 | 内容 |
|------|------|
| 功能 | 空语句，用于占位 |
| 使用场景 | 用于继承，给函数体留空，只继承变量 |

#### 1.4 备注

- **可互相嵌套**：判断结构和循环结构可以相互嵌套
- **缩进**：4 个空格决定从属关系，Python 使用缩进来表示代码块

---

### 2. 函数

#### 2.1 变量作用域

##### 2.1.1 局部变量

| 项目 | 内容 |
|------|------|
| 定义 | 定义在函数内部的变量 |
| 作用范围 | 只作用于函数内部 |
| 生命周期 | 函数执行结束后，局部变量被销毁 |

##### 2.1.2 全局变量

| 项目 | 内容 |
|------|------|
| 定义 | 定义在程序头部的变量 |
| 作用范围 | 作用于整个程序 |
| 生命周期 | 程序运行期间一直存在 |

##### 2.1.3 修改全局变量

- **方法**：在函数内部使用 `global` 关键字声明变量
- **示例**：

```python
global variable_name
variable_name = new_value
```

#### 2.2 函数定义与调用

##### 2.2.1 定义

```python
def function_name(parameters):
    # 函数体
    return return_value
```

##### 2.2.2 调用

```python
result = function_name(arguments)
```

##### 2.2.3 备注

- **参数数量**：不限制
- **返回值**：可以是值、变量或 None
  - 可以返回多个值（以元组形式）
  - 有返回值的函数，调用时可以用变量接收

#### 2.3 函数传参方式

##### 2.3.1 固定参数

```python
def function_name(param1, param2, param3, ...):
    # 函数体
```

###### 2.3.1.1 位置传参

```python
function_name(arg1, arg2, arg3, ...)
# 参数位置与函数定义中的参数顺序一一对应
```

###### 2.3.1.2 关键字传参

```python
function_name(param3=arg3, param1=arg1, param2=arg2, ...)
# 使用键值对形式传参，参数顺序可以任意
```

###### 2.3.1.3 混合传参

```python
function_name(arg1, arg2, param3=arg3, ...)
# 前部分使用位置传参，后部分使用关键字传参
```

##### 2.3.2 不定参数

###### 2.3.2.1 可变位置参数

```python
def function_name(*args):
    # args 被视为元组
    # 接收参数不限制个数
```

###### 2.3.2.2 可变关键字参数

```python
def function_name(**kwargs):
    # kwargs 被视为字典
    # 接收参数不限制个数
    # 接收参数形式: key=value
```

##### 2.3.3 将函数作为参数

```python
def outer_function(inner_function):
    # 函数体
    result = inner_function()
    return result
```

> **备注**：实际上就是函数嵌套

#### 2.4 lambda 匿名函数

```python
lambda parameters: expression
```

**特点**：

- 函数体只能写一行
- 不需要使用 `return` 关键字，表达式的结果自动作为返回值
- 通常用于简单的、一次性的函数

**示例**：

```python
add = lambda x, y: x + y
result = add(3, 5)  # 结果为 8
```

---

## 面向对象

### 1. 对象基础

#### 1.1 概念

| 术语 | 说明 |
|------|------|
| 面向对象编程 | 一种编程范式，通过类和对象来组织代码 |
| 类 | 对象的模板，定义了对象的属性和方法 |
| 对象 | 类的实例，具有类定义的属性和方法 |

---

### 2. 成员变量

#### 2.1 定义方式

- **使用 `__init__` 方法定义**：初始化对象时自动设置属性
- **直接定义**：在类中直接定义类变量

#### 2.2 使用 `__init__` 方法定义

##### 定义

```python
class ClassName:
    def __init__(self, id1, id2, id3):
        self.id1 = id1
        self.id2 = id2
        self.id3 = id3
```

##### 调用

```python
obj = ClassName(value1, value2, value3)
```

#### 2.3 直接定义（不使用 `init`）

##### 定义

```python
class ClassName:
    id1 = value1
    id2 = value2
```

##### 赋值

```python
obj = ClassName()
obj.id1 = real_value1
obj.id2 = real_value2
```

---

### 3. 成员方法

#### 3.1 定义

```python
def method_name(self, param1, param2):
    # 方法体
```

#### 3.2 数据访问

- **变量**：`self.id`
- **形参**：方法定义时的参数

#### 3.3 方法调用

```python
obj.method_name(parameter1, parameter2)
```

#### 3.4 魔术方法

##### 3.4.1 `__str__`

```python
def __str__(self):
    return f"内容"
```

> **功能**：负责输出字符串。不使用该方法，会导致输出的是内存地址。

##### 3.4.2 `__lt__`

```python
def __lt__(self, other):
    return self.id < other.id
```

> **功能**：负责比较操作 > / <

##### 3.4.3 `__le__`

```python
def __le__(self, other):
    return self.id <= other.id
```

> **功能**：负责比较操作 >= / <=

##### 3.4.4 `__eq__`

```python
def __eq__(self, other):
    return self.id == other.id
```

> **功能**：负责比较操作 ==

---

### 4. 封装

#### 4.1 私有属性和方法

- **定义**：在原变量/函数前增加 `__` 即可
- **特点**：
  - 相当于该类的局部变量/局部函数
  - 只能让当前类使用，其他类使用不了

---

### 5. 继承

#### 5.1 直接继承

```python
class ChildClass(ParentClass1, ParentClass2):
    # 新类的内容
    pass
```

#### 5.2 复写

- **方法**：直接在子类里重新写一遍就行（之后调用会优先调用复写的）
- **调用父类原代码**：

```python
ParentClass.attribute
ParentClass.method()
```

---

### 6. 多态

#### 6.1 实现步骤

1. 先写一个父类模板
2. 再写 n 个子类
3. 给类赋值调用即可

#### 6.2 示例代码

##### 父类

```python
class ParentClass():
    def action1(self):
        pass
    def action2(self):
        pass
```

##### 子类

```python
class ChildClass1(ParentClass):
    def action1(self):
        # 函数体
        pass
    def action2(self):
        # 函数体
        pass

class ChildClass2(ParentClass):
    def action1(self):
        # 函数体
        pass
    def action2(self):
        # 函数体
        pass
```

##### 赋值调用

```python
# 1. 定义函数
def function_name(param: ParentClass):
    param.action1()
    param.action2()

# 2. 赋值子类
obj1 = ChildClass1()
obj2 = ChildClass2()

# 3. 调用
function_name(obj1)
function_name(obj2)
```

---

## 文件操作

### 1. 文件打开与关闭

#### 打开文件

```python
# 基本语法
file = open('文件路径', '模式')

# 常见模式
# 'r' - 只读模式（默认）
# 'w' - 写入模式（覆盖原有内容）
# 'a' - 追加模式（在文件末尾添加内容）
# 'b' - 二进制模式
# '+' - 读写模式
```

#### 关闭文件

```python
file.close()
```

#### 使用 with 语句（推荐）

```python
with open('文件路径', '模式') as file:
    # 文件操作
# 自动关闭文件
```

---

### 2. 文件读取

#### 读取全部内容

```python
with open('file.txt', 'r', encoding='utf-8') as file:
    content = file.read()
    print(content)
```

#### 逐行读取

```python
with open('file.txt', 'r', encoding='utf-8') as file:
    for line in file:
        print(line.strip())
```

#### 读取指定字节数

```python
with open('file.txt', 'r', encoding='utf-8') as file:
    content = file.read(100)  # 读取前100个字符
    print(content)
```

---

### 3. 文件写入

#### 写入内容

```python
with open('file.txt', 'w', encoding='utf-8') as file:
    file.write('Hello, World!\n')
    file.write('This is a test.\n')
```

#### 追加内容

```python
with open('file.txt', 'a', encoding='utf-8') as file:
    file.write('This is an append.\n')
```

---

### 4. 文件定位

#### 获取当前位置

```python
with open('file.txt', 'r', encoding='utf-8') as file:
    position = file.tell()
    print(f'当前位置: {position}')
```

#### 移动位置

```python
with open('file.txt', 'r', encoding='utf-8') as file:
    file.seek(10)  # 移动到第10个字节
    content = file.read()
    print(content)
```

---

### 5. 文件属性

#### 获取文件信息

```python
import os

# 文件大小
file_size = os.path.getsize('file.txt')
print(f'文件大小: {file_size} 字节')

# 文件修改时间
import time
mod_time = os.path.getmtime('file.txt')
print(f'修改时间: {time.ctime(mod_time)}')

# 文件是否存在
if os.path.exists('file.txt'):
    print('文件存在')
else:
    print('文件不存在')
```

---

### 6. 目录操作

#### 创建目录

```python
import os

# 创建单个目录
os.mkdir('new_directory')

# 创建嵌套目录
os.makedirs('parent/child/grandchild', exist_ok=True)
```

#### 删除目录

```python
import os

# 删除空目录
os.rmdir('empty_directory')

# 删除非空目录
import shutil
shutil.rmtree('non_empty_directory')
```

#### 列出目录内容

```python
import os

# 列出目录中的文件和子目录
entries = os.listdir('directory')
for entry in entries:
    print(entry)
```