## STM32 串口与USART

## 1. 串口基础知识

### 1.1 串口简介

| 项目 | 说明 |
|------|------|
| 串口 | 硬件传递数据的接口 |
| 通讯协议 | 硬件通讯按照各种协议传递信息 |

### 1.2 常见通讯接口对比

| 名称 | 引脚 | 双工 | 时钟 | 电平 | 设备 |
|------|------|------|------|------|------|
| USART | TX、RX | 全双工 | 异步 | 单端 | 点对点 |
| I2C | SCL、SDA | 半双工 | 同步 | 单端 | 多设备 |
| SPI | SCLK、MOSI、MISO、CS | 全双工 | 同步 | 单端 | 多设备 |
| CAN | CAN_H、CAN_L | 半双工 | 异步 | 差分 | 多设备 |
| USB | DP、DM | 半双工 | 异步 | 差分 | 点对点 |

### 1.3 串口连接

| 连接方式 | 说明 |
|----------|------|
| 双向通讯 | 通过两根通信线连接（TX、RX） |
| 单向通讯 | 只需要单线即可 |

---

## 2. 电平标准

### 2.1 常见电平标准

| 电平标准 | 说明 |
|----------|------|
| TTL电平 | +3.3V或+5V表示1，0V表示0 |
| RS232电平 | -3~-15V表示1，+3~+15V表示0 |
| RS485电平 | 两线压差+2~+6V表示1，-2~-6V表示0（差分信号） |

---

## 3. 串口参数及时序

### 3.1 串口参数

| 参数 | 说明 |
|------|------|
| 波特率 | 串口通信的速率 |
| 起始位 | 标志一个数据帧的开始，固定为低电平 |
| 数据位 | 数据帧的有效载荷，1为高电平，0为低电平，低位先行 |
| 校验位 | 用于数据验证，根据数据位计算得来 |
| 停止位 | 用于数据帧间隔，固定为高电平 |

### 3.2 时序说明

| 时序 | 说明 |
|------|------|
| 1帧共10位 | 起始位 + 8位数据位 + 停止位 |
| 1帧共11位 | 起始位 + 8位数据位 + 校验位 + 停止位 |
| 空闲状态 | 高电平 |
| 数据传输 | 低位（LSB）先行，高位（MSB）在后 |

---

## 4. USART（通用同步/异步收发器）

### 4.1 基本信息

| 项目 | 说明 |
|------|------|
| 波特率生成器 | 自带（分频器计算得波特率），计算公式：F<sub>pclk2/1</sub>/(16×DIV) |
| 数据位 | 8/9（如果8位不开启校验位，如果9位开启校验） |
| 停止位 | 0.5/1/1.5/2 |
| 校验位 | 0/2n/2n+1 |
| 硬件资源 | USART1（APB2）、USART2、USART3 |

### 4.2 配置步骤

| 步骤 | 操作 |
|------|------|
| 1 | 开启USART和GPIO的RCC时钟 |
| 2 | GPIO初始化 |
| 3 | 配置USART |
| 4 | 配置中断 |
| 5 | 使能USART |

### 4.3 配置代码示例

#### 4.3.1 初始化配置
```c
//开启GPIO和USART时钟
RCC_APB2PeriphClockCmd(RCC_APB2Periph_USART1, ENABLE);
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);

//配置RX/TX的GPIO
//TX——复用推挽输出
//RX——上拉输入
GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_9;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOA, &GPIO_InitStructure);

GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_10;
GPIO_Init(GPIOA, &GPIO_InitStructure);

/*配置USART
*1.确定波特率
*2.选择无硬件流控制
*3.选择TX与RX均开启
*4.无校验位
*5.1个停止位
*6.8个数据位
*/
USART_InitTypeDef USART_InitStructure;
USART_InitStructure.USART_BaudRate = 9600;
USART_InitStructure.USART_HardwareFlowControl = USART_HardwareFlowControl_None;
USART_InitStructure.USART_Mode = USART_Mode_Tx | USART_Mode_Rx;
USART_InitStructure.USART_Parity = USART_Parity_No;
USART_InitStructure.USART_StopBits = USART_StopBits_1;
USART_InitStructure.USART_WordLength = USART_WordLength_8b;
USART_Init(USART1, &USART_InitStructure);

//配置NVIC
NVIC_InitTypeDef NVIC_InitStructure;
NVIC_InitStructure.NVIC_IRQChannel = USART1_IRQn;
NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 1;
NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;
NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;
NVIC_Init(&NVIC_InitStructure);

//使能接收中断
USART_ITConfig(USART1, USART_IT_RXNE, ENABLE);

//使能USART
USART_Cmd(USART1, ENABLE);
```

#### 4.3.2 发送数据
```c
void USART_SendByte(uint8_t byte)
{
    USART_SendData(USART1, byte);
    while (USART_GetFlagStatus(USART1, USART_FLAG_TXE) == RESET);
}

void USART_SendString(char *str)
{
    while (*str != '\0')
    {
        USART_SendByte(*str);
        str++;
    }
}
```

#### 4.3.3 接收数据（中断方式）
```c
uint8_t USART_ReceiveData;

void USART1_IRQHandler(void)
{
    if (USART_GetITStatus(USART1, USART_IT_RXNE) == SET)
    {
        USART_ReceiveData = USART_ReceiveData(USART1);
        // 处理接收到的数据
        USART_SendByte(USART_ReceiveData); // 回显
        USART_ClearITPendingBit(USART1, USART_IT_RXNE);
    }
}
```