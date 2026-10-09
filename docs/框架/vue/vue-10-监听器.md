# 监听器

## 分类

| 监听器 | 说明 |
|--------|------|
| `watch` | 监听状态变化，执行回调函数 |
| `watchEffect` | 简化版监听器，自动判断参数，默认开启深度监听 |

---

## watch

- 作用：监视数据的变化（和 `Vue2` 中的 `watch` 作用一致）。
- 特点：`Vue3` 中的 `watch` 只能监视以下**四种数据**：
  1. `ref` 定义的数据。
  2. `reactive` 定义的数据。
  3. 函数返回一个值（`getter` 函数）。
  4. 一个包含上述内容的数组。

> `watch` 内部分为三部分：数据、函数、配置。

### 情况一：监视 ref 定义的【基本类型】数据

直接写数据名即可，监视的是其 `value` 值的改变。

```vue
<template>
  <div class="person">
    <h1>情况一：监视【ref】定义的【基本类型】数据</h1>
    <h2>当前求和为：{{sum}}</h2>
    <button @click="changeSum">点我sum+1</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,watch} from 'vue'
  // 数据
  let sum = ref(0)
  // 方法
  function changeSum(){
    sum.value += 1
  }
  // 监视
  const stopWatch = watch(sum,(newValue,oldValue)=>{
    console.log('sum变化了',newValue,oldValue)
    if(newValue >= 10){
      stopWatch()
    }
  })
</script>
```

### 情况二：监视 ref 定义的【对象类型】数据

直接写数据名，监视的是对象的【地址值】，若想监视对象内部的数据，要手动开启深度监视。

> 注意：
>
> - 若修改的是 `ref` 定义的对象中的属性，`newValue` 和 `oldValue` 都是新值，因为它们是同一个对象。
> - 若修改整个 `ref` 定义的对象，`newValue` 是新值，`oldValue` 是旧值，因为不是同一个对象了。

```vue
<template>
  <div class="person">
    <h1>情况二：监视【ref】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,watch} from 'vue'
  let person = ref({ name:'张三', age:18 })

  function changeName(){ person.value.name += '~' }
  function changeAge(){ person.value.age += 1 }
  function changePerson(){ person.value = {name:'李四',age:90} }

  watch(person,(newValue,oldValue)=>{
    console.log('person变化了',newValue,oldValue)
  },{deep:true})
</script>
```

### 情况三：监视 reactive 定义的【对象类型】数据

默认开启了深度监视。

```vue
<template>
  <div class="person">
    <h1>情况三：监视【reactive】定义的【对象类型】数据</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr>
    <h2>测试：{{obj.a.b.c}}</h2>
    <button @click="test">修改obj.a.b.c</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
  let person = reactive({ name:'张三', age:18 })
  let obj = reactive({ a:{ b:{ c:666 } } })

  function changeName(){ person.name += '~' }
  function changeAge(){ person.age += 1 }
  function changePerson(){ Object.assign(person,{name:'李四',age:80}) }
  function test(){ obj.a.b.c = 888 }

  // 监视 reactive 默认开启深度监视
  watch(person,(newValue,oldValue)=>{ console.log('person变化了',newValue,oldValue) })
  watch(obj,(newValue,oldValue)=>{ console.log('Obj变化了',newValue,oldValue) })
</script>
```

### 情况四：监视对象类型数据中的某个属性

1. 若该属性值**不是**【对象类型】，需要写成函数形式。
2. 若该属性值是【对象类型】，可直接写，也可写成函数，建议写成函数。

> 结论：监视对象里的属性最好写函数式；若是对象则监视的是地址值，需要关注对象内部时手动开启深度监视。

```vue
<template>
  <div class="person">
    <h1>情况四：监视【ref】或【reactive】定义的【对象类型】数据中的某个属性</h1>
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}</h2>
    <h2>汽车：{{ person.car.c1 }}、{{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台车</button>
    <button @click="changeC2">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
  let person = reactive({
    name:'张三',
    age:18,
    car:{ c1:'奔驰', c2:'宝马' }
  })

  function changeName(){ person.name += '~' }
  function changeAge(){ person.age += 1 }
  function changeC1(){ person.car.c1 = '奥迪' }
  function changeC2(){ person.car.c2 = '大众' }
  function changeCar(){ person.car = {c1:'雅迪',c2:'爱玛'} }

  // 属性是基本类型 → 写成函数式
  /* watch(()=> person.name,(newValue,oldValue)=>{ console.log('person.name变化了',newValue,oldValue) }) */

  // 属性是对象类型 → 直接写或写函数，推荐写函数
  watch(()=>person.car,(newValue,oldValue)=>{ console.log('person.car变化了',newValue,oldValue) },{deep:true})
</script>
```

### 情况五：监视上述的多个数据

```vue
<script lang="ts" setup name="Person">
  import {reactive,watch} from 'vue'
  let person = reactive({ name:'张三', age:18, car:{ c1:'奔驰', c2:'宝马' } })

  watch([()=>person.name,person.car],(newValue,oldValue)=>{
    console.log('person.car变化了',newValue,oldValue)
  },{deep:true})
</script>
```

---

## watch 配置参数

#### 深度监听

> 对于对象类型数据，直接监听无法获取内层数据，需要开启深层监听。`deep: true` 开启深度监听。

```js
watch(obj, (newVal, oldVal) => {console.log(newVal, oldVal)}, {deep: true})
```

#### 立即执行

> 有时希望 `watch` 内部的函数在初始化时立马执行一次。`immediate: true` 开启立即执行。

```js
watch(obj, (newVal, oldVal) => {console.log(newVal, oldVal)}, {immediate: true})
```

#### 一次性监听

> 有时希望 `watch` 内部的函数只能执行一次。`once: true` 开启一次性监听。

```js
watch(obj, (newVal, oldVal) => {console.log(newVal, oldVal)}, {once: true})
```

---

## watchEffect

- 是 `watch` 的简化自动版本：不用明确指出监视的数据，函数中用到哪些属性，那就监视哪些属性。

| 对比项 | 说明 |
|--------|------|
| 共同点 | 都能监听响应式数据的变化 |
| `watch` | 要明确指出监视的数据 |
| `watchEffect` | 不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性） |

### 示例代码

```vue
<template>
<div class="person">
    <h1>需求：水温达到50℃，或水位达到20cm，则联系服务器</h1>
    <h2 id="demo">水温：{{temp}}</h2>
    <h2>水位：{{height}}</h2>
    <button @click="changePrice">水温+1</button>
    <button @click="changeSum">水位+10</button>
</div>
</template>

<script lang="ts" setup name="Person">
import {ref,watch,watchEffect} from 'vue'
let temp = ref(0)
let height = ref(0)

function changePrice(){ temp.value += 10 }
function changeSum(){ height.value += 1 }

// 用watch实现，需要明确指定监视 temp、height
watch([temp,height],(value)=>{
    const [newTemp,newHeight] = value
    if(newTemp >= 50 || newHeight >= 20){
        console.log('联系服务器')
    }
})

// 用watchEffect实现
const stopWtach = watchEffect(()=>{
    // 室温达到50℃，或水位达到20cm，立刻联系服务器
    if(temp.value >= 50 || height.value >= 20){
        console.log('联系服务器')
    }
    // 水温达到100，或水位达到50，取消监视
    if(temp.value === 100 || height.value === 50){
        console.log('清理了')
        stopWtach()
    }
})
</script>
```