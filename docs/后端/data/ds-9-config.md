

# 数据序列化

---
## Config配置文件笔记

### 基本概念
- **本质**：Config文件是**文本文件的一种专门用途变种**，类似于Log文件，本质上都是基于Txt文件的分工产物
- **核心功能**：用于存储和管理应用程序的配置信息
- **扩展名**：通常使用 `.config`，但也可能根据格式使用 `.json`、`.yaml` 等

### 支持的配置格式

- 注释：以下6种都支持，但尽量不要混写
#### 1. JSON格式
```json
{
  "server": {
    "port": 8080,
    "host": "localhost"
  },
  "database": {
    "url": "jdbc:mysql://localhost:3306/app",
    "credentials": {
      "username": "admin",
      "password": "secret"
    }
  }
}
```

#### 2. YAML格式
```yaml
server:
  port: 8080
  host: localhost

database:
  url: jdbc:mysql://localhost:3306/app
  credentials:
    username: admin
    password: secret
```

#### 3. TOML格式
```toml
[server]
port = 8080
host = "localhost"

[database]
url = "jdbc:mysql://localhost:3306/app"

[database.credentials]
username = "admin"
password = "secret"
```

#### 4. INI格式
```ini
[server]
port = 8080
host = localhost

[database]
url = jdbc:mysql://localhost:3306/app
username = admin
password = secret
```

#### 5. XML格式
```xml
<configuration>
  <server>
    <port>8080</port>
    <host>localhost</host>
  </server>
  <database>
    <url>jdbc:mysql://localhost:3306/app</url>
    <credentials>
      <username>admin</username>
      <password>secret</password>
    </credentials>
  </database>
</configuration>
```

#### 6. 自定义key=value格式
```markdown
# Server configuration
server.port=8080
server.host=localhost

# Database configuration
database.url=jdbc:mysql://localhost:3306/app
database.username=admin
database.password=secret
```
