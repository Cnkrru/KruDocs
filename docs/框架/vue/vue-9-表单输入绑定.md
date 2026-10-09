## 表单输入绑定

>`v-model`用来简化绑定

### 文本


```html
<p>{{ msg }}</p>
<input v-model="msg" type="text" placeholder="请输入">
```

---

### 多行文本
```html
<span>Multiline message is:</span> <p class="sample">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```
```css
.sample {
    white-space: pre-line;
}
```

---

### 复选按钮
```js
checkedNames: []
```
```html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

---

### 单选按钮
```html
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

---

### 下拉菜单
```html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

---

### 修饰符

| 修饰符 | 说明 |
|--------|------|
| `lazy` | 懒加载，不在 input 时实时更新，在 change 时更新 |
| `number` | 数字转换，将输入的字符串自动转换为数字 |
| `trim` | 自动去空格，去掉输入的字符串首尾空格 |
