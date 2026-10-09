## 1. 核心实现步骤
- **定义动画关键帧**：使用@keyframes规则
- **设置动画属性**：如动画名称、持续时间、延迟等
- **应用动画**：将动画添加到目标元素
- **调整动画效果**：使用缓动函数和填充模式
---
## 2. CSS关键帧定义
```css
/* 定义动画 */
@keyframes animation-name {
  0% {
    /* 初始状态 */
  }
  50% {
    /* 中间状态 */
  }
  100% {
    /* 结束状态 */
  }
}
/* 简化版关键帧 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```
---
## 3. 动画属性
| 属性 | 说明 |
| --- | --- |
| **animation-name** | 指定动画名称 |
| **animation-duration** | 动画持续时间（如 1s） |
| **animation-timing-function** | 动画缓动函数（如 ease、linear） |
| **animation-delay** | 动画延迟时间（如 0.5s） |
| **animation-iteration-count** | 动画重复次数（如 infinite 无限循环） |
| **animation-direction** | 动画播放方向（如 alternate 交替） |
| **animation-fill-mode** | 动画填充模式（如 forwards 保持结束状态） |
| **animation-play-state** | 动画暂停paused，配合hover使用 |
---
## 4. 复合属性
| 写法 | 说明 |
| --- | --- |
| `animation: name duration timing-function delay iteration-count direction fill-mode` | 复合属性完整语法，依次设置动画名称、持续时间、缓动函数、延迟、重复次数、播放方向和填充模式 |
| `animation: fadeIn 1s ease 0s 1 forwards` | 示例：使用fadeIn动画，持续1秒，ease缓动，无延迟，播放1次，保持结束状态 |

---
## 5. 示例代码

```html
<div class="animated-element"></div>
```
```css
/* 定义旋转动画 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 应用动画 */
.animated-element {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%;
  animation: rotate 2s linear infinite;
}
```
---
## 6. 实现原理
- **关键帧**：定义动画的不同阶段状态
- **过渡**：浏览器自动计算关键帧之间的过渡效果
- **执行**：按照指定的时间和缓动函数执行动画
- **控制**：通过动画属性控制播放行为
---
> 没用过