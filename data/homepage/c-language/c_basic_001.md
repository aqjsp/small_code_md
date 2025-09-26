# C语言基础语法入门

## 📋 文章信息

| 项目 | 详情 |
|------|------|
| **发布时间** | 2025年9月20日 |
| **难度等级** | 初级 |
| **预计阅读时间** | 15分钟 |
| **适合人群** | C语言初学者 |
| **标签** | 基础语法、变量、数据类型 |

---

## 🎯 学习目标

通过本文学习，你将掌握：
- **C语言程序结构**：了解C程序的基本组成
- **数据类型**：掌握基本数据类型的使用
- **变量声明**：学会正确声明和使用变量
- **输入输出**：掌握基本的输入输出函数

---

## 💻 C语言程序结构

### 1. Hello World程序

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

**程序解析：**
- `#include <stdio.h>`：包含标准输入输出库
- `int main()`：主函数，程序入口点
- `printf()`：输出函数
- `return 0`：返回值，表示程序正常结束

### 2. 程序基本结构

```c
// 预处理指令
#include <stdio.h>
#include <stdlib.h>

// 全局变量声明
int global_var = 100;

// 函数声明
void my_function();

// 主函数
int main() {
    // 局部变量
    int local_var = 10;
    
    // 函数调用
    my_function();
    
    return 0;
}

// 函数定义
void my_function() {
    printf("这是一个自定义函数\n");
}
```

---

## 📊 数据类型

### 1. 基本数据类型

| 类型 | 关键字 | 大小 | 取值范围 | 示例 |
|------|--------|------|----------|------|
| 字符型 | char | 1字节 | -128 ~ 127 | 'A', 'z' |
| 短整型 | short | 2字节 | -32768 ~ 32767 | 100 |
| 整型 | int | 4字节 | -2^31 ~ 2^31-1 | 12345 |
| 长整型 | long | 8字节 | -2^63 ~ 2^63-1 | 1234567890L |
| 单精度浮点 | float | 4字节 | 约7位有效数字 | 3.14f |
| 双精度浮点 | double | 8字节 | 约15位有效数字 | 3.141592653 |

### 2. 数据类型示例

```c
#include <stdio.h>

int main() {
    // 字符型
    char ch = 'A';
    
    // 整型
    int age = 25;
    short year = 2025;
    long population = 1400000000L;
    
    // 浮点型
    float pi = 3.14f;
    double precise_pi = 3.141592653589793;
    
    // 输出各种类型
    printf("字符: %c\n", ch);
    printf("年龄: %d\n", age);
    printf("年份: %d\n", year);
    printf("人口: %ld\n", population);
    printf("圆周率: %.2f\n", pi);
    printf("精确圆周率: %.10lf\n", precise_pi);
    
    return 0;
}
```

---

## 🔤 变量声明与使用

### 1. 变量命名规则

**合法的变量名：**
- 以字母或下划线开头
- 可包含字母、数字、下划线
- 区分大小写

```c
// 正确的变量名
int age;
float _height;
char student_name;
int num1, num2;

// 错误的变量名
// int 2age;        // 不能以数字开头
// float my-height; // 不能包含连字符
// char class;      // class是关键字
```

### 2. 变量初始化

```c
#include <stdio.h>

int main() {
    // 声明时初始化
    int count = 0;
    float price = 99.99f;
    char grade = 'A';
    
    // 先声明后赋值
    int number;
    number = 42;
    
    // 多个变量同时声明
    int x = 10, y = 20, z = 30;
    
    printf("count = %d\n", count);
    printf("price = %.2f\n", price);
    printf("grade = %c\n", grade);
    printf("number = %d\n", number);
    printf("x = %d, y = %d, z = %d\n", x, y, z);
    
    return 0;
}
```

---

## 📥📤 输入输出

### 1. 输出函数 printf()

```c
#include <stdio.h>

int main() {
    int age = 25;
    float height = 175.5f;
    char name[] = "张三";
    
    // 基本输出
    printf("Hello, World!\n");
    
    // 格式化输出
    printf("姓名: %s\n", name);
    printf("年龄: %d岁\n", age);
    printf("身高: %.1f厘米\n", height);
    
    // 多个变量输出
    printf("姓名: %s, 年龄: %d, 身高: %.1f\n", name, age, height);
    
    return 0;
}
```

### 2. 输入函数 scanf()

```c
#include <stdio.h>

int main() {
    int age;
    float height;
    char name[50];
    
    // 提示用户输入
    printf("请输入您的姓名: ");
    scanf("%s", name);
    
    printf("请输入您的年龄: ");
    scanf("%d", &age);
    
    printf("请输入您的身高(cm): ");
    scanf("%f", &height);
    
    // 输出结果
    printf("\n=== 个人信息 ===\n");
    printf("姓名: %s\n", name);
    printf("年龄: %d岁\n", age);
    printf("身高: %.1f厘米\n", height);
    
    return 0;
}
```

---

## 🔧 常用格式说明符

| 说明符 | 数据类型 | 示例 |
|--------|----------|------|
| %d | int | printf("%d", 123) |
| %ld | long | printf("%ld", 123456L) |
| %f | float | printf("%.2f", 3.14f) |
| %lf | double | printf("%.4lf", 3.1415926) |
| %c | char | printf("%c", 'A') |
| %s | 字符串 | printf("%s", "Hello") |
| %x | 十六进制 | printf("%x", 255) |
| %o | 八进制 | printf("%o", 64) |

---

## 💡 实践练习

### 练习1：个人信息录入

编写程序，要求用户输入姓名、年龄、身高，然后格式化输出。

```c
#include <stdio.h>

int main() {
    char name[50];
    int age;
    float height;
    
    printf("=== 个人信息录入系统 ===\n");
    
    printf("请输入姓名: ");
    scanf("%s", name);
    
    printf("请输入年龄: ");
    scanf("%d", &age);
    
    printf("请输入身高(cm): ");
    scanf("%f", &height);
    
    printf("\n=== 信息确认 ===\n");
    printf("姓名: %s\n", name);
    printf("年龄: %d岁\n", age);
    printf("身高: %.1fcm\n", height);
    
    return 0;
}
```

### 练习2：简单计算器

```c
#include <stdio.h>

int main() {
    float num1, num2;
    char operator;
    
    printf("请输入第一个数字: ");
    scanf("%f", &num1);
    
    printf("请输入运算符 (+, -, *, /): ");
    scanf(" %c", &operator);
    
    printf("请输入第二个数字: ");
    scanf("%f", &num2);
    
    printf("\n计算结果: %.2f %c %.2f = ", num1, operator, num2);
    
    switch(operator) {
        case '+':
            printf("%.2f\n", num1 + num2);
            break;
        case '-':
            printf("%.2f\n", num1 - num2);
            break;
        case '*':
            printf("%.2f\n", num1 * num2);
            break;
        case '/':
            if(num2 != 0)
                printf("%.2f\n", num1 / num2);
            else
                printf("错误：除数不能为0\n");
            break;
        default:
            printf("错误：无效的运算符\n");
    }
    
    return 0;
}
```

---

## 📝 学习总结

### ✅ 本章重点
- C语言程序的基本结构
- 基本数据类型的使用
- 变量的声明和初始化
- printf()和scanf()函数的使用
- 格式说明符的正确使用

### 🎯 下一步学习
- 运算符和表达式
- 控制结构（if-else, switch）
- 循环结构（for, while, do-while）
- 数组和字符串

### 💪 练习建议
1. 多写小程序练习输入输出
2. 熟悉各种数据类型的使用
3. 掌握格式说明符的用法
4. 注意变量命名规范

---

*发布时间：2025年9月20日*  
*更新时间：2025年9月20日*  
*难度等级：初级*