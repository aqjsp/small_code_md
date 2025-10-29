# 数据库设计

## 1. 数据库设计概述

### 1.1 数据库设计的重要性

数据库设计是构建高效、可靠、可扩展数据库系统的关键环节。良好的数据库设计能够：

- **提高数据一致性**：通过规范化减少数据冗余，确保数据完整性
- **提升查询性能**：合理的表结构和索引设计可以显著提高查询效率
- **增强系统可维护性**：清晰的结构设计使系统更易于理解和维护
- **支持业务扩展**：灵活的设计能够适应业务需求的变化和增长
- **降低开发成本**：良好的设计可以减少后期的重构和维护工作

### 1.2 数据库设计的基本原则

1. **规范化原则**：遵循数据库范式，消除数据冗余
2. **性能优先原则**：在满足规范化的前提下，考虑查询性能
3. **可扩展性原则**：设计应考虑未来的业务扩展需求
4. **安全性原则**：设计应包含必要的安全控制机制
5. **一致性原则**：确保数据的完整性和一致性

### 1.3 数据库设计流程

数据库设计通常遵循以下步骤：

1. **需求分析**：理解业务需求和数据需求
2. **概念设计**：创建概念模型（如ER图）
3. **逻辑设计**：将概念模型转换为逻辑模型（关系模型）
4. **物理设计**：确定物理存储结构和访问方法
5. **实施与测试**：创建数据库并进行测试
6. **优化与维护**：根据实际使用情况进行优化

## 2. 需求分析

### 2.1 业务需求收集

#### 2.1.1 需求收集方法

1. **访谈法**：与业务人员、用户进行深入交流
2. **问卷调查**：通过问卷收集用户需求
3. **文档分析**：分析现有文档、报表和工作流程
4. **观察法**：观察实际业务操作过程
5. **原型法**：通过原型系统收集反馈

#### 2.1.2 需求分析要点

1. **功能需求**：系统需要完成的功能
2. **数据需求**：系统需要存储和管理的数据
3. **性能需求**：系统的响应时间、吞吐量要求
4. **安全需求**：数据访问控制和保密性要求
5. **扩展需求**：未来可能的业务扩展方向

### 2.2 数据需求分析

#### 2.2.1 数据实体识别

数据实体是现实世界中可以区分的对象或概念。识别实体的方法：

1. **名词分析法**：从需求文档中提取名词
2. **业务对象法**：识别业务流程中的核心对象
3. **报表分析法**：分析报表中的数据项

#### 2.2.2 实体属性分析

每个实体具有多个属性，属性分析包括：

1. **属性识别**：确定实体的所有属性
2. **属性类型**：确定每个属性的数据类型和长度
3. **属性约束**：确定属性的约束条件（非空、唯一等）
4. **属性关系**：确定属性之间的关系

#### 2.2.3 实体关系分析

实体之间的关系包括：

1. **一对一关系**：一个实体实例最多与另一个实体实例关联
2. **一对多关系**：一个实体实例可以与多个另一个实体实例关联
3. **多对多关系**：多个实体实例可以与多个另一个实体实例关联

### 2.3 需求文档示例

```markdown
# 电商系统需求分析

## 1. 业务概述
设计一个电商系统，支持商品管理、订单处理、用户管理和支付功能。

## 2. 功能需求
### 2.1 用户管理
- 用户注册和登录
- 用户信息管理
- 用户地址管理

### 2.2 商品管理
- 商品信息管理
- 商品分类管理
- 商品库存管理

### 2.3 订单管理
- 订单创建
- 订单查询
- 订单状态更新

### 2.4 支付管理
- 支付方式管理
- 支付记录
- 退款处理

## 3. 数据需求
### 3.1 核心实体
- 用户(User)
- 商品(Product)
- 订单(Order)
- 订单项(OrderItem)
- 支付(Payment)

### 3.2 实体关系
- 用户与订单：一对多关系
- 订单与订单项：一对多关系
- 商品与订单项：一对多关系
- 订单与支付：一对一关系

## 4. 性能需求
- 系统支持1000并发用户
- 查询响应时间小于2秒
- 订单处理能力达到1000笔/分钟

## 5. 安全需求
- 用户密码加密存储
- 敏感数据传输加密
- 支付信息符合PCI DSS标准
```

## 3. 概念设计

### 3.1 实体-关系模型

实体-关系模型（ER模型）是概念设计的主要工具，它使用实体、属性和关系来描述现实世界的数据结构。

#### 3.1.1 ER模型基本元素

1. **实体**：现实世界中可以区分的对象
2. **属性**：实体的特征或性质
3. **关系**：实体之间的联系
4. **标识符**：唯一标识实体的属性或属性集

#### 3.1.2 ER模型表示方法

1. **矩形**：表示实体
2. **椭圆形**：表示属性
3. **菱形**：表示关系
4. **线段**：连接实体与属性、实体与关系

### 3.2 ER图设计

#### 3.2.1 电商系统ER图

```
+-------------+       +-----------+       +-------------+
|   User      |       |  Order    |       |  Payment    |
|-------------|       |-----------|       |-------------|
| user_id (PK)|-------| order_id  |-------| payment_id  |
| username    |1      | user_id   |1      | order_id    |
| password    |-------| order_date|-------| amount      |
| email       |       | status    |       | payment_date|
| phone       |       | total     |       | method      |
+-------------+       +-----------+       +-------------+
       |                     |                     |
       |                     |1                    |
       |1                    |                     |
       |                     |                     |
+-------------+       +-----------+       +-------------+
|   Address   |       |OrderItem  |       |  Product    |
|-------------|       |-----------|       |-------------|
| address_id  |       | item_id   |-------| product_id  |
| user_id     |1      | order_id  |N      | name        |
| province    |-------| product_id|1      | description |
| city        |N      | quantity  |       | price       |
| district    |       | price     |       | stock       |
| street      |       +-----------+       +-------------+
| zip_code    |
| is_default  |
+-------------+
```

#### 3.2.2 ER模型转换为关系模型

1. **实体转换**：每个实体转换为一张表
2. **属性转换**：实体的属性转换为表的列
3. **关系转换**：
   - 一对多关系：在"多"端添加外键
   - 一对一关系：在其中一端添加外键
   - 多对多关系：创建关联表

### 3.3 概念设计示例

#### 3.3.1 图书馆管理系统概念设计

```sql
-- 实体：图书(Book)
CREATE TABLE Book (
    book_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    publisher VARCHAR(100),
    publish_date DATE,
    isbn VARCHAR(20) UNIQUE,
    category_id INT,
    location VARCHAR(50)
);

-- 实体：读者(Reader)
CREATE TABLE Reader (
    reader_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address VARCHAR(255),
    register_date DATE,
    status ENUM('active', 'suspended', 'expired')
);

-- 实体：借阅记录(Borrow)
CREATE TABLE Borrow (
    borrow_id INT PRIMARY KEY,
    reader_id INT,
    book_id INT,
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    fine DECIMAL(10, 2),
    status ENUM('borrowed', 'returned', 'overdue')
);

-- 实体：图书分类(Category)
CREATE TABLE Category (
    category_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_category_id INT
);

-- 关系：图书与分类（多对一）
ALTER TABLE Book ADD FOREIGN KEY (category_id) REFERENCES Category(category_id);

-- 关系：读者与借阅记录（一对多）
ALTER TABLE Borrow ADD FOREIGN KEY (reader_id) REFERENCES Reader(reader_id);

-- 关系：图书与借阅记录（一对多）
ALTER TABLE Borrow ADD FOREIGN KEY (book_id) REFERENCES Book(book_id);

-- 关系：分类与父分类（自引用，多对一）
ALTER TABLE Category ADD FOREIGN KEY (parent_category_id) REFERENCES Category(category_id);
```

## 4. 逻辑设计

### 4.1 关系模型设计

关系模型是逻辑设计的核心，它使用表（关系）、行（元组）和列（属性）来表示数据。

#### 4.1.1 关系模型基本概念

1. **关系（表）**：由行和列组成的二维表
2. **元组（行）**：表中的一条记录
3. **属性（列）**：表中的一个字段
4. **域**：属性的取值范围
5. **键**：唯一标识元组的属性或属性集

#### 4.1.2 关系完整性

1. **实体完整性**：主键值不能为空
2. **参照完整性**：外键值必须引用存在的元组
3. **域完整性**：属性值必须符合域的定义
4. **用户定义完整性**：特定业务规则的约束

### 4.2 数据库规范化

数据库规范化是减少数据冗余、提高数据一致性的过程。

#### 4.2.1 第一范式（1NF）

**定义**：表中的所有属性都是原子的，不可再分。

**示例**：

```sql
-- 不符合1NF的设计
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    courses VARCHAR(255)  -- 存储多门课程，如"数学,物理,化学"
);

-- 符合1NF的设计
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE StudentCourse (
    id INT PRIMARY KEY,
    student_id INT,
    course_name VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
);
```

#### 4.2.2 第二范式（2NF）

**定义**：在满足1NF的基础上，非主属性完全依赖于主键。

**示例**：

```sql
-- 不符合2NF的设计
CREATE TABLE Order (
    order_id INT PRIMARY KEY,
    product_id INT,
    customer_id INT,
    order_date DATE,
    product_name VARCHAR(100),  -- 部分依赖于product_id
    customer_name VARCHAR(100), -- 部分依赖于customer_id
    quantity INT,
    price DECIMAL(10, 2)
);

-- 符合2NF的设计
CREATE TABLE Order (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE OrderItem (
    item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Order(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

CREATE TABLE Product (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100)
);
```

#### 4.2.3 第三范式（3NF）

**定义**：在满足2NF的基础上，非主属性不传递依赖于主键。

**示例**：

```sql
-- 不符合3NF的设计
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    department_name VARCHAR(100),  -- 传递依赖于employee_id
    manager_id INT
);

-- 符合3NF的设计
CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    manager_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(department_id)
);

CREATE TABLE Department (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);
```

#### 4.2.4 BCNF（Boyce-Codd范式）

**定义**：在满足3NF的基础上，每个决定因素都包含候选键。

#### 4.2.5 第四范式（4NF）

**定义**：在满足BCNF的基础上，消除多值依赖。

#### 4.2.6 第五范式（5NF）

**定义**：在满足4NF的基础上，消除连接依赖。

### 4.3 反规范化

反规范化是为了提高查询性能而有意违反规范化原则的过程。

#### 4.3.1 反规范化技术

1. **添加冗余列**：在一个表中添加另一个表的列
2. **添加计算列**：存储计算结果而非每次计算
3. **表合并**：将经常一起查询的表合并
4. **表分割**：将大表分割为多个小表
5. **复制表**：复制表到不同位置以提高访问速度

#### 4.3.2 反规范化示例

```sql
-- 规范化设计
CREATE TABLE Product (
    product_id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TABLE Category (
    category_id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE OrderItem (
    item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Order(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- 反规范化设计：在OrderItem中添加产品名称
CREATE TABLE OrderItem (
    item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),  -- 冗余列，避免连接查询
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Order(order_id),
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);
```

### 4.4 逻辑设计示例

#### 4.4.1 电商系统逻辑设计

```sql
-- 用户表
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    gender ENUM('male', 'female', 'other'),
    birthday DATE,
    register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_time TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
);

-- 用户地址表
CREATE TABLE Address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    receiver_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    street VARCHAR(255) NOT NULL,
    zip_code VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- 商品分类表
CREATE TABLE Category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id INT NULL,
    level INT NOT NULL DEFAULT 1,
    sort_order INT DEFAULT 0,
    is_show BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (parent_id) REFERENCES Category(category_id) ON DELETE SET NULL
);

-- 商品表
CREATE TABLE Product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    sales INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    status ENUM('on_sale', 'off_shelf', 'deleted') DEFAULT 'on_sale',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- 订单表
CREATE TABLE `Order` (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_no VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('alipay', 'wechat', 'credit_card', 'cash') NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0,
    receiver_name VARCHAR(50) NOT NULL,
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_time TIMESTAMP NULL,
    shipping_time TIMESTAMP NULL,
    delivery_time TIMESTAMP NULL,
    cancel_time TIMESTAMP NULL,
    cancel_reason VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- 订单项表
CREATE TABLE OrderItem (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,  -- 冗余字段，避免连接查询
    product_image VARCHAR(500),
    current_price DECIMAL(10, 2) NOT NULL,  -- 下单时的价格
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- 支付记录表
CREATE TABLE Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_no VARCHAR(50) NOT NULL UNIQUE,
    payment_method ENUM('alipay', 'wechat', 'credit_card', 'cash') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'success', 'failed', 'cancelled') DEFAULT 'pending',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    success_time TIMESTAMP NULL,
    third_party_trade_no VARCHAR(100),
    remark VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id)
);

-- 购物车表
CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    selected BOOLEAN DEFAULT TRUE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(product_id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, product_id)
);

-- 商品评论表
CREATE TABLE Review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    content TEXT,
    image_urls JSON,
    is_anonymous BOOLEAN DEFAULT FALSE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Product(product_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (order_id) REFERENCES `Order`(order_id)
);
```

## 5. 物理设计

### 5.1 存储引擎选择

MySQL支持多种存储引擎，不同的存储引擎有不同的特性和适用场景。

#### 5.1.1 InnoDB存储引擎

**特点**：
- 支持事务（ACID）
- 支持外键
- 支持行级锁
- 支持崩溃恢复
- 支持热备份

**适用场景**：
- 需要事务支持的应用
- 高并发读写应用
- 数据完整性要求高的应用

```sql
-- 创建InnoDB表
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
```

#### 5.1.2 MyISAM存储引擎

**特点**：
- 不支持事务
- 支持表级锁
- 支持全文索引（MySQL 5.6前）
- 压缩表支持
- 读取速度快

**适用场景**：
- 读多写少的应用
- 不需要事务支持的应用
- 大数据量的日志或归档数据

```sql
-- 创建MyISAM表
CREATE TABLE log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    level VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM;
```

#### 5.1.3 Memory存储引擎

**特点**：
- 数据存储在内存中
- 读取速度极快
- 不支持事务
- 服务器重启后数据丢失

**适用场景**：
- 临时数据
- 缓存数据
- 快速查找表

```sql
-- 创建Memory表
CREATE TABLE cache (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    expire_time TIMESTAMP
) ENGINE=Memory;
```

### 5.2 数据类型选择

选择合适的数据类型可以节省存储空间，提高查询性能。

#### 5.2.1 数值类型

```sql
-- 整数类型
CREATE TABLE numeric_types (
    tinyint_col TINYINT,      -- 1字节，-128到127或0到255
    smallint_col SMALLINT,    -- 2字节，-32768到32767或0到65535
    mediumint_col MEDIUMINT,   -- 3字节
    int_col INT,              -- 4字节
    bigint_col BIGINT         -- 8字节
);

-- 浮点类型
CREATE TABLE float_types (
    float_col FLOAT,          -- 4字节
    double_col DOUBLE,        -- 8字节
    decimal_col DECIMAL(10, 2) -- 精确数值类型
);
```

#### 5.2.2 字符串类型

```sql
-- 字符串类型
CREATE TABLE string_types (
    char_col CHAR(10),        -- 固定长度字符串
    varchar_col VARCHAR(255),  -- 可变长度字符串
    text_col TEXT,            -- 长文本
    tinytext_col TINYTEXT,    -- 短文本
    mediumtext_col MEDIUMTEXT, -- 中等长度文本
    longtext_col LONGTEXT     -- 长文本
);
```

#### 5.2.3 日期时间类型

```sql
-- 日期时间类型
CREATE TABLE datetime_types (
    date_col DATE,            -- 日期 'YYYY-MM-DD'
    time_col TIME,            -- 时间 'HH:MM:SS'
    datetime_col DATETIME,    -- 日期时间 'YYYY-MM-DD HH:MM:SS'
    timestamp_col TIMESTAMP,  -- 时间戳，范围较小
    year_col YEAR             -- 年份 'YYYY'
);
```

### 5.3 索引设计

索引是提高查询性能的重要手段，但会增加写操作的开销。

#### 5.3.1 主键索引

```sql
-- 创建主键索引
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 自动创建主键索引
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- 或者使用CONSTRAINT定义
CREATE TABLE user (
    id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);
```

#### 5.3.2 唯一索引

```sql
-- 创建唯一索引
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    UNIQUE KEY uk_username (username),  -- 唯一索引
    UNIQUE KEY uk_email (email)
);

-- 或者使用ALTER TABLE添加
ALTER TABLE user ADD UNIQUE KEY uk_username (username);
```

#### 5.3.3 普通索引

```sql
-- 创建普通索引
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    KEY idx_category (category_id),  -- 普通索引
    KEY idx_name (name)
);

-- 或者使用CREATE INDEX
CREATE INDEX idx_category ON product(category_id);
```

#### 5.3.4 复合索引

```sql
-- 创建复合索引
CREATE TABLE order_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    KEY idx_order_product (order_id, product_id)  -- 复合索引
);
```

#### 5.3.5 全文索引

```sql
-- 创建全文索引（仅MyISAM和InnoDB支持）
CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    FULLTEXT KEY ft_title_content (title, content)  -- 全文索引
) ENGINE=MyISAM;
```

### 5.4 分区设计

分区是将大表分割为多个小表的技术，可以提高查询性能和管理效率。

#### 5.4.1 范围分区

```sql
-- 按日期范围分区
CREATE TABLE sales (
    id INT AUTO_INCREMENT,
    order_date DATE NOT NULL,
    customer_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id, order_date)
)
PARTITION BY RANGE (YEAR(order_date)) (
    PARTITION p2020 VALUES LESS THAN (2021),
    PARTITION p2021 VALUES LESS THAN (2022),
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

#### 5.4.2 列表分区

```sql
-- 按地区列表分区
CREATE TABLE customers (
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    region VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    PRIMARY KEY (id, region)
)
PARTITION BY LIST COLUMNS(region) (
    PARTITION p_east VALUES IN ('北京', '上海', '江苏', '浙江'),
    PARTITION p_south VALUES IN ('广东', '福建', '海南'),
    PARTITION p_west VALUES IN ('四川', '云南', '西藏'),
    PARTITION p_north VALUES IN ('黑龙江', '吉林', '辽宁'),
    PARTITION p_other VALUES IN (DEFAULT)
);
```

#### 5.4.3 哈希分区

```sql
-- 按哈希分区
CREATE TABLE logs (
    id INT AUTO_INCREMENT,
    log_time TIMESTAMP NOT NULL,
    message TEXT,
    PRIMARY KEY (id, log_time)
)
PARTITION BY HASH (YEAR(log_time))
PARTITIONS 4;
```

### 5.5 物理设计示例

#### 5.5.1 大表物理设计

```sql
-- 用户行为日志表（大数据量，写多读少）
CREATE TABLE user_behavior_log (
    id BIGINT AUTO_INCREMENT,
    user_id INT NOT NULL,
    action_type ENUM('login', 'logout', 'view', 'click', 'purchase') NOT NULL,
    action_time TIMESTAMP NOT NULL,
    page_url VARCHAR(500),
    referer_url VARCHAR(500),
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(100),
    extra_data JSON,
    PRIMARY KEY (id, action_time),
    KEY idx_user_action_time (user_id, action_time),
    KEY idx_action_type (action_type)
)
ENGINE=InnoDB
PARTITION BY RANGE (UNIX_TIMESTAMP(action_time)) (
    PARTITION p202301 VALUES LESS THAN (UNIX_TIMESTAMP('2023-02-01')),
    PARTITION p202302 VALUES LESS THAN (UNIX_TIMESTAMP('2023-03-01')),
    PARTITION p202303 VALUES LESS THAN (UNIX_TIMESTAMP('2023-04-01')),
    PARTITION p202304 VALUES LESS THAN (UNIX_TIMESTAMP('2023-05-01')),
    PARTITION p202305 VALUES LESS THAN (UNIX_TIMESTAMP('2023-06-01')),
    PARTITION p202306 VALUES LESS THAN (UNIX_TIMESTAMP('2023-07-01')),
    PARTITION p202307 VALUES LESS THAN (UNIX_TIMESTAMP('2023-08-01')),
    PARTITION p202308 VALUES LESS THAN (UNIX_TIMESTAMP('2023-09-01')),
    PARTITION p202309 VALUES LESS THAN (UNIX_TIMESTAMP('2023-10-01')),
    PARTITION p202310 VALUES LESS THAN (UNIX_TIMESTAMP('2023-11-01')),
    PARTITION p202311 VALUES LESS THAN (UNIX_TIMESTAMP('2023-12-01')),
    PARTITION p202312 VALUES LESS THAN (UNIX_TIMESTAMP('2024-01-01')),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);
```

#### 5.5.2 高并发表物理设计

```sql
-- 订单表（高并发，事务要求高）
CREATE TABLE orders (
    order_id BIGINT AUTO_INCREMENT,
    order_no VARCHAR(32) NOT NULL,
    user_id INT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status TINYINT NOT NULL DEFAULT 0,
    create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id),
    UNIQUE KEY uk_order_no (order_no),
    KEY idx_user_status (user_id, status),
    KEY idx_create_time (create_time)
) ENGINE=InnoDB;
```

#### 5.5.3 配置表物理设计

```sql
-- 系统配置表（读多写少，数据量小）
CREATE TABLE system_config (
    id INT AUTO_INCREMENT,
    config_key VARCHAR(100) NOT NULL,
    config_value TEXT,
    config_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description VARCHAR(255),
    is_system BOOLEAN DEFAULT FALSE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_config_key (config_key)
) ENGINE=InnoDB;
```

## 6. 数据库设计工具

### 6.1 设计工具介绍

#### 6.1.1 MySQL Workbench

MySQL Workbench是官方提供的可视化数据库设计工具，支持：

- 数据库建模（ER图设计）
- SQL开发
- 数据库管理
- 数据库迁移

#### 6.1.2 PowerDesigner

PowerDesigner是Sybase提供的企业级建模工具，支持：

- 概念数据模型（CDM）
- 逻辑数据模型（LDM）
- 物理数据模型（PDM）
- 面向对象模型（OOM）

#### 6.1.3 ER/Studio

ER/Studio是Embarcadero提供的数据建模工具，支持：

- 数据库设计和建模
- 逆向工程
- 数据库文档生成
- 团队协作

#### 6.1.4 dbForge Studio

dbForge Studio是Devart提供的MySQL开发工具，支持：

- 数据库设计
- SQL开发
- 数据库管理
- 数据比较和同步

### 6.2 设计工具使用示例

#### 6.2.1 MySQL Workbench设计流程

1. **创建新模型**
   - 打开MySQL Workbench
   - 选择File > New Model
   - 选择Add Diagram创建新的ER图

2. **添加实体**
   - 从工具栏拖拽Table到画布
   - 双击表打开编辑器
   - 添加列、设置数据类型、定义主键

3. **建立关系**
   - 从工具栏拖拽Relationship到画布
   - 连接两个表
   - 设置关系类型（1:1, 1:N, M:N）

4. **生成SQL**
   - 选择File > Export > Forward Engineer SQL CREATE Script
   - 选择目标数据库版本
   - 生成SQL脚本

5. **导入到数据库**
   - 连接到MySQL服务器
   - 执行生成的SQL脚本

#### 6.2.2 PowerDesigner设计流程

1. **创建概念模型**
   - 新建Conceptual Data Model
   - 添加实体和属性
   - 定义实体间关系

2. **转换为逻辑模型**
   - 选择Tools > Generate Logical Data Model
   - 设置转换选项
   - 生成逻辑模型

3. **转换为物理模型**
   - 选择Tools > Generate Physical Data Model
   - 选择目标数据库（MySQL）
   - 生成物理模型

4. **生成数据库脚本**
   - 选择Database > Generate Database
   - 设置生成选项
   - 生成SQL脚本

### 6.3 版本控制

#### 6.3.1 数据库版本控制工具

1. **Liquibase**
   - 支持多种数据库
   - XML、YAML、JSON格式
   - 支持回滚

2. **Flyway**
   - 简单易用
   - SQL脚本
   - 支持多种数据库

3. **Alembic**
   - Python生态
   - 支持自动生成迁移脚本

#### 6.3.2 Liquibase示例

```xml
<!-- changelog.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                   http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.8.xsd">

    <changeSet id="1" author="developer">
        <createTable tableName="user">
            <column name="id" type="int" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="username" type="varchar(50)">
                <constraints nullable="false" unique="true"/>
            </column>
            <column name="email" type="varchar(100)">
                <constraints nullable="false" unique="true"/>
            </column>
            <column name="password" type="varchar(255)">
                <constraints nullable="false"/>
            </column>
            <column name="created_at" type="timestamp" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
    </changeSet>

    <changeSet id="2" author="developer">
        <createTable tableName="product">
            <column name="id" type="int" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="name" type="varchar(255)">
                <constraints nullable="false"/>
            </column>
            <column name="price" type="decimal(10, 2)">
                <constraints nullable="false"/>
            </column>
            <column name="stock" type="int">
                <constraints nullable="false"/>
            </column>
            <column name="created_at" type="timestamp" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
    </changeSet>

    <changeSet id="3" author="developer">
        <createTable tableName="order">
            <column name="id" type="int" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="user_id" type="int">
                <constraints nullable="false"/>
            </column>
            <column name="total_amount" type="decimal(10, 2)">
                <constraints nullable="false"/>
            </column>
            <column name="status" type="varchar(20)">
                <constraints nullable="false"/>
            </column>
            <column name="created_at" type="timestamp" defaultValueComputed="CURRENT_TIMESTAMP"/>
        </createTable>
        
        <addForeignKeyConstraint
            baseTableName="order"
            baseColumnNames="user_id"
            referencedTableName="user"
            referencedColumnNames="id"
            constraintName="fk_order_user"
            onDelete="CASCADE"
        />
    </changeSet>
</databaseChangeLog>
```

#### 6.3.3 Flyway示例

```sql
-- V1__Create_user_table.sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- V2__Create_product_table.sql
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- V3__Create_order_table.sql
CREATE TABLE `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
```

## 7. 数据库设计优化

### 7.1 性能优化

#### 7.1.1 索引优化

1. **选择合适的索引类型**
   - B-Tree索引：适用于范围查询、排序、分组
   - 哈希索引：适用于等值查询
   - 全文索引：适用于文本搜索

2. **遵循索引设计原则**
   - 为经常用于查询条件的列创建索引
   - 为经常用于排序和分组的列创建索引
   - 为经常用于连接的列创建索引
   - 避免为低选择性的列创建索引

3. **复合索引优化**
   - 将最常用的列放在复合索引的前面
   - 遵循最左前缀原则
   - 避免创建过多的复合索引

#### 7.1.2 查询优化

1. **避免全表扫描**
   - 确保查询使用索引
   - 避免在索引列上使用函数
   - 避免使用LIKE '%xxx'模式

2. **优化JOIN操作**
   - 确保连接条件有索引
   - 小表驱动大表
   - 使用合适的连接类型

3. **优化子查询**
   - 将子查询转换为JOIN
   - 使用EXISTS替代IN
   - 避免相关子查询

#### 7.1.3 表设计优化

1. **垂直拆分**
   - 将不常用的列拆分到另一个表
   - 将大文本字段拆分到另一个表

2. **水平拆分**
   - 按业务逻辑拆分表
   - 按时间范围拆分表
   - 按地理位置拆分表

3. **反规范化**
   - 添加冗余字段减少连接
   - 添加计算字段避免重复计算
   - 合并频繁查询的表

### 7.2 空间优化

#### 7.2.1 数据类型优化

1. **选择合适的数据类型**
   - 使用最小的数据类型
   - 使用固定长度数据类型存储长度相近的数据
   - 使用可变长度数据类型存储长度差异大的数据

2. **NULL值优化**
   - 避免使用NULL值，使用默认值
   - 为NULL列创建索引需要额外空间

3. **字符集优化**
   - 使用合适的字符集（如UTF8MB4）
   - 避免使用过大的字符集

#### 7.2.2 存储优化

1. **行格式优化**
   - 使用COMPACT或DYNAMIC行格式
   - 避免使用REDUNDANT行格式

2. **表压缩**
   - 使用InnoDB表压缩
   - 使用MyISAM表压缩

3. **分区优化**
   - 使用分区减少I/O
   - 使用分区提高查询性能

### 7.3 安全优化

#### 7.3.1 权限控制

1. **最小权限原则**
   - 为每个用户分配最小必要权限
   - 避免使用GRANT ALL PRIVILEGES

2. **角色管理**
   - 使用角色管理权限
   - 为不同角色分配不同权限

3. **权限审计**
   - 定期审查用户权限
   - 及时撤销不需要的权限

#### 7.3.2 数据加密

1. **传输加密**
   - 使用SSL/TLS加密数据传输
   - 避免明文传输敏感数据

2. **存储加密**
   - 使用InnoDB表空间加密
   - 加密敏感字段

3. **应用层加密**
   - 在应用层加密敏感数据
   - 使用强加密算法

### 7.4 可维护性优化

#### 7.4.1 命名规范

1. **表命名规范**
   - 使用小写字母和下划线
   - 使用有意义的名称
   - 避免使用保留字

2. **列命名规范**
   - 使用小写字母和下划线
   - 使用有意义的名称
   - 避免使用缩写

3. **索引命名规范**
   - 使用idx_前缀
   - 包含表名和列名
   - 使用下划线分隔

#### 7.4.2 文档规范

1. **表文档**
   - 描述表用途
   - 列出所有列及其说明
   - 说明约束和索引

2. **ER图文档**
   - 保持ER图更新
   - 添加必要的注释
   - 使用标准符号

3. **变更文档**
   - 记录所有设计变更
   - 说明变更原因
   - 记录变更影响

## 8. 数据库设计案例

### 8.1 电商系统设计

#### 8.1.1 需求分析

电商系统需要支持以下功能：
- 用户管理（注册、登录、个人信息）
- 商品管理（商品信息、分类、库存）
- 订单管理（下单、支付、发货、收货）
- 购物车管理（添加商品、修改数量、删除）
- 评论管理（商品评论、评分）

#### 8.1.2 概念设计

```
+-------------+       +-----------+       +-------------+
|   User      |       |  Order    |       |  Payment    |
|-------------|       |-----------|       |-------------|
| user_id (PK)|-------| order_id  |-------| payment_id  |
| username    |1      | user_id   |1      | order_id    |
| password    |-------| order_date|-------| amount      |
| email       |       | status    |       | payment_date|
| phone       |       | total     |       | method      |
+-------------+       +-----------+       +-------------+
       |                     |                     |
       |                     |1                    |
       |1                    |                     |
       |                     |                     |
+-------------+       +-----------+       +-------------+
|   Address   |       |OrderItem  |       |  Product    |
|-------------|       |-----------|       |-------------|
| address_id  |       | item_id   |-------| product_id  |
| user_id     |1      | order_id  |N      | name        |
| province    |-------| product_id|1      | description |
| city        |N      | quantity  |       | price       |
| district    |       | price     |       | stock       |
| street      |       +-----------+       +-------------+
| zip_code    |
| is_default  |
+-------------+
```

#### 8.1.3 逻辑设计

```sql
-- 用户表
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_time TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
);

-- 用户地址表
CREATE TABLE address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    receiver_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    street VARCHAR(255) NOT NULL,
    zip_code VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

-- 商品分类表
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id INT NULL,
    level INT NOT NULL DEFAULT 1,
    sort_order INT DEFAULT 0,
    is_show BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (parent_id) REFERENCES category(category_id) ON DELETE SET NULL
);

-- 商品表
CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    sales INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    status ENUM('on_sale', 'off_shelf', 'deleted') DEFAULT 'on_sale',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- 订单表
CREATE TABLE `order` (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_no VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('alipay', 'wechat', 'credit_card', 'cash') NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0,
    receiver_name VARCHAR(50) NOT NULL,
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_time TIMESTAMP NULL,
    shipping_time TIMESTAMP NULL,
    delivery_time TIMESTAMP NULL,
    cancel_time TIMESTAMP NULL,
    cancel_reason VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

-- 订单项表
CREATE TABLE order_item (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500),
    current_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `order`(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);

-- 支付记录表
CREATE TABLE payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_no VARCHAR(50) NOT NULL UNIQUE,
    payment_method ENUM('alipay', 'wechat', 'credit_card', 'cash') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'success', 'failed', 'cancelled') DEFAULT 'pending',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    success_time TIMESTAMP NULL,
    third_party_trade_no VARCHAR(100),
    remark VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES `order`(order_id)
);

-- 购物车表
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    selected BOOLEAN DEFAULT TRUE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, product_id)
);

-- 商品评论表
CREATE TABLE review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    content TEXT,
    image_urls JSON,
    is_anonymous BOOLEAN DEFAULT FALSE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (order_id) REFERENCES `order`(order_id)
);
```

#### 8.1.4 物理设计

```sql
-- 用户表（高并发查询）
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_time TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    KEY idx_username (username),
    KEY idx_email (email),
    KEY idx_status (status)
) ENGINE=InnoDB;

-- 商品表（读多写少）
CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    sales INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    status ENUM('on_sale', 'off_shelf', 'deleted') DEFAULT 'on_sale',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_category (category_id),
    KEY idx_status (status),
    KEY idx_price (price),
    KEY idx_sales (sales)
) ENGINE=InnoDB;

-- 订单表（高并发写入）
CREATE TABLE `order` (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_no VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('alipay', 'wechat', 'credit_card', 'cash') NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0,
    receiver_name VARCHAR(50) NOT NULL,
    receiver_phone VARCHAR(20) NOT NULL,
    receiver_address VARCHAR(255) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_time TIMESTAMP NULL,
    shipping_time TIMESTAMP NULL,
    delivery_time TIMESTAMP NULL,
    cancel_time TIMESTAMP NULL,
    cancel_reason VARCHAR(255),
    KEY idx_user (user_id),
    KEY idx_status (status),
    KEY idx_create_time (create_time),
    KEY idx_user_status (user_id, status)
) ENGINE=InnoDB;

-- 订单项表（大数据量）
CREATE TABLE order_item (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(500),
    current_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    KEY idx_order (order_id),
    KEY idx_product (product_id)
) ENGINE=InnoDB
PARTITION BY HASH(order_id) PARTITIONS 8;
```

### 8.2 社交系统设计

#### 8.2.1 需求分析

社交系统需要支持以下功能：
- 用户管理（注册、登录、个人信息）
- 好友关系（添加好友、好友列表）
- 动态发布（发布动态、查看动态）
- 评论互动（评论、点赞）
- 消息通知（系统通知、互动通知）

#### 8.2.2 概念设计

```
+-------------+       +-----------+       +-------------+
|   User      |       | Friendship|       |   Post      |
|-------------|       |-----------|       |-------------|
| user_id (PK)|-------| id (PK)   |-------| post_id (PK)|
| username    |1      | user_id1  |N      | user_id     |
| password    |-------| user_id2  |N      | content     |
| email       |N      | status    |       | create_time |
| avatar      |       +-----------+       | likes_count |
| nickname    |             |             +-------------+
+-------------+             |                     |
       |                     |1                    |
       |1                    |                     |
       |                     |                     |
       |                     |                     |
+-------------+       +-----------+       +-------------+
|  Comment    |       |  Like     |       | Notification|
|-------------|       |-----------|       |-------------|
| comment_id  |-------| id (PK)   |-------| id (PK)     |
| post_id     |1      | user_id   |1      | user_id     |
| user_id     |-------| post_id   |-------| type        |
| content     |N      | create_time|       | content     |
| create_time |       +-----------+       | is_read     |
+-------------+             |             | create_time |
                          |1            +-------------+
                          |                     |
                          |                     |
                          |                     |
                          |                     |
                     +-----------+       +-------------+
                     |  Message  |       |  Follow     |
                     |-----------|       |-------------|
                     | id (PK)   |-------| id (PK)     |
                     | sender_id |1      | follower_id |
                     | receiver_id|-------| followed_id |
                     | content   |N      | create_time |
                     | create_time|       +-------------+
                     +-----------+
```

#### 8.2.3 逻辑设计

```sql
-- 用户表
CREATE TABLE user (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    avatar VARCHAR(500),
    nickname VARCHAR(50),
    gender ENUM('male', 'female', 'other'),
    birthday DATE,
    bio TEXT,
    register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_time TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active'
);

-- 好友关系表
CREATE TABLE friendship (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id1 BIGINT NOT NULL,
    user_id2 BIGINT NOT NULL,
    status ENUM('pending', 'accepted', 'blocked') DEFAULT 'pending',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id1) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id2) REFERENCES user(user_id) ON DELETE CASCADE,
    UNIQUE KEY uk_friendship (user_id1, user_id2),
    CHECK (user_id1 < user_id2)  -- 确保user_id1 < user_id2，避免重复记录
);

-- 关注关系表
CREATE TABLE follow (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    follower_id BIGINT NOT NULL,
    followed_id BIGINT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES user(user_id) ON DELETE CASCADE,
    UNIQUE KEY uk_follow (follower_id, followed_id),
    CHECK (follower_id != followed_id)  -- 不能关注自己
);

-- 动态表
CREATE TABLE post (
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    images JSON,
    location VARCHAR(255),
    visibility ENUM('public', 'friends', 'private') DEFAULT 'public',
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    KEY idx_user_create_time (user_id, create_time),
    KEY idx_create_time (create_time)
);

-- 评论表
CREATE TABLE comment (
    comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    parent_comment_id BIGINT NULL,
    content TEXT NOT NULL,
    likes_count INT DEFAULT 0,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES post(post_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comment(comment_id) ON DELETE CASCADE,
    KEY idx_post_create_time (post_id, create_time)
);

-- 点赞表
CREATE TABLE `like` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    target_type ENUM('post', 'comment') NOT NULL,
    target_id BIGINT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    UNIQUE KEY uk_like (user_id, target_type, target_id),
    KEY idx_target (target_type, target_id)
);

-- 通知表
CREATE TABLE notification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type ENUM('like', 'comment', 'follow', 'mention', 'system') NOT NULL,
    content TEXT NOT NULL,
    related_user_id BIGINT NULL,
    related_post_id BIGINT NULL,
    related_comment_id BIGINT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (related_user_id) REFERENCES user(user_id) ON DELETE SET NULL,
    FOREIGN KEY (related_post_id) REFERENCES post(post_id) ON DELETE SET NULL,
    FOREIGN KEY (related_comment_id) REFERENCES comment(comment_id) ON DELETE SET NULL,
    KEY idx_user_is_read (user_id, is_read),
    KEY idx_create_time (create_time)
);

-- 私信表
CREATE TABLE message (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES user(user_id) ON DELETE CASCADE,
    KEY idx_sender_receiver (sender_id, receiver_id),
    KEY idx_receiver_is_read (receiver_id, is_read)
);
```

#### 8.2.4 物理设计

```sql
-- 用户表（高并发查询）
CREATE TABLE user (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    avatar VARCHAR(500),
    nickname VARCHAR(50),
    gender ENUM('male', 'female', 'other'),
    birthday DATE,
    bio TEXT,
    register_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_time TIMESTAMP NULL,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    KEY idx_username (username),
    KEY idx_email (email),
    KEY idx_status (status)
) ENGINE=InnoDB;

-- 好友关系表（高并发查询）
CREATE TABLE friendship (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id1 BIGINT NOT NULL,
    user_id2 BIGINT NOT NULL,
    status ENUM('pending', 'accepted', 'blocked') DEFAULT 'pending',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id1) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id2) REFERENCES user(user_id) ON DELETE CASCADE,
    UNIQUE KEY uk_friendship (user_id1, user_id2),
    CHECK (user_id1 < user_id2),
    KEY idx_user1_status (user_id1, status),
    KEY idx_user2_status (user_id2, status)
) ENGINE=InnoDB;

-- 动态表（大数据量，写多读多）
CREATE TABLE post (
    post_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    images JSON,
    location VARCHAR(255),
    visibility ENUM('public', 'friends', 'private') DEFAULT 'public',
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    KEY idx_user_create_time (user_id, create_time),
    KEY idx_create_time (create_time),
    KEY idx_visibility (visibility)
) ENGINE=InnoDB
PARTITION BY RANGE (TO_DAYS(create_time)) (
    PARTITION p202301 VALUES LESS THAN (TO_DAYS('2023-02-01')),
    PARTITION p202302 VALUES LESS THAN (TO_DAYS('2023-03-01')),
    PARTITION p202303 VALUES LESS THAN (TO_DAYS('2023-04-01')),
    PARTITION p202304 VALUES LESS THAN (TO_DAYS('2023-05-01')),
    PARTITION p202305 VALUES LESS THAN (TO_DAYS('2023-06-01')),
    PARTITION p202306 VALUES LESS THAN (TO_DAYS('2023-07-01')),
    PARTITION p202307 VALUES LESS THAN (TO_DAYS('2023-08-01')),
    PARTITION p202308 VALUES LESS THAN (TO_DAYS('2023-09-01')),
    PARTITION p202309 VALUES LESS THAN (TO_DAYS('2023-10-01')),
    PARTITION p202310 VALUES LESS THAN (TO_DAYS('2023-11-01')),
    PARTITION p202311 VALUES LESS THAN (TO_DAYS('2023-12-01')),
    PARTITION p202312 VALUES LESS THAN (TO_DAYS('2024-01-01')),
    PARTITION pmax VALUES LESS THAN MAXVALUE
);

-- 点赞表（高并发写入）
CREATE TABLE `like` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    target_type ENUM('post', 'comment') NOT NULL,
    target_id BIGINT NOT NULL,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    UNIQUE KEY uk_like (user_id, target_type, target_id),
    KEY idx_target (target_type, target_id)
) ENGINE=InnoDB
PARTITION BY HASH(user_id) PARTITIONS 16;
```

## 总结

数据库设计是构建高效、可靠、可扩展数据库系统的基础。通过系统化的需求分析、概念设计、逻辑设计和物理设计，可以创建出满足业务需求的数据库结构。

### 关键要点

1. **需求分析**：深入理解业务需求和数据需求是设计的基础。
2. **概念设计**：使用ER模型描述实体、属性和关系。
3. **逻辑设计**：将ER模型转换为关系模型，遵循规范化原则。
4. **物理设计**：选择合适的存储引擎、数据类型、索引和分区策略。
5. **设计工具**：使用专业工具提高设计效率和质量。
6. **设计优化**：从性能、空间、安全和可维护性等方面优化设计。
7. **版本控制**：使用版本控制工具管理数据库变更。
8. **实践案例**：通过实际案例学习设计方法和技巧。

良好的数据库设计能够提高系统的性能、可维护性和可扩展性，为业务发展提供坚实的数据基础。