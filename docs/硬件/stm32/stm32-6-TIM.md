## STM32 TIM

## 1. 基本信息

### 1.1 工作原理
- 时钟计时到目标时间触发中断

### 1.2 工作限制
- 最大支持59.65s的定时

### 1.3 元件资源
- TIM1~4

### 1.4 总线配置
| 定时器 | 总线 |
|--------|------|
| TIM1/8 | APB2 |
| TIM2-7 | APB1 |

### 1.5 计时配置
| 定时器 | 类型 |
|--------|------|
| TIM1/8 | 高级计时器 |
| TIM2-5 | 通用计时器 |
| TIM6/7 | 基础计时器 |

### 1.6 时钟配置
| 时钟源 | 说明 |
|--------|------|
| 内部时钟 | RCC |
| 外部时钟 | ETR |
| 其他时钟 | ITRx |
| 捕获通道 | TIx |

---

## 2. PSC与ARR

### 2.1 基本概念

| 寄存器 | 说明 |
|--------|------|
| PSC（16位） | 对系统主频进行分频，0~65535，72MHz/（PSC+1） |
| CNT（16位） | 计数器，0~65535 |
| 自动重装计数器（ARR） | 设置的目标值，当CNT与目标值相同，触发中断 |
| 重复次数计数器 | 实现每隔几个周期，执行一次中断，而不是每个周期都执行一次 |

### 计数模式
| 模式 | 说明 |
|------|------|
| 向上计数 | 从0计数到目标值进行中断 |
| 向下计数 | 从最大值计数到0进行中断 |
| 中央对齐 | 0与最大值反复，0/最大值都会进行中断 |

### 2.2 计算公式
1. **计算公式1**：CK_CNT = CK_PSC / (PSC + 1)
   - CK_CNT: 计数时间
   - CK_PSC: APB1——36MHz  APB2——72MHz

2. **计算公式2**：CK_CNT_OV = CK_CNT / (ARR + 1)
   - CK_CNT_OV：计数周期
   - ARR：每个计数周期的总数

### 2.3 注释
- 第一个公式算：每次+1需要多长时间
- 第二个公式算：每次从0计数到ARR的频率

---

## 3. 配置步骤

1. **启动时钟**：RCC
2. **配置时钟**：预分帧器（PSC），自动重装器（ARR）
3. **配置NVIC**：优先级
4. **使能TIM**

---

## 4. 配置代码示例

### 4.1 1s触发一次中断
```c
//开启RCC时钟
RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE);

//开启内部时钟（可以不写，因为默认开启内部时钟）
TIM_InternalClockConfig(TIM2);

//配置TIM
TIM_TimeBaseInitTypeDef TIM_TimeBaseInitStructure;
TIM_TimeBaseInitStructure.TIM_ClockDivision = TIM_CKD_DIV1;    //分频模式
TIM_TimeBaseInitStructure.TIM_CounterMode = TIM_CounterMode_Up;//向上计数
TIM_TimeBaseInitStructure.TIM_Period = 10000 - 1;              //目标值
TIM_TimeBaseInitStructure.TIM_Prescaler = 7200 - 1;            //PSC
TIM_TimeBaseInitStructure.TIM_RepetitionCounter = 0;           //高级计数

//初始化TIM
TIM_TimeBaseInit(TIM2, &TIM_TimeBaseInitStructure);

//定TIM模式
TIM_ITConfig(TIM2, TIM_IT_Update, ENABLE);

//NVIC分组
NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);

//配置NVIC
NVIC_InitTypeDef NVIC_InitStructure;
NVIC_InitStructure.NVIC_IRQChannel = TIM2_IRQn;               //配置通道
NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;               //使能TIM
NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 2;     //抢占
NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;            //响应

//初始化NVIC
NVIC_Init(&NVIC_InitStructure);

//使能TIM
TIM_Cmd(TIM2, ENABLE);
```

### 4.2 配置外部时钟
```c
// 配置外部触发时钟模式2
// 参数1：TIM2 - 定时器编号
// 参数2：TIM_ExtTRGPSC_OFF - 外部触发预分频器关闭
// 参数3：TIM_ExtTRGPolarity_NonInverted - 外部触发极性非反相（上升沿有效）
// 参数4：0x00 - 外部触发滤波系数，0表示无滤波
TIM_ETRClockMode2Config(TIM2, TIM_ExtTRGPSC_OFF, TIM_ExtTRGPolarity_NonInverted, 0x00);
```

### 4.3 中断函数
```c
void TIM2_IRQHandler(void)
{
    //标签检测
    if (TIM_GetITStatus(TIM2, TIM_IT_Update) == SET)
    {
        
        //清除标签
        TIM_ClearITPendingBit(TIM2, TIM_IT_Update);
    }
}
```

---

## 5. 注意事项

- **变量作用域问题**：如果编译出问题，看下是不是变量作用域问题
  - 不同文件可以使用 `extern 数据类型 数据` 来共享变量