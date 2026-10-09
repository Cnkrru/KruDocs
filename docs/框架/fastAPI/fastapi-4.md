# FastAPI 查询参数

## 基本概念

> 当声明的参数**不是路径参数**时，FastAPI 会自动将其解释为**查询参数**。

| 特性 | 说明 |
|------|------|
| 位置 | URL 中 `?` 之后 |
| 格式 | `key1=value1&key2=value2` |
| HTTP 方法 | 主要用于 GET 请求 |
| 核心作用 | 对资源集合进行过滤、排序、分页等操作 |

```python
@app.get("/news/news_list")
async def get_news_list(skip: int, limit: int = 10):
    return {"skip": skip, "limit": limit}
```

请求 URL：`http://127.0.0.1:8000/news/news_list?skip=0&limit=10`

- `skip: int` 无默认值 → **必填**，省略会报错
- `limit: int = 10` 有默认值 → **可选**

## 类型注解的两种方式

| 方式 | 用法 | 场景 |
|------|------|------|
| Python 原生注解 | `user_id: int` | 简单类型声明 |
| Query 注解 | `user_id: int = Query(...)` | 需要额外验证、文档、默认值 |

```python
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/items/")
async def read_items(
    q: str | None = Query(default=None, min_length=3, max_length=50),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, gt=0, le=100),
):
    return {"q": q, "skip": skip, "limit": limit}
```

## Query() 进阶用法

```python
q: str = Query(default="fastapi")            # 默认值
q: str = Query(...)                          # 必填
q: str = Query(min_length=3, max_length=50, regex="^fixedquery$")  # 验证
q: str = Query(alias="item-query")           # 别名（变量名与 URL 参数名不一致）
q: str = Query(title="查询字符串", description="用于搜索的查询条件")  # 文档
q: str = Query(deprecated=True)              # 废弃标记
```

## 常用应用场景

| 场景 | 参数示例 | 说明 |
|------|---------|------|
| 分页 | `?skip=0&limit=20` | 跳过 0 条，取 20 条 |
| 过滤 | `?category=tech&published=true` | 按分类、状态过滤 |
| 排序 | `?sort=-created_at` | 按创建时间倒序 |
| 搜索 | `?q=fastapi+tutorial` | 关键词搜索 |

## 快速记忆

> 路径参数用 `{}`，查询参数靠自动；
> 有默认值是可选，无默认值必须填；
> `?` 后 `&` 连接，`key=value` 成对现。