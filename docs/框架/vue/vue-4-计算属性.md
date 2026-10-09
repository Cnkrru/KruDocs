# 计算属性

## 个人理解

> 计算属性相当于一个可以写内置逻辑的响应式数据。

| 项目 | 说明 |
|------|------|
| Input | `<script setup>` 内部的响应式变量 |
| Output | 计算属性的结果，该结果为响应式数据 |

---

## 与函数的区别

| 对比项 | 计算属性 | 函数 |
|--------|----------|------|
| 类型 | 响应式的数据 | 普通函数 |
| 缓存 | 计算结果会缓存起来 | 每次调用都会重新计算 |
| 缓存条件 | 只看 input 的数据，如果 input 不变，返回上次的缓存值 | 不适用 |

> 示例代码来自官网。

---

## 计算属性的读写

> 计算属性默认是只读的。

| 方法 | 说明 |
|------|------|
| `get()` | 获取计算属性的结果 |
| `set()` | 设置计算属性的结果 |

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

> 只读取、不修改的常见写法：

```vue
<script setup lang="ts" name="App">
  import {ref,computed} from 'vue'

  let firstName = ref('zhang')
  let lastName = ref('san')

  // 计算属性——只读取，不修改
  let fullName = computed(()=>{
    return firstName.value + '-' + lastName.value
  })

  function changeFullName(){
    fullName.value = 'li-si'
  }
</script>
```

---

## get 到上次的值

> 3.4+ 之后，可以给 `computed` 传参 `previous` 来获取上次的值。

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)

const alwaysSmall = computed((previous) => {
  if (count.value <= 3) {
    return count.value
  }

  return previous
})
</script>
```