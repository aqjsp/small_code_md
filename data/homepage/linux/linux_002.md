# 第2章：Linux安装与配置

## 1 安装前的准备工作

### 1.1 选择合适的Linux发行版

在安装Linux之前，首先需要选择一个适合自己需求的发行版。常见的选择包括：

- **Ubuntu**：适合初学者，社区支持良好，软件丰富
- **CentOS**：适合服务器环境，稳定性好
- **Debian**：稳定可靠，适合有经验的用户
- **Fedora**：技术先进，适合开发者
- **Arch Linux**：高度可定制，适合高级用户

### 1.2 硬件要求检查

不同的Linux发行版对硬件的要求有所不同，一般来说：

- **最低配置**：
  - CPU：1GHz或更快
  - 内存：1GB（推荐2GB以上）
  - 硬盘空间：10GB（推荐20GB以上）
  
- **推荐配置**：
  - CPU：双核2GHz或更快
  - 内存：4GB以上
  - 硬盘空间：50GB以上

### 1.3 准备安装介质

1. **下载ISO镜像**：
   - 访问发行版官方网站下载最新的ISO镜像
   - 确保下载的镜像完整无误（校验MD5/SHA值）

2. **制作启动盘**：
   - **U盘启动**（推荐）：
     - Windows：使用Rufus、Universal USB Installer等工具
     - Linux/macOS：使用dd命令或Etcher等工具
   - **光盘启动**：
     - 使用刻录软件将ISO镜像刻录到DVD

### 1.4 数据备份

在安装Linux之前，务必备份重要数据：

- 备份个人文件到外部存储设备
- 备份浏览器书签、邮件等
- 如果可能，创建整个系统的完整备份

## 2 虚拟机安装Linux

### 2.1 虚拟机软件选择

常用的虚拟机软件包括：

- **VirtualBox**：免费开源，跨平台
- **VMware Workstation**：功能强大，商业软件（有免费版）
- **Hyper-V**：Windows内置虚拟化技术
- **KVM/QEMU**：Linux原生虚拟化解决方案

### 2.2 创建虚拟机

以VirtualBox为例：

1. **下载并安装VirtualBox**
2. **创建新虚拟机**：
   - 点击"新建"按钮
   - 输入虚拟机名称（如"Ubuntu"）
   - 选择类型和版本（如"Linux" -> "Ubuntu"）
   - 分配内存（建议2GB以上）
   - 创建虚拟硬盘（建议20GB以上）

3. **配置虚拟机**：
   - 选择创建的虚拟机，点击"设置"
   - 在"系统"选项卡中，启用"启用EFI"
   - 在"存储"选项卡中，添加ISO镜像到光驱
   - 在"网络"选项卡中，选择网络连接方式

### 2.2 创建虚拟机

1. **启动虚拟机**：
   - 选择虚拟机，点击"启动"
   - 虚拟机将从ISO镜像启动

2. **安装过程**（以Ubuntu为例）：
   - 选择语言："中文(简体)"
   - 点击"安装Ubuntu"
   - 键盘布局：选择"Chinese"
   - 安装类型：选择"清除整个磁盘并安装Ubuntu"
   - 时区设置：选择"Shanghai"
   - 创建用户：输入姓名、计算机名、用户名和密码

3. **完成安装**：
   - 等待安装完成
   - 重启系统
   - 移除ISO镜像（虚拟机会提示）

## 3 双系统安装

### 3.1 磁盘分区准备

在安装双系统之前，需要为Linux准备磁盘空间：

1. **Windows磁盘管理**：
   - 右键"此电脑" -> "管理" -> "磁盘管理"
   - 选择一个有足够空间的分区
   - 右键选择"压缩卷"，释放空间（建议至少30GB）

2. **磁盘分区概念**：
   - **主分区**：最多4个，用于安装操作系统
   - **扩展分区**：可以包含多个逻辑分区
   - **逻辑分区**：位于扩展分区内

### 3.2 BIOS与UEFI

了解系统的启动模式：

- **BIOS**：传统启动模式，使用MBR分区表
- **UEFI**：现代启动模式，使用GPT分区表，支持安全启动

检查启动模式：
- Windows：打开"系统信息"，查看"BIOS模式"
- Linux：执行`[ -d /sys/firmware/efi ] && echo "UEFI" || echo "BIOS"`

### 3.3 安装步骤

1. **从启动盘启动**：
   - 重启电脑
   - 进入BIOS/UEFI设置（通常按F2、F12、Del等键）
   - 设置从U盘或光盘启动

2. **安装Linux**：
   - 选择语言和键盘布局
   - 选择"其他选项"进行手动分区
   - 创建以下分区：
     - **/boot分区**：500MB-1GB，ext4格式
     - **swap分区**：等于或2倍内存大小
     - **根分区(/)**：至少20GB，ext4格式
     - **/home分区**：剩余空间，ext4格式
   - 设置引导加载程序位置
   - 创建用户账户

3. **修复引导**：
   - 如果Windows无法启动，使用Boot-Repair工具修复
   - 或使用EasyBCD管理启动项

## 4 基本系统配置

### 4.1 系统更新

安装完成后，首先更新系统：

```bash
# Ubuntu/Debian系统
sudo apt update
sudo apt upgrade

# CentOS/RHEL/Fedora系统
sudo yum update
# 或者（较新版本）
sudo dnf update
```

### 4.2 驱动安装

1. **显卡驱动**：
   ```bash
   # NVIDIA显卡（Ubuntu）
   sudo ubuntu-drivers autoinstall
   
   # 或者从NVIDIA官网下载安装
   ```

2. **无线网卡驱动**：
   ```bash
   # 查看网卡型号
   lspci -knn | grep -iA3 net
   
   # 安装对应驱动
   sudo apt install firmware-linux-nonfree
   ```

3. **其他硬件驱动**：
   - 使用"附加驱动"工具（Ubuntu）
   - 或手动下载安装厂商提供的驱动

### 4.3 软件源配置

配置软件源可以提高下载速度：

```bash
# Ubuntu
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo nano /etc/apt/sources.list

# 替换为国内镜像源，如清华源：
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# 更新软件列表
sudo apt update
```

### 4.4 基本软件安装

安装一些常用的软件：

```bash
# Ubuntu/Debian
sudo apt install -y vim git curl wget htop tree net-tools

# CentOS/RHEL/Fedora
sudo yum install -y vim git curl wget htop tree net-tools
```

## 5 网络设置

### 5.1 图形界面网络配置

大多数Linux发行版提供图形界面的网络配置工具：

- **GNOME**：顶部菜单 -> 有线/无线设置
- **KDE**：系统设置 -> 网络连接
- **XFCE**：设置管理器 -> 网络

### 5.2 命令行网络配置

#### 静态IP配置

```bash
# 查看网络接口
ip addr show

# 编辑网络配置文件（Ubuntu 18.04+）
sudo nano /etc/netplan/01-netcfg.yaml

# 配置内容示例
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: no
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]

# 应用配置
sudo netplan apply
```

#### DHCP配置

```bash
# 编辑网络配置文件
sudo nano /etc/netplan/01-netcfg.yaml

# 配置内容示例
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: yes

# 应用配置
sudo netplan apply
```

### 5.3 无线网络配置

#### 命令行配置无线网络

```bash
# 查看无线网卡
iwconfig

# 扫描无线网络
sudo iwlist scan

# 连接到无线网络
sudo nano /etc/netplan/01-wireless.yaml

# 配置内容示例
network:
  version: 2
  renderer: networkd
  wifis:
    wlan0:
      dhcp4: yes
      access-points:
        "网络名称":
          password: "密码"

# 应用配置
sudo netplan apply
```

### 5.4 网络故障排除

常用的网络故障排除命令：

```bash
# 检查网络接口状态
ip addr show

# 检查网络连接
ping 8.8.8.8

# 检查DNS解析
nslookup google.com

# 检查路由表
ip route show

# 检查端口监听
sudo netstat -tulpn
```

## 6 系统优化与美化

### 6.1 系统性能优化

1. **启动项管理**：
   ```bash
   # 查看启动项
   systemctl list-unit-files --type=service | grep enabled
   
   # 禁用不需要的服务
   sudo systemctl disable 服务名
   ```

2. **内存优化**：
   ```bash
   # 查看内存使用情况
   free -h
   
   # 查看进程内存使用
   top
   ```

3. **磁盘优化**：
   ```bash
   # 查看磁盘使用情况
   df -h
   
   # 清理缓存
   sudo apt clean
   ```

### 6.2 桌面环境美化

1. **主题和图标**：
   - 安装主题工具：`sudo apt install gnome-tweak-tool`
   - 下载主题和图标包
   - 使用优化工具应用主题

2. **扩展插件**：
   - 安装浏览器扩展：`sudo apt install chrome-gnome-shell`
   - 访问GNOME扩展网站安装扩展
   - 推荐扩展：Dash to Dock、Net Speed Simplified等

3. **终端美化**：
   ```bash
   # 安装Zsh
   sudo apt install zsh
   
   # 安装Oh My Zsh
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   
   # 安装Powerlevel10k主题
   git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
   ```

## 7 常见安装问题与解决方案

### 7.1 启动问题

1. **无法从U盘启动**：
   - 检查BIOS设置中的启动顺序
   - 禁用安全启动（Secure Boot）
   - 尝试不同的USB端口

2. **安装后无法启动**：
   - 检查引导加载程序是否正确安装
   - 使用启动盘修复引导
   - 检查分区表是否正确

### 7.2 硬件兼容性问题

1. **无线网卡不工作**：
   - 查看网卡型号：`lspci -knn | grep -iA3 net`
   - 安装对应驱动
   - 尝试使用USB无线网卡

2. **显卡驱动问题**：
   - 安装开源驱动
   - 从厂商官网下载专有驱动
   - 编辑GRUB配置文件添加参数

### 7.3 软件安装问题

1. **依赖关系错误**：
   ```bash
   # 修复依赖关系
   sudo apt install -f
   
   # 清理缓存
   sudo apt clean
   sudo apt autoremove
   ```

2. **软件源问题**：
   - 检查软件源配置是否正确
   - 尝试更换其他软件源
   - 更新软件包列表

## 8 安装后的安全配置

### 8.1 用户安全

1. **创建普通用户**：
   ```bash
   # 创建新用户
   sudo adduser 用户名
   
   # 添加到sudo组
   sudo usermod -aG sudo 用户名
   ```

2. **禁用root登录**：
   ```bash
   # 编辑SSH配置
   sudo nano /etc/ssh/sshd_config
   
   # 修改以下行
   PermitRootLogin no
   
   # 重启SSH服务
   sudo systemctl restart sshd
   ```

### 8.2 防火墙配置

```bash
# 安装UFW（Uncomplicated Firewall）
sudo apt install ufw

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status

# 允许SSH连接
sudo ufw allow ssh

# 允许HTTP和HTTPS
sudo ufw allow 80
sudo ufw allow 443
```

### 8.3 系统更新与安全补丁

```bash
# 设置自动安全更新
sudo apt install unattended-upgrades

# 配置自动更新
sudo dpkg-reconfigure unattended-upgrades
```

## 9 本章小结

本章详细介绍了Linux的安装与配置过程，包括安装前的准备工作、虚拟机安装、双系统安装、基本系统配置、网络设置、系统优化与美化、常见问题解决以及安全配置等内容。

掌握Linux的安装与配置是学习Linux的第一步，也是非常重要的一步。通过本章的学习，读者应该能够独立完成Linux系统的安装和基本配置，为后续的学习打下坚实的基础。

## 10 实践练习

1. 在虚拟机中安装一个Linux发行版
2. 配置静态IP地址并测试网络连接
3. 安装必要的驱动程序
4. 配置软件源并更新系统
5. 进行基本的安全配置

## 11 思考题

1. 虚拟机安装和双系统安装各有什么优缺点？
2. 为什么需要为Linux创建多个分区？各分区的作用是什么？
3. 如何解决Linux安装后无法连接到网络的问题？
4. 为什么安装完成后需要立即更新系统？
5. Linux系统的基本安全配置包括哪些内容？