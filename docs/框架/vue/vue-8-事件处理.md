## 事件处理

### on
>`v-on`用于替代JavaScript原本烦杂的事件绑定方式

---

### 两种写法

| 写法 | 说明 | 示例 |
|------|------|------|
| 内联 | 直接在 HTML 标签上写逻辑 | `<button @click="say('hello')">Say hello</button>` |
| 箭头函数 | 内联写法中使用箭头函数 | `<button @click="(event) => warn('...')">Submit</button>` |
| 函数定义 | 在 `<script setup>` 中定义事件处理函数 | 在 script 中定义 `function say(msg) { ... }` |

```js
import { ref } from 'vue'

const count = ref(0)

function say(msg) {
    console.log(msg)
}
```
    
--- 

### 事件修饰符

> 事件修饰符可以便捷限制事件。

| 修饰符 | 说明 |
|--------|------|
| `.stop` | 阻止事件冒泡 |
| `.prevent` | 阻止默认行为 |
| `.self` | 仅当 event.target 是元素本身时触发 |
| `.capture` | 使用捕获模式 |
| `.once` | 事件只触发一次 |
| `.passive` | 滚动事件立即触发，不等待 onScroll 完成 |
```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<div @scroll.passive="onScroll">...</div>
```

---

### 按键修饰符

> 用于便捷绑定键盘按键事件。

| 修饰符 | 说明 |
|--------|------|
| `.enter` | 回车键 |
| `.tab` | Tab 键 |
| `.delete` | 捕获 Delete 和 Backspace 两个按键 |
| `.esc` | Escape 键 |
| `.space` | 空格键 |
| `.up` | 上方向键 |
| `.down` | 下方向键 |
| `.left` | 左方向键 |
| `.right` | 右方向键 |
| `.ctrl` | Ctrl 键 |
| `.alt` | Alt 键 |
| `.shift` | Shift 键 |
| `.meta` | Meta 键 |

---

### 鼠标按键修饰符

> 用于便捷绑定鼠标按键事件。

| 修饰符 | 说明 |
|--------|------|
| `.left` | 鼠标左键 |
| `.right` | 鼠标右键 |
| `.middle` | 鼠标中键 |
