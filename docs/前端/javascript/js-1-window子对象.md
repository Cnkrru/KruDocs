## location 对象
- location对象是window的子对象，与地址相关
1. 属性
    - href
        - 地址
    - protocol
        - 协议
    - host
        - 主机+端口
2. 方法
    - assign: location.assign(`<地址>`)
        - 导航到新页面
    - reload: location.reload()
        - 重新加载当前页面
    - replace: location.replace(`<地址>`)
        - 页面重定向
    - toString: location.toString()
        - 返回地址字符串
3. 子对象
    - 无子对象
> 随便记几个，也不咋用
---
## navigator 对象
- navigator的数据类型是对象，记录浏览器自身的相关信息
1. 属性
    - userAgent
        - 包含浏览器信息的字符串，用来检测浏览器类型和版本
    - language
        - 浏览器首选语言
    - platform
        - 操作系统平台
    - onLine
        - 是否在线，真假判断当前网络状态
    - cookieEnabled
        - 是否启用Cookie
    - hardwareConcurrency
        - CPU逻辑核数
2. 方法
    - sendBeacon(url, 数据)
        - 发送少量数据到服务器，页面卸载时也能发送，常用于埋点统计
    - vibrate(毫秒)
        - 触发设备震动，移动端可用
3. 子对象
    1. clipboard
        - 操作剪贴板的API
        1. 属性
            - 无
        2. 方法
            - writeText(文本)
                - 复制文本到剪贴板，需要安全上下文（https或localhost）
            - readText()
                - 读取剪贴板文本
            - write(数据)
                - 写入任意格式数据（如图片），异步操作
            - read()
                - 读取任意格式数据，异步操作
---
## history 对象
- history的数据类型是对象，管理历史记录，与浏览器地址栏的操作对应，如前进、后退、历史记录等
1. 属性
    - length
        - 历史记录条数
2. 方法
    - back()
        - 后退一个页面
    - forward()
        - 前进一个页面
    - go(参数)
        - 前进后退功能，参数1前进1个页面，-1后退1个页面
3. 子对象
    - 无子对象
---
## localStorage 对象
- localStorage提供本地存储能力，按键值对保存，永久存储，多窗口共享
1. 属性
2. 方法
    - setItem('键', '值')
        - 存储数据
    - getItem('键')
        - 获取数据
    - removeItem('键')
        - 删除指定数据
    - clear()
        - 清空所有数据
3. 子对象
    - 无子对象
---