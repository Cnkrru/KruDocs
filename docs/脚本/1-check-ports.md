快速查看当前系统正在监听的端口，支持查看、终止、刷新端口进程。

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
端口监听查看脚本 (Python 版本)
作者: VitePress Builder
说明: 快速查看当前系统正在监听的端口
"""

import platform
import subprocess
from typing import List, Dict


def get_ports_windows() -> List[Dict]:
    """Windows 平台获取端口信息"""
    ports = []
    try:
        result = subprocess.check_output(
            ['netstat', '-ano'],
            encoding='utf-8',
            errors='ignore'
        )
        lines = result.split('\n')
        
        for line in lines:
            line = line.strip()
            if 'LISTENING' in line:
                parts = list(filter(None, line.split()))
                if len(parts) >= 5:
                    local_addr = parts[1]
                    pid = parts[-1]
                    
                    # 获取进程名
                    process_name = '未知进程'
                    try:
                        task_result = subprocess.check_output(
                            ['tasklist', '/FI', f'PID eq {pid}', '/FO', 'CSV', '/NH'],
                            encoding='gbk',
                            errors='ignore'
                        )
                        if task_result.strip():
                            csv_line = task_result.strip().split('\n')[0]
                            if csv_line:
                                process_name = csv_line.split('","')[0].strip('"')
                    except:
                        pass
                    
                    # 解析地址和端口
                    addr_parts = local_addr.split(':')
                    port = addr_parts[-1]
                    
                    ports.append({
                        'local_addr': local_addr,
                        'port': int(port) if port.isdigit() else port,
                        'pid': int(pid) if pid.isdigit() else pid,
                        'process_name': process_name
                    })
    except Exception as e:
        print(f'获取端口信息失败: {e}')
    
    return ports


def get_ports_linux() -> List[Dict]:
    """Linux 平台获取端口信息 (占位)"""
    print('暂支持 Windows 平台')
    return []


def kill_process_by_index(ports: List[Dict]):
    """通过序号终止进程"""
    print()
    print('当前端口列表:')
    print()
    print(f'{"序号":<6} {"端口":<8} {"本地地址":<24} {"进程ID":<8} {"进程名"}')
    print('-' * 70)
    
    for idx, p in enumerate(ports, 1):
        print(f'{idx:<6} {p["port"]:<8} {p["local_addr"]:<24} {p["pid"]:<8} {p["process_name"]}')
    
    print()
    print(f'共 {len(ports)} 个端口 (输入 0 返回)')
    print()
    
    while True:
        try:
            choice = input('请输入要终止的序号: ').strip()
            
            if choice == '0':
                return
            
            index = int(choice)
            
            if 1 <= index <= len(ports):
                target = ports[index - 1]
                print()
                print(f'即将终止: {target["process_name"]} (端口: {target["port"]}, PID: {target["pid"]})')
                confirm = input('确认终止? (Y/N): ').strip().lower()
                
                if confirm == 'y':
                    try:
                        subprocess.check_output(['taskkill', '/F', '/PID', str(target['pid'])])
                        print(f'✓ 进程 {target["process_name"]} 已终止')
                        print()
                        # 从列表中移除已终止的进程
                        ports.pop(index - 1)
                        
                        if not ports:
                            print('所有进程已终止')
                            return
                        
                        # 重新显示列表
                        print()
                        print('更新后的端口列表:')
                        print()
                        print(f'{"序号":<6} {"端口":<8} {"本地地址":<24} {"进程ID":<8} {"进程名"}')
                        print('-' * 70)
                        for idx, p in enumerate(ports, 1):
                            print(f'{idx:<6} {p["port"]:<8} {p["local_addr"]:<24} {p["pid"]:<8} {p["process_name"]}')
                        print()
                        print(f'共 {len(ports)} 个端口 (输入 0 返回)')
                        print()
                        
                    except Exception as e:
                        print(f'✗ 终止失败: {e}')
                else:
                    print('已取消')
            else:
                print(f'✗ 无效序号，请输入 1-{len(ports)} 之间的数字')
                
        except ValueError:
            print('✗ 请输入有效的数字')
        except KeyboardInterrupt:
            print()
            print('已取消')
            return


def main():
    print('=' * 40)
    print('     端口监听状态查看工具')
    print('=' * 40)
    print()
    
    # 根据平台选择方法
    system = platform.system()
    if system == 'Windows':
        ports = get_ports_windows()
    else:
        ports = get_ports_linux()
    
    if ports:
        print('正在监听的端口:')
        print()
        
        # 按端口排序
        ports.sort(key=lambda x: x['port'] if isinstance(x['port'], int) else 0)
        
        # 打印表格（带序号）
        print(f'{"序号":<6} {"端口":<8} {"本地地址":<24} {"进程ID":<8} {"进程名"}')
        print('-' * 70)
        
        for idx, p in enumerate(ports, 1):
            print(f'{idx:<6} {p["port"]:<8} {p["local_addr"]:<24} {p["pid"]:<8} {p["process_name"]}')
        
        print()
        print('=' * 40)
        print(f'共找到 {len(ports)} 个正在监听的端口')
        print('=' * 40)
        print()
        
        # 交互菜单
        while True:
            print()
            print('快速操作:')
            print('  1. 查看特定端口')
            print('  2. 终止特定端口进程')
            print('  3. 按序号终止进程')
            print('  4. 刷新列表')
            print('  0. 退出')
            print()
            
            choice = input('请选择操作: ').strip()
            
            if choice == '0':
                print('再见!')
                break
                
            elif choice == '1':
                target_port = input('请输入要查看的端口号: ').strip()
                print()
                filtered = [p for p in ports if str(p['port']) == target_port]
                if filtered:
                    print(f'{"序号":<6} {"端口":<8} {"本地地址":<24} {"进程ID":<8} {"进程名"}')
                    print('-' * 70)
                    for idx, p in enumerate(filtered, 1):
                        # 找到原始序号
                        orig_idx = ports.index(p) + 1
                        print(f'{orig_idx:<6} {p["port"]:<8} {p["local_addr"]:<24} {p["pid"]:<8} {p["process_name"]}')
                else:
                    print(f'端口 {target_port} 未在监听')
                    
            elif choice == '2':
                target_port = input('请输入要终止的端口号: ').strip()
                target_process = None
                for p in ports:
                    if str(p['port']) == target_port:
                        target_process = p
                        break
                
                if target_process:
                    confirm = input(f'确定要终止进程 {target_process["process_name"]} (PID: {target_process["pid"]}) 吗? (Y/N): ').strip().lower()
                    if confirm == 'y':
                        try:
                            subprocess.check_output(['taskkill', '/F', '/PID', str(target_process['pid'])])
                            print(f'✓ 进程已终止')
                            ports.remove(target_process)
                        except Exception as e:
                            print(f'✗ 终止失败: {e}')
                else:
                    print(f'端口 {target_port} 未在监听')
            
            elif choice == '3':
                kill_process_by_index(ports)
                
            elif choice == '4':
                print()
                print('刷新中...')
                print()
                ports = get_ports_windows()
                ports.sort(key=lambda x: x['port'] if isinstance(x['port'], int) else 0)
                
                print(f'{"序号":<6} {"端口":<8} {"本地地址":<24} {"进程ID":<8} {"进程名"}')
                print('-' * 70)
                for idx, p in enumerate(ports, 1):
                    print(f'{idx:<6} {p["port"]:<8} {p["local_addr"]:<24} {p["pid"]:<8} {p["process_name"]}')
                print()
                print(f'共 {len(ports)} 个端口')


if __name__ == '__main__':
    main()
```
