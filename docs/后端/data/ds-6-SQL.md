

# SQL

## 1. SQL基础

### 1.1 MySQL指令
- **show databases**：查看有哪些数据库
- **use dbid**：进入该数据库
- **show tables**：查看该数据库有哪些表
- **exit**：退出MySQL

### 1.2 SQL基础语法

#### 1.2.1 DDL(定义语法)

##### 库语言
- **show databases**：查看有哪些数据库
- **use dbid**：进入目标数据库
- **create database dbid**：创建新的数据库
- **select database**：查看当前数据库

##### 表语言
- **show tables**：查看表格
- **create table tableid (listid1 类型，……)**：创建新表格
- **drop table tableid**：删除表格

#### 1.2.2 DML(操作语法)
- **insert into tableid [(list1，list2，list3……)] value(值1，值2，值3……)**：插值
- **delete from tableid (while判断)**：去值
- **update tableid set list=value(while条件)**：更新

#### 1.2.3 DQL(查询语法)
- **select listid from tableid(while 条件)**：查询id列表
- **select * from tableid**：查询所有列表
- **select listid|count_def from tableid(while 条件) group by listid**：查询id列表/聚合函数
- **后缀：+order by listid[asc/desc]**：asc表示正向排序/desc表示反向排序

### 1.3 pymysql
- **pymysql**：python管理数据库的包

### 1.4 备注

#### 1.4.1 术语说明
- **dbid**：数据库名
- **tableid**：表格名
- **listid**：列名

#### 1.4.2 数据类型
- **整形**：int
- **浮点**：float
- **字符**：varchar(最长255)
- **日期**：data
- **时间**：timestamp

#### 1.4.3 聚合函数
- **sum（列）**：求和
- **avg（列）**：均值
- **min（列）**：最小
- **max（列）**：最大
- **const（列）**：求数量

## 2. 数据库分类

### 2.1 常见数据库分类
- 一般情况下：MySQL+Redis够用
- 小型项目：SQL

### 2.2 关系型数据库 (RDBMS)
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| MySQL | Oracle | 开源、稳定、性能优异 | 网站、应用后端、中小型系统 |
| PostgreSQL | PostgreSQL Global Development Group | 功能丰富、支持复杂查询、扩展性强 | 企业级应用、数据分析、GIS系统 |
| Oracle Database | Oracle | 功能全面、可靠性高、适合大型系统 | 大型企业、金融、政府系统 |
| SQL Server | Microsoft | 与Windows生态集成、管理工具友好 | 企业内部系统、.NET应用 |
| SQLite | D. Richard Hipp | 轻量级、文件型数据库、无需服务器 | 移动应用、嵌入式系统、小型工具 |
| MariaDB | MariaDB Foundation | MySQL分支、开源、性能优化 | 替代MySQL的场景、开源项目 |

### 2.3 非关系型数据库 (NoSQL)

#### 2.3.1 文档型数据库
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| MongoDB | MongoDB Inc. | 文档存储、灵活模式、水平扩展 | 内容管理、用户数据、移动应用后端 |
| CouchDB | Apache Software Foundation | 面向文档、RESTful API、支持复制 | 离线应用、移动同步、内容管理 |
| RavenDB | Hibernating Rhinos | 面向文档、ACID事务、内置全文搜索 | .NET应用、企业级文档存储 |

#### 2.3.2 键值存储数据库
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| Redis | Redis Labs | 内存存储、高性能、支持多种数据结构 | 缓存、会话存储、实时分析 |
| Memcached | Danga Interactive | 简单键值存储、高性能、分布式 | 缓存、会话管理、高频读写场景 |
| DynamoDB | Amazon | 完全托管、高可用、自动扩展 | 云原生应用、服务器less架构 |

#### 2.3.3 列存储数据库
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| Cassandra | Apache Software Foundation | 高可扩展、分布式、容错 | 大数据、物联网、时间序列数据 |
| HBase | Apache Software Foundation | 基于Hadoop、高可靠性、列式存储 | 大数据、实时查询、结构化数据 |
| ClickHouse | Yandex | 列式存储、OLAP优化、高性能分析 | 数据分析、BI系统、日志分析 |

#### 2.3.4 图数据库
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| Neo4j | Neo4j, Inc. | 原生图存储、Cypher查询语言 | 社交网络、推荐系统、知识图谱 |
| OrientDB | OrientDB LTD | 多模型数据库、支持图和文档 | 复杂关系、实时分析、混合数据 |
| ArangoDB | ArangoDB GmbH | 多模型数据库、AQL查询语言 | 复杂数据关系、实时应用 |

### 2.4 内存数据库
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| Redis | Redis Labs | 内存存储、多种数据结构、持久化 | 缓存、会话管理、实时分析 |
| Memcached | Danga Interactive | 简单键值存储、高性能 | 缓存、会话存储 |
| SAP HANA | SAP | 内存计算、OLAP和OLTP混合 | 企业级分析、实时决策 |
| VoltDB | VoltDB Inc. | 内存OLTP、ACID事务 | 金融交易、电信计费、实时监控 |

### 2.5 时序数据库
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| InfluxDB | InfluxData | 时间序列优化、高性能写入 | IoT传感器数据、监控系统、日志分析 |
| Prometheus | CNCF | 开源监控系统、时序数据存储 | 系统监控、告警、指标收集 |
| TimescaleDB | Timescale | PostgreSQL扩展、关系型时序数据库 | 时间序列数据、分析查询 |
| OpenTSDB | OpenTSDB Community | 基于HBase、大规模时序数据 | 监控系统、物联网数据 |

### 2.6 搜索引擎数据库
| 数据库名称 | 开发商 | 特点 | 适用场景 |
|-----------|--------|------|----------|
| Elasticsearch | Elastic | 分布式搜索、全文索引、实时分析 | 全文搜索、日志分析、监控告警 |
| Solr | Apache Software Foundation | 企业级搜索、可扩展性强 | 网站搜索、电子商务、内容管理 |
| Sphinx | Sphinx Technologies Inc. | 全文搜索、高性能、开源 | 网站搜索、应用内搜索 |
| Algolia | Algolia | 托管搜索服务、实时搜索 | 前端搜索、电商产品搜索 |

## 3. SQLite存储

### 3.1 SQLite数据类型

SQLite 采用动态类型系统，支持以下主要数据类型：

| 数据类型 | 描述 | 存储文件的应用 |
|---------|------|---------------|
| null | 空值 | 表示不存在的数据 |
| integer | 整数类型（1-8字节） | 存储文件大小、ID等数值信息 |
| real | 浮点数类型（8字节） | 存储文件相关的浮点数值 |
| text | 文本类型（UTF-8/UTF-16） | 存储文件路径、文件名、描述等文本信息 |
| blob | 二进制大对象 | **直接存储文件的二进制数据**，如图片、音频、视频等 |

### 3.2 适合存储的文件类型

| 文件类型 | 建议存储方式 | 适用场景 |
|---------|------------|----------|
| 文本文件（.txt, .csv等） | text 或 blob | 小文本文件适合text，大文本文件适合blob |
| 图片文件（.jpg, .png等） | blob 或路径存储 | 小图片适合blob，大图片建议路径存储 |
| 音频文件（.mp3, .wav等） | blob 或路径存储 | 短音效适合blob，音乐文件建议路径存储 |
| 视频文件（.mp4, .avi等） | 路径存储 | 视频文件通常较大，建议存储路径 |
| 文档文件（.pdf, .doc等） | blob 或路径存储 | 小文档适合blob，大文档建议路径存储 |
| 配置文件（.json, .xml等） | text 或 blob | 适合text存储，方便直接读取和修改 |

### 3.3 存储策略

| 策略 | 适用场景 | 优点 | 缺点 |
|------|----------|------|------|
| 全部blob存储 | 小文件、数据完整性要求高 | 数据一致性好，备份简单 | 数据库文件大，性能可能下降 |
| 全部路径存储 | 大文件、性能要求高 | 数据库小，性能好 | 数据完整性依赖文件系统 |
| 混合存储 | 混合大小的文件 | 灵活适应不同场景 | 管理复杂度增加 |