# 第21章：项目一：搭建个人博客服务器

## 1 项目概述

### 1.1 项目目标

本项目旨在使用Linux系统搭建一个功能完整的个人博客服务器，通过实践应用前面章节所学的知识，包括系统管理、网络配置、Web服务部署、数据库管理、安全配置等。项目完成后，您将拥有一个稳定、安全、高性能的个人博客平台。

### 1.2 技术栈选择

本项目将使用以下技术栈：

- **操作系统**: Ubuntu Server 20.04 LTS
- **Web服务器**: Nginx
- **应用服务器**: PHP-FPM
- **数据库**: MariaDB (MySQL分支)
- **博客平台**: WordPress
- **SSL证书**: Let's Encrypt
- **防火墙**: UFW (Uncomplicated Firewall)
- **监控工具**: Netdata
- **备份工具**: Rsync

### 1.3 系统架构

```
Internet
    |
    V
[防火墙/UFW]
    |
    V
[Nginx (反向代理)]
    |
    V
[PHP-FPM (应用处理)]
    |
    V
[MariaDB (数据库)]
```

### 1.4 项目步骤概览

1. 系统初始化和基础配置
2. 网络和安全配置
3. Web服务器和PHP环境搭建
4. 数据库安装和配置
5. WordPress安装和配置
6. SSL证书配置
7. 性能优化
8. 监控和日志配置
9. 备份策略实施
10. 安全加固

## 2 系统初始化和基础配置

### 2.1 系统更新

首先，我们需要确保系统是最新的，并安装必要的软件包：

```bash
# 更新系统软件包
sudo apt update && sudo apt upgrade -y

# 安装必要的基础工具
sudo apt install -y curl wget git vim htop unzip software-properties-common
```

### 2.2 用户和权限配置

创建一个非root用户用于日常管理：

```bash
# 创建新用户（替换username为您想要的用户名）
sudo adduser username

# 将用户添加到sudo组
sudo usermod -aG sudo username

# 切换到新用户
su - username
```

### 2.3 SSH安全配置

增强SSH安全性：

```bash
# 编辑SSH配置文件
sudo nano /etc/ssh/sshd_config

# 修改以下配置项
Port 2222                    # 更改默认SSH端口
PermitRootLogin no           # 禁止root登录
PasswordAuthentication no    # 禁用密码认证（仅允许密钥认证）
PubkeyAuthentication yes     # 启用密钥认证
MaxAuthTries 3               # 限制认证尝试次数
ClientAliveInterval 300      # 设置客户端存活间隔
ClientAliveCountMax 2        # 设置最大存活计数

# 重启SSH服务
sudo systemctl restart sshd
```

### 2.4 系统资源限制

配置系统资源限制：

```bash
# 编辑limits.conf文件
sudo nano /etc/security/limits.conf

# 添加以下内容
* soft nofile 65536
* hard nofile 65536
* soft nproc 32768
* hard nproc 32768

# 编辑sysctl.conf文件
sudo nano /etc/sysctl.conf

# 添加以下内容
# 网络优化
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 87380 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_congestion_control = cubic

# 应用配置
sudo sysctl -p
```

## 3 网络和安全配置

### 3.1 防火墙配置

使用UFW配置防火墙规则：

```bash
# 安装UFW（如果未安装）
sudo apt install ufw

# 设置默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许SSH（使用之前配置的端口）
sudo ufw allow 2222/tcp

# 允许HTTP和HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 启用防火墙
sudo ufw enable

# 查看防火墙状态
sudo ufw status verbose
```

### 3.2 Fail2ban配置

安装和配置Fail2ban防止暴力破解：

```bash
# 安装Fail2ban
sudo apt install fail2ban

# 创建自定义配置文件
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local

# 编辑配置文件
sudo nano /etc/fail2ban/jail.local

# 修改以下配置
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = 2222
logpath = %(sshd_log)s
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

[nginx-limit-req]
enabled = true
filter = nginx-limit-req
logpath = /var/log/nginx/error.log
maxretry = 3

# 启动Fail2ban服务
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# 查看状态
sudo fail2ban-client status
```

## 4 Web服务器和PHP环境搭建

### 4.1 Nginx安装和配置

安装Nginx Web服务器：

```bash
# 安装Nginx
sudo apt install nginx

# 启动并设置开机自启
sudo systemctl start nginx
sudo systemctl enable nginx

# 创建网站目录
sudo mkdir -p /var/www/blog
sudo chown -R www-data:www-data /var/www/blog
sudo chmod -R 755 /var/www/blog
```

配置Nginx虚拟主机：

```bash
# 创建Nginx配置文件
sudo nano /etc/nginx/sites-available/blog

# 添加以下配置
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/blog;
    index index.php index.html index.htm;

    access_log /var/log/nginx/blog_access.log;
    error_log /var/log/nginx/blog_error.log;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # 隐藏Nginx版本
    server_tokens off;

    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    # PHP处理
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # 禁止访问隐藏文件
    location ~ /\.ht {
        deny all;
    }

    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}

# 启用站点
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/

# 删除默认站点
sudo rm /etc/nginx/sites-enabled/default

# 测试Nginx配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

### 4.2 PHP-FPM安装和配置

安装PHP和必要的扩展：

```bash
# 安装PHP和扩展
sudo apt install php7.4-fpm php7.4-mysql php7.4-curl php7.4-gd php7.4-mbstring php7.4-xml php7.4-xmlrpc php7.4-soap php7.4-intl php7.4-zip php7.4-imagick

# 配置PHP-FPM
sudo nano /etc/php/7.4/fpm/php.ini

# 修改以下配置
memory_limit = 256M
upload_max_filesize = 64M
post_max_size = 64M
max_execution_time = 300
max_input_vars = 3000
date.timezone = Asia/Shanghai

# 配置PHP-FPM进程池
sudo nano /etc/php/7.4/fpm/pool.d/www.conf

# 修改以下配置
user = www-data
group = www-data
listen = /var/run/php/php7.4-fpm.sock
listen.owner = www-data
listen.group = www-data
pm = dynamic
pm.max_children = 20
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 10
pm.max_requests = 500

# 重启PHP-FPM
sudo systemctl restart php7.4-fpm
sudo systemctl enable php7.4-fpm
```

## 5 数据库安装和配置

### 5.1 MariaDB安装

安装MariaDB数据库服务器：

```bash
# 安装MariaDB
sudo apt install mariadb-server

# 启动并设置开机自启
sudo systemctl start mariadb
sudo systemctl enable mariadb

# 运行安全安装脚本
sudo mysql_secure_installation

# 配置选项建议：
# - 设置root密码
# - 移除匿名用户
# - 禁止root远程登录
# - 移除测试数据库
# - 重新加载权限表
```

### 5.2 数据库配置

为WordPress创建数据库和用户：

```bash
# 登录MySQL
sudo mysql -u root -p

# 创建数据库
CREATE DATABASE wordpress DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

# 创建用户
CREATE USER 'wpuser'@'localhost' IDENTIFIED BY 'strong_password';

# 授予权限
GRANT ALL PRIVILEGES ON wordpress.* TO 'wpuser'@'localhost';

# 刷新权限
FLUSH PRIVILEGES;

# 退出
EXIT;
```

优化MariaDB配置：

```bash
# 编辑MariaDB配置文件
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf

# 在[mysqld]部分添加以下配置
innodb_buffer_pool_size = 512M
innodb_log_file_size = 128M
innodb_flush_method = O_DIRECT
innodb_flush_log_at_trx_commit = 2
query_cache_size = 64M
query_cache_type = 1
max_connections = 100
thread_cache_size = 16
table_open_cache = 64

# 重启MariaDB
sudo systemctl restart mariadb
```

## 6 WordPress安装和配置

### 6.1 下载和安装WordPress

下载并安装WordPress：

```bash
# 切换到网站目录
cd /tmp

# 下载WordPress
wget https://wordpress.org/latest.tar.gz

# 解压
tar -xzvf latest.tar.gz

# 复制到网站目录
sudo cp -a /tmp/wordpress/* /var/www/blog/

# 设置权限
sudo chown -R www-data:www-data /var/www/blog
sudo find /var/www/blog -type d -exec chmod 755 {} \;
sudo find /var/www/blog -type f -exec chmod 644 {} \;
```

### 6.2 WordPress配置

创建WordPress配置文件：

```bash
# 复制配置文件模板
sudo cp /var/www/blog/wp-config-sample.php /var/www/blog/wp-config.php

# 编辑配置文件
sudo nano /var/www/blog/wp-config.php

# 修改数据库配置
define('DB_NAME', 'wordpress');
define('DB_USER', 'wpuser');
define('DB_PASSWORD', 'strong_password');
define('DB_HOST', 'localhost');

# 添加安全密钥（从 https://api.wordpress.org/secret-key/1.1/salt/ 获取）
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

# 添加文件修改权限
define('FS_METHOD', 'direct');

# 禁用文件编辑
define('DISALLOW_FILE_EDIT', true);
```

### 6.3 完成WordPress安装

通过Web界面完成WordPress安装：

1. 在浏览器中访问您的域名
2. 按照WordPress安装向导完成安装
3. 设置站点标题、管理员用户名和密码
4. 安装完成后登录WordPress后台

## 7 SSL证书配置

### 7.1 Let's Encrypt证书安装

使用Certbot安装免费SSL证书：

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取SSL证书
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 按照提示输入邮箱地址并同意服务条款
```

### 7.2 自动续期配置

设置证书自动续期：

```bash
# 测试自动续期
sudo certbot renew --dry-run

# 添加自动续期任务
sudo crontab -e

# 添加以下行（每天凌晨2点检查并续期证书）
0 2 * * * /usr/bin/certbot renew --quiet
```

## 8 性能优化

### 8.1 WordPress缓存配置

安装和配置WordPress缓存插件：

1. 登录WordPress后台
2. 安装并激活W3 Total Cache或WP Super Cache插件
3. 配置缓存设置：
   - 启用页面缓存
   - 启用数据库缓存
   - 启用对象缓存
   - 启用浏览器缓存

### 8.2 Nginx缓存配置

配置Nginx FastCGI缓存：

```bash
# 编辑Nginx配置文件
sudo nano /etc/nginx/nginx.conf

# 在http块中添加FastCGI缓存配置
fastcgi_cache_path /var/cache/nginx/fastcgi levels=1:2 keys_zone=WORDPRESS:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
fastcgi_cache_use_stale error timeout invalid_header http_500;
fastcgi_ignore_headers Cache-Control Expires Set-Cookie;

# 编辑站点配置文件
sudo nano /etc/nginx/sites-available/blog

# 在server块中添加缓存配置
set $skip_cache 0;

# POST请求和带有查询参数的请求跳过缓存
if ($request_method = POST) {
    set $skip_cache 1;
}

if ($query_string != "") {
    set $skip_cache 1;
}

# 特定页面跳过缓存
if ($request_uri ~* "/wp-admin/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml") {
    set $skip_cache 1;
}

# 登录用户跳过缓存
if ($http_cookie ~* "comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in") {
    set $skip_cache 1;
}

location ~ \.php$ {
    try_files $uri =404;
    include fastcgi_params;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    
    fastcgi_cache_bypass $skip_cache;
    fastcgi_no_cache $skip_cache;
    fastcgi_cache WORDPRESS;
    fastcgi_cache_valid 60m;
}

# 添加缓存状态头
add_header X-FastCGI-Cache $upstream_cache_status;

# 创建缓存目录
sudo mkdir -p /var/cache/nginx/fastcgi
sudo chown -R www-data:www-data /var/cache/nginx

# 测试并重启Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## 9 监控和日志配置

### 9.1 Netdata监控安装

安装Netdata系统监控工具：

```bash
# 安装Netdata
bash <(curl -Ss https://my-netdata.io/kickstart.sh)

# 启动并设置开机自启
sudo systemctl start netdata
sudo systemctl enable netdata

# 配置访问控制
sudo nano /etc/netdata/netdata.conf

# 修改以下配置
[web]
    bind to = 127.0.0.1 10.0.0.1  # 允许特定IP访问
    allow connections from = localhost 10.0.0.0/24  # 允许特定网段访问

# 重启Netdata
sudo systemctl restart netdata
```

### 9.2 日志轮转配置

配置日志轮转防止日志文件过大：

```bash
# 创建Nginx日志轮转配置
sudo nano /etc/logrotate.d/nginx

# 添加以下内容
/var/log/nginx/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data adm
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}

# 创建PHP-FPM日志轮转配置
sudo nano /etc/logrotate.d/php7.4-fpm

# 添加以下内容
/var/log/php7.4-fpm.log {
    weekly
    missingok
    rotate 12
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        /usr/lib/php/php7.4-fpm-reopenlogs
    endscript
}
```

## 10 备份策略实施

### 10.1 数据库备份脚本

创建数据库备份脚本：

```bash
# 创建备份目录
sudo mkdir -p /backup/mysql

# 创建备份脚本
sudo nano /usr/local/bin/backup_mysql.sh

# 添加以下内容
#!/bin/bash

# 配置
DB_USER="wpuser"
DB_PASS="strong_password"
DB_NAME="wordpress"
BACKUP_DIR="/backup/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/wordpress_backup_$DATE.sql"
RETENTION_DAYS=7

# 创建备份
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_FILE

# 压缩备份文件
gzip $BACKUP_FILE

# 删除旧备份
find $BACKUP_DIR -name "*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

echo "Database backup completed: $BACKUP_FILE.gz"

# 设置执行权限
sudo chmod +x /usr/local/bin/backup_mysql.sh
```

### 10.2 文件备份脚本

创建网站文件备份脚本：

```bash
# 创建备份目录
sudo mkdir -p /backup/files

# 创建备份脚本
sudo nano /usr/local/bin/backup_files.sh

# 添加以下内容
#!/bin/bash

# 配置
SOURCE_DIR="/var/www/blog"
BACKUP_DIR="/backup/files"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/blog_files_backup_$DATE.tar.gz"
RETENTION_DAYS=7

# 创建备份
tar -czf $BACKUP_FILE -C $SOURCE_DIR .

# 删除旧备份
find $BACKUP_DIR -name "*.tar.gz" -type f -mtime +$RETENTION_DAYS -delete

echo "Files backup completed: $BACKUP_FILE"

# 设置执行权限
sudo chmod +x /usr/local/bin/backup_files.sh
```

### 10.3 自动备份配置

设置定时备份任务：

```bash
# 编辑crontab
sudo crontab -e

# 添加以下行（每天凌晨3点备份数据库，凌晨4点备份文件）
0 3 * * * /usr/local/bin/backup_mysql.sh >> /var/log/backup.log 2>&1
0 4 * * * /usr/local/bin/backup_files.sh >> /var/log/backup.log 2>&1
```

### 10.4 远程备份配置

配置远程备份到云存储：

```bash
# 安装Rclone（用于云存储同步）
sudo curl https://rclone.org/install.sh | sudo bash

# 配置Rclone（按照提示配置云存储）
rclone config

# 创建远程备份脚本
sudo nano /usr/local/bin/backup_remote.sh

# 添加以下内容
#!/bin/bash

# 配置
LOCAL_BACKUP_DIR="/backup"
REMOTE_NAME="your_remote_name"  # Rclone配置的远程存储名称
REMOTE_DIR="backups/blog"
DATE=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/var/log/remote_backup.log"

# 同步到远程存储
rclone sync $LOCAL_BACKUP_DIR $REMOTE_NAME:$REMOTE_DIR --log-file=$LOG_FILE

echo "Remote backup completed at $DATE" >> $LOG_FILE

# 设置执行权限
sudo chmod +x /usr/local/bin/backup_remote.sh

# 添加到crontab（每周日凌晨5点执行远程备份）
sudo crontab -e

# 添加以下行
0 5 * * 0 /usr/local/bin/backup_remote.sh >> /var/log/remote_backup.log 2>&1
```

## 11 安全加固

### 11.1 文件权限加固

优化WordPress文件权限：

```bash
# 创建权限设置脚本
sudo nano /usr/local/bin/wordpress_permissions.sh

# 添加以下内容
#!/bin/bash

# 配置
WP_PATH="/var/www/blog"
WP_USER="www-data"
WP_GROUP="www-data"

# 设置目录权限
find $WP_PATH -type d -exec chmod 755 {} \;

# 设置文件权限
find $WP_PATH -type f -exec chmod 644 {} \;

# 设置wp-config.php权限
chmod 600 $WP_PATH/wp-config.php

# 设置所有者
chown -R $WP_USER:$WP_GROUP $WP_PATH

echo "WordPress permissions updated"

# 设置执行权限
sudo chmod +x /usr/local/bin/wordpress_permissions.sh

# 执行脚本
sudo /usr/local/bin/wordpress_permissions.sh
```

### 11.2 WordPress安全插件

安装和配置WordPress安全插件：

1. 登录WordPress后台
2. 安装并激活Wordfence Security或Sucuri Security插件
3. 配置安全设置：
   - 启用防火墙
   - 启用恶意软件扫描
   - 配置登录保护
   - 设置文件变更检测

### 11.3 系统安全更新

设置自动安全更新：

```bash
# 安装自动更新软件包
sudo apt install unattended-upgrades

# 配置自动更新
sudo dpkg-reconfigure -plow unattended-upgrades

# 编辑配置文件
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades

# 修改以下配置
Unattended-Upgrade::Automatic-Reboot "false";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot-Time "02:00";

# 启用自动更新
sudo nano /etc/apt/apt.conf.d/20auto-upgrades

# 添加以下内容
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Download-Upgradeable-Packages "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1";
```

## 12 项目总结

### 12.1 完成功能

通过本项目，我们成功搭建了一个功能完整的个人博客服务器，包括：

1. **系统基础配置**：用户管理、SSH安全、系统优化
2. **网络和安全**：防火墙配置、入侵检测
3. **Web服务**：Nginx反向代理、PHP-FPM应用服务器
4. **数据库服务**：MariaDB数据库服务器
5. **博客平台**：WordPress内容管理系统
6. **SSL加密**：Let's Encrypt免费SSL证书
7. **性能优化**：缓存配置、系统优化
8. **监控系统**：Netdata系统监控
9. **备份策略**：数据库备份、文件备份、远程备份
10. **安全加固**：文件权限、安全插件、自动更新

### 12.2 技术要点

本项目涉及的主要技术要点：

1. **Linux系统管理**：用户管理、权限控制、服务管理
2. **网络配置**：防火墙规则、域名解析、SSL证书
3. **Web服务配置**：Nginx虚拟主机、PHP-FPM配置
4. **数据库管理**：MariaDB安装、用户权限、性能优化
5. **安全防护**：防火墙、入侵检测、文件权限
6. **性能优化**：缓存策略、系统参数调优
7. **监控和日志**：系统监控、日志管理
8. **备份和恢复**：数据备份、远程同步
9. **自动化运维**：定时任务、脚本自动化

### 12.3 扩展建议

为进一步完善博客服务器，可以考虑以下扩展：

1. **CDN加速**：使用CloudFlare等CDN服务加速静态资源
2. **负载均衡**：多台服务器实现负载均衡和高可用
3. **容器化部署**：使用Docker容器化部署应用
4. **CI/CD流水线**：使用Jenkins或GitLab CI实现自动化部署
5. **高级监控**：使用Prometheus和Grafana构建监控系统
6. **日志分析**：使用ELK Stack进行日志收集和分析
7. **自动化运维**：使用Ansible实现配置管理和自动化部署

### 12.4 维护建议

为确保博客服务器长期稳定运行，建议定期执行以下维护任务：

1. **系统更新**：定期更新系统软件包和安全补丁
2. **备份验证**：定期验证备份文件的完整性和可恢复性
3. **日志分析**：定期检查系统日志，发现潜在问题
4. **性能监控**：监控系统资源使用情况，及时优化
5. **安全扫描**：定期进行安全扫描，发现和修复安全漏洞
6. **清理任务**：定期清理临时文件和过期日志
7. **容量规划**：监控磁盘空间使用情况，及时扩容

通过本项目的实践，您不仅掌握了Linux系统管理的核心技能，还学会了如何将这些技能应用到实际项目中，构建一个完整、安全、高性能的Web服务。这些技能和经验将为您未来的Linux系统管理和运维工作打下坚实的基础。