# C语言数组与字符串

## 📋 文章信息

| 项目 | 详情 |
|------|------|
| **发布时间** | 2025年9月20日 |
| **难度等级** | 初级-中级 |
| **预计阅读时间** | 20分钟 |
| **适合人群** | 有C语言基础的学习者 |
| **标签** | 数组、字符串、内存管理 |

---

## 🎯 学习目标

通过本文学习，你将掌握：
- **数组概念**：理解数组的定义和特点
- **数组操作**：学会声明、初始化和使用数组
- **字符串处理**：掌握C语言中字符串的表示和操作
- **多维数组**：了解二维数组的使用方法

---

## 📊 数组基础

### 1. 什么是数组

**数组**是相同数据类型元素的集合，这些元素在内存中连续存储。

```c
#include <stdio.h>

int main() {
    // 数组声明和初始化
    int numbers[5] = {10, 20, 30, 40, 50};
    
    printf("数组元素:\n");
    for (int i = 0; i < 5; i++) {
        printf("numbers[%d] = %d\n", i, numbers[i]);
    }
    
    return 0;
}
```

### 2. 数组的内存布局

```
内存地址    索引    值
0x1000      [0]    10
0x1004      [1]    20
0x1008      [2]    30
0x100C      [3]    40
0x1010      [4]    50
```

---

## 📝 数组声明和初始化

### 1. 数组声明语法

```c
数据类型 数组名[数组大小];
```

```c
#include <stdio.h>

int main() {
    // 1. 声明时指定大小
    int arr1[10];  // 声明但未初始化
    
    // 2. 声明时初始化
    int arr2[5] = {1, 2, 3, 4, 5};
    
    // 3. 部分初始化
    int arr3[5] = {1, 2};  // 其余元素自动初始化为0
    
    // 4. 自动推导大小
    int arr4[] = {10, 20, 30, 40};  // 大小为4
    
    // 5. 全部初始化为0
    int arr5[5] = {0};
    
    printf("arr2: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr2[i]);
    }
    
    printf("\narr3: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", arr3[i]);
    }
    
    printf("\narr4: ");
    for (int i = 0; i < 4; i++) {
        printf("%d ", arr4[i]);
    }
    printf("\n");
    
    return 0;
}
```

### 2. 不同类型的数组

```c
#include <stdio.h>

int main() {
    // 整型数组
    int int_array[3] = {100, 200, 300};
    
    // 浮点型数组
    float float_array[3] = {1.1f, 2.2f, 3.3f};
    
    // 字符数组
    char char_array[3] = {'A', 'B', 'C'};
    
    // 双精度数组
    double double_array[3] = {1.111, 2.222, 3.333};
    
    printf("整型数组: ");
    for (int i = 0; i < 3; i++) {
        printf("%d ", int_array[i]);
    }
    
    printf("\n浮点型数组: ");
    for (int i = 0; i < 3; i++) {
        printf("%.1f ", float_array[i]);
    }
    
    printf("\n字符数组: ");
    for (int i = 0; i < 3; i++) {
        printf("%c ", char_array[i]);
    }
    
    printf("\n双精度数组: ");
    for (int i = 0; i < 3; i++) {
        printf("%.3f ", double_array[i]);
    }
    printf("\n");
    
    return 0;
}
```

---

## 🔧 数组操作

### 1. 数组元素访问和修改

```c
#include <stdio.h>

int main() {
    int scores[5] = {85, 92, 78, 96, 88};
    
    printf("原始成绩: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", scores[i]);
    }
    
    // 修改数组元素
    scores[2] = 90;  // 将第3个元素从78改为90
    scores[4] += 2;  // 将第5个元素加2
    
    printf("\n修改后成绩: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", scores[i]);
    }
    
    // 计算平均分
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += scores[i];
    }
    float average = (float)sum / 5;
    
    printf("\n总分: %d\n", sum);
    printf("平均分: %.2f\n", average);
    
    return 0;
}
```

### 2. 数组查找和排序

```c
#include <stdio.h>

// 查找数组中的最大值
int find_max(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// 冒泡排序
void bubble_sort(int arr[], int size) {
    for (int i = 0; i < size - 1; i++) {
        for (int j = 0; j < size - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("原始数组: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    
    int max_value = find_max(numbers, size);
    printf("\n最大值: %d\n", max_value);
    
    bubble_sort(numbers, size);
    
    printf("排序后数组: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");
    
    return 0;
}
```

---

## 🔤 字符串处理

### 1. 字符串的表示

在C语言中，字符串是以空字符('\0')结尾的字符数组。

```c
#include <stdio.h>

int main() {
    // 方式1：字符数组初始化
    char str1[] = {'H', 'e', 'l', 'l', 'o', '\0'};
    
    // 方式2：字符串字面量初始化
    char str2[] = "Hello";
    
    // 方式3：指定大小的字符数组
    char str3[20] = "World";
    
    // 方式4：字符指针
    char *str4 = "C Language";
    
    printf("str1: %s\n", str1);
    printf("str2: %s\n", str2);
    printf("str3: %s\n", str3);
    printf("str4: %s\n", str4);
    
    // 显示字符串长度
    printf("\n字符串内部结构:\n");
    printf("str2: ");
    for (int i = 0; str2[i] != '\0'; i++) {
        printf("'%c' ", str2[i]);
    }
    printf("'\\0'\n");
    
    return 0;
}
```

### 2. 字符串输入输出

```c
#include <stdio.h>

int main() {
    char name[50];
    char message[100];
    
    // 使用scanf读取字符串（遇到空格停止）
    printf("请输入您的姓名: ");
    scanf("%s", name);
    
    // 清空输入缓冲区
    while (getchar() != '\n');
    
    // 使用fgets读取整行（包括空格）
    printf("请输入一条消息: ");
    fgets(message, sizeof(message), stdin);
    
    printf("\n您好, %s!\n", name);
    printf("您的消息: %s", message);
    
    return 0;
}
```

### 3. 字符串操作函数

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str1[50] = "Hello";
    char str2[50] = "World";
    char str3[50];
    
    // strlen() - 获取字符串长度
    printf("str1长度: %lu\n", strlen(str1));
    
    // strcpy() - 复制字符串
    strcpy(str3, str1);
    printf("复制后str3: %s\n", str3);
    
    // strcat() - 连接字符串
    strcat(str1, " ");
    strcat(str1, str2);
    printf("连接后str1: %s\n", str1);
    
    // strcmp() - 比较字符串
    if (strcmp(str2, "World") == 0) {
        printf("str2等于\"World\"\n");
    }
    
    // strchr() - 查找字符
    char *pos = strchr(str1, 'W');
    if (pos != NULL) {
        printf("在位置%ld找到字符'W'\n", pos - str1);
    }
    
    return 0;
}
```

### 4. 自定义字符串函数

```c
#include <stdio.h>

// 计算字符串长度
int my_strlen(char *str) {
    int length = 0;
    while (str[length] != '\0') {
        length++;
    }
    return length;
}

// 复制字符串
void my_strcpy(char *dest, char *src) {
    int i = 0;
    while (src[i] != '\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\0';
}

// 反转字符串
void reverse_string(char *str) {
    int length = my_strlen(str);
    for (int i = 0; i < length / 2; i++) {
        char temp = str[i];
        str[i] = str[length - 1 - i];
        str[length - 1 - i] = temp;
    }
}

int main() {
    char original[] = "Programming";
    char copy[50];
    
    printf("原始字符串: %s\n", original);
    printf("字符串长度: %d\n", my_strlen(original));
    
    my_strcpy(copy, original);
    printf("复制的字符串: %s\n", copy);
    
    reverse_string(copy);
    printf("反转后的字符串: %s\n", copy);
    
    return 0;
}
```

---

## 📐 多维数组

### 1. 二维数组

```c
#include <stdio.h>

int main() {
    // 声明和初始化二维数组
    int matrix[3][4] = {
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12}
    };
    
    printf("二维数组内容:\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 4; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\n");
    }
    
    // 计算每行的和
    printf("\n每行的和:\n");
    for (int i = 0; i < 3; i++) {
        int row_sum = 0;
        for (int j = 0; j < 4; j++) {
            row_sum += matrix[i][j];
        }
        printf("第%d行: %d\n", i + 1, row_sum);
    }
    
    return 0;
}
```

### 2. 矩阵运算

```c
#include <stdio.h>

// 矩阵加法
void matrix_add(int a[2][2], int b[2][2], int result[2][2]) {
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            result[i][j] = a[i][j] + b[i][j];
        }
    }
}

// 打印矩阵
void print_matrix(int matrix[2][2], char *name) {
    printf("%s:\n", name);
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%3d ", matrix[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

int main() {
    int matrix_a[2][2] = {{1, 2}, {3, 4}};
    int matrix_b[2][2] = {{5, 6}, {7, 8}};
    int result[2][2];
    
    print_matrix(matrix_a, "矩阵A");
    print_matrix(matrix_b, "矩阵B");
    
    matrix_add(matrix_a, matrix_b, result);
    print_matrix(result, "A + B");
    
    return 0;
}
```

---

## 💡 实践练习

### 练习1：成绩管理系统

```c
#include <stdio.h>

int main() {
    int scores[5];
    int sum = 0;
    int max_score = 0, min_score = 100;
    
    // 输入成绩
    printf("请输入5个学生的成绩:\n");
    for (int i = 0; i < 5; i++) {
        printf("学生%d: ", i + 1);
        scanf("%d", &scores[i]);
        
        sum += scores[i];
        
        if (scores[i] > max_score) {
            max_score = scores[i];
        }
        if (scores[i] < min_score) {
            min_score = scores[i];
        }
    }
    
    // 统计结果
    float average = (float)sum / 5;
    
    printf("\n=== 成绩统计 ===\n");
    printf("总分: %d\n", sum);
    printf("平均分: %.2f\n", average);
    printf("最高分: %d\n", max_score);
    printf("最低分: %d\n", min_score);
    
    // 显示所有成绩
    printf("\n所有成绩: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", scores[i]);
    }
    printf("\n");
    
    return 0;
}
```

### 练习2：字符串处理工具

```c
#include <stdio.h>
#include <ctype.h>

int main() {
    char text[100];
    int letters = 0, digits = 0, spaces = 0, others = 0;
    
    printf("请输入一段文本: ");
    fgets(text, sizeof(text), stdin);
    
    printf("\n原始文本: %s", text);
    
    // 统计字符类型
    for (int i = 0; text[i] != '\0'; i++) {
        if (isalpha(text[i])) {
            letters++;
        } else if (isdigit(text[i])) {
            digits++;
        } else if (isspace(text[i])) {
            spaces++;
        } else {
            others++;
        }
    }
    
    printf("\n=== 字符统计 ===\n");
    printf("字母: %d个\n", letters);
    printf("数字: %d个\n", digits);
    printf("空格: %d个\n", spaces);
    printf("其他: %d个\n", others);
    
    // 转换为大写
    printf("\n转换为大写: ");
    for (int i = 0; text[i] != '\0'; i++) {
        printf("%c", toupper(text[i]));
    }
    printf("\n");
    
    return 0;
}
```

### 练习3：简单的井字棋游戏板

```c
#include <stdio.h>

int main() {
    char board[3][3] = {
        {' ', ' ', ' '},
        {' ', ' ', ' '},
        {' ', ' ', ' '}
    };
    
    // 初始化游戏板
    board[0][0] = 'X';
    board[1][1] = 'O';
    board[2][2] = 'X';
    
    printf("井字棋游戏板:\n");
    printf("   0   1   2\n");
    
    for (int i = 0; i < 3; i++) {
        printf("%d ", i);
        for (int j = 0; j < 3; j++) {
            printf(" %c ", board[i][j]);
            if (j < 2) printf("|");
        }
        printf("\n");
        if (i < 2) {
            printf("  -----------\n");
        }
    }
    
    return 0;
}
```

---

## 📝 学习总结

### ✅ 本章重点
- 数组是相同类型元素的集合，在内存中连续存储
- 数组索引从0开始，访问越界会导致未定义行为
- 字符串是以'\0'结尾的字符数组
- 多维数组可以表示表格、矩阵等复杂数据结构
- 数组名在大多数情况下等价于指向首元素的指针

### ⚠️ 注意事项
- 数组大小在声明时确定，不能动态改变
- 访问数组时要注意边界检查
- 字符串操作要注意空字符'\0'
- 使用字符串函数时要包含string.h头文件

### 🎯 下一步学习
- 动态数组（使用malloc分配内存）
- 结构体数组
- 函数参数中的数组传递
- 字符串指针与字符数组的区别

---

*发布时间：2025年9月20日*  
*更新时间：2025年9月20日*  
*难度等级：初级-中级*