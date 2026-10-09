清理用户临时目录、浏览器缓存、崩溃转储等临时文件，被占用的文件自动跳过。

```python
# -*- coding: utf-8 -*-
"""
清理临时文件脚本 (clean_temp_files.py)
功能：清理用户临时目录、浏览器缓存、崩溃转储等临时文件
用法：python clean_temp_files.py
说明：正在被占用的文件会被自动跳过，不会影响系统
"""

import os
import shutil
import ctypes
import time

# 判断是否管理员权限
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except Exception:
        return False

def get_dir_size(path):
    """统计目录大小（字节）"""
    total = 0
    for root, dirs, files in os.walk(path):
        for f in files:
            try:
                total += os.path.getsize(os.path.join(root, f))
            except OSError:
                pass
    return total

def clean_dir(path, name):
    """清理目录内容，返回 (删除字节数, 跳过文件数)"""
    if not os.path.exists(path):
        print(f"[跳过] {name} : 目录不存在 - {path}")
        return 0, 0

    before = get_dir_size(path)
    skipped = 0

    # 删除所有文件
    for root, dirs, files in os.walk(path, topdown=False):
        for f in files:
            fp = os.path.join(root, f)
            try:
                os.remove(fp)
            except OSError:
                skipped += 1
        for d in dirs:
            dp = os.path.join(root, d)
            try:
                shutil.rmtree(dp, ignore_errors=False)
            except OSError:
                pass

    after = get_dir_size(path)
    deleted = before - after
    if deleted < 0:
        deleted = 0
    deleted_mb = round(deleted / (1024 * 1024), 1)

    status = f"跳过 {skipped} 个占用文件" if skipped > 0 else "全部清理"
    print(f"[完成] {name} : 释放 {deleted_mb} MB ({status})")
    return deleted, skipped


def main():
    print("===== 开始清理临时文件 =====")
    admin = is_admin()
    print(f"管理员权限: {admin}\n")

    local = os.environ.get("LOCALAPPDATA", os.path.expanduser("~\\AppData\\Local"))

    targets = {
        "用户临时目录": os.path.join(local, "Temp"),
        "崩溃转储": os.path.join(local, "CrashDumps"),
        "Edge缓存": os.path.join(local, "Microsoft", "Edge", "User Data", "Default", "Cache"),
        "Chrome缓存": os.path.join(local, "Google", "Chrome", "User Data", "Default", "Cache"),
        "缩略图缓存": os.path.join(local, "Microsoft", "Windows", "Explorer"),
    }

    total_deleted = 0
    total_skipped = 0

    for name, path in targets.items():
        d, s = clean_dir(path, name)
        total_deleted += d
        total_skipped += s

    # 系统临时目录（需要管理员）
    if admin:
        sys_temp = os.path.join(os.environ.get("SystemRoot", "C:\\Windows"), "Temp")
        if os.path.exists(sys_temp):
            d, s = clean_dir(sys_temp, "系统临时目录")
            total_deleted += d
            total_skipped += s
    else:
        print("[提示] 系统临时目录需要管理员权限，未清理（可以管理员身份运行本脚本）")

    print("\n===== 清理完成 =====")
    total_mb = round(total_deleted / (1024 * 1024), 1)
    print(f"共释放: {total_mb} MB")
    print(f"跳过占用文件: {total_skipped} 个")

    print("\n按任意键退出...")
    try:
        input()
    except EOFError:
        time.sleep(2)


if __name__ == "__main__":
    main()
```
