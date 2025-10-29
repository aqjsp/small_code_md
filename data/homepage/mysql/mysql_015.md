# 实战案例分析

## 1. 电商系统数据库设计

### 1.1 电商系统概述

电商系统是一个典型的复杂业务系统，涉及用户、商品、订单、支付、物流等多个核心模块。数据库设计需要考虑高并发、高可用性和数据一致性。

### 1.2 核心表结构设计

#### 1.2.1 用户表设计

```sql
-- 用户基础信息表
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码(加密)',
    salt VARCHAR(64) NOT NULL COMMENT '密码盐值',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    phone VARCHAR(20) COMMENT '手机号',
    nickname VARCHAR(50) COMMENT '昵称',
    avatar VARCHAR(255) COMMENT '头像URL',
    gender TINYINT DEFAULT 0 COMMENT '性别:0-未知,1-男,2-女',
    birthday DATE COMMENT '生日',
    register_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
    last_login_time DATETIME COMMENT '最后登录时间',
    status TINYINT DEFAULT 1 COMMENT '状态:0-禁用,1-正常',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_register_time (register_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 用户地址表
CREATE TABLE user_addresses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    receiver_name VARCHAR(50) NOT NULL COMMENT '收货人姓名',
    receiver_phone VARCHAR(20) NOT NULL COMMENT '收货人电话',
    province VARCHAR(50) NOT NULL COMMENT '省份',
    city VARCHAR(50) NOT NULL COMMENT '城市',
    district VARCHAR(50) NOT NULL COMMENT '区县',
    address VARCHAR(255) NOT NULL COMMENT '详细地址',
    postal_code VARCHAR(10) COMMENT '邮政编码',
    is_default TINYINT DEFAULT 0 COMMENT '是否默认地址:0-否,1-是',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户地址表';
```

#### 1.2.2 商品表设计

```sql
-- 商品分类表
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '分类名称',
    parent_id BIGINT DEFAULT 0 COMMENT '父分类ID,0表示顶级分类',
    level TINYINT NOT NULL COMMENT '分类级别:1-一级,2-二级,3-三级',
    sort_order INT DEFAULT 0 COMMENT '排序顺序',
    icon VARCHAR(255) COMMENT '分类图标',
    image VARCHAR(255) COMMENT '分类图片',
    description VARCHAR(500) COMMENT '分类描述',
    status TINYINT DEFAULT 1 COMMENT '状态:0-禁用,1-启用',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_parent_id (parent_id),
    INDEX idx_level (level),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品分类表';

-- 商品表
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL COMMENT '分类ID',
    product_code VARCHAR(100) NOT NULL UNIQUE COMMENT '商品编码',
    name VARCHAR(255) NOT NULL COMMENT '商品名称',
    subtitle VARCHAR(500) COMMENT '商品副标题',
    description TEXT COMMENT '商品描述',
    main_image VARCHAR(255) COMMENT '主图片URL',
    price DECIMAL(10,2) NOT NULL COMMENT '价格',
    market_price DECIMAL(10,2) COMMENT '市场价',
    cost_price DECIMAL(10,2) COMMENT '成本价',
    stock INT NOT NULL DEFAULT 0 COMMENT '库存数量',
    low_stock INT DEFAULT 10 COMMENT '低库存阈值',
    sales INT NOT NULL DEFAULT 0 COMMENT '销量',
    weight DECIMAL(8,2) COMMENT '重量(kg)',
    volume DECIMAL(8,2) COMMENT '体积(立方米)',
    brand VARCHAR(100) COMMENT '品牌',
    tags VARCHAR(255) COMMENT '标签,逗号分隔',
    status TINYINT DEFAULT 1 COMMENT '状态:0-下架,1-上架',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category_id (category_id),
    INDEX idx_product_code (product_code),
    INDEX idx_name (name),
    INDEX idx_price (price),
    INDEX idx_sales (sales),
    INDEX idx_status (status),
    INDEX idx_create_time (create_time),
    FULLTEXT idx_name_desc (name, subtitle, description),
    FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- 商品SKU表
CREATE TABLE product_skus (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL COMMENT '商品ID',
    sku_code VARCHAR(100) NOT NULL UNIQUE COMMENT 'SKU编码',
    spec_values VARCHAR(500) COMMENT '规格值,JSON格式',
    price DECIMAL(10,2) NOT NULL COMMENT '价格',
    stock INT NOT NULL DEFAULT 0 COMMENT '库存数量',
    image VARCHAR(255) COMMENT 'SKU图片',
    status TINYINT DEFAULT 1 COMMENT '状态:0-禁用,1-启用',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_product_id (product_id),
    INDEX idx_sku_code (sku_code),
    INDEX idx_price (price),
    INDEX idx_stock (stock),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品SKU表';

-- 商品图片表
CREATE TABLE product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL COMMENT '商品ID',
    image_url VARCHAR(255) NOT NULL COMMENT '图片URL',
    alt VARCHAR(255) COMMENT '图片描述',
    sort_order INT DEFAULT 0 COMMENT '排序顺序',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_product_id (product_id),
    INDEX idx_sort_order (sort_order),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品图片表';
```

#### 1.2.3 订单表设计

```sql
-- 订单表
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_no VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    total_amount DECIMAL(10,2) NOT NULL COMMENT '订单总金额',
    pay_amount DECIMAL(10,2) NOT NULL COMMENT '实付金额',
    freight_amount DECIMAL(10,2) DEFAULT 0 COMMENT '运费',
    discount_amount DECIMAL(10,2) DEFAULT 0 COMMENT '优惠金额',
    payment_method TINYINT COMMENT '支付方式:1-支付宝,2-微信,3-银行卡',
    payment_time DATETIME COMMENT '支付时间',
    payment_no VARCHAR(100) COMMENT '支付流水号',
    order_status TINYINT NOT NULL DEFAULT 0 COMMENT '订单状态:0-待付款,1-待发货,2-待收货,3-已完成,4-已取消',
    receiver_name VARCHAR(50) NOT NULL COMMENT '收货人姓名',
    receiver_phone VARCHAR(20) NOT NULL COMMENT '收货人电话',
    receiver_address VARCHAR(255) NOT NULL COMMENT '收货地址',
    receiver_province VARCHAR(50) COMMENT '收货省份',
    receiver_city VARCHAR(50) COMMENT '收货城市',
    receiver_district VARCHAR(50) COMMENT '收货区县',
    receiver_postal_code VARCHAR(10) COMMENT '收货邮政编码',
    remark VARCHAR(500) COMMENT '订单备注',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_user_id (user_id),
    INDEX idx_order_no (order_no),
    INDEX idx_order_status (order_status),
    INDEX idx_payment_time (payment_time),
    INDEX idx_create_time (create_time),
    FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- 订单商品表
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL COMMENT '订单ID',
    product_id BIGINT NOT NULL COMMENT '商品ID',
    sku_id BIGINT COMMENT 'SKU ID',
    product_name VARCHAR(255) NOT NULL COMMENT '商品名称',
    sku_spec_values VARCHAR(500) COMMENT 'SKU规格值',
    product_image VARCHAR(255) COMMENT '商品图片',
    price DECIMAL(10,2) NOT NULL COMMENT '商品价格',
    quantity INT NOT NULL COMMENT '购买数量',
    total_price DECIMAL(10,2) NOT NULL COMMENT '小计金额',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    INDEX idx_sku_id (sku_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (sku_id) REFERENCES product_skus(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单商品表';
```

### 1.3 高并发优化策略

#### 1.3.1 库存扣减优化

```sql
-- 使用乐观锁解决库存超卖问题
CREATE TABLE product_skus (
    -- ...其他字段...
    stock INT NOT NULL DEFAULT 0 COMMENT '库存数量',
    version INT NOT NULL DEFAULT 0 COMMENT '版本号,用于乐观锁',
    -- ...其他字段...
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品SKU表';

-- 乐观锁扣减库存
UPDATE product_skus 
SET stock = stock - #{quantity}, 
    version = version + 1 
WHERE id = #{skuId} 
  AND stock >= #{quantity} 
  AND version = #{version};

-- 检查更新是否成功
SELECT ROW_COUNT() AS affected_rows;
```

#### 1.3.2 订单分库分表

```sql
-- 按用户ID分表
CREATE TABLE orders_0 LIKE orders;
CREATE TABLE orders_1 LIKE orders;
-- ...更多分表

-- 分表路由函数
DELIMITER $$
CREATE FUNCTION get_order_table(user_id BIGINT) 
RETURNS VARCHAR(64)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE table_suffix INT;
    SET table_suffix = user_id % 4;
    RETURN CONCAT('orders_', table_suffix);
END$$
DELIMITER ;

-- 使用存储过程实现分表查询
DELIMITER $$
CREATE PROCEDURE get_order_by_id(IN p_user_id BIGINT, IN p_order_id BIGINT)
BEGIN
    SET @table_name = get_order_table(p_user_id);
    SET @sql = CONCAT('SELECT * FROM ', @table_name, ' WHERE user_id = ? AND id = ?');
    PREPARE stmt FROM @sql;
    EXECUTE stmt USING p_user_id, p_order_id;
    DEALLOCATE PREPARE stmt;
END$$
DELIMITER ;
```

### 1.4 电商系统查询优化

#### 1.4.1 商品搜索优化

```sql
-- 创建全文索引支持商品搜索
ALTER TABLE products ADD FULLTEXT INDEX idx_search (name, subtitle, description);

-- 使用全文索引搜索商品
SELECT p.*, c.name AS category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE MATCH(p.name, p.subtitle, p.description) AGAINST('智能手机' IN NATURAL LANGUAGE MODE)
  AND p.status = 1
  AND p.stock > 0
ORDER BY p.sales DESC, p.create_time DESC
LIMIT 20;

-- 使用Elasticsearch替代MySQL全文搜索(更优方案)
-- 商品数据同步到Elasticsearch
```

#### 1.4.2 订单查询优化

```sql
-- 创建复合索引优化订单查询
ALTER TABLE orders ADD INDEX idx_user_status_time (user_id, order_status, create_time);

-- 分页查询用户订单
SELECT o.*, 
       (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) AS item_count
FROM orders o
WHERE o.user_id = #{userId}
ORDER BY o.create_time DESC
LIMIT #{offset}, #{pageSize};

-- 统计用户订单状态数量
SELECT order_status, COUNT(*) AS count
FROM orders
WHERE user_id = #{userId}
GROUP BY order_status;
```

## 2. 社交平台数据库设计

### 2.1 社交平台概述

社交平台涉及用户关系、内容发布、互动评论等功能，需要处理大量用户生成内容和社交关系数据。

### 2.2 核心表结构设计

#### 2.2.1 用户与关系表设计

```sql
-- 用户表
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    nickname VARCHAR(50) COMMENT '昵称',
    avatar VARCHAR(255) COMMENT '头像URL',
    bio VARCHAR(500) COMMENT '个人简介',
    gender TINYINT DEFAULT 0 COMMENT '性别:0-未知,1-男,2-女',
    location VARCHAR(100) COMMENT '所在地',
    website VARCHAR(255) COMMENT '个人网站',
    followers_count INT DEFAULT 0 COMMENT '粉丝数',
    following_count INT DEFAULT 0 COMMENT '关注数',
    posts_count INT DEFAULT 0 COMMENT '帖子数',
    likes_count INT DEFAULT 0 COMMENT '获赞数',
    status TINYINT DEFAULT 1 COMMENT '状态:0-禁用,1-正常',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_username (username),
    INDEX idx_nickname (nickname),
    INDEX idx_followers_count (followers_count),
    INDEX idx_create_time (create_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 用户关系表(关注/粉丝)
CREATE TABLE user_relations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    follower_id BIGINT NOT NULL COMMENT '关注者ID',
    following_id BIGINT NOT NULL COMMENT '被关注者ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_follower_following (follower_id, following_id),
    INDEX idx_follower_id (follower_id),
    INDEX idx_following_id (following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户关系表';
```

#### 2.2.2 内容表设计

```sql
-- 帖子表
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    content TEXT NOT NULL COMMENT '帖子内容',
    images JSON COMMENT '图片URL列表',
    videos JSON COMMENT '视频URL列表',
    location VARCHAR(100) COMMENT '位置',
    topics VARCHAR(255) COMMENT '话题标签,逗号分隔',
    view_count INT DEFAULT 0 COMMENT '浏览量',
    like_count INT DEFAULT 0 COMMENT '点赞数',
    comment_count INT DEFAULT 0 COMMENT '评论数',
    share_count INT DEFAULT 0 COMMENT '分享数',
    status TINYINT DEFAULT 1 COMMENT '状态:0-删除,1-正常,2-仅自己可见',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_user_id (user_id),
    INDEX idx_create_time (create_time),
    INDEX idx_like_count (like_count),
    INDEX idx_status (status),
    FULLTEXT idx_content (content),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子表';

-- 评论表
CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL COMMENT '帖子ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    parent_id BIGINT DEFAULT 0 COMMENT '父评论ID,0表示一级评论',
    reply_user_id BIGINT COMMENT '回复的用户ID',
    content TEXT NOT NULL COMMENT '评论内容',
    like_count INT DEFAULT 0 COMMENT '点赞数',
    status TINYINT DEFAULT 1 COMMENT '状态:0-删除,1-正常',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_create_time (create_time),
    INDEX idx_status (status),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='评论表';

-- 点赞表
CREATE TABLE likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL COMMENT '用户ID',
    target_id BIGINT NOT NULL COMMENT '目标ID(帖子或评论ID)',
    target_type TINYINT NOT NULL COMMENT '目标类型:1-帖子,2-评论',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_user_target (user_id, target_id, target_type),
    INDEX idx_user_id (user_id),
    INDEX idx_target (target_id, target_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='点赞表';
```

### 2.3 社交平台性能优化

#### 2.3.1 时间线优化

```sql
-- 使用Redis缓存用户时间线
-- 当用户发布新帖子时，将帖子ID推送到所有粉丝的时间线

-- MySQL中的时间线查询(备选方案)
SELECT p.*, u.username, u.nickname, u.avatar
FROM posts p
INNER JOIN users u ON p.user_id = u.id
WHERE p.user_id IN (
    SELECT following_id FROM user_relations WHERE follower_id = #{currentUserId}
) OR p.user_id = #{currentUserId}
ORDER BY p.create_time DESC
LIMIT #{offset}, #{pageSize};

-- 创建复合索引优化时间线查询
ALTER TABLE user_relations ADD INDEX idx_follower_following (follower_id, following_id);
ALTER TABLE posts ADD INDEX idx_user_create_time (user_id, create_time DESC);
```

#### 2.3.2 热门内容优化

```sql
-- 创建热门内容缓存表
CREATE TABLE hot_posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL COMMENT '帖子ID',
    score DECIMAL(10,2) NOT NULL COMMENT '热度分数',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_post_id (post_id),
    INDEX idx_score (score DESC),
    INDEX idx_update_time (update_time DESC),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='热门帖子表';

-- 计算热度分数并更新热门内容
DELIMITER $$
CREATE PROCEDURE update_hot_posts()
BEGIN
    -- 清空热门内容表
    TRUNCATE TABLE hot_posts;
    
    -- 插入新的热门内容
    INSERT INTO hot_posts (post_id, score)
    SELECT p.id, 
           (p.like_count * 0.4 + p.comment_count * 0.3 + p.share_count * 0.2 + p.view_count * 0.1) AS score
    FROM posts p
    WHERE p.status = 1
      AND p.create_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)  -- 只考虑最近7天的帖子
    ORDER BY score DESC
    LIMIT 100;  -- 只保留前100条热门内容
END$$
DELIMITER ;

-- 定时更新热门内容
-- CREATE EVENT update_hot_posts_event
-- ON SCHEDULE EVERY 1 HOUR
-- DO CALL update_hot_posts();
```

## 3. 内容管理系统数据库设计

### 3.1 内容管理系统概述

内容管理系统(CMS)用于管理网站内容，包括文章、页面、分类、标签等，需要考虑内容组织、版本控制和权限管理。

### 3.2 核心表结构设计

#### 3.2.1 内容表设计

```sql
-- 文章分类表
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT '分类名称',
    slug VARCHAR(100) NOT NULL UNIQUE COMMENT '分类别名',
    description TEXT COMMENT '分类描述',
    parent_id INT DEFAULT 0 COMMENT '父分类ID',
    sort_order INT DEFAULT 0 COMMENT '排序顺序',
    count INT DEFAULT 0 COMMENT '文章数量',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_parent_id (parent_id),
    INDEX idx_slug (slug),
    INDEX idx_sort_order (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章分类表';

-- 标签表
CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE COMMENT '标签名称',
    slug VARCHAR(50) NOT NULL UNIQUE COMMENT '标签别名',
    description TEXT COMMENT '标签描述',
    count INT DEFAULT 0 COMMENT '文章数量',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_slug (slug),
    INDEX idx_count (count DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签表';

-- 文章表
CREATE TABLE posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL COMMENT '文章标题',
    slug VARCHAR(255) NOT NULL UNIQUE COMMENT '文章别名',
    excerpt TEXT COMMENT '文章摘要',
    content LONGTEXT NOT NULL COMMENT '文章内容',
    author_id BIGINT NOT NULL COMMENT '作者ID',
    featured_image VARCHAR(255) COMMENT '特色图片URL',
    status TINYINT NOT NULL DEFAULT 0 COMMENT '状态:0-草稿,1-已发布,2-私密,3-回收站',
    comment_status TINYINT DEFAULT 1 COMMENT '评论状态:0-关闭,1-开放',
    password VARCHAR(255) COMMENT '访问密码',
    view_count INT DEFAULT 0 COMMENT '浏览量',
    like_count INT DEFAULT 0 COMMENT '点赞数',
    comment_count INT DEFAULT 0 COMMENT '评论数',
    is_top TINYINT DEFAULT 0 COMMENT '是否置顶:0-否,1-是',
    is_featured TINYINT DEFAULT 0 COMMENT '是否精选:0-否,1-是',
    published_time DATETIME COMMENT '发布时间',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_slug (slug),
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    INDEX idx_is_top (is_top),
    INDEX idx_is_featured (is_featured),
    INDEX idx_published_time (published_time DESC),
    INDEX idx_create_time (create_time DESC),
    INDEX idx_view_count (view_count DESC),
    FULLTEXT idx_title_content (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章表';

-- 文章分类关联表
CREATE TABLE post_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL COMMENT '文章ID',
    category_id INT NOT NULL COMMENT '分类ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_post_category (post_id, category_id),
    INDEX idx_post_id (post_id),
    INDEX idx_category_id (category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章分类关联表';

-- 文章标签关联表
CREATE TABLE post_tag (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL COMMENT '文章ID',
    tag_id INT NOT NULL COMMENT '标签ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_post_tag (post_id, tag_id),
    INDEX idx_post_id (post_id),
    INDEX idx_tag_id (tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章标签关联表';
```

#### 3.2.2 版本控制表设计

```sql
-- 文章版本表
CREATE TABLE post_revisions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL COMMENT '文章ID',
    title VARCHAR(255) NOT NULL COMMENT '文章标题',
    content LONGTEXT NOT NULL COMMENT '文章内容',
    excerpt TEXT COMMENT '文章摘要',
    author_id BIGINT NOT NULL COMMENT '修改作者ID',
    revision_note VARCHAR(255) COMMENT '版本说明',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_post_id (post_id),
    INDEX idx_author_id (author_id),
    INDEX idx_create_time (create_time DESC),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='文章版本表';

-- 自动保存文章版本
DELIMITER $$
CREATE TRIGGER save_post_revision
BEFORE UPDATE ON posts
FOR EACH ROW
BEGIN
    -- 只有内容发生变化时才保存版本
    IF OLD.title != NEW.title OR OLD.content != NEW.content OR OLD.excerpt != NEW.excerpt THEN
        INSERT INTO post_revisions (post_id, title, content, excerpt, author_id, revision_note)
        VALUES (OLD.id, OLD.title, OLD.content, OLD.excerpt, NEW.author_id, '自动保存');
    END IF;
END$$
DELIMITER ;
```

### 3.3 CMS性能优化

#### 3.3.1 文章查询优化

```sql
-- 创建复合索引优化文章列表查询
ALTER TABLE posts ADD INDEX idx_status_published_time (status, published_time DESC, is_top DESC);

-- 分页查询已发布文章
SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image, p.view_count, 
       p.like_count, p.comment_count, p.published_time,
       u.username AS author_name, u.avatar AS author_avatar
FROM posts p
INNER JOIN users u ON p.author_id = u.id
WHERE p.status = 1
ORDER BY p.is_top DESC, p.published_time DESC
LIMIT #{offset}, #{pageSize};

-- 查询分类下的文章
SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image, p.view_count, 
       p.published_time,
       u.username AS author_name
FROM posts p
INNER JOIN post_category pc ON p.id = pc.post_id
INNER JOIN categories c ON pc.category_id = c.id
INNER JOIN users u ON p.author_id = u.id
WHERE p.status = 1 AND c.slug = #{categorySlug}
ORDER BY p.published_time DESC
LIMIT #{offset}, #{pageSize};

-- 查询标签下的文章
SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image, p.view_count, 
       p.published_time,
       u.username AS author_name
FROM posts p
INNER JOIN post_tag pt ON p.id = pt.post_id
INNER JOIN tags t ON pt.tag_id = t.id
INNER JOIN users u ON p.author_id = u.id
WHERE p.status = 1 AND t.slug = #{tagSlug}
ORDER BY p.published_time DESC
LIMIT #{offset}, #{pageSize};
```

#### 3.3.2 搜索优化

```sql
-- 使用全文索引优化文章搜索
SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image, p.view_count, 
       p.published_time,
       MATCH(p.title, p.content) AGAINST(#{keyword} IN NATURAL LANGUAGE MODE) AS relevance,
       u.username AS author_name
FROM posts p
INNER JOIN users u ON p.author_id = u.id
WHERE p.status = 1
  AND MATCH(p.title, p.content) AGAINST(#{keyword} IN NATURAL LANGUAGE MODE)
ORDER BY relevance DESC, p.published_time DESC
LIMIT #{offset}, #{pageSize};

-- 创建搜索日志表用于分析搜索行为
CREATE TABLE search_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL COMMENT '搜索关键词',
    result_count INT DEFAULT 0 COMMENT '搜索结果数',
    ip VARCHAR(45) COMMENT 'IP地址',
    user_agent VARCHAR(500) COMMENT '用户代理',
    user_id BIGINT COMMENT '用户ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '搜索时间',
    INDEX idx_keyword (keyword),
    INDEX idx_create_time (create_time),
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='搜索日志表';
```

## 4. 日志系统数据库设计

### 4.1 日志系统概述

日志系统用于记录系统运行过程中的各种事件，包括用户操作日志、系统错误日志、访问日志等，需要考虑海量数据存储和高效查询。

### 4.2 核心表结构设计

#### 4.2.1 日志表设计

```sql
-- 操作日志表
CREATE TABLE operation_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT COMMENT '操作用户ID',
    username VARCHAR(50) COMMENT '操作用户名',
    module VARCHAR(50) NOT NULL COMMENT '操作模块',
    operation VARCHAR(50) NOT NULL COMMENT '操作类型',
    method VARCHAR(100) COMMENT '请求方法',
    params TEXT COMMENT '请求参数',
    ip VARCHAR(45) COMMENT 'IP地址',
    location VARCHAR(100) COMMENT '操作地点',
    user_agent VARCHAR(500) COMMENT '用户代理',
    execution_time INT COMMENT '执行时间(毫秒)',
    result TINYINT COMMENT '操作结果:0-失败,1-成功',
    error_msg TEXT COMMENT '错误信息',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
    INDEX idx_user_id (user_id),
    INDEX idx_module (module),
    INDEX idx_operation (operation),
    INDEX idx_create_time (create_time),
    INDEX idx_result (result),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志表';

-- 错误日志表
CREATE TABLE error_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    level VARCHAR(20) NOT NULL COMMENT '日志级别:ERROR,WARN,INFO',
    logger_name VARCHAR(100) NOT NULL COMMENT '记录器名称',
    message TEXT NOT NULL COMMENT '日志消息',
    exception_str TEXT COMMENT '异常堆栈',
    class_name VARCHAR(200) COMMENT '类名',
    method_name VARCHAR(100) COMMENT '方法名',
    file_name VARCHAR(200) COMMENT '文件名',
    line_number INT COMMENT '行号',
    thread_name VARCHAR(100) COMMENT '线程名',
    ip VARCHAR(45) COMMENT 'IP地址',
    user_id BIGINT COMMENT '用户ID',
    session_id VARCHAR(100) COMMENT '会话ID',
    request_id VARCHAR(50) COMMENT '请求ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_level (level),
    INDEX idx_logger_name (logger_name),
    INDEX idx_create_time (create_time),
    INDEX idx_user_id (user_id),
    INDEX idx_request_id (request_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='错误日志表';

-- 访问日志表
CREATE TABLE access_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    request_id VARCHAR(50) NOT NULL COMMENT '请求ID',
    ip VARCHAR(45) NOT NULL COMMENT 'IP地址',
    country VARCHAR(50) COMMENT '国家',
    region VARCHAR(50) COMMENT '地区',
    city VARCHAR(50) COMMENT '城市',
    isp VARCHAR(100) COMMENT 'ISP提供商',
    method VARCHAR(10) NOT NULL COMMENT '请求方法',
    url VARCHAR(500) NOT NULL COMMENT '请求URL',
    query_string VARCHAR(1000) COMMENT '查询参数',
    protocol VARCHAR(20) COMMENT '协议版本',
    user_agent VARCHAR(500) COMMENT '用户代理',
    referer VARCHAR(500) COMMENT '来源页面',
    status_code INT NOT NULL COMMENT '响应状态码',
    response_size BIGINT COMMENT '响应大小(字节)',
    request_time INT COMMENT '请求处理时间(毫秒)',
    user_id BIGINT COMMENT '用户ID',
    session_id VARCHAR(100) COMMENT '会话ID',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '访问时间',
    INDEX idx_request_id (request_id),
    INDEX idx_ip (ip),
    INDEX idx_method (method),
    INDEX idx_status_code (status_code),
    INDEX idx_create_time (create_time),
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='访问日志表';
```

### 4.3 日志系统优化

#### 4.3.1 分表策略

```sql
-- 按月分表存储日志数据
CREATE TABLE operation_logs_202301 LIKE operation_logs;
CREATE TABLE operation_logs_202302 LIKE operation_logs;
-- ...更多月份分表

-- 分表路由函数
DELIMITER $$
CREATE FUNCTION get_operation_log_table(log_date DATE) 
RETURNS VARCHAR(64)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE table_suffix VARCHAR(6);
    SET table_suffix = DATE_FORMAT(log_date, '%Y%m');
    RETURN CONCAT('operation_logs_', table_suffix);
END$$
DELIMITER ;

-- 使用存储过程实现分表查询
DELIMITER $$
CREATE PROCEDURE query_operation_logs(
    IN p_start_date DATE,
    IN p_end_date DATE,
    IN p_user_id BIGINT,
    IN p_offset INT,
    IN p_page_size INT
)
BEGIN
    DECLARE current_date DATE;
    DECLARE done INT DEFAULT FALSE;
    DECLARE table_name VARCHAR(64);
    DECLARE total_count INT DEFAULT 0;
    
    -- 创建临时表存储结果
    CREATE TEMPORARY TABLE temp_results (
        id BIGINT,
        user_id BIGINT,
        username VARCHAR(50),
        module VARCHAR(50),
        operation VARCHAR(50),
        ip VARCHAR(45),
        create_time DATETIME,
        INDEX idx_create_time (create_time)
    ) ENGINE=MEMORY;
    
    -- 遍历日期范围
    SET current_date = p_start_date;
    
    WHILE current_date <= p_end_date DO
        SET table_name = get_operation_log_table(current_date);
        
        -- 检查表是否存在
        SET @table_exists = 0;
        SELECT COUNT(*) INTO @table_exists 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE() 
          AND table_name = table_name;
        
        IF @table_exists > 0 THEN
            -- 构建动态SQL
            SET @sql = CONCAT(
                'INSERT INTO temp_results (id, user_id, username, module, operation, ip, create_time) ',
                'SELECT id, user_id, username, module, operation, ip, create_time ',
                'FROM ', table_name, ' ',
                'WHERE create_time BETWEEN ''', p_start_date, ''' AND ''', p_end_date, ''' '
            );
            
            -- 添加用户ID条件
            IF p_user_id IS NOT NULL THEN
                SET @sql = CONCAT(@sql, ' AND user_id = ', p_user_id);
            END IF;
            
            -- 执行SQL
            PREPARE stmt FROM @sql;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
        END IF;
        
        -- 移动到下个月
        SET current_date = DATE_ADD(current_date, INTERVAL 1 MONTH);
        SET current_date = DATE_FORMAT(current_date, '%Y-%m-01');
    END WHILE;
    
    -- 返回分页结果
    SET @sql = CONCAT(
        'SELECT * FROM temp_results ',
        'ORDER BY create_time DESC ',
        'LIMIT ', p_offset, ', ', p_page_size
    );
    
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
    
    -- 获取总记录数
    SELECT COUNT(*) INTO total_count FROM temp_results;
    SELECT total_count AS total_count;
    
    -- 清理临时表
    DROP TEMPORARY TABLE temp_results;
END$$
DELIMITER ;
```

#### 4.3.2 日志归档策略

```sql
-- 创建日志归档表
CREATE TABLE operation_logs_archive (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT COMMENT '操作用户ID',
    username VARCHAR(50) COMMENT '操作用户名',
    module VARCHAR(50) NOT NULL COMMENT '操作模块',
    operation VARCHAR(50) NOT NULL COMMENT '操作类型',
    method VARCHAR(100) COMMENT '请求方法',
    params TEXT COMMENT '请求参数',
    ip VARCHAR(45) COMMENT 'IP地址',
    location VARCHAR(100) COMMENT '操作地点',
    user_agent VARCHAR(500) COMMENT '用户代理',
    execution_time INT COMMENT '执行时间(毫秒)',
    result TINYINT COMMENT '操作结果:0-失败,1-成功',
    error_msg TEXT COMMENT '错误信息',
    create_time DATETIME NOT NULL COMMENT '操作时间',
    archive_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '归档时间',
    INDEX idx_user_id (user_id),
    INDEX idx_module (module),
    INDEX idx_operation (operation),
    INDEX idx_create_time (create_time),
    INDEX idx_result (result),
    INDEX idx_archive_time (archive_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志归档表';

-- 归档90天前的日志
DELIMITER $$
CREATE PROCEDURE archive_old_logs()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE table_name VARCHAR(64);
    DECLARE archive_date DATE;
    DECLARE cur CURSOR FOR 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE() 
          AND table_name LIKE 'operation_logs_%';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- 设置归档日期为90天前
    SET archive_date = DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY);
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO table_name;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- 归档旧数据
        SET @sql = CONCAT(
            'INSERT INTO operation_logs_archive ',
            '(user_id, username, module, operation, method, params, ip, location, ',
            ' user_agent, execution_time, result, error_msg, create_time) ',
            'SELECT user_id, username, module, operation, method, params, ip, location, ',
            '       user_agent, execution_time, result, error_msg, create_time ',
            'FROM ', table_name, ' ',
            'WHERE create_time < ''', archive_date, ''''
        );
        
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        
        -- 删除已归档的数据
        SET @sql = CONCAT(
            'DELETE FROM ', table_name, ' ',
            'WHERE create_time < ''', archive_date, ''''
        );
        
        PREPARE stmt FROM @sql;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;
    
    CLOSE cur;
END$$
DELIMITER ;

-- 定时归档旧日志
-- CREATE EVENT archive_old_logs_event
-- ON SCHEDULE EVERY 1 DAY
-- STARTS TIMESTAMP(CURRENT_DATE, '03:00:00')
-- DO CALL archive_old_logs();
```

## 5. 实战案例总结

### 5.1 数据库设计原则

1. **规范化与反规范化平衡**：
   - 遵循数据库范式减少数据冗余
   - 在性能要求高的场景适当反规范化

2. **索引策略**：
   - 为查询条件、排序字段、连接字段创建索引
   - 避免过多索引影响写入性能
   - 使用复合索引优化多条件查询

3. **分库分表**：
   - 按业务模块垂直拆分
   - 按数据量水平拆分
   - 考虑数据均匀分布和查询效率

4. **读写分离**：
   - 主库负责写操作
   - 从库负责读操作
   - 使用中间件简化路由逻辑

### 5.2 性能优化策略

1. **查询优化**：
   - 避免SELECT *，只查询需要的字段
   - 使用LIMIT限制结果集大小
   - 优化JOIN操作，确保连接字段有索引

2. **缓存策略**：
   - 使用Redis缓存热点数据
   - 实现多级缓存架构
   - 设置合理的缓存过期时间

3. **连接池优化**：
   - 配置合适的连接池大小
   - 设置合理的超时时间
   - 监控连接池使用情况

4. **批量操作**：
   - 使用批量插入减少数据库交互
   - 优化批量更新操作
   - 合理控制批量大小

### 5.3 高可用与容灾

1. **主从复制**：
   - 配置MySQL主从复制
   - 监控复制延迟
   - 实现自动故障转移

2. **数据备份**：
   - 定期全量备份
   - 增量备份策略
   - 备份数据验证

3. **监控告警**：
   - 监控数据库性能指标
   - 设置合理的告警阈值
   - 建立完善的运维流程

通过以上实战案例分析，我们可以看到MySQL在不同场景下的应用模式和优化策略，这些经验可以帮助我们设计出更加高效、稳定的数据库系统。