# Q-JS：JS 逻辑 → QML 对照表

| 类型 | JS | QML 对应 | 说明 |
|------|-----|---------|------|
| 事件处理 | `element.onclick = fn` | `onClicked: fn` | 点击 |
| 事件处理 | `element.addEventListener('click', fn)` | `onClicked: fn` | 事件监听 |
| 事件处理 | `element.onmouseover` | `HoverHandler { onHoveredChanged: }` | 悬停 |
| 事件处理 | `element.onchange` | `onTextChanged` / `onCheckedChanged` / `onCurrentIndexChanged` | 值变化 |
| 事件处理 | `element.oninput` | `onTextEdited`（仅手动输入时触发） | 手动输入 |
| 事件处理 | `element.onfocus` | `onActiveFocusChanged` | 聚焦 |
| 事件处理 | `element.onblur` | `onActiveFocusChanged: if (!activeFocus) ...` | 失焦 |
| 事件处理 | `element.onscroll` | `Flickable.onContentYChanged` | 滚动 |
| 事件处理 | `window.onkeydown` | `Keys.onPressed` / `Shortcut { sequence: "..." }` | 键盘 |
| 事件处理 | `window.onresize` | `onWidthChanged` / `onHeightChanged` | 尺寸变化 |
| 事件处理 | `window.setTimeout(fn, 1000)` | `Timer { interval: 1000; onTriggered: fn }` | 延时一次 |
| 事件处理 | `window.setInterval(fn, 1000)` | `Timer { interval: 1000; repeat: true; onTriggered: fn }` | 循环定时 |
| 事件处理 | `new Promise(resolve => ...)` | 无原生对应，用 `Qt.callLater()` 或信号 + 状态机 | 异步 |
| DOM 操作 | `document.getElementById('id')` | `id: xxx` 直接引用 | 获取元素 |
| DOM 操作 | `document.querySelector('.cls')` | 无直接对应（QML 无 CSS 选择器） | CSS 选择器 |
| DOM 操作 | `element.classList.add('active')` | `states: [ State { name: "active" } ]` | 添加类 |
| DOM 操作 | `element.classList.remove('active')` | `state: ""` | 移除类 |
| DOM 操作 | `element.style.property = 'value'` | `element.property = value` | 修改样式 |
| DOM 操作 | `element.innerHTML = '...'` | `Text { text: "..." }` | 修改内容 |
| DOM 操作 | `element.setAttribute('data-x', val)` | `property var dataX: val` | 设置属性 |
| DOM 操作 | `element.appendChild(child)` | `children: [ child ]` 或动态创建 | 添加子节点 |
| DOM 操作 | `element.removeChild(child)` | `child.destroy()` | 删除子节点 |
| DOM 操作 | `element.cloneNode()` | `Qt.createQmlObject()` | 克隆节点 |
| DOM 操作 | `createElement('div')` | `Qt.createQmlObject('import QtQuick; Rectangle {}', parent)` | 创建元素 |
| DOM 操作 | `element.addEventListener('event', fn)` | `signal.connect(fn)` | 绑定事件 |
| DOM 操作 | `element.removeEventListener('event', fn)` | `signal.disconnect(fn)` | 解绑事件 |
| 数据与逻辑 | 变量声明 `let x = 10` | `property int x: 10` | 变量 |
| 数据与逻辑 | 常量 `const PI = 3.14` | `readonly property double pi: 3.14` | 常量 |
| 数据与逻辑 | 函数 `function add(a, b) { return a + b; }` | `function add(a, b) { return a + b; }` | 函数 |
| 数据与逻辑 | 箭头函数 `(x) => x * 2` | 直接支持 JS 箭头函数 | 箭头函数 |
| 数据与逻辑 | 对象 `{ name: 'Alice', age: 30 }` | `QtObject { property string name: "Alice"; property int age: 30 }` | 对象 |
| 数据与逻辑 | 数组 `[1, 2, 3]` | `[1, 2, 3]`（QML 中直接使用 JS 数组） | 数组 |
| 数据与逻辑 | `JSON.parse()` / `JSON.stringify()` | 直接可用（QML 内嵌 JS 引擎） | JSON |
| 数据与逻辑 | `console.log()` | `console.log()` 直接可用 | 日志 |
| 数据与逻辑 | `Math.random()` | `Math.random()` 直接可用 | 数学 |
| 数据与逻辑 | `Date.now()` | `Date.now()` 直接可用 | 时间 |
| 数据与逻辑 | 模板字符串 `` `Hello ${name}` `` | `"Hello " + name`（QML 中不支持模板字符串） | 字符串拼接 |
| 数据与逻辑 | `import` / `export` | `import "utils.js" as Utils` | 模块导入 |

## 框架对标（Vue → 原生 JS → QML）

> Vue 概念剥掉框架后落在原生 JS，再映射到 QML。独立于上方大表。

| 框架概念 (Vue) | 原生 JS | QML 对应 |
|----------------|---------|----------|
| `{{ title }}` 模板插值 | `el.textContent = title` | `text: title` 属性绑定 |
| `v-bind:class="{ active: isActive }"` | `el.classList.toggle('active', isActive)` | `state: isActive ? "active" : ""` |
| `v-bind:style="{ color: 'red' }"` | `el.style.color = 'red'` | `color: "red"` 直接属性 |
| `v-if="cond"` | `if (cond) appendChild(el); else el.remove()` | `visible: cond` |
| `v-show="cond"` | `el.style.display = cond ? '' : 'none'` | `opacity: cond ? 1.0 : 0.0` |
| `v-for="item in list"` | `for (const item of list) createElement(item)` | `Repeater { model: list }` |
| `v-model="input"` | `input.value` + `input.addEventListener('input', ...)` | `TextField { text: input; onTextChanged: input = text }` |
| `computed` | JS getter `get fullName() { return ... }` | 属性绑定表达式 |
| `watch` | `Object.defineProperty` setter / `addEventListener('change', fn)` | `on<Property>Changed` 信号处理器 |
| `props: ['title']` | 函数参数 / 对象属性 | `property string title` |
| `emit('update', val)` | `el.dispatchEvent(new CustomEvent('update', { detail: val }))` | `signal update(val)` + `onUpdate: ...` |
| `<slot>` | 原生 `<slot>`（Web Component）/ `innerHTML` | `default property alias children` |
| `provide / inject` | 全局对象 / 模块作用域变量 | `Qt.binding()` 或全局单例 |
| `nextTick(fn)` | `requestAnimationFrame(fn)` | `Qt.callLater(fn)` |
| `this.$refs.myRef` | `document.getElementById('myRef')` | `id: myRef` 直接引用 |
| `this.$router.push('/home')` | `history.pushState({}, '', '/home')` | `stackView.push("HomePage.qml")` |
| `this.$store.state.count` | 全局 `window.store` 对象 | 单例 `QtObject` 全局状态 |