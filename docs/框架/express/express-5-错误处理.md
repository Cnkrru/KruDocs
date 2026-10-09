## 同步错误：自动捕获

- 作用：路由/中间件里的**同步代码抛错**，Express 自动捕获处理。
- 注意点：无需额外操作，Express 会自己接住。

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN');   // Express 自动捕获
});
```

---

## 异步错误：手动传给 next()

- 作用：**回调式**异步代码里的错误，必须手动传给 `next(err)`，Express 才会处理。
- 注意点：不传的话错误会被吞掉，请求挂起。`next(err)`（传非 `'route'` 的任意值）会跳过所有剩余普通中间件，直接进错误处理。

```js
app.get('/', (req, res, next) => {
  fs.readFile('/no-such-file', (err, data) => {
    if (err) next(err);        // 传给 Express
    else res.send(data);
  });
});
```

---

## Express 5：async 路由自动捕获

- 作用：Express 5 起，**async 路由/中间件**返回的 Promise 被 reject 或抛错时，会自动调用 `next(err)`。
- 注意点：这是 4.x 升 5.x 的最大便利：不用再手动 `try/catch` 包 async 路由。AL-map 用的 Express 5 可直接享受此特性。

```js
app.get('/user/:id', async (req, res) => {
  const user = await getUserById(req.params.id);  // 抛错/拒绝会自动进错误处理
  res.send(user);
});
```

---

## 错误处理中间件

- 作用：统一处理应用中的错误，返回自定义错误响应。
- 语法：`app.use((err, req, res, next) => { ... })`。
- 注意点：**必须有 4 个参数** `(err, req, res, next)`（少一个会被当成普通中间件）；自己负责结束响应，否则请求挂起。

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});
```

| 要点 | 说明 |
|------|------|
| 位置 | 放在**所有路由和其他中间件之后** |
| 参数 | 固定 4 个：`(err, req, res, next)` |
| 响应 | 自己负责结束响应（`res.status().json()` 等） |
| 链式 | 可定义多个错误处理中间件，用 `next(err)` 逐级传递 |

```js
// 按类型分流：XHR 请求返回 JSON，普通请求走下一级
app.use((err, req, res, next) => {
  if (req.xhr) return res.status(500).json({ error: 'Failed!' });
  next(err);
});
```

---

## 默认错误处理程序

Express 自带兜底错误处理器（在中间件栈末尾），行为：

| 场景 | 行为 |
|------|------|
| 未自定义错误处理 | 错误写入响应，含堆栈跟踪 |
| 生产环境（`NODE_ENV=production`） | 响应不含堆栈跟踪，只返回状态码文本 |
| 响应已开始发送后出错 | 关闭连接使请求失败 |

```js
// 自定义错误处理时，若响应头已发送，交给默认处理器兜底
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  res.status(500).json({ error: err.message });
}
```

生产环境务必设置 `NODE_ENV=production`，避免堆栈跟踪泄露给客户端。

---

## 关键要点

1. 同步错误自动捕获；回调式异步错误手动 `next(err)`；Express 5 的 async 路由自动捕获
2. 错误处理中间件固定 `(err, req, res, next)` 四参数，放所有路由之后
3. 生产环境设 `NODE_ENV=production` 隐藏堆栈
