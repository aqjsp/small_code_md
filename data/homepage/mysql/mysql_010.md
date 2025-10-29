# 用户权限与安全

## 1. 用户管理

### 1.1 用户账户概述

MySQL用户账户由两部分组成：用户名和主机名。格式为`'user_name'@'host_name'`，其中：
- `user_name`：用户名，最大长度为16个字符
- `host_name`：主机名，可以是主机名、IP地址或通配符（`%`表示任意主机）

### 1.2 创建用户

#### 1.2.1 使用CREATE USER语句

```sql
-- 创建基本用户
CREATE USER 'john'@'localhost' IDENTIFIED BY 'password123';

-- 创建可从任意主机连接的用户
CREATE USER 'admin'@'%' IDENTIFIED BY 'strong_password';

-- 创建带密码策略的用户
CREATE USER 'developer'@'192.168.1.%' 
    IDENTIFIED BY 'dev_password'
    WITH MAX_QUERIES_PER_HOUR 100
    PASSWORD EXPIRE INTERVAL 90 DAY;

-- 使用密码哈希创建用户
CREATE USER 'secure_user'@'localhost' 
    IDENTIFIED WITH mysql_native_password 
    AS '*6C8989366EAF75BB670AD8EA7A7FC1126BD048BD';
```

#### 1.2.2 使用GRANT语句间接创建

```sql
-- 直接授权时会自动创建用户（不推荐）
GRANT SELECT ON mydb.* TO 'readonly_user'@'%' IDENTIFIED BY 'readonly_pass';
```

#### 1.2.3 使用INSERT语句直接操作授权表

```sql
-- 直接插入mysql.user表（不推荐）
INSERT INTO mysql.user (Host, User, authentication_string, ssl_cipher, x509_issuer, x509_subject)
VALUES ('localhost', 'direct_user', PASSWORD('direct_pass'), '', '', '');

-- 刷新权限使更改生效
FLUSH PRIVILEGES;
```

### 1.3 修改用户

#### 1.3.1 修改用户密码

```sql
-- 使用ALTER USER修改密码
ALTER USER 'john'@'localhost' IDENTIFIED BY 'new_password';

-- 使用SET PASSWORD修改密码
SET PASSWORD FOR 'john'@'localhost' = PASSWORD('another_password');

-- 修改当前用户密码
SET PASSWORD = PASSWORD('my_new_password');

-- 使用mysqladmin修改密码
mysqladmin -u john -p password 'new_password'
```

#### 1.3.2 重命名用户

```sql
-- 重命名用户
RENAME USER 'john'@'localhost' TO 'john_doe'@'localhost';

-- 重命名并更改主机
RENAME USER 'admin'@'%' TO 'admin'@'192.168.1.%';
```

#### 1.3.3 修改用户属性

```sql
-- 修改用户资源限制
ALTER USER 'developer'@'192.168.1.%' 
    WITH MAX_QUERIES_PER_HOUR 200
    MAX_UPDATES_PER_HOUR 50
    MAX_CONNECTIONS_PER_HOUR 10
    MAX_USER_CONNECTIONS 5;

-- 设置密码过期策略
ALTER USER 'john'@'localhost' PASSWORD EXPIRE INTERVAL 180 DAY;

-- 锁定/解锁用户
ALTER USER 'suspended_user'@'localhost' ACCOUNT LOCK;
ALTER USER 'suspended_user'@'localhost' ACCOUNT UNLOCK;
```

### 1.4 删除用户

```sql
-- 删除用户
DROP USER 'john'@'localhost';

-- 删除多个用户
DROP USER 'user1'@'localhost', 'user2'@'192.168.1.%';

-- 删除用户及其权限
DROP USER IF EXISTS 'admin'@'%';
```

### 1.5 查看用户信息

```sql
-- 查看所有用户
SELECT User, Host FROM mysql.user;

-- 查看用户详细信息
SELECT * FROM mysql.user WHERE User = 'john' AND Host = 'localhost';

-- 查看当前用户
SELECT CURRENT_USER();
SELECT USER();

-- 查看用户权限
SHOW GRANTS FOR 'john'@'localhost';
SHOW GRANTS FOR CURRENT_USER();
```

## 2. 权限控制

### 2.1 权限类型

MySQL权限分为多个级别：

#### 2.1.1 全局权限

全局权限适用于所有数据库：

```sql
-- 授予全局权限
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost';
GRANT RELOAD, SHUTDOWN ON *.* TO 'operator'@'localhost';

-- 撤销全局权限
REVOKE ALL PRIVILEGES ON *.* FROM 'admin'@'localhost';
REVOKE RELOAD ON *.* FROM 'operator'@'localhost';
```

#### 2.1.2 数据库级权限

数据库级权限适用于特定数据库：

```sql
-- 授予数据库级权限
GRANT ALL PRIVILEGES ON mydb.* TO 'db_admin'@'localhost';
GRANT SELECT, INSERT, UPDATE ON mydb.* TO 'app_user'@'%';

-- 撤销数据库级权限
REVOKE INSERT ON mydb.* FROM 'app_user'@'%';
```

#### 2.1.3 表级权限

表级权限适用于特定表：

```sql
-- 授予表级权限
GRANT SELECT, INSERT ON mydb.customers TO 'sales'@'%';
GRANT ALL PRIVILEGES ON mydb.products TO 'product_manager'@'localhost';

-- 撤销表级权限
REVOKE INSERT ON mydb.customers FROM 'sales'@'%';
```

#### 2.1.4 列级权限

列级权限适用于特定表的特定列：

```sql
-- 授予列级权限
GRANT SELECT (id, name) ON mydb.employees TO 'hr'@'localhost';
GRANT UPDATE (salary) ON mydb.employees TO 'payroll'@'localhost';

-- 撤销列级权限
REVOKE UPDATE (salary) ON mydb.employees FROM 'payroll'@'localhost';
```

### 2.2 常用权限列表

| 权限 | 描述 | 级别 |
|------|------|------|
| ALL [PRIVILEGES] | 所有权限（除GRANT OPTION） | 全局、数据库、表 |
| ALTER | 修改表结构 | 数据库、表 |
| CREATE | 创建数据库和表 | 全局、数据库 |
| CREATE USER | 创建用户 | 全局 |
| CREATE VIEW | 创建视图 | 数据库、表 |
| DELETE | 删除数据 | 表 |
| DROP | 删除数据库和表 | 数据库、表 |
| EXECUTE | 执行存储过程和函数 | 数据库、函数、过程 |
| FILE | 读写服务器文件 | 全局 |
| GRANT OPTION | 授予权限给其他用户 | 全局、数据库、表 |
| INDEX | 创建和删除索引 | 表 |
| INSERT | 插入数据 | 表、列 |
| LOCK TABLES | 锁定表 | 数据库 |
| PROCESS | 查看所有进程 | 全局 |
| RELOAD | 重新加载授权表 | 全局 |
| REPLICATION CLIENT | 查看主从状态 | 全局 |
| REPLICATION SLAVE | 复制从服务器 | 全局 |
| SELECT | 查询数据 | 表、列 |
| SHOW DATABASES | 查看所有数据库 | 全局 |
| SHUTDOWN | 关闭服务器 | 全局 |
| SUPER | 超级用户权限 | 全局 |
| UPDATE | 更新数据 | 表、列 |
| USAGE | 无权限，仅允许连接 | 全局 |

### 2.3 权限管理

#### 2.3.1 授予权限

```sql
-- 基本授权
GRANT SELECT ON mydb.* TO 'readonly'@'%';

-- 授予多个权限
GRANT SELECT, INSERT, UPDATE ON mydb.customers TO 'sales'@'%';

-- 授予所有权限
GRANT ALL PRIVILEGES ON mydb.* TO 'db_admin'@'localhost';

-- 授予GRANT OPTION权限
GRANT SELECT ON mydb.* TO 'manager'@'%' WITH GRANT OPTION;

-- 授予带资源限制的权限
GRANT SELECT ON mydb.* TO 'limited_user'@'%'
    WITH MAX_QUERIES_PER_HOUR 100
    MAX_UPDATES_PER_HOUR 20
    MAX_CONNECTIONS_PER_HOUR 5
    MAX_USER_CONNECTIONS 3;
```

#### 2.3.2 撤销权限

```sql
-- 撤销特定权限
REVOKE INSERT ON mydb.customers FROM 'sales'@'%';

-- 撤销所有权限
REVOKE ALL PRIVILEGES ON mydb.* FROM 'db_admin'@'localhost';

-- 撤销GRANT OPTION权限
REVOKE GRANT OPTION ON mydb.* FROM 'manager'@'%';

-- 撤销并级联撤销
REVOKE ALL PRIVILEGES ON mydb.* FROM 'user'@'%' CASCADE;
```

#### 2.3.3 权限检查

```sql
-- 查看用户权限
SHOW GRANTS FOR 'user'@'host';

-- 查看当前用户权限
SHOW GRANTS;

-- 检查特定权限
SELECT * FROM mysql.tables_priv WHERE Db = 'mydb' AND User = 'user';
```

### 2.4 角色管理

MySQL 8.0引入了角色功能，可以简化权限管理。

#### 2.4.1 创建角色

```sql
-- 创建角色
CREATE ROLE 'app_readonly', 'app_readwrite', 'app_admin';

-- 创建带密码的角色
CREATE ROLE 'secure_role' IDENTIFIED BY 'role_password';
```

#### 2.4.2 授予角色权限

```sql
-- 为角色授予权限
GRANT SELECT ON mydb.* TO 'app_readonly';
GRANT SELECT, INSERT, UPDATE ON mydb.* TO 'app_readwrite';
GRANT ALL PRIVILEGES ON mydb.* TO 'app_admin';
```

#### 2.4.3 将角色授予用户

```sql
-- 将角色授予用户
GRANT 'app_readonly' TO 'user1'@'%', 'user2'@'%';
GRANT 'app_readwrite' TO 'developer'@'localhost';
GRANT 'app_admin' TO 'admin'@'localhost';

-- 将多个角色授予用户
GRANT 'app_readonly', 'app_readwrite' TO 'power_user'@'%';
```

#### 2.4.4 激活角色

```sql
-- 设置默认激活的角色
SET DEFAULT ROLE ALL TO 'user1'@'%';
SET DEFAULT ROLE 'app_readwrite' TO 'developer'@'localhost';

-- 手动激活角色
SET ROLE 'app_readwrite';
SET ROLE ALL;
SET ROLE NONE;

-- 查看当前激活的角色
SELECT CURRENT_ROLE();
```

#### 2.4.5 管理角色

```sql
-- 查看角色
SELECT * FROM mysql.roles_mapping;

-- 撤销角色的权限
REVOKE INSERT ON mydb.* FROM 'app_readwrite';

-- 从用户撤销角色
REVOKE 'app_readwrite' FROM 'developer'@'localhost';

-- 删除角色
DROP ROLE 'app_readonly';
```

## 3. 安全加固

### 3.1 密码安全

#### 3.1.1 密码策略

```sql
-- 安装密码验证插件
INSTALL PLUGIN validate_password SONAME 'validate_password.so';

-- 查看密码策略配置
SHOW VARIABLES LIKE 'validate_password%';

-- 设置密码策略
SET GLOBAL validate_password_policy = 'MEDIUM';
SET GLOBAL validate_password_length = 12;
SET GLOBAL validate_password_mixed_case_count = 1;
SET GLOBAL validate_password_number_count = 1;
SET GLOBAL validate_password_special_char_count = 1;
```

#### 3.1.2 密码过期策略

```sql
-- 设置密码过期
ALTER USER 'user'@'host' PASSWORD EXPIRE;

-- 设置密码定期过期
ALTER USER 'user'@'host' PASSWORD EXPIRE INTERVAL 90 DAY;

-- 设置密码永不过期
ALTER USER 'user'@'host' PASSWORD EXPIRE NEVER;

-- 设置首次登录必须修改密码
ALTER USER 'user'@'host' PASSWORD EXPIRE DEFAULT;
```

#### 3.1.3 密码重用限制

```sql
-- 设置密码历史
SET GLOBAL password_history = 6;  -- 不能重用最近6次密码

-- 设置密码重用间隔
SET GLOBAL password_reuse_interval = 365;  -- 不能重用365天内的密码

-- 应用密码重用限制
ALTER USER 'user'@'host' PASSWORD HISTORY 5;
ALTER USER 'user'@'host' PASSWORD REUSE INTERVAL 180 DAY;
```

### 3.2 连接安全

#### 3.2.1 SSL/TLS配置

```sql
-- 查看SSL状态
SHOW VARIABLES LIKE '%ssl%';

-- 创建SSL用户
CREATE USER 'secure_user'@'%' REQUIRE SSL;
CREATE USER 'secure_user2'@'%' REQUIRE X509;
CREATE USER 'secure_user3'@'%' 
    REQUIRE SUBJECT '/C=US/ST=California/L=San Francisco/O=Company/CN=user';
CREATE USER 'secure_user4'@'%' 
    REQUIRE ISSUER '/C=US/ST=California/L=San Francisco/O=CA/CN=CA';

-- 修改现有用户要求SSL
ALTER USER 'user'@'host' REQUIRE SSL;
```

#### 3.2.2 限制连接

```sql
-- 限制连接数
ALTER USER 'user'@'host' WITH MAX_USER_CONNECTIONS 10;

-- 限制查询数
ALTER USER 'user'@'host' WITH MAX_QUERIES_PER_HOUR 1000;

-- 限制更新数
ALTER USER 'user'@'host' WITH MAX_UPDATES_PER_HOUR 100;
```

### 3.3 网络安全

#### 3.3.1 限制访问

```sql
-- 限制特定主机访问
CREATE USER 'admin'@'192.168.1.100' IDENTIFIED BY 'password';
CREATE USER 'admin'@'192.168.1.%' IDENTIFIED BY 'password';

-- 拒绝特定IP访问
CREATE USER 'blocked'@'192.168.1.200' IDENTIFIED BY 'password';
-- 然后不授予任何权限
```

#### 3.3.2 防火墙配置

```bash
# 使用iptables限制MySQL端口访问
iptables -A INPUT -p tcp --dport 3306 -s 192.168.1.0/24 -j ACCEPT
iptables -A INPUT -p tcp --dport 3306 -j DROP
```

### 3.4 数据加密

#### 3.4.1 静态数据加密

```ini
# my.cnf配置
[mysqld]
# 启用表空间加密
early-plugin-load=keyring_file.so
keyring_file_data=/var/lib/mysql-keyring/keyring

# 创建加密表
CREATE TABLE sensitive_data (
    id INT,
    data VARCHAR(255)
) ENCRYPTION='Y';

# 修改现有表加密
ALTER TABLE existing_table ENCRYPTION='Y';
```

#### 3.4.2 传输加密

```ini
# my.cnf配置
[mysqld]
# 启用SSL
ssl-ca=/path/to/ca.pem
ssl-cert=/path/to/server-cert.pem
ssl-key=/path/to/server-key.pem

[client]
# 客户端SSL配置
ssl-ca=/path/to/ca.pem
ssl-cert=/path/to/client-cert.pem
ssl-key=/path/to/client-key.pem
```

### 3.5 审计日志

#### 3.5.1 启用审计日志

```ini
# my.cnf配置
[mysqld]
# 启用审计日志
plugin-load=audit_log.so
audit_log_format=JSON
audit_log_policy=ALL
audit_log_file=/var/log/mysql/audit.log
audit_log_rotate_on_size=100000000
audit_log_rotations=10
```

#### 3.5.2 查看审计日志

```sql
-- 查看审计日志状态
SHOW VARIABLES LIKE 'audit_log%';

-- 过滤审计日志（需要外部工具）
-- 例如使用grep过滤特定用户的操作
grep '"user":"admin"' /var/log/mysql/audit.log
```

## 4. 审计与合规

### 4.1 审计插件

MySQL Enterprise Audit插件提供全面的审计功能，社区版可以使用第三方审计插件。

#### 4.1.1 安装审计插件

```sql
-- 安装审计插件
INSTALL PLUGIN audit_log SONAME 'audit_log.so';

-- 查看插件状态
SELECT * FROM INFORMATION_SCHEMA.PLUGINS WHERE PLUGIN_NAME = 'audit_log';
```

#### 4.1.2 配置审计策略

```sql
-- 审计所有操作
SET GLOBAL audit_log_policy = 'ALL';

-- 只审计登录和登出
SET GLOBAL audit_log_policy = 'LOGINS';

-- 审计特定查询
SET GLOBAL audit_log_policy = 'QUERIES';

-- 审计但不记录查询
SET GLOBAL audit_log_policy = 'NONE';
```

### 4.2 审计日志分析

#### 4.2.1 日志格式

审计日志支持多种格式：JSON、XML和旧格式。

```sql
-- 设置JSON格式
SET GLOBAL audit_log_format = 'JSON';

-- 设置XML格式
SET GLOBAL audit_log_format = 'XML';

-- 设置旧格式
SET GLOBAL audit_log_format = 'OLD';
```

#### 4.2.2 日志过滤

```sql
-- 只审计特定用户
SET GLOBAL audit_log_policy = 'ALL';
-- 然后使用外部工具过滤日志

-- 审计特定数据库
-- 需要使用审计过滤规则
```

### 4.3 合规性要求

#### 4.3.1 数据保护法规

常见的数据保护法规包括：
- GDPR（通用数据保护条例）
- HIPAA（健康保险可移植性和责任法案）
- PCI DSS（支付卡行业数据安全标准）
- SOX（萨班斯-奥克斯利法案）

#### 4.3.2 实施合规性

```sql
-- 数据最小化原则
-- 只授予必要的权限
GRANT SELECT, INSERT ON specific_table TO 'user'@'host';

-- 数据匿名化
-- 创建视图隐藏敏感信息
CREATE VIEW customer_anonymous AS
SELECT id, CONCAT(SUBSTRING(name, 1, 1), '****') AS name, 
       CONCAT(SUBSTRING(email, 1, 2), '***@', SUBSTRING(email, INSTR(email, '@')+1)) AS email
FROM customers;

-- 数据加密
CREATE TABLE encrypted_data (
    id INT,
    sensitive_data VARBINARY(255)
);
```

## 5. 安全最佳实践

### 5.1 用户管理最佳实践

1. **最小权限原则**：只授予用户完成其工作所需的最小权限
2. **角色分离**：不同职责使用不同用户账户
3. **定期审查**：定期审查用户账户和权限
4. **账户锁定**：对长期不使用的账户进行锁定或删除

```sql
-- 定期审查用户权限
SELECT User, Host FROM mysql.user;

-- 查看用户权限详情
SELECT 
    u.User, u.Host, 
    db.Db, db.Select_priv, db.Insert_priv, db.Update_priv, db.Delete_priv
FROM mysql.user u
LEFT JOIN mysql.db db ON u.User = db.User AND u.Host = db.Host
WHERE u.User NOT IN ('root', 'mysql.sys', 'mysql.session');

-- 锁定长期不使用的账户
ALTER USER 'inactive_user'@'host' ACCOUNT LOCK;
```

### 5.2 密码管理最佳实践

1. **强密码策略**：使用复杂密码，包含大小写字母、数字和特殊字符
2. **定期更换**：设置密码定期过期
3. **密码历史**：防止重用旧密码
4. **多因素认证**：在可能的情况下使用多因素认证

```sql
-- 设置强密码策略
SET GLOBAL validate_password_policy = 'STRONG';
SET GLOBAL validate_password_length = 16;

-- 设置密码定期过期
ALTER USER 'user'@'host' PASSWORD EXPIRE INTERVAL 90 DAY;

-- 设置密码历史
SET GLOBAL password_history = 12;
```

### 5.3 网络安全最佳实践

1. **限制访问**：只允许必要的IP地址访问
2. **使用SSL/TLS**：加密客户端和服务器之间的通信
3. **防火墙**：使用防火墙限制对MySQL端口的访问
4. **VPN**：对远程访问使用VPN

```sql
-- 创建只允许特定IP访问的用户
CREATE USER 'admin'@'192.168.1.100' IDENTIFIED BY 'strong_password';

-- 要求SSL连接
ALTER USER 'user'@'host' REQUIRE SSL;
```

### 5.4 数据保护最佳实践

1. **数据加密**：对敏感数据进行加密存储
2. **备份加密**：对备份文件进行加密
3. **审计日志**：启用并定期审查审计日志
4. **数据脱敏**：在开发和测试环境中使用脱敏数据

```sql
-- 创建加密表
CREATE TABLE sensitive_data (
    id INT,
    data VARBINARY(255),
    ENCRYPTION KEY ID 1
) ENCRYPTION='Y';

-- 创建脱敏视图
CREATE VIEW customer_masked AS
SELECT 
    id,
    CONCAT(SUBSTRING(name, 1, 1), '****') AS name,
    CONCAT(SUBSTRING(email, 1, 2), '***@', SUBSTRING(email, INSTR(email, '@')+1)) AS email
FROM customers;
```

### 5.5 监控与响应

1. **异常检测**：监控异常登录和查询行为
2. **实时告警**：设置安全事件告警
3. **事件响应**：制定安全事件响应计划
4. **定期演练**：定期进行安全演练

```sql
-- 监控失败登录
SELECT * FROM mysql.general_log 
WHERE argument LIKE '%Access denied%' 
AND event_time > DATE_SUB(NOW(), INTERVAL 1 HOUR);

-- 监控权限变更
SELECT * FROM mysql.general_log 
WHERE argument LIKE '%GRANT%' OR argument LIKE '%REVOKE%'
AND event_time > DATE_SUB(NOW(), INTERVAL 1 DAY);
```

## 6. 本章小结

本章介绍了MySQL的用户权限与安全，包括用户管理、权限控制、安全加固、审计与合规以及安全最佳实践。通过合理的安全策略和最佳实践，可以保护MySQL数据库免受各种安全威胁。

**知识要点回顾**：
1. MySQL用户账户由用户名和主机名组成，格式为'user_name'@'host_name'
2. 可以使用CREATE USER、ALTER USER和DROP USER语句管理用户
3. MySQL权限分为全局、数据库、表和列四个级别
4. MySQL 8.0引入了角色功能，可以简化权限管理
5. 密码安全包括密码策略、密码过期和密码重用限制
6. 连接安全包括SSL/TLS配置和连接限制
7. 数据加密包括静态数据加密和传输加密
8. 审计日志可以记录数据库操作，用于安全审计和合规
9. 安全最佳实践包括最小权限原则、强密码策略、网络限制和数据保护
10. 监控与响应是安全体系的重要组成部分

**下一步学习**：
在下一章中，我们将学习监控与诊断，包括性能监控、问题诊断、日志分析、监控工具以及故障排除。

## 7. 练习题

1. 设计一个符合最小权限原则的用户权限方案。
2. 配置MySQL的密码策略，要求密码长度至少12位，包含大小写字母、数字和特殊字符。
3. 创建三个角色：只读用户、读写用户和管理员，并为不同用户分配这些角色。
4. 配置MySQL的SSL连接，并创建需要SSL连接的用户。
5. 设置MySQL的审计日志，记录所有数据库操作。
6. 设计一个数据脱敏方案，保护敏感信息。
7. 实现一个用户权限审查脚本，定期检查用户权限是否合理。
8. 配置MySQL的静态数据加密，并创建加密表。
9. 设计一个安全事件响应计划，包括异常检测和响应流程。
10. 分析一个MySQL安全事件案例，并提出改进措施。