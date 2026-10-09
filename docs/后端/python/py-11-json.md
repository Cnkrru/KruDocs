# Py-JSON

> **说明**：Py自带的pickle包也可以处理json数据，处理方法略微不同，但过程完全一致。给json包准备数据一般准备字典，因为json写法和字典一模一样。

| 函数名 | 必选参数 | 作用 |
| --- | --- | --- |
| `json.dumps()` | Python对象 | 将Python对象转换为JSON字符串 |
| `json.loads()` | JSON字符串 | 将JSON字符串转换为Python对象 |
| `json.dump()` | Python对象, 文件对象 | 将Python对象写入文件 |
| `json.load()` | 文件对象 | 从文件读取JSON数据并转换为Python对象 |