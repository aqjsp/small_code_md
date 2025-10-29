# 第10章：磁盘与文件系统管理

## 概述

磁盘与文件系统管理是Linux系统管理的核心组成部分，它涉及磁盘分区、文件系统创建、挂载、扩容、备份与恢复等多个方面。合理的磁盘管理和文件系统配置对于系统性能、数据安全和系统稳定性至关重要。

本章将详细介绍Linux中的磁盘与文件系统管理，包括磁盘分区工具、文件系统类型、挂载与卸载、磁盘空间管理、LVM（逻辑卷管理）、磁盘配额、磁盘检查与修复、RAID配置以及备份与恢复策略等内容。

## 1 磁盘基础概念

### 1.1 磁盘设备命名

Linux系统中，磁盘设备通常按照以下规则命名：

- **IDE/PATA磁盘**：`/dev/hda`、`/dev/hdb`等
- **SCSI/SATA/SAS磁盘**：`/dev/sda`、`/dev/sdb`等
- **NVMe磁盘**：`/dev/nvme0n1`、`/dev/nvme1n1`等
- **虚拟磁盘**：`/dev/vda`、`/dev/vdb`等

分区命名规则：
- **主分区**：`/dev/sda1`、`/dev/sda2`等
- **扩展分区**：`/dev/sda3`等
- **逻辑分区**：`/dev/sda5`、`/dev/sda6`等

### 1.2 分区表类型

1. **MBR（Master Boot Record）**：
   - 最多支持4个主分区或3个主分区+1个扩展分区
   - 最大支持2TB磁盘
   - 使用32位存储扇区信息

2. **GPT（GUID Partition Table）**：
   - 支持最多128个分区
   - 支持最大18EB磁盘
   - 使用64位存储扇区信息
   - 提供分区冗余和CRC校验

### 1.3 文件系统类型

Linux支持多种文件系统类型：

1. **ext4**：第四代扩展文件系统，Linux默认文件系统
2. **ext3**：第三代扩展文件系统，支持日志
3. **ext2**：第二代扩展文件系统，不支持日志
4. **XFS**：高性能日志文件系统，适合大文件
5. **Btrfs**：现代写时复制文件系统，支持快照和压缩
6. **ZFS**：高级文件系统，支持数据完整性校验和压缩
7. **NTFS**：Windows NT文件系统，Linux可读写
8. **FAT32/vFAT**：Windows FAT文件系统，兼容性好
9. **swap**：Linux交换分区，用于虚拟内存

## 2 磁盘分区工具

### 2.1 fdisk命令

fdisk是传统的磁盘分区工具，适用于MBR分区表：

```bash
# 查看磁盘分区
sudo fdisk -l

# 对磁盘进行分区
sudo fdisk /dev/sdb

# fdisk交互命令
m  # 显示帮助菜单
n  # 创建新分区
d  # 删除分区
p  # 显示分区表
t  # 更改分区类型
w  # 保存更改并退出
q  # 不保存更改退出

# 查看分区类型代码
sudo fdisk -l /dev/sdb
```

### 2.2 gdisk命令

gdisk是GPT分区表工具，功能类似于fdisk：

```bash
# 查看GPT分区
sudo gdisk -l /dev/sdb

# 对磁盘进行GPT分区
sudo gdisk /dev/sdb

# gdisk交互命令
m  # 显示帮助菜单
n  # 创建新分区
d  # 删除分区
p  # 显示分区表
t  # 更改分区类型
w  # 保存更改并退出
q  # 不保存更改退出

# 转换MBR到GPT
sudo gdisk /dev/sdb
# 在gdisk中输入：w（转换并保存）
```

### 2.3 parted命令

parted是高级分区工具，支持MBR和GPT：

```bash
# 启动parted
sudo parted /dev/sdb

# parted交互命令
print  # 显示分区表
mklabel gpt  # 创建GPT分区表
mklabel msdos  # 创建MBR分区表
mkpart primary  # 创建主分区
mkpart logical  # 创建逻辑分区
rm 1  # 删除分区1
quit  # 退出parted

# 非交互式创建分区
sudo parted /dev/sdb mklabel gpt
sudo parted /dev/sdb mkpart primary ext4 1MiB 10GiB
sudo parted /dev/sdb mkpart primary ext4 10GiB 100%

# 调整分区大小
sudo parted /dev/sdb resizepart 2 20GiB
```

### 2.4 lsblk命令

lsblk用于列出块设备信息：

```bash
# 列出所有块设备
lsblk

# 以树形结构显示
lsblk -f

# 显示详细信息
lsblk -a

# 显示设备UUID和挂载点
lsblk -o NAME,UUID,FSTYPE,MOUNTPOINT

# 显示磁盘大小
lsblk -b

# 显示设备权限
lsblk -m
```

## 3 文件系统管理

### 3.1 创建文件系统

```bash
# 创建ext4文件系统
sudo mkfs.ext4 /dev/sdb1

# 创建ext3文件系统
sudo mkfs.ext3 /dev/sdb1

# 创建XFS文件系统
sudo mkfs.xfs /dev/sdb1

# 创建Btrfs文件系统
sudo mkfs.btrfs /dev/sdb1

# 创建FAT32文件系统
sudo mkfs.vfat -F 32 /dev/sdb1

# 创建NTFS文件系统
sudo mkfs.ntfs /dev/sdb1

# 创建swap分区
sudo mkswap /dev/sdb1

# 创建文件系统时指定标签
sudo mkfs.ext4 -L "Data" /dev/sdb1
sudo mkfs.xfs -L "Data" /dev/sdb1
```

### 3.2 文件系统检查与修复

```bash
# 检查ext4文件系统
sudo fsck.ext4 /dev/sdb1
sudo e2fsck /dev/sdb1

# 检查并自动修复ext4文件系统
sudo fsck.ext4 -p /dev/sdb1
sudo e2fsck -p /dev/sdb1

# 强制检查ext4文件系统
sudo fsck.ext4 -f /dev/sdb1
sudo e2fsck -f /dev/sdb1

# 检查XFS文件系统
sudo xfs_repair /dev/sdb1

# 检查XFS文件系统（不修复）
sudo xfs_repair -n /dev/sdb1

# 检查Btrfs文件系统
sudo btrfs check /dev/sdb1

# 修复Btrfs文件系统
sudo btrfs rescue super-recover /dev/sdb1

# 查看文件系统详细信息
sudo dumpe2fs /dev/sdb1  # ext4
sudo xfs_info /dev/sdb1   # XFS
sudo btrfs filesystem show /dev/sdb1  # Btrfs
```

### 3.3 文件系统调整

```bash
# 调整ext4文件系统大小（先卸载）
sudo umount /dev/sdb1
sudo resize2fs /dev/sdb1  # 调整到分区大小
sudo resize2fs /dev/sdb1 10G  # 调整到指定大小

# 在线调整ext4文件系统大小
sudo resize2fs /dev/sdb1

# 调整XFS文件系统大小（必须先挂载）
sudo xfs_growfs /mount/point
sudo xfs_growfs /dev/sdb1

# 调整Btrfs文件系统大小
sudo btrfs filesystem resize max /mount/point
sudo btrfs filesystem resize 10G /mount/point

# 更改文件系统标签
sudo e2label /dev/sdb1 "NewLabel"  # ext4
sudo xfs_admin -L "NewLabel" /dev/sdb1  # XFS
sudo btrfs filesystem label /dev/sdb1 "NewLabel"  # Btrfs
```

## 4 挂载与卸载

### 4.1 挂载文件系统

```bash
# 挂载文件系统
sudo mount /dev/sdb1 /mnt/data

# 指定文件系统类型挂载
sudo mount -t ext4 /dev/sdb1 /mnt/data

# 指定挂载选项
sudo mount -o rw,defaults /dev/sdb1 /mnt/data

# 按标签挂载
sudo mount -L "Data" /mnt/data

# 按UUID挂载
sudo mount -U "uuid-string" /mnt/data

# 查看挂载信息
mount
df -h
lsblk

# 查看特定文件系统挂载选项
mount | grep /dev/sdb1
```

### 4.2 挂载选项

常用挂载选项：

1. **基本选项**：
   - `defaults`：使用默认选项（rw, suid, dev, exec, auto, nouser, async）
   - `ro`：只读挂载
   - `rw`：读写挂载
   - `auto`：开机自动挂载
   - `noauto`：开机不自动挂载

2. **性能选项**：
   - `async`：异步I/O（默认）
   - `sync`：同步I/O
   - `noatime`：不更新文件访问时间
   - `nodiratime`：不更新目录访问时间
   - `data=ordered`：数据写入顺序（ext4默认）
   - `data=writeback`：数据写入延迟
   - `data=journal`：数据写入日志

3. **安全选项**：
   - `nosuid`：不允许SUID程序
   - `nodev`：不允许设备文件
   - `noexec`：不允许执行程序
   - `nosymfollow`：不跟随符号链接

4. **用户选项**：
   - `user`：允许普通用户挂载
   - `nouser`：只允许root用户挂载（默认）
   - `users`：允许所有用户挂载/卸载

### 4.3 卸载文件系统

```bash
# 卸载文件系统
sudo umount /mnt/data
sudo umount /dev/sdb1

# 强制卸载
sudo umount -f /mnt/data

# 懒惰卸载（当文件系统不忙时卸载）
sudo umount -l /mnt/data

# 卸载所有文件系统
sudo umount -a

# 卸载NFS文件系统
sudo umount -f /mnt/nfs

# 查看哪些进程在使用挂载点
sudo lsof /mnt/data
sudo fuser -v /mnt/data
```

### 4.4 /etc/fstab配置

/etc/fstab文件用于配置开机自动挂载：

```bash
# 查看fstab文件
cat /etc/fstab

# fstab文件格式
# <设备> <挂载点> <文件系统类型> <选项> <备份> <检查>
UUID=uuid-string /mnt/data ext4 defaults 0 2
/dev/sdb1 /mnt/backup ext4 defaults 0 2
LABEL="Data" /mnt/data ext4 defaults 0 2

# 备份字段
0  # 不备份
1  # 每天备份
2  # 每隔一天备份

# 检查字段
0  # 不检查
1  # 优先检查（根分区）
2  # 次要检查（其他分区）

# 测试fstab配置
sudo mount -a

# 查看设备UUID
sudo blkid /dev/sdb1
ls -l /dev/disk/by-uuid/
```

## 5 磁盘空间管理

### 5.1 磁盘空间查看

```bash
# 查看磁盘使用情况
df -h

# 查看特定文件系统
df -h /dev/sdb1

# 查看inode使用情况
df -i

# 查看目录大小
du -sh /path/to/directory

# 查看目录下各子目录大小
du -sh /path/to/directory/*

# 按大小排序显示目录
du -sh /path/to/directory/* | sort -rh

# 查找大文件
find /path -type f -size +100M 2>/dev/null

# 查找最大的10个文件
find /path -type f -exec ls -s {} + | sort -rh | head -10
```

### 5.2 磁盘空间清理

```bash
# 清理包管理器缓存
sudo apt clean          # Debian/Ubuntu
sudo yum clean all      # CentOS/RHEL
sudo pacman -Scc        # Arch Linux

# 清理日志文件
sudo journalctl --vacuum-time=7d
sudo journalctl --vacuum-size=100M

# 清理临时文件
sudo rm -rf /tmp/*
sudo rm -rf /var/tmp/*

# 查找并删除重复文件
fdupes -r /path/to/directory

# 查找并删除空目录
find /path -type d -empty
find /path -type d -empty -delete
```

## 6 逻辑卷管理（LVM）

### 6.1 LVM基础概念

LVM（Logical Volume Manager）是一种灵活的磁盘管理方案，包含以下组件：

1. **物理卷（PV）**：物理磁盘或分区
2. **卷组（VG）**：由一个或多个物理卷组成
3. **逻辑卷（LV）**：从卷组中分配的虚拟分区

### 6.2 LVM基本操作

```bash
# 安装LVM工具
sudo apt install lvm2  # Debian/Ubuntu
sudo yum install lvm2  # CentOS/RHEL

# 创建物理卷
sudo pvcreate /dev/sdb1
sudo pvcreate /dev/sdc1

# 查看物理卷
sudo pvdisplay
sudo pvs

# 创建卷组
sudo vgcreate vg_data /dev/sdb1 /dev/sdc1

# 查看卷组
sudo vgdisplay
sudo vgs

# 扩展卷组
sudo vgextend vg_data /dev/sdd1

# 创建逻辑卷
sudo lvcreate -L 10G -n lv_data vg_data
sudo lvcreate -l 100%FREE -n lv_backup vg_data

# 查看逻辑卷
sudo lvdisplay
sudo lvs

# 创建文件系统
sudo mkfs.ext4 /dev/vg_data/lv_data

# 挂载逻辑卷
sudo mkdir /mnt/data
sudo mount /dev/vg_data/lv_data /mnt/data
```

### 6.3 LVM高级操作

```bash
# 扩展逻辑卷
sudo lvextend -L +5G /dev/vg_data/lv_data
sudo lvextend -l +100%FREE /dev/vg_data/lv_data

# 在线调整文件系统大小
sudo resize2fs /dev/vg_data/lv_data  # ext4
sudo xfs_growfs /mnt/data           # XFS

# 缩减逻辑卷（需要先卸载并缩减文件系统）
sudo umount /mnt/data
sudo resize2fs /dev/vg_data/lv_data 8G
sudo lvreduce -L 8G /dev/vg_data/lv_data
sudo mount /dev/vg_data/lv_data /mnt/data

# 创建快照
sudo lvcreate -L 1G -s -n lv_data_snap /dev/vg_data/lv_data

# 恢复快照
sudo umount /mnt/data
sudo lvconvert --merge /dev/vg_data/lv_data_snap
sudo mount /dev/vg_data/lv_data /mnt/data

# 删除逻辑卷
sudo lvremove /dev/vg_data/lv_data

# 从卷组中移除物理卷
sudo vgreduce vg_data /dev/sdb1

# 删除卷组
sudo vgremove vg_data

# 删除物理卷
sudo pvremove /dev/sdb1
```

## 7 磁盘配额

### 7.1 配置磁盘配额

```bash
# 安装配额工具
sudo apt install quota  # Debian/Ubuntu
sudo yum install quota  # CentOS/RHEL

# 修改/etc/fstab启用配额
UUID=uuid-string /mnt/data ext4 defaults,usrquota,grpquota 0 2

# 重新挂载文件系统
sudo umount /mnt/data
sudo mount /mnt/data

# 检查文件系统并创建配额文件
sudo quotacheck -cug /mnt/data

# 启用配额
sudo quotaon /mnt/data

# 为用户设置配额
sudo edquota -u username
```

### 7.2 管理磁盘配额

```bash
# 查看用户配额
sudo quota -u username

# 查看组配额
sudo quota -g groupname

# 查看所有用户配额
sudo repquota -a

# 设置用户配额
sudo setquota -u username 100M 200M 0 0 /mnt/data

# 设置组配额
sudo setquota -g groupname 500M 1G 0 0 /mnt/data

# 复制配额设置
sudo edquota -p source_user target_user

# 关闭配额
sudo quotaoff /mnt/data

# 检查配额一致性
sudo quotacheck -vug /mnt/data
```

## 8 RAID配置

### 8.1 RAID级别

常见RAID级别：

1. **RAID 0**：条带化，提高性能，无冗余
2. **RAID 1**：镜像，提供冗余，需要2个磁盘
3. **RAID 5**：带分布式奇偶校验的条带化，需要至少3个磁盘
4. **RAID 6**：带双分布式奇偶校验的条带化，需要至少4个磁盘
5. **RAID 10**：镜像和条带化的组合，需要至少4个磁盘

### 8.2 软件RAID配置

```bash
# 安装mdadm工具
sudo apt install mdadm  # Debian/Ubuntu
sudo yum install mdadm  # CentOS/RHEL

# 创建RAID 0
sudo mdadm --create /dev/md0 --level=0 --raid-devices=2 /dev/sdb1 /dev/sdc1

# 创建RAID 1
sudo mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1

# 创建RAID 5
sudo mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sdb1 /dev/sdc1 /dev/sdd1

# 查看RAID状态
cat /proc/mdstat
sudo mdadm --detail /dev/md0

# 创建文件系统
sudo mkfs.ext4 /dev/md0

# 挂载RAID设备
sudo mkdir /mnt/raid
sudo mount /dev/md0 /mnt/raid

# 保存RAID配置
sudo mdadm --detail --scan >> /etc/mdadm/mdadm.conf

# 停止RAID设备
sudo mdadm --stop /dev/md0

# 启动RAID设备
sudo mdadm --assemble /dev/md0 /dev/sdb1 /dev/sdc1

# 添加热备盘
sudo mdadm --add /dev/md0 /dev/sde1

# 模拟磁盘故障
sudo mdadm --fail /dev/md0 /dev/sdb1

# 移除故障磁盘
sudo mdadm --remove /dev/md0 /dev/sdb1

# 替换故障磁盘
sudo mdadm --add /dev/md0 /dev/sdf1
```

## 9 磁盘备份与恢复

### 9.1 磁盘备份工具

```bash
# 使用dd备份整个磁盘
sudo dd if=/dev/sda of=/backup/sda.img bs=4M

# 使用dd备份分区
sudo dd if=/dev/sda1 of=/backup/sda1.img bs=4M

# 压缩备份
sudo dd if=/dev/sda1 bs=4M | gzip > /backup/sda1.img.gz

# 恢复备份
sudo dd if=/backup/sda1.img of=/dev/sda1 bs=4M

# 恢复压缩备份
gunzip -c /backup/sda1.img.gz | sudo dd of=/dev/sda1 bs=4M

# 使用partimage备份分区
sudo partimage backup /dev/sda1 /backup/sda1.partimg

# 使用partimage恢复分区
sudo partimage restore /dev/sda1 /backup/sda1.partimg

# 使用Clonezilla备份
sudo clonezilla
```

### 9.2 文件系统备份

```bash
# 使用tar备份文件系统
sudo tar -czvf /backup/data.tar.gz /mnt/data

# 排除特定目录
sudo tar -czvf /backup/data.tar.gz --exclude=/mnt/data/temp /mnt/data

# 恢复tar备份
sudo tar -xzvf /backup/data.tar.gz -C /

# 使用rsync备份文件系统
sudo rsync -av --delete /mnt/data/ /backup/data/

# 使用rsync进行增量备份
sudo rsync -av --delete --link-dest=/backup/data/prev /mnt/data/ /backup/data/current/

# 使用dump备份ext文件系统
sudo dump -0u -f /backup/data.dump /dev/sda1

# 使用restore恢复ext文件系统
sudo restore -rf /backup/data.dump
```

## 10 实践练习

### 10.1 基础练习

1. 磁盘分区：
   - 使用fdisk创建主分区和扩展分区
   - 使用parted创建GPT分区
   - 格式化分区并创建文件系统

2. 文件系统管理：
   - 创建ext4、XFS文件系统
   - 挂载和卸载文件系统
   - 配置/etc/fstab实现自动挂载

3. 磁盘空间管理：
   - 查看磁盘使用情况
   - 查找大文件和目录
   - 清理磁盘空间

### 10.2 进阶练习

1. LVM管理：
   - 创建物理卷、卷组和逻辑卷
   - 扩展和缩减逻辑卷
   - 创建和使用快照

2. RAID配置：
   - 创建软件RAID 0、RAID 1、RAID 5
   - 模拟磁盘故障并恢复
   - 监控RAID状态

3. 备份与恢复：
   - 使用dd备份整个磁盘
   - 使用tar备份文件系统
   - 测试备份恢复过程

## 11 常见问题与解决方案

### 11.1 磁盘分区问题

1. **分区表损坏**
   - 问题：无法访问磁盘分区
   - 解决：使用testdisk工具修复分区表

2. **分区大小调整失败**
   - 问题：调整分区大小后无法访问数据
   - 解决：使用fsck检查文件系统，或恢复备份

3. **GPT/MBR转换问题**
   - 问题：转换分区表后数据丢失
   - 解决：使用gdisk转换前备份重要数据

### 11.2 文件系统问题

1. **文件系统损坏**
   - 问题：文件系统无法挂载
   - 解决：使用fsck检查和修复文件系统

2. **磁盘空间不足**
   - 问题：磁盘空间已满，无法写入数据
   - 解决：清理不必要的文件，或扩展磁盘空间

3. **inode耗尽**
   - 问题：磁盘空间充足但无法创建文件
   - 解决：删除小文件，或使用mkfs增加inode数量

### 11.3 LVM问题

1. **卷组空间不足**
   - 问题：无法扩展逻辑卷
   - 解决：添加新物理卷到卷组

2. **逻辑卷无法激活**
   - 问题：重启后逻辑卷无法自动激活
   - 解决：检查/etc/lvm/lvm.conf配置

3. **快照空间不足**
   - 问题：快照因空间不足而失效
   - 解决：增加快照大小或定期更新快照

## 12 本章小结

本章详细介绍了Linux磁盘与文件系统管理，包括：

1. 磁盘基础概念：磁盘设备命名、分区表类型和文件系统类型
2. 磁盘分区工具：fdisk、gdisk和parted的使用方法
3. 文件系统管理：创建、检查、修复和调整文件系统
4. 挂载与卸载：挂载选项、自动挂载配置和卸载方法
5. 磁盘空间管理：查看磁盘使用情况和清理磁盘空间
6. 逻辑卷管理（LVM）：物理卷、卷组和逻辑卷的管理
7. 磁盘配额：配置和管理用户磁盘使用限制
8. RAID配置：软件RAID的创建、管理和故障恢复
9. 磁盘备份与恢复：磁盘备份工具和文件系统备份方法

掌握磁盘与文件系统管理是Linux系统管理的基础，通过合理地管理磁盘和文件系统，可以确保数据的完整性、可用性和性能。磁盘管理技能对于系统管理员和数据管理员来说至关重要，是保障系统稳定运行和数据安全的关键。

下一章将介绍Linux网络配置与管理，包括网络接口配置、路由设置、防火墙配置、网络服务等内容，这是系统管理和网络运维的重要基础。