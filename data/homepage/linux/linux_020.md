# 第20章：自动化运维

## 1 自动化运维概述

### 1.1 自动化运维的价值

自动化运维是现代IT运维的核心组成部分，它通过工具和脚本将重复性、规律性的工作自动化，从而提高效率、减少人为错误、降低成本。自动化运维的主要价值包括：

1. **提高效率**：自动化执行重复任务，释放人力资源
2. **减少错误**：消除人为操作中的失误和疏忽
3. **标准化操作**：确保操作的一致性和可重复性
4. **快速响应**：快速响应系统变化和故障
5. **降低成本**：减少人力投入和操作失误带来的损失
6. **提升可靠性**：确保系统稳定运行

### 1.2 自动化运维的层次

自动化运维可以分为多个层次：

1. **脚本自动化**：使用Shell脚本、Python等编写自动化脚本
2. **任务调度**：使用cron、systemd timer等定时执行任务
3. **配置管理**：使用Ansible、Puppet、Chef等工具管理配置
4. **容器编排**：使用Docker、Kubernetes等管理容器
5. **CI/CD流水线**：使用Jenkins、GitLab CI等实现持续集成和部署
6. **基础设施即代码**：使用Terraform、CloudFormation等管理基础设施
7. **智能运维**：使用AI/ML技术进行预测性维护和故障自愈

### 1.3 自动化运维工具生态

Linux环境下常用的自动化运维工具包括：

- **脚本语言**：Bash、Python、Perl、Ruby
- **任务调度**：cron、systemd timer、at
- **配置管理**：Ansible、Puppet、Chef、SaltStack
- **容器技术**：Docker、Podman、Kubernetes
- **CI/CD工具**：Jenkins、GitLab CI、GitHub Actions
- **基础设施管理**：Terraform、Packer、Vagrant
- **监控工具**：Prometheus、Zabbix、Nagios
- **日志管理**：ELK Stack、Fluentd、Graylog

## 2 任务调度自动化

### 2.1 Cron定时任务

Cron是Linux系统中最常用的任务调度工具，用于在指定时间执行命令或脚本。

**Cron语法格式:**
```
分钟 小时 日 月 星期 命令
*    *   *  *   *   command
```

每个字段的取值范围：
- 分钟：0-59
- 小时：0-23
- 日：1-31
- 月：1-12
- 星期：0-7（0和7都表示星期日）

**特殊字符:**
- `*`：任意值
- `,`：多个值，如 `1,3,5`
- `-`：范围，如 `1-5`
- `/`：步长，如 `*/10` 表示每10个单位

**Cron命令:**
```bash
# 编辑当前用户的cron任务
crontab -e

# 列出当前用户的cron任务
crontab -l

# 删除当前用户的cron任务
crontab -r

# 编辑指定用户的cron任务（需要root权限）
sudo crontab -e -u username

# 查看cron服务状态
sudo systemctl status cron

# 启动cron服务
sudo systemctl start cron

# 重启cron服务
sudo systemctl restart cron
```

**Cron示例:**
```bash
# 每分钟执行一次
* * * * * /path/to/script.sh

# 每小时执行一次（在每小时的0分）
0 * * * * /path/to/script.sh

# 每天凌晨2点执行
0 2 * * * /path/to/script.sh

# 每周一早上8点执行
0 8 * * 1 /path/to/script.sh

# 每月1号凌晨3点执行
0 3 1 * * /path/to/script.sh

# 工作日（周一到周五）上午9点执行
0 9 * * 1-5 /path/to/script.sh

# 每10分钟执行一次
*/10 * * * * /path/to/script.sh

# 每小时的第15和第45分钟执行
15,45 * * * * /path/to/script.sh

# 输出重定向到日志文件
* * * * * /path/to/script.sh >> /var/log/myscript.log 2>&1
```

**Cron环境变量:**
```bash
# 在cron任务中设置环境变量
SHELL=/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
MAILTO="admin@example.com"
HOME=/root

# 在脚本开头设置环境变量
* * * * * /bin/bash -c 'source ~/.bashrc && /path/to/script.sh'
```

### 2.2 Systemd Timer

Systemd Timer是systemd提供的任务调度机制，比cron更强大，支持更精确的时间控制和依赖关系。

**创建Timer单元:**
```bash
# 创建服务单元
sudo nano /etc/systemd/system/mytask.service

[Unit]
Description=My Task Service

[Service]
Type=simple
ExecStart=/path/to/script.sh
User=username
Group=groupname

# 创建定时器单元
sudo nano /etc/systemd/system/mytask.timer

[Unit]
Description=Run my task every hour
Requires=mytask.service

[Timer]
OnCalendar=hourly
Persistent=true

[Install]
WantedBy=timers.target
```

**Timer时间格式:**
```bash
# 每小时
OnCalendar=hourly

# 每天
OnCalendar=daily

# 每周
OnCalendar=weekly

# 每月
OnCalendar=monthly

# 每年
OnCalendar=yearly

# 具体时间
OnCalendar=*-*-* 02:00:00  # 每天凌晨2点
OnCalendar=Mon..Fri *-*-* 09:00:00  # 工作日上午9点
OnCalendar=*-*-01 00:00:00  # 每月1号午夜

# 相对时间
OnCalendar=5min  # 5分钟后
OnCalendar=2h  # 2小时后
OnCalendar=1day  # 1天后
```

**Timer管理命令:**
```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 启动定时器
sudo systemctl start mytask.timer

# 启用定时器（开机自启）
sudo systemctl enable mytask.timer

# 查看定时器状态
sudo systemctl status mytask.timer

# 列出所有定时器
systemctl list-timers

# 列出所有定时器（包括未启用的）
systemctl list-timers --all

# 查看下次执行时间
systemctl list-timers mytask.timer

# 停止定时器
sudo systemctl stop mytask.timer

# 禁用定时器
sudo systemctl disable mytask.timer
```

## 3 配置管理自动化

### 3.1 Ansible基础

Ansible是一个简单而强大的自动化工具，用于配置管理、应用部署和任务编排。

**安装Ansible:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ansible

# CentOS/RHEL/Fedora
sudo yum install ansible  # 或 dnf install ansible

# 使用pip安装
pip install ansible
```

**Ansible基本概念:**
- **控制节点**：运行Ansible的机器
- **受管节点**：被Ansible管理的机器
- **Inventory**：定义受管节点的列表
- **Playbook**：定义任务的YAML文件
- **模块**：执行特定功能的代码单元
- **角色**：组织Playbook和文件的结构

**Inventory配置:**
```bash
# 创建inventory文件
nano inventory

# 静态inventory示例
[webservers]
192.168.1.10
192.168.1.11

[databases]
192.168.1.20

[webservers:vars]
ansible_user=admin
ansible_ssh_private_key_file=~/.ssh/id_rsa

[all:vars]
ansible_python_interpreter=/usr/bin/python3
```

**Ad-hoc命令:**
```bash
# 检查连接
ansible all -i inventory -m ping

# 执行命令
ansible all -i inventory -m command -a "uptime"

# 安装软件包
ansible webservers -i inventory -m apt -a "name=nginx state=present"

# 复制文件
ansible webservers -i inventory -m copy -a "src=/etc/hosts dest=/tmp/hosts"

# 创建目录
ansible all -i inventory -m file -a "path=/tmp/testdir state=directory"

# 启动服务
ansible webservers -i inventory -m service -a "name=nginx state=started"
```

**Playbook示例:**
```yaml
# site.yml
---
- name: Configure web servers
  hosts: webservers
  become: yes
  vars:
    http_port: 80
    max_clients: 200
  
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present
        update_cache: yes
    
    - name: Create nginx config file
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify:
        - Restart nginx
    
    - name: Start nginx service
      service:
        name: nginx
        state: started
        enabled: yes
  
  handlers:
    - name: Restart nginx
      service:
        name: nginx
        state: restarted
```

**执行Playbook:**
```bash
# 检查语法
ansible-playbook -i inventory site.yml --syntax-check

# 干运行（不实际执行）
ansible-playbook -i inventory site.yml --check

# 执行playbook
ansible-playbook -i inventory site.yml

# 指定用户
ansible-playbook -i inventory site.yml -u admin

# 使用sudo
ansible-playbook -i inventory site.yml --ask-become-pass

# 限制执行的主机
ansible-playbook -i inventory site.yml --limit "192.168.1.10"

# 并行执行
ansible-playbook -i inventory site.yml -f 10
```

### 3.2 Ansible高级用法

**变量和模板:**
```yaml
# vars.yml
---
http_port: 80
server_name: example.com
document_root: /var/www/html

# 使用变量
- name: Configure nginx
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/default
  vars:
    port: "{{ http_port }}"
    name: "{{ server_name }}"
```

**模板文件示例 (nginx.conf.j2):**
```jinja2
server {
    listen {{ http_port }};
    server_name {{ server_name }};
    
    root {{ document_root }};
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    }
}
```

**条件语句:**
```yaml
- name: Install Apache on Ubuntu
  apt:
    name: apache2
    state: present
  when: ansible_os_family == "Debian"

- name: Install Apache on CentOS
  yum:
    name: httpd
    state: present
  when: ansible_os_family == "RedHat"
```

**循环:**
```yaml
- name: Install multiple packages
  apt:
    name: "{{ item }}"
    state: present
  loop:
    - nginx
    - php-fpm
    - mysql-server

- name: Create multiple users
  user:
    name: "{{ item.name }}"
    state: present
    groups: "{{ item.groups }}"
  loop:
    - { name: 'alice', groups: 'sudo' }
    - { name: 'bob', groups: 'users' }
```

**角色结构:**
```
roles/
├── common/
│   ├── defaults/
│   │   └── main.yml
│   ├── files/
│   ├── handlers/
│   │   └── main.yml
│   ├── meta/
│   │   └── main.yml
│   ├── tasks/
│   │   └── main.yml
│   ├── templates/
│   └── vars/
│       └── main.yml
└── webservers/
    ├── tasks/
    │   └── main.yml
    └── templates/
        └── nginx.conf.j2
```

**使用角色:**
```yaml
# site.yml
---
- name: Configure common settings
  hosts: all
  roles:
    - common

- name: Configure web servers
  hosts: webservers
  roles:
    - webservers
```

## 4 容器化与编排自动化

### 4.1 Docker自动化

**Dockerfile自动化构建:**
```dockerfile
# Dockerfile
FROM ubuntu:20.04

# 设置环境变量
ENV DEBIAN_FRONTEND=noninteractive
ENV APP_HOME=/app

# 安装依赖
RUN apt-get update && \
    apt-get install -y python3 python3-pip nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 创建应用目录
WORKDIR $APP_HOME

# 复制应用代码
COPY . $APP_HOME

# 安装Python依赖
RUN pip3 install -r requirements.txt

# 复制nginx配置
COPY nginx.conf /etc/nginx/sites-available/default

# 暴露端口
EXPOSE 80

# 启动脚本
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 启动命令
CMD ["/start.sh"]
```

**Docker Compose自动化:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "80:80"
    volumes:
      - ./app:/app
    environment:
      - DEBUG=0
      - DATABASE_URL=postgresql://dbuser:dbpass@db:5432/mydb
    depends_on:
      - db
      - redis
    restart: unless-stopped

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=mydb
      - POSTGRES_USER=dbuser
      - POSTGRES_PASSWORD=dbpass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:6-alpine
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

**Docker自动化脚本:**
```bash
#!/bin/bash
# build_and_deploy.sh

set -e

# 配置变量
IMAGE_NAME="myapp"
IMAGE_TAG="latest"
CONTAINER_NAME="myapp_container"
PORT="8080"

# 构建镜像
echo "Building Docker image..."
docker build -t $IMAGE_NAME:$IMAGE_TAG .

# 停止并删除旧容器
if docker ps -a --format 'table {{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    echo "Stopping and removing existing container..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# 启动新容器
echo "Starting new container..."
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:80 \
    -e DEBUG=0 \
    -v /var/log/myapp:/app/logs \
    $IMAGE_NAME:$IMAGE_TAG

# 检查容器状态
echo "Checking container status..."
sleep 5
if docker ps --format 'table {{.Names}}' | grep -q "^$CONTAINER_NAME$"; then
    echo "Container is running successfully!"
    echo "Application is available at http://localhost:$PORT"
else
    echo "Container failed to start!"
    docker logs $CONTAINER_NAME
    exit 1
fi
```

### 4.2 Kubernetes自动化

**Kubernetes部署文件:**
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 80
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: database-url
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

**Kubernetes自动化脚本:**
```bash
#!/bin/bash
# k8s_deploy.sh

set -e

# 配置变量
NAMESPACE="myapp"
DEPLOYMENT_FILE="deployment.yaml"
SECRET_FILE="secrets.yaml"

# 创建命名空间
echo "Creating namespace..."
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# 应用密钥
echo "Applying secrets..."
kubectl apply -f $SECRET_FILE -n $NAMESPACE

# 应用部署配置
echo "Applying deployment..."
kubectl apply -f $DEPLOYMENT_FILE -n $NAMESPACE

# 等待部署完成
echo "Waiting for deployment to be ready..."
kubectl rollout status deployment/myapp-deployment -n $NAMESPACE --timeout=300s

# 获取服务URL
echo "Getting service URL..."
SERVICE_URL=$(kubectl get service myapp-service -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

if [ -z "$SERVICE_URL" ]; then
    echo "Service external IP not yet assigned. Using port-forward..."
    kubectl port-forward service/myapp-service 8080:80 -n $NAMESPACE &
    PF_PID=$!
    echo "Application available at http://localhost:8080"
    echo "To stop port-forward, run: kill $PF_PID"
else
    echo "Application available at http://$SERVICE_URL"
fi

# 显示部署状态
echo "Deployment status:"
kubectl get pods -n $NAMESPACE -l app=myapp
```

## 5 CI/CD流水线自动化

### 5.1 Jenkins流水线

**Jenkinsfile示例:**
```groovy
pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'myapp'
        DOCKER_TAG = 'latest'
        REGISTRY = 'registry.example.com'
        CREDENTIALS_ID = 'docker-registry-creds'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'test-results.xml'
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                sh 'npm audit'
                sh 'docker run --rm -v $(pwd):/app clair-scanner:latest'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", CREDENTIALS_ID) {
                        def image = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        image.push()
                        image.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sh """
                    kubectl set image deployment/myapp-staging myapp=${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} -n staging
                    kubectl rollout status deployment/myapp-staging -n staging
                """
            }
        }
        
        stage('Integration Tests') {
            steps {
                sh 'npm run integration-tests'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            input {
                message "Deploy to production?"
            }
            steps {
                sh """
                    kubectl set image deployment/myapp-production myapp=${REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} -n production
                    kubectl rollout status deployment/myapp-production -n production
                """
            }
        }
    }
    
    post {
        success {
            slackSend(
                color: 'good',
                message: "Deployment successful: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
        
        failure {
            slackSend(
                color: 'danger',
                message: "Deployment failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}"
            )
        }
    }
}
```

### 5.2 GitLab CI/CD

**.gitlab-ci.yml示例:**
```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - security
  - deploy-staging
  - integration-test
  - deploy-production

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE
  DOCKER_TAG: $CI_COMMIT_SHA

build:
  stage: build
  image: node:14
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

unit-test:
  stage: test
  image: node:14
  script:
    - npm install
    - npm test
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      junit: test-results.xml
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

code-quality:
  stage: test
  image: docker:stable
  services:
    - docker:stable-dind
  script:
    - docker run
        --env CODECLIMATE_CODE="$PWD"
        --volume "$PWD":/code
        --volume /var/run/docker.sock:/var/run/docker.sock
        "registry.gitlab.com/gitlab-org/security-products/codequality:0.85.9" /code
  artifacts:
    reports:
      codequality: gl-code-quality-report.json

sast:
  stage: security
  image: docker:stable
  services:
    - docker:stable-dind
  script:
    - docker run
        --env SAST_CONFIDENCE_LEVEL="${SAST_CONFIDENCE_LEVEL:-3}"
        --volume "$PWD":/code
        --volume /var/run/docker.sock:/var/run/docker.sock
        "registry.gitlab.com/gitlab-org/security-products/sast:latest" /code
  artifacts:
    reports:
      sast: gl-sast-report.json

container-scanning:
  stage: security
  image: docker:stable
  services:
    - docker:stable-dind
  script:
    - docker build -t $DOCKER_IMAGE:$DOCKER_TAG .
    - docker run
        --env CI_PROJECT_DIR="$PWD"
        --volume "$PWD":/code
        --volume /var/run/docker.sock:/var/run/docker.sock
        "registry.gitlab.com/gitlab-org/security-products/container-scanning:3" /code
  artifacts:
    reports:
      container_scanning: gl-container-scanning-report.json

dependency-scanning:
  stage: security
  image: docker:stable
  services:
    - docker:stable-dind
  script:
    - docker run
        --env DEP_SCAN_DISABLE_REMOTE_CHECKS="${DEP_SCAN_DISABLE_REMOTE_CHECKS:-false}"
        --env CI_PROJECT_DIR="$PWD"
        --volume "$PWD":/code
        --volume /var/run/docker.sock:/var/run/docker.sock
        "registry.gitlab.com/gitlab-org/security-products/dependency-scanning:3" /code
  artifacts:
    reports:
      dependency_scanning: gl-dependency-scanning-report.json

deploy-staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context $KUBE_CONTEXT_STAGING
    - kubectl set image deployment/myapp myapp=$DOCKER_IMAGE:$DOCKER_TAG -n staging
    - kubectl rollout status deployment/myapp -n staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - main
    - develop

integration-test:
  stage: integration-test
  image: node:14
  script:
    - npm install
    - npm run integration-tests
  environment:
    name: staging
  only:
    - main
    - develop

deploy-production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context $KUBE_CONTEXT_PRODUCTION
    - kubectl set image deployment/myapp myapp=$DOCKER_IMAGE:$DOCKER_TAG -n production
    - kubectl rollout status deployment/myapp -n production
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main
```

## 6 基础设施即代码

### 6.1 Terraform基础

Terraform是一个基础设施即代码工具，用于安全、高效地构建、更改和版本化基础设施。

**Terraform配置示例:**
```hcl
# main.tf
provider "aws" {
  region = "us-west-2"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "main-vpc"
    Environment = "production"
  }
}

resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "public-subnet"
  }
}

resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Allow web traffic"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]
  
  tags = {
    Name = "web-server"
  }
}
```

**Terraform命令:**
```bash
# 初始化工作目录
terraform init

# 格式化配置文件
terraform fmt

# 验证配置文件
terraform validate

# 查看执行计划
terraform plan

# 应用配置
terraform apply

# 销毁资源
terraform destroy

# 导入现有资源
terraform import aws_instance.web i-1234567890abcdef0

# 查看状态
terraform show

# 刷新状态文件
terraform refresh

# 输出变量
terraform output
```

### 6.2 模块化和变量

**变量定义:**
```hcl
# variables.tf
variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}
```

**输出定义:**
```hcl
# outputs.tf
output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "web_instance_id" {
  description = "ID of the web server instance"
  value       = aws_instance.web.id
}
```

**模块使用:**
```hcl
# main.tf
module "vpc" {
  source = "./modules/vpc"
  
  region = var.region
  cidr   = var.vpc_cidr
  
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  
  tags = {
    Environment = "production"
    Project     = "web-app"
  }
}

module "security_groups" {
  source = "./modules/security-groups"
  
  vpc_id = module.vpc.vpc_id
  
  tags = {
    Environment = "production"
    Project     = "web-app"
  }
}

module "web_servers" {
  source = "./modules/web-servers"
  
  vpc_id              = module.vpc.vpc_id
  subnet_ids          = module.vpc.public_subnet_ids
  security_group_id   = module.security_groups.web_sg_id
  instance_type       = var.instance_type
  ami_id              = var.ami_id
  key_pair_name       = var.key_pair_name
  user_data           = file("./scripts/web-server-init.sh")
  
  count               = var.web_server_count
  
  tags = {
    Environment = "production"
    Project     = "web-app"
    Role        = "web-server"
  }
}
```

## 7 监控与告警自动化

### 7.1 Prometheus自动化配置

**Prometheus配置:**
```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'docker'
    static_configs:
      - targets: ['docker-exporter:9323']

  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
```

**告警规则:**
```yaml
# rules/node.yml
groups:
  - name: node
    rules:
      - alert: InstanceDown
        expr: up == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Instance {{ $labels.instance }} is down"
          description: "{{ $labels.instance }} has been down for more than 5 minutes."

      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage on {{ $labels.instance }}"
          description: "CPU usage is above 80% for more than 5 minutes."

      - alert: HighMemoryUsage
        expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage on {{ $labels.instance }}"
          description: "Memory usage is above 90% for more than 5 minutes."
```

### 7.2 自动化监控脚本

```bash
#!/bin/bash
# setup_monitoring.sh

set -e

# 配置变量
PROMETHEUS_VERSION="2.30.3"
NODE_EXPORTER_VERSION="1.2.2"
ALERTMANAGER_VERSION="0.23.0"
GRAFANA_VERSION="8.3.3"

# 安装Prometheus
echo "Installing Prometheus..."
wget https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz
tar xvfz prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz
sudo cp prometheus-${PROMETHEUS_VERSION}.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-${PROMETHEUS_VERSION}.linux-amd64/promtool /usr/local/bin/
sudo mkdir -p /etc/prometheus /var/lib/prometheus
sudo cp prometheus-${PROMETHEUS_VERSION}.linux-amd64/prometheus.yml /etc/prometheus/
sudo cp -r prometheus-${PROMETHEUS_VERSION}.linux-amd64/consoles /etc/prometheus/
sudo cp -r prometheus-${PROMETHEUS_VERSION}.linux-amd64/console_libraries /etc/prometheus/

# 创建Prometheus系统服务
sudo tee /etc/systemd/system/prometheus.service > /dev/null <<EOF
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \\
    --config.file /etc/prometheus/prometheus.yml \\
    --storage.tsdb.path /var/lib/prometheus/ \\
    --web.console.templates=/etc/prometheus/consoles \\
    --web.console.libraries=/etc/prometheus/console_libraries \\
    --web.listen-address=0.0.0.0:9090 \\
    --web.enable-lifecycle

[Install]
WantedBy=multi-user.target
EOF

# 创建Prometheus用户
sudo useradd --no-create-home --shell /bin/false prometheus
sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus

# 安装Node Exporter
echo "Installing Node Exporter..."
wget https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz
tar xvfz node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz
sudo cp node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64/node_exporter /usr/local/bin/

# 创建Node Exporter系统服务
sudo tee /etc/systemd/system/node_exporter.service > /dev/null <<EOF
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

# 创建Node Exporter用户
sudo useradd --no-create-home --shell /bin/false node_exporter

# 启动服务
sudo systemctl daemon-reload
sudo systemctl enable prometheus
sudo systemctl start prometheus
sudo systemctl enable node_exporter
sudo systemctl start node_exporter

# 安装Grafana
echo "Installing Grafana..."
sudo apt-get install -y apt-transport-https software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y grafana

# 启动Grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server

echo "Monitoring setup complete!"
echo "Prometheus: http://localhost:9090"
echo "Grafana: http://localhost:3000 (admin/admin)"
```

## 8 实践练习

### 练习1：自动化系统更新脚本

编写一个脚本，自动更新系统并记录更新日志，包括：
1. 检查可用更新
2. 安装安全更新
3. 重启必要的服务
4. 发送更新报告邮件

### 练习2：自动化应用部署

使用Ansible编写一个Playbook，实现以下功能：
1. 在多台服务器上部署Web应用
2. 配置负载均衡
3. 设置数据库复制
4. 配置监控和日志收集

### 练习3：Docker容器编排

使用Docker Compose创建一个多容器应用，包括：
1. Web服务器
2. 数据库
3. 缓存服务
4. 监控服务
5. 自动化部署脚本

### 练习4：CI/CD流水线

使用Jenkins或GitLab CI创建一个完整的CI/CD流水线，包括：
1. 代码检查和测试
2. 安全扫描
3. 构建Docker镜像
4. 自动部署到测试环境
5. 手动部署到生产环境

### 练习5：基础设施自动化

使用Terraform创建一个完整的基础设施，包括：
1. VPC和子网
2. 安全组和网络ACL
3. 负载均衡器
4. 自动扩展组
5. 数据库实例

## 9 总结

本章详细介绍了Linux系统中的自动化运维技术，包括任务调度、配置管理、容器化、CI/CD、基础设施即代码和监控自动化。通过学习本章内容，读者应该能够：

1. 理解自动化运维的价值和重要性
2. 掌握各种自动化工具的使用方法
3. 能够设计和实现自动化运维流程
4. 了解现代DevOps实践和工具链
5. 具备构建自动化运维系统的能力

自动化运维是现代IT运维的核心，通过合理使用自动化工具和技术，可以显著提高运维效率、降低错误率、提升系统可靠性。随着技术的发展，自动化运维将继续向智能化、自愈化方向发展，为IT系统管理带来更多可能性。