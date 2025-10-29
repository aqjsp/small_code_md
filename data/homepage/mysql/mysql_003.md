# 数据查询进阶

## 1. WHERE条件过滤

### 1.1 基本比较运算符

WHERE子句用于过滤查询结果，只返回满足条件的记录。MySQL提供了多种比较运算符：

| 运算符 | 描述 | 示例 |
|--------|------|------|
| = | 等于 | `WHERE salary = 50000` |
| <> 或 != | 不等于 | `WHERE salary <> 50000` |
| > | 大于 | `WHERE salary > 50000` |
| < | 小于 | `WHERE salary < 50000` |
| >= | 大于等于 | `WHERE salary >= 50000` |
| <= | 小于等于 | `WHERE salary <= 50000` |

```sql
-- 示例：查询薪资等于70000的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary = 70000;

-- 示例：查询薪资不等于70000的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary <> 70000;

-- 示例：查询薪资大于70000的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary > 70000;
```

### 1.2 逻辑运算符

| 运算符 | 描述 | 示例 |
|--------|------|------|
| AND | 逻辑与，所有条件都为真时结果为真 | `WHERE salary > 50000 AND department_id = 3` |
| OR | 逻辑或，任一条件为真时结果为真 | `WHERE salary > 80000 OR job_id = 'MANAGER'` |
| NOT | 逻辑非，条件为假时结果为真 | `WHERE NOT salary > 50000` |
| XOR | 逻辑异或，两个条件中只有一个为真时结果为真 | `WHERE salary > 80000 XOR department_id = 3` |

```sql
-- 示例：查询薪资大于70000且部门ID为3的员工
SELECT employee_id, first_name, last_name, salary, department_id
FROM employees
WHERE salary > 70000 AND department_id = 3;

-- 示例：查询薪资大于80000或职位为经理的员工
SELECT employee_id, first_name, last_name, salary, job_id
FROM employees
WHERE salary > 80000 OR job_id = 'MANAGER';

-- 示例：查询薪资不大于50000的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE NOT salary > 50000;
```

### 1.3 范围查询

#### 1.3.1 BETWEEN运算符

BETWEEN运算符用于选择某个范围内的值，包含边界值。

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table_name
WHERE column_name BETWEEN value1 AND value2;

-- 示例：查询薪资在60000到80000之间的员工
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE salary BETWEEN 60000 AND 80000;

-- 示例：查询2022年入职的员工
SELECT employee_id, first_name, last_name, hire_date
FROM employees
WHERE hire_date BETWEEN '2022-01-01' AND '2022-12-31';
```

#### 1.3.2 IN运算符

IN运算符用于选择匹配列表中任一值的记录。

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table_name
WHERE column_name IN (value1, value2, ...);

-- 示例：查询特定部门的员工
SELECT employee_id, first_name, last_name, department_id
FROM employees
WHERE department_id IN (3, 5, 7);

-- 示例：查询特定职位的员工
SELECT employee_id, first_name, last_name, job_id
FROM employees
WHERE job_id IN ('DEV', 'QA', 'PM');
```

### 1.4 模式匹配

#### 1.4.1 LIKE运算符

LIKE运算符用于在WHERE子句中进行模式匹配，通常与通配符一起使用。

| 通配符 | 描述 | 示例 |
|--------|------|------|
| % | 匹配任意数量的字符（包括零个字符） | `'J%'`匹配以J开头的任何字符串 |
| _ | 匹配单个字符 | `'J_n'`匹配Jan、Jun等 |

```sql
-- 示例：查询姓氏以'S'开头的员工
SELECT employee_id, first_name, last_name
FROM employees
WHERE last_name LIKE 'S%';

-- 示例：查询名字包含'oh'的员工
SELECT employee_id, first_name, last_name
FROM employees
WHERE first_name LIKE '%oh%';

-- 示例：查询名字为4个字符且以'J'开头的员工
SELECT employee_id, first_name, last_name
FROM employees
WHERE first_name LIKE 'J___';
```

#### 1.4.2 正则表达式匹配

MySQL支持使用REGEXP或RLIKE运算符进行正则表达式匹配。

```sql
-- 基本语法
SELECT column1, column2, ...
FROM table_name
WHERE column_name REGEXP 'pattern';

-- 示例：查询姓氏以S或T开头的员工
SELECT employee_id, first_name, last_name
FROM employees
WHERE last_name REGEXP '^[ST]';

-- 示例：查询邮箱包含特定域名的员工
SELECT employee_id, first_name, last_name, email
FROM employees
WHERE email REGEXP '@(gmail|yahoo)\\.com$';

-- 示例：查询员工ID为3位数字的员工
SELECT employee_id, first_name, last_name
FROM employees
WHERE employee_id REGEXP '^[0-9]{3}$';
```

### 1.5 空值处理

#### 1.5.1 IS NULL和IS NOT NULL

```sql
-- 示例：查询没有电话号码的员工
SELECT employee_id, first_name, last_name, phone
FROM employees
WHERE phone IS NULL;

-- 示例：查询有电话号码的员工
SELECT employee_id, first_name, last_name, phone
FROM employees
WHERE phone IS NOT NULL;
```

#### 1.5.2 COALESCE函数

COALESCE函数返回参数列表中的第一个非NULL值。

```sql
-- 示例：显示员工电话号码，如果没有则显示'N/A'
SELECT employee_id, first_name, last_name, COALESCE(phone, 'N/A') AS phone
FROM employees;

-- 示例：计算员工的总收入（薪资+佣金）
SELECT employee_id, first_name, last_name, salary, commission_pct,
       salary + COALESCE(salary * commission_pct, 0) AS total_income
FROM employees;
```

## 2. 排序与分页

### 2.1 ORDER BY排序

ORDER BY子句用于对查询结果进行排序，可以按一个或多个列排序，并指定升序（ASC）或降序（DESC）。

#### 2.1.1 单列排序

```sql
-- 升序排序（默认）
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY salary;

-- 降序排序
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY salary DESC;
```

#### 2.1.2 多列排序

```sql
-- 示例：先按部门升序，再按薪资降序排序
SELECT employee_id, first_name, last_name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;

-- 示例：先按姓氏升序，再按名字升序排序
SELECT employee_id, first_name, last_name
FROM employees
ORDER BY last_name ASC, first_name ASC;
```

#### 2.1.3 表达式排序

```sql
-- 示例：按年薪排序
SELECT employee_id, first_name, last_name, salary,
       salary * 12 AS annual_salary
FROM employees
ORDER BY salary * 12 DESC;

-- 示例：按全名排序
SELECT employee_id, first_name, last_name,
       CONCAT(first_name, ' ', last_name) AS full_name
FROM employees
ORDER BY CONCAT(first_name, ' ', last_name);
```

#### 2.1.4 使用CASE语句排序

```sql
-- 示例：按职位重要性排序
SELECT employee_id, first_name, last_name, job_id
FROM employees
ORDER BY 
    CASE job_id
        WHEN 'CEO' THEN 1
        WHEN 'VP' THEN 2
        WHEN 'MANAGER' THEN 3
        WHEN 'LEAD' THEN 4
        ELSE 5
    END;

-- 示例：按薪资范围排序
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY
    CASE
        WHEN salary >= 100000 THEN 1
        WHEN salary >= 80000 THEN 2
        WHEN salary >= 60000 THEN 3
        ELSE 4
    END;
```

### 2.2 LIMIT分页

LIMIT子句用于限制查询结果的数量，常用于分页查询。

#### 2.2.1 基本分页

```sql
-- 查询前10条记录
SELECT employee_id, first_name, last_name, salary
FROM employees
LIMIT 10;

-- 查询第11到20条记录（跳过前10条，取10条）
SELECT employee_id, first_name, last_name, salary
FROM employees
LIMIT 10, 10;
```

#### 2.2.2 分页查询模式

```sql
-- 通用分页查询模式
-- page: 页码（从1开始）
-- page_size: 每页记录数
SELECT employee_id, first_name, last_name, salary
FROM employees
LIMIT (page - 1) * page_size, page_size;

-- 示例：查询第3页，每页10条记录
SELECT employee_id, first_name, last_name, salary
FROM employees
LIMIT 20, 10;
```

#### 2.2.3 结合排序的分页

```sql
-- 示例：按薪资降序分页查询
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10, 5;
```

## 3. 聚合函数与分组

### 3.1 聚合函数

聚合函数对一组值执行计算，并返回单个值。

| 函数 | 描述 |
|------|------|
| COUNT() | 计数，返回行数 |
| SUM() | 求和，返回总和 |
| AVG() | 平均值，返回平均值 |
| MIN() | 最小值，返回最小值 |
| MAX() | 最大值，返回最大值 |

#### 3.1.1 COUNT函数

```sql
-- 计算员工总数
SELECT COUNT(*) AS total_employees
FROM employees;

-- 计算有电话号码的员工数
SELECT COUNT(phone) AS employees_with_phone
FROM employees;

-- 计算不同部门数
SELECT COUNT(DISTINCT department_id) AS unique_departments
FROM employees;
```

#### 3.1.2 SUM函数

```sql
-- 计算所有员工薪资总和
SELECT SUM(salary) AS total_salary
FROM employees;

-- 计算特定部门薪资总和
SELECT department_id, SUM(salary) AS department_salary
FROM employees
WHERE department_id = 3;
```

#### 3.1.3 AVG函数

```sql
-- 计算平均薪资
SELECT AVG(salary) AS average_salary
FROM employees;

-- 计算每个部门的平均薪资
SELECT department_id, AVG(salary) AS avg_department_salary
FROM employees
GROUP BY department_id;
```

#### 3.1.4 MIN和MAX函数

```sql
-- 查询最低和最高薪资
SELECT MIN(salary) AS min_salary, MAX(salary) AS max_salary
FROM employees;

-- 查询最早和最晚的入职日期
SELECT MIN(hire_date) AS earliest_hire, MAX(hire_date) AS latest_hire
FROM employees;
```

### 3.2 GROUP BY分组

GROUP BY子句将具有相同值的行组合为摘要行，通常与聚合函数一起使用。

#### 3.2.1 基本分组

```sql
-- 按部门分组，计算每个部门的员工数
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id;

-- 按职位分组，计算每个职位的平均薪资
SELECT job_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY job_id;
```

#### 3.2.2 多列分组

```sql
-- 按部门和职位分组，计算每个组合的员工数和平均薪资
SELECT department_id, job_id, COUNT(*) AS employee_count, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id, job_id;

-- 按入职年份和月份分组，计算每月入职的员工数
SELECT YEAR(hire_date) AS hire_year, MONTH(hire_date) AS hire_month, COUNT(*) AS employee_count
FROM employees
GROUP BY YEAR(hire_date), MONTH(hire_date)
ORDER BY hire_year, hire_month;
```

#### 3.2.3 分组与HAVING子句

HAVING子句用于过滤分组结果，类似于WHERE子句，但用于聚合函数。

```sql
-- 查询员工数大于5的部门
SELECT department_id, COUNT(*) AS employee_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;

-- 查询平均薪资大于70000的职位
SELECT job_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY job_id
HAVING AVG(salary) > 70000;
```

#### 3.2.4 GROUP BY与ORDER BY结合

```sql
-- 按部门分组，计算每个部门的平均薪资，并按平均薪资降序排列
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
ORDER BY avg_salary DESC;

-- 按入职年份分组，计算每年入职的员工数，并按员工数降序排列
SELECT YEAR(hire_date) AS hire_year, COUNT(*) AS employee_count
FROM employees
GROUP BY YEAR(hire_date)
ORDER BY employee_count DESC;
```

### 3.3 高级聚合查询

#### 3.3.1 ROLLUP

ROLLUP生成聚合的小计和总计。

```sql
-- 按部门和职位分组，生成小计和总计
SELECT 
    COALESCE(department_id, 'ALL') AS department,
    COALESCE(job_id, 'ALL') AS job,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id, job_id WITH ROLLUP;
```

#### 3.3.2 CUBE

CUBE生成所有可能的组合的聚合。

```sql
-- 按部门和职位分组，生成所有组合的聚合
SELECT 
    department_id,
    job_id,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id, job_id WITH CUBE;
```

## 4. 多表连接查询

### 4.1 内连接（INNER JOIN）

内连接返回两个表中匹配的行。

#### 4.1.1 基本内连接

```sql
-- 基本语法
SELECT table1.column1, table2.column2, ...
FROM table1
INNER JOIN table2 ON table1.common_field = table2.common_field;

-- 示例：查询员工及其部门信息
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;
```

#### 4.1.2 多表内连接

```sql
-- 示例：查询员工、部门及其位置信息
SELECT 
    e.employee_id, 
    e.first_name, 
    e.last_name, 
    d.department_name,
    l.city,
    l.country
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN locations l ON d.location_id = l.location_id;
```

### 4.2 外连接

外连接返回一个表中的所有行，以及另一个表中匹配的行。

#### 4.2.1 左外连接（LEFT JOIN）

左外连接返回左表中的所有行，以及右表中匹配的行。

```sql
-- 基本语法
SELECT table1.column1, table2.column2, ...
FROM table1
LEFT JOIN table2 ON table1.common_field = table2.common_field;

-- 示例：查询所有员工及其部门信息（包括没有部门的员工）
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;
```

#### 4.2.2 右外连接（RIGHT JOIN）

右外连接返回右表中的所有行，以及左表中匹配的行。

```sql
-- 基本语法
SELECT table1.column1, table2.column2, ...
FROM table1
RIGHT JOIN table2 ON table1.common_field = table2.common_field;

-- 示例：查询所有部门及其员工信息（包括没有员工的部门）
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;
```

#### 4.2.3 全外连接（FULL OUTER JOIN）

MySQL不支持FULL OUTER JOIN，但可以通过UNION模拟。

```sql
-- 示例：模拟全外连接，查询所有员工和部门信息
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id

UNION

SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;
```

### 4.3 自连接

自连接是表与自身的连接，通常用于处理层级数据。

```sql
-- 示例：查询员工及其经理信息
SELECT 
    e.employee_id AS employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    m.employee_id AS manager_id,
    m.first_name AS manager_first_name,
    m.last_name AS manager_last_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

### 4.4 交叉连接（CROSS JOIN）

交叉连接返回两个表的笛卡尔积，即第一个表的每一行与第二个表的每一行组合。

```sql
-- 示例：生成所有员工和所有部门的组合
SELECT e.employee_id, e.first_name, e.last_name, d.department_name
FROM employees e
CROSS JOIN departments d;
```

### 4.5 连接查询与聚合函数

```sql
-- 示例：查询每个部门的员工数和平均薪资
SELECT 
    d.department_id,
    d.department_name,
    COUNT(e.employee_id) AS employee_count,
    AVG(e.salary) AS avg_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
ORDER BY employee_count DESC;

-- 示例：查询每个城市的部门数和员工数
SELECT 
    l.city,
    l.country,
    COUNT(DISTINCT d.department_id) AS department_count,
    COUNT(e.employee_id) AS employee_count
FROM locations l
LEFT JOIN departments d ON l.location_id = d.location_id
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY l.location_id, l.city, l.country
ORDER BY employee_count DESC;
```

## 5. 本章小结

本章介绍了MySQL中的高级查询技术，包括WHERE条件过滤、排序与分页、聚合函数与分组以及多表连接查询。这些技术使我们能够从数据库中检索更精确、更有意义的数据。

**知识要点回顾**：
1. WHERE子句用于过滤查询结果，支持多种运算符和模式匹配
2. ORDER BY子句用于对查询结果进行排序，支持单列和多列排序
3. LIMIT子句用于限制查询结果数量，常用于分页查询
4. 聚合函数对一组值执行计算，包括COUNT、SUM、AVG、MIN和MAX
5. GROUP BY子句将具有相同值的行组合为摘要行，常与聚合函数一起使用
6. HAVING子句用于过滤分组结果，类似于WHERE子句但用于聚合函数
7. 多表连接查询允许从多个相关表中检索数据，包括内连接、外连接和自连接

**下一步学习**：
在下一章中，我们将学习高级查询技术，包括子查询与嵌套查询、联合查询（UNION）、窗口函数与CTE以及复杂查询优化技巧。

## 6. 练习题

1. 创建员工表(employees)和部门表(departments)，并插入适当的测试数据。
2. 查询薪资在60000到80000之间的所有员工，并按薪资降序排列。
3. 查询姓氏以'S'或'T'开头的员工，并按姓氏升序、名字升序排列。
4. 查询每个部门的员工数和平均薪资，并按平均薪资降序排列。
5. 查询员工数大于5的部门及其员工数。
6. 查询所有员工及其部门信息，包括没有部门的员工。
7. 查询每个城市的部门数和员工数，并按员工数降序排列。
8. 查询员工及其经理信息，包括没有经理的员工。
9. 实现分页查询，每页显示10条记录，查询第3页的数据。
10. 查询2022年入职的员工，按月份分组，统计每月入职的员工数。