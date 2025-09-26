# C语言文件操作详解

## 📋 文章信息

| 项目 | 详情 |
|------|------|
| **发布时间** | 2025年9月20日 |
| **难度等级** | 中级-高级 |
| **预计阅读时间** | 30分钟 |
| **适合人群** | 有C语言基础的学习者 |
| **标签** | 文件操作、I/O、数据持久化 |

---

## 🎯 学习目标

通过本文学习，你将掌握：
- **文件概念**：理解文件系统和文件类型
- **文件操作**：学会打开、读取、写入和关闭文件
- **文件指针**：掌握文件指针的使用和定位
- **实际应用**：了解文件操作在实际项目中的应用

---

## 📁 文件基础概念

### 1. 什么是文件

**文件**是存储在外部存储设备上的数据集合，可以永久保存程序数据。

```c
#include <stdio.h>

int main() {
    printf("文件操作的重要性:\n");
    printf("1. 数据持久化存储\n");
    printf("2. 程序间数据交换\n");
    printf("3. 配置信息保存\n");
    printf("4. 日志记录\n");
    
    return 0;
}
```

### 2. 文件类型

- **文本文件**：以ASCII码形式存储，人类可读
- **二进制文件**：以二进制形式存储，计算机可读

```c
// 文本文件示例内容
// Hello World
// 123
// 3.14

// 二进制文件示例（程序可执行文件、图片、音频等）
```

---

## 📝 文件操作基础

### 1. 文件指针

```c
#include <stdio.h>

int main() {
    // FILE是文件结构体类型
    FILE *file_ptr;
    
    printf("FILE指针用于：\n");
    printf("- 标识文件\n");
    printf("- 跟踪文件位置\n");
    printf("- 管理缓冲区\n");
    printf("- 记录文件状态\n");
    
    return 0;
}
```

### 2. 文件打开模式

| 模式 | 说明 | 文件不存在时 | 文件存在时 |
|------|------|-------------|----------|
| "r" | 只读 | 失败 | 从头开始读 |
| "w" | 只写 | 创建新文件 | 清空内容 |
| "a" | 追加写 | 创建新文件 | 从末尾写入 |
| "r+" | 读写 | 失败 | 从头开始 |
| "w+" | 读写 | 创建新文件 | 清空内容 |
| "a+" | 读写追加 | 创建新文件 | 从末尾写入 |

---

## 🔧 基本文件操作

### 1. 打开和关闭文件

```c
#include <stdio.h>

int main() {
    FILE *file;
    
    // 打开文件
    file = fopen("example.txt", "w");
    
    // 检查文件是否成功打开
    if (file == NULL) {
        printf("无法打开文件\n");
        return 1;
    }
    
    printf("文件打开成功\n");
    
    // 进行文件操作...
    
    // 关闭文件
    fclose(file);
    printf("文件已关闭\n");
    
    return 0;
}
```

### 2. 写入文件

```c
#include <stdio.h>

int main() {
    FILE *file;
    
    // 打开文件用于写入
    file = fopen("output.txt", "w");
    if (file == NULL) {
        printf("无法创建文件\n");
        return 1;
    }
    
    // 使用fprintf写入格式化数据
    fprintf(file, "Hello, File!\n");
    fprintf(file, "数字: %d\n", 42);
    fprintf(file, "浮点数: %.2f\n", 3.14159);
    
    // 使用fputs写入字符串
    fputs("这是一行文本\n", file);
    
    // 使用fputc写入单个字符
    fputc('A', file);
    fputc('\n', file);
    
    fclose(file);
    printf("数据已写入output.txt\n");
    
    return 0;
}
```

### 3. 读取文件

```c
#include <stdio.h>

int main() {
    FILE *file;
    char buffer[100];
    int number;
    float decimal;
    
    // 打开文件用于读取
    file = fopen("output.txt", "r");
    if (file == NULL) {
        printf("无法打开文件\n");
        return 1;
    }
    
    printf("文件内容:\n");
    
    // 使用fgets逐行读取
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);
    }
    
    // 重新定位到文件开头
    rewind(file);
    
    // 使用fscanf读取格式化数据
    fscanf(file, "Hello, File!\n");
    fscanf(file, "数字: %d\n", &number);
    fscanf(file, "浮点数: %f\n", &decimal);
    
    printf("\n读取的数据:\n");
    printf("数字: %d\n", number);
    printf("浮点数: %.2f\n", decimal);
    
    fclose(file);
    
    return 0;
}
```

---

## 🎯 文件指针定位

### 1. 文件位置函数

```c
#include <stdio.h>

int main() {
    FILE *file;
    long position;
    
    // 创建测试文件
    file = fopen("test.txt", "w");
    fprintf(file, "0123456789ABCDEFGHIJ");
    fclose(file);
    
    // 重新打开文件进行读取
    file = fopen("test.txt", "r");
    if (file == NULL) {
        printf("无法打开文件\n");
        return 1;
    }
    
    // ftell() - 获取当前位置
    position = ftell(file);
    printf("当前位置: %ld\n", position);
    
    // 读取几个字符
    printf("读取的字符: ");
    for (int i = 0; i < 5; i++) {
        printf("%c", fgetc(file));
    }
    printf("\n");
    
    position = ftell(file);
    printf("读取后位置: %ld\n", position);
    
    // fseek() - 设置文件位置
    fseek(file, 10, SEEK_SET);  // 从文件开头偏移10字节
    position = ftell(file);
    printf("设置位置后: %ld\n", position);
    
    printf("从位置10读取: %c\n", fgetc(file));
    
    // 相对当前位置移动
    fseek(file, -5, SEEK_CUR);  // 向前移动5字节
    printf("向前移动5字节后读取: %c\n", fgetc(file));
    
    // 从文件末尾定位
    fseek(file, -3, SEEK_END);  // 从末尾向前3字节
    printf("从末尾向前3字节读取: %c\n", fgetc(file));
    
    // rewind() - 回到文件开头
    rewind(file);
    printf("回到开头读取: %c\n", fgetc(file));
    
    fclose(file);
    
    return 0;
}
```

### 2. 文件大小获取

```c
#include <stdio.h>

long get_file_size(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        return -1;
    }
    
    // 移动到文件末尾
    fseek(file, 0, SEEK_END);
    
    // 获取当前位置（即文件大小）
    long size = ftell(file);
    
    fclose(file);
    return size;
}

int main() {
    const char *filename = "test.txt";
    
    // 创建测试文件
    FILE *file = fopen(filename, "w");
    fprintf(file, "This is a test file for size calculation.");
    fclose(file);
    
    // 获取文件大小
    long size = get_file_size(filename);
    if (size >= 0) {
        printf("文件 %s 的大小: %ld 字节\n", filename, size);
    } else {
        printf("无法获取文件大小\n");
    }
    
    return 0;
}
```

---

## 🔄 二进制文件操作

### 1. 二进制读写

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[30];
    float salary;
} Employee;

int main() {
    Employee employees[] = {
        {1001, "张三", 5000.0f},
        {1002, "李四", 6000.0f},
        {1003, "王五", 5500.0f}
    };
    
    FILE *file;
    
    // 写入二进制文件
    file = fopen("employees.dat", "wb");
    if (file == NULL) {
        printf("无法创建二进制文件\n");
        return 1;
    }
    
    // 使用fwrite写入结构体数组
    size_t written = fwrite(employees, sizeof(Employee), 3, file);
    printf("写入了 %zu 个员工记录\n", written);
    
    fclose(file);
    
    // 读取二进制文件
    file = fopen("employees.dat", "rb");
    if (file == NULL) {
        printf("无法打开二进制文件\n");
        return 1;
    }
    
    Employee read_employees[3];
    size_t read_count = fread(read_employees, sizeof(Employee), 3, file);
    printf("读取了 %zu 个员工记录\n", read_count);
    
    // 显示读取的数据
    printf("\n员工信息:\n");
    for (int i = 0; i < read_count; i++) {
        printf("ID: %d, 姓名: %s, 薪资: %.2f\n",
               read_employees[i].id,
               read_employees[i].name,
               read_employees[i].salary);
    }
    
    fclose(file);
    
    return 0;
}
```

### 2. 随机访问文件

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[20];
    float score;
} Student;

// 在指定位置写入学生记录
void write_student_at_position(FILE *file, int position, Student *student) {
    fseek(file, position * sizeof(Student), SEEK_SET);
    fwrite(student, sizeof(Student), 1, file);
}

// 从指定位置读取学生记录
int read_student_at_position(FILE *file, int position, Student *student) {
    fseek(file, position * sizeof(Student), SEEK_SET);
    return fread(student, sizeof(Student), 1, file);
}

int main() {
    FILE *file;
    Student students[] = {
        {1001, "Alice", 85.5f},
        {1002, "Bob", 92.0f},
        {1003, "Charlie", 78.5f},
        {1004, "David", 88.0f},
        {1005, "Eve", 95.5f}
    };
    
    // 创建并写入学生数据库文件
    file = fopen("students.db", "wb+");
    if (file == NULL) {
        printf("无法创建数据库文件\n");
        return 1;
    }
    
    // 写入所有学生记录
    for (int i = 0; i < 5; i++) {
        write_student_at_position(file, i, &students[i]);
    }
    
    printf("学生数据库创建完成\n");
    
    // 随机访问特定学生记录
    Student student;
    
    printf("\n随机访问学生记录:\n");
    
    // 读取第3个学生（索引2）
    if (read_student_at_position(file, 2, &student)) {
        printf("第3个学生: ID=%d, 姓名=%s, 成绩=%.1f\n",
               student.id, student.name, student.score);
    }
    
    // 读取第1个学生（索引0）
    if (read_student_at_position(file, 0, &student)) {
        printf("第1个学生: ID=%d, 姓名=%s, 成绩=%.1f\n",
               student.id, student.name, student.score);
    }
    
    // 修改第2个学生的成绩
    if (read_student_at_position(file, 1, &student)) {
        printf("\n修改前第2个学生成绩: %.1f\n", student.score);
        student.score = 96.0f;
        write_student_at_position(file, 1, &student);
        printf("修改后第2个学生成绩: %.1f\n", student.score);
    }
    
    fclose(file);
    
    return 0;
}
```

---

## 🛠️ 文件操作实用函数

### 1. 文件复制

```c
#include <stdio.h>

int copy_file(const char *source, const char *destination) {
    FILE *src, *dest;
    int ch;
    
    // 打开源文件
    src = fopen(source, "rb");
    if (src == NULL) {
        printf("无法打开源文件: %s\n", source);
        return 0;
    }
    
    // 打开目标文件
    dest = fopen(destination, "wb");
    if (dest == NULL) {
        printf("无法创建目标文件: %s\n", destination);
        fclose(src);
        return 0;
    }
    
    // 逐字节复制
    while ((ch = fgetc(src)) != EOF) {
        fputc(ch, dest);
    }
    
    fclose(src);
    fclose(dest);
    
    return 1;
}

int main() {
    // 创建源文件
    FILE *file = fopen("source.txt", "w");
    fprintf(file, "这是要复制的文件内容\n");
    fprintf(file, "包含多行文本\n");
    fprintf(file, "复制操作测试\n");
    fclose(file);
    
    // 复制文件
    if (copy_file("source.txt", "copy.txt")) {
        printf("文件复制成功\n");
        
        // 验证复制结果
        file = fopen("copy.txt", "r");
        char buffer[100];
        printf("\n复制文件内容:\n");
        while (fgets(buffer, sizeof(buffer), file) != NULL) {
            printf("%s", buffer);
        }
        fclose(file);
    } else {
        printf("文件复制失败\n");
    }
    
    return 0;
}
```

### 2. 文件行数统计

```c
#include <stdio.h>

int count_lines(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        return -1;
    }
    
    int lines = 0;
    int ch;
    
    while ((ch = fgetc(file)) != EOF) {
        if (ch == '\n') {
            lines++;
        }
    }
    
    fclose(file);
    return lines;
}

int count_words(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        return -1;
    }
    
    int words = 0;
    int in_word = 0;
    int ch;
    
    while ((ch = fgetc(file)) != EOF) {
        if (ch == ' ' || ch == '\t' || ch == '\n') {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }
    
    fclose(file);
    return words;
}

int count_characters(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        return -1;
    }
    
    int chars = 0;
    
    while (fgetc(file) != EOF) {
        chars++;
    }
    
    fclose(file);
    return chars;
}

int main() {
    const char *filename = "test_file.txt";
    
    // 创建测试文件
    FILE *file = fopen(filename, "w");
    fprintf(file, "Hello World\n");
    fprintf(file, "This is a test file\n");
    fprintf(file, "For counting statistics\n");
    fprintf(file, "Line four\n");
    fclose(file);
    
    // 统计文件信息
    int lines = count_lines(filename);
    int words = count_words(filename);
    int chars = count_characters(filename);
    
    printf("文件统计信息:\n");
    printf("行数: %d\n", lines);
    printf("单词数: %d\n", words);
    printf("字符数: %d\n", chars);
    
    return 0;
}
```

---

## 💡 实践练习

### 练习1：学生成绩管理系统

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_NAME_LEN 30
#define FILENAME "students.dat"

typedef struct {
    int id;
    char name[MAX_NAME_LEN];
    float math;
    float english;
    float science;
    float average;
} Student;

// 计算平均分
void calculate_average(Student *student) {
    student->average = (student->math + student->english + student->science) / 3.0f;
}

// 添加学生记录
void add_student() {
    FILE *file = fopen(FILENAME, "ab");
    if (file == NULL) {
        printf("无法打开文件\n");
        return;
    }
    
    Student student;
    
    printf("输入学生信息:\n");
    printf("学号: ");
    scanf("%d", &student.id);
    printf("姓名: ");
    scanf("%s", student.name);
    printf("数学成绩: ");
    scanf("%f", &student.math);
    printf("英语成绩: ");
    scanf("%f", &student.english);
    printf("科学成绩: ");
    scanf("%f", &student.science);
    
    calculate_average(&student);
    
    fwrite(&student, sizeof(Student), 1, file);
    fclose(file);
    
    printf("学生记录添加成功\n");
}

// 显示所有学生
void display_all_students() {
    FILE *file = fopen(FILENAME, "rb");
    if (file == NULL) {
        printf("没有找到学生记录文件\n");
        return;
    }
    
    Student student;
    
    printf("\n=== 所有学生记录 ===\n");
    printf("学号\t姓名\t\t数学\t英语\t科学\t平均分\n");
    printf("--------------------------------------------------------\n");
    
    while (fread(&student, sizeof(Student), 1, file) == 1) {
        printf("%d\t%-15s\t%.1f\t%.1f\t%.1f\t%.2f\n",
               student.id, student.name,
               student.math, student.english, student.science,
               student.average);
    }
    
    fclose(file);
}

// 查找学生
void search_student() {
    FILE *file = fopen(FILENAME, "rb");
    if (file == NULL) {
        printf("没有找到学生记录文件\n");
        return;
    }
    
    int search_id;
    printf("输入要查找的学号: ");
    scanf("%d", &search_id);
    
    Student student;
    int found = 0;
    
    while (fread(&student, sizeof(Student), 1, file) == 1) {
        if (student.id == search_id) {
            printf("\n找到学生:\n");
            printf("学号: %d\n", student.id);
            printf("姓名: %s\n", student.name);
            printf("数学: %.1f\n", student.math);
            printf("英语: %.1f\n", student.english);
            printf("科学: %.1f\n", student.science);
            printf("平均分: %.2f\n", student.average);
            found = 1;
            break;
        }
    }
    
    if (!found) {
        printf("未找到学号为 %d 的学生\n", search_id);
    }
    
    fclose(file);
}

int main() {
    int choice;
    
    while (1) {
        printf("\n=== 学生成绩管理系统 ===\n");
        printf("1. 添加学生\n");
        printf("2. 显示所有学生\n");
        printf("3. 查找学生\n");
        printf("4. 退出\n");
        printf("请选择: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                add_student();
                break;
            case 2:
                display_all_students();
                break;
            case 3:
                search_student();
                break;
            case 4:
                printf("再见！\n");
                return 0;
            default:
                printf("无效选择\n");
        }
    }
    
    return 0;
}
```

### 练习2：简单文本编辑器

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_LINE_LEN 1000

// 显示文件内容
void display_file(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        printf("文件不存在或无法打开\n");
        return;
    }
    
    char line[MAX_LINE_LEN];
    int line_number = 1;
    
    printf("\n=== 文件内容 ===\n");
    while (fgets(line, sizeof(line), file) != NULL) {
        printf("%3d: %s", line_number++, line);
    }
    
    fclose(file);
}

// 追加文本到文件
void append_to_file(const char *filename) {
    FILE *file = fopen(filename, "a");
    if (file == NULL) {
        printf("无法打开文件进行写入\n");
        return;
    }
    
    char line[MAX_LINE_LEN];
    
    printf("输入要追加的文本（输入空行结束）:\n");
    
    // 清空输入缓冲区
    while (getchar() != '\n');
    
    while (1) {
        printf("> ");
        if (fgets(line, sizeof(line), stdin) == NULL) {
            break;
        }
        
        // 如果输入空行则结束
        if (strlen(line) <= 1) {
            break;
        }
        
        fputs(line, file);
    }
    
    fclose(file);
    printf("文本已追加到文件\n");
}

// 在指定行插入文本
void insert_line(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        printf("文件不存在\n");
        return;
    }
    
    // 读取所有行到内存
    char lines[100][MAX_LINE_LEN];
    int total_lines = 0;
    
    while (fgets(lines[total_lines], MAX_LINE_LEN, file) != NULL && total_lines < 100) {
        total_lines++;
    }
    fclose(file);
    
    int insert_pos;
    printf("在第几行后插入（0表示在开头）: ");
    scanf("%d", &insert_pos);
    
    if (insert_pos < 0 || insert_pos > total_lines) {
        printf("无效的行号\n");
        return;
    }
    
    char new_line[MAX_LINE_LEN];
    printf("输入要插入的文本: ");
    getchar(); // 清空缓冲区
    fgets(new_line, sizeof(new_line), stdin);
    
    // 重写文件
    file = fopen(filename, "w");
    if (file == NULL) {
        printf("无法写入文件\n");
        return;
    }
    
    // 写入插入位置之前的行
    for (int i = 0; i < insert_pos; i++) {
        fputs(lines[i], file);
    }
    
    // 写入新行
    fputs(new_line, file);
    
    // 写入插入位置之后的行
    for (int i = insert_pos; i < total_lines; i++) {
        fputs(lines[i], file);
    }
    
    fclose(file);
    printf("文本已插入\n");
}

int main() {
    char filename[100];
    int choice;
    
    printf("输入文件名: ");
    scanf("%s", filename);
    
    while (1) {
        printf("\n=== 简单文本编辑器 ===\n");
        printf("1. 显示文件内容\n");
        printf("2. 追加文本\n");
        printf("3. 插入行\n");
        printf("4. 退出\n");
        printf("请选择: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                display_file(filename);
                break;
            case 2:
                append_to_file(filename);
                break;
            case 3:
                insert_line(filename);
                break;
            case 4:
                printf("再见！\n");
                return 0;
            default:
                printf("无效选择\n");
        }
    }
    
    return 0;
}
```

---

## 📝 学习总结

### ✅ 本章重点
- 文件是程序与外部存储交互的重要方式
- FILE指针用于管理文件操作
- 不同的打开模式适用于不同的操作需求
- 文件指针定位函数提供随机访问能力
- 二进制文件操作适合存储结构化数据

### ⚠️ 注意事项
- 使用文件前必须检查是否成功打开
- 操作完成后要及时关闭文件
- 读写操作要检查返回值
- 文件路径要使用正确的分隔符
- 二进制模式和文本模式的区别

### 🎯 下一步学习
- 文件系统操作（目录遍历、文件属性）
- 大文件处理技巧
- 文件加密和压缩
- 网络文件传输
- 数据库文件格式

---

*发布时间：2025年9月20日*  
*更新时间：2025年9月20日*  
*难度等级：中级-高级*