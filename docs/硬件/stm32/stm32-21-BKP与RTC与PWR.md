```text
RTC初始化流程
    ├── 1. 开启时钟
    │   ├── 开启PWR时钟
    │   └── 开启BKP时钟
    ├── 2. 允许备份访问
    │   └── PWR_BackupAccessCmd(ENABLE)
    ├── 3. 检查是否首次配置
    │   ├── 读取BKP_DR1的值
    │   ├── 如果不是0xA5A5（首次配置）
    │   │   ├── 开启LSE时钟
    │   │   ├── 等待LSE就绪
    │   │   ├── 选择LSE作为RTC时钟源
    │   │   ├── 使能RTC时钟
    │   │   ├── 等待RTC同步
    │   │   ├── 设置RTC预分频器
    │   │   ├── 设置时间
    │   │   └── 写入BKP_DR1=0xA5A5
    │   └── 如果是0xA5A5（非首次配置）
    │       └── 等待RTC同步
    └── 4. 初始化完成
```

### 代码配置
```c
void BKP_RTC_Init(void)
{
    // 使能PWR和BKP时钟
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_PWR | RCC_APB1Periph_BKP, ENABLE);
    
    // 允许访问备份寄存器
    PWR_BackupAccessCmd(ENABLE);
    
    // 检查是否第一次配置
    if (BKP_ReadBackupRegister(BKP_DR1) != 0x5555)
    {
        // 使能外部低速晶振
        RCC_LSEConfig(RCC_LSE_ON);
        // 等待晶振稳定
        while (RCC_GetFlagStatus(RCC_FLAG_LSERDY) == RESET);
        // 选择LSE作为RTC时钟
        RCC_RTCCLKConfig(RCC_RTCCLKSource_LSE);
        // 使能RTC时钟
        RCC_RTCCLKCmd(ENABLE);
        
        // 初始化RTC
        RTC_WaitForSynchro();
        // 32768Hz晶振，预分频后1Hz
        RTC_SetPrescaler(32767);
        
        // 写入标志，表示已配置
        BKP_WriteBackupRegister(BKP_DR1, 0x5555);
    }
    else
    {
        // 已经配置过，等待同步
        RTC_WaitForSynchro();
    }
}

// 存储数据到BKP
void BKP_SaveData(uint16_t data)
{
    PWR_BackupAccessCmd(ENABLE);
    BKP_WriteBackupRegister(BKP_DR2, data);
    PWR_BackupAccessCmd(DISABLE);
}

// 从BKP读取数据
uint16_t BKP_ReadData(void)
{
    return BKP_ReadBackupRegister(BKP_DR2);
}
```
## BKP、PWR、RTC实战应用场景

| 应用场景 | 特点 |
|----------|------|
| 低功耗数据采集系统 | 电池供电，长期运行；每小时采集一次环境数据；掉电后数据不丢失；系统能够定时唤醒和休眠 |
| 智能电表系统 | 记录用电数据；定时上报数据；掉电后保持时间和数据；防篡改功能 |
| 物联网节点 | 电池供电，低功耗运行；定期连接网络上报数据；存储网络配置和设备ID；远程唤醒功能 |
| 便携式医疗设备 | 电池供电，长续航；定时测量生命体征数据；存储患者信息和测量历史；紧急情况下快速唤醒 |
| 工业控制系统 | 监控设备运行状态；定时采集生产数据；掉电后保持系统配置；故障时通过闹钟唤醒系统 |
| 智能家居设备 | 低功耗待机；定时执行任务（如开关灯、调节温度）；存储用户偏好设置；远程控制和定时功能 |
| 环境监测站 | 长期户外运行；定时采集环境数据（温度、湿度、PM2.5等）；存储历史数据和校准参数；低电量时降低采集频率 |
| 智能农业设备 | 电池或太阳能供电；定时灌溉和监测；存储土壤数据和灌溉计划；根据天气情况调整工作模式 |
| 车辆监测系统 | 低功耗监控；定时采集车辆状态数据；存储故障代码和行驶数据；异常情况及时唤醒报警 |
| 安防系统 | 低功耗待机；定时布防和撤防；存储系统配置和报警记录；触发事件时快速唤醒响应 |