# 图片类元数据写法

> 图片元数据主要靠 **EXIF**（JPEG/WebP）和 **PNG 辅助块**（tEXt/iTXt）存储，写入时需要专门的库或工具。

## 一、JPEG / WebP（EXIF）

### 常见字段
| 字段 | 说明 |
|------|------|
| Make | 相机厂商 |
| Model | 相机型号 |
| DateTimeOriginal | 拍摄时间 |
| ExposureTime | 曝光时间 |
| FNumber | 光圈 |
| ISOSpeedRatings | ISO |
| FocalLength | 焦距 |
| GPSLatitude / GPSLongitude | GPS 坐标 |
| Orientation | 方向 |

### 如何写入（Python PIL）
```python
from PIL import Image
from PIL.ExifTags import TAGS

img = Image.open('photo.jpg')
exif = img.getexif()
with open('exif_template.txt', 'r') as f:
    pass  # 用 piexif 库写入更完整
```

### 如何清除
```bash
exiftool -all= photo.jpg        # 清除全部 EXIF
exiftool -GPS:all= photo.jpg    # 只清除 GPS
```

## 二、PNG（tEXt / iTXt 辅助块）

### 常见字段
| 字段 | 说明 |
|------|------|
| Title | 标题 |
| Author | 作者 |
| Description | 描述 |
| Software | 创建软件 |
| Creation Time | 创建时间 |

### 如何写入（Python png/piexif）
```python
import png
# 用 png 库写入 tEXt 块
```

### 如何查看
```bash
exiftool image.png
```

## 三、GIF（注释扩展块）

| 字段 | 说明 |
|------|------|
| Comment | 注释文本 |
| 循环次数 | GIF 循环播放次数 |

## 四、SVG（XML 元素属性）

| 字段 | 说明 |
|------|------|
| width / height | 宽高 |
| viewBox | 视口坐标 |
| title | 标题 |
| desc | 描述 |

```xml
<svg width="100" height="100" viewBox="0 0 100 100">
  <title>示例图标</title>
  <desc>一个圆点</desc>
</svg>
```

## 五、BMP（文件头固定字段）

| 字段 | 说明 |
|------|------|
| 文件大小 | 头 14 字节 |
| 宽度 / 高度 | 像素 |
| 位深 | 每像素位数 |
| 压缩方式 | 通常为 0（不压缩） |