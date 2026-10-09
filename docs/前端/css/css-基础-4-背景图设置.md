## 1. 背景图属性
### 1.1 基本属性
| 属性 | 说明 |
| --- | --- |
| **background-image** | 设置背景图像，`background-image: url('图像路径');` |
| **background-repeat** | 设置重复方式，`repeat`、`repeat-x`、`repeat-y`、`no-repeat` |
| **background-position** | 设置位置，关键字：`center`、`top`、`bottom`、`left`、`right`；百分比：`50% 50%`；像素值：`10px 20px` |
| **background-size** | 设置大小，`auto`、`cover`、`contain`、`100% 100%` |
| **background-attachment** | 设置滚动方式，`scroll`、`fixed`、`local` |
| **background-origin** | 设置背景图所属区域，`content-box`、`padding-box`、`border-box` |
> 一般一个路径+大小就行，不管那么多
---
### 1.2 复合属性
| 属性 | 说明 |
| --- | --- |
| **background** | 一次性设置多个背景相关属性，`background: #f0f0f0 url('bg.jpg') no-repeat center/cover fixed;` |
> 一般不这样写
---