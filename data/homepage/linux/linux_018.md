# 第18章：Linux内核与驱动

## 1 Linux内核概述

### 1.1 内核的作用与架构

Linux内核是Linux操作系统的核心组件，它作为硬件和软件之间的桥梁，负责管理系统资源并提供基本服务。内核的主要职责包括：

1. **进程管理**：创建、调度和终止进程，实现多任务处理
2. **内存管理**：分配和回收内存，实现虚拟内存
3. **文件系统管理**：管理文件和目录结构，提供文件访问接口
4. **设备管理**：管理硬件设备，提供设备驱动程序接口
5. **网络管理**：实现网络协议栈，处理网络通信
6. **系统调用**：提供用户空间与内核空间交互的接口

Linux内核采用宏内核架构，但支持模块化设计，允许动态加载和卸载内核模块。这种设计结合了宏内核的高性能和微内核的灵活性。

### 1.2 内核版本与发布周期

Linux内核版本号格式为：主版本号.次版本号.修订号-发行版本

- **主版本号**：重大架构变更，不常见
- **次版本号**：偶数为稳定版，奇数为开发版
- **修订号**：错误修复和小功能更新
- **发行版本**：发行版特定的补丁和修改

例如：5.15.0-56-generic
- 5：主版本号
- 15：次版本号（稳定版）
- 0：修订号
- 56：发行版本号
- generic：发行版本标识

Linux内核采用滚动发布模式，主要版本大约每2-3个月发布一次，长期支持（LTS）版本提供5年以上的维护支持。

### 1.3 内核源码结构

Linux内核源码组织结构如下：

```
linux/
├── arch/          # 特定体系结构的代码（x86, ARM等）
├── block/         # 块设备驱动程序
├── crypto/        # 加密算法
├── drivers/       # 设备驱动程序
├── fs/            # 文件系统代码
├── include/       # 头文件
├── init/          # 内核初始化代码
├── ipc/           # 进程间通信
├── kernel/        # 核心内核代码
├── lib/           # 库函数
├── mm/            # 内存管理
├── net/           # 网络协议栈
├── samples/       # 示例代码
├── scripts/       # 构建脚本
├── security/      # 安全框架
├── sound/         # 声音子系统
├── tools/         # 工具程序
└── usr/           # 用户空间程序
```

## 2 内核配置与编译

### 2.1 获取内核源码

```bash
# 从kernel.org下载最新内核源码
wget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.15.0.tar.xz

# 解压源码
tar -xf linux-5.15.0.tar.xz
cd linux-5.15.0

# 或者使用git克隆内核仓库
git clone https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux-stable.git
cd linux-stable
git checkout linux-5.15.y
```

### 2.2 内核配置工具

Linux内核提供多种配置工具：

1. **make menuconfig**：基于ncurses的文本菜单界面
2. **make xconfig**：基于Qt的图形界面
3. **make gconfig**：基于GTK的图形界面
4. **make oldconfig**：基于现有配置文件更新配置
5. **make defconfig**：使用默认配置
6. **make localmodconfig**：基于当前加载的模块配置

```bash
# 安装必要的依赖（Ubuntu/Debian）
sudo apt update
sudo apt install build-essential libncurses-dev bison flex libssl-dev libelf-dev

# 使用menuconfig配置内核
make menuconfig

# 使用当前系统配置作为基础
cp /boot/config-$(uname -r) .config
make oldconfig

# 使用默认配置
make defconfig
```

### 2.3 内核编译与安装

```bash
# 清理之前的构建
make clean

# 编译内核（-j参数指定并行编译数，通常为CPU核心数+1）
make -j$(nproc)

# 安装模块
sudo make modules_install

# 安装内核
sudo make install

# 更新引导加载程序
sudo update-grub

# 重启系统
sudo reboot
```

### 2.4 内核配置选项

内核配置选项分为几大类：

1. **处理器类型和特性**：CPU类型、SMP支持、内核抢占等
2. **内存管理**：内存模型、交换分区、内存热插拔等
3. **可执行文件格式**：ELF、脚本支持等
4. **网络支持**：TCP/IP协议栈、网络设备驱动等
5. **设备驱动**：各种硬件设备驱动程序
6. **文件系统**：ext4、XFS、NFS等文件系统支持
7. **安全选项**：SELinux、AppArmor、安全模块等

常用配置选项：

```
# 启用内核模块支持
CONFIG_MODULES=y

# 启用可加载模块支持
CONFIG_MODULE_UNLOAD=y

# 启用内核抢占
CONFIG_PREEMPT=y

# 启用内核调试信息
CONFIG_DEBUG_KERNEL=y

# 启用系统调用跟踪
CONFIG_FTRACE_SYSCALLS=y

# 启用内核性能分析
CONFIG_PERF_EVENTS=y
```

## 3 内核模块管理

### 3.1 内核模块概述

内核模块是可以在运行时动态加载和卸载的代码片段，允许在不重新编译整个内核的情况下扩展内核功能。内核模块通常用于：

- 设备驱动程序
- 文件系统
- 网络协议
- 系统调用
- 内核调试工具

### 3.2 模块管理命令

```bash
# 列出已加载的模块
lsmod

# 查看模块信息
modinfo module_name

# 加载模块
sudo insmod module_name.ko

# 加载模块并解决依赖关系
sudo modprobe module_name

# 卸载模块
sudo rmmod module_name

# 查看模块依赖关系
modprobe --show-depends module_name

# 列出所有可用模块
find /lib/modules/$(uname -r) -name "*.ko" | head -20
```

### 3.3 模块配置文件

模块配置文件位于`/etc/modprobe.d/`目录下：

```bash
# 创建模块配置文件
sudo vi /etc/modprobe.d/my-modules.conf

# 添加配置选项
# 禁用模块
blacklist module_name

# 设置模块参数
options module_name parameter=value

# 设置模块别名
alias alias_name module_name

# 安装时执行命令
install module_name /bin/false
```

### 3.4 模块自动加载

模块可以通过多种方式自动加载：

1. **设备检测**：当系统检测到新设备时，udev会加载相应的驱动模块
2. **文件系统挂载**：当挂载特定文件系统时，内核会加载相应的文件系统模块
3. **模块依赖**：加载一个模块时，会自动加载其依赖的模块
4. **配置文件**：在`/etc/modules-load.d/`目录下配置需要自动加载的模块

```bash
# 配置模块自动加载
sudo vi /etc/modules-load.d/my-modules.conf

# 添加需要自动加载的模块
module_name1
module_name2
```

## 4 设备驱动基础

### 4.1 设备文件与设备号

在Linux中，设备通过设备文件表示，位于`/dev`目录下。设备文件分为两类：

1. **字符设备**：以字节流方式访问，如键盘、串口等
2. **块设备**：以数据块方式访问，如硬盘、U盘等

每个设备文件都有一个主设备号和次设备号：
- **主设备号**：标识驱动程序
- **次设备号**：标识同一驱动程序管理的不同设备

```bash
# 查看设备文件信息
ls -l /dev/sda
brw-rw---- 1 root disk 8, 0 Jan 1 10:00 /dev/sda
# 8是主设备号，0是次设备号

# 查看字符设备
ls -l /dev/tty
crw-rw-rw- 1 root tty 5, 0 Jan 1 10:00 /dev/tty
# 5是主设备号，0是次设备号

# 查看设备号分配
cat /proc/devices
```

### 4.2 设备驱动程序架构

Linux设备驱动程序采用分层架构：

1. **用户空间接口**：提供标准文件操作接口（open, read, write, ioctl等）
2. **虚拟文件系统（VFS）层**：提供统一的文件系统接口
3. **设备驱动层**：实现特定设备的驱动逻辑
4. **硬件抽象层**：与硬件直接交互

驱动程序主要实现以下操作：

```c
// 文件操作结构体
struct file_operations {
    ssize_t (*read) (struct file *, char __user *, size_t, loff_t *);
    ssize_t (*write) (struct file *, const char __user *, size_t, loff_t *);
    int (*open) (struct inode *, struct file *);
    int (*release) (struct inode *, struct file *);
    long (*unlocked_ioctl) (struct file *, unsigned int, unsigned long);
    // ...
};

// 字符设备结构体
struct cdev {
    struct kobject kobj;
    struct module *owner;
    const struct file_operations *ops;
    struct list_head list;
    dev_t dev;
    unsigned int count;
};
```

### 4.3 设备驱动程序开发流程

1. **定义设备号**：静态分配或动态申请设备号
2. **初始化字符设备**：分配cdev结构，初始化file_operations
3. **注册设备**：向内核注册字符设备
4. **创建设备文件**：通过udev或mknod创建设备文件
5. **实现设备操作**：实现open, read, write等操作
6. **清理资源**：在模块卸载时释放资源

## 5 字符设备驱动

### 5.1 字符设备驱动示例

以下是一个简单的字符设备驱动程序示例：

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/device.h>
#include <linux/uaccess.h>

#define DEVICE_NAME "char_dev"
#define BUFFER_SIZE 1024

static int major_number;
static char device_buffer[BUFFER_SIZE] = {0};
static int device_open_count = 0;

// 设备打开操作
static int device_open(struct inode *inode, struct file *file) {
    device_open_count++;
    printk(KERN_INFO "Char device opened %d times\n", device_open_count);
    return 0;
}

// 设备关闭操作
static int device_release(struct inode *inode, struct file *file) {
    printk(KERN_INFO "Char device closed\n");
    return 0;
}

// 设备读取操作
static ssize_t device_read(struct file *file, char __user *user_buffer, size_t count, loff_t *pos) {
    int bytes_to_read;
    int bytes_read = 0;
    
    if (*pos >= BUFFER_SIZE)
        return 0; // 已到达文件末尾
    
    bytes_to_read = min(count, (size_t)(BUFFER_SIZE - *pos));
    
    if (copy_to_user(user_buffer, device_buffer + *pos, bytes_to_read) != 0)
        return -EFAULT; // 数据传输失败
    
    *pos += bytes_to_read;
    bytes_read = bytes_to_read;
    
    printk(KERN_INFO "Read %d bytes from device\n", bytes_read);
    return bytes_read;
}

// 设备写入操作
static ssize_t device_write(struct file *file, const char __user *user_buffer, size_t count, loff_t *pos) {
    int bytes_to_write;
    int bytes_written = 0;
    
    if (*pos >= BUFFER_SIZE)
        return -ENOSPC; // 设备缓冲区已满
    
    bytes_to_write = min(count, (size_t)(BUFFER_SIZE - *pos));
    
    if (copy_from_user(device_buffer + *pos, user_buffer, bytes_to_write) != 0)
        return -EFAULT; // 数据传输失败
    
    *pos += bytes_to_write;
    bytes_written = bytes_to_write;
    
    printk(KERN_INFO "Wrote %d bytes to device\n", bytes_written);
    return bytes_written;
}

// 文件操作结构体
static struct file_operations fops = {
    .owner = THIS_MODULE,
    .open = device_open,
    .release = device_release,
    .read = device_read,
    .write = device_write,
};

// 模块初始化
static int __init char_driver_init(void) {
    printk(KERN_INFO "Initializing character device driver\n");
    
    // 动态申请主设备号
    major_number = register_chrdev(0, DEVICE_NAME, &fops);
    if (major_number < 0) {
        printk(KERN_ERR "Failed to register character device\n");
        return major_number;
    }
    
    printk(KERN_INFO "Character device registered with major number %d\n", major_number);
    return 0;
}

// 模块退出
static void __exit char_driver_exit(void) {
    unregister_chrdev(major_number, DEVICE_NAME);
    printk(KERN_INFO "Character device unregistered\n");
}

module_init(char_driver_init);
module_exit(char_driver_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("A simple character device driver");
MODULE_VERSION("1.0");
```

### 5.2 字符设备驱动编译

创建Makefile文件：

```makefile
obj-m += char_driver.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

install:
	sudo insmod char_driver.ko

uninstall:
	sudo rmmod char_driver
```

编译和加载驱动：

```bash
# 编译驱动
make

# 加载驱动
sudo insmod char_driver.ko

# 查看设备号
cat /proc/devices | grep char_dev

# 创建设备文件
sudo mknod /dev/char_dev c <major_number> 0

# 设置权限
sudo chmod 666 /dev/char_dev

# 测试设备
echo "Hello, device!" > /dev/char_dev
cat /dev/char_dev

# 卸载驱动
sudo rmmod char_driver
```

## 6 块设备驱动

### 6.1 块设备驱动概述

块设备驱动程序用于管理块设备，如硬盘、SSD、U盘等。块设备以固定大小的数据块为单位进行I/O操作，支持随机访问。

块设备驱动程序主要特点：
- 支持缓冲和缓存
- 支持请求队列和调度
- 支持分区管理
- 支持I/O调度算法

### 6.2 块设备驱动示例

以下是一个简单的块设备驱动程序示例：

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/blkdev.h>
#include <linux/hdreg.h>
#include <linux/genhd.h>

#define DEVICE_NAME "blk_dev"
#define SECTOR_SIZE 512
#define NR_SECTORS 1024  // 设备大小（扇区数）

static int major_number = 0;
static struct gendisk *gd;
static struct request_queue *queue;
static spinlock_t lock;
static int device_size;

// 模拟设备存储空间
static unsigned char *device_data;

// 处理I/O请求
static void blk_request(struct request_queue *q) {
    struct request *req;
    
    while ((req = blk_fetch_request(q)) != NULL) {
        // 检查请求是否有效
        if (blk_rq_pos(req) + blk_rq_cur_sectors(req) > get_capacity(gd)) {
            __blk_end_request_all(req, -EIO);
            continue;
        }
        
        // 处理请求
        if (rq_data_dir(req) == READ) {
            // 读操作
            memcpy(bio_data(req->bio), 
                   device_data + blk_rq_pos(req) * SECTOR_SIZE,
                   blk_rq_cur_bytes(req));
        } else {
            // 写操作
            memcpy(device_data + blk_rq_pos(req) * SECTOR_SIZE,
                   bio_data(req->bio),
                   blk_rq_cur_bytes(req));
        }
        
        __blk_end_request_all(req, 0);
    }
}

// 获取设备信息
static int blk_getgeo(struct block_device *bdev, struct hd_geometry *geo) {
    geo->heads = 2;
    geo->sectors = 16;
    geo->cylinders = get_capacity(bdev->bd_disk) / (geo->heads * geo->sectors);
    return 0;
}

// 块设备操作结构体
static struct block_device_operations blk_fops = {
    .owner = THIS_MODULE,
    .getgeo = blk_getgeo,
};

// 模块初始化
static int __init blk_driver_init(void) {
    // 分配设备存储空间
    device_data = vmalloc(device_size);
    if (!device_data) {
        printk(KERN_ERR "Failed to allocate device memory\n");
        return -ENOMEM;
    }
    memset(device_data, 0, device_size);
    
    // 初始化自旋锁
    spin_lock_init(&lock);
    
    // 注册块设备
    major_number = register_blkdev(major_number, DEVICE_NAME);
    if (major_number <= 0) {
        printk(KERN_ERR "Failed to register block device\n");
        vfree(device_data);
        return major_number;
    }
    
    // 初始化请求队列
    queue = blk_init_queue(blk_request, &lock);
    if (!queue) {
        printk(KERN_ERR "Failed to initialize request queue\n");
        unregister_blkdev(major_number, DEVICE_NAME);
        vfree(device_data);
        return -ENOMEM;
    }
    
    // 设置队列逻辑块大小
    blk_queue_logical_block_size(queue, SECTOR_SIZE);
    
    // 分配gendisk结构
    gd = alloc_disk(16);
    if (!gd) {
        printk(KERN_ERR "Failed to allocate disk structure\n");
        blk_cleanup_queue(queue);
        unregister_blkdev(major_number, DEVICE_NAME);
        vfree(device_data);
        return -ENOMEM;
    }
    
    // 设置gendisk属性
    gd->major = major_number;
    gd->first_minor = 0;
    gd->fops = &blk_fops;
    gd->queue = queue;
    gd->private_data = device_data;
    snprintf(gd->disk_name, 32, "%s", DEVICE_NAME);
    set_capacity(gd, NR_SECTORS);
    
    // 添加磁盘
    add_disk(gd);
    
    printk(KERN_INFO "Block device driver initialized\n");
    return 0;
}

// 模块退出
static void __exit blk_driver_exit(void) {
    del_gendisk(gd);
    put_disk(gd);
    blk_cleanup_queue(queue);
    unregister_blkdev(major_number, DEVICE_NAME);
    vfree(device_data);
    printk(KERN_INFO "Block device driver exited\n");
}

module_init(blk_driver_init);
module_exit(blk_driver_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("A simple block device driver");
MODULE_VERSION("1.0");
```

### 6.3 块设备驱动编译与测试

创建Makefile文件：

```makefile
obj-m += blk_driver.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

install:
	sudo insmod blk_driver.ko

uninstall:
	sudo rmmod blk_driver
```

编译和加载驱动：

```bash
# 编译驱动
make

# 加载驱动
sudo insmod blk_driver.ko

# 查看设备
ls -l /dev/blk_dev*

# 格式化设备
sudo mkfs.ext4 /dev/blk_dev

# 挂载设备
sudo mkdir /mnt/blk_dev
sudo mount /dev/blk_dev /mnt/blk_dev

# 测试设备
sudo cp /etc/hostname /mnt/blk_dev/
ls /mnt/blk_dev/
cat /mnt/blk_dev/hostname

# 卸载设备
sudo umount /mnt/blk_dev
sudo rmmod blk_driver
```

## 7 网络设备驱动

### 7.1 网络设备驱动概述

网络设备驱动程序用于管理网络接口卡（NIC），实现数据包的发送和接收。网络设备驱动程序主要特点：

- 不使用设备文件，而是通过套接字接口访问
- 支持中断和轮询模式
- 实现数据包的发送和接收
- 支持网络配置和统计信息

### 7.2 网络设备驱动示例

以下是一个简单的虚拟网络设备驱动程序示例：

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/netdevice.h>
#include <linux/etherdevice.h>
#include <linux/skbuff.h>
#include <linux/if_ether.h>

#define DEVICE_NAME "vnet_dev"

static struct net_device *net_dev;

// 数据包发送函数
static int vnet_xmit(struct sk_buff *skb, struct net_device *dev) {
    // 打印发送的数据包信息
    printk(KERN_INFO "Sending packet: %d bytes\n", skb->len);
    
    // 释放数据包
    dev_kfree_skb(skb);
    
    // 更新统计信息
    dev->stats.tx_packets++;
    dev->stats.tx_bytes += skb->len;
    
    return NETDEV_TX_OK;
}

// 打开网络设备
static int vnet_open(struct net_device *dev) {
    printk(KERN_INFO "Opening network device\n");
    
    // 分配接收数据包的缓冲区
    netif_start_queue(dev);
    
    return 0;
}

// 关闭网络设备
static int vnet_stop(struct net_device *dev) {
    printk(KERN_INFO "Stopping network device\n");
    
    // 停止接收数据包
    netif_stop_queue(dev);
    
    return 0;
}

// 获取网络设备统计信息
static struct net_device_stats *vnet_get_stats(struct net_device *dev) {
    return &dev->stats;
}

// 网络设备操作结构体
static const struct net_device_ops vnet_ops = {
    .ndo_open = vnet_open,
    .ndo_stop = vnet_stop,
    .ndo_start_xmit = vnet_xmit,
    .ndo_get_stats = vnet_get_stats,
};

// 模块初始化
static int __init vnet_driver_init(void) {
    int err;
    
    // 分配网络设备结构
    net_dev = alloc_etherdev(sizeof(struct net_device));
    if (!net_dev) {
        printk(KERN_ERR "Failed to allocate network device\n");
        return -ENOMEM;
    }
    
    // 设置设备名称
    strcpy(net_dev->name, DEVICE_NAME);
    
    // 设置网络设备操作
    net_dev->netdev_ops = &vnet_ops;
    
    // 设置MAC地址
    eth_hw_addr_random(net_dev);
    
    // 注册网络设备
    err = register_netdev(net_dev);
    if (err) {
        printk(KERN_ERR "Failed to register network device\n");
        free_netdev(net_dev);
        return err;
    }
    
    printk(KERN_INFO "Network device driver initialized\n");
    printk(KERN_INFO "Device name: %s\n", net_dev->name);
    printk(KERN_INFO "MAC address: %pM\n", net_dev->dev_addr);
    
    return 0;
}

// 模块退出
static void __exit vnet_driver_exit(void) {
    unregister_netdev(net_dev);
    free_netdev(net_dev);
    printk(KERN_INFO "Network device driver exited\n");
}

module_init(vnet_driver_init);
module_exit(vnet_driver_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("A simple virtual network device driver");
MODULE_VERSION("1.0");
```

### 7.3 网络设备驱动编译与测试

创建Makefile文件：

```makefile
obj-m += vnet_driver.o

all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules

clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean

install:
	sudo insmod vnet_driver.ko

uninstall:
	sudo rmmod vnet_driver
```

编译和加载驱动：

```bash
# 编译驱动
make

# 加载驱动
sudo insmod vnet_driver.ko

# 查看网络设备
ip addr show vnet_dev

# 配置网络设备
sudo ip addr add 192.168.100.1/24 dev vnet_dev
sudo ip link set vnet_dev up

# 测试网络设备
ping -c 3 192.168.100.1

# 卸载驱动
sudo rmmod vnet_driver
```

## 8 内核调试技术

### 8.1 内核调试方法

Linux内核提供了多种调试方法：

1. **printk**：内核中的printf，用于输出调试信息
2. **/proc文件系统**：通过/proc文件系统查看内核状态
3. **sysfs文件系统**：通过sysfs文件系统查看和修改内核参数
4. **debugfs文件系统**：专用于调试的文件系统
5. **ftrace**：函数跟踪工具
6. **perf**：性能分析工具
7. **KGDB**：内核调试器
8. **Kprobes**：动态插入探测点

### 8.2 printk调试

```c
#include <linux/module.h>
#include <linux/kernel.h>

// 日志级别
#define KERN_EMERG   "0"    // 系统不可用
#define KERN_ALERT   "1"    // 必须立即采取行动
#define KERN_CRIT    "2"    // 严重情况
#define KERN_ERR     "3"    // 错误情况
#define KERN_WARNING "4"    // 警告情况
#define KERN_NOTICE  "5"    // 正常情况但重要
#define KERN_INFO    "6"    // 信息性消息
#define KERN_DEBUG   "7"    // 调试级别消息

static int __init debug_init(void) {
    printk(KERN_EMERG "Emergency message\n");
    printk(KERN_ALERT "Alert message\n");
    printk(KERN_CRIT "Critical message\n");
    printk(KERN_ERR "Error message\n");
    printk(KERN_WARNING "Warning message\n");
    printk(KERN_NOTICE "Notice message\n");
    printk(KERN_INFO "Info message\n");
    printk(KERN_DEBUG "Debug message\n");
    
    // 动态调试
    if (debug_enabled) {
        pr_debug("Debug enabled: %s\n", __func__);
    }
    
    return 0;
}

static void __exit debug_exit(void) {
    printk(KERN_INFO "Module unloaded\n");
}

module_init(debug_init);
module_exit(debug_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("Kernel debugging example");
MODULE_VERSION("1.0");
```

查看内核日志：

```bash
# 查看内核日志
dmesg

# 实时查看内核日志
sudo dmesg -w

# 清除内核日志
sudo dmesg -c

# 设置控制台日志级别
echo 8 > /proc/sys/kernel/printk

# 启用动态调试
echo 'file debug.c +p' > /sys/kernel/debug/dynamic_debug/control
```

### 8.3 /proc和sysfs调试

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/uaccess.h>

#define PROC_NAME "example_proc"
#define SYSFS_NAME "example_sysfs"

static struct proc_dir_entry *proc_entry;
static struct kobject *kobj;

// proc读取函数
static int proc_show(struct seq_file *m, void *v) {
    seq_printf(m, "This is a proc file example\n");
    seq_printf(m, "Module parameter: %d\n", module_param);
    return 0;
}

static int proc_open(struct inode *inode, struct file *file) {
    return single_open(file, proc_show, NULL);
}

static const struct proc_ops proc_ops = {
    .proc_open = proc_open,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_release = single_release,
};

// sysfs属性
static ssize_t sysfs_show(struct kobject *kobj, struct kobj_attribute *attr, char *buf) {
    return sprintf(buf, "%d\n", module_param);
}

static ssize_t sysfs_store(struct kobject *kobj, struct kobj_attribute *attr, const char *buf, size_t count) {
    int val;
    if (sscanf(buf, "%d", &val) == 1) {
        module_param = val;
        return count;
    }
    return -EINVAL;
}

static struct kobj_attribute sysfs_attr = __ATTR(module_param, 0664, sysfs_show, sysfs_store);

static int __init debugfs_init(void) {
    // 创建proc文件
    proc_entry = proc_create(PROC_NAME, 0644, NULL, &proc_ops);
    if (!proc_entry) {
        printk(KERN_ERR "Failed to create proc entry\n");
        return -ENOMEM;
    }
    
    // 创建sysfs文件
    kobj = kobject_create_and_add("example", kernel_kobj);
    if (!kobj) {
        printk(KERN_ERR "Failed to create kobject\n");
        proc_remove(proc_entry);
        return -ENOMEM;
    }
    
    if (sysfs_create_file(kobj, &sysfs_attr.attr)) {
        printk(KERN_ERR "Failed to create sysfs file\n");
        kobject_put(kobj);
        proc_remove(proc_entry);
        return -ENOMEM;
    }
    
    printk(KERN_INFO "Debugfs module initialized\n");
    return 0;
}

static void __exit debugfs_exit(void) {
    sysfs_remove_file(kobj, &sysfs_attr.attr);
    kobject_put(kobj);
    proc_remove(proc_entry);
    printk(KERN_INFO "Debugfs module exited\n");
}

module_init(debugfs_init);
module_exit(debugfs_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("Proc and sysfs debugging example");
MODULE_VERSION("1.0");
```

查看和调试：

```bash
# 查看proc文件
cat /proc/example_proc

# 查看sysfs文件
cat /sys/kernel/example/module_param

# 修改sysfs文件
echo 100 > /sys/kernel/example/module_param
cat /sys/kernel/example/module_param
```

### 8.4 ftrace调试

ftrace是Linux内核内置的跟踪工具，可以跟踪函数调用、调度事件、中断等。

```bash
# 挂载debugfs
sudo mount -t debugfs none /sys/kernel/debug

# 查看可用跟踪器
sudo cat /sys/kernel/debug/tracing/available_tracers

# 启用函数跟踪
echo function > /sys/kernel/debug/tracing/current_tracer

# 查看跟踪输出
sudo cat /sys/kernel/debug/tracing/trace

# 过滤特定函数
echo "do_fork" > /sys/kernel/debug/tracing/set_ftrace_filter

# 启用函数图跟踪
echo function_graph > /sys/kernel/debug/tracing/current_tracer

# 查看函数图跟踪输出
sudo cat /sys/kernel/debug/tracing/trace

# 停止跟踪
echo nop > /sys/kernel/debug/tracing/current_tracer
```

### 8.5 性能分析工具

perf是Linux内核提供的性能分析工具：

```bash
# 安装perf
sudo apt install linux-tools-common linux-tools-generic linux-tools-$(uname -r)

# 列出可用事件
perf list

# 记录CPU周期
perf record -a

# 查看记录的数据
perf report

# 实时查看性能数据
perf top

# 统计特定事件
perf stat -e cycles,instructions,cache-misses ls

# 分析特定进程
perf record -p $(pidof process_name)
perf report
```

## 9 实践练习

### 练习1：编写简单的字符设备驱动

编写一个简单的字符设备驱动，实现以下功能：
- 支持基本的读写操作
- 实现ioctl接口控制设备
- 支持多个设备实例

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/fs.h>
#include <linux/cdev.h>
#include <linux/device.h>
#include <linux/uaccess.h>
#include <linux/ioctl.h>

#define DEVICE_NAME "multi_char_dev"
#define CLASS_NAME "multi_char"
#define MAX_DEVICES 4
#define BUFFER_SIZE 1024

#define IOCTL_MAGIC 'M'
#define IOCTL_RESET _IO(IOCTL_MAGIC, 0)
#define IOCTL_GET_SIZE _IOR(IOCTL_MAGIC, 1, int)
#define IOCTL_SET_SIZE _IOW(IOCTL_MAGIC, 2, int)

struct multi_char_dev {
    struct cdev cdev;
    struct device *device;
    char buffer[BUFFER_SIZE];
    int size;
    struct mutex lock;
};

static dev_t dev_num;
static struct class *char_class;
static struct multi_char_dev devices[MAX_DEVICES];
static int device_count = 0;

static int multi_char_open(struct inode *inode, struct file *file) {
    struct multi_char_dev *dev;
    
    dev = container_of(inode->i_cdev, struct multi_char_dev, cdev);
    file->private_data = dev;
    
    printk(KERN_INFO "Multi char device opened\n");
    return 0;
}

static int multi_char_release(struct inode *inode, struct file *file) {
    printk(KERN_INFO "Multi char device closed\n");
    return 0;
}

static ssize_t multi_char_read(struct file *file, char __user *user_buffer, size_t count, loff_t *pos) {
    struct multi_char_dev *dev = file->private_data;
    int bytes_to_read;
    int bytes_read = 0;
    
    mutex_lock(&dev->lock);
    
    if (*pos >= dev->size) {
        mutex_unlock(&dev->lock);
        return 0; // EOF
    }
    
    bytes_to_read = min(count, (size_t)(dev->size - *pos));
    
    if (copy_to_user(user_buffer, dev->buffer + *pos, bytes_to_read) != 0) {
        mutex_unlock(&dev->lock);
        return -EFAULT;
    }
    
    *pos += bytes_to_read;
    bytes_read = bytes_to_read;
    
    mutex_unlock(&dev->lock);
    
    printk(KERN_INFO "Read %d bytes from multi char device\n", bytes_read);
    return bytes_read;
}

static ssize_t multi_char_write(struct file *file, const char __user *user_buffer, size_t count, loff_t *pos) {
    struct multi_char_dev *dev = file->private_data;
    int bytes_to_write;
    int bytes_written = 0;
    
    mutex_lock(&dev->lock);
    
    if (*pos >= BUFFER_SIZE) {
        mutex_unlock(&dev->lock);
        return -ENOSPC;
    }
    
    bytes_to_write = min(count, (size_t)(BUFFER_SIZE - *pos));
    
    if (copy_from_user(dev->buffer + *pos, user_buffer, bytes_to_write) != 0) {
        mutex_unlock(&dev->lock);
        return -EFAULT;
    }
    
    *pos += bytes_to_write;
    bytes_written = bytes_to_write;
    
    if (*pos > dev->size) {
        dev->size = *pos;
    }
    
    mutex_unlock(&dev->lock);
    
    printk(KERN_INFO "Wrote %d bytes to multi char device\n", bytes_written);
    return bytes_written;
}

static long multi_char_ioctl(struct file *file, unsigned int cmd, unsigned long arg) {
    struct multi_char_dev *dev = file->private_data;
    int retval = 0;
    
    mutex_lock(&dev->lock);
    
    switch (cmd) {
        case IOCTL_RESET:
            dev->size = 0;
            memset(dev->buffer, 0, BUFFER_SIZE);
            printk(KERN_INFO "Multi char device reset\n");
            break;
            
        case IOCTL_GET_SIZE:
            if (copy_to_user((int __user *)arg, &dev->size, sizeof(int)) != 0) {
                retval = -EFAULT;
            }
            break;
            
        case IOCTL_SET_SIZE:
            if (arg > BUFFER_SIZE) {
                retval = -EINVAL;
            } else {
                dev->size = arg;
                printk(KERN_INFO "Multi char device size set to %d\n", dev->size);
            }
            break;
            
        default:
            retval = -ENOTTY;
    }
    
    mutex_unlock(&dev->lock);
    return retval;
}

static const struct file_operations multi_char_fops = {
    .owner = THIS_MODULE,
    .open = multi_char_open,
    .release = multi_char_release,
    .read = multi_char_read,
    .write = multi_char_write,
    .unlocked_ioctl = multi_char_ioctl,
};

static int __init multi_char_init(void) {
    int i, ret;
    
    // 申请设备号
    if (alloc_chrdev_region(&dev_num, 0, MAX_DEVICES, DEVICE_NAME) < 0) {
        printk(KERN_ERR "Failed to allocate device numbers\n");
        return -ENOMEM;
    }
    
    // 创建设备类
    char_class = class_create(THIS_MODULE, CLASS_NAME);
    if (IS_ERR(char_class)) {
        unregister_chrdev_region(dev_num, MAX_DEVICES);
        printk(KERN_ERR "Failed to create device class\n");
        return PTR_ERR(char_class);
    }
    
    // 初始化设备
    for (i = 0; i < MAX_DEVICES; i++) {
        // 初始化互斥锁
        mutex_init(&devices[i].lock);
        
        // 初始化cdev
        cdev_init(&devices[i].cdev, &multi_char_fops);
        devices[i].cdev.owner = THIS_MODULE;
        
        // 添加cdev到系统
        ret = cdev_add(&devices[i].cdev, MKDEV(MAJOR(dev_num), MINOR(dev_num) + i), 1);
        if (ret < 0) {
            printk(KERN_ERR "Failed to add cdev %d\n", i);
            continue;
        }
        
        // 创建设备文件
        devices[i].device = device_create(char_class, NULL, MKDEV(MAJOR(dev_num), MINOR(dev_num) + i), NULL, "%s%d", DEVICE_NAME, i);
        if (IS_ERR(devices[i].device)) {
            cdev_del(&devices[i].cdev);
            printk(KERN_ERR "Failed to create device %d\n", i);
            continue;
        }
        
        device_count++;
        printk(KERN_INFO "Created multi char device %d\n", i);
    }
    
    if (device_count == 0) {
        class_destroy(char_class);
        unregister_chrdev_region(dev_num, MAX_DEVICES);
        return -ENOMEM;
    }
    
    printk(KERN_INFO "Multi char driver initialized with %d devices\n", device_count);
    return 0;
}

static void __exit multi_char_exit(void) {
    int i;
    
    for (i = 0; i < device_count; i++) {
        device_destroy(char_class, MKDEV(MAJOR(dev_num), MINOR(dev_num) + i));
        cdev_del(&devices[i].cdev);
    }
    
    class_destroy(char_class);
    unregister_chrdev_region(dev_num, MAX_DEVICES);
    
    printk(KERN_INFO "Multi char driver exited\n");
}

module_init(multi_char_init);
module_exit(multi_char_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("A multi-instance character device driver");
MODULE_VERSION("1.0");
```

### 练习2：编写简单的块设备驱动

编写一个简单的块设备驱动，实现以下功能：
- 支持基本的读写操作
- 实现可配置的设备大小
- 支持多个分区

```c
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/blkdev.h>
#include <linux/hdreg.h>
#include <linux/genhd.h>
#include <linux/blk-mq.h>

#define DEVICE_NAME "simple_blk"
#define SECTOR_SIZE 512
#define DEFAULT_SIZE (1024 * 1024)  // 1MB

static int major_number = 0;
static int device_size = DEFAULT_SIZE;
module_param(device_size, int, 0);
MODULE_PARM_DESC(device_size, "Device size in bytes");

struct simple_blk_dev {
    struct blk_mq_tag_set tag_set;
    struct gendisk *gd;
    struct request_queue *queue;
    spinlock_t lock;
    unsigned char *data;
    int size;
};

static struct simple_blk_dev *dev;

static blk_status_t simple_blk_queue_rq(struct blk_mq_hw_ctx *hctx,
                                       const struct blk_mq_queue_data *bd)
{
    struct request *req = bd->rq;
    struct simple_blk_dev *dev = req->q->queuedata;
    blk_status_t ret = BLK_STS_OK;
    
    blk_mq_start_request(req);
    
    spin_lock(&dev->lock);
    
    // 检查请求是否有效
    if (blk_rq_pos(req) + blk_rq_cur_sectors(req) > get_capacity(dev->gd)) {
        ret = BLK_STS_IOERR;
        goto out;
    }
    
    // 处理请求
    if (rq_data_dir(req) == READ) {
        // 读操作
        memcpy(bio_data(req->bio), 
               dev->data + blk_rq_pos(req) * SECTOR_SIZE,
               blk_rq_cur_bytes(req));
    } else {
        // 写操作
        memcpy(dev->data + blk_rq_pos(req) * SECTOR_SIZE,
               bio_data(req->bio),
               blk_rq_cur_bytes(req));
    }
    
out:
    spin_unlock(&dev->lock);
    blk_mq_end_request(req, ret);
    return BLK_STS_OK;
}

static const struct blk_mq_ops simple_blk_mq_ops = {
    .queue_rq = simple_blk_queue_rq,
};

static int simple_blk_getgeo(struct block_device *bdev, struct hd_geometry *geo)
{
    struct simple_blk_dev *dev = bdev->bd_disk->private_data;
    
    geo->heads = 2;
    geo->sectors = 16;
    geo->cylinders = get_capacity(dev->gd) / (geo->heads * geo->sectors);
    return 0;
}

static const struct block_device_operations simple_blk_fops = {
    .owner = THIS_MODULE,
    .getgeo = simple_blk_getgeo,
};

static int __init simple_blk_init(void)
{
    int ret;
    
    // 分配设备结构
    dev = kzalloc(sizeof(*dev), GFP_KERNEL);
    if (!dev) {
        return -ENOMEM;
    }
    
    // 分配设备存储空间
    dev->size = device_size;
    dev->data = vmalloc(dev->size);
    if (!dev->data) {
        kfree(dev);
        return -ENOMEM;
    }
    memset(dev->data, 0, dev->size);
    
    // 初始化自旋锁
    spin_lock_init(&dev->lock);
    
    // 注册块设备
    major_number = register_blkdev(major_number, DEVICE_NAME);
    if (major_number <= 0) {
        vfree(dev->data);
        kfree(dev);
        return major_number;
    }
    
    // 设置blk-mq标签集
    dev->tag_set.ops = &simple_blk_mq_ops;
    dev->tag_set.nr_hw_queues = 1;
    dev->tag_set.queue_depth = 128;
    dev->tag_set.numa_node = NUMA_NO_NODE;
    dev->tag_set.cmd_size = 0;
    dev->tag_set.flags = BLK_MQ_F_SHOULD_MERGE;
    dev->tag_set.driver_data = dev;
    
    ret = blk_mq_alloc_tag_set(&dev->tag_set);
    if (ret) {
        unregister_blkdev(major_number, DEVICE_NAME);
        vfree(dev->data);
        kfree(dev);
        return ret;
    }
    
    // 初始化请求队列
    dev->queue = blk_mq_init_queue(&dev->tag_set);
    if (IS_ERR(dev->queue)) {
        blk_mq_free_tag_set(&dev->tag_set);
        unregister_blkdev(major_number, DEVICE_NAME);
        vfree(dev->data);
        kfree(dev);
        return PTR_ERR(dev->queue);
    }
    
    // 设置队列逻辑块大小
    blk_queue_logical_block_size(dev->queue, SECTOR_SIZE);
    dev->queue->queuedata = dev;
    
    // 分配gendisk结构
    dev->gd = alloc_disk(16);
    if (!dev->gd) {
        blk_cleanup_queue(dev->queue);
        blk_mq_free_tag_set(&dev->tag_set);
        unregister_blkdev(major_number, DEVICE_NAME);
        vfree(dev->data);
        kfree(dev);
        return -ENOMEM;
    }
    
    // 设置gendisk属性
    dev->gd->major = major_number;
    dev->gd->first_minor = 0;
    dev->gd->fops = &simple_blk_fops;
    dev->gd->queue = dev->queue;
    dev->gd->private_data = dev;
    snprintf(dev->gd->disk_name, 32, "%s", DEVICE_NAME);
    set_capacity(dev->gd, dev->size / SECTOR_SIZE);
    
    // 添加磁盘
    add_disk(dev->gd);
    
    printk(KERN_INFO "Simple block device driver initialized\n");
    printk(KERN_INFO "Device size: %d bytes\n", dev->size);
    return 0;
}

static void __exit simple_blk_exit(void)
{
    if (dev->gd) {
        del_gendisk(dev->gd);
        put_disk(dev->gd);
    }
    
    if (dev->queue) {
        blk_cleanup_queue(dev->queue);
    }
    
    blk_mq_free_tag_set(&dev->tag_set);
    unregister_blkdev(major_number, DEVICE_NAME);
    
    if (dev->data) {
        vfree(dev->data);
    }
    
    kfree(dev);
    
    printk(KERN_INFO "Simple block device driver exited\n");
}

module_init(simple_blk_init);
module_exit(simple_blk_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Your Name");
MODULE_DESCRIPTION("A simple block device driver");
MODULE_VERSION("1.0");
```

## 10 总结

本章介绍了Linux内核与驱动开发的基础知识和实用技能，包括：

1. **Linux内核概述**
   - 内核的作用与架构
   - 内核版本与发布周期
   - 内核源码结构

2. **内核配置与编译**
   - 获取内核源码
   - 内核配置工具
   - 内核编译与安装

3. **内核模块管理**
   - 内核模块概述
   - 模块管理命令
   - 模块配置文件
   - 模块自动加载

4. **设备驱动基础**
   - 设备文件与设备号
   - 设备驱动程序架构
   - 设备驱动程序开发流程

5. **字符设备驱动**
   - 字符设备驱动示例
   - 字符设备驱动编译与测试

6. **块设备驱动**
   - 块设备驱动概述
   - 块设备驱动示例
   - 块设备驱动编译与测试

7. **网络设备驱动**
   - 网络设备驱动概述
   - 网络设备驱动示例
   - 网络设备驱动编译与测试

8. **内核调试技术**
   - 内核调试方法
   - printk调试
   - /proc和sysfs调试
   - ftrace调试
   - 性能分析

9. **实践练习**
   - 编写简单的字符设备驱动
   - 编写简单的块设备驱动

通过本章的学习，读者应该能够：
- 理解Linux内核的架构和功能
- 配置和编译Linux内核
- 管理内核模块
- 开发基本的设备驱动程序
- 使用内核调试技术进行问题诊断

Linux内核与驱动开发是Linux系统高级管理的重要组成部分，掌握这些技术可以帮助系统管理员更好地理解系统工作原理，解决硬件兼容性问题，并开发定制化的驱动程序。对于有志于成为Linux内核开发者的读者来说，本章提供了一个良好的起点。