# 文档类元数据写法

> Office 文档（docx/xlsx/pptx）用 **OOXML core properties**，PDF 用**文档信息字典**，都支持程序化读写。

## 一、Word / Excel / PPT（OOXML core properties）

### 常见字段
| 字段 | 说明 |
|------|------|
| dc:title | 标题 |
| dc:creator | 作者 |
| cp:lastModifiedBy | 最后修改者 |
| dcterms:created | 创建时间 |
| dcterms:modified | 修改时间 |
| cp:keywords | 关键词 |
| cp:subject | 主题 |

### 如何查看（解压 docx）
```bash
unzip -p doc.docx docProps/core.xml
```

### 如何写入（Python）
```python
from docx import Document

doc = Document('report.docx')
cp = doc.core_properties
cp.title = '报告标题'
cp.author = '作者'
cp.created = '2026-08-16'
doc.save('report.docx')
```

## 二、PDF（文档信息字典）

### 常见字段
| 字段 | 说明 |
|------|------|
| Title | 标题 |
| Author | 作者 |
| Subject | 主题 |
| Keywords | 关键词 |
| Creator | 创建工具 |
| Producer | 生成器 |
| CreationDate | 创建时间 |

### 如何查看
```bash
pdfinfo report.pdf
```

### 如何写入（Python pypdf）
```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader('report.pdf')
writer = PdfWriter()
writer.append_pages_from_reader(reader)
writer.add_metadata({
    '/Title': '报告标题',
    '/Author': '作者',
    '/Subject': '主题',
})
with open('report_new.pdf', 'wb') as f:
    writer.write(f)
```

## 三、EPUB（OPF 元数据）

| 字段 | 说明 |
|------|------|
| dc:title | 标题 |
| dc:creator | 作者 |
| dc:identifier | ISBN 等标识 |
| dc:language | 语言 |

```xml
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
  <dc:title>书名</dc:title>
  <dc:creator>作者</dc:creator>
  <dc:identifier>urn:isbn:9787...</dc:identifier>
</metadata>
```

## 四、RTF（头部信息）

| 字段 | 说明 |
|------|------|
| \title | 标题 |
| \author | 作者 |
| \creatim | 创建时间 |

```text
{\rtf1\ansi
{\info
{\title 文档标题}
{\author 作者}
}}
```