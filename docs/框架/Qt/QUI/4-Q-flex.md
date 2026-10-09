# Q-flex：CSS 布局 → QML 布局对照表

| 类型 | CSS 布局 | QML 布局 | 说明 |
|------|---------|---------|------|
| 定位 | `position: absolute; top/left` | `x` / `y` 手动定位 | 精确像素控制 |
| 定位 | `position: relative` + 偏移 | `anchors { }` 锚定 | 相对父级/兄弟定位 |
| 定位 | `inset: 0`（铺满父级） | `anchors.fill: parent` | 铺满容器 |
| 定位 | Flex 容器 `justify-content/align-items: center` | `anchors.centerIn` | 单元素居中 |
| 定位 | `left: 0`（贴左） | `anchors.left: parent.left` | 左锚线 |
| 定位 | `right: 0`（贴右） | `anchors.right: parent.right` | 右锚线 |
| 定位 | `top: 0`（贴上） | `anchors.top: parent.top` | 上锚线 |
| 定位 | `bottom: 0`（贴下） | `anchors.bottom: parent.bottom` | 下锚线 |
| 定位 | `left: 0; right: 0; margin: auto` | `anchors.horizontalCenter` | 水平居中锚线 |
| 定位 | `top: 0; bottom: 0; margin: auto` | `anchors.verticalCenter` | 垂直居中锚线 |
| 弹性布局 | `display: flex; flex-direction: row` | `Row` | 水平排列 |
| 弹性布局 | `display: flex; flex-direction: column` | `Column` | 垂直排列 |
| 弹性布局 | `display: flex; flex-wrap: wrap` | `Flow` | 自动换行 |
| 弹性布局 | Flexbox 弹性伸缩 | `RowLayout` / `ColumnLayout` | 响应式弹性布局 |
| 网格布局 | `display: grid; grid-template-columns: repeat(N, 1fr)` | `Grid { columns: N }` | 固定列数网格 |
| 网格布局 | Grid 弹性伸缩 | `GridLayout` | 弹性网格 |
| 网格布局 | `grid-row` / `grid-column` | `Layout.rowSpan` / `Layout.columnSpan` | 行列跨度 |
| 网格布局 | `grid-row-start` / `grid-column-start` | `Layout.row` / `Layout.column` | 网格坐标 |
| 间距 | `margin: 10px` | `anchors.margins: 10` | 锚点边距 |
| 间距 | `margin-left: 10px` | `anchors.leftMargin: 10` | 单边边距 |
| 间距 | `gap: 10px` | `spacing: 10` | Row / Column / Grid 间距 |
| 弹性伸缩 | `flex: 1`（水平） | `Layout.fillWidth: true` | 水平填充可用空间 |
| 弹性伸缩 | `flex: 1`（垂直） | `Layout.fillHeight: true` | 垂直填充可用空间 |
| 尺寸约束 | `min-width` | `Layout.minimumWidth` | 最小宽度约束 |
| 尺寸约束 | `max-width` | `Layout.maximumWidth` | 最大宽度约束 |
| 尺寸约束 | `width: auto` | `Layout.preferredWidth` | 首选宽度 |
| 尺寸约束 | `height: auto` | `Layout.preferredHeight` | 首选高度 |
| 对齐 | `align-items` / `justify-content` | `Layout.alignment` | 对齐方式（如 `Qt.AlignHCenter`） |