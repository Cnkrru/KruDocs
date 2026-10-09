# FastAPI 中间件

## 作用

> 中间件是一个在**每次请求进入 FastAPI 应用时**都会执行的函数，为每个请求添加统一的处理逻辑。

- 在请求到达路由处理函数**之前**执行
- 在响应返回客户端**之前**再执行一次
- 全局生效，作用于所有请求

典型应用：记录日志、身份认证、CORS 跨域、设置响应头、请求限流、性能监控、全局异常处理。

## 定义方式

```python
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def my_middleware(request: Request, call_next):
    # 1. 请求到达路由前执行
    response = await call_next(request)   # 2. 调用下一个中间件或路由
    # 3. 响应返回客户端前执行
    return response
```

| 参数 | 说明 |
|------|------|
| `request` | 当前 HTTP 请求对象（含 headers、body、query params） |
| `call_next` | 调用链中的下一个处理函数（中间件或路由） |

关键点：
- 必须用 `async def` 定义，装饰器参数固定为 `"http"`
- **必须调用 `await call_next(request)`**，否则请求不会到达路由

## 多个中间件的执行顺序

**自下而上**（洋葱模型 / 先进后出）：

```text
注册顺序                实际执行顺序（请求→）
中间件A（第1注册）   →   A_before → B_before → 路由 → B_after → A_after（响应←）
中间件B（第2注册）
路由处理函数
```

先注册的中间件，请求阶段先执行，响应阶段后执行。

## 完整示例

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import time

app = FastAPI()

# 日志中间件
@app.middleware("http")
async def log_middleware(request: Request, call_next):
    start_time = time.time()
    print(f"[LOG] {request.method} {request.url.path}")
    response = await call_next(request)
    process_time = time.time() - start_time
    print(f"[LOG] Completed in {process_time:.3f}s - Status {response.status_code}")
    response.headers["X-Process-Time"] = str(process_time)
    return response

# 认证中间件（可放行登录接口）
@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    if request.url.path == "/login":
        return await call_next(request)
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return JSONResponse(status_code=401, content={"detail": "Missing authentication"})
    return await call_next(request)
```

## 与依赖注入（Depends）的对比

| 特性 | 中间件 Middleware | 依赖注入 Depends |
|------|------------------|------------------|
| 作用范围 | 全局所有请求 | 特定路由或路由组 |
| 执行时机 | 请求进入 → 响应返回（完整生命周期） | 路由处理前 |
| 使用场景 | 日志、CORS、全局认证、性能监控 | 数据库连接、参数校验、业务级认证 |

## 最佳实践

1. 保持轻量，中间件在每个请求都会执行
2. 始终 `return response` 或 `return await call_next(request)`
3. 在中间件中捕获异常，避免影响后续处理
4. 合理安排中间件注册顺序