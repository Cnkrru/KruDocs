## IC（输入捕获）

### 基本概念

| 项目 | 说明 |
|------|------|
| 工作原理 | 边沿检测，捕获CCR的值，寄存到CNT中 |
| 注意事项 | OC与IC共用4个CH通道，不能将一个通道同时处理OC与IC |

### 测量参数

| 参数 | 说明 |
|------|------|
| 频率 | 输入信号的频率 |
| 占空比 | 高电平时间与周期的比值 |
| 脉冲间隔 | 两次脉冲之间的时间 |
| 电平持续时间 | 高电平或低电平的持续时间 |

### 工作模式

| 模式 | 说明 |
|------|------|
| PWMI | 同时测量频率和占空比 |
| 主从触发 | 实现硬件全自动测量 |

### 测量频率的方法

| 方法 | 原理 | 计算公式 | 适用场景 |
|------|------|----------|----------|
| 测频法 | 在闸门时间T内，对输入信号的上升沿计次，得到计数值N | `f_x = N / T` | 适用于高频信号测量 |
| 测周法 | 在输入信号的两个上升沿内，以标准频率 f_c 计次，得到计数值N | `f_x = f_c / N` | 适用于低频信号测量 |
| 中界频率 | 测频法与测周法误差相等的频率点 | `f_m = \sqrt{f_c / T}` | 信号频率高于中界频率用测频法，低于用测周法 |

### IC配置步骤

| 步骤 | 操作 |
|------|------|
| 1 | 启动时钟 |
| 2 | 配置GPIO |
| 3 | 配置时基单元 |
| 4 | 配置输入捕获单元 |
| 5 | 选择从模式触发源 |
| 6 | 选择触发后的操作 |
### IC配置代码

```c
//开启RCC时钟
RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE);

// GPIO配置
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_IPU;  // 复用上拉输入
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6;          // TIM3_CH1
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOA, &GPIO_InitStructure);		

// 开启内部时钟（可以不写，因为默认开启内部时钟）
TIM_InternalClockConfig(TIM3);

// 配置TIM
TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;
TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1;    // 分频模式
TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;// 向上计数
TIM_TimeBaseInitStructure.TIM_Period = 65536 - 1;              // 目标值
TIM_TimeBaseInitStructure.TIM_Prescaler = 72 - 1;              // PSC
TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0;           // 高级计数

// 初始化TIM
TIM_TimeBaseInit(TIM3, &TIM_TimeBaseInitStructure);

// 配置IC模块
TIM_ICInitTypeDef TIM_ICInitStructure;

TIM_ICInitStructure.TIM_Channel = TIM_Channel_1;             // 配置通道
TIM_ICInitStructure.TIM_ICFilter = 0xF;                      // 滤波器参数N
TIM_ICInitStructure.TIM_ICPolarity = TIM_ICPolarity_Rising;  // 选择边沿触发
TIM_ICInitStructure.TIM_ICPrescaler = TIM_ICPSC_DIV1;        // IC分频通道
TIM_ICInitStructure.TIM_ICSelection = TIM_ICSelection_DirectTI;// 输入捕获

// 初始化IC
TIM_ICInit(TIM3, &TIM_ICInitStructure);

// 选择TIM3的输入触发源为TI1FP1
TIM_SelectInputTrigger(TIM3, TIM_TS_T1FP1);

// 选择TIM3的从模式为复位模式
TIM_SelectSlaveMode(TIM3, TIM_SlaveMode_Reset);

// 使能TIM
TIM_Cmd(TIM3, ENABLE);
```
### IC-PWMI模式配置代码

> 在原有通道配置下方填上这一句就行，因为1/2、3/4通道分别互补，这是ST公司封装好的函数。

```c
// 初始化TIM3为PWMI模式
// PWMI模式会自动配置通道2为相反极性（下降沿）
TIM_PWMIConfig(TIM3, &TIM_ICInitStructure);
```