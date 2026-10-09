将 CSV 文件转换为 Excel 表格 (xlsx)，仅使用标准库 (zipfile + xml) 实现。

```python
# -*- coding: utf-8 -*-
"""
CSV 转 XLSX 表格脚本 (csv_to_xlsx.py)
功能：将 CSV 文件转换为 Excel 表格 (xlsx)
用法：python csv_to_xlsx.py
说明：轮询式循环输入 CSV 源文件路径，可连续转换多个文件；
      仅使用标准库 (zipfile + xml)，无需第三方依赖；
      支持相对路径，以脚本所在目录为基准解析
"""

import os
import csv
import re
import zipfile
from xml.sax.saxutils import escape


# 脚本所在目录，作为相对路径的基准
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# XML 1.0 不允许的控制字符
_INVALID_XML = re.compile(r'[\x00-\x08\x0b\x0c\x0e-\x1f]')


def resolve_path(path):
    """将相对路径解析为基于脚本目录的绝对路径"""
    if not path or os.path.isabs(path):
        return path
    return os.path.join(SCRIPT_DIR, path)


def read_csv(filepath):
    """读取 CSV 文件，自动识别编码"""
    for enc in ('utf-8-sig', 'utf-8', 'gbk'):
        try:
            with open(filepath, 'r', encoding=enc, newline='') as f:
                return list(csv.reader(f))
        except UnicodeDecodeError:
            continue
    raise ValueError(f'无法识别文件编码: {filepath}')


def col_letter(index):
    """0 起始列索引转 Excel 列字母 (0->A, 25->Z, 26->AA)"""
    letters = ''
    index += 1
    while index:
        index, rem = divmod(index - 1, 26)
        letters = chr(65 + rem) + letters
    return letters


def is_number(text):
    """判断文本是否为数字"""
    try:
        float(text)
        return True
    except ValueError:
        return False


def build_sheet_xml(rows):
    """生成工作表 XML"""
    parts = [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">',
        '<sheetData>',
    ]
    for r_idx, row in enumerate(rows, 1):
        parts.append(f'<row r="{r_idx}">')
        for c_idx, cell in enumerate(row):
            ref = f'{col_letter(c_idx)}{r_idx}'
            text = _INVALID_XML.sub('', str(cell))
            if is_number(text):
                parts.append(f'<c r="{ref}"><v>{text}</v></c>')
            else:
                parts.append(f'<c r="{ref}" t="inlineStr"><is><t>{escape(text)}</t></is></c>')
        parts.append('</row>')
    parts.append('</sheetData>')
    parts.append('</worksheet>')
    return ''.join(parts)


def build_xlsx(rows):
    """构造 xlsx 包内容: {包内路径: 内容}"""
    return {
        '[Content_Types].xml': (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            '<Default Extension="xml" ContentType="application/xml"/>'
            '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
            '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
            '</Types>'
        ),
        '_rels/.rels': (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
            '</Relationships>'
        ),
        'xl/workbook.xml': (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
            'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            '<sheets>'
            '<sheet name="Sheet1" sheetId="1" r:id="rId1"/>'
            '</sheets>'
            '</workbook>'
        ),
        'xl/_rels/workbook.xml.rels': (
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'
            '</Relationships>'
        ),
        'xl/worksheets/sheet1.xml': build_sheet_xml(rows),
    }


def write_xlsx(filepath, files):
    """将 xlsx 包内容写入文件"""
    with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zf:
        for name, content in files.items():
            zf.writestr(name, content)


def ask_output_path(csv_path):
    """询问输出位置"""
    default = os.path.splitext(csv_path)[0] + '.xlsx'
    print()
    print(f'输出位置 (回车默认: {default}):')
    out_path = input('> ').strip()
    if not out_path:
        return default
    return resolve_path(out_path)


def convert(csv_path, out_path):
    """执行转换"""
    rows = read_csv(csv_path)
    write_xlsx(out_path, build_xlsx(rows))

    col_count = len(rows[0]) if rows else 0
    print(f'✓ 已转换: {csv_path} -> {out_path}')
    print(f'  共 {len(rows)} 行, {col_count} 列')


def main():
    print('=' * 40)
    print('     CSV 转 XLSX 表格工具')
    print('=' * 40)

    while True:
        print()
        print('请输入 CSV 源文件路径 (输入 q 退出):')
        csv_path = input('> ').strip()

        if csv_path.lower() in ('q', 'quit', 'exit'):
            print('再见!')
            break

        csv_path = resolve_path(csv_path)

        if not os.path.isfile(csv_path):
            print(f'✗ 文件不存在: {csv_path}')
            continue

        out_path = ask_output_path(csv_path)

        print()
        try:
            convert(csv_path, out_path)
        except Exception as e:
            print(f'✗ 转换失败: {e}')


if __name__ == '__main__':
    main()
```
