## 请求对象 req

- 作用：携带客户端发来的所有信息（路径参数、查询串、请求体、请求头等）。
- 注意点：`req.query` 的值都是**字符串**，数字需自行 `Number()` 转换。

```js
app.get('/user/:id', (req, res) => {
  console.log(req.params.id);   // 路径参数
  console.log(req.query.page);  // 查询参数
  console.log(req.ip);          // 客户端 IP
});
```

| 属性 | 说明 | 示例 |
|------|------|------|
| `req.params` | 路由命名参数 | `/user/:id` → `{ id: '123' }` |
| `req.query` | 查询字符串 | `?page=2&size=10` → `{ page: '2', size: '10' }` |
| `req.body` | 请求体（需 `express.json()`） | POST 的 JSON 数据 |
| `req.headers` | 请求头对象 | `req.headers['content-type']` |
| `req.method` | HTTP 方法 | `'GET'`、`'POST'` |
| `req.url` / `req.path` | 请求 URL / 路径 | `/api/status` |
| `req.ip` | 客户端 IP | `'192.168.1.5'` |
| `req.hostname` | 主机名 | `'localhost'` |
| `req.protocol` | 协议 | `'http'`、`'https'` |
| `req.cookies` | Cookie（需 cookie-parser） | `{ session: 'abc' }` |
| `req.get(name)` | 取请求头（方法） | `req.get('User-Agent')` |

---

## 响应对象 res

- 作用：向客户端发送响应数据，并**终止请求/响应循环**。
- 注意点：一个处理函数里**只能结束响应一次**（调用一个 send/json/end 类方法），重复调用会报错。

```js
app.get('/api/user', (req, res) => {
  res.status(200).json({ name: 'Alice', age: 18 });
});

app.get('/download', (req, res) => {
  res.download('/path/to/file.zip');
});
```

| 方法 | 说明 |
|------|------|
| `res.send(data)` | 发送响应（字符串/对象/Buffer，自动设 Content-Type） |
| `res.json(obj)` | 发送 JSON（最常用，自动 `Content-Type: application/json`） |
| `res.status(code)` | 设置状态码（可链式） |
| `res.sendStatus(code)` | 状态码 + 文本（`sendStatus(404)` → "Not Found"） |
| `res.redirect(url)` | 重定向（`res.redirect('/login')` 或 `res.redirect(301, url)`） |
| `res.sendFile(path)` | 发送文件 |
| `res.download(path)` | 触发浏览器下载 |
| `res.set(name, value)` | 设置响应头 |
| `res.end()` | 结束响应（无内容） |
| `res.render(view)` | 渲染模板（需配模板引擎） |

---

## 链式写法

`res.status()` 可链式调用，常见组合：

| 组合 | 效果 |
|------|------|
| `res.status(404).json({ error: 'Not Found' })` | 404 + JSON 错误体 |
| `res.status(201).json(data)` | 创建成功 + 数据 |
| `res.redirect(302, '/home')` | 临时重定向 |
| `res.set('X-Custom', 'v').send('ok')` | 设响应头 + 发送 |

---

## 关键要点

1. 取数据：路径参数 `req.params`、查询串 `req.query`、请求体 `req.body`
2. 发数据：`res.json()` 最常用，`res.status().json()` 链式组合
3. 一个处理函数只能结束响应一次
