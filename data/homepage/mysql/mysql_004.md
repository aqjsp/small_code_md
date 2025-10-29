# 高级查询技术

## 1. 子查询与嵌套查询

### 1.1 子查询基础

子查询是嵌套在另一个查询中的SELECT语句，也称为内部查询或内部选择。子查询可以返回单个值、一列值、一行值或一个表。

#### 1.1.1 子查询分类

| 类型 | 描述 | 返回结果 |
|------|------|----------|
| 标量子查询 | 返回单个值的子查询 | 单个值 |
| 列表子查询 | 返回一列值的子查询 | 一列值 |
| 行子查询 | 返回一行值的子查询 | 一行值 |
| 表子查询 | 返回一个表的子查询 | 多行多列 |

#### 1.1.2 子查询使用位置

子查询可以在以下位置使用：
- SELECT子句
- FROM子句
- WHERE子句
- HAVING子句
- JOIN子句

### 1.2 标量子查询

标量子查询返回单个值，可以在任何可以使用单个值的地方使用。

```sql
-- 示例：查询薪资高于平均薪资的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- 示例：查询薪资最高的员工信息
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);

-- 示例：查询与员工John所在部门相同的其他员工
SELECT employee_id, first_name, last_name, department_id
FROM employees
WHERE department_id = (SELECT department_id FROM employees WHERE first_name = 'John')
  AND first_name <> 'John';
```

### 1.3 列表子查询

列表子查询返回一列值，通常与IN、ANY、SOME或ALL运算符一起使用。

#### 1.3.1 使用IN运算符

```sql
-- 示例：查询特定部门的员工
SELECT employee_id, first_name, last_name, department_id
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);

-- 示例：查询有下属的经理
SELECT DISTINCT employee_id, first_name, last_name
FROM employees
WHERE employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL);
```

#### 1.3.2 使用ANY/SOME运算符

ANY和SOME运算符用于比较一个值与子查询返回的每个值，如果存在至少一个比较结果为真，则返回真。

```sql
-- 示例：查询薪资高于任意IT部门员工的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary > ANY (SELECT salary FROM employees WHERE department_id IN 
                    (SELECT department_id FROM departments WHERE department_name LIKE 'IT%'));

-- 示例：查询薪资不等于任意销售部门员工的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary <> SOME (SELECT salary FROM employees WHERE department_id IN 
                     (SELECT department_id FROM departments WHERE department_name LIKE 'Sales%'));
```

#### 1.3.3 使用ALL运算符

ALL运算符用于比较一个值与子查询返回的每个值，如果所有比较结果都为真，则返回真。

```sql
-- 示例：查询薪资高于所有IT部门员工的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary > ALL (SELECT salary FROM employees WHERE department_id IN 
                   (SELECT department_id FROM departments WHERE department_name LIKE 'IT%'));

-- 示例：查询薪资低于所有部门平均薪资的员工
SELECT employee_id, first_name, last_name, salary
FROM employees e
WHERE salary < ALL (SELECT AVG(salary) FROM employees GROUP BY department_id);
```

### 1.4 行子查询

行子查询返回一行值，可以与行构造器一起使用。

```sql
-- 示例：查询与特定员工薪资和部门都相同的员工
SELECT employee_id, first_name, last_name, salary, department_id
FROM employees
WHERE (salary, department_id) = (SELECT salary, department_id 
                                 FROM employees WHERE employee_id = 100);

-- 示例：查询薪资和部门与特定员工不同的员工
SELECT employee_id, first_name, last_name, salary, department_id
FROM employees
WHERE (salary, department_id) <> (SELECT salary, department_id 
                                  FROM employees WHERE employee_id = 100);
```

### 1.5 表子查询

表子查询返回多行多列，通常用于FROM子句中。

```sql
-- 示例：查询部门平均薪资高于公司平均薪资的部门
SELECT d.department_id, d.department_name, e.avg_salary
FROM departments d
JOIN (SELECT department_id, AVG(salary) AS avg_salary 
      FROM employees GROUP BY department_id) e
ON d.department_id = e.department_id
WHERE e.avg_salary > (SELECT AVG(salary) FROM employees);

-- 示例：查询每个部门薪资最高的员工
SELECT e.employee_id, e.first_name, e.last_name, e.salary, e.department_id
FROM employees e
JOIN (SELECT department_id, MAX(salary) AS max_salary 
      FROM employees GROUP BY department_id) m
ON e.department_id = m.department_id AND e.salary = m.max_salary;
```

### 1.6 相关子查询

相关子查询是指子查询依赖于外部查询的值，每处理外部查询的一行，子查询都会执行一次。

```sql
-- 示例：查询薪资高于所在部门平均薪资的员工
SELECT employee_id, first_name, last_name, salary, department_id
FROM employees e
WHERE salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id);

-- 示例：查询每个部门薪资排名前3的员工
SELECT employee_id, first_name, last_name, salary, department_id
FROM employees e1
WHERE 3 > (SELECT COUNT(*) 
           FROM employees e2 
           WHERE e2.department_id = e1.department_id AND e2.salary > e1.salary)
ORDER BY department_id, salary DESC;
```

### 1.7 EXISTS与NOT EXISTS

EXISTS运算符用于检查子查询是否返回任何行，如果子查询返回至少一行，则EXISTS返回真。

```sql
-- 示例：查询有下属的经理
SELECT DISTINCT e.employee_id, e.first_name, e.last_name
FROM employees e
WHERE EXISTS (SELECT 1 FROM employees WHERE manager_id = e.employee_id);

-- 示例：查询没有下属的员工
SELECT e.employee_id, e.first_name, e.last_name
FROM employees e
WHERE NOT EXISTS (SELECT 1 FROM employees WHERE manager_id = e.employee_id);

-- 示例：查询有员工的部门
SELECT d.department_id, d.department_name
FROM departments d
WHERE EXISTS (SELECT 1 FROM employees WHERE department_id = d.department_id);
```

## 2. 联合查询（UNION）

### 2.1 UNION与UNION ALL

UNION运算符用于合并两个或多个SELECT语句的结果集，并消除重复行。UNION ALL则保留所有行，包括重复行。

#### 2.1.1 基本语法

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table1
UNION [ALL]
SELECT column1, column2, ...
FROM table2;
```

#### 2.1.2 使用UNION

```sql
-- 示例：查询所有员工和经理的信息
SELECT employee_id, first_name, last_name, 'Employee' AS role
FROM employees
WHERE manager_id IS NOT NULL

UNION

SELECT employee_id, first_name, last_name, 'Manager' AS role
FROM employees
WHERE employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL);
```

#### 2.1.3 使用UNION ALL

```sql
-- 示例：查询所有员工和经理的信息，包括重复
SELECT employee_id, first_name, last_name, 'Employee' AS role
FROM employees
WHERE manager_id IS NOT NULL

UNION ALL

SELECT employee_id, first_name, last_name, 'Manager' AS role
FROM employees
WHERE employee_id IN (SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL);
```

### 2.2 UNION使用规则

使用UNION时需要遵循以下规则：
1. 所有SELECT语句中的列数必须相同
2. 每个SELECT语句中对应列的数据类型必须兼容
3. 结果集的列名由第一个SELECT语句决定
4. ORDER BY子句只能放在最后一个SELECT语句后面

```sql
-- 示例：查询员工和客户信息
SELECT employee_id AS id, first_name AS name, 'Employee' AS type, hire_date AS date
FROM employees

UNION

SELECT customer_id AS id, customer_name AS name, 'Customer' AS type, registration_date AS date
FROM customers

ORDER BY type, name;
```

### 2.3 复杂UNION查询

```sql
-- 示例：查询薪资高于平均薪资的员工和低于平均薪资的员工
SELECT employee_id, first_name, last_name, salary, 'Above Average' AS category
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)

UNION

SELECT employee_id, first_name, last_name, salary, 'Below Average' AS category
FROM employees
WHERE salary < (SELECT AVG(salary) FROM employees)

ORDER BY salary DESC;

-- 示例：查询各部门员工数和平均薪资
SELECT department_id, 'Employee Count' AS metric, COUNT(*) AS value
FROM employees
GROUP BY department_id

UNION

SELECT department_id, 'Average Salary' AS metric, AVG(salary) AS value
FROM employees
GROUP BY department_id

ORDER BY department_id, metric;
```

## 3. 窗口函数与CTE

### 3.1 窗口函数概述

窗口函数（Window Functions）也称为分析函数，它对一组行执行计算，并返回每个行的单个值。与聚合函数不同，窗口函数不会使行分组为单个输出行。

#### 3.1.1 窗口函数语法

```sql
-- 基本语法
window_function (expression) OVER (
    [PARTITION BY partition_expression, ...]
    [ORDER BY sort_expression, ...]
    [frame_clause]
)
```

#### 3.1.2 窗口函数分类

| 类别 | 函数 | 描述 |
|------|------|------|
| 聚合函数 | SUM(), AVG(), COUNT(), MAX(), MIN() | 对窗口内的行执行聚合计算 |
| 排名函数 | ROW_NUMBER(), RANK(), DENSE_RANK(), NTILE() | 为窗口内的行分配排名 |
| 偏移函数 | LAG(), LEAD(), FIRST_VALUE(), LAST_VALUE() | 访问窗口内其他行的值 |
| 统计函数 | CUME_DIST(), PERCENT_RANK(), NTH_VALUE() | 执行统计计算 |

### 3.2 排名函数

#### 3.2.1 ROW_NUMBER()

ROW_NUMBER()为窗口内的每一行分配一个唯一的连续整数。

```sql
-- 示例：按部门分组，按薪资降序排名
SELECT 
    employee_id,
    first_name,
    last_name,
    department_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank
FROM employees;
```

#### 3.2.2 RANK()与DENSE_RANK()

RANK()和DENSE_RANK()为窗口内的行分配排名，但处理并列排名的方式不同。

```sql
-- 示例：比较ROW_NUMBER(), RANK()和DENSE_RANK()
SELECT 
    employee_id,
    first_name,
    last_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_number,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees
ORDER BY salary DESC;
```

#### 3.2.3 NTILE()

NTILE()将有序分区中的行分配到指定数量的组中。

```sql
-- 示例：将员工按薪资分为4个等级
SELECT 
    employee_id,
    first_name,
    last_name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile
FROM employees
ORDER BY salary DESC;
```

### 3.3 聚合窗口函数

#### 3.3.1 SUM()与AVG()

```sql
-- 示例：计算累计薪资和部门内累计薪资
SELECT 
    employee_id,
    first_name,
    last_name,
    department_id,
    salary,
    SUM(salary) OVER (ORDER BY salary DESC) AS cumulative_sum,
    SUM(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_cumulative_sum,
    AVG(salary) OVER (PARTITION BY department_id) AS dept_avg_salary
FROM employees
ORDER BY department_id, salary DESC;
```

#### 3.3.2 COUNT()

```sql
-- 示例：计算累计员工数和部门内累计员工数
SELECT 
    employee_id,
    first_name,
    last_name,
    department_id,
    hire_date,
    COUNT(*) OVER (ORDER BY hire_date) AS cumulative_count,
    COUNT(*) OVER (PARTITION BY department_id ORDER BY hire_date) AS dept_cumulative_count
FROM employees
ORDER BY hire_date;
```

### 3.4 偏移函数

#### 3.4.1 LAG()与LEAD()

LAG()访问窗口内当前行之前的行的值，LEAD()访问当前行之后的行的值。

```sql
-- 示例：比较当前员工薪资与前一个和后一个员工的薪资
SELECT 
    employee_id,
    first_name,
    last_name,
    salary,
    LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev_salary,
    LEAD(salary, 1, 0) OVER (ORDER BY salary) AS next_salary,
    salary - LAG(salary, 1, 0) OVER (ORDER BY salary) AS salary_diff_prev
FROM employees
ORDER BY salary;
```

#### 3.4.2 FIRST_VALUE()与LAST_VALUE()

FIRST_VALUE()返回窗口内第一行的值，LAST_VALUE()返回窗口内最后一行的值。

```sql
-- 示例：比较每个员工薪资与部门内最高和最低薪资
SELECT 
    employee_id,
    first_name,
    last_name,
    department_id,
    salary,
    FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS highest_salary,
    LAST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY salary DESC 
                             ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS lowest_salary
FROM employees
ORDER BY department_id, salary DESC;
```

### 3.5 公用表表达式（CTE）

公用表表达式（Common Table Expression，CTE）是一个临时的结果集，它在单个SELECT、INSERT、UPDATE或DELETE语句的执行范围内存在。

#### 3.5.1 基本CTE语法

```sql
-- 基本语法
WITH cte_name (column1, column2, ...) AS (
    -- CTE查询定义
    SELECT column1, column2, ...
    FROM table_name
    WHERE condition
)
-- 主查询
SELECT column1, column2, ...
FROM cte_name
WHERE condition;
```

#### 3.5.2 简单CTE示例

```sql
-- 示例：使用CTE查询部门平均薪资高于公司平均薪资的部门
WITH dept_avg_salary AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
),
company_avg_salary AS (
    SELECT AVG(salary) AS avg_salary
    FROM employees
)
SELECT 
    d.department_id,
    d.department_name,
    das.avg_salary
FROM departments d
JOIN dept_avg_salary das ON d.department_id = das.department_id
CROSS JOIN company_avg_salary cas
WHERE das.avg_salary > cas.avg_salary;
```

#### 3.5.3 递归CTE

递归CTE可以引用自身，用于处理层级数据。

```sql
-- 示例：使用递归CTE查询员工层级关系
WITH RECURSIVE employee_hierarchy AS (
    -- 基础查询：查询顶级员工（没有经理的员工）
    SELECT 
        employee_id,
        first_name,
        last_name,
        manager_id,
        0 AS level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- 递归查询：查询下属员工
    SELECT 
        e.employee_id,
        e.first_name,
        e.last_name,
        e.manager_id,
        eh.level + 1 AS level
    FROM employees e
    JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT 
    employee_id,
    first_name,
    last_name,
    manager_id,
    level,
    REPEAT('  ', level) || first_name || ' ' || last_name AS employee_name
FROM employee_hierarchy
ORDER BY level, employee_id;
```

#### 3.5.4 多CTE查询

```sql
-- 示例：使用多个CTE查询每个部门薪资排名前3的员工
WITH dept_avg_salary AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
),
employee_rank AS (
    SELECT 
        employee_id,
        first_name,
        last_name,
        department_id,
        salary,
        RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank
    FROM employees
)
SELECT 
    er.employee_id,
    er.first_name,
    er.last_name,
    er.department_id,
    d.department_name,
    er.salary,
    er.salary_rank,
    das.avg_salary,
    er.salary - das.avg_salary AS salary_diff_from_avg
FROM employee_rank er
JOIN departments d ON er.department_id = d.department_id
JOIN dept_avg_salary das ON er.department_id = das.department_id
WHERE er.salary_rank <= 3
ORDER BY er.department_id, er.salary_rank;
```

## 4. 复杂查询优化技巧

### 4.1 查询执行计划

使用EXPLAIN或EXPLAIN ANALYZE可以查看MySQL如何执行查询，帮助识别性能瓶颈。

#### 4.1.1 EXPLAIN基础

```sql
-- 示例：查看查询执行计划
EXPLAIN SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 70000;
```

#### 4.1.2 EXPLAIN ANALYZE

```sql
-- 示例：查看详细查询执行计划和实际执行时间
EXPLAIN ANALYZE SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 70000;
```

### 4.2 索引优化

合理使用索引可以显著提高查询性能。

#### 4.2.1 创建适当的索引

```sql
-- 示例：为常用查询条件创建索引
CREATE INDEX idx_employee_salary ON employees(salary);
CREATE INDEX idx_employee_department ON employees(department_id);
CREATE INDEX idx_employee_hire_date ON employees(hire_date);

-- 示例：创建复合索引
CREATE INDEX idx_employee_dept_salary ON employees(department_id, salary);
```

#### 4.2.2 索引使用原则

1. 为WHERE子句中频繁使用的列创建索引
2. 为JOIN操作中的连接列创建索引
3. 为ORDER BY子句中频繁使用的列创建索引
4. 避免为频繁更新的表创建过多索引
5. 选择性高的列更适合创建索引

### 4.3 查询重写技巧

#### 4.3.1 避免使用SELECT *

```sql
-- 不推荐：查询所有列
SELECT * FROM employees WHERE department_id = 3;

-- 推荐：只查询需要的列
SELECT employee_id, first_name, last_name, salary 
FROM employees WHERE department_id = 3;
```

#### 4.3.2 使用LIMIT限制结果集

```sql
-- 示例：限制查询结果数量
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10;
```

#### 4.3.3 使用EXISTS替代IN

```sql
-- 示例：使用EXISTS替代IN
-- 不推荐
SELECT employee_id, first_name, last_name
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);

-- 推荐
SELECT e.employee_id, e.first_name, e.last_name
FROM employees e
WHERE EXISTS (SELECT 1 FROM departments d 
              WHERE d.department_id = e.department_id AND d.location_id = 1700);
```

#### 4.3.4 避免在WHERE子句中使用函数

```sql
-- 不推荐：在WHERE子句中对列使用函数
SELECT employee_id, first_name, last_name, hire_date
FROM employees
WHERE YEAR(hire_date) = 2022;

-- 推荐：使用范围查询
SELECT employee_id, first_name, last_name, hire_date
FROM employees
WHERE hire_date >= '2022-01-01' AND hire_date < '2023-01-01';
```

### 4.4 子查询优化

#### 4.4.1 将子查询转换为JOIN

```sql
-- 示例：将子查询转换为JOIN
-- 原始查询
SELECT e.employee_id, e.first_name, e.last_name
FROM employees e
WHERE e.department_id IN (SELECT d.department_id FROM departments d WHERE d.location_id = 1700);

-- 优化后的JOIN查询
SELECT e.employee_id, e.first_name, e.last_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE d.location_id = 1700;
```

#### 4.4.2 使用派生表

```sql
-- 示例：使用派生表替代子查询
-- 原始查询
SELECT e.employee_id, e.first_name, e.last_name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees);

-- 优化后的派生表查询
SELECT e.employee_id, e.first_name, e.last_name, e.salary
FROM employees e
CROSS JOIN (SELECT AVG(salary) AS avg_salary FROM employees) a
WHERE e.salary > a.avg_salary;
```

### 4.5 分区表优化

对于大型表，可以考虑使用分区来提高查询性能。

```sql
-- 示例：创建按年份分区的员工表
CREATE TABLE employees_partitioned (
    employee_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY (employee_id, hire_date)
)
PARTITION BY RANGE (YEAR(hire_date)) (
    PARTITION p2020 VALUES LESS THAN (2021),
    PARTITION p2021 VALUES LESS THAN (2022),
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

## 5. 本章小结

本章介绍了MySQL中的高级查询技术，包括子查询与嵌套查询、联合查询（UNION）、窗口函数与CTE以及复杂查询优化技巧。这些技术使我们能够执行更复杂、更高效的数据查询和分析。

**知识要点回顾**：
1. 子查询是嵌套在另一个查询中的SELECT语句，可以返回单个值、一列值、一行值或一个表
2. 标量子查询返回单个值，列表子查询返回一列值，行子查询返回一行值，表子查询返回多行多列
3. 相关子查询依赖于外部查询的值，每处理外部查询的一行，子查询都会执行一次
4. EXISTS运算符用于检查子查询是否返回任何行
5. UNION运算符用于合并两个或多个SELECT语句的结果集，UNION ALL保留所有行
6. 窗口函数对一组行执行计算，并返回每个行的单个值，不会使行分组为单个输出行
7. 排名函数（ROW_NUMBER、RANK、DENSE_RANK、NTILE）为窗口内的行分配排名
8. 偏移函数（LAG、LEAD、FIRST_VALUE、LAST_VALUE）访问窗口内其他行的值
9. 公用表表达式（CTE）是一个临时的结果集，可以提高复杂查询的可读性和维护性
10. 递归CTE可以引用自身，用于处理层级数据
11. 查询优化技巧包括使用EXPLAIN分析执行计划、合理创建索引、重写查询语句等

**下一步学习**：
在下一章中，我们将学习索引与性能优化，包括索引类型、索引设计原则、查询优化策略以及性能监控与调优。

## 6. 练习题

1. 创建员工表(employees)和部门表(departments)，并插入适当的测试数据。
2. 使用子查询查询薪资高于平均薪资的员工信息。
3. 使用子查询查询每个部门薪资最高的员工。
4. 使用相关子查询查询薪资高于所在部门平均薪资的员工。
5. 使用EXISTS查询有下属的经理信息。
6. 使用UNION查询所有员工和经理的信息，并标记角色。
7. 使用窗口函数按部门分组，按薪资降序排名。
8. 使用窗口函数计算每个员工的累计薪资和部门内累计薪资。
9. 使用CTE查询部门平均薪资高于公司平均薪资的部门。
10. 使用递归CTE查询员工层级关系。
11. 使用EXPLAIN分析一个复杂查询的执行计划。
12. 优化一个包含子查询的复杂查询，提高其性能。