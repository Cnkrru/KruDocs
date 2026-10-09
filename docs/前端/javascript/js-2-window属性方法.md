# window 属性方法
- window是顶级对象，下面是它直接挂载的属性和方法，不经过子对象，可直接裸名调用
## 属性
1. screen属性
    - screenX / screenY
        - 窗口相对屏幕左上角的坐标
    - screenLeft / screenTop
        - 与screenX / screenY等价，不同浏览器的别名写法
## 方法
1. 定时器
    - setTimeout(回调函数, 毫秒)
        - 延迟指定时间后执行一次
    - setInterval(回调函数, 毫秒)
        - 每隔指定时间重复执行
    - clearTimeout(timer)
        - 清除延时定时器
    - clearInterval(timer)
        - 清除间隔定时器
2. 弹窗
    - alert(文本)
        - 警告弹窗，只有确定按钮
    - confirm(文本)
        - 确认弹窗，返回true/false
    - prompt(文本, 默认值)
        - 输入弹窗，返回输入内容，取消返回null
3. 滚动
    - scroll(x, y)
        - 滚动到指定坐标位置
    - scroll({top, left, behavior})
        - 对象参数滚动，behavior控制动画：smooth平滑、instant跳转、auto自动
4. 通知
    - new Notification(标题, 配置)
        - 创建系统通知，配置含body正文、icon图标等
    - Notification.requestPermission()
        - 请求通知权限，返回granted/denied/default
    - Notification.permission
        - 当前通知权限状态
    - 实例.close()
        - 关闭通知