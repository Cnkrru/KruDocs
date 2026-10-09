# 文本 / 标记类元数据写法

> 这类文件的元数据**不是格式强制**的，多为社区/框架约定，可以自由添加或去除。

## 一、Markdown（frontmatter，可选）

### 常见字段
| 字段 | 说明 |
|------|------|
| title | 标题 |
| date | 日期 |
| tags | 标签（数组） |
| description | 描述 |
| author | 作者 |

### 写法（YAML frontmatter）
```markdown
---
title: 我的笔记
date: 2026-08-16
tags: [python, 教程]
description: 这是一篇笔记
---
# 正文内容
```

### 说明
- frontmatter 位于文件最顶部，用 `---` 包裹
- 需要配合解析工具（如 gray-matter、front-matter）读取
- 不是 Markdown 标准，去掉后仍可正常显示

## 二、HTML（`<meta>` 标签）

### 常见字段
| 字段 | 说明 |
|------|------|
| title | 页面标题 |
| description | 页面描述 |
| keywords | 关键词 |
| author | 作者 |
| charset | 字符集 |
| viewport | 视口 |

```html
<head>
  <meta charset="UTF-8">
  <meta name="description" content="页面描述">
  <meta name="keywords" content="关键词1, 关键词2">
  <meta name="author" content="作者">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
</head>
```

## 三、XML（XML 声明 + 自定义元素）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <meta>
    <created>2026-08-16</created>
    <author>作者</author>
  </meta>
  <content>正文</content>
</note>
```

- 元数据通过自定义元素组织，无统一标准
- 声明头部固定为 `<?xml version="1.0" encoding="..."?>`

## 四、JSON（无标准，自定义字段）

```json
{
  "meta": {
    "created": "2026-08-16",
    "author": "作者",
    "version": "1.0"
  },
  "data": {}
}
```

- JSON 没有强制元数据，靠约定字段（如 `meta`）组织

## 五、CSV / TXT / LOG（无元数据）

| 格式 | 元数据 |
|------|--------|
| CSV | 无（可选首行注释） |
| TXT | 无 |
| LOG | 无（行内自带时间戳） |

```csv
# 首行注释（约定，非常规）
name,age
John,30
```