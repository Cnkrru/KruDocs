## STM32外部中断与EXTI

## 1. 外部中断基础

### 1.1 NVIC（嵌套向量中断控制器）
- **作用**：记录中断并交给CPU处理中断事件
- **优先级配置**：
  - 需要配置中断优先级
  - 优先级可以嵌套（但嵌套层数和分组挂钩）
  - 所有中断类型共用16个最外层中断优先级
  - 优先级又分为：抢占优先级（层）/响应优先级（子优先级）
    - Group 0：1层——16个子优先级
    - Group 1：2层——8个子优先级
    - Group 2：4层——4个子优先级
    - Group 3：8层——2个子优先级
    - Group 4：16层——1个子优先级

### 1.2 中断类型
1. EXTI（外部中断/事件控制器）
2. TIM（定时器）
3. ADC（模数转换器）
4. USART（串口）
5. SPI/I2C（串行通信）
6. RTC（实时时钟）

### 1.3 中断要求
1. 中断函数要简短，不能执行时间过长，否则会阻塞主程序
2. 中断函数和主函数尽量不要相同，否则主函数会受影响

---

## 2. EXTI（外部中断/事件控制器）

### 2.1 工作原理
- **检测指定GPIO的电位变化（边沿检测外部中断）**

### 2.2 触发方式
- 上边沿
- 下边沿
- 双边沿
- 软件触发

### 2.3 配置步骤
1. **配置RCC**：启动外设时钟——GPIO/AFIO（EXTI与NVIC不需要管）
2. **映射I/O**：将GPIO映射到对应AFIO（相关配置查看手册）
3. **配置EXTI**：配置EXTI参数
4. **配置NVIC**：设置优先级

### 2.4 注意事项
- PIN相同的不能同时配置中断，比如：GPIOA-PIN0/GPIOB-PIN0

---

## 3. 配置代码示例

### 3.1 初始化配置
```c
//开启GPIO/AFIO时钟
RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);
RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO, ENABLE);

//配置GPIO
GPIO_InitTypeDef GPIO_InitStructure;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_IPU;
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_14;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
//初始化GPIO
GPIO_Init(GPIOB, &GPIO_InitStructure);

//映射AFIO
GPIO_EXTILineConfig(GPIO_PortSourceGPIOB, GPIO_PinSource14);

//配置EXTI
EXTI_InitTypeDef EXTI_InitStructure;
EXTI_InitStructure.EXTI_Line = EXTI_Line14;              //线路映射
EXTI_InitStructure.EXTI_LineCmd = ENABLE;                //使能EXTI
EXTI_InitStructure.EXTI_Mode = EXTI_Mode_Interrupt;      //中断/事件
EXTI_InitStructure.EXTI_Trigger = EXTI_Trigger_Falling;  //边沿触发方式
//初始化EXTI
EXTI_Init(&EXTI_InitStructure);

//NVIC分组
NVIC_PriorityGroupConfig(NVIC_PriorityGroup_2);

//配置NVIC
NVIC_InitTypeDef NVIC_InitStructure;
NVIC_InitStructure.NVIC_IRQChannel = EXTI15_10_IRQn;       //端口映射
NVIC_InitStructure.NVIC_IRQChannelCmd = ENABLE;            //使能NVIC
NVIC_InitStructure.NVIC_IRQChannelPreemptionPriority = 1;  //配置抢占
NVIC_InitStructure.NVIC_IRQChannelSubPriority = 1;         //配置响应

//初始化NVIC
NVIC_Init(&NVIC_InitStructure);
```

### 3.2 中断函数
- **特点**：
  - 中断函数不需要声明，自动识别运行
  - 中断函数命名固定，与通道相关

```c
void EXTI15_10_IRQHandler(void)
{
    //通道检测，检测是否为配置通道，参数SET/RESET
    if (EXTI_GetITStatus(EXTI_Line14) == SET)
    {
        //函数体
        
        //清除标记，如果不清除，程序会卡死在中断中
        EXTI_ClearITPendingBit(EXTI_Line14);
    }
}
```

---

## 4. 常用EXTI中断函数

| 函数 | 功能 |
|------|------|
| **EXTI_Init()** | 初始化EXTI配置 |
| **EXTI_GetITStatus()** | 检查EXTI中断是否发生 |
| **EXTI_ClearITPendingBit()** | 清除EXTI中断标志位 |
| **EXTI_GenerateSWInterrupt()** | 软件触发EXTI中断 |
| **GPIO_EXTILineConfig()** | 配置GPIO与EXTI的映射关系 |
| **NVIC_Init()** | 初始化NVIC配置 |
| **NVIC_PriorityGroupConfig()** | 配置NVIC优先级分组 |