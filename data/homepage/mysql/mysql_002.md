# SQL语言基础

## 1. SQL语言概述与分类

### 1.1 什么是SQL

SQL（Structured Query Language，结构化查询语言）是一种用于管理关系型数据库的标准语言。SQL可以用于查询、插入、更新和删除数据库中的数据，以及创建和管理数据库对象。

**SQL特点**：
- **声明式语言**：只需说明"做什么"，而不需要说明"怎么做"
- **标准语言**：被大多数关系型数据库管理系统采用
- **功能强大**：可以完成复杂的数据库操作
- **易于学习**：语法简洁明了

### 1.2 SQL语言分类

SQL语言主要分为以下几类：

#### 1.2.1 数据查询语言（DQL）
用于查询数据库中的数据，主要关键字是`SELECT`。

#### 1.2.2 数据操作语言（DML）
用于操作数据库中的数据，包括：
- `INSERT`：插入数据
- `UPDATE`：更新数据
- `DELETE`：删除数据

#### 1.2.3 数据定义语言（DDL）
用于定义和管理数据库对象，包括：
- `CREATE`：创建数据库对象
- `ALTER`：修改数据库对象
- `DROP`：删除数据库对象
- `TRUNCATE`：清空表数据

#### 1.2.4 数据控制语言（DCL）
用于控制数据库的访问权限，包括：
- `GRANT`：授予权限
- `REVOKE`：撤销权限

#### 1.2.5 事务控制语言（TCL）
用于管理数据库事务，包括：
- `COMMIT`：提交事务
- `ROLLBACK`：回滚事务
- `SAVEPOINT`：设置保存点

## 2. 数据库与数据表的基本操作

### 2.1 数据库操作

#### 2.1.1 创建数据库

```sql
-- 创建数据库
CREATE DATABASE database_name;

-- 创建数据库并指定字符集
CREATE DATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 示例：创建一个名为company的数据库
CREATE DATABASE company CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2.1.2 查看数据库

```sql
-- 显示所有数据库
SHOW DATABASES;

-- 显示数据库创建信息
SHOW CREATE DATABASE database_name;

-- 示例：显示company数据库的创建信息
SHOW CREATE DATABASE company;
```

#### 2.1.3 选择数据库

```sql
-- 使用指定数据库
USE database_name;

-- 示例：使用company数据库
USE company;
```

#### 2.1.4 修改数据库

```sql
-- 修改数据库字符集
ALTER DATABASE database_name CHARACTER SET charset_name COLLATE collation_name;

-- 示例：修改company数据库的字符集
ALTER DATABASE company CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2.1.5 删除数据库

```sql
-- 删除数据库（谨慎操作，会删除所有数据和表结构）
DROP DATABASE database_name;

-- 示例：删除company数据库
DROP DATABASE company;
```

### 2.2 数据表操作

#### 2.2.1 创建数据表

```sql
-- 基本语法
CREATE TABLE table_name (
    column1 data_type [column_constraint],
    column2 data_type [column_constraint],
    ...
    [table_constraint]
);

-- 示例：创建员工表
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    hire_date DATE NOT NULL,
    job_id VARCHAR(10),
    salary DECIMAL(10, 2),
    commission_pct DECIMAL(3, 2),
    manager_id INT,
    department_id INT
);

-- 示例：创建部门表
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id VARCHAR(10) UNIQUE NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    manager_id INT,
    location_id INT
);
```

#### 2.2.2 查看数据表

```sql
-- 显示当前数据库中的所有表
SHOW TABLES;

-- 显示表结构
DESCRIBE table_name;
-- 或
DESC table_name;

-- 显示创建表的SQL语句
SHOW CREATE TABLE table_name;

-- 示例：查看employees表结构
DESCRIBE employees;
```

#### 2.2.3 修改数据表

```sql
-- 添加列
ALTER TABLE table_name ADD COLUMN column_name data_type [column_constraint];

-- 修改列定义
ALTER TABLE table_name MODIFY COLUMN column_name new_data_type [new_column_constraint];

-- 修改列名
ALTER TABLE table_name CHANGE COLUMN old_name new_name data_type [column_constraint];

-- 删除列
ALTER TABLE table_name DROP COLUMN column_name;

-- 添加主键
ALTER TABLE table_name ADD PRIMARY KEY (column_name);

-- 添加外键
ALTER TABLE table_name ADD FOREIGN KEY (column_name) REFERENCES other_table(other_column);

-- 示例：为employees表添加生日列
ALTER TABLE employees ADD COLUMN birth_date DATE;

-- 示例：修改employees表的salary列
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12, 2);

-- 示例：重命名employees表的phone列为telephone
ALTER TABLE employees CHANGE COLUMN phone telephone VARCHAR(20);
```

#### 2.2.4 重命名数据表

```sql
-- 重命名表
ALTER TABLE old_table_name RENAME TO new_table_name;
-- 或
RENAME TABLE old_table_name TO new_table_name;

-- 示例：将employees表重命名为staff
RENAME TABLE employees TO staff;
```

#### 2.2.5 删除数据表

```sql
-- 删除表（谨慎操作，会删除表结构和所有数据）
DROP TABLE table_name;

-- 删除表（如果存在）
DROP TABLE IF EXISTS table_name;

-- 示例：删除employees表
DROP TABLE IF EXISTS employees;
```

#### 2.2.6 清空表数据

```sql
-- 清空表数据（保留表结构）
TRUNCATE TABLE table_name;

-- 示例：清空employees表数据
TRUNCATE TABLE employees;
```

## 3. 数据类型详解

### 3.1 数值类型

#### 3.1.1 整数类型

| 类型 | 存储空间 | 范围（有符号） | 范围（无符号） | 用途 |
|------|----------|----------------|----------------|------|
| TINYINT | 1字节 | -128到127 | 0到255 | 小整数值 |
| SMALLINT | 2字节 | -32768到32767 | 0到65535 | 中等整数值 |
| MEDIUMINT | 3字节 | -8388608到8388607 | 0到16777215 | 较大整数值 |
| INT/INTEGER | 4字节 | -2147483648到2147483647 | 0到4294967295 | 标准整数值 |
| BIGINT | 8字节 | -9223372036854775808到9223372036854775807 | 0到18446744073709551615 | 大整数值 |

```sql
-- 示例：定义不同整数类型的列
CREATE TABLE number_types (
    tiny_num TINYINT,
    small_num SMALLINT,
    medium_num MEDIUMINT,
    normal_num INT,
    big_num BIGINT,
    unsigned_tiny TINYINT UNSIGNED,
    unsigned_small SMALLINT UNSIGNED,
    unsigned_normal INT UNSIGNED,
    unsigned_big BIGINT UNSIGNED
);
```

#### 3.1.2 浮点类型

| 类型 | 存储空间 | 范围 | 精度 | 用途 |
|------|----------|------|------|------|
| FLOAT | 4字节 | ±3.402823466E+38 | 约7位小数 | 单精度浮点数 |
| DOUBLE | 8字节 | ±1.7976931348623157E+308 | 约15位小数 | 双精度浮点数 |

```sql
-- 示例：定义浮点类型的列
CREATE TABLE float_types (
    single_precision FLOAT,
    double_precision DOUBLE,
    float_with_precision FLOAT(7, 4),  -- 总共7位数字，其中4位小数
    double_with_precision DOUBLE(15, 8)  -- 总共15位数字，其中8位小数
);
```

#### 3.1.3 定点类型

| 类型 | 存储空间 | 范围 | 精度 | 用途 |
|------|----------|------|------|------|
| DECIMAL(M,D) | 变长 | 依赖于M和D | 精确到D位小数 | 高精度小数 |

```sql
-- 示例：定义定点类型的列
CREATE TABLE decimal_types (
    price DECIMAL(10, 2),  -- 总共10位数字，其中2位小数，适合货币
    measurement DECIMAL(8, 4),  -- 总共8位数字，其中4位小数，适合精确测量
    percentage DECIMAL(5, 2)  -- 总共5位数字，其中2位小数，适合百分比
);
```

### 3.2 日期和时间类型

| 类型 | 存储空间 | 范围 | 格式 | 用途 |
|------|----------|------|------|------|
| DATE | 3字节 | '1000-01-01'到'9999-12-31' | YYYY-MM-DD | 日期值 |
| TIME | 3字节 | '-838:59:59'到'838:59:59' | HH:MM:SS | 时间值 |
| DATETIME | 8字节 | '1000-01-01 00:00:00'到'9999-12-31 23:59:59' | YYYY-MM-DD HH:MM:SS | 日期和时间值 |
| TIMESTAMP | 4字节 | '1970-01-01 00:00:01'UTC到'2038-01-19 03:14:07'UTC | YYYY-MM-DD HH:MM:SS | 时间戳 |
| YEAR | 1字节 | 1901到2155 | YYYY | 年份值 |

```sql
-- 示例：定义日期和时间类型的列
CREATE TABLE datetime_types (
    event_date DATE,
    start_time TIME,
    event_datetime DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    event_year YEAR
);
```

### 3.3 字符串类型

#### 3.3.1 定长和变长字符串

| 类型 | 最大长度 | 存储需求 | 特点 | 用途 |
|------|----------|----------|------|------|
| CHAR(M) | M字节 | M字节 | 定长，不足用空格填充 | 存储长度固定的数据 |
| VARCHAR(M) | M字节 | L+1字节，其中L为实际长度 | 变长，节省空间 | 存储长度可变的数据 |

```sql
-- 示例：定义定长和变长字符串类型的列
CREATE TABLE string_types (
    fixed_char CHAR(10),  -- 定长字符串，始终占用10字节
    variable_char VARCHAR(100),  -- 变长字符串，根据实际内容占用空间
    country_code CHAR(2),  -- 适合存储固定长度的代码
    description VARCHAR(255)  -- 适合存储长度可变的描述
);
```

#### 3.3.2 文本类型

| 类型 | 最大长度 | 存储需求 | 用途 |
|------|----------|----------|------|
| TINYTEXT | 255字节 | L+1字节 | 短文本 |
| TEXT | 65,535字节 | L+2字节 | 普通文本 |
| MEDIUMTEXT | 16,777,215字节 | L+3字节 | 中等长度文本 |
| LONGTEXT | 4,294,967,295字节 | L+4字节 | 长文本 |

```sql
-- 示例：定义文本类型的列
CREATE TABLE text_types (
    short_note TINYTEXT,
    article TEXT,
    book_content MEDIUMTEXT,
    novel LONGTEXT
);
```

### 3.4 二进制类型

| 类型 | 最大长度 | 存储需求 | 用途 |
|------|----------|----------|------|
| BINARY(M) | M字节 | M字节 | 定长二进制数据 |
| VARBINARY(M) | M字节 | L+1字节 | 变长二进制数据 |
| TINYBLOB | 255字节 | L+1字节 | 短二进制数据 |
| BLOB | 65,535字节 | L+2字节 | 普通二进制数据 |
| MEDIUMBLOB | 16,777,215字节 | L+3字节 | 中等长度二进制数据 |
| LONGBLOB | 4,294,967,295字节 | L+4字节 | 长二进制数据 |

```sql
-- 示例：定义二进制类型的列
CREATE TABLE binary_types (
    fixed_binary BINARY(16),  -- 适合存储固定长度的二进制数据，如MD5哈希
    variable_binary VARBINARY(255),  -- 适合存储可变长度的二进制数据
    image BLOB,  -- 适合存储图片
    document LONGBLOB  -- 适合存储大型文档
);
```

### 3.5 枚举和集合类型

#### 3.5.1 ENUM类型

ENUM类型用于存储预定义的字符串值列表中的单个值。

```sql
-- 示例：定义ENUM类型的列
CREATE TABLE enum_types (
    status ENUM('active', 'inactive', 'pending'),  -- 只能存储这三个值之一
    priority ENUM('low', 'medium', 'high', 'urgent'),
    gender ENUM('male', 'female', 'other')
);
```

#### 3.5.2 SET类型

SET类型用于存储预定义的字符串值列表中的零个或多个值。

```sql
-- 示例：定义SET类型的列
CREATE TABLE set_types (
    permissions SET('read', 'write', 'execute', 'admin'),  -- 可以存储这些值的任意组合
    interests SET('music', 'sports', 'reading', 'travel', 'cooking'),
    skills SET('java', 'python', 'mysql', 'javascript', 'html', 'css')
);
```

## 4. 基本CRUD操作

### 4.1 插入数据（INSERT）

#### 4.1.1 插入单行数据

```sql
-- 基本语法
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

-- 示例：向employees表插入一条记录
INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, job_id, salary)
VALUES ('EMP001', 'John', 'Doe', 'john.doe@example.com', '2023-01-15', 'DEV', 75000.00);

-- 示例：向departments表插入一条记录
INSERT INTO departments (department_id, department_name)
VALUES ('DEPT001', 'Engineering');
```

#### 4.1.2 插入多行数据

```sql
-- 语法1：使用多个VALUES子句
INSERT INTO table_name (column1, column2, column3, ...)
VALUES 
    (value1, value2, value3, ...),
    (value1, value2, value3, ...),
    (value1, value2, value3, ...);

-- 语法2：使用SELECT语句
INSERT INTO table_name (column1, column2, column3, ...)
SELECT value1, value2, value3, ...;

-- 示例：向employees表插入多条记录
INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, job_id, salary)
VALUES 
    ('EMP002', 'Jane', 'Smith', 'jane.smith@example.com', '2023-02-20', 'QA', 65000.00),
    ('EMP003', 'Mike', 'Johnson', 'mike.johnson@example.com', '2023-03-10', 'DEV', 80000.00),
    ('EMP004', 'Sarah', 'Williams', 'sarah.williams@example.com', '2023-04-05', 'PM', 85000.00);

-- 示例：从另一个表插入数据
INSERT INTO employee_archive (employee_id, first_name, last_name, email, hire_date)
SELECT employee_id, first_name, last_name, email, hire_date
FROM employees
WHERE department_id = 5;
```

#### 4.1.3 插入数据时的特殊处理

```sql
-- 插入时忽略重复数据
INSERT IGNORE INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...);

-- 插入时如果存在重复则更新
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...)
ON DUPLICATE KEY UPDATE column2 = value2;

-- 示例：插入员工数据，如果employee_id已存在则更新其他字段
INSERT INTO employees (employee_id, first_name, last_name, email, salary)
VALUES ('EMP001', 'John', 'Doe', 'john.doe@example.com', 78000.00)
ON DUPLICATE KEY UPDATE 
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    email = VALUES(email),
    salary = VALUES(salary);
```

### 4.2 查询数据（SELECT）

#### 4.2.1 基本查询

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table_name;

-- 查询所有列
SELECT * FROM table_name;

-- 示例：查询所有员工的基本信息
SELECT employee_id, first_name, last_name, email, hire_date
FROM employees;

-- 示例：查询所有员工的所有信息
SELECT * FROM employees;
```

#### 4.2.2 条件查询（WHERE）

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table_name
WHERE condition;

-- 示例：查询薪资大于70000的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary > 70000;

-- 示例：查询特定部门的员工
SELECT employee_id, first_name, last_name, department_id
FROM employees
WHERE department_id = 3;

-- 示例：查询2023年入职的员工
SELECT employee_id, first_name, last_name, hire_date
FROM employees
WHERE hire_date >= '2023-01-01' AND hire_date <= '2023-12-31';
```

#### 4.2.3 排序查询（ORDER BY）

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;

-- 示例：按薪资降序查询员工
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- 示例：先按部门升序，再按薪资降序查询员工
SELECT employee_id, first_name, last_name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;
```

#### 4.2.4 限制查询结果（LIMIT）

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table_name
LIMIT [offset,] count;

-- 示例：查询前5名员工
SELECT employee_id, first_name, last_name
FROM employees
LIMIT 5;

-- 示例：查询第6到第10名员工（跳过前5条，取5条）
SELECT employee_id, first_name, last_name
FROM employees
LIMIT 5, 5;

-- 示例：查询薪资最高的3名员工
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;
```

### 4.3 更新数据（UPDATE）

#### 4.3.1 更新单行数据

```sql
-- 基本语法
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;

-- 示例：更新特定员工的薪资
UPDATE employees
SET salary = 80000.00
WHERE employee_id = 'EMP001';

-- 示例：更新员工的信息
UPDATE employees
SET 
    email = 'new.email@example.com',
    phone = '123-456-7890'
WHERE employee_id = 'EMP002';
```

#### 4.3.2 更新多行数据

```sql
-- 示例：为所有开发人员加薪10%
UPDATE employees
SET salary = salary * 1.10
WHERE job_id = 'DEV';

-- 示例：将特定部门的所有员工转移到新部门
UPDATE employees
SET department_id = 10
WHERE department_id = 5;
```

#### 4.3.3 基于其他表的更新

```sql
-- 示例：根据部门表更新员工信息
UPDATE employees e
JOIN departments d ON e.department_id = d.id
SET e.job_id = 'NEW_ROLE'
WHERE d.department_name = 'Engineering';
```

### 4.4 删除数据（DELETE）

#### 4.4.1 删除单行数据

```sql
-- 基本语法
DELETE FROM table_name
WHERE condition;

-- 示例：删除特定员工
DELETE FROM employees
WHERE employee_id = 'EMP001';
```

#### 4.4.2 删除多行数据

```sql
-- 示例：删除特定部门的所有员工
DELETE FROM employees
WHERE department_id = 5;

-- 示例：删除薪资低于50000的员工
DELETE FROM employees
WHERE salary < 50000;
```

#### 4.4.3 基于其他表的删除

```sql
-- 示例：删除特定部门的所有员工
DELETE e FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.department_name = 'Temp';
```

## 5. 本章小结

本章介绍了SQL语言的基本概念和分类，详细讲解了数据库和数据表的基本操作，全面介绍了MySQL中的各种数据类型，并提供了基本的CRUD（创建、读取、更新、删除）操作示例。

**知识要点回顾**：
1. SQL语言分为DQL、DML、DDL、DCL和TCL五大类，各有不同的用途
2. 数据库操作包括创建、查看、选择、修改和删除数据库
3. 数据表操作包括创建、查看、修改、重命名和删除数据表
4. MySQL提供了丰富的数据类型，包括数值类型、日期时间类型、字符串类型、二进制类型等
5. 基本CRUD操作是数据库操作的基础，包括INSERT、SELECT、UPDATE和DELETE

**下一步学习**：
在下一章中，我们将学习数据查询进阶，包括WHERE条件过滤、排序与分页、聚合函数与分组、多表连接查询等内容。

## 6. 练习题

1. 创建一个名为`school`的数据库，并设置字符集为utf8mb4。
2. 在`school`数据库中创建一个`students`表，包含以下字段：
   - id（INT，主键，自增）
   - student_id（VARCHAR，唯一，非空）
   - first_name（VARCHAR，非空）
   - last_name（VARCHAR，非空）
   - email（VARCHAR，唯一）
   - birth_date（DATE）
   - enrollment_date（DATE，非空）
   - gpa（DECIMAL）
3. 向`students`表插入5条记录，并使用不同的插入方法。
4. 查询所有学生信息，并按GPA降序排列。
5. 更新特定学生的GPA值。
6. 删除特定学生的记录。
7. 尝试创建一个包含各种数据类型的表，并插入相应的数据。
8. 练习使用INSERT IGNORE和ON DUPLICATE KEY UPDATE语句。