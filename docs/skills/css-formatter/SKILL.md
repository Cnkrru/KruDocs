# CSS Formatter

CSS 格式化规范 SKILL，提供统一的 CSS 书写规范和检查标准。

## 作者

Author: TBD

## 规范说明

### 1. 格式规范

- 每对键值对独占一行
- 不允许同一行书写多对键值对

```css
/* 正确 */
.selector {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 错误 */
.selector { display: flex; justify-content: center; align-items: center; }
```

### 2. 布局规范

- 优先使用 Flex 布局
- 禁止使用 Grid 布局

### 3. 文件结构规范

每个 CSS 文件分为三个区域，用注释标识符分隔：

```
/* ========== 基础样式 ========== */

/* ========== 颜色变量引用 ========== */

/* ========== 媒体查询 ========== */
```

### 4. 媒体查询断点

| 断点 | 尺寸 |
|------|------|
| sm | 576px |
| md | 768px |
| lg | 1024px |
| xl | 1200px |
| xxl | 1400px |

### 5. 颜色管理规范

- 颜色变量统一定义在全局 `color.css` 文件中
- 基础样式初始化统一定义在全局 `style.css` 文件中
- 禁止在业务 CSS 文件中私自定义颜色变量
- 禁止在业务 CSS 文件中私自定义颜色值
- 所有颜色必须通过 CSS 变量引用

### 6. 文件职责

| 文件 | 职责 |
|------|------|
| `style.css` | 全局样式初始化、基础重置 |
| `color.css` | 全局颜色变量定义 |
| 组件 HTML 文件 | 组件 CSS 书写在 `<head>` 的 `<style>` 标签内，禁止外部引用组件级 CSS |