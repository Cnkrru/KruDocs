> - 知识来源：菜鸟教程
> - 站点网址：[Font Awesome 图标 | 菜鸟教程](https://www.runoob.com/font-awesome/fontawesome-tutorial.html)
---
> - 一般通过CDN调用
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```
---
### 增加图标大小
- fa-lg
- fa-2/3/4/5x
```html
<i class="fa fa-car fa-lg"></i>
<i class="fa fa-car fa-2x"></i>
<i class="fa fa-car fa-3x"></i>
<i class="fa fa-car fa-4x"></i>
<i class="fa fa-car fa-5x"></i>
```
---
### 固定宽度图标
- fa-fw
```html
<div class="list-group">
  <a href="#" class="list-group-item"><i class="fa fa-home fa-fw"></i> Home</a>
</div>
```
---
### 改变图标位置
- fa-pull-right/left
```html
<i class="fa fa-quote-left fa-3x fa-pull-left"></i>
菜鸟教程 -- 学的不仅是技术，更是梦想！！！<br>
菜鸟教程 -- 学的不仅是技术，更是梦想！！！<br>
菜鸟教程 -- 学的不仅是技术，更是梦想！！！<br>
菜鸟教程 -- 学的不仅是技术，更是梦想！！！
```
---
### 增加图标边框
- fa-border
```html
<i class="fa fa-quote-left fa-3x fa-border"></i>
```
---
### 图标旋转
- fa-rotate-角度
```html
<i class="fa fa-shield"></i>
<i class="fa fa-shield fa-rotate-90"></i>
<i class="fa fa-shield fa-rotate-180"></i>
<i class="fa fa-shield fa-rotate-270"></i>
```
---
### 图标翻转
- fa-flip-状态
```html
<i class="fa fa-shield fa-flip-horizontal"></i>
<i class="fa fa-shield fa-flip-vertical"></i>
```

---
### 动态图标
- fa-spin    :让图标旋转
- fa-pulse  :让图标分八步旋转
```html
<i class="fa fa-spinner fa-spin"></i>
<i class="fa fa-spinner fa-pulse"></i>
```
---
### 图标堆叠
- fa-stack
```html
<span class="fa-stack fa-lg">
  <i class="fa fa-circle-thin fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
```
---
### 列表图标
- fa-ul/li 替换列表图标
```html
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>List icons</li>
  <li><i class="fa-li fa fa-square"></i>List icons</li>
</ul>
```
> 学了，但是没用过，以后给AI当知识库用了