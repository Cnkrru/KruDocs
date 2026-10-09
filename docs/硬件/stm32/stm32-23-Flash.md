###  硬件规格
- **Flash容量**：64KB（STM32F103C8T6）
- **起始地址**：0x08000000
- **结束地址**：0x08010000
- **页大小**：1KB（4096字节）
- **页数**：64页

###  内存映射
| 内存区域  | 地址范围                    | 大小   | 用途        |
| ----- | ----------------------- | ---- | --------- |
| Flash | 0x08000000 - 0x08010000 | 64KB | 程序存储、数据存储 |
| SRAM  | 0x20000000 - 0x20005000 | 20KB | 运行时数据     |
| 外设寄存器 | 0x40000000 - 0x40100000 | -    | 外设控制寄存器   |
### Flash模块代码
```c
// ========== Flash部分 ========== //
// 读取32位字
uint32_t Flash_ReadWord(uint32_t Address)
{
    return *((__IO uint32_t *)(Address));
}

// 读取16位半字
uint16_t Flash_ReadHalfWord(uint32_t Address)
{
    return *((__IO uint16_t *)(Address));
}

// 读取8位字节
uint8_t Flash_ReadByte(uint32_t Address)
{
    return *((__IO uint8_t *)(Address));
}

// 擦除所有页
void Flash_EraseAllPages(void)
{
    FLASH_Unlock();
    FLASH_EraseAllPages();
    FLASH_Lock();
}

// 擦除指定页
void Flash_ErasePage(uint32_t PageAddress)
{
    FLASH_Unlock();
    FLASH_ErasePage(PageAddress);
    FLASH_Lock();
}

// 编程32位字
void Flash_ProgramWord(uint32_t Address, uint32_t Data)
{
    FLASH_Unlock();
    FLASH_ProgramWord(Address, Data);
    FLASH_Lock();
}

// 编程16位半字
void Flash_ProgramHalfWord(uint32_t Address, uint16_t Data)
{
    FLASH_Unlock();
    FLASH_ProgramHalfWord(Address, Data);
    FLASH_Lock();
}

// ========== SRAM部分 ========== //
uint16_t store_Data[STORE_COUNT];

// 初始化存储模块
void flashStore_Init(void)
{
    if (Flash_ReadHalfWord(STORE_START_ADDRESS) != 0xA5A5)
    {
        Flash_ErasePage(STORE_START_ADDRESS);
        Flash_ProgramHalfWord(STORE_START_ADDRESS, 0xA5A5);
        for (uint16_t i = 1; i < STORE_COUNT; i++)
        {
            Flash_ProgramHalfWord(STORE_START_ADDRESS + i * 2, 0x0000);
        }
    }
    for (uint16_t i = 0; i < STORE_COUNT; i++)
    {
        store_Data[i] = Flash_ReadHalfWord(STORE_START_ADDRESS + i * 2);
    }
}

// 保存数据到闪存
void flashStore_Save(void)
{
    Flash_ErasePage(STORE_START_ADDRESS);
    for (uint16_t i = 0; i < STORE_COUNT; i++)
    {
        Flash_ProgramHalfWord(STORE_START_ADDRESS + i * 2, store_Data[i]);
    }
}

// 清除所有有效数据
void flashStore_Clear(void)
{
    for (uint16_t i = 1; i < STORE_COUNT; i++)
    {
        store_Data[i] = 0x0000;
    }
    flashStore_Save();
}
```