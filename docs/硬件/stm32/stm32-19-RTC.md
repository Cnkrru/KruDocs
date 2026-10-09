### RTC（实时时钟）

| 项目    | 内容                                                                   |
| ----- | -------------------------------------------------------------------- |
| 主要功能  | 独立的定时器，为系统提供时钟和日历功能                                                  |
| 工作区域  | 处于备份区域，系统复位时数据不清零                                                    |
| 供电方式  | VDD（2.0-3.6V）正常供电，VDD断电后由VBAT（1.8-3.6V）供电继续走时                        |
| 计数器   | 32位可编程计数器，对应Unix时间戳的秒计数器                                             |
| 预分频器  | 20位可编程预分频器，可适配不同频率的输入时钟                                              |
| 时钟源选择 | HSE时钟除以128（通常为8MHz/128）<br>LSE振荡器时钟（通常为32.768KHz）<br>LSI振荡器时钟（40KHz） |
### RTC使用方法

| 操作 | 函数 | 说明 |
|------|------|------|
| 配置RTC时钟源 | `RCC_RTCCLKConfig(RCC_RTCCLKSource_LSE)` | 选择LSE作为RTC时钟源 |
| 使能RTC时钟 | `RCC_RTCCLKCmd(ENABLE)` | 启动RTC时钟 |
| 等待同步 | `RTC_WaitForSynchro()` | 等待RTC寄存器同步 |
| 设置预分频器 | `RTC_SetPrescaler(32768 - 1)` | 设置RTC预分频，使计数频率为1Hz |
| 设置时间 | `RTC_SetCounter(time_cnt)` | 将时间戳写入RTC计数器 |
| 读取时间 | `RTC_GetCounter()` | 读取当前时间戳 |
| 设置闹钟 | `RTC_SetAlarm(RTC_Format_BIN, RTC_Alarm_A, &alarm)` | 配置RTC闹钟 |
| 使能闹钟中断 | `RTC_ITConfig(RTC_IT_ALRA, ENABLE)` | 启用RTC闹钟中断 |
