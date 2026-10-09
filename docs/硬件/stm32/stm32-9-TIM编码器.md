## 编码器

### 基本信息

| 项目 | 说明 |
|------|------|
| 设备配置 | 每个高级定时器/通用定时器都有一个编码器接口 |
| 引脚配置 | 两个输入引脚借用CH1/CH2通道 |

### 配置步骤

| 步骤 | 操作 |
|------|------|
| 1 | 启动时钟 |
| 2 | 配置GPIO |
| 3 | 配置时基单元 |
| 4 | 配置输入捕获单元（只需要配置滤波器/极性选择） |
| 5 | 配置编码器接口模式 |
### 配置代码

```c
// 开启RCC时钟
RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM3, ENABLE);

// GPIO配置
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_IPU;             // 复用上拉输入
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_6 | GPIO_Pin_7;      // TIM3_CH1, CH2
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOA, &GPIO_InitStructure);		

// 开启内部时钟（可以不写，因为默认开启内部时钟）
TIM_InternalClockConfig(TIM3);

// 配置TIM
TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;
TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1;    // 分频模式
TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;// 向上计数
TIM_TimeBaseInitStructure.TIM_Period = 65536 - 1;              // 目标值
TIM_TimeBaseInitStructure.TIM_Prescaler = 1 - 1;               // PSC
TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0;           // 高级计数

// 初始化TIM
TIM_TimeBaseInit(TIM3, &TIM_TimeBaseInitStructure);

// 配置IC模块
TIM_ICInitTypeDef TIM_ICInitStructure;

// 使用库函数初始化TIM_ICInitStructure结构体为默认值
TIM_ICStructInit(&TIM_ICInitStructure);

// 通道1（A相）
TIM_ICInitStructure.TIM_Channel = TIM_Channel_1;
TIM_ICInitStructure.TIM_ICFilter = 0xF;

// 通道2（B相）
TIM_ICInitStructure.TIM_Channel = TIM_Channel_2;
TIM_ICInitStructure.TIM_ICFilter = 0xF;

// 初始化IC
TIM_ICInit(TIM3, &TIM_ICInitStructure);

// 配置TIM3为编码器模式
TIM_EncoderInterfaceConfig(TIM3, TIM_EncoderMode_TI12, TIM_ICPolarity_Rising, TIM_ICPolarity_Rising);

// 使能TIM
TIM_Cmd(TIM3, ENABLE);
```