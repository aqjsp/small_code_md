# 第9章：系统服务管理

## 概述

系统服务是Linux系统中在后台运行的程序，它们不与用户直接交互，但为系统和其他应用程序提供重要功能。服务管理是系统管理员的核心任务之一，涉及服务的启动、停止、配置和监控等方面。

Systemd是现代Linux发行版中广泛采用的系统和服务管理器，它取代了传统的SysVinit和Upstart。本章将详细介绍Systemd的使用方法，包括服务单元、目标单元、定时器等概念，以及如何使用systemctl命令管理系统服务。

## 1 Systemd基础

### 1.1 Systemd概述

Systemd是Linux系统的系统和服务管理器，具有以下特点：

1. **并行启动**：并行启动服务，提高系统启动速度
2. **按需启动**：仅在需要时启动服务，节省系统资源
3. **依赖管理**：自动处理服务间的依赖关系
4. **快照支持**：可以保存和恢复系统状态
5. **资源控制**：集成cgroups，可以限制服务资源使用

### 1.2 Systemd单元类型

Systemd使用单元（Unit）来管理不同类型的系统资源：

1. **服务单元（.service）**：系统服务
2. **套接字单元（.socket）**：网络套接字
3. **设备单元（.device）**：设备文件
4. **挂载单元（.mount）**：文件系统挂载点
5. **自动挂载单元（.automount）**：自动挂载点
6. **交换分区单元（.swap）**：交换分区或文件
7. **目标单元（.target）**：系统运行级别
8. **路径单元（.path）**：文件系统路径
9. **定时器单元（.timer）**：定时任务
10. **快照单元（.snapshot）**：系统状态快照

### 1.3 Systemd目录结构

Systemd配置文件存储在以下目录：

1. **/etc/systemd/system/**：系统管理员创建的单元文件
2. **/run/systemd/system/**：运行时创建的单元文件
3. **/usr/lib/systemd/system/**：发行版默认的单元文件

优先级从高到低为：/etc/systemd/system/ > /run/systemd/system/ > /usr/lib/systemd/system/

## 2 systemctl命令基础

### 2.1 服务管理

```bash
# 启动服务
sudo systemctl start service_name

# 停止服务
sudo systemctl stop service_name

# 重启服务
sudo systemctl restart service_name

# 重新加载服务配置（不重启服务）
sudo systemctl reload service_name

# 查看服务状态
systemctl status service_name

# 查看服务是否活动
systemctl is-active service_name

# 查看服务是否启用
systemctl is-enabled service_name

# 启用服务（开机自启）
sudo systemctl enable service_name

# 禁用服务（取消开机自启）
sudo systemctl disable service_name

# 同时启用并启动服务
sudo systemctl enable --now service_name

# 同时禁用并停止服务
sudo systemctl disable --now service_name

# 重新加载systemd配置
sudo systemctl daemon-reload

# 查看服务配置
systemctl cat service_name
```

### 2.2 服务查询

```bash
# 列出所有服务
systemctl list-units --type=service

# 列出所有服务（包括未加载的）
systemctl list-units --type=service --all

# 列出已启用的服务
systemctl list-unit-files --type=service --state=enabled

# 列出已禁用的服务
systemctl list-unit-files --type=service --state=disabled

# 列出失败的服务
systemctl --failed --type=service

# 查看服务依赖关系
systemctl list-dependencies service_name

# 查看反向依赖关系
systemctl list-dependencies --reverse service_name

# 查看服务日志
journalctl -u service_name

# 实时查看服务日志
journalctl -f -u service_name

# 查看服务最近的日志
journalctl -u service_name --since "1 hour ago"
```

### 2.3 系统管理

```bash
# 关闭系统
sudo systemctl poweroff

# 重启系统
sudo systemctl reboot

# 暂停系统
sudo systemctl suspend

# 休眠系统
sudo systemctl hibernate

# 混合休眠（休眠+暂停）
sudo systemctl hybrid-sleep

# 查看系统目标
systemctl get-default

# 设置系统目标
sudo systemctl set-default target_name

# 切换到系统目标
sudo systemctl isolate target_name

# 查看系统运行级别
runlevel

# 列出所有目标
systemctl list-units --type=target
```

## 3 服务单元文件

### 3.1 服务单元文件结构

服务单元文件通常包含以下部分：

```ini
[Unit]
Description=服务描述
Documentation=文档链接
After=network.target
Wants=network.target
Requires=another.service

[Service]
Type=simple
ExecStart=/usr/bin/command
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
User=username
Group=groupname
WorkingDirectory=/path/to/directory
Environment=VAR1=value1
EnvironmentFile=/path/to/env_file

[Install]
WantedBy=multi-user.target
```

### 3.2 [Unit]部分

```ini
[Unit]
Description=服务描述信息
Documentation=man:page(1) http://example.com/docs
After=network.target remote-fs.target nss-lookup.target
Wants=network.target
Requires=another.service
Before=some.service
OnFailure=some_other.service
ConditionPathExists=/path/to/file
ConditionPathIsDirectory=/path/to/directory
```

常用选项：
- **Description**：服务描述
- **Documentation**：文档链接
- **After**：指定在哪些单元之后启动
- **Before**：指定在哪些单元之前启动
- **Wants**：弱依赖，如果依赖单元失败，不影响当前单元
- **Requires**：强依赖，如果依赖单元失败，当前单元也会失败
- **Condition***：启动条件

### 3.3 [Service]部分

```ini
[Service]
Type=simple
ExecStart=/usr/bin/command --option
ExecStartPre=/usr/bin/pre_command
ExecStartPost=/usr/bin/post_command
ExecReload=/bin/kill -HUP $MAINPID
ExecStop=/usr/bin/stop_command
ExecStopPost=/usr/bin/post_stop_command
Restart=always
RestartSec=5
TimeoutStartSec=30
TimeoutStopSec=30
User=username
Group=groupname
WorkingDirectory=/path/to/directory
Environment=VAR1=value1 VAR2=value2
EnvironmentFile=/path/to/env_file
PIDFile=/var/run/service.pid
StandardOutput=journal
StandardError=inherit
SyslogIdentifier=service_name
```

服务类型：
- **simple**：默认类型，ExecStart启动的进程是主进程
- **forking**：ExecStart启动的进程会通过fork()创建子进程，父进程退出
- **oneshot**：一次性任务，执行完成后立即退出
- **dbus**：通过D-Bus启动的服务
- **notify**：服务启动后会通过sd_notify()通知systemd
- **idle**：在所有其他任务完成后才启动的服务

重启策略：
- **no**：不自动重启
- **on-success**：仅在成功退出时重启
- **on-failure**：仅在失败退出时重启
- **on-abnormal**：仅在异常退出时重启
- **on-abort**：仅在收到未捕获信号时重启
- **always**：总是重启

### 3.4 [Install]部分

```ini
[Install]
WantedBy=multi-user.target
RequiredBy=graphical.target
Also=another.service
Alias=alias.service
```

常用选项：
- **WantedBy**：指定在哪个target下启用服务
- **RequiredBy**：指定在哪个target下需要服务
- **Also**：同时启用/禁用其他单元
- **Alias**：为服务创建别名

## 4 创建自定义服务

### 4.1 创建简单服务

```bash
# 创建服务单元文件
sudo nano /etc/systemd/system/myapp.service
```

```ini
[Unit]
Description=My Application
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/myapp
Restart=always
User=myuser
Group=myuser
WorkingDirectory=/opt/myapp
Environment=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
Environment=MYAPP_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start myapp

# 查看服务状态
systemctl status myapp

# 启用服务（开机自启）
sudo systemctl enable myapp
```

### 4.2 创建Web应用服务

```bash
# 创建Web应用服务
sudo nano /etc/systemd/system/webapp.service
```

```ini
[Unit]
Description=Web Application
After=network.target mysql.service redis.service
Wants=mysql.service redis.service

[Service]
Type=forking
PIDFile=/var/run/webapp.pid
ExecStart=/usr/local/bin/webapp start
ExecStop=/usr/local/bin/webapp stop
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=10
User=www-data
Group=www-data
WorkingDirectory=/var/www/webapp
Environment=RAILS_ENV=production
EnvironmentFile=/etc/webapp/environment

[Install]
WantedBy=multi-user.target
```

```bash
# 创建环境文件
sudo nano /etc/webapp/environment
```

```
DATABASE_URL=mysql://user:pass@localhost/dbname
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=your_secret_key
```

```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 启动并启用服务
sudo systemctl enable --now webapp

# 查看服务状态
systemctl status webapp

# 查看服务日志
journalctl -u webapp
```

### 4.3 创建定时服务

```bash
# 创建定时器单元
sudo nano /etc/systemd/system/backup.timer
```

```ini
[Unit]
Description=Run backup service daily

[Timer]
OnCalendar=daily
Persistent=true
RandomizedDelaySec=1800

[Install]
WantedBy=timers.target
```

```bash
# 创建服务单元
sudo nano /etc/systemd/system/backup.service
```

```ini
[Unit]
Description=Backup service

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh
```

```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 启用并启动定时器
sudo systemctl enable --now backup.timer

# 查看定时器状态
systemctl status backup.timer

# 列出所有定时器
systemctl list-timers
```

## 5 目标单元管理

### 5.1 常见目标单元

1. **poweroff.target**：关机
2. **reboot.target**：重启
3. **halt.target**：停止系统
4. **rescue.target**：救援模式
5. **emergency.target**：紧急模式
6. **multi-user.target**：多用户模式（无图形界面）
7. **graphical.target**：图形界面模式
8. **network.target**：网络可用
9. **network-online.target**：网络在线

### 5.2 目标单元操作

```bash
# 查看当前目标
systemctl get-default

# 列出所有目标
systemctl list-units --type=target

# 切换到多用户模式
sudo systemctl isolate multi-user.target

# 切换到图形界面模式
sudo systemctl isolate graphical.target

# 设置默认目标
sudo systemctl set-default graphical.target

# 创建自定义目标
sudo mkdir /etc/systemd/system/custom.target
```

```ini
# 自定义目标配置
[Unit]
Description=Custom Target
Requires=basic.target network.target
After=basic.target network.target
AllowIsolate=yes
```

```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 切换到自定义目标
sudo systemctl isolate custom.target
```

## 6 系统日志管理

### 6.1 journalctl基础

```bash
# 查看系统日志
journalctl

# 查看内核日志
journalctl -k

# 查看最近的日志
journalctl -n 100

# 实时查看日志
journalctl -f

# 查看特定时间的日志
journalctl --since "2023-01-01 00:00:00"
journalctl --until "2023-01-02 00:00:00"
journalctl --since "1 hour ago"
journalctl --since yesterday

# 查看特定优先级的日志
journalctl -p err
journalctl -p warning
journalctl -p info

# 查看特定服务的日志
journalctl -u service_name

# 查看特定进程的日志
journalctl _PID=pid_number

# 查看特定用户的日志
journalctl _UID=user_id

# 导出日志
journalctl > /path/to/journal.log
```

### 6.2 日志持久化

```bash
# 检查日志存储配置
cat /etc/systemd/journald.conf | grep Storage

# 配置日志持久化
sudo nano /etc/systemd/journald.conf
```

```ini
[Journal]
Storage=persistent
Compress=yes
SystemMaxUse=1G
SystemMaxFileSize=100M
RuntimeMaxUse=100M
RuntimeMaxFileSize=10M
```

```bash
# 创建日志目录
sudo mkdir -p /var/log/journal

# 重启journald服务
sudo systemctl restart systemd-journald

# 检查日志目录
ls -la /var/log/journal/
```

## 7 服务性能优化

### 7.1 资源限制

```ini
[Service]
# CPU限制
CPUQuota=50%
CPUQuotaPeriodSec=1s

# 内存限制
MemoryLimit=512M
MemoryMax=1G

# 进程数限制
LimitNOFILE=65536
LimitNPROC=4096

# I/O限制
IOReadBandwidthMax=/dev/sda 10M
IOWriteBandwidthMax=/dev/sda 5M
```

### 7.2 安全设置

```ini
[Service]
# 用户和组
User=nobody
Group=nogroup

# 权限限制
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
PrivateDevices=true
ProtectKernelTunables=true
ProtectControlGroups=true
RestrictRealtime=true
RestrictSUIDSGID=true
RemoveIPC=true
```

## 8 服务故障排除

### 8.1 常见问题诊断

```bash
# 查看服务状态
systemctl status service_name

# 查看服务日志
journalctl -u service_name

# 查看服务配置
systemctl cat service_name

# 检查服务依赖
systemctl list-dependencies service_name

# 验证服务配置
systemd-analyze verify service_name

# 查看服务启动时间
systemd-analyze blame
systemd-analyze critical-chain service_name
```

### 8.2 服务调试

```bash
# 启用调试模式
sudo systemctl edit service_name
```

```ini
[Service]
Environment=SYSTEMD_LOG_LEVEL=debug
```

```bash
# 重新加载配置并重启服务
sudo systemctl daemon-reload
sudo systemctl restart service_name

# 查看详细日志
journalctl -u service_name -b
```

### 8.3 服务恢复

```bash
# 重置服务配置
sudo systemctl revert service_name

# 清除服务状态
sudo systemctl reset-failed service_name

# 重新加载所有服务配置
sudo systemctl daemon-reload

# 重启所有服务
sudo systemctl restart --all
```

## 9 实践练习

### 9.1 基础练习

1. 服务管理：
   - 查看系统中所有服务的状态
   - 启动、停止、重启一个服务
   - 启用、禁用一个服务

2. 服务查询：
   - 查找特定服务的日志
   - 查看服务的依赖关系
   - 检查服务的配置文件

3. 目标管理：
   - 查看当前系统目标
   - 切换到不同的系统目标
   - 设置默认系统目标

### 9.2 进阶练习

1. 自定义服务：
   - 创建一个简单的自定义服务
   - 配置服务的启动参数和环境变量
   - 设置服务的重启策略

2. 服务优化：
   - 为服务设置资源限制
   - 配置服务的安全选项
   - 优化服务的启动性能

3. 故障排除：
   - 模拟服务故障并恢复
   - 分析服务日志找出问题
   - 修复服务配置错误

## 10 常见问题与解决方案

### 10.1 服务启动问题

1. **服务启动失败**
   - 问题：服务无法启动，状态为failed
   - 解决：检查服务日志，修复配置错误

2. **服务启动超时**
   - 问题：服务启动时间过长，导致超时
   - 解决：增加TimeoutStartSec值，或优化服务启动过程

3. **依赖关系错误**
   - 问题：服务依赖的其他服务未启动
   - 解决：检查并启动依赖服务，或调整依赖关系

### 10.2 服务运行问题

1. **服务意外停止**
   - 问题：服务在运行过程中意外停止
   - 解决：设置Restart=always，或分析服务日志找出停止原因

2. **服务资源占用过高**
   - 问题：服务占用过多CPU或内存资源
   - 解决：设置资源限制，或优化服务代码

3. **服务权限问题**
   - 问题：服务无法访问所需文件或目录
   - 解决：调整文件权限，或以适当用户身份运行服务

### 10.3 服务配置问题

1. **配置文件错误**
   - 问题：服务单元文件语法错误
   - 解决：使用systemd-analyze verify检查配置

2. **环境变量问题**
   - 问题：服务无法访问所需环境变量
   - 解决：在服务单元文件中设置Environment或EnvironmentFile

3. **路径问题**
   - 问题：服务无法找到所需文件或目录
   - 解决：使用绝对路径，或设置WorkingDirectory

## 11 本章小结

本章详细介绍了Linux系统服务管理，包括：

1. Systemd基础：Systemd概述、单元类型和目录结构
2. systemctl命令：服务管理、服务查询和系统管理
3. 服务单元文件：单元文件结构、[Unit]、[Service]和[Install]部分
4. 创建自定义服务：简单服务、Web应用服务和定时服务的创建方法
5. 目标单元管理：常见目标单元和操作方法
6. 系统日志管理：journalctl命令和日志持久化配置
7. 服务性能优化：资源限制和安全设置
8. 服务故障排除：常见问题诊断、调试和恢复方法

掌握系统服务管理是Linux系统管理和运维的核心技能。通过合理地配置和管理系统服务，可以确保系统的稳定性、安全性和性能。Systemd作为现代Linux发行版的标准系统和服务管理器，提供了强大而灵活的服务管理功能，是系统管理员必须掌握的工具。

下一章将介绍Linux磁盘与文件系统管理，包括磁盘分区、文件系统创建、挂载、扩容等内容，这是系统存储管理的重要基础。