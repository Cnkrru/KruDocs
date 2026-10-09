# FastAPI 响应类型

## 默认响应机制

FastAPI 自动将路径操作函数返回的 Python 对象序列化：

```text
Python对象 → jsonable_encoder → JSON兼容格式 → 包装为 JSONResponse
```

> 不指定时，FastAPI 默认返回 `JSONResponse`。

---

## 常用响应类型

| 响应类型 | 场景 | 示例 |
|---------|------|------|
| `JSONResponse` | REST API 默认返回 | `return {"key": "value"}` |
| `HTMLResponse` | 返回网页 / 模板渲染 | `return HTMLResponse(html_content)` |
| `PlainTextResponse` | 返回纯文本 / 日志 | `return PlainTextResponse("text")` |
| `FileResponse` | 文件下载 / 图片查看 | `return FileResponse(path)` |
| `StreamingResponse` | 大文件 / 实时流数据 | 生成器函数返回 |
| `RedirectResponse` | URL 跳转 / 接口迁移 | `return RedirectResponse(url)` |

从 `fastapi.responses` 导入。

### FileResponse

```python
from fastapi.responses import FileResponse

@app.get("/download/{filename}")
async def download_file(filename: str):
    return FileResponse(
        path=f"/files/{filename}",
        filename=filename,                # 客户端下载时显示的文件名
        media_type="application/octet-stream",  # 强制下载而非预览
    )
```

### StreamingResponse

```python
@app.get("/stream")
async def stream_data():
    return StreamingResponse(generate_data(), media_type="text/plain")
```

适用：大文件传输、实时数据推送、SSE。

---

## 两种设置方式

### 方式一：装饰器中指定响应类（固定返回类型）

```python
@app.get("/html", response_class=HTMLResponse)
async def get_html():
    return "<h1>这是标题</h1>"   # 直接返回字符串，自动包装
```

适合固定的 HTML / 纯文本 / JSON。

- `HTMLResponse` → `text/html`
- `PlainTextResponse` → `text/plain`
- `JSONResponse` → `application/json`

### 方式二：返回响应对象（动态 / 复杂响应）

```python
@app.get("/file")
async def get_file():
    return FileResponse("./files/1.jpeg")
```

适合文件下载、图片、流式响应、自定义 headers。

> 选择：需要动态控制响应参数（文件、流、headers）→ 返回响应对象；固定格式 → 装饰器指定。

---

## 自定义响应数据格式：response_model

`response_model` 是路径操作装饰器的关键参数，通过 Pydantic 模型严格约束输出格式，是保障数据安全性的"第一道防线"。

```python
from pydantic import BaseModel

class News(BaseModel):
    id: int
    title: str
    content: str

@app.get("/news/{id}", response_model=News)
async def get_news(id: int):
    return {"id": id, "title": "标题", "content": "内容"}
```

作用：
1. **自动验证**：强制输出符合声明类型
2. **字段过滤**：只返回模型定义的字段，多余字段被过滤
3. **安全保护**：防止密码、token 等敏感字段泄露

```python
# 安全：出参模型不含 password，即使内部对象有也自动过滤
@app.get("/user/{id}", response_model=UserOut)
async def get_user(id: int):
    user = db.get_user(id)   # 含 password
    return user              # 自动过滤，只返回 id/username/email
```

相关：`response_model_exclude`（排除字段）、`response_model_include`（仅包含字段）、`status_code`（状态码）。

> response_model 三件套：定义模型 → 装饰器绑定 → 自动过滤保安全。