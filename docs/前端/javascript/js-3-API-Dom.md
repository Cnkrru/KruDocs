# JS-2-DOM
## HTML
### 1. 插入HTML/TEXT
- innerHTML = '值'
  - 以HTML标记插入内容
- innerText = '值'
  - 以纯文本插入内容
> 一般不用，现在一般用框架，vue的响应式数据`{{}}`语法简化了这个步骤
### 2. DOM操作
- 增
  - createElement('标签名')
    - 创建新元素
  - cloneNode(true)
    - 克隆节点，参数布尔，true含后代
  - appendChild(子元素)
    - 在末尾插入子元素
  - insertBefore(新元素, 参考元素)
    - 在参考元素前面插入
  - createDocumentFragment()
    - 创建文档片段，批量挂载节点后一次性插入，减少重排
- 删
  - removeChild(要删除的元素)
    - 移除子元素
- 改
  - setAttribute('属性','值')
    - 设置属性
  - replaceChild(新元素, 旧元素)
    - 替换子元素
  - textContent = '值'
    - 修改文本
  - scrollTo({top, left, behavior})
    - 元素滚动到指定位置，behavior可平滑滚动
- 查
  - parentNode
    - 父节点
  - children
    - 元素子节点伪数组
  - nextElementSibling
    - 下一个兄弟节点
  - previousElementSibling
    - 上一个兄弟节点
  - scrollTop
    - 元素滚动位置距顶部的距离
  - scrollHeight
    - 元素完整高度，含不可见区域
  - clientHeight
    - 元素可视高度
  - documentElement / body / head
    - document的常用节点：根元素/body/head
- 弹窗
  - showModal()
    - 打开dialog模态弹窗
  - close()
    - 关闭dialog弹窗
> 增删改查DOM其实用的不多，很多功能不需要这个
---
## CSS
### 1. 获取选择器
- querySelector('css选择器')
  - 选择符合的第一个元素
- querySelectorAll('css选择器')
  - 选择符合的所有元素
- getElementById('id')
  - 按id选择元素
- getElementsByTagName('div')
  - 按标签名选择元素
- getElementsByClassName('w')
  - 按类名选择元素
> 一般只用querySelector选择类选择器
### 2. 操作元素样式属性
- classList.add/remove/toggle('类名')
  - 增删切换类名
- style.样式属性 = 值
  - 设置内联样式
- className = '类名'
  - 整体设置类名
- style.setProperty('属性', '值')
  - 以字符串设置CSS属性，可设置CSS变量
- style.getPropertyValue('属性')
  - 读取CSS属性或CSS变量的值
> 一般用classList增删改类名来实现一些功能，style有时候用，但是比较少，className基本不用
### 3. 操作表单元素属性
- 获取属性
  - DOM对象.属性名
- 设置属性
  - DOM对象.属性名 = 新值
- value = '值'
  - 表单值
- type = '类型'
  - 表单类型
- disabled = true
  - 禁用
- checked = true
  - 选中
- selected = true
  - 默认选中
### 4. 自定义属性
- data- 自定义属性
  - 标签上一律以 data- 开头，DOM上一律用dataset获取
- data-属性
  - `<标签 data-名="值">` 定义
- dataset.名
  - 获取定义的值
> 一般用不上，vue框架会自己打版本指纹，框架输出的都带有data,打指纹了
---
## JS
### 事件类型
- 鼠标事件
  - click
    - 鼠标单击事件
  - mouseenter
    - 鼠标经过事件
  - mouseleave
    - 鼠标离开事件
- 焦点事件
  - focus
    - 元素获得焦点事件
  - blur
    - 元素失去焦点事件
- 键盘事件
  - keydown
    - 键盘按下事件
  - keyup
    - 键盘释放事件
- 文本事件
  - input
    - 输入框输入事件
- 滚动事件
  - scroll
    - 元素滚动时触发，常用于返回顶部、进度条
- 加载事件
  - load
    - 资源加载完成触发，如script.onload、window.onload
### 事件绑定函数
- 冒泡绑定
  - addEventListener(事件类型, 处理函数, false)
  - 从触发元素开始，依次向上触发祖先元素的同名事件
- 捕获绑定
  - addEventListener(事件类型, 处理函数, true)
  - 从DOM根元素开始，依次向下触发目标元素的事件
- 阻止冒泡
  - 事件对象.stopPropagation()
  - 阻止事件向上传播，限制在当前元素内
- 阻止默认行为
  - 事件对象.preventDefault()
  - 阻止元素的默认行为，如链接跳转、表单提交等
- 解绑事件
  - removeEventListener(事件类型, 处理函数, [阶段])
  - 移除之前绑定的事件监听器
> 很多事件用click就行，事件绑定也只需要addEventListener
> 主要看事件类型和事件操作对象的属性