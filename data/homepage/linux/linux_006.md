# 第6章：用户与权限管理

## 概述

Linux是一个多用户、多任务的操作系统，用户与权限管理是其核心安全机制之一。通过合理的用户和权限配置，可以确保系统资源的安全性，防止未授权访问，同时实现资源的合理分配和使用。

本章将详细介绍Linux系统中的用户和组管理，包括用户账户的创建、修改和删除，用户组的管理，文件权限的设置和修改，以及高级权限控制机制如SUID、SGID和粘滞位等。

## 1 用户账户管理

### 1.1 Linux用户类型

在Linux系统中，用户主要分为以下几种类型：

1. **超级用户（root）**
   - UID为0，拥有系统的最高权限
   - 可以执行任何操作，不受权限限制
   - 通常用于系统管理和维护

2. **系统用户**
   - UID通常在1-999之间
   - 用于运行系统服务和守护进程
   - 通常不能登录系统

3. **普通用户**
   - UID通常从1000开始
   - 由系统管理员创建，用于日常工作
   - 权限受限，只能访问自己的文件和授权的资源

### 1.2 用户账户信息文件

Linux系统通过以下文件存储用户账户信息：

1. **/etc/passwd** - 用户账户基本信息
   ```
   username:password:UID:GID:comment:home_directory:shell
   ```
   - username：用户名
   - password：密码占位符（x表示密码存储在/etc/shadow中）
   - UID：用户ID
   - GID：主组ID
   - comment：用户描述信息
   - home_directory：用户主目录
   - shell：用户登录Shell

2. **/etc/shadow** - 用户密码信息
   ```
   username:password:last_change:min_days:max_days:warn:inactive:expire:reserved
   ```
   - username：用户名
   - password：加密后的密码
   - last_change：上次修改密码的日期（从1970-01-01开始的天数）
   - min_days：密码最小使用天数
   - max_days：密码最大使用天数
   - warn：密码过期前警告天数
   - inactive：密码过期后账户禁用天数
   - expire：账户过期日期
   - reserved：保留字段

3. **/etc/group** - 用户组信息
   ```
   groupname:password:GID:member_list
   ```

### 1.3 用户管理命令

#### 创建用户

```bash
# 创建用户（使用默认设置）
sudo useradd username

# 创建用户并指定主目录
sudo useradd -m username

# 创建用户并指定UID
sudo useradd -u 1500 username

# 创建用户并指定主组
sudo useradd -g groupname username

# 创建用户并指定附加组
sudo useradd -G group1,group2 username

# 创建用户并指定Shell
sudo useradd -s /bin/bash username

# 创建用户并指定主目录
sudo useradd -d /home/custom_dir username

# 创建用户并添加描述信息
sudo useradd -c "User Description" username

# 创建用户并设置密码过期时间
sudo useradd -e 2023-12-31 username

# 创建用户并设置密码最小使用天数
sudo useradd -f 7 username

# 创建系统用户
sudo useradd -r username

# 组合使用多个选项
sudo useradd -m -u 1500 -g users -G sudo,adm -s /bin/bash -c "Regular User" username
```

#### 设置用户密码

```bash
# 交互式设置密码
sudo passwd username

# 非交互式设置密码
echo "username:password" | sudo chpasswd

# 使用openssl生成加密密码并设置
echo "password" | openssl passwd -1 -stdin | sudo tee -a /etc/shadow

# 强制用户下次登录时修改密码
sudo chage -d 0 username

# 设置密码过期时间
sudo chage -M 90 username

# 设置密码最小使用天数
sudo chage -m 7 username

# 设置密码过期前警告天数
sudo chage -W 7 username

# 查看密码策略信息
sudo chage -l username
```

#### 修改用户信息

```bash
# 修改用户名
sudo usermod -l new_username old_username

# 修改用户UID
sudo usermod -u 1500 username

# 修改用户主组
sudo usermod -g new_group username

# 修改用户附加组
sudo usermod -G group1,group2 username

# 添加用户到附加组（保留原有组）
sudo usermod -aG groupname username

# 修改用户Shell
sudo usermod -s /bin/bash username

# 修改用户主目录
sudo usermod -d /home/new_dir username

# 修改用户描述信息
sudo usermod -c "New Description" username

# 修改用户主目录名并移动文件
sudo usermod -m -d /home/new_dir username

# 锁定用户账户
sudo usermod -L username

# 解锁用户账户
sudo usermod -U username

# 设置账户过期日期
sudo usermod -e 2023-12-31 username
```

#### 删除用户

```bash
# 删除用户（保留主目录）
sudo userdel username

# 删除用户并删除主目录
sudo userdel -r username

# 删除用户并删除主目录和邮件池
sudo userdel -r username
sudo rm -rf /var/spool/mail/username
```

#### 查看用户信息

```bash
# 查看当前登录用户
whoami
id

# 查看所有用户
cat /etc/passwd | cut -d: -f1
compgen -u

# 查看用户详细信息
id username
finger username

# 查看用户登录历史
last username
lastlog

# 查看当前登录用户
w
who
users
```

## 2 用户组管理

### 2.1 用户组类型

Linux系统中的用户组主要分为：

1. **主组（Primary Group）**
   - 每个用户必须有一个主组
   - 用户创建文件时，文件默认属于主组
   - 在/etc/passwd文件中指定

2. **附加组（Supplementary Groups）**
   - 用户可以属于多个附加组
   - 用于授予用户额外的权限
   - 在/etc/group文件中指定

### 2.2 组管理命令

#### 创建组

```bash
# 创建组
sudo groupadd groupname

# 创建组并指定GID
sudo groupadd -g 2000 groupname

# 创建系统组
sudo groupadd -r groupname
```

#### 修改组

```bash
# 修改组名
sudo groupmod -n new_groupname old_groupname

# 修改组GID
sudo groupmod -g 2000 groupname
```

#### 删除组

```bash
# 删除组（组中不能有成员）
sudo groupdel groupname
```

#### 管理组成员

```bash
# 将用户添加到组
sudo usermod -aG groupname username

# 从组中移除用户
sudo gpasswd -d username groupname

# 设置组管理员
sudo gpasswd -A username groupname

# 设置组密码
sudo gpasswd groupname

# 查看组成员
getent group groupname
groups username
```

#### 查看组信息

```bash
# 查看所有组
cat /etc/group | cut -d: -f1
compgen -g

# 查看用户所属的组
groups username
id username
```

## 3 文件权限管理

### 3.1 权限基本概念

Linux文件权限分为三组，每组包含三种权限：

1. **所有者（User）权限**：文件所有者的权限
2. **所属组（Group）权限**：文件所属组的权限
3. **其他人（Others）权限**：其他用户的权限

每种权限包括：
- **读（r）**：读取文件内容或列出目录内容
- **写（w）**：修改文件内容或在目录中创建/删除文件
- **执行（x）**：执行文件或进入目录

权限表示方法：
- **符号表示法**：rwxr-xr--
- **八进制表示法**：754

### 3.2 查看文件权限

```bash
# 查看文件权限
ls -l filename

# 查看目录权限
ls -ld directory/

# 查看文件详细权限信息
stat filename

# 以数字形式查看权限
stat -c "%a %n" filename
```

### 3.3 修改文件权限

使用`chmod`命令修改文件权限：

#### 符号模式

```bash
# 基本语法
chmod [who][operator][permission] file

# who: u(用户), g(组), o(其他人), a(所有人)
# operator: +(添加), -(移除), =(设置)
# permission: r(读), w(写), x(执行)

# 给所有者添加执行权限
chmod u+x filename

# 移除组的写权限
chmod g-w filename

# 设置其他人的权限为只读
chmod o=r filename

# 给所有人添加读权限
chmod a+r filename

# 设置权限为rwxr-xr-x
chmod u=rwx,g=rx,o=rx filename

# 同时设置多个权限
chmod u+x,g-w,o=r filename
```

#### 八进制模式

```bash
# 基本语法
chmod [octal] file

# 常用权限组合
chmod 644 filename    # rw-r--r--
chmod 755 directory/  # rwxr-xr-x
chmod 777 filename    # rwxrwxrwx
chmod 600 filename    # rw-------
chmod 700 directory/  # rwx------

# 递归修改目录权限
chmod -R 755 directory/

# 参考其他文件权限
chmod --reference=reference_file target_file
```

### 3.4 修改文件所有者和所属组

使用`chown`和`chgrp`命令：

```bash
# 修改文件所有者
sudo chown new_owner filename

# 修改文件所属组
sudo chgrp new_group filename

# 同时修改所有者和所属组
sudo chown new_owner:new_group filename

# 只修改所属组
sudo chown :new_group filename

# 递归修改目录所有者和所属组
sudo chown -R new_owner:new_group directory/

# 参考其他文件的所有者和所属组
sudo chown --reference=reference_file target_file
```

## 4 高级权限控制

### 4.1 特殊权限位

Linux系统中有三种特殊权限位：

1. **SUID（Set User ID）**
   - 设置在可执行文件上，执行时以文件所有者身份运行
   - 常用于需要临时提升权限的程序，如passwd命令
   - 权限表示：s（替代x位）

2. **SGID（Set Group ID）**
   - 设置在可执行文件上，执行时以文件所属组身份运行
   - 设置在目录上，新建文件继承目录的所属组
   - 权限表示：s（替代x位）

3. **粘滞位（Sticky Bit）**
   - 设置在目录上，只有文件所有者和root可以删除文件
   - 常用于/tmp等公共目录
   - 权限表示：t（替代x位）

#### 设置特殊权限

```bash
# 设置SUID
chmod u+s filename
chmod 4755 filename

# 设置SGID
chmod g+s filename
chmod 2755 filename

# 设置粘滞位
chmod o+t directory/
chmod 1755 directory/

# 同时设置多个特殊权限
chmod 4755 filename    # SUID
chmod 2755 filename    # SGID
chmod 1755 directory/  # Sticky Bit
chmod 7755 filename    # SUID+SGID
chmod 7755 directory/  # SUID+SGID+Sticky Bit

# 移除特殊权限
chmod u-s filename
chmod g-s filename
chmod o-t directory/
```

### 4.2 访问控制列表（ACL）

ACL提供了比传统权限更细粒度的访问控制：

#### 安装ACL支持

```bash
# Ubuntu/Debian
sudo apt-get install acl

# CentOS/RHEL
sudo yum install acl

# 检查文件系统是否支持ACL
tune2fs -l /dev/sda1 | grep "Default mount options"
```

#### ACL命令

```bash
# 查看文件ACL
getfacl filename

# 设置文件ACL
setfacl -m u:username:rw filename
setfacl -m g:groupname:rw filename
setfacl -m o::r filename
setfacl -m m::rw filename

# 递归设置目录ACL
setfacl -R -m u:username:rw directory/

# 设置默认ACL
setfacl -d -m u:username:rw directory/

# 移除ACL
setfacl -x u:username filename
setfacl -b filename  # 移除所有ACL

# 备份和恢复ACL
getfacl -R directory/ > acl_backup.txt
setfacl --restore=acl_backup.txt
```

## 5 用户环境配置

### 5.1 Shell配置文件

Linux系统中有多个Shell配置文件：

1. **全局配置文件**
   - `/etc/profile`：所有用户的登录Shell配置
   - `/etc/bash.bashrc`：所有用户的交互式Shell配置
   - `/etc/environment`：系统环境变量

2. **用户配置文件**
   - `~/.bash_profile`：用户登录Shell配置
   - `~/.bash_login`：用户登录Shell配置（如果bash_profile不存在）
   - `~/.profile`：用户登录Shell配置（如果前两个都不存在）
   - `~/.bashrc`：用户交互式Shell配置
   - `~/.bash_logout`：用户退出Shell时执行的命令

### 5.2 环境变量管理

```bash
# 查看所有环境变量
env
printenv

# 查看特定环境变量
echo $PATH
echo $HOME

# 设置临时环境变量
export VAR_NAME="value"

# 设置永久环境变量（添加到~/.bashrc）
echo 'export VAR_NAME="value"' >> ~/.bashrc
source ~/.bashrc

# 查看Shell变量
set

# 删除环境变量
unset VAR_NAME
```

### 5.3 用户资源限制

使用`ulimit`命令查看和设置用户资源限制：

```bash
# 查看当前资源限制
ulimit -a

# 设置最大进程数
ulimit -u 1024

# 设置最大文件描述符数
ulimit -n 4096

# 设置最大文件大小
ulimit -f 10240

# 设置核心转储文件大小
ulimit -c 0

# 永久设置资源限制（编辑/etc/security/limits.conf）
echo "username soft nofile 4096" >> /etc/security/limits.conf
echo "username hard nofile 8192" >> /etc/security/limits.conf
```

## 6 用户认证与安全

### 6.1 密码策略

```bash
# 查看密码策略
cat /etc/pam.d/common-password
cat /etc/login.defs

# 设置密码最小长度
sudo sed -i 's/PASS_MIN_LEN.*/PASS_MIN_LEN 8/' /etc/login.defs

# 设置密码复杂度要求
sudo apt-get install libpam-pwquality
echo "password requisite pam_pwquality.so retry=3 minlen=8 difok=3 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1" >> /etc/pam.d/common-password

# 设置密码历史记录
echo "password required pam_pwhistory.so remember=5" >> /etc/pam.d/common-password
```

### 6.2 账户锁定策略

```bash
# 设置登录失败次数限制
sudo apt-get install libpam-faillock
echo "auth required pam_faillock.so preauth silent deny=5 unlock_time=900" >> /etc/pam.d/common-auth

# 设置账户自动锁定时间
echo "auth required pam_faillock.so authfail deny=5 unlock_time=900" >> /etc/pam.d/common-auth

# 查看被锁定的账户
sudo faillock --user username

# 解锁被锁定的账户
sudo faillock --user username --reset
```

### 6.3 SSH密钥认证

```bash
# 生成SSH密钥对
ssh-keygen -t rsa -b 4096 -C "user@example.com"

# 将公钥复制到远程服务器
ssh-copy-id username@remote_host

# 手动配置SSH密钥认证
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cat id_rsa.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 配置SSH服务
sudo nano /etc/ssh/sshd_config
# 添加或修改以下配置：
# PubkeyAuthentication yes
# AuthorizedKeysFile .ssh/authorized_keys
# PasswordAuthentication no  # 禁用密码认证

# 重启SSH服务
sudo systemctl restart sshd
```

## 7 用户活动监控

### 7.1 登录监控

```bash
# 查看当前登录用户
w
who
users

# 查看用户登录历史
last
last username

# 查看最近登录记录
lastlog

# 实时监控登录活动
sudo watch who

# 查看登录失败记录
sudo grep "Failed password" /var/log/auth.log
```

### 7.2 用户活动日志

```bash
# 查看用户命令历史
history
cat ~/.bash_history

# 查看系统日志中的用户活动
sudo grep "username" /var/log/auth.log

# 监控用户实时操作
sudo watch -n 1 "ps aux | grep username"

# 查看用户进程
ps -u username
pgrep -u username
```

## 8 用户管理最佳实践

### 8.1 安全原则

1. **最小权限原则**
   - 只授予用户完成工作所需的最小权限
   - 避免使用root账户进行日常操作
   - 使用sudo进行临时权限提升

2. **职责分离**
   - 不同角色使用不同账户
   - 管理任务使用专门的管理账户
   - 服务使用专用系统账户

3. **定期审计**
   - 定期检查用户账户和权限
   - 及时删除不再需要的账户
   - 监控异常登录活动

### 8.2 用户管理策略

```bash
# 创建用户模板目录
sudo mkdir /etc/skel/template
sudo cp /etc/skel/* /etc/skel/template/

# 自定义新用户默认配置
sudo nano /etc/adduser.conf
# 修改以下配置：
# DSHELL=/bin/bash
# DHOME=/home
# GROUP=100
# SKEL=/etc/skel/template

# 创建用户管理脚本
cat > user_management.sh << 'EOF'
#!/bin/bash
# 创建标准用户
create_standard_user() {
    username=$1
    sudo useradd -m -s /bin/bash -c "Standard User" $username
    echo "$username:TempPass123" | sudo chpasswd
    sudo chage -d 0 $username
    echo "User $username created with temporary password TempPass123"
}

# 创建服务用户
create_service_user() {
    username=$1
    sudo useradd -r -s /usr/sbin/nologin -c "Service User" $username
    echo "Service user $username created"
}

# 禁用用户
disable_user() {
    username=$1
    sudo usermod -L $username
    sudo chage -E 0 $username
    echo "User $username disabled"
}

# 删除用户
delete_user() {
    username=$1
    sudo userdel -r $username
    echo "User $username deleted"
}

case "$1" in
    create-standard)
        create_standard_user $2
        ;;
    create-service)
        create_service_user $2
        ;;
    disable)
        disable_user $2
        ;;
    delete)
        delete_user $2
        ;;
    *)
        echo "Usage: $0 {create-standard|create-service|disable|delete} username"
        exit 1
        ;;
esac
EOF

chmod +x user_management.sh
```

### 8.3 权限管理策略

```bash
# 设置目录默认权限
echo "umask 022" >> ~/.bashrc

# 设置文件默认权限
echo "umask 022" >> /etc/profile

# 创建共享目录
sudo mkdir /shared
sudo chown root:shared_group /shared
sudo chmod 2775 /shared
sudo chmod g+s /shared

# 配置sudo权限
sudo visudo
# 添加以下内容：
# username ALL=(ALL) NOPASSWD: /usr/bin/apt-get
# %groupname ALL=(ALL) /usr/bin/systemctl restart httpd
```

## 9 实践练习

### 9.1 基础练习

1. 创建以下用户和组：
   - 创建两个普通用户：user1和user2
   - 创建一个组：developers
   - 将user1和user2添加到developers组

2. 设置文件权限：
   - 创建一个目录：/shared/project
   - 设置developers组对该目录有读写执行权限
   - 设置其他用户对该目录只有读和执行权限

3. 配置用户环境：
   - 为user1设置自定义环境变量MY_VAR="hello"
   - 为user2设置别名ll="ls -la"

### 9.2 进阶练习

1. 实现以下权限控制：
   - 创建一个目录：/shared/data
   - 设置该目录的SGID位，使新建文件自动继承目录的所属组
   - 设置该目录的粘滞位，只允许文件所有者删除文件

2. 配置用户认证：
   - 为user1配置SSH密钥认证
   - 禁用user1的密码认证
   - 设置user1的密码过期策略为90天

3. 实现用户监控：
   - 创建一个脚本，监控用户登录活动
   - 记录所有用户的登录和登出时间
   - 发送异常登录警报

## 10 常见问题与解决方案

### 10.1 用户管理常见问题

1. **"Permission denied"错误**
   - 问题：没有足够的权限执行操作
   - 解决：使用sudo获取管理员权限，或检查文件权限

2. **"user already exists"错误**
   - 问题：尝试创建已存在的用户
   - 解决：检查用户是否存在，或使用usermod修改现有用户

3. **"group does not exist"错误**
   - 问题：尝试使用不存在的组
   - 解决：先创建组，再创建用户或修改用户组

4. **无法切换用户**
   - 问题：用户shell设置不正确或账户被锁定
   - 解决：检查用户shell设置，解锁用户账户

### 10.2 权限问题排查

1. **检查文件权限**
   ```bash
   ls -la filename
   stat filename
   ```

2. **检查用户和组信息**
   ```bash
   id username
   groups username
   ```

3. **检查特殊权限**
   ```bash
   ls -la filename
   getfacl filename
   ```

4. **检查进程权限**
   ```bash
   ps aux | grep process_name
   cat /proc/PID/status
   ```

## 11 本章小结

本章详细介绍了Linux系统中的用户与权限管理，包括：

1. 用户账户管理：创建、修改、删除用户账户
2. 用户组管理：创建、修改、删除用户组，管理组成员
3. 文件权限管理：查看、修改文件和目录权限
4. 高级权限控制：SUID、SGID、粘滞位和ACL
5. 用户环境配置：Shell配置文件和环境变量
6. 用户认证与安全：密码策略、账户锁定和SSH密钥认证
7. 用户活动监控：登录监控和用户活动日志
8. 用户管理最佳实践：安全原则和管理策略

掌握用户与权限管理是Linux系统管理的基础，也是确保系统安全的关键。通过合理的用户和权限配置，可以实现系统资源的安全访问和合理分配，防止未授权访问和恶意操作。

下一章将介绍Linux中的进程管理，包括进程的查看、控制、调度和优化等内容，这是系统性能管理和故障排查的重要基础。