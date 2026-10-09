# FastAPI 路由

> FastAPI 的路由定义基于 Python 的装饰器模式。

## 核心结构

```python
from fastapi import FastAPI

app = FastAPI()          # FastAPI 实例
@app.get("/")            # 路由装饰器：请求方法 + 请求路径
async def root():
    return {"message": "hello world"}
```

| 组成部分 | 说明 | 对应代码 |
|---------|------|---------|
| FastAPI 实例 | 应用核心对象，所有路由挂载于此 | `app = FastAPI()` |
| 装饰器 | 把函数注册为路由处理函数 | `@app.get("/")` |
| 请求方法 | HTTP 动词（GET/POST/PUT/DELETE 等） | `.get` |
| 请求路径 | URL 端点，支持路径参数 | `"/"` |
| 响应结果 | 自动 JSON 序列化的返回数据 | `return {...}` |

## async def

- FastAPI 原生支持异步编程（基于 Starlette + asyncio）
- `async def` 适合 I/O 密集型操作（数据库、HTTP 请求等）
- 混合同步/异步代码时，FastAPI 会自动判断并运行在独立线程池

## 常用 HTTP 方法装饰器

```python
@app.get("/items")        # 获取资源
@app.post("/items")       # 创建资源
@app.put("/items/{id}")   # 全量更新
@app.patch("/items/{id}") # 部分更新
@app.delete("/items/{id}")# 删除资源
```

## 路由组织方式

### 方式一：直接挂载（小型项目）

所有路由直接写在 `app` 上。

### 方式二：APIRouter 模块化（推荐中大型项目）

```python
# routers/users.py
from fastapi import APIRouter
router = APIRouter(prefix="/users", tags=["用户管理"])

@router.get("/")
async def list_users(): ...

# main.py
from fastapi import FastAPI
from routers import users

app = FastAPI()
app.include_router(users.router)
```

## 关键要点

1. 先写固定的路径，再声明动态路径（避免像 `/users/me` 被 `/users/{id}` 拦截）
2. 路径以 `/` 开头
3. 返回字典或 Pydantic 模型，FastAPI 自动序列化 JSON
4. 语义化使用 HTTP 方法（RESTful 设计）