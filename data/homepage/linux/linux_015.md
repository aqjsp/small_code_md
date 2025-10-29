# 第15章：Linux安全基础

## 概述

Linux系统安全是系统管理的重要组成部分，涉及用户权限管理、文件系统安全、网络安全、系统加固等多个方面。本章将介绍Linux安全的基本概念、常用工具和最佳实践，帮助读者建立安全的Linux系统环境。

我们将从用户和权限管理开始，逐步深入到文件系统安全、网络安全、系统加固、安全审计、入侵检测、加密技术、安全工具使用以及安全最佳实践等方面，全面了解Linux系统安全。

## 1. 用户和权限管理

### 1.1 用户账户管理

Linux系统中的每个用户都有一个唯一的用户标识符（UID）和组标识符（GID）。用户账户信息存储在`/etc/passwd`文件中，密码信息存储在`/etc/shadow`文件中。

#### 用户账户相关文件

- `/etc/passwd`：存储用户账户基本信息
- `/etc/shadow`：存储用户密码和密码策略
- `/etc/group`：存储组信息
- `/etc/gshadow`：存储组密码信息

#### 用户管理命令

```bash
# 创建新用户
useradd [选项] 用户名
useradd -m -s /bin/bash username  # 创建家目录并设置默认shell

# 设置用户密码
passwd 用户名

# 修改用户信息
usermod [选项] 用户名
usermod -l newname oldname        # 修改用户名
usermod -d /new/home username     # 修改家目录
usermod -s /bin/sh username       # 修改默认shell

# 删除用户
userdel [选项] 用户名
userdel -r username               # 删除用户及其家目录

# 查看用户信息
id 用户名                         # 显示用户UID、GID和所属组
finger 用户名                     # 显示用户详细信息
```

### 1.2 组管理

组是用户的集合，用于简化权限管理。一个用户可以属于多个组。

#### 组管理命令

```bash
# 创建新组
groupadd 组名

# 修改组信息
groupmod [选项] 组名
groupmod -n newname oldname       # 修改组名

# 删除组
groupdel 组名

# 将用户添加到组
usermod -aG 组名 用户名           # 将用户添加到附加组
gpasswd -a 用户名 组名            # 将用户添加到组

# 从组中移除用户
gpasswd -d 用户名 组名

# 查看组成员
getent group 组名
```

### 1.3 文件权限

Linux使用基于用户、组和其他的权限模型。每个文件和目录都有三组权限：所有者权限、组权限和其他用户权限。

#### 权限表示

- 读权限（r）：对于文件，表示可以读取文件内容；对于目录，表示可以列出目录内容。
- 写权限（w）：对于文件，表示可以修改文件内容；对于目录，表示可以在目录中创建、删除和重命名文件。
- 执行权限（x）：对于文件，表示可以执行文件；对于目录，表示可以进入目录。

#### 权限命令

```bash
# 查看文件权限
ls -l 文件名

# 修改文件权限
chmod [选项] 权限 文件名
chmod 755 filename                # 设置权限为rwxr-xr-x
chmod u+x filename                # 给所有者添加执行权限
chmod g-w filename                # 移除组的写权限
chmod o=r filename                # 设置其他用户的权限为只读

# 递归修改目录权限
chmod -R 755 directory

# 修改文件所有者和组
chown [选项] 所有者:组 文件名
chown user:group filename         # 同时修改所有者和组
chown -R user:group directory    # 递归修改目录的所有者和组

# 仅修改组
chgrp 组名 文件名
```

#### 特殊权限

除了基本权限外，Linux还有三种特殊权限：

1. **SUID（Set User ID）**：当执行设置了SUID位的程序时，程序将以文件所有者的身份运行，而不是以执行者的身份运行。
   ```bash
   chmod u+s filename              # 设置SUID位
   chmod 4755 filename             # 设置SUID位（八进制表示法）
   ```

2. **SGID（Set Group ID）**：当执行设置了SGID位的程序时，程序将以文件所属组的身份运行。对于目录，在该目录中创建的新文件将继承目录的组。
   ```bash
   chmod g+s filename              # 设置SGID位
   chmod 2755 filename             # 设置SGID位（八进制表示法）
   ```

3. **Sticky Bit**：对于目录，设置了Sticky Bit后，只有文件的所有者、目录的所有者和root用户才能删除或重命名目录中的文件。
   ```bash
   chmod o+t directory              # 设置Sticky Bit
   chmod 1755 directory            # 设置Sticky Bit（八进制表示法）
   ```

### 1.4 访问控制列表（ACL）

ACL提供了比传统权限更细粒度的访问控制。

#### ACL命令

```bash
# 安装ACL工具
# Debian/Ubuntu: sudo apt-get install acl
# CentOS/RHEL: sudo yum install acl

# 查看文件ACL
getfacl 文件名

# 设置文件ACL
setfacl [选项] 规则 文件名
setfacl -m u:username:rwx filename    # 给用户添加权限
setfacl -m g:groupname:rx filename    # 给组添加权限
setfacl -m m::rw filename             # 设置mask权限
setfacl -m o::r filename              # 设置其他用户权限

# 递归设置目录ACL
setfacl -R -m u:username:rwx directory

# 删除ACL
setfacl -x u:username filename        # 删除特定用户的ACL
setfacl -b filename                   # 删除所有ACL

# 设置默认ACL
setfacl -d -m u:username:rwx directory # 设置目录的默认ACL
```

## 2. 文件系统安全

### 2.1 文件系统加密

#### LUKS（Linux Unified Key Setup）

LUKS是Linux上标准的磁盘加密格式。

```bash
# 安装cryptsetup
# Debian/Ubuntu: sudo apt-get install cryptsetup
# CentOS/RHEL: sudo yum install cryptsetup

# 创建加密分区
cryptsetup luksFormat /dev/sdXn

# 打开加密分区
cryptsetup open /dev/sdXn encrypted_partition

# 创建文件系统
mkfs.ext4 /dev/mapper/encrypted_partition

# 挂载加密分区
mount /dev/mapper/encrypted_partition /mnt/encrypted

# 关闭加密分区
umount /mnt/encrypted
cryptsetup close encrypted_partition
```

#### eCryptfs

eCryptfs是一种堆叠式文件系统加密解决方案，可以加密目录内容。

```bash
# 安装ecryptfs-utils
# Debian/Ubuntu: sudo apt-get install ecryptfs-utils
# CentOS/RHEL: sudo yum install ecryptfs-utils

# 创建加密目录
mkdir ~/Private
mount -t ecryptfs ~/Private ~/Private

# 卸载加密目录
umount ~/Private
```

### 2.2 安全挂载选项

使用安全的挂载选项可以增强文件系统安全性。

```bash
# 使用nosuid选项禁止SUID和SGID
mount -o nosuid /dev/sdXn /mnt/point

# 使用nodev选项禁止设备文件
mount -o nodev /dev/sdXn /mnt/point

# 使用noexec选项禁止执行文件
mount -o noexec /dev/sdXn /mnt/point

# 使用ro选项以只读方式挂载
mount -o ro /dev/sdXn /mnt/point

# 组合多个选项
mount -o nosuid,nodev,noexec /dev/sdXn /mnt/point

# 在/etc/fstab中设置永久挂载选项
/dev/sdXn /mnt/point ext4 defaults,nosuid,nodev,noexec 0 2
```

### 2.3 文件完整性检查

使用AIDE（Advanced Intrusion Detection Environment）可以检查文件完整性。

```bash
# 安装AIDE
# Debian/Ubuntu: sudo apt-get install aide
# CentOS/RHEL: sudo yum install aide

# 初始化AIDE数据库
sudo aide --init
sudo mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db

# 检查文件完整性
sudo aide --check

# 更新AIDE数据库
sudo aide --update
sudo mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
```

## 3. 网络安全

### 3.1 防火墙配置

#### iptables

iptables是Linux内核的防火墙工具。

```bash
# 查看当前规则
iptables -L -n -v

# 清空所有规则
iptables -F

# 设置默认策略
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# 允许回环接口
iptables -A INPUT -i lo -j ACCEPT

# 允许已建立的连接
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许SSH连接
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许HTTP和HTTPS连接
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 保存规则
# Debian/Ubuntu: sudo iptables-save > /etc/iptables/rules.v4
# CentOS/RHEL: sudo service iptables save
```

#### UFW（Uncomplicated Firewall）

UFW是Ubuntu上的简化防火墙工具。

```bash
# 启用UFW
sudo ufw enable

# 设置默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许SSH
sudo ufw allow ssh

# 允许特定端口
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 允许特定IP
sudo ufw allow from 192.168.1.0/24

# 查看状态
sudo ufw status verbose

# 禁用UFW
sudo ufw disable
```

#### firewalld

firewalld是CentOS/RHEL上的动态防火墙管理工具。

```bash
# 启动firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# 查看默认区域
sudo firewall-cmd --get-default-zone

# 查看当前区域规则
sudo firewall-cmd --list-all

# 添加服务
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# 添加端口
sudo firewall-cmd --permanent --add-port=8080/tcp

# 重新加载配置
sudo firewall-cmd --reload

# 查看所有区域
sudo firewall-cmd --get-zones

# 更改默认区域
sudo firewall-cmd --set-default-zone=public
```

### 3.2 SSH安全配置

SSH是远程管理Linux系统的常用工具，安全配置SSH非常重要。

#### SSH配置文件

SSH配置文件位于`/etc/ssh/sshd_config`。

```bash
# 禁止root用户登录
PermitRootLogin no

# 禁止密码认证，使用密钥认证
PasswordAuthentication no
PubkeyAuthentication yes

# 更改默认SSH端口
Port 2222

# 限制登录用户
AllowUsers user1 user2
AllowGroups sshusers

# 设置空闲超时
ClientAliveInterval 300
ClientAliveCountMax 2

# 禁用空密码
PermitEmptyPasswords no

# 使用协议2
Protocol 2

# 重启SSH服务
sudo systemctl restart sshd
```

#### SSH密钥认证

```bash
# 生成SSH密钥对
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 将公钥复制到远程服务器
ssh-copy-id user@remote_host

# 手动复制公钥
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 3.3 网络安全工具

#### nmap（网络扫描器）

```bash
# 安装nmap
# Debian/Ubuntu: sudo apt-get install nmap
# CentOS/RHEL: sudo yum install nmap

# 扫描单个主机
nmap 192.168.1.1

# 扫描端口范围
nmap -p 1-1000 192.168.1.1

# 扫描所有端口
nmap -p- 192.168.1.1

# 服务版本检测
nmap -sV 192.168.1.1

# 操作系统检测
nmap -O 192.168.1.1

# 全面扫描
nmap -A 192.168.1.1

# 扫描整个网络
nmap 192.168.1.0/24

# 扫描特定端口
nmap -p 22,80,443 192.168.1.1

# 使用脚本扫描
nmap --script vuln 192.168.1.1
```

#### tcpdump（网络抓包工具）

```bash
# 安装tcpdump
# Debian/Ubuntu: sudo apt-get install tcpdump
# CentOS/RHEL: sudo yum install tcpdump

# 抓取所有网络流量
sudo tcpdump

# 抓取特定接口的流量
sudo tcpdump -i eth0

# 抓取特定主机的流量
sudo tcpdump host 192.168.1.1

# 抓取特定端口的流量
sudo tcpdump port 80

# 抓取特定协议的流量
sudo tcpdump tcp

# 保存抓包结果到文件
sudo tcpdump -w capture.pcap

# 读取抓包文件
tcpdump -r capture.pcap

# 显示更详细的信息
sudo tcpdump -v

# 显示更更详细的信息
sudo tcpdump -vv

# 不解析主机名
sudo tcpdump -n

# 不解析端口名
sudo tcpdump -nn
```

## 4. 系统加固

### 4.1 系统更新

保持系统更新是系统安全的基础。

```bash
# Debian/Ubuntu系统更新
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

# CentOS/RHEL系统更新
sudo yum update
# 或使用dnf（较新版本）
sudo dnf update

# 自动安全更新
# Debian/Ubuntu
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

# CentOS/RHEL
sudo yum install yum-cron
sudo systemctl enable yum-cron
sudo systemctl start yum-cron
```

### 4.2 服务管理

禁用不必要的服务可以减少攻击面。

```bash
# 查看所有服务
systemctl list-unit-files --type=service

# 查看运行中的服务
systemctl list-units --type=service --state=running

# 禁用服务
sudo systemctl disable 服务名

# 停止服务
sudo systemctl stop 服务名

# 查看服务详情
systemctl status 服务名

# 查看服务依赖
systemctl list-dependencies 服务名

# 屏蔽服务（更彻底的禁用）
sudo systemctl mask 服务名
```

### 4.3 内核参数调优

通过调整内核参数可以增强系统安全性。

```bash
# 查看当前内核参数
sysctl -a

# 临时修改内核参数
sudo sysctl -w 参数名=值

# 永久修改内核参数（添加到/etc/sysctl.conf）
echo "参数名=值" | sudo tee -a /etc/sysctl.conf

# 应用配置文件中的参数
sudo sysctl -p

# 常见安全相关内核参数
# 禁止IP源路由
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# 禁止ICMP重定向
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0

# 启用SYN cookies防护
net.ipv4.tcp_syncookies = 1

# 记录可疑数据包
net.ipv4.conf.all.log_martians = 1

# 禁止IP转发
net.ipv4.ip_forward = 0

# 限制core dump
fs.suid_dumpable = 0
```

### 4.4 限制资源使用

通过限制资源使用可以防止DoS攻击。

```bash
# 查看当前限制
ulimit -a

# 临时修改限制
ulimit -n 65535    # 限制文件描述符数量
ulimit -u 1024     # 限制用户进程数

# 永久修改限制（编辑/etc/security/limits.conf）
echo "* soft nofile 65535" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65535" | sudo tee -a /etc/security/limits.conf

# 配置PAM限制模块（编辑/etc/security/limits.d/目录下的文件）
echo "session required pam_limits.so" | sudo tee -a /etc/pam.d/common-session
```

## 5. 安全审计

### 5.1 系统日志

Linux系统提供了多种日志记录机制。

#### 日志文件位置

- `/var/log/auth.log`或`/var/log/secure`：认证相关日志
- `/var/log/syslog`或`/var/log/messages`：系统日志
- `/var/log/kern.log`：内核日志
- `/var/log/dmesg`：启动日志
- `/var/log/faillog`：登录失败日志
- `/var/log/lastlog`：最近登录日志

#### 查看日志

```bash
# 查看认证日志
sudo tail -f /var/log/auth.log

# 查看系统日志
sudo tail -f /var/log/syslog

# 查看最近的登录记录
last

# 查看失败的登录尝试
sudo lastb

# 查看用户登录历史
lastlog

# 使用journalctl（systemd系统）
sudo journalctl -f                    # 实时查看日志
sudo journalctl -u sshd               # 查看特定服务的日志
sudo journalctl -p err                 # 查看错误日志
sudo journalctl --since "1 hour ago"   # 查看最近1小时的日志
```

### 5.2 审计系统

使用auditd可以记录系统上的安全相关事件。

```bash
# 安装auditd
# Debian/Ubuntu: sudo apt-get install auditd
# CentOS/RHEL: sudo yum install auditd

# 启动auditd
sudo systemctl start auditd
sudo systemctl enable auditd

# 查看审计规则
sudo auditctl -l

# 添加审计规则
sudo auditctl -w /etc/passwd -p wa -k passwd_changes    # 监控/etc/passwd文件
sudo auditctl -w /etc/shadow -p wa -k shadow_changes    # 监控/etc/shadow文件
sudo auditctl -w /etc/sudoers -p wa -k sudoers_changes  # 监控/etc/sudoers文件
sudo auditctl -w /var/log/ -p wa -k log_changes          # 监控/var/log目录

# 监控系统调用
sudo auditctl -a always,exit -F arch=b64 -S execve -k process_creation

# 查看审计日志
sudo ausearch -k passwd_changes
sudo ausearch -k process_creation
sudo ausearch -m LOGIN -i

# 生成审计报告
sudo aureport -m
sudo aureport -l
sudo aureport -a

# 删除所有规则
sudo auditctl -D
```

## 6. 入侵检测

### 6.1 入侵检测系统（IDS）

#### OSSEC

OSSEC是一个开源的主机入侵检测系统。

```bash
# 下载并安装OSSEC
wget https://github.com/ossec/ossec-hids/archive/3.6.0.tar.gz
tar -xzf 3.6.0.tar.gz
cd ossec-hids-3.6.0
sudo ./install.sh

# 配置OSSEC
sudo nano /var/ossec/etc/ossec.conf

# 启动OSSEC
sudo /var/ossec/bin/ossec-control start

# 查看OSSEC日志
sudo tail -f /var/ossec/logs/ossec.log

# 查看告警
sudo tail -f /var/ossec/logs/alerts/alerts.log
```

#### Tripwire

Tripwire是一个文件完整性检查工具。

```bash
# 安装Tripwire
# Debian/Ubuntu: sudo apt-get install tripwire
# CentOS/RHEL: sudo yum install tripwire

# 初始化Tripwire数据库
sudo tripwire --init

# 检查文件完整性
sudo tripwire --check

# 更新Tripwire数据库
sudo tripwire --update

# 查看Tripwire报告
sudo twprint -m r --twrfile /var/lib/tripwire/report/hostname-YYYYMMDD-HHMMSS.twr
```

### 6.2 异常检测

```bash
# 监控异常登录
sudo grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -nr

# 监控异常进程
ps aux | awk '{print $11}' | sort | uniq -c | sort -nr

# 监控异常网络连接
sudo netstat -antup | grep ESTABLISHED | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr

# 监控异常文件访问
sudo find / -type f -perm /4000 -exec ls -la {} \;

# 监控SUID文件
sudo find / -type f -perm -4000 -exec ls -la {} \;
```

## 7. 加密技术

### 7.1 GPG（GNU Privacy Guard）

GPG是用于加密和签名的工具。

```bash
# 安装GPG
# Debian/Ubuntu: sudo apt-get install gnupg
# CentOS/RHEL: sudo yum install gnupg

# 生成密钥对
gpg --full-generate-key

# 列出密钥
gpg --list-keys

# 导出公钥
gpg --armor --export 用户ID > public_key.asc

# 导入公钥
gpg --import public_key.asc

# 加密文件
gpg -c 文件名
gpg -e -r 收件人 文件名

# 解密文件
gpg 文件名.gpg
gpg -d 文件名.gpg

# 签名文件
gpg --sign 文件名
gpg --clearsign 文件名
gpg --detach-sign 文件名

# 验证签名
gpg --verify 文件名.sig 文件名
```

### 7.2 OpenSSL

OpenSSL是一个强大的加密工具包。

```bash
# 生成私钥
openssl genrsa -out private.key 2048

# 从私钥生成公钥
openssl rsa -in private.key -pubout -out public.key

# 生成证书签名请求（CSR）
openssl req -new -key private.key -out certificate.csr

# 自签名证书
openssl x509 -req -days 365 -in certificate.csr -signkey private.key -out certificate.crt

# 查看证书信息
openssl x509 -in certificate.crt -text -noout

# 加密文件
openssl enc -aes-256-cbc -in 明文文件 -out 加密文件

# 解密文件
openssl enc -aes-256-cbc -d -in 加密文件 -out 明文文件

# 计算文件哈希值
openssl dgst -sha256 文件名

# 创建自签名CA
openssl req -x509 -newkey rsa:4096 -keyout ca.key -out ca.crt -days 3650 -nodes
```

## 8. 安全工具

### 8.1 密码策略

```bash
# 安装密码质量检查工具
# Debian/Ubuntu: sudo apt-get install libpam-pwquality
# CentOS/RHEL: sudo yum install libpwquality

# 配置密码策略（编辑/etc/security/pwquality.conf）
minlen = 12
minclass = 3
dcredit = -1
ucredit = -1
lcredit = -1
ocredit = -1
maxrepeat = 3
difok = 3

# 配置PAM使用密码质量检查（编辑/etc/pam.d/common-password）
password requisite pam_pwquality.so retry=3

# 设置密码过期策略（编辑/etc/login.defs）
PASS_MAX_DAYS 90
PASS_MIN_DAYS 1
PASS_MIN_LEN 12
PASS_WARN_AGE 7

# 为特定用户设置密码过期
sudo chage -M 90 用户名
sudo chage -W 7 用户名
```

### 8.2 安全扫描工具

#### Lynis

Lynis是一个系统安全审计工具。

```bash
# 安装Lynis
# Debian/Ubuntu: sudo apt-get install lynis
# CentOS/RHEL: sudo yum install lynis

# 运行安全审计
sudo lynis audit system

# 查看报告
cat /var/log/lynis.log

# 更新Lynis
sudo lynis update info
```

#### OpenVAS

OpenVAS是一个开源的漏洞扫描系统。

```bash
# 安装OpenVAS
# Debian/Ubuntu: sudo apt-get install openvas
# CentOS/RHEL: sudo yum install openvas

# 初始化OpenVAS
sudo gvm-setup

# 创建用户
sudo gvm-manage-certs -a
sudo gvm-manage-certs -f

# 启动OpenVAS服务
sudo gvm-start

# 访问Web界面
# https://localhost:9392
```

## 9. 安全最佳实践

### 9.1 系统安全清单

1. **用户管理**
   - 禁用不必要的用户账户
   - 使用强密码策略
   - 实施最小权限原则
   - 定期审查用户权限

2. **系统更新**
   - 定期更新系统和软件包
   - 启用自动安全更新
   - 监控安全公告

3. **服务配置**
   - 禁用不必要的服务
   - 使用防火墙限制访问
   - 安全配置网络服务

4. **文件系统安全**
   - 设置适当的文件权限
   - 使用文件系统加密
   - 定期检查文件完整性

5. **网络安全**
   - 使用安全的远程访问方式
   - 实施网络分段
   - 监控网络流量

6. **日志和监控**
   - 启用详细的日志记录
   - 实施日志监控和告警
   - 定期审查日志

### 9.2 安全加固脚本

```bash
#!/bin/bash
# 系统安全加固脚本

# 禁用root用户SSH登录
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# 禁用密码认证，使用密钥认证
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# 更改默认SSH端口
sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config

# 重启SSH服务
systemctl restart sshd

# 配置防火墙
ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp
ufw enable

# 禁用不必要的服务
systemctl disable telnet
systemctl disable rsh
systemctl disable rlogin

# 安装fail2ban
apt-get update
apt-get install -y fail2ban

# 配置fail2ban
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = 2222
EOF

# 启动fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 安装自动安全更新
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# 配置内核参数
cat >> /etc/sysctl.conf << EOF
# 禁止IP源路由
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.default.accept_source_route = 0

# 禁止ICMP重定向
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0

# 启用SYN cookies防护
net.ipv4.tcp_syncookies = 1

# 记录可疑数据包
net.ipv4.conf.all.log_martians = 1

# 禁止IP转发
net.ipv4.ip_forward = 0

# 限制core dump
fs.suid_dumpable = 0
EOF

# 应用内核参数
sysctl -p

echo "系统安全加固完成"
```

## 10. 实践练习

### 10.1 用户权限管理

1. 创建一个新用户，将其添加到特定组，并设置适当的权限。
2. 使用ACL为特定用户设置对特定文件的访问权限。
3. 配置SUID和SGID权限，并测试其效果。

### 10.2 系统加固

1. 使用Lynis对系统进行安全审计，并根据报告加固系统。
2. 配置防火墙规则，限制对特定服务的访问。
3. 实施密码策略，并测试其效果。

### 10.3 安全监控

1. 配置auditd监控系统关键文件，并尝试修改这些文件。
2. 使用nmap扫描系统开放端口，并关闭不必要的服务。
3. 配置fail2ban防止暴力破解攻击。

## 11. 总结

本章介绍了Linux安全的基础知识，包括用户和权限管理、文件系统安全、网络安全、系统加固、安全审计、入侵检测、加密技术和安全工具等方面。通过这些内容，读者可以了解如何保护Linux系统免受各种安全威胁。

系统安全是一个持续的过程，需要不断学习新的安全技术和最佳实践。在实际工作中，应该根据系统的具体需求和安全要求，制定合适的安全策略，并定期审查和更新这些策略。

在下一章中，我们将学习系统监控与日志分析，了解如何监控系统性能和活动，以及如何分析系统日志来识别问题和安全威胁。