## OpenMV Image 模块参考

## 1. 模块介绍

- **Image模块**是OpenMV的图像处理核心模块，用于对摄像头捕获的图像进行各种操作和处理
- **主要功能**：基本图像操作、颜色追踪、图像处理、绘制操作、几何变换、高级操作等

---

## 2. 基本操作

| 方法 | 功能 |
|------|------|
| **img.width()** | 获取图像宽度 |
| **img.height()** | 获取图像高度 |
| **img.format()** | 获取图像格式 |
| **img.get_pixel(x, y)** | 获取指定位置的像素值 |
| **img.set_pixel(x, y, color)** | 设置指定位置的像素值 |
| **img.to_grayscale()** | 将图像转换为灰度图 |
| **img.to_rgb565()** | 将图像转换为RGB565格式 |
| **img.save(path)** | 保存图像到指定路径 |
| **img.copy([roi])** | 复制图像或ROI区域 |
| **img.rotation_corr([theta])** | 旋转校正 |

---

## 3. 颜色追踪

| 方法 | 功能 |
|------|------|
| **img.find_blobs(thresholds, pixels_threshold=10, area_threshold=10, merge=False)** | 寻找色块<br>- thresholds: 颜色阈值列表<br>- pixels_threshold: 最小像素数<br>- area_threshold: 最小面积<br>- merge: 是否合并相邻色块 |
| **img.find_lines(threshold=1000, theta_margin=25, rho_margin=25)** | 寻找直线<br>- threshold: 边缘阈值<br>- theta_margin: 角度容差<br>- rho_margin: 距离容差 |
| **img.find_line_segments(threshold=1000, theta_margin=25, rho_margin=25)** | 寻找线段 |
| **img.find_circles(threshold=2000, x_margin=10, y_margin=10, r_margin=10, r_min=2, r_max=100, r_step=2)** | 寻找圆形 |
| **img.find_qrcodes([roi])** | 寻找二维码 |
| **img.find_apriltags([families])** | 寻找AprilTag |
| **img.find_faces([roi])** | 寻找人脸 |

---

## 4. 图像处理

| 方法 | 功能 |
|------|------|
| **img.binary([thresholds])** | 二值化图像 |
| **img.invert()** | 反转图像颜色 |
| **img.erode(size)** | 腐蚀操作 |
| **img.dilate(size)** | 膨胀操作 |
| **img.morph([operation], size)** | 形态学操作 |
| **img.laplacian([kernel_size])** | 拉普拉斯边缘检测 |
| **img.sobel([direction])** | Sobel边缘检测 |
| **img.histeq()** | 直方图均衡化 |
| **img.mean([roi])** | 计算图像均值 |
| **img.median([roi])** | 计算图像中值 |
| **img.std([roi])** | 计算图像标准差 |

---

## 5. 绘制操作

| 方法 | 功能 |
|------|------|
| **img.draw_line(x0, y0, x1, y1, color=1, thickness=1)** | 绘制直线 |
| **img.draw_rectangle(x, y, w, h, color=1, thickness=1, fill=False)** | 绘制矩形 |
| **img.draw_circle(x, y, radius, color=1, thickness=1, fill=False)** | 绘制圆形 |
| **img.draw_ellipse(x, y, rx, ry, color=1, thickness=1, fill=False)** | 绘制椭圆 |
| **img.draw_cross(x, y, size=5, color=1, thickness=1)** | 绘制十字 |
| **img.draw_string(x, y, text, color=1, scale=1)** | 绘制文本 |
| **img.draw_keypoints(keypoints, color=1, size=2)** | 绘制关键点 |
| **img.draw_edges(edges, color=1)** | 绘制边缘 |
| **img.draw_blobs(blobs, color=1)** | 绘制色块 |

---

## 6. 几何变换

| 方法 | 功能 |
|------|------|
| **img.rotation(angle, scale=1.0, center=None)** | 旋转图像 |
| **img.resize(width, height)** | 调整图像大小 |
| **img.crop(roi)** | 裁剪图像 |
| **img.flip([horizontal], [vertical])** | 翻转图像 |
| **img.mirror()** | 水平镜像 |
| **img.transpose()** | 转置图像 |

---

## 7. 高级操作

| 方法 | 功能 |
|------|------|
| **img.find_keypoints([threshold], [scale_factor], [max_keypoints])** | 寻找关键点 |
| **img.match_descriptor(descriptor, threshold=70)** | 匹配描述符 |
| **img.find_template(template, threshold, [roi], [step], [search])** | 模板匹配 |
| **img.perspective_correction(src_pts, dst_pts)** | 透视校正 |
| **img.warp_transform(matrix, width, height)** | warp变换 |
| **img.get_regression(blobs, [roi])** | 获取线性回归 |

---

## 8. 使用示例

### 8.1 颜色追踪
```python
import sensor, image, time

sensor.reset()
sensor.set_pixformat(sensor.RGB565)
sensor.set_framesize(sensor.QVGA)
sensor.skip_frames(time=2000)

red_threshold = (30, 100, 15, 127, 15, 127)

while True:
    img = sensor.snapshot()
    blobs = img.find_blobs([red_threshold])
    if blobs:
        for blob in blobs:
            img.draw_rectangle(blob.rect())
            img.draw_cross(blob.cx(), blob.cy())
```

### 8.2 边缘检测
```python
import sensor, image, time

sensor.reset()
sensor.set_pixformat(sensor.GRAYSCALE)
sensor.set_framesize(sensor.QVGA)
sensor.skip_frames(time=2000)

while True:
    img = sensor.snapshot()
    edges = img.find_edges(image.EDGE_CANNY, threshold=(50, 100))
    img.draw_edges(edges, color=255)
```

### 8.3 二维码识别
```python
import sensor, image, time

sensor.reset()
sensor.set_pixformat(sensor.RGB565)
sensor.set_framesize(sensor.QVGA)
sensor.skip_frames(time=2000)

while True:
    img = sensor.snapshot()
    qrcodes = img.find_qrcodes()
    for qr in qrcodes:
        img.draw_rectangle(qr.rect())
        print(qr.payload())
```

---

## 9. 注意事项

1. **性能考虑**：图像处理操作会占用CPU资源，高分辨率下处理速度会降低
2. **内存管理**：某些操作（如复制图像）会占用额外内存，注意内存使用
3. **阈值调整**：颜色追踪和边缘检测的阈值需要根据实际场景调整
4. **ROI设置**：使用ROI可以减少处理区域，提高处理速度
5. **格式转换**：不同图像格式的处理速度和内存占用不同，根据需求选择合适的格式
