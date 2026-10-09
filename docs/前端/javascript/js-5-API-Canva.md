# canvas
## 1. 初始化
1. 定宽高
2. 选择器绑定
```html
<canvas class='canvas-init' width=400px height=400px> </canvas>
```
---
## 2. 绘制图案
### 属性
1. fillStyle = color
    - 图形填充颜色
2. strokeStyle = color
    - 边框上色
3. globalAlpha = 透明度
    - 0.0~1.0，影响canvas上所有图形，默认1.0
4. rgba()
### 方法
1. 绘制路径
    - beginPath()
        - 开始路径
    - closePath()
        - 闭合路径
    - stroke()
        - 通过线条来填充指定路径
    - fill(规则)
        - 通过填充路径内容区域做实心图案
2. 移动笔触
    - moveTo(x,y)
        - 将笔触移动到指定位置的x，y上
3. 线
    - lineTo(x,y)
        - 从当前位置到目标xy的一条线
4. 圆弧
    - arc(x, y, radius, startAngle, endAngle, anticlockwise)
        - 圆心，半径，角度，方向
    - arcTo(x1, y1, x2, y2, radius)
        - 两个控制点xy，半径
5. 贝塞尔曲线(任意形状曲线`<多次曲线>`)
    - quadraticCurveTo(cp1x, cp1y, x, y)
        - 二次曲线，cp1控制点，xy对应结束点
    - bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        - 三次曲线，两个控制点，一个结束点
6. 矩形
    - rect(x, y, width, height)
        - 
    - fillRect(x,y,width,height)
        - 画一个填充的矩形
    - strokeRect(x,y,width,height)
        - 画一个矩形边框
    - clearRect(x,y,width,height)
        - 清除指定矩形区域
> 属性侧没有：这类全是"画完就定格"的方法，画了想改只能清屏重画
---
## 3. 线型
### 属性
1. lineWidth = 数值
    - 线宽，默认1.0，必须正数
    - 精确1px线容易发糊，坐标放到半像素位(如3.5)就清晰
2. lineCap = 类型
    - 端点样式：butt(默认) / round / square
3. lineJoin = 类型
    - 拐角样式：miter(默认) / round / bevel
4. miterLimit = 数值
    - 尖角外延上限，太长会退化成bevel，默认10
5. lineDashOffset = 数值
    - 虚线的起始偏移，配合setLineDash做蚂蚁线动效
### 方法
1. setLineDash([实长, 空长])
    - 画虚线，数组交替实线和空白
2. getLineDash()
    - 读取当前虚线样式
---
## 5. 渐变
### 属性
1. fillStyle / strokeStyle 赋值渐变对象
    - 渐变对象用完后赋给这两个属性才能用
### 方法
1. createLinearGradient(x1,y1,x2,y2)
    - 线性渐变，起点到终点
2. createRadialGradient(x1,y1,r1,x2,y2,r2)
    - 径向渐变，两个圆的圆心+半径
3. addColorStop(位置, 颜色)
    - 给渐变加色标，位置0.0~1.0，0.5是正中间
    - 可以加任意多个
    - 同一位置写两个颜色能做出突变效果
> 步骤：先创建渐变对象 → addColorStop上色 → 把对象赋给fillStyle/strokeStyle
---
## 6. 阴影与图案
### 属性
1. shadowBlur = 模糊度
2. shadowColor = 颜色
3. shadowOffsetX = 偏移
4. shadowOffsetY = 偏移
### 方法
1. createPattern(image, 'repeat'|'repeat-x'|'repeat-y'|'no-repeat')
    - 用图片平铺来填充
---
## 7. 填充规则
> 这是 fill() 方法的参数，决定自相交路径哪些算"内部"
### 属性
1. 无
### 方法
1. fill('non-zero')
    - 默认，按环绕次数判定内部
2. fill('evenodd')
    - 按穿过边界奇偶判定，画"挖洞/带孔"图形用这个
> 简单自相交图形不用管，要挖空内部才用evenodd
---
## 8. 绘制文本
### 方法
1. fillText(text, x, y [, maxWidth])
    - 在(x,y)位置填充文字，用当前fillStyle上色
2. strokeText(text, x, y [, maxWidth])
    - 画空心文字，用当前strokeStyle描边
3. measureText(text)
    - 测量文字宽度，返回TextMetrics对象
    - 取宽度用 .width，常用于文字居中/对齐计算
### 属性
1. font = 值
    - 字体样式，语法和CSS font一样，默认10px sans-serif
2. textAlign = 值
    - 水平对齐：start(默认) / end / left / right / center
3. textBaseline = 值
    - 基线对齐：alphabetic(默认) / top / hanging / middle / ideographic / bottom
4. direction = 值
    - 文字方向：ltr / rtl / inherit(默认)
> 都是设属性，用法熟CSS就好，和CSS的font/text-align很像
> 无障碍注意：canvas是位图，文字放大容易糊、也不能像HTML那样被读屏读到，需要无障碍的场合优先用SVG或HTML元素
---
## 9. 使用图像
### 方法
1. drawImage(源图, x, y)
    - 最基础，把图贴在(x,y)
2. drawImage(源图, x, y, width, height)
    - 带宽高，画图时缩放大小
3. drawImage(源图, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    - 切片：前4个从源图切一块，后4个贴到目标的(位置+大小)
    - 做图像合成/只用一张大图的部分区域很爽
4. 图片源
    - new Image() 或 `<img>` 元素
    - `<video>` 元素，能抓当前帧当图
    - 另一个 `<canvas>` 元素，当缩放略图常用
    - 跨域图片要加 crossOrigin，否则会"污染canvas"
5. 加载时机
    - img.onload = function(){ // 再drawImage }
    - 图片没加载完就drawImage，什么都画不出来
### 属性
1. imageSmoothingEnabled = true/false
    - 缩放时是否用平滑算法，默认true(平滑)
    - 要像素风/避免模糊可关掉，老浏览器需加各前缀版本
> 图片没加载完别急着画，用onload等，或者图片塞进HTML用CSS隐藏也能取
> 大幅缩放会糊，图里含文字就别缩放
---
## 10. 变换
### 方法
1. save()
    - 保存当前画布状态(入栈)
    - 保存的是：变形 + 各种样式属性 + 裁切路径 的快照
2. restore()
    - 恢复上一次save的状态(出栈)
    - save/restore成对用，做复杂图形必用，比手动还原一堆属性省事
3. translate(x, y)
    - 移动坐标系原点(即整体平移)
    - 移动后画图就不用每次算坐标，直接画到(0,0)附近
4. rotate(弧度)
    - 绕原点顺时针旋转，单位是弧度
    - 想绕某点转：先translate过去 → rotate → 再translate回来
5. scale(x, y)
    - 水平/垂直缩放，比1大放大，比1小缩小，可为负数
    - 负值可做镜像翻转，如 scale(-1,1) 水平镜像
6. transform(a, b, c, d, e, f)
    - 直接乘上变形矩阵(高级，一般用不上)
    - 参数：a水平缩放 b垂直倾斜 c水平倾斜 d垂直缩放 e水平移 f垂直移
7. setTransform(a, b, c, d, e, f)
    - 重置为单位矩阵后设指定变形，一步到位
8. resetTransform()
    - 重置为初始(等价 setTransform(1,0,0,1,0,0))
> 变形都基于原点，循环里平移务必 save/restore 包着，不然画着画着就跑出画布了
> 日常常用：save/restore + translate + rotate，scale偶尔，transform基本不碰
---
## 11. 组合与裁剪
### 属性
1. globalCompositeOperation = 类型
    - 设置画新图时的遮盖策略，有12种字符串值
    - 常用：source-over(默认，直接盖) / source-in(只显重叠区) / source-out(显非重叠区) / destination-out(擦除，做橡皮擦) / clear(清空)
### 方法
1. clip()
    - 把当前路径变成裁剪路径(遮罩)
    - 之后只有裁剪区域内的东西才会被画出来，区域外全隐藏
    - 不画任何东西，只做遮挡，比source-in这类更好用
> clip配save/restore用：裁剪是canvas状态的一部分，save夹住就不会影响后面画的
> globalCompositeOperation想要搞橡皮擦/只显示重叠，用destination-out/source-in就行，记几个常用的，别全背
---
## 12. 基本动画
### 方法
1. requestAnimationFrame(函数)
    - 请求浏览器下次重绘前执行函数，动画首选
    - 每秒约回调60次(跟随屏幕刷新率会更顺滑)，比setInterval省资源
    - 函数里末尾再调一次自己，形成循环
2. setInterval(函数, 间隔)
    - 定时执行，做不必用户交互的循环动画
3. setTimeout(函数, 间隔)
    - 跑一次，做键盘/鼠标驱动的动画常用
### 动画四步(每帧)
1. 清空画布
    - clearRect 清掉上一帧，除非这帧会全屏盖住
2. 保存状态
    - save() 存样式/变形，避免一帧污染一帧
3. 画当前帧
4. 恢复状态
    - restore()，然后进下一帧
> 核心心法：canvas画了就不变，想动就得清屏整体重绘，性能靠电脑和帧率
> 要动画优先用requestAnimationFrame，别用setInterval硬拼帧率
> 窗口尺寸变了要重设canvas的width/height(用它才能触发清空重画)
---
## 13. 高级动画(带物理运动)
### 方法
1. cancelAnimationFrame(raf)
    - 取消requestAnimationFrame启动的循环，停止动画
### 运动进阶技巧
1. 用对象封装动的东西
    - 存位置+速度+画法：{ x, y, vx, vy, draw(){} }，清晰好维护
2. 每帧挪位置
    - 位置 += 速度：ball.x += ball.vx; ball.y += ball.vy
3. 边界碰撞检测
    - 超出画布就取反速度：if(出界) ball.vx = -ball.vx，实现来回弹
4. 重力/阻力(模拟物理)
    - 每帧累加速度：ball.vy += 0.25 重力往下拉
    - 每帧乘衰减：ball.vy *= 0.99 阻力慢慢停，动作更真实
5. 长尾/残影效果
    - 不用clearRect清空，改成每帧盖一块半透明矩形
    - ctx.fillStyle = "rgba(255,255,255,0.3)"; fillRect 全屏
    - 上一帧画面半透明残留下来形成拖尾
6. 鼠标/点击控制
    - 监听 mousemove 改位置跟随 / click 触发跳起
    - mouseover 启动 rAF，mouseout 里 cancelAnimationFrame 停
> 规律：x += vx → 撞边取反 → 加速度 → 残影，这套就能做弹跳球/游戏了