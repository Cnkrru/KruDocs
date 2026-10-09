## OpenMV Sensor 模块参考

## 1. 模块介绍

- **Sensor模块**是OpenMV摄像头的核心控制模块，用于配置和操作摄像头传感器
- **主要功能**：初始化摄像头、设置分辨率、调整图像参数、获取传感器状态等

---

## 2. 常用函数

### 2.1 初始化与重置
| 函数 | 功能 |
|------|------|
| **sensor.reset()** | 重置摄像头模块，必须在使用其他sensor函数前调用 |

### 2.2 分辨率设置
| 函数 | 功能 |
|------|------|
| **sensor.set_framesize(size)** | 设置摄像头分辨率<br>- 可选值：sensor.QQVGA, sensor.QVGA, sensor.VGA, sensor.SVGA |

### 2.3 颜色格式设置
| 函数 | 功能 |
|------|------|
| **sensor.set_pixformat(format)** | 设置摄像头像素格式<br>- 可选值：sensor.RGB565, sensor.GRAYSCALE, sensor.YUV422 |

### 2.4 曝光控制
| 函数 | 功能 |
|------|------|
| **sensor.set_auto_exposure(enable, exposure_us=None)** | 设置自动曝光<br>- enable: 布尔值，是否启用自动曝光<br>- exposure_us: 手动曝光时间（微秒），仅当enable=False时有效 |
| **sensor.get_exposure_us()** | 获取当前曝光时间（微秒） |

### 2.5 增益控制
| 函数 | 功能 |
|------|------|
| **sensor.set_auto_gain(enable, gain_db=None)** | 设置自动增益<br>- enable: 布尔值，是否启用自动增益<br>- gain_db: 手动增益值（分贝），仅当enable=False时有效 |
| **sensor.get_gain_db()** | 获取当前增益值（分贝） |

### 2.6 白平衡控制
| 函数 | 功能 |
|------|------|
| **sensor.set_auto_whitebal(enable, rgb_gain=None)** | 设置自动白平衡<br>- enable: 布尔值，是否启用自动白平衡<br>- rgb_gain: 手动RGB增益值，仅当enable=False时有效 |
| **sensor.get_rgb_gain()** | 获取当前RGB增益值 |

### 2.7 镜头控制
| 函数 | 功能 |
|------|------|
| **sensor.set_hmirror(enable)** | 设置水平镜像 |
| **sensor.set_vflip(enable)** | 设置垂直翻转 |
| **sensor.set_windowing(roi)** | 设置感兴趣区域(ROI)<br>- roi: (x, y, w, h) 元组 |

### 2.8 其他设置
| 函数 | 功能 |
|------|------|
| **sensor.skip_frames(time=0)** | 跳过指定时间的帧以稳定摄像头<br>- time: 等待时间（毫秒） |
| **sensor.set_brightness(brightness)** | 设置亮度（-3 to 3） |
| **sensor.set_contrast(contrast)** | 设置对比度（-3 to 3） |
| **sensor.set_saturation(saturation)** | 设置饱和度（-3 to 3） |
| **sensor.set_gamma(gamma)** | 设置伽马值（0.0 to 4.0） |

### 2.9 分辨率相关
| 函数 | 功能 |
|------|------|
| **sensor.width()** | 获取当前帧宽度 |
| **sensor.height()** | 获取当前帧高度 |
| **sensor.format()** | 获取当前像素格式 |

### 2.10 状态信息
| 函数 | 功能 |
|------|------|
| **sensor.get_id()** | 获取摄像头ID |
| **sensor.get_version()** | 获取传感器版本 |
| **sensor.get_sensor()** | 获取传感器类型 |

---

## 3. 常量

### 3.1 分辨率常量
| 常量 | 值 |
|------|------|
| **sensor.QQVGA** | 176x144 |
| **sensor.QVGA** | 320x240 |
| **sensor.VGA** | 640x480 |
| **sensor.SVGA** | 800x600 |

### 3.2 像素格式常量
| 常量 | 描述 |
|------|------|
| **sensor.RGB565** | 16位RGB格式 |
| **sensor.GRAYSCALE** | 8位灰度格式 |
| **sensor.YUV422** | YUV422格式 |

### 3.3 其他常量
| 常量 | 描述 |
|------|------|
| **sensor.HORIZONTAL_MIRROR** | 水平镜像 |
| **sensor.VERTICAL_FLIP** | 垂直翻转 |

---

## 4. 使用示例

### 4.1 基本初始化
```python
import sensor

# 初始化摄像头
sensor.reset()

# 设置分辨率
sensor.set_framesize(sensor.QVGA)  # 320x240

# 设置像素格式
sensor.set_pixformat(sensor.RGB565)  # 16位RGB格式

# 跳过帧以稳定摄像头
sensor.skip_frames(time=2000)  # 等待2秒

# 获取摄像头信息
print(f"摄像头ID: {sensor.get_id()}")
print(f"传感器版本: {sensor.get_version()}")
print(f"传感器类型: {sensor.get_sensor()}")
print(f"当前分辨率: {sensor.width()}x{sensor.height()}")
print(f"当前像素格式: {sensor.format()}")
```

### 4.2 调整图像参数
```python
import sensor

# 初始化摄像头
sensor.reset()
sensor.set_framesize(sensor.QVGA)
sensor.set_pixformat(sensor.RGB565)

# 调整图像参数
sensor.set_brightness(0)     # 亮度（-3 to 3）
sensor.set_contrast(1)       # 对比度（-3 to 3）
sensor.set_saturation(0)     # 饱和度（-3 to 3）
sensor.set_gamma(1.0)        # 伽马值（0.0 to 4.0）

# 禁用自动曝光，设置手动曝光
sensor.set_auto_exposure(False, exposure_us=10000)  # 10ms曝光
print(f"当前曝光时间: {sensor.get_exposure_us()}μs")

# 禁用自动增益，设置手动增益
sensor.set_auto_gain(False, gain_db=10)  # 10dB增益
print(f"当前增益值: {sensor.get_gain_db()}dB")

# 禁用自动白平衡，设置手动RGB增益
sensor.set_auto_whitebal(False, rgb_gain=(1.0, 1.0, 1.0))
print(f"当前RGB增益: {sensor.get_rgb_gain()}")
```

### 4.3 设置感兴趣区域
```python
import sensor

# 初始化摄像头
sensor.reset()
sensor.set_framesize(sensor.QVGA)
sensor.set_pixformat(sensor.RGB565)

# 设置感兴趣区域（ROI）
# (x, y, width, height)
# 例如：设置中心区域为感兴趣区域
roi = (100, 80, 120, 80)
sensor.set_windowing(roi)

print(f"设置ROI: {roi}")
print(f"ROI后的分辨率: {sensor.width()}x{sensor.height()}")
```
