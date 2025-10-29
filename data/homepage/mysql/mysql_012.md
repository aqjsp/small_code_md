# 运维最佳实践

## 1. 日常维护

### 1.1 定期维护任务

#### 1.1.1 每日维护任务

1. **检查系统状态**

```sql
-- 检查MySQL服务状态
SHOW STATUS LIKE 'Uptime';

-- 检查连接数
SHOW STATUS LIKE 'Threads_connected';
SHOW STATUS LIKE 'Max_used_connections';

-- 检查慢查询
SHOW STATUS LIKE 'Slow_queries';

-- 检查错误日志
SHOW VARIABLES LIKE 'log_error';
```

2. **检查复制状态**

```sql
-- 检查主从复制状态
SHOW SLAVE STATUS\G

-- 检查关键指标
-- Slave_IO_Running: Yes
-- Slave_SQL_Running: Yes
-- Seconds_Behind_Master: 0
```

3. **检查备份状态**

```bash
# 检查备份是否成功完成
ls -la /backup/mysql/
tail -n 20 /var/log/backup.log
```

#### 1.1.2 每周维护任务

1. **分析表**

```sql
-- 分析表以更新统计信息
ANALYZE TABLE table1, table2, table3;

-- 分析所有表（使用存储过程）
DELIMITER //
CREATE PROCEDURE analyze_all_tables()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE table_name VARCHAR(255);
    DECLARE cur CURSOR FOR SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'your_database';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO table_name;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SET @sql = CONCAT('ANALYZE TABLE your_database.', table_name);
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;
    CLOSE cur;
END //
DELIMITER ;

-- 执行存储过程
CALL analyze_all_tables();
```

2. **优化表**

```sql
-- 优化表以回收空间
OPTIMIZE TABLE table1, table2;

-- 注意：OPTIMIZE TABLE会锁定表，应在低峰期执行
```

3. **检查表**

```sql
-- 检查表是否有错误
CHECK TABLE table1, table2;

-- 修复表（如果有错误）
REPAIR TABLE table1;
```

#### 1.1.3 每月维护任务

1. **清理日志**

```sql
-- 清理二进制日志
PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);

-- 清理中继日志
RESET SLAVE;

-- 清理慢查询日志（如果需要）
-- 重命名当前日志文件
FLUSH SLOW LOGS;
```

2. **更新统计信息**

```sql
-- 更新InnoDB统计信息
SET GLOBAL innodb_stats_auto_recalc = ON;
SET GLOBAL innodb_stats_persistent = ON;
SET GLOBAL innodb_stats_on_metadata = ON;
```

3. **检查安全更新**

```bash
# 检查MySQL安全更新
yum check-update mysql-server
apt list --upgradable mysql-server
```

### 1.2 维护脚本

#### 1.2.1 每日检查脚本

```bash
#!/bin/bash
# MySQL每日检查脚本

MYSQL_USER="monitor"
MYSQL_PASS="password"
MYSQL_HOST="localhost"
LOG_FILE="/var/log/mysql/daily_check.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# 记录日志函数
log() {
    echo "[$DATE] $1" >> $LOG_FILE
}

# 检查MySQL连接
check_mysql_connection() {
    if mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SELECT 1;" &> /dev/null; then
        log "MySQL连接正常"
        return 0
    else
        log "MySQL连接失败"
        return 1
    fi
}

# 检查连接数
check_connections() {
    CONNECTIONS=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Threads_connected';" | awk 'NR==2 {print $2}')
    MAX_CONNECTIONS=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'max_connections';" | awk 'NR==2 {print $2}')
    
    CONNECTION_PERCENTAGE=$((CONNECTIONS * 100 / MAX_CONNECTIONS))
    
    if [ $CONNECTION_PERCENTAGE -gt 80 ]; then
        log "警告: 连接数过高 ($CONNECTIONS/$MAX_CONNECTIONS, $CONNECTION_PERCENTAGE%)"
    else
        log "连接数正常 ($CONNECTIONS/$MAX_CONNECTIONS, $CONNECTION_PERCENTAGE%)"
    fi
}

# 检查慢查询
check_slow_queries() {
    SLOW_QUERIES=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Slow_queries';" | awk 'NR==2 {print $2}')
    
    if [ $SLOW_QUERIES -gt 10 ]; then
        log "警告: 慢查询数过高 ($SLOW_QUERIES)"
    else
        log "慢查询数正常 ($SLOW_QUERIES)"
    fi
}

# 检查复制状态
check_replication() {
    # 检查是否为从服务器
    IS_SLAVE=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'have_slave_running';" | awk 'NR==2 {print $2}')
    
    if [ "$IS_SLAVE" = "ON" ]; then
        SLAVE_IO=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW SLAVE STATUS\G" | grep "Slave_IO_Running:" | awk '{print $2}')
        SLAVE_SQL=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW SLAVE STATUS\G" | grep "Slave_SQL_Running:" | awk '{print $2}')
        SECONDS_BEHIND=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW SLAVE STATUS\G" | grep "Seconds_Behind_Master:" | awk '{print $2}')
        
        if [ "$SLAVE_IO" = "Yes" ] && [ "$SLAVE_SQL" = "Yes" ]; then
            log "复制状态正常 (延迟: $SECONDS_BEHIND 秒)"
        else
            log "警告: 复制状态异常 (IO: $SLAVE_IO, SQL: $SLAVE_SQL)"
        fi
    else
        log "不是从服务器，跳过复制检查"
    fi
}

# 检查磁盘空间
check_disk_space() {
    DATA_DIR=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'datadir';" | awk 'NR==2 {print $2}')
    DISK_USAGE=$(df -h $DATA_DIR | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ $DISK_USAGE -gt 80 ]; then
        log "警告: 数据目录磁盘使用率过高 ($DISK_USAGE%)"
    else
        log "数据目录磁盘使用率正常 ($DISK_USAGE%)"
    fi
}

# 执行检查
log "开始每日检查"
check_mysql_connection
if [ $? -eq 0 ]; then
    check_connections
    check_slow_queries
    check_replication
    check_disk_space
fi
log "每日检查完成"
```

#### 1.2.2 每周维护脚本

```bash
#!/bin/bash
# MySQL每周维护脚本

MYSQL_USER="admin"
MYSQL_PASS="password"
MYSQL_HOST="localhost"
DATABASE="your_database"
LOG_FILE="/var/log/mysql/weekly_maintenance.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# 记录日志函数
log() {
    echo "[$DATE] $1" >> $LOG_FILE
}

# 分析表
analyze_tables() {
    log "开始分析表"
    
    # 获取所有表名
    TABLES=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='$DATABASE' AND TABLE_TYPE='BASE TABLE';" | tail -n +2)
    
    for TABLE in $TABLES; do
        log "分析表: $TABLE"
        mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "ANALYZE TABLE $DATABASE.$TABLE;" >> $LOG_FILE 2>&1
    done
    
    log "表分析完成"
}

# 优化表
optimize_tables() {
    log "开始优化表"
    
    # 获取所有表名
    TABLES=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='$DATABASE' AND TABLE_TYPE='BASE TABLE';" | tail -n +2)
    
    for TABLE in $TABLES; do
        log "优化表: $TABLE"
        mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "OPTIMIZE TABLE $DATABASE.$TABLE;" >> $LOG_FILE 2>&1
    done
    
    log "表优化完成"
}

# 检查表
check_tables() {
    log "开始检查表"
    
    # 获取所有表名
    TABLES=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='$DATABASE' AND TABLE_TYPE='BASE TABLE';" | tail -n +2)
    
    for TABLE in $TABLES; do
        log "检查表: $TABLE"
        RESULT=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "CHECK TABLE $DATABASE.$TABLE;" | tail -n +2)
        
        if echo "$RESULT" | grep -q "Error"; then
            log "警告: 表 $TABLE 有错误"
            # 尝试修复表
            log "尝试修复表: $TABLE"
            mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "REPAIR TABLE $DATABASE.$TABLE;" >> $LOG_FILE 2>&1
        else
            log "表 $TABLE 正常"
        fi
    done
    
    log "表检查完成"
}

# 清理日志
cleanup_logs() {
    log "开始清理日志"
    
    # 清理7天前的二进制日志
    mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);" >> $LOG_FILE 2>&1
    
    # 清理旧的慢查询日志
    find /var/log/mysql -name "mysql-slow.log.*" -mtime +7 -delete
    
    # 清理旧的错误日志
    find /var/log/mysql -name "error.log.*" -mtime +7 -delete
    
    log "日志清理完成"
}

# 执行维护
log "开始每周维护"
analyze_tables
optimize_tables
check_tables
cleanup_logs
log "每周维护完成"
```

## 2. 容量规划

### 2.1 数据增长预测

#### 2.1.1 数据增长分析

```sql
-- 创建数据增长监控表
CREATE TABLE data_growth_monitor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(255),
    schema_name VARCHAR(255),
    data_size_mb DECIMAL(10,2),
    index_size_mb DECIMAL(10,2),
    total_size_mb DECIMAL(10,2),
    row_count BIGINT,
    record_date DATE
);

-- 创建存储过程收集数据增长信息
DELIMITER //
CREATE PROCEDURE collect_data_growth()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE table_name VARCHAR(255);
    DECLARE schema_name VARCHAR(255);
    DECLARE data_size_mb DECIMAL(10,2);
    DECLARE index_size_mb DECIMAL(10,2);
    DECLARE total_size_mb DECIMAL(10,2);
    DECLARE row_count BIGINT;
    
    DECLARE cur CURSOR FOR 
        SELECT 
            TABLE_SCHEMA,
            TABLE_NAME,
            ROUND(DATA_LENGTH/1024/1024, 2) AS DATA_SIZE_MB,
            ROUND(INDEX_LENGTH/1024/1024, 2) AS INDEX_SIZE_MB,
            ROUND((DATA_LENGTH+INDEX_LENGTH)/1024/1024, 2) AS TOTAL_SIZE_MB,
            TABLE_ROWS
        FROM 
            INFORMATION_SCHEMA.TABLES 
        WHERE 
            TABLE_SCHEMA NOT IN ('information_schema', 'performance_schema', 'mysql', 'sys');
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO schema_name, table_name, data_size_mb, index_size_mb, total_size_mb, row_count;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        INSERT INTO data_growth_monitor (
            table_name, schema_name, data_size_mb, index_size_mb, total_size_mb, row_count, record_date
        ) VALUES (
            table_name, schema_name, data_size_mb, index_size_mb, total_size_mb, row_count, CURDATE()
        );
    END LOOP;
    
    CLOSE cur;
END //
DELIMITER ;

-- 创建事件定期收集数据
CREATE EVENT data_growth_event
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_DATE
DO CALL collect_data_growth();
```

#### 2.1.2 增长预测查询

```sql
-- 查看数据增长趋势
SELECT 
    table_name,
    schema_name,
    record_date,
    total_size_mb,
    row_count,
    LAG(total_size_mb) OVER (PARTITION BY table_name ORDER BY record_date) AS prev_size_mb,
    total_size_mb - LAG(total_size_mb) OVER (PARTITION BY table_name ORDER BY record_date) AS growth_mb,
    LAG(row_count) OVER (PARTITION BY table_name ORDER BY record_date) AS prev_row_count,
    row_count - LAG(row_count) OVER (PARTITION BY table_name ORDER BY record_date) AS growth_rows
FROM 
    data_growth_monitor
WHERE 
    record_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
ORDER BY 
    table_name, record_date;

-- 预测未来30天的数据增长
WITH growth_rates AS (
    SELECT 
        table_name,
        schema_name,
        AVG(total_size_mb - LAG(total_size_mb) OVER (PARTITION BY table_name ORDER BY record_date)) AS avg_daily_growth_mb,
        AVG(row_count - LAG(row_count) OVER (PARTITION BY table_name ORDER BY record_date)) AS avg_daily_growth_rows
    FROM 
        data_growth_monitor
    WHERE 
        record_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY 
        table_name, schema_name
)
SELECT 
    t.table_name,
    t.schema_name,
    t.total_size_mb AS current_size_mb,
    t.row_count AS current_rows,
    g.avg_daily_growth_mb,
    g.avg_daily_growth_rows,
    t.total_size_mb + (g.avg_daily_growth_mb * 30) AS predicted_size_mb_30d,
    t.row_count + (g.avg_daily_growth_rows * 30) AS predicted_rows_30d
FROM 
    (SELECT table_name, schema_name, total_size_mb, row_count 
     FROM data_growth_monitor 
     WHERE record_date = CURDATE()) t
JOIN 
    growth_rates g ON t.table_name = g.table_name AND t.schema_name = g.schema_name
ORDER BY 
    g.avg_daily_growth_mb DESC;
```

### 2.2 容量规划策略

#### 2.2.1 磁盘容量规划

```bash
#!/bin/bash
# MySQL磁盘容量规划脚本

MYSQL_USER="admin"
MYSQL_PASS="password"
MYSQL_HOST="localhost"
DATA_DIR=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'datadir';" | awk 'NR==2 {print $2}')
ALERT_THRESHOLD=80
PREDICTION_DAYS=90

# 获取当前磁盘使用情况
get_disk_usage() {
    df -h $DATA_DIR | awk 'NR==2 {print $5}' | sed 's/%//'
}

# 获取数据增长趋势
get_data_growth() {
    # 查询最近30天的平均每日增长
    mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "
    WITH growth_rates AS (
        SELECT 
            AVG(total_size_mb - LAG(total_size_mb) OVER (ORDER BY record_date)) AS avg_daily_growth_mb
        FROM 
            data_growth_monitor
        WHERE 
            record_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    )
    SELECT avg_daily_growth_mb FROM growth_rates;
    " | tail -n +2
}

# 预测磁盘使用率
predict_disk_usage() {
    local current_usage=$1
    local daily_growth_mb=$2
    local disk_size_gb=$(df -h $DATA_DIR | awk 'NR==2 {print $2}' | sed 's/G//')
    local disk_size_mb=$((disk_size_gb * 1024))
    local current_used_mb=$((current_usage * disk_size_mb / 100))
    local predicted_used_mb=$((current_used_mb + (daily_growth_mb * PREDICTION_DAYS)))
    local predicted_usage=$((predicted_used_mb * 100 / disk_size_mb))
    
    echo $predicted_usage
}

# 主函数
main() {
    echo "MySQL磁盘容量规划报告"
    echo "======================="
    echo "日期: $(date)"
    echo ""
    
    # 当前磁盘使用情况
    current_usage=$(get_disk_usage)
    echo "当前磁盘使用率: $current_usage%"
    
    if [ $current_usage -gt $ALERT_THRESHOLD ]; then
        echo "警告: 当前磁盘使用率已超过阈值 ($ALERT_THRESHOLD%)"
    fi
    
    # 数据增长趋势
    daily_growth_mb=$(get_data_growth)
    echo "平均每日数据增长: ${daily_growth_mb}MB"
    
    # 预测未来使用率
    predicted_usage=$(predict_disk_usage $current_usage $daily_growth_mb)
    echo "预测${PREDICTION_DAYS}天后磁盘使用率: ${predicted_usage}%"
    
    if [ $predicted_usage -gt $ALERT_THRESHOLD ]; then
        echo "警告: 预测${PREDICTION_DAYS}天后磁盘使用率将超过阈值 ($ALERT_THRESHOLD%)"
        echo "建议: 考虑扩展磁盘容量或清理数据"
    fi
    
    echo ""
    echo "建议措施:"
    echo "1. 监控数据增长趋势"
    echo "2. 定期清理过期数据"
    echo "3. 考虑数据归档策略"
    echo "4. 规划磁盘扩容时间点"
}

main
```

#### 2.2.2 内存容量规划

```sql
-- 查看内存使用情况
SELECT 
    VARIABLE_NAME,
    VARIABLE_VALUE,
    ROUND(VARIABLE_VALUE / 1024 / 1024, 2) AS VALUE_MB,
    ROUND(VARIABLE_VALUE / 1024 / 1024 / 1024, 2) AS VALUE_GB
FROM 
    INFORMATION_SCHEMA.GLOBAL_VARIABLES 
WHERE 
    VARIABLE_NAME IN (
        'innodb_buffer_pool_size',
        'innodb_log_buffer_size',
        'key_buffer_size',
        'sort_buffer_size',
        'read_buffer_size',
        'read_rnd_buffer_size',
        'tmp_table_size',
        'max_heap_table_size'
    )
ORDER BY 
    VARIABLE_VALUE DESC;

-- 计算内存使用率
SELECT 
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'innodb_buffer_pool_size') / 1024 / 1024 / 1024, 2) AS innodb_buffer_pool_gb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'innodb_log_buffer_size') / 1024 / 1024, 2) AS innodb_log_buffer_mb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'key_buffer_size') / 1024 / 1024, 2) AS key_buffer_mb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'sort_buffer_size') / 1024 / 1024, 2) AS sort_buffer_mb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'read_buffer_size') / 1024 / 1024, 2) AS read_buffer_mb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'read_rnd_buffer_size') / 1024 / 1024, 2) AS read_rnd_buffer_mb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'tmp_table_size') / 1024 / 1024, 2) AS tmp_table_mb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES WHERE VARIABLE_NAME = 'max_heap_table_size') / 1024 / 1024, 2) AS max_heap_table_mb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_pages_data') * 16384 / 1024 / 1024 / 1024, 2) AS innodb_buffer_pool_data_gb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_pages_total') * 16384 / 1024 / 1024 / 1024, 2) AS innodb_buffer_pool_total_gb,
    ROUND((SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_pages_data') * 100.0 / (SELECT VARIABLE_VALUE FROM INFORMATION_SCHEMA.GLOBAL_STATUS WHERE VARIABLE_NAME = 'Innodb_buffer_pool_pages_total'), 2) AS innodb_buffer_pool_usage_percent;
```

### 2.3 性能容量规划

#### 2.3.1 连接数规划

```sql
-- 查看连接数使用情况
SELECT 
    VARIABLE_NAME,
    VARIABLE_VALUE
FROM 
    INFORMATION_SCHEMA.GLOBAL_VARIABLES 
WHERE 
    VARIABLE_NAME IN ('max_connections', 'max_user_connections');

-- 查看连接数历史趋势
SELECT 
    DATE(record_time) AS date,
    MAX(Threads_connected) AS max_connections,
    AVG(Threads_connected) AS avg_connections,
    MAX(Threads_running) AS max_running,
    AVG(Threads_running) AS avg_running
FROM 
    connection_history
WHERE 
    record_time >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY 
    DATE(record_time)
ORDER BY 
    date DESC;
```

#### 2.3.2 查询性能规划

```sql
-- 查看查询性能趋势
SELECT 
    DATE(record_time) AS date,
    SUM(questions) AS total_queries,
    AVG(questions) AS avg_queries_per_hour,
    SUM(slow_queries) AS total_slow_queries,
    AVG(slow_queries) AS avg_slow_queries_per_hour,
    ROUND(SUM(slow_queries) * 100.0 / SUM(questions), 2) AS slow_query_percentage
FROM 
    query_performance_history
WHERE 
    record_time >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY 
    DATE(record_time)
ORDER BY 
    date DESC;
```

## 3. 变更管理

### 3.1 变更流程

#### 3.1.1 变更请求

```sql
-- 创建变更请求表
CREATE TABLE change_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    change_type ENUM('SCHEMA', 'CONFIG', 'UPGRADE', 'SECURITY', 'OTHER') NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL,
    requester VARCHAR(100) NOT NULL,
    approver VARCHAR(100),
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'IMPLEMENTED', 'ROLLED_BACK') DEFAULT 'PENDING',
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    planned_date TIMESTAMP NULL,
    implementation_date TIMESTAMP NULL,
    rollback_date TIMESTAMP NULL,
    implementation_details TEXT,
    rollback_details TEXT,
    test_results TEXT,
    notes TEXT
);

-- 创建变更任务表
CREATE TABLE change_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    change_request_id INT NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    task_type ENUM('SQL', 'COMMAND', 'MANUAL') NOT NULL,
    task_order INT NOT NULL,
    task_content TEXT NOT NULL,
    rollback_content TEXT,
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ROLLED_BACK') DEFAULT 'PENDING',
    start_time TIMESTAMP NULL,
    end_time TIMESTAMP NULL,
    error_message TEXT,
    FOREIGN KEY (change_request_id) REFERENCES change_requests(id) ON DELETE CASCADE
);
```

#### 3.1.2 变更实施

```sql
-- 创建变更实施存储过程
DELIMITER //
CREATE PROCEDURE implement_change(
    IN p_change_id INT,
    IN p_implementer VARCHAR(100)
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE task_id INT;
    DECLARE task_name VARCHAR(255);
    DECLARE task_type VARCHAR(20);
    DECLARE task_content TEXT;
    DECLARE rollback_content TEXT;
    
    DECLARE cur CURSOR FOR 
        SELECT id, task_name, task_type, task_content, rollback_content
        FROM change_tasks
        WHERE change_request_id = p_change_id
        ORDER BY task_order;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        -- 记录错误并回滚
        UPDATE change_requests 
        SET status = 'FAILED', notes = CONCAT('Error during implementation: ', ERROR_MESSAGE())
        WHERE id = p_change_id;
        
        -- 执行回滚任务
        CALL rollback_change(p_change_id, p_implementer);
        
        RESIGNAL;
    END;
    
    -- 更新变更请求状态
    UPDATE change_requests 
    SET status = 'IMPLEMENTED', implementation_date = NOW()
    WHERE id = p_change_id;
    
    -- 开始事务
    START TRANSACTION;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO task_id, task_name, task_type, task_content, rollback_content;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- 更新任务状态为进行中
        UPDATE change_tasks 
        SET status = 'IN_PROGRESS', start_time = NOW()
        WHERE id = task_id;
        
        -- 执行任务
        CASE task_type
            WHEN 'SQL' THEN
                SET @sql = task_content;
                PREPARE stmt FROM @sql;
                EXECUTE stmt;
                DEALLOCATE PREPARE stmt;
            WHEN 'COMMAND' THEN
                -- 这里需要外部程序执行系统命令
                SELECT CONCAT('Execute command: ', task_content) AS message;
            WHEN 'MANUAL' THEN
                -- 手动任务，需要人工确认
                SELECT CONCAT('Manual task: ', task_name) AS message;
        END CASE;
        
        -- 更新任务状态为完成
        UPDATE change_tasks 
        SET status = 'COMPLETED', end_time = NOW()
        WHERE id = task_id;
    END LOOP;
    
    CLOSE cur;
    
    -- 提交事务
    COMMIT;
END //
DELIMITER ;
```

#### 3.1.3 变更回滚

```sql
-- 创建变更回滚存储过程
DELIMITER //
CREATE PROCEDURE rollback_change(
    IN p_change_id INT,
    IN p_implementer VARCHAR(100)
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE task_id INT;
    DECLARE task_name VARCHAR(255);
    DECLARE task_type VARCHAR(20);
    DECLARE rollback_content TEXT;
    
    DECLARE cur CURSOR FOR 
        SELECT id, task_name, task_type, rollback_content
        FROM change_tasks
        WHERE change_request_id = p_change_id
        ORDER BY task_order DESC;  -- 逆序执行回滚
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        -- 记录错误
        UPDATE change_requests 
        SET status = 'FAILED', notes = CONCAT('Error during rollback: ', ERROR_MESSAGE())
        WHERE id = p_change_id;
        RESIGNAL;
    END;
    
    -- 更新变更请求状态
    UPDATE change_requests 
    SET status = 'ROLLED_BACK', rollback_date = NOW()
    WHERE id = p_change_id;
    
    -- 开始事务
    START TRANSACTION;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO task_id, task_name, task_type, rollback_content;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- 更新任务状态为进行中
        UPDATE change_tasks 
        SET status = 'IN_PROGRESS', start_time = NOW()
        WHERE id = task_id;
        
        -- 执行回滚任务
        IF rollback_content IS NOT NULL AND rollback_content != '' THEN
            CASE task_type
                WHEN 'SQL' THEN
                    SET @sql = rollback_content;
                    PREPARE stmt FROM @sql;
                    EXECUTE stmt;
                    DEALLOCATE PREPARE stmt;
                WHEN 'COMMAND' THEN
                    -- 这里需要外部程序执行系统命令
                    SELECT CONCAT('Execute rollback command: ', rollback_content) AS message;
                WHEN 'MANUAL' THEN
                    -- 手动任务，需要人工确认
                    SELECT CONCAT('Manual rollback task: ', task_name) AS message;
            END CASE;
        END IF;
        
        -- 更新任务状态为已回滚
        UPDATE change_tasks 
        SET status = 'ROLLED_BACK', end_time = NOW()
        WHERE id = task_id;
    END LOOP;
    
    CLOSE cur;
    
    -- 提交事务
    COMMIT;
END //
DELIMITER ;
```

### 3.2 变更类型

#### 3.2.1 模式变更

```sql
-- 创建模式变更检查清单
CREATE TABLE schema_change_checklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    change_request_id INT NOT NULL,
    check_item VARCHAR(255) NOT NULL,
    check_result ENUM('PASS', 'FAIL', 'NA') NOT NULL,
    notes TEXT,
    FOREIGN KEY (change_request_id) REFERENCES change_requests(id) ON DELETE CASCADE
);

-- 模式变更前检查
DELIMITER //
CREATE PROCEDURE pre_schema_change_check(
    IN p_change_id INT,
    IN p_database_name VARCHAR(64),
    IN p_table_name VARCHAR(64),
    IN p_change_type VARCHAR(50)
)
BEGIN
    DECLARE check_count INT DEFAULT 0;
    
    -- 检查表是否存在
    IF p_table_name IS NOT NULL THEN
        SELECT COUNT(*) INTO check_count
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = p_database_name AND TABLE_NAME = p_table_name;
        
        INSERT INTO schema_change_checklist (change_request_id, check_item, check_result, notes)
        VALUES (p_change_id, 'Table exists', IF(check_count > 0, 'PASS', 'FAIL'), 
                CONCAT('Table ', p_table_name, ' in database ', p_database_name));
    END IF;
    
    -- 检查表大小
    IF p_table_name IS NOT NULL THEN
        SELECT ROUND((DATA_LENGTH + INDEX_LENGTH)/1024/1024, 2) INTO check_count
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = p_database_name AND TABLE_NAME = p_table_name;
        
        INSERT INTO schema_change_checklist (change_request_id, check_item, check_result, notes)
        VALUES (p_change_id, 'Table size check', IF(check_count < 1000, 'PASS', 'FAIL'), 
                CONCAT('Table size: ', check_count, ' MB'));
    END IF;
    
    -- 检查是否有外键约束
    IF p_table_name IS NOT NULL AND p_change_type IN ('DROP', 'ALTER') THEN
        SELECT COUNT(*) INTO check_count
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_SCHEMA = p_database_name AND TABLE_NAME = p_table_name
        AND REFERENCED_TABLE_NAME IS NOT NULL;
        
        INSERT INTO schema_change_checklist (change_request_id, check_item, check_result, notes)
        VALUES (p_change_id, 'Foreign key constraints', IF(check_count = 0, 'PASS', 'FAIL'), 
                CONCAT('Foreign key count: ', check_count));
    END IF;
    
    -- 检查是否有触发器
    IF p_table_name IS NOT NULL THEN
        SELECT COUNT(*) INTO check_count
        FROM INFORMATION_SCHEMA.TRIGGERS
        WHERE TRIGGER_SCHEMA = p_database_name AND EVENT_OBJECT_TABLE = p_table_name;
        
        INSERT INTO schema_change_checklist (change_request_id, check_item, check_result, notes)
        VALUES (p_change_id, 'Triggers', IF(check_count = 0, 'PASS', 'FAIL'), 
                CONCAT('Trigger count: ', check_count));
    END IF;
    
    -- 检查是否有索引
    IF p_table_name IS NOT NULL THEN
        SELECT COUNT(*) INTO check_count
        FROM INFORMATION_SCHEMA.STATISTICS
        WHERE TABLE_SCHEMA = p_database_name AND TABLE_NAME = p_table_name;
        
        INSERT INTO schema_change_checklist (change_request_id, check_item, check_result, notes)
        VALUES (p_change_id, 'Indexes', IF(check_count > 0, 'PASS', 'FAIL'), 
                CONCAT('Index count: ', check_count));
    END IF;
END //
DELIMITER ;
```

#### 3.2.2 配置变更

```sql
-- 创建配置变更检查清单
CREATE TABLE config_change_checklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    change_request_id INT NOT NULL,
    config_param VARCHAR(100) NOT NULL,
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    restart_required BOOLEAN DEFAULT FALSE,
    check_result ENUM('PASS', 'FAIL', 'NA') NOT NULL,
    notes TEXT,
    FOREIGN KEY (change_request_id) REFERENCES change_requests(id) ON DELETE CASCADE
);

-- 配置变更前检查
DELIMITER //
CREATE PROCEDURE pre_config_change_check(
    IN p_change_id INT,
    IN p_config_param VARCHAR(100),
    IN p_new_value VARCHAR(255)
)
BEGIN
    DECLARE old_value VARCHAR(255);
    DECLARE restart_required BOOLEAN DEFAULT FALSE;
    DECLARE check_result ENUM('PASS', 'FAIL', 'NA') DEFAULT 'PASS';
    DECLARE notes TEXT DEFAULT '';
    
    -- 获取当前值
    SELECT VARIABLE_VALUE INTO old_value
    FROM INFORMATION_SCHEMA.GLOBAL_VARIABLES
    WHERE VARIABLE_NAME = p_config_param;
    
    -- 检查是否需要重启
    IF p_config_param IN ('innodb_buffer_pool_size', 'innodb_log_file_size', 'port', 'datadir', 'socket') THEN
        SET restart_required = TRUE;
    END IF;
    
    -- 检查参数值是否有效
    CASE p_config_param
        WHEN 'innodb_buffer_pool_size' THEN
            IF CAST(p_new_value AS UNSIGNED) < 536870912 THEN  -- 512MB
                SET check_result = 'FAIL';
                SET notes = 'InnoDB buffer pool size should be at least 512MB';
            END IF;
        WHEN 'max_connections' THEN
            IF CAST(p_new_value AS UNSIGNED) > 100000 THEN
                SET check_result = 'FAIL';
                SET notes = 'Max connections should not exceed 100000';
            END IF;
        WHEN 'query_cache_size' THEN
            IF CAST(p_new_value AS UNSIGNED) > 1073741824 THEN  -- 1GB
                SET check_result = 'FAIL';
                SET notes = 'Query cache size should not exceed 1GB';
            END IF;
    END CASE;
    
    -- 插入检查记录
    INSERT INTO config_change_checklist (
        change_request_id, config_param, old_value, new_value, 
        restart_required, check_result, notes
    ) VALUES (
        p_change_id, p_config_param, old_value, p_new_value, 
        restart_required, check_result, notes
    );
END //
DELIMITER ;
```

### 3.3 变更测试

#### 3.3.1 测试环境准备

```sql
-- 创建测试环境配置表
CREATE TABLE test_environment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    env_name VARCHAR(50) NOT NULL,
    env_type ENUM('DEV', 'TEST', 'STAGING', 'PROD') NOT NULL,
    server_host VARCHAR(100) NOT NULL,
    server_port INT NOT NULL,
    database_name VARCHAR(64) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password_encrypted VARCHAR(255) NOT NULL,
    data_source VARCHAR(50) COMMENT '数据来源: PROD_SNAPSHOT, SANITIZED, SYNTHETIC',
    last_refresh_date TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    notes TEXT
);

-- 创建测试数据同步存储过程
DELIMITER //
CREATE PROCEDURE sync_test_data(
    IN p_env_id INT,
    IN p_sync_type ENUM('FULL', 'INCREMENTAL') DEFAULT 'FULL'
)
BEGIN
    DECLARE prod_server VARCHAR(100);
    DECLARE prod_port INT;
    DECLARE prod_db VARCHAR(64);
    DECLARE prod_user VARCHAR(50);
    DECLARE prod_pass VARCHAR(255);
    
    DECLARE test_server VARCHAR(100);
    DECLARE test_port INT;
    DECLARE test_db VARCHAR(64);
    DECLARE test_user VARCHAR(50);
    DECLARE test_pass VARCHAR(255);
    
    -- 获取生产环境信息
    SELECT server_host, server_port, database_name, username, password_encrypted
    INTO prod_server, prod_port, prod_db, prod_user, prod_pass
    FROM test_environment
    WHERE env_type = 'PROD' AND is_active = TRUE
    LIMIT 1;
    
    -- 获取测试环境信息
    SELECT server_host, server_port, database_name, username, password_encrypted
    INTO test_server, test_port, test_db, test_user, test_pass
    FROM test_environment
    WHERE id = p_env_id;
    
    -- 根据同步类型执行不同操作
    IF p_sync_type = 'FULL' THEN
        -- 全量同步：使用mysqldump
        SET @cmd = CONCAT('mysqldump -h', prod_server, ' -P', prod_port, 
                         ' -u', prod_user, ' -p', prod_pass, ' ', prod_db,
                         ' | mysql -h', test_server, ' -P', test_port,
                         ' -u', test_user, ' -p', test_pass, ' ', test_db);
        
        -- 这里需要外部程序执行命令
        SELECT CONCAT('Execute: ', @cmd) AS command;
    ELSE
        -- 增量同步：使用二进制日志
        -- 这里需要更复杂的逻辑来应用增量变更
        SELECT 'Incremental sync not implemented yet' AS message;
    END IF;
    
    -- 更新最后刷新时间
    UPDATE test_environment
    SET last_refresh_date = NOW()
    WHERE id = p_env_id;
END //
DELIMITER ;
```

#### 3.3.2 变更测试执行

```sql
-- 创建变更测试记录表
CREATE TABLE change_test_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    change_request_id INT NOT NULL,
    test_environment_id INT NOT NULL,
    test_type ENUM('FUNCTIONAL', 'PERFORMANCE', 'SECURITY', 'REGRESSION') NOT NULL,
    test_name VARCHAR(255) NOT NULL,
    test_status ENUM('PASS', 'FAIL', 'SKIPPED') NOT NULL,
    test_start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    test_end_time TIMESTAMP NULL,
    test_duration INT COMMENT 'Duration in seconds',
    test_output TEXT,
    test_metrics JSON,
    tester VARCHAR(100),
    FOREIGN KEY (change_request_id) REFERENCES change_requests(id) ON DELETE CASCADE,
    FOREIGN KEY (test_environment_id) REFERENCES test_environment(id) ON DELETE CASCADE
);

-- 创建性能基准测试存储过程
DELIMITER //
CREATE PROCEDURE run_performance_benchmark(
    IN p_change_id INT,
    IN p_env_id INT,
    IN p_test_name VARCHAR(255)
)
BEGIN
    DECLARE test_id INT;
    DECLARE start_time TIMESTAMP DEFAULT NOW(3);
    DECLARE end_time TIMESTAMP;
    DECLARE duration INT;
    
    -- 插入测试记录
    INSERT INTO change_test_results (
        change_request_id, test_environment_id, test_type, test_name, test_status, tester
    ) VALUES (
        p_change_id, p_env_id, 'PERFORMANCE', p_test_name, 'PASS', CURRENT_USER()
    );
    
    SET test_id = LAST_INSERT_ID();
    
    -- 执行性能测试
    -- 这里可以根据实际需求实现具体的性能测试逻辑
    -- 例如：执行一组查询并测量响应时间
    
    -- 模拟性能测试
    SELECT SLEEP(1);  -- 模拟1秒的测试
    
    SET end_time = NOW(3);
    SET duration = TIMESTAMPDIFF(MICROSECOND, start_time, end_time) / 1000;
    
    -- 更新测试结果
    UPDATE change_test_results
    SET test_end_time = end_time,
        test_duration = duration,
        test_metrics = JSON_OBJECT(
            'query_count', 100,
            'avg_response_time_ms', 50,
            'max_response_time_ms', 200,
            'min_response_time_ms', 5
        )
    WHERE id = test_id;
END //
DELIMITER ;
```

## 4. 自动化运维

### 4.1 自动化备份

#### 4.1.1 自动备份脚本

```bash
#!/bin/bash
# MySQL自动备份脚本

# 配置参数
MYSQL_USER="backup_user"
MYSQL_PASS="backup_password"
MYSQL_HOST="localhost"
BACKUP_DIR="/backup/mysql"
RETENTION_DAYS=30
LOG_FILE="/var/log/mysql/backup.log"
DATE=$(date +"%Y%m%d_%H%M%S")
EMAIL="admin@example.com"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 记录日志函数
log() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" >> $LOG_FILE
}

# 发送邮件函数
send_email() {
    local subject=$1
    local message=$2
    echo "$message" | mail -s "$subject" $EMAIL
}

# 全量备份函数
full_backup() {
    local backup_file="$BACKUP_DIR/full_backup_$DATE.sql.gz"
    
    log "开始全量备份"
    
    # 执行备份
    mysqldump -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST \
        --single-transaction \
        --routines \
        --triggers \
        --events \
        --all-databases | gzip > $backup_file
    
    if [ $? -eq 0 ]; then
        local file_size=$(du -h $backup_file | awk '{print $1}')
        log "全量备份成功: $backup_file (大小: $file_size)"
        return 0
    else
        log "全量备份失败"
        send_email "MySQL备份失败" "全量备份失败，请检查日志"
        return 1
    fi
}

# 增量备份函数
incremental_backup() {
    local backup_file="$BACKUP_DIR/incremental_backup_$DATE.sql.gz"
    
    log "开始增量备份"
    
    # 获取最后一个二进制日志位置
    local last_binlog=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW MASTER STATUS;" | awk 'NR==2 {print $1}')
    local last_position=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW MASTER STATUS;" | awk 'NR==2 {print $2}')
    
    # 备份二进制日志
    mysqlbinlog -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST \
        --read-from-remote-server \
        --raw \
        --stop-never \
        $last_binlog
    
    if [ $? -eq 0 ]; then
        log "增量备份成功: $last_binlog (位置: $last_position)"
        return 0
    else
        log "增量备份失败"
        send_email "MySQL增量备份失败" "增量备份失败，请检查日志"
        return 1
    fi
}

# 清理旧备份函数
cleanup_old_backups() {
    log "开始清理 $RETENTION_DAYS 天前的备份"
    
    # 删除旧的全量备份
    find $BACKUP_DIR -name "full_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    
    # 删除旧的增量备份
    find $BACKUP_DIR -name "incremental_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    
    # 删除旧的二进制日志
    find $BACKUP_DIR -name "mysql-bin.*" -mtime +$RETENTION_DAYS -delete
    
    log "旧备份清理完成"
}

# 验证备份函数
verify_backup() {
    local backup_file=$1
    
    log "验证备份: $backup_file"
    
    # 检查文件是否存在
    if [ ! -f "$backup_file" ]; then
        log "备份文件不存在: $backup_file"
        return 1
    fi
    
    # 检查文件大小
    local file_size=$(stat -c%s "$backup_file")
    if [ $file_size -lt 1024 ]; then
        log "备份文件过小: $backup_file ($file_size bytes)"
        return 1
    fi
    
    # 检查文件完整性
    if gzip -t "$backup_file" 2>/dev/null; then
        log "备份验证成功: $backup_file"
        return 0
    else
        log "备份验证失败: $backup_file"
        return 1
    fi
}

# 主函数
main() {
    local backup_type=${1:-"full"}
    
    log "开始备份 (类型: $backup_type)"
    
    case $backup_type in
        "full")
            full_backup
            if [ $? -eq 0 ]; then
                verify_backup "$BACKUP_DIR/full_backup_$DATE.sql.gz"
            fi
            ;;
        "incremental")
            incremental_backup
            ;;
        *)
            log "未知的备份类型: $backup_type"
            exit 1
            ;;
    esac
    
    cleanup_old_backups
    
    log "备份完成"
}

# 执行备份
main $1
```

#### 4.1.2 自动备份调度

```bash
#!/bin/bash
# MySQL备份调度脚本

# 配置参数
BACKUP_SCRIPT="/usr/local/bin/mysql_backup.sh"
LOG_FILE="/var/log/mysql/backup_scheduler.log"
FULL_BACKUP_DAY="Sunday"  # 每周日全量备份
FULL_BACKUP_TIME="02:00"   # 凌晨2点执行

# 记录日志函数
log() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" >> $LOG_FILE
}

# 检查是否是全量备份日
is_full_backup_day() {
    local today=$(date +"%A")
    if [ "$today" = "$FULL_BACKUP_DAY" ]; then
        return 0
    else
        return 1
    fi
}

# 主函数
main() {
    log "备份调度检查"
    
    # 检查当前时间是否是备份时间
    local current_time=$(date +"%H:%M")
    if [ "$current_time" = "$FULL_BACKUP_TIME" ]; then
        if is_full_backup_day; then
            log "执行全量备份"
            $BACKUP_SCRIPT full
        else
            log "执行增量备份"
            $BACKUP_SCRIPT incremental
        fi
    else
        log "当前时间不是备份时间 ($current_time != $FULL_BACKUP_TIME)"
    fi
}

main
```

### 4.2 自动化监控

#### 4.2.1 监控脚本

```bash
#!/bin/bash
# MySQL自动化监控脚本

# 配置参数
MYSQL_USER="monitor"
MYSQL_PASS="monitor_password"
MYSQL_HOST="localhost"
LOG_FILE="/var/log/mysql/monitor.log"
ALERT_EMAIL="admin@example.com"
METRICS_DB="monitoring"
METRICS_TABLE="mysql_metrics"

# 记录日志函数
log() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" >> $LOG_FILE
}

# 发送告警函数
send_alert() {
    local subject=$1
    local message=$2
    log "发送告警: $subject"
    echo "$message" | mail -s "$subject" $ALERT_EMAIL
}

# 收集指标函数
collect_metrics() {
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    
    # 连接数
    local connections=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Threads_connected';" | awk 'NR==2 {print $2}')
    
    # 查询数
    local queries=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Questions';" | awk 'NR==2 {print $2}')
    
    # 慢查询数
    local slow_queries=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Slow_queries';" | awk 'NR==2 {print $2}')
    
    # QPS
    local qps=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW GLOBAL STATUS LIKE 'Queries';" | awk 'NR==2 {print $2}')
    local uptime=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Uptime';" | awk 'NR==2 {print $2}')
    local qps_value=$((qps / uptime))
    
    # 缓冲池命中率
    local buffer_pool_reads=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Innodb_buffer_pool_reads';" | awk 'NR==2 {print $2}')
    local buffer_pool_read_requests=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW STATUS LIKE 'Innodb_buffer_pool_read_requests';" | awk 'NR==2 {print $2}')
    local buffer_pool_hit_rate=$(echo "scale=2; (1 - $buffer_pool_reads / $buffer_pool_read_requests) * 100" | bc)
    
    # 存储到数据库
    mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "
    INSERT INTO $METRICS_DB.$METRICS_TABLE (
        timestamp, connections, queries, slow_queries, qps, buffer_pool_hit_rate
    ) VALUES (
        '$timestamp', $connections, $queries, $slow_queries, $qps_value, $buffer_pool_hit_rate
    );"
    
    # 返回指标
    echo "$connections,$queries,$slow_queries,$qps_value,$buffer_pool_hit_rate"
}

# 检查指标函数
check_metrics() {
    local metrics=$1
    local connections=$(echo $metrics | cut -d',' -f1)
    local queries=$(echo $metrics | cut -d',' -f2)
    local slow_queries=$(echo $metrics | cut -d',' -f3)
    local qps=$(echo $metrics | cut -d',' -f4)
    local buffer_pool_hit_rate=$(echo $metrics | cut -d',' -f5)
    
    # 检查连接数
    local max_connections=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'max_connections';" | awk 'NR==2 {print $2}')
    local connection_percentage=$((connections * 100 / max_connections))
    
    if [ $connection_percentage -gt 80 ]; then
        send_alert "MySQL连接数告警" "当前连接数: $connections/$max_connections ($connection_percentage%)"
    fi
    
    # 检查慢查询
    if [ $slow_queries -gt 10 ]; then
        send_alert "MySQL慢查询告警" "当前慢查询数: $slow_queries"
    fi
    
    # 检查缓冲池命中率
    if (( $(echo "$buffer_pool_hit_rate < 95" | bc -l) )); then
        send_alert "MySQL缓冲池命中率告警" "当前命中率: $buffer_pool_hit_rate%"
    fi
}

# 主函数
main() {
    log "开始监控检查"
    
    # 收集指标
    local metrics=$(collect_metrics)
    
    # 检查指标
    check_metrics $metrics
    
    log "监控检查完成"
}

main
```

#### 4.2.2 自动化告警

```bash
#!/bin/bash
# MySQL自动化告警脚本

# 配置参数
MYSQL_USER="monitor"
MYSQL_PASS="monitor_password"
MYSQL_HOST="localhost"
LOG_FILE="/var/log/mysql/alert.log"
ALERT_EMAIL="admin@example.com"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

# 记录日志函数
log() {
    echo "[$(date +"%Y-%m-%d %H:%M:%S")] $1" >> $LOG_FILE
}

# 发送邮件告警函数
send_email_alert() {
    local subject=$1
    local message=$2
    log "发送邮件告警: $subject"
    echo "$message" | mail -s "$subject" $ALERT_EMAIL
}

# 发送Slack告警函数
send_slack_alert() {
    local message=$1
    local color=${2:-"danger"}  # danger, warning, good
    
    log "发送Slack告警: $message"
    
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"attachments\":[{\"color\":\"$color\",\"text\":\"$message\"}]}" \
        $SLACK_WEBHOOK
}

# 检查复制状态函数
check_replication_status() {
    local is_slave=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'have_slave_running';" | awk 'NR==2 {print $2}')
    
    if [ "$is_slave" = "ON" ]; then
        local slave_io=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW SLAVE STATUS\G" | grep "Slave_IO_Running:" | awk '{print $2}')
        local slave_sql=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW SLAVE STATUS\G" | grep "Slave_SQL_Running:" | awk '{print $2}')
        local seconds_behind=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW SLAVE STATUS\G" | grep "Seconds_Behind_Master:" | awk '{print $2}')
        
        if [ "$slave_io" != "Yes" ] || [ "$slave_sql" != "Yes" ]; then
            local message="复制状态异常: IO线程=$slave_io, SQL线程=$slave_sql"
            send_email_alert "MySQL复制告警" "$message"
            send_slack_alert "$message"
        fi
        
        if [ "$seconds_behind" != "NULL" ] && [ $seconds_behind -gt 300 ]; then
            local message="复制延迟过高: $seconds_behind 秒"
            send_email_alert "MySQL复制延迟告警" "$message"
            send_slack_alert "$message" "warning"
        fi
    fi
}

# 检查磁盘空间函数
check_disk_space() {
    local data_dir=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'datadir';" | awk 'NR==2 {print $2}')
    local disk_usage=$(df -h $data_dir | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ $disk_usage -gt 80 ]; then
        local message="数据目录磁盘使用率过高: $disk_usage%"
        send_email_alert "MySQL磁盘空间告警" "$message"
        send_slack_alert "$message"
    fi
}

# 检查错误日志函数
check_error_log() {
    local error_log=$(mysql -u$MYSQL_USER -p$MYSQL_PASS -h$MYSQL_HOST -e "SHOW VARIABLES LIKE 'log_error';" | awk 'NR==2 {print $2}')
    local error_count=$(grep -c "Error" $error_log)
    local warning_count=$(grep -c "Warning" $error_log)
    
    if [ $error_count -gt 0 ]; then
        local message="发现 $error_count 个错误"
        send_email_alert "MySQL错误日志告警" "$message"
        send_slack_alert "$message"
    fi
    
    if [ $warning_count -gt 10 ]; then
        local message="发现 $warning_count 个警告"
        send_email_alert "MySQL警告日志告警" "$message"
        send_slack_alert "$message" "warning"
    fi
}

# 主函数
main() {
    log "开始告警检查"
    
    # 检查复制状态
    check_replication_status
    
    # 检查磁盘空间
    check_disk_space
    
    # 检查错误日志
    check_error_log
    
    log "告警检查完成"
}

main
```

### 4.3 自动化运维平台

#### 4.3.1 运维平台架构

```yaml
# docker-compose.yml
version: '3.7'

services:
  # MySQL监控服务
  mysql-monitor:
    image: mysql:8.0
    container_name: mysql-monitor
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: monitoring
      MYSQL_USER: monitor
      MYSQL_PASSWORD: monitor_password
    volumes:
      - ./monitoring:/docker-entrypoint-initdb.d
      - mysql_monitor_data:/var/lib/mysql
    networks:
      - mysql_ops

  # Grafana可视化服务
  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin_password
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources
    networks:
      - mysql_ops

  # Prometheus监控服务
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    networks:
      - mysql_ops

  # MySQL Exporter
  mysql-exporter:
    image: prom/mysqld-exporter:latest
    container_name: mysql-exporter
    environment:
      DATA_SOURCE_NAME: "monitor:monitor_password@(mysql:3306)/"
    ports:
      - "9104:9104"
    networks:
      - mysql_ops

  # 运维Web应用
  mysql-ops-web:
    build: ./web
    container_name: mysql-ops-web
    ports:
      - "8080:8080"
    environment:
      DB_HOST: mysql-monitor
      DB_USER: monitor
      DB_PASSWORD: monitor_password
      DB_NAME: monitoring
    depends_on:
      - mysql-monitor
    networks:
      - mysql_ops

volumes:
  mysql_monitor_data:
  grafana_data:
  prometheus_data:

networks:
  mysql_ops:
    driver: bridge
```

#### 4.3.2 运维Web应用

```python
# app.py - Flask运维Web应用
from flask import Flask, render_template, request, jsonify, redirect, url_for
import mysql.connector
import json
from datetime import datetime, timedelta
import subprocess
import os

app = Flask(__name__)

# 数据库配置
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'user': os.environ.get('DB_USER', 'monitor'),
    'password': os.environ.get('DB_PASSWORD', 'monitor_password'),
    'database': os.environ.get('DB_NAME', 'monitoring')
}

def get_db_connection():
    """获取数据库连接"""
    return mysql.connector.connect(**DB_CONFIG)

@app.route('/')
def index():
    """首页"""
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    """仪表板"""
    return render_template('dashboard.html')

@app.route('/api/metrics')
def get_metrics():
    """获取指标数据"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # 获取最近24小时的指标
    cursor.execute("""
        SELECT * FROM mysql_metrics 
        WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ORDER BY timestamp ASC
    """)
    
    metrics = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(metrics)

@app.route('/api/alerts')
def get_alerts():
    """获取告警信息"""
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    # 获取最近的告警
    cursor.execute("""
        SELECT * FROM alerts 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY created_at DESC
        LIMIT 50
    """)
    
    alerts = cursor.fetchall()
    
    cursor.close()
    conn.close()
    
    return jsonify(alerts)

@app.route('/backup')
def backup():
    """备份页面"""
    return render_template('backup.html')

@app.route('/api/backup', methods=['POST'])
def create_backup():
    """创建备份"""
    backup_type = request.json.get('type', 'full')
    
    # 调用备份脚本
    try:
        result = subprocess.run(
            ['/usr/local/bin/mysql_backup.sh', backup_type],
            capture_output=True,
            text=True,
            timeout=3600  # 1小时超时
        )
        
        if result.returncode == 0:
            return jsonify({
                'status': 'success',
                'message': '备份创建成功',
                'output': result.stdout
            })
        else
            return jsonify({
                'status': 'error',
                'message': '备份创建失败',
                'output': result.stderr
            }), 500
    except subprocess.TimeoutExpired:
        return jsonify({
            'status': 'error',
            'message': '备份超时'
        }), 500
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/maintenance')
def maintenance():
    """维护页面"""
    return render_template('maintenance.html')

@app.route('/api/maintenance/optimize', methods=['POST'])
def optimize_tables():
    """优化表"""
    tables = request.json.get('tables', [])
    
    if not tables:
        return jsonify({
            'status': 'error',
            'message': '未指定表'
        }), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    results = []
    
    for table in tables:
        try:
            cursor.execute(f"OPTIMIZE TABLE {table}")
            result = cursor.fetchone()
            results.append({
                'table': table,
                'status': 'success',
                'message': result[2]  # Msg_type
            })
        except Exception as e:
            results.append({
                'table': table,
                'status': 'error',
                'message': str(e)
            })
    
    cursor.close()
    conn.close()
    
    return jsonify({
        'status': 'success',
        'results': results
    })

@app.route('/api/maintenance/analyze', methods=['POST'])
def analyze_tables():
    """分析表"""
    tables = request.json.get('tables', [])
    
    if not tables:
        return jsonify({
            'status': 'error',
            'message': '未指定表'
        }), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    results = []
    
    for table in tables:
        try:
            cursor.execute(f"ANALYZE TABLE {table}")
            result = cursor.fetchone()
            results.append({
                'table': table,
                'status': 'success',
                'message': result[2]  # Msg_type
            })
        except Exception as e:
            results.append({
                'table': table,
                'status': 'error',
                'message': str(e)
            })
    
    cursor.close()
    conn.close()
    
    return jsonify({
        'status': 'success',
        'results': results
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
```

## 5. 运维文档

### 5.1 运维手册

#### 5.1.1 运维手册结构

```markdown
# MySQL运维手册

## 1. 系统概述

### 1.1 系统架构
- 描述MySQL集群架构
- 服务器配置信息
- 网络拓扑图

### 1.2 数据库环境
- 开发环境
- 测试环境
- 预生产环境
- 生产环境

## 2. 日常运维

### 2.1 每日检查清单
- [ ] 检查MySQL服务状态
- [ ] 检查连接数
- [ ] 检查慢查询
- [ ] 检查复制状态
- [ ] 检查备份状态
- [ ] 检查磁盘空间

### 2.2 每周维护任务
- [ ] 分析表
- [ ] 优化表
- [ ] 检查表
- [ ] 清理日志

### 2.3 每月维护任务
- [ ] 更新统计信息
- [ ] 检查安全更新
- [ ] 容量规划评估
- [ ] 性能趋势分析

## 3. 应急响应

### 3.1 常见问题处理
- 连接问题
- 性能问题
- 复制问题
- 存储问题

### 3.2 故障处理流程
- 问题识别
- 问题分析
- 问题解决
- 问题总结

### 3.3 紧急联系人
- DBA团队
- 系统管理员
- 网络管理员
- 应用开发团队

## 4. 变更管理

### 4.1 变更流程
- 变更请求
- 变更评估
- 变更审批
- 变更实施
- 变更验证

### 4.2 变更类型
- 模式变更
- 配置变更
- 版本升级
- 安全补丁

## 5. 备份与恢复

### 5.1 备份策略
- 全量备份
- 增量备份
- 二进制日志备份

### 5.2 恢复流程
- 完全恢复
- 部分恢复
- 点对点恢复

## 6. 监控与告警

### 6.1 监控指标
- 性能指标
- 可用性指标
- 资源使用指标

### 6.2 告警规则
- 告警级别
- 告警阈值
- 告警通知

## 7. 安全管理

### 7.1 用户管理
- 用户创建
- 权限分配
- 密码策略

### 7.2 安全加固
- 网络安全
- 数据加密
- 审计日志

## 8. 附录

### 8.1 常用命令
### 8.2 配置参数
### 8.3 性能调优
```

#### 5.1.2 运维手册维护

```sql
-- 创建运维手册表
CREATE TABLE operations_manual (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

-- 创建手册更新历史表
CREATE TABLE manual_update_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    manual_id INT NOT NULL,
    old_content TEXT,
    new_content TEXT,
    updated_by VARCHAR(100) NOT NULL,
    update_reason TEXT,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (manual_id) REFERENCES operations_manual(id) ON DELETE CASCADE
);

-- 创建手册更新存储过程
DELIMITER //
CREATE PROCEDURE update_manual_section(
    IN p_section VARCHAR(100),
    IN p_title VARCHAR(255),
    IN p_content TEXT,
    IN p_author VARCHAR(100),
    IN p_reason TEXT
)
BEGIN
    DECLARE manual_id INT;
    DECLARE old_content TEXT;
    
    -- 查找现有手册条目
    SELECT id, content INTO manual_id, old_content
    FROM operations_manual
    WHERE section = p_section AND title = p_title AND is_active = TRUE;
    
    IF manual_id IS NOT NULL THEN
        -- 更新现有条目
        UPDATE operations_manual
        SET content = p_content, author = p_author, version = version + 1, updated_at = NOW()
        WHERE id = manual_id;
        
        -- 记录更新历史
        INSERT INTO manual_update_history (manual_id, old_content, new_content, updated_by, update_reason)
        VALUES (manual_id, old_content, p_content, p_author, p_reason);
    ELSE
        -- 创建新条目
        INSERT INTO operations_manual (section, title, content, author)
        VALUES (p_section, p_title, p_content, p_author);
        
        SET manual_id = LAST_INSERT_ID();
        
        -- 记录创建历史
        INSERT INTO manual_update_history (manual_id, old_content, new_content, updated_by, update_reason)
        VALUES (manual_id, NULL, p_content, p_author, CONCAT('创建新条目: ', p_reason));
    END IF;
    
    SELECT manual_id AS updated_manual_id;
END //
DELIMITER ;
```

### 5.2 知识库

#### 5.2.1 知识库结构

```sql
-- 创建知识库分类表
CREATE TABLE knowledge_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES knowledge_categories(id) ON DELETE SET NULL
);

-- 创建知识库文章表
CREATE TABLE knowledge_articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category_id INT NOT NULL,
    tags VARCHAR(255),
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    view_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES knowledge_categories(id) ON DELETE CASCADE
);

-- 创建知识库评论表
CREATE TABLE knowledge_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    author VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES knowledge_articles(id) ON DELETE CASCADE
);

-- 创建知识库搜索索引表
CREATE TABLE knowledge_search_index (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL,
    word VARCHAR(100) NOT NULL,
    position INT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES knowledge_articles(id) ON DELETE CASCADE
);

-- 创建全文索引更新存储过程
DELIMITER //
CREATE PROCEDURE update_search_index(IN p_article_id INT)
BEGIN
    DECLARE content_text TEXT;
    DECLARE word VARCHAR(100);
    DECLARE position INT DEFAULT 1;
    DECLARE done INT DEFAULT FALSE;
    
    -- 获取文章内容
    SELECT CONCAT(title, ' ', content) INTO content_text
    FROM knowledge_articles
    WHERE id = p_article_id;
    
    -- 删除旧索引
    DELETE FROM knowledge_search_index WHERE article_id = p_article_id;
    
    -- 创建新索引
    -- 这里需要更复杂的分词逻辑，简化示例
    SET @words = 'SELECT word FROM temp_words_table';  -- 假设有临时表存储分词结果
    
    -- 遍历单词并插入索引
    -- 实际实现中需要更复杂的分词算法
END //
DELIMITER ;

-- 创建知识库搜索存储过程
DELIMITER //
CREATE PROCEDURE search_knowledge(IN p_search_term VARCHAR(255))
BEGIN
    -- 简化的搜索实现
    SELECT 
        a.id,
        a.title,
        a.content,
        c.name AS category_name,
        a.author,
        a.created_at,
        MATCH(a.title, a.content) AGAINST(p_search_term) AS relevance
    FROM 
        knowledge_articles a
    JOIN 
        knowledge_categories c ON a.category_id = c.id
    WHERE 
        a.is_published = TRUE
        AND MATCH(a.title, a.content) AGAINST(p_search_term)
    ORDER BY 
        relevance DESC,
        a.created_at DESC;
END //
DELIMITER ;
```

#### 5.2.2 知识库维护

```sql
-- 创建知识库维护计划表
CREATE TABLE knowledge_maintenance_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    task_type ENUM('REVIEW', 'UPDATE', 'ARCHIVE', 'DELETE') NOT NULL,
    schedule_type ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY') NOT NULL,
    schedule_value VARCHAR(50) COMMENT '如每周的星期几，每月的日期等',
    last_run_date TIMESTAMP NULL,
    next_run_date TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT
);

-- 创建知识库维护记录表
CREATE TABLE knowledge_maintenance_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    maintenance_plan_id INT NOT NULL,
    run_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('SUCCESS', 'FAILED', 'PARTIAL') NOT NULL,
    affected_articles INT DEFAULT 0,
    details TEXT,
    FOREIGN KEY (maintenance_plan_id) REFERENCES knowledge_maintenance_plan(id) ON DELETE CASCADE
);

-- 创建知识库维护执行存储过程
DELIMITER //
CREATE PROCEDURE run_knowledge_maintenance()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE plan_id INT;
    DECLARE task_name VARCHAR(255);
    DECLARE task_type VARCHAR(20);
    DECLARE schedule_type VARCHAR(20);
    DECLARE schedule_value VARCHAR(50);
    
    DECLARE cur CURSOR FOR 
        SELECT id, task_name, task_type, schedule_type, schedule_value
        FROM knowledge_maintenance_plan
        WHERE is_active = TRUE AND next_run_date <= NOW();
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    maintenance_loop: LOOP
        FETCH cur INTO plan_id, task_name, task_type, schedule_type, schedule_value;
        IF done THEN
            LEAVE maintenance_loop;
        END IF;
        
        -- 记录维护开始
        INSERT INTO knowledge_maintenance_log (maintenance_plan_id, status, details)
        VALUES (plan_id, 'SUCCESS', CONCAT('开始执行任务: ', task_name));
        
        -- 根据任务类型执行不同操作
        CASE task_type
            WHEN 'REVIEW' THEN
                -- 标记需要审查的文章
                CALL mark_articles_for_review();
            WHEN 'UPDATE' THEN
                -- 更新过期的文章
                CALL update_outdated_articles();
            WHEN 'ARCHIVE' THEN
                -- 归档旧文章
                CALL archive_old_articles();
            WHEN 'DELETE' THEN
                -- 删除不需要的文章
                CALL delete_unnecessary_articles();
        END CASE;
        
        -- 更新下次执行时间
        CALL update_next_run_date(plan_id, schedule_type, schedule_value);
    END LOOP;
    
    CLOSE cur;
END //
DELIMITER ;
```

## 总结

运维最佳实践是确保MySQL数据库系统稳定、高效运行的关键。通过系统化的日常维护、科学的容量规划、规范的变更管理、自动化的运维工具和完善的知识库，可以大大提高数据库运维的效率和质量。

### 关键要点

1. **日常维护**：建立定期的检查和维护机制，及时发现和解决问题。
2. **容量规划**：基于历史数据预测未来需求，提前规划资源扩展。
3. **变更管理**：建立标准化的变更流程，降低变更风险。
4. **自动化运维**：通过脚本和平台减少人工操作，提高效率和一致性。
5. **知识管理**：建立运维手册和知识库，积累和分享运维经验。

通过实施这些最佳实践，可以确保MySQL数据库系统的高可用性、高性能和安全性，为业务系统提供可靠的数据支撑。