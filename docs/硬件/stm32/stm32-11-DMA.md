## DMA简介

### 基本信息

| 项目 | 说明 |
|------|------|
| 工作功能 | 实现外设与存储器/存储器与存储器之间的数据传输 |
| 工作资源 | DMA1（7个通道），DMA2（5个通道） |
| CT86资源 | DMA1 |

### 存储地址

| 类型 | 起始地址 | 存储器 | 用途 |
|------|----------|--------|------|
| ROM | 0x08000000 | 程序存储器Flash | 存储C语言编译后的程序代码 |
| ROM | 0x1FFFF000 | 系统存储器 | 存储BootLoader，用于串口下载 |
| ROM | 0x1FFF8000 | 选项字节 | 存储一些独立于程序代码的配置参数 |
| RAM | 0x20000000 | 运行内存SRAM | 存储运行过程中的临时变量 |
| RAM | 0x40000000 | 外设寄存器 | 存储各个外设的配置参数 |
| RAM | 0xE0000000 | 内核外设寄存器 | 存储内核各个外设的配置参数 |

### 配置步骤

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 开启RCC时钟 | 使能DMA时钟 |
| 2 | 配置DMA | 设置地址/数据宽度/自增、传输方向、缓存区大小、循环模式、传输类型、外部中断等 |
| 3 | 使能DMA | 启动DMA传输 |
### 配置代码

```c
// 使能RCC-DMA1
RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE);

/* 配置DMA
 * 1. 外设基地址
 * 2. 外设数据宽度
 * 3. 使能外设数据自增
 * 4. 内存基地址
 * 5. 内存数据宽度
 * 6. 内存地址自增
 * 7. 传输方向
 * 8. 缓存区大小
 * 9. 非循环模式
 * 10. 存储器到存储器传输
 * 11. 中等优先级
 */
DMA_InitTypeDef DMA_InitStructure;
DMA_InitStructure.DMA_PeripheralBaseAddr = AddrA;
DMA_InitStructure.DMA_PeripheralDataSize = DMA_PeripheralDataSize_Byte;
DMA_InitStructure.DMA_PeripheralInc = DMA_PeripheralInc_Enable;
DMA_InitStructure.DMA_MemoryBaseAddr = AddrB;
DMA_InitStructure.DMA_MemoryDataSize = DMA_MemoryDataSize_Byte;
DMA_InitStructure.DMA_MemoryInc = DMA_MemoryInc_Enable;

DMA_InitStructure.DMA_DIR = DMA_DIR_PeripheralSRC;
DMA_InitStructure.DMA_BufferSize = DMA_BufferSize;
DMA_InitStructure.DMA_Mode = DMA_Mode_Normal;
DMA_InitStructure.DMA_M2M = DMA_M2M_Enable;
DMA_InitStructure.DMA_Priority = DMA_Priority_Medium;

// 初始化DMA
DMA_Init(DMA1_Channel1, &DMA_InitStructure);

// 使能DMA
DMA_Cmd(DMA1_Channel1, ENABLE);
```
### ADC+DMA配置代码

```c
/*
 * 1. 使能时钟
 * - 使能ADC1时钟
 * - 使能GPIOA时钟（PA0-PA3作为模拟输入）
 * - 使能DMA1时钟（用于数据传输）
 */
RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1, ENABLE);
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE);

/*
 * 2. 配置GPIO
 * - PA0-PA3配置为模拟输入模式
 * - 用于ADC通道0-3的信号输入
 */
GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AIN;
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0 | GPIO_Pin_1 | GPIO_Pin_2 | GPIO_Pin_3;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOA, &GPIO_InitStructure);

/*
 * 3. 配置DMA通道1
 * - 外设基地址：ADC1数据寄存器
 * - 数据宽度：16位（HalfWord）
 * - 外设地址：固定
 * - 内存地址：ADC_ConvertedValue缓冲区
 * - 内存地址：自增
 * - 传输方向：外设作为数据源
 * - 缓冲区大小：4个通道
 * - 模式：循环模式
 * - 优先级：高
 */
DMA_InitTypeDef DMA_InitStructure;
DMA_InitStructure.DMA_PeripheralBaseAddr = (uint32_t)&ADC1->DR;
DMA_InitStructure.DMA_PeripheralDataSize = DMA_PeripheralDataSize_HalfWord;
DMA_InitStructure.DMA_PeripheralInc = DMA_PeripheralInc_Disable;
DMA_InitStructure.DMA_MemoryBaseAddr = (uint32_t)ADC_ConvertedValue;
DMA_InitStructure.DMA_MemoryDataSize = DMA_MemoryDataSize_HalfWord;
DMA_InitStructure.DMA_MemoryInc = DMA_MemoryInc_Enable;
DMA_InitStructure.DMA_DIR = DMA_DIR_PeripheralSRC;
DMA_InitStructure.DMA_BufferSize = 4;
DMA_InitStructure.DMA_Mode = DMA_Mode_Circular;
DMA_InitStructure.DMA_M2M = DMA_M2M_Disable;
DMA_InitStructure.DMA_Priority = DMA_Priority_High;
DMA_Init(DMA1_Channel1, &DMA_InitStructure);

/*
 * 4. 使能DMA通道1
 */
DMA_Cmd(DMA1_Channel1, ENABLE);

/*
 * 5. 配置ADC1
 * - ADC时钟分频：PCLK2/6
 * - 规则通道配置：通道0-3，采样时间55.5周期
 * - 工作模式：独立模式，右对齐，无外部触发
 * - 转换模式：连续转换，扫描模式
 * - 通道数量：4个
 */
RCC_ADCCLKConfig(RCC_PCLK2_Div6);

ADC_RegularChannelConfig(ADC1, ADC_Channel_0, 1, ADC_SampleTime_55Cycles5);
ADC_RegularChannelConfig(ADC1, ADC_Channel_1, 2, ADC_SampleTime_55Cycles5);
ADC_RegularChannelConfig(ADC1, ADC_Channel_2, 3, ADC_SampleTime_55Cycles5);
ADC_RegularChannelConfig(ADC1, ADC_Channel_3, 4, ADC_SampleTime_55Cycles5);

ADC_InitTypeDef ADC_InitStructure;
ADC_InitStructure.ADC_Mode = ADC_Mode_Independent;
ADC_InitStructure.ADC_DataAlign = ADC_DataAlign_Right;
ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None;
ADC_InitStructure.ADC_ContinuousConvMode = ENABLE;
ADC_InitStructure.ADC_ScanConvMode = ENABLE;
ADC_InitStructure.ADC_NbrOfChannel = 4;
ADC_Init(ADC1, &ADC_InitStructure);

/*
 * 6. 使能ADC1的DMA请求
 */
ADC_DMACmd(ADC1, ENABLE);

/*
 * 7. 使能ADC1
 */
ADC_Cmd(ADC1, ENABLE);

/*
 * 8. ADC校准
 * - 重置校准寄存器
 * - 等待重置完成
 * - 开始校准
 * - 等待校准完成
 */
ADC_ResetCalibration(ADC1);
while (ADC_GetResetCalibrationStatus(ADC1) == SET);
ADC_StartCalibration(ADC1);
while (ADC_GetCalibrationStatus(ADC1) == SET);

/*
 * 9. 启动ADC转换
 */
ADC_SoftwareStartConvCmd(ADC1, ENABLE);
```
