# Q-HTML：HTML 标签 → QML 组件对照表

| 类型 | HTML | QML | 说明 |
|------|------|-----|------|
| 根元素 | `<!DOCTYPE html>` + `<html>` | `ApplicationWindow { }` | 顶层应用窗口 |
| 根元素 | `<head>` | 无 | QML 无 head，import 写在顶部 |
| 根元素 | `<body>` | `ApplicationWindow` 的子项 | 界面内容 |
| 根元素 | `<script>` | JS 函数 / 信号处理器 | 内嵌 JS 引擎 |
| 容器/布局 | `<div>` | `Rectangle` | 基础块容器，`color` 设置背景色 |
| 容器/布局 | `<header>` | `ApplicationWindow.header` | 页面顶部栏 |
| 容器/布局 | `<footer>` | `ApplicationWindow.footer` | 页面底部栏 |
| 容器/布局 | `<nav>` | `TabBar` / `SwipeView` | 导航 |
| 容器/布局 | `<aside>` | `Drawer` | 侧边栏 |
| 容器/布局 | `<main>` | `Page` | 主内容区 |
| 容器/布局 | `<section>` | `Pane` / `Frame` | 内容区块 |
| 容器/布局 | `<fieldset>` | `GroupBox` | 表单分组 |
| 文本/图片 | `<span>` / 纯文本 | `Text` | 文本显示，`text` 属性 |
| 文本/图片 | `<img>` | `Image` | 图片显示，`source` 属性 |
| 按钮 | `<button>` | `Button` | 按钮（QtQuick.Controls） |
| 按钮 | `<button>`（主题变体） | `RoundButton` | 圆角按钮 |
| 按钮 | `<button>`（工具） | `ToolButton` | 工具栏按钮 |
| 按钮 | iOS `<switch>` | `Switch` | 开关 |
| 按钮 | 长按触发 | `DelayButton` | 长按触发按钮 |
| 表单控件 | `<input type="text">` | `TextField` | 单行文本输入 |
| 表单控件 | `<textarea>` | `TextArea` | 多行文本输入 |
| 表单控件 | `<select>` / `<option>` | `ComboBox` | 下拉选择框 |
| 表单控件 | `<input type="checkbox">` | `CheckBox` | 复选框 |
| 表单控件 | `<input type="radio">` | `RadioButton` | 单选按钮 |
| 表单控件 | `<input type="range">` | `Slider` | 滑块 |
| 表单控件 | `<input type="range">`（双值） | `RangeSlider` | 范围滑块 |
| 表单控件 | `<input type="range">`（旋钮） | `Dial` | 旋钮 |
| 表单控件 | `<input type="number">` | `SpinBox` | 整数微调框 |
| 表单控件 | `<input type="number">`（小数） | `DoubleSpinBox` | 浮点数微调框 |
| 表单控件 | `<input type="password">` | `TextField { echoMode: TextInput.Password }` | 密码输入 |
| 表单控件 | `<progress>` | `ProgressBar` | 进度条 |
| 表单控件 | 滚轮选择 | `Tumbler` | 滚轮选择器 |
| 列表/表格 | `<ul>` / `<ol>` | `ListView` | 列表视图 |
| 列表/表格 | `<li>` | `ItemDelegate` | 普通列表项 |
| 列表/表格 | `<li><input type="checkbox">` | `CheckDelegate` | 带复选框的列表项 |
| 列表/表格 | `<li><input type="radio">` | `RadioDelegate` | 带单选按钮的列表项 |
| 列表/表格 | `<li><switch>` | `SwitchDelegate` | 带开关的列表项 |
| 列表/表格 | `<table>` | `GridView` / `TableView` | 表格/网格视图 |
| 媒体 | `<video>` | `MediaPlayer` + `VideoOutput` | 视频播放 |
| 媒体 | `<audio>` | `MediaPlayer` + `AudioOutput` | 音频播放 |
| 媒体 | `<canvas>` | `Canvas` | 2D 绘图 |
| 弹窗/交互 | `<dialog>` | `Dialog` | 对话框 |
| 弹窗/交互 | `<details>` / `<summary>` | `GroupBox` | 可折叠分组 |
| 弹窗/交互 | `<iframe>` | `WebEngineView` | 嵌入 Web 页面 |
| 弹窗/交互 | `<hr>` | `Rectangle { height: 1; color: "gray" }` | 分割线 |