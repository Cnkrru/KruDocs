

# 数据序列化

---
## 日志文件（Log）基础知识

- log文件可以看作一个写法规范的txt文件，专门记录运行日志

---
### 日志文件内容

#### 常见记录内容
- **时间戳**：记录事件发生的具体时间
- **日志级别**：表示事件的严重程度
- **事件描述**：详细说明发生了什么
- **来源信息**：事件产生的模块、文件或函数
- **上下文信息**：用户ID、会话ID、请求ID等
- **错误详情**：异常类型、堆栈跟踪
- **性能指标**：响应时间、资源使用情况

#### 日志级别（常见）
| 级别 | 描述 | 用途 |
|------|------|------|
| DEBUG | 调试信息 | 开发阶段使用，详细的诊断信息 |
| INFO | 一般信息 | 正常运行状态的记录 |
| WARN | 警告信息 | 潜在问题，但不影响系统运行 |
| ERROR | 错误信息 | 发生错误，但系统仍能运行 |
| FATAL | 致命错误 | 严重错误，系统可能无法继续运行 |

---
### 日志文件格式

#### 文本格式
- **简单文本**：每行一条日志，格式简洁
  ```log
  2023-12-25 10:30:45 INFO Application started successfully
  ```

- **结构化文本**：包含固定字段，便于解析
  ```log
  [2023-12-25 10:30:45] [INFO] [App.java:42] Application started successfully
  ```
#### JSON格式
- **示例**：
  ```json
  {
    "timestamp": "2023-12-25T10:30:45Z",
    "level": "INFO",
    "logger": "com.example.App",
    "message": "Application started successfully",
    "thread": "main",
    "context": {
      "user": "admin",
      "session": "abc123"
    }
  }
  ```

#### XML格式
- **示例**：
  ```xml
  <log>
    <timestamp>2023-12-25 10:30:45</timestamp>
    <level>INFO</level>
    <logger>com.example.App</logger>
    <message>Application started successfully</message>
  </log>
  ```
---
### 日志分析工具
- **ELK Stack**：Elasticsearch + Logstash + Kibana
- **Graylog**：专业的日志管理平台
- **Splunk**：企业级日志分析解决方案
- **Datadog**：云原生监控和日志分析
- **简单工具**：grep、awk、sed等命令行工具

---
### log示例如下
- **时间戳+类型+信息**
```log
2023-12-25 10:30:00 INFO Application starting...
2023-12-25 10:30:01 DEBUG Loading configuration from config.yml
2023-12-25 10:30:02 INFO Database connection established
2023-12-25 10:30:03 DEBUG Connecting to MySQL database: jdbc:mysql://localhost:3306/app_db
2023-12-25 10:30:04 INFO User 'admin' logged in successfully
2023-12-25 10:30:05 WARN Disk usage is approaching 80% threshold
2023-12-25 10:30:06 INFO Processing batch job #123
2023-12-25 10:30:07 DEBUG Processing item 1 of 100
2023-12-25 10:30:08 DEBUG Processing item 2 of 100
2023-12-25 10:30:09 ERROR Failed to process item 3: Invalid data format
2023-12-25 10:30:10 WARN Skipping invalid item, continuing with next item
2023-12-25 10:30:11 DEBUG Processing item 4 of 100
2023-12-25 10:30:12 INFO Batch job #123 completed successfully (99/100 items processed)
2023-12-25 10:30:13 INFO Generating report for batch job #123
2023-12-25 10:30:14 INFO Report generated successfully: report_20231225_103014.pdf
2023-12-25 10:30:15 DEBUG Cleaning up temporary files
2023-12-25 10:30:16 INFO Application idle
2023-12-25 10:30:17 FATAL System encountered critical error: Out of memory
2023-12-25 10:30:18 INFO Application shutting down gracefully

```