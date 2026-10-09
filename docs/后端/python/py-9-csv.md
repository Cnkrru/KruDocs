# Py-CSV

> **说明**：写入和读取操作固定，不必背记，能看懂会用就行。写入时先规定表头，再依据表头填入对应数据。需要懂文件权限（w/r/...）。需要懂编码（不要忘记设置）。需要懂字典，字典读取方便转为json传输数据。

## 写入相关

| 分类 | 作用 | 函数名 | 参数 |
| --- | --- | --- | --- |
| **写入对象** | 创建CSV写入对象 | `csv.writer()` | 文件对象 |
| | 创建字典写入对象 | `csv.DictWriter()` | 文件对象, 字段名列表 |
| **写入方法** | 写入单行 | `writer.writerow()` | 列表 |
| | 写入多行 | `writer.writerows()` | 列表的列表 |
| | 写入表头 | `DictWriter.writeheader()` | 无 |

## 读取相关

| 分类 | 作用 | 函数名 | 参数 |
| --- | --- | --- | --- |
| **读取对象** | 创建CSV读取对象 | `csv.reader()` | 文件对象 |
| | 创建字典读取对象 | `csv.DictReader()` | 文件对象 |
| **读取方法** | 迭代读取行 | `reader` 迭代器 | 无 |

## 写入操作步骤

### 1. 基本写入（使用 csv.writer）

- 打开文件
  - 使用 `open()` 函数，设置模式为 `'w'`
  - 指定 `newline=''` 避免多余空行
  - 指定编码为 `'utf-8'` 支持中文
  ```python
  with open('example.csv', 'w', newline='', encoding='utf-8') as f:
  ```
- 创建写入器
  - 使用 `csv.writer(file_object)`
  ```python
  writer = csv.writer(f)
  ```
- 写入数据
  - 写入表头：`writer.writerow(['列1', '列2', ...])`
  - 写入数据行：`writer.writerow(['值1', '值2', ...])`
  - 可多次调用 `writerow()` 写入多行
  ```python
  writer.writerow(['姓名', '年龄', '城市'])
  writer.writerow(['张三', 25, '北京'])
  writer.writerow(['李四', 30, '上海'])
  ```

### 2. 字典写入（使用 csv.DictWriter）

- 定义字段名
  - 创建包含所有列名的列表：`fieldnames = ['列1', '列2', ...]`
  ```python
  fieldnames = ['姓名', '年龄', '城市']
  ```
- 打开文件
  - 使用 `open()` 函数，设置模式为 `'w'`
  - 指定 `newline=''` 和编码
  ```python
  with open('example_dict.csv', 'w', newline='', encoding='utf-8') as f:
  ```
- 创建字典写入器
  - 使用 `csv.DictWriter(file_object, fieldnames=fieldnames)`
  ```python
  writer = csv.DictWriter(f, fieldnames=fieldnames)
  ```
- 写入表头
  - 调用 `writer.writeheader()`
  ```python
  writer.writeheader()
  ```
- 写入数据
  - 使用字典形式写入：`writer.writerow({'列1': '值1', '列2': '值2', ...})`
  - 可多次调用 `writerow()` 写入多行
  ```python
  writer.writerow({'姓名': '赵六', '年龄': 35, '城市': '深圳'})
  writer.writerow({'姓名': '钱七', '年龄': 22, '城市': '杭州'})
  ```

## 读取操作步骤

### 1. 基本读取（使用 csv.reader）

- 打开文件
  - 使用 `open()` 函数，设置模式为 `'r'`
  - 指定编码为 `'utf-8'` 支持中文
  ```python
  with open('example.csv', 'r', encoding='utf-8') as f:
  ```
- 创建读取器
  - 使用 `csv.reader(file_object)`
  ```python
  reader = csv.reader(f)
  ```
- 读取数据
  - 迭代读取所有行
  - 可通过索引访问每行的列数据
  ```python
  for row in reader:
      print(row)  # 打印整行
      print(row[0])  # 打印第一列
  ```

### 2. 字典读取（使用 csv.DictReader）

- 打开文件
  - 使用 `open()` 函数，设置模式为 `'r'`
  - 指定编码为 `'utf-8'` 支持中文
  ```python
  with open('example_dict.csv', 'r', encoding='utf-8') as f:
  ```
- 创建字典读取器
  - 使用 `csv.DictReader(file_object)`
  - 会自动使用第一行作为字段名
  ```python
  reader = csv.DictReader(f)
  ```
- 读取数据
  - 迭代读取所有行（返回字典）
  - 通过字段名访问数据
  ```python
  for row in reader:
      print(row)  # 打印整行（字典形式）
      print(row['姓名'])  # 通过字段名访问
  ```