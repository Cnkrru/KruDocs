# 响应式数据

## 概述

> 绑定响应式数据有两种：`ref()` 和 `reactive()`

| 对比项 | ref | reactive |
|--------|-----|----------|
| 数据类型 | 支持基础类型和对象类型 | 只支持对象类型 |
| 基础类型 | 数字、字符串、布尔值、null、undefined | 不支持 |
| 对象类型 | 对象、数组等 | 对象、数组等 |
| 深度查询 | 需要手动 `deep: true` 开启深度查询 | 自动深度查询且无法关闭 |
| 访问方式 | 在 JS/TS 中需要用 `变量.value` 操作数据 | 直接 `变量` 操作数据 |
| 重新分配对象 | 不影响响应式 | 会**失去**响应式（可使用 `Object.assign` 整体替换） |
| 适用场景 | 适合基础类型 | 适合对象类型 |

---

## ref 创建：基本类型的响应式数据

- 作用：定义响应式变量。
- 语法：`let xxx = ref(初始值)`。
- 返回值：一个 `Ref` 对象，简称 `ref`，`ref` 的 `value` 属性是响应式的。
- 注意点：
  - `<script>` 中修改数据时必须是 `变量.value`
  - `<template>` 中不需要 `.value`，直接使用即可。

```vue
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
  </div>
</template>

<script setup lang="ts" name="Person">
    // 引入ref函数
     import {ref} from 'vue'

    // 定义响应式变量
    let name = ref('张三')    
    let age = ref(18)

    // 定义修改数据的函数
    function changeName(){
        name.value = '李四'
        console.log(name.value)
    }
    function changeAge(){
        age.value += 1 
        console.log(age.value)
    }
</script>
```

---

## ref 创建：对象类型的响应式数据

- 其实 `ref` 接收的数据可以是：**基本类型**、**对象类型**。
- 若 `ref` 接收的是对象类型，内部其实也是调用了 `reactive` 函数。
- 只需要在函数部分加上 `.value`，即可修改对象类型的响应式数据。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from 'vue'

// 数据
let car = ref({ brand: '奔驰', price: 100 })
let games = ref([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = ref({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})

console.log(car)

function changeCarPrice() {
  car.value.price += 10
}
function changeFirstGame() {
  games.value[0].name = '流星蝴蝶剑'
}
function test(){
  obj.value.a.b.c.d = 999
}
</script>
```

---

## reactive 创建：对象类型的响应式数据

- 作用：定义一个**响应式对象**（基本类型不要用它，要用 `ref`，否则报错）。
- 语法：`let 响应式对象 = reactive(源对象)`。
- 返回值：一个 `Proxy` 的实例对象，简称：响应式对象。
- 注意点：`reactive` 定义的响应式数据是"深层次"的。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeFirstGame">修改第一游戏</button>
    <button @click="test">测试</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive } from 'vue'

// 数据
let car = reactive({ brand: '奔驰', price: 100 })
let games = reactive([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = reactive({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})

function changeCarPrice() {
  car.price += 10
}
function changeFirstGame() {
  games[0].name = '流星蝴蝶剑'
}
function test(){
  obj.a.b.c.d = 999
}
</script>
```

---

## 补充：volar 插件

> 在 `<script>` 中一直写 `变量.value` 比较繁琐，可安装 Volar 插件自动补全 `.value`。