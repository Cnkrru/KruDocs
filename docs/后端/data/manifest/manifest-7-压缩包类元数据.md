# 压缩包类元数据写法

> 压缩包元数据存在**文件头**和**注释**中，ZIP 最常用，TAR 保留文件权限信息。

## 一、ZIP（本地文件头 + 注释）

### 常见字段
| 字段 | 说明 |
|------|------|
| 文件名 | 压缩内路径 |
| 压缩方式 | 存储 / Deflate 等 |
| 时间戳 | 文件修改时间 |
| 注释 | 压缩包注释 |

### 如何写入（Python zipfile）
```python
import zipfile

with zipfile.ZipFile('archive.zip', 'w') as zf:
    zf.write('file.txt')
    zf.comment = b'这是压缩包注释'
```

### 如何查看
```bash
unzip -l archive.zip      # 列出文件
unzip -z archive.zip      # 显示注释
```

## 二、RAR（注释）

| 字段 | 说明 |
|------|------|
| 文件名 | 压缩内路径 |
| 时间戳 | 文件修改时间 |
| 注释 | 压缩包注释 |

```bash
rar a archive.rar file.txt
rar c archive.rar         # 添加注释
```

## 三、7z（无标准元数据）

| 字段 | 说明 |
|------|------|
| 文件名 | 压缩内路径 |
| 时间戳 | 文件修改时间 |

```bash
7z a archive.7z file.txt
7z l archive.7z           # 列出文件
```

## 四、TAR（文件头，保留权限）

### 常见字段
| 字段 | 说明 |
|------|------|
| 文件名 | 压缩内路径 |
| 权限 | Unix 权限位（如 644） |
| 所有者 | UID / GID |
| 时间戳 | 文件修改时间 |

### 如何查看
```bash
tar -tvf archive.tar      # 显示权限、所有者、时间
```

### 如何创建
```bash
tar -cvf archive.tar file.txt
```

## 五、通用对比

| 格式 | 注释支持 | 保留权限 | 保留所有者 |
|------|---------|---------|-----------|
| ZIP | ✅ | ❌ | ❌ |
| RAR | ✅ | ✅ | ✅ |
| 7z | ❌ | ✅ | ✅ |
| TAR | ❌ | ✅ | ✅ |