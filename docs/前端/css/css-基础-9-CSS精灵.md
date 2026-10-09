# CSS

---
## 1. CSS精灵（CSS Sprite）
### 1.1 实现步骤
1. 创建精灵图：将多个小图片合并成一张大图片
2. 创建盒子：创建与小图片尺寸相同的盒子
3. 设置背景：将盒子的背景设置为精灵图
4. 调整背景位置：通过`background-position`属性调整背景图的位置
### 1.2 核心代码
```css
.icon {
  width: 24px;
  height: 24px;
  background-image: url('sprite.png');
  background-repeat: no-repeat;
  background-position: -10px -20px; /* 取负数坐标 */
}
```
---
> 没写过，做小动画用的