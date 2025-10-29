# 索引与性能优化

## 1. 索引基础

### 1.1 索引概述

索引是数据库中用于提高查询性能的数据结构，类似于书籍的目录。通过索引，数据库可以快速定位到表中的特定数据，而不必扫描整个表。

#### 1.1.1 索引的优势

1. **提高查询速度**：索引可以显著减少查询所需的时间，特别是对于大型表
2. **加速排序**：索引可以加速ORDER BY操作
3. **加速连接**：索引可以加速表连接操作
4. **强制唯一性**：唯一索引可以确保列值的唯一性

#### 1.1.2 索引的劣势

1. **占用存储空间**：索引需要额外的存储空间
2. **降低写入性能**：插入、更新和删除操作需要更新索引，可能降低写入性能
3. **维护成本**：索引需要定期维护，如重建或重新组织

### 1.2 索引类型

MySQL支持多种类型的索引，每种索引适用于不同的场景。

#### 1.2.1 B-Tree索引

B-Tree（平衡树）是MySQL中最常用的索引类型，适用于大多数场景。

```sql
-- 创建B-Tree索引
CREATE INDEX idx_employee_lastname ON employees(last_name);

-- 查看索引信息
SHOW INDEX FROM employees;
```

B-Tree索引适用于：
- 精确匹配（=）
- 范围查询（>, <, BETWEEN, LIKE 'prefix%'）
- 排序（ORDER BY）
- 连接（JOIN）

#### 1.2.2 哈希索引

哈希索引基于哈希表实现，只适用于精确匹配查询。

```sql
-- Memory引擎默认使用哈希索引
CREATE TABLE hash_example (
    id INT PRIMARY KEY,
    name VARCHAR(50)
) ENGINE=Memory;

-- 显式创建哈希索引
CREATE INDEX idx_hash_name ON hash_example(name) USING HASH;
```

哈希索引适用于：
- 精确匹配（=）
- 不适用于：
  - 范围查询
  - 排序
  - 前缀匹配

#### 1.2.3 全文索引

全文索引用于全文搜索，支持在文本内容中搜索关键词。

```sql
-- 创建全文索引
CREATE FULLTEXT INDEX idx_article_content ON articles(content);

-- 使用全文搜索
SELECT title, content
FROM articles
WHERE MATCH(content) AGAINST('database optimization' IN NATURAL LANGUAGE MODE);
```

#### 1.2.4 空间索引

空间索引用于地理空间数据类型，支持空间查询。

```sql
-- 创建空间索引
CREATE SPATIAL INDEX idx_location ON locations(coordinates);

-- 使用空间查询
SELECT name, coordinates
FROM locations
WHERE ST_Contains(ST_GeomFromText('POLYGON((...))'), coordinates);
```

### 1.3 索引分类

#### 1.3.1 主键索引

主键索引是唯一索引的特殊类型，用于标识表中的每一行。

```sql
-- 创建表时定义主键
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- 添加主键
ALTER TABLE employees ADD PRIMARY KEY (employee_id);
```

#### 1.3.2 唯一索引

唯一索引确保索引列中的所有值都是唯一的。

```sql
-- 创建唯一索引
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- 查看唯一索引
SHOW INDEX FROM employees WHERE Non_unique = 0;
```

#### 1.3.3 复合索引

复合索引（多列索引）是在多个列上创建的索引。

```sql
-- 创建复合索引
CREATE INDEX idx_employee_dept_salary ON employees(department_id, salary);

-- 查看复合索引
SHOW INDEX FROM employees WHERE Key_name = 'idx_employee_dept_salary';
```

#### 1.3.4 前缀索引

前缀索引只索引列的前N个字符，适用于较长的字符串列。

```sql
-- 创建前缀索引
CREATE INDEX idx_employee_lastname_prefix ON employees(last_name(10));

-- 查看前缀索引
SHOW INDEX FROM employees WHERE Sub_part IS NOT NULL;
```

## 2. 索引设计与创建

### 2.1 索引设计原则

#### 2.1.1 选择性原则

索引的选择性是指索引列中不同值的数量与表中总行数的比例。选择性越高，索引效果越好。

```sql
-- 计算列的选择性
SELECT 
    COUNT(DISTINCT last_name) / COUNT(*) AS lastname_selectivity,
    COUNT(DISTINCT gender) / COUNT(*) AS gender_selectivity
FROM employees;
```

#### 2.1.2 最左前缀原则

对于复合索引，查询条件必须从索引的最左列开始，才能使用索引。

```sql
-- 创建复合索引 (department_id, salary, hire_date)
CREATE INDEX idx_emp_dept_sal_hire ON employees(department_id, salary, hire_date);

-- 可以使用索引的查询
SELECT * FROM employees WHERE department_id = 3;
SELECT * FROM employees WHERE department_id = 3 AND salary > 50000;
SELECT * FROM employees WHERE department_id = 3 AND salary > 50000 AND hire_date > '2020-01-01';

-- 不能使用索引的查询
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE hire_date > '2020-01-01';
SELECT * FROM employees WHERE salary > 50000 AND hire_date > '2020-01-01';
```

#### 2.1.3 覆盖索引原则

覆盖索引是指索引包含了查询所需的所有列，可以避免回表操作。

```sql
-- 创建覆盖索引
CREATE INDEX idx_emp_covering ON employees(department_id, salary, employee_id, first_name, last_name);

-- 使用覆盖索引的查询
SELECT employee_id, first_name, last_name, salary
FROM employees
WHERE department_id = 3 AND salary > 50000;
```

### 2.2 索引创建策略

#### 2.2.1 为WHERE子句创建索引

为经常出现在WHERE子句中的列创建索引。

```sql
-- 为经常用于查询条件的列创建索引
CREATE INDEX idx_employee_salary ON employees(salary);
CREATE INDEX idx_employee_hire_date ON employees(hire_date);
```

#### 2.2.2 为JOIN操作创建索引

为经常用于JOIN操作的连接列创建索引。

```sql
-- 为外键列创建索引
CREATE INDEX idx_employee_department_id ON employees(department_id);
CREATE INDEX idx_job_history_employee_id ON job_history(employee_id);
```

#### 2.2.3 为ORDER BY创建索引

为经常用于排序的列创建索引。

```sql
-- 为经常用于排序的列创建索引
CREATE INDEX idx_employee_salary_desc ON employees(salary DESC);
CREATE INDEX idx_employee_hire_date_desc ON employees(hire_date DESC);
```

#### 2.2.4 为GROUP BY创建索引

为经常用于分组的列创建索引。

```sql
-- 为经常用于分组的列创建索引
CREATE INDEX idx_employee_department ON employees(department_id);
CREATE INDEX idx_employee_job ON employees(job_id);
```

### 2.3 索引创建与维护

#### 2.3.1 创建索引

```sql
-- 创建普通索引
CREATE INDEX idx_employee_lastname ON employees(last_name);

-- 创建唯一索引
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- 创建复合索引
CREATE INDEX idx_employee_dept_salary ON employees(department_id, salary);

-- 创建前缀索引
CREATE INDEX idx_employee_lastname_prefix ON employees(last_name(10));

-- 创建全文索引
CREATE FULLTEXT INDEX idx_article_content ON articles(content);

-- 创建空间索引
CREATE SPATIAL INDEX idx_location ON locations(coordinates);
```

#### 2.3.2 查看索引

```sql
-- 查看表的所有索引
SHOW INDEX FROM employees;

-- 查看索引的详细信息
SHOW INDEX FROM employees WHERE Key_name = 'idx_employee_lastname';

-- 使用INFORMATION_SCHEMA查看索引
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    COLUMN_NAME,
    SEQ_IN_INDEX,
    INDEX_TYPE
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'your_database' AND TABLE_NAME = 'employees';
```

#### 2.3.3 删除索引

```sql
-- 删除索引
DROP INDEX idx_employee_lastname ON employees;

-- 删除主键索引
ALTER TABLE employees DROP PRIMARY KEY;
```

#### 2.3.4 重建索引

```sql
-- 删除并重新创建索引
DROP INDEX idx_employee_lastname ON employees;
CREATE INDEX idx_employee_lastname ON employees(last_name);

-- 使用ANALYZE TABLE更新索引统计信息
ANALYZE TABLE employees;

-- 使用OPTIMIZE TABLE优化表
OPTIMIZE TABLE employees;
```

## 3. 查询优化

### 3.1 查询执行计划分析

使用EXPLAIN或EXPLAIN ANALYZE可以查看MySQL如何执行查询，帮助识别性能瓶颈。

#### 3.1.1 EXPLAIN基础

```sql
-- 查看查询执行计划
EXPLAIN SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 70000;
```

EXPLAIN输出列说明：
- **id**：查询标识符
- **select_type**：查询类型（SIMPLE, PRIMARY, UNION等）
- **table**：输出行的表
- **type**：连接类型（ALL, index, range, ref等）
- **possible_keys**：可能使用的索引
- **key**：实际使用的索引
- **key_len**：使用的索引长度
- **ref**：与索引比较的列
- **rows**：预估要检查的行数
- **filtered**：按表条件过滤的行的百分比
- **Extra**：额外信息（Using where, Using index等）

#### 3.1.2 连接类型（type）

连接类型从最好到最差的顺序：
1. **system**：表只有一行（系统表）
2. **const**：表最多有一行匹配
3. **eq_ref**：对于每个来自前一个表的行，表中最多有一行匹配
4. **ref**：对于每个来自前一个表的行，表中可能有多个行匹配
5. **fulltext**：使用全文索引
6. **ref_or_null**：与ref类似，但包含NULL值的搜索
7. **index_merge**：索引合并优化
8. **unique_subquery**：唯一子查询
9. **index_subquery**：索引子查询
10. **range**：索引范围扫描
11. **index**：索引扫描
12. **ALL**：全表扫描

#### 3.1.3 额外信息（Extra）

常见的Extra信息：
- **Using where**：使用WHERE子句过滤
- **Using index**：使用覆盖索引
- **Using filesort**：使用文件排序（需要优化）
- **Using temporary**：使用临时表（需要优化）
- **Using join buffer**：使用连接缓冲区
- **Using index condition**：使用索引下推优化

### 3.2 查询优化技巧

#### 3.2.1 避免全表扫描

```sql
-- 不推荐：可能导致全表扫描
SELECT * FROM employees WHERE YEAR(hire_date) = 2022;

-- 推荐：使用范围查询
SELECT * FROM employees 
WHERE hire_date >= '2022-01-01' AND hire_date < '2023-01-01';
```

#### 3.2.2 避免使用SELECT *

```sql
-- 不推荐：查询所有列
SELECT * FROM employees WHERE department_id = 3;

-- 推荐：只查询需要的列
SELECT employee_id, first_name, last_name, salary 
FROM employees WHERE department_id = 3;
```

#### 3.2.3 使用LIMIT限制结果集

```sql
-- 限制查询结果数量
SELECT employee_id, first_name, last_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 10;
```

#### 3.2.4 使用EXISTS替代IN

```sql
-- 不推荐：使用IN
SELECT employee_id, first_name, last_name
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);

-- 推荐：使用EXISTS
SELECT e.employee_id, e.first_name, e.last_name
FROM employees e
WHERE EXISTS (SELECT 1 FROM departments d 
              WHERE d.department_id = e.department_id AND d.location_id = 1700);
```

#### 3.2.5 避免在WHERE子句中对列使用函数

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

#### 3.2.6 使用JOIN替代子查询

```sql
-- 不推荐：使用子查询
SELECT employee_id, first_name, last_name
FROM employees
WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);

-- 推荐：使用JOIN
SELECT e.employee_id, e.first_name, e.last_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE d.location_id = 1700;
```

### 3.3 查询重写示例

#### 3.3.1 优化GROUP BY查询

```sql
-- 原始查询
SELECT 
    d.department_id,
    d.department_name,
    COUNT(e.employee_id) AS employee_count,
    AVG(e.salary) AS avg_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
HAVING COUNT(e.employee_id) > 5
ORDER BY avg_salary DESC;

-- 优化后的查询
SELECT 
    d.department_id,
    d.department_name,
    COUNT(e.employee_id) AS employee_count,
    AVG(e.salary) AS avg_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
WHERE e.department_id IS NOT NULL OR e.department_id IS NULL  -- 确保所有部门都被包含
GROUP BY d.department_id, d.department_name
HAVING COUNT(e.employee_id) > 5
ORDER BY avg_salary DESC;
```

#### 3.3.2 优化复杂查询

```sql
-- 原始查询
SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    e.salary,
    (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id) AS dept_avg_salary,
    e.salary - (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id) AS salary_diff
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees);

-- 优化后的查询
WITH dept_avg AS (
    SELECT 
        department_id,
        AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
),
company_avg AS (
    SELECT AVG(salary) AS avg_salary
    FROM employees
)
SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    e.salary,
    da.avg_salary AS dept_avg_salary,
    e.salary - da.avg_salary AS salary_diff
FROM employees e
JOIN dept_avg da ON e.department_id = da.department_id
CROSS JOIN company_avg ca
WHERE e.salary > ca.avg_salary;
```

## 4. 性能监控与调优

### 4.1 性能监控工具

#### 4.1.1 SHOW PROFILE

SHOW PROFILE可以显示查询执行的详细时间和资源使用情况。

```sql
-- 启用性能分析
SET profiling = 1;

-- 执行查询
SELECT * FROM employees WHERE salary > 70000;

-- 查看性能分析结果
SHOW PROFILE;

-- 查看详细性能分析
SHOW PROFILE FOR QUERY 1;

-- 查看CPU和IO使用情况
SHOW PROFILE CPU, BLOCK IO FOR QUERY 1;
```

#### 4.1.2 PERFORMANCE_SCHEMA

PERFORMANCE_SCHEMA提供了更详细的性能监控信息。

```sql
-- 查看性能事件
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;

-- 查看表锁等待
SELECT * FROM performance_schema.table_lock_waits_summary_by_table
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;

-- 查看索引使用情况
SELECT * FROM performance_schema.table_io_waits_summary_by_index_usage
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;
```

#### 4.1.3 INFORMATION_SCHEMA

INFORMATION_SCHEMA提供了数据库元数据信息。

```sql
-- 查看表大小
SELECT 
    table_schema,
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'your_database'
ORDER BY (data_length + index_length) DESC;

-- 查看索引使用情况
SELECT 
    table_schema,
    table_name,
    index_name,
    cardinality,
    sub_part,
    packed,
    nullable,
    index_type
FROM information_schema.statistics
WHERE table_schema = 'your_database'
ORDER BY table_name, seq_in_index;
```

### 4.2 性能调优参数

#### 4.2.1 内存相关参数

```sql
-- 查看当前内存相关参数
SHOW VARIABLES LIKE '%buffer%';
SHOW VARIABLES LIKE '%cache%';

-- 调整InnoDB缓冲池大小（建议设置为物理内存的70-80%）
SET GLOBAL innodb_buffer_pool_size = 2G;

-- 调整查询缓存大小
SET GLOBAL query_cache_size = 256M;
SET GLOBAL query_cache_type = ON;
```

#### 4.2.2 连接相关参数

```sql
-- 查看当前连接相关参数
SHOW VARIABLES LIKE '%connect%';
SHOW VARIABLES LIKE '%max_connections%';

-- 调整最大连接数
SET GLOBAL max_connections = 500;

-- 调整连接超时时间
SET GLOBAL wait_timeout = 28800;
SET GLOBAL interactive_timeout = 28800;
```

#### 4.2.3 InnoDB相关参数

```sql
-- 查看InnoDB相关参数
SHOW VARIABLES LIKE 'innodb%';

-- 调整InnoDB日志文件大小
SET GLOBAL innodb_log_file_size = 256M;

-- 调整InnoDB刷新方式
SET GLOBAL innodb_flush_log_at_trx_commit = 2;

-- 调整InnoDB线程数
SET GLOBAL innodb_thread_concurrency = 16;
```

### 4.3 慢查询日志

慢查询日志记录执行时间超过指定阈值的查询，有助于识别性能问题。

#### 4.3.1 启用慢查询日志

```sql
-- 启用慢查询日志
SET GLOBAL slow_query_log = ON;

-- 设置慢查询阈值（秒）
SET GLOBAL long_query_time = 2;

-- 设置慢查询日志文件路径
SET GLOBAL slow_query_log_file = '/var/log/mysql/mysql-slow.log';

-- 记录没有使用索引的查询
SET GLOBAL log_queries_not_using_indexes = ON;
```

#### 4.3.2 分析慢查询日志

```sql
-- 使用mysqldumpslow分析慢查询日志
-- 命令行执行
mysqldumpslow /var/log/mysql/mysql-slow.log

-- 显示执行时间最长的10条查询
mysqldumpslow -t 10 /var/log/mysql/mysql-slow.log

-- 显示返回行数最多的10条查询
mysqldumpslow -s r -t 10 /var/log/mysql/mysql-slow.log
```

### 4.4 性能优化最佳实践

#### 4.4.1 数据库设计优化

1. **规范化设计**：遵循数据库规范化原则，减少数据冗余
2. **适当反规范化**：对于频繁查询的场景，适当反规范化可以提高性能
3. **选择合适的数据类型**：使用最小的数据类型可以节省存储空间和提高性能
4. **分区表**：对于大型表，考虑使用分区提高查询性能

#### 4.4.2 索引优化

1. **创建必要的索引**：为经常用于查询条件、排序和连接的列创建索引
2. **避免过度索引**：过多的索引会降低写入性能
3. **使用复合索引**：对于多列查询条件，使用复合索引可以提高性能
4. **定期维护索引**：定期分析表和优化表，保持索引效率

#### 4.4.3 查询优化

1. **避免全表扫描**：确保查询使用索引
2. **限制结果集**：使用LIMIT限制返回的行数
3. **避免SELECT ***：只查询需要的列
4. **使用EXISTS替代IN**：对于子查询，使用EXISTS通常比IN更高效
5. **避免在WHERE子句中对列使用函数**：这会导致索引失效

#### 4.4.4 服务器配置优化

1. **调整内存参数**：合理配置缓冲池和查询缓存
2. **调整连接参数**：根据应用需求调整最大连接数和超时时间
3. **启用慢查询日志**：监控和分析慢查询
4. **定期优化表**：使用OPTIMIZE TABLE定期优化表

## 5. 本章小结

本章介绍了MySQL中的索引与性能优化技术，包括索引基础、索引设计与创建、查询优化以及性能监控与调优。通过合理使用索引和优化查询，可以显著提高MySQL数据库的性能。

**知识要点回顾**：
1. 索引是提高查询性能的数据结构，类似于书籍的目录
2. MySQL支持多种索引类型，包括B-Tree索引、哈希索引、全文索引和空间索引
3. 索引分类包括主键索引、唯一索引、复合索引和前缀索引
4. 索引设计原则包括选择性原则、最左前缀原则和覆盖索引原则
5. 索引创建策略包括为WHERE子句、JOIN操作、ORDER BY和GROUP BY创建索引
6. 使用EXPLAIN可以查看查询执行计划，帮助识别性能瓶颈
7. 查询优化技巧包括避免全表扫描、避免使用SELECT *、使用LIMIT限制结果集等
8. 性能监控工具包括SHOW PROFILE、PERFORMANCE_SCHEMA和INFORMATION_SCHEMA
9. 慢查询日志记录执行时间超过指定阈值的查询，有助于识别性能问题
10. 性能优化最佳实践包括数据库设计优化、索引优化、查询优化和服务器配置优化

**下一步学习**：
在下一章中，我们将学习事务与锁机制，包括事务基础、隔离级别、锁类型以及死锁处理。

## 6. 练习题

1. 创建一个员工表(employees)和部门表(departments)，并插入适当的测试数据。
2. 为员工表的last_name列创建B-Tree索引，并查看索引信息。
3. 为员工表的department_id和salary列创建复合索引，并测试最左前缀原则。
4. 使用EXPLAIN分析一个复杂查询的执行计划，并解释输出结果。
5. 优化一个包含子查询的复杂查询，提高其性能。
6. 启用慢查询日志，并分析慢查询日志找出性能问题。
7. 调整MySQL服务器参数，优化数据库性能。
8. 使用SHOW PROFILE分析查询的执行时间和资源使用情况。
9. 为一个经常用于查询条件的列创建索引，并比较创建前后的查询性能。
10. 使用PERFORMANCE_SCHEMA监控数据库性能，并找出性能瓶颈。