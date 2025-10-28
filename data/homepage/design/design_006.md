# 第6章：设计模式实战应用

## 目录

- [1. 设计模式组合应用](#1-设计模式组合应用)
  - [1.1 模式组合的原则与方法](#11-模式组合的原则与方法)
  - [1.2 常见模式组合案例分析](#12-常见模式组合案例分析)
  - [1.3 模式组合的注意事项](#13-模式组合的注意事项)
  - [1.4 复杂系统中的模式应用策略](#14-复杂系统中的模式应用策略)
- [2. 设计模式在框架中的应用](#2-设计模式在框架中的应用)
  - [2.1 主流框架中的设计模式应用](#21-主流框架中的设计模式应用)
  - [2.2 框架设计中的模式选择](#22-框架设计中的模式选择)
  - [2.3 框架扩展中的模式应用](#23-框架扩展中的模式应用)
  - [2.4 框架与设计模式的相互影响](#24-框架与设计模式的相互影响)
- [3. 设计模式在游戏开发中的应用](#3-设计模式在游戏开发中的应用)
  - [3.1 游戏引擎中的设计模式](#31-游戏引擎中的设计模式)
  - [3.2 游戏对象管理中的模式应用](#32-游戏对象管理中的模式应用)
  - [3.3 游戏AI中的模式应用](#33-游戏ai中的模式应用)
  - [3.4 游戏UI中的模式应用](#34-游戏ui中的模式应用)
- [4. 设计模式在GUI开发中的应用](#4-设计模式在gui开发中的应用)
  - [4.1 MVC模式及其变体](#41-mvc模式及其变体)
  - [4.2 事件处理与命令模式](#42-事件处理与命令模式)
  - [4.3 界面布局与组合模式](#43-界面布局与组合模式)
  - [4.4 数据绑定与适配器模式](#44-数据绑定与适配器模式)
- [5. 设计模式在网络编程中的应用](#5-设计模式在网络编程中的应用)
  - [5.1 网络协议处理中的模式应用](#51-网络协议处理中的模式应用)
  - [5.2 并发处理与异步通信](#52-并发处理与异步通信)
  - [5.3 网络架构与服务发现](#53-网络架构与服务发现)
  - [5.4 负载均衡与容错处理](#54-负载均衡与容错处理)
- [6. 实战案例分析：日志系统](#6-实战案例分析：日志系统)
  - [6.1 需求分析](#61-需求分析)
  - [6.2 设计方案](#62-设计方案)
  - [6.3 应用的设计模式](#63-应用的设计模式)
  - [6.4 实现细节与代码示例](#64-实现细节与代码示例)
  - [6.5 扩展性与维护性分析](#65-扩展性与维护性分析)
- [7. 实战案例分析：缓存系统](#7-实战案例分析：缓存系统)
  - [7.1 需求分析](#71-需求分析)
  - [7.2 设计方案](#72-设计方案)
  - [7.3 应用的设计模式](#73-应用的设计模式)
  - [7.4 实现细节与代码示例](#74-实现细节与代码示例)
  - [7.5 扩展性与维护性分析](#75-扩展性与维护性分析)
- [8. 实战案例分析：插件系统](#8-实战案例分析：插件系统)
  - [8.1 需求分析](#81-需求分析)
  - [8.2 设计方案](#82-设计方案)
  - [8.3 应用的设计模式](#83-应用的设计模式)
  - [8.4 实现细节与代码示例](#84-实现细节与代码示例)
  - [8.5 扩展机制分析](#85-扩展机制分析)
- [9. 章节总结](#9-章节总结)
  - [9.1 设计模式实战应用的综合分析](#91-设计模式实战应用的综合分析)
    - [9.1.1 设计模式选择的决策框架](#911-设计模式选择的决策框架)
    - [9.1.2 设计模式组合应用的策略](#912-设计模式组合应用的策略)
    - [9.1.3 设计模式与系统架构的关系](#913-设计模式与系统架构的关系)
    - [9.1.4 设计模式应用的常见陷阱与规避策略](#914-设计模式应用的常见陷阱与规避策略)
    - [9.1.5 设计模式与现代开发范式的融合](#915-设计模式与现代开发范式的融合)
    - [9.1.6 设计模式学习与实践路径](#916-设计模式学习与实践路径)
    - [9.1.7 设计模式的未来发展趋势](#917-设计模式的未来发展趋势)
- [10. 结语](#10-结语)

## 章节概述

理论学习的最终目的是应用于实践。设计模式作为软件工程领域的最佳实践，其价值在于解决实际开发中的复杂问题。本章通过实际案例展示如何在真实项目中应用设计模式，包括设计模式的组合应用、在特定领域中的应用，以及如何在实际开发过程中识别和应用合适的设计模式。

设计模式的实战应用是一个将抽象理论转化为具体解决方案的过程，需要开发者具备深厚的理论基础和丰富的实践经验。在实际项目中，单一设计模式往往难以解决复杂问题，需要多种模式的组合应用；同时，不同领域的应用场景对设计模式的选择和应用方式也有特殊要求。

本章将从多个维度探讨设计模式的实战应用：首先介绍设计模式的组合应用原则和方法，然后分析设计模式在不同领域（框架开发、游戏开发、GUI开发、网络编程）中的应用特点，最后通过三个典型案例（日志系统、缓存系统、插件系统）展示设计模式的实际应用过程。通过这些内容，读者将能够更好地理解设计模式的实践价值，掌握在实际项目中识别和应用设计模式的能力。

## 学习目标

- 掌握设计模式的组合应用技巧
- 了解设计模式在不同领域中的应用
- 学会在实际项目中识别和应用设计模式
- 理解设计模式与软件架构的关系

## 章节内容

### 1. 设计模式组合应用

在复杂的软件系统中，单一设计模式往往难以解决所有问题，需要多种设计模式的组合应用。设计模式的组合不是简单的叠加，而是基于系统需求和设计原则的有机融合，能够产生比单一模式更强大的解决方案。

#### 1.1 模式组合的原则与方法

设计模式组合应遵循以下原则：

1. **目标一致性原则**：组合的各个模式应服务于同一设计目标，避免模式间的目标冲突。
2. **职责分离原则**：每个模式负责解决特定问题，避免职责重叠和混乱。
3. **松耦合原则**：模式间的依赖应尽可能松散，降低系统的复杂性。
4. **渐进式组合原则**：从简单到复杂，逐步引入模式，避免一次性引入过多模式。

模式组合的主要方法包括：

1. **层次组合**：在不同抽象层次上应用不同模式，如架构层使用分层模式，设计层使用工厂模式，实现层使用单例模式。
2. **并行组合**：在同一层次上应用多个互补的模式，如同时使用观察者模式和命令模式处理事件。
3. **嵌套组合**：在一个模式内部嵌入另一个模式，如在策略模式的具体策略中使用工厂模式创建对象。
4. **序列组合**：按时间顺序应用不同模式，如先使用建造者模式构建复杂对象，再使用迭代器模式遍历对象集合。

#### 1.2 常见模式组合案例分析

1. **MVC与观察者模式组合**：
   - MVC（Model-View-Controller）架构本身就是一个复合模式
   - 模型与视图间通过观察者模式实现数据绑定
   - 控制器通过命令模式封装用户操作
   - 这种组合广泛应用于GUI框架和Web框架中

2. **工厂方法与单例模式组合**：
   - 工厂方法负责创建对象，单例模式确保对象唯一性
   - 适用于需要全局唯一对象的场景，如日志管理器、配置管理器
   - 示例代码：
   ```cpp
   class Logger {
   private:
       static Logger* instance;
       Logger() {} // 私有构造函数
       
   public:
       static Logger* getInstance() {
           if (instance == nullptr) {
               instance = new Logger();
           }
           return instance;
       }
       
       void log(const std::string& message) {
           // 日志记录实现
       }
   };
   
   Logger* Logger::instance = nullptr;
   
   // 工厂方法
   class LoggerFactory {
   public:
       static Logger* createLogger() {
           return Logger::getInstance();
       }
   };
   ```

3. **策略模式与工厂模式组合**：
   - 工厂模式负责创建策略对象
   - 策略模式定义可互换的算法族
   - 适用于需要动态选择算法的场景
   - 示例代码：
   ```cpp
   // 策略接口
   class SortStrategy {
   public:
       virtual void sort(std::vector<int>& data) = 0;
       virtual ~SortStrategy() {}
   };
   
   // 具体策略
   class QuickSort : public SortStrategy {
   public:
       void sort(std::vector<int>& data) override {
           // 快速排序实现
       }
   };
   
   class MergeSort : public SortStrategy {
   public:
       void sort(std::vector<int>& data) override {
           // 归并排序实现
       }
   };
   
   // 工厂类
   class SortStrategyFactory {
   public:
       static std::unique_ptr<SortStrategy> createStrategy(const std::string& type) {
           if (type == "quick") {
               return std::make_unique<QuickSort>();
           } else if (type == "merge") {
               return std::make_unique<MergeSort>();
           }
           return nullptr;
       }
   };
   ```

4. **装饰器模式与组合模式组合**：
   - 组合模式构建对象树结构
   - 装饰器模式动态添加功能
   - 适用于需要为复杂对象结构动态添加功能的场景
   - 常见于GUI组件和文件系统实现

#### 1.3 模式组合的注意事项

在进行设计模式组合时，需要注意以下问题：

1. **避免过度设计**：不要为了使用模式而使用模式，应根据实际需求选择合适的模式组合。
2. **控制复杂性**：模式组合会增加系统复杂性，应确保团队具备足够的技术能力理解和维护。
3. **文档化设计决策**：详细记录模式组合的原因、方式和预期效果，便于后续维护。
4. **性能考虑**：某些模式组合可能影响系统性能，需要进行性能测试和优化。
5. **测试策略**：设计合适的测试策略，确保模式组合的正确性和稳定性。

#### 1.4 复杂系统中的模式应用策略

在复杂系统中应用设计模式，需要采用系统化的方法：

1. **分层架构中的模式应用**：
   - 表示层：MVC、MVP、MVVM等模式
   - 业务层：策略模式、命令模式、状态模式等
   - 持久层：数据访问对象(DAO)模式、活动记录模式等
   - 基础设施层：单例模式、工厂模式、代理模式等

2. **微服务架构中的模式应用**：
   - 服务发现：服务定位器模式
   - API网关：外观模式、代理模式
   - 服务间通信：命令模式、观察者模式
   - 数据一致性： saga模式（补偿事务模式）

3. **分布式系统中的模式应用**：
   - 负载均衡：策略模式
   - 缓存管理：代理模式、享元模式
   - 分布式锁：单例模式
   - 消息队列：发布-订阅模式（观察者模式的变体）

4. **大数据处理中的模式应用**：
   - 数据处理管道：建造者模式、命令模式
   - 任务调度：策略模式、模板方法模式
   - 数据存储：工厂模式、适配器模式

通过合理的设计模式组合，可以构建出更加灵活、可维护和可扩展的软件系统，有效应对复杂业务场景和技术挑战。

### 2. 设计模式在框架中的应用

软件框架是提供通用功能的半成品应用，设计模式在框架开发中扮演着至关重要的角色。框架通过设计模式提供了可扩展的架构，使开发者能够在此基础上快速构建应用程序。了解框架中的设计模式应用，不仅有助于更好地使用框架，也能为自定义框架设计提供参考。

### 2.1 主流框架中的设计模式应用

1. **Spring框架中的设计模式**：
   - **工厂模式**：BeanFactory和ApplicationContext负责创建和管理Bean对象
   - **单例模式**：默认情况下，Spring容器中的Bean是单例的
   - **代理模式**：AOP实现基于动态代理，为方法调用添加额外行为
   - **依赖注入**：通过控制反转(IoC)实现对象间的解耦
   - **模板方法模式**：JdbcTemplate、HibernateTemplate等模板类简化了资源管理
   - **观察者模式**：ApplicationEvent和ApplicationListener实现事件驱动架构

2. **Hibernate框架中的设计模式**：
   - **数据访问对象(DAO)模式**：封装数据访问逻辑
   - **工作单元模式**：Session管理对象的持久化操作
   - **标识符映射模式**：通过ID映射数据库记录和对象
   - **延迟加载模式**：按需加载关联对象，提高性能
   - **元数据映射模式**：通过注解或XML映射对象和数据库表

3. **ASP.NET Core框架中的设计模式**：
   - **依赖注入容器**：内置IoC容器管理服务生命周期
   - **中间件模式**：管道式处理HTTP请求
   - **选项模式**：强类型配置管理
   - **工厂模式**：各种工厂类创建复杂对象
   - **过滤器模式**：MVC中的授权、异常、资源过滤器

4. **React框架中的设计模式**：
   - **组件模式**：UI被分解为可复用的组件
   - **高阶组件模式**：函数作为参数，返回新的组件
   - **提供者模式**：Context API实现跨组件状态共享
   - **渲染道具模式**：通过props传递可复用逻辑
   - **合成模式**：多个组件组合成更复杂的UI

### 2.2 框架设计中的模式选择

在框架设计中，选择合适的设计模式需要考虑以下因素：

1. **框架目标与范围**：
   - 通用框架倾向于使用更抽象的模式，如工厂模式、策略模式
   - 专用框架可以使用更具体的模式，如特定领域的模式

2. **性能要求**：
   - 高性能框架可能避免使用增加开销的模式，如装饰器模式
   - 开发效率优先的框架可以使用更多模式简化开发

3. **易用性考虑**：
   - 框架应隐藏复杂性，使用外观模式提供简单接口
   - 使用模板方法模式定义扩展点，降低使用难度

4. **扩展性需求**：
   - 插件式框架使用观察者模式、命令模式支持扩展
   - 分层框架使用适配器模式、桥接模式实现层间解耦

5. **维护与演化**：
   - 使用策略模式封装变化点，便于后续修改
   - 使用抽象工厂模式支持多种实现方式

### 2.3 框架扩展中的模式应用

框架扩展是框架设计的重要方面，设计模式在扩展机制中发挥关键作用：

1. **插件架构扩展**：
   - **观察者模式**：框架发布事件，插件响应事件
   - **策略模式**：插件提供不同的算法实现
   - **命令模式**：插件封装可执行的操作
   - **工厂模式**：插件注册和创建机制

2. **中间件扩展**：
   - **责任链模式**：请求在一系列中间件中传递处理
   - **装饰器模式**：中间件为核心功能添加额外行为
   - **模板方法模式**：定义中间件处理流程，子类实现具体逻辑

3. **配置扩展**：
   - **建造者模式**：复杂配置对象的构建
   - **组合模式**：配置项的树形结构表示
   - **享元模式**：共享配置对象，减少内存占用

4. **数据访问扩展**：
   - **适配器模式**：适配不同的数据源
   - **桥接模式**：分离数据访问抽象和实现
   - **代理模式**：添加缓存、日志等横切关注点

### 2.4 框架与设计模式的相互影响

框架与设计模式之间存在相互促进的关系：

1. **框架推动模式创新**：
   - 框架的特殊需求催生了新的设计模式
   - 例如：MVC模式源于Smalltalk-80框架
   - 依赖注入模式由早期IoC容器发展而来

2. **模式指导框架设计**：
   - 已有设计模式为框架设计提供指导
   - 模式帮助框架设计者避免常见陷阱
   - 模式提供框架设计的通用词汇

3. **框架简化模式应用**：
   - 框架内置模式实现，简化开发者使用
   - 例如：Spring框架内置了工厂模式、单例模式等
   - 开发者无需手动实现这些模式

4. **模式促进框架标准化**：
   - 使用相同模式的框架具有相似的API
   - 降低开发者学习新框架的成本
   - 促进框架间的互操作性

5. **框架演化与模式演进**：
   - 随着框架发展，某些模式可能不再适用
   - 新的模式可能更适合新的框架架构
   - 框架和模式共同演进，相互适应

通过理解设计模式在框架中的应用，开发者可以更好地利用框架提供的功能，避免重复造轮子，同时也能为框架的设计和扩展提供有价值的参考。框架是设计模式应用的集大成者，研究框架中的模式应用是学习设计模式实战的绝佳途径。

## 3. 设计模式在游戏开发中的应用

游戏开发是一个高度复杂的领域，涉及实时渲染、物理模拟、人工智能、用户交互等多个方面。设计模式在游戏开发中扮演着重要角色，帮助开发者管理复杂性、提高代码复用性，并确保系统具有良好的扩展性和维护性。游戏引擎和游戏框架大量使用设计模式来提供灵活的架构，使开发者能够专注于游戏逻辑的实现。

### 3.1 游戏引擎中的设计模式

1. **组件模式(Component Pattern)**：
   - 将游戏对象的功能分解为独立的组件
   - 每个组件负责特定的功能，如渲染、物理、AI等
   - 通过组合不同组件创建多样化的游戏对象
   - Unity引擎广泛使用此模式

2. **实体组件系统(ECS, Entity Component System)**：
   - 组件模式的演进，更加注重数据驱动
   - 实体只是ID，组件是纯数据，系统处理组件
   - 提高缓存友好性和并行处理能力
   - 适用于大型游戏和性能敏感的场景

3. **游戏循环模式(Game Loop Pattern)**：
   - 游戏运行的核心模式，处理输入、更新状态、渲染
   - 实现固定时间步长和可变时间步长的结合
   - 处理帧率变化和游戏速度的解耦

4. **更新方法模式(Update Method Pattern)**：
   - 每帧自动调用游戏对象的更新方法
   - 简化游戏状态管理和时间驱动行为
   - 在Unity中表现为MonoBehaviour.Update()

5. **双缓冲模式(Double Buffer Pattern)**：
   - 解决渲染过程中的闪烁问题
   - 一个缓冲区用于显示，另一个用于绘制
   - 适用于图形渲染和状态更新

### 3.2 游戏对象管理中的模式应用

1. **对象池模式(Object Pool Pattern)**：
   - 预创建一组对象，重复使用而非频繁销毁创建
   - 减少垃圾回收压力，提高性能
   - 适用于子弹、敌人等频繁创建销毁的对象
   ```cpp
   class BulletPool {
   private:
       std::vector<std::unique_ptr<Bullet>> pool;
       std::queue<Bullet*> available;
       
   public:
       BulletPool(size_t size) {
           for (size_t i = 0; i < size; ++i) {
               auto bullet = std::make_unique<Bullet>();
               available.push(bullet.get());
               pool.push_back(std::move(bullet));
           }
       }
       
       Bullet* acquire() {
           if (available.empty()) {
               // 可选择动态扩展池大小
               return nullptr;
           }
           
           Bullet* bullet = available.front();
           available.pop();
           bullet->reset();
           return bullet;
       }
       
       void release(Bullet* bullet) {
           available.push(bullet);
       }
   };
   ```

2. **空间分区模式(Spatial Partition Pattern)**：
   - 将游戏世界划分为多个区域，优化碰撞检测
   - 减少不必要的碰撞检测计算
   - 常见实现：四叉树、八叉树、网格、BSP树

3. **数据局部性模式(Data Locality Pattern)**：
   - 组织数据结构以提高缓存命中率
   - 将相关数据连续存储
   - 适用于性能敏感的游戏系统

4. **脏标志模式(Dirty Flag Pattern)**：
   - 标记需要更新的对象，避免不必要的计算
   - 仅在对象状态改变时更新
   - 适用于渲染、物理计算等场景

### 3.3 游戏AI中的模式应用

1. **状态模式(State Pattern)**：
   - 管理AI角色的不同行为状态
   - 每个状态封装特定的行为逻辑
   - 状态转换由条件触发
   ```cpp
   class AIState {
   public:
       virtual ~AIState() {}
       virtual void enter(AICharacter* character) = 0;
       virtual void update(AICharacter* character, float deltaTime) = 0;
       virtual void exit(AICharacter* character) = 0;
   };
   
   class PatrolState : public AIState {
   public:
       void enter(AICharacter* character) override {
           // 初始化巡逻状态
       }
       
       void update(AICharacter* character, float deltaTime) override {
           // 巡逻逻辑
           if (enemyDetected()) {
               character->changeState(new ChaseState());
           }
       }
       
       void exit(AICharacter* character) override {
           // 清理巡逻状态
       }
   };
   ```

2. **策略模式(Strategy Pattern)**：
   - 封装不同的AI算法
   - 运行时切换AI策略
   - 适用于路径寻找、决策制定等

3. **观察者模式(Observer Pattern)**：
   - AI系统响应游戏事件
   - 实现事件驱动的AI行为
   - 降低AI系统与游戏世界的耦合

4. **行为树模式(Behavior Tree Pattern)**：
   - 结构化表示AI决策逻辑
   - 组合节点、装饰节点、叶子节点
   - 可视化编辑AI行为

### 3.4 游戏UI中的模式应用

1. **命令模式(Command Pattern)**：
   - 将UI操作封装为命令对象
   - 支持撤销/重做操作
   - 实现输入处理与游戏逻辑的解耦
   ```cpp
   class Command {
   public:
       virtual ~Command() {}
       virtual void execute() = 0;
       virtual void undo() = 0;
   };
   
   class MoveCommand : public Command {
   private:
       Player* player;
       Vec3 direction;
       Vec3 previousPosition;
       
   public:
       MoveCommand(Player* p, const Vec3& dir) : player(p), direction(dir) {}
       
       void execute() override {
           previousPosition = player->getPosition();
           player->move(direction);
       }
       
       void undo() override {
           player->setPosition(previousPosition);
       }
   };
   ```

2. **工厂模式(Factory Pattern)**：
   - 创建UI元素
   - 支持不同风格的UI
   - 管理UI资源

3. **装饰器模式(Decorator Pattern)**：
   - 动态添加UI效果
   - 组合不同的UI行为
   - 实现UI元素的灵活扩展

4. **中介者模式(Mediator Pattern)**：
   - 协调UI组件间的交互
   - 减少组件间的直接依赖
   - 简化UI事件处理

游戏开发中的设计模式应用不仅限于上述模式，还包括原型模式(克隆游戏对象)、享元模式(共享游戏资源)、访问者模式(遍历游戏对象结构)等。通过合理应用这些设计模式，游戏开发者可以构建出更加灵活、可维护和可扩展的游戏系统，应对游戏开发中的复杂挑战。同时，游戏开发也推动了设计模式的发展，一些模式如组件模式、游戏循环模式等最初就是为解决游戏开发中的特定问题而提出的。

## 4. 设计模式在GUI开发中的应用

图形用户界面(GUI)开发是软件工程中的一个重要领域，涉及用户交互、事件处理、界面布局和数据展示等多个方面。设计模式在GUI开发中发挥着关键作用，帮助开发者构建灵活、可维护且响应迅速的用户界面。从早期的桌面应用到现代的Web和移动应用，设计模式一直是GUI架构的基石，使开发者能够有效管理界面复杂性，提高代码复用性，并确保用户体验的一致性。

### 4.1 MVC模式及其变体

1. **MVC(Model-View-Controller)模式**：
   - 将应用程序分为三个核心部分：模型、视图和控制器
   - 模型负责数据和业务逻辑，视图负责用户界面，控制器处理用户输入
   - 实现了数据与界面的分离，提高了代码的可维护性
   - 是GUI开发中最基础和最重要的架构模式
   ```cpp
   // 模型类
   class Student {
   private:
       std::string name;
       int score;
       std::vector<Observer*> observers;
       
   public:
       Student(const std::string& n, int s) : name(n), score(s) {}
       
       void setScore(int newScore) {
           if (score != newScore) {
               score = newScore;
               notifyObservers();
           }
       }
       
       int getScore() const { return score; }
       std::string getName() const { return name; }
       
       void addObserver(Observer* obs) { observers.push_back(obs); }
       void notifyObservers();
   };
   
   // 视图类
   class StudentView {
   public:
       void displayStudentDetails(const std::string& studentName, int studentScore) {
           std::cout << "Student: " << studentName << std::endl;
           std::cout << "Score: " << studentScore << std::endl;
       }
   };
   
   // 控制器类
   class StudentController {
   private:
       Student* model;
       StudentView* view;
       
   public:
       StudentController(Student* m, StudentView* v) : model(m), view(v) {}
       
       void setStudentName(const std::string& name) {
           // 更新模型
           // 实际实现中需要修改模型类以支持名称更新
       }
       
       std::string getStudentName() const {
           return model->getName();
       }
       
       void setStudentScore(int score) {
           model->setScore(score);
       }
       
       int getStudentScore() const {
           return model->getScore();
       }
       
       void updateView() {
           view->displayStudentDetails(model->getName(), model->getScore());
       }
   };
   ```

2. **MVP(Model-View-Presenter)模式**：
   - MVC的变体，将控制器替换为展示器
   - 展示器完全处理视图和模型之间的交互
   - 视图与模型完全解耦，便于单元测试
   - 适用于Android开发和Windows Forms应用

3. **MVVM(Model-View-ViewModel)模式**：
   - 现代GUI开发中流行的模式，特别是WPF、Angular和Vue.js
   - 视图模型作为视图和模型之间的桥梁
   - 支持数据绑定和命令模式
   - 提高了视图和模型的解耦程度

4. **PAC(Presentation-Abstraction-Control)模式**：
   - 将应用程序划分为多个代理，每个代理包含表示、抽象和控制
   - 适用于分布式GUI系统
   - 提供了更好的层次结构和通信机制

### 4.2 事件处理与命令模式

1. **命令模式(Command Pattern)**：
   - 将请求封装为对象，支持参数化、排队和记录请求
   - 实现撤销/重做功能
   - 解耦请求发送者和接收者
   - 在GUI工具栏、菜单和快捷键中广泛应用
   ```cpp
   // 命令接口
   class Command {
   public:
       virtual ~Command() {}
       virtual void execute() = 0;
       virtual void undo() = 0;
   };
   
   // 具体命令
   class PasteCommand : public Command {
   private:
       TextEditor* editor;
       std::string previousText;
       
   public:
       PasteCommand(TextEditor* e) : editor(e) {}
       
       void execute() override {
           previousText = editor->getText();
           editor->paste();
       }
       
       void undo() override {
           editor->setText(previousText);
       }
   };
   
   // 调用者
   class MenuItem {
   private:
       std::string label;
       std::unique_ptr<Command> command;
       
   public:
       MenuItem(const std::string& l, std::unique_ptr<Command> cmd) 
           : label(l), command(std::move(cmd)) {}
       
       void click() {
           if (command) {
               command->execute();
           }
       }
   };
   ```

2. **观察者模式(Observer Pattern)**：
   - 定义对象间的一对多依赖关系
   - 当一个对象状态改变时，所有依赖者都会收到通知
   - 在事件处理系统中广泛应用
   - 实现了模型与视图的自动同步

3. **发布-订阅模式(Publish-Subscribe Pattern)**：
   - 观察者模式的变体，引入了事件总线/消息代理
   - 发布者和订阅者完全解耦
   - 支持跨组件和跨进程通信
   - 在现代前端框架和事件驱动架构中常见

### 4.3 界面布局与组合模式

1. **组合模式(Composite Pattern)**：
   - 将对象组合成树形结构以表示"部分-整体"的层次结构
   - 使客户端对单个对象和组合对象的使用具有一致性
   - 在GUI组件树中广泛应用
   ```cpp
   // 组件基类
   class GUIComponent {
   protected:
       int x, y, width, height;
       bool visible;
       
   public:
       GUIComponent(int x, int y, int w, int h) 
           : x(x), y(y), width(w), height(h), visible(true) {}
       
       virtual ~GUIComponent() {}
       
       virtual void render() = 0;
       virtual bool handleMouseClick(int mouseX, int mouseY) = 0;
       virtual void add(std::shared_ptr<GUIComponent> component) {}
       virtual void remove(std::shared_ptr<GUIComponent> component) {}
       
       void setVisible(bool v) { visible = v; }
       bool isVisible() const { return visible; }
   };
   
   // 叶子组件
   class Button : public GUIComponent {
   private:
       std::string text;
       std::function<void()> onClick;
       
   public:
       Button(int x, int y, int w, int h, const std::string& txt) 
           : GUIComponent(x, y, w, h), text(txt) {}
       
       void setOnClick(std::function<void()> callback) {
           onClick = callback;
       }
       
       void render() override {
           if (visible) {
               // 渲染按钮
               std::cout << "Rendering Button: " << text << std::endl;
           }
       }
       
       bool handleMouseClick(int mouseX, int mouseY) override {
           if (visible && mouseX >= x && mouseX <= x + width && 
               mouseY >= y && mouseY <= y + height) {
               if (onClick) {
                   onClick();
               }
               return true;
           }
           return false;
       }
   };
   
   // 组合组件
   class Panel : public GUIComponent {
   private:
       std::vector<std::shared_ptr<GUIComponent>> children;
       
   public:
       Panel(int x, int y, int w, int h) : GUIComponent(x, y, w, h) {}
       
       void add(std::shared_ptr<GUIComponent> component) override {
           children.push_back(component);
       }
       
       void remove(std::shared_ptr<GUIComponent> component) override {
           children.erase(
               std::remove(children.begin(), children.end(), component),
               children.end());
       }
       
       void render() override {
           if (visible) {
               std::cout << "Rendering Panel" << std::endl;
               for (auto& child : children) {
                   child->render();
               }
           }
       }
       
       bool handleMouseClick(int mouseX, int mouseY) override {
           if (!visible) return false;
           
           // 从后往前遍历，处理最上层的组件
           for (auto it = children.rbegin(); it != children.rend(); ++it) {
               if ((*it)->handleMouseClick(mouseX, mouseY)) {
                   return true;
               }
           }
           return false;
       }
   };
   ```

2. **装饰器模式(Decorator Pattern)**：
   - 动态地给对象添加一些额外的职责
   - 在GUI中用于添加滚动条、边框、阴影等效果
   - 提供了比继承更灵活的替代方案

3. **策略模式(Strategy Pattern)**：
   - 定义一系列算法，把它们一个个封装起来
   - 在GUI中用于不同的布局策略、渲染策略等
   - 使算法可以独立于使用它的客户端变化

4. **工厂模式(Factory Pattern)**：
   - 创建GUI组件而不暴露创建逻辑
   - 支持不同风格的UI组件创建
   - 管理UI资源的生命周期

#### 数据绑定与适配器模式

1. **适配器模式(Adapter Pattern)**：
   - 将一个类的接口转换成客户端希望的另外一个接口
   - 在GUI中用于适配不同的数据源和UI组件
   - 使原本由于接口不兼容而不能一起工作的类可以一起工作
   ```cpp
   // 目标接口
   class ListViewDataSource {
   public:
       virtual ~ListViewDataSource() {}
       virtual int getItemCount() = 0;
       virtual std::string getItem(int index) = 0;
   };
   
   // 需要适配的类
   class Database {
   private:
       std::vector<std::string> records;
       
   public:
       void addRecord(const std::string& record) {
           records.push_back(record);
       }
       
       int getRecordCount() const {
           return static_cast<int>(records.size());
       }
       
       std::string getRecord(int index) const {
           if (index >= 0 && index < static_cast<int>(records.size())) {
               return records[index];
           }
           return "";
       }
   };
   
   // 适配器
   class DatabaseAdapter : public ListViewDataSource {
   private:
       Database* database;
       
   public:
       DatabaseAdapter(Database* db) : database(db) {}
       
       int getItemCount() override {
           return database->getRecordCount();
       }
       
       std::string getItem(int index) override {
           return database->getRecord(index);
       }
   };
   
   // 客户端代码
   class ListView {
   private:
       std::unique_ptr<ListViewDataSource> dataSource;
       
   public:
       void setDataSource(std::unique_ptr<ListViewDataSource> source) {
           dataSource = std::move(source);
       }
       
       void display() {
           if (dataSource) {
               for (int i = 0; i < dataSource->getItemCount(); ++i) {
                   std::cout << dataSource->getItem(i) << std::endl;
               }
           }
       }
   };
   ```

2. **数据绑定模式(Data Binding Pattern)**：
   - 自动同步数据源和UI组件
   - 支持单向和双向绑定
   - 在现代前端框架中广泛应用
   - 减少了手动更新UI的代码

3. **中介者模式(Mediator Pattern)**：
   - 定义一个对象来封装一系列对象的交互
   - 在GUI中用于协调多个组件间的交互
   - 减少组件间的直接依赖，降低耦合度

4. **外观模式(Facade Pattern)**：
   - 为子系统中的一组接口提供一个统一的接口
   - 在GUI中简化复杂子系统的使用
   - 提供了一个高级接口，使子系统更容易使用

GUI开发中的设计模式应用不仅限于上述模式，还包括迭代器模式(遍历UI组件)、享元模式(共享UI资源)、模板方法模式(定义窗口创建流程)等。通过合理应用这些设计模式，GUI开发者可以构建出更加灵活、可维护和可扩展的用户界面系统，提供更好的用户体验。同时，GUI开发也推动了设计模式的发展，如MVP和MVVM模式就是为解决特定GUI开发问题而提出的架构模式。随着技术的发展，响应式编程、函数式UI等新范式也在不断涌现，与经典设计模式相互补充，共同推动GUI开发的进步。

## 5. 设计模式在网络编程中的应用

网络编程是现代软件开发中的核心领域，涉及分布式系统、微服务架构、实时通信和大规模数据处理等多个方面。设计模式在网络编程中发挥着至关重要的作用，帮助开发者处理网络通信的复杂性、提高系统的可扩展性和可靠性，并确保代码的可维护性。从传统的客户端-服务器架构到现代的云原生应用，设计模式一直是网络应用架构的基石，使开发者能够有效管理网络延迟、并发处理、错误恢复和协议兼容性等挑战。

### 5.1 网络协议处理中的模式应用

1. **适配器模式(Adapter Pattern)**：
   - 将不同的网络协议适配为统一的接口
   - 封装协议细节，提供一致的API
   - 支持协议的灵活切换和扩展
   - 在多协议支持和协议升级中广泛应用
   ```cpp
   // 目标接口
   class NetworkClient {
   public:
       virtual ~NetworkClient() {}
       virtual void connect(const std::string& host, int port) = 0;
       virtual void send(const std::string& data) = 0;
       virtual std::string receive() = 0;
       virtual void disconnect() = 0;
   };
   
   // 需要适配的HTTP客户端
   class HttpClient {
   public:
       void httpConnect(const std::string& url) {
           // HTTP连接实现
       }
       
       void httpPost(const std::string& endpoint, const std::string& data) {
           // HTTP POST实现
       }
       
       std::string httpGet(const std::string& endpoint) {
           // HTTP GET实现
           return "response";
       }
       
       void httpClose() {
           // HTTP关闭连接实现
       }
   };
   
   // HTTP适配器
   class HttpAdapter : public NetworkClient {
   private:
       HttpClient httpClient;
       std::string baseUrl;
       
   public:
       HttpAdapter(const std::string& url) : baseUrl(url) {}
       
       void connect(const std::string& host, int port) override {
           std::string url = "http://" + host + ":" + std::to_string(port);
           httpClient.httpConnect(url);
       }
       
       void send(const std::string& data) override {
           httpClient.httpPost(baseUrl + "/send", data);
       }
       
       std::string receive() override {
           return httpClient.httpGet(baseUrl + "/receive");
       }
       
       void disconnect() override {
           httpClient.httpClose();
       }
   };
   ```

2. **策略模式(Strategy Pattern)**：
   - 封装不同的网络通信策略
   - 支持运行时切换通信协议和算法
   - 适用于负载均衡、重试策略、压缩算法等场景
   - 提高网络系统的灵活性和可扩展性

3. **模板方法模式(Template Method Pattern)**：
   - 定义网络通信的基本框架
   - 将具体实现延迟到子类
   - 在不同协议实现中保持一致的流程
   - 减少代码重复，提高代码复用性

4. **外观模式(Facade Pattern)**：
   - 为复杂的网络子系统提供简化的接口
   - 隐藏底层网络操作的复杂性
   - 提供高级API供客户端使用
   - 降低客户端与网络系统的耦合度

### 5.2 并发处理与异步通信

1. **观察者模式(Observer Pattern)**：
   - 实现网络事件的通知机制
   - 支持多个组件对网络事件的响应
   - 在实时通信和事件驱动系统中广泛应用
   - 实现松耦合的事件处理架构
   ```cpp
   // 观察者接口
   class NetworkEventListener {
   public:
       virtual ~NetworkEventListener() {}
       virtual void onConnected() = 0;
       virtual void onDisconnected() = 0;
       virtual void onDataReceived(const std::string& data) = 0;
       virtual void onError(const std::string& error) = 0;
   };
   
   // 被观察者
   class NetworkManager {
   private:
       std::vector<NetworkEventListener*> listeners;
       bool connected;
       
   public:
       void addListener(NetworkEventListener* listener) {
           listeners.push_back(listener);
       }
       
       void removeListener(NetworkEventListener* listener) {
           listeners.erase(
               std::remove(listeners.begin(), listeners.end(), listener),
               listeners.end());
       }
       
       void connect(const std::string& host, int port) {
           // 实际连接逻辑
           connected = true;
           notifyConnected();
       }
       
       void disconnect() {
           // 实际断开逻辑
           connected = false;
           notifyDisconnected();
       }
       
       void simulateDataReceived(const std::string& data) {
           if (connected) {
               notifyDataReceived(data);
           }
       }
       
   private:
       void notifyConnected() {
           for (auto listener : listeners) {
               listener->onConnected();
           }
       }
       
       void notifyDisconnected() {
           for (auto listener : listeners) {
               listener->onDisconnected();
           }
       }
       
       void notifyDataReceived(const std::string& data) {
           for (auto listener : listeners) {
               listener->onDataReceived(data);
           }
       }
   };
   
   // 具体观察者
   class ChatApplication : public NetworkEventListener {
   public:
       void onConnected() override {
           std::cout << "Connected to chat server" << std::endl;
       }
       
       void onDisconnected() override {
           std::cout << "Disconnected from chat server" << std::endl;
       }
       
       void onDataReceived(const std::string& data) override {
           std::cout << "Message received: " << data << std::endl;
       }
       
       void onError(const std::string& error) override {
           std::cout << "Network error: " << error << std::endl;
       }
   };
   ```

2. **命令模式(Command Pattern)**：
   - 将网络请求封装为命令对象
   - 支持请求的排队、日志记录和撤销
   - 在分布式事务和请求队列中应用
   - 实现请求发送与处理的解耦

3. **生产者-消费者模式(Producer-Consumer Pattern)**：
   - 使用消息队列处理网络请求
   - 平衡生产速度和消费速度
   - 提高系统的并发处理能力
   - 在高并发网络服务中广泛应用

4. **Future/Promise模式**：
   - 处理异步操作的结果
   - 支持非阻塞的网络通信
   - 提高应用程序的响应性
   - 在现代异步编程框架中广泛应用

### 5.3 网络架构与服务发现

1. **代理模式(Proxy Pattern)**：
   - 为网络服务提供代理或占位符
   - 控制对远程对象的访问
   - 在远程代理、虚拟代理和保护代理中应用
   - 提供额外的功能如缓存、日志和访问控制
   ```cpp
   // 主题接口
   class ImageService {
   public:
       virtual ~ImageService() {}
       virtual std::string getImage(int id) = 0;
   };
   
   // 真实主题
   class RemoteImageService : public ImageService {
   private:
       std::string serverUrl;
       
   public:
       RemoteImageService(const std::string& url) : serverUrl(url) {}
       
       std::string getImage(int id) override {
           // 模拟网络请求
           std::cout << "Fetching image " << id << " from remote server" << std::endl;
           // 实际实现中会进行HTTP请求
           return "image_data_for_id_" + std::to_string(id);
       }
   };
   
   // 代理
   class CachedImageService : public ImageService {
   private:
       std::unique_ptr<ImageService> remoteService;
       std::map<int, std::string> cache;
       
   public:
       CachedImageService(std::unique_ptr<ImageService> service) 
           : remoteService(std::move(service)) {}
       
       std::string getImage(int id) override {
           auto it = cache.find(id);
           if (it != cache.end()) {
               std::cout << "Returning cached image " << id << std::endl;
               return it->second;
           }
           
           std::cout << "Cache miss for image " << id << std::endl;
           std::string imageData = remoteService->getImage(id);
           cache[id] = imageData;
           return imageData;
       }
   };
   ```

2. **单例模式(Singleton Pattern)**：
   - 确保网络服务管理器只有一个实例
   - 提供全局访问点
   - 在连接池、配置管理和日志记录中应用
   - 管理共享的网络资源

3. **工厂模式(Factory Pattern)**：
   - 创建不同类型的网络连接
   - 支持协议的灵活切换
   - 封装连接创建的复杂性
   - 在多协议支持系统中应用

4. **注册表模式(Registry Pattern)**：
   - 管理网络服务的注册和发现
   - 支持服务的动态添加和移除
   - 在微服务架构中应用
   - 实现服务的松耦合通信

#### 负载均衡与容错处理

1. **责任链模式(Chain of Responsibility Pattern)**：
   - 构建网络请求处理链
   - 每个处理器负责特定类型的请求
   - 支持处理器的动态配置
   - 在中间件和过滤器中应用
   ```cpp
   // 处理器接口
   class RequestHandler {
   protected:
       std::unique_ptr<RequestHandler> nextHandler;
       
   public:
       virtual ~RequestHandler() {}
       
       void setNext(std::unique_ptr<RequestHandler> handler) {
           nextHandler = std::move(handler);
       }
       
       virtual void handle(const std::string& request) {
           processRequest(request);
           
           if (nextHandler) {
               nextHandler->handle(request);
           }
       }
       
   protected:
       virtual void processRequest(const std::string& request) = 0;
   };
   
   // 具体处理器
   class AuthenticationHandler : public RequestHandler {
   protected:
       void processRequest(const std::string& request) override {
           std::cout << "Authenticating request: " << request << std::endl;
           // 实际认证逻辑
       }
   };
   
   class LoggingHandler : public RequestHandler {
   protected:
       void processRequest(const std::string& request) override {
           std::cout << "Logging request: " << request << std::endl;
           // 实际日志逻辑
       }
   };
   
   class DataProcessingHandler : public RequestHandler {
   protected:
       void processRequest(const std::string& request) override {
           std::cout << "Processing request data: " << request << std::endl;
           // 实际数据处理逻辑
       }
   };
   ```

2. **状态模式(State Pattern)**：
   - 管理网络连接的不同状态
   - 封装状态相关的行为
   - 支持状态的平滑转换
   - 在连接管理和协议状态机中应用

3. **装饰器模式(Decorator Pattern)**：
   - 动态添加网络功能
   - 支持功能的灵活组合
   - 在协议扩展和中间件中应用
   - 避免静态继承的局限性

4. **断路器模式(Circuit Breaker Pattern)**：
   - 防止级联故障
   - 提供快速失败机制
   - 在微服务架构中保护系统稳定性
   - 实现系统的自我修复能力

网络编程中的设计模式应用不仅限于上述模式，还包括迭代器模式(遍历网络资源)、享元模式(共享网络连接)、访问者模式(处理网络数据包)等。通过合理应用这些设计模式，网络开发者可以构建出更加健壮、可扩展和可维护的网络系统，应对网络编程中的复杂挑战。同时，网络编程也推动了设计模式的发展，一些模式如断路器模式、服务注册模式等最初就是为解决分布式系统中的特定问题而提出的。随着云计算和微服务架构的兴起，新的设计模式和架构模式也在不断涌现，与经典设计模式相互补充，共同推动网络编程的进步。

## 6. 实战案例分析：日志系统

日志系统是软件开发中不可或缺的基础设施，用于记录应用程序运行状态、错误信息和调试数据。一个设计良好的日志系统应当具备高性能、可扩展性、灵活性和可靠性等特点。本案例将展示如何通过多种设计模式的组合应用，构建一个功能完备、易于维护的日志系统。

### 6.1 需求分析

1. **功能需求**：
   - 支持多种日志级别（DEBUG、INFO、WARNING、ERROR、FATAL）
   - 支持多种输出目标（控制台、文件、网络、数据库）
   - 支持日志格式自定义
   - 支持异步日志记录
   - 支持日志过滤和路由

2. **非功能需求**：
   - 高性能：日志记录不应显著影响应用程序性能
   - 可扩展性：易于添加新的输出目标和格式化器
   - 可靠性：确保日志不丢失，特别是在系统崩溃时
   - 线程安全：支持多线程环境下的并发日志记录
   - 配置灵活性：支持运行时配置更改

### 6.2 设计方案

基于需求分析，我们设计了一个模块化的日志系统，核心组件包括：

1. **日志记录器(Logger)**：接收日志请求，管理日志级别
2. **格式化器(Formatter)**：将日志事件格式化为字符串
3. **输出器(Appender)**：将格式化后的日志输出到不同目标
4. **过滤器(Filter)**：根据条件过滤日志事件
5. **异步处理器(AsyncHandler)**：异步处理日志事件，提高性能

### 6.3 应用的设计模式

1. **单例模式(Singleton Pattern)**：
   - 确保日志管理器的全局唯一性
   - 提供全局访问点
   - 管理系统级别的日志配置

2. **工厂模式(Factory Pattern)**：
   - 创建不同类型的日志组件
   - 支持基于配置的动态创建
   - 封装组件创建的复杂性

3. **建造者模式(Builder Pattern)**：
   - 构建复杂的日志记录器配置
   - 提供流畅的API
   - 支持可选参数和默认值

4. **策略模式(Strategy Pattern)**：
   - 封装不同的格式化策略
   - 支持运行时切换格式化器
   - 便于添加新的格式化方式

5. **装饰器模式(Decorator Pattern)**：
   - 动态添加日志功能
   - 组合不同的过滤器
   - 实现日志链式处理

6. **观察者模式(Observer Pattern)**：
   - 实现日志事件通知机制
   - 支持多个输出器监听日志事件
   - 实现松耦合的事件处理

7. **生产者-消费者模式(Producer-Consumer Pattern)**：
   - 实现异步日志处理
   - 使用队列缓冲日志事件
   - 平衡生产速度和消费速度

### 6.4 实现细节与代码示例

以下是一个简化但完整的日志系统实现，展示了上述设计模式的应用：

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <mutex>
#include <queue>
#include <thread>
#include <condition_variable>
#include <fstream>
#include <sstream>
#include <chrono>
#include <functional>
#include <map>

// 日志级别枚举
enum class LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARNING = 2,
    ERROR = 3,
    FATAL = 4
};

// 日志事件类
class LogEvent {
public:
    LogEvent(LogLevel level, const std::string& message, const std::string& file, int line)
        : level(level), message(message), file(file), line(line), timestamp(getCurrentTimestamp()) {}
    
    LogLevel getLevel() const { return level; }
    const std::string& getMessage() const { return message; }
    const std::string& getFile() const { return file; }
    int getLine() const { return line; }
    const std::string& getTimestamp() const { return timestamp; }
    
private:
    LogLevel level;
    std::string message;
    std::string file;
    int line;
    std::string timestamp;
    
    static std::string getCurrentTimestamp() {
        auto now = std::chrono::system_clock::now();
        auto time_t = std::chrono::system_clock::to_time_t(now);
        auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(
            now.time_since_epoch()) % 1000;
        
        std::stringstream ss;
        ss << std::put_time(std::localtime(&time_t), "%Y-%m-%d %H:%M:%S");
        ss << '.' << std::setfill('0') << std::setw(3) << ms.count();
        return ss.str();
    }
};

// 格式化器接口（策略模式）
class LogFormatter {
public:
    virtual ~LogFormatter() = default;
    virtual std::string format(const LogEvent& event) = 0;
};

// 简单格式化器
class SimpleFormatter : public LogFormatter {
public:
    std::string format(const LogEvent& event) override {
        std::stringstream ss;
        ss << "[" << event.getTimestamp() << "] "
           << "[" << levelToString(event.getLevel()) << "] "
           << event.getMessage();
        return ss.str();
    }
    
private:
    std::string levelToString(LogLevel level) {
        switch (level) {
            case LogLevel::DEBUG: return "DEBUG";
            case LogLevel::INFO: return "INFO";
            case LogLevel::WARNING: return "WARNING";
            case LogLevel::ERROR: return "ERROR";
            case LogLevel::FATAL: return "FATAL";
            default: return "UNKNOWN";
        }
    }
};

// 详细格式化器
class DetailedFormatter : public LogFormatter {
public:
    std::string format(const LogEvent& event) override {
        std::stringstream ss;
        ss << "[" << event.getTimestamp() << "] "
           << "[" << levelToString(event.getLevel()) << "] "
           << "[" << event.getFile() << ":" << event.getLine() << "] "
           << event.getMessage();
        return ss.str();
    }
    
private:
    std::string levelToString(LogLevel level) {
        switch (level) {
            case LogLevel::DEBUG: return "DEBUG";
            case LogLevel::INFO: return "INFO";
            case LogLevel::WARNING: return "WARNING";
            case LogLevel::ERROR: return "ERROR";
            case LogLevel::FATAL: return "FATAL";
            default: return "UNKNOWN";
        }
    }
};

// 过滤器接口
class LogFilter {
public:
    virtual ~LogFilter() = default;
    virtual bool shouldLog(const LogEvent& event) = 0;
};

// 级别过滤器
class LevelFilter : public LogFilter {
public:
    LevelFilter(LogLevel minLevel) : minLevel(minLevel) {}
    
    bool shouldLog(const LogEvent& event) override {
        return event.getLevel() >= minLevel;
    }
    
private:
    LogLevel minLevel;
};

// 输出器接口
class LogAppender {
public:
    virtual ~LogAppender() = default;
    virtual void append(const std::string& formattedMessage) = 0;
    void setFormatter(std::shared_ptr<LogFormatter> formatter) {
        this->formatter = formatter;
    }
    void addFilter(std::shared_ptr<LogFilter> filter) {
        filters.push_back(filter);
    }
    
protected:
    std::shared_ptr<LogFormatter> formatter;
    std::vector<std::shared_ptr<LogFilter>> filters;
    
    bool shouldLog(const LogEvent& event) {
        for (const auto& filter : filters) {
            if (!filter->shouldLog(event)) {
                return false;
            }
        }
        return true;
    }
};

// 控制台输出器
class ConsoleAppender : public LogAppender {
public:
    void append(const std::string& formattedMessage) override {
        std::cout << formattedMessage << std::endl;
    }
};

// 文件输出器
class FileAppender : public LogAppender {
public:
    FileAppender(const std::string& filename) : filename(filename) {}
    
    void append(const std::string& formattedMessage) override {
        std::ofstream file(filename, std::ios::app);
        if (file.is_open()) {
            file << formattedMessage << std::endl;
            file.close();
        }
    }
    
private:
    std::string filename;
};

// 装饰器基类
class AppenderDecorator : public LogAppender {
public:
    AppenderDecorator(std::shared_ptr<LogAppender> appender) : appender(appender) {}
    
protected:
    std::shared_ptr<LogAppender> appender;
};

// 异步装饰器
class AsyncAppender : public AppenderDecorator {
public:
    AsyncAppender(std::shared_ptr<LogAppender> appender) 
        : AppenderDecorator(appender), running(true) {
        worker = std::thread(&AsyncAppender::processQueue, this);
    }
    
    ~AsyncAppender() {
        {
            std::unique_lock<std::mutex> lock(mutex);
            running = false;
            condition.notify_all();
        }
        
        if (worker.joinable()) {
            worker.join();
        }
    }
    
    void append(const std::string& formattedMessage) override {
        std::unique_lock<std::mutex> lock(mutex);
        queue.push(formattedMessage);
        condition.notify_one();
    }
    
private:
    std::queue<std::string> queue;
    std::mutex mutex;
    std::condition_variable condition;
    std::thread worker;
    bool running;
    
    void processQueue() {
        while (true) {
            std::unique_lock<std::mutex> lock(mutex);
            condition.wait(lock, [this] { return !queue.empty() || !running; });
            
            if (!running && queue.empty()) {
                break;
            }
            
            while (!queue.empty()) {
                std::string message = queue.front();
                queue.pop();
                lock.unlock();
                
                appender->append(message);
                
                lock.lock();
            }
        }
    }
};

// 日志记录器（观察者模式）
class Logger {
public:
    Logger(const std::string& name, LogLevel level = LogLevel::INFO) 
        : name(name), level(level) {}
    
    void addAppender(std::shared_ptr<LogAppender> appender) {
        appenders.push_back(appender);
    }
    
    void log(LogLevel level, const std::string& message, const std::string& file, int line) {
        if (level < this->level) {
            return;
        }
        
        LogEvent event(level, message, file, line);
        
        for (const auto& appender : appenders) {
            if (appender->shouldLog(event)) {
                std::string formattedMessage;
                if (appender->formatter) {
                    formattedMessage = appender->formatter->format(event);
                } else {
                    formattedMessage = message;  // 使用默认格式
                }
                
                appender->append(formattedMessage);
            }
        }
    }
    
    void debug(const std::string& message, const std::string& file = "", int line = 0) {
        log(LogLevel::DEBUG, message, file, line);
    }
    
    void info(const std::string& message, const std::string& file = "", int line = 0) {
        log(LogLevel::INFO, message, file, line);
    }
    
    void warning(const std::string& message, const std::string& file = "", int line = 0) {
        log(LogLevel::WARNING, message, file, line);
    }
    
    void error(const std::string& message, const std::string& file = "", int line = 0) {
        log(LogLevel::ERROR, message, file, line);
    }
    
    void fatal(const std::string& message, const std::string& file = "", int line = 0) {
        log(LogLevel::FATAL, message, file, line);
    }
    
    void setLevel(LogLevel level) {
        this->level = level;
    }
    
private:
    std::string name;
    LogLevel level;
    std::vector<std::shared_ptr<LogAppender>> appenders;
};

// 日志工厂（工厂模式）
class LoggerFactory {
public:
    static std::shared_ptr<Logger> createLogger(const std::string& name) {
        auto logger = std::make_shared<Logger>(name);
        
        // 默认添加控制台输出器
        auto consoleAppender = std::make_shared<ConsoleAppender>();
        consoleAppender->setFormatter(std::make_shared<SimpleFormatter>());
        logger->addAppender(consoleAppender);
        
        return logger;
    }
    
    static std::shared_ptr<Logger> createLoggerWithFileAppender(
        const std::string& name, const std::string& filename) {
        auto logger = createLogger(name);
        
        auto fileAppender = std::make_shared<FileAppender>(filename);
        fileAppender->setFormatter(std::make_shared<DetailedFormatter>());
        logger->addAppender(fileAppender);
        
        return logger;
    }
    
    static std::shared_ptr<Logger> createAsyncLogger(
        const std::string& name, const std::string& filename) {
        auto logger = createLogger(name);
        
        auto fileAppender = std::make_shared<FileAppender>(filename);
        auto asyncAppender = std::make_shared<AsyncAppender>(fileAppender);
        asyncAppender->setFormatter(std::make_shared<DetailedFormatter>());
        logger->addAppender(asyncAppender);
        
        return logger;
    }
};

// 日志管理器（单例模式）
class LogManager {
public:
    static LogManager& getInstance() {
        static LogManager instance;
        return instance;
    }
    
    std::shared_ptr<Logger> getLogger(const std::string& name) {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto it = loggers.find(name);
        if (it != loggers.end()) {
            return it->second;
        }
        
        auto logger = LoggerFactory::createLogger(name);
        loggers[name] = logger;
        return logger;
    }
    
    void setGlobalLevel(LogLevel level) {
        std::lock_guard<std::mutex> lock(mutex);
        
        for (auto& pair : loggers) {
            pair.second->setLevel(level);
        }
    }
    
private:
    LogManager() = default;
    ~LogManager() = default;
    LogManager(const LogManager&) = delete;
    LogManager& operator=(const LogManager&) = delete;
    
    std::map<std::string, std::shared_ptr<Logger>> loggers;
    std::mutex mutex;
};

// 便捷宏定义
#define LOG_DEBUG(logger, message) logger->debug(message, __FILE__, __LINE__)
#define LOG_INFO(logger, message) logger->info(message, __FILE__, __LINE__)
#define LOG_WARNING(logger, message) logger->warning(message, __FILE__, __LINE__)
#define LOG_ERROR(logger, message) logger->error(message, __FILE__, __LINE__)
#define LOG_FATAL(logger, message) logger->fatal(message, __FILE__, __LINE__)

// 使用示例
int main() {
    // 获取日志记录器
    auto logger = LogManager::getInstance().getLogger("MyApp");
    
    // 创建文件输出器
    auto fileAppender = std::make_shared<FileAppender>("application.log");
    fileAppender->setFormatter(std::make_shared<DetailedFormatter>());
    
    // 添加级别过滤器
    auto levelFilter = std::make_shared<LevelFilter>(LogLevel::INFO);
    fileAppender->addFilter(levelFilter);
    
    // 创建异步文件输出器
    auto asyncAppender = std::make_shared<AsyncAppender>(fileAppender);
    logger->addAppender(asyncAppender);
    
    // 记录日志
    LOG_DEBUG(logger, "This is a debug message");
    LOG_INFO(logger, "Application started");
    LOG_WARNING(logger, "This is a warning");
    LOG_ERROR(logger, "An error occurred");
    
    return 0;
}
```

#### 扩展性与维护性分析

1. **扩展性**：
   - **新输出目标**：通过实现LogAppender接口，可以轻松添加新的输出目标，如数据库、网络服务等
   - **新格式化器**：通过实现LogFormatter接口，可以添加新的日志格式，如JSON、XML等
   - **新过滤器**：通过实现LogFilter接口，可以添加新的过滤条件，如基于内容、时间等
   - **新装饰器**：通过继承AppenderDecorator，可以添加新的功能，如压缩、加密等

2. **维护性**：
   - **模块化设计**：各组件职责单一，降低了修改的影响范围
   - **接口隔离**：客户端代码依赖于抽象接口，而非具体实现
   - **开闭原则**：对扩展开放，对修改关闭，新功能通过扩展而非修改现有代码实现
   - **依赖注入**：组件间通过接口交互，便于单元测试和模拟

3. **性能考虑**：
   - **异步处理**：通过AsyncAppender实现异步日志记录，减少对主线程的影响
   - **延迟格式化**：只在需要输出时才进行格式化，减少不必要的计算
   - **缓冲机制**：在异步处理中使用队列缓冲日志事件，平衡生产消费速度

4. **可靠性保障**：
   - **异常安全**：各组件实现异常安全，确保日志系统崩溃不影响主程序
   - **资源管理**：使用RAII和智能指针管理资源，防止资源泄漏
   - **线程安全**：通过互斥锁保护共享数据，确保多线程环境下的正确性

通过上述设计，我们构建了一个灵活、可扩展、高性能的日志系统，充分展示了设计模式在实际项目中的应用价值。这个日志系统可以根据不同需求进行配置和扩展，满足各种复杂场景下的日志记录需求。

## 7. 实战案例分析：缓存系统

缓存系统是现代软件架构中的关键组件，用于提高数据访问速度、减轻后端负载、增强系统可扩展性。一个设计良好的缓存系统应当具备高性能、高可用性、数据一致性、可扩展性和灵活的缓存策略。本案例将展示如何通过多种设计模式的组合应用，构建一个功能完备、易于维护的缓存系统。

### 7.1 需求分析

1. **功能需求**：
   - 支持多种缓存策略（LRU、LFU、FIFO、TTL等）
   - 支持多级缓存架构（本地缓存、分布式缓存）
   - 支持缓存预热和刷新
   - 支持缓存穿透、击穿、雪崩的保护机制
   - 支持缓存监控和统计

2. **非功能需求**：
   - 高性能：提供毫秒级的数据访问响应
   - 高可用性：支持故障转移和自动恢复
   - 数据一致性：保证缓存与数据源的一致性
   - 可扩展性：支持水平扩展和动态扩容
   - 线程安全：支持多线程环境下的并发访问
   - 内存管理：合理的内存使用和回收机制

### 7.2 设计方案

基于需求分析，我们设计了一个分层的缓存系统，核心组件包括：

1. **缓存接口(Cache Interface)**：定义缓存操作的标准接口
2. **缓存实现(Cache Implementation)**：具体的缓存实现类
3. **缓存策略(Cache Policy)**：定义缓存淘汰策略
4. **缓存加载器(Cache Loader)**：负责从数据源加载数据
5. **缓存监听器(Cache Listener)**：监听缓存事件
6. **缓存管理器(Cache Manager)**：管理多个缓存实例
7. **分布式缓存协调器(Distributed Cache Coordinator)**：协调分布式缓存节点

### 7.3 应用的设计模式

1. **策略模式(Strategy Pattern)**：
   - 封装不同的缓存淘汰策略
   - 支持运行时切换缓存策略
   - 便于添加新的缓存策略

2. **代理模式(Proxy Pattern)**：
   - 实现缓存访问的透明代理
   - 添加缓存访问的额外功能（如监控、日志）
   - 实现远程缓存的本地代理

3. **装饰器模式(Decorator Pattern)**：
   - 动态添加缓存功能
   - 组合不同的缓存特性
   - 实现缓存链式处理

4. **观察者模式(Observer Pattern)**：
   - 实现缓存事件通知机制
   - 支持缓存变更监听
   - 实现缓存失效通知

5. **工厂模式(Factory Pattern)**：
   - 创建不同类型的缓存实例
   - 支持基于配置的动态创建
   - 封装缓存创建的复杂性

6. **单例模式(Singleton Pattern)**：
   - 确保缓存管理器的全局唯一性
   - 提供全局访问点
   - 管理系统级别的缓存配置

7. **模板方法模式(Template Method Pattern)**：
   - 定义缓存操作的基本骨架
   - 允许子类重写特定步骤
   - 确保操作流程的一致性

8. **外观模式(Facade Pattern)**：
   - 提供简化的缓存访问接口
   - 隐藏复杂的内部实现
   - 降低客户端与缓存系统的耦合

### 7.4 实现细节与代码示例

以下是一个简化但完整的缓存系统实现，展示了上述设计模式的应用：

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <list>
#include <memory>
#include <mutex>
#include <chrono>
#include <functional>
#include <vector>
#include <algorithm>
#include <thread>
#include <atomic>
#include <condition_variable>
#include <future>

// 缓存项类
template<typename K, typename V>
class CacheEntry {
public:
    CacheEntry(const V& value, const std::chrono::milliseconds& ttl = std::chrono::milliseconds::zero())
        : value(value), creationTime(std::chrono::steady_clock::now()), ttl(ttl) {}
    
    const V& getValue() const { return value; }
    void setValue(const V& newValue) { value = newValue; }
    
    bool isExpired() const {
        if (ttl == std::chrono::milliseconds::zero()) {
            return false;  // 永不过期
        }
        
        auto now = std::chrono::steady_clock::now();
        return (now - creationTime) > ttl;
    }
    
    void refresh() {
        creationTime = std::chrono::steady_clock::now();
    }
    
private:
    V value;
    std::chrono::steady_clock::time_point creationTime;
    std::chrono::milliseconds ttl;
};

// 缓存策略接口（策略模式）
template<typename K, typename V>
class EvictionPolicy {
public:
    virtual ~EvictionPolicy() = default;
    virtual void onPut(const K& key, std::shared_ptr<CacheEntry<K, V>> entry) = 0;
    virtual void onGet(const K& key) = 0;
    virtual void onRemove(const K& key) = 0;
    virtual K evict() = 0;
    virtual void clear() = 0;
};

// LRU淘汰策略
template<typename K, typename V>
class LRUEvictionPolicy : public EvictionPolicy<K, V> {
public:
    void onPut(const K& key, std::shared_ptr<CacheEntry<K, V>> entry) override {
        // 如果key已存在，先移除
        auto it = keyIteratorMap.find(key);
        if (it != keyIteratorMap.end()) {
            accessList.erase(it->second);
            keyIteratorMap.erase(it);
        }
        
        // 添加到访问列表的末尾
        accessList.push_back(key);
        keyIteratorMap[key] = std::prev(accessList.end());
    }
    
    void onGet(const K& key) override {
        auto it = keyIteratorMap.find(key);
        if (it != keyIteratorMap.end()) {
            // 移动到访问列表的末尾
            accessList.erase(it->second);
            accessList.push_back(key);
            keyIteratorMap[key] = std::prev(accessList.end());
        }
    }
    
    void onRemove(const K& key) override {
        auto it = keyIteratorMap.find(key);
        if (it != keyIteratorMap.end()) {
            accessList.erase(it->second);
            keyIteratorMap.erase(it);
        }
    }
    
    K evict() override {
        if (accessList.empty()) {
            throw std::runtime_error("Cannot evict from empty cache");
        }
        
        K keyToEvict = accessList.front();
        accessList.pop_front();
        keyIteratorMap.erase(keyToEvict);
        
        return keyToEvict;
    }
    
    void clear() override {
        accessList.clear();
        keyIteratorMap.clear();
    }
    
private:
    std::list<K> accessList;
    std::unordered_map<K, typename std::list<K>::iterator> keyIteratorMap;
};

// LFU淘汰策略
template<typename K, typename V>
class LFUEvictionPolicy : public EvictionPolicy<K, V> {
public:
    void onPut(const K& key, std::shared_ptr<CacheEntry<K, V>> entry) override {
        // 如果key已存在，先移除
        auto it = keyFreqMap.find(key);
        if (it != keyFreqMap.end()) {
            int freq = it->second;
            freqKeysMap[freq].erase(key);
            if (freqKeysMap[freq].empty()) {
                freqKeysMap.erase(freq);
                if (minFreq == freq) {
                    minFreq++;
                }
            }
        }
        
        // 添加到频率1的集合
        freqKeysMap[1].insert(key);
        keyFreqMap[key] = 1;
        minFreq = 1;
    }
    
    void onGet(const K& key) override {
        auto it = keyFreqMap.find(key);
        if (it != keyFreqMap.end()) {
            int freq = it->second;
            
            // 从当前频率集合中移除
            freqKeysMap[freq].erase(key);
            if (freqKeysMap[freq].empty()) {
                freqKeysMap.erase(freq);
                if (minFreq == freq) {
                    minFreq++;
                }
            }
            
            // 添加到频率+1的集合
            freqKeysMap[freq + 1].insert(key);
            keyFreqMap[key] = freq + 1;
        }
    }
    
    void onRemove(const K& key) override {
        auto it = keyFreqMap.find(key);
        if (it != keyFreqMap.end()) {
            int freq = it->second;
            freqKeysMap[freq].erase(key);
            if (freqKeysMap[freq].empty()) {
                freqKeysMap.erase(freq);
                if (minFreq == freq) {
                    minFreq++;
                }
            }
            keyFreqMap.erase(it);
        }
    }
    
    K evict() override {
        if (freqKeysMap.empty()) {
            throw std::runtime_error("Cannot evict from empty cache");
        }
        
        // 找到最小频率的集合
        auto minFreqIt = freqKeysMap.find(minFreq);
        if (minFreqIt == freqKeysMap.end() || minFreqIt->second.empty()) {
            throw std::runtime_error("Invalid eviction state");
        }
        
        // 从最小频率集合中移除一个元素
        K keyToEvict = *minFreqIt->second.begin();
        minFreqIt->second.erase(minFreqIt->second.begin());
        
        if (minFreqIt->second.empty()) {
            freqKeysMap.erase(minFreqIt);
        }
        
        keyFreqMap.erase(keyToEvict);
        
        // 更新最小频率
        if (freqKeysMap.empty()) {
            minFreq = 1;
        } else {
            minFreq = freqKeysMap.begin()->first;
        }
        
        return keyToEvict;
    }
    
    void clear() override {
        freqKeysMap.clear();
        keyFreqMap.clear();
        minFreq = 1;
    }
    
private:
    std::unordered_map<int, std::unordered_set<K>> freqKeysMap;
    std::unordered_map<K, int> keyFreqMap;
    int minFreq = 1;
};

// 缓存接口
template<typename K, typename V>
class Cache {
public:
    virtual ~Cache() = default;
    virtual bool get(const K& key, V& value) = 0;
    virtual void put(const K& key, const V& value) = 0;
    virtual void put(const K& key, const V& value, const std::chrono::milliseconds& ttl) = 0;
    virtual bool remove(const K& key) = 0;
    virtual void clear() = 0;
    virtual size_t size() const = 0;
};

// 基础缓存实现
template<typename K, typename V>
class BasicCache : public Cache<K, V> {
public:
    BasicCache(size_t maxSize, std::unique_ptr<EvictionPolicy<K, V>> evictionPolicy)
        : maxSize(maxSize), evictionPolicy(std::move(evictionPolicy)) {}
    
    bool get(const K& key, V& value) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto it = cacheMap.find(key);
        if (it == cacheMap.end()) {
            return false;
        }
        
        auto entry = it->second;
        if (entry->isExpired()) {
            // 条目已过期，移除并返回false
            evictionPolicy->onRemove(key);
            cacheMap.erase(it);
            return false;
        }
        
        // 更新访问信息
        evictionPolicy->onGet(key);
        value = entry->getValue();
        return true;
    }
    
    void put(const K& key, const V& value) override {
        put(key, value, std::chrono::milliseconds::zero());
    }
    
    void put(const K& key, const V& value, const std::chrono::milliseconds& ttl) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto entry = std::make_shared<CacheEntry<K, V>>(value, ttl);
        
        // 如果key已存在，更新值
        auto it = cacheMap.find(key);
        if (it != cacheMap.end()) {
            it->second = entry;
            evictionPolicy->onPut(key, entry);
            return;
        }
        
        // 如果缓存已满，先淘汰一个项
        if (cacheMap.size() >= maxSize) {
            K keyToEvict = evictionPolicy->evict();
            cacheMap.erase(keyToEvict);
        }
        
        // 添加新项
        cacheMap[key] = entry;
        evictionPolicy->onPut(key, entry);
    }
    
    bool remove(const K& key) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto it = cacheMap.find(key);
        if (it == cacheMap.end()) {
            return false;
        }
        
        evictionPolicy->onRemove(key);
        cacheMap.erase(it);
        return true;
    }
    
    void clear() override {
        std::lock_guard<std::mutex> lock(mutex);
        
        evictionPolicy->clear();
        cacheMap.clear();
    }
    
    size_t size() const override {
        std::lock_guard<std::mutex> lock(mutex);
        return cacheMap.size();
    }
    
protected:
    size_t maxSize;
    std::unordered_map<K, std::shared_ptr<CacheEntry<K, V>>> cacheMap;
    std::unique_ptr<EvictionPolicy<K, V>> evictionPolicy;
    mutable std::mutex mutex;
};

// 缓存装饰器基类
template<typename K, typename V>
class CacheDecorator : public Cache<K, V> {
public:
    CacheDecorator(std::shared_ptr<Cache<K, V>> cache) : cache(cache) {}
    
protected:
    std::shared_ptr<Cache<K, V>> cache;
};

// 统计装饰器
template<typename K, typename V>
class StatsCacheDecorator : public CacheDecorator<K, V> {
public:
    StatsCacheDecorator(std::shared_ptr<Cache<K, V>> cache) 
        : CacheDecorator<K, V>(cache), hits(0), misses(0) {}
    
    bool get(const K& key, V& value) override {
        bool result = this->cache->get(key, value);
        if (result) {
            hits++;
        } else {
            misses++;
        }
        return result;
    }
    
    void put(const K& key, const V& value) override {
        this->cache->put(key, value);
    }
    
    void put(const K& key, const V& value, const std::chrono::milliseconds& ttl) override {
        this->cache->put(key, value, ttl);
    }
    
    bool remove(const K& key) override {
        return this->cache->remove(key);
    }
    
    void clear() override {
        this->cache->clear();
        hits = 0;
        misses = 0;
    }
    
    size_t size() const override {
        return this->cache->size();
    }
    
    // 统计方法
    size_t getHits() const { return hits; }
    size_t getMisses() const { return misses; }
    double getHitRate() const { 
        size_t total = hits + misses;
        return total == 0 ? 0.0 : static_cast<double>(hits) / total; 
    }
    
private:
    std::atomic<size_t> hits;
    std::atomic<size_t> misses;
};

// 异步加载装饰器
template<typename K, typename V>
class AsyncLoadingCacheDecorator : public CacheDecorator<K, V> {
public:
    AsyncLoadingCacheDecorator(std::shared_ptr<Cache<K, V>> cache) 
        : CacheDecorator<K, V>(cache) {}
    
    bool get(const K& key, V& value) override {
        // 首先尝试从缓存获取
        if (this->cache->get(key, value)) {
            return true;
        }
        
        // 如果缓存中没有，检查是否有正在加载的任务
        std::unique_lock<std::mutex> lock(mutex);
        
        auto it = loadingTasks.find(key);
        if (it != loadingTasks.end()) {
            // 等待加载完成
            auto future = it->second;
            lock.unlock();
            
            try {
                value = future.get();
                return true;
            } catch (...) {
                return false;
            }
        }
        
        // 没有正在加载的任务，返回false
        return false;
    }
    
    void put(const K& key, const V& value) override {
        this->cache->put(key, value);
    }
    
    void put(const K& key, const V& value, const std::chrono::milliseconds& ttl) override {
        this->cache->put(key, value, ttl);
    }
    
    bool remove(const K& key) override {
        return this->cache->remove(key);
    }
    
    void clear() override {
        this->cache->clear();
        
        std::unique_lock<std::mutex> lock(mutex);
        loadingTasks.clear();
    }
    
    size_t size() const override {
        return this->cache->size();
    }
    
    // 异步加载方法
    std::future<V> getAsync(const K& key, std::function<V()> loader) {
        std::unique_lock<std::mutex> lock(mutex);
        
        // 检查是否已有加载任务
        auto it = loadingTasks.find(key);
        if (it != loadingTasks.end()) {
            return it->second;
        }
        
        // 创建新的异步加载任务
        std::promise<V> promise;
        std::future<V> future = promise.get_future();
        
        // 启动异步任务
        std::thread([this, key, loader, promise = std::move(promise)]() mutable {
            try {
                V value = loader();
                
                // 将结果放入缓存
                this->cache->put(key, value);
                
                // 设置promise的值
                promise.set_value(value);
                
                // 从加载任务中移除
                std::unique_lock<std::mutex> lock(mutex);
                loadingTasks.erase(key);
            } catch (...) {
                promise.set_exception(std::current_exception());
                
                // 从加载任务中移除
                std::unique_lock<std::mutex> lock(mutex);
                loadingTasks.erase(key);
            }
        }).detach();
        
        // 保存future
        loadingTasks[key] = std::move(future);
        
        return loadingTasks[key];
    }
    
private:
    std::unordered_map<K, std::future<V>> loadingTasks;
    std::mutex mutex;
};

// 缓存工厂（工厂模式）
template<typename K, typename V>
class CacheFactory {
public:
    static std::shared_ptr<Cache<K, V>> createLRUCache(size_t maxSize) {
        auto evictionPolicy = std::make_unique<LRUEvictionPolicy<K, V>>();
        auto cache = std::make_shared<BasicCache<K, V>>(maxSize, std::move(evictionPolicy));
        return cache;
    }
    
    static std::shared_ptr<Cache<K, V>> createLFUCache(size_t maxSize) {
        auto evictionPolicy = std::make_unique<LFUEvictionPolicy<K, V>>();
        auto cache = std::make_shared<BasicCache<K, V>>(maxSize, std::move(evictionPolicy));
        return cache;
    }
    
    static std::shared_ptr<Cache<K, V>> createStatsCache(std::shared_ptr<Cache<K, V>> cache) {
        return std::make_shared<StatsCacheDecorator<K, V>>(cache);
    }
    
    static std::shared_ptr<Cache<K, V>> createAsyncLoadingCache(std::shared_ptr<Cache<K, V>> cache) {
        return std::make_shared<AsyncLoadingCacheDecorator<K, V>>(cache);
    }
    
    static std::shared_ptr<Cache<K, V>> createLRUCacheWithStats(size_t maxSize) {
        auto cache = createLRUCache(maxSize);
        return createStatsCache(cache);
    }
    
    static std::shared_ptr<Cache<K, V>> createLFUCacheWithStatsAndAsyncLoading(size_t maxSize) {
        auto cache = createLFUCache(maxSize);
        cache = createStatsCache(cache);
        cache = createAsyncLoadingCache(cache);
        return cache;
    }
};

// 缓存管理器（单例模式）
template<typename K, typename V>
class CacheManager {
public:
    static CacheManager& getInstance() {
        static CacheManager instance;
        return instance;
    }
    
    std::shared_ptr<Cache<K, V>> getCache(const std::string& name) {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto it = caches.find(name);
        if (it != caches.end()) {
            return it->second;
        }
        
        // 默认创建LRU缓存
        auto cache = CacheFactory<K, V>::createLRUCacheWithStats(1000);
        caches[name] = cache;
        return cache;
    }
    
    void registerCache(const std::string& name, std::shared_ptr<Cache<K, V>> cache) {
        std::lock_guard<std::mutex> lock(mutex);
        caches[name] = cache;
    }
    
    void removeCache(const std::string& name) {
        std::lock_guard<std::mutex> lock(mutex);
        caches.erase(name);
    }
    
    void clearAllCaches() {
        std::lock_guard<std::mutex> lock(mutex);
        
        for (auto& pair : caches) {
            pair.second->clear();
        }
    }
    
private:
    CacheManager() = default;
    ~CacheManager() = default;
    CacheManager(const CacheManager&) = delete;
    CacheManager& operator=(const CacheManager&) = delete;
    
    std::unordered_map<std::string, std::shared_ptr<Cache<K, V>>> caches;
    std::mutex mutex;
};

// 使用示例
int main() {
    // 创建缓存
    auto cache = CacheFactory<std::string, int>::createLRUCacheWithStats(100);
    
    // 添加数据
    cache->put("key1", 100);
    cache->put("key2", 200);
    cache->put("key3", 300);
    
    // 获取数据
    int value;
    if (cache->get("key1", value)) {
        std::cout << "key1: " << value << std::endl;
    }
    
    // 获取统计信息
    auto statsCache = std::dynamic_pointer_cast<StatsCacheDecorator<std::string, int>>(cache);
    if (statsCache) {
        std::cout << "Hit rate: " << statsCache->getHitRate() * 100 << "%" << std::endl;
    }
    
    // 创建异步加载缓存
    auto asyncCache = CacheFactory<std::string, std::string>::createLFUCacheWithStatsAndAsyncLoading(100);
    auto asyncLoadingCache = std::dynamic_pointer_cast<AsyncLoadingCacheDecorator<std::string, std::string>>(asyncCache);
    
    if (asyncLoadingCache) {
        // 定义加载函数
        auto loader = [](const std::string& key) -> std::string {
            // 模拟从数据库加载
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
            return "Value for " + key;
        };
        
        // 异步加载数据
        auto future = asyncLoadingCache->getAsync("async_key", loader);
        
        // 做其他工作...
        
        // 获取加载结果
        try {
            std::string result = future.get();
            std::cout << "Loaded value: " << result << std::endl;
        } catch (const std::exception& e) {
            std::cerr << "Error loading value: " << e.what() << std::endl;
        }
    }
    
    // 使用缓存管理器
    auto& manager = CacheManager<std::string, int>::getInstance();
    auto managedCache = manager.getCache("myCache");
    managedCache->put("managed_key", 42);
    
    return 0;
}
```

#### 扩展性与维护性分析

1. **扩展性**：
   - **新淘汰策略**：通过实现EvictionPolicy接口，可以轻松添加新的淘汰策略，如Random、Time-based等
   - **新缓存功能**：通过继承CacheDecorator，可以添加新的功能，如持久化、压缩、加密等
   - **新缓存类型**：通过实现Cache接口，可以添加新的缓存类型，如分布式缓存、磁盘缓存等
   - **新统计指标**：通过扩展StatsCacheDecorator，可以添加更多的统计指标，如平均访问时间、热点数据等

2. **维护性**：
   - **模块化设计**：各组件职责单一，降低了修改的影响范围
   - **接口隔离**：客户端代码依赖于抽象接口，而非具体实现
   - **开闭原则**：对扩展开放，对修改关闭，新功能通过扩展而非修改现有代码实现
   - **依赖注入**：组件间通过接口交互，便于单元测试和模拟

3. **性能考虑**：
   - **异步加载**：通过AsyncLoadingCacheDecorator实现异步数据加载，减少访问延迟
   - **批量操作**：可以扩展支持批量获取和设置操作，减少网络开销
   - **内存优化**：通过合理的淘汰策略和TTL机制，控制内存使用
   - **并发控制**：通过细粒度锁和读写锁，提高并发访问性能

4. **可靠性保障**：
   - **异常安全**：各组件实现异常安全，确保缓存系统崩溃不影响主程序
   - **资源管理**：使用RAII和智能指针管理资源，防止资源泄漏
   - **线程安全**：通过互斥锁保护共享数据，确保多线程环境下的正确性
   - **故障恢复**：可以扩展实现持久化机制，确保系统重启后数据不丢失

5. **监控与运维**：
   - **统计信息**：通过StatsCacheDecorator提供详细的缓存统计信息
   - **健康检查**：可以扩展实现健康检查接口，监控系统状态
   - **配置管理**：可以扩展实现动态配置更新，支持运行时调整缓存参数
   - **日志记录**：可以扩展实现详细的日志记录，便于问题排查

通过上述设计，我们构建了一个灵活、可扩展、高性能的缓存系统，充分展示了设计模式在实际项目中的应用价值。这个缓存系统可以根据不同需求进行配置和扩展，满足各种复杂场景下的缓存需求。性能优化与权衡

### 8. 实战案例分析：插件系统

#### 需求分析

插件系统是一种允许在不修改核心系统代码的情况下扩展功能的软件架构。在现代软件开发中，插件系统被广泛应用于各种应用程序，如IDE、浏览器、内容管理系统等。一个良好的插件系统需要满足以下需求：

1. **功能需求**：
   - **插件发现与加载**：系统应能够自动发现并加载可用的插件
   - **插件生命周期管理**：支持插件的安装、启用、禁用和卸载
   - **插件间通信**：提供插件间相互通信的机制
   - **核心服务访问**：允许插件安全地访问核心系统提供的服务
   - **扩展点定义**：核心系统应明确定义可扩展的接口和扩展点
   - **插件配置管理**：支持插件配置的读取和修改
   - **插件依赖管理**：处理插件间的依赖关系，确保正确的加载顺序

2. **非功能需求**：
   - **安全性**：确保插件不能破坏核心系统或其他插件
   - **隔离性**：插件应在独立的执行环境中运行，避免相互干扰
   - **性能**：插件加载和执行不应显著影响系统性能
   - **可扩展性**：系统应支持大量插件的动态加载和管理
   - **兼容性**：支持插件版本管理和向后兼容
   - **容错性**：单个插件的错误不应导致整个系统崩溃

#### 设计方案

基于上述需求，我们设计了一个灵活且安全的插件系统架构。该系统采用分层设计，包括核心系统、插件管理器、插件接口和具体插件实现。

1. **系统架构**：
   - **核心系统**：提供基本功能和服务，定义扩展点
   - **插件管理器**：负责插件的发现、加载、生命周期管理和通信
   - **插件接口**：定义插件必须实现的接口和可访问的核心服务
   - **插件实现**：具体的插件代码，实现插件接口
   - **安全沙箱**：提供插件的隔离执行环境

2. **核心组件**：
   - **Plugin接口**：定义所有插件必须实现的基本方法
   - **PluginManager**：管理插件生命周期的核心组件
   - **ExtensionPoint**：定义系统可扩展的接口
   - **PluginRegistry**：维护已注册插件的信息
   - **ClassLoader**：负责插件的动态加载和卸载
   - **EventBus**：提供插件间的事件通信机制

3. **工作流程**：
   - **启动阶段**：扫描插件目录，发现可用插件
   - **加载阶段**：解析插件元数据，按依赖顺序加载插件
   - **初始化阶段**：调用插件的初始化方法，注册扩展点
   - **运行阶段**：处理插件请求，管理插件间通信
   - **关闭阶段**：按依赖顺序卸载插件，释放资源

#### 应用的设计模式

在插件系统的设计中，我们应用了多种设计模式，每种模式都解决了特定的问题：

1. **策略模式**：
   - **应用场景**：插件加载策略、插件验证策略
   - **解决问题**：允许在运行时选择不同的插件加载和验证方式
   - **实现方式**：定义PluginLoaderStrategy和PluginValidatorStrategy接口

2. **观察者模式**：
   - **应用场景**：插件生命周期事件通知
   - **解决问题**：当插件状态发生变化时，通知相关的观察者
   - **实现方式**：PluginManager作为主题，插件作为观察者

3. **工厂模式**：
   - **应用场景**：插件实例创建
   - **解决问题**：根据插件类型创建相应的插件实例
   - **实现方式**：PluginFactory负责根据配置创建插件实例

4. **装饰器模式**：
   - **应用场景**：插件功能增强
   - **解决问题**：在不修改插件代码的情况下，为插件添加额外功能
   - **实现方式**：PluginDecorator包装基础插件，添加安全、日志等功能

5. **代理模式**：
   - **应用场景**：插件访问控制
   - **解决问题**：控制插件对核心系统资源的访问
   - **实现方式**：PluginProxy作为插件与核心系统之间的中介

6. **命令模式**：
   - **应用场景**：插件操作封装
   - **解决问题**：将插件操作封装为命令对象，支持撤销和重做
   - **实现方式**：PluginCommand封装插件的各种操作

7. **组合模式**：
   - **应用场景**：插件依赖管理
   - **解决问题**：处理插件间的复杂依赖关系
   - **实现方式**：PluginDependencyTree表示插件依赖结构

8. **迭代器模式**：
   - **应用场景**：插件集合遍历
   - **解决问题**：提供统一的插件集合遍历方式
   - **实现方式**：PluginIterator提供插件的遍历接口

#### 实现细节与代码示例

下面是一个基于C++的插件系统实现示例，展示了上述设计模式的应用：

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include <unordered_map>
#include <functional>
#include <algorithm>
#include <stdexcept>
#include <mutex>
#include <thread>
#include <condition_variable>
#include <queue>
#include <atomic>
#include <dlfcn.h> // 用于动态库加载

// 前向声明
class IPlugin;
class IPluginManager;
class IExtensionPoint;
class IEventBus;

// 插件状态枚举
enum class PluginState {
    UNLOADED,
    LOADING,
    LOADED,
    INITIALIZING,
    ACTIVE,
    STOPPING,
    STOPPED,
    ERROR
};

// 插件信息结构
struct PluginInfo {
    std::string id;
    std::string name;
    std::string version;
    std::string description;
    std::string author;
    std::vector<std::string> dependencies;
    std::string libraryPath;
    PluginState state = PluginState::UNLOADED;
};

// 插件事件类型
enum class PluginEventType {
    LOADING,
    LOADED,
    INITIALIZING,
    ACTIVE,
    STOPPING,
    STOPPED,
    ERROR
};

// 插件事件
struct PluginEvent {
    std::string pluginId;
    PluginEventType type;
    std::string message;
};

// 插件接口（策略模式）
class IPlugin {
public:
    virtual ~IPlugin() = default;
    
    // 插件生命周期方法
    virtual bool initialize(const std::unordered_map<std::string, std::string>& config) = 0;
    virtual void start() = 0;
    virtual void stop() = 0;
    virtual void cleanup() = 0;
    
    // 插件信息
    virtual std::string getId() const = 0;
    virtual std::string getName() const = 0;
    virtual std::string getVersion() const = 0;
    virtual std::vector<std::string> getDependencies() const = 0;
    
    // 插件状态
    virtual PluginState getState() const = 0;
    virtual void setState(PluginState state) = 0;
};

// 扩展点接口
class IExtensionPoint {
public:
    virtual ~IExtensionPoint() = default;
    virtual std::string getId() const = 0;
    virtual std::string getInterfaceName() const = 0;
    virtual void registerExtension(std::shared_ptr<IPlugin> plugin) = 0;
    virtual void unregisterExtension(const std::string& pluginId) = 0;
    virtual std::vector<std::shared_ptr<IPlugin>> getExtensions() const = 0;
};

// 事件总线接口（观察者模式）
class IEventBus {
public:
    virtual ~IEventBus() = default;
    virtual void publish(const PluginEvent& event) = 0;
    virtual void subscribe(const std::string& pluginId, std::function<void(const PluginEvent&)> handler) = 0;
    virtual void unsubscribe(const std::string& pluginId) = 0;
};

// 插件加载器策略接口（策略模式）
class IPluginLoaderStrategy {
public:
    virtual ~IPluginLoaderStrategy() = default;
    virtual std::shared_ptr<IPlugin> load(const std::string& libraryPath) = 0;
    virtual void unload(std::shared_ptr<IPlugin> plugin) = 0;
};

// 插件验证器策略接口（策略模式）
class IPluginValidatorStrategy {
public:
    virtual ~IPluginValidatorStrategy() = default;
    virtual bool validate(const PluginInfo& info) = 0;
    virtual bool validateDependencies(const PluginInfo& info, const std::vector<PluginInfo>& loadedPlugins) = 0;
};

// 插件代理（代理模式）
class PluginProxy : public IPlugin {
public:
    PluginProxy(std::shared_ptr<IPlugin> plugin, IPluginManager* manager)
        : plugin(plugin), manager(manager) {}
    
    bool initialize(const std::unordered_map<std::string, std::string>& config) override {
        // 在调用实际插件方法前进行权限检查
        if (!checkPermission("initialize")) {
            throw std::runtime_error("Plugin does not have permission to initialize");
        }
        
        return plugin->initialize(config);
    }
    
    void start() override {
        if (!checkPermission("start")) {
            throw std::runtime_error("Plugin does not have permission to start");
        }
        
        plugin->start();
    }
    
    void stop() override {
        if (!checkPermission("stop")) {
            throw std::runtime_error("Plugin does not have permission to stop");
        }
        
        plugin->stop();
    }
    
    void cleanup() override {
        if (!checkPermission("cleanup")) {
            throw std::runtime_error("Plugin does not have permission to cleanup");
        }
        
        plugin->cleanup();
    }
    
    std::string getId() const override {
        return plugin->getId();
    }
    
    std::string getName() const override {
        return plugin->getName();
    }
    
    std::string getVersion() const override {
        return plugin->getVersion();
    }
    
    std::vector<std::string> getDependencies() const override {
        return plugin->getDependencies();
    }
    
    PluginState getState() const override {
        return plugin->getState();
    }
    
    void setState(PluginState state) override {
        plugin->setState(state);
    }
    
private:
    std::shared_ptr<IPlugin> plugin;
    IPluginManager* manager;
    
    bool checkPermission(const std::string& operation) const {
        // 实现权限检查逻辑
        // 这里简化处理，实际应用中应根据插件的安全级别和操作类型进行检查
        return true;
    }
};

// 插件装饰器（装饰器模式）
class PluginDecorator : public IPlugin {
public:
    PluginDecorator(std::shared_ptr<IPlugin> plugin) : plugin(plugin) {}
    
    bool initialize(const std::unordered_map<std::string, std::string>& config) override {
        logOperation("initialize");
        bool result = plugin->initialize(config);
        logOperation("initialize", result);
        return result;
    }
    
    void start() override {
        logOperation("start");
        plugin->start();
        logOperation("start", true);
    }
    
    void stop() override {
        logOperation("stop");
        plugin->stop();
        logOperation("stop", true);
    }
    
    void cleanup() override {
        logOperation("cleanup");
        plugin->cleanup();
        logOperation("cleanup", true);
    }
    
    std::string getId() const override {
        return plugin->getId();
    }
    
    std::string getName() const override {
        return plugin->getName();
    }
    
    std::string getVersion() const override {
        return plugin->getVersion();
    }
    
    std::vector<std::string> getDependencies() const override {
        return plugin->getDependencies();
    }
    
    PluginState getState() const override {
        return plugin->getState();
    }
    
    void setState(PluginState state) override {
        plugin->setState(state);
    }
    
protected:
    std::shared_ptr<IPlugin> plugin;
    
    void logOperation(const std::string& operation, bool success = true) const {
        std::cout << "[PluginLogger] " << plugin->getId() << "::" << operation 
                  << (success ? " succeeded" : " failed") << std::endl;
    }
};

// 插件命令（命令模式）
class PluginCommand {
public:
    virtual ~PluginCommand() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

class LoadPluginCommand : public PluginCommand {
public:
    LoadPluginCommand(IPluginManager* manager, const std::string& pluginId)
        : manager(manager), pluginId(pluginId) {}
    
    void execute() override {
        // 保存当前状态以便撤销
        previousState = manager->getPluginState(pluginId);
        manager->loadPlugin(pluginId);
    }
    
    void undo() override {
        if (previousState.has_value()) {
            manager->setPluginState(pluginId, previousState.value());
        }
    }
    
private:
    IPluginManager* manager;
    std::string pluginId;
    std::optional<PluginState> previousState;
};

// 事件总线实现（观察者模式）
class EventBus : public IEventBus {
public:
    void publish(const PluginEvent& event) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        for (const auto& [pluginId, handler] : handlers) {
            // 异步调用处理器，避免一个处理器的错误影响其他处理器
            std::thread([handler, event]() {
                try {
                    handler(event);
                } catch (const std::exception& e) {
                    std::cerr << "Error in event handler for plugin " 
                              << event.pluginId << ": " << e.what() << std::endl;
                }
            }).detach();
        }
    }
    
    void subscribe(const std::string& pluginId, std::function<void(const PluginEvent&)> handler) override {
        std::lock_guard<std::mutex> lock(mutex);
        handlers[pluginId] = handler;
    }
    
    void unsubscribe(const std::string& pluginId) override {
        std::lock_guard<std::mutex> lock(mutex);
        handlers.erase(pluginId);
    }
    
private:
    std::unordered_map<std::string, std::function<void(const PluginEvent&)>> handlers;
    std::mutex mutex;
};

// 默认插件加载器策略
class DefaultPluginLoaderStrategy : public IPluginLoaderStrategy {
public:
    std::shared_ptr<IPlugin> load(const std::string& libraryPath) override {
        // 加载动态库
        void* handle = dlopen(libraryPath.c_str(), RTLD_LAZY);
        if (!handle) {
            throw std::runtime_error("Cannot load library: " + std::string(dlerror()));
        }
        
        // 获取创建插件的函数
        typedef IPlugin* (*create_plugin_func)();
        create_plugin_func createPlugin = (create_plugin_func) dlsym(handle, "createPlugin");
        
        if (!createPlugin) {
            dlclose(handle);
            throw std::runtime_error("Cannot find symbol 'createPlugin' in library");
        }
        
        // 创建插件实例
        IPlugin* plugin = createPlugin();
        if (!plugin) {
            dlclose(handle);
            throw std::runtime_error("Failed to create plugin instance");
        }
        
        // 返回共享指针，并设置自定义删除器
        return std::shared_ptr<IPlugin>(plugin, [handle](IPlugin* p) {
            delete p;
            dlclose(handle);
        });
    }
    
    void unload(std::shared_ptr<IPlugin> plugin) override {
        // 共享指针的自定义删除器会处理卸载逻辑
        plugin.reset();
    }
};

// 默认插件验证器策略
class DefaultPluginValidatorStrategy : public IPluginValidatorStrategy {
public:
    bool validate(const PluginInfo& info) override {
        // 检查基本信息
        if (info.id.empty() || info.name.empty() || info.version.empty()) {
            return false;
        }
        
        // 检查库文件是否存在
        // 这里简化处理，实际应用中应检查文件系统
        if (info.libraryPath.empty()) {
            return false;
        }
        
        return true;
    }
    
    bool validateDependencies(const PluginInfo& info, const std::vector<PluginInfo>& loadedPlugins) override {
        // 检查依赖是否已加载
        for (const auto& dep : info.dependencies) {
            bool found = false;
            for (const auto& loaded : loadedPlugins) {
                if (loaded.id == dep) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                return false;
            }
        }
        
        return true;
    }
};

// 插件管理器接口
class IPluginManager {
public:
    virtual ~IPluginManager() = default;
    
    // 插件生命周期管理
    virtual void loadPlugin(const std::string& pluginId) = 0;
    virtual void unloadPlugin(const std::string& pluginId) = 0;
    virtual void enablePlugin(const std::string& pluginId) = 0;
    virtual void disablePlugin(const std::string& pluginId) = 0;
    
    // 插件查询
    virtual std::shared_ptr<IPlugin> getPlugin(const std::string& pluginId) = 0;
    virtual std::vector<std::string> getPluginIds() const = 0;
    virtual PluginState getPluginState(const std::string& pluginId) const = 0;
    virtual void setPluginState(const std::string& pluginId, PluginState state) = 0;
    
    // 扩展点管理
    virtual void registerExtensionPoint(const std::string& id, std::shared_ptr<IExtensionPoint> extensionPoint) = 0;
    virtual std::shared_ptr<IExtensionPoint> getExtensionPoint(const std::string& id) = 0;
    virtual std::vector<std::string> getExtensionPointIds() const = 0;
    
    // 事件总线
    virtual std::shared_ptr<IEventBus> getEventBus() = 0;
    
    // 策略设置
    virtual void setLoaderStrategy(std::unique_ptr<IPluginLoaderStrategy> strategy) = 0;
    virtual void setValidatorStrategy(std::unique_ptr<IPluginValidatorStrategy> strategy) = 0;
};

// 插件管理器实现
class PluginManager : public IPluginManager {
public:
    PluginManager() 
        : loaderStrategy(std::make_unique<DefaultPluginLoaderStrategy>()),
          validatorStrategy(std::make_unique<DefaultPluginValidatorStrategy>()),
          eventBus(std::make_shared<EventBus>()) {}
    
    void loadPlugin(const std::string& pluginId) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        // 查找插件信息
        auto infoIt = std::find_if(pluginInfos.begin(), pluginInfos.end(),
            [&pluginId](const PluginInfo& info) { return info.id == pluginId; });
        
        if (infoIt == pluginInfos.end()) {
            throw std::runtime_error("Plugin not found: " + pluginId);
        }
        
        // 检查插件状态
        if (infoIt->state != PluginState::UNLOADED) {
            throw std::runtime_error("Plugin is already loaded: " + pluginId);
        }
        
        // 验证插件
        if (!validatorStrategy->validate(*infoIt)) {
            throw std::runtime_error("Plugin validation failed: " + pluginId);
        }
        
        // 验证依赖
        std::vector<PluginInfo> loadedPlugins;
        for (const auto& [id, plugin] : plugins) {
            auto loadedInfo = std::find_if(pluginInfos.begin(), pluginInfos.end(),
                [&id](const PluginInfo& info) { return info.id == id; });
            if (loadedInfo != pluginInfos.end()) {
                loadedPlugins.push_back(*loadedInfo);
            }
        }
        
        if (!validatorStrategy->validateDependencies(*infoIt, loadedPlugins)) {
            throw std::runtime_error("Plugin dependencies not satisfied: " + pluginId);
        }
        
        // 发布加载事件
        eventBus->publish({pluginId, PluginEventType::LOADING, "Starting to load plugin"});
        
        try {
            // 更新状态
            infoIt->state = PluginState::LOADING;
            
            // 加载插件
            auto plugin = loaderStrategy->load(infoIt->libraryPath);
            
            // 创建代理和装饰器
            auto proxy = std::make_shared<PluginProxy>(plugin, this);
            auto decorated = std::make_shared<PluginDecorator>(proxy);
            
            // 存储插件
            plugins[pluginId] = decorated;
            
            // 更新状态
            infoIt->state = PluginState::LOADED;
            
            // 发布加载完成事件
            eventBus->publish({pluginId, PluginEventType::LOADED, "Plugin loaded successfully"});
        } catch (const std::exception& e) {
            // 更新状态
            infoIt->state = PluginState::ERROR;
            
            // 发布错误事件
            eventBus->publish({pluginId, PluginEventType::ERROR, "Failed to load plugin: " + std::string(e.what())});
            
            throw;
        }
    }
    
    void unloadPlugin(const std::string& pluginId) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        // 查找插件
        auto pluginIt = plugins.find(pluginId);
        if (pluginIt == plugins.end()) {
            throw std::runtime_error("Plugin not found: " + pluginId);
        }
        
        // 查找插件信息
        auto infoIt = std::find_if(pluginInfos.begin(), pluginInfos.end(),
            [&pluginId](const PluginInfo& info) { return info.id == pluginId; });
        
        if (infoIt == pluginInfos.end()) {
            throw std::runtime_error("Plugin info not found: " + pluginId);
        }
        
        // 检查是否有其他插件依赖此插件
        for (const auto& info : pluginInfos) {
            if (info.state == PluginState::ACTIVE || info.state == PluginState::LOADED) {
                for (const auto& dep : info.dependencies) {
                    if (dep == pluginId) {
                        throw std::runtime_error("Cannot unload plugin, it has dependents: " + pluginId);
                    }
                }
            }
        }
        
        // 发布卸载事件
        eventBus->publish({pluginId, PluginEventType::STOPPING, "Starting to unload plugin"});
        
        try {
            // 停止插件
            if (infoIt->state == PluginState::ACTIVE) {
                pluginIt->second->stop();
                infoIt->state = PluginState::STOPPED;
            }
            
            // 清理插件
            pluginIt->second->cleanup();
            
            // 卸载插件
            loaderStrategy->unload(pluginIt->second);
            
            // 从插件列表中移除
            plugins.erase(pluginIt);
            
            // 更新状态
            infoIt->state = PluginState::UNLOADED;
            
            // 发布卸载完成事件
            eventBus->publish({pluginId, PluginEventType::STOPPED, "Plugin unloaded successfully"});
        } catch (const std::exception& e) {
            // 更新状态
            infoIt->state = PluginState::ERROR;
            
            // 发布错误事件
            eventBus->publish({pluginId, PluginEventType::ERROR, "Failed to unload plugin: " + std::string(e.what())});
            
            throw;
        }
    }
    
    void enablePlugin(const std::string& pluginId) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        // 查找插件
        auto pluginIt = plugins.find(pluginId);
        if (pluginIt == plugins.end()) {
            throw std::runtime_error("Plugin not found: " + pluginId);
        }
        
        // 查找插件信息
        auto infoIt = std::find_if(pluginInfos.begin(), pluginInfos.end(),
            [&pluginId](const PluginInfo& info) { return info.id == pluginId; });
        
        if (infoIt == pluginInfos.end()) {
            throw std::runtime_error("Plugin info not found: " + pluginId);
        }
        
        // 检查插件状态
        if (infoIt->state != PluginState::LOADED && infoIt->state != PluginState::STOPPED) {
            throw std::runtime_error("Plugin is not in a state that can be enabled: " + pluginId);
        }
        
        // 发布初始化事件
        eventBus->publish({pluginId, PluginEventType::INITIALIZING, "Starting to initialize plugin"});
        
        try {
            // 初始化插件
            infoIt->state = PluginState::INITIALIZING;
            
            // 获取插件配置（这里简化处理）
            std::unordered_map<std::string, std::string> config;
            
            if (!pluginIt->second->initialize(config)) {
                throw std::runtime_error("Plugin initialization failed");
            }
            
            // 启动插件
            pluginIt->second->start();
            
            // 更新状态
            infoIt->state = PluginState::ACTIVE;
            
            // 发布激活事件
            eventBus->publish({pluginId, PluginEventType::ACTIVE, "Plugin activated successfully"});
        } catch (const std::exception& e) {
            // 更新状态
            infoIt->state = PluginState::ERROR;
            
            // 发布错误事件
            eventBus->publish({pluginId, PluginEventType::ERROR, "Failed to enable plugin: " + std::string(e.what())});
            
            throw;
        }
    }
    
    void disablePlugin(const std::string& pluginId) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        // 查找插件
        auto pluginIt = plugins.find(pluginId);
        if (pluginIt == plugins.end()) {
            throw std::runtime_error("Plugin not found: " + pluginId);
        }
        
        // 查找插件信息
        auto infoIt = std::find_if(pluginInfos.begin(), pluginInfos.end(),
            [&pluginId](const PluginInfo& info) { return info.id == pluginId; });
        
        if (infoIt == pluginInfos.end()) {
            throw std::runtime_error("Plugin info not found: " + pluginId);
        }
        
        // 检查插件状态
        if (infoIt->state != PluginState::ACTIVE) {
            throw std::runtime_error("Plugin is not active: " + pluginId);
        }
        
        // 发布停止事件
        eventBus->publish({pluginId, PluginEventType::STOPPING, "Starting to stop plugin"});
        
        try {
            // 停止插件
            pluginIt->second->stop();
            
            // 更新状态
            infoIt->state = PluginState::STOPPED;
            
            // 发布停止完成事件
            eventBus->publish({pluginId, PluginEventType::STOPPED, "Plugin stopped successfully"});
        } catch (const std::exception& e) {
            // 更新状态
            infoIt->state = PluginState::ERROR;
            
            // 发布错误事件
            eventBus->publish({pluginId, PluginEventType::ERROR, "Failed to disable plugin: " + std::string(e.what())});
            
            throw;
        }
    }
    
    std::shared_ptr<IPlugin> getPlugin(const std::string& pluginId) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto it = plugins.find(pluginId);
        if (it == plugins.end()) {
            return nullptr;
        }
        
        return it->second;
    }
    
    std::vector<std::string> getPluginIds() const override {
        std::lock_guard<std::mutex> lock(mutex);
        
        std::vector<std::string> ids;
        for (const auto& [id, plugin] : plugins) {
            ids.push_back(id);
        }
        
        return ids;
    }
    
    PluginState getPluginState(const std::string& pluginId) const override {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto infoIt = std::find_if(pluginInfos.begin(), pluginInfos.end(),
            [&pluginId](const PluginInfo& info) { return info.id == pluginId; });
        
        if (infoIt == pluginInfos.end()) {
            throw std::runtime_error("Plugin not found: " + pluginId);
        }
        
        return infoIt->state;
    }
    
    void setPluginState(const std::string& pluginId, PluginState state) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto infoIt = std::find_if(pluginInfos.begin(), pluginInfos.end(),
            [&pluginId](const PluginInfo& info) { return info.id == pluginId; });
        
        if (infoIt == pluginInfos.end()) {
            throw std::runtime_error("Plugin not found: " + pluginId);
        }
        
        infoIt->state = state;
    }
    
    void registerExtensionPoint(const std::string& id, std::shared_ptr<IExtensionPoint> extensionPoint) override {
        std::lock_guard<std::mutex> lock(mutex);
        extensionPoints[id] = extensionPoint;
    }
    
    std::shared_ptr<IExtensionPoint> getExtensionPoint(const std::string& id) override {
        std::lock_guard<std::mutex> lock(mutex);
        
        auto it = extensionPoints.find(id);
        if (it == extensionPoints.end()) {
            return nullptr;
        }
        
        return it->second;
    }
    
    std::vector<std::string> getExtensionPointIds() const override {
        std::lock_guard<std::mutex> lock(mutex);
        
        std::vector<std::string> ids;
        for (const auto& [id, extensionPoint] : extensionPoints) {
            ids.push_back(id);
        }
        
        return ids;
    }
    
    std::shared_ptr<IEventBus> getEventBus() override {
        return eventBus;
    }
    
    void setLoaderStrategy(std::unique_ptr<IPluginLoaderStrategy> strategy) override {
        loaderStrategy = std::move(strategy);
    }
    
    void setValidatorStrategy(std::unique_ptr<IPluginValidatorStrategy> strategy) override {
        validatorStrategy = std::move(strategy);
    }
    
    // 添加插件信息（用于初始化）
    void addPluginInfo(const PluginInfo& info) {
        std::lock_guard<std::mutex> lock(mutex);
        pluginInfos.push_back(info);
    }
    
private:
    std::unordered_map<std::string, std::shared_ptr<IPlugin>> plugins;
    std::vector<PluginInfo> pluginInfos;
    std::unordered_map<std::string, std::shared_ptr<IExtensionPoint>> extensionPoints;
    std::unique_ptr<IPluginLoaderStrategy> loaderStrategy;
    std::unique_ptr<IPluginValidatorStrategy> validatorStrategy;
    std::shared_ptr<IEventBus> eventBus;
    mutable std::mutex mutex;
};

// 插件工厂（工厂模式）
class PluginFactory {
public:
    static std::unique_ptr<IPluginManager> createPluginManager() {
        return std::make_unique<PluginManager>();
    }
    
    static std::shared_ptr<LoadPluginCommand> createLoadPluginCommand(
        IPluginManager* manager, const std::string& pluginId) {
        return std::make_shared<LoadPluginCommand>(manager, pluginId);
    }
};

// 使用示例
int main() {
    // 创建插件管理器
    auto manager = PluginFactory::createPluginManager();
    
    // 添加插件信息
    PluginInfo plugin1Info;
    plugin1Info.id = "plugin1";
    plugin1Info.name = "Sample Plugin 1";
    plugin1Info.version = "1.0.0";
    plugin1Info.description = "A sample plugin for demonstration";
    plugin1Info.author = "Plugin Developer";
    plugin1Info.libraryPath = "./plugins/libplugin1.so";
    manager->addPluginInfo(plugin1Info);
    
    PluginInfo plugin2Info;
    plugin2Info.id = "plugin2";
    plugin2Info.name = "Sample Plugin 2";
    plugin2Info.version = "1.0.0";
    plugin2Info.description = "Another sample plugin for demonstration";
    plugin2Info.author = "Plugin Developer";
    plugin2Info.libraryPath = "./plugins/libplugin2.so";
    plugin2Info.dependencies.push_back("plugin1");
    manager->addPluginInfo(plugin2Info);
    
    // 订阅事件
    manager->getEventBus()->subscribe("main", [](const PluginEvent& event) {
        std::cout << "[Event] Plugin " << event.pluginId << " event: ";
        
        switch (event.type) {
            case PluginEventType::LOADING:
                std::cout << "Loading";
                break;
            case PluginEventType::LOADED:
                std::cout << "Loaded";
                break;
            case PluginEventType::INITIALIZING:
                std::cout << "Initializing";
                break;
            case PluginEventType::ACTIVE:
                std::cout << "Active";
                break;
            case PluginEventType::STOPPING:
                std::cout << "Stopping";
                break;
            case PluginEventType::STOPPED:
                std::cout << "Stopped";
                break;
            case PluginEventType::ERROR:
                std::cout << "Error";
                break;
        }
        
        if (!event.message.empty()) {
            std::cout << " - " << event.message;
        }
        
        std::cout << std::endl;
    });
    
    try {
        // 加载插件
        manager->loadPlugin("plugin1");
        manager->enablePlugin("plugin1");
        
        manager->loadPlugin("plugin2");
        manager->enablePlugin("plugin2");
        
        // 使用插件
        auto plugin1 = manager->getPlugin("plugin1");
        if (plugin1) {
            std::cout << "Plugin 1 name: " << plugin1->getName() << std::endl;
            std::cout << "Plugin 1 version: " << plugin1->getVersion() << std::endl;
        }
        
        auto plugin2 = manager->getPlugin("plugin2");
        if (plugin2) {
            std::cout << "Plugin 2 name: " << plugin2->getName() << std::endl;
            std::cout << "Plugin 2 version: " << plugin2->getVersion() << std::endl;
        }
        
        // 禁用插件
        manager->disablePlugin("plugin2");
        manager->unloadPlugin("plugin2");
        
        manager->disablePlugin("plugin1");
        manager->unloadPlugin("plugin1");
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    
    return 0;
}
```

#### 扩展机制分析

插件系统的扩展机制是其核心价值所在，我们的设计提供了多种扩展方式：

1. **插件扩展**：
   - **新插件开发**：开发者只需实现IPlugin接口，即可创建新的插件
   - **插件版本管理**：支持插件版本控制和兼容性检查
   - **插件热插拔**：支持运行时加载和卸载插件，无需重启系统
   - **插件依赖管理**：自动解析和满足插件间的依赖关系

2. **扩展点扩展**：
   - **新扩展点定义**：核心系统可以定义新的扩展点，允许插件扩展特定功能
   - **扩展点版本控制**：支持扩展点接口的演进和向后兼容
   - **扩展点访问控制**：可以限制特定插件对某些扩展点的访问

3. **策略扩展**：
   - **自定义加载策略**：可以实现自定义的插件加载策略，如从网络加载插件
   - **自定义验证策略**：可以实现自定义的插件验证逻辑，如数字签名验证
   - **自定义安全策略**：可以实现自定义的插件安全控制策略

4. **通信机制扩展**：
   - **新事件类型**：可以添加新的事件类型，支持更丰富的插件通信
   - **自定义通信协议**：可以实现插件间的自定义通信协议
   - **插件服务注册**：插件可以注册服务供其他插件使用

5. **安全机制扩展**：
   - **权限模型扩展**：可以实现更细粒度的权限控制模型
   - **沙箱机制扩展**：可以实现更严格的插件隔离机制
   - **资源限制扩展**：可以实现对插件资源使用的限制

6. **管理界面扩展**：
   - **插件管理UI**：可以开发插件管理的图形界面
   - **监控仪表板**：可以开发插件运行的监控仪表板
   - **配置管理工具**：可以开发插件配置的管理工具

通过这些扩展机制，我们的插件系统可以适应各种复杂的应用场景，为系统提供强大的可扩展性和灵活性。无论是简单的功能扩展还是复杂的系统集成，都可以通过插件系统实现，同时保持核心系统的稳定性和安全性。

### 9. 章节总结

设计模式的实战应用需要综合考虑多种因素，包括系统需求、性能要求、团队技能水平等。本章通过实际案例展示了设计模式在不同场景下的应用，帮助读者将理论知识转化为实践能力。

### 设计模式实战应用的综合分析

#### 1. 设计模式选择的决策框架

在实际项目中，选择合适的设计模式是一个需要权衡的过程。以下是一个实用的决策框架：

**需求分析阶段**：
- **问题识别**：明确系统面临的核心问题，如对象创建、结构组织、行为协调等
- **场景评估**：分析问题出现的频率、影响范围和变化可能性
- **约束条件**：考虑性能、资源、团队技能等约束因素

**模式选择阶段**：
- **匹配度评估**：评估设计模式与问题的匹配程度
- **复杂度权衡**：权衡模式引入的复杂度与带来的收益
- **可维护性考量**：考虑模式对系统长期维护的影响

**实施阶段**：
- **渐进式应用**：从小范围开始，逐步扩展模式应用
- **持续评估**：定期评估模式应用效果，必要时调整
- **文档完善**：详细记录模式应用的原因和实现细节

#### 2. 设计模式组合应用的策略

在实际系统中，设计模式往往不是孤立使用的，而是组合应用以解决复杂问题：

**模式组合原则**：
- **职责互补**：选择职责互补的模式组合，如工厂方法+策略模式
- **层次协调**：在不同抽象层次应用不同模式，如外观+组合模式
- **生命周期管理**：结合管理对象生命周期的模式，如单例+观察者模式

**常见组合模式**：
- **创建型+结构型组合**：如工厂方法+适配器模式，用于创建适配特定接口的对象
- **结构型+行为型组合**：如装饰器+策略模式，为不同策略添加额外功能
- **创建型+行为型组合**：如建造者+命令模式，用于创建可配置的命令对象

**组合应用案例**：
- **日志系统**：单例+工厂+策略+装饰器+观察者+生产者-消费者模式
- **缓存系统**：策略+代理+装饰器+观察者+工厂+单例+模板方法+外观模式
- **插件系统**：策略+观察者+工厂+装饰器+代理+命令+组合+迭代器模式

#### 3. 设计模式与系统架构的关系

设计模式在系统架构中扮演着重要角色，它们是实现架构原则的具体手段：

**模式与架构层次**：
- **架构层模式**：如MVC、微服务架构等，定义系统整体结构
- **设计层模式**：如本章讨论的GoF模式，解决局部设计问题
- **实现层模式**：如编程惯用法、特定语言模式等，解决具体实现问题

**模式对架构质量的影响**：
- **可扩展性**：策略、装饰器、观察者等模式支持系统灵活扩展
- **可维护性**：单例、工厂、外观等模式降低系统维护成本
- **可重用性**：组合、模板方法等模式提高组件重用性
- **性能优化**：代理、享元等模式可优化系统性能

#### 4. 设计模式应用的常见陷阱与规避策略

在实际应用设计模式时，开发者常常会遇到一些陷阱，了解这些陷阱并知道如何规避至关重要：

**过度设计陷阱**：
- **表现**：在简单问题上应用复杂模式，增加系统复杂度
- **规避策略**：遵循KISS原则，只在确实需要时应用模式
- **判断标准**：如果问题可以通过简单方式解决，避免引入复杂模式

**模式误用陷阱**：
- **表现**：对模式理解不深，在不合适的场景应用
- **规避策略**：深入理解模式的意图、适用场景和优缺点
- **实践建议**：建立模式决策矩阵，明确各模式的适用条件

**性能陷阱**：
- **表现**：某些模式可能引入性能开销，如装饰器、代理等
- **规避策略**：在性能敏感路径谨慎使用模式，进行性能测试
- **优化技巧**：结合延迟初始化、缓存等技术优化模式实现

**维护陷阱**：
- **表现**：模式应用增加代码量，提高维护难度
- **规避策略**：提供清晰文档，使用命名约定表达模式意图
- **最佳实践**：保持模式实现简单，避免过度抽象

#### 5. 设计模式与现代开发范式的融合

设计模式需要与现代开发范式和技术栈融合，以发挥最大价值：

**与敏捷开发的融合**：
- **演进式设计**：在重构过程中识别和应用设计模式
- **YAGNI原则**：只在确实需要时引入模式，避免过度设计
- **代码所有权**：团队共同理解和维护模式应用

**与领域驱动设计(DDD)的融合**：
- **战略设计**：使用模式实现限界上下文间的集成
- **战术设计**：应用模式实现领域服务、聚合和实体
- **领域事件**：结合观察者模式实现领域事件处理

**与微服务架构的融合**：
- **服务发现**：结合代理模式实现服务发现和负载均衡
- **API网关**：应用外观模式提供统一服务入口
- **分布式事务**：使用命令模式实现分布式事务协调

**与云原生应用的融合**：
- **容器化**：应用工厂模式管理容器生命周期
- **弹性伸缩**：结合观察者模式实现自动伸缩
- **服务网格**：使用代理模式实现服务间通信管理

#### 6. 设计模式学习与实践路径

掌握设计模式需要一个系统的学习和实践过程：

**学习阶段**：
- **理论基础**：理解模式的定义、结构、意图和适用场景
- **案例分析**：研究开源项目中的模式应用实例
- **代码实践**：通过简单示例实现各种设计模式

**实践阶段**：
- **重构练习**：在现有代码中识别重构机会并应用模式
- **新功能开发**：在新功能开发中有意识地应用合适模式
- **代码审查**：在代码审查中关注模式应用的合理性

**精通阶段**：
- **模式创新**：在特定领域创建专用模式
- **模式组合**：熟练组合多种模式解决复杂问题
- **模式教学**：通过教授他人深化自身理解

#### 7. 设计模式的未来发展趋势

设计模式作为软件工程的重要组成部分，也在不断演进和发展：

**模式范围的扩展**：
- **并发模式**：针对多线程和分布式环境的专用模式
- **云模式**：适应云计算环境的架构和设计模式
- **AI模式**：支持人工智能应用开发的特定模式

**模式表示的演进**：
- **形式化描述**：使用更精确的语言描述模式
- **可视化工具**：提供更好的模式可视化支持
- **代码生成**：从模式描述自动生成代码框架

**模式应用的智能化**：
- **自动识别**：工具自动识别可应用模式的机会
- **智能推荐**：基于上下文推荐合适的设计模式
- **效果评估**：自动评估模式应用的效果

### 10. 结语

设计模式是软件设计智慧的结晶，它们不是僵化的规则，而是灵活的工具。掌握设计模式的关键在于理解其背后的设计思想，而非死记硬背具体实现。在实际项目中，应当根据具体需求选择合适的模式，避免过度设计，同时保持系统的简洁性和可维护性。

通过本章的案例分析，我们看到了设计模式在解决实际问题中的价值。无论是日志系统、缓存系统还是插件系统，设计模式都帮助我们构建了更加灵活、可扩展和可维护的解决方案。希望读者能够将这些经验应用到自己的项目中，不断提升软件设计能力。

最后，需要强调的是，设计模式只是工具，真正的软件设计艺术在于根据具体情境做出恰当的决策。持续学习、不断实践、深入思考，才能在软件设计的道路上走得更远。