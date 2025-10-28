# 第3章：创建型设计模式

## 目录

- [1. 创建型设计模式概述](#1-创建型设计模式概述)
  - [1.1 创建型模式定义与分类](#11-创建型模式定义与分类)
  - [1.2 创建型模式的核心价值](#12-创建型模式的核心价值)
  - [1.3 创建型模式解决的问题](#13-创建型模式解决的问题)
- [2. 单例模式(Singleton)](#2-单例模式singleton)
  - [2.1 概念与定义](#21-概念与定义)
  - [2.2 单例模式的历史背景与演进](#22-单例模式的历史背景与演进)
  - [2.3 单例模式的理论基础](#23-单例模式的理论基础)
  - [2.4 单例模式的数学模型](#24-单例模式的数学模型)
  - [2.5 单例模式与软件质量属性](#25-单例模式与软件质量属性)
  - [2.6 单例模式的实现方式](#26-单例模式的实现方式)
  - [2.7 单例模式的应用场景](#27-单例模式的应用场景)
  - [2.8 单例模式与其他模式的区别](#28-单例模式与其他模式的区别)
  - [2.9 单例模式的实现细节](#29-单例模式的实现细节)
- [3. 工厂方法模式(Factory Method)](#3-工厂方法模式factory-method)
  - [3.1 概念与定义](#31-概念与定义)
  - [3.2 工厂方法模式的历史背景与演进](#32-工厂方法模式的历史背景与演进)
  - [3.3 工厂方法模式的理论基础](#33-工厂方法模式的理论基础)
  - [3.4 工厂方法模式的数学模型](#34-工厂方法模式的数学模型)
  - [3.5 工厂方法模式与软件质量属性](#35-工厂方法模式与软件质量属性)
  - [3.6 工厂方法模式的实现方式](#36-工厂方法模式的实现方式)
  - [3.7 工厂方法模式的应用场景](#37-工厂方法模式的应用场景)
  - [3.8 工厂方法模式与其他模式的区别](#38-工厂方法模式与其他模式的区别)
  - [3.9 工厂方法模式的实现细节](#39-工厂方法模式的实现细节)
- [4. 抽象工厂模式(Abstract Factory)](#4-抽象工厂模式abstract-factory)
  - [4.1 概念与定义](#41-概念与定义)
  - [4.2 抽象工厂模式的历史背景与演进](#42-抽象工厂模式的历史背景与演进)
  - [4.3 抽象工厂模式的理论基础](#43-抽象工厂模式的理论基础)
  - [4.4 抽象工厂模式的数学模型](#44-抽象工厂模式的数学模型)
  - [4.5 抽象工厂模式与软件质量属性](#45-抽象工厂模式与软件质量属性)
  - [4.6 抽象工厂模式的实现方式](#46-抽象工厂模式的实现方式)
  - [4.7 抽象工厂模式的应用场景](#47-抽象工厂模式的应用场景)
  - [4.8 抽象工厂模式与其他模式的区别](#48-抽象工厂模式与其他模式的区别)
  - [4.9 抽象工厂模式的实现细节](#49-抽象工厂模式的实现细节)
- [5. 建造者模式(Builder)](#5-建造者模式builder)
  - [5.1 概念与定义](#51-概念与定义)
  - [5.2 建造者模式的历史背景与演进](#52-建造者模式的历史背景与演进)
  - [5.3 建造者模式的理论基础](#53-建造者模式的理论基础)
  - [5.4 建造者模式的数学模型](#54-建造者模式的数学模型)
  - [5.5 建造者模式与软件质量属性](#55-建造者模式与软件质量属性)
  - [5.6 建造者模式的实现方式](#56-建造者模式的实现方式)
  - [5.7 建造者模式的应用场景](#57-建造者模式的应用场景)
  - [5.8 建造者模式与其他模式的区别](#58-建造者模式与其他模式的区别)
  - [5.9 建造者模式的实现细节](#59-建造者模式的实现细节)
- [6. 原型模式(Prototype)](#6-原型模式prototype)
  - [6.1 概念与定义](#61-概念与定义)
  - [6.2 原型模式的历史背景与演进](#62-原型模式的历史背景与演进)
  - [6.3 原型模式的理论基础](#63-原型模式的理论基础)
  - [6.4 原型模式的数学模型](#64-原型模式的数学模型)
  - [6.5 原型模式与软件质量属性](#65-原型模式与软件质量属性)
  - [6.6 原型模式的实现方式](#66-原型模式的实现方式)
  - [6.7 原型模式的应用场景](#67-原型模式的应用场景)
  - [6.8 原型模式与其他模式的区别](#68-原型模式与其他模式的区别)
  - [6.9 原型模式的实现细节](#69-原型模式的实现细节)
- [7. 对象池模式(Object Pool)](#7-对象池模式object-pool)
  - [7.1 概念与定义](#71-概念与定义)
  - [7.2 对象池模式的历史背景与演进](#72-对象池模式的历史背景与演进)
  - [7.3 对象池模式的理论基础](#73-对象池模式的理论基础)
  - [7.4 对象池模式的数学模型](#74-对象池模式的数学模型)
  - [7.5 对象池模式与软件质量属性](#75-对象池模式与软件质量属性)
  - [7.6 对象池模式的实现方式](#76-对象池模式的实现方式)
  - [7.7 对象池模式的应用场景](#77-对象池模式的应用场景)
  - [7.8 对象池模式与其他模式的区别](#78-对象池模式与其他模式的区别)
  - [7.9 对象池模式的实现细节](#79-对象池模式的实现细节)
- [8. 章节总结](#8-章节总结)

## 1. 创建型设计模式概述

### 1.1 创建型模式定义与分类

创建型设计模式是GoF设计模式分类中的第一大类，它们专注于对象的创建机制，提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用new运算符直接实例化对象。这些模式使系统更加灵活，能够针对特定情况选择合适的对象创建方式。

创建型设计模式可以分为两大类：对象创建型模式和类创建型模式。对象创建型模式使用继承来组织对象的创建，而类创建型模式使用委托来组织对象的创建。这种分类方式有助于我们理解不同创建型模式的工作机制和适用场景。

### 1.2 创建型模式的核心价值

创建型设计模式的核心价值在于解耦对象的创建和使用，使系统在运行时能够动态决定需要创建哪些对象，如何创建这些对象，以及如何配置这些对象。通过使用创建型模式，我们可以将对象的创建过程封装起来，使客户端代码与具体类的实现解耦，从而提高系统的灵活性和可扩展性。

创建型设计模式与其他两类设计模式（结构型模式和行为型模式）共同构成了完整的设计模式体系，它们各自解决不同层面的设计问题。创建型模式关注"如何创建对象"，结构型模式关注"如何组合类和对象以形成更大的结构"，行为型模式关注"如何分配对象之间的职责"。理解创建型模式是学习整个设计模式体系的基础，因为对象创建是软件系统中最基本的活动之一。

### 1.3 创建型模式解决的问题

创建型模式主要解决以下问题：
1. **控制实例化过程**：避免客户端直接使用new操作符创建对象，而是通过统一的接口来创建对象
2. **管理对象生命周期**：控制对象的创建、销毁和复用，优化系统资源使用
3. **隐藏创建复杂性**：对于复杂对象的创建过程，将其封装在专门的类中，简化客户端代码
4. **支持多种创建策略**：根据不同的需求和环境，选择不同的对象创建策略
5. **提高系统性能**：通过对象复用、延迟初始化等技术优化系统性能

## 学习目标

- 理解创建型设计模式的核心概念和应用场景
- 掌握各种创建型模式的C++实现方法
- 学会在实际项目中选择合适的创建型模式
- 了解创建型模式之间的关系和区别
- 深入理解创建型模式如何提高系统的灵活性和可扩展性
- 掌握创建型模式的优缺点及适用场景
- 学会结合多种创建型模式解决复杂问题

## 2. 单例模式(Singleton)

### 2.1 概念与定义

单例模式是一种创建型设计模式，它确保一个类只有一个实例，并提供全局访问点来获取这个实例。单例模式是设计模式中最简单但也是最常用的模式之一，它解决了全局唯一实例的创建和访问问题。

单例模式的核心思想是通过私有化构造函数来防止外部通过new操作符创建实例，同时提供一个静态方法作为全局访问点来获取唯一的实例。这种模式在需要全局唯一访问点的场景中非常有用，例如配置管理器、日志记录器、数据库连接池等。

### 2.2 实现方式

单例模式有多种实现方式，每种方式都有其优缺点和适用场景：

1. **饿汉式实现**：
   ```cpp
   class Singleton {
   private:
       static Singleton* instance;
       Singleton() {}  // 私有构造函数
       
   public:
       // 删除拷贝构造函数和赋值运算符
       Singleton(const Singleton&) = delete;
       Singleton& operator=(const Singleton&) = delete;
       
       static Singleton* getInstance() {
           return instance;
       }
   };
   
   // 在类外初始化静态成员
   Singleton* Singleton::instance = new Singleton();
   ```
   
   饿汉式在程序启动时就创建实例，优点是实现简单且线程安全，缺点是无法实现懒加载，可能会造成资源浪费。

2. **懒汉式实现（线程不安全）**：
   ```cpp
   class Singleton {
   private:
       static Singleton* instance;
       Singleton() {}  // 私有构造函数
       
   public:
       // 删除拷贝构造函数和赋值运算符
       Singleton(const Singleton&) = delete;
       Singleton& operator=(const Singleton&) = delete;
       
       static Singleton* getInstance() {
           if (instance == nullptr) {
               instance = new Singleton();
           }
           return instance;
       }
   };
   
   // 在类外初始化静态成员
   Singleton* Singleton::instance = nullptr;
   ```
   
   懒汉式在第一次调用getInstance()时才创建实例，实现了懒加载，但在多线程环境下不安全。

3. **懒汉式实现（线程安全）**：
   ```cpp
   #include <mutex>
   
   class Singleton {
   private:
       static Singleton* instance;
       static std::mutex mutex;
       Singleton() {}  // 私有构造函数
       
   public:
       // 删除拷贝构造函数和赋值运算符
       Singleton(const Singleton&) = delete;
       Singleton& operator=(const Singleton&) = delete;
       
       static Singleton* getInstance() {
           std::lock_guard<std::mutex> lock(mutex);
           if (instance == nullptr) {
               instance = new Singleton();
           }
           return instance;
       }
   };
   
   // 在类外初始化静态成员
   Singleton* Singleton::instance = nullptr;
   std::mutex Singleton::mutex;
   ```
   
   这种实现方式通过加锁保证了线程安全，但每次获取实例都需要加锁，影响性能。

4. **双重检查锁定（DCLP）**：
   ```cpp
   #include <mutex>
   
   class Singleton {
   private:
       static Singleton* instance;
       static std::mutex mutex;
       Singleton() {}  // 私有构造函数
       
   public:
       // 删除拷贝构造函数和赋值运算符
       Singleton(const Singleton&) = delete;
       Singleton& operator=(const Singleton&) = delete;
       
       static Singleton* getInstance() {
           if (instance == nullptr) {  // 第一次检查
               std::lock_guard<std::mutex> lock(mutex);
               if (instance == nullptr) {  // 第二次检查
                   instance = new Singleton();
               }
           }
           return instance;
       }
   };
   
   // 在类外初始化静态成员
   Singleton* Singleton::instance = nullptr;
   std::mutex Singleton::mutex;
   ```
   
   双重检查锁定在保证线程安全的同时，减少了锁的竞争，提高了性能。

5. **Meyers' Singleton（C++11及以后）**：
   ```cpp
   class Singleton {
   private:
       Singleton() {}  // 私有构造函数
       
   public:
       // 删除拷贝构造函数和赋值运算符
       Singleton(const Singleton&) = delete;
       Singleton& operator=(const Singleton&) = delete;
       
       static Singleton& getInstance() {
           static Singleton instance;
           return instance;
       }
   };
   ```
   
   C++11标准保证了局部静态变量的线程安全初始化，这是最简洁且线程安全的实现方式。

### 2.3 应用场景

单例模式适用于以下场景：

1. **需要全局唯一实例的资源管理**：
   - 数据库连接池
   - 线程池
   - 缓存系统
   - 配置管理器

2. **需要全局访问点的服务**：
   - 日志记录器
   - 事件调度器
   - 设备管理器

3. **需要频繁创建和销毁的对象**：
   - 对象创建成本高
   - 对象状态需要保持

### 2.4 优缺点分析

**优点**：
1. 提供了对唯一实例的受控访问
2. 节约系统资源，避免频繁创建和销毁对象
3. 允许可变数目的实例（通过修改getInstance方法）

**缺点**：
1. 违反了单一职责原则（单例类既负责业务逻辑又负责自身管理）
2. 对测试不友好（单例的全局状态可能影响测试的独立性）
3. 在某些情况下可能导致内存泄漏（特别是C++中手动管理内存时）
4. 难以在分布式环境中实现真正的单例

### 2.5 单例模式的破坏与防御

单例模式可能被以下方式破坏：

1. **反射**：通过反射可以调用私有构造函数创建新实例
2. **序列化/反序列化**：反序列化时会创建新实例
3. **克隆**：如果实现了Cloneable接口，可以克隆出新实例

**防御方法**：
1. 防止反射：在私有构造函数中添加检查，如果实例已存在则抛出异常
2. 防止序列化：实现readResolve方法，返回已存在的实例
3. 防止克隆：重写clone方法，返回已存在的实例

### 2.6 单例模式与静态类的区别

单例模式和静态类都可以提供全局访问点，但它们有以下区别：

1. **面向对象**：单例是面向对象的，可以继承和实现接口；静态类不能
2. **生命周期**：单例可以控制初始化时机；静态类在类加载时初始化
3. **多态**：单例支持多态；静态类不支持
4. **测试**：单例可以通过依赖注入进行测试；静态类难以测试

## 3. 工厂方法模式(Factory Method)

### 3.1 概念与定义

工厂方法模式是一种创建型设计模式，它定义了一个用于创建对象的接口，但让子类决定实例化哪一个类。工厂方法使一个类的实例化延迟到其子类。

工厂方法模式的核心思想是将对象的创建过程封装在专门的工厂类中，客户端通过工厂接口来创建产品，而不需要知道具体的产品类。这样可以在不修改客户端代码的情况下引入新的产品类型，符合开闭原则。

### 3.2 实现原理与结构

工厂方法模式包含以下主要角色：

1. **抽象产品（Product）**：定义产品的接口
2. **具体产品（ConcreteProduct）**：实现抽象产品接口
3. **抽象工厂（Creator）**：声明工厂方法，返回抽象产品类型
4. **具体工厂（ConcreteCreator）**：实现工厂方法，返回具体产品实例

工厂方法模式的基本结构如下：

```cpp
// 抽象产品
class Product {
public:
    virtual ~Product() {}
    virtual void operation() = 0;
};

// 具体产品A
class ConcreteProductA : public Product {
public:
    void operation() override {
        std::cout << "ConcreteProductA operation" << std::endl;
    }
};

// 具体产品B
class ConcreteProductB : public Product {
public:
    void operation() override {
        std::cout << "ConcreteProductB operation" << std::endl;
    }
};

// 抽象工厂
class Creator {
public:
    virtual ~Creator() {}
    virtual Product* factoryMethod() = 0;
    
    void someOperation() {
        Product* product = factoryMethod();
        product->operation();
        delete product;
    }
};

// 具体工厂A
class ConcreteCreatorA : public Creator {
public:
    Product* factoryMethod() override {
        return new ConcreteProductA();
    }
};

// 具体工厂B
class ConcreteCreatorB : public Creator {
public:
    Product* factoryMethod() override {
        return new ConcreteProductB();
    }
};
```

### 3.3 工厂方法模式与开闭原则的关系

工厂方法模式是开闭原则的典型应用。开闭原则要求软件实体应该对扩展开放，对修改关闭。工厂方法模式通过以下方式满足这一原则：

1. **对扩展开放**：可以添加新的产品类和对应的工厂类，而不需要修改现有代码
2. **对修改关闭**：当需要添加新产品时，不需要修改现有的工厂类和客户端代码

例如，如果需要添加一个新的产品类型ConcreteProductC，只需要创建一个新的具体工厂类ConcreteCreatorC，而不需要修改现有的代码：

```cpp
// 具体产品C
class ConcreteProductC : public Product {
public:
    void operation() override {
        std::cout << "ConcreteProductC operation" << std::endl;
    }
};

// 具体工厂C
class ConcreteCreatorC : public Creator {
public:
    Product* factoryMethod() override {
        return new ConcreteProductC();
    }
};
```

### 3.4 工厂方法模式在框架设计中的应用

工厂方法模式在框架设计中有广泛应用，例如：

1. **依赖注入容器**：通过工厂方法创建和配置对象
2. **插件系统**：通过工厂方法加载和实例化插件
3. **数据库驱动**：通过工厂方法创建不同类型的数据库连接
4. **日志系统**：通过工厂方法创建不同类型的日志记录器

### 3.5 参数化工厂方法

有时候，工厂方法可以接受参数来决定创建哪种产品：

```cpp
class ParameterizedCreator : public Creator {
private:
    std::map<std::string, std::function<Product*()>> productMap;
    
public:
    ParameterizedCreator() {
        productMap["A"] = []() { return new ConcreteProductA(); };
        productMap["B"] = []() { return new ConcreteProductB(); };
    }
    
    Product* factoryMethod(const std::string& productType) {
        auto it = productMap.find(productType);
        if (it != productMap.end()) {
            return it->second();
        }
        return nullptr;
    }
    
    void registerProduct(const std::string& type, std::function<Product*()> creator) {
        productMap[type] = creator;
    }
};
```

### 3.6 简单工厂与工厂方法的区别

简单工厂模式（静态工厂）虽然不是GoF设计模式之一，但经常与工厂方法模式比较：

1. **简单工厂**：
   - 使用一个工厂类创建所有产品
   - 通常使用静态方法创建对象
   - 违反开闭原则（添加新产品需要修改工厂类）
   - 适用于产品种类较少且不常变化的场景

2. **工厂方法**：
   - 每个产品有对应的工厂类
   - 使用实例方法创建对象
   - 符合开闭原则
   - 适用于产品种类较多或需要频繁扩展的场景

简单工厂的实现示例：

```cpp
class SimpleFactory {
public:
    static Product* createProduct(const std::string& type) {
        if (type == "A") {
            return new ConcreteProductA();
        } else if (type == "B") {
            return new ConcreteProductB();
        }
        return nullptr;
    }
};
```

### 3.7 工厂方法模式的优缺点

**优点**：
1. 符合开闭原则，易于扩展新产品
2. 将对象的创建和使用分离，降低了耦合度
3. 客户端不需要知道具体产品类的名称
4. 可以通过配置文件等方式动态决定创建哪种产品

**缺点**：
1. 类的数量增加，增加了系统复杂性
2. 增加了系统的抽象性和理解难度
3. 对于产品种类较少的场景，可能过度设计

## 4. 抽象工厂模式(Abstract Factory)

### 4.1 概念与定义

抽象工厂模式是一种创建型设计模式，它提供一个接口，用于创建一系列相关或相互依赖的对象，而无需指定它们的具体类。抽象工厂模式也称为Kit模式，它关注的是多个相关产品的创建，而不是单个产品。

抽象工厂模式的核心思想是将一组相关产品的创建封装在一个工厂接口中，客户端通过这个工厂接口来创建整个产品族，而不需要知道具体的产品实现。这样可以在不修改客户端代码的情况下切换整个产品族。

### 4.2 产品族与产品等级结构

在理解抽象工厂模式之前，需要先了解两个重要概念：

1. **产品族**：由同一个工厂创建的一组相关产品，这些产品通常需要协同工作
2. **产品等级结构**：产品的继承结构，表示不同产品族中的同类产品

例如，在一个GUI系统中：
- 产品族可以是Windows风格组件和Mac风格组件
- 产品等级结构可以是按钮、文本框、滚动条等

抽象工厂模式的关系图：

```
          抽象工厂A              抽象工厂B
              |                      |
      产品A1    产品A2        产品B1    产品B2
         \      /              \      /
          \    /                \    /
           产品族A                产品族B
```

### 4.3 实现原理与结构

抽象工厂模式包含以下主要角色：

1. **抽象产品（AbstractProduct）**：声明产品的接口
2. **具体产品（ConcreteProduct）**：实现抽象产品接口
3. **抽象工厂（AbstractFactory）**：声明创建一系列产品的方法
4. **具体工厂（ConcreteFactory）**：实现创建具体产品的方法

抽象工厂模式的基本结构如下：

```cpp
// 抽象产品A
class AbstractProductA {
public:
    virtual ~AbstractProductA() {}
    virtual void operationA() = 0;
};

// 具体产品A1
class ConcreteProductA1 : public AbstractProductA {
public:
    void operationA() override {
        std::cout << "ConcreteProductA1 operationA" << std::endl;
    }
};

// 具体产品A2
class ConcreteProductA2 : public AbstractProductA {
public:
    void operationA() override {
        std::cout << "ConcreteProductA2 operationA" << std::endl;
    }
};

// 抽象产品B
class AbstractProductB {
public:
    virtual ~AbstractProductB() {}
    virtual void operationB() = 0;
};

// 具体产品B1
class ConcreteProductB1 : public AbstractProductB {
public:
    void operationB() override {
        std::cout << "ConcreteProductB1 operationB" << std::endl;
    }
};

// 具体产品B2
class ConcreteProductB2 : public AbstractProductB {
public:
    void operationB() override {
        std::cout << "ConcreteProductB2 operationB" << std::endl;
    }
};

// 抽象工厂
class AbstractFactory {
public:
    virtual ~AbstractFactory() {}
    virtual AbstractProductA* createProductA() = 0;
    virtual AbstractProductB* createProductB() = 0;
};

// 具体工厂1
class ConcreteFactory1 : public AbstractFactory {
public:
    AbstractProductA* createProductA() override {
        return new ConcreteProductA1();
    }
    
    AbstractProductB* createProductB() override {
        return new ConcreteProductB1();
    }
};

// 具体工厂2
class ConcreteFactory2 : public AbstractFactory {
public:
    AbstractProductA* createProductA() override {
        return new ConcreteProductA2();
    }
    
    AbstractProductB* createProductB() override {
        return new ConcreteProductB2();
    }
};
```

### 4.4 抽象工厂模式的扩展性与局限性

**扩展性**：
1. **新增产品族**：容易扩展，只需添加新的具体工厂类
2. **新增产品等级**：困难，需要修改抽象工厂接口和所有具体工厂类

**局限性**：
1. 当需要添加新的产品等级时，需要修改抽象工厂接口和所有具体工厂类，违反了开闭原则
2. 产品族中的产品数量固定，难以动态变化

### 4.5 与工厂方法模式的比较

抽象工厂模式和工厂方法模式都是创建型模式，它们有以下区别：

1. **关注点不同**：
   - 工厂方法模式关注单个产品的创建
   - 抽象工厂模式关注整个产品族的创建

2. **复杂度不同**：
   - 工厂方法模式相对简单
   - 抽象工厂模式更复杂，涉及多个产品的创建

3. **适用场景不同**：
   - 工厂方法模式适用于产品种类较少的场景
   - 抽象工厂模式适用于需要创建多个相关产品的场景

4. **扩展性不同**：
   - 工厂方法模式易于扩展新产品
   - 抽象工厂模式易于扩展新产品族，但难以扩展新产品等级

### 4.6 抽象工厂模式在实际系统中的应用

抽象工厂模式在实际系统中有广泛应用，例如：

1. **跨平台UI开发**：创建不同操作系统的UI组件
2. **数据库访问**：创建不同数据库的连接对象和命令对象
3. **主题系统**：创建不同主题的UI组件
4. **游戏开发**：创建不同难度级别的游戏元素

### 4.7 抽象工厂模式的优缺点

**优点**：
1. 确保同一产品族中的对象协同工作
2. 将具体产品的创建与客户端分离，降低了耦合度
3. 易于切换整个产品族
4. 符合开闭原则（对于新增产品族）

**缺点**：
1. 难以支持新种类的产品（新增产品等级）
2. 增加了系统的抽象性和复杂性
3. 代码量增加，类的数量增多

## 5. 建造者模式(Builder)

### 5.1 概念与定义

建造者模式是一种创建型设计模式，它允许你分步骤创建复杂对象。建造者模式允许你使用相同的创建代码生成不同类型和形式的对象。

建造者模式的核心思想是将一个复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。这种模式特别适用于创建具有多个组成部分的复杂对象，其中构建顺序通常是固定的，但每个部分可以有不同的实现。

### 5.2 实现原理与结构

建造者模式包含以下主要角色：

1. **产品（Product）**：最终构建的复杂对象
2. **抽象建造者（Builder）**：定义创建产品各个部件的抽象接口
3. **具体建造者（ConcreteBuilder）**：实现Builder接口，构建和装配各个部件
4. **指挥者（Director）**：使用Builder接口来构建对象

建造者模式的基本结构如下：

```cpp
// 产品
class Product {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    void setPartA(const std::string& part) {
        partA = part;
    }
    
    void setPartB(const std::string& part) {
        partB = part;
    }
    
    void setPartC(const std::string& part) {
        partC = part;
    }
    
    void show() {
        std::cout << "Product parts:" << std::endl;
        std::cout << "  PartA: " << partA << std::endl;
        std::cout << "  PartB: " << partB << std::endl;
        std::cout << "  PartC: " << partC << std::endl;
    }
};

// 抽象建造者
class Builder {
public:
    virtual ~Builder() {}
    virtual void buildPartA() = 0;
    virtual void buildPartB() = 0;
    virtual void buildPartC() = 0;
    virtual Product* getResult() = 0;
};

// 具体建造者A
class ConcreteBuilderA : public Builder {
private:
    Product* product;
    
public:
    ConcreteBuilderA() {
        product = new Product();
    }
    
    ~ConcreteBuilderA() {
        delete product;
    }
    
    void buildPartA() override {
        product->setPartA("PartA of BuilderA");
    }
    
    void buildPartB() override {
        product->setPartB("PartB of BuilderA");
    }
    
    void buildPartC() override {
        product->setPartC("PartC of BuilderA");
    }
    
    Product* getResult() override {
        return product;
    }
};

// 具体建造者B
class ConcreteBuilderB : public Builder {
private:
    Product* product;
    
public:
    ConcreteBuilderB() {
        product = new Product();
    }
    
    ~ConcreteBuilderB() {
        delete product;
    }
    
    void buildPartA() override {
        product->setPartA("PartA of BuilderB");
    }
    
    void buildPartB() override {
        product->setPartB("PartB of BuilderB");
    }
    
    void buildPartC() override {
        product->setPartC("PartC of BuilderB");
    }
    
    Product* getResult() override {
        return product;
    }
};

// 指挥者
class Director {
public:
    void construct(Builder* builder) {
        builder->buildPartA();
        builder->buildPartB();
        builder->buildPartC();
    }
};
```

### 5.3 建造者模式与复杂对象构建的关系

建造者模式特别适用于构建复杂对象，这些对象通常具有以下特点：

1. **多个组成部分**：对象由多个部分组成，每个部分可以独立变化
2. **构建顺序固定**：对象的构建顺序通常是固定的，但每个部分可以有不同的实现
3. **构建过程复杂**：对象的构建过程可能涉及多个步骤和复杂的逻辑

例如，构建一辆汽车：
```cpp
class Car {
private:
    std::string engine;
    std::string chassis;
    std::string body;
    std::string interior;
    
public:
    void setEngine(const std::string& e) { engine = e; }
    void setChassis(const std::string& c) { chassis = c; }
    void setBody(const std::string& b) { body = b; }
    void setInterior(const std::string& i) { interior = i; }
    
    void show() {
        std::cout << "Car specifications:" << std::endl;
        std::cout << "  Engine: " << engine << std::endl;
        std::cout << "  Chassis: " << chassis << std::endl;
        std::cout << "  Body: " << body << std::endl;
        std::cout << "  Interior: " << interior << std::endl;
    }
};

class CarBuilder : public Builder {
private:
    Car* car;
    
public:
    CarBuilder() {
        car = new Car();
    }
    
    ~CarBuilder() {
        delete car;
    }
    
    void buildEngine() {
        car->setEngine("V8 Engine");
    }
    
    void buildChassis() {
        car->setChassis("Steel Chassis");
    }
    
    void buildBody() {
        car->setBody("SUV Body");
    }
    
    void buildInterior() {
        car->setInterior("Leather Interior");
    }
    
    Car* getResult() {
        return car;
    }
};
```

### 5.4 建造者模式的链式调用实现

现代C++中，建造者模式经常使用链式调用来提高代码的可读性和流畅性：

```cpp
class FluentBuilder {
private:
    Product* product;
    
public:
    FluentBuilder() {
        product = new Product();
    }
    
    ~FluentBuilder() {
        delete product;
    }
    
    FluentBuilder& withPartA(const std::string& part) {
        product->setPartA(part);
        return *this;
    }
    
    FluentBuilder& withPartB(const std::string& part) {
        product->setPartB(part);
        return *this;
    }
    
    FluentBuilder& withPartC(const std::string& part) {
        product->setPartC(part);
        return *this;
    }
    
    Product* build() {
        Product* result = product;
        product = new Product();  // 为下一次构建做准备
        return result;
    }
};

// 使用示例
Product* product = FluentBuilder()
    .withPartA("Custom PartA")
    .withPartB("Custom PartB")
    .withPartC("Custom PartC")
    .build();
```

### 5.5 建造者模式在配置对象构建中的应用

建造者模式在构建复杂配置对象时特别有用：

```cpp
class DatabaseConfig {
private:
    std::string host;
    int port;
    std::string username;
    std::string password;
    std::string database;
    int connectionTimeout;
    int maxConnections;
    bool sslEnabled;
    
public:
    // 设置方法
    void setHost(const std::string& h) { host = h; }
    void setPort(int p) { port = p; }
    void setUsername(const std::string& u) { username = u; }
    void setPassword(const std::string& p) { password = p; }
    void setDatabase(const std::string& d) { database = d; }
    void setConnectionTimeout(int t) { connectionTimeout = t; }
    void setMaxConnections(int m) { maxConnections = m; }
    void setSslEnabled(bool s) { sslEnabled = s; }
    
    void show() {
        std::cout << "Database Configuration:" << std::endl;
        std::cout << "  Host: " << host << std::endl;
        std::cout << "  Port: " << port << std::endl;
        std::cout << "  Username: " << username << std::endl;
        std::cout << "  Password: " << password << std::endl;
        std::cout << "  Database: " << database << std::endl;
        std::cout << "  Connection Timeout: " << connectionTimeout << std::endl;
        std::cout << "  Max Connections: " << maxConnections << std::endl;
        std::cout << "  SSL Enabled: " << (sslEnabled ? "Yes" : "No") << std::endl;
    }
};

class DatabaseConfigBuilder {
private:
    DatabaseConfig* config;
    
public:
    DatabaseConfigBuilder() {
        config = new DatabaseConfig();
    }
    
    ~DatabaseConfigBuilder() {
        delete config;
    }
    
    DatabaseConfigBuilder& withHost(const std::string& host) {
        config->setHost(host);
        return *this;
    }
    
    DatabaseConfigBuilder& withPort(int port) {
        config->setPort(port);
        return *this;
    }
    
    DatabaseConfigBuilder& withCredentials(const std::string& username, const std::string& password) {
        config->setUsername(username);
        config->setPassword(password);
        return *this;
    }
    
    DatabaseConfigBuilder& withDatabase(const std::string& database) {
        config->setDatabase(database);
        return *this;
    }
    
    DatabaseConfigBuilder& withConnectionTimeout(int timeout) {
        config->setConnectionTimeout(timeout);
        return *this;
    }
    
    DatabaseConfigBuilder& withMaxConnections(int maxConn) {
        config->setMaxConnections(maxConn);
        return *this;
    }
    
    DatabaseConfigBuilder& enableSsl(bool enabled = true) {
        config->setSslEnabled(enabled);
        return *this;
    }
    
    DatabaseConfig* build() {
        DatabaseConfig* result = config;
        config = new DatabaseConfig();  // 为下一次构建做准备
        return result;
    }
};

// 使用示例
DatabaseConfig* config = DatabaseConfigBuilder()
    .withHost("localhost")
    .withPort(5432)
    .withCredentials("admin", "password")
    .withDatabase("mydb")
    .withConnectionTimeout(30)
    .withMaxConnections(100)
    .enableSsl(true)
    .build();
```

### 5.6 与工厂模式的区别

建造者模式和工厂模式都是创建型模式，但它们有以下区别：

1. **关注点不同**：
   - 建造者模式关注复杂对象的构建过程和步骤
   - 工厂模式关注对象的创建方式

2. **复杂度不同**：
   - 建造者模式适用于构建复杂对象
   - 工厂模式适用于创建相对简单的对象

3. **创建过程不同**：
   - 建造者模式分步骤构建对象
   - 工厂模式通常一次性创建对象

4. **返回结果不同**：
   - 建造者模式可以返回不同的产品表示
   - 工厂模式通常返回特定类型的产品

### 5.7 建造者模式的优缺点

**优点**：
1. 将复杂对象的构建过程分解为多个步骤，使代码更清晰
2. 可以控制对象的构建顺序和过程
3. 相同的构建过程可以创建不同的产品表示
4. 代码的可读性和可维护性更好

**缺点**：
1. 代码量增加，类的数量增多
2. 产品的内部组成结构必须稳定，不能频繁变化
3. 如果产品之间的差异很大，不适合使用建造者模式

## 6. 原型模式(Prototype)

### 6.1 概念与定义

原型模式是一种创建型设计模式，它通过复制现有对象来创建新对象，而不是通过new操作符创建。原型模式允许你创建对象的同时，无需知道其具体类型和创建细节。

原型模式的核心思想是通过一个原型实例来指定要创建的对象的种类，并通过复制这个原型实例来创建新的对象。这种模式特别适用于创建成本高的对象，或者需要避免与构造函数相关的复杂初始化过程的场景。

### 6.2 实现原理与结构

原型模式包含以下主要角色：

1. **抽象原型（Prototype）**：声明克隆方法的接口
2. **具体原型（ConcretePrototype）**：实现克隆方法，复制自身

原型模式的基本结构如下：

```cpp
#include <iostream>

// 抽象原型
class Prototype {
public:
    virtual ~Prototype() {}
    virtual Prototype* clone() const = 0;
    virtual void operation() = 0;
};

// 具体原型A
class ConcretePrototypeA : public Prototype {
private:
    int data;
    
public:
    ConcretePrototypeA(int d) : data(d) {}
    
    Prototype* clone() const override {
        return new ConcretePrototypeA(*this);  // 使用拷贝构造函数
    }
    
    void operation() override {
        std::cout << "ConcretePrototypeA with data: " << data << std::endl;
    }
    
    void setData(int d) {
        data = d;
    }
};

// 具体原型B
class ConcretePrototypeB : public Prototype {
private:
    std::string text;
    
public:
    ConcretePrototypeB(const std::string& t) : text(t) {}
    
    Prototype* clone() const override {
        return new ConcretePrototypeB(*this);  // 使用拷贝构造函数
    }
    
    void operation() override {
        std::cout << "ConcretePrototypeB with text: " << text << std::endl;
    }
    
    void setText(const std::string& t) {
        text = t;
    }
};
```

### 6.3 深拷贝与浅拷贝

在实现原型模式时，深拷贝和浅拷贝是一个重要考虑因素：

1. **浅拷贝**：
   - 只复制对象的值，不复制引用类型的成员
   - 新对象和原对象共享引用类型的成员
   - 实现简单，但可能导致数据不一致

2. **深拷贝**：
   - 复制对象的所有成员，包括引用类型的成员
   - 新对象和原对象完全独立
   - 实现复杂，但数据更安全

浅拷贝示例：
```cpp
class ShallowCopyExample {
private:
    int* data;
    
public:
    ShallowCopyExample(int value) {
        data = new int(value);
    }
    
    // 浅拷贝构造函数
    ShallowCopyExample(const ShallowCopyExample& other) {
        data = other.data;  // 只复制指针，不复制指针指向的数据
    }
    
    ~ShallowCopyExample() {
        delete data;
    }
    
    void setData(int value) {
        *data = value;
    }
    
    int getData() const {
        return *data;
    }
};
```

深拷贝示例：
```cpp
class DeepCopyExample {
private:
    int* data;
    
public:
    DeepCopyExample(int value) {
        data = new int(value);
    }
    
    // 深拷贝构造函数
    DeepCopyExample(const DeepCopyExample& other) {
        data = new int(*other.data);  // 复制指针指向的数据
    }
    
    ~DeepCopyExample() {
        delete data;
    }
    
    void setData(int value) {
        *data = value;
    }
    
    int getData() const {
        return *data;
    }
};
```

在原型模式中，通常需要实现深拷贝以确保克隆的对象是独立的：

```cpp
class ComplexPrototype : public Prototype {
private:
    int* data;
    std::vector<int>* numbers;
    
public:
    ComplexPrototype(int d, const std::vector<int>& nums) {
        data = new int(d);
        numbers = new std::vector<int>(nums);
    }
    
    // 深拷贝构造函数
    ComplexPrototype(const ComplexPrototype& other) {
        data = new int(*other.data);
        numbers = new std::vector<int>(*other.numbers);
    }
    
    ~ComplexPrototype() {
        delete data;
        delete numbers;
    }
    
    Prototype* clone() const override {
        return new ComplexPrototype(*this);  // 使用深拷贝构造函数
    }
    
    void operation() override {
        std::cout << "ComplexPrototype with data: " << *data << std::endl;
        std::cout << "Numbers: ";
        for (int num : *numbers) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }
};
```

### 6.4 原型模式的序列化实现方式

在某些情况下，可以通过序列化来实现原型模式，特别是当对象结构复杂时：

```cpp
#include <sstream>
#include <boost/archive/text_oarchive.hpp>
#include <boost/archive/text_iarchive.hpp>

class SerializablePrototype : public Prototype {
private:
    std::string text;
    int number;
    
public:
    SerializablePrototype(const std::string& t = "", int n = 0) : text(t), number(n) {}
    
    // 序列化构造函数
    SerializablePrototype(const std::string& serializedData) {
        std::istringstream iss(serializedData);
        boost::archive::text_iarchive ia(iss);
        ia >> *this;
    }
    
    Prototype* clone() const override {
        // 通过序列化和反序列化实现深拷贝
        std::ostringstream oss;
        boost::archive::text_oarchive oa(oss);
        oa << *this;
        
        return new SerializablePrototype(oss.str());
    }
    
    void operation() override {
        std::cout << "SerializablePrototype with text: " << text 
                  << ", number: " << number << std::endl;
    }
    
    void setText(const std::string& t) {
        text = t;
    }
    
    void setNumber(int n) {
        number = n;
    }
    
private:
    // 序列化函数
    friend class boost::serialization::access;
    template<class Archive>
    void serialize(Archive& ar, const unsigned int version) {
        ar & text;
        ar & number;
    }
};
```

### 6.5 原型模式与对象克隆的关系

原型模式本质上是对象克隆的一种应用。在C++中，可以通过以下方式实现对象克隆：

1. **拷贝构造函数**：最常见的实现方式
2. **拷贝赋值运算符**：用于已存在对象的复制
3. **序列化**：通过序列化和反序列化实现深拷贝
4. **手动复制**：逐个复制对象的成员

```cpp
class CloneablePrototype : public Prototype {
private:
    std::string name;
    int value;
    std::vector<int> data;
    
public:
    CloneablePrototype(const std::string& n = "", int v = 0) : name(n), value(v) {}
    
    // 使用拷贝构造函数实现克隆
    Prototype* clone() const override {
        return new CloneablePrototype(*this);
    }
    
    // 手动实现克隆（不推荐，容易出错）
    Prototype* manualClone() const {
        CloneablePrototype* clone = new CloneablePrototype();
        clone->name = this->name;
        clone->value = this->value;
        clone->data = this->data;  // vector的拷贝构造函数会进行深拷贝
        return clone;
    }
    
    void operation() override {
        std::cout << "CloneablePrototype with name: " << name 
                  << ", value: " << value << std::endl;
    }
};
```

### 6.6 原型模式在性能优化中的应用

原型模式在性能优化中有广泛应用，特别是在以下场景：

1. **创建成本高的对象**：
```cpp
class ExpensiveObject : public Prototype {
private:
    std::vector<int> largeData;
    std::string complexConfig;
    
public:
    ExpensiveObject() {
        // 模拟耗时的初始化过程
        largeData.resize(1000000);
        for (int i = 0; i < 1000000; ++i) {
            largeData[i] = i;
        }
        complexConfig = "Some complex configuration string...";
    }
    
    Prototype* clone() const override {
        return new ExpensiveObject(*this);
    }
    
    void operation() override {
        std::cout << "ExpensiveObject with data size: " << largeData.size() << std::endl;
    }
};

// 使用原型模式提高性能
class ObjectCache {
private:
    std::map<std::string, Prototype*> prototypeMap;
    
public:
    void registerPrototype(const std::string& key, Prototype* prototype) {
        prototypeMap[key] = prototype;
    }
    
    Prototype* create(const std::string& key) {
        auto it = prototypeMap.find(key);
        if (it != prototypeMap.end()) {
            return it->second->clone();
        }
        return nullptr;
    }
    
    ~ObjectCache() {
        for (auto& pair : prototypeMap) {
            delete pair.second;
        }
    }
};
```

2. **避免重复初始化**：
```cpp
class ConfiguredObject : public Prototype {
private:
    std::map<std::string, std::string> configuration;
    
public:
    ConfiguredObject() {
        // 从文件或数据库加载配置
        loadConfiguration();
    }
    
    ConfiguredObject(const ConfiguredObject& other) : configuration(other.configuration) {}
    
    Prototype* clone() const override {
        return new ConfiguredObject(*this);
    }
    
    void operation() override {
        std::cout << "ConfiguredObject with configuration:" << std::endl;
        for (const auto& pair : configuration) {
            std::cout << "  " << pair.first << ": " << pair.second << std::endl;
        }
    }
    
private:
    void loadConfiguration() {
        // 模拟从文件加载配置
        configuration["host"] = "localhost";
        configuration["port"] = "8080";
        configuration["timeout"] = "30";
        configuration["retries"] = "3";
    }
};
```

### 6.7 原型模式的优缺点

**优点**：
1. 提高性能，特别是对于创建成本高的对象
2. 简化对象创建过程，避免复杂的构造函数
3. 可以在运行时动态添加和删除产品
4. 减少子类的数量，避免工厂模式的层次结构

**缺点**：
1. 需要为每个类实现克隆方法，可能很复杂
2. 深拷贝实现可能很困难，特别是对于包含循环引用的对象
3. 克隆包含循环引用的对象可能导致无限递归

## 7. 对象池模式(Object Pool)

### 7.1 概念与定义

对象池模式是一种创建型设计模式，它通过预先创建并管理一组对象，来避免频繁地创建和销毁对象，从而提高系统性能。对象池模式特别适用于创建成本高、使用频繁的对象。

对象池模式的核心思想是维护一个对象池，包含一定数量的可重用对象。当需要对象时，从池中获取；当对象使用完毕后，将其返回池中而不是销毁。这样可以减少对象创建和销毁的开销，提高系统性能。

### 7.2 实现原理与结构

对象池模式包含以下主要角色：

1. **对象池（ObjectPool）**：管理对象池的创建、获取和释放
2. **可重用对象（Reusable）**：池中存储的对象，通常实现重置功能
3. **客户端（Client）**：使用对象池获取和释放对象

对象池模式的基本结构如下：

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <mutex>
#include <condition_variable>

// 可重用对象接口
class Reusable {
public:
    virtual ~Reusable() {}
    virtual void reset() = 0;
    virtual void use() = 0;
};

// 具体可重用对象
class ConcreteReusable : public Reusable {
private:
    int id;
    bool inUse;
    
public:
    ConcreteReusable(int i) : id(i), inUse(false) {}
    
    void reset() override {
        inUse = false;
        // 重置对象状态
    }
    
    void use() override {
        inUse = true;
        std::cout << "Using reusable object with ID: " << id << std::endl;
    }
    
    int getId() const {
        return id;
    }
    
    bool isInUse() const {
        return inUse;
    }
};

// 对象池
class ObjectPool {
private:
    std::vector<std::unique_ptr<Reusable>> pool;
    std::mutex mutex;
    std::condition_variable condition;
    size_t maxSize;
    size_t currentSize;
    
public:
    ObjectPool(size_t maxPoolSize) : maxSize(maxPoolSize), currentSize(0) {}
    
    // 获取对象
    std::unique_ptr<Reusable> acquire() {
        std::unique_lock<std::mutex> lock(mutex);
        
        // 等待直到有可用对象或可以创建新对象
        condition.wait(lock, [this] { 
            return !pool.empty() || currentSize < maxSize; 
        });
        
        if (!pool.empty()) {
            // 从池中获取对象
            auto obj = std::move(pool.back());
            pool.pop_back();
            return obj;
        } else if (currentSize < maxSize) {
            // 创建新对象
            currentSize++;
            return std::make_unique<ConcreteReusable>(currentSize);
        }
        
        return nullptr;
    }
    
    // 释放对象
    void release(std::unique_ptr<Reusable> obj) {
        if (!obj) return;
        
        std::lock_guard<std::mutex> lock(mutex);
        
        // 重置对象状态
        obj->reset();
        
        // 将对象返回池中
        pool.push_back(std::move(obj));
        
        // 通知等待的线程
        condition.notify_one();
    }
    
    size_t getPoolSize() const {
        std::lock_guard<std::mutex> lock(mutex);
        return pool.size();
    }
    
    size_t getCurrentSize() const {
        std::lock_guard<std::mutex> lock(mutex);
        return currentSize;
    }
};
```

### 7.3 对象池模式与资源管理的关系

对象池模式本质上是一种资源管理技术，它解决了以下资源管理问题：

1. **资源创建成本高**：某些对象的创建成本很高，如数据库连接、线程、网络连接等
2. **资源有限**：系统中的某些资源数量有限，不能无限制创建
3. **资源复用**：通过复用资源，减少创建和销毁的开销

```cpp
// 数据库连接池示例
class DatabaseConnection : public Reusable {
private:
    std::string connectionString;
    bool connected;
    
public:
    DatabaseConnection(const std::string& connStr) : connectionString(connStr), connected(false) {}
    
    void reset() override {
        if (connected) {
            // 关闭连接
            disconnect();
        }
    }
    
    void use() override {
        if (!connected) {
            // 建立连接
            connect();
        }
        
        // 执行查询
        executeQuery("SELECT * FROM users");
    }
    
private:
    void connect() {
        // 模拟建立数据库连接
        std::cout << "Connecting to database: " << connectionString << std::endl;
        connected = true;
    }
    
    void disconnect() {
        // 模拟关闭数据库连接
        std::cout << "Disconnecting from database" << std::endl;
        connected = false;
    }
    
    void executeQuery(const std::string& query) {
        // 模拟执行查询
        std::cout << "Executing query: " << query << std::endl;
    }
};

// 数据库连接池
class DatabaseConnectionPool {
private:
    std::vector<std::unique_ptr<DatabaseConnection>> pool;
    std::mutex mutex;
    std::condition_variable condition;
    std::string connectionString;
    size_t maxSize;
    
public:
    DatabaseConnectionPool(const std::string& connStr, size_t maxPoolSize) 
        : connectionString(connStr), maxSize(maxPoolSize) {}
    
    std::unique_ptr<DatabaseConnection> acquire() {
        std::unique_lock<std::mutex> lock(mutex);
        
        condition.wait(lock, [this] { 
            return !pool.empty() || pool.size() < maxSize; 
        });
        
        if (!pool.empty()) {
            auto conn = std::move(pool.back());
            pool.pop_back();
            return conn;
        } else {
            return std::make_unique<DatabaseConnection>(connectionString);
        }
    }
    
    void release(std::unique_ptr<DatabaseConnection> conn) {
        if (!conn) return;
        
        std::lock_guard<std::mutex> lock(mutex);
        
        conn->reset();
        pool.push_back(std::move(conn));
        condition.notify_one();
    }
};
```

### 7.4 对象池模式在高性能系统中的应用

对象池模式在高性能系统中有广泛应用，特别是在需要频繁创建和销毁对象的场景：

1. **游戏开发**：
```cpp
// 游戏对象池
class GameObject : public Reusable {
private:
    int x, y;
    bool active;
    
public:
    GameObject() : x(0), y(0), active(false) {}
    
    void reset() override {
        x = 0;
        y = 0;
        active = false;
    }
    
    void use() override {
        active = true;
        // 游戏对象逻辑
    }
    
    void setPosition(int posX, int posY) {
        x = posX;
        y = posY;
    }
    
    bool isActive() const {
        return active;
    }
};

// 游戏对象池
class GameObjectPool {
private:
    std::vector<std::unique_ptr<GameObject>> pool;
    std::vector<std::unique_ptr<GameObject>> activeObjects;
    
public:
    GameObjectPool(size_t poolSize) {
        for (size_t i = 0; i < poolSize; ++i) {
            pool.push_back(std::make_unique<GameObject>());
        }
    }
    
    GameObject* createObject(int x, int y) {
        std::unique_ptr<GameObject> obj;
        
        if (!pool.empty()) {
            obj = std::move(pool.back());
            pool.pop_back();
        } else {
            obj = std::make_unique<GameObject>();
        }
        
        obj->setPosition(x, y);
        obj->use();
        
        GameObject* rawPtr = obj.get();
        activeObjects.push_back(std::move(obj));
        return rawPtr;
    }
    
    void destroyObject(GameObject* obj) {
        if (!obj) return;
        
        auto it = std::find_if(activeObjects.begin(), activeObjects.end(),
            [obj](const std::unique_ptr<GameObject>& ptr) {
                return ptr.get() == obj;
            });
            
        if (it != activeObjects.end()) {
            (*it)->reset();
            pool.push_back(std::move(*it));
            activeObjects.erase(it);
        }
    }
    
    void update() {
        // 更新所有活动对象
        for (auto& obj : activeObjects) {
            if (obj->isActive()) {
                // 更新游戏对象
            }
        }
    }
};
```

2. **网络服务器**：
```cpp
// 连接对象
class Connection : public Reusable {
private:
    int socketFd;
    bool inUse;
    
public:
    Connection() : socketFd(-1), inUse(false) {}
    
    void reset() override {
        if (socketFd != -1) {
            close(socketFd);
            socketFd = -1;
        }
        inUse = false;
    }
    
    void use() override {
        inUse = true;
        // 处理连接
    }
    
    bool connect(const std::string& host, int port) {
        // 建立连接
        socketFd = socket(AF_INET, SOCK_STREAM, 0);
        // ... 连接逻辑
        return socketFd != -1;
    }
    
    void disconnect() {
        if (socketFd != -1) {
            close(socketFd);
            socketFd = -1;
        }
    }
    
    bool isInUse() const {
        return inUse;
    }
};

// 连接池
class ConnectionPool {
private:
    std::queue<std::unique_ptr<Connection>> availableConnections;
    std::set<Connection*> usedConnections;
    std::mutex mutex;
    std::string host;
    int port;
    size_t maxSize;
    
public:
    ConnectionPool(const std::string& h, int p, size_t maxPoolSize) 
        : host(h), port(p), maxSize(maxPoolSize) {}
    
    Connection* acquire() {
        std::lock_guard<std::mutex> lock(mutex);
        
        std::unique_ptr<Connection> conn;
        
        if (!availableConnections.empty()) {
            conn = std::move(availableConnections.front());
            availableConnections.pop();
        } else if (usedConnections.size() < maxSize) {
            conn = std::make_unique<Connection>();
        } else {
            return nullptr;  // 池已满
        }
        
        if (conn && conn->connect(host, port)) {
            conn->use();
            Connection* rawPtr = conn.get();
            usedConnections.insert(rawPtr);
            return rawPtr;
        }
        
        return nullptr;
    }
    
    void release(Connection* conn) {
        if (!conn) return;
        
        std::lock_guard<std::mutex> lock(mutex);
        
        auto it = usedConnections.find(conn);
        if (it != usedConnections.end()) {
            (*it)->reset();
            availableConnections.push(std::move(*it));
            usedConnections.erase(it);
        }
    }
    
    size_t getAvailableCount() const {
        std::lock_guard<std::mutex> lock(mutex);
        return availableConnections.size();
    }
    
    size_t getUsedCount() const {
        std::lock_guard<std::mutex> lock(mutex);
        return usedConnections.size();
    }
};
```

### 7.5 对象池模式的线程安全与并发控制

在多线程环境中使用对象池时，需要考虑线程安全和并发控制：

```cpp
// 线程安全的对象池
class ThreadSafeObjectPool {
private:
    std::queue<std::unique_ptr<Reusable>> pool;
    mutable std::mutex mutex;
    std::condition_variable condition;
    std::function<std::unique_ptr<Reusable>()> factory;
    size_t maxSize;
    size_t currentSize;
    
public:
    ThreadSafeObjectPool(std::function<std::unique_ptr<Reusable>()> f, size_t maxPoolSize) 
        : factory(f), maxSize(maxPoolSize), currentSize(0) {}
    
    std::unique_ptr<Reusable> acquire() {
        std::unique_lock<std::mutex> lock(mutex);
        
        // 等待直到有可用对象或可以创建新对象
        condition.wait(lock, [this] { 
            return !pool.empty() || currentSize < maxSize; 
        });
        
        std::unique_ptr<Reusable> obj;
        
        if (!pool.empty()) {
            obj = std::move(pool.front());
            pool.pop();
        } else if (currentSize < maxSize) {
            obj = factory();
            currentSize++;
        }
        
        return obj;
    }
    
    void release(std::unique_ptr<Reusable> obj) {
        if (!obj) return;
        
        std::lock_guard<std::mutex> lock(mutex);
        
        obj->reset();
        pool.push(std::move(obj));
        condition.notify_one();
    }
    
    // 尝试获取对象，不阻塞
    std::unique_ptr<Reusable> tryAcquire() {
        std::lock_guard<std::mutex> lock(mutex);
        
        if (!pool.empty()) {
            auto obj = std::move(pool.front());
            pool.pop();
            return obj;
        } else if (currentSize < maxSize) {
            currentSize++;
            return factory();
        }
        
        return nullptr;
    }
    
    // 带超时的获取对象
    template<typename Rep, typename Period>
    std::unique_ptr<Reusable> acquireWithTimeout(std::chrono::duration<Rep, Period> timeout) {
        std::unique_lock<std::mutex> lock(mutex);
        
        if (condition.wait_for(lock, timeout, [this] { 
            return !pool.empty() || currentSize < maxSize; 
        })) {
            std::unique_ptr<Reusable> obj;
            
            if (!pool.empty()) {
                obj = std::move(pool.front());
                pool.pop();
            } else if (currentSize < maxSize) {
                obj = factory();
                currentSize++;
            }
            
            return obj;
        }
        
        return nullptr;  // 超时
    }
};
```

### 7.6 对象池模式的适用场景与实现细节

**适用场景**：
1. 创建成本高的对象
2. 频繁创建和销毁的对象
3. 资源有限的对象
4. 需要预先分配资源的场景

**实现细节**：
1. **对象初始化**：对象从池中获取时可能需要重新初始化
2. **对象验证**：对象返回池中前需要验证其状态
3. **池大小管理**：根据系统负载动态调整池大小
4. **对象生命周期**：处理长时间未使用的对象

```cpp
// 高级对象池实现
class AdvancedObjectPool {
private:
    std::queue<std::unique_ptr<Reusable>> pool;
    std::unordered_set<Reusable*> usedObjects;
    std::unordered_map<Reusable*, std::chrono::steady_clock::time_point> lastUsedTime;
    mutable std::mutex mutex;
    std::condition_variable condition;
    std::function<std::unique_ptr<Reusable>()> factory;
    size_t maxSize;
    size_t minSize;
    size_t currentSize;
    std::chrono::seconds maxIdleTime;
    bool running;
    std::thread cleanupThread;
    
public:
    AdvancedObjectPool(std::function<std::unique_ptr<Reusable()> > f, 
                       size_t minPoolSize, size_t maxPoolSize,
                       std::chrono::seconds idleTime = std::chrono::seconds(60))
        : factory(f), minSize(minPoolSize), maxSize(maxPoolSize), 
          currentSize(0), maxIdleTime(idleTime), running(true) {
        
        // 预创建最小数量的对象
        for (size_t i = 0; i < minSize; ++i) {
            auto obj = factory();
            currentSize++;
            pool.push(std::move(obj));
        }
        
        // 启动清理线程
        cleanupThread = std::thread(&AdvancedObjectPool::cleanup, this);
    }
    
    ~AdvancedObjectPool() {
        running = false;
        condition.notify_all();
        if (cleanupThread.joinable()) {
            cleanupThread.join();
        }
    }
    
    std::unique_ptr<Reusable> acquire() {
        std::unique_lock<std::mutex> lock(mutex);
        
        condition.wait(lock, [this] { 
            return !pool.empty() || currentSize < maxSize; 
        });
        
        std::unique_ptr<Reusable> obj;
        
        if (!pool.empty()) {
            obj = std::move(pool.front());
            pool.pop();
        } else if (currentSize < maxSize) {
            obj = factory();
            currentSize++;
        }
        
        if (obj) {
            Reusable* rawPtr = obj.get();
            usedObjects.insert(rawPtr);
            lastUsedTime[rawPtr] = std::chrono::steady_clock::now();
        }
        
        return obj;
    }
    
    void release(std::unique_ptr<Reusable> obj) {
        if (!obj) return;
        
        std::lock_guard<std::mutex> lock(mutex);
        
        Reusable* rawPtr = obj.get();
        
        // 从使用集合中移除
        usedObjects.erase(rawPtr);
        lastUsedTime.erase(rawPtr);
        
        // 重置对象状态
        obj->reset();
        
        // 返回池中
        pool.push(std::move(obj));
        condition.notify_one();
    }
    
    size_t getPoolSize() const {
        std::lock_guard<std::mutex> lock(mutex);
        return pool.size();
    }
    
    size_t getUsedCount() const {
        std::lock_guard<std::mutex> lock(mutex);
        return usedObjects.size();
    }
    
    size_t getCurrentSize() const {
        std::lock_guard<std::mutex> lock(mutex);
        return currentSize;
    }
    
private:
    void cleanup() {
        while (running) {
            std::unique_lock<std::mutex> lock(mutex);
            
            // 等待一段时间或直到收到通知
            condition.wait_for(lock, std::chrono::seconds(10));
            
            if (!running) break;
            
            auto now = std::chrono::steady_clock::now();
            auto it = lastUsedTime.begin();
            
            while (it != lastUsedTime.end()) {
                // 检查对象是否长时间未使用
                if (now - it->second > maxIdleTime && pool.size() > minSize) {
                    // 从池中移除长时间未使用的对象
                    auto poolIt = std::find_if(pool.begin(), pool.end(),
                        [ptr = it->first](const std::unique_ptr<Reusable>& obj) {
                            return obj.get() == ptr;
                        });
                    
                    if (poolIt != pool.end()) {
                        pool.erase(poolIt);
                        currentSize--;
                    }
                    
                    it = lastUsedTime.erase(it);
                } else {
                    ++it;
                }
            }
        }
    }
};
```

### 7.7 对象池模式的优缺点

**优点**：
1. 提高性能，减少对象创建和销毁的开销
2. 控制资源使用，避免资源耗尽
3. 预分配资源，减少运行时分配
4. 支持对象重用，减少内存碎片

**缺点**：
1. 增加系统复杂性
2. 可能导致内存泄漏（对象未正确释放）
3. 需要处理线程安全问题
4. 对象状态管理复杂

## 8. 章节总结

创建型设计模式提供了灵活的对象创建机制，使系统更加灵活和可扩展。通过学习本章，读者应该能够根据不同的场景选择合适的创建型模式，并理解它们之间的关系和适用条件。

创建型设计模式的核心价值在于解耦对象的创建和使用，使系统在运行时能够动态决定需要创建哪些对象，如何创建这些对象，以及如何配置这些对象。每种创建型模式都有其特定的应用场景和优缺点：

- 单例模式适用于需要全局唯一实例的场景，但要注意线程安全和序列化问题
- 工厂方法模式适用于需要根据不同条件创建不同对象的场景，符合开闭原则
- 抽象工厂模式适用于需要创建一系列相关对象的场景，但扩展性受限
- 建造者模式适用于构建复杂对象的场景，可以分离构建过程和表示
- 原型模式适用于需要通过复制创建对象的场景，可以提高创建效率
- 对象池模式适用于需要频繁创建和销毁对象的场景，可以优化系统性能

在实际应用中，创建型模式经常与其他类型的设计模式结合使用，形成更强大的解决方案。例如，单例模式可以与工厂方法模式结合，创建全局唯一的工厂；建造者模式可以与原型模式结合，实现复杂对象的克隆和构建。

掌握创建型设计模式是提高软件设计能力的重要一步，它们不仅提供了具体的解决方案，更重要的是体现了面向对象设计的核心思想：封装、继承、多态和抽象。通过深入理解这些模式，开发者可以设计出更加灵活、可维护和可扩展的软件系统。