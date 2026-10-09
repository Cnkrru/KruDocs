

# JSON

## 1. JSON简介

### 1.1 JSON与Python字典的关系
- 如果学习过py的字典，那就可以直接把json当作py的字典
- json与字典书写格式完全相同

### 1.2 JSON的用途
- json用于存储数据，比如存储文档id、author、简介、路径各种地址
- 常用于本地储存
- 常见编程语言几乎都支持json

## 2. 数据存储特点
- json可以储存常见的数据类型/数组
- 键值对存储: {key: value}
- 数据与数据间使用','分隔
- json内可以嵌套json

**示例**：
```json
{
  "字符串": "Hello, JSON!",
  "数字": 123.45,
  "整数": 42,
  "布尔值": true,
  "空值": null,
  "数组": ["苹果", "香蕉", "橙子"],
  "对象数组": [
    {
      "id": 1,
      "名称": "产品A",
      "价格": 100
    },
    {
      "id": 2,
      "名称": "产品B",
      "价格": 200
    }
  ],
  "嵌套对象": {
    "用户": {
      "姓名": "张三",
      "年龄": 30,
      "爱好": ["读书", "旅行"]
    }
  }
}
```

## 3. 访问、遍历、增删改查

### 3.1 基本步骤
- 访问，遍历，增删改查都需要结合后端编程语言来实现
- 后端编程语言也都有相应的库/包来适配
- 其中，JavaScript原生自带json对象可处理json

1. **转换数据**：先将json数据通过库/包/对象函数转换为后端可处理的数据
   - 注释1：JavaScript可以在浏览器中直接操作，属于前端技术
   - 注释2：Node.js操作时，则属于后端
2. **操作数据**：使用后端方法进行访问、遍历、增删改查
3. **转换结果**：将结果转换为json数据

## 4. JSON转换

### 4.1 JavaScript JSON转换

#### 4.1.1 JSON字符串转对象
**方法**：`JSON.parse(jsonString, reviver)` 

**示例**：
```js
const jsonString = '{"name": "张三", "age": 30}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // 输出: 张三
```

#### 4.1.2 对象转JSON字符串 
**方法**：`JSON.stringify(value, replacer, space)`

**示例**：
```js
const obj = {name: "张三", age: 30};
const jsonString = JSON.stringify(obj);
console.log(jsonString); // 输出: {"name":"张三","age":30}
```

**参数说明**：
- `replacer`：函数或数组，用于过滤或转换值
- `space`：字符串或数字，用于美化输出（缩进）

**美化输出**：
```js
const prettyJson = JSON.stringify(obj, null, 2);
``` 

### 4.2 Python json包使用

#### 4.2.1 导入模块
```python
import json
```

#### 4.2.2 JSON字符串转对象
**方法**：`json.loads(json_string)`

**示例**：
```python
json_string = '{"name": "张三", "age": 30}'
obj = json.loads(json_string)
print(obj['name'])  # 输出: 张三
``` 

#### 4.2.3 Python对象转JSON字符串
**方法**：`json.dumps(obj, indent, ensure_ascii)`

**示例**：
```python
obj = {"name": "张三", "age": 30}
json_string = json.dumps(obj)
print(json_string)  # 输出: {"name": "张三", "age": 30}
```

**参数说明**：
- `indent`：整数，用于美化输出（缩进）
- `ensure_ascii`：布尔值，控制是否转义非ASCII字符

**美化并处理中文**：
```python
json_string = json.dumps(obj, indent=2, ensure_ascii=False)
```