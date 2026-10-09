将 CSV 文件转换为 Markdown 表格，支持默认、左对齐、居中、右对齐四种格式。

```python
# -*- coding: utf-8 -*-
"""
CSV 转 Markdown 表格脚本 (csv_to_md_table.py)
功能：将 CSV 文件转换为 Markdown 表格
用法：python csv_to_md_table.py
说明：轮询式循环输入 CSV 源文件路径，可连续转换多个文件；
      支持相对路径，以脚本所在目录为基准解析
"""

import os
import csv


# 脚本所在目录，作为相对路径的基准
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


# 对齐方式配置: 序号 -> (名称, 分隔符)
ALIGN_OPTIONS = {
    '1': ('默认', '---'),
    '2': ('左对齐', ':---'),
    '3': ('居中', ':---:'),
    '4': ('右对齐', '---:'),
}


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


def to_md_table(rows, align):
    """将数据转换为 Markdown 表格"""
    if not rows:
        return ''

    col_count = max(len(row) for row in rows)

    def fmt_row(row):
        cells = [str(c).replace('|', '\\|') for c in row]
        cells += [''] * (col_count - len(cells))
        return '| ' + ' | '.join(cells) + ' |'

    lines = [fmt_row(rows[0])]
    lines.append('| ' + ' | '.join([align] * col_count) + ' |')
    lines.extend(fmt_row(row) for row in rows[1:])
    return '\n'.join(lines)


def ask_output_path(csv_path):
    """询问输出位置"""
    default = os.path.splitext(csv_path)[0] + '.md'
    print()
    print(f'输出位置 (回车默认: {default}):')
    out_path = input('> ').strip()
    if not out_path:
        return default
    return resolve_path(out_path)


def ask_align():
    """询问输出格式"""
    print()
    print('请选择输出格式:')
    for key, (name, sym) in ALIGN_OPTIONS.items():
        print(f'  {key}. {name} ({sym})')
    print()
    choice = input('请选择 (回车默认 1): ').strip()
    return ALIGN_OPTIONS.get(choice, ALIGN_OPTIONS['1'])[1]


def convert(csv_path, out_path, align):
    """执行转换"""
    rows = read_csv(csv_path)
    md = to_md_table(rows, align)

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(md)

    col_count = len(rows[0]) if rows else 0
    print(f'✓ 已转换: {csv_path} -> {out_path}')
    print(f'  共 {len(rows)} 行, {col_count} 列')


def main():
    print('=' * 40)
    print('     CSV 转 Markdown 表格工具')
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
        align = ask_align()

        print()
        try:
            convert(csv_path, out_path, align)
        except Exception as e:
            print(f'✗ 转换失败: {e}')


if __name__ == '__main__':
    main()
```
