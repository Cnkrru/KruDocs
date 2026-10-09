## 1 `{{}}`插值语法
- 配合`ref()`响应式数据使用
- 写法：
    - 在`script`区域创建好响应式数据
    - 在`template`区域：`{{ref_name}}`
---
## 2. `v-html`插标签语法
- 配合`ref()`响应式数据使用
- 写法：
    - 在`script`区域创建好响应式数据
    - 在`template`区域：`v-html = "ref_name"`
---
## 3. `:`属性绑定语法
- 增强了html的属性
    1. 支持js表达式
    2. 监听响应式数据
    3. 支持自定义props属性
- 写法：
    - 在`script`区域创建好响应式数据
    - 在`template`区域: `:<html的属性> = "ref_name"`
---
## 4. :class/:style语法
> class和style本来就是html的原生属性，这两个是对应的v-bind简写写法
1. `:class` = `classList.add()/remove()`
    1. bool式用法：
        - `:class = "class_name:ref_name" `
            - 根据条件来决定是否渲染
    2. array式用法
        - `:class = "[class_name_1,class_name_2]" `
            - 一次渲染多个
    3. string式用法
        - `:class = "class_name" `
            - 和普通的class一样
2. `:style` = `<>.style.<> = <>`
    1. 直接写css
        - `:style = "{css_key : css_value}"`
    2. 写css数组
        - `:style = "[css_object_1,css_object_2]" `
---
## 5. v-if/v-show语法
1. `v-if/v-else-if/v-else`
    - 接收的参数看作bool型
        - true/false，“值”/“”，1/0，都行
    - 按条件渲染对应页面，输出的html只有符合条件的才有
2. `v-show`
    - 接收参数看作bool型
    - 和`display`有关
---
## 6. 