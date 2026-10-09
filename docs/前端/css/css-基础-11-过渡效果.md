## 1. 过渡效果（Transition）
- **作用**：为元素在不同状态之间切换时添加平滑过渡动画
- **实现方法**：
  ```css
  .element {
    transition: property duration timing-function delay;
  }
  ```
### 1.1 示例：按钮悬停效果

```css
.button {
  background-color: #3498db;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #2980b9;
}
```
---
> 基本就是用来做hover效果的