# 开发集成

## 1. 应用程序与MySQL集成概述

### 1.1 数据库连接的重要性

数据库连接是应用程序与MySQL数据库交互的基础，良好的连接管理对系统性能和稳定性至关重要：

- **性能影响**：连接建立和释放是昂贵的操作，频繁创建连接会消耗大量资源
- **资源管理**：合理管理连接可以避免资源泄漏和系统崩溃
- **并发处理**：高效的连接管理支持高并发访问
- **系统稳定性**：稳定的连接机制确保应用程序可靠运行

### 1.2 连接方式分类

应用程序与MySQL的连接方式主要分为：

1. **直连方式**：应用程序直接使用数据库驱动连接数据库
2. **连接池方式**：通过连接池管理数据库连接
3. **ORM方式**：通过对象关系映射框架间接连接数据库
4. **中间件方式**：通过数据库中间件代理连接

### 1.3 连接管理最佳实践

1. **使用连接池**：避免频繁创建和销毁连接
2. **设置合理超时**：防止连接长时间占用
3. **连接泄漏检测**：及时发现和修复连接泄漏
4. **连接重用**：最大化连接利用率
5. **负载均衡**：分散连接压力

## 2. MySQL连接管理

### 2.1 连接参数配置

#### 2.1.1 基本连接参数

```sql
-- MySQL连接字符串格式
mysql://[username[:password]@][host][:port][/dbname][?param1=value1&param2=value2]

-- 常用连接参数
- host: 数据库服务器地址
- port: 数据库端口，默认3306
- user: 用户名
- password: 密码
- database: 数据库名称
- charset: 字符集，如utf8mb4
```

#### 2.1.2 高级连接参数

```sql
-- 连接超时参数
- connectTimeout: 连接超时时间(毫秒)
- socketTimeout: 读写超时时间(毫秒)

-- 连接池参数
- initialSize: 初始连接数
- maxActive: 最大连接数
- maxIdle: 最大空闲连接数
- minIdle: 最小空闲连接数
- maxWait: 获取连接最大等待时间(毫秒)

- validationQuery: 连接验证查询
- testOnBorrow: 借用连接时是否验证
- testOnReturn: 归还连接时是否验证
- testWhileIdle: 空闲时是否验证连接
- timeBetweenEvictionRunsMillis: 空闲连接回收器运行间隔
- minEvictableIdleTimeMillis: 连接在池中保持空闲而不被回收的最小时间
```

### 2.2 连接池实现

#### 2.2.1 Java连接池配置

```java
// Apache Commons DBCP连接池配置
BasicDataSource dataSource = new BasicDataSource();
dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
dataSource.setUrl("jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC");
dataSource.setUsername("username");
dataSource.setPassword("password");

// 连接池大小配置
dataSource.setInitialSize(5);        // 初始连接数
dataSource.setMaxTotal(20);          // 最大连接数
dataSource.setMaxIdle(10);           // 最大空闲连接数
dataSource.setMinIdle(5);            // 最小空闲连接数
dataSource.setMaxWaitMillis(10000);  // 获取连接最大等待时间

// 连接验证配置
dataSource.setValidationQuery("SELECT 1");
dataSource.setTestOnBorrow(true);
dataSource.setTestWhileIdle(true);
dataSource.setTimeBetweenEvictionRunsMillis(30000);
dataSource.setMinEvictableIdleTimeMillis(60000);

// 获取连接
Connection conn = dataSource.getConnection();
try {
    // 执行数据库操作
} finally {
    // 归还连接到连接池
    conn.close();
}
```

#### 2.2.2 Python连接池配置

```python
# 使用DBUtils连接池
from dbutils.pooled_db import PooledDB
import pymysql

# 创建连接池
pool = PooledDB(
    creator=pymysql,  # 数据库驱动
    maxconnections=20,  # 最大连接数
    mincached=5,       # 初始化时，链接池中至少创建的空闲链接
    maxcached=10,      # 链接池中最多闲置的链接
    maxshared=3,       # 链接池中最多共享的链接数量
    blocking=True,     # 连接池中如果没有可用连接后，是否阻塞等待
    maxusage=None,     # 一个链接最多被重复使用的次数，None表示无限制
    setsession=[],     # 开始会话前执行的命令列表
    ping=0,            # ping MySQL服务端，检查是否服务可用
    host='localhost',
    port=3306,
    user='username',
    password='password',
    database='mydb',
    charset='utf8mb4'
)

# 获取连接
conn = pool.connection()
try:
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM users")
        result = cursor.fetchall()
finally:
    conn.close()  # 归还连接到连接池
```

#### 2.2.3 Node.js连接池配置

```javascript
// 使用mysql2连接池
const mysql = require('mysql2/promise');

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'username',
    password: 'password',
    database: 'mydb',
    charset: 'utf8mb4',
    connectionLimit: 20,        // 最大连接数
    acquireTimeout: 10000,      // 获取连接超时时间
    timeout: 60000,             // 查询超时时间
    reconnect: true,            // 断线重连
    multipleStatements: false    // 是否允许执行多条SQL语句
});

// 使用连接池
async function query(sql, params) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(sql, params);
        return rows;
    } finally {
        if (connection) connection.release();
    }
}

// 使用示例
(async () => {
    try {
        const users = await query('SELECT * FROM users WHERE id = ?', [1]);
        console.log(users);
    } catch (error) {
        console.error('查询失败:', error);
    }
})();
```

### 2.3 连接泄漏检测与预防

#### 2.3.1 连接泄漏检测

```java
// Java连接泄漏检测
public class ConnectionLeakDetector {
    private static final Map<Connection, StackTraceElement[]> activeConnections = 
        new ConcurrentHashMap<>();
    
    public static Connection trackConnection(Connection conn) {
        activeConnections.put(conn, Thread.currentThread().getStackTrace());
        return new ConnectionWrapper(conn);
    }
    
    public static void releaseConnection(Connection conn) {
        activeConnections.remove(conn);
    }
    
    public static void checkForLeaks() {
        if (!activeConnections.isEmpty()) {
            System.err.println("检测到连接泄漏:");
            for (Map.Entry<Connection, StackTraceElement[]> entry : activeConnections.entrySet()) {
                System.err.println("未释放的连接: " + entry.getKey());
                System.err.println("创建位置:");
                for (StackTraceElement element : entry.getValue()) {
                    System.err.println("\t" + element);
                }
            }
        }
    }
    
    // 连接包装类
    static class ConnectionWrapper implements Connection {
        private final Connection delegate;
        
        public ConnectionWrapper(Connection delegate) {
            this.delegate = delegate;
        }
        
        @Override
        public void close() throws SQLException {
            releaseConnection(this);
            delegate.close();
        }
        
        // 实现其他Connection方法...
    }
}
```

#### 2.3.2 连接泄漏预防

```java
// 使用try-with-resources确保连接释放
public List<User> getUsers() {
    String sql = "SELECT * FROM users";
    List<User> users = new ArrayList<>();
    
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {
        
        while (rs.next()) {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setName(rs.getString("name"));
            users.add(user);
        }
        return users;
    } catch (SQLException e) {
        throw new RuntimeException("查询用户失败", e);
    }
}
```

### 2.4 连接池监控

#### 2.4.1 连接池状态监控

```java
// 连接池状态监控
public class ConnectionPoolMonitor {
    private final BasicDataSource dataSource;
    
    public ConnectionPoolMonitor(BasicDataSource dataSource) {
        this.dataSource = dataSource;
    }
    
    public void printPoolStatus() {
        System.out.println("连接池状态:");
        System.out.println("活跃连接数: " + dataSource.getNumActive());
        System.out.println("空闲连接数: " + dataSource.getNumIdle());
        System.out.println("总连接数: " + dataSource.getNumTotal());
        System.out.println("最大连接数: " + dataSource.getMaxTotal());
        System.out.println("最大空闲连接数: " + dataSource.getMaxIdle());
        System.out.println("最小空闲连接数: " + dataSource.getMinIdle());
    }
    
    // 定时监控
    public void startMonitoring() {
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
        scheduler.scheduleAtFixedRate(this::printPoolStatus, 0, 30, TimeUnit.SECONDS);
    }
}
```

## 3. ORM框架集成

### 3.1 ORM框架概述

对象关系映射（ORM）框架是连接对象模型和关系数据库的桥梁，主要作用包括：

- **对象映射**：将数据库表映射为对象类
- **查询转换**：将对象查询转换为SQL查询
- **结果映射**：将查询结果映射为对象
- **状态管理**：管理对象的生命周期和状态
- **缓存机制**：提供对象缓存提高性能

### 3.2 常用ORM框架

#### 3.2.1 Hibernate

Hibernate是Java生态中最成熟的ORM框架之一：

```java
// Hibernate配置
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    
    @Column(name = "password", nullable = false)
    private String password;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "create_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createTime;
    
    // getters and setters
}

// Hibernate使用示例
public class UserDao {
    private SessionFactory sessionFactory;
    
    public UserDao() {
        Configuration configuration = new Configuration().configure();
        configuration.addAnnotatedClass(User.class);
        ServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder()
            .applySettings(configuration.getProperties()).build();
        sessionFactory = configuration.buildSessionFactory(serviceRegistry);
    }
    
    public User findById(Long id) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(User.class, id);
        }
    }
    
    public List<User> findAll() {
        try (Session session = sessionFactory.openSession()) {
            return session.createQuery("FROM User", User.class).list();
        }
    }
    
    public void save(User user) {
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            session.save(user);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw e;
        }
    }
    
    public void update(User user) {
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            session.update(user);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw e;
        }
    }
    
    public void delete(User user) {
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            session.delete(user);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw e;
        }
    }
}
```

#### 3.2.2 MyBatis

MyBatis是半自动ORM框架，更灵活地控制SQL：

```xml
<!-- MyBatis配置文件 mybatis-config.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" 
"http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mydb?useSSL=false&amp;serverTimezone=UTC"/>
                <property name="username" value="username"/>
                <property name="password" value="password"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>
```

```xml
<!-- UserMapper.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" 
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.mapper.UserMapper">
    <resultMap id="UserResultMap" type="com.example.model.User">
        <id property="id" column="id"/>
        <result property="username" column="username"/>
        <result property="password" column="password"/>
        <result property="email" column="email"/>
        <result property="createTime" column="create_time"/>
    </resultMap>
    
    <select id="findById" parameterType="long" resultMap="UserResultMap">
        SELECT * FROM users WHERE id = #{id}
    </select>
    
    <select id="findAll" resultMap="UserResultMap">
        SELECT * FROM users
    </select>
    
    <insert id="insert" parameterType="com.example.model.User" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO users (username, password, email, create_time)
        VALUES (#{username}, #{password}, #{email}, #{createTime})
    </insert>
    
    <update id="update" parameterType="com.example.model.User">
        UPDATE users
        SET username = #{username}, password = #{password}, email = #{email}
        WHERE id = #{id}
    </update>
    
    <delete id="delete" parameterType="long">
        DELETE FROM users WHERE id = #{id}
    </delete>
</mapper>
```

```java
// UserMapper接口
public interface UserMapper {
    User findById(Long id);
    List<User> findAll();
    int insert(User user);
    int update(User user);
    int delete(Long id);
}

// MyBatis使用示例
public class UserDao {
    private SqlSessionFactory sqlSessionFactory;
    
    public UserDao() {
        try {
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            throw new RuntimeException("初始化MyBatis失败", e);
        }
    }
    
    public User findById(Long id) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            return mapper.findById(id);
        }
    }
    
    public List<User> findAll() {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            UserMapper mapper = session.getMapper(UserMapper.class);
            return mapper.findAll();
        }
    }
    
    public void save(User user) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            try {
                UserMapper mapper = session.getMapper(UserMapper.class);
                mapper.insert(user);
                session.commit();
            } catch (Exception e) {
                session.rollback();
                throw e;
            }
        }
    }
    
    public void update(User user) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            try {
                UserMapper mapper = session.getMapper(UserMapper.class);
                mapper.update(user);
                session.commit();
            } catch (Exception e) {
                session.rollback();
                throw e;
            }
        }
    }
    
    public void delete(Long id) {
        try (SqlSession session = sqlSessionFactory.openSession()) {
            try {
                UserMapper mapper = session.getMapper(UserMapper.class);
                mapper.delete(id);
                session.commit();
            } catch (Exception e) {
                session.rollback();
                throw e;
            }
        }
    }
}
```

#### 3.2.3 SQLAlchemy (Python)

SQLAlchemy是Python中最流行的ORM框架：

```python
# SQLAlchemy模型定义
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    create_time = Column(DateTime, default=datetime.now)
    
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"

# SQLAlchemy使用示例
class UserDao:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        Base.metadata.create_all(self.engine)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()
    
    def find_by_id(self, user_id):
        return self.session.query(User).filter(User.id == user_id).first()
    
    def find_all(self):
        return self.session.query(User).all()
    
    def save(self, user):
        self.session.add(user)
        self.session.commit()
    
    def update(self, user):
        self.session.merge(user)
        self.session.commit()
    
    def delete(self, user_id):
        user = self.find_by_id(user_id)
        if user:
            self.session.delete(user)
            self.session.commit()
    
    def close(self):
        self.session.close()

# 使用示例
if __name__ == "__main__":
    dao = UserDao("mysql+pymysql://username:password@localhost/mydb?charset=utf8mb4")
    
    # 创建用户
    user = User(username="testuser", password="password123", email="test@example.com")
    dao.save(user)
    
    # 查询用户
    user = dao.find_by_id(1)
    print(user)
    
    # 更新用户
    user.email = "newemail@example.com"
    dao.update(user)
    
    # 删除用户
    dao.delete(1)
    
    dao.close()
```

#### 3.2.4 Sequelize (Node.js)

Sequelize是Node.js中流行的ORM框架：

```javascript
// Sequelize模型定义
const { Sequelize, DataTypes } = require('sequelize');

// 创建数据库连接
const sequelize = new Sequelize('mydb', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    charset: 'utf8mb4',
    pool: {
        max: 20,
        min: 5,
        acquire: 30000,
        idle: 10000
    }
});

// 定义User模型
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    createTime: {
        type: DataTypes.DATE,
        field: 'create_time',
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: false
});

// Sequelize使用示例
class UserDao {
    constructor() {
        this.User = User;
    }
    
    async findById(id) {
        return await this.User.findByPk(id);
    }
    
    async findAll() {
        return await this.User.findAll();
    }
    
    async save(userData) {
        return await this.User.create(userData);
    }
    
    async update(id, userData) {
        const user = await this.User.findByPk(id);
        if (user) {
            return await user.update(userData);
        }
        return null;
    }
    
    async delete(id) {
        const user = await this.User.findByPk(id);
        if (user) {
            return await user.destroy();
        }
        return false;
    }
}

// 使用示例
(async () => {
    try {
        // 同步数据库模型
        await sequelize.sync();
        
        const userDao = new UserDao();
        
        // 创建用户
        const user = await userDao.save({
            username: 'testuser',
            password: 'password123',
            email: 'test@example.com'
        });
        console.log('创建用户:', user.toJSON());
        
        // 查询用户
        const foundUser = await userDao.findById(user.id);
        console.log('查询用户:', foundUser.toJSON());
        
        // 更新用户
        const updatedUser = await userDao.update(user.id, {
            email: 'newemail@example.com'
        });
        console.log('更新用户:', updatedUser.toJSON());
        
        // 删除用户
        const deleted = await userDao.delete(user.id);
        console.log('删除用户:', deleted);
        
    } catch (error) {
        console.error('操作失败:', error);
    } finally {
        await sequelize.close();
    }
})();
```

### 3.3 ORM性能优化

#### 3.3.1 批量操作优化

```java
// Hibernate批量插入优化
public void batchInsertUsers(List<User> users) {
    Transaction transaction = null;
    try (Session session = sessionFactory.openSession()) {
        transaction = session.beginTransaction();
        
        for (int i = 0; i < users.size(); i++) {
            session.save(users.get(i));
            
            // 每20条记录清理一次缓存，避免内存溢出
            if (i % 20 == 0) {
                session.flush();
                session.clear();
            }
        }
        
        transaction.commit();
    } catch (Exception e) {
        if (transaction != null) {
            transaction.rollback();
        }
        throw e;
    }
}
```

```python
# SQLAlchemy批量插入优化
def batch_insert_users(session, users):
    try:
        session.bulk_insert_mappings(User, [user.__dict__ for user in users])
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
```

#### 3.3.2 查询优化

```java
// Hibernate查询优化
public List<User> findUsersWithPagination(int page, int pageSize) {
    try (Session session = sessionFactory.openSession()) {
        return session.createQuery("FROM User", User.class)
            .setFirstResult((page - 1) * pageSize)
            .setMaxResults(pageSize)
            .list();
    }
}

// 使用投影查询，只查询需要的字段
public List<UserDTO> findUserNamesAndEmails() {
    try (Session session = sessionFactory.openSession()) {
        return session.createQuery(
            "SELECT new com.example.dto.UserDTO(u.id, u.username, u.email) FROM User u", 
            UserDTO.class)
            .list();
    }
}
```

```python
# SQLAlchemy查询优化
def find_users_with_pagination(session, page, page_size):
    return session.query(User).offset((page - 1) * page_size).limit(page_size).all()

# 使用投影查询，只查询需要的字段
def find_user_names_and_emails(session):
    return session.query(User.id, User.username, User.email).all()
```

#### 3.3.3 缓存配置

```java
// Hibernate二级缓存配置
@Entity
@Table(name = "users")
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class User {
    // ...
}

// Hibernate配置文件
<property name="hibernate.cache.use_second_level_cache">true</property>
<property name="hibernate.cache.region.factory_class">org.hibernate.cache.ehcache.EhCacheRegionFactory</property>
<property name="hibernate.cache.provider_configuration_file_resource_path">ehcache.xml</property>
```

```python
# SQLAlchemy缓存配置
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import event
from sqlalchemy.orm import mapper

# 创建会话工厂
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)

# 配置查询缓存
@event.listens_for(mapper, "after_insert")
def receive_after_insert(mapper, connection, target):
    # 清除相关缓存
    Session.expire_all()
```

## 4. 数据访问层设计

### 4.1 数据访问层概述

数据访问层（Data Access Layer，DAL）是应用程序架构中负责与数据库交互的组件层，主要职责包括：

- **数据持久化**：将对象状态保存到数据库
- **数据检索**：从数据库检索数据并转换为对象
- **事务管理**：管理数据库事务
- **连接管理**：管理数据库连接
- **异常处理**：处理数据库访问异常

### 4.2 数据访问层设计模式

#### 4.2.1 Repository模式

Repository模式将数据访问逻辑封装在Repository类中：

```java
// Repository接口定义
public interface UserRepository {
    User findById(Long id);
    List<User> findAll();
    List<User> findByUsername(String username);
    void save(User user);
    void update(User user);
    void delete(Long id);
    boolean exists(Long id);
    long count();
}

// Repository实现
@Repository
public class UserRepositoryImpl implements UserRepository {
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    public UserRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    
    @Override
    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new UserRowMapper());
    }
    
    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }
    
    @Override
    public List<User> findByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username LIKE ?";
        return jdbcTemplate.query(sql, new Object[]{"%" + username + "%"}, new UserRowMapper());
    }
    
    @Override
    public void save(User user) {
        String sql = "INSERT INTO users (username, password, email, create_time) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getEmail(), user.getCreateTime());
    }
    
    @Override
    public void update(User user) {
        String sql = "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?";
        jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getEmail(), user.getId());
    }
    
    @Override
    public void delete(Long id) {
        String sql = "DELETE FROM users WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
    
    @Override
    public boolean exists(Long id) {
        String sql = "SELECT COUNT(*) FROM users WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{id}, Integer.class);
        return count != null && count > 0;
    }
    
    @Override
    public long count() {
        String sql = "SELECT COUNT(*) FROM users";
        Long count = jdbcTemplate.queryForObject(sql, Long.class);
        return count != null ? count : 0;
    }
    
    // 行映射器
    private static final class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setEmail(rs.getString("email"));
            user.setCreateTime(rs.getTimestamp("create_time"));
            return user;
        }
    }
}
```

```python
# Python Repository模式实现
from abc import ABC, abstractmethod
from typing import List, Optional
import mysql.connector
from mysql.connector import Error
from contextlib import contextmanager

class UserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: int) -> Optional[dict]:
        pass
    
    @abstractmethod
    def find_all(self) -> List[dict]:
        pass
    
    @abstractmethod
    def find_by_username(self, username: str) -> List[dict]:
        pass
    
    @abstractmethod
    def save(self, user: dict) -> int:
        pass
    
    @abstractmethod
    def update(self, user: dict) -> bool:
        pass
    
    @abstractmethod
    def delete(self, user_id: int) -> bool:
        pass
    
    @abstractmethod
    def exists(self, user_id: int) -> bool:
        pass
    
    @abstractmethod
    def count(self) -> int:
        pass

class MySQLUserRepository(UserRepository):
    def __init__(self, db_config):
        self.db_config = db_config
    
    @contextmanager
    def _get_connection(self):
        connection = None
        try:
            connection = mysql.connector.connect(**self.db_config)
            yield connection
        except Error as e:
            if connection:
                connection.rollback()
            raise e
        finally:
            if connection:
                connection.close()
    
    def find_by_id(self, user_id: int) -> Optional[dict]:
        with self._get_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
            result = cursor.fetchone()
            return result
    
    def find_all(self) -> List[dict]:
        with self._get_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM users")
            return cursor.fetchall()
    
    def find_by_username(self, username: str) -> List[dict]:
        with self._get_connection() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM users WHERE username LIKE %s", (f"%{username}%",))
            return cursor.fetchall()
    
    def save(self, user: dict) -> int:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO users (username, password, email, create_time) VALUES (%s, %s, %s, %s)",
                (user['username'], user['password'], user['email'], user.get('create_time'))
            )
            conn.commit()
            return cursor.lastrowid
    
    def update(self, user: dict) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE users SET username = %s, password = %s, email = %s WHERE id = %s",
                (user['username'], user['password'], user['email'], user['id'])
            )
            conn.commit()
            return cursor.rowcount > 0
    
    def delete(self, user_id: int) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
            conn.commit()
            return cursor.rowcount > 0
    
    def exists(self, user_id: int) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM users WHERE id = %s", (user_id,))
            count = cursor.fetchone()[0]
            return count > 0
    
    def count(self) -> int:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM users")
            count = cursor.fetchone()[0]
            return count

# 使用示例
db_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'username',
    'password': 'password',
    'database': 'mydb',
    'charset': 'utf8mb4'
}

user_repo = MySQLUserRepository(db_config)

# 创建用户
user_id = user_repo.save({
    'username': 'testuser',
    'password': 'password123',
    'email': 'test@example.com',
    'create_time': datetime.now()
})

# 查询用户
user = user_repo.find_by_id(user_id)
print(user)

# 更新用户
user['email'] = 'newemail@example.com'
user_repo.update(user)

# 删除用户
user_repo.delete(user_id)
```

#### 4.2.2 Data Mapper模式

Data Mapper模式将对象映射与数据访问分离：

```java
// Data Mapper接口
public interface UserDataMapper {
    User find(Long id);
    List<User> findAll();
    void insert(User user);
    void update(User user);
    void delete(User user);
}

// Data Mapper实现
public class UserDataMapperImpl implements UserDataMapper {
    private final ConnectionFactory connectionFactory;
    
    public UserDataMapperImpl(ConnectionFactory connectionFactory) {
        this.connectionFactory = connectionFactory;
    }
    
    @Override
    public User find(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try (Connection conn = connectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapRowToUser(rs);
                }
                return null;
            }
        } catch (SQLException e) {
            throw new DataAccessException("查询用户失败", e);
        }
    }
    
    @Override
    public List<User> findAll() {
        String sql = "SELECT * FROM users";
        List<User> users = new ArrayList<>();
        try (Connection conn = connectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                users.add(mapRowToUser(rs));
            }
            return users;
        } catch (SQLException e) {
            throw new DataAccessException("查询用户列表失败", e);
        }
    }
    
    @Override
    public void insert(User user) {
        String sql = "INSERT INTO users (username, password, email, create_time) VALUES (?, ?, ?, ?)";
        try (Connection conn = connectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getEmail());
            stmt.setTimestamp(4, new Timestamp(user.getCreateTime().getTime()));
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows == 0) {
                throw new DataAccessException("插入用户失败，未影响任何行");
            }
            
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    user.setId(generatedKeys.getLong(1));
                } else {
                    throw new DataAccessException("插入用户失败，未获取到ID");
                }
            }
        } catch (SQLException e) {
            throw new DataAccessException("插入用户失败", e);
        }
    }
    
    @Override
    public void update(User user) {
        String sql = "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?";
        try (Connection conn = connectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getEmail());
            stmt.setLong(4, user.getId());
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows == 0) {
                throw new DataAccessException("更新用户失败，未找到ID为" + user.getId() + "的用户");
            }
        } catch (SQLException e) {
            throw new DataAccessException("更新用户失败", e);
        }
    }
    
    @Override
    public void delete(User user) {
        String sql = "DELETE FROM users WHERE id = ?";
        try (Connection conn = connectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, user.getId());
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows == 0) {
                throw new DataAccessException("删除用户失败，未找到ID为" + user.getId() + "的用户");
            }
        } catch (SQLException e) {
            throw new DataAccessException("删除用户失败", e);
        }
    }
    
    private User mapRowToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password"));
        user.setEmail(rs.getString("email"));
        user.setCreateTime(rs.getTimestamp("create_time"));
        return user;
    }
}
```

#### 4.2.3 Active Record模式

Active Record模式将数据访问逻辑直接嵌入到领域对象中：

```java
// Active Record实现
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Date createTime;
    
    // 静态方法用于查询
    public static User find(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapRowToUser(rs);
                }
                return null;
            }
        } catch (SQLException e) {
            throw new DataAccessException("查询用户失败", e);
        }
    }
    
    public static List<User> findAll() {
        String sql = "SELECT * FROM users";
        List<User> users = new ArrayList<>();
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                users.add(mapRowToUser(rs));
            }
            return users;
        } catch (SQLException e) {
            throw new DataAccessException("查询用户列表失败", e);
        }
    }
    
    // 实例方法用于保存
    public void save() {
        if (id == null) {
            insert();
        } else {
            update();
        }
    }
    
    private void insert() {
        String sql = "INSERT INTO users (username, password, email, create_time) VALUES (?, ?, ?, ?)";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, username);
            stmt.setString(2, password);
            stmt.setString(3, email);
            stmt.setTimestamp(4, new Timestamp(createTime.getTime()));
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows == 0) {
                throw new DataAccessException("插入用户失败，未影响任何行");
            }
            
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    this.id = generatedKeys.getLong(1);
                } else {
                    throw new DataAccessException("插入用户失败，未获取到ID");
                }
            }
        } catch (SQLException e) {
            throw new DataAccessException("插入用户失败", e);
        }
    }
    
    private void update() {
        String sql = "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, username);
            stmt.setString(2, password);
            stmt.setString(3, email);
            stmt.setLong(4, id);
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows == 0) {
                throw new DataAccessException("更新用户失败，未找到ID为" + id + "的用户");
            }
        } catch (SQLException e) {
            throw new DataAccessException("更新用户失败", e);
        }
    }
    
    // 实例方法用于删除
    public void delete() {
        if (id == null) {
            throw new IllegalStateException("无法删除未保存的用户");
        }
        
        String sql = "DELETE FROM users WHERE id = ?";
        try (Connection conn = ConnectionFactory.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, id);
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows == 0) {
                throw new DataAccessException("删除用户失败，未找到ID为" + id + "的用户");
            }
        } catch (SQLException e) {
            throw new DataAccessException("删除用户失败", e);
        }
    }
    
    private static User mapRowToUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getLong("id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password"));
        user.setEmail(rs.getString("email"));
        user.setCreateTime(rs.getTimestamp("create_time"));
        return user;
    }
    
    // getters and setters
}
```

### 4.3 数据访问层异常处理

#### 4.3.1 自定义异常类

```java
// 数据访问异常基类
public class DataAccessException extends RuntimeException {
    public DataAccessException(String message) {
        super(message);
    }
    
    public DataAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}

// 具体异常类
public class EntityNotFoundException extends DataAccessException {
    public EntityNotFoundException(String message) {
        super(message);
    }
    
    public EntityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class DuplicateEntityException extends DataAccessException {
    public DuplicateEntityException(String message) {
        super(message);
    }
    
    public DuplicateEntityException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class DataIntegrityViolationException extends DataAccessException {
    public DataIntegrityViolationException(String message) {
        super(message);
    }
    
    public DataIntegrityViolationException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

#### 4.3.2 异常处理策略

```java
// 异常处理工具类
public class ExceptionHandler {
    
    public static DataAccessException handleSQLException(SQLException e, String operation) {
        // 根据SQL错误码转换为业务异常
        switch (e.getErrorCode()) {
            case 1062: // 重复键错误
                return new DuplicateEntityException("数据已存在: " + operation, e);
            case 1452: // 外键约束错误
                return new DataIntegrityViolationException("数据完整性错误: " + operation, e);
            case 1045: // 认证错误
                return new DataAccessException("数据库认证失败: " + operation, e);
            case 1049: // 数据库不存在
                return new DataAccessException("数据库不存在: " + operation, e);
            case 1129: // 主机被阻止
            case 1130: // 主机不被允许
                return new DataAccessException("数据库连接被拒绝: " + operation, e);
            default:
                return new DataAccessException("数据库操作失败: " + operation, e);
        }
    }
    
    public static DataAccessException handleConnectionException(SQLException e, String operation) {
        // 处理连接相关异常
        if (e instanceof CommunicationsException || 
            e instanceof SQLNonTransientConnectionException) {
            return new DataAccessException("数据库连接失败: " + operation, e);
        }
        return handleSQLException(e, operation);
    }
}

// 在数据访问层使用异常处理
public class UserRepositoryImpl implements UserRepository {
    // ...
    
    @Override
    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try {
            return jdbcTemplate.queryForObject(sql, new Object[]{id}, new UserRowMapper());
        } catch (EmptyResultDataAccessException e) {
            return null;
        } catch (DataAccessException e) {
            throw e; // 已经是自定义异常，直接抛出
        } catch (Exception e) {
            throw new DataAccessException("查询用户失败", e);
        }
    }
    
    @Override
    public void save(User user) {
        String sql = "INSERT INTO users (username, password, email, create_time) VALUES (?, ?, ?, ?)";
        try {
            jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getEmail(), user.getCreateTime());
        } catch (DuplicateKeyException e) {
            throw new DuplicateEntityException("用户已存在", e);
        } catch (DataAccessException e) {
            throw e; // 已经是自定义异常，直接抛出
        } catch (Exception e) {
            throw new DataAccessException("保存用户失败", e);
        }
    }
}
```

## 5. 性能优化

### 5.1 查询优化

#### 5.1.1 SQL优化技巧

1. **避免SELECT ***
   - 只查询需要的列，减少数据传输量
   - 提高查询效率，减少内存使用

```sql
-- 不推荐
SELECT * FROM users WHERE id = 1;

-- 推荐
SELECT id, username, email FROM users WHERE id = 1;
```

2. **使用索引**
   - 为WHERE条件、JOIN条件、ORDER BY和GROUP BY的列创建索引
   - 避免在索引列上使用函数或表达式

```sql
-- 创建索引
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);

-- 不推荐：在索引列上使用函数
SELECT * FROM users WHERE UPPER(username) = 'ADMIN';

-- 推荐：直接使用索引列
SELECT * FROM users WHERE username = 'admin';
```

3. **优化JOIN操作**
   - 确保JOIN条件有索引
   - 小表驱动大表
   - 使用合适的JOIN类型

```sql
-- 不推荐：没有索引的JOIN
SELECT u.*, o.* FROM users u JOIN orders o ON u.id = o.user_id;

-- 推荐：确保JOIN条件有索引
CREATE INDEX idx_orders_user_id ON orders(user_id);
SELECT u.*, o.* FROM users u JOIN orders o ON u.id = o.user_id;
```

4. **使用LIMIT限制结果集**
   - 避免返回过多数据
   - 实现分页查询

```sql
-- 不推荐：可能返回大量数据
SELECT * FROM users;

-- 推荐：限制结果集大小
SELECT * FROM users LIMIT 100;

-- 分页查询
SELECT * FROM users LIMIT 20 OFFSET 40;  -- 第3页，每页20条
```

#### 5.1.2 批量操作优化

1. **批量插入**

```java
// 使用JDBC批量插入
public void batchInsertUsers(List<User> users) {
    String sql = "INSERT INTO users (username, password, email, create_time) VALUES (?, ?, ?, ?)";
    
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        conn.setAutoCommit(false);  // 关闭自动提交
        
        for (User user : users) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getEmail());
            stmt.setTimestamp(4, new Timestamp(user.getCreateTime().getTime()));
            stmt.addBatch();  // 添加到批处理
        }
        
        int[] results = stmt.executeBatch();  // 执行批处理
        conn.commit();  // 提交事务
        
    } catch (SQLException e) {
        throw new DataAccessException("批量插入用户失败", e);
    }
}
```

```python
# 使用Python批量插入
def batch_insert_users(users):
    sql = "INSERT INTO users (username, password, email, create_time) VALUES (%s, %s, %s, %s)"
    values = [(user['username'], user['password'], user['email'], user['create_time']) 
              for user in users]
    
    try:
        with connection.cursor() as cursor:
            cursor.executemany(sql, values)
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise e
```

2. **批量更新**

```java
// 使用JDBC批量更新
public void batchUpdateUsers(List<User> users) {
    String sql = "UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?";
    
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        conn.setAutoCommit(false);  // 关闭自动提交
        
        for (User user : users) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, user.getEmail());
            stmt.setLong(4, user.getId());
            stmt.addBatch();  // 添加到批处理
        }
        
        int[] results = stmt.executeBatch();  // 执行批处理
        conn.commit();  // 提交事务
        
    } catch (SQLException e) {
        throw new DataAccessException("批量更新用户失败", e);
    }
}
```

#### 5.1.3 分页查询优化

```java
// 使用游标分页（适用于大数据量）
public List<User> findUsersByCursor(Long lastId, int limit) {
    String sql = "SELECT * FROM users WHERE id > ? ORDER BY id LIMIT ?";
    
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        stmt.setLong(1, lastId != null ? lastId : 0);
        stmt.setInt(2, limit);
        
        try (ResultSet rs = stmt.executeQuery()) {
            List<User> users = new ArrayList<>();
            while (rs.next()) {
                users.add(mapRowToUser(rs));
            }
            return users;
        }
    } catch (SQLException e) {
        throw new DataAccessException("分页查询用户失败", e);
    }
}

// 使用偏移分页（适用于小数据量）
public List<User> findUsersByOffset(int page, int pageSize) {
    String sql = "SELECT * FROM users ORDER BY id LIMIT ? OFFSET ?";
    
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        stmt.setInt(1, pageSize);
        stmt.setInt(2, (page - 1) * pageSize);
        
        try (ResultSet rs = stmt.executeQuery()) {
            List<User> users = new ArrayList<>();
            while (rs.next()) {
                users.add(mapRowToUser(rs));
            }
            return users;
        }
    } catch (SQLException e) {
        throw new DataAccessException("分页查询用户失败", e);
    }
}
```

### 5.2 连接池优化

#### 5.2.1 连接池参数调优

```java
// 连接池参数优化
BasicDataSource dataSource = new BasicDataSource();
dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
dataSource.setUrl("jdbc:mysql://localhost:3306/mydb?useSSL=false&serverTimezone=UTC");
dataSource.setUsername("username");
dataSource.setPassword("password");

// 连接池大小优化
int corePoolSize = Runtime.getRuntime().availableProcessors() * 2;  // 核心连接数
int maxPoolSize = corePoolSize * 2;  // 最大连接数

dataSource.setInitialSize(corePoolSize);        // 初始连接数
dataSource.setMaxTotal(maxPoolSize);            // 最大连接数
dataSource.setMaxIdle(corePoolSize);            // 最大空闲连接数
dataSource.setMinIdle(corePoolSize / 2);        // 最小空闲连接数

// 连接验证优化
dataSource.setValidationQuery("SELECT 1");
dataSource.setTestOnBorrow(false);              // 借用时不验证，提高性能
dataSource.setTestOnReturn(false);              // 归还时不验证，提高性能
dataSource.setTestWhileIdle(true);              // 空闲时验证
dataSource.setTimeBetweenEvictionRunsMillis(30000);  // 空闲连接检测间隔
dataSource.setMinEvictableIdleTimeMillis(60000);      // 空闲连接最小存活时间
dataSource.setNumTestsPerEvictionRun(maxPoolSize / 2); // 每次检测的连接数

// 连接等待优化
dataSource.setMaxWaitMillis(10000);  // 获取连接最大等待时间
dataSource.setRemoveAbandonedOnBorrow(true);  // 移除被遗弃的连接
dataSource.setRemoveAbandonedTimeout(300);     // 连接被遗弃的超时时间
dataSource.setLogAbandoned(true);             // 记录被遗弃的连接
```

#### 5.2.2 连接池监控

```java
// 连接池监控工具
public class ConnectionPoolMonitor {
    private final BasicDataSource dataSource;
    private final ScheduledExecutorService scheduler;
    
    public ConnectionPoolMonitor(BasicDataSource dataSource) {
        this.dataSource = dataSource;
        this.scheduler = Executors.newScheduledThreadPool(1);
    }
    
    public void startMonitoring() {
        scheduler.scheduleAtFixedRate(this::logPoolStatus, 0, 30, TimeUnit.SECONDS);
    }
    
    public void stopMonitoring() {
        scheduler.shutdown();
    }
    
    private void logPoolStatus() {
        int numActive = dataSource.getNumActive();
        int numIdle = dataSource.getNumIdle();
        int maxTotal = dataSource.getMaxTotal();
        int maxIdle = dataSource.getMaxIdle();
        int minIdle = dataSource.getMinIdle();
        
        double activeRatio = (double) numActive / maxTotal * 100;
        double idleRatio = (double) numIdle / maxIdle * 100;
        
        String status = String.format(
            "连接池状态 - 活跃: %d/%d (%.1f%%), 空闲: %d/%d (%.1f%%), 最大空闲: %d, 最小空闲: %d",
            numActive, maxTotal, activeRatio, numIdle, maxIdle, idleRatio, maxIdle, minIdle
        );
        
        System.out.println(status);
        
        // 警告连接池使用率过高
        if (activeRatio > 80) {
            System.err.println("警告: 连接池使用率过高 (" + activeRatio + "%)");
        }
        
        // 警告空闲连接不足
        if (numIdle < minIdle) {
            System.err.println("警告: 空闲连接不足 (" + numIdle + " < " + minIdle + ")");
        }
    }
}
```

### 5.3 缓存策略

#### 5.3.1 应用级缓存

```java
// 使用Guava Cache实现应用级缓存
public class UserRepositoryWithCache {
    private final UserRepository delegate;
    private final Cache<Long, User> userCache;
    
    public UserRepositoryWithCache(UserRepository delegate) {
        this.delegate = delegate;
        this.userCache = CacheBuilder.newBuilder()
            .maximumSize(1000)  // 最大缓存条目数
            .expireAfterWrite(10, TimeUnit.MINUTES)  // 写入后10分钟过期
            .expireAfterAccess(5, TimeUnit.MINUTES)  // 访问后5分钟过期
            .recordStats()  // 记录统计信息
            .build();
    }
    
    public User findById(Long id) {
        try {
            // 尝试从缓存获取
            return userCache.get(id, () -> delegate.findById(id));
        } catch (ExecutionException e) {
            throw new DataAccessException("查询用户失败", e.getCause());
        }
    }
    
    public void update(User user) {
        delegate.update(user);
        // 更新缓存
        userCache.put(user.getId(), user);
    }
    
    public void delete(Long id) {
        delegate.delete(id);
        // 从缓存中移除
        userCache.invalidate(id);
    }
    
    public void clearCache() {
        userCache.invalidateAll();
    }
    
    public CacheStats getCacheStats() {
        return userCache.stats();
    }
}
```

#### 5.3.2 Redis缓存集成

```java
// 使用Redis作为分布式缓存
public class UserRepositoryWithRedis {
    private final UserRepository delegate;
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String USER_KEY_PREFIX = "user:";
    private static final long CACHE_EXPIRE_SECONDS = 600;  // 10分钟
    
    public UserRepositoryWithRedis(UserRepository delegate, RedisTemplate<String, Object> redisTemplate) {
        this.delegate = delegate;
        this.redisTemplate = redisTemplate;
    }
    
    public User findById(Long id) {
        String key = USER_KEY_PREFIX + id;
        
        // 尝试从Redis获取
        User user = (User) redisTemplate.opsForValue().get(key);
        if (user != null) {
            return user;
        }
        
        // 从数据库获取
        user = delegate.findById(id);
        if (user != null) {
            // 存入Redis
            redisTemplate.opsForValue().set(key, user, CACHE_EXPIRE_SECONDS, TimeUnit.SECONDS);
        }
        
        return user;
    }
    
    public void update(User user) {
        delegate.update(user);
        
        // 更新Redis缓存
        String key = USER_KEY_PREFIX + user.getId();
        redisTemplate.opsForValue().set(key, user, CACHE_EXPIRE_SECONDS, TimeUnit.SECONDS);
    }
    
    public void delete(Long id) {
        delegate.delete(id);
        
        // 从Redis中移除
        String key = USER_KEY_PREFIX + id;
        redisTemplate.delete(key);
    }
    
    public void clearCache() {
        // 删除所有用户缓存
        Set<String> keys = redisTemplate.keys(USER_KEY_PREFIX + "*");
        if (!keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }
}
```

## 6. 安全实践

### 6.1 SQL注入防护

#### 6.1.1 使用参数化查询

```java
// 不安全：字符串拼接SQL（易受SQL注入攻击）
public User findByUsernameUnsafe(String username) {
    String sql = "SELECT * FROM users WHERE username = '" + username + "'";
    // 如果username传入 "admin' OR '1'='1"，SQL变为：
    // SELECT * FROM users WHERE username = 'admin' OR '1'='1'
    // 将返回所有用户记录
    // ...
}

// 安全：使用参数化查询
public User findByUsernameSafe(String username) {
    String sql = "SELECT * FROM users WHERE username = ?";
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        stmt.setString(1, username);
        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                return mapRowToUser(rs);
            }
            return null;
        }
    } catch (SQLException e) {
        throw new DataAccessException("查询用户失败", e);
    }
}
```

#### 6.1.2 输入验证与过滤

```java
// 输入验证工具类
public class InputValidator {
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_]{3,20}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    
    public static boolean isValidUsername(String username) {
        return username != null && USERNAME_PATTERN.matcher(username).matches();
    }
    
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
    
    public static String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        // 移除潜在的恶意字符
        return input.replaceAll("[';\"\\-\\-]", "");
    }
}

// 在数据访问层使用输入验证
public User findByUsername(String username) {
    // 验证输入
    if (!InputValidator.isValidUsername(username)) {
        throw new IllegalArgumentException("无效的用户名");
    }
    
    // 进一步清理输入
    username = InputValidator.sanitizeInput(username);
    
    String sql = "SELECT * FROM users WHERE username = ?";
    try (Connection conn = dataSource.getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {
        
        stmt.setString(1, username);
        try (ResultSet rs = stmt.executeQuery()) {
            if (rs.next()) {
                return mapRowToUser(rs);
            }
            return null;
        }
    } catch (SQLException e) {
        throw new DataAccessException("查询用户失败", e);
    }
}
```

### 6.2 数据加密

#### 6.2.1 密码加密存储

```java
// 密码加密工具类
public class PasswordEncoder {
    private static final int SALT_LENGTH = 16;
    private static final int ITERATIONS = 10000;
    private static final int KEY_LENGTH = 256;
    
    // 生成随机盐值
    public static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[SALT_LENGTH];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }
    
    // 加密密码
    public static String encodePassword(String password, String salt) {
        try {
            PBEKeySpec spec = new PBEKeySpec(
                password.toCharArray(), 
                Base64.getDecoder().decode(salt), 
                ITERATIONS, 
                KEY_LENGTH
            );
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            byte[] hash = skf.generateSecret(spec).getEncoded();
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException("密码加密失败", e);
        }
    }
    
    // 验证密码
    public static boolean matches(String rawPassword, String encodedPassword, String salt) {
        String newEncodedPassword = encodePassword(rawPassword, salt);
        return newEncodedPassword.equals(encodedPassword);
    }
}

// 用户服务中使用密码加密
public class UserService {
    private UserRepository userRepository;
    
    public void registerUser(String username, String password, String email) {
        // 生成盐值
        String salt = PasswordEncoder.generateSalt();
        
        // 加密密码
        String encodedPassword = PasswordEncoder.encodePassword(password, salt);
        
        // 创建用户
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setSalt(salt);
        user.setEmail(email);
        user.setCreateTime(new Date());
        
        userRepository.save(user);
    }
    
    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false;
        }
        
        return PasswordEncoder.matches(password, user.getPassword(), user.getSalt());
    }
}
```

#### 6.2.2 敏感数据加密

```java
// 敏感数据加密工具类
public class DataEncryption {
    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    private static final String SECRET_KEY = "ThisIsASecretKey";  // 实际应用中应从安全配置中获取
    private static final String IV = "RandomInitVector";  // 初始化向量
    
    private static SecretKeySpec secretKey;
    private static IvParameterSpec ivParameterSpec;
    
    static {
        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            byte[] key = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
            key = sha.digest(key);
            key = Arrays.copyOf(key, 16);  // AES-128
            secretKey = new SecretKeySpec(key, "AES");
            ivParameterSpec = new IvParameterSpec(IV.getBytes(StandardCharsets.UTF_8));
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("初始化加密失败", e);
        }
    }
    
    // 加密
    public static String encrypt(String data) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParameterSpec);
            byte[] encrypted = cipher.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new RuntimeException("数据加密失败", e);
        }
    }
    
    // 解密
    public static String decrypt(String encryptedData) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, ivParameterSpec);
            byte[] decoded = Base64.getDecoder().decode(encryptedData);
            byte[] decrypted = cipher.doFinal(decoded);
            return new String(decrypted);
        } catch (Exception e) {
            throw new RuntimeException("数据解密失败", e);
        }
    }
}

// 在数据访问层使用加密
public class UserRepository {
    // ...
    
    public void save(User user) {
        // 加密敏感字段
        String encryptedEmail = DataEncryption.encrypt(user.getEmail());
        String encryptedPhone = DataEncryption.encrypt(user.getPhone());
        
        String sql = "INSERT INTO users (username, password, email, phone, create_time) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            stmt.setString(3, encryptedEmail);
            stmt.setString(4, encryptedPhone);
            stmt.setTimestamp(5, new Timestamp(user.getCreateTime().getTime()));
            
            stmt.executeUpdate();
        } catch (SQLException e) {
            throw new DataAccessException("保存用户失败", e);
        }
    }
    
    public User findById(Long id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    User user = mapRowToUser(rs);
                    
                    // 解密敏感字段
                    user.setEmail(DataEncryption.decrypt(rs.getString("email")));
                    user.setPhone(DataEncryption.decrypt(rs.getString("phone")));
                    
                    return user;
                }
                return null;
            }
        } catch (SQLException e) {
            throw new DataAccessException("查询用户失败", e);
        }
    }
}
```

### 6.3 连接安全

#### 6.3.1 SSL/TLS配置

```java
// 配置SSL连接
public class SecureConnectionFactory {
    public static Connection createSecureConnection() throws SQLException {
        String url = "jdbc:mysql://localhost:3306/mydb?" +
                     "useSSL=true" +                    // 启用SSL
                     "verifyServerCertificate=true" +     // 验证服务器证书
                     "requireSSL=true" +                 // 要求SSL连接
                     "clientCertificateKeyStoreUrl=file:/path/to/client-keystore.jks" +
                     "clientCertificateKeyStorePassword=password" +
                     "trustCertificateKeyStoreUrl=file:/path/to/truststore.jks" +
                     "trustCertificateKeyStorePassword=password";
        
        return DriverManager.getConnection(url, "username", "password");
    }
}
```

#### 6.3.2 连接字符串安全

```java
// 安全的连接字符串管理
public class ConnectionStringManager {
    private static final String ENCRYPTED_CONNECTION_STRING = "加密的连接字符串";
    
    // 从安全配置中获取连接字符串
    public static String getConnectionString() {
        // 从环境变量或配置服务获取加密的连接字符串
        String encrypted = System.getenv("DB_CONNECTION_STRING");
        if (encrypted == null) {
            encrypted = ENCRYPTED_CONNECTION_STRING;
        }
        
        // 解密连接字符串
        return DataEncryption.decrypt(encrypted);
    }
    
    // 创建数据源
    public static DataSource createDataSource() {
        String connectionString = getConnectionString();
        
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setUrl(connectionString);
        dataSource.setUsername(getUsername());
        dataSource.setPassword(getPassword());
        
        return dataSource;
    }
    
    private static String getUsername() {
        // 从安全配置获取用户名
        String encrypted = System.getenv("DB_USERNAME");
        if (encrypted == null) {
            return "default_username";
        }
        return DataEncryption.decrypt(encrypted);
    }
    
    private static String getPassword() {
        // 从安全配置获取密码
        String encrypted = System.getenv("DB_PASSWORD");
        if (encrypted == null) {
            return "default_password";
        }
        return DataEncryption.decrypt(encrypted);
    }
}
```

## 总结

应用程序与MySQL的集成是开发过程中至关重要的一环，良好的集成实践能够提高系统的性能、安全性和可维护性。

### 关键要点

1. **连接管理**：使用连接池管理数据库连接，避免频繁创建和销毁连接。
2. **ORM框架**：选择合适的ORM框架，简化数据访问代码，提高开发效率。
3. **数据访问层**：采用合适的设计模式，如Repository、Data Mapper或Active Record。
4. **性能优化**：优化SQL查询、使用批量操作、实现分页查询、调优连接池参数。
5. **缓存策略**：实现应用级缓存或使用Redis等分布式缓存，减少数据库访问。
6. **安全实践**：防止SQL注入、加密敏感数据、使用SSL/TLS保护连接。

通过遵循这些最佳实践，可以构建出高效、安全、可维护的应用程序与MySQL集成方案。