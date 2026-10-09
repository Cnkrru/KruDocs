## 基本用法

- 作用：把目录下的文件直接映射到 URL，浏览器可访问。
- 语法：`app.use(express.static('目录名'))`。
- 注意点：静态目录名**不包含**在 URL 中（`public` 目录本身不是 URL 一部分）。

```js
app.use(express.static('public'));
```

| 磁盘文件 | 访问 URL |
|----------|----------|
| `public/images/kitten.jpg` | `http://localhost:3000/images/kitten.jpg` |
| `public/css/style.css` | `http://localhost:3000/css/style.css` |
| `public/js/app.js` | `http://localhost:3000/js/app.js` |
| `public/hello.html` | `http://localhost:3000/hello.html` |

---

## 虚拟路径前缀

- 作用：给静态目录加一个 URL 前缀（磁盘上不存在的虚拟路径）。
- 语法：`app.use('/前缀', express.static('目录'))`。

```js
app.use('/static', express.static('public'));
```

现在访问 `http://localhost:3000/static/images/kitten.jpg`。

---

## 多个静态目录

- 作用：挂载多个静态目录，按**挂载顺序**查找文件。
- 注意点：先挂的目录优先命中，同名文件取先挂载目录的。

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

---

## 使用绝对路径

- 作用：`express.static` 的相对路径是相对于**启动 node 的目录**，从别处启动会失效；跨目录运行用绝对路径更安全。
- 语法：`app.use('/前缀', express.static(path.join(__dirname, '目录')))`。

```js
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));
```

AL-map 的 `net/server.js` 里 `express.static(getWebDir())` 就是绝对路径写法，把 `src/web/` 目录暴露给手机端访问。

---

## 与路由的配合

静态文件中间件和 API 路由可共存，顺序决定优先级：

```js
app.use(express.json());              // API body 解析
app.use('/api', apiRouter);           // API 路由
app.use(express.static('public'));    // 静态资源（放最后兜底）
```

> 静态文件通常放路由之后：先匹配 API，剩下的交给静态目录，找不到再 404。

---

## 关键要点

1. `express.static('目录')` 把目录映射到根路径，目录名不出现在 URL
2. 加前缀用 `app.use('/static', express.static('public'))`
3. 跨目录运行用 `path.join(__dirname, ...)` 绝对路径
4. 静态文件中间件放路由之后兜底
