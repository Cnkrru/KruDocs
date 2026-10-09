# crypto 加密

`crypto` 是 Node.js 内置的**加密**模块，封装了 OpenSSL，提供哈希、HMAC、对称/非对称加解密、签名、随机数、密码派生（KDF）等功能。

## 引入方式

| 引入 | 说明 |
|------|------|
| `const crypto = require('node:crypto')` | 官方推荐写法（`node:` 前缀） |

## 哈希（Hash）

| API | 说明 |
|-----|------|
| `crypto.createHash(algorithm)` | 创建哈希对象，链式 `.update(data)` → `.digest(encoding)` |
| `crypto.hash(algorithm, data[, outputEncoding])` | **一次性**哈希（Node 21.7+），更简洁 |

`digest` 常用编码：`'hex'`（十六进制字符串）、`'base64'`、不传返回 Buffer。

常用算法：`'sha256'`（最常用）、`'sha512'`、`'sha1'`、`'md5'`（**仅做校验，不安全**）。

> 哈希是**单向**的，不可逆，用于校验完整性、指纹、密码比对（配合盐）。`crypto.getHashes()` 可列出当前支持的全部算法。

## HMAC（带密钥的哈希）

| API | 说明 |
|-----|------|
| `crypto.createHmac(algorithm, key)` | 创建 HMAC 对象，链式 `.update(data)` → `.digest(encoding)` |

> HMAC = 哈希 + 密钥，用于**消息认证**（防篡改 + 验来源），如 API 签名、Webhook 校验。同一数据只有持有相同密钥才能算出相同结果。

## 随机数

| API | 返回 | 说明 |
|-----|------|------|
| `crypto.randomBytes(size)` | Buffer | 生成加密安全的随机字节（token、盐、密钥） |
| `crypto.randomUUID()` | string | 生成 UUID v4（唯一 ID，最常用） |
| `crypto.randomInt([min, ]max)` | number | 生成 `[min, max)` 区间的随机整数（抽奖、验证码） |
| `crypto.randomFill(buffer)` | Buffer | 用随机字节填充 buffer |

> 用这些代替 `Math.random()` 做安全相关随机（token/密码/密钥），`Math.random()` 不可预测性不足。

## 对称加密（Cipher / Decipher）

| API | 说明 |
|-----|------|
| `crypto.createCipheriv(algorithm, key, iv)` | 创建加密器，`.update(data)` → `.final()` |
| `crypto.createDecipheriv(algorithm, key, iv)` | 创建解密器，`.update(data)` → `.final()` |

常用算法：`'aes-256-gcm'`（**推荐**，带认证防篡改）、`'aes-256-cbc'`。

| 概念 | 说明 |
|------|------|
| `key` | 密钥，长度与算法匹配（aes-256 需 32 字节） |
| `iv` | 初始化向量，**每次加密随机生成**，可明文随密文一起传 |
| `getAuthTag()` | GCM 模式加密后取认证标签（需保存，解密时用） |
| `setAuthTag(tag)` | GCM 模式解密前设置认证标签 |

> 对称加密**同一把密钥加解密**，适合数据量大、双方共享密钥的场景。GCM 模式能检测密文被篡改，优先用它。

## 非对称加密（RSA）

| API | 说明 |
|-----|------|
| `crypto.generateKeyPairSync(type, options)` | 同步生成密钥对，返回 `{publicKey, privateKey}`（type 常用 `'rsa'`） |
| `crypto.publicEncrypt(key, buffer)` | 公钥加密（只有对应私钥能解） |
| `crypto.privateDecrypt(key, buffer)` | 私钥解密 |
| `crypto.createPublicKey(key)` / `createPrivateKey(key)` | 从 PEM 字符串/Buffer 构造密钥对象 |

> 非对称加密公钥公开、私钥保密，适合**密钥分发**（HTTPS 握手原理）。性能比对称加密慢，通常只加密少量数据（如对称密钥本身）。

## 签名与验签

| API | 说明 |
|-----|------|
| `crypto.createSign(algorithm)` | 创建签名器，`.update(data)` → `.sign(privateKey[, encoding])` |
| `crypto.createVerify(algorithm)` | 创建验签器，`.update(data)` → `.verify(publicKey, signature)` |
| `crypto.sign(algorithm, data, key)` | 一次性签名 |
| `crypto.verify(algorithm, data, key, signature)` | 一次性验签，返回 boolean |

> 签名 = 私钥对数据哈希加密，**验签 = 公钥验证**，用于确认"数据确实来自持有私钥的一方"且未被篡改（如 JWT、软件包校验）。

## 密码派生（KDF，存密码用）

| API | 说明 |
|-----|------|
| `crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)` | PBKDF2 派生密钥（同步版） |
| `crypto.scryptSync(password, salt, keylen[, options])` | scrypt 派生密钥（更抗暴力破解） |

> 存密码的正确姿势：**加随机盐 + 高迭代次数**派生后存储，不要存明文或裸哈希。比对时用 `timingSafeEqual` 防时序攻击。

## 其他常用

| API | 说明 |
|------|------|
| `crypto.timingSafeEqual(a, b)` | **常数时间**比较两个 Buffer 是否相等，防时序攻击（比对密码/签名用） |
| `crypto.getHashes()` | 列出支持的哈希算法 |
| `crypto.getCiphers()` | 列出支持的加密算法 |
| `crypto.getCurves()` | 列出支持的椭圆曲线 |
| `crypto.webcrypto` / `crypto.subtle` | Web Crypto API（浏览器同款，异步风格） |
---
