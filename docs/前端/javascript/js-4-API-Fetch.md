## 1. HTTP URL 组成部分
1. 协议
    - 规定浏览器和服务器之间传输数据的格式，如 http:// 或 https://  
      - https:加密协议,在http上加了一层SSL
      - http:明文传输
2. 域名
    - 标记服务器在互联网中的方位，如 baidu.com
3. 资源路径
    - 标记资源在服务器下的具体位置，如 /api/province
```text
http://hmajax.itheima.net/api/province
└──┬──┘ └──────┬──────┘ └──────┬──────┘
  协议        域名        资源路径
```
## 2. HTTP 请求方法
- get
    - 请求获取资源，用于查询操作，如获取列表、详情
- post
    - 提交数据，用于创建操作，如新增用户、提交表单
- put
    - 更新资源，用于更新操作，如更新用户信息
- delete
    - 删除资源，用于删除操作，如删除用户
- patch
    - 部分更新资源，用于部分更新操作，如更新用户的某个字段
- head
    - 获取响应头，仅获取响应头信息，不获取响应体
- options
    - 预检请求，检查服务器支持的HTTP方法
- connect
    - 建立隧道，用于HTTPS连接
---
## 3. HTTP 请求报文
1. 请求行
    - 格式：方法 路径 协议版本，如 `GET /api/province HTTP/1.1`
2. 请求头
    - 作用：描述客户端的请求信息
    - 常见请求头：Host、User-Agent、Content-Type、Content-Length、Authorization、Accept
3. 请求体
    - 作用：携带请求数据
    - 常见格式
        - application/json：JSON格式
        - application/x-www-form-urlencoded：表单格式
        - multipart/form-data：文件上传格式
---
## 4. HTTP 响应报文与状态码
1. 状态行
    - 格式：协议版本 状态码 状态文本，如 `HTTP/1.1 200 OK`
2. 响应头
    - 作用：描述服务器的响应信息
    - 常见响应头：Content-Type、Content-Length、Date、Server、Set-Cookie
3. 响应体
    - application/json：JSON格式
    - text/html：HTML格式
    - text/plain：纯文本格式
> 一般是json格式
---
## Fetch API
- fetchAPI用于与后端进行数据来往
- 直接写fetch太麻烦了，一般用axios库，是封装好的请求库
- response.json()
    - fetch的响应方法，把响应体解析为JSON，返回Promise
---
## axios库
### axios API
1. axios(config)
    - 发送请求，config含方法、地址、数据等参数
2. 各种方法对应函数
    1. axios.request(config)
    2. axios.get(url, [config])
    3. axios.delete(url, [config])
    4. axios.head(url, [config])
    5. axios.options(url, [config])
    6. axios.post(url, [data, [config]])
    7. axios.put(url, [data, [config]])
    8. axios.patch(url, [data, [config]])
3. 并发处理函数
    - axios.all(要并发的请求数组)
    - axios.spread(结果展开函数)
### 注意事项
1. axios默认异步
2. axios在`.then()`中的数据默认不外用，涉及调用API获取的数据，最好在`then`工作域内完成操作
---
## HTTP 状态码
### 2xx 成功
| 状态码 | 描述 | 常见场景 |
|--------|------|----------|
| 200 | OK | 请求成功 |
| 201 | Created | 创建成功 |
| 204 | No Content | 无内容 |
### 3xx 重定向
| 状态码 | 描述 | 常见场景 |
|--------|------|----------|
| 301 | Moved Permanently | 永久重定向 |
| 302 | Found | 临时重定向 |
### 4xx 客户端错误
| 状态码 | 描述 | 常见场景 |
|--------|------|----------|
| 400 | Bad Request | 请求错误 |
| 401 | Unauthorized | 未授权 |
| 403 | Forbidden | 禁止访问 |
| 404 | Not Found | 资源不存在 |
### 5xx 服务器错误
| 状态码 | 描述 | 常见场景 |
|--------|------|----------|
| 500 | Internal Server Error | 服务器内部错误 |
| 502 | Bad Gateway | 网关错误 |
| 503 | Service Unavailable | 服务不可用 |