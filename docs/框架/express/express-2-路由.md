## 路由方法

- 作用：按 HTTP 方法定义路由，收到对应方法的请求时执行处理函数。
- 语法：`app.METHOD(path, handler)`。
- 注意点：查询字符串（`?a=1`）**不属于**路由路径；非常规方法名（如 `m-search`）用括号写法 `app['m-search']('/x', handler)`。

```js
app.get('/', (req, res) => res.send('GET'));
app.post('/', (req, res) => res.send('POST'));
app.all('/secret', (req, res, next) => {   // 匹配所有方法，常用于鉴权前置
  console.log('Accessing secret...');
  next();                                   // 放行到下一个处理函数
});
```

| 方法 | 说明 |
|------|------|
| `app.get` / `app.post` / `app.put` / `app.delete` / `app.patch` | 对应 HTTP 方法 |
| `app.all` | 匹配**所有** HTTP 方法 |

---

## 路由路径

路径可以是字符串、字符串模式或正则表达式（底层用 `path-to-regexp` 匹配）。

| 写法 | 匹配示例 | 说明 |
|------|----------|------|
| `'/about'` | `/about` | 精确字符串 |
| `'/ab?cd'` | `acd`、`abcd` | `?` 前字符可选 |
| `'/ab+cd'` | `abcd`、`abbcd`… | `+` 前字符出现 1 次以上 |
| `'/ab*cd'` | `abcd`、`abxcd`… | `*` 匹配任意字符 |
| `'/ab(cd)?e'` | `abe`、`abcde` | 括号分组 + `?` 可选 |
| `'/user/:id'` | `/user/123` | **`:参数` 命名参数**（最常用） |
| `/.*fly$/` | `butterfly`、`dragonfly` | 正则表达式 |

---

## 路由参数

- `req.params`：路径中的命名参数对象（`/user/:id` → `{ id: '123' }`）。
- `req.query`：查询字符串对象（`?page=2` → `{ page: '2' }`，值都是**字符串**）。
- `req.body`：请求体（需先挂 `express.json()` 中间件）。

```js
app.get('/user/:id', (req, res) => {
  res.send(req.params.id);   // /user/123 → "123"
});
```

---

## 响应方法

`res` 对象的方法用于发送响应并**终止请求/响应循环**。如果处理函数没调用其中任何一个，请求会一直挂起。

| 方法 | 说明 |
|------|------|
| `res.send(data)` | 发送各种类型响应（字符串/对象/Buffer，自动设 Content-Type） |
| `res.json(obj)` | 发送 JSON（最常用） |
| `res.status(code)` | 设置状态码（可链式：`res.status(404).json(...)`） |
| `res.redirect(url)` | 重定向（如 `res.redirect('/login')`） |
| `res.sendFile(path)` | 发送文件 |
| `res.download(path)` | 提示浏览器下载文件 |
| `res.sendStatus(code)` | 设置状态码并发送其文本（`sendStatus(404)` → "Not Found"） |
| `res.end()` | 结束响应（无内容） |

---

## 链式路由 app.route()

- 作用：同一路径的多个方法链式定义，减少冗余。
- 语法：`app.route(path).get(handler).post(handler)...`。

```js
app.route('/book')
  .get((req, res) => res.send('Get a book'))
  .post((req, res) => res.send('Add a book'))
  .put((req, res) => res.send('Update the book'));
```

---

## 模块化路由 express.Router

- 作用：`express.Router()` 创建**微型应用**（完整的中间件 + 路由系统），把路由拆到独立文件。
- 语法：`router.get()` 定义路由 → `module.exports` 导出 → 主应用 `app.use('/前缀', router)` 挂载。

```js
// birds.js —— 独立路由模块
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {   // 该路由专属中间件
  console.log('Time:', Date.now());
  next();
});
router.get('/', (req, res) => res.send('Birds home'));
router.get('/about', (req, res) => res.send('About birds'));

module.exports = router;
```

```js
// 主应用挂载
const birds = require('./birds');
app.use('/birds', birds);   // 挂载到 /birds 前缀
```

现在 `/birds` 和 `/birds/about` 都会走 birds 路由，且只对这两个路径生效。

**组织习惯**：每个业务模块一个 router 文件（如 `disk.js`、`convert.js`），主应用 `app.use('/disk', diskRouter)` 挂载，路径前缀即模块名。AL-map 的 `net/` 目录就是这么组织的。

---

## 关键要点

1. 路由 = 方法 + 路径 + 处理函数，`app.METHOD()` 定义
2. 命名参数 `:id` 用 `req.params` 取，查询参数用 `req.query`
3. 处理函数必须调用一个 `res` 方法结束响应，否则请求挂起
4. 中大型项目用 `express.Router` 拆模块，`app.use('/前缀', router)` 挂载
