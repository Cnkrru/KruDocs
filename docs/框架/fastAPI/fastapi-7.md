# FastAPI 异常处理

## HTTPException

`HTTPException` 是 FastAPI 内置的异常类，用于中断正常处理流程并返回标准的 HTTP 错误响应。适用客户端错误（4xx）。

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get('/news/{id}')
async def get_news(id: int):
    id_list = [1, 2, 3, 4, 5, 6]
    if id not in id_list:
        raise HTTPException(status_code=404, detail="当前id不存在")
    return {"id": id}
```

请求 `/news/100` 响应：`{"detail": "当前id不存在"}`（404）。

## 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `status_code` | `int` | ✅ | HTTP 状态码（404、401、403 等） |
| `detail` | `str` / `Any` | ❌ | 错误详情，序列化为 JSON 响应 |
| `headers` | `dict` | ❌ | 自定义响应头 |

## 常用状态码

| 场景 | 状态码 |
|------|--------|
| 资源未找到 | 404 |
| 认证失败 | 401 |
| 权限不足 | 403 |
| 参数错误 | 422 |
| 请求参数有误 | 400 |

## HTTPException vs Pydantic 自动校验

| 特性 | HTTPException | Pydantic 自动校验 |
|------|--------------|------------------|
| 触发方式 | 手动 `raise` | 自动触发 |
| 使用场景 | 业务逻辑错误（ID 不存在） | 参数类型/格式错误 |
| 状态码 | 自定义（通常 4xx） | 默认 422 |

## 进阶：自定义异常处理

```python
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"success": False, "error_code": f"ERR_{exc.status_code}", "message": exc.detail},
    )
```

## 要点

> 客户端出错用 `HTTPException`，自动返回标准 JSON，`status_code` + `detail` 两参数。