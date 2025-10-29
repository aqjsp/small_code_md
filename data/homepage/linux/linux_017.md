# 第17章：虚拟化与容器

## 1 虚拟化技术概述

### 1.1 什么是虚拟化

虚拟化是一种资源管理技术，它将计算机的各种实体资源（如CPU、内存、存储、网络等）予以抽象、转换后呈现出来，打破实体结构间的不可切割的障碍，使用户可以用比原本的组态更好的方式来应用这些资源。

虚拟化的主要优势：
- **资源利用率提高**：通过整合多个工作负载到单一物理服务器，提高硬件利用率
- **降低成本**：减少服务器数量，降低硬件、电力和冷却成本
- **灵活性增强**：快速创建、部署和迁移虚拟机
- **高可用性**：实现虚拟机的实时迁移和故障转移
- **隔离性**：提供安全隔离的运行环境

### 1.2 虚拟化类型

1. **硬件虚拟化（完全虚拟化）**
   - 模拟完整的硬件环境
   - 客户操作系统无需修改
   - 性能开销较大
   - 典型代表：VMware Workstation, VirtualBox, KVM

2. **半虚拟化（Para-virtualization）**
   - 修改客户操作系统以适应虚拟环境
   - 性能优于完全虚拟化
   - 需要客户操作系统支持
   - 典型代表：Xen

3. **操作系统级虚拟化（容器化）**
   - 在单一操作系统上创建多个隔离的用户空间实例
   - 轻量级，性能接近原生
   - 共享宿主操作系统内核
   - 典型代表：Docker, LXC, OpenVZ

### 1.3 虚拟化与容器的区别

| 特性 | 虚拟机 | 容器 |
|------|--------|------|
| 隔离级别 | 强隔离（硬件级） | 弱隔离（进程级） |
| 资源开销 | 大（包含完整操作系统） | 小（共享宿主内核） |
| 启动时间 | 分钟级 | 秒级 |
| 性能 | 接近物理机的80-90% | 接近物理机的95-99% |
| 密度 | 低（每台物理机几个到几十个） | 高（每台物理机几十到几百个） |
| 迁移性 | 跨平台迁移容易 | 需要相同内核架构 |

## 2 KVM虚拟化技术

### 2.1 KVM概述

KVM（Kernel-based Virtual Machine）是基于Linux内核的虚拟化解决方案，它将Linux内核转变为一个裸机虚拟机监控器（Hypervisor）。KVM具有以下特点：

- 完全集成到Linux内核中
- 支持硬件辅助虚拟化（Intel VT-x/AMD-V）
- 支持多种客户操作系统
- 高性能和稳定性
- 开源免费

### 2.2 检查KVM支持

在开始使用KVM之前，需要检查系统是否支持硬件虚拟化：

```bash
# 检查CPU是否支持硬件虚拟化
egrep -c '(vmx|svm)' /proc/cpuinfo

# 如果输出大于0，表示支持硬件虚拟化
# vmx表示Intel VT-x，svm表示AMD-V

# 检查KVM模块是否已加载
lsmod | grep kvm

# 检查KVM设备文件
ls -l /dev/kvm
```

### 2.3 安装KVM

在Ubuntu/Debian系统上安装KVM：

```bash
# 安装KVM和相关组件
sudo apt update
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils

# 安装虚拟机管理工具
sudo apt install virt-manager virtinst

# 将当前用户添加到libvirt和kvm组
sudo usermod -aG libvirt $USER
sudo usermod -aG kvm $USER

# 重新登录或重启以使组更改生效
```

在CentOS/RHEL系统上安装KVM：

```bash
# 安装KVM和相关组件
sudo yum install qemu-kvm libvirt libvirt-daemon-config-network

# 安装虚拟机管理工具
sudo yum install virt-manager virt-install

# 启动并启用libvirtd服务
sudo systemctl start libvirtd
sudo systemctl enable libvirtd

# 将当前用户添加到libvirt组
sudo usermod -aG libvirt $USER
```

### 2.4 网络配置

KVM默认提供NAT网络，但通常需要配置桥接网络以便虚拟机可以直接访问外部网络：

```bash
# 安装bridge-utils（如果尚未安装）
sudo apt install bridge-utils

# 查看当前网络接口
ip addr show

# 编辑网络配置文件（Ubuntu/Debian）
sudo vi /etc/netplan/01-netcfg.yaml

# 示例配置（将ens3替换为实际网络接口）：
network:
  version: 2
  renderer: networkd
  ethernets:
    ens3:
      dhcp4: no
  bridges:
    br0:
      interfaces: [ens3]
      dhcp4: yes
      parameters:
        stp: false
        forward-delay: 0

# 应用网络配置
sudo netplan apply

# 验证桥接网络
ip addr show br0
```

### 2.5 创建虚拟机

使用`virt-install`命令创建虚拟机：

```bash
# 创建虚拟机
sudo virt-install \
  --name ubuntu-vm \
  --ram 2048 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu-vm.qcow2,size=20 \
  --cdrom /path/to/ubuntu-20.04-desktop-amd64.iso \
  --network bridge=br0 \
  --graphics spice \
  --os-variant ubuntu20.04

# 参数说明：
# --name: 虚拟机名称
# --ram: 内存大小（MB）
# --vcpus: CPU核心数
# --disk: 磁盘配置（路径和大小）
# --cdrom: ISO镜像路径
# --network: 网络配置（桥接接口）
# --graphics: 图形显示类型
# --os-variant: 操作系统类型
```

### 2.6 管理虚拟机

使用`virsh`命令管理虚拟机：

```bash
# 列出所有虚拟机
virsh list --all

# 启动虚拟机
virsh start ubuntu-vm

# 关闭虚拟机
virsh shutdown ubuntu-vm

# 强制关闭虚拟机
virsh destroy ubuntu-vm

# 暂停虚拟机
virsh suspend ubuntu-vm

# 恢复虚拟机
virsh resume ubuntu-vm

# 重启虚拟机
virsh reboot ubuntu-vm

# 连接到虚拟机控制台
virsh console ubuntu-vm

# 查看虚拟机信息
virsh dominfo ubuntu-vm

# 查看虚拟机配置
virsh dumpxml ubuntu-vm

# 编辑虚拟机配置
virsh edit ubuntu-vm

# 删除虚拟机
virsh undefine ubuntu-vm

# 克隆虚拟机
virt-clone --original ubuntu-vm --name ubuntu-vm-clone --file /var/lib/libvirt/images/ubuntu-vm-clone.qcow2
```

### 2.7 虚拟机快照管理

```bash
# 创建快照
virsh snapshot-create-as --domain ubuntu-vm --name "snapshot1" --description "Initial setup"

# 列出快照
virsh snapshot-list --domain ubuntu-vm

# 查看快照信息
virsh snapshot-info --domain ubuntu-vm --snapshotname snapshot1

# 恢复快照
virsh snapshot-revert --domain ubuntu-vm --snapshotname snapshot1

# 删除快照
virsh snapshot-delete --domain ubuntu-vm --snapshotname snapshot1
```

### 2.8 虚拟机磁盘管理

```bash
# 创建新磁盘
qemu-img create -f qcow2 /var/lib/libvirt/images/new-disk.qcow2 10G

# 调整磁盘大小
qemu-img resize /var/lib/libvirt/images/ubuntu-vm.qcow2 +10G

# 查看磁盘信息
qemu-img info /var/lib/libvirt/images/ubuntu-vm.qcow2

# 将磁盘附加到虚拟机
virsh attach-disk ubuntu-vm /var/lib/libvirt/images/new-disk.qcow2 vdb --persistent

# 从虚拟机分离磁盘
virsh detach-disk ubuntu-vm vdb --persistent
```

## 3 Docker容器技术

### 3.1 Docker概述

Docker是一个开源的应用容器引擎，基于Go语言开发，遵循Apache2.0协议开源。Docker可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的Linux机器上，也可以实现虚拟化。

Docker的主要特点：
- **轻量级**：容器在宿主操作系统上直接运行，没有额外的操作系统开销
- **快速**：容器启动和停止非常快，通常在秒级
- **可移植**：容器可以在任何支持Docker的环境中运行
- **隔离性**：每个容器都有自己独立的文件系统、网络和进程空间
- **可扩展**：可以轻松地创建和管理多个容器实例

### 3.2 Docker架构

Docker采用客户端/服务器（C/S）架构，主要组件包括：

1. **Docker客户端（Client）**
   - 用户与Docker交互的接口
   - 通过REST API与Docker守护进程通信

2. **Docker守护进程（Daemon）**
   - 负责接收和处理客户端请求
   - 管理镜像、容器、网络和存储卷

3. **Docker镜像（Image）**
   - 只读的模板，用于创建容器
   - 包含运行应用所需的所有内容

4. **Docker容器（Container）**
   - 镜像的运行实例
   - 可以启动、停止、删除

5. **Docker仓库（Registry）**
   - 存储和分发镜像的服务
   - Docker Hub是最大的公共仓库

### 3.3 安装Docker

在Ubuntu/Debian系统上安装Docker：

```bash
# 更新软件包索引
sudo apt update

# 安装必要的软件包
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加Docker仓库
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新软件包索引
sudo apt update

# 安装Docker Engine
sudo apt install docker-ce docker-ce-cli containerd.io

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到docker组
sudo usermod -aG docker $USER

# 重新登录或重启以使组更改生效
```

在CentOS/RHEL系统上安装Docker：

```bash
# 安装必要的软件包
sudo yum install -y yum-utils

# 添加Docker仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装Docker Engine
sudo yum install docker-ce docker-ce-cli containerd.io

# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到docker组
sudo usermod -aG docker $USER
```

### 3.4 Docker基本命令

```bash
# 验证Docker安装
docker --version
docker run hello-world

# 搜索镜像
docker search ubuntu

# 拉取镜像
docker pull ubuntu:20.04

# 列出本地镜像
docker images

# 删除镜像
docker rmi ubuntu:20.04

# 运行容器
docker run -it --name my-ubuntu ubuntu:20.04 /bin/bash

# 列出运行中的容器
docker ps

# 列出所有容器（包括已停止的）
docker ps -a

# 停止容器
docker stop my-ubuntu

# 启动已停止的容器
docker start my-ubuntu

# 重启容器
docker restart my-ubuntu

# 删除容器
docker rm my-ubuntu

# 进入运行中的容器
docker exec -it my-ubuntu /bin/bash

# 查看容器日志
docker logs my-ubuntu

# 查看容器详细信息
docker inspect my-ubuntu
```

### 3.5 Dockerfile构建镜像

Dockerfile是用于构建Docker镜像的文本文件：

```dockerfile
# 基础镜像
FROM ubuntu:20.04

# 维护者信息
MAINTAINER Your Name <your.email@example.com>

# 设置环境变量
ENV DEBIAN_FRONTEND=noninteractive

# 更新软件包列表并安装必要的软件
RUN apt-get update && apt-get install -y \
    nginx \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 创建工作目录
WORKDIR /var/www/html

# 复制文件到容器中
COPY index.html /var/www/html/

# 暴露端口
EXPOSE 80

# 启动nginx服务
CMD ["nginx", "-g", "daemon off;"]
```

使用Dockerfile构建镜像：

```bash
# 构建镜像
docker build -t my-nginx:1.0 .

# 运行容器
docker run -d -p 8080:80 --name my-nginx-container my-nginx:1.0

# 访问nginx服务
curl http://localhost:8080
```

### 3.6 Docker网络管理

```bash
# 列出网络
docker network ls

# 创建自定义网络
docker network create my-network

# 连接容器到网络
docker network connect my-network my-nginx-container

# 断开容器与网络的连接
docker network disconnect my-network my-nginx-container

# 查看网络详细信息
docker network inspect my-network

# 删除网络
docker network rm my-network

# 运行容器时指定网络
docker run -d --network=my-network --name my-app my-image
```

### 3.7 Docker数据卷管理

```bash
# 创建数据卷
docker volume create my-volume

# 列出数据卷
docker volume ls

# 查看数据卷详细信息
docker volume inspect my-volume

# 运行容器时挂载数据卷
docker run -d -v my-volume:/data --name my-container my-image

# 运行容器时挂载主机目录
docker run -d -v /host/path:/container/path --name my-container my-image

# 删除数据卷
docker volume rm my-volume

# 清理未使用的数据卷
docker volume prune
```

### 3.8 Docker Compose

Docker Compose是用于定义和运行多容器Docker应用程序的工具：

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - my-network
    depends_on:
      - db

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: my-secret-pw
      MYSQL_DATABASE: mydb
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - my-network

networks:
  my-network:

volumes:
  db-data:
```

Docker Compose常用命令：

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 构建或重新构建服务
docker-compose build

# 运行命令
docker-compose exec web bash

# 扩展服务
docker-compose up -d --scale web=3
```

## 4 LXC容器技术

### 4.1 LXC概述

LXC（Linux Containers）是Linux内核容器技术的一个用户空间接口，它提供了一套轻量级的虚拟化解决方案。LXC利用Linux内核的cgroups和namespace功能，实现进程、网络、文件系统等资源的隔离。

LXC的特点：
- 轻量级，性能接近原生
- 共享宿主内核
- 支持完整的Linux系统环境
- 提供丰富的命令行工具

### 4.2 安装LXC

在Ubuntu/Debian系统上安装LXC：

```bash
# 安装LXC和相关组件
sudo apt update
sudo apt install lxc lxc-templates lxcfs

# 启动LXC服务
sudo systemctl start lxc
sudo systemctl enable lxc

# 配置用户网络
sudo vi /etc/lxc/default.conf

# 添加以下内容：
lxc.network.type = veth
lxc.network.link = lxcbr0
lxc.network.flags = up
lxc.network.hwaddr = 00:16:3e:xx:xx:xx
```

在CentOS/RHEL系统上安装LXC：

```bash
# 安装EPEL仓库
sudo yum install epel-release

# 安装LXC和相关组件
sudo yum install lxc lxc-templates lxc-libs

# 启动LXC服务
sudo systemctl start lxc
sudo systemctl enable lxc
```

### 4.3 LXC基本操作

```bash
# 检查LXC配置
lxc-checkconfig

# 创建容器
sudo lxc-create -n my-container -t ubuntu

# 列出容器
sudo lxc-ls

# 启动容器
sudo lxc-start -n my-container -d

# 停止容器
sudo lxc-stop -n my-container

# 连接到容器
sudo lxc-attach -n my-container

# 查看容器信息
sudo lxc-info -n my-container

# 克隆容器
sudo lxc-clone -o my-container -n my-container-clone

# 销毁容器
sudo lxc-destroy -n my-container

# 查看容器日志
sudo lxc-log -n my-container
```

### 4.4 LXC网络配置

```bash
# 查看容器网络配置
sudo lxc-info -n my-container -i

# 配置容器网络
sudo vi /var/lib/lxc/my-container/config

# 添加或修改网络配置：
lxc.network.type = veth
lxc.network.link = lxcbr0
lxc.network.flags = up
lxc.network.ipv4 = 10.0.3.100/24
lxc.network.ipv4.gateway = 10.0.3.1

# 重启容器使网络配置生效
sudo lxc-stop -n my-container
sudo lxc-start -n my-container -d
```

## 5 虚拟化与容器管理工具

### 5.1 WebVirtMgr

WebVirtMgr是一个基于Web的KVM管理界面：

```bash
# 安装依赖
sudo apt install git python-pip python-libvirt python-libxml2 novnc nginx supervisor

# 克隆WebVirtMgr仓库
git clone git://github.com/retspen/webvirtmgr.git

# 安装Python依赖
cd webvirtmgr
sudo pip install -r requirements.txt

# 初始化数据库
sudo python manage.py syncdb

# 收集静态文件
sudo python manage.py collectstatic

# 配置Nginx
sudo vi /etc/nginx/conf.d/webvirtmgr.conf

# 添加以下配置：
server {
    listen 80;
    server_name your-server-ip;
    
    location /static/ {
        root /var/www/webvirtmgr/webvirtmgr;
        expires max;
    }
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-for $proxy_add_x_forwarded_for;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 600;
        proxy_read_timeout 600;
        proxy_send_timeout 600;
        client_max_body_size 1024M;
    }
}

# 配置Supervisor
sudo vi /etc/supervisor/conf.d/webvirtmgr.conf

# 添加以下配置：
[program:webvirtmgr]
command=/usr/bin/python /var/www/webvirtmgr/manage.py run_gunicorn
directory=/var/www/webvirtmgr
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/webvirtmgr.log
redirect_stderr=true

[program:webvirtmgr-console]
command=/usr/bin/python /var/www/webvirtmgr/console/webvirtmgr-console
directory=/var/www/webvirtmgr
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/webvirtmgr-console.log
redirect_stderr=true

# 重启服务
sudo systemctl restart nginx
sudo systemctl restart supervisor
```

### 5.2 Portainer

Portainer是一个轻量级的Docker管理UI：

```bash
# 创建Portainer数据卷
docker volume create portainer_data

# 运行Portainer容器
docker run -d -p 9000:9000 -p 8000:8000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce

# 访问Portainer Web界面
# http://your-server-ip:9000
```

### 5.3 Cockpit

Cockpit是一个基于Web的系统管理界面，支持虚拟化和容器管理：

```bash
# 安装Cockpit
sudo apt install cockpit cockpit-machines cockpit-docker cockpit-podman

# 启动Cockpit服务
sudo systemctl start cockpit
sudo systemctl enable cockpit

# 访问Cockpit Web界面
# https://your-server-ip:9090
```

## 6 虚拟化与容器安全

### 6.1 虚拟机安全

1. **宿主机安全**
   - 定期更新宿主机系统和虚拟化软件
   - 最小化宿主机上运行的服务
   - 使用防火墙限制对虚拟化服务的访问

2. **虚拟机隔离**
   - 确保虚拟机之间有适当的网络隔离
   - 使用不同的存储池隔离虚拟机磁盘
   - 限制虚拟机对宿主机资源的访问

3. **虚拟机安全配置**
   - 在虚拟机内安装安全软件
   - 定期更新虚拟机操作系统和应用
   - 使用强密码和密钥认证

### 6.2 容器安全

1. **镜像安全**
   - 使用官方或可信的镜像源
   - 定期扫描镜像漏洞
   - 最小化镜像大小和组件

2. **容器运行时安全**
   - 以非root用户运行容器
   - 限制容器的资源使用
   - 使用安全选项（如--no-new-privileges）

3. **容器网络隔离**
   - 使用自定义网络隔离容器
   - 限制容器的网络访问
   - 使用网络策略控制容器间通信

```bash
# 扫描Docker镜像漏洞
docker scan my-image:latest

# 以非root用户运行容器
docker run -u 1000:1000 my-image

# 限制容器资源使用
docker run --memory=512m --cpus=1.0 my-image

# 使用安全选项运行容器
docker run --security-opt=no-new-privileges my-image

# 创建隔离的网络
docker network create --driver bridge isolated-network
docker run --network=isolated-network my-image
```

## 7 性能优化

### 7.1 虚拟机性能优化

1. **CPU优化**
   - 为CPU密集型虚拟机分配更多vCPU
   - 使用CPU亲和性绑定虚拟机到特定CPU核心
   - 启用CPU热插拔功能

2. **内存优化**
   - 为内存密集型虚拟机分配足够内存
   - 使用内存气球（ballooning）技术动态调整内存
   - 启用内存大页（hugepages）提高性能

3. **存储优化**
   - 使用SSD存储提高I/O性能
   - 选择适当的磁盘格式（如qcow2 vs raw）
   - 启用磁盘缓存优化

4. **网络优化**
   - 使用virtio网络驱动提高网络性能
   - 配置多队列（multiqueue）提高网络吞吐量
   - 使用SR-IOV技术提高网络性能

```bash
# 设置CPU亲和性
virsh vcpupin ubuntu-vm 0 0-1

# 启用内存大页
echo 1024 > /sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages
virsh edit ubuntu-vm
# 添加以下配置：
<memoryBacking>
  <hugepages>
    <page size='2048' unit='KiB'/>
  </hugepages>
</memoryBacking>

# 配置多队列
virsh edit ubuntu-vm
# 添加以下配置：
<driver name='vhost' queues='4'/>
```

### 7.2 容器性能优化

1. **镜像优化**
   - 使用多阶段构建减小镜像大小
   - 合并RUN指令减少层数
   - 使用.dockerignore排除不必要的文件

2. **运行时优化**
   - 适当设置资源限制
   - 使用健康检查确保容器正常运行
   - 配置日志驱动避免日志占用过多磁盘空间

3. **网络优化**
   - 使用host网络模式提高网络性能
   - 配置DNS缓存减少DNS查询时间
   - 使用负载均衡分发流量

```dockerfile
# 多阶段构建示例
FROM golang:1.16 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/myapp .
CMD ["./myapp"]
```

```bash
# 设置资源限制
docker run --memory=512m --cpus=1.0 my-image

# 配置健康检查
docker run --health-cmd="curl -f http://localhost/ || exit 1" --health-interval=5s my-image

# 配置日志驱动
docker run --log-driver=json-file --log-opt max-size=10m --log-opt max-file=3 my-image
```

## 8 实践练习

### 练习1：创建和管理KVM虚拟机

编写一个Shell脚本，自动化创建和管理KVM虚拟机：

```bash
#!/bin/bash
# KVM虚拟机管理脚本

VM_NAME=$1
ACTION=$2
RAM=${3:-2048}
VCPUS=${4:-2}
DISK_SIZE=${5:-20}
ISO_PATH=${6:-""}

# 检查参数
if [ -z "$VM_NAME" ] || [ -z "$ACTION" ]; then
    echo "Usage: $0 <vm_name> <action> [ram] [vcpus] [disk_size] [iso_path]"
    echo "Actions: create, start, stop, restart, delete, info"
    exit 1
fi

# 创建虚拟机
create_vm() {
    echo "Creating virtual machine: $VM_NAME"
    
    # 检查虚拟机是否已存在
    if virsh dominfo "$VM_NAME" &>/dev/null; then
        echo "Virtual machine $VM_NAME already exists"
        exit 1
    fi
    
    # 创建磁盘
    DISK_PATH="/var/lib/libvirt/images/${VM_NAME}.qcow2"
    qemu-img create -f qcow2 "$DISK_PATH" "${DISK_SIZE}G"
    
    # 创建虚拟机
    if [ -n "$ISO_PATH" ]; then
        virt-install \
            --name "$VM_NAME" \
            --ram "$RAM" \
            --vcpus "$VCPUS" \
            --disk path="$DISK_PATH",size="$DISK_SIZE" \
            --cdrom "$ISO_PATH" \
            --network bridge=virbr0 \
            --graphics spice \
            --noautoconsole
    else
        virt-install \
            --name "$VM_NAME" \
            --ram "$RAM" \
            --vcpus "$VCPUS" \
            --disk path="$DISK_PATH",size="$DISK_SIZE" \
            --network bridge=virbr0 \
            --graphics spice \
            --import \
            --noautoconsole
    fi
    
    echo "Virtual machine $VM_NAME created successfully"
}

# 启动虚拟机
start_vm() {
    echo "Starting virtual machine: $VM_NAME"
    virsh start "$VM_NAME"
}

# 停止虚拟机
stop_vm() {
    echo "Stopping virtual machine: $VM_NAME"
    virsh shutdown "$VM_NAME"
}

# 重启虚拟机
restart_vm() {
    echo "Restarting virtual machine: $VM_NAME"
    virsh reboot "$VM_NAME"
}

# 删除虚拟机
delete_vm() {
    echo "Deleting virtual machine: $VM_NAME"
    
    # 关闭虚拟机
    virsh destroy "$VM_NAME" 2>/dev/null
    
    # 删除虚拟机定义
    virsh undefine "$VM_NAME"
    
    # 删除磁盘文件
    DISK_PATH="/var/lib/libvirt/images/${VM_NAME}.qcow2"
    if [ -f "$DISK_PATH" ]; then
        rm -f "$DISK_PATH"
    fi
    
    echo "Virtual machine $VM_NAME deleted successfully"
}

# 显示虚拟机信息
info_vm() {
    echo "Virtual machine information: $VM_NAME"
    virsh dominfo "$VM_NAME"
}

# 执行操作
case "$ACTION" in
    create)
        create_vm
        ;;
    start)
        start_vm
        ;;
    stop)
        stop_vm
        ;;
    restart)
        restart_vm
        ;;
    delete)
        delete_vm
        ;;
    info)
        info_vm
        ;;
    *)
        echo "Unknown action: $ACTION"
        echo "Available actions: create, start, stop, restart, delete, info"
        exit 1
        ;;
esac
```

### 练习2：Docker容器管理脚本

编写一个Shell脚本，用于管理Docker容器：

```bash
#!/bin/bash
# Docker容器管理脚本

CONTAINER_NAME=$1
ACTION=$2
IMAGE=$3
PORT=${4:-8080}
VOLUME=${5:-""}

# 检查参数
if [ -z "$CONTAINER_NAME" ] || [ -z "$ACTION" ]; then
    echo "Usage: $0 <container_name> <action> [image] [port] [volume]"
    echo "Actions: create, start, stop, restart, delete, info, logs"
    exit 1
fi

# 创建容器
create_container() {
    echo "Creating container: $CONTAINER_NAME"
    
    # 检查容器是否已存在
    if docker ps -a --filter "name=$CONTAINER_NAME" --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        echo "Container $CONTAINER_NAME already exists"
        exit 1
    fi
    
    # 检查镜像是否已提供
    if [ -z "$IMAGE" ]; then
        echo "Image name is required to create a container"
        exit 1
    fi
    
    # 创建容器
    if [ -n "$VOLUME" ]; then
        docker run -d --name "$CONTAINER_NAME" -p "$PORT":80 -v "$VOLUME" "$IMAGE"
    else
        docker run -d --name "$CONTAINER_NAME" -p "$PORT":80 "$IMAGE"
    fi
    
    echo "Container $CONTAINER_NAME created successfully"
}

# 启动容器
start_container() {
    echo "Starting container: $CONTAINER_NAME"
    docker start "$CONTAINER_NAME"
}

# 停止容器
stop_container() {
    echo "Stopping container: $CONTAINER_NAME"
    docker stop "$CONTAINER_NAME"
}

# 重启容器
restart_container() {
    echo "Restarting container: $CONTAINER_NAME"
    docker restart "$CONTAINER_NAME"
}

# 删除容器
delete_container() {
    echo "Deleting container: $CONTAINER_NAME"
    
    # 停止容器
    docker stop "$CONTAINER_NAME" 2>/dev/null
    
    # 删除容器
    docker rm "$CONTAINER_NAME"
    
    echo "Container $CONTAINER_NAME deleted successfully"
}

# 显示容器信息
info_container() {
    echo "Container information: $CONTAINER_NAME"
    docker inspect "$CONTAINER_NAME"
}

# 显示容器日志
logs_container() {
    echo "Container logs: $CONTAINER_NAME"
    docker logs -f "$CONTAINER_NAME"
}

# 执行操作
case "$ACTION" in
    create)
        create_container
        ;;
    start)
        start_container
        ;;
    stop)
        stop_container
        ;;
    restart)
        restart_container
        ;;
    delete)
        delete_container
        ;;
    info)
        info_container
        ;;
    logs)
        logs_container
        ;;
    *)
        echo "Unknown action: $ACTION"
        echo "Available actions: create, start, stop, restart, delete, info, logs"
        exit 1
        ;;
esac
```

### 练习3：容器化Web应用

创建一个Dockerfile，将Web应用容器化：

```dockerfile
# Dockerfile
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制应用代码
COPY . .

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# 更改文件所有权
RUN chown -R nodejs:nodejs /app
USER nodejs

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# 启动应用
CMD ["node", "app.js"]
```

创建docker-compose.yml文件：

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/app/logs
    networks:
      - webnet
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - web
    networks:
      - webnet
    restart: unless-stopped

  redis:
    image: redis:alpine
    volumes:
      - redis-data:/data
    networks:
      - webnet
    restart: unless-stopped

networks:
  webnet:
    driver: bridge

volumes:
  redis-data:
```

创建nginx.conf文件：

```nginx
events {
    worker_connections 1024;
}

http {
    upstream web {
        server web:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://web;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

使用Docker Compose启动应用：

```bash
# 构建并启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 扩展web服务
docker-compose up -d --scale web=3

# 停止服务
docker-compose down
```

## 9 总结

本章介绍了Linux虚拟化与容器技术的基础知识和实用技能，包括：

1. **虚拟化技术概述**
   - 虚拟化的概念和类型
   - 虚拟化与容器的区别

2. **KVM虚拟化技术**
   - KVM的安装和配置
   - 虚拟机的创建和管理
   - 快照和磁盘管理

3. **Docker容器技术**
   - Docker的安装和基本命令
   - Dockerfile构建镜像
   - 网络和数据卷管理
   - Docker Compose多容器应用

4. **LXC容器技术**
   - LXC的安装和基本操作
   - 网络配置

5. **管理工具**
   - WebVirtMgr、Portainer、Cockpit等管理界面

6. **安全与性能优化**
   - 虚拟机和容器安全最佳实践
   - 性能优化技巧

7. **实践练习**
   - KVM虚拟机管理脚本
   - Docker容器管理脚本
   - 容器化Web应用

通过本章的学习，读者应该能够：
- 理解虚拟化和容器技术的原理和区别
- 安装和配置KVM虚拟化环境
- 创建和管理Docker容器
- 使用Docker Compose部署多容器应用
- 实现虚拟化和容器的安全和性能优化

虚拟化和容器技术是现代IT基础设施的重要组成部分，掌握这些技术可以帮助提高资源利用率、简化应用部署和管理，是Linux系统管理员和DevOps工程师必备的技能。