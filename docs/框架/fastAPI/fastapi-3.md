# FastAPI 路径参数

## 基本用法

路径参数是 URL 路径中的动态部分，用 `{}` 包裹，用于定位唯一、特定的资源（如单条数据）。

```python
@app.get("/book/{id}")        # ① 路径中声明参数 {id}
async def get_book(id: int):  # ② 函数参数同名 + 类型注解
    return {"id": id, "title": f"这是第{id}本书"}
```

请求 `127.0.0.1:8000/book/666` 响应：`{"id": 666, "title": "这是第666本书"}`

关键点：
1. 路径里写 `{参数名}` 占位
2. 函数用**同名参数 + 类型注解**接收，FastAPI 自动提取并类型转换
3. 传错类型（如 `/book/abc`）自动返回 422 验证错误

---

## 类型注解的两种方式

### 方式一：Python 原生注解（简单场景）

```python
@app.get("/book/{id}")
async def get_book(id: int):
    return {"id": id}
```

自动获得：类型转换 + 数据校验 + 自动生成 API 文档。

### 方式二：Path 注解（高级校验场景）

```python
from fastapi import Path

@app.get("/book/{id}")
async def get_book(id: int = Path(..., title="书籍ID", ge=1)):
    return {"id": id}
```

也可用 `Annotated` 推荐写法（Python 3.9+）：

```python
from typing import Annotated
from fastapi import Path

@app.get("/book/{id}")
async def get_book(book_id: Annotated[int, Path(..., ge=1, le=9999)]):
    return {"book_id": book_id}
```

---

## Path 参数说明

| 参数 | 说明 |
|------|------|
| `...` | 必填标记（Ellipsis） |
| `gt` / `ge` | 大于 / 大于等于 |
| `lt` / `le` | 小于 / 小于等于 |
| `min_length` / `max_length` | 长度限制（字符串） |
| `regex` | 正则匹配 |
| `title` / `description` | 文档标题与描述 |

---

## 路径参数 vs 查询参数

| 特性 | 路径参数 Path | 查询参数 Query |
|------|--------------|---------------|
| URL 位置 | `/items/{id}` | `/items?id=123` |
| 用途 | 标识唯一资源 | 筛选 / 过滤 |
| 是否必填 | 通常必填 | 可设默认值 |
| 适用场景 | 资源唯一标识 | 搜索条件、分页 |

---

## 常见错误与注意事项

```python
# ❌ 动态路径会拦截固定路径
@app.get("/users/{user_id}")
@app.get("/users/me")      # 永远匹配不到！
# ✅ 固定路径放前面声明
@app.get("/users/me")
@app.get("/users/{user_id}")
```

类型不匹配返回 422：

```json
{
  "detail": [{"loc": ["path", "id"], "msg": "value is not a valid integer"}]
}
```

---

## 要从速背

> 路径参数用 `{}`，类型注解不能省；
> Path() 加校验，`...` 表示必填项；
> gt/ge/lt/le 管数字，min/max 管长度；
> description 写文档，API 文档自动生成。

相关参数类型：`Path()` 路径、`Query()` 查询、`Body()` 请求体、`Header()` 请求头、`Cookie()`、`File()` 文件、`Form()` 表单。