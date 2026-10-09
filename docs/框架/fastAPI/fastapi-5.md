# FastAPI 请求体参数

## 概念

请求体参数位于 HTTP 请求的消息体（body）中，用于**创建、更新资源**，携带大量数据（通常为 JSON）。

| 特性 | 说明 |
|------|------|
| 位置 | HTTP 请求的 body 中 |
| 作用 | 创建资源、更新资源 |
| 数据特点 | 携带大量数据，通常为 JSON |
| 常用方法 | POST（创建）、PUT/PATCH（更新） |

> GET 请求一般没有请求体，参数通过 URL（查询参数）传递。

HTTP 完整请求三部分：① 请求行（方法、URL、协议版本）② 请求头（Content-Type、Authorization 等元数据）③ 请求体（实际发送的数据）。

---

## 核心机制：Pydantic 模型 + 类型注解

**三步走：建模 → 注解 → 自动验证。**

### Step 1：定义 Pydantic 模型

```python
from pydantic import BaseModel

class User(BaseModel):
    username: str      # 必填
    password: str      # 必填
```

必须继承 `BaseModel`，字段用 Python 类型注解声明。

### Step 2：路由函数中类型注解声明

```python
from fastapi import FastAPI

app = FastAPI()

@app.post("/register")
async def register(user: User):   # ← 请求体参数
    return user                   # 自动序列化为 JSON
```

FastAPI 自动解析 JSON 请求体 → Pydantic 校验类型 → 注入 `User` 实例。校验失败返回 422。

客户端请求需带 `Content-Type: application/json`。

---

## 请求体 vs 其他参数

| 参数类型 | 声明方式 | 数据来源 | 适用场景 |
|---------|---------|---------|---------|
| 路径参数 | `{item_id}` / `Path()` | URL 路径 | 资源标识 |
| 查询参数 | `q: str = Query(...)` | URL `?` 之后 | 筛选、搜索 |
| 请求体参数 | `item: Item`（Pydantic 模型） | HTTP Body | 创建 / 更新数据 |

> FastAPI 推断规则：Pydantic 模型类型 → 请求体参数；单值类型且在路径 → 路径参数；单值且不在路径 → 查询参数。

---

## 类型注解的两种方式

### 方式一：Python 原生注解

```python
class User(BaseModel):
    username: str
    password: str
    age: Optional[int] = None   # 可选
    is_active: bool = True
```

### 方式二：Field 注解（高级校验）

```python
from pydantic import BaseModel, Field
from datetime import datetime

class UserCreate(BaseModel):
    username: str = Field(
        ...,                 # 必填（Ellipsis）
        min_length=3,
        max_length=20,
        description="用户名",
        example="john_doe",  # 文档示例值
    )
    password: str = Field(..., min_length=6)
    age: int = Field(default=None, ge=0, le=150, description="年龄")
    birthday: Optional[datetime] = None
```

---

## Field 参数说明

| 参数 | 说明 | 示例 |
|------|------|------|
| `...` | 必填字段标记 | `Field(...)` |
| `default` | 默认值 | `Field(default="guest")` |
| `gt` / `ge` | 大于 / 大于等于 | `Field(ge=0)` |
| `lt` / `le` | 小于 / 小于等于 | `Field(le=150)` |
| `min_length` / `max_length` | 字符串长度限制 | `Field(min_length=3)` |
| `regex` | 正则匹配 | `Field(regex="^book_")` |
| `description` | 字段描述（文档用） | `Field(description="用户名")` |
| `example` | 文档示例值 | `Field(example="iPhone")` |

> 对比普通写法：`username: str`（无验证）vs `username: str = Field(..., min_length=3)`（带验证+文档）。

---

## 进阶

### 单个值作为请求体（embed）

```python
@app.put("/items/{item_id}")
async def update_item(
    item_id: int,
    importance: int = Body(5, embed=True),  # 单个值包装为 JSON 键
):
    ...
```

### 多个请求体参数

当函数有多个 Pydantic 模型参数时，FastAPI 会把它们作为请求体里的多个键。

### 响应模型分离

入参模型（UserCreate）与出参模型（UserResponse）分开，可隐藏敏感字段（如密码）。

### 版本注意

Pydantic v2：用 `.model_dump()` 替代 v1 的 `.dict()`，ORM 用 `from_attributes=True` 替代 `orm_mode`。

---

## 常见错误

| 错误场景 | 现象 | 解决 |
|---------|------|------|
| 忘记继承 `BaseModel` | 被识别为查询参数 | `class User(BaseModel):` |
| 请求格式错误 | 422 Validation Error | 检查 `Content-Type: application/json` |
| 可选字段未给默认值 | 被当作必填 | 用 `Optional[T] = None` 或 `Field(default=None)` |

## 记忆口诀

> 创建更新用 Body（POST/PUT/PATCH）；模型继承 BaseModel；类型注解不能少；自动校验文档全。