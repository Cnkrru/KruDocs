# Py-Openpyxl

> **说明**：Excel可以看作功能强大的csv，操作方式与csv类似。操作步骤：创建Excel -> 创建并进入sheet -> 修改sheet表单 -> 保存Excel。

## 写入操作

| 分类 | 作用 | 函数名 | 参数 |
| --- | --- | --- | --- |
| **工作簿写入** | 创建新的Excel工作簿 | `openpyxl.Workbook()` | 无 |
| | 创建新工作表 | `workbook.create_sheet()` | 工作表名称(可选) |
| | 删除工作表 | `workbook.remove()` | 工作表对象 |
| | 保存工作簿 | `workbook.save()` | 保存路径 |
| **工作表写入** | 合并单元格 | `worksheet.merge_cells()` | 单元格范围 |
| | 取消合并单元格 | `worksheet.unmerge_cells()` | 单元格范围 |
| | 删除指定行数 | `worksheet.delete_rows()` | 起始行号 |
| | 删除指定列数 | `worksheet.delete_cols()` | 起始列号 |
| **单元格写入** | 向工作表末尾添加一行 | `worksheet.append()` | 可迭代对象 |
| | 设置单元格 | `worksheet.cell()` | 行号, 列号, key |

## 读取操作

| 分类 | 作用 | 函数名 | 参数 |
| --- | --- | --- | --- |
| **工作簿读取** | 加载Excel工作簿 | `openpyxl.load_workbook()` | 文件名 |
| | 获取活动工作表 | `workbook.active` | 无 |
| | 获取所有工作表 | `workbook.sheetnames` | 无 |
| | 通过名称获取工作表 | `workbook[sheet_name]` | 工作表名称 |
| **工作表读取** | 获取最大行数 | `worksheet.max_row` | 无 |
| | 获取最大列数 | `worksheet.max_column` | 无 |
| | 迭代读取所有行 | `worksheet.iter_rows()` | 无 |
| | 迭代读取所有列 | `worksheet.iter_cols()` | 无 |
| **单元格读取** | 获取单元格 | `worksheet.cell()` | 行号, 列号 |
| | 通过坐标获取单元格 | `worksheet[cell_address]` | 单元格地址 |
| | 获取单元格值 | `cell.value` | 无 |

## 写入操作步骤

### 1. 创建并写入Excel文件

- 创建工作簿
  - 使用 `openpyxl.Workbook()`
  ```python
  excel = Workbook()
  ```
- 获取工作表
  - 获取活动工作表：`excel.active`
  - 设置工作表名称：`sheet.title = "工作表名称"`
  ```python
  sheet = excel.active
  sheet.title = "学生数据"
  ```
- 写入数据
  - 写入表头：`sheet.append(['列1', '列2', ...])`
  - 写入数据行：`sheet.append(['值1', '值2', ...])`
- 保存文件
  - 使用 `excel.save('文件路径')`
  ```python
  excel.save('student_data.xlsx')
  ```

### 2. 修改Excel文件

- 添加新行（写入数据）
  - 使用 `sheet.append(['值1', '值2', ...])`
- 修改数据
  - 通过坐标修改：`sheet['A1'] = '新值'`
  - 通过行列修改：`sheet.cell(row=1, column=1, value='新值')`
  ```python
  sheet['D2'] = 98  # 修改成绩
  sheet.cell(row=3, column=4, value=90)  # 修改成绩
  ```

## 读取操作步骤

- 加载工作簿
  - 使用 `openpyxl.load_workbook('文件路径')`
  ```python
  excel = load_workbook('student_data.xlsx')
  ```
- 获取工作表信息
  - 获取所有工作表：`excel.sheetnames`
  - 获取活动工作表：`excel.active`
  ```python
  print(f"工作表列表: {excel.sheetnames}")
  sheet = excel.active
  print(f"当前工作表: {sheet.title}")
  ```
- 读取特定单元格
  - 通过坐标读取：`sheet['A1'].value`
  - 通过行列读取：`sheet.cell(row=1, column=1).value`
  ```python
  print(f"A1单元格: {sheet['A1'].value}")
  print(f"B2单元格: {sheet.cell(row=2, column=2).value}")
  ```
- 读取所有数据
  - 使用 `sheet.iter_rows(values_only=True)` 迭代读取
  ```python
  for row in sheet.iter_rows(values_only=True):
      print(row)
  ```