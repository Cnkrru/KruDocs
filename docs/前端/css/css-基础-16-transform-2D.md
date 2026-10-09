## 1. 平面转换的具体效果

### 1.1 位移（translate）
| 方面 | 内容 |
| --- | --- |
| 作用 | 改变元素在平面内的位置 |
| 语法 | `transform: translate(x, y);` 或 `transform: translateX(x);` 或 `transform: translateY(y);` |
| 特点 | 不影响其他元素的布局；可以使用百分比（相对于自身尺寸）；常用于元素居中对齐 |
---
### 1.2 旋转（rotate）
| 方面 | 内容 |
| --- | --- |
| 作用 | 使元素绕原点旋转 |
| 语法 | `transform: rotate(角度);`（正数顺时针，负数逆时针） |
| 特点 | 默认绕元素中心点旋转；角度单位是 deg；取值正负均可，正值顺时针旋转，负值逆时针旋转 |
#### 1.2.1 改变转换原点
| 方面 | 内容 |
| --- | --- |
| 默认值 | 盒子中心点 |
| 属性 | `transform-origin: 水平原点位置 垂直原点位置;` |
| 取值 | 方位词：left、top、right、bottom、center；像素单位数值；百分比 |
| 示例 | 见下方代码块 |

```css
/* 绕左上角旋转 */
.element {
  transform-origin: left top;
}

/* 绕右下角旋转 */
.element {
  transform-origin: right bottom;
}

/* 绕自定义点旋转 */
.element {
  transform-origin: 50px 100px;
}
```
---
### 1.3 缩放（scale）
| 方面 | 内容 |
| --- | --- |
| 作用 | 改变元素的大小 |
| 语法 | `transform: scale(x, y);`（x、y为缩放比例）或 `transform: scale(比例);`（等比例缩放） |
| 特点 | 默认以元素中心点为缩放原点；缩放比例大于1放大，小于1缩小 |
---
### 1.4 倾斜（skew）
| 方面 | 内容 |
| --- | --- |
| 作用 | 使元素在平面内倾斜 |
| 语法 | `transform: skew(x角度, y角度);` 或 `transform: skewX(角度);` 或 `transform: skewY(角度);` |
---
### 1.5 多重转换
| 方面 | 内容 |
| --- | --- |
| 概念 | 同时使用多个转换函数 |
| 语法 | `transform: translate() rotate() scale() skew();` |
| 技巧 | 先平移再旋转（见下方代码块） |
| 应用场景 | 如车轮滚动效果，需要同时实现位移和旋转 |

```css
/* 正确顺序：先平移再旋转 */
transform: translate() rotate();
/* 错误顺序：先旋转再平移（会导致平移方向也被旋转） */
transform: rotate() translate();
```
---
## 2. 与过渡配合使用
```css
.element {
  width: 100px;
  height: 100px;
  background-color: pink;
  transition: all 1s; /* 添加过渡效果 */
}
.element:hover {
  /* 组合使用多个转换效果 */
  transform: translate(800px) rotate(360deg) scale(2) skew(180deg);
}
```
---
> 没写过，做特效用的