# C语言结构体详解

## 📋 文章信息

| 项目 | 详情 |
|------|------|
| **发布时间** | 2025年9月20日 |
| **难度等级** | 中级 |
| **预计阅读时间** | 25分钟 |
| **适合人群** | 有C语言基础的学习者 |
| **标签** | 结构体、自定义类型、数据组织 |

---

## 🎯 学习目标

通过本文学习，你将掌握：
- **结构体概念**：理解结构体的作用和意义
- **结构体定义**：学会定义和声明结构体
- **结构体操作**：掌握结构体的初始化和成员访问
- **结构体应用**：了解结构体在实际编程中的应用

---

## 🏗️ 什么是结构体

### 1. 结构体的概念

**结构体（struct）**是C语言中用户自定义的数据类型，可以将不同类型的数据组合在一起。

```c
#include <stdio.h>

// 定义学生结构体
struct Student {
    int id;           // 学号
    char name[50];    // 姓名
    int age;          // 年龄
    float score;      // 成绩
};

int main() {
    // 声明结构体变量
    struct Student stu1;
    
    // 给结构体成员赋值
    stu1.id = 1001;
    strcpy(stu1.name, "张三");
    stu1.age = 20;
    stu1.score = 85.5f;
    
    // 输出结构体信息
    printf("学生信息:\n");
    printf("学号: %d\n", stu1.id);
    printf("姓名: %s\n", stu1.name);
    printf("年龄: %d\n", stu1.age);
    printf("成绩: %.1f\n", stu1.score);
    
    return 0;
}
```

### 2. 为什么需要结构体

```c
// 不使用结构体 - 数据分散
int student_id = 1001;
char student_name[50] = "张三";
int student_age = 20;
float student_score = 85.5f;

// 使用结构体 - 数据组织化
struct Student {
    int id;
    char name[50];
    int age;
    float score;
};
```

**结构体的优势：**
- 数据组织更清晰
- 便于管理相关数据
- 提高代码可读性
- 便于函数参数传递

---

## 📝 结构体定义和声明

### 1. 结构体定义语法

```c
struct 结构体名 {
    数据类型1 成员名1;
    数据类型2 成员名2;
    // ...
};
```

### 2. 多种定义方式

```c
#include <stdio.h>
#include <string.h>

// 方式1：先定义结构体类型，再声明变量
struct Point {
    int x;
    int y;
};

// 方式2：定义结构体的同时声明变量
struct Rectangle {
    int width;
    int height;
} rect1, rect2;

// 方式3：匿名结构体（不推荐）
struct {
    char brand[20];
    int year;
    float price;
} car1;

// 方式4：使用typedef简化
typedef struct {
    char title[100];
    char author[50];
    int pages;
    float price;
} Book;

int main() {
    // 使用方式1
    struct Point p1;
    p1.x = 10;
    p1.y = 20;
    
    // 使用方式2
    rect1.width = 100;
    rect1.height = 50;
    
    // 使用方式3
    strcpy(car1.brand, "Toyota");
    car1.year = 2023;
    car1.price = 25000.0f;
    
    // 使用方式4（typedef）
    Book book1;
    strcpy(book1.title, "C Programming");
    strcpy(book1.author, "Dennis Ritchie");
    book1.pages = 300;
    book1.price = 59.99f;
    
    printf("点坐标: (%d, %d)\n", p1.x, p1.y);
    printf("矩形尺寸: %d x %d\n", rect1.width, rect1.height);
    printf("汽车: %s %d年 $%.2f\n", car1.brand, car1.year, car1.price);
    printf("书籍: %s - %s\n", book1.title, book1.author);
    
    return 0;
}
```

---

## 🔧 结构体初始化

### 1. 初始化方式

```c
#include <stdio.h>
#include <string.h>

struct Person {
    char name[30];
    int age;
    float height;
};

int main() {
    // 方式1：声明时初始化
    struct Person person1 = {"Alice", 25, 165.5f};
    
    // 方式2：指定成员初始化（C99标准）
    struct Person person2 = {
        .name = "Bob",
        .age = 30,
        .height = 175.0f
    };
    
    // 方式3：部分初始化
    struct Person person3 = {"Charlie", 28};  // height自动为0
    
    // 方式4：先声明后赋值
    struct Person person4;
    strcpy(person4.name, "David");
    person4.age = 35;
    person4.height = 180.2f;
    
    printf("Person1: %s, %d岁, %.1fcm\n", 
           person1.name, person1.age, person1.height);
    printf("Person2: %s, %d岁, %.1fcm\n", 
           person2.name, person2.age, person2.height);
    printf("Person3: %s, %d岁, %.1fcm\n", 
           person3.name, person3.age, person3.height);
    printf("Person4: %s, %d岁, %.1fcm\n", 
           person4.name, person4.age, person4.height);
    
    return 0;
}
```

### 2. 结构体数组

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char name[20];
    float salary;
} Employee;

int main() {
    // 结构体数组初始化
    Employee employees[3] = {
        {1001, "张三", 5000.0f},
        {1002, "李四", 6000.0f},
        {1003, "王五", 5500.0f}
    };
    
    printf("员工信息列表:\n");
    printf("ID\t姓名\t薪资\n");
    printf("------------------------\n");
    
    for (int i = 0; i < 3; i++) {
        printf("%d\t%s\t%.2f\n", 
               employees[i].id, 
               employees[i].name, 
               employees[i].salary);
    }
    
    // 计算平均薪资
    float total_salary = 0;
    for (int i = 0; i < 3; i++) {
        total_salary += employees[i].salary;
    }
    float average_salary = total_salary / 3;
    
    printf("\n平均薪资: %.2f\n", average_salary);
    
    return 0;
}
```

---

## 🔗 结构体与指针

### 1. 结构体指针

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    char brand[20];
    char model[20];
    int year;
    float price;
} Car;

int main() {
    Car my_car = {"Toyota", "Camry", 2023, 28000.0f};
    Car *car_ptr = &my_car;
    
    // 通过结构体变量访问
    printf("通过变量访问:\n");
    printf("品牌: %s\n", my_car.brand);
    printf("型号: %s\n", my_car.model);
    
    // 通过指针访问（方式1）
    printf("\n通过指针访问（方式1）:\n");
    printf("品牌: %s\n", (*car_ptr).brand);
    printf("型号: %s\n", (*car_ptr).model);
    
    // 通过指针访问（方式2 - 推荐）
    printf("\n通过指针访问（方式2）:\n");
    printf("品牌: %s\n", car_ptr->brand);
    printf("型号: %s\n", car_ptr->model);
    printf("年份: %d\n", car_ptr->year);
    printf("价格: $%.2f\n", car_ptr->price);
    
    // 通过指针修改值
    car_ptr->year = 2025;
    car_ptr->price = 30000.0f;
    
    printf("\n修改后:\n");
    printf("年份: %d\n", my_car.year);
    printf("价格: $%.2f\n", my_car.price);
    
    return 0;
}
```

### 2. 动态分配结构体内存

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int id;
    char name[30];
    float gpa;
} Student;

int main() {
    // 动态分配单个结构体
    Student *stu_ptr = (Student*)malloc(sizeof(Student));
    
    if (stu_ptr == NULL) {
        printf("内存分配失败\n");
        return 1;
    }
    
    // 给动态分配的结构体赋值
    stu_ptr->id = 2001;
    strcpy(stu_ptr->name, "Alice");
    stu_ptr->gpa = 3.8f;
    
    printf("学生信息:\n");
    printf("ID: %d\n", stu_ptr->id);
    printf("姓名: %s\n", stu_ptr->name);
    printf("GPA: %.2f\n", stu_ptr->gpa);
    
    // 释放内存
    free(stu_ptr);
    
    // 动态分配结构体数组
    int num_students = 3;
    Student *students = (Student*)malloc(num_students * sizeof(Student));
    
    if (students == NULL) {
        printf("内存分配失败\n");
        return 1;
    }
    
    // 初始化数组
    for (int i = 0; i < num_students; i++) {
        students[i].id = 3001 + i;
        sprintf(students[i].name, "Student%d", i + 1);
        students[i].gpa = 3.0f + i * 0.2f;
    }
    
    printf("\n学生列表:\n");
    for (int i = 0; i < num_students; i++) {
        printf("%d: %s (GPA: %.2f)\n", 
               students[i].id, students[i].name, students[i].gpa);
    }
    
    // 释放数组内存
    free(students);
    
    return 0;
}
```

---

## 🔄 结构体与函数

### 1. 结构体作为函数参数

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    int x;
    int y;
} Point;

typedef struct {
    Point top_left;
    Point bottom_right;
} Rectangle;

// 传值方式（复制整个结构体）
void print_point_by_value(Point p) {
    printf("点坐标: (%d, %d)\n", p.x, p.y);
}

// 传址方式（传递指针，效率更高）
void print_point_by_pointer(Point *p) {
    printf("点坐标: (%d, %d)\n", p->x, p->y);
}

// 修改结构体（必须使用指针）
void move_point(Point *p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

// 计算矩形面积
int calculate_area(Rectangle rect) {
    int width = rect.bottom_right.x - rect.top_left.x;
    int height = rect.bottom_right.y - rect.top_left.y;
    return width * height;
}

int main() {
    Point p1 = {10, 20};
    
    printf("原始点:\n");
    print_point_by_value(p1);
    print_point_by_pointer(&p1);
    
    // 移动点
    move_point(&p1, 5, -3);
    printf("\n移动后的点:\n");
    print_point_by_pointer(&p1);
    
    // 矩形示例
    Rectangle rect = {{0, 0}, {10, 8}};
    int area = calculate_area(rect);
    printf("\n矩形面积: %d\n", area);
    
    return 0;
}
```

### 2. 函数返回结构体

```c
#include <stdio.h>
#include <string.h>

typedef struct {
    char name[30];
    int age;
    float salary;
} Employee;

// 创建员工信息
Employee create_employee(const char *name, int age, float salary) {
    Employee emp;
    strcpy(emp.name, name);
    emp.age = age;
    emp.salary = salary;
    return emp;
}

// 给员工加薪
Employee give_raise(Employee emp, float raise_percent) {
    emp.salary *= (1.0f + raise_percent / 100.0f);
    return emp;
}

// 比较两个员工的薪资
Employee* higher_paid(Employee *emp1, Employee *emp2) {
    return (emp1->salary > emp2->salary) ? emp1 : emp2;
}

int main() {
    // 创建员工
    Employee emp1 = create_employee("张三", 28, 5000.0f);
    Employee emp2 = create_employee("李四", 32, 6000.0f);
    
    printf("原始员工信息:\n");
    printf("%s: %d岁, 薪资%.2f\n", emp1.name, emp1.age, emp1.salary);
    printf("%s: %d岁, 薪资%.2f\n", emp2.name, emp2.age, emp2.salary);
    
    // 给员工1加薪10%
    emp1 = give_raise(emp1, 10.0f);
    
    printf("\n加薪后:\n");
    printf("%s: 薪资%.2f\n", emp1.name, emp1.salary);
    
    // 比较薪资
    Employee *higher = higher_paid(&emp1, &emp2);
    printf("\n薪资更高的员工: %s (%.2f)\n", 
           higher->name, higher->salary);
    
    return 0;
}
```

---

## 🔗 嵌套结构体

### 1. 结构体嵌套

```c
#include <stdio.h>
#include <string.h>

// 地址结构体
typedef struct {
    char street[50];
    char city[30];
    char state[20];
    int zip_code;
} Address;

// 人员结构体（包含地址）
typedef struct {
    char name[30];
    int age;
    Address address;  // 嵌套结构体
} Person;

// 公司结构体
typedef struct {
    char company_name[50];
    Address headquarters;
    Person ceo;
    int employee_count;
} Company;

int main() {
    // 创建复杂的嵌套结构体
    Company tech_company = {
        "TechCorp",
        {"123 Tech Street", "Silicon Valley", "CA", 94000},
        {"John Smith", 45, {"456 CEO Lane", "Palo Alto", "CA", 94301}},
        1500
    };
    
    printf("公司信息:\n");
    printf("公司名称: %s\n", tech_company.company_name);
    printf("员工数量: %d\n", tech_company.employee_count);
    
    printf("\n总部地址:\n");
    printf("%s\n", tech_company.headquarters.street);
    printf("%s, %s %d\n", 
           tech_company.headquarters.city,
           tech_company.headquarters.state,
           tech_company.headquarters.zip_code);
    
    printf("\nCEO信息:\n");
    printf("姓名: %s\n", tech_company.ceo.name);
    printf("年龄: %d\n", tech_company.ceo.age);
    printf("住址: %s, %s\n", 
           tech_company.ceo.address.street,
           tech_company.ceo.address.city);
    
    return 0;
}
```

### 2. 自引用结构体（链表）

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 链表节点结构体
typedef struct Node {
    int data;
    struct Node *next;  // 指向下一个节点
} Node;

// 创建新节点
Node* create_node(int data) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (new_node != NULL) {
        new_node->data = data;
        new_node->next = NULL;
    }
    return new_node;
}

// 在链表头部插入节点
Node* insert_at_head(Node *head, int data) {
    Node *new_node = create_node(data);
    if (new_node != NULL) {
        new_node->next = head;
        head = new_node;
    }
    return head;
}

// 打印链表
void print_list(Node *head) {
    Node *current = head;
    printf("链表: ");
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\n");
}

// 释放链表内存
void free_list(Node *head) {
    Node *current = head;
    while (current != NULL) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
}

int main() {
    Node *head = NULL;
    
    // 插入一些数据
    head = insert_at_head(head, 10);
    head = insert_at_head(head, 20);
    head = insert_at_head(head, 30);
    
    print_list(head);
    
    // 释放内存
    free_list(head);
    
    return 0;
}
```

---

## 💡 实践练习

### 练习1：学生管理系统

```c
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 100

typedef struct {
    int id;
    char name[30];
    int age;
    float scores[3];  // 三门课程成绩
    float average;
} Student;

typedef struct {
    Student students[MAX_STUDENTS];
    int count;
} StudentManager;

// 计算平均分
float calculate_average(float scores[]) {
    return (scores[0] + scores[1] + scores[2]) / 3.0f;
}

// 添加学生
void add_student(StudentManager *manager) {
    if (manager->count >= MAX_STUDENTS) {
        printf("学生数量已达上限\n");
        return;
    }
    
    Student *stu = &manager->students[manager->count];
    
    printf("输入学生信息:\n");
    printf("学号: ");
    scanf("%d", &stu->id);
    printf("姓名: ");
    scanf("%s", stu->name);
    printf("年龄: ");
    scanf("%d", &stu->age);
    printf("三门课程成绩: ");
    scanf("%f %f %f", &stu->scores[0], &stu->scores[1], &stu->scores[2]);
    
    stu->average = calculate_average(stu->scores);
    manager->count++;
    
    printf("学生添加成功！\n\n");
}

// 显示所有学生
void display_students(StudentManager *manager) {
    printf("\n=== 学生信息列表 ===\n");
    printf("学号\t姓名\t年龄\t成绩1\t成绩2\t成绩3\t平均分\n");
    printf("--------------------------------------------------------\n");
    
    for (int i = 0; i < manager->count; i++) {
        Student *stu = &manager->students[i];
        printf("%d\t%s\t%d\t%.1f\t%.1f\t%.1f\t%.2f\n",
               stu->id, stu->name, stu->age,
               stu->scores[0], stu->scores[1], stu->scores[2],
               stu->average);
    }
    printf("\n");
}

int main() {
    StudentManager manager = {.count = 0};
    int choice;
    
    while (1) {
        printf("=== 学生管理系统 ===\n");
        printf("1. 添加学生\n");
        printf("2. 显示所有学生\n");
        printf("3. 退出\n");
        printf("请选择: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                add_student(&manager);
                break;
            case 2:
                display_students(&manager);
                break;
            case 3:
                printf("再见！\n");
                return 0;
            default:
                printf("无效选择\n");
        }
    }
    
    return 0;
}
```

### 练习2：图书管理系统

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
    char isbn[20];
    char title[100];
    char author[50];
    int year;
    float price;
    int available;  // 1表示可借，0表示已借出
} Book;

typedef struct {
    Book *books;
    int capacity;
    int count;
} Library;

// 初始化图书馆
Library* init_library(int capacity) {
    Library *lib = (Library*)malloc(sizeof(Library));
    lib->books = (Book*)malloc(capacity * sizeof(Book));
    lib->capacity = capacity;
    lib->count = 0;
    return lib;
}

// 添加图书
void add_book(Library *lib, const char *isbn, const char *title, 
              const char *author, int year, float price) {
    if (lib->count >= lib->capacity) {
        printf("图书馆已满\n");
        return;
    }
    
    Book *book = &lib->books[lib->count];
    strcpy(book->isbn, isbn);
    strcpy(book->title, title);
    strcpy(book->author, author);
    book->year = year;
    book->price = price;
    book->available = 1;
    
    lib->count++;
    printf("图书《%s》添加成功\n", title);
}

// 查找图书
Book* find_book(Library *lib, const char *isbn) {
    for (int i = 0; i < lib->count; i++) {
        if (strcmp(lib->books[i].isbn, isbn) == 0) {
            return &lib->books[i];
        }
    }
    return NULL;
}

// 借书
void borrow_book(Library *lib, const char *isbn) {
    Book *book = find_book(lib, isbn);
    if (book == NULL) {
        printf("未找到ISBN为%s的图书\n", isbn);
        return;
    }
    
    if (book->available == 0) {
        printf("图书《%s》已被借出\n", book->title);
        return;
    }
    
    book->available = 0;
    printf("成功借出图书《%s》\n", book->title);
}

// 还书
void return_book(Library *lib, const char *isbn) {
    Book *book = find_book(lib, isbn);
    if (book == NULL) {
        printf("未找到ISBN为%s的图书\n", isbn);
        return;
    }
    
    if (book->available == 1) {
        printf("图书《%s》未被借出\n", book->title);
        return;
    }
    
    book->available = 1;
    printf("成功归还图书《%s》\n", book->title);
}

// 显示所有图书
void display_books(Library *lib) {
    printf("\n=== 图书列表 ===\n");
    printf("ISBN\t\t书名\t\t\t作者\t\t年份\t价格\t状态\n");
    printf("----------------------------------------------------------------\n");
    
    for (int i = 0; i < lib->count; i++) {
        Book *book = &lib->books[i];
        printf("%s\t%-20s\t%-15s\t%d\t%.2f\t%s\n",
               book->isbn, book->title, book->author, book->year, book->price,
               book->available ? "可借" : "已借出");
    }
    printf("\n");
}

int main() {
    Library *lib = init_library(100);
    
    // 添加一些示例图书
    add_book(lib, "978-0-123456-78-9", "C Programming Language", "Dennis Ritchie", 1988, 59.99f);
    add_book(lib, "978-0-987654-32-1", "Data Structures", "Thomas Cormen", 2009, 89.99f);
    add_book(lib, "978-0-111111-11-1", "Algorithms", "Robert Sedgewick", 2011, 79.99f);
    
    display_books(lib);
    
    // 测试借书和还书
    borrow_book(lib, "978-0-123456-78-9");
    display_books(lib);
    
    return_book(lib, "978-0-123456-78-9");
    display_books(lib);
    
    // 释放内存
    free(lib->books);
    free(lib);
    
    return 0;
}
```

---

## 📝 学习总结

### ✅ 本章重点
- 结构体是用户自定义的复合数据类型
- 使用`.`访问结构体成员，使用`->`访问指针指向的结构体成员
- 结构体可以作为函数参数和返回值
- 结构体支持嵌套和自引用
- typedef可以简化结构体类型的使用

### ⚠️ 注意事项
- 结构体成员在内存中按声明顺序存储
- 传递大型结构体时优先使用指针
- 动态分配的结构体要记得释放内存
- 字符串成员需要使用strcpy()赋值

### 🎯 下一步学习
- 联合体（union）
- 位域（bit field）
- 结构体内存对齐
- 复杂数据结构（栈、队列、树）

---

*发布时间：2025年9月20日*  
*更新时间：2025年9月20日*  
*难度等级：中级*