# 第11章：网络配置与管理

## 概述

网络是Linux系统的核心组成部分，无论是作为服务器还是客户端，网络配置与管理都是必不可少的技能。Linux提供了强大而灵活的网络管理工具，允许用户配置网络接口、管理路由、设置防火墙、诊断网络问题等。

本章将详细介绍Linux网络配置与管理的各个方面，包括网络基础概念、网络接口配置、IP地址管理、路由配置、网络服务配置、网络故障排除、网络安全等内容。通过学习本章，读者将能够熟练配置和管理Linux系统的网络环境。

## 1 网络基础概念

### 1.1 OSI模型与TCP/IP模型

1. **OSI七层模型**：
   - 物理层：传输比特流
   - 数据链路层：帧传输、错误检测
   - 网络层：路由选择、逻辑寻址
   - 传输层：端到端通信、可靠性保证
   - 会话层：建立、管理和终止会话
   - 表示层：数据格式转换、加密解密
   - 应用层：为应用程序提供网络服务

2. **TCP/IP四层模型**：
   - 网络接口层：对应OSI物理层和数据链路层
   - 网络层：对应OSI网络层
   - 传输层：对应OSI传输层
   - 应用层：对应OSI会话层、表示层和应用层

### 1.2 网络协议

1. **IP协议**：
   - IPv4：32位地址，如192.168.1.1
   - IPv6：128位地址，如2001:db8::1
   - 子网掩码：区分网络部分和主机部分
   - CIDR：无类域间路由，如192.168.1.0/24

2. **传输层协议**：
   - TCP：可靠的、面向连接的协议
   - UDP：不可靠的、无连接的协议
   - 端口：区分不同应用服务，如HTTP(80)、HTTPS(443)

3. **应用层协议**：
   - HTTP/HTTPS：Web服务
   - FTP：文件传输
   - SSH：安全远程登录
   - DNS：域名解析
   - DHCP：动态主机配置协议

### 1.3 网络设备

1. **物理设备**：
   - 网卡（NIC）：网络接口卡
   - 交换机：数据链路层设备
   - 路由器：网络层设备
   - 防火墙：网络安全设备

2. **虚拟设备**：
   - 虚拟网卡：虚拟机或容器使用的网络接口
   - 网桥：连接多个网络段的虚拟设备
   - VLAN：虚拟局域网

## 2 网络接口配置

### 2.1 查看网络接口

```bash
# 查看所有网络接口
ip addr show
ifconfig -a

# 查看特定接口
ip addr show eth0
ifconfig eth0

# 查看接口详细信息
ethtool eth0

# 查看接口统计信息
ip -s link show eth0
cat /proc/net/dev
```

### 2.2 配置网络接口

```bash
# 启用/禁用接口
sudo ip link set eth0 up
sudo ip link set eth0 down

# 配置IP地址
sudo ip addr add 192.168.1.100/24 dev eth0

# 删除IP地址
sudo ip addr del 192.168.1.100/24 dev eth0

# 配置多个IP地址
sudo ip addr add 192.168.1.101/24 dev eth0
sudo ip addr add 192.168.1.102/24 dev eth0

# 配置IPv6地址
sudo ip -6 addr add 2001:db8::1/64 dev eth0

# 配置MAC地址
sudo ip link set eth0 address 00:11:22:33:44:55

# 传统ifconfig方式
sudo ifconfig eth0 192.168.1.100 netmask 255.255.255.0 up
sudo ifconfig eth0 down
```

### 2.3 永久网络配置

#### Ubuntu/Debian (Netplan)

```yaml
# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: no
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
      optional: true

# 应用配置
sudo netplan apply
```

#### CentOS/RHEL (NetworkManager)

```bash
# 使用nmcli配置
sudo nmcli con mod eth0 ipv4.addresses 192.168.1.100/24
sudo nmcli con mod eth0 ipv4.gateway 192.168.1.1
sudo nmcli con mod eth0 ipv4.dns "8.8.8.8 8.8.4.4"
sudo nmcli con mod eth0 ipv4.method manual
sudo nmcli con up eth0

# 使用nmtui图形界面
sudo nmtui

# 使用配置文件
# /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
DNS1=8.8.8.8
DNS2=8.8.4.4
```

## 3 路由配置

### 3.1 查看路由表

```bash
# 查看路由表
ip route show
route -n

# 查看特定路由
ip route get 8.8.8.8

# 查看IPv6路由表
ip -6 route show
```

### 3.2 配置静态路由

```bash
# 添加默认路由
sudo ip route add default via 192.168.1.1

# 添加网络路由
sudo ip route add 10.0.0.0/24 via 192.168.1.254

# 添加主机路由
sudo ip route add 192.168.2.100 via 192.168.1.254

# 删除路由
sudo ip route del default
sudo ip route del 10.0.0.0/24

# 传统route方式
sudo route add default gw 192.168.1.1
sudo route add -net 10.0.0.0/24 gw 192.168.1.254
sudo route del default
```

### 3.3 永久路由配置

#### Ubuntu/Debian

```bash
# /etc/network/interfaces
auto eth0
iface eth0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    up route add -net 10.0.0.0/24 gw 192.168.1.254
```

#### CentOS/RHEL

```bash
# /etc/sysconfig/network-scripts/route-eth0
10.0.0.0/24 via 192.168.1.254
192.168.2.0/24 via 192.168.1.254

# /etc/sysconfig/network-scripts/ifcfg-eth0
...
GATEWAY=192.168.1.1
...
```

## 4 DNS配置

### 4.1 DNS配置文件

```bash
# /etc/resolv.conf
nameserver 8.8.8.8
nameserver 8.8.4.4
search example.com
domain example.com

# 查看当前DNS配置
cat /etc/resolv.conf

# 测试DNS解析
nslookup google.com
dig google.com
host google.com
```

### 4.2 永久DNS配置

#### Ubuntu/Debian (Netplan)

```yaml
# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      dhcp4: no
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
        search: [example.com]
```

#### CentOS/RHEL

```bash
# /etc/sysconfig/network-scripts/ifcfg-eth0
...
DNS1=8.8.8.8
DNS2=8.8.4.4
DOMAIN=example.com
...

# /etc/resolv.conf (由NetworkManager管理)
```

## 5 网络服务配置

### 5.1 DHCP服务

```bash
# 安装DHCP服务器
sudo apt install isc-dhcp-server  # Ubuntu/Debian
sudo yum install dhcp             # CentOS/RHEL

# 配置DHCP服务器
# /etc/dhcp/dhcpd.conf
subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;
  option domain-name-servers 8.8.8.8, 8.8.4.4;
  option domain-name "example.com";
  option routers 192.168.1.1;
  option broadcast-address 192.168.1.255;
  default-lease-time 600;
  max-lease-time 7200;
}

# 指定接口
# /etc/default/isc-dhcp-server (Ubuntu/Debian)
INTERFACESv4="eth0"

# /etc/sysconfig/dhcpd (CentOS/RHEL)
DHCPDARGS=eth0

# 启动DHCP服务
sudo systemctl start isc-dhcp-server
sudo systemctl enable isc-dhcp-server

# 查看DHCP租约
cat /var/lib/dhcp/dhcpd.leases
```

### 5.2 DNS服务

```bash
# 安装BIND DNS服务器
sudo apt install bind9  # Ubuntu/Debian
sudo yum install bind   # CentOS/RHEL

# 配置BIND
# /etc/bind/named.conf.options
options {
    directory "/var/cache/bind";
    forwarders {
        8.8.8.8;
        8.8.4.4;
    };
    dnssec-validation auto;
    listen-on-v6 { any; };
};

# /etc/bind/named.conf.local
zone "example.com" {
    type master;
    file "/etc/bind/db.example.com";
};

zone "1.168.192.in-addr.arpa" {
    type master;
    file "/etc/bind/db.192.168.1";
};

# 创建正向解析文件
# /etc/bind/db.example.com
$TTL    604800
@       IN      SOA     ns1.example.com. admin.example.com. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      ns1.example.com.
@       IN      A       192.168.1.10
www     IN      A       192.168.1.20
mail    IN      A       192.168.1.30

# 创建反向解析文件
# /etc/bind/db.192.168.1
$TTL    604800
@       IN      SOA     ns1.example.com. admin.example.com. (
                              1         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      ns1.example.com.
10      IN      PTR     example.com.
20      IN      PTR     www.example.com.
30      IN      PTR     mail.example.com.

# 启动BIND服务
sudo systemctl start bind9
sudo systemctl enable bind9

# 测试DNS解析
nslookup www.example.com 127.0.0.1
dig @127.0.0.1 www.example.com
```

### 5.3 NTP服务

```bash
# 安装NTP服务
sudo apt install ntp  # Ubuntu/Debian
sudo yum install ntp  # CentOS/RHEL

# 配置NTP服务器
# /etc/ntp.conf
driftfile /var/lib/ntp/ntp.drift
statistics loopstats peerstats clockstats
filegen loopstats file loopstats type day enable
filegen peerstats file peerstats type day enable
filegen clockstats file clockstats type day enable

# 使用公共NTP服务器
server 0.pool.ntp.org iburst
server 1.pool.ntp.org iburst
server 2.pool.ntp.org iburst
server 3.pool.ntp.org iburst

# 启动NTP服务
sudo systemctl start ntp
sudo systemctl enable ntp

# 查看NTP状态
ntpq -p
timedatectl status

# 手动同步时间
sudo ntpdate -s time.nist.gov
```

## 6 防火墙配置

### 6.1 iptables

```bash
# 查看iptables规则
sudo iptables -L -n -v

# 清空所有规则
sudo iptables -F
sudo iptables -X
sudo iptables -t nat -F
sudo iptables -t nat -X

# 设置默认策略
sudo iptables -P INPUT DROP
sudo iptables -P FORWARD DROP
sudo iptables -P OUTPUT ACCEPT

# 允许本地回环
sudo iptables -A INPUT -i lo -j ACCEPT

# 允许已建立的连接
sudo iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# 允许SSH
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许HTTP和HTTPS
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 保存iptables规则
sudo iptables-save > /etc/iptables/rules.v4  # Debian/Ubuntu
sudo service iptables save                  # CentOS/RHEL

# 恢复iptables规则
sudo iptables-restore < /etc/iptables/rules.v4
```

### 6.2 UFW (Uncomplicated Firewall)

```bash
# 安装UFW
sudo apt install ufw  # Ubuntu/Debian

# 启用UFW
sudo ufw enable

# 禁用UFW
sudo ufw disable

# 查看UFW状态
sudo ufw status
sudo ufw status verbose

# 设置默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许SSH
sudo ufw allow ssh
sudo ufw allow 22/tcp

# 允许HTTP和HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 允许特定IP
sudo ufw allow from 192.168.1.0/24

# 拒绝特定IP
sudo ufw deny from 192.168.1.100

# 删除规则
sudo ufw delete allow 80/tcp

# 重置UFW
sudo ufw reset
```

### 6.3 firewalld

```bash
# 安装firewalld
sudo yum install firewalld  # CentOS/RHEL

# 启动firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# 查看firewalld状态
sudo firewall-cmd --state

# 查看当前规则
sudo firewall-cmd --list-all

# 查看所有可用区域
sudo firewall-cmd --get-zones

# 查看默认区域
sudo firewall-cmd --get-default-zone

# 设置默认区域
sudo firewall-cmd --set-default-zone=public

# 添加服务
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh

# 添加端口
sudo firewall-cmd --permanent --add-port=8080/tcp

# 添加端口范围
sudo firewall-cmd --permanent --add-port=9000-9100/tcp

# 允许特定IP
sudo firewall-cmd --permanent --add-source=192.168.1.0/24

# 重载配置
sudo firewall-cmd --reload

# 删除规则
sudo firewall-cmd --permanent --remove-service=http
```

## 7 网络诊断工具

### 7.1 连通性测试

```bash
# ping测试
ping -c 4 google.com
ping -c 4 8.8.8.8

# 指定接口ping
ping -I eth0 -c 4 8.8.8.8

# IPv6 ping
ping6 -c 4 ipv6.google.com

# traceroute跟踪路由
traceroute google.com
traceroute -n google.com  # 不解析主机名

# mtr持续跟踪
mtr google.com
mtr -r -c 10 google.com  # 报告模式
```

### 7.2 端口与服务测试

```bash
# telnet测试端口
telnet google.com 80

# nc(netcat)测试端口
nc -zv google.com 80
nc -zv 192.168.1.1 22

# nmap端口扫描
sudo nmap -sS -O 192.168.1.1
sudo nmap -p 1-1000 192.168.1.1
sudo nmap -sV 192.168.1.1

# ss查看套接字
ss -tuln
ss -tulnp  # 显示进程
ss -tulpn | grep :22
```

### 7.3 网络性能测试

```bash
# iperf3测试带宽
# 服务器端
iperf3 -s

# 客户端
iperf3 -c server_ip
iperf3 -c server_ip -t 60  # 测试60秒
iperf3 -c server_ip -P 4   # 4个并行连接

# 测试UDP
iperf3 -c server_ip -u -b 100M

# 查看网络统计
cat /proc/net/dev
ip -s link show
sar -n DEV 1 5
```

## 8 高级网络配置

### 8.1 网络绑定(Bonding)

```bash
# 安装bonding工具
sudo apt install ifenslave  # Ubuntu/Debian
sudo yum install ifenslave  # CentOS/RHEL

# 加载bonding模块
sudo modprobe bonding

# 配置bond0接口
# /etc/network/interfaces (Ubuntu/Debian)
auto bond0
iface bond0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    bond-slaves eth0 eth1
    bond-mode 802.3ad
    bond-miimon 100
    bond-lacp-rate 1

# /etc/sysconfig/network-scripts/ifcfg-bond0 (CentOS/RHEL)
DEVICE=bond0
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
BONDING_OPTS="mode=802.3ad miimon=100 lacp_rate=1"

# /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
BOOTPROTO=none
ONBOOT=yes
MASTER=bond0
SLAVE=yes

# /etc/sysconfig/network-scripts/ifcfg-eth1
DEVICE=eth1
BOOTPROTO=none
ONBOOT=yes
MASTER=bond0
SLAVE=yes

# 启用bonding
sudo ifup bond0
```

### 8.2 VLAN配置

```bash
# 安装VLAN工具
sudo apt install vlan  # Ubuntu/Debian
sudo yum install vconfig  # CentOS/RHEL

# 加载8021q模块
sudo modprobe 8021q

# 创建VLAN接口
sudo vconfig add eth0 100
sudo ip link set eth0.100 up
sudo ip addr add 192.168.100.1/24 dev eth0.100

# 永久配置VLAN
# /etc/network/interfaces (Ubuntu/Debian)
auto eth0.100
iface eth0.100 inet static
    address 192.168.100.1
    netmask 255.255.255.0

# /etc/sysconfig/network-scripts/ifcfg-eth0.100 (CentOS/RHEL)
DEVICE=eth0.100
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.100.1
NETMASK=255.255.255.0
VLAN=yes
```

### 8.3 网桥配置

```bash
# 安装网桥工具
sudo apt install bridge-utils  # Ubuntu/Debian
sudo yum install bridge-utils  # CentOS/RHEL

# 创建网桥
sudo brctl addbr br0
sudo brctl addif br0 eth0
sudo ip link set br0 up
sudo ip addr add 192.168.1.100/24 dev br0

# 永久配置网桥
# /etc/network/interfaces (Ubuntu/Debian)
auto br0
iface br0 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    bridge_ports eth0
    bridge_stp off
    bridge_fd 0
    bridge_maxwait 0

# /etc/sysconfig/network-scripts/ifcfg-br0 (CentOS/RHEL)
DEVICE=br0
BOOTPROTO=static
ONBOOT=yes
IPADDR=192.168.1.100
NETMASK=255.255.255.0
GATEWAY=192.168.1.1
TYPE=Bridge
STP=off
DELAY=0

# /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
BOOTPROTO=none
ONBOOT=yes
BRIDGE=br0
```

## 9 网络安全

### 9.1 SSH安全配置

```bash
# 编辑SSH配置文件
sudo nano /etc/ssh/sshd_config

# 安全配置选项
Port 2222                    # 更改默认端口
PermitRootLogin no           # 禁止root登录
PasswordAuthentication no    # 禁用密码认证
PubkeyAuthentication yes     # 启用公钥认证
MaxAuthTries 3              # 限制认证尝试次数
ClientAliveInterval 300     # 设置会话超时
ClientAliveCountMax 2       # 设置最大超时次数

# 重启SSH服务
sudo systemctl restart sshd

# 使用SSH密钥认证
ssh-keygen -t rsa -b 4096
ssh-copy-id user@remote_host
```

### 9.2 SSL/TLS证书管理

```bash
# 生成自签名证书
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/apache-selfsigned.key \
    -out /etc/ssl/certs/apache-selfsigned.crt

# 查看证书信息
openssl x509 -in /etc/ssl/certs/apache-selfsigned.crt -text -noout

# 验证证书
openssl verify /etc/ssl/certs/apache-selfsigned.crt

# 使用Let's Encrypt获取免费证书
sudo apt install certbot python3-certbot-apache  # Ubuntu/Debian
sudo yum install certbot python3-certbot-apache  # CentOS/RHEL

# 获取证书
sudo certbot --apache -d example.com -d www.example.com

# 自动续期
sudo crontab -e
# 添加以下行
0 12 * * * /usr/bin/certbot renew --quiet
```

## 10 实践练习

### 10.1 基础练习

1. 网络接口配置：
   - 使用ip命令配置网络接口
   - 配置静态IP地址和网关
   - 配置DNS服务器

2. 路由配置：
   - 查看和配置路由表
   - 添加静态路由
   - 配置默认网关

3. 网络服务配置：
   - 配置DHCP服务器
   - 配置DNS服务器
   - 配置NTP服务

### 10.2 进阶练习

1. 防火墙配置：
   - 使用iptables配置防火墙规则
   - 使用UFW管理防火墙
   - 使用firewalld管理防火墙

2. 高级网络配置：
   - 配置网络绑定
   - 配置VLAN
   - 配置网桥

3. 网络安全：
   - 配置SSH安全设置
   - 生成和管理SSL/TLS证书
   - 配置Let's Encrypt证书

## 11 常见问题与解决方案

### 11.1 网络连接问题

1. **无法获取IP地址**
   - 问题：DHCP客户端无法获取IP地址
   - 解决：检查DHCP服务器状态，检查网络连接

2. **无法访问互联网**
   - 问题：可以访问局域网但无法访问互联网
   - 解决：检查DNS配置，检查网关设置

3. **网络速度慢**
   - 问题：网络连接速度明显变慢
   - 解决：检查网络设备状态，使用网络诊断工具

### 11.2 服务配置问题

1. **DHCP服务无法启动**
   - 问题：DHCP服务器启动失败
   - 解决：检查配置文件语法，检查端口占用

2. **DNS解析失败**
   - 问题：无法解析域名
   - 解决：检查DNS配置，检查防火墙规则

3. **防火墙阻止连接**
   - 问题：防火墙规则阻止正常连接
   - 解决：检查防火墙规则，添加必要的例外

## 12 本章小结

本章详细介绍了Linux网络配置与管理的各个方面，包括：

1. 网络基础概念：OSI模型、TCP/IP模型、网络协议和设备
2. 网络接口配置：查看和配置网络接口，永久网络配置
3. 路由配置：查看和配置路由表，静态路由配置
4. DNS配置：DNS配置文件和永久DNS配置
5. 网络服务配置：DHCP、DNS和NTP服务配置
6. 防火墙配置：iptables、UFW和firewalld的使用
7. 网络诊断工具：连通性测试、端口测试和性能测试
8. 高级网络配置：网络绑定、VLAN和网桥配置
9. 网络安全：SSH安全配置和SSL/TLS证书管理

网络配置与管理是Linux系统管理的核心技能之一。通过本章学习，读者应该能够熟练配置Linux系统的网络环境，管理网络服务，配置防火墙，诊断网络问题，并实施基本的网络安全措施。这些技能对于系统管理员和网络工程师来说至关重要，是保障系统网络连通性和安全性的基础。

下一章将介绍Shell基础，包括Shell的基本概念、命令行操作、Shell变量、流程控制等内容，这是Linux系统管理和自动化脚本编写的基础。