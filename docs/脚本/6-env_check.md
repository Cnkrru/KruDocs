将当前环境变量导出到 CSV 文件 (env.csv)。

```python
# 将环境变量导出到csv
import os

env = os.environ

with open('env.csv','w',encoding = 'utf-8' ) as file:
    file.write('key,value\n')
    for k,v in env.items():
        file.write(f'{k},{v}\n')
```
