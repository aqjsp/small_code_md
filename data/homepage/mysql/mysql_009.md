# 高可用与集群

## 1. 高可用概述

### 1.1 高可用概念

高可用性（High Availability，HA）是指系统在面对各种故障时，能够持续提供服务的能力。对于数据库系统而言，高可用性意味着即使发生硬件故障、软件故障或网络故障，数据库系统仍能继续运行，保证业务的连续性。

### 1.2 高可用指标

衡量高可用性的主要指标包括：

1. **可用性（Availability）**：系统可提供服务的时间比例，通常用百分比表示
   - 99.9%：每年约8.76小时停机时间
   - 99.99%：每年约52.56分钟停机时间
   - 99.999%：每年约5.26分钟停机时间

2. **平均无故障时间（MTBF）**：系统平均运行多长时间才会发生故障

3. **平均修复时间（MTTR）**：系统发生故障后，平均需要多长时间才能恢复

4. **恢复时间目标（RTO）**：业务可接受的最长停机时间

5. **恢复点目标（RPO）**：业务可接受的最大数据丢失量

### 1.3 高可用架构设计原则

1. **冗余设计**：通过冗余组件避免单点故障
2. **故障检测**：及时发现系统故障
3. **故障转移**：自动将服务切换到备用系统
4. **数据一致性**：确保数据在多个节点间的一致性
5. **负载均衡**：合理分配工作负载，避免过载

## 2. MySQL复制

### 2.1 复制概述

MySQL复制是一种将数据从一个MySQL数据库服务器（主服务器）复制到一个或多个MySQL数据库服务器（从服务器）的技术。复制是MySQL实现高可用性和读写分离的基础。

### 2.2 复制类型

#### 2.2.1 基于语句的复制（Statement-Based Replication，SBR）

主服务器记录执行的SQL语句，从服务器重新执行这些语句。

```sql
-- 启用基于语句的复制
SET GLOBAL binlog_format = 'STATEMENT';
```

**优点**：
- 二进制日志文件较小
- 技术成熟，兼容性好

**缺点**：
- 某些函数（如UUID()、NOW()）可能产生不一致结果
- 存储过程和触发器的执行可能不一致
- 对不确定性的SQL语句支持不好

#### 2.2.2 基于行的复制（Row-Based Replication，RBR）

主服务器记录数据行的变化，从服务器应用这些变化。

```sql
-- 启用基于行的复制
SET GLOBAL binlog_format = 'ROW';
```

**优点**：
- 数据一致性更好
- 支持所有SQL语句
- 复制更可靠

**缺点**：
- 二进制日志文件较大
- 需要更多网络带宽
- 无法从二进制日志中直接看到执行的SQL语句

#### 2.2.3 混合复制（Mixed-Based Replication，MBR）

MySQL自动选择基于语句或基于行的复制。

```sql
-- 启用混合复制
SET GLOBAL binlog_format = 'MIXED';
```

### 2.3 复制架构

#### 2.3.1 主从复制（Master-Slave Replication）

最简单的复制架构，一个主服务器，一个或多个从服务器。

```sql
-- 主服务器配置
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW

-- 从服务器配置
[mysqld]
server-id = 2
relay-log = relay-bin
read-only = 1
```

#### 2.3.2 主主复制（Master-Master Replication）

两个服务器互为主从，都可以处理写操作。

```sql
-- 服务器1配置
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW
auto-increment-offset = 1
auto-increment-increment = 2

-- 服务器2配置
[mysqld]
server-id = 2
log-bin = mysql-bin
binlog-format = ROW
auto-increment-offset = 2
auto-increment-increment = 2
```

#### 2.3.3 级联复制（Cascading Replication）

从服务器也可以作为其他从服务器的主服务器。

```
主服务器 -> 从服务器1 -> 从服务器2
             |
             -> 从服务器3
```

### 2.4 配置主从复制

#### 2.4.1 主服务器配置

```sql
-- 创建复制用户
CREATE USER 'repl_user'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'%';
FLUSH PRIVILEGES;

-- 查看主服务器状态
SHOW MASTER STATUS;
```

#### 2.4.2 从服务器配置

```sql
-- 配置复制
CHANGE MASTER TO
    MASTER_HOST='master_ip',
    MASTER_PORT=3306,
    MASTER_USER='repl_user',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=154;

-- 启动复制
START SLAVE;

-- 查看复制状态
SHOW SLAVE STATUS\G
```

### 2.5 复制监控与故障排除

#### 2.5.1 复制监控

```sql
-- 查看从服务器状态
SHOW SLAVE STATUS\G

-- 关键指标
Slave_IO_Running: Yes      -- I/O线程是否运行
Slave_SQL_Running: Yes     -- SQL线程是否运行
Seconds_Behind_Master: 0  -- 延迟时间（秒）
Last_IO_Error:             -- I/O线程错误
Last_SQL_Error:            -- SQL线程错误
```

#### 2.5.2 常见问题与解决方案

1. **复制延迟**
   ```sql
   -- 查看延迟
   SHOW SLAVE STATUS\G
   -- 解决方案：优化网络、提高从服务器性能、并行复制
   ```

2. **主键冲突**
   ```sql
   -- 解决方案：使用主主复制时设置自增偏移和步长
   ```

3. **错误跳过**
   ```sql
   -- 跳过一个错误
   SET GLOBAL sql_slave_skip_counter = 1;
   START SLAVE;
   ```

## 3. MySQL Group Replication

### 3.1 Group Replication概述

MySQL Group Replication是MySQL 5.7.17引入的高可用解决方案，基于Paxos协议实现多主复制，提供高可用、高可靠和弹性扩展的能力。

### 3.2 Group Replication特性

1. **多主模式**：所有成员都可以处理写操作
2. **自动故障转移**：成员故障时自动从组中移除
3. **自动加入**：新成员可以自动加入组
4. **数据一致性**：确保所有成员数据一致
5. **弹性扩展**：可以动态添加或移除成员

### 3.3 Group Replication模式

#### 3.3.1 单主模式（Single-Primary Mode）

只有一个成员可以处理写操作，其他成员只读。

```sql
-- 启动单主模式
START GROUP_REPLICATION;
```

#### 3.3.2 多主模式（Multi-Primary Mode）

所有成员都可以处理写操作。

```sql
-- 启动多主模式
SET GLOBAL group_replication_single_primary_mode = OFF;
START GROUP_REPLICATION;
```

### 3.4 配置Group Replication

#### 3.4.1 基本配置

```sql
-- 所有节点配置
[mysqld]
server-id = 1  -- 每个节点不同
gtid_mode = ON
enforce_gtid_consistency = ON
master_info_repository = TABLE
relay_log_info_repository = TABLE
binlog_checksum = NONE
log_slave_updates = ON
binlog_format = ROW
transaction_write_set_extraction = XXHASH64
loose-group_replication_group_name = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
loose-group_replication_start_on_boot = OFF
loose-group_replication_local_address = 'node1:33061'  -- 每个节点不同
loose-group_replication_group_seeds = 'node1:33061,node2:33061,node3:33061'
loose-group_replication_bootstrap_group = OFF  -- 只在第一个节点设置为ON
```

#### 3.4.2 初始化Group Replication

```sql
-- 第一个节点
SET GLOBAL group_replication_bootstrap_group = ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group = OFF;

-- 其他节点
START GROUP_REPLICATION;
```

### 3.5 Group Replication监控

```sql
-- 查看组成员
SELECT * FROM performance_schema.replication_group_members;

-- 查看组状态
SELECT * FROM performance_schema.replication_group_member_stats;

-- 查看通道状态
SELECT * FROM performance_schema.replication_connection_status;
SELECT * FROM performance_schema.replication_applier_status;
```

## 4. MySQL InnoDB Cluster

### 4.1 InnoDB Cluster概述

MySQL InnoDB Cluster是MySQL官方提供的高可用解决方案，集成了MySQL Group Replication、MySQL Router和MySQL Shell，提供了一个完整的高可用解决方案。

### 4.2 InnoDB Cluster组件

1. **MySQL Group Replication**：提供高可用和数据一致性
2. **MySQL Router**：提供连接路由和负载均衡
3. **MySQL Shell**：提供管理和监控接口

### 4.3 部署InnoDB Cluster

#### 4.3.1 安装组件

```bash
# 安装MySQL Shell
wget https://dev.mysql.com/get/mysql-shell-community-8.0.28-1.el7.x86_64.rpm
yum localinstall mysql-shell-community-8.0.28-1.el7.x86_64.rpm

# 安装MySQL Router
wget https://dev.mysql.com/get/mysql-router-community-8.0.28-1.el7.x86_64.rpm
yum localinstall mysql-router-community-8.0.28-1.el7.x86_64.rpm
```

#### 4.3.2 配置InnoDB Cluster

```javascript
// 使用MySQL Shell配置
\sql
// 连接到第一个节点
\connect root@node1:3306

// 检查配置
dba.checkInstanceConfiguration('root@node1:3306');

// 配置实例
dba.configureInstance('root@node1:3306');

// 创建集群
var cluster = dba.createCluster('myCluster');

// 添加其他节点
cluster.addInstance('root@node2:3306');
cluster.addInstance('root@node3:3306');

// 查看集群状态
cluster.status();
```

### 4.4 管理InnoDB Cluster

#### 4.4.1 集群操作

```javascript
// 连接到集群
\connect root@node1:3306
var cluster = dba.getCluster();

// 查看集群状态
cluster.status();

// 添加节点
cluster.addInstance('root@node4:3306');

// 移除节点
cluster.removeInstance('root@node4:3306');

// 重新配置集群
cluster.rescan();

// 解散集群
cluster.dissolve();
```

#### 4.4.2 故障处理

```javascript
// 查看集群状态
cluster.status();

// 如果节点离线，尝试重新加入
cluster.rejoinInstance('root@node2:3306');

// 如果主节点故障，切换主节点
cluster.setPrimaryInstance('root@node2:3306');
```

### 4.5 配置MySQL Router

```bash
# 引导Router
mysqlrouter --bootstrap root@node1:3306 --directory /etc/mysqlrouter

# 启动Router
/etc/mysqlrouter/start.sh

# 或者安装为服务
mysqlrouter --bootstrap root@node1:3306 --conf-use-sockets --conf-skip-tcp
systemctl start mysqlrouter
systemctl enable mysqlrouter
```

## 5. 高可用架构设计

### 5.1 读写分离架构

读写分离是将读操作和写操作分配到不同的服务器，提高系统性能。

```sql
-- 配置主服务器（写操作）
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW

-- 配置从服务器（读操作）
[mysqld]
server-id = 2
relay-log = relay-bin
read-only = 1
```

### 5.2 多活架构

多活架构允许多个数据中心同时处理读写操作，提高可用性和性能。

```sql
-- 配置多主复制
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW
auto-increment-offset = 1
auto-increment-increment = 2
log-slave-updates = 1
```

### 5.3 分片架构

分片是将数据水平分割到多个服务器，提高处理能力。

```sql
-- 使用应用层分片
-- 例如：按用户ID分片
function getShard(userId) {
    return userId % 4;  // 4个分片
}

// 连接到对应分片
var shardId = getShard(userId);
var connection = connectToShard(shardId);
```

### 5.4 混合架构

结合多种高可用技术，构建更强大的高可用架构。

```
应用层
  |
负载均衡器
  |
MySQL Router
  |
+-----------------+-----------------+
|                 |                 |
主数据中心        备份数据中心       灾备数据中心
|                 |                 |
+-------+---------+---------+-------+
        |         |         |
    主节点    从节点1   从节点2
```

## 6. 故障转移与恢复

### 6.1 自动故障转移

#### 6.1.1 使用MHA实现自动故障转移

MHA（Master High Availability）是MySQL高可用解决方案之一，可以自动检测主节点故障并提升从节点为主节点。

```bash
# 安装MHA Manager
yum install perl-DBD-MySQL
wget https://github.com/yoshinorim/mha4mysql-manager/releases/download/v0.58/mha4mysql-manager-0.58-0.el7.centos.noarch.rpm
rpm -ivh mha4mysql-manager-0.58-0.el7.centos.noarch.rpm

# 安装MHA Node
wget https://github.com/yoshinorim/mha4mysql-node/releases/download/v0.58/mha4mysql-node-0.58-0.el7.centos.noarch.rpm
rpm -ivh mha4mysql-node-0.58-0.el7.centos.noarch.rpm

# 配置MHA
cat > /etc/masterha_default.cnf <<EOF
[server default]
user=mha_manager
password=mha_password
ssh_user=root
repl_user=repl_user
repl_password=repl_password
ping_interval=1
EOF

cat > /etc/mha_app1.cnf <<EOF
[server default]
manager_workdir=/var/log/masterha/app1
manager_log=/var/log/masterha/app1/manager.log
remote_workdir=/var/log/masterha/app1

[server1]
hostname=master1
candidate_master=1

[server2]
hostname=slave1
candidate_master=1

[server3]
hostname=slave2
no_master=1
EOF

# 启动MHA Manager
nohup masterha_manager --conf=/etc/mha_app1.cnf --ignore_last_failover < /dev/null > /var/log/masterha/app1/manager.log 2>&1 &
```

#### 6.1.2 使用Orchestrator实现自动故障转移

Orchestrator是另一个MySQL高可用解决方案，提供了可视化的拓扑管理和自动故障转移。

```bash
# 安装Orchestrator
wget https://github.com/github/orchestrator/releases/download/v3.2.6/orchestrator-3.2.6-1.x86_64.rpm
rpm -ivh orchestrator-3.2.6-1.x86_64.rpm

# 配置Orchestrator
cat > /etc/orchestrator.conf.json <<EOF
{
  "Debug": false,
  "EnableSyslog": false,
  "ListenAddress": ":3000",
  "MySQLTopologyUser": "orchestrator",
  "MySQLTopologyPassword": "orchestrator_password",
  "MySQLTopologyCredentialsConfigFile": "",
  "MySQLTopologySSLPrivateKeyFile": "",
  "MySQLTopologySSLCertFile": "",
  "MySQLTopologySSLCAFile": "",
  "MySQLTopologySSLSkipVerify": false,
  "MySQLTopologyUseMutualTLS": false,
  "BackendDB": "mysql",
  "MySQLBackendUser": "orchestrator",
  "MySQLBackendPassword": "orchestrator_password",
  "MySQLBackendCredentialsConfigFile": "",
  "MySQLBackendSSLPrivateKeyFile": "",
  "MySQLBackendSSLCertFile": "",
  "MySQLBackendSSLCAFile": "",
  "MySQLBackendSSLSkipVerify": false,
  "MySQLBackendUseMutualTLS": false,
  "RaftEnabled": true,
  "RaftDataDir": "/var/lib/orchestrator",
  "RaftBind": "0.0.0.0",
  "RaftAdvertise": "",
  "DefaultRaftPort": 10008,
  "RaftNodes": [
    "orchestrator1:10008",
    "orchestrator2:10008",
    "orchestrator3:10008"
  ]
}
EOF

# 启动Orchestrator
systemctl start orchestrator
systemctl enable orchestrator
```

### 6.2 手动故障转移

#### 6.2.1 主从切换

```sql
-- 停止从服务器复制
STOP SLAVE;

-- 确保从服务器已应用所有中继日志
FLUSH RELAY LOGS;

-- 停止主服务器
systemctl stop mysql;

-- 将从服务器提升为主服务器
STOP SLAVE;
RESET MASTER;
RESET SLAVE ALL;

-- 更新应用配置，连接到新的主服务器
-- 将其他从服务器重新指向新的主服务器
CHANGE MASTER TO
    MASTER_HOST='new_master_ip',
    MASTER_PORT=3306,
    MASTER_USER='repl_user',
    MASTER_PASSWORD='repl_password',
    MASTER_AUTO_POSITION = 1;
START SLAVE;
```

#### 6.2.2 Group Replication故障转移

```sql
-- 查看集群状态
SELECT * FROM performance_schema.replication_group_members;

-- 如果主节点故障，手动切换
SELECT group_replication_set_as_primary('server_uuid');
```

### 6.3 灾难恢复

#### 6.3.1 灾备站点激活

```bash
# 检查灾备站点数据一致性
mysql -u root -p -e "SHOW SLAVE STATUS\G"

# 停止复制
mysql -u root -p -e "STOP SLAVE;"

# 提升灾备站点为主站点
mysql -u root -p -e "RESET MASTER; RESET SLAVE ALL;"

# 更新DNS或负载均衡器配置
# 将应用连接指向灾备站点
```

#### 6.3.2 数据同步

```bash
# 使用xtrabackup同步数据
# 在主站点创建备份
xtrabackup --backup --target-dir=/backup --user=backup_user --password=backup_password

# 传输备份到灾备站点
scp -r /backup/* user@dr_site:/backup/

# 在灾备站点准备备份
xtrabackup --prepare --target-dir=/backup

# 恢复数据
systemctl stop mysql
cp -r /var/lib/mysql /var/lib/mysql.bak
xtrabackup --copy-back --target-dir=/backup
chown -R mysql:mysql /var/lib/mysql
systemctl start mysql
```

## 7. 本章小结

本章介绍了MySQL的高可用与集群，包括高可用概述、MySQL复制、MySQL Group Replication、MySQL InnoDB Cluster、高可用架构设计以及故障转移与恢复。通过合理的高可用架构和故障转移机制，可以确保MySQL系统的高可用性和数据安全性。

**知识要点回顾**：
1. 高可用性是指系统在面对各种故障时，能够持续提供服务的能力
2. 衡量高可用性的主要指标包括可用性、MTBF、MTTR、RTO和RPO
3. MySQL复制是将数据从一个MySQL服务器复制到其他服务器的技术
4. 复制类型包括基于语句的复制（SBR）、基于行的复制（RBR）和混合复制（MBR）
5. 复制架构包括主从复制、主主复制和级联复制
6. MySQL Group Replication是基于Paxos协议的多主复制解决方案
7. MySQL InnoDB Cluster是集成了Group Replication、MySQL Router和MySQL Shell的完整高可用解决方案
8. 高可用架构设计包括读写分离架构、多活架构、分片架构和混合架构
9. 故障转移与恢复包括自动故障转移（如MHA、Orchestrator）和手动故障转移
10. 灾难恢复包括灾备站点激活和数据同步

**下一步学习**：
在下一章中，我们将学习用户权限与安全，包括用户管理、权限控制、安全加固、审计与合规以及安全最佳实践。

## 8. 练习题

1. 设计一个适合中小企业的MySQL高可用架构，并解释各组件的作用。
2. 配置一个MySQL主从复制环境，并测试故障转移功能。
3. 部署一个MySQL Group Replication集群，并测试多主模式下的写操作。
4. 使用MySQL Shell部署一个InnoDB Cluster，并配置MySQL Router。
5. 设计一个读写分离架构，并实现负载均衡。
6. 使用MHA或Orchestrator实现自动故障转移，并测试其功能。
7. 设计一个灾难恢复方案，包括灾备站点和数据同步策略。
8. 分析不同高可用架构的优缺点，并选择适合特定场景的架构。
9. 设计一个高可用监控系统，监控MySQL集群的状态和性能。
10. 测试各种故障场景（如主节点故障、网络分区等），并验证系统的恢复能力。