# FastAPI ORM

## ORM 简介

**ORM = Object-Relational Mapping（对象关系映射）**：在面向对象编程语言和关系型数据库之间建立映射，通过操作对象的方式与数据库交互，无需手写 SQL。

| 维度 | 说明 |
|------|------|
| 桥梁作用 | 面向对象语言 ⟷ 关系型数据库 |
| 核心思想 | 用"操作对象"替代"手写 SQL" |
| 典型代表 | SQLAlchemy、SQLModel、Tortoise ORM、Peewee |

### 四大优势

| 优势 | 表现 |
|------|------|
| 减少重复 SQL | 通用 CRUD 无需重复编写 |
| 代码简洁易读 | 面向对象语法 `user.name = "Tom"` 直接映射字段更新 |
| 自动管理连接与事务 | 连接池、事务提交/回滚自动处理 |
| 防止 SQL 注入 | 底层参数化查询，杜绝拼接 SQL |

### FastAPI 推荐搭配

| 组合 | 特点 | 适用场景 |
|------|------|---------|
| FastAPI + SQLAlchemy | 功能最全、生态成熟 | 中大型项目、复杂查询 |
| FastAPI + Tortoise ORM | 原生异步、Django-like | 纯异步、快速开发 |
| FastAPI + SQLModel | 基于 SQLAlchemy + Pydantic | 现代 FastAPI 项目（推荐） |

---

## 1. 创建异步数据库引擎

FastAPI 配合 SQLAlchemy 推荐使用**异步引擎**发挥异步性能优势。

```python
from sqlalchemy.ext.asyncio import create_async_engine

ASYNC_DATABASE_URL = "mysql+aiomysql://root:123456@localhost:3306/fastapi_test?charset=utf8"

async_engine = create_async_engine(
    ASYNC_DATABASE_URL,
    echo=True,       # 输出 SQL 日志（仅开发）
    pool_size=10,    # 连接池持久连接数
    max_overflow=20  # 额外允许的连接数
)
```

URL 格式：`驱动://用户名:密码@主机:端口/数据库名?参数`。密码生产环境应放环境变量。

| 参数 | 作用 |
|------|------|
| `echo` | 是否打印 SQL，开发开启、生产关闭 |
| `pool_size` | 连接池持久维持的连接数 |
| `max_overflow` | pool_size 耗尽时允许额外创建的连接数（总上限 = pool_size + max_overflow） |

常用异步驱动：MySQL → `aiomysql`、PostgreSQL → `asyncpg`、SQLite → `aiosqlite`。

---

## 2. 定义模型类（SQLAlchemy 2.0）

SQLAlchemy 2.0 新语法：`Mapped[T]` 类型注解 + `mapped_column()`，基类用 `DeclarativeBase`。

```python
from datetime import datetime
from sqlalchemy import func, String, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    """通用基类：含创建/更新时间字段"""
    create_time: Mapped[datetime] = mapped_column(
        DateTime,
        insert_default=func.now(),
        default=datetime.now,
        comment="创建时间",
    )
    update_time: Mapped[datetime] = mapped_column(
        DateTime,
        insert_default=func.now(),
        onupdate=func.now(),   # 更新时自动刷新
        default=datetime.now,
        comment="修改时间",
    )

class Book(Base):
    __tablename__ = "book"
    id: Mapped[int] = mapped_column(primary_key=True)
    bookname: Mapped[str] = mapped_column(String(255))
    author: Mapped[str] = mapped_column(String(255))
```

| 版本 | 特性 |
|------|------|
| SQLAlchemy 1.x | `Column(...)` + `declarative_base()` |
| SQLAlchemy 2.0 | `mapped_column()` + `DeclarativeBase` + `Mapped[T]` |

---

## 3. 数据库会话（依赖注入）

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

AsyncSessionLocal = sessionmaker(async_engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
```

---

## 4. 在路由中使用 ORM

```python
from fastapi import FastAPI, Depends
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

app = FastAPI()

@app.post("/books/", response_model=BookResponse)
async def create_book(book: BookCreate, db: AsyncSession = Depends(get_db)):
    db_book = Book(**book.model_dump())
    db.add(db_book)
    await db.commit()
    await db.refresh(db_book)
    return db_book

@app.get("/users/{user_id}")
async def read_user(user_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()
```

---

## 5. 创建数据库表

```python
async def create_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.on_event("startup")
async def startup_event():
    await create_tables()
```

- `async with async_engine.begin()`：从连接池获取连接并自动开启事务
- `conn.run_sync(...)`：让同步的 SQLAlchemy API 在异步环境中运行
- `Base.metadata.create_all`：根据模型创建缺失的表（不会删已存在的表）

### FastAPI 2.0+ 推荐写法（lifespan）

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await async_engine.dispose()

app = FastAPI(lifespan=lifespan)
```

`create_all` 只创建缺失的表，表结构变更需用 Alembic 迁移。

---

## 要点速记

1. ORM 不是银弹：复杂报表、性能敏感场景仍需手写 SQL
2. FastAPI 首选 SQLModel，与 Pydantic v2 深度整合
3. 始终用异步 Session，保持全链路异步
4. 依赖注入 `Depends(get_db)` 实现请求级会话生命周期管理
5. 密码禁止硬编码，放环境变量