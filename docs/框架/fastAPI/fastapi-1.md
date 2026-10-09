# FastAPI 基础

> 来源：黑马程序员 FastAPI 课程。核心理念：用更短时间，教会更实用的技术。

---

## 虚拟环境

### 为什么要创建虚拟环境？

| 核心作用 | 说明 |
|---------|------|
| 隔离项目运行环境 | 每个项目拥有独立的 Python 环境 |
| 避免依赖冲突 | 不同项目可使用同一库的不同版本 |
| 保持全局环境干净稳定 | 不影响系统 Python 或其他项目 |

```bash
# 创建虚拟环境
python -m venv venv

# 激活
venv\Scripts\activate     # Windows
source venv/bin/activate # macOS/Linux
```

---

## 运行 FastAPI 项目

```bash
uvicorn main:app --reload
```

| 参数 | 说明 |
|------|------|
| `uvicorn` | ASGI 服务器，用于运行异步 Python Web 应用 |
| `main` | Python 文件名（main.py，不含扩展名） |
| `app` | FastAPI 实例对象名（在 main.py 中创建） |
| `--reload` | 开发模式专用，代码更改后自动重启 |

> `--reload` 仅用于开发环境，生产环境需移除，改用 `gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker` 多进程方式。

---

## 访问交互式文档

| 文档类型 | URL | 特点 |
|---------|-----|------|
| Swagger UI | `http://127.0.0.1:8000/docs` | 交互式测试，更直观 |
| ReDoc | `http://127.0.0.1:8000/redoc` | 静态文档，适合阅读 |

FastAPI 会根据类型注解自动生成 OpenAPI 文档。

---

## 示例：最小应用

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello FastAPI"}
```

---

## 要点总结

1. 建虚拟环境 → 隔离依赖，避免冲突
2. uvicorn 启动 → `main:app --reload`
3. `/docs` → 自动生成可交互的 API 测试页面

> 敲黑板 划重点：`--reload` 开发必备、`/docs` 自动文档是 FastAPI 的核心优势。