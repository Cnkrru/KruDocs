## 安装

```bash
npm init -y          # 初始化项目
npm install express  # 安装为依赖
```

---

## 最小应用（Hello World）

```js
const express = require('express');
const app = express();      // 创建应用实例
const port = 3000;

app.get('/', (req, res) => {   // 定义路由：路径 + 处理函数
  res.send('Hello World!');
});

app.listen(port, () => {       // 启动服务器监听端口
  console.log(`listening on ${port}`);
});
```

| 组成部分 | 说明 |
|---------|------|
| `express()` | 创建应用实例 `app`，所有路由/中间件挂载于此 |
| `app.get(path, handler)` | 路由：请求方法 + 路径 + 处理函数 |
| `app.listen(port, cb)` | 启动 HTTP 服务器，回调在启动成功后触发 |

运行 `node app.js` 后访问 `http://localhost:3000/`。其他未定义的路径返回 **404**。

---

## 启动与监听

- 作用：启动服务器，让应用对外提供服务。
- 语法：`app.listen(port[, host][, cb])`。
- 注意点：
  - `host` 传 `'0.0.0.0'` 可让局域网设备访问（手机同网段访问本机 IP）。
  - 开发时可用 `node --watch app.js` 实现改代码自动重启（Node 18+ 内置，无需 nodemon）。

```js
// 局域网可访问
app.listen(7528, '0.0.0.0', () => console.log('server on 7528'));
```

---

## 调试

| 方式 | 说明 |
|------|------|
| `DEBUG=express:* node app.js` | 输出 Express 内部路由/中间件匹配日志（Windows 用 `set DEBUG=express:*`） |
| `app.set('env', 'production')` | 生产模式：错误响应不含堆栈跟踪 |

---

## 关键要点

1. `express()` 建应用 → `app.get()` 定义路由 → `app.listen()` 启动
2. 默认只处理定义过的路径，其余 404
3. 轻量框架：模板、数据库、上传都要自己接库（如 EJS、multer、SQLite）
