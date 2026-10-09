# Py-Hashlib

## 1. 模块介绍

- **hashlib**提供了多种哈希算法，用于生成数据的哈希值。
- OK

---

## 2. 常用哈希算法

| 算法名称 | 输出长度 | 应用场景 |
| --- | --- | --- |
| `md5` | 128位 | 一般数据完整性校验 |
| `sha1` | 160位 | 数据完整性校验 |
| `sha256` | 256位 | 安全敏感场景 |
| `sha512` | 512位 | 高安全性要求场景 |

---

## 3. 常用函数

| 函数名 | 必选参数 | 作用 |
| --- | --- | --- |
| `hashlib.md5([data])` | data: 要哈希的数据(可选) | 创建MD5哈希对象 |
| `hashlib.sha1([data])` | data: 要哈希的数据(可选) | 创建SHA1哈希对象 |
| `hashlib.sha256([data])` | data: 要哈希的数据(可选) | 创建SHA256哈希对象 |
| `hashlib.sha512([data])` | data: 要哈希的数据(可选) | 创建SHA512哈希对象 |
| `hash.update(data)` | data: 要哈希的数据 | 更新哈希对象 |
| `hash.hexdigest()` | 无 | 返回哈希值（十六进制字符串） |

---

## 4. 哈希对象方法参数

| 方法名 | 参数 | 作用 |
|-------|------|------|
| `update(data)` | data: bytes | 使用data更新哈希对象的状态 |
| `digest()` | 无 | 返回当前哈希值，以字节串形式 |
| `hexdigest()` | 无 | 返回当前哈希值，以十六进制字符串形式 |
| `copy()` | 无 | 返回哈希对象的副本，状态与原对象相同 |

---

## 5. 使用示例

```python
import hashlib
'''
hashlib庫的算法只接收字节类型的数据
'''

# 1.直接用算法哈希
hash_res=hashlib.md5(b'hellp world').hexdigest()
print(hash_res)

# 2.用算法哈希对象
hash_obj=hashlib.md5()
hash_obj.update(b'hellp world')
print(hash_obj.hexdigest())
```