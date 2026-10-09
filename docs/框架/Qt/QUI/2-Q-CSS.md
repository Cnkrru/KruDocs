# Q-CSS：CSS 属性 → QML 属性对照表

| 类型 | CSS 属性 | QML 属性 | 说明 / 适用类型 |
|------|----------|---------|----------------|
| 盒模型与视觉 | `width` / `height` | `width` / `height` | 所有可视元素 |
| 盒模型与视觉 | `min-width` / `min-height` | `minWidth` / `minHeight` | Item |
| 盒模型与视觉 | `max-width` / `max-height` | `maxWidth` / `maxHeight` | Item |
| 盒模型与视觉 | `background-color` | `color` | Rectangle |
| 盒模型与视觉 | `background-image` | `source` | Image / BorderImage |
| 盒模型与视觉 | `border: 1px solid #ccc` | `border.width: 1; border.color: "#ccc"` | Rectangle |
| 盒模型与视觉 | `border-radius` | `radius` | Rectangle |
| 盒模型与视觉 | `box-shadow` | `DropShadow` 效果 | layer.effect |
| 盒模型与视觉 | `opacity` | `opacity` | 所有 Item |
| 盒模型与视觉 | `display: none` | `visible: false` | 所有 Item |
| 盒模型与视觉 | `overflow: hidden` | `clip: true` | Item |
| 盒模型与视觉 | `overflow: auto` / `scroll` | `Flickable` / `ScrollView` | 容器 |
| 盒模型与视觉 | `cursor: pointer` | `cursorShape: Qt.PointingHandCursor` | 鼠标交互区域 |
| 盒模型与视觉 | `z-index` | `z` | Item |
| 盒模型与视觉 | `transform: translate(x, y)` | `x` / `y` 或 `transform: Translate { x: N; y: N }` | Item |
| 盒模型与视觉 | `transform: rotate(45deg)` | `rotation: 45` | Item |
| 盒模型与视觉 | `transform: scale(1.5)` | `scale: 1.5` | Item |
| 盒模型与视觉 | `transform-origin` | `transformOrigin: Item.TopLeft` | Item |
| 字体与文本 | `font-size: 16px` | `font.pixelSize: 16` | Text |
| 字体与文本 | `font-weight: bold` | `font.bold: true` | Text |
| 字体与文本 | `font-weight: 600` | `font.weight: Font.DemiBold` | Text |
| 字体与文本 | `font-family: "Arial"` | `font.family: "Arial"` | Text |
| 字体与文本 | `font-style: italic` | `font.italic: true` | Text |
| 字体与文本 | `text-align: center` | `horizontalAlignment: Text.AlignHCenter` | Text |
| 字体与文本 | `vertical-align: middle` | `verticalAlignment: Text.AlignVCenter` | Text |
| 字体与文本 | `color: red`（文字颜色） | `color: "red"` | Text |
| 字体与文本 | `line-height: 1.5` | `lineHeight: 1.5` | Text |
| 字体与文本 | `text-decoration: underline` | `font.underline: true` | Text |
| 字体与文本 | `text-overflow: ellipsis` | `elide: Text.ElideRight` | Text |
| 字体与文本 | `white-space: nowrap` | `wrapMode: Text.NoWrap` | Text |
| 字体与文本 | `word-break: break-all` | `wrapMode: Text.WordWrap` | Text |
| 字体与文本 | `text-shadow` | `layer.effect: DropShadow` | Text + layer |
| 布局与间距 | `margin: 10px` | `anchors.margins: 10` | 锚点边距 |
| 布局与间距 | `margin-top: 10px` | `anchors.topMargin: 10` | 上边距 |
| 布局与间距 | `padding: 10px` | `anchors.margins: 10`（容器内子元素） | 内边距 |
| 布局与间距 | `gap: 10px` | `spacing: 10` | Row / Column / Grid |
| 布局与间距 | `display: flex` | `Row` / `Column` | 弹性布局 |
| 布局与间距 | `flex-direction: row` | `Row { }` | 水平排列 |
| 布局与间距 | `flex-direction: column` | `Column { }` | 垂直排列 |
| 布局与间距 | `flex-wrap: wrap` | `Flow { }` | 自动换行 |
| 布局与间距 | `justify-content: center` | `anchors.horizontalCenter: parent.horizontalCenter` | 水平居中 |
| 布局与间距 | `align-items: center` | `anchors.verticalCenter: parent.verticalCenter` | 垂直居中 |
| 布局与间距 | `flex: 1` | `Layout.fillWidth: true; Layout.fillHeight: true` | 填充剩余空间 |
| 布局与间距 | `display: grid` | `Grid { columns: 3 }` 或 `GridLayout` | 网格布局 |
| 布局与间距 | `position: absolute` | `x: N; y: N` | 绝对定位 |
| 布局与间距 | `position: relative` | 默认（QML 元素默认相对定位） | 相对定位 |
| 布局与间距 | `position: fixed` | 无直接对应，通过 `anchors` + 窗口坐标模拟 | 固定定位 |
| 过渡与动画 | `transition: all 0.3s ease` | `Behavior { NumberAnimation { duration: 300; easing.type: Easing.InOutQuad } }` | 属性过渡 |
| 过渡与动画 | `@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }` | `OpacityAnimator { from: 0; to: 1; duration: 300 }` | 关键帧动画 |
| 过渡与动画 | `animation: spin 2s linear infinite` | `RotationAnimation { duration: 2000; loops: Animation.Infinite }` | 循环动画 |
| 过渡与动画 | `transform: translateX(100px)` | `Translate { x: 100 }` + `NumberAnimation` | 位移动画 |
| 过渡与动画 | `transition-delay` | `PauseAnimation { duration: 200 }` | 动画延迟 |