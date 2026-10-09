## 异步基础
同步代码依次执行，**异步**代码不会立刻执行，而是放到任务队列等主线程空闲后再处理。异步主要用于不阻塞 UI 的耗时操作：网络请求、定时器、文件读写、定时动画等。

| 概念 | 说明 |
|------|------|
| 同步（sync） | 按顺序立即执行，阻塞后续代码 |
| 异步（async） | 注册后返回，稍后由事件循环回调执行，不阻塞主线程 |
| 回调函数（callback） | 异步完成时被调用的函数 |
| 微任务（microtask） | 当前同步代码跑完后**立即**执行的队列（Promise 回调、`queueMicrotask`） |
| 宏任务（macrotask） | 每轮事件循环处理的队列（`setTimeout`、`setInterval`、IO、UI 事件） |

> **执行顺序**：同一轮里先把微任务**全部**跑完，才执行下一个宏任务。所以 `Promise.then` 的优先级高于 `setTimeout` 的回调。

```js
console.log('1');
setTimeout(() => console.log('3'), 0);   // 宏任务
Promise.resolve().then(() => console.log('2')); // 微任务
// 输出：1 -> 2 -> 3
```

---
## Promise
`Promise` 是构造函数对象，表示一个**未来的结果**。它有三个状态：

| 状态 | 含义 |
|------|------|
| `pending` | 进行中，未落定 |
| `fulfilled` | 成功，有结果值 |
| `rejected` | 失败，有拒绝原因 |

状态**只能从 pending 变到 fulfilled 或 rejected**，一旦落定不可再改。

### 创建 Promise

`new Promise(executor)`，`executor` 接收两个函数参数 `resolve` / `reject`，分别用来把状态改为成功 / 失败：

```js
const p = new Promise((resolve, reject) => {
  const ok = Math.random() > 0.5;
  ok ? resolve('成功') : reject(new Error('失败'));
});
```

### 消费（then / catch / finally）

| 方法 | 作用 |
|------|------|
| `then(onFulfilled, onRejected)` | 成功回调（也可传两个参数处理失败） |
| `catch(onRejected)` | 只处理失败，等价于 `then(undefined, onRejected)` |
| `finally(cb)` | 无论成败都执行，不接收结果、不改变结果 |

```js
fetchData()
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log('结束'));
```

### 链式调用

每个 `then` 返回**新的 Promise**，把返回值传给下一个，从而串联异步步骤：

```js
fetchUser()
  .then(u => fetchPosts(u.id))
  .then(posts => posts[0])
  .then(first => console.log(first));
```

> 链中**任一环节抛错 / 返回 rejected**，会跳到最近的一个 `catch`。`then` 回调里抛异常也会被捕获。

### 静态方法

| 方法 | 作用 | 行为 |
|------|------|------|
| `Promise.resolve(v)` | 构造一个已成功的 Promise | `v` 是 Promise 则原样返回 |
| `Promise.reject(r)` | 构造一个已失败的 Promise | 返回 rejected |
| `Promise.all([...])` | 全部成功才算成功 | 失败则**短路**（第一个失败的原因） |
| `Promise.allSettled([...])` | 等全部落定 | 不短路，各自 `{status, value/reason}` |
| `Promise.race([...])` | 谁先落定用谁 | 先成功或先失败都结束 |
| `Promise.any([...])` | 首个成功者 | 全失败才报错（`AggregateError`） |

```js
Promise.all([reqA(), reqB(), reqC()])
  .then(([a, b, c]) => console.log(a, b, c))
  .catch(err => console.error(err));

Promise.allSettled([reqA(), reqB()])
  .then(rs => rs.forEach(r => console.log(r.status)));
```

> **场景**：`all` 并发等全部、`any` 只要其中一个成功（如多 CDN 竞争）、`race` 加超时（与一个 `setTimeout` reject 竞争）、`allSettled` 不因个别失败中断（批量任务）。

---
## async / await
`async` / `await` 是 `Promise` 的**语法糖**，让异步代码写成同步的样子。

| 语法 | 说明 |
|------|------|
| `async function f(){}` | 函数返回 Promise，内部可用 `await` |
| `await p` | 暂停直到 `p` 落定，取成功值；失败则抛异常 |
| `await expr` | 非 Promise 的表达式被 `Promise.resolve` 包一层 |

```js
async function load() {
  try {
    const user = await fetchUser();     // 暂停直到成功
    const posts = await fetchPosts(user.id);
    return posts;
  } catch (err) {                       // await 的失败在这里捕获
    console.error(err);
    return [];
  }
}
const list = await load();              // 顶层 await / 或 .then
```

> `async` 函数内 `await` 失败会像 `throw` 一样抛到外层，用 `try/catch` 包住即可。`await` 也可放在 `for...of` 里逐个等待（串行），避免 `Promise.all` 需要一次性拿到全部。

---
## 定时器

| API | 作用 |
|------|------|
| `setTimeout(fn, ms, ...args)` | 延迟 `ms` 毫秒后执行一次，返回计时器 id |
| `clearTimeout(id)` | 取消 `setTimeout` |
| `setInterval(fn, ms, ...args)` | 每 `ms` 毫秒执行一次，返回计时器 id |
| `clearInterval(id)` | 取消 `setInterval` |
| `requestAnimationFrame(cb)` | 下一帧绘制前执行，每秒约 60 次，适合动画 |
| `cancelAnimationFrame(id)` | 取消 `requestAnimationFrame` |

```js
const id = setTimeout(() => console.log('延迟后执行'), 1000);
clearTimeout(id);            // 取消，不再执行

let n = 0;
const iv = setInterval(() => {
  if (++n >= 5) clearInterval(iv);
}, 500);
```

> 定时器执行时间**不精确**：`ms` 是"最早何时"，还需等主线程空闲。动画用 `requestAnimationFrame` 而非 `setInterval`（它按刷新率执行、省电高性能）。`setTimeout(fn, 0)` 常用于"放到下一轮宏任务再执行"，把耗时代码让位给 UI 渲染。

---
## fetch
`fetch(url, options)` 是浏览器前端内置的**发网络请求**的异步包，返回 `Promise<Response>`。

### 基础用法

```js
const res = await fetch('/api/user', {
  method: 'GET',               // 或 POST / PUT / DELETE
  headers: { 'Content-Type': 'application/json' },
});
if (!res.ok) throw new Error('HTTP ' + res.status);   // 网络成功不代表业务成功
const data = await res.json();                        // 解析响应体
```

### options 常用配置

| 选项 | 作用 |
|------|------|
| `method` | 请求方法，默认 `GET` |
| `headers` | 请求头对象 |
| `body` | 请求体：字符串 / `FormData` / `URLSearchParams` / `Blob` |
| `credentials` | 是否携带 Cookie（`same-origin` / `include`） |
| `signal` | 关联 `AbortController`，用于取消请求 |
| `mode` | `cors` / `no-cors` / `same-origin`（CORS 控制） |
| `cache` | 缓存策略 |

### 响应对象常用成员

| 成员 | 说明 |
|------|------|
| `res.ok` | 状态码是否 2xx |
| `res.status` / `statusText` | 状态码 / 状态文本 |
| `res.json()` | 解析为 JSON（Promise） |
| `res.text()` | 解析为字符串 |
| `res.blob()` | 解析为二进制（文件/图片下载） |
| `res.headers.get(name)` | 读响应头 |

```js
const res = await fetch('/api/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: '张三' }),
});
```

### 携带表单数据

```js
const fd = new FormData();
fd.append('file', fileInput.files[0]);
await fetch('/upload', { method: 'POST', body: fd });   // 别手动设 Content-Type
```

## AbortController（取消请求）

| API | 作用 |
|------|------|
| `new AbortController()` | 创建控制器 |
| `controller.signal` | 传给 `fetch` 的 `signal` 选项 |
| `controller.abort()` | 触发取消，fetch 的 Promise 抛 `AbortError` |

```js
const ctrl = new AbortController();
setTimeout(() => ctrl.abort(), 3000);   // 3 秒超时
try {
  const res = await fetch(url, { signal: ctrl.signal });
} catch (err) {
  if (err.name === 'AbortError') console.log('已取消');
}
```

---
## 其他浏览器异步包（简介）
| 对象 / API | 作用 |
|-----------|------|
| `XMLHttpRequest` | 老式 AJAX，被 `fetch` 取代，兼容旧代码时用 |
| `WebSocket` | 浏览器与服务端**双向**长连接（聊天、实时推送） |
| `EventSource (SSE)` | 服务端**单向**推送事件流（`text/event-stream`） |
| `Blob` / `FileReader` | 读取本地文件内容（异步） |
| `queueMicrotask(fn)` | 手动把回调排到微任务队列 |
| `navigator.geolocation` | 获取地理位置（回调式异步） |

```js
// WebSocket 小结
const ws = new WebSocket('wss://example.com/socket');
ws.onopen = () => ws.send('hello');
ws.onmessage = (e) => console.log(e.data);
ws.onclose = () => console.log('连接关闭');
```
---