获取当前电脑的系统、CPU、内存、磁盘、网络等基本信息，仅使用内置模块。

```python
# -*- coding: utf-8 -*-
"""
电脑基本信息查看脚本 (computer_info.py)
功能：获取当前电脑的系统、CPU、内存、磁盘、网络等基本信息
用法：python computer_info.py
说明：仅使用内置模块，无需安装第三方依赖
"""

import os
import sys
import platform
import socket
import subprocess
import datetime


def run_cmd(cmd):
    """执行命令并返回输出文本"""
    try:
        result = subprocess.check_output(
            cmd, encoding='utf-8', errors='ignore', shell=True
        )
        return result.strip()
    except Exception:
        return ''


def run_powershell(script):
    """执行 PowerShell 命令并返回输出文本"""
    return run_cmd(['powershell', '-NoProfile', '-Command', script])


def parse_kv(output):
    """解析 PowerShell 键值对输出为字典"""
    data = {}
    for line in output.splitlines():
        line = line.strip()
        if '=' in line:
            key, _, value = line.partition('=')
            key = key.strip()
            value = value.strip()
            if key and value:
                data[key] = value
    return data


def get_system_info():
    """系统信息"""
    return [
        ('操作系统', platform.system()),
        ('系统版本', platform.version()),
        ('系统发行版', platform.release()),
        ('机器架构', platform.machine()),
        ('处理器', platform.processor()),
        ('主机名', socket.gethostname()),
        ('当前用户', os.environ.get('USERNAME', os.environ.get('USER', '未知'))),
        ('Python 版本', sys.version.split()[0]),
    ]


def get_cpu_info():
    """CPU 信息"""
    if platform.system() == 'Windows':
        data = parse_kv(run_powershell(
            "Get-CimInstance Win32_Processor | "
            "ForEach-Object { 'Name=' + $_.Name; "
            "'NumberOfCores=' + $_.NumberOfCores; "
            "'NumberOfLogicalProcessors=' + $_.NumberOfLogicalProcessors }"
        ))
        info = []
        if 'Name' in data:
            info.append(('型号', data['Name']))
        if 'NumberOfCores' in data:
            info.append(('物理核心', data['NumberOfCores']))
        if 'NumberOfLogicalProcessors' in data:
            info.append(('逻辑核心', data['NumberOfLogicalProcessors']))
        return info
    return [('型号', platform.processor())]


def get_memory_info():
    """内存信息"""
    if platform.system() == 'Windows':
        data = parse_kv(run_powershell(
            "Get-CimInstance Win32_ComputerSystem | "
            "ForEach-Object { 'TotalPhysicalMemory=' + $_.TotalPhysicalMemory }"
        ))
        if 'TotalPhysicalMemory' in data:
            try:
                total = int(data['TotalPhysicalMemory'])
                return [('总容量', f'{total / (1024**3):.2f} GB')]
            except ValueError:
                pass
    return []


def get_disk_info():
    """磁盘信息"""
    disks = []
    if platform.system() == 'Windows':
        output = run_powershell(
            "Get-CimInstance Win32_LogicalDisk | "
            "ForEach-Object { 'DeviceID=' + $_.DeviceID; "
            "'Size=' + $_.Size; "
            "'FreeSpace=' + $_.FreeSpace }"
        )
        current = {}
        for line in output.splitlines():
            line = line.strip()
            if '=' in line:
                key, _, value = line.partition('=')
                key = key.strip()
                value = value.strip()
                if key == 'DeviceID':
                    if current:
                        disks.append(current)
                    current = {'盘符': value}
                elif key == 'Size':
                    current['总容量'] = value
                elif key == 'FreeSpace':
                    current['可用空间'] = value
        if current:
            disks.append(current)
    return disks


def get_network_info():
    """网络信息"""
    info = []
    try:
        hostname = socket.gethostname()
        info.append(('主机名', hostname))
        info.append(('IP 地址', socket.gethostbyname(hostname)))
    except Exception:
        pass
    return info


def get_boot_time():
    """开机时间"""
    if platform.system() == 'Windows':
        data = parse_kv(run_powershell(
            "Get-CimInstance Win32_OperatingSystem | "
            "ForEach-Object { 'LastBootUpTime=' + $_.LastBootUpTime }"
        ))
        if 'LastBootUpTime' in data:
            try:
                raw = data['LastBootUpTime']
                # PowerShell 时间格式: 08/16/2026 02:32:19
                boot = datetime.datetime.strptime(raw, '%m/%d/%Y %H:%M:%S')
                return [('开机时间', boot.strftime('%Y-%m-%d %H:%M:%S'))]
            except ValueError:
                pass
    return []


def print_section(title, items):
    """打印信息区块"""
    print()
    print(f'[{title}]')
    if not items:
        print('  (无信息)')
        return
    width = max(len(k) for k, _ in items)
    for key, value in items:
        print(f'  {key:<{width}} : {value}')


def main():
    print('=' * 40)
    print('     电脑基本信息查看工具')
    print('=' * 40)

    print_section('系统信息', get_system_info())
    print_section('CPU 信息', get_cpu_info())
    print_section('内存信息', get_memory_info())

    disks = get_disk_info()
    print()
    print('[磁盘信息]')
    if disks:
        for d in disks:
            size = d.get('总容量', '未知')
            free = d.get('可用空间', '未知')
            if size.isdigit():
                size = f'{int(size) / (1024**3):.1f} GB'
            if free.isdigit():
                free = f'{int(free) / (1024**3):.1f} GB'
            print(f"  {d['盘符']}  总容量: {size}  可用: {free}")
    else:
        print('  (无信息)')

    print_section('网络信息', get_network_info())
    print_section('开机时间', get_boot_time())

    print()
    print('=' * 40)


if __name__ == '__main__':
    main()
```
