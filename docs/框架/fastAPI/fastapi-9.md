# FastAPI 依赖注入

## 概念

> 依赖注入用于**共享通用逻辑**，**避免代码重复**。

当多个接口都需要分页参数（skip/limit）、认证信息、数据库连接等通用逻辑时，不必在每个函数重复写。

## 三步法：创建 → 导入 → 声明

### Step 1：创建依赖项（依赖函数）

```python
from fastapi import Query

async def common_parameters(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, le=60),
):
    return {"skip": skip, "limit": limit}
```

- 依赖函数是普通函数，可同步也可异步
- 可用 `Query`/`Path`/`Body` 做同样的参数校验
- 返回值就是注入到路径操作函数中的内容

### Step 2：导入 Depends

```python
from fastapi import Depends
```

### Step 3：在路径操作中声明

```python
from fastapi import FastAPI, Depends

app = FastAPI()

@app.get("/news/news_list")
async def get_news_list(
    commons: dict = Depends(common_parameters),  # ← 声明依赖注入
):
    return commons   # {"skip": x, "limit": y}
```

## 执行流程

```text
请求 /news/news_list?skip=5&limit=20
  → 发现参数 commons 用了 Depends(common_parameters)
  → 自动调用 common_parameters(skip=5, limit=20)
  → 返回值 {"skip":5, "limit":20} 注入 commons
  → 执行 get_news_list
```

## 进阶特性

| 特性 | 说明 |
|------|------|
| 子依赖 | 依赖可嵌套，A 依赖 B，B 依赖 C |
| 依赖覆盖 | 测试时用 `app.dependency_overrides` 替换 |
| 类作为依赖 | 可用 `__call__` 的类代替函数 |
| 全局依赖 | `app = FastAPI(dependencies=[...])` 应用到所有路由 |
| 路由组依赖 | `APIRouter(dependencies=[...])` 应用到一组路由 |

## 用 vs 不用

```python
# ❌ 不用：代码重复
@app.get("/news")  async def get_news(skip: int = 0, limit: int = 10): ...
@app.get("/blogs") async def get_blogs(skip: int = 0, limit: int = 10): ...

# ✅ 用：一处定义，多处复用
@app.get("/news")  async def get_news(commons: dict = Depends(common_parameters)): ...
@app.get("/blogs") async def get_blogs(commons: dict = Depends(common_parameters)): ...
```

> 记忆口诀："创建 → 导入 → 声明"。