# 视频类元数据写法

> 视频元数据存在**容器层**（moov atom / Matroska Tags），与编码流（H.264 等）分离。

## 一、MP4 / MOV（moov atom）

### 常见字段
| 字段 | 说明 |
|------|------|
| ©nam | 标题 |
| ©too | 编码器 / 制作软件 |
| ©day | 创建时间 |
| ©ART | 作者 |
| 分辨率 | 宽 x 高 |
| 时长 | 秒数 |

### 如何查看（ffprobe）
```bash
ffprobe -v quiet -print_format json -show_format video.mp4
```

### 如何写入（ffmpeg）
```bash
ffmpeg -i in.mp4 -metadata title="我的视频" -metadata artist="作者" out.mp4
```

## 二、MKV / WebM（Matroska Tags）

| 字段 | 说明 |
|------|------|
| TITLE | 标题 |
| ARTIST | 演员 / 作者 |
| DIRECTOR | 导演 |
| DATE_RELEASED | 发行日期 |
| LANGUAGE | 语言 |
| 章节 | 章节信息 |

```bash
mkvpropedit in.mkv --edit info --set title=我的视频 \
  --set "segment-filename=in.mkv" --set "date=2026-08-16"
```

## 三、AVI（RIFF INFO）

| 字段 | 说明 |
|------|------|
| INAM | 标题 |
| IART | 作者 |
| ICOP | 版权 |
| ISFT | 制作软件 |

```bash
ffmpeg -i in.avi -metadata title=视频标题 out.avi
```

## 四、通用查看方法

```bash
ffprobe video.mp4                 # 完整信息
ffprobe -v quiet -show_format video.mp4   # 仅元数据
exiftool video.mp4                # 容器 + 编码信息
```