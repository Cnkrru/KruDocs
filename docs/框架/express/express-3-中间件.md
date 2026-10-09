## 核心概念

- 作用：在请求到达路由处理函数前，做日志、鉴权、解析等预处理。
- 语法：`(req, res, next) => { ... }`。
- 注意点：如果当前中间件没有结束请求/响应循环，**必须调用 `next()`**，否则请求会一直挂起。

中间件能做的事：

| 能力 | 说明 |
|------|------|
| 执行任意代码 | 日志、鉴权、统计等 |
| 修改 req/res | 往 `req` 挂自定义数据、设置响应头 |
| 结束请求/响应循环 | 直接 `res.send()` 等 |
| 调用下一个中间件 | `next()` 传递控制权 |

---

## 应用层中间件 app.use()

- 作用：挂载到应用实例，**每个请求都会经过**（无挂载路径时）。
- 语法：`app.use([path], fn)`。

```js
// 无路径：所有请求都执行
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// 带路径：仅该路径下的请求执行
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});
```

| 写法 | 作用 |
|------|------|
| `app.use(fn)` | 所有请求都执行 |
| `app.use(path, fn)` | 仅匹配路径的请求执行 |
| `app.use(path, fn1, fn2)` | 挂载多个中间件（子堆栈，按顺序执行） |
| `app.use([fn1, fn2])` | 数组形式挂载，便于复用 |

---

## 路由层中间件 router.use()

- 作用：绑定到 `express.Router()` 实例，只对该路由生效。
- 语法：`router.use(fn)`，用法与应用层相同。

```js
const router = express.Router();
router.use((req, res, next) => {   // 该 router 下所有请求都执行
  console.log('Time:', Date.now());
  next();
});
router.get('/user/:id', (req, res) => res.send('User Info'));
app.use('/', router);
```

`next('route')`：跳过当前路由的剩余中间件，交给下一个路由（仅 `app.METHOD()`/`router.METHOD()` 内有效）。`next('router')`：跳出整个 router。

---

## 内置中间件

Express 4.16+ 自带三个常用内置中间件：

| 中间件 | 作用 | 说明 |
|--------|------|------|
| `express.json()` | 解析 **JSON** 请求体 | 挂载后 `req.body` 才有值（POST/PUT 必备） |
| `express.urlencoded()` | 解析 **表单**（URL 编码）请求体 | 表单提交用 |
| `express.static(dir)` | 提供**静态文件** | 详见静态文件笔记 |

```js
app.use(express.json());          // 解析 JSON body
app.use(express.urlencoded({ extended: true }));  // 解析表单 body
```

其他中间件（cookie-parser、session 等）在 4.x 起都拆成独立 npm 包，按需安装。

---

## 第三方中间件

- 作用：给应用添加额外功能（Cookie、上传、跨域、日志等）。
- 语法：`npm install 包名` → `app.use(包名())`。

```bash
npm install cookie-parser
```

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

常用第三方中间件：`cookie-parser`（Cookie）、`multer`（文件上传）、`cors`（跨域）、`morgan`（日志）。

---

## 执行顺序

中间件**按挂载顺序**执行，先挂的先跑。常见组织顺序：

```js
app.use(express.json());          // 1. 解析 body
app.use(morgan('dev'));           // 2. 请求日志
app.use('/api', apiRouter);       // 3. 业务路由
app.use((err, req, res, next) => { // 4. 错误处理（放最后）
  res.status(500).send('Something broke!');
});
```

顺序很重要：body 解析要在路由之前，错误处理中间件要放在**所有路由之后**。

---

## 关键要点

1. 中间件必须调用 `next()` 或结束响应，否则请求挂起
2. `app.use()` 应用层全局生效，`router.use()` 仅路由内生效
3. `express.json()` 是 POST 解析 body 的必备中间件
4. 错误处理中间件固定放最后，4 个参数 `(err, req, res, next)`
