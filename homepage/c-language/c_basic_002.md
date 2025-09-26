# C语言运算符详解

## 概述

运算符是C语言中用于执行特定操作的符号。掌握各种运算符的使用是编写有效C程序的关键。本文将详细介绍C语言中的各种运算符类型。

## 算术运算符

### 基本算术运算符

| 运算符 | 名称 | 示例 | 结果 |
|--------|------|------|------|
| `+` | 加法 | `5 + 3` | `8` |
| `-` | 减法 | `5 - 3` | `2` |
| `*` | 乘法 | `5 * 3` | `15` |
| `/` | 除法 | `10 / 3` | `3` (整数除法) |
| `%` | 取模 | `10 % 3` | `1` |

### 示例代码

```c
#include <stdio.h>

int main() {
    int a = 10, b = 3;
    float x = 10.0, y = 3.0;
    
    printf("整数运算:\n");
    printf("%d + %d = %d\n", a, b, a + b);
    printf("%d - %d = %d\n", a, b, a - b);
    printf("%d * %d = %d\n", a, b, a * b);
    printf("%d / %d = %d\n", a, b, a / b);  // 整数除法
    printf("%d %% %d = %d\n", a, b, a % b);
    
    printf("\n浮点运算:\n");
    printf("%.1f / %.1f = %.2f\n", x, y, x / y);  // 浮点除法
    
    return 0;
}
```

**输出结果：**
```
整数运算：
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3
10 % 3 = 1

浮点运算：
10.0 / 3.0 = 3.33
```

## 赋值运算符

### 基本赋值运算符

```c
int x = 10;  // 基本赋值
```

### 复合赋值运算符

| 运算符 | 等价形式 | 示例 |
|--------|----------|------|
| `+=` | `x = x + y` | `x += 5` |
| `-=` | `x = x - y` | `x -= 3` |
| `*=` | `x = x * y` | `x *= 2` |
| `/=` | `x = x / y` | `x /= 4` |
| `%=` | `x = x % y` | `x %= 3` |

### 示例代码

```c
#include <stdio.h>

int main() {
    int num = 20;
    
    printf("初始值: %d\n", num);
    
    num += 5;   // num = num + 5
    printf("num += 5: %d\n", num);
    
    num -= 3;   // num = num - 3
    printf("num -= 3: %d\n", num);
    
    num *= 2;   // num = num * 2
    printf("num *= 2: %d\n", num);
    
    num /= 4;   // num = num / 4
    printf("num /= 4: %d\n", num);
    
    num %= 7;   // num = num % 7
    printf("num %%= 7: %d\n", num);
    
    return 0;
}
```

## 自增自减运算符

### 前缀和后缀形式

- **前缀形式**: `++x`, `--x` (先运算，后使用)
- **后缀形式**: `x++`, `x--` (先使用，后运算)

### 示例代码

```c
#include <stdio.h>

int main() {
    int a = 5, b = 5;
    int result1, result2;
    
    printf("初始值: a = %d, b = %d\n", a, b);
    
    // 前缀自增
    result1 = ++a;  // a先自增为6，然后赋值给result1
    printf("++a: a = %d, result1 = %d\n", a, result1);
    
    // 后缀自增
    result2 = b++;  // b的值5先赋给result2，然后b自增为6
    printf("b++: b = %d, result2 = %d\n", b, result2);
    
    return 0;
}
```

**输出结果：**
```
初始值: a = 5, b = 5
++a: a = 6, result1 = 6
b++: b = 6, result2 = 5
```

## 比较运算符

### 关系运算符

| 运算符 | 名称 | 示例 | 结果 |
|--------|------|------|------|
| `==` | 等于 | `5 == 5` | `1` (真) |
| `!=` | 不等于 | `5 != 3` | `1` (真) |
| `>` | 大于 | `5 > 3` | `1` (真) |
| `<` | 小于 | `5 < 3` | `0` (假) |
| `>=` | 大于等于 | `5 >= 5` | `1` (真) |
| `<=` | 小于等于 | `3 <= 5` | `1` (真) |

### 示例代码

```c
#include <stdio.h>

int main() {
    int x = 10, y = 20;
    
    printf("x = %d, y = %d\n", x, y);
    printf("x == y: %d\n", x == y);
    printf("x != y: %d\n", x != y);
    printf("x > y: %d\n", x > y);
    printf("x < y: %d\n", x < y);
    printf("x >= y: %d\n", x >= y);
    printf("x <= y: %d\n", x <= y);
    
    return 0;
}
```

## 逻辑运算符

### 基本逻辑运算符

| 运算符 | 名称 | 说明 |
|--------|------|------|
| `&&` | 逻辑与 | 两个操作数都为真时结果为真 |
| `\|\|` | 逻辑或 | 至少一个操作数为真时结果为真 |
| `!` | 逻辑非 | 操作数为假时结果为真，反之为假 |

### 真值表

| A | B | A && B | A \|\| B | !A |
|---|---|--------|----------|----|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 |

### 示例代码

```c
#include <stdio.h>

int main() {
    int age = 25;
    int score = 85;
    
    // 逻辑与：年龄大于18且分数大于80
    if (age > 18 && score > 80) {
        printf("符合条件：成年且成绩优秀\n");
    }
    
    // 逻辑或：年龄小于18或分数小于60
    if (age < 18 || score < 60) {
        printf("需要特别关注\n");
    } else {
        printf("情况正常\n");
    }
    
    // 逻辑非
    int is_student = 1;
    if (!is_student) {
        printf("不是学生\n");
    } else {
        printf("是学生\n");
    }
    
    return 0;
}
```

## 位运算符

### 基本位运算符

| 运算符 | 名称 | 说明 |
|--------|------|------|
| `&` | 按位与 | 对应位都为1时结果为1 |
| `\|` | 按位或 | 对应位至少一个为1时结果为1 |
| `^` | 按位异或 | 对应位不同时结果为1 |
| `~` | 按位取反 | 将每一位取反 |
| `<<` | 左移 | 向左移动指定位数 |
| `>>` | 右移 | 向右移动指定位数 |

### 示例代码

```c
#include <stdio.h>

void printBinary(int n) {
    for (int i = 7; i >= 0; i--) {
        printf("%d", (n >> i) & 1);
    }
}

int main() {
    int a = 12;  // 二进制: 00001100
    int b = 10;  // 二进制: 00001010
    
    printf("a = %d, 二进制: ", a);
    printBinary(a);
    printf("\n");
    
    printf("b = %d, 二进制: ", b);
    printBinary(b);
    printf("\n\n");
    
    printf("a & b = %d, 二进制: ", a & b);
    printBinary(a & b);
    printf("\n");
    
    printf("a | b = %d, 二进制: ", a | b);
    printBinary(a | b);
    printf("\n");
    
    printf("a ^ b = %d, 二进制: ", a ^ b);
    printBinary(a ^ b);
    printf("\n");
    
    printf("a << 2 = %d\n", a << 2);  // 左移2位
    printf("a >> 2 = %d\n", a >> 2);  // 右移2位
    
    return 0;
}
```

## 运算符优先级

### 优先级表（从高到低）

| 优先级 | 运算符 | 结合性 |
|--------|--------|--------|
| 1 | `()` `[]` `->` `.` | 左到右 |
| 2 | `!` `~` `++` `--` `+` `-` `*` `&` | 右到左 |
| 3 | `*` `/` `%` | 左到右 |
| 4 | `+` `-` | 左到右 |
| 5 | `<<` `>>` | 左到右 |
| 6 | `<` `<=` `>` `>=` | 左到右 |
| 7 | `==` `!=` | 左到右 |
| 8 | `&` | 左到右 |
| 9 | `^` | 左到右 |
| 10 | `\|` | 左到右 |
| 11 | `&&` | 左到右 |
| 12 | `\|\|` | 左到右 |
| 13 | `?:` | 右到左 |
| 14 | `=` `+=` `-=` 等 | 右到左 |

### 示例

```c
int result = 2 + 3 * 4;  // 结果是14，不是20
// 等价于: int result = 2 + (3 * 4);

int x = 5;
int y = ++x * 2;  // x先自增为6，然后6*2=12
```

## 实践练习

### 练习1: 计算器程序

```c
#include <stdio.h>

int main() {
    float num1, num2, result;
    char operator;
    
    printf("请输入第一个数字: ");
    scanf("%f", &num1);
    
    printf("请输入运算符 (+, -, *, /): ");
    scanf(" %c", &operator);
    
    printf("请输入第二个数字: ");
    scanf("%f", &num2);
    
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
            } else {
                printf("错误：除数不能为零！\n");
                return 1;
            }
            break;
        default:
            printf("错误：无效的运算符！\n");
            return 1;
    }
    
    printf("%.2f %c %.2f = %.2f\n", num1, operator, num2, result);
    
    return 0;
}
```

### 练习2: 位操作实用函数

```c
#include <stdio.h>

// 检查第n位是否为1
int checkBit(int num, int pos) {
    return (num >> pos) & 1;
}

// 设置第n位为1
int setBit(int num, int pos) {
    return num | (1 << pos);
}

// 清除第n位（设为0）
int clearBit(int num, int pos) {
    return num & ~(1 << pos);
}

// 切换第n位
int toggleBit(int num, int pos) {
    return num ^ (1 << pos);
}

int main() {
    int num = 12;  // 二进制: 1100
    
    printf("原始数字: %d\n", num);
    printf("第2位是否为1: %d\n", checkBit(num, 2));
    printf("设置第0位为1: %d\n", setBit(num, 0));
    printf("清除第2位: %d\n", clearBit(num, 2));
    printf("切换第1位: %d\n", toggleBit(num, 1));
    
    return 0;
}
```

## 总结

- **算术运算符**用于基本数学计算
- **赋值运算符**用于给变量赋值
- **比较运算符**用于比较两个值
- **逻辑运算符**用于逻辑判断
- **位运算符**用于位级操作
- **运算符优先级**决定了表达式的计算顺序

掌握这些运算符的使用是编写高效C程序的基础！

## 下一步学习

- 学习控制结构（if-else、switch）
- 了解循环结构（for、while、do-while）
- 掌握数组和指针的使用