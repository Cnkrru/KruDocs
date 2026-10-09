# Date 时间库

浏览器在 JS 前端内置了时间库：`Date`。

## 时间戳

时间戳指从 `1970-01-01 00:00:00` 开始计时的一段**毫秒数**。

各种后端语言一般都有时间库，比如 Python 的 `time`、`datetime`，C 的 `time`，都是基于时间戳。

> 基础封装思路：用毫秒数推算「年月日时分秒」，推算时需要留意闰年、以及每个月有多少天。

## Date 库

### 创建对象 `new Date(<参数>)`

| 参数 | 说明 |
|------|------|
| 时间戳数字 | 指定时间戳创建 |
| 年月日 时分秒 | 按具体日期时间创建 |
| 不填 | 默认获取当前时间戳 |

### 当前时间戳 `Date.now()`

返回当前的时间戳。

### 读取方法 `Date.prototype.<操作><时区><类型>`

- **操作**：`get` / `set` / `to`
  - `get`：由时间戳转换为具体类型的时间
  - `set`、`to`：一般用不到
- **时区**：默认 / UTC 标准世界时间
- **类型**：年、月、日、时、分、秒

| 类型 | 方法 |
|------|------|
| 年 | `Date.prototype.getFullYear()` |
| 月 | `Date.prototype.getMonth()` |
| 日 | `Date.prototype.getDate()` |
| 时 | `Date.prototype.getHours()` |
| 分 | `Date.prototype.getMinutes()` |
| 秒 | `Date.prototype.getSeconds()` |

> Date 库文档：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

## 示例：建站时长

用当前时间与建站时间做差，再拆出年月日时分秒：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>siteage</title>
    <style>
        .siteage {
            width: 80%;
            height: 40px;

            padding: 5px;
            border: 1px solid pink;
            border-radius: 4px;

            display: flex;
            justify-content: center;
            align-items: center;
            
            font-size: 10px;
            color: #333;
        }    
    </style>
</head>
<body>
    <div class="container">
        <div class="siteage"></div>
    </div>
    <script>
        const siteage = document.querySelector('.siteage');
        const init_date = new Date('2023-01-01');
        const current_date = new Date();
        const diff_time = current_date - init_date;
        const year = Date.prototype.getFullYear.call(new Date(diff_time)) - 1970;
        const month = Date.prototype.getMonth.call(new Date(diff_time));
        const day = Date.prototype.getDate.call(new Date(diff_time)) - 1;
        const hours = Date.prototype.getHours.call(new Date(diff_time));
        const minutes = Date.prototype.getMinutes.call(new Date(diff_time));
        const seconds = Date.prototype.getSeconds.call(new Date(diff_time));

        siteage.textContent = `${year} 年, ${month} 月, ${day} 天， ${hours} 小时, ${minutes} 分钟, ${seconds} 秒`;
    </script>
</body>
</html>
```