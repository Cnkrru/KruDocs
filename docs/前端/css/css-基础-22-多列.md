## 1. 多列布局属性
### 1.1 创建多列
| 属性 | 取值 | 作用 |
| --- | --- | --- |
| **column-count** | num（列数） | 指定元素应该被分割成的列数 |

**示例**：
```css
.container {
  column-count: 3; /* 分成3列 */
}
```
### 1.2 多列间隙
| 属性 | 取值 | 作用 |
| --- | --- | --- |
| **column-gap** | px（像素值） | 指定列之间的间隙大小 |

**示例**：
```css
.container {
  column-gap: 20px; /* 列间隙为20px */
}
```
### 1.3 多列宽度
| 属性 | 取值 | 作用 |
| --- | --- | --- |
| **column-width** | px（像素值） | 指定每列的宽度 |

**示例**：
```css
.container {
  column-width: 200px; /* 每列宽度为200px */
}
```
### 1.4 多列元素跨越
| 属性 | 取值 | 作用 |
| --- | --- | --- |
| **column-span** | all（跨越所有列） | 指定元素应该跨越多少列 |

**示例**：
```css
h2 {
  column-span: all; /* 标题跨越所有列 */
}
```
### 1.5 多列边框样式
| 属性 | 取值 | 作用 |
| --- | --- | --- |
| **column-rule-style** | solid（实线）等边框样式 | 指定列之间边框的样式 |

**示例**：
```css
.container {
  column-rule-style: solid; /* 列边框为实线 */
}
```
### 1.6 边框厚度
| 属性 | 取值 | 作用 |
| --- | --- | --- |
| **column-rule-width** | px（像素值） | 指定列之间边框的厚度 |

**示例**：
```css
.container {
  column-rule-width: 2px; /* 边框厚度为2px */
}
```
### 1.7 边框颜色
| 属性 | 取值 | 作用 |
| --- | --- | --- |
| **column-rule-color** | 颜色值 | 指定列之间边框的颜色 |

**示例**：
```css
.container {
  column-rule-color: #ccc; /* 边框颜色为灰色 */
}
```
---
## 2. 复合属性
| 属性 | 作用 | 语法 |
| --- | --- | --- |
| **column-rule** | 同时设置列边框的宽度、样式和颜色 | `column-rule: 2px solid #ccc;` |
| **columns** | 同时设置列数和列宽 | `columns: 3 200px;` |
---
> 没用过