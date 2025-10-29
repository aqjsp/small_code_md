# 监控与诊断

## 1. 性能监控

### 1.1 性能指标

MySQL性能监控需要关注以下关键指标：

#### 1.1.1 连接指标

```sql
-- 查看当前连接数
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Connections';
SHOW STATUS LIKE 'Max_used_connections';

-- 查看连接详情
SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST;

-- 查看连接错误
SHOW STATUS LIKE 'Connection_errors%';
```

#### 1.1.2 查询指标

```sql
-- 查看查询统计
SHOW STATUS LIKE 'Com_%';
SHOW STATUS LIKE 'Questions';
SHOW STATUS LIKE 'Queries';
SHOW STATUS LIKE 'Slow_queries';

-- 查看查询缓存
SHOW STATUS LIKE 'Qcache%';
```

#### 1.1.3 表指标

```sql
-- 查看表锁定
SHOW STATUS LIKE 'Table_locks%';

-- 查看表操作
SHOW STATUS LIKE 'Handler_%';
```

#### 1.1.4 复制指标

```sql
-- 查看复制状态
SHOW SLAVE STATUS\G
SHOW MASTER STATUS;

-- 查看复制延迟
SHOW STATUS LIKE 'Seconds_Behind_Master';
```

### 1.2 性能监控工具

#### 1.2.1 SHOW命令

```sql
-- 查看全局状态
SHOW GLOBAL STATUS;

-- 查看全局变量
SHOW GLOBAL VARIABLES;

-- 查看引擎状态
SHOW ENGINE INNODB STATUS;
SHOW ENGINE PERFORMANCE_SCHEMA STATUS;

-- 查看二进制日志
SHOW BINARY LOGS;
SHOW MASTER STATUS;
```

#### 1.2.2 INFORMATION_SCHEMA

```sql
-- 查看表信息
SELECT * FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'your_database';

-- 查看索引信息
SELECT * FROM INFORMATION_SCHEMA.STATISTICS 
WHERE TABLE_SCHEMA = 'your_database';

-- 查看进程列表
SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST;

-- 查看InnoDB锁信息
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS;
SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;
```

#### 1.2.3 Performance Schema

```sql
-- 启用Performance Schema
UPDATE performance_schema.setup_instruments 
SET ENABLED = 'YES', TIMED = 'YES';

-- 查看事件等待
SELECT * FROM performance_schema.events_waits_summary_global_by_event_name 
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;

-- 查看文件IO
SELECT * FROM performance_schema.file_summary_by_event_name 
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;

-- 查看语句摘要
SELECT * FROM performance_schema.events_statements_summary_by_digest 
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;
```

### 1.3 性能监控脚本

#### 1.3.1 基本监控脚本

```bash
#!/bin/bash
# MySQL基本监控脚本

MYSQL_USER="monitor"
MYSQL_PASS="password"
MYSQL_HOST="localhost"

# 获取连接数
CONNECTIONS=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Threads_connected';" | awk 'NR==2 {print $2}')

# 获取查询数
QUERIES=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Questions';" | awk 'NR==2 {print $2}')

# 获取慢查询数
SLOW_QUERIES=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Slow_queries';" | awk 'NR==2 {print $2}')

# 输出结果
echo "Connections: $CONNECTIONS"
echo "Queries: $QUERIES"
echo "Slow Queries: $SLOW_QUERIES"
```

#### 1.3.2 性能数据收集脚本

```sql
-- 创建性能数据表
CREATE TABLE performance_monitoring (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    connections INT,
    queries INT,
    slow_queries INT,
    qcache_hits INT,
    qcache_inserts INT,
    innodb_buffer_pool_reads INT,
    innodb_buffer_pool_read_requests INT
);

-- 创建存储过程收集性能数据
DELIMITER //
CREATE PROCEDURE collect_performance_data()
BEGIN
    INSERT INTO performance_monitoring (connections, queries, slow_queries, qcache_hits, qcache_inserts, innodb_buffer_pool_reads, innodb_buffer_pool_read_requests)
    SELECT 
        VARIABLE_VALUE AS connections,
        (SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Questions') AS queries,
        (SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Slow_queries') AS slow_queries,
        (SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Qcache_hits') AS qcache_hits,
        (SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Qcache_inserts') AS qcache_inserts,
        (SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_reads') AS innodb_buffer_pool_reads,
        (SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_read_requests') AS innodb_buffer_pool_read_requests
    FROM INFORMATION_SCHEMA.GLOBAL_STATUS 
    WHERE VARIABLE_NAME = 'Threads_connected';
END //
DELIMITER ;

-- 创建事件定期执行
CREATE EVENT performance_monitoring_event
ON SCHEDULE EVERY 5 MINUTE
DO CALL collect_performance_data();
```

## 2. 问题诊断

### 2.1 慢查询诊断

#### 2.1.1 启用慢查询日志

```sql
-- 启用慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;  -- 设置慢查询阈值为2秒
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- 查看慢查询日志配置
SHOW VARIABLES LIKE '%slow_query%';
SHOW VARIABLES LIKE 'long_query_time';
```

#### 2.1.2 分析慢查询日志

```bash
# 使用mysqldumpslow分析慢查询日志
mysqldumpslow /var/log/mysql/mysql-slow.log

# 按查询时间排序
mysqldumpslow -s t /var/log/mysql/mysql-slow.log

# 按查询次数排序
mysqldumpslow -s c /var/log/mysql/mysql-slow.log

# 显示前10条最慢查询
mysqldumpslow -t 10 /var/log/mysql/mysql-slow.log
```

#### 2.1.3 使用pt-query-digest分析慢查询

```bash
# 安装pt-query-digest（Percona Toolkit）
yum install percona-toolkit

# 分析慢查询日志
pt-query-digest /var/log/mysql/mysql-slow.log

# 分析慢查询日志并生成报告
pt-query-digest --report-type=report /var/log/mysql/mysql-slow.log > slow_query_report.txt

# 实时分析慢查询
pt-query-digest --processlist h=localhost,u=monitor,p=password
```

### 2.2 锁问题诊断

#### 2.2.1 查看锁等待

```sql
-- 查看当前锁等待
SELECT 
    r.trx_id AS waiting_trx_id,
    r.trx_mysql_thread_id AS waiting_thread,
    r.trx_query AS waiting_query,
    b.trx_id AS blocking_trx_id,
    b.trx_mysql_thread_id AS blocking_thread,
    b.trx_query AS blocking_query
FROM 
    information_schema.innodb_lock_waits w
INNER JOIN 
    information_schema.innodb_trx b ON b.trx_id = w.blocking_trx_id
INNER JOIN 
    information_schema.innodb_trx r ON r.trx_id = w.requesting_trx_id;

-- 查看锁信息
SELECT * FROM information_schema.innodb_locks;
```

#### 2.2.2 查看表锁

```sql
-- 查看表锁等待
SELECT * FROM sys.schema_table_lock_waits;

-- 查看表锁统计
SELECT * FROM sys.innodb_lock_waits;
```

#### 2.2.3 解决锁问题

```sql
-- 查找长时间运行的事务
SELECT 
    id,
    user,
    host,
    db,
    command,
    time,
    state,
    info
FROM 
    information_schema.processlist 
WHERE 
    time > 60  -- 运行超过60秒的事务
ORDER BY 
    time DESC;

-- 终止长时间运行的事务
KILL [ID];
```

### 2.3 复制问题诊断

#### 2.3.1 检查复制状态

```sql
-- 查看从服务器状态
SHOW SLAVE STATUS\G

-- 关键指标检查
-- Slave_IO_Running: Yes
-- Slave_SQL_Running: Yes
-- Seconds_Behind_Master: 0
-- Last_IO_Error: (空)
-- Last_SQL_Error: (空)
```

#### 2.3.2 常见复制问题

1. **主从数据不一致**

```sql
-- 检查主从数据一致性
-- 在主服务器执行
SELECT COUNT(*) FROM table_name;

-- 在从服务器执行
SELECT COUNT(*) FROM table_name;

-- 使用pt-table-checksum检查数据一致性
pt-table-checksum --replicate=test.checksums --databases=your_db h=localhost,u=checksum_user,p=password

-- 使用pt-table-sync修复数据不一致
pt-table-sync --execute --replicate=test.checksums h=localhost,u=checksum_user,p=password
```

2. **复制延迟**

```sql
-- 查看复制延迟
SHOW SLAVE STATUS\G
-- 检查Seconds_Behind_Master值

-- 查看从服务器IO和SQL线程状态
SHOW PROCESSLIST;
```

3. **复制错误**

```sql
-- 查看错误信息
SHOW SLAVE STATUS\G
-- 检查Last_IO_Error和Last_SQL_Error

-- 跳过错误
SET GLOBAL sql_slave_skip_counter = 1;
START SLAVE;
```

### 2.4 性能问题诊断

#### 2.4.1 分析执行计划

```sql
-- 使用EXPLAIN分析查询
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';

-- 使用EXPLAIN EXTENDED获取更多信息
EXPLAIN EXTENDED SELECT * FROM users WHERE email = 'user@example.com';
SHOW WARNINGS;

-- 使用EXPLAIN ANALYZE（MySQL 8.0+）
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

#### 2.4.2 使用Performance Schema分析性能

```sql
-- 查看最耗时的SQL语句
SELECT 
    DIGEST_TEXT,
    COUNT_STAR,
    SUM_TIMER_WAIT/1000000000 AS total_time_sec,
    AVG_TIMER_WAIT/1000000000 AS avg_time_sec
FROM 
    performance_schema.events_statements_summary_by_digest 
ORDER BY 
    SUM_TIMER_WAIT DESC 
LIMIT 10;

-- 查看最耗时的表IO
SELECT 
    object_schema,
    object_name,
    count_read,
    sum_timer_read/1000000000 AS read_time_sec,
    count_write,
    sum_timer_write/1000000000 AS write_time_sec
FROM 
    performance_schema.table_io_waits_summary_by_table 
ORDER BY 
    sum_timer_wait DESC 
LIMIT 10;
```

## 3. 日志分析

### 3.1 错误日志分析

#### 3.1.1 查看错误日志

```bash
# 查看错误日志位置
SHOW VARIABLES LIKE 'log_error';

# 查看错误日志内容
tail -f /var/log/mysql/error.log

# 查看最近的错误
tail -n 100 /var/log/mysql/error.log

# 搜索特定错误
grep "Error" /var/log/mysql/error.log
grep "Warning" /var/log/mysql/error.log
```

#### 3.1.2 常见错误分析

1. **连接错误**

```bash
# 搜索连接错误
grep "Access denied" /var/log/mysql/error.log
grep "Too many connections" /var/log/mysql/error.log
```

2. **存储引擎错误**

```bash
# 搜索InnoDB错误
grep "InnoDB" /var/log/mysql/error.log
```

3. **复制错误**

```bash
# 搜索复制错误
grep "Slave" /var/log/mysql/error.log
```

### 3.2 查询日志分析

#### 3.2.1 启用查询日志

```sql
-- 启用一般查询日志
SET GLOBAL general_log = 'ON';
SET GLOBAL general_log_file = '/var/log/mysql/general.log';

-- 启用慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL slow_query_log_file = '/var/log/mysql/mysql-slow.log';
SET GLOBAL long_query_time = 1;
```

#### 3.2.2 分析查询日志

```bash
# 分析一般查询日志
tail -f /var/log/mysql/general.log

# 搜索特定查询
grep "SELECT" /var/log/mysql/general.log
grep "UPDATE" /var/log/mysql/general.log
grep "DELETE" /var/log/mysql/general.log

# 按时间过滤查询日志
grep "2023-06-01 10:" /var/log/mysql/general.log
```

### 3.3 二进制日志分析

#### 3.3.1 查看二进制日志

```sql
-- 查看二进制日志列表
SHOW BINARY LOGS;

-- 查看当前二进制日志
SHOW MASTER STATUS;

-- 查看二进制日志内容
SHOW BINLOG EVENTS IN 'mysql-bin.000001';
SHOW BINLOG EVENTS IN 'mysql-bin.000001' FROM 123 LIMIT 10;
```

#### 3.3.2 使用mysqlbinlog分析二进制日志

```bash
# 查看二进制日志内容
mysqlbinlog /var/log/mysql/mysql-bin.000001

# 查看特定时间段的二进制日志
mysqlbinlog --start-datetime="2023-06-01 10:00:00" --stop-datetime="2023-06-01 11:00:00" /var/log/mysql/mysql-bin.000001

# 查看特定数据库的二进制日志
mysqlbinlog --database=your_db /var/log/mysql/mysql-bin.000001

# 过滤特定操作
mysqlbinlog /var/log/mysql/mysql-bin.000001 | grep "UPDATE"
```

## 4. 监控工具

### 4.1 开源监控工具

#### 4.1.1 Prometheus + Grafana

```yaml
# prometheus.yml配置
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'mysql'
    static_configs:
      - targets: ['localhost:9104']
```

```bash
# 安装mysqld_exporter
wget https://github.com/prometheus/mysqld_exporter/releases/download/v0.14.0/mysqld_exporter-0.14.0.linux-amd64.tar.gz
tar xvfz mysqld_exporter-0.14.0.linux-amd64.tar.gz
cd mysqld_exporter-0.14.0.linux-amd64

# 创建监控用户
mysql -u root -p -e "CREATE USER 'mysqld_exporter'@'localhost' IDENTIFIED BY 'password';
GRANT PROCESS, REPLICATION CLIENT, SELECT ON *.* TO 'mysqld_exporter'@'localhost';
FLUSH PRIVILEGES;"

# 创建配置文件
cat > .my.cnf << EOF
[client]
user=mysqld_exporter
password=password
EOF

# 启动mysqld_exporter
./mysqld_exporter --config.my-cnf=.my.cnf
```

#### 4.1.2 Percona Monitoring and Management (PMM)

```bash
# 安装PMM Server
docker create \
  -v /opt/prometheus/data \
  -v /opt/consul-data \
  -v /opt/grafana/data \
  -v /var/lib/mysql \
  -p 80:80 \
  -p 443:443 \
  --name pmm-server \
  --restart always \
  percona/pmm-server:2

# 启动PMM Server
docker start pmm-server

# 安装PMM Client
yum install pmm2-client

# 配置PMM Client
pmm-admin config --server-insecure --server-url=https://admin:admin@<PMM_SERVER_IP>

# 添加MySQL监控
pmm-admin add mysql --username=pmm --password=pmm --query-source=perfschema
```

#### 4.1.3 Zabbix

```bash
# 安装Zabbix Agent
yum install zabbix-agent

# 配置Zabbix Agent
cat > /etc/zabbix/zabbix_agentd.d/mysql.conf << EOF
UserParameter=mysql.status[*],echo "show global status where Variable_name='$1';" | mysql -N -s | awk '{print $$2}'
UserParameter=mysql.ping,mysqladmin ping | grep -c alive
UserParameter=mysql.version,mysql -V
EOF

# 重启Zabbix Agent
systemctl restart zabbix-agent
```

### 4.2 商业监控工具

#### 4.2.1 MySQL Enterprise Monitor

MySQL Enterprise Monitor是Oracle官方提供的商业监控解决方案，提供全面的MySQL监控和管理功能。

#### 4.2.2 SolarWinds Database Performance Analyzer

SolarWinds DPA是一个全面的数据库性能监控工具，支持MySQL和其他数据库系统。

#### 4.2.3 Datadog

Datadog是一个云监控平台，提供MySQL监控和性能分析功能。

### 4.3 自定义监控脚本

#### 4.3.1 基本监控脚本

```bash
#!/bin/bash
# MySQL监控脚本

MYSQL_USER="monitor"
MYSQL_PASS="password"
MYSQL_HOST="localhost"
ALERT_EMAIL="admin@example.com"

# 获取连接数
CONNECTIONS=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Threads_connected';" | awk 'NR==2 {print $2}')

# 获取慢查询数
SLOW_QUERIES=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Slow_queries';" | awk 'NR==2 {print $2}')

# 检查连接数是否超过阈值
if [ $CONNECTIONS -gt 100 ]; then
    echo "MySQL连接数过高: $CONNECTIONS" | mail -s "MySQL警告" $ALERT_EMAIL
fi

# 检查慢查询数是否超过阈值
if [ $SLOW_QUERIES -gt 10 ]; then
    echo "MySQL慢查询数过高: $SLOW_QUERIES" | mail -s "MySQL警告" $ALERT_EMAIL
fi
```

#### 4.3.2 性能数据收集脚本

```python
#!/usr/bin/env python3
# MySQL性能数据收集脚本

import pymysql
import time
import json
from datetime import datetime

# 数据库连接配置
config = {
    'host': 'localhost',
    'user': 'monitor',
    'password': 'password',
    'database': 'information_schema',
    'charset': 'utf8mb4'
}

# 性能指标查询
queries = {
    'connections': "SELECT VARIABLE_VALUE FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Threads_connected'",
    'queries': "SELECT VARIABLE_VALUE FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Questions'",
    'slow_queries': "SELECT VARIABLE_VALUE FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Slow_queries'",
    'qcache_hits': "SELECT VARIABLE_VALUE FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Qcache_hits'",
    'qcache_inserts': "SELECT VARIABLE_VALUE FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Qcache_inserts'",
    'innodb_buffer_pool_reads': "SELECT VARIABLE_VALUE FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_reads'",
    'innodb_buffer_pool_read_requests': "SELECT VARIABLE_VALUE FROM GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_read_requests'"
}

def collect_metrics():
    """收集性能指标"""
    connection = pymysql.connect(**config)
    
    metrics = {}
    metrics['timestamp'] = datetime.now().isoformat()
    
    try:
        with connection.cursor() as cursor:
            for name, query in queries.items():
                cursor.execute(query)
                result = cursor.fetchone()
                metrics[name] = int(result[0]) if result[0].isdigit() else result[0]
    finally:
        connection.close()
    
    return metrics

def save_metrics(metrics):
    """保存性能指标到文件"""
    filename = f"mysql_metrics_{datetime.now().strftime('%Y%m%d')}.jsonl"
    
    with open(filename, 'a') as f:
        f.write(json.dumps(metrics) + '\n')

def main():
    """主函数"""
    while True:
        metrics = collect_metrics()
        save_metrics(metrics)
        print(f"收集完成: {metrics['timestamp']}")
        time.sleep(300)  # 每5分钟收集一次

if __name__ == '__main__':
    main()
```

## 5. 故障排除

### 5.1 连接问题

#### 5.1.1 连接被拒绝

```bash
# 检查MySQL服务状态
systemctl status mysql
ps aux | grep mysql

# 检查端口监听
netstat -tlnp | grep 3306

# 检查防火墙设置
iptables -L -n | grep 3306
firewall-cmd --list-ports

# 检查MySQL配置
grep 'bind-address' /etc/mysql/mysql.conf.d/mysqld.cnf
grep 'port' /etc/mysql/mysql.conf.d/mysqld.cnf
```

#### 5.1.2 连接数过多

```sql
-- 查看最大连接数
SHOW VARIABLES LIKE 'max_connections';

-- 查看当前连接数
SHOW STATUS LIKE 'Threads_connected';

-- 查看连接详情
SELECT * FROM INFORMATION_SCHEMA.PROCESSLIST;

-- 终止空闲连接
KILL [ID];
```

#### 5.1.3 权限问题

```sql
-- 检查用户权限
SELECT User, Host FROM mysql.user;
SHOW GRANTS FOR 'user'@'host';

-- 重置用户密码
ALTER USER 'user'@'host' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### 5.2 性能问题

#### 5.2.1 查询缓慢

```sql
-- 查看慢查询日志
SHOW VARIABLES LIKE 'slow_query_log%';
SHOW VARIABLES LIKE 'long_query_time';

-- 分析执行计划
EXPLAIN SELECT * FROM table_name WHERE condition;

-- 查看索引使用情况
SHOW INDEX FROM table_name;
```

#### 5.2.2 锁等待

```sql
-- 查看锁等待
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS;
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS;

-- 查看长时间运行的事务
SELECT * FROM INFORMATION_SCHEMA.INNODB_TRX;

-- 终止长时间运行的事务
KILL [ID];
```

#### 5.2.3 缓冲池问题

```sql
-- 查看缓冲池状态
SHOW STATUS LIKE 'Innodb_buffer_pool%';

-- 查看缓冲池命中率
SELECT 
    (1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests)) * 100 AS hit_rate
FROM 
    INFORMATION_SCHEMA.GLOBAL_STATUS;
```

### 5.3 复制问题

#### 5.3.1 复制中断

```sql
-- 查看复制状态
SHOW SLAVE STATUS\G

-- 重启复制
STOP SLAVE;
START SLAVE;

-- 跳过错误
SET GLOBAL sql_slave_skip_counter = 1;
START SLAVE;
```

#### 5.3.2 数据不一致

```bash
# 使用pt-table-checksum检查数据一致性
pt-table-checksum --replicate=test.checksums --databases=your_db h=localhost,u=checksum_user,p=password

# 使用pt-table-sync修复数据不一致
pt-table-sync --execute --replicate=test.checksums h=localhost,u=checksum_user,p=password
```

### 5.4 存储问题

#### 5.4.1 磁盘空间不足

```bash
# 检查磁盘空间
df -h

# 查看MySQL数据目录大小
du -sh /var/lib/mysql

# 清理二进制日志
PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);
```

#### 5.4.2 InnoDB表空间问题

```sql
-- 查看表空间信息
SELECT 
    table_schema,
    table_name,
    engine,
    ROUND(data_length/1024/1024, 2) AS data_mb,
    ROUND(index_length/1024/1024, 2) AS index_mb
FROM 
    information_schema.tables 
WHERE 
    engine = 'InnoDB'
ORDER BY 
    data_length DESC;

-- 优化表
OPTIMIZE TABLE table_name;
```

## 6. 本章小结

本章介绍了MySQL的监控与诊断，包括性能监控、问题诊断、日志分析、监控工具以及故障排除。通过有效的监控和诊断，可以及时发现和解决MySQL数据库的问题，确保系统的稳定运行。

**知识要点回顾**：
1. MySQL性能监控需要关注连接、查询、表和复制等关键指标
2. SHOW命令、INFORMATION_SCHEMA和Performance Schema是主要的监控工具
3. 慢查询诊断需要启用慢查询日志并使用工具分析
4. 锁问题诊断需要查看锁等待和长时间运行的事务
5. 复制问题诊断需要检查复制状态和解决数据不一致
6. 日志分析包括错误日志、查询日志和二进制日志分析
7. 监控工具包括开源工具（如Prometheus+Grafana、PMM、Zabbix）和商业工具
8. 自定义监控脚本可以根据特定需求收集和监控性能数据
9. 故障排除包括连接问题、性能问题、复制问题和存储问题
10. 定期监控和及时响应是确保MySQL系统稳定运行的关键

**下一步学习**：
在下一章中，我们将学习运维最佳实践，包括日常维护、容量规划、变更管理、自动化运维以及运维文档。

## 7. 练习题

1. 设计一个MySQL性能监控方案，包括关键指标和监控工具。
2. 编写一个脚本，定期收集MySQL性能数据并存储到数据库中。
3. 分析一个慢查询日志，找出最耗时的查询并提出优化建议。
4. 配置Prometheus和Grafana监控MySQL，创建一个仪表板显示关键指标。
5. 设计一个故障诊断流程，用于快速定位和解决MySQL性能问题。
6. 编写一个脚本，自动检测MySQL复制问题并发送告警。
7. 分析MySQL错误日志，找出常见错误模式并提出解决方案。
8. 设计一个自定义监控脚本，监控MySQL的关键指标并在异常时发送告警。
9. 创建一个故障排除手册，包含常见MySQL问题的诊断和解决步骤。
10. 设计一个运维监控仪表板，实时显示MySQL系统的健康状态。