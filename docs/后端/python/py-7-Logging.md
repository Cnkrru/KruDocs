# Py-Logging

## 1. 模块介绍

- **logging**日志记录。
- OK

---

## 2. 常用函数

| 分类 | 函数名 | 必选参数 | 作用 |
| --- | --- | --- | --- |
| 配置API | `logging.basicConfig(**kwargs)` | 无 | 配置基础日志系统 |
| | `logging.getLogger(name=None)` | 无 | 获取日志器实例 |
| | `logger.setLevel(level)` | level | 设置日志级别 |
| | `logger.addHandler(handler)` | handler | 添加处理器 |
| | `logging.Formatter(fmt=None, datefmt=None)` | 无 | 创建日志格式化器 |
| | `logging.FileHandler(filename)` | filename | 创建文件输出器 |
| | `logging.StreamHandler(stream=None)` | 无 | 创建终端输出器 |
| 日志记录 | `logging.debug(msg, *args, **kwargs)` | msg | 记录调试级别的消息 |
| | `logging.info(msg, *args, **kwargs)` | msg | 记录信息级别的消息 |
| | `logging.warning(msg, *args, **kwargs)` | msg | 记录警告级别的消息 |
| | `logging.error(msg, *args, **kwargs)` | msg | 记录错误级别的消息 |
| | `logging.critical(msg, *args, **kwargs)` | msg | 记录严重错误级别的消息 |
| | `logging.exception(msg, *args, **kwargs)` | msg | 记录异常信息 |

---

## 3. 日志级别

| 级别 | 数值 | 描述 |
| --- | --- | --- |
| DEBUG | 10 | 详细的调试信息 |
| INFO | 20 | 一般信息 |
| WARNING | 30 | 警告信息 |
| ERROR | 40 | 错误信息 |
| CRITICAL | 50 | 严重错误信息 |

---

## 4. 配置选项

### 4.1 basicConfig参数

| 参数 | 描述 |
| --- | --- |
| level | 设置日志级别 |
| format | 设置日志格式 |
| datefmt | 设置日期时间格式 |
| filename | 设置日志文件路径 |
| filemode | 设置文件打开模式（'w'或'a'） |
| stream | 设置输出流 |

### 4.2 日志格式占位符

| 占位符 | 描述 |
| --- | --- |
| %(asctime)s | 日志记录的时间 |
| %(levelname)s | 日志级别 |
| %(message)s | 日志消息 |
| %(name)s | 日志器名称 |
| %(filename)s | 文件名 |

---

## 5. 使用示例（单例模式）

```python
import datetime
import logging


today=datetime.date.today()

class loger:

    _instance=None
    _init=False

    # 单例模式
    def __new__(cls,):
        try:
            if cls._instance==None:
                cls._instance=super().__new__(cls)
            return cls._instance
        except Exception as e:
            print("error,没有创立实例")    

    # 初始化参数
    def __init__(self,level=logging.INFO,format='%(asctime)s - %(levelname)s - %(message)s',filename=None,filemode='a'):
        
        # 检查是否存在单例
        if self._init==False:
             self._init = True    

        self.level=level
        self.format=format
        self.filemode=filemode

        if filename is None:
            self.filename=f'{today}.log'          

    # 初始化日志
    def loger_init(self,):
        try:
            logging.basicConfig(
                level=self.level,
                format=self.format,
                filename=self.filename,
                filemode=self.filemode
                )
        except Exception as e:
            print("error,初始化失败")  

    '''
    # 设置日志等级
    def set_level(self,user_level):
        if user_level is not None:
            self.level=user_level
        else:
            self.level=logging.INFO
        self.loger_init()

    # 设置日志格式化
    def set_format(self,user_format):
        if user_format is not None:
            self.format=user_format 
        else:
            self.format='%(asctime)s - %(levelname)s - %(message)s'
        self.loger_init()

    #设置输出的文件名
    def set_filename(self,user_filename):
        if user_filename is not None:
            self.filename=user_filename
        else:
            self.filename=f'{today}.log'
        self.loger_init()            

    # 设置文件写入日志的模式
    def set_filemode(self,user_filemode):
        if user_filemode is not None:
            self.filemode=user_filemode
        else:
            self.filemode='a' 
        self.loger_init()
    '''                      


log=loger()
log.loger_init()
logging.debug('这是一条调试信息')  
logging.info('应用启动成功')
logging.warning('配置文件缺失，使用默认配置')
logging.error('API调用失败: 404 Not Found')
logging.critical('数据库连接失败') 

log2=loger()
print(f"是否是同一个实例: {log is log2}")  # True    

'''
配置API
'''

# 1.创建日志器，默认文件输出
logger = logging.getLogger('filename.log') 

# 2.设置日志等级
logger.setLevel(logging.INFO)

# 3.设置日志格式
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# 4.创建文件输出器
file_worker = logging.FileHandler('filename.log')

# 5.创建终端输出器
cmd_worker = logging.StreamHandler()

# 6.添加处理器
logger.addHandler(file_worker)
logger.addHandler(cmd_worker)
```