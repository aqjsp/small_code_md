# 第16章：系统监控与日志分析

## 1. 系统监控概述

### 1.1 监控的重要性

系统监控是Linux系统管理中的关键环节，它可以帮助管理员：
- 及时发现系统问题和性能瓶颈
- 预防潜在的系统故障
- 优化系统资源分配
- 保障系统稳定运行
- 满足合规性要求

### 1.2 监控指标分类

常见的系统监控指标包括：

1. **系统资源指标**
   - CPU使用率
   - 内存使用情况
   - 磁盘空间和I/O
   - 网络流量

2. **进程指标**
   - 进程数量和状态
   - 进程资源消耗
   - 关键服务状态

3. **系统指标**
   - 系统负载
   - 文件描述符使用
   - 系统调用统计

4. **应用指标**
   - 应用响应时间
   - 错误率
   - 吞吐量

## 2 系统性能监控工具

### 2.1 top命令

`top`命令是Linux中最常用的实时系统监控工具：

```bash
# 启动top命令
top

# 在top界面中可以使用以下快捷键：
# 1 - 显示单个CPU核心的状态
# M - 按内存使用率排序
# P - 按CPU使用率排序
# c - 显示完整命令路径
# q - 退出top

# 指定更新间隔（单位：秒）
top -d 5

# 只运行指定次数后退出
top -n 1

# 监控指定用户进程
top -u username

# 监控指定进程
top -p 1234
```

top输出字段解释：
- `PID` - 进程ID
- `USER` - 进程所有者
- `PR` - 优先级
- `NI` - nice值
- `VIRT` - 虚拟内存使用
- `RES` - 物理内存使用
- `SHR` - 共享内存使用
- `S` - 进程状态（S=睡眠，R=运行，Z=僵尸）
- `%CPU` - CPU使用率
- `%MEM` - 内存使用率
- `TIME+` - 累计CPU时间
- `COMMAND` - 命令名

### 2.2 htop命令

`htop`是`top`的增强版，提供更友好的界面和更多功能：

```bash
# 安装htop
# Ubuntu/Debian
sudo apt-get install htop

# CentOS/RHEL
sudo yum install htop

# 使用htop
htop

# htop中的常用快捷键：
# F1 - 帮助
# F2 - 设置
# F3 - 搜索进程
# F4 - 过滤进程
# F5 - 树状视图
# F6 - 排序方式
# F7 - 降低nice值
# F8 - 提高nice值
# F9 - 终止进程
# F10 - 退出
```

### 2.3 vmstat命令

`vmstat`命令用于报告虚拟内存统计信息：

```bash
# 显示系统概览（默认以KB为单位）
vmstat

# 指定时间间隔和次数
vmstat 2 5  # 每2秒更新一次，共5次

# 显示活跃和非活跃内存
vmstat -a

# 显示磁盘相关统计
vmstat -d

# 显示磁盘分区统计
vmstat -D

# 显示系统事件计数器和内存统计
vmstat -s

# 显示slab信息
vmstat -m
```

vmstat输出字段解释：
- `procs` - 进程信息
  - `r` - 等待运行的进程数
  - `b` - 处于不可中断睡眠状态的进程数
- `memory` - 内存信息
  - `swpd` - 使用的虚拟内存量
  - `free` - 空闲内存量
  - `buff` - 用作缓冲区的内存量
  - `cache` - 用作缓存的内存量
- `swap` - 交换空间信息
  - `si` - 从磁盘交换进内存的速率
  - `so` - 从内存交换到磁盘的速率
- `io` - I/O信息
  - `bi` - 发送到块设备的速率
  - `bo` - 从块设备接收的速率
- `system` - 系统信息
  - `in` - 每秒中断数
  - `cs` - 每秒上下文切换数
- `cpu` - CPU信息
  - `us` - 用户空间占用CPU百分比
  - `sy` - 内核空间占用CPU百分比
  - `id` - 空闲CPU百分比
  - `wa` - 等待I/O的CPU百分比
  - `st` - 虚拟机偷走的CPU时间

### 2.4 iostat命令

`iostat`命令用于监控系统输入/输出设备和CPU的使用情况：

```bash
# 安装iostat
# Ubuntu/Debian
sudo apt-get install sysstat

# CentOS/RHEL
sudo yum install sysstat

# 显示CPU和I/O统计
iostat

# 以指定间隔更新
iostat 2 5  # 每2秒更新一次，共5次

# 显示设备详细信息
iostat -x

# 显示指定设备
iostat -d sda

# 显示人类可读格式
iostat -h

# 显示扩展统计信息
iostat -x
```

### 2.5 sar命令

`sar`命令用于收集、报告和保存系统活动信息：

```bash
# 安装sar
# Ubuntu/Debian
sudo apt-get install sysstat

# CentOS/RHEL
sudo yum install sysstat

# 启用sar数据收集
# Ubuntu/Debian
sudo vi /etc/default/sysstat
# 设置 ENABLED="true"

# CentOS/RHEL
sudo systemctl enable sysstat
sudo systemctl start sysstat

# 查看CPU使用率
sar -u

# 查看内存使用情况
sar -r

# 查看交换空间使用情况
sar -W

# 查看I/O和传输速率统计
sar -b

# 查看网络统计
sar -n DEV

# 查看队列长度和负载平均
sar -q

# 查看指定时间范围的数据
sar -s 10:00:00 -e 11:00:00

# 查看历史数据
sar -f /var/log/sysstat/sa01  # 查看本月1号的数据
```

## 3 内存监控

### 3.1 free命令

`free`命令用于显示系统内存使用情况：

```bash
# 显示内存使用情况（默认以KB为单位）
free

# 以人类可读格式显示
free -h

# 以MB为单位显示
free -m

# 以GB为单位显示
free -g

# 持续监控内存使用情况
free -s 5  # 每5秒更新一次

# 显示指定次数
free -c 5  # 共显示5次

# 显示低内存和高内存统计
free -l
```

free输出字段解释：
- `Mem` - 物理内存
  - `total` - 总内存
  - `used` - 已使用内存
  - `free` - 空闲内存
  - `shared` - 共享内存
  - `buff/cache` - 缓冲区和缓存
  - `available` - 可用内存
- `Swap` - 交换空间
  - `total` - 总交换空间
  - `used` - 已使用交换空间
  - `free` - 空闲交换空间

### 3.2 pmap命令

`pmap`命令用于显示进程的内存映射：

```bash
# 显示指定进程的内存映射
pmap 1234

# 显示详细信息
pmap -d 1234

# 显示扩展信息
pmap -x 1234

# 显示人类可读格式
pmap -h 1234

# 显示所有进程的内存映射
pmap -x 1
```

### 3.3 slabtop命令

`slabtop`命令用于实时显示内核slab缓存信息：

```bash
# 启动slabtop
slabtop

# 在slabtop界面中可以使用以下快捷键：
# c - 按缓存大小排序
# l - 按对象数量排序
# v - 按每CPU对象数量排序
# p - 按每页对象数量排序
# s - 按slab大小排序
# n - 按名称排序
# a - 按活动对象数量排序
# b - 按每CPU活动对象数量排序
# o - 按每页活动对象数量排序
# r - 刷新显示
# q - 退出slabtop
```

## 4 CPU监控

### 4.1 uptime命令

`uptime`命令用于显示系统运行时间以及平均负载：

```bash
# 显示系统运行时间和负载
uptime

# 显示更精确的时间
uptime -p

# 显示系统启动时间
uptime -s

# 显示系统运行时间
uptime -V
```

uptime输出解释：
- 当前时间
- 系统运行时间
- 当前登录用户数
- 系统负载（1分钟、5分钟、15分钟平均值）

### 4.2 mpstat命令

`mpstat`命令用于报告与CPU相关的统计信息：

```bash
# 安装mpstat
# Ubuntu/Debian
sudo apt-get install sysstat

# CentOS/RHEL
sudo yum install sysstat

# 显示所有CPU的统计信息
mpstat

# 显示指定CPU的统计信息
mpstat -P 0  # 显示CPU 0的统计信息

# 显示所有CPU的统计信息
mpstat -P ALL

# 指定时间间隔和次数
mpstat 2 5  # 每2秒更新一次，共5次

# 显示人类可读格式
mpstat -h
```

### 4.3 lscpu命令

`lscpu`命令用于显示CPU架构信息：

```bash
# 显示CPU信息
lscpu

# 显示扩展信息
lscpu -e

# 显示在线CPU
lscpu -p

# 显示缓存信息
lscpu -C
```

## 5 磁盘监控

### 5.1 df命令

`df`命令用于显示文件系统的磁盘空间使用情况：

```bash
# 显示所有文件系统的磁盘使用情况
df

# 以人类可读格式显示
df -h

# 显示特定文件系统类型
df -t ext4

# 排除特定文件系统类型
df -x tmpfs

# 显示inode使用情况
df -i

# 显示总计
df --total

# 显示本地文件系统
df -l

# 显示块大小为1K
df -k

# 显示块大小为1M
df -m
```

### 5.2 du命令

`du`命令用于显示文件和目录的磁盘使用情况：

```bash
# 显示当前目录的磁盘使用情况
du

# 以人类可读格式显示
du -h

# 显示总计
du -c

# 显示每个参数的总计
du -s

# 显示指定深度
du --max-depth=1

# 显示文件和目录的大小
du -a

# 按大小排序
du -h | sort -rh

# 显示最大的10个文件和目录
du -ah | sort -rh | head -n 10
```

### 5.3 lsblk命令

`lsblk`命令用于列出块设备信息：

```bash
# 显示块设备信息
lsblk

# 显示详细信息
lsblk -f

# 显示所有设备（包括空设备）
lsblk -a

# 显示权限信息
lsblk -m

# 显示树状结构
lsblk -T

# 以字节为单位显示大小
lsblk -b

# 显示设备UUID
lsblk -o NAME,UUID
```

## 6 网络监控

### 6.1 netstat命令

`netstat`命令用于显示网络连接、路由表、接口统计等网络信息：

```bash
# 显示所有连接
netstat -a

# 显示TCP连接
netstat -at

# 显示UDP连接
netstat -au

# 显示监听端口
netstat -l

# 显示进程信息
netstat -p

# 显示数字地址（不解析主机名）
netstat -n

# 显示统计信息
netstat -s

# 显示路由表
netstat -r

# 显示网络接口
netstat -i

# 显示所有TCP连接的进程信息
netstat -tulpn

# 持续监控网络连接
netstat -c
```

### 6.2 ss命令

`ss`命令是`netstat`的现代替代品，用于显示套接字统计信息：

```bash
# 显示所有连接
ss -a

# 显示TCP连接
ss -t

# 显示UDP连接
ss -u

# 显示监听端口
ss -l

# 显示进程信息
ss -p

# 显示数字地址
ss -n

# 显示统计信息
ss -s

# 显示连接状态
ss -state established

# 显示指定端口的连接
ss -tn sport = :80

# 显示连接到指定IP的连接
ss -tn dst 192.168.1.1

# 显示套接字选项
ss -o

# 显示内存信息
ss -m

# 显示定时器信息
ss -e
```

### 6.3 ip命令

`ip`命令用于显示和操作路由、网络设备、策略路由和隧道：

```bash
# 显示网络接口
ip addr show

# 显示路由表
ip route show

# 显示邻居表
ip neigh show

# 显示网络统计
ip -s link

# 显示指定接口信息
ip addr show eth0

# 显示路由缓存
ip route show cache

# 显示策略路由
ip rule show

# 显示隧道信息
ip tunnel show
```

## 7 进程监控

### 7.1 ps命令

`ps`命令用于显示当前进程状态：

```bash
# 显示所有进程
ps aux

# 显示所有进程（BSD格式）
ps -ef

# 显示指定用户进程
ps -u username

# 显示指定进程
ps -p 1234

# 显示进程树
ps -ejH

# 显示线程
ps -eLf

# 显示进程资源使用
ps -eo pid,ppid,cmd,%mem,%cpu

# 按CPU使用率排序
ps aux --sort=-%cpu

# 按内存使用率排序
ps aux --sort=-%mem

# 显示进程的完整命令
ps -f

# 显示进程的环境变量
ps e
```

### 7.2 pstree命令

`pstree`命令以树状结构显示进程：

```bash
# 显示进程树
pstree

# 显示PID
pstree -p

# 显示用户
pstree -u

# 显示命令行参数
pstree -a

# 高亮显示当前进程
pstree -h

# 显示进程排序
pstree -n

# 显示进程压缩
pstree -c

# 显示指定进程的子进程
pstree -p 1234

# 显示指定用户的进程
pstree -u username
```

### 7.3 pgrep和pkill命令

`pgrep`和`pkill`命令用于查找和发送信号给进程：

```bash
# 查找进程
pgrep sshd

# 显示进程名
pgrep -l sshd

# 显示完整进程名
pgrep -f sshd

# 显示PID
pgrep -o sshd  # 显示最旧的进程
pgrep -n sshd  # 显示最新的进程

# 发送信号给进程
pkill sshd

# 发送指定信号
pkill -9 sshd  # 发送SIGKILL信号

# 发送信号给指定用户进程
pkill -u username sshd

# 发送信号给指定终端进程
pkill -t pts/0 sshd

# 交互式选择进程
pkill -i sshd
```

## 8 日志系统基础

### 8.1 日志的重要性

系统日志是Linux系统管理的重要组成部分，它：
- 记录系统活动和事件
- 帮助诊断问题和故障
- 提供安全审计信息
- 支持合规性要求
- 便于性能分析和优化

### 8.2 日志分类

Linux系统中的日志主要分为以下几类：

1. **系统日志**
   - 内核消息
   - 系统启动和关闭
   - 服务启动和停止
   - 硬件事件

2. **应用日志**
   - 应用程序运行状态
   - 用户操作记录
   - 错误和异常信息

3. **安全日志**
   - 登录和认证事件
   - 权限变更
   - 安全相关事件

4. **审计日志**
   - 系统调用记录
   - 文件访问记录
   - 管理员操作记录

## 9 传统日志系统：syslog

### 9.1 syslog概述

`syslog`是Unix/Linux系统中最传统的日志系统，它采用客户端/服务器架构：
- `syslogd`：日志守护进程，负责接收和处理日志消息
- `klogd`：内核日志守护进程，负责收集内核消息

### 9.2 syslog配置

syslog的主要配置文件是`/etc/syslog.conf`（或`/etc/rsyslog.conf`）：

```bash
# 查看syslog配置
cat /etc/syslog.conf

# 配置格式
# facility.priority    action

# 示例配置
*.info;mail.none;authpriv.none;cron.none                /var/log/messages
authpriv.*                                              /var/log/secure
mail.*                                                  -/var/log/maillog
cron.*                                                  /var/log/cron
*.emerg                                                 :omusrmsg:*
uucp,news.crit                                          /var/log/spooler
local7.*                                                /var/log/boot.log
```

facility（设施）类型：
- `auth` - 认证相关
- `authpriv` - 认证相关（私有）
- `cron` - 定时任务
- `daemon` - 系统守护进程
- `kern` - 内核消息
- `lpr` - 打印系统
- `mail` - 邮件系统
- `mark` - 内部标记
- `news` - 新闻系统
- `syslog` - syslog内部消息
- `user` - 用户级消息
- `local0`-`local7` - 本地使用

priority（优先级）级别（从高到低）：
- `emerg` - 紧急情况
- `alert` - 必须立即处理
- `crit` - 严重情况
- `err` - 错误
- `warning` - 警告
- `notice` - 通知
- `info` - 信息
- `debug` - 调试信息

### 9.3 logger命令

`logger`命令用于向syslog发送消息：

```bash
# 发送简单消息
logger "This is a test message"

# 指定优先级
logger -p local0.info "This is an info message"

# 指定标签
logger -t myapp "Application started"

# 从文件读取消息
logger -f /var/log/messages

# 指定进程ID
logger -i "Process ID $$"

# 发送到远程syslog服务器
logger -n logserver.example.com "Remote log message"
```

## 10 现代日志系统：systemd-journald

### 10.1 journald概述

`systemd-journald`是systemd引入的现代化日志系统，它：
- 收集内核和系统服务的日志
- 以二进制格式存储日志
- 支持结构化日志数据
- 提供强大的查询功能
- 与syslog兼容

### 10.2 journalctl命令

`journalctl`是查询systemd日志的主要工具：

```bash
# 显示所有日志
journalctl

# 显示最新日志
journalctl -f

# 显示指定时间范围的日志
journalctl --since "2023-01-01 00:00:00"
journalctl --until "2023-01-02 00:00:00"
journalctl --since yesterday

# 显示指定单元的日志
journalctl -u nginx.service

# 显示指定优先级的日志
journalctl -p err

# 显示内核日志
journalctl -k

# 显示本次启动的日志
journalctl -b

# 显示指定启动次数的日志
journalctl -b -1

# 显示详细输出
journalctl -o verbose

# 显示JSON格式输出
journalctl -o json

# 显示指定数量的日志
journalctl -n 100

# 显示指定进程的日志
journalctl _PID=1234

# 显示指定用户的日志
journalctl _UID=1000

# 显示指定可执行文件的日志
journalctl /usr/bin/nginx

# 显示指定设备的日志
journalctl /dev/sda

# 过滤日志
journalctl -u nginx.service -p err

# 导出日志
journalctl --export > logs.json
```

### 10.3 journald配置

journald的配置文件是`/etc/systemd/journald.conf`：

```bash
# 查看配置文件
cat /etc/systemd/journald.conf

# 常见配置选项
[Journal]
Storage=auto          # 存储方式：volatile(内存), persistent(磁盘), auto(自动)
Compress=yes          # 是否压缩旧日志
Seal=yes              # 是否使用安全密封
SplitMode=uid         # 分割模式：uid, host, none
RateLimitInterval=30s # 速率限制间隔
RateLimitBurst=1000   # 速率限制突发值
SystemMaxUse=10%      # 系统最大使用空间
SystemKeepFree=15%    # 系统保留空间
SystemMaxFileSize=    # 单个文件最大大小
RuntimeMaxUse=10%     # 运行时最大使用空间
RuntimeKeepFree=15%   # 运行时保留空间
RuntimeMaxFileSize=   # 运行时单个文件最大大小
MaxRetentionSec=      # 最大保留时间
MaxFileSec=1month     # 单个文件最大保留时间
SyncIntervalSec=5m    # 同步间隔
ForwardToSyslog=yes   # 是否转发到syslog
ForwardToKMsg=no      # 是否转发到内核消息缓冲区
ForwardToConsole=no   # 是否转发到控制台
ForwardToWall=yes     # 是否转发到所有用户
TTYPath=/dev/console  # 控制台设备路径
MaxLevelStore=debug   # 最大存储级别
MaxLevelSyslog=debug  # 最大syslog级别
MaxLevelKMsg=notice   # 最大内核消息级别
MaxLevelConsole=info  # 最大控制台级别
MaxLevelWall=emerg    # 最大wall级别
```

## 11 日志轮转：logrotate

### 11.1 logrotate概述

`logrotate`是Linux系统中用于管理日志文件的工具，它可以：
- 自动轮转、压缩、删除和邮寄日志文件
- 防止日志文件占用过多磁盘空间
- 保留历史日志信息
- 按计划执行日志管理任务

### 11.2 logrotate配置

logrotate的主配置文件是`/etc/logrotate.conf`，自定义配置通常放在`/etc/logrotate.d/`目录下：

```bash
# 查看主配置文件
cat /etc/logrotate.conf

# 主配置示例
# see "man logrotate" for details
# rotate log files weekly
weekly

# keep 4 weeks worth of backlogs
rotate 4

# create new (empty) log files after rotating old ones
create

# use date as a suffix of the rotated file
dateext

# uncomment this if you want your log files compressed
#compress

# RPM packages drop log rotation information into this directory
include /etc/logrotate.d

# no packages own wtmp and btmp -- we'll rotate them here
/var/log/wtmp {
    monthly
    create 0664 root utmp
    minsize 1M
    rotate 1
}

/var/log/btmp {
    missingok
    monthly
    create 0600 root utmp
    rotate 1
}
```

自定义配置示例（如`/etc/logrotate.d/nginx`）：

```bash
/var/log/nginx/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 640 nginx adm
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}
```

常用配置选项：
- `daily/weekly/monthly/yearly` - 轮转频率
- `rotate` - 保留的日志文件数量
- `compress` - 压缩旧日志
- `delaycompress` - 延迟压缩
- `missingok` - 忽略缺失的日志文件
- `notifempty` - 不轮转空日志文件
- `create` - 轮转后创建新日志文件
- `size` - 按大小轮转
- `maxsize` - 最大文件大小
- `minsize` - 最小文件大小
- `sharedscripts` - 共享脚本
- `postrotate` - 轮转后执行的脚本
- `prerotate` - 轮转前执行的脚本

### 11.3 测试和执行logrotate

```bash
# 测试logrotate配置
logrotate -d /etc/logrotate.conf

# 强制执行logrotate
logrotate -f /etc/logrotate.conf

# 执行特定配置
logrotate -f /etc/logrotate.d/nginx

# 显示详细输出
logrotate -v /etc/logrotate.conf

# 查看logrotate状态
cat /var/lib/logrotate/status
```

## 12 日志分析工具

### 12.1 grep命令

`grep`是日志分析中最常用的工具之一：

```bash
# 搜索包含特定字符串的日志
grep "error" /var/log/messages

# 忽略大小写
grep -i "error" /var/log/messages

# 显示行号
grep -n "error" /var/log/messages

# 显示匹配行及前后文
grep -C 3 "error" /var/log/messages  # 显示前后3行
grep -A 5 "error" /var/log/messages  # 显示后5行
grep -B 5 "error" /var/log/messages  # 显示前5行

# 统计匹配行数
grep -c "error" /var/log/messages

# 反向匹配（不包含指定字符串）
grep -v "debug" /var/log/messages

# 使用正则表达式
grep -E "error|warning|critical" /var/log/messages

# 递归搜索目录
grep -r "error" /var/log/

# 只显示匹配的文件名
grep -l "error" /var/log/*
```

### 12.2 awk命令

`awk`是强大的文本处理工具，适合复杂的日志分析：

```bash
# 提取特定列
awk '{print $1, $7}' /var/log/nginx/access.log

# 统计访问次数最多的IP
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# 统计HTTP状态码
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# 计算平均响应时间
awk '{sum+=$NF; count++} END {print sum/count}' /var/log/nginx/access.log

# 过滤特定时间范围的日志
awk '$4 >= "[01/Jan/2023:00:00:00" && $4 <= "[01/Jan/2023:23:59:59"' /var/log/nginx/access.log

# 统计特定URL的访问次数
awk '$7 == "/api/v1/users" {count++} END {print count}' /var/log/nginx/access.log

# 找出响应时间超过1秒的请求
awk '$NF > 1 {print $0}' /var/log/nginx/access.log

# 统计每个小时的访问量
awk '{print substr($4,14,2)}' /var/log/nginx/access.log | sort | uniq -c
```

### 12.3 sed命令

`sed`是流编辑器，可用于日志内容的修改和过滤：

```bash
# 替换文本
sed 's/error/ERROR/g' /var/log/messages

# 删除包含特定字符串的行
sed '/debug/d' /var/log/messages

# 只显示特定行范围
sed -n '100,200p' /var/log/messages

# 删除空行
sed '/^$/d' /var/log/messages

# 提取IP地址
sed -n 's/.*\([0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\).*/\1/p' /var/log/nginx/access.log

# 删除行首和行尾空白
sed 's/^[ \t]*//;s/[ \t]*$//' /var/log/messages

# 在特定行后插入内容
sed '/error/a\This is an error line' /var/log/messages
```

### 12.4 sort和uniq命令

`sort`和`uniq`常用于日志统计和去重：

```bash
# 统计IP访问次数
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -nr

# 去重
sort /var/log/messages | uniq

# 只显示重复行
sort /var/log/messages | uniq -d

# 只显示不重复行
sort /var/log/messages | uniq -u

# 统计每种状态码的数量
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c

# 按数字排序
sort -n numbers.txt

# 按人类可读格式排序
sort -h sizes.txt
```

## 13 高级日志分析

### 13.1 使用Python分析日志

Python是强大的日志分析工具，可以处理复杂的日志分析任务：

```python
#!/usr/bin/env python3
# 日志分析示例：分析Nginx访问日志

import re
from collections import Counter
from datetime import datetime

# 定义日志格式正则表达式
log_pattern = re.compile(
    r'(?P<ip>\d+\.\d+\.\d+\.\d+) - - \[(?P<time>[^\]]+)\] "(?P<method>\w+) (?P<url>[^\s]+) HTTP/[\d\.]+" (?P<status>\d+) (?P<size>\d+) "(?P<referer>[^"]*)" "(?P<user_agent>[^"]*)" (?P<response_time>[\d\.]+)'
)

def parse_log_line(line):
    """解析单行日志"""
    match = log_pattern.match(line)
    if match:
        return match.groupdict()
    return None

def analyze_log(file_path):
    """分析日志文件"""
    ip_counter = Counter()
    status_counter = Counter()
    url_counter = Counter()
    response_times = []
    
    with open(file_path, 'r') as f:
        for line in f:
            data = parse_log_line(line)
            if data:
                ip_counter[data['ip']] += 1
                status_counter[data['status']] += 1
                url_counter[data['url']] += 1
                response_times.append(float(data['response_time']))
    
    # 计算平均响应时间
    avg_response_time = sum(response_times) / len(response_times) if response_times else 0
    
    # 输出分析结果
    print("Top 10 IP addresses:")
    for ip, count in ip_counter.most_common(10):
        print(f"  {ip}: {count}")
    
    print("\nStatus codes:")
    for status, count in sorted(status_counter.items()):
        print(f"  {status}: {count}")
    
    print("\nTop 10 URLs:")
    for url, count in url_counter.most_common(10):
        print(f"  {url}: {count}")
    
    print(f"\nAverage response time: {avg_response_time:.3f}s")

if __name__ == "__main__":
    analyze_log("/var/log/nginx/access.log")
```

### 13.2 使用Go分析日志

Go语言也适合高效的日志分析：

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
)

// LogEntry 表示日志条目
type LogEntry struct {
	IP           string
	Time         string
	Method       string
	URL          string
	Status       int
	Size         int
	Referer      string
	UserAgent    string
	ResponseTime float64
}

// 定义日志格式正则表达式
var logPattern = regexp.MustCompile(`(?P<ip>\d+\.\d+\.\d+\.\d+) - - \[(?P<time>[^\]]+)\] "(?P<method>\w+) (?P<url>[^\s]+) HTTP/[\d\.]+" (?P<status>\d+) (?P<size>\d+) "(?P<referer>[^"]*)" "(?P<user_agent>[^"]*)" (?P<response_time>[\d\.]+)`)

// parseLogLine 解析单行日志
func parseLogLine(line string) (*LogEntry, error) {
	matches := logPattern.FindStringSubmatch(line)
	if matches == nil {
		return nil, fmt.Errorf("无法解析日志行: %s", line)
	}
	
	result := make(map[string]string)
	for i, name := range logPattern.SubexpNames() {
		if i != 0 && name != "" {
			result[name] = matches[i]
		}
	}
	
	status, _ := strconv.Atoi(result["status"])
	size, _ := strconv.Atoi(result["size"])
	responseTime, _ := strconv.ParseFloat(result["response_time"], 64)
	
	return &LogEntry{
		IP:           result["ip"],
		Time:         result["time"],
		Method:       result["method"],
		URL:          result["url"],
		Status:       status,
		Size:         size,
		Referer:      result["referer"],
		UserAgent:    result["user_agent"],
		ResponseTime: responseTime,
	}, nil
}

// analyzeLog 分析日志文件
func analyzeLog(filePath string) error {
	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()
	
	ipCounter := make(map[string]int)
	statusCounter := make(map[int]int)
	urlCounter := make(map[string]int)
	var responseTimes []float64
	
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		entry, err := parseLogLine(scanner.Text())
		if err != nil {
			continue
		}
		
		ipCounter[entry.IP]++
		statusCounter[entry.Status]++
		urlCounter[entry.URL]++
		responseTimes = append(responseTimes, entry.ResponseTime)
	}
	
	// 计算平均响应时间
	var totalResponseTime float64
	for _, t := range responseTimes {
		totalResponseTime += t
	}
	avgResponseTime := totalResponseTime / float64(len(responseTimes))
	
	// 排序IP计数
	type ipCount struct {
		IP    string
		Count int
	}
	var ipCounts []ipCount
	for ip, count := range ipCounter {
		ipCounts = append(ipCounts, ipCount{IP: ip, Count: count})
	}
	sort.Slice(ipCounts, func(i, j int) bool {
		return ipCounts[i].Count > ipCounts[j].Count
	})
	
	// 输出分析结果
	fmt.Println("Top 10 IP addresses:")
	for i, ip := range ipCounts {
		if i >= 10 {
			break
		}
		fmt.Printf("  %s: %d\n", ip.IP, ip.Count)
	}
	
	fmt.Println("\nStatus codes:")
	for status, count := range statusCounter {
		fmt.Printf("  %d: %d\n", status, count)
	}
	
	// 排序URL计数
	type urlCount struct {
		URL   string
		Count int
	}
	var urlCounts []urlCount
	for url, count := range urlCounter {
		urlCounts = append(urlCounts, urlCount{URL: url, Count: count})
	}
	sort.Slice(urlCounts, func(i, j int) bool {
		return urlCounts[i].Count > urlCounts[j].Count
	})
	
	fmt.Println("\nTop 10 URLs:")
	for i, url := range urlCounts {
		if i >= 10 {
			break
		}
		fmt.Printf("  %s: %d\n", url.URL, url.Count)
	}
	
	fmt.Printf("\nAverage response time: %.3fs\n", avgResponseTime)
	
	return nil
}

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run log_analyzer.go <log_file>")
		os.Exit(1)
	}
	
	err := analyzeLog(os.Args[1])
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}
}
```

## 14 实时日志监控

### 14.1 tail命令

`tail`命令用于实时监控日志文件：

```bash
# 实时查看日志文件
tail -f /var/log/messages

# 实时查看多个日志文件
tail -f /var/log/messages /var/log/secure

# 显示文件末尾指定行数
tail -n 100 /var/log/messages

# 实时查看并过滤
tail -f /var/log/messages | grep "error"

# 实时查看并高亮显示
tail -f /var/log/messages | grep --color=auto "error"
```

### 14.2 multitail命令

`multitail`是增强版的`tail`，可以同时监控多个文件：

```bash
# 安装multitail
# Ubuntu/Debian
sudo apt-get install multitail

# CentOS/RHEL
sudo yum install multitail

# 监控多个文件
multitail /var/log/messages /var/log/secure

# 分屏显示
multitail -s 2 /var/log/messages /var/log/secure

# 合并显示
multitail -l "tail -f /var/log/messages" -l "tail -f /var/log/secure"

# 高亮显示
multitail -ci red -e "error" /var/log/messages

# 添加时间戳
multitail -t "System Log" /var/log/messages
```

### 14.3 lnav命令

`lnav`是高级日志文件查看器，提供丰富的日志分析功能：

```bash
# 安装lnav
# Ubuntu/Debian
sudo apt-get install lnav

# CentOS/RHEL
sudo yum install lnav

# 查看日志文件
lnav /var/log/messages

# 实时监控
lnav -f /var/log/messages

# 查看多个日志文件
lnav /var/log/messages /var/log/secure /var/log/nginx/access.log

# 过滤日志
lnav -e 'error' /var/log/messages

# 查看统计信息
lnav -c ':stats' /var/log/messages

# 导出查询结果
lnav -c ':export-to /tmp/export.csv' /var/log/messages
```

## 15 集中化日志管理

### 15.1 Rsyslog

Rsyslog是syslog的增强版，支持网络日志传输：

```bash
# 安装rsyslog
# Ubuntu/Debian
sudo apt-get install rsyslog

# CentOS/RHEL
sudo yum install rsyslog

# 配置rsyslog服务器
sudo vi /etc/rsyslog.conf

# 取消注释以下行以启用UDP接收
$ModLoad imudp
$UDPServerRun 514

# 取消注释以下行以启用TCP接收
$ModLoad imtcp
$InputTCPServerRun 514

# 配置日志模板
$template RemoteLogs,"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log"
*.* ?RemoteLogs

# 重启rsyslog服务
sudo systemctl enable rsyslog
sudo systemctl start rsyslog
```

客户端配置：

```bash
# 配置rsyslog客户端
sudo vi /etc/rsyslog.conf

# 添加以下行将日志发送到远程服务器
*.* @@logserver.example.com:514

# 重启rsyslog服务
sudo systemctl enable rsyslog
sudo systemctl start rsyslog
```

### 15.2 ELK Stack

ELK Stack（Elasticsearch, Logstash, Kibana）是流行的日志管理解决方案：

```bash
# 安装Elasticsearch
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list
sudo apt-get update
sudo apt-get install elasticsearch

# 配置Elasticsearch
sudo vi /etc/elasticsearch/elasticsearch.yml
# 设置以下配置
network.host: localhost
http.port: 9200

# 启动Elasticsearch
sudo systemctl start elasticsearch
sudo systemctl enable elasticsearch

# 安装Logstash
sudo apt-get install logstash

# 配置Logstash
sudo vi /etc/logstash/conf.d/syslog.conf

input {
  syslog {
    port => 514
    type => syslog
  }
  
  beats {
    port => 5044
  }
}

filter {
  if [type] == "syslog" {
    grok {
      match => { "message" => "%{SYSLOGBASE}" }
    }
    
    date {
      match => [ "timestamp", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "logstash-%{+YYYY.MM.dd}"
  }
  
  stdout { codec => rubydebug }
}

# 启动Logstash
sudo systemctl start logstash
sudo systemctl enable logstash

# 安装Kibana
sudo apt-get install kibana

# 配置Kibana
sudo vi /etc/kibana/kibana.yml
# 设置以下配置
server.host: "localhost"
elasticsearch.hosts: ["http://localhost:9200"]

# 启动Kibana
sudo systemctl start kibana
sudo systemctl enable kibana
```

## 16 实践练习

### 练习1：系统资源监控

编写一个Shell脚本，监控系统的CPU、内存、磁盘和网络使用情况，并在资源使用超过阈值时发送警报：

```bash
#!/bin/bash
# 系统资源监控脚本

# 设置阈值
CPU_THRESHOLD=80
MEMORY_THRESHOLD=80
DISK_THRESHOLD=90
NETWORK_THRESHOLD=1000000  # 1MB/s

# 获取CPU使用率
get_cpu_usage() {
    top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}'
}

# 获取内存使用率
get_memory_usage() {
    free | grep Mem | awk '{printf("%.2f", $3/$2 * 100.0)}'
}

# 获取磁盘使用率
get_disk_usage() {
    df -h / | awk 'NR==2 {print $5}' | awk -F'%' '{print $1}'
}

# 获取网络流量
get_network_usage() {
    # 获取eth0接口的接收和发送字节数
    RX1=$(cat /proc/net/dev | grep eth0 | awk '{print $2}')
    TX1=$(cat /proc/net/dev | grep eth0 | awk '{print $10}')
    
    sleep 1
    
    RX2=$(cat /proc/net/dev | grep eth0 | awk '{print $2}')
    TX2=$(cat /proc/net/dev | grep eth0 | awk '{print $10}')
    
    # 计算每秒流量（字节）
    RX_RATE=$((RX2 - RX1))
    TX_RATE=$((TX2 - TX1))
    
    # 返回较大的值
    if [ $RX_RATE -gt $TX_RATE ]; then
        echo $RX_RATE
    else
        echo $TX_RATE
    fi
}

# 发送警报
send_alert() {
    local message=$1
    echo "[ALERT] $(date): $message"
    # 可以在这里添加发送邮件或短信的代码
    # mail -s "System Alert" admin@example.com <<< "$message"
}

# 主监控循环
while true; do
    # 获取当前资源使用情况
    cpu_usage=$(get_cpu_usage)
    memory_usage=$(get_memory_usage)
    disk_usage=$(get_disk_usage)
    network_usage=$(get_network_usage)
    
    echo "$(date): CPU=${cpu_usage}%, Memory=${memory_usage}%, Disk=${disk_usage}%, Network=${network_usage}B/s"
    
    # 检查CPU使用率
    if (( $(echo "$cpu_usage > $CPU_THRESHOLD" | bc -l) )); then
        send_alert "CPU usage is ${cpu_usage}% (threshold: ${CPU_THRESHOLD}%)"
    fi
    
    # 检查内存使用率
    if (( $(echo "$memory_usage > $MEMORY_THRESHOLD" | bc -l) )); then
        send_alert "Memory usage is ${memory_usage}% (threshold: ${MEMORY_THRESHOLD}%)"
    fi
    
    # 检查磁盘使用率
    if (( $(echo "$disk_usage > $DISK_THRESHOLD" | bc -l) )); then
        send_alert "Disk usage is ${disk_usage}% (threshold: ${DISK_THRESHOLD}%)"
    fi
    
    # 检查网络流量
    if [ "$network_usage" -gt "$NETWORK_THRESHOLD" ]; then
        send_alert "Network usage is ${network_usage}B/s (threshold: ${NETWORK_THRESHOLD}B/s)"
    fi
    
    # 每5分钟检查一次
    sleep 300
done
```

### 练习2：日志分析脚本

编写一个Shell脚本，分析Apache访问日志，生成访问统计报告：

```bash
#!/bin/bash
# Apache访问日志分析脚本

LOG_FILE="/var/log/apache2/access.log"
REPORT_FILE="/tmp/apache_report_$(date +%Y%m%d).txt"

# 检查日志文件是否存在
if [ ! -f "$LOG_FILE" ]; then
    echo "Error: Log file $LOG_FILE not found"
    exit 1
fi

# 生成报告
echo "Apache Access Log Analysis Report" > "$REPORT_FILE"
echo "Generated on: $(date)" >> "$REPORT_FILE"
echo "=====================================" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 总访问量
total_requests=$(wc -l < "$LOG_FILE")
echo "Total requests: $total_requests" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 访问最多的IP
echo "Top 10 IP addresses:" >> "$REPORT_FILE"
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -10 >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 访问最多的页面
echo "Top 10 requested pages:" >> "$REPORT_FILE"
awk '{print $7}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -10 >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# HTTP状态码统计
echo "HTTP status codes:" >> "$REPORT_FILE"
awk '{print $9}' "$LOG_FILE" | sort | uniq -c | sort -nr >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 错误请求
echo "Error requests (4xx and 5xx):" >> "$REPORT_FILE"
awk '$9 ~ /^[45]/ {print $9, $7}' "$LOG_FILE" | sort | uniq -c | sort -nr >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 按小时统计访问量
echo "Requests by hour:" >> "$REPORT_FILE"
awk '{print substr($4,14,2)}' "$LOG_FILE" | sort | uniq -c | sort -n >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 按天统计访问量
echo "Requests by day:" >> "$REPORT_FILE"
awk '{print substr($4,2,11)}' "$LOG_FILE" | sort | uniq -c | sort -n >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 访问量最大的User-Agent
echo "Top 10 User-Agents:" >> "$REPORT_FILE"
awk -F'"' '{print $6}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -10 >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 带宽使用统计
echo "Bandwidth usage by file type:" >> "$REPORT_FILE"
awk '{print $7}' "$LOG_FILE" | rev | cut -d. -f1 | rev | sort | uniq -c | sort -nr >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# 显示报告
cat "$REPORT_FILE"

echo "Report saved to: $REPORT_FILE"
```

### 练习3：实时日志监控脚本

编写一个Shell脚本，实时监控系统日志，并在发现关键错误时发送警报：

```bash
#!/bin/bash
# 实时日志监控脚本

LOG_FILE="/var/log/syslog"
KEYWORDS="error|failed|critical|alert|panic"
ALERT_EMAIL="admin@example.com"

# 检查日志文件是否存在
if [ ! -f "$LOG_FILE" ]; then
    echo "Error: Log file $LOG_FILE not found"
    exit 1
fi

# 监控日志文件
tail -f "$LOG_FILE" | grep --line-buffered -i -E "$KEYWORDS" | while read line; do
    echo "$(date): $line"
    
    # 发送邮件警报
    echo "$line" | mail -s "System Alert: Error detected in $LOG_FILE" "$ALERT_EMAIL"
    
    # 记录到警报日志
    echo "$(date): $line" >> /var/log/alerts.log
done
```

## 17 总结

本章介绍了Linux系统监控与日志分析的基础技术和实用工具，包括：

1. **系统监控概述**
   - 监控的重要性和指标分类
   - 常见监控工具的使用方法

2. **性能监控工具**
   - top、htop、vmstat等命令的使用
   - CPU、内存、磁盘、网络监控方法

3. **日志系统基础**
   - 传统syslog系统
   - 现代systemd-journald系统
   - 日志轮转管理

4. **日志分析工具**
   - grep、awk、sed等文本处理工具
   - Python和Go高级日志分析

5. **实时日志监控**
   - tail、multitail、lnav等工具
   - 集中化日志管理解决方案

6. **实践练习**
   - 系统资源监控脚本
   - 日志分析脚本
   - 实时日志监控脚本

通过本章的学习，读者应该能够：
- 使用各种工具监控系统性能
- 分析和管理系统日志
- 编写自定义监控和日志分析脚本
- 实现集中化日志管理

系统监控和日志分析是Linux系统管理的重要技能，掌握这些技能可以帮助管理员及时发现和解决问题，确保系统稳定运行。
