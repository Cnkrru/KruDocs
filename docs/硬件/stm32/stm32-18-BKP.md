### BKP（备份寄存器）

| 项目       | 内容                                        |
| -------- | ----------------------------------------- |
| 主要功能     | 存储用户应用程序数据                                |
| 供电方式     | VDD（2.0-3.6V）正常供电，VDD断电时由VBAT（1.8-3.6V）维持 |
| 数据保持     | 断电后依靠内置电源供电的RAM                           |
| 数据清除     | TAMPER引脚的侵入事件会清除所有备份寄存器内容                 |
| RTC相关功能  | 存储RTC时钟校准寄存器，RTC引脚输出RTC的准时钟、闹钟脉冲或秒脉冲      |
| 用户数据存储容量 | 20字节（中容量和小容量）<br>84字节（大容量和互联型）            |
### BKP使用方法

| 操作 | 函数 | 说明 |
|------|------|------|
| 开启BKP时钟 | `RCC_APB1PeriphClockCmd(RCC_APB1Periph_BKP, ENABLE)` | 使能BKP模块时钟 |
| 写入备份寄存器 | `BKP_WriteBackupRegister(BKP_DR1, 0xA5A5)` | 写入标志值，用于判断是否首次配置 |
| 读取备份寄存器 | `BKP_ReadBackupRegister(BKP_DR1)` | 读取标志值，判断是否需要重新配置 |
| 存储用户数据 | `BKP_WriteBackupRegister(BKP_DR2, data)` | 存储用户配置、系统状态等 |
| 读取用户数据 | `BKP_ReadBackupRegister(BKP_DR2)` | 恢复用户配置、系统状态等 |
