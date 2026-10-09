## STM32 ADC数模转换

## 1. 基本信息

### 1.1 工作原理
> 将引脚的电压映射到一个从0开始的数据区间里。

### 1.2 工作范围
| 项目 | 值 |
|------|-----|
| 电压范围 | 0V ~ 3.3V |
| 数据范围 | 0 ~ 4095 |

### 1.3 模块资源

| 资源 | 说明 |
|------|------|
| ADC模块 | ADC1, ADC2 |
| 外部输入通道 | 10个 |
| 规则组 | 16通道，1个占位资源 |
| 注入组 | 4通道，4个占位资源 |

---

## 2. 工作模式

### 2.1 转换模式

| 模式 | 说明 |
|------|------|
| 单次转换 | 一次只转换一个数据 |
| 连续转换 | 一次转换组中所有数据 |

### 2.2 扫描模式

| 模式 | 说明 |
|------|------|
| 扫描模式 | 转换一次停止 |
| 非扫描模式 | 不间断持续循环 |
| 间断模式 | 扫描模式情况下，间隔几个转换一次 |

### 2.3 模式组合
> 1/2相互组合可以搭配4种模式。

---

## 3. 注意事项

### 3.1 数据对齐方式

> STM32的ADC为12位，但寄存器是16位，所以数据存在两种对齐方式：

| 对齐方式 | 说明 |
|----------|------|
| 右对齐 | 一般选择右对齐，可直接读取出准确数据 |
| 左对齐 | 数据与实际相差16倍，可放弃后4位将ADC看作8位ADC |

### 3.2 转换时间计算

| 项目 | 公式 |
|------|------|
| 总转换时间 | `T_CONV = 采样时间 + 12.5个ADC周期` |

### 3.3 ADC校准
> 不需要管，代码处理。

---

## 4. 配置步骤

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 开启RCC时钟/分频器 | 配置ADC时钟 |
| 2 | 配置GPIO | 设置为模拟输入模式 |
| 3 | 配置多路开关 | 把开关配置到组（规则组/注入组）里 |
| 4 | 配置ADC转换器 | 设置工作模式、对齐方式等 |
| 5 | 使能ADC | 启动ADC模块 |
| 6 | ADC校准 | 校准ADC以提高精度 |

---

## 5. 配置代码示例

### 5.1 单ADC配置
```c
//启动GPIO和ADC的RCC时钟
RCC_APB2PeriphClockCmd(RCC_APB2Periph_ADC1, ENABLE);
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

//对ADC分频，频率不能超过14MHz
RCC_ADCCLKConfig(RCC_PCLK2_Div6);

//GPIO配置
GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AIN;        //模拟输入模式
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOA, &GPIO_InitStructure);

/*通道选择
*选择ADC
*选择通道
*选择组内序列位置
*选择转换时间
*/
ADC_RegularChannelConfig(ADC1, ADC_Channel_0, 1, ADC_SampleTime_55Cycles5);

/*ADC配置
*选择独立模式
*选择数据右对齐
*无外部触发
*单次转换
*非扫描模式
*通道个数为1
*/
ADC_InitTypeDef ADC_InitStructure;
ADC_InitStructure.ADC_Mode = ADC_Mode_Independent;
ADC_InitStructure.ADC_DataAlign = ADC_DataAlign_Right;
ADC_InitStructure.ADC_ExternalTrigConv = ADC_ExternalTrigConv_None;
ADC_InitStructure.ADC_ContinuousConvMode = DISABLE;
ADC_InitStructure.ADC_ScanConvMode = DISABLE;
ADC_InitStructure.ADC_NbrOfChannel = 1;
ADC_Init(ADC1, &ADC_InitStructure);

//使能ADC
ADC_Cmd(ADC1, ENABLE);

/*ADC校准流程
*重置校准寄存器
*等待重置完成
*开始校准
*等待校准完成
*/
ADC_ResetCalibration(ADC1);
while (ADC_GetResetCalibrationStatus(ADC1) == SET);
ADC_StartCalibration(ADC1);
while (ADC_GetCalibrationStatus(ADC1) == SET);
```

### 5.2 读取ADC值
```c
//启动转换
ADC_SoftwareStartConvCmd(ADC1, ENABLE);

//等待转换完成
while (ADC_GetFlagStatus(ADC1, ADC_FLAG_EOC) == RESET);

//读取ADC值
uint16_t adc_value = ADC_GetConversionValue(ADC1);
```