# 音频类元数据写法

> 音频元数据最典型的是 MP3 的 **ID3**（v1/v2），其他格式用 **Vorbis Comment** 或容器内标签。

## 一、MP3（ID3v1 / ID3v2）

### 常见字段
| 字段 | 说明 |
|------|------|
| TIT2 | 标题 |
| TPE1 | 歌手 |
| TALB | 专辑 |
| TYER / TDRC | 年份 |
| TRCK | 曲目号 |
| TCON | 流派 |
| APIC | 封面图 |
| USLT | 歌词 |

### 如何写入（Python mutagen）
```python
from mutagen.id3 import ID3, TIT2, TPE1, TALB

audio = ID3('song.mp3')
audio['TIT2'] = TIT2(encoding=3, text='我的歌')
audio['TPE1'] = TPE1(encoding=3, text='歌手名')
audio['TALB'] = TALB(encoding=3, text='专辑名')
audio.save()
```

### 如何查看
```bash
ffprobe song.mp3             # 显示所有标签
eyeD3 song.mp3               # 专用工具
```

## 二、FLAC（Vorbis Comment）

| 字段 | 说明 |
|------|------|
| TITLE | 标题 |
| ARTIST | 艺术家 |
| ALBUM | 专辑 |
| DATE | 日期 |
| TRACKNUMBER | 曲目号 |
| COVERART | 封面 |

```python
from mutagen.flac import FLAC

audio = FLAC('song.flac')
audio['TITLE'] = '我的歌'
audio['ARTIST'] = '歌手名'
audio.save()
```

## 三、WAV（RIFF chunk）

| 字段 | 说明 |
|------|------|
| 采样率 | 如 44100 |
| 位深 | 如 16 |
| 声道数 | 单声道 / 立体声 |
| 制作软件 | 通常无 |

```python
import wave

with wave.open('sound.wav', 'rb') as w:
    print(w.getframerate(), w.getsampwidth(), w.getnchannels())
```

## 四、M4A / AAC（MP4 容器标签）

| 字段 | 说明 |
|------|------|
| ©nam | 标题 |
| ©ART | 歌手 |
| ©alb | 专辑 |
| ©day | 年份 |
| covr | 封面 |

```python
from mutagen.mp4 import MP4

audio = MP4('song.m4a')
audio['©nam'] = '我的歌'
audio['©ART'] = '歌手名'
audio.save()
```