# 第23章：项目三：开发环境搭建

## 1 项目概述

### 1.1 项目目标

本项目旨在使用Linux系统搭建一个功能完整的开发环境，支持多种编程语言和开发工具，包括Web开发、后端开发、数据库开发、容器化开发等。通过实践应用前面章节所学的知识，包括系统管理、网络配置、软件安装、服务配置、安全配置等。项目完成后，您将拥有一个高效、安全、多功能的开发平台。

### 1.2 技术栈选择

本项目将使用以下技术栈：

- **操作系统**: Ubuntu Server 20.04 LTS
- **编程语言**: Python, Node.js, Java, Go, PHP, Ruby
- **数据库**: MySQL, PostgreSQL, MongoDB, Redis
- **Web服务器**: Nginx, Apache
- **版本控制**: Git, Gitea
- **容器化**: Docker, Docker Compose, Kubernetes
- **开发工具**: VS Code Server, Jenkins
- **监控工具**: Netdata
- **安全工具**: 防火墙 (UFW)、Fail2ban

### 1.3 系统架构

```
开发环境
    ├── 编程语言环境
    │   ├── Python
    │   ├── Node.js
    │   ├── Java
    │   ├── Go
    │   ├── PHP
    │   └── Ruby
    ├── 数据库服务
    │   ├── MySQL
    │   ├── PostgreSQL
    │   ├── MongoDB
    │   └── Redis
    ├── Web服务器
    │   ├── Nginx
    │   └── Apache
    ├── 版本控制
    │   ├── Git
    │   └── Gitea
    ├── 容器化平台
    │   ├── Docker
    │   ├── Docker Compose
    │   └── Kubernetes
    ├── 开发工具
    │   ├── VS Code Server
    │   └── Jenkins
    └── 监控和安全
        ├── Netdata
        ├── UFW
        └── Fail2ban
```

### 1.4 项目步骤概览

1. 系统初始化和基础配置
2. 编程语言环境安装
3. 数据库服务配置
4. Web服务器配置
5. 版本控制系统配置
6. 容器化平台安装
7. 开发工具配置
8. 监控和安全配置
9. 开发环境集成测试
10. 最佳实践和维护

## 2 系统初始化和基础配置

### 2.1 系统更新

首先，我们需要确保系统是最新的，并安装必要的软件包：

```bash
# 更新系统软件包
sudo apt update && sudo apt upgrade -y

# 安装必要的基础工具
sudo apt install -y curl wget git vim htop unzip software-properties-common build-essential
```

### 2.2 用户和权限配置

创建开发用户：

```bash
# 创建开发用户
sudo adduser devuser

# 将用户添加到sudo组
sudo usermod -aG sudo devuser

# 创建开发目录
sudo mkdir -p /opt/dev
sudo chown devuser:devuser /opt/dev
sudo chmod 755 /opt/dev

# 切换到开发用户
su - devuser
```

### 2.3 防火墙配置

配置防火墙规则：

```bash
# 安装UFW（如果未安装）
sudo apt install ufw

# 设置默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许SSH
sudo ufw allow ssh

# 允许HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 允许特定开发端口（根据需要）
sudo ufw allow 3000/tcp  # Node.js应用
sudo ufw allow 8080/tcp  # Java应用
sudo ufw allow 9000/tcp  # PHP应用
sudo ufw allow 5000/tcp  # Python应用

# 启用防火墙
sudo ufw enable

# 查看防火墙状态
sudo ufw status verbose
```

## 3 编程语言环境安装

### 3.1 Python环境

安装Python和相关工具：

```bash
# 安装Python 3和pip
sudo apt install python3 python3-pip python3-venv python3-dev

# 安装Python包管理工具
sudo pip3 install --upgrade pip
sudo pip3 install virtualenv

# 创建Python开发环境
mkdir -p /opt/dev/python
cd /opt/dev/python

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装常用Python包
pip install numpy pandas matplotlib scipy scikit-learn jupyter flask django requests

# 配置Jupyter Notebook
jupyter notebook --generate-config
mkdir -p ~/.jupyter

# 创建Jupyter配置文件
cat > ~/.jupyter/jupyter_notebook_config.py << EOF
c.NotebookApp.ip = '0.0.0.0'
c.NotebookApp.port = 8888
c.NotebookApp.open_browser = False
c.NotebookApp.notebook_dir = '/opt/dev/python'
EOF

# 创建Jupyter服务文件
sudo tee /etc/systemd/system/jupyter.service > /dev/null <<EOF
[Unit]
Description=Jupyter Notebook
After=network.target

[Service]
Type=simple
User=devuser
WorkingDirectory=/opt/dev/python
ExecStart=/opt/dev/python/venv/bin/jupyter notebook
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# 启动并设置开机自启
sudo systemctl daemon-reload
sudo systemctl start jupyter
sudo systemctl enable jupyter
```

### 3.2 Node.js环境

安装Node.js和相关工具：

```bash
# 安装Node.js 16.x
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version

# 安装全局包
sudo npm install -g npm
sudo npm install -g express-generator
sudo npm install -g typescript
sudo npm install -g ts-node
sudo npm install -g nodemon
sudo npm install -g pm2

# 创建Node.js开发环境
mkdir -p /opt/dev/nodejs
cd /opt/dev/nodejs

# 创建示例项目
express myapp
cd myapp
npm install

# 使用PM2管理应用
pm2 start ./bin/www --name "myapp"
pm2 startup
pm2 save
```

### 3.3 Java环境

安装Java开发环境：

```bash
# 安装OpenJDK 11
sudo apt install openjdk-11-jdk openjdk-11-jre

# 验证安装
java -version
javac -version

# 设置JAVA_HOME
echo 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$PATH:$JAVA_HOME/bin' >> ~/.bashrc
source ~/.bashrc

# 安装Maven
sudo apt install maven

# 验证Maven安装
mvn -version

# 安装Gradle
sudo wget https://gradle.org/releases/
sudo unzip -d /opt/gradle gradle-7.4.2-bin.zip
echo 'export GRADLE_HOME=/opt/gradle/gradle-7.4.2' >> ~/.bashrc
echo 'export PATH=$PATH:$GRADLE_HOME/bin' >> ~/.bashrc
source ~/.bashrc

# 验证Gradle安装
gradle -version

# 创建Java开发环境
mkdir -p /opt/dev/java
cd /opt/dev/java

# 创建Maven项目
mvn archetype:generate -DgroupId=com.example -DartifactId=myapp -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
cd myapp
mvn package
```

### 3.4 Go环境

安装Go语言环境：

```bash
# 下载Go安装包
wget https://golang.org/dl/go1.19.linux-amd64.tar.gz

# 解压到/usr/local
sudo tar -C /usr/local -xzf go1.19.linux-amd64.tar.gz

# 设置环境变量
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc

# 验证安装
go version

# 创建Go开发环境
mkdir -p /opt/dev/go
cd /opt/dev/go

# 初始化Go模块
go mod init myapp

# 创建示例程序
cat > main.go << EOF
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
EOF

# 运行程序
go run main.go
```

### 3.5 PHP环境

安装PHP和相关工具：

```bash
# 安装PHP和扩展
sudo apt install php7.4 php7.4-fpm php7.4-mysql php7.4-curl php7.4-gd php7.4-mbstring php7.4-xml php7.4-xmlrpc php7.4-soap php7.4-intl php7.4-zip php7.4-imagick php7.4-xdebug php7.4-composer

# 验证安装
php --version

# 配置PHP
sudo nano /etc/php/7.4/cli/php.ini

# 修改以下配置
memory_limit = 512M
max_execution_time = 300
display_errors = On
error_reporting = E_ALL
date.timezone = Asia/Shanghai

# 创建PHP开发环境
mkdir -p /opt/dev/php
cd /opt/dev/php

# 创建示例项目
composer create-project laravel/laravel myapp
cd myapp

# 配置Laravel
cp .env.example .env
php artisan key:generate
```

### 3.6 Ruby环境

安装Ruby和相关工具：

```bash
# 安装Ruby
sudo apt install ruby-full

# 验证安装
ruby --version

# 安装Bundler
gem install bundler

# 创建Ruby开发环境
mkdir -p /opt/dev/ruby
cd /opt/dev/ruby

# 创建示例项目
gem install rails
rails new myapp
cd myapp

# 启动Rails服务器
rails server -b 0.0.0.0 -p 3000
```

## 4 数据库服务配置

### 4.1 MySQL配置

安装和配置MySQL：

```bash
# 安装MySQL服务器
sudo apt install mysql-server

# 启动并设置开机自启
sudo systemctl start mysql
sudo systemctl enable mysql

# 运行安全安装脚本
sudo mysql_secure_installation

# 创建开发数据库
sudo mysql -u root -p

# 在MySQL中执行
CREATE DATABASE devdb;
CREATE USER 'devuser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON devdb.* TO 'devuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 配置MySQL
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# 在[mysqld]部分添加以下配置
bind-address = 0.0.0.0
max_connections = 200
innodb_buffer_pool_size = 512M

# 重启MySQL
sudo systemctl restart mysql
```

### 4.2 PostgreSQL配置

安装和配置PostgreSQL：

```bash
# 安装PostgreSQL
sudo apt install postgresql postgresql-contrib

# 启动并设置开机自启
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 创建开发数据库和用户
sudo -u postgres psql

# 在PostgreSQL中执行
CREATE DATABASE devdb;
CREATE USER devuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE devdb TO devuser;
\q

# 配置PostgreSQL
sudo nano /etc/postgresql/12/main/postgresql.conf

# 修改以下配置
listen_addresses = '*'

# 配置访问控制
sudo nano /etc/postgresql/12/main/pg_hba.conf

# 添加以下行
host    all             all             0.0.0.0/0               md5

# 重启PostgreSQL
sudo systemctl restart postgresql
```

### 4.3 MongoDB配置

安装和配置MongoDB：

```bash
# 导入MongoDB公钥
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# 添加MongoDB源
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# 更新包列表并安装MongoDB
sudo apt update
sudo apt install -y mongodb-org

# 启动并设置开机自启
sudo systemctl start mongod
sudo systemctl enable mongod

# 创建开发用户
mongo

# 在MongoDB中执行
use admin
db.createUser({
  user: "devuser",
  pwd: "password",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
});
exit

# 配置MongoDB
sudo nano /etc/mongod.conf

# 修改以下配置
net:
  port: 27017
  bindIp: 0.0.0.0

# 重启MongoDB
sudo systemctl restart mongod
```

### 4.4 Redis配置

安装和配置Redis：

```bash
# 安装Redis
sudo apt install redis-server

# 配置Redis
sudo nano /etc/redis/redis.conf

# 修改以下配置
bind 0.0.0.0
port 6379
requirepass your_redis_password

# 启动并设置开机自启
sudo systemctl start redis-server
sudo systemctl enable redis-server

# 测试Redis连接
redis-cli -a your_redis_password
ping
```

## 5 Web服务器配置

### 5.1 Nginx配置

安装和配置Nginx：

```bash
# 安装Nginx
sudo apt install nginx

# 启动并设置开机自启
sudo systemctl start nginx
sudo systemctl enable nginx

# 创建虚拟主机配置
sudo nano /etc/nginx/sites-available/dev

# 添加以下内容
server {
    listen 80;
    server_name dev.example.com;
    root /opt/dev;
    index index.html index.htm index.php;

    access_log /var/log/nginx/dev_access.log;
    error_log /var/log/nginx/dev_error.log;

    location / {
        try_files $uri $uri/ =404;
    }

    # Node.js应用代理
    location /nodejs/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # PHP应用代理
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

# 启用站点
sudo ln -s /etc/nginx/sites-available/dev /etc/nginx/sites-enabled/

# 测试Nginx配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

### 5.2 Apache配置

安装和配置Apache：

```bash
# 安装Apache
sudo apt install apache2

# 启用必要模块
sudo a2enmod rewrite
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod lbmethod_byrequests

# 创建虚拟主机配置
sudo nano /etc/apache2/sites-available/dev.conf

# 添加以下内容
<VirtualHost *:80>
    ServerName dev.example.com
    DocumentRoot /opt/dev

    <Directory /opt/dev>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Node.js应用代理
    ProxyPreserveHost On
    ProxyPass /nodejs/ http://localhost:3000/
    ProxyPassReverse /nodejs/ http://localhost:3000/

    ErrorLog ${APACHE_LOG_DIR}/dev_error.log
    CustomLog ${APACHE_LOG_DIR}/dev_access.log combined
</VirtualHost>

# 启用站点
sudo a2ensite dev.conf

# 禁用默认站点
sudo a2dissite 000-default.conf

# 测试Apache配置
sudo apache2ctl configtest

# 重启Apache
sudo systemctl restart apache2
```

## 6 版本控制系统配置

### 6.1 Git配置

安装和配置Git：

```bash
# 安装Git
sudo apt install git

# 配置Git用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 配置Git默认编辑器
git config --global core.editor vim

# 配置Git差异工具
git config --global merge.tool vimdiff

# 配置Git别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit

# 创建示例仓库
mkdir -p /opt/dev/git/myproject
cd /opt/dev/git/myproject
git init
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"
```

### 6.2 Gitea配置

安装和配置Gitea（轻量级Git服务）：

```bash
# 创建Gitea用户
sudo adduser --system --shell /bin/bash --gecos 'Git Version Control' --group --disabled-password --home /home/git git

# 创建目录
sudo mkdir -p /var/lib/gitea/{custom,data,indexers,public,log}
sudo chown git:git /var/lib/gitea/{data,indexers,log}
sudo chmod 750 /var/lib/gitea/{data,indexers,log}
sudo mkdir /etc/gitea
sudo chown root:git /etc/gitea
sudo chmod 770 /etc/gitea

# 下载Gitea
sudo wget -O /tmp/gitea https://dl.gitea.io/gitea/1.16.8/gitea-1.16.8-linux-amd64
sudo mv /tmp/gitea /usr/local/bin/gitea
sudo chmod +x /usr/local/bin/gitea

# 创建systemd服务文件
sudo tee /etc/systemd/system/gitea.service > /dev/null <<EOF
[Unit]
Description=Gitea
After=syslog.target
After=network.target
After=mariadb.service

[Service]
LimitNOFILE=65535
Type=simple
User=git
Group=git
WorkingDirectory=/var/lib/gitea/
ExecStart=/usr/local/bin/gitea web --config /etc/gitea/app.ini
Restart=always
Environment=USER=git HOME=/home/git GITEA_WORK_DIR=/var/lib/gitea

[Install]
WantedBy=multi-user.target
EOF

# 启动并设置开机自启
sudo systemctl daemon-reload
sudo systemctl start gitea
sudo systemctl enable gitea

# 配置防火墙
sudo ufw allow 3000/tcp

# 访问 http://your-server-ip:3000 完成Gitea初始化配置
```

## 7 容器化平台安装

### 7.1 Docker安装

安装Docker：

```bash
# 安装必要的包
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加Docker官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加Docker仓库
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新包列表并安装Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# 将用户添加到docker组
sudo usermod -aG docker $USER

# 启动并设置开机自启
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker --version
docker run hello-world
```

### 7.2 Docker Compose安装

安装Docker Compose：

```bash
# 下载Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version

# 创建示例Docker Compose项目
mkdir -p /opt/dev/docker/myapp
cd /opt/dev/docker/myapp

# 创建Dockerfile
cat > Dockerfile << EOF
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOF

# 创建docker-compose.yml
cat > docker-compose.yml << EOF
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
EOF

# 创建package.json
cat > package.json << EOF
{
  "name": "myapp",
  "version": "1.0.0",
  "description": "My App",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
EOF

# 创建index.js
cat > index.js << EOF
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`App listening at http://localhost:\${port}\`);
});
EOF

# 启动应用
docker-compose up -d
```

### 7.3 Kubernetes安装

安装Minikube（本地Kubernetes环境）：

```bash
# 安装Minikube依赖
sudo apt install conntrack

# 下载Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# 安装kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# 启动Minikube
minikube start --driver=none

# 验证安装
kubectl cluster-info

# 创建示例部署
kubectl create deployment hello-minikube --image=k8s.gcr.io/echoserver:1.10
kubectl expose deployment hello-minikube --type=NodePort --port=8080
kubectl get services
```

## 8 开发工具配置

### 8.1 VS Code Server安装

安装VS Code Server：

```bash
# 下载VS Code Server
wget -O /tmp/vscode-server.tar.gz https://update.code.visualstudio.com/latest/server-linux-x64/stable

# 创建安装目录
sudo mkdir -p /opt/vscode-server
sudo tar -xzf /tmp/vscode-server.tar.gz -C /opt/vscode-server --strip-components=1

# 创建启动脚本
cat > /usr/local/bin/code-server << EOF
#!/bin/bash
/opt/vscode-server/bin/code-server --host 0.0.0.0 --port 8080 --auth password --password your_password --disable-telemetry
EOF

# 添加执行权限
sudo chmod +x /usr/local/bin/code-server

# 创建systemd服务文件
sudo tee /etc/systemd/system/code-server.service > /dev/null <<EOF
[Unit]
Description=VS Code Server
After=network.target

[Service]
Type=simple
User=devuser
WorkingDirectory=/opt/dev
ExecStart=/usr/local/bin/code-server
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# 启动并设置开机自启
sudo systemctl daemon-reload
sudo systemctl start code-server
sudo systemctl enable code-server

# 配置防火墙
sudo ufw allow 8080/tcp
```

### 8.2 Jenkins安装

安装Jenkins：

```bash
# 安装Java
sudo apt install openjdk-11-jdk

# 添加Jenkins仓库密钥
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -

# 添加Jenkins仓库
echo "deb https://pkg.jenkins.io/debian binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list

# 更新包列表并安装Jenkins
sudo apt update
sudo apt install jenkins

# 启动并设置开机自启
sudo systemctl start jenkins
sudo systemctl enable jenkins

# 获取初始管理员密码
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# 配置防火墙
sudo ufw allow 8080/tcp
sudo ufw allow 50000/tcp

# 访问 http://your-server-ip:8080 完成Jenkins初始化配置
```

## 9 监控和安全配置

### 9.1 监控配置

安装和配置监控工具：

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

### 9.2 安全配置

安装和配置安全工具：

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
port = ssh
logpath = %(sshd_log)s
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 3

# 启动并设置开机自启
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# 查看状态
sudo fail2ban-client status
```

## 10 开发环境集成测试

### 10.1 创建测试项目

创建一个简单的全栈应用来测试开发环境：

```bash
# 创建项目目录
mkdir -p /opt/dev/testapp
cd /opt/dev/testapp

# 初始化Git仓库
git init

# 创建后端API
mkdir -p backend
cd backend

# 创建Node.js后端
npm init -y
npm install express mongoose cors

# 创建server.js
cat > server.js << EOF
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 连接MongoDB
mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 定义模型
const Item = mongoose.model('Item', {
  name: String,
  description: String
});

// 路由
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description
  });
  
  await newItem.save();
  res.json(newItem);
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
EOF

# 返回项目根目录
cd ..

# 创建前端应用
npx create-react-app frontend
cd frontend

# 修改App.js
cat > src/App.js << EOF
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    })
    .then(res => res.json())
    .then(data => {
      setItems([...items, data]);
      setName('');
      setDescription('');
    });
  };

  return (
    <div className="App">
      <h1>Test App</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name}: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
EOF

# 返回项目根目录
cd ..

# 创建Docker Compose文件
cat > docker-compose.yml << EOF
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
  
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - NODE_ENV=development
    volumes:
      - ./backend:/app
      - /app/node_modules
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  mongodb_data:
EOF

# 创建后端Dockerfile
cat > backend/Dockerfile << EOF
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
EOF

# 修改后端package.json添加启动脚本
cd backend
sed -i 's/"test": "echo \\"Error: no test specified\\" && exit 1"/"start": "node server.js", "test": "echo \\"Error: no test specified\\" && exit 1"/' package.json
cd ..

# 创建前端Dockerfile
cat > frontend/Dockerfile << EOF
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOF

# 提交到Git
git add .
git commit -m "Initial commit"

# 启动应用
docker-compose up -d
```

### 10.2 测试开发环境

测试各个组件是否正常工作：

```bash
# 测试数据库连接
mongo testdb --eval "db.createCollection('items')"

# 测试后端API
curl http://localhost:5000/api/items

# 测试前端应用
curl http://localhost:3000

# 测试Git仓库
git log

# 测试VS Code Server
curl http://localhost:8080

# 测试Jenkins
curl http://localhost:8080

# 测试Gitea
curl http://localhost:3000

# 测试监控
curl http://localhost:19999
```

## 11 最佳实践和维护

### 11.1 开发环境最佳实践

1. **版本控制**：
   - 使用Git进行版本控制
   - 创建.gitignore文件排除不必要的文件
   - 定期提交代码变更

2. **环境隔离**：
   - 使用虚拟环境隔离Python项目
   - 使用容器隔离应用依赖
   - 使用不同端口避免冲突

3. **文档管理**：
   - 为每个项目创建README文件
   - 记录项目依赖和启动步骤
   - 使用代码注释说明复杂逻辑

4. **代码质量**：
   - 使用代码格式化工具
   - 配置代码检查工具
   - 编写单元测试

### 11.2 维护建议

为确保开发环境长期稳定运行，建议定期执行以下维护任务：

1. **系统更新**：定期更新系统软件包和开发工具
2. **备份代码**：定期备份代码到远程仓库或云存储
3. **清理资源**：定期清理临时文件和未使用的容器
4. **监控性能**：监控系统资源使用情况，及时优化
5. **安全扫描**：定期进行安全扫描，发现和修复安全漏洞
6. **依赖更新**：定期更新项目依赖，修复安全漏洞

## 12 项目总结

### 12.1 完成功能

通过本项目，我们成功搭建了一个功能完整的开发环境，包括：

1. **系统基础配置**：用户管理、网络配置、防火墙设置
2. **编程语言环境**：Python、Node.js、Java、Go、PHP、Ruby
3. **数据库服务**：MySQL、PostgreSQL、MongoDB、Redis
4. **Web服务器**：Nginx、Apache
5. **版本控制**：Git、Gitea
6. **容器化平台**：Docker、Docker Compose、Minikube
7. **开发工具**：VS Code Server、Jenkins
8. **监控和安全**：Netdata、UFW、Fail2ban
9. **集成测试**：创建全栈应用测试开发环境

### 12.2 技术要点

本项目涉及的主要技术要点：

1. **多语言环境**：多种编程语言的安装和配置
2. **数据库管理**：关系型和非关系型数据库的配置
3. **Web服务**：Web服务器的配置和反向代理设置
4. **版本控制**：Git的使用和自托管Git服务
5. **容器化**：Docker和Kubernetes的使用
6. **自动化工具**：Jenkins CI/CD配置
7. **远程开发**：VS Code Server配置
8. **系统监控**：性能监控和安全防护

### 12.3 扩展建议

为进一步完善开发环境，可以考虑以下扩展：

1. **CI/CD流水线**：使用Jenkins或GitLab CI实现自动化构建和部署
2. **微服务架构**：使用Docker和Kubernetes构建微服务开发环境
3. **云集成**：集成AWS、Azure或阿里云等云平台服务
4. **协作工具**：集成Slack、Mattermost等团队协作工具
5. **代码质量工具**：集成SonarQube等代码质量分析工具
6. **文档生成**：集成Swagger API文档生成工具
7. **性能测试**：集成JMeter等性能测试工具

### 12.4 维护建议

为确保开发环境长期稳定运行，建议定期执行以下维护任务：

1. **环境更新**：定期更新开发工具和依赖库
2. **代码备份**：定期备份代码到远程仓库
3. **资源清理**：定期清理临时文件和未使用的容器
4. **性能监控**：监控系统资源使用情况
5. **安全加固**：定期更新安全补丁和配置
6. **文档更新**：及时更新开发文档和配置说明

通过本项目的实践，您不仅掌握了Linux开发环境的搭建和管理，还学会了如何构建一个多语言、多功能、高效率的开发平台。这些技能和经验将为您未来的软件开发和系统管理工作提供坚实的基础。