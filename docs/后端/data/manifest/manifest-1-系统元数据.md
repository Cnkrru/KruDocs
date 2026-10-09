# 系统元数据（所有文件通用）

> 系统元数据由操作系统管理，**任何文件都有**，无法通过格式工具去除，只能通过文件系统层操作修改。

## 一、常见字段

| 元数据项 | 说明 | 示例 |
|---------|------|------|
| 文件名 | 文件名称（含扩展名） | report.md |
| 扩展名 | 标识文件类型 | .md |
| 路径 | 文件所在位置 | D:\docs\report.md |
| 大小 | 文件字节数 | 4.2 KB |
| 创建时间 | 文件创建时刻 | 2026-08-16 10:00 |
| 修改时间 | 最后修改时刻 | 2026-08-16 15:30 |
| 访问时间 | 最后访问时刻 | 2026-08-16 15:31 |
| 属性 | 只读 / 隐藏 / 系统 / 归档 | 只读 |
| 所有者 | 文件归属账户 | cnkrru |
| 权限 | 访问控制列表（ACL） | 读 / 写 |

## 二、如何查看（Windows）

```powershell
# 查看文件详细信息
Get-Item .\report.md | Format-List Name, Length, CreationTime, LastWriteTime, LastAccessTime, Attributes

# 查看文件夹下所有文件
Get-ChildItem | Select-Object Name, Length, CreationTime, LastWriteTime

# 查看所有者
Get-Acl .\report.md

# 查看字节级大小
(Get-Item .\report.md).Length
```

## 三、如何查看（Linux）

```bash
# 查看详细信息（含权限、所有者、时间）
ls -l report.md

# 查看完整时间戳
stat report.md

# 查看 inode 信息
ls -i report.md
```

## 四、如何修改

| 操作 | Windows | Linux |
|------|---------|-------|
| 改时间戳 | 无原生命令 | `touch -d "2026-08-16" report.md` |
| 改属性 | `attrib +r report.md` | `chmod 444 report.md` |
| 改所有者 | 属性面板 / ICACLS | `chown user report.md` |
| 改权限 | `ICACLS report.md /grant user:R` | `chmod 644 report.md` |
