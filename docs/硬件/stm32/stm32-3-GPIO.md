## STM32 GPIO

## 1. GPIO端口

| 端口 | 引脚范围 | 说明 |
|------|----------|------|
| GPIOA | PA0-PA15（部分复用） | 通用输入输出端口A |
| GPIOB | PB0-PB15（部分复用） | 通用输入输出端口B |
| GPIOC | PC13-PC15 | 通用输入输出端口C |
| 其余GPIOx | 未设置引脚 | 其他端口未引出 |

### 注释
- **注释1**：对于F1系列，GPIOx全部挂载在APB2总线上
- **注释2**：I/O口中写有"FT"表示这个GPIO容忍5V电压

---

## 2. 输入模式

| 模式 | 特点 | 使用场景 |
|------|------|----------|
| 上拉输入 | 高电位输入，内置电阻，使得输入电位为3.3V | 按钮 |
| 下拉输入 | 低电位输入，内置电阻，使得输入电位为0V | 低电位输入传感器 |
| 浮空输入 | 自定义电位输入，外接电阻，需要多少电位自己算 | 外部有自己搓的电路给它配置电阻 |
| 模拟输入 | ADC模拟转换，将模拟信号转换为电信号 | ADC |

---

## 3. 输出模式

| 模式 | 特点 | 使用场景 |
|------|------|----------|
| 推挽输出 | N-MOS/P-MOS管均可导通。N-MOS：输出1——输出高电平；P-MOS：输出0——输出低电平。该模式对高低电平都有驱动能力 | 通用输出 |
| 开漏输出 | N-MOS可导通 | 通信协议、外接电阻实现5V输出 |
| 复用推挽/开漏输出 | 复用是映射时才用得上 | 外设功能复用 |

---

## 4. GPIO读取

### 4.1 读取函数
| 函数 | 功能 |
|------|------|
| `GPIO_ReadInputDataBit(GPIOx, GPIO_Pin_x)` | 读取输入状态 |
| `GPIO_ReadOutputDataBit(GPIOx, GPIO_Pin_x)` | 读取输出状态 |

---

## 5. GPIO配置步骤

### 5.1 使能GPIO时钟
```c
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOx, ENABLE);
```

### 5.2 配置GPIO参数
```c
GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_x;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_XXX;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOx, &GPIO_InitStructure);
```

### 5.3 读取GPIO状态
```c
GPIO_ReadInputDataBit(GPIOx, GPIO_Pin_x);
```

### 5.4 设置GPIO输出状态
```c
GPIO_SetBits(GPIOx, GPIO_Pin_x);    // 输出高电平
GPIO_ResetBits(GPIOx, GPIO_Pin_x);  // 输出低电平
GPIO_WriteBit(GPIOx, GPIO_Pin_x, BitAction);  // 写入指定状态
```
	