# 解构响应式数据

## 概念

> 指的是从规定好的对象类型里拿出基础类型来操作，且解构出来的值依然保持响应式能力。

| 方法 | 说明 |
|------|------|
| `toRefs` | 批量转换，将一个响应式对象中的每一个属性转换为 `ref` 对象 |
| `toRef` | 单个转换，将指定属性转换为 `ref` 对象 |

> 注意：直接用 ES6 的结构赋值 `let { name, age } = person` 解构 `reactive` 对象会**丢失响应式**，需要用 `toRefs` / `toRef` 保证响应性。

---

## 示例代码

```vue
<template>
  <div class="person">
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h2>性别：{{person.gender}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeGender">修改性别</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,reactive,toRefs,toRef} from 'vue'

  // 数据
  let person = reactive({name:'张三', age:18, gender:'男'})

  // 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力
  let {name,gender} =  toRefs(person)

  // 通过toRef将person对象中的gender属性取出，且依然保持响应式的能力
  let age = toRef(person,'age')

  // 方法
  function changeName(){
    name.value += '~'
  }
  function changeAge(){
    age.value += 1
  }
  function changeGender(){
    gender.value = '女'
  }
</script>
```

---

## 个人理解

> 相当于给"对象解构"补上了响应式的短板：把对象里的属性一个个转成独立的 `ref`，解构后可单独操作且数据同步回原对象。