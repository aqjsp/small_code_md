# 第7章：现代C++与设计模式

## 目录

- [1. C++11特性与设计模式](#1-c11特性与设计模式)
  - [1.1 智能指针与资源管理](#11-智能指针与资源管理)
  - [1.2 Lambda表达式与函数式编程](#12-lambda表达式与函数式编程)
  - [1.3 右值引用与移动语义](#13-右值引用与移动语义)
  - [1.4 可变参数模板与泛型编程](#14-可变参数模板与泛型编程)
  - [1.5 并发特性与多线程模式](#15-并发特性与多线程模式)
  - [1.6 基于范围的for循环与STL算法](#16-基于范围的for循环与stl算法)
  - [1.7 constexpr与编译时计算](#17-constexpr与编译时计算)
  - [1.8 类型推导与auto关键字](#18-类型推导与auto关键字)
  - [1.9 统一初始化与初始化列表](#19-统一初始化与初始化列表)
- [2. C++14/17特性与设计模式](#2-c1417特性与设计模式)
  - [2.1 泛型Lambda与函数式编程](#21-泛型lambda与函数式编程)
  - [2.2 变量模板与编译时计算](#22-变量模板与编译时计算)
  - [2.3 std::optional与空对象模式](#23-stdoptional与空对象模式)
  - [2.4 std::variant与访问者模式](#24-stdvariant与访问者模式)
  - [2.5 std::any与类型擦除模式](#25-stdany与类型擦除模式)
  - [2.6 结构化绑定与数据解构](#26-结构化绑定与数据解构)
  - [2.7 if constexpr与编译时分支](#27-if-constexpr与编译时分支)
  - [2.8 std::string_view与字符串处理模式](#28-stdstringview与字符串处理模式)
  - [2.9 并行算法与并行模式](#29-并行算法与并行模式)
- [3. C++20特性与设计模式](#3-c20特性与设计模式)
  - [3.1 概念与约束编程](#31-概念与约束编程)
  - [3.2 范围库与函数式编程](#32-范围库与函数式编程)
  - [3.3 协程与异步模式](#33-协程与异步模式)
  - [3.4 模块与依赖管理](#34-模块与依赖管理)
  - [3.5 三路比较与自定义比较器](#35-三路比较与自定义比较器)
  - [3.6 指定初始化器与对象构建](#36-指定初始化器与对象构建)
  - [3.7 consteval与立即函数](#37-consteval与立即函数)
  - [3.8 std::format与格式化模式](#38-stdformat与格式化模式)
  - [3.9 航天飞船运算符与比较操作](#39-航天飞船运算符与比较操作)
- [4. 模板元编程与设计模式](#4-模板元编程与设计模式)
  - [4.1 SFINAE与类型特征](#41-sfinae与类型特征)
  - [4.2 模板特化与策略模式](#42-模板特化与策略模式)
  - [4.3 编译时递归与访问者模式](#43-编译时递归与访问者模式)
  - [4.4 类型列表与组合模式](#44-类型列表与组合模式)
  - [4.5 模板递归与建造者模式](#45-模板递归与建造者模式)
  - [4.6 编译时反射与工厂模式](#46-编译时反射与工厂模式)
  - [4.7 元函数与单例模式](#47-元函数与单例模式)
  - [4.8 类型擦除与桥接模式](#48-类型擦除与桥接模式)
  - [4.9 constexpr函数与策略模式](#49-constexpr函数与策略模式)
- [5. 函数式编程思想与设计模式](#5-函数式编程思想与设计模式)
  - [5.1 函数式编程基础](#51-函数式编程基础)
  - [5.2 Lambda表达式与函数式设计模式](#52-lambda表达式与函数式设计模式)
  - [5.3 函数组合与管道模式](#53-函数组合与管道模式)
  - [5.4 不可变性与状态模式](#54-不可变性与状态模式)
  - [5.5 高阶函数与访问者模式](#55-高阶函数与访问者模式)
- [6. 章节总结](#6-章节总结)
- [7. 结语](#7-结语)

## 章节概述

设计模式是软件工程中经过验证的解决方案，用于解决在特定上下文中反复出现的设计问题。自Erich Gamma等人在《设计模式：可复用面向对象软件的基础》一书中提出23种经典设计模式以来，设计模式已成为软件开发的基石。然而，随着C++语言的不断演进，特别是自C++11以来的现代化进程，设计模式的实现方式、应用场景和设计理念都发生了深刻变化。

现代C++引入的大量新特性不仅为传统设计模式提供了更优雅、更高效的实现方式，还催生了新的设计模式和编程范式。C++11作为一次革命性的更新，引入了Lambda表达式、智能指针、右值引用等特性，极大地改变了C++的编程风格。随后的C++14/17进一步完善了这些特性，并添加了如std::optional、std::variant等实用工具。最新的C++20标准更是引入了概念、协程、范围库等颠覆性特性，为设计模式的实现开辟了新的可能性。

本章将深入探讨现代C++特性如何影响和重塑传统设计模式，以及如何利用这些新特性构建更加灵活、高效和可维护的软件系统。我们将从C++11开始，逐步分析各个版本的新特性如何与设计模式相互作用，并探讨模板元编程和函数式编程思想如何与面向对象设计模式融合，最终形成现代C++的设计哲学。

## 学习目标

通过本章的学习，读者将能够：

1. **理解现代C++特性对设计模式的影响**：掌握C++11/14/17/20各版本引入的关键特性，以及这些特性如何改变传统设计模式的实现方式和应用场景。

2. **掌握现代C++设计模式的实现技巧**：学会使用智能指针、Lambda表达式、右值引用等现代C++特性实现经典设计模式，提高代码的简洁性和安全性。

3. **理解模板元编程在设计模式中的应用**：掌握SFINAE、模板特化、编译时递归等高级模板技术，以及如何利用这些技术实现编译时设计决策。

4. **探索函数式编程与面向对象的融合**：了解函数式编程思想如何与现代C++结合，以及如何将不可变性、纯函数等概念应用到面向对象设计中。

5. **培养现代C++设计思维**：形成基于现代C++特性的设计思维，能够根据具体场景选择最合适的设计模式和实现方式。

6. **掌握性能与安全的平衡艺术**：学会在设计模式实现中平衡性能、安全性和可维护性，充分利用现代C++的类型系统和编译时检查能力。

本章将理论与实践相结合，通过丰富的代码示例和深入的分析，帮助读者全面掌握现代C++设计模式的精髓，提升软件设计能力和代码质量。

## 1. C++11特性与设计模式

C++11是C++语言历史上的一次革命性更新，它引入了大量改变C++编程范式的新特性。这些特性不仅使C++变得更加现代化、 expressive（表达力强）和类型安全，也为设计模式的实现提供了全新的思路和工具。本节将深入探讨C++11的关键特性如何影响和重塑传统设计模式。

## 1.1 智能指针与资源管理

### 概念与原理

资源管理是软件开发中的核心问题之一。在传统C++中，资源管理主要依赖于RAII（Resource Acquisition Is Initialization，资源获取即初始化）模式，但原始指针的使用仍然容易导致内存泄漏、悬空指针等问题。C++11引入的智能指针彻底改变了这一状况，为资源管理提供了类型安全、自动化的解决方案。

智能指针是封装了原始指针的类模板，它通过RAII机制自动管理所指向对象的生命周期。C++11标准库提供了三种主要的智能指针：

1. **std::unique_ptr**：独占所有权的智能指针，同一时间只能有一个指针指向对象
2. **std::shared_ptr**：共享所有权的智能指针，通过引用计数管理对象生命周期
3. **std::weak_ptr**：弱引用智能指针，不增加引用计数，用于解决循环引用问题

### 设计模式应用

智能指针对多种设计模式的实现产生了深远影响：

#### 单例模式（Singleton Pattern）

传统单例模式实现中，资源释放和线程安全是两大难题。使用std::unique_ptr可以优雅地解决这些问题：

```cpp
class Singleton {
private:
    Singleton() = default;
    ~Singleton() = default;
    
    // 禁用拷贝构造和赋值
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    
    static std::unique_ptr<Singleton> instance;
    
public:
    static Singleton& getInstance() {
        static std::once_flag flag;
        std::call_once(flag, []() {
            instance = std::make_unique<Singleton>();
        });
        return *instance;
    }
    
    void doSomething() {
        std::cout << "Singleton is working!" << std::endl;
    }
};

std::unique_ptr<Singleton> Singleton::instance = nullptr;
```

这种实现方式具有以下优势：
- 自动内存管理，无需手动释放
- 线程安全的初始化，通过std::once_flag确保只初始化一次
- 延迟初始化，只有在第一次调用getInstance时才创建实例

#### 观察者模式（Observer Pattern）

在观察者模式中，使用std::shared_ptr可以简化对象生命周期管理：

```cpp
class IObserver {
public:
    virtual ~IObserver() = default;
    virtual void update(const std::string& message) = 0;
};

using ObserverPtr = std::shared_ptr<IObserver>;

class Subject {
private:
    std::vector<ObserverPtr> observers;
    
public:
    void attach(ObserverPtr observer) {
        observers.push_back(observer);
    }
    
    void detach(ObserverPtr observer) {
        observers.erase(
            std::remove(observers.begin(), observers.end(), observer),
            observers.end());
    }
    
    void notify(const std::string& message) {
        for (auto& observer : observers) {
            if (observer) {
                observer->update(message);
            }
        }
    }
};
```

使用智能指针的优势：
- 自动管理观察者对象的生命周期
- 避免悬空指针问题
- 支持弱引用解决循环引用问题

### 实践意义

智能指针的引入使C++的资源管理更加自动化和安全，它将RAII模式发挥到了极致。在实际开发中，智能指针不仅减少了内存泄漏的风险，还简化了代码结构，提高了代码的可读性和可维护性。同时，智能指针也为设计模式的实现提供了更安全、更优雅的解决方案，使开发者能够专注于业务逻辑而非底层资源管理。

## 1.2 Lambda表达式与函数式编程

### 概念与原理

Lambda表达式是C++11引入的最具革命性的特性之一，它允许在代码中直接定义匿名函数对象。Lambda表达式的语法形式为：`[capture](parameters) -> return_type { body }`，其中：
- capture：捕获列表，指定如何访问外部变量
- parameters：参数列表
- return_type：返回类型（可省略，由编译器推导）
- body：函数体

Lambda表达式的引入使C++获得了有限的函数式编程能力，为设计模式的实现提供了更灵活、更简洁的方式。它特别适用于那些需要临时定义简单函数对象的场景，如算法、回调和事件处理。

### 设计模式应用

#### 命令模式（Command Pattern）

传统命令模式需要为每个命令创建单独的类，而使用Lambda表达式可以大大简化实现：

```cpp
// 传统命令模式实现
class Command {
public:
    virtual ~Command() = default;
    virtual void execute() = 0;
};

class LightOnCommand : public Command {
private:
    Light& light;
public:
    LightOnCommand(Light& l) : light(l) {}
    void execute() override {
        light.turnOn();
    }
};

// 使用Lambda表达式的现代实现
using Command = std::function<void()>;

class RemoteControl {
private:
    std::vector<Command> slots;
    
public:
    void setCommand(int slot, Command cmd) {
        if (slot >= slots.size()) {
            slots.resize(slot + 1);
        }
        slots[slot] = cmd;
    }
    
    void buttonPressed(int slot) {
        if (slot < slots.size() && slots[slot]) {
            slots[slot]();
        }
    }
};

// 使用示例
RemoteControl remote;
Light light;

remote.setCommand(0, [&light]() { light.turnOn(); });
remote.setCommand(1, [&light]() { light.turnOff(); });
remote.setCommand(2, [&light]() { light.dim(50); });

remote.buttonPressed(0);  // 打开灯
remote.buttonPressed(1);  // 关闭灯
```

Lambda表达式的优势：
- 无需为每个命令创建单独的类
- 可以直接捕获外部变量，简化状态管理
- 代码更加简洁和直观

#### 策略模式（Strategy Pattern）

Lambda表达式也极大地简化了策略模式的实现：

```cpp
// 传统策略模式实现
class Strategy {
public:
    virtual ~Strategy() = default;
    virtual int execute(int a, int b) = 0;
};

class AddStrategy : public Strategy {
public:
    int execute(int a, int b) override {
        return a + b;
    }
};

// 使用Lambda表达式的现代实现
using Strategy = std::function<int(int, int)>;

class Context {
private:
    Strategy strategy;
    
public:
    void setStrategy(Strategy s) {
        strategy = s;
    }
    
    int executeStrategy(int a, int b) {
        return strategy(a, b);
    }
};

// 使用示例
Context context;
context.setStrategy([](int a, int b) { return a + b; });
std::cout << context.executeStrategy(3, 4) << std::endl;  // 输出7

context.setStrategy([](int a, int b) { return a * b; });
std::cout << context.executeStrategy(3, 4) << std::endl;  // 输出12
```

### 实践意义

Lambda表达式的引入使C++获得了函数式编程的能力，它简化了许多设计模式的实现，减少了样板代码。在实际开发中，Lambda表达式特别适用于：
- 事件处理和回调机制
- 算法的自定义比较和操作
- 延迟计算和闭包
- 简单的命令和策略实现

通过Lambda表达式，开发者可以编写更加简洁、表达力更强的代码，同时保持面向对象设计的优势。

## 1.3 右值引用与移动语义

### 概念与原理

右值引用（Rvalue Reference）是C++11引入的另一项革命性特性，它解决了C++中长期存在的性能问题。右值引用允许我们识别和操作临时对象（右值），从而实现移动语义（Move Semantics）和完美转发（Perfect Forwarding）。

在C++中，表达式可以分为左值（lvalue）和右值（rvalue）：
- 左值：表示对象的身份，可以出现在赋值运算符的左边
- 右值：表示对象的值，只能出现在赋值运算符的右边

C++11引入了右值引用（Type&&），它可以绑定到右值，但不能绑定到左值。通过右值引用，我们可以实现移动构造函数和移动赋值运算符，从而避免不必要的深拷贝，提高程序性能。

### 设计模式应用

#### 原型模式（Prototype Pattern）

在原型模式中，对象的复制是一个核心操作。使用移动语义可以优化原型模式的性能：

```cpp
class Prototype {
protected:
    std::string data;
    std::vector<int> numbers;
    
public:
    Prototype(const std::string& d, const std::vector<int>& nums)
        : data(d), numbers(nums) {}
    
    // 拷贝构造函数
    Prototype(const Prototype& other)
        : data(other.data), numbers(other.numbers) {}
    
    // 移动构造函数
    Prototype(Prototype&& other) noexcept
        : data(std::move(other.data)), numbers(std::move(other.numbers)) {}
    
    // 拷贝赋值运算符
    Prototype& operator=(const Prototype& other) {
        if (this != &other) {
            data = other.data;
            numbers = other.numbers;
        }
        return *this;
    }
    
    // 移动赋值运算符
    Prototype& operator=(Prototype&& other) noexcept {
        if (this != &other) {
            data = std::move(other.data);
            numbers = std::move(other.numbers);
        }
        return *this;
    }
    
    virtual std::unique_ptr<Prototype> clone() const = 0;
    virtual void printInfo() const {
        std::cout << "Data: " << data << ", Numbers: ";
        for (int num : numbers) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }
};

class ConcretePrototype : public Prototype {
public:
    ConcretePrototype(const std::string& d, const std::vector<int>& nums)
        : Prototype(d, nums) {}
    
    std::unique_ptr<Prototype> clone() const override {
        return std::make_unique<ConcretePrototype>(*this);
    }
};

// 使用示例
ConcretePrototype original("Original", {1, 2, 3, 4, 5});
original.printInfo();

// 拷贝构造
ConcretePrototype copy = original;
copy.printInfo();

// 移动构造
ConcretePrototype moved = std::move(original);
moved.printInfo();

// 注意：original对象现在处于有效但未指定状态
```

#### 建造者模式（Builder Pattern）

在建造者模式中，使用移动语义可以优化对象的构建和转移过程：

```cpp
class Product {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    Product(std::string a, std::string b, std::string c)
        : partA(std::move(a)), partB(std::move(b)), partC(std::move(c)) {}
    
    void show() const {
        std::cout << "Product parts: " << partA << ", " << partB << ", " << partC << std::endl;
    }
};

class Builder {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    Builder& setPartA(std::string a) {
        partA = std::move(a);
        return *this;
    }
    
    Builder& setPartB(std::string b) {
        partB = std::move(b);
        return *this;
    }
    
    Builder& setPartC(std::string c) {
        partC = std::move(c);
        return *this;
    }
    
    // 移动构造Product，避免不必要的拷贝
    Product build() {
        return Product(std::move(partA), std::move(partB), std::move(partC));
    }
};

// 使用示例
Product product = Builder()
    .setPartA("PartA")
    .setPartB("PartB")
    .setPartC("PartC")
    .build();

product.show();
```

### 实践意义

右值引用和移动语义的引入极大地提高了C++程序的性能，特别是在涉及大量对象复制和转移的场景。它通过避免不必要的深拷贝，减少了内存分配和释放的开销，提高了程序的运行效率。

在设计模式实现中，移动语义特别适用于：
- 原型模式中的对象克隆
- 建造者模式中的对象构建
- 工厂模式中的对象创建
- 任何涉及资源转移的场景

通过合理使用移动语义，开发者可以在保持代码清晰性的同时，显著提高程序的性能。

## 1.4 可变参数模板与泛型编程

### 概念与原理

可变参数模板（Variadic Templates）是C++11引入的一项强大特性，它允许模板接受任意数量的参数。这使得泛型编程变得更加灵活和强大，特别是在实现工厂模式、访问者模式等需要处理多种类型的设计模式时非常有用。

可变参数模板的语法使用省略号（...）来表示可变参数，主要有以下几种形式：
- `typename... Args`：表示模板参数包
- `Args... args`：表示函数参数包
- `args...`：参数包展开

### 设计模式应用

#### 工厂模式（Factory Pattern）

可变参数模板极大地简化了工厂模式的实现，特别是当需要支持多种构造参数时：

```cpp
class Product {
public:
    virtual ~Product() = default;
    virtual void use() = 0;
};

class ConcreteProductA : public Product {
private:
    std::string name;
    int value;
    
public:
    ConcreteProductA(const std::string& n, int v) : name(n), value(v) {}
    
    void use() override {
        std::cout << "Using ConcreteProductA: " << name << ", " << value << std::endl;
    }
};

class ConcreteProductB : public Product {
private:
    double price;
    bool available;
    
public:
    ConcreteProductB(double p, bool a) : price(p), available(a) {}
    
    void use() override {
        std::cout << "Using ConcreteProductB: " << price << ", " 
                  << (available ? "available" : "not available") << std::endl;
    }
};

// 使用可变参数模板的工厂
class Factory {
public:
    template<typename T, typename... Args>
    static std::unique_ptr<T> create(Args&&... args) {
        return std::make_unique<T>(std::forward<Args>(args)...);
    }
};

// 使用示例
auto productA = Factory::create<ConcreteProductA>("ProductA", 42);
auto productB = Factory::create<ConcreteProductB>(19.99, true);

productA->use();
productB->use();
```

#### 访问者模式（Visitor Pattern）

可变参数模板也可以用于实现更加灵活的访问者模式：

```cpp
// 前向声明
struct Visitor;

// 可访问接口
template<typename... Types>
struct Visitable {
    virtual void accept(Visitor& visitor) = 0;
};

// 具体元素
class ElementA : public Visitable<ElementA> {
private:
    int data;
    
public:
    ElementA(int d) : data(d) {}
    
    int getData() const { return data; }
    void setData(int d) { data = d; }
    
    void accept(Visitor& visitor) override;
};

class ElementB : public Visitable<ElementB> {
private:
    std::string text;
    
public:
    ElementB(const std::string& t) : text(t) {}
    
    const std::string& getText() const { return text; }
    void setText(const std::string& t) { text = t; }
    
    void accept(Visitor& visitor) override;
};

// 访问者基类
struct Visitor {
    virtual ~Visitor() = default;
    
    // 使用可变参数模板定义visit方法
    template<typename T>
    void visit(T& element) {
        visitImpl(element);
    }
    
private:
    // 实际的访问实现，需要为每个类型特化
    virtual void visitImpl(ElementA& element) = 0;
    virtual void visitImpl(ElementB& element) = 0;
};

// 具体访问者
class ConcreteVisitor : public Visitor {
private:
    void visitImpl(ElementA& element) override {
        std::cout << "Visiting ElementA with data: " << element.getData() << std::endl;
        element.setData(element.getData() * 2);
    }
    
    void visitImpl(ElementB& element) override {
        std::cout << "Visiting ElementB with text: " << element.getText() << std::endl;
        element.setText(element.getText() + " (visited)");
    }
};

// 实现accept方法
void ElementA::accept(Visitor& visitor) {
    visitor.visit(*this);
}

void ElementB::accept(Visitor& visitor) {
    visitor.visit(*this);
}

// 使用示例
ElementA elemA(10);
ElementB elemB("Hello");

ConcreteVisitor visitor;

elemA.accept(visitor);
elemB.accept(visitor);

std::cout << "After visitation:" << std::endl;
elemA.accept(visitor);  // 再次访问，查看变化
elemB.accept(visitor);
```

### 实践意义

可变参数模板的引入使C++的泛型编程能力得到了极大提升，它为设计模式的实现提供了更加灵活和强大的工具。在实际开发中，可变参数模板特别适用于：
- 工厂模式中的对象创建
- 访问者模式中的多态访问
- 建造者模式中的参数传递
- 任何需要处理可变数量类型或参数的场景

通过可变参数模板，开发者可以编写更加通用、可复用的代码，减少重复工作，提高开发效率。

## 1.5 并发特性与多线程模式

### 概念与原理

C++11引入了全面的并发支持，包括线程、互斥锁、条件变量、原子操作和异步任务等。这些特性为多线程编程提供了标准化的解决方案，也为并发设计模式的实现提供了强大的支持。

C++11并发库的主要组件包括：
- `std::thread`：线程类，用于创建和管理线程
- `std::mutex`、`std::recursive_mutex`：互斥锁，用于保护共享资源
- `std::condition_variable`：条件变量，用于线程间同步
- `std::atomic`：原子类型，提供无锁并发操作
- `std::future`、`std::promise`、`std::async`：异步任务和结果获取

### 设计模式应用

#### 单例模式（Singleton Pattern）

在多线程环境中，单例模式的实现需要特别考虑线程安全问题。C++11提供了多种线程安全的实现方式：

```cpp
// 使用std::once_flag的线程安全单例
class ThreadSafeSingleton {
private:
    ThreadSafeSingleton() = default;
    ~ThreadSafeSingleton() = default;
    
    // 禁用拷贝构造和赋值
    ThreadSafeSingleton(const ThreadSafeSingleton&) = delete;
    ThreadSafeSingleton& operator=(const ThreadSafeSingleton&) = delete;
    
    static std::unique_ptr<ThreadSafeSingleton> instance;
    static std::mutex mutex;
    static std::once_flag onceFlag;
    
public:
    static ThreadSafeSingleton& getInstance() {
        std::call_once(onceFlag, []() {
            instance = std::make_unique<ThreadSafeSingleton>();
        });
        return *instance;
    }
    
    void doSomething() {
        std::cout << "ThreadSafeSingleton is working in thread: " 
                  << std::this_thread::get_id() << std::endl;
    }
};

std::unique_ptr<ThreadSafeSingleton> ThreadSafeSingleton::instance = nullptr;
std::mutex ThreadSafeSingleton::mutex;
std::once_flag ThreadSafeSingleton::onceFlag;

// 使用Meyers' Singleton的线程安全实现
class MeyersSingleton {
private:
    MeyersSingleton() = default;
    
public:
    static MeyersSingleton& getInstance() {
        static MeyersSingleton instance;
        return instance;
    }
    
    void doSomething() {
        std::cout << "MeyersSingleton is working in thread: " 
                  << std::this_thread::get_id() << std::endl;
    }
};
```

#### 生产者-消费者模式（Producer-Consumer Pattern）

C++11的并发特性使生产者-消费者模式的实现更加简洁和安全：

```cpp
template<typename T>
class ThreadSafeQueue {
private:
    std::queue<T> queue;
    mutable std::mutex mutex;
    std::condition_variable condition;
    
public:
    void push(T value) {
        {
            std::lock_guard<std::mutex> lock(mutex);
            queue.push(std::move(value));
        }
        condition.notify_one();
    }
    
    bool tryPop(T& value) {
        std::lock_guard<std::mutex> lock(mutex);
        if (queue.empty()) {
            return false;
        }
        
        value = std::move(queue.front());
        queue.pop();
        return true;
    }
    
    void waitAndPop(T& value) {
        std::unique_lock<std::mutex> lock(mutex);
        condition.wait(lock, [this] { return !queue.empty(); });
        
        value = std::move(queue.front());
        queue.pop();
    }
    
    bool empty() const {
        std::lock_guard<std::mutex> lock(mutex);
        return queue.empty();
    }
};

// 生产者函数
void producer(ThreadSafeQueue<int>& queue, int id, int count) {
    for (int i = 0; i < count; ++i) {
        int value = id * 100 + i;
        queue.push(value);
        std::cout << "Producer " << id << " produced: " << value << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(50));
    }
}

// 消费者函数
void consumer(ThreadSafeQueue<int>& queue, int id) {
    while (true) {
        int value;
        queue.waitAndPop(value);
        std::cout << "Consumer " << id << " consumed: " << value << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
    }
}

// 使用示例
ThreadSafeQueue<int> queue;

std::thread producer1(producer, std::ref(queue), 1, 5);
std::thread producer2(producer, std::ref(queue), 2, 5);
std::thread consumer1(consumer, std::ref(queue), 1);
std::thread consumer2(consumer, std::ref(queue), 2);

producer1.join();
producer2.join();

// 让消费者运行一段时间
std::this_thread::sleep_for(std::chrono::seconds(2));

// 强制退出（在实际应用中应该使用更优雅的方式）
std::terminate();
```

#### 主动对象模式（Active Object Pattern）

使用C++11的异步特性可以轻松实现主动对象模式：

```cpp
class ActiveObject {
private:
    std::function<void()> task;
    std::thread worker;
    std::mutex mutex;
    std::condition_variable condition;
    bool running;
    
public:
    ActiveObject() : running(true) {
        worker = std::thread([this]() {
            while (running) {
                std::function<void()> currentTask;
                {
                    std::unique_lock<std::mutex> lock(mutex);
                    condition.wait(lock, [this] { return !running || task; });
                    
                    if (!running) break;
                    
                    currentTask = std::move(task);
                    task = nullptr;
                }
                
                if (currentTask) {
                    currentTask();
                }
            }
        });
    }
    
    ~ActiveObject() {
        {
            std::lock_guard<std::mutex> lock(mutex);
            running = false;
        }
        condition.notify_one();
        worker.join();
    }
    
    template<typename Func, typename... Args>
    auto executeAsync(Func&& func, Args&&... args) -> std::future<decltype(func(args...))> {
        using ReturnType = decltype(func(args...));
        
        auto promise = std::make_shared<std::promise<ReturnType>>();
        auto future = promise->get_future();
        
        {
            std::lock_guard<std::mutex> lock(mutex);
            task = [promise, func = std::forward<Func>(func), args...]() mutable {
                try {
                    if constexpr (std::is_void_v<ReturnType>) {
                        func(args...);
                        promise->set_value();
                    } else {
                        promise->set_value(func(args...));
                    }
                } catch (...) {
                    promise->set_exception(std::current_exception());
                }
            };
        }
        
        condition.notify_one();
        return future;
    }
};

// 使用示例
ActiveObject activeObj;

// 异步执行任务
auto future1 = activeObj.executeAsync([]() {
    std::cout << "Task 1 executed in thread: " << std::this_thread::get_id() << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    return 42;
});

auto future2 = activeObj.executeAsync([](int value) {
    std::cout << "Task 2 executed with parameter: " << value 
              << " in thread: " << std::this_thread::get_id() << std::endl;
    return value * 2;
}, 21);

// 等待结果
std::cout << "Task 1 result: " << future1.get() << std::endl;
std::cout << "Task 2 result: " << future2.get() << std::endl;
```

### 实践意义

C++11并发特性的引入使多线程编程变得更加安全和便捷，它为并发设计模式的实现提供了标准化的解决方案。在实际开发中，这些特性特别适用于：
- 多线程环境下的单例模式实现
- 生产者-消费者模式中的线程安全队列
- 主动对象模式中的异步任务执行
- 任何需要并发处理和同步的场景

通过使用C++11的并发特性，开发者可以编写更加安全、高效的多线程程序，避免常见的并发问题，如竞态条件、死锁等。

## 1.6 基于范围的for循环与STL算法

### 概念与原理

基于范围的for循环（Range-based for loop）是C++11引入的一项简化遍历操作的语法糖。它提供了一种更简洁、更安全的方式来遍历容器、数组和其他可迭代对象。基于范围的for循环的语法形式为：`for (declaration : range_expression) statement`。

基于范围的for循环不仅提高了代码的可读性，还减少了常见的迭代器错误，如越界访问和无效迭代器使用。它与STL算法结合使用时，可以极大地简化代码结构，提高开发效率。

### 设计模式应用

#### 迭代器模式（Iterator Pattern）

基于范围的for循环简化了迭代器模式的使用，使客户端代码更加简洁：

```cpp
// 自定义容器类，支持基于范围的for循环
template<typename T>
class MyContainer {
private:
    std::vector<T> data;
    
public:
    void add(const T& item) {
        data.push_back(item);
    }
    
    // 支持基于范围的for循环
    auto begin() { return data.begin(); }
    auto end() { return data.end(); }
    auto begin() const { return data.begin(); }
    auto end() const { return data.end(); }
    
    // 传统迭代器接口
    class Iterator {
    private:
        typename std::vector<T>::iterator it;
        
    public:
        Iterator(typename std::vector<T>::iterator iter) : it(iter) {}
        
        T& operator*() { return *it; }
        Iterator& operator++() { ++it; return *this; }
        bool operator!=(const Iterator& other) const { return it != other.it; }
    };
    
    Iterator beginIterator() { return Iterator(data.begin()); }
    Iterator endIterator() { return Iterator(data.end()); }
};

// 使用示例
MyContainer<int> container;
container.add(1);
container.add(2);
container.add(3);

// 使用基于范围的for循环
std::cout << "Using range-based for loop: ";
for (const auto& item : container) {
    std::cout << item << " ";
}
std::cout << std::endl;

// 使用传统迭代器
std::cout << "Using traditional iterator: ";
for (auto it = container.beginIterator(); it != container.endIterator(); ++it) {
    std::cout << *it << " ";
}
std::cout << std::endl;
```

#### 组合模式（Composite Pattern）

基于范围的for循环可以简化组合模式中的遍历操作：

```cpp
// 组件基类
class Component {
protected:
    std::string name;
    
public:
    Component(const std::string& n) : name(n) {}
    virtual ~Component() = default;
    
    virtual void operation() = 0;
    virtual void add(std::shared_ptr<Component> component) {}
    virtual void remove(std::shared_ptr<Component> component) {}
    virtual std::shared_ptr<Component> getChild(int index) { return nullptr; }
    
    const std::string& getName() const { return name; }
};

// 叶子节点
class Leaf : public Component {
public:
    Leaf(const std::string& n) : Component(n) {}
    
    void operation() override {
        std::cout << "Leaf " << name << " operation" << std::endl;
    }
};

// 组合节点
class Composite : public Component {
private:
    std::vector<std::shared_ptr<Component>> children;
    
public:
    Composite(const std::string& n) : Component(n) {}
    
    void add(std::shared_ptr<Component> component) override {
        children.push_back(component);
    }
    
    void remove(std::shared_ptr<Component> component) override {
        children.erase(
            std::remove(children.begin(), children.end(), component),
            children.end());
    }
    
    std::shared_ptr<Component> getChild(int index) override {
        if (index >= 0 && index < static_cast<int>(children.size())) {
            return children[index];
        }
        return nullptr;
    }
    
    void operation() override {
        std::cout << "Composite " << name << " operation" << std::endl;
        
        // 使用基于范围的for循环遍历子组件
        for (const auto& child : children) {
            child->operation();
        }
    }
    
    // 支持基于范围的for循环
    auto begin() { return children.begin(); }
    auto end() { return children.end(); }
    auto begin() const { return children.begin(); }
    auto end() const { return children.end(); }
};

// 使用示例
auto root = std::make_shared<Composite>("Root");
auto leaf1 = std::make_shared<Leaf>("Leaf 1");
auto leaf2 = std::make_shared<Leaf>("Leaf 2");
auto leaf3 = std::make_shared<Leaf>("Leaf 3");

auto composite1 = std::make_shared<Composite>("Composite 1");
auto leaf4 = std::make_shared<Leaf>("Leaf 4");
auto leaf5 = std::make_shared<Leaf>("Leaf 5");

composite1->add(leaf4);
composite1->add(leaf5);

root->add(leaf1);
root->add(composite1);
root->add(leaf2);
root->add(leaf3);

root->operation();

// 使用基于范围的for循环遍历组合对象
std::cout << "\nIterating through composite with range-based for loop:" << std::endl;
for (const auto& component : *root) {
    std::cout << "Component: " << component->getName() << std::endl;
}
```

### 实践意义

基于范围的for循环的引入极大地简化了C++中的遍历操作，它减少了代码的冗长度，提高了可读性，并减少了常见的迭代器错误。在设计模式实现中，基于范围的for循环特别适用于：
- 迭代器模式中的遍历操作
- 组合模式中的子组件访问
- 任何需要遍历容器或集合的场景

通过结合基于范围的for循环和STL算法，开发者可以编写更加简洁、表达力更强的代码，同时保持高性能和类型安全。

## 1.7 constexpr与编译时计算

### 概念与原理

constexpr是C++11引入的关键字，用于指定变量或函数可以在编译时计算。它使C++获得了更强大的编译时编程能力，为模板元编程和编译时优化提供了更简洁的语法。

constexpr的主要特点：
- 可以用于变量声明，表示该变量的值可以在编译时确定
- 可以用于函数声明，表示该函数可以在编译时执行
- constexpr函数必须足够简单，只能包含一条返回语句（C++11限制）
- constexpr函数可以用于常量表达式上下文

### 设计模式应用

#### 策略模式（Strategy Pattern）

constexpr可以用于实现编译时策略选择：

```cpp
// 编译时策略接口
template<int N>
struct FactorialStrategy {
    static constexpr int compute(int n) {
        return n * FactorialStrategy<N-1>::compute(n-1);
    }
};

// 特化：递归终止条件
template<>
struct FactorialStrategy<1> {
    static constexpr int compute(int n) {
        return 1;
    }
};

// 编译时策略选择器
template<int N>
struct CompileTimeStrategy {
    static constexpr int factorial = FactorialStrategy<N>::compute(N);
};

// 使用示例
constexpr int result1 = CompileTimeStrategy<5>::factorial;  // 编译时计算
constexpr int result2 = CompileTimeStrategy<10>::factorial; // 编译时计算

std::cout << "5! = " << result1 << std::endl;  // 输出: 5! = 120
std::cout << "10! = " << result2 << std::endl; // 输出: 10! = 3628800
```

#### 工厂模式（Factory Pattern）

constexpr可以用于实现编译时工厂：

```cpp
// 产品基类
class Product {
public:
    virtual ~Product() = default;
    virtual void use() = 0;
};

// 具体产品
class ProductA : public Product {
public:
    void use() override {
        std::cout << "Using ProductA" << std::endl;
    }
};

class ProductB : public Product {
public:
    void use() override {
        std::cout << "Using ProductB" << std::endl;
    }
};

// 编译时产品标识
enum class ProductType {
    A,
    B
};

// 编译时工厂
template<ProductType Type>
class CompileTimeFactory {
public:
    static std::unique_ptr<Product> create() {
        if constexpr (Type == ProductType::A) {
            return std::make_unique<ProductA>();
        } else if constexpr (Type == ProductType::B) {
            return std::make_unique<ProductB>();
        }
    }
};

// 使用示例
auto productA = CompileTimeFactory<ProductType::A>::create();
auto productB = CompileTimeFactory<ProductType::B>::create();

productA->use();  // 输出: Using ProductA
productB->use();  // 输出: Using ProductB
```

### 实践意义

constexpr的引入使C++获得了更强大的编译时编程能力，它为模板元编程提供了更简洁的语法，同时保持了高性能。在设计模式实现中，constexpr特别适用于：
- 策略模式中的编译时策略选择
- 工厂模式中的编译时对象创建
- 单例模式中的编译时初始化
- 任何需要在编译时进行计算或决策的场景

通过合理使用constexpr，开发者可以在编译时完成更多工作，减少运行时开销，提高程序性能。

## 1.8 类型推导与auto关键字

### 概念与原理

auto关键字是C++11重新定义的特性，用于自动推导变量类型。它使C++代码更加简洁，减少了冗长的类型声明，特别是在处理复杂模板类型和迭代器时非常有用。

auto的主要特点：
- 自动推导变量类型，基于初始化表达式
- 可以与const、&、*等修饰符结合使用
- 可以简化函数返回类型推导（C++14）
- 可以用于lambda表达式参数类型推导（C++14）

### 设计模式应用

#### 建造者模式（Builder Pattern）

auto可以简化建造者模式中的链式调用：

```cpp
class Product {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    Product(std::string a, std::string b, std::string c)
        : partA(std::move(a)), partB(std::move(b)), partC(std::move(c)) {}
    
    void show() const {
        std::cout << "Product parts: " << partA << ", " << partB << ", " << partC << std::endl;
    }
};

class Builder {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    Builder& setPartA(const std::string& a) {
        partA = a;
        return *this;
    }
    
    Builder& setPartB(const std::string& b) {
        partB = b;
        return *this;
    }
    
    Builder& setPartC(const std::string& c) {
        partC = c;
        return *this;
    }
    
    Product build() {
        return Product(partA, partB, partC);
    }
};

// 使用auto简化链式调用
auto product = Builder()
    .setPartA("PartA")
    .setPartB("PartB")
    .setPartC("PartC")
    .build();

product.show();
```

#### 访问者模式（Visitor Pattern）

auto可以简化访问者模式中的元素遍历：

```cpp
// 元素基类
class Element {
public:
    virtual ~Element() = default;
    virtual void accept(class Visitor& visitor) = 0;
};

// 具体元素
class ElementA : public Element {
public:
    void accept(Visitor& visitor) override;
    void operationA() {
        std::cout << "ElementA operation" << std::endl;
    }
};

class ElementB : public Element {
public:
    void accept(Visitor& visitor) override;
    void operationB() {
        std::cout << "ElementB operation" << std::endl;
    }
};

// 访问者基类
class Visitor {
public:
    virtual ~Visitor() = default;
    virtual void visit(ElementA& element) = 0;
    virtual void visit(ElementB& element) = 0;
};

// 具体访问者
class ConcreteVisitor : public Visitor {
public:
    void visit(ElementA& element) override {
        element.operationA();
    }
    
    void visit(ElementB& element) override {
        element.operationB();
    }
};

// 实现accept方法
void ElementA::accept(Visitor& visitor) {
    visitor.visit(*this);
}

void ElementB::accept(Visitor& visitor) {
    visitor.visit(*this);
}

// 对象结构
class ObjectStructure {
private:
    std::vector<std::unique_ptr<Element>> elements;
    
public:
    void add(std::unique_ptr<Element> element) {
        elements.push_back(std::move(element));
    }
    
    void accept(Visitor& visitor) {
        // 使用auto简化迭代器类型
        for (auto& element : elements) {
            element->accept(visitor);
        }
    }
};

// 使用示例
ObjectStructure structure;
structure.add(std::make_unique<ElementA>());
structure.add(std::make_unique<ElementB>());

ConcreteVisitor visitor;
structure.accept(visitor);
```

### 实践意义

auto关键字的引入使C++代码更加简洁和可读，它减少了冗长的类型声明，特别是在处理复杂模板类型和迭代器时非常有用。在设计模式实现中，auto特别适用于：
- 建造者模式中的链式调用
- 访问者模式中的元素遍历
- 工厂模式中的对象创建
- 任何涉及复杂类型的场景

通过合理使用auto，开发者可以编写更加简洁、可读性更强的代码，同时保持类型安全和性能。

## 1.9 统一初始化与初始化列表

### 概念与原理

统一初始化（Uniform Initialization）是C++11引入的一项特性，它使用大括号{}来初始化变量、对象和容器。初始化列表（Initializer List）是与统一初始化相关的特性，它允许构造函数接受初始化列表作为参数。

统一初始化的主要特点：
- 使用大括号{}进行初始化
- 可以用于所有类型的初始化
- 避免了最令人烦恼的解析（Most Vexing Parse）问题
- 可以防止窄化转换

初始化列表的主要特点：
- 使用std::initializer_list作为参数类型
- 可以接受任意数量的同类型参数
- 可以与统一初始化语法结合使用

### 设计模式应用

#### 建造者模式（Builder Pattern）

初始化列表可以简化建造者模式中的参数传递：

```cpp
class Product {
private:
    std::vector<std::string> parts;
    
public:
    // 接受初始化列表的构造函数
    Product(std::initializer_list<std::string> list) {
        for (const auto& part : list) {
            parts.push_back(part);
        }
    }
    
    void show() const {
        std::cout << "Product parts: ";
        for (const auto& part : parts) {
            std::cout << part << " ";
        }
        std::cout << std::endl;
    }
};

// 使用初始化列表创建产品
auto product1 = Product({"PartA", "PartB", "PartC"});
product1.show();

// 也可以使用统一初始化语法
auto product2 = Product{std::vector<std::string>{"PartX", "PartY", "PartZ"}};
product2.show();
```

#### 组合模式（Composite Pattern）

统一初始化可以简化组合模式中的对象构建：

```cpp
// 组件基类
class Component {
protected:
    std::string name;
    
public:
    Component(const std::string& n) : name(n) {}
    virtual ~Component() = default;
    
    virtual void operation() = 0;
    virtual void add(std::shared_ptr<Component> component) {}
    virtual void remove(std::shared_ptr<Component> component) {}
    virtual std::shared_ptr<Component> getChild(int index) { return nullptr; }
    
    const std::string& getName() const { return name; }
};

// 叶子节点
class Leaf : public Component {
public:
    Leaf(const std::string& n) : Component(n) {}
    
    void operation() override {
        std::cout << "Leaf " << name << " operation" << std::endl;
    }
};

// 组合节点
class Composite : public Component {
private:
    std::vector<std::shared_ptr<Component>> children;
    
public:
    // 接受初始化列表的构造函数
    Composite(const std::string& n, std::initializer_list<std::shared_ptr<Component>> list = {})
        : Component(n) {
        for (const auto& child : list) {
            children.push_back(child);
        }
    }
    
    void add(std::shared_ptr<Component> component) override {
        children.push_back(component);
    }
    
    void remove(std::shared_ptr<Component> component) override {
        children.erase(
            std::remove(children.begin(), children.end(), component),
            children.end());
    }
    
    std::shared_ptr<Component> getChild(int index) override {
        if (index >= 0 && index < static_cast<int>(children.size())) {
            return children[index];
        }
        return nullptr;
    }
    
    void operation() override {
        std::cout << "Composite " << name << " operation" << std::endl;
        
        for (const auto& child : children) {
            child->operation();
        }
    }
};

// 使用统一初始化和初始化列表构建组合对象
auto leaf1 = std::make_shared<Leaf>("Leaf 1");
auto leaf2 = std::make_shared<Leaf>("Leaf 2");
auto leaf3 = std::make_shared<Leaf>("Leaf 3");

auto composite1 = std::make_shared<Composite>("Composite 1", std::initializer_list<std::shared_ptr<Component>>{
    std::make_shared<Leaf>("Leaf 4"),
    std::make_shared<Leaf>("Leaf 5")
});

auto root = std::make_shared<Composite>("Root", std::initializer_list<std::shared_ptr<Component>>{
    leaf1,
    composite1,
    leaf2,
    leaf3
});

root->operation();
```

### 实践意义

统一初始化和初始化列表的引入使C++的初始化语法更加一致和简洁，它减少了语法上的歧义，提高了代码的可读性。在设计模式实现中，这些特性特别适用于：
- 建造者模式中的参数传递
- 组合模式中的对象构建
- 工厂模式中的对象创建
- 任何需要初始化多个参数的场景

通过合理使用统一初始化和初始化列表，开发者可以编写更加简洁、一致的代码，减少语法错误，提高开发效率。

## 2. C++14/17特性与设计模式

## 2.1 泛型Lambda与函数式编程

### 概念与原理

C++14引入了泛型Lambda（Generic Lambda），允许Lambda表达式的参数使用auto类型说明符，从而创建可以接受多种类型的Lambda表达式。这一特性极大地增强了Lambda的灵活性，使函数式编程风格更加自然和强大。

泛型Lambda的主要特点：
- 使用auto关键字作为参数类型
- 编译器为每种使用的类型生成对应的函数调用操作符
- 可以与模板结合使用，实现更灵活的泛型编程
- 简化了代码，减少了模板冗余

### 设计模式应用

#### 策略模式（Strategy Pattern）

泛型Lambda可以简化策略模式的实现，使策略的定义更加灵活：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

// 传统策略模式实现
class SortStrategy {
public:
    virtual ~SortStrategy() = default;
    virtual void sort(std::vector<int>& data) const = 0;
};

class AscendingSort : public SortStrategy {
public:
    void sort(std::vector<int>& data) const override {
        std::sort(data.begin(), data.end());
    }
};

class DescendingSort : public SortStrategy {
public:
    void sort(std::vector<int>& data) const override {
        std::sort(data.begin(), data.end(), std::greater<int>());
    }
};

// 使用泛型Lambda的策略模式
class LambdaSortStrategy {
private:
    std::function<void(std::vector<int>&)> sortFunction;
    
public:
    // 接受泛型Lambda作为策略
    template<typename SortFunc>
    LambdaSortStrategy(SortFunc func) : sortFunction(func) {}
    
    void sort(std::vector<int>& data) const {
        sortFunction(data);
    }
};

// 使用示例
int main() {
    std::vector<int> data = {5, 2, 8, 1, 9};
    
    // 传统策略模式
    std::unique_ptr<SortStrategy> strategy = std::make_unique<AscendingSort>();
    strategy->sort(data);
    
    // 使用泛型Lambda的策略模式
    auto ascendingSort = [](auto& container) {
        std::sort(container.begin(), container.end());
    };
    
    auto descendingSort = [](auto& container) {
        std::sort(container.begin(), container.end(), std::greater<decltype(container[0])>());
    };
    
    auto customSort = [](auto& container, auto comparator) {
        std::sort(container.begin(), container.end(), comparator);
    };
    
    LambdaSortStrategy lambdaStrategy1(ascendingSort);
    LambdaSortStrategy lambdaStrategy2(descendingSort);
    
    std::vector<int> data1 = {5, 2, 8, 1, 9};
    std::vector<int> data2 = {5, 2, 8, 1, 9};
    
    lambdaStrategy1.sort(data1);  // 升序排序
    lambdaStrategy2.sort(data2);  // 降序排序
    
    // 使用更灵活的泛型Lambda
    std::vector<std::string> strings = {"apple", "orange", "banana", "grape"};
    
    auto lengthSort = [](auto& container) {
        std::sort(container.begin(), container.end(), 
            [](const auto& a, const auto& b) { return a.length() < b.length(); });
    };
    
    LambdaSortStrategy stringStrategy(lengthSort);
    stringStrategy.sort(strings);
    
    return 0;
}
```

#### 命令模式（Command Pattern）

泛型Lambda可以简化命令模式的实现，使命令的定义更加灵活：

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <memory>

// 传统命令模式
class Command {
public:
    virtual ~Command() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

class Light {
public:
    void turnOn() { std::cout << "Light is on" << std::endl; }
    void turnOff() { std::cout << "Light is off" << std::endl; }
};

class LightOnCommand : public Command {
private:
    Light& light;
    
public:
    LightOnCommand(Light& l) : light(l) {}
    
    void execute() override {
        light.turnOn();
    }
    
    void undo() override {
        light.turnOff();
    }
};

class LightOffCommand : public Command {
private:
    Light& light;
    
public:
    LightOffCommand(Light& l) : light(l) {}
    
    void execute() override {
        light.turnOff();
    }
    
    void undo() override {
        light.turnOn();
    }
};

// 使用泛型Lambda的命令模式
class LambdaCommand {
private:
    std::function<void()> executeFunc;
    std::function<void()> undoFunc;
    
public:
    // 接受泛型Lambda作为命令
    template<typename ExecFunc, typename UndoFunc>
    LambdaCommand(ExecFunc exec, UndoFunc undo) 
        : executeFunc(exec), undoFunc(undo) {}
    
    void execute() {
        executeFunc();
    }
    
    void undo() {
        undoFunc();
    }
};

// 遥控器类
class RemoteControl {
private:
    std::vector<std::unique_ptr<Command>> commands;
    std::vector<std::unique_ptr<LambdaCommand>> lambdaCommands;
    
public:
    void setCommand(int slot, std::unique_ptr<Command> command) {
        if (slot >= commands.size()) {
            commands.resize(slot + 1);
        }
        commands[slot] = std::move(command);
    }
    
    void setLambdaCommand(int slot, std::unique_ptr<LambdaCommand> command) {
        if (slot >= lambdaCommands.size()) {
            lambdaCommands.resize(slot + 1);
        }
        lambdaCommands[slot] = std::move(command);
    }
    
    void buttonWasPressed(int slot) {
        if (slot < commands.size() && commands[slot]) {
            commands[slot]->execute();
        }
        if (slot < lambdaCommands.size() && lambdaCommands[slot]) {
            lambdaCommands[slot]->execute();
        }
    }
    
    void undoButtonWasPressed(int slot) {
        if (slot < commands.size() && commands[slot]) {
            commands[slot]->undo();
        }
        if (slot < lambdaCommands.size() && lambdaCommands[slot]) {
            lambdaCommands[slot]->undo();
        }
    }
};

// 使用示例
int main() {
    RemoteControl remote;
    Light light;
    
    // 传统命令模式
    remote.setCommand(0, std::make_unique<LightOnCommand>(light));
    remote.setCommand(1, std::make_unique<LightOffCommand>(light));
    
    // 使用泛型Lambda的命令模式
    auto lightOn = [&]() { light.turnOn(); };
    auto lightOff = [&]() { light.turnOff(); };
    
    remote.setLambdaCommand(0, std::make_unique<LambdaCommand>(
        lightOn, lightOff));
    remote.setLambdaCommand(1, std::make_unique<LambdaCommand>(
        lightOff, lightOn));
    
    // 执行命令
    remote.buttonWasPressed(0);  // 开灯
    remote.buttonWasPressed(1);  // 关灯
    remote.undoButtonWasPressed(1);  // 撤销关灯（开灯）
    
    // 更灵活的泛型Lambda命令
    auto toggleCommand = [&](auto& device) {
        return LambdaCommand(
            [&]() { device.turnOn(); },
            [&]() { device.turnOff(); }
        );
    };
    
    // 可以用于任何具有turnOn/turnOff方法的设备
    remote.setLambdaCommand(2, std::make_unique<LambdaCommand>(
        [&]() { light.turnOn(); },
        [&]() { light.turnOff(); }
    ));
    
    remote.buttonWasPressed(2);  // 开灯
    
    return 0;
}
```

### 实践意义

泛型Lambda的引入极大地增强了C++的函数式编程能力，它使代码更加简洁、灵活，同时保持了类型安全。在设计模式实现中，泛型Lambda特别适用于：
- 策略模式中的灵活策略定义
- 命令模式中的简洁命令实现
- 访问者模式中的访问操作
- 任何需要函数对象或回调函数的场景

通过合理使用泛型Lambda，开发者可以编写更加简洁、表达力更强的代码，减少模板冗余，提高开发效率。

## 2.2 返回类型推导与decltype(auto)

### 概念与原理

C++14引入了函数返回类型推导，允许使用auto关键字作为函数返回类型，编译器会根据return语句推导出实际的返回类型。C++14还引入了decltype(auto)，它结合了auto的类型推导和decltype的类型推导规则，可以保留表达式的值类别（value category）。

返回类型推导的主要特点：
- 使用auto作为函数返回类型
- 编译器根据return语句推导返回类型
- 所有return语句必须推导出相同的类型
- 可以递归使用，但函数必须在调用点之前完全定义

decltype(auto)的主要特点：
- 结合auto和decltype的类型推导规则
- 保留表达式的值类别（左值/右值）
- 适用于转发函数和包装器
- 可以简化模板代码

### 设计模式应用

#### 适配器模式（Adapter Pattern）

返回类型推导可以简化适配器模式的实现：

```cpp
#include <iostream>
#include <vector>
#include <string>

// 目标接口
class Target {
public:
    virtual ~Target() = default;
    virtual std::string request() const = 0;
};

// 需要适配的类
class Adaptee {
public:
    std::string specificRequest() const {
        return "Specific request from Adaptee";
    }
};

// 传统适配器
class Adapter : public Target {
private:
    Adaptee adaptee;
    
public:
    std::string request() const override {
        return adaptee.specificRequest();
    }
};

// 使用返回类型推导的适配器
template<typename AdapteeType>
class GenericAdapter {
private:
    AdapteeType adaptee;
    
public:
    // 使用auto返回类型推导
    auto request() const {
        return adaptee.specificRequest();
    }
    
    // 使用decltype(auto)保留值类别
    decltype(auto) getAdaptee() {
        return adaptee;
    }
    
    decltype(auto) getAdaptee() const {
        return adaptee;
    }
};

// 使用示例
int main() {
    // 传统适配器
    std::unique_ptr<Target> target = std::make_unique<Adapter>();
    std::cout << target->request() << std::endl;
    
    // 使用返回类型推导的适配器
    GenericAdapter<Adaptee> genericAdapter;
    std::cout << genericAdapter.request() << std::endl;
    
    // 使用decltype(auto)保留值类别
    auto& adapteeRef = genericAdapter.getAdaptee();
    std::cout << adapteeRef.specificRequest() << std::endl;
    
    return 0;
}
```

#### 装饰器模式（Decorator Pattern）

返回类型推导可以简化装饰器模式的实现：

```cpp
#include <iostream>
#include <string>
#include <memory>

// 组件接口
class Component {
public:
    virtual ~Component() = default;
    virtual std::string operation() const = 0;
};

// 具体组件
class ConcreteComponent : public Component {
public:
    std::string operation() const override {
        return "ConcreteComponent";
    }
};

// 基础装饰器
class Decorator : public Component {
private:
    std::unique_ptr<Component> component;
    
public:
    Decorator(std::unique_ptr<Component> comp) : component(std::move(comp)) {}
    
    std::string operation() const override {
        return component->operation();
    }
    
    Component& getComponent() const {
        return *component;
    }
};

// 具体装饰器
class ConcreteDecorator : public Decorator {
private:
    std::string addedState;
    
public:
    ConcreteDecorator(std::unique_ptr<Component> comp, const std::string& state)
        : Decorator(std::move(comp)), addedState(state) {}
    
    std::string operation() const override {
        return "ConcreteDecorator(" + Decorator::operation() + ") + " + addedState;
    }
};

// 使用返回类型推导的装饰器
template<typename ComponentType>
class GenericDecorator {
private:
    ComponentType component;
    
public:
    GenericDecorator(ComponentType comp) : component(std::move(comp)) {}
    
    // 使用auto返回类型推导
    auto operation() const {
        return component.operation();
    }
    
    // 使用decltype(auto)保留值类别
    decltype(auto) getComponent() {
        return component;
    }
    
    decltype(auto) getComponent() const {
        return component;
    }
    
    // 装饰方法
    template<typename DecoratorFunc>
    auto decorate(DecoratorFunc func) const {
        return func(component);
    }
};

// 使用示例
int main() {
    // 传统装饰器模式
    auto simple = std::make_unique<ConcreteComponent>();
    std::cout << "Client: I've got a simple component:\n";
    std::cout << simple->operation() << "\n\n";
    
    auto decorator1 = std::make_unique<ConcreteDecorator>(std::move(simple), "State1");
    auto decorator2 = std::make_unique<ConcreteDecorator>(std::move(decorator1), "State2");
    std::cout << "Client: Now I've got a decorated component:\n";
    std::cout << decorator2->operation() << "\n\n";
    
    // 使用返回类型推导的装饰器
    ConcreteComponent concreteComp;
    GenericDecorator<ConcreteComponent> genericDecorator(concreteComp);
    
    std::cout << "Generic decorator: " << genericDecorator.operation() << std::endl;
    
    // 使用装饰方法
    auto decorated = genericDecorator.decorate([](auto& comp) {
        return "Decorated(" + comp.operation() + ")";
    });
    
    std::cout << "Decorated result: " << decorated << std::endl;
    
    return 0;
}
```

### 实践意义

返回类型推导和decltype(auto)的引入使C++代码更加简洁和灵活，它们减少了冗长的类型声明，特别是在模板和泛型编程中非常有用。在设计模式实现中，这些特性特别适用于：
- 适配器模式中的接口适配
- 装饰器模式中的组件包装
- 代理模式中的对象代理
- 任何需要类型转发或包装的场景

通过合理使用返回类型推导和decltype(auto)，开发者可以编写更加简洁、灵活的代码，同时保持类型安全和性能。

## 2.3 constexpr增强与编译时编程

### 概念与原理

C++14对constexpr进行了重大增强，使其更加强大和灵活。与C++11相比，C++14中的constexpr函数可以包含更多类型的语句，如局部变量、循环和条件语句，这使得编译时编程更加自然和强大。

C++14中constexpr的主要增强：
- 允许在constexpr函数中使用局部变量
- 允许使用循环和条件语句
- 允许使用多个return语句
- 允许调用其他constexpr函数
- 支持更多标准库函数的constexpr版本

### 设计模式应用

#### 单例模式（Singleton Pattern）

constexpr增强可以用于实现编译时单例：

```cpp
#include <iostream>

// 传统单例模式
class Singleton {
private:
    static Singleton* instance;
    Singleton() = default;
    
public:
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    
    static Singleton& getInstance() {
        static Singleton instance;
        return instance;
    }
    
    void doSomething() {
        std::cout << "Singleton is doing something" << std::endl;
    }
};

Singleton* Singleton::instance = nullptr;

// 使用constexpr的编译时单例
template<typename T>
class ConstexprSingleton {
private:
    static constexpr T instance{};
    
public:
    static constexpr const T& getInstance() {
        return instance;
    }
};

// 可用于constexpr的单例类
struct ConstexprData {
    constexpr ConstexprData() : value(42), name("Constexpr Singleton") {}
    
    constexpr int getValue() const { return value; }
    constexpr const char* getName() const { return name; }
    
private:
    int value;
    const char* name;
};

// 使用示例
int main() {
    // 传统单例
    Singleton& singleton = Singleton::getInstance();
    singleton.doSomething();
    
    // constexpr单例
    constexpr const auto& constexprSingleton = ConstexprSingleton<ConstexprData>::getInstance();
    std::cout << "Value: " << constexprSingleton.getValue() << std::endl;
    std::cout << "Name: " << constexprSingleton.getName() << std::endl;
    
    // 编译时计算
    constexpr int value = ConstexprSingleton<ConstexprData>::getInstance().getValue();
    static_assert(value == 42, "Value should be 42");
    
    return 0;
}
```

#### 策略模式（Strategy Pattern）

constexpr增强可以用于实现编译时策略选择：

```cpp
#include <iostream>
#include <type_traits>

// 编译时策略接口
template<typename T>
struct SortStrategy {
    static constexpr bool ascending = true;
    
    static constexpr bool compare(const T& a, const T& b) {
        if constexpr (ascending) {
            return a < b;
        } else {
            return a > b;
        }
    }
};

// 特化策略
template<typename T>
struct DescendingSortStrategy {
    static constexpr bool ascending = false;
    
    static constexpr bool compare(const T& a, const T& b) {
        return a > b;
    }
};

// 编译时策略选择器
template<typename T, typename Strategy = SortStrategy<T>>
class CompileTimeSorter {
public:
    static constexpr void sort(T& a, T& b) {
        if constexpr (Strategy::compare(b, a)) {
            T temp = a;
            a = b;
            b = temp;
        }
    }
    
    // 使用constexpr增强的复杂排序算法
    template<size_t N>
    static constexpr std::array<int, N> bubbleSort(std::array<int, N> arr) {
        for (size_t i = 0; i < N - 1; ++i) {
            for (size_t j = 0; j < N - i - 1; ++j) {
                if constexpr (Strategy::compare(arr[j + 1], arr[j])) {
                    // 交换元素
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
};

// 使用示例
int main() {
    // 使用默认策略（升序）
    int a = 5, b = 3;
    CompileTimeSorter<int>::sort(a, b);
    std::cout << "After sorting (ascending): a=" << a << ", b=" << b << std::endl;
    
    // 使用降序策略
    int c = 5, d = 3;
    CompileTimeSorter<int, DescendingSortStrategy<int>>::sort(c, d);
    std::cout << "After sorting (descending): c=" << c << ", d=" << d << std::endl;
    
    // 使用constexpr增强的复杂排序
    constexpr std::array<int, 5> unsorted = {5, 2, 8, 1, 9};
    constexpr auto sorted = CompileTimeSorter<int>::bubbleSort(unsorted);
    
    std::cout << "Sorted array: ";
    for (const auto& item : sorted) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    // 编译时验证
    static_assert(sorted[0] == 1, "First element should be 1");
    static_assert(sorted[4] == 9, "Last element should be 9");
    
    return 0;
}
```

### 实践意义

C++14对constexpr的增强极大地扩展了编译时编程的能力，使开发者可以在编译时执行更复杂的计算和逻辑。在设计模式实现中，constexpr增强特别适用于：
- 单例模式中的编译时初始化
- 策略模式中的编译时策略选择
- 工厂模式中的编译时对象创建
- 任何需要在编译时进行计算或决策的场景

通过合理使用constexpr增强，开发者可以在编译时完成更多工作，减少运行时开销，提高程序性能。

## 2.4 结构化绑定与元组

### 概念与原理

结构化绑定（Structured Bindings）是C++17引入的一项特性，它允许将一个结构或数组分解为多个变量。这一特性极大地简化了代码，特别是在处理返回多个值的函数和遍历映射容器时。

结构化绑定的主要特点：
- 可以将结构、类或数组分解为多个变量
- 支持三种类型：数组、类/结构体和元组
- 可以与auto结合使用，自动推导变量类型
- 可以与引用和const结合使用

### 设计模式应用

#### 建造者模式（Builder Pattern）

结构化绑定可以简化建造者模式中的结果处理：

```cpp
#include <iostream>
#include <string>
#include <tuple>

// 产品类
class Product {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    Product(std::string a, std::string b, std::string c)
        : partA(std::move(a)), partB(std::move(b)), partC(std::move(c)) {}
    
    // 返回产品部件的元组
    std::tuple<std::string, std::string, std::string> getParts() const {
        return {partA, partB, partC};
    }
    
    // 返回产品部件的结构体
    struct Parts {
        const std::string& a;
        const std::string& b;
        const std::string& c;
    };
    
    Parts getPartsStruct() const {
        return {partA, partB, partC};
    }
    
    void show() const {
        std::cout << "Product parts: " << partA << ", " << partB << ", " << partC << std::endl;
    }
};

// 建造者类
class ProductBuilder {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    ProductBuilder& setPartA(const std::string& a) {
        partA = a;
        return *this;
    }
    
    ProductBuilder& setPartB(const std::string& b) {
        partB = b;
        return *this;
    }
    
    ProductBuilder& setPartC(const std::string& c) {
        partC = c;
        return *this;
    }
    
    Product build() {
        return Product(partA, partB, partC);
    }
    
    // 返回部件的元组
    std::tuple<std::string, std::string, std::string> getParts() const {
        return {partA, partB, partC};
    }
};

// 使用示例
int main() {
    // 传统方式
    ProductBuilder builder;
    builder.setPartA("PartA").setPartB("PartB").setPartC("PartC");
    Product product = builder.build();
    product.show();
    
    // 使用结构化绑定处理元组返回值
    auto [a, b, c] = product.getParts();
    std::cout << "Parts from tuple: " << a << ", " << b << ", " << c << std::endl;
    
    // 使用结构化绑定处理结构体返回值
    auto [partARef, partBRef, partCRef] = product.getPartsStruct();
    std::cout << "Parts from struct: " << partARef << ", " << partBRef << ", " << partCRef << std::endl;
    
    // 使用结构化绑定处理建造者的部件
    auto [builderA, builderB, builderC] = builder.getParts();
    std::cout << "Builder parts: " << builderA << ", " << builderB << ", " << builderC << std::endl;
    
    return 0;
}
```

#### 观察者模式（Observer Pattern）

结构化绑定可以简化观察者模式中的事件处理：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <functional>
#include <map>
#include <tuple>

// 事件类型
enum class EventType {
    Click,
    KeyPress,
    MouseMove
};

// 事件数据
struct EventData {
    EventType type;
    int x;
    int y;
    std::string data;
};

// 观察者接口
class Observer {
public:
    virtual ~Observer() = default;
    virtual void onNotify(const EventData& event) = 0;
};

// 具体观察者
class ClickObserver : public Observer {
public:
    void onNotify(const EventData& event) override {
        if (event.type == EventType::Click) {
            std::cout << "Click at (" << event.x << ", " << event.y << ") with data: " << event.data << std::endl;
        }
    }
};

class KeyPressObserver : public Observer {
public:
    void onNotify(const EventData& event) override {
        if (event.type == EventType::KeyPress) {
            std::cout << "Key pressed at (" << event.x << ", " << event.y << ") with data: " << event.data << std::endl;
        }
    }
};

// 主题类
class Subject {
private:
    std::vector<std::unique_ptr<Observer>> observers;
    
public:
    void addObserver(std::unique_ptr<Observer> observer) {
        observers.push_back(std::move(observer));
    }
    
    void notify(const EventData& event) {
        for (const auto& observer : observers) {
            observer->onNotify(event);
        }
    }
};

// 使用结构化绑定的事件系统
class StructuredEventSystem {
private:
    std::map<EventType, std::vector<std::function<void(int, int, std::string)>>> handlers;
    
public:
    template<typename Handler>
    void registerHandler(EventType type, Handler handler) {
        handlers[type].push_back(handler);
    }
    
    void notify(const EventData& event) {
        auto it = handlers.find(event.type);
        if (it != handlers.end()) {
            for (const auto& handler : it->second) {
                handler(event.x, event.y, event.data);
            }
        }
    }
    
    // 返回事件统计信息
    std::tuple<int, int, int> getEventStats() const {
        int clickCount = handlers.count(EventType::Click) ? handlers.at(EventType::Click).size() : 0;
        int keyPressCount = handlers.count(EventType::KeyPress) ? handlers.at(EventType::KeyPress).size() : 0;
        int mouseMoveCount = handlers.count(EventType::MouseMove) ? handlers.at(EventType::MouseMove).size() : 0;
        
        return {clickCount, keyPressCount, mouseMoveCount};
    }
};

// 使用示例
int main() {
    // 传统观察者模式
    Subject subject;
    subject.addObserver(std::make_unique<ClickObserver>());
    subject.addObserver(std::make_unique<KeyPressObserver>());
    
    subject.notify({EventType::Click, 100, 200, "Left click"});
    subject.notify({EventType::KeyPress, 50, 75, "Enter key"});
    
    // 使用结构化绑定的事件系统
    StructuredEventSystem eventSystem;
    
    // 注册事件处理器
    eventSystem.registerHandler(EventType::Click, [](int x, int y, std::string data) {
        std::cout << "Structured click at (" << x << ", " << y << ") with data: " << data << std::endl;
    });
    
    eventSystem.registerHandler(EventType::KeyPress, [](int x, int y, std::string data) {
        std::cout << "Structured key press at (" << x << ", " << y << ") with data: " << data << std::endl;
    });
    
    eventSystem.notify({EventType::Click, 100, 200, "Left click"});
    eventSystem.notify({EventType::KeyPress, 50, 75, "Enter key"});
    
    // 使用结构化绑定处理统计信息
    auto [clickCount, keyPressCount, mouseMoveCount] = eventSystem.getEventStats();
    std::cout << "Event handlers: Click=" << clickCount 
              << ", KeyPress=" << keyPressCount 
              << ", MouseMove=" << mouseMoveCount << std::endl;
    
    return 0;
}
```

### 实践意义

结构化绑定的引入极大地简化了C++中的多值处理，它减少了代码的冗长度，提高了可读性，并使代码更加表达力强。在设计模式实现中，结构化绑定特别适用于：
- 建造者模式中的结果处理
- 观察者模式中的事件处理
- 工厂模式中的多值返回
- 任何需要处理多个相关值的场景

通过合理使用结构化绑定，开发者可以编写更加简洁、可读性更强的代码，同时保持类型安全和性能。

## 2.5 if constexpr与编译时分支

### 概念与原理

C++17引入了if constexpr语句，它允许在编译时根据条件选择不同的代码分支，而不是在运行时进行判断。这一特性极大地增强了模板编程的能力，使编译时分支更加自然和强大。

if constexpr的主要特点：
- 在编译时评估条件，而不是运行时
- 不满足条件的分支在编译时被丢弃
- 可以用于模板特化和重载的替代方案
- 减少模板实例化的复杂度
- 提高编译时错误信息的清晰度

### 设计模式应用

#### 策略模式（Strategy Pattern）

if constexpr可以用于实现编译时策略选择：

```cpp
#include <iostream>
#include <type_traits>

// 编译时策略选择
template<typename T>
class CompileTimeStrategy {
public:
    // 使用if constexpr进行编译时分支
    void process(const T& value) const {
        if constexpr (std::is_integral_v<T>) {
            std::cout << "Processing integral value: " << value << std::endl;
            // 整数类型的特殊处理
            processIntegral(value);
        } else if constexpr (std::is_floating_point_v<T>) {
            std::cout << "Processing floating point value: " << value << std::endl;
            // 浮点类型的特殊处理
            processFloatingPoint(value);
        } else if constexpr (std::is_same_v<T, std::string>) {
            std::cout << "Processing string value: " << value << std::endl;
            // 字符串类型的特殊处理
            processString(value);
        } else {
            std::cout << "Processing unknown type" << std::endl;
            // 默认处理
            processGeneric(value);
        }
    }
    
private:
    void processIntegral(const T& value) const {
        std::cout << "  Integral specific: " << value * 2 << std::endl;
    }
    
    void processFloatingPoint(const T& value) const {
        std::cout << "  Floating point specific: " << value * 1.5 << std::endl;
    }
    
    void processString(const T& value) const {
        std::cout << "  String specific: " << value.length() << " characters" << std::endl;
    }
    
    template<typename U>
    void processGeneric(const U& value) const {
        std::cout << "  Generic processing" << std::endl;
    }
};

// 传统策略模式
class Strategy {
public:
    virtual ~Strategy() = default;
    virtual void process(int value) const = 0;
    virtual void process(double value) const = 0;
    virtual void process(const std::string& value) const = 0;
};

class ConcreteStrategy : public Strategy {
public:
    void process(int value) const override {
        std::cout << "Processing integral value: " << value << std::endl;
        std::cout << "  Integral specific: " << value * 2 << std::endl;
    }
    
    void process(double value) const override {
        std::cout << "Processing floating point value: " << value << std::endl;
        std::cout << "  Floating point specific: " << value * 1.5 << std::endl;
    }
    
    void process(const std::string& value) const override {
        std::cout << "Processing string value: " << value << std::endl;
        std::cout << "  String specific: " << value.length() << " characters" << std::endl;
    }
};

// 使用示例
int main() {
    // 传统策略模式
    std::unique_ptr<Strategy> strategy = std::make_unique<ConcreteStrategy>();
    strategy->process(42);
    strategy->process(3.14);
    strategy->process(std::string("Hello"));
    
    std::cout << "\n--- Using if constexpr ---\n" << std::endl;
    
    // 使用if constexpr的编译时策略
    CompileTimeStrategy<int> intStrategy;
    CompileTimeStrategy<double> doubleStrategy;
    CompileTimeStrategy<std::string> stringStrategy;
    
    intStrategy.process(42);
    doubleStrategy.process(3.14);
    stringStrategy.process(std::string("Hello"));
    
    return 0;
}
```

#### 工厂模式（Factory Pattern）

if constexpr可以用于实现编译时工厂：

```cpp
#include <iostream>
#include <memory>
#include <type_traits>

// 产品基类
class Product {
public:
    virtual ~Product() = default;
    virtual void use() const = 0;
};

// 具体产品类
class ConcreteProductA : public Product {
public:
    void use() const override {
        std::cout << "Using ConcreteProductA" << std::endl;
    }
};

class ConcreteProductB : public Product {
public:
    void use() const override {
        std::cout << "Using ConcreteProductB" << std::endl;
    }
};

class ConcreteProductC : public Product {
public:
    void use() const override {
        std::cout << "Using ConcreteProductC" << std::endl;
    }
};

// 产品类型枚举
enum class ProductType {
    TypeA,
    TypeB,
    TypeC
};

// 传统工厂
class TraditionalFactory {
public:
    std::unique_ptr<Product> createProduct(ProductType type) const {
        switch (type) {
            case ProductType::TypeA:
                return std::make_unique<ConcreteProductA>();
            case ProductType::TypeB:
                return std::make_unique<ConcreteProductB>();
            case ProductType::TypeC:
                return std::make_unique<ConcreteProductC>();
            default:
                return nullptr;
        }
    }
};

// 使用if constexpr的编译时工厂
template<ProductType Type>
class CompileTimeFactory {
public:
    static std::unique_ptr<Product> createProduct() {
        if constexpr (Type == ProductType::TypeA) {
            return std::make_unique<ConcreteProductA>();
        } else if constexpr (Type == ProductType::TypeB) {
            return std::make_unique<ConcreteProductB>();
        } else if constexpr (Type == ProductType::TypeC) {
            return std::make_unique<ConcreteProductC>();
        } else {
            static_assert(false, "Invalid product type");
            return nullptr;
        }
    }
};

// 更通用的编译时工厂
template<typename ProductType>
class GenericCompileTimeFactory {
public:
    static std::unique_ptr<Product> createProduct() {
        if constexpr (std::is_same_v<ProductType, ConcreteProductA>) {
            return std::make_unique<ConcreteProductA>();
        } else if constexpr (std::is_same_v<ProductType, ConcreteProductB>) {
            return std::make_unique<ConcreteProductB>();
        } else if constexpr (std::is_same_v<ProductType, ConcreteProductC>) {
            return std::make_unique<ConcreteProductC>();
        } else {
            static_assert(false, "Unknown product type");
            return nullptr;
        }
    }
};

// 使用示例
int main() {
    // 传统工厂
    TraditionalFactory traditionalFactory;
    auto product1 = traditionalFactory.createProduct(ProductType::TypeA);
    auto product2 = traditionalFactory.createProduct(ProductType::TypeB);
    auto product3 = traditionalFactory.createProduct(ProductType::TypeC);
    
    if (product1) product1->use();
    if (product2) product2->use();
    if (product3) product3->use();
    
    std::cout << "\n--- Using if constexpr ---\n" << std::endl;
    
    // 使用if constexpr的编译时工厂
    auto ctProduct1 = CompileTimeFactory<ProductType::TypeA>::createProduct();
    auto ctProduct2 = CompileTimeFactory<ProductType::TypeB>::createProduct();
    auto ctProduct3 = CompileTimeFactory<ProductType::TypeC>::createProduct();
    
    ctProduct1->use();
    ctProduct2->use();
    ctProduct3->use();
    
    // 使用更通用的编译时工厂
    auto genericProduct1 = GenericCompileTimeFactory<ConcreteProductA>::createProduct();
    auto genericProduct2 = GenericCompileTimeFactory<ConcreteProductB>::createProduct();
    auto genericProduct3 = GenericCompileTimeFactory<ConcreteProductC>::createProduct();
    
    genericProduct1->use();
    genericProduct2->use();
    genericProduct3->use();
    
    return 0;
}
```

### 实践意义

if constexpr的引入极大地增强了C++的编译时编程能力，它使模板代码更加清晰和高效，减少了运行时开销。在设计模式实现中，if constexpr特别适用于：
- 策略模式中的编译时策略选择
- 工厂模式中的编译时对象创建
- 访问者模式中的编译时访问操作
- 任何需要在编译时进行类型判断和分支的场景

通过合理使用if constexpr，开发者可以编写更加高效、类型安全的代码，同时减少运行时开销。

## 2.6 std::optional与空对象模式

### 概念与原理

C++17引入了std::optional，它是一个容器类模板，用于表示可能存在或不存在的值。std::optional提供了一种类型安全的方式来处理可能为空的值，避免了使用指针或特殊值（如-1或nullptr）来表示空值的问题。

std::optional的主要特点：
- 可以包含值或为空
- 提供了显式的空值检查
- 避免了未初始化值的问题
- 提供了多种访问值的方式
- 支持函数式编程风格的操作

### 设计模式应用

#### 空对象模式（Null Object Pattern）

std::optional可以用于实现更安全的空对象模式：

```cpp
#include <iostream>
#include <optional>
#include <memory>
#include <string>

// 传统空对象模式
class Logger {
public:
    virtual ~Logger() = default;
    virtual void log(const std::string& message) = 0;
};

class ConsoleLogger : public Logger {
public:
    void log(const std::string& message) override {
        std::cout << "Console: " << message << std::endl;
    }
};

class FileLogger : public Logger {
private:
    std::string filename;
    
public:
    FileLogger(const std::string& file) : filename(file) {}
    
    void log(const std::string& message) override {
        std::cout << "File(" << filename << "): " << message << std::endl;
    }
};

class NullLogger : public Logger {
public:
    void log(const std::string& message) override {
        // 什么都不做
    }
};

// 使用std::optional的空对象模式
class OptionalLogger {
private:
    std::unique_ptr<Logger> logger;
    
public:
    OptionalLogger(std::unique_ptr<Logger> log) : logger(std::move(log)) {}
    
    void log(const std::string& message) const {
        if (logger) {
            logger->log(message);
        }
        // 如果logger为空，则不执行任何操作
    }
    
    // 返回一个optional引用，表示可能存在的日志器
    std::optional<std::reference_wrapper<Logger>> getLogger() const {
        if (logger) {
            return *logger;
        }
        return std::nullopt;
    }
};

// 使用std::optional的函数返回值
class Database {
private:
    bool connected;
    
public:
    Database(bool conn) : connected(conn) {}
    
    // 返回optional而不是指针或特殊值
    std::optional<std::string> query(const std::string& sql) const {
        if (connected) {
            return "Result for: " + sql;
        }
        return std::nullopt;
    }
    
    // 使用optional链式调用
    std::optional<int> getRecordCount() const {
        if (connected) {
            return 42;
        }
        return std::nullopt;
    }
};

// 使用示例
int main() {
    // 传统空对象模式
    std::unique_ptr<Logger> consoleLogger = std::make_unique<ConsoleLogger>();
    std::unique_ptr<Logger> nullLogger = std::make_unique<NullLogger>();
    
    consoleLogger->log("This will be logged");
    nullLogger->log("This will not be logged");
    
    std::cout << "\n--- Using std::optional ---\n" << std::endl;
    
    // 使用std::optional的空对象模式
    OptionalLogger optionalLogger1(std::make_unique<ConsoleLogger>());
    OptionalLogger optionalLogger2(nullptr);  // 空日志器
    
    optionalLogger1.log("This will be logged");
    optionalLogger2.log("This will not be logged");
    
    // 使用optional返回值
    Database connectedDb(true);
    Database disconnectedDb(false);
    
    auto result1 = connectedDb.query("SELECT * FROM users");
    auto result2 = disconnectedDb.query("SELECT * FROM users");
    
    // 安全地处理optional
    if (result1) {
        std::cout << "Query result: " << *result1 << std::endl;
    } else {
        std::cout << "No result available" << std::endl;
    }
    
    if (result2) {
        std::cout << "Query result: " << *result2 << std::endl;
    } else {
        std::cout << "No result available" << std::endl;
    }
    
    // 使用value_or提供默认值
    std::cout << "Result or default: " 
              << result2.value_or("No result") << std::endl;
    
    // 使用optional链式调用
    auto count = connectedDb.getRecordCount();
    if (count) {
        std::cout << "Record count: " << *count << std::endl;
    }
    
    return 0;
}
```

#### 建造者模式（Builder Pattern）

std::optional可以用于更安全的建造者模式：

```cpp
#include <iostream>
#include <optional>
#include <string>
#include <memory>

// 产品类
class Computer {
private:
    std::string cpu;
    std::optional<std::string> gpu;
    std::optional<int> ram;
    std::optional<std::string> storage;
    
public:
    Computer(const std::string& c) : cpu(c) {}
    
    void setGPU(const std::string& g) { gpu = g; }
    void setRAM(int r) { ram = r; }
    void setStorage(const std::string& s) { storage = s; }
    
    void show() const {
        std::cout << "Computer Configuration:" << std::endl;
        std::cout << "  CPU: " << cpu << std::endl;
        
        if (gpu) {
            std::cout << "  GPU: " << *gpu << std::endl;
        } else {
            std::cout << "  GPU: Not specified" << std::endl;
        }
        
        if (ram) {
            std::cout << "  RAM: " << *ram << " GB" << std::endl;
        } else {
            std::cout << "  RAM: Not specified" << std::endl;
        }
        
        if (storage) {
            std::cout << "  Storage: " << *storage << std::endl;
        } else {
            std::cout << "  Storage: Not specified" << std::endl;
        }
    }
    
    // 验证配置是否完整
    std::optional<std::string> validate() const {
        if (!gpu) {
            return "GPU is required";
        }
        if (!ram || *ram < 4) {
            return "At least 4GB of RAM is required";
        }
        if (!storage) {
            return "Storage is required";
        }
        return std::nullopt;  // 配置有效
    }
};

// 建造者类
class ComputerBuilder {
private:
    std::optional<std::string> cpu;
    std::optional<std::string> gpu;
    std::optional<int> ram;
    std::optional<std::string> storage;
    
public:
    ComputerBuilder& setCPU(const std::string& c) {
        cpu = c;
        return *this;
    }
    
    ComputerBuilder& setGPU(const std::string& g) {
        gpu = g;
        return *this;
    }
    
    ComputerBuilder& setRAM(int r) {
        ram = r;
        return *this;
    }
    
    ComputerBuilder& setStorage(const std::string& s) {
        storage = s;
        return *this;
    }
    
    // 返回optional而不是指针或抛出异常
    std::optional<Computer> build() const {
        if (!cpu) {
            return std::nullopt;  // CPU是必需的
        }
        
        Computer computer(*cpu);
        
        if (gpu) {
            computer.setGPU(*gpu);
        }
        if (ram) {
            computer.setRAM(*ram);
        }
        if (storage) {
            computer.setStorage(*storage);
        }
        
        return computer;
    }
    
    // 构建并验证
    std::optional<Computer> buildAndValidate() const {
        auto computer = build();
        if (!computer) {
            return std::nullopt;
        }
        
        auto validationError = computer->validate();
        if (validationError) {
            std::cout << "Validation error: " << *validationError << std::endl;
            return std::nullopt;
        }
        
        return computer;
    }
};

// 使用示例
int main() {
    // 使用std::optional的建造者模式
    ComputerBuilder builder;
    
    // 构建完整配置
    auto computer1 = builder.setCPU("Intel i7")
                          .setGPU("NVIDIA RTX 3080")
                          .setRAM(16)
                          .setStorage("1TB SSD")
                          .buildAndValidate();
    
    if (computer1) {
        computer1->show();
    } else {
        std::cout << "Failed to build computer" << std::endl;
    }
    
    std::cout << "\n--- Building incomplete computer ---\n" << std::endl;
    
    // 构建不完整配置
    ComputerBuilder builder2;
    auto computer2 = builder2.setCPU("Intel i5")
                           .setRAM(8)
                           .build();  // 缺少GPU和存储
    
    if (computer2) {
        computer2->show();
        
        // 验证配置
        auto validationError = computer2->validate();
        if (validationError) {
            std::cout << "Validation error: " << *validationError << std::endl;
        } else {
            std::cout << "Configuration is valid" << std::endl;
        }
    }
    
    // 尝试构建无效配置
    auto computer3 = builder2.setRAM(2)  // RAM不足
                           .buildAndValidate();
    
    if (!computer3) {
        std::cout << "Failed to build valid computer" << std::endl;
    }
    
    return 0;
}
```

### 实践意义

std::optional的引入为C++提供了一种类型安全的方式来处理可能为空的值，它避免了使用指针或特殊值来表示空值的问题。在设计模式实现中，std::optional特别适用于：
- 空对象模式中的安全空值处理
- 建造者模式中的可选参数
- 工厂模式中的可能失败的对象创建
- 任何需要表示可能不存在的值的场景

通过合理使用std::optional，开发者可以编写更加类型安全、表达力强的代码，减少空指针解引用的风险。

## 2.7 std::variant与状态模式

### 概念与原理

C++17引入了std::variant，它是一个类型安全的联合体（union），可以存储一组不同类型中的任意一个值。std::variant提供了一种类型安全的方式来处理多种可能的类型，避免了传统联合体的类型安全问题。

std::variant的主要特点：
- 可以存储一组指定类型中的任意一个
- 类型安全，不会访问错误的类型
- 提供了多种访问和检查值的方式
- 支持访问者模式
- 可以递归使用

### 设计模式应用

#### 状态模式（State Pattern）

std::variant可以用于实现更安全的状态模式：

```cpp
#include <iostream>
#include <variant>
#include <string>
#include <memory>

// 传统状态模式
class State {
public:
    virtual ~State() = default;
    virtual void handle() = 0;
};

class ConcreteStateA : public State {
public:
    void handle() override {
        std::cout << "Handling in State A" << std::endl;
    }
};

class ConcreteStateB : public State {
public:
    void handle() override {
        std::cout << "Handling in State B" << std::endl;
    }
};

class Context {
private:
    std::unique_ptr<State> state;
    
public:
    Context(std::unique_ptr<State> s) : state(std::move(s)) {}
    
    void setState(std::unique_ptr<State> s) {
        state = std::move(s);
    }
    
    void request() {
        if (state) {
            state->handle();
        }
    }
};

// 使用std::variant的状态模式
class VariantStateA {
public:
    void handle() const {
        std::cout << "Handling in Variant State A" << std::endl;
    }
};

class VariantStateB {
public:
    void handle() const {
        std::cout << "Handling in Variant State B" << std::endl;
    }
};

class VariantStateC {
public:
    void handle() const {
        std::cout << "Handling in Variant State C" << std::endl;
    }
};

// 使用variant的上下文
class VariantContext {
private:
    std::variant<VariantStateA, VariantStateB, VariantStateC> state;
    
public:
    VariantContext() : state(VariantStateA{}) {}
    
    template<typename StateType>
    void setState() {
        state = StateType{};
    }
    
    void request() const {
        std::visit([](const auto& s) { s.handle(); }, state);
    }
    
    // 获取当前状态类型
    template<typename StateType>
    bool isState() const {
        return std::holds_alternative<StateType>(state);
    }
    
    // 状态转换
    void transition() {
        if (isState<VariantStateA>()) {
            setState<VariantStateB>();
        } else if (isState<VariantStateB>()) {
            setState<VariantStateC>();
        } else {
            setState<VariantStateA>();
        }
    }
};

// 使用示例
int main() {
    // 传统状态模式
    auto stateA = std::make_unique<ConcreteStateA>();
    auto stateB = std::make_unique<ConcreteStateB>();
    
    Context context(std::move(stateA));
    context.request();  // 处理状态A
    
    context.setState(std::move(stateB));
    context.request();  // 处理状态B
    
    std::cout << "\n--- Using std::variant ---\n" << std::endl;
    
    // 使用std::variant的状态模式
    VariantContext variantContext;
    variantContext.request();  // 处理状态A
    
    variantContext.setState<VariantStateB>();
    variantContext.request();  // 处理状态B
    
    variantContext.setState<VariantStateC>();
    variantContext.request();  // 处理状态C
    
    // 状态转换
    std::cout << "\n--- State transitions ---\n" << std::endl;
    
    for (int i = 0; i < 5; ++i) {
        variantContext.request();
        variantContext.transition();
    }
    
    return 0;
}
```

#### 访问者模式（Visitor Pattern）

std::variant可以简化访问者模式的实现：

```cpp
#include <iostream>
#include <variant>
#include <string>
#include <vector>

// 使用std::variant的元素类型
class Circle {
private:
    double radius;
    
public:
    Circle(double r) : radius(r) {}
    
    double getRadius() const { return radius; }
};

class Square {
private:
    double side;
    
public:
    Square(double s) : side(s) {}
    
    double getSide() const { return side; }
};

class Triangle {
private:
    double base;
    double height;
    
public:
    Triangle(double b, double h) : base(b), height(h) {}
    
    double getBase() const { return base; }
    double getHeight() const { return height; }
};

// 使用std::variant的访问者
class AreaVisitor {
public:
    double operator()(const Circle& circle) const {
        return 3.14159 * circle.getRadius() * circle.getRadius();
    }
    
    double operator()(const Square& square) const {
        return square.getSide() * square.getSide();
    }
    
    double operator()(const Triangle& triangle) const {
        return 0.5 * triangle.getBase() * triangle.getHeight();
    }
};

class PerimeterVisitor {
public:
    double operator()(const Circle& circle) const {
        return 2 * 3.14159 * circle.getRadius();
    }
    
    double operator()(const Square& square) const {
        return 4 * square.getSide();
    }
    
    double operator()(const Triangle& triangle) const {
        // 假设是等边三角形
        return 3 * triangle.getBase();
    }
};

// 使用std::variant的图形集合
using Shape = std::variant<Circle, Square, Triangle>;

class ShapeCollection {
private:
    std::vector<Shape> shapes;
    
public:
    void add(const Shape& shape) {
        shapes.push_back(shape);
    }
    
    double totalArea() const {
        double total = 0.0;
        AreaVisitor visitor;
        
        for (const auto& shape : shapes) {
            total += std::visit(visitor, shape);
        }
        
        return total;
    }
    
    double totalPerimeter() const {
        double total = 0.0;
        PerimeterVisitor visitor;
        
        for (const auto& shape : shapes) {
            total += std::visit(visitor, shape);
        }
        
        return total;
    }
    
    // 使用lambda作为访问者
    void printShapes() const {
        for (const auto& shape : shapes) {
            std::visit([](const auto& s) {
                using T = std::decay_t<decltype(s)>;
                if constexpr (std::is_same_v<T, Circle>) {
                    std::cout << "Circle with radius " << s.getRadius() << std::endl;
                } else if constexpr (std::is_same_v<T, Square>) {
                    std::cout << "Square with side " << s.getSide() << std::endl;
                } else if constexpr (std::is_same_v<T, Triangle>) {
                    std::cout << "Triangle with base " << s.getBase() 
                              << " and height " << s.getHeight() << std::endl;
                }
            }, shape);
        }
    }
};

// 使用示例
int main() {
    ShapeCollection collection;
    
    // 添加不同类型的图形
    collection.add(Circle(5.0));
    collection.add(Square(4.0));
    collection.add(Triangle(3.0, 4.0));
    collection.add(Circle(2.5));
    
    // 打印图形信息
    collection.printShapes();
    
    // 计算总面积和周长
    std::cout << "\nTotal area: " << collection.totalArea() << std::endl;
    std::cout << "Total perimeter: " << collection.totalPerimeter() << std::endl;
    
    // 使用std::variant直接
    std::vector<Shape> shapes = {
        Circle(3.0),
        Square(2.0),
        Triangle(4.0, 5.0)
    };
    
    std::cout << "\n--- Direct variant usage ---\n" << std::endl;
    
    // 使用访问者
    AreaVisitor areaVisitor;
    for (const auto& shape : shapes) {
        std::cout << "Area: " << std::visit(areaVisitor, shape) << std::endl;
    }
    
    // 使用lambda访问者
    for (const auto& shape : shapes) {
        double area = std::visit([](const auto& s) -> double {
            using T = std::decay_t<decltype(s)>;
            if constexpr (std::is_same_v<T, Circle>) {
                return 3.14159 * s.getRadius() * s.getRadius();
            } else if constexpr (std::is_same_v<T, Square>) {
                return s.getSide() * s.getSide();
            } else if constexpr (std::is_same_v<T, Triangle>) {
                return 0.5 * s.getBase() * s.getHeight();
            }
        }, shape);
        
        std::cout << "Lambda calculated area: " << area << std::endl;
    }
    
    return 0;
}
```

### 实践意义

std::variant的引入为C++提供了一种类型安全的方式来处理多种可能的类型，它避免了传统联合体的类型安全问题，并简化了访问者模式的实现。在设计模式实现中，std::variant特别适用于：
- 状态模式中的类型安全状态管理
- 访问者模式中的简化实现
- 策略模式中的类型安全策略选择
- 任何需要处理多种可能类型的场景

通过合理使用std::variant，开发者可以编写更加类型安全、表达力强的代码，减少类型转换错误的风险。

## 3. C++20特性与设计模式

## 3.1 概念与约束

### 概念与原理

C++20引入了概念（Concepts）和约束（Constraints），这是模板编程的重大改进。概念为模板参数提供了一种命名要求的方式，使模板代码更加清晰、可读，并且能够提供更好的错误信息。

概念的主要特点：
- 为模板参数提供命名要求
- 提供更好的编译错误信息
- 支持概念重载
- 可以用于约束模板参数
- 提高模板代码的可读性和可维护性

### 设计模式应用

#### 策略模式（Strategy Pattern）

概念可以用于实现更安全的策略模式：

```cpp
#include <iostream>
#include <concepts>
#include <type_traits>

// 定义概念
template<typename T>
concept Numeric = std::is_arithmetic_v<T>;

template<typename T>
concept Container = requires(T t) {
    typename T::value_type;
    { t.size() } -> std::convertible_to<std::size_t>;
    { t.begin() } -> std::input_iterator;
    { t.end() } -> std::input_iterator;
};

template<typename T>
concept Sortable = Container<T> && requires(T t) {
    { std::sort(t.begin(), t.end()) };
};

// 使用概念的策略
template<Numeric T>
class NumericSortStrategy {
public:
    void sort(T& a, T& b) {
        if (a > b) {
            std::swap(a, b);
        }
        std::cout << "Sorted numeric values: " << a << ", " << b << std::endl;
    }
};

template<Sortable T>
class ContainerSortStrategy {
public:
    void sort(T& container) {
        std::sort(container.begin(), container.end());
        std::cout << "Sorted container" << std::endl;
    }
};

// 传统策略模式
class Strategy {
public:
    virtual ~Strategy() = default;
    virtual void execute() = 0;
};

class ConcreteStrategyA : public Strategy {
public:
    void execute() override {
        std::cout << "Executing Strategy A" << std::endl;
    }
};

class ConcreteStrategyB : public Strategy {
public:
    void execute() override {
        std::cout << "Executing Strategy B" << std::endl;
    }
};

// 使用概念的上下文
template<typename T>
class ConceptContext {
private:
    T strategy;
    
public:
    ConceptContext(T s) : strategy(std::move(s)) {}
    
    void execute() {
        strategy.execute();
    }
};

// 策略执行器
template<Numeric T>
void executeNumericStrategy(NumericSortStrategy<T>& strategy, T& a, T& b) {
    strategy.sort(a, b);
}

template<Sortable T>
void executeContainerStrategy(ContainerSortStrategy<T>& strategy, T& container) {
    strategy.sort(container);
}

// 使用示例
int main() {
    // 传统策略模式
    std::unique_ptr<Strategy> strategy = std::make_unique<ConcreteStrategyA>();
    strategy->execute();
    
    std::cout << "\n--- Using concepts ---\n" << std::endl;
    
    // 使用概念的策略模式
    NumericSortStrategy<int> intStrategy;
    int a = 10, b = 5;
    executeNumericStrategy(intStrategy, a, b);
    
    std::vector<int> vec = {5, 2, 8, 1, 9};
    ContainerSortStrategy<std::vector<int>> vecStrategy;
    executeContainerStrategy(vecStrategy, vec);
    
    // 打印排序后的向量
    for (int num : vec) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### 工厂模式（Factory Pattern）

概念可以用于实现更安全的工厂模式：

```cpp
#include <iostream>
#include <memory>
#include <concepts>
#include <type_traits>

// 定义概念
template<typename T>
concept Product = requires {
    typename T::ProductType;
    { T::create() } -> std::convertible_to<typename T::ProductType*>;
};

template<typename T>
concept Cloneable = requires(const T& t) {
    { t.clone() } -> std::convertible_to<T*>;
};

// 产品基类
class BaseProduct {
public:
    virtual ~BaseProduct() = default;
    virtual void use() = 0;
    virtual BaseProduct* clone() const = 0;
};

// 具体产品类
class ConcreteProductA : public BaseProduct {
public:
    using ProductType = ConcreteProductA;
    
    void use() override {
        std::cout << "Using ConcreteProductA" << std::endl;
    }
    
    BaseProduct* clone() const override {
        return new ConcreteProductA(*this);
    }
    
    static BaseProduct* create() {
        return new ConcreteProductA();
    }
};

class ConcreteProductB : public BaseProduct {
public:
    using ProductType = ConcreteProductB;
    
    void use() override {
        std::cout << "Using ConcreteProductB" << std::endl;
    }
    
    BaseProduct* clone() const override {
        return new ConcreteProductB(*this);
    }
    
    static BaseProduct* create() {
        return new ConcreteProductB();
    }
};

// 传统工厂
class TraditionalFactory {
public:
    enum class ProductType { TypeA, TypeB };
    
    std::unique_ptr<BaseProduct> createProduct(ProductType type) {
        switch (type) {
            case ProductType::TypeA:
                return std::unique_ptr<BaseProduct>(ConcreteProductA::create());
            case ProductType::TypeB:
                return std::unique_ptr<BaseProduct>(ConcreteProductB::create());
            default:
                return nullptr;
        }
    }
};

// 使用概念的工厂
template<Product T>
class ConceptFactory {
public:
    static std::unique_ptr<typename T::ProductType> create() {
        return std::unique_ptr<typename T::ProductType>(
            static_cast<typename T::ProductType*>(T::create())
        );
    }
};

// 克隆工厂
template<Cloneable T>
class CloneFactory {
public:
    static std::unique_ptr<T> clone(const T& prototype) {
        return std::unique_ptr<T>(prototype.clone());
    }
};

// 使用示例
int main() {
    // 传统工厂
    TraditionalFactory traditionalFactory;
    auto product1 = traditionalFactory.createProduct(TraditionalFactory::ProductType::TypeA);
    auto product2 = traditionalFactory.createProduct(TraditionalFactory::ProductType::TypeB);
    
    if (product1) product1->use();
    if (product2) product2->use();
    
    std::cout << "\n--- Using concepts ---\n" << std::endl;
    
    // 使用概念的工厂
    auto conceptProduct1 = ConceptFactory<ConcreteProductA>::create();
    auto conceptProduct2 = ConceptFactory<ConcreteProductB>::create();
    
    conceptProduct1->use();
    conceptProduct2->use();
    
    // 使用克隆工厂
    ConcreteProductA prototype;
    auto clonedProduct = CloneFactory<ConcreteProductA>::clone(prototype);
    clonedProduct->use();
    
    return 0;
}
```

### 实践意义

概念的引入极大地增强了C++模板编程的能力，它使模板代码更加清晰、可读，并且能够提供更好的错误信息。在设计模式实现中，概念特别适用于：
- 策略模式中的类型安全策略选择
- 工厂模式中的类型安全对象创建
- 模板方法模式中的类型安全算法
- 任何需要约束模板参数的场景

通过合理使用概念，开发者可以编写更加类型安全、表达力强的模板代码，减少编译错误并提高代码可维护性。

## 3.2 协程与异步模式

### 概念与原理

C++20引入了协程（Coroutines），它是一种可以暂停和恢复执行的函数，使得异步编程更加自然和直观。协程提供了一种编写异步代码的方式，而不需要使用回调和状态机。

协程的主要特点：
- 可以暂停和恢复执行
- 使异步代码看起来像同步代码
- 避免了回调地狱
- 提供了更好的错误处理机制
- 支持多种异步模式

### 设计模式应用

#### 观察者模式（Observer Pattern）

协程可以用于实现异步观察者模式：

```cpp
#include <iostream>
#include <coroutine>
#include <vector>
#include <memory>
#include <thread>
#include <chrono>

// 协程返回类型
template<typename T>
class Coroutine {
public:
    struct promise_type {
        T value;
        
        Coroutine get_return_object() {
            return Coroutine{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        
        void return_value(T val) {
            value = val;
        }
        
        void unhandled_exception() {
            std::terminate();
        }
    };
    
    std::coroutine_handle<promise_type> coro;
    
    Coroutine(std::coroutine_handle<promise_type> h) : coro(h) {}
    
    ~Coroutine() {
        if (coro) {
            coro.destroy();
        }
    }
    
    T get() {
        return coro.promise().value;
    }
};

// 异步事件源
class AsyncEventSource {
private:
    std::vector<std::function<void(int)>> observers;
    
public:
    void addObserver(std::function<void(int)> observer) {
        observers.push_back(std::move(observer));
    }
    
    void notify(int value) {
        for (const auto& observer : observers) {
            observer(value);
        }
    }
    
    // 异步生成事件
    Coroutine<void> generateEvents(int count) {
        for (int i = 0; i < count; ++i) {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
            notify(i);
            co_await std::suspend_always{};  // 暂停协程
        }
    }
};

// 传统观察者模式
class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(int value) = 0;
};

class ConcreteObserver : public Observer {
public:
    void update(int value) override {
        std::cout << "Observer received: " << value << std::endl;
    }
};

class Subject {
private:
    std::vector<std::unique_ptr<Observer>> observers;
    
public:
    void addObserver(std::unique_ptr<Observer> observer) {
        observers.push_back(std::move(observer));
    }
    
    void notify(int value) {
        for (const auto& observer : observers) {
            observer->update(value);
        }
    }
};

// 协程观察者
class CoroutineObserver {
private:
    int lastValue = 0;
    
public:
    Coroutine<void> observe(AsyncEventSource& source) {
        while (true) {
            // 等待事件
            co_await std::suspend_always{};
            
            // 处理事件
            std::cout << "Coroutine observer received: " << lastValue << std::endl;
        }
    }
    
    void setValue(int value) {
        lastValue = value;
    }
};

// 使用示例
int main() {
    // 传统观察者模式
    Subject subject;
    subject.addObserver(std::make_unique<ConcreteObserver>());
    
    for (int i = 0; i < 5; ++i) {
        subject.notify(i);
    }
    
    std::cout << "\n--- Using coroutines ---\n" << std::endl;
    
    // 使用协程的观察者模式
    AsyncEventSource asyncSource;
    
    // 创建协程观察者
    auto observer = std::make_unique<CoroutineObserver>();
    
    // 添加观察者
    asyncSource.addObserver([&observer](int value) {
        observer->setValue(value);
        // 恢复协程
        // 注意：实际实现需要更复杂的协程恢复机制
    });
    
    // 生成事件
    auto eventGenerator = asyncSource.generateEvents(5);
    
    // 等待事件完成
    std::this_thread::sleep_for(std::chrono::milliseconds(600));
    
    return 0;
}
```

#### 命令模式（Command Pattern）

协程可以用于实现异步命令模式：

```cpp
#include <iostream>
#include <coroutine>
#include <memory>
#include <vector>
#include <thread>
#include <chrono>
#include <queue>
#include <mutex>
#include <condition_variable>

// 简单的协程任务调度器
class TaskScheduler {
private:
    std::queue<std::function<void()>> tasks;
    std::mutex mutex;
    std::condition_variable cv;
    bool running = true;
    std::thread worker;
    
public:
    TaskScheduler() : worker([this] { run(); }) {}
    
    ~TaskScheduler() {
        {
            std::lock_guard<std::mutex> lock(mutex);
            running = false;
        }
        cv.notify_all();
        worker.join();
    }
    
    void schedule(std::function<void()> task) {
        {
            std::lock_guard<std::mutex> lock(mutex);
            tasks.push(std::move(task));
        }
        cv.notify_one();
    }
    
private:
    void run() {
        while (running) {
            std::unique_lock<std::mutex> lock(mutex);
            cv.wait(lock, [this] { return !tasks.empty() || !running; });
            
            if (!running) break;
            
            auto task = tasks.front();
            tasks.pop();
            lock.unlock();
            
            task();
        }
    }
};

// 协程任务
class Task {
public:
    struct promise_type {
        Task get_return_object() {
            return Task{std::coroutine_handle<promise_type>::from_promise(*this)};
        }
        
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() { std::terminate(); }
    };
    
    std::coroutine_handle<promise_type> coro;
    
    Task(std::coroutine_handle<promise_type> h) : coro(h) {}
    
    ~Task() {
        if (coro) {
            coro.destroy();
        }
    }
};

// 异步等待
struct AsyncAwaitable {
    TaskScheduler& scheduler;
    std::chrono::milliseconds duration;
    
    bool await_ready() const { return false; }
    
    void await_suspend(std::coroutine_handle<> handle) {
        scheduler.schedule([handle]() {
            std::this_thread::sleep_for(std::chrono::milliseconds(100));
            handle.resume();
        });
    }
    
    void await_resume() {}
};

// 传统命令模式
class Command {
public:
    virtual ~Command() = default;
    virtual void execute() = 0;
};

class ConcreteCommand : public Command {
private:
    std::string name;
    
public:
    ConcreteCommand(const std::string& n) : name(n) {}
    
    void execute() override {
        std::cout << "Executing command: " << name << std::endl;
    }
};

class Invoker {
private:
    std::vector<std::unique_ptr<Command>> commands;
    
public:
    void addCommand(std::unique_ptr<Command> command) {
        commands.push_back(std::move(command));
    }
    
    void executeCommands() {
        for (const auto& command : commands) {
            command->execute();
        }
    }
};

// 协程命令
class CoroutineCommand {
private:
    std::string name;
    TaskScheduler& scheduler;
    
public:
    CoroutineCommand(const std::string& n, TaskScheduler& s) : name(n), scheduler(s) {}
    
    Task executeAsync() {
        std::cout << "Starting async command: " << name << std::endl;
        
        // 异步等待
        co_await AsyncAwaitable{scheduler, std::chrono::milliseconds(100)};
        
        std::cout << "Finished async command: " << name << std::endl;
    }
};

// 协程命令调用者
class CoroutineInvoker {
private:
    TaskScheduler& scheduler;
    std::vector<std::unique_ptr<CoroutineCommand>> commands;
    
public:
    CoroutineInvoker(TaskScheduler& s) : scheduler(s) {}
    
    void addCommand(std::unique_ptr<CoroutineCommand> command) {
        commands.push_back(std::move(command));
    }
    
    void executeCommands() {
        for (const auto& command : commands) {
            command->executeAsync();
        }
    }
};

// 使用示例
int main() {
    // 传统命令模式
    Invoker invoker;
    invoker.addCommand(std::make_unique<ConcreteCommand>("Command 1"));
    invoker.addCommand(std::make_unique<ConcreteCommand>("Command 2"));
    invoker.addCommand(std::make_unique<ConcreteCommand>("Command 3"));
    
    invoker.executeCommands();
    
    std::cout << "\n--- Using coroutines ---\n" << std::endl;
    
    // 使用协程的命令模式
    TaskScheduler scheduler;
    CoroutineInvoker coroutineInvoker(scheduler);
    
    coroutineInvoker.addCommand(std::make_unique<CoroutineCommand>("Async Command 1", scheduler));
    coroutineInvoker.addCommand(std::make_unique<CoroutineCommand>("Async Command 2", scheduler));
    coroutineInvoker.addCommand(std::make_unique<CoroutineCommand>("Async Command 3", scheduler));
    
    coroutineInvoker.executeCommands();
    
    // 等待所有命令完成
    std::this_thread::sleep_for(std::chrono::milliseconds(500));
    
    return 0;
}
```

### 实践意义

协程的引入为C++提供了一种更自然的异步编程方式，它使异步代码看起来像同步代码，避免了回调地狱。在设计模式实现中，协程特别适用于：
- 观察者模式中的异步事件处理
- 命令模式中的异步命令执行
- 迭代器模式中的异步数据生成
- 任何需要异步操作的场景

通过合理使用协程，开发者可以编写更加简洁、可读性强的异步代码，提高程序的性能和响应性。

## 3.3 模块与接口设计

### 概念与原理

C++20引入了模块（Modules）系统，这是对传统头文件/源文件模型的一次重大改进。模块提供了一种更好的代码组织和依赖管理方式，可以显著提高编译速度，并提供更好的封装性。

模块的主要特点：
- 提供更好的封装性
- 减少编译时间
- 避免头文件包含的问题
- 提供更清晰的依赖关系
- 支持模块分区

### 设计模式应用

#### 外观模式（Facade Pattern）

模块可以用于实现更清晰的外观模式：

```cpp
// 传统外观模式
// facade.h
#ifndef FACADE_H
#define FACADE_H

#include "subsystem_a.h"
#include "subsystem_b.h"
#include "subsystem_c.h"

class Facade {
private:
    SubsystemA subsystemA;
    SubsystemB subsystemB;
    SubsystemC subsystemC;
    
public:
    Facade();
    void operation();
};

#endif // FACADE_H

// facade.cpp
#include "facade.h"

Facade::Facade() {}

void Facade::operation() {
    subsystemA.operationA();
    subsystemB.operationB();
    subsystemC.operationC();
}

// 使用模块的外观模式
// subsystem_a.ixx (模块接口)
export module subsystem_a;

export class SubsystemA {
public:
    void operationA();
};

// subsystem_a.cpp (模块实现)
module subsystem_a;

import <iostream>;

void SubsystemA::operationA() {
    std::cout << "Subsystem A operation" << std::endl;
}

// subsystem_b.ixx (模块接口)
export module subsystem_b;

export class SubsystemB {
public:
    void operationB();
};

// subsystem_b.cpp (模块实现)
module subsystem_b;

import <iostream>;

void SubsystemB::operationB() {
    std::cout << "Subsystem B operation" << std::endl;
}

// subsystem_c.ixx (模块接口)
export module subsystem_c;

export class SubsystemC {
public:
    void operationC();
};

// subsystem_c.cpp (模块实现)
module subsystem_c;

import <iostream>;

void SubsystemC::operationC() {
    std::cout << "Subsystem C operation" << std::endl;
}

// facade.ixx (模块接口)
export module facade;

import subsystem_a;
import subsystem_b;
import subsystem_c;

export class Facade {
private:
    SubsystemA subsystemA;
    SubsystemB subsystemB;
    SubsystemC subsystemC;
    
public:
    Facade();
    void operation();
};

// facade.cpp (模块实现)
module facade;

import <iostream>;
import facade;

Facade::Facade() {}

void Facade::operation() {
    subsystemA.operationA();
    subsystemB.operationB();
    subsystemC.operationC();
}

// main.cpp
import <iostream>;
import facade;

int main() {
    Facade facade;
    facade.operation();
    
    return 0;
}
```

#### 适配器模式（Adapter Pattern）

模块可以用于实现更清晰的适配器模式：

```cpp
// 传统适配器模式
// target.h
#ifndef TARGET_H
#define TARGET_H

class Target {
public:
    virtual ~Target() = default;
    virtual void request() = 0;
};

#endif // TARGET_H

// adaptee.h
#ifndef ADAPTEE_H
#define ADAPTEE_H

class Adaptee {
public:
    void specificRequest();
};

#endif // ADAPTEE_H

// adapter.h
#ifndef ADAPTER_H
#define ADAPTER_H

#include "target.h"
#include "adaptee.h"

class Adapter : public Target {
private:
    Adaptee adaptee;
    
public:
    void request() override;
};

#endif // ADAPTER_H

// 使用模块的适配器模式
// target.ixx (模块接口)
export module target;

export class Target {
public:
    virtual ~Target() = default;
    virtual void request() = 0;
};

// adaptee.ixx (模块接口)
export module adaptee;

export class Adaptee {
public:
    void specificRequest();
};

// adaptee.cpp (模块实现)
module adaptee;

import <iostream>;

void Adaptee::specificRequest() {
    std::cout << "Adaptee specific request" << std::endl;
}

// adapter.ixx (模块接口)
export module adapter;

import target;
import adaptee;

export class Adapter : public Target {
private:
    Adaptee adaptee;
    
public:
    void request() override;
};

// adapter.cpp (模块实现)
module adapter;

import <iostream>;
import adapter;

void Adapter::request() {
    std::cout << "Adapter: ";
    adaptee.specificRequest();
}

// main.cpp
import <iostream>;
import adapter;
import target;

void clientCode(std::unique_ptr<Target> target) {
    target->request();
}

int main() {
    std::unique_ptr<Target> adapter = std::make_unique<Adapter>();
    clientCode(std::move(adapter));
    
    return 0;
}
```

### 实践意义

模块的引入为C++提供了一种更好的代码组织和依赖管理方式，它显著提高了编译速度，并提供了更好的封装性。在设计模式实现中，模块特别适用于：
- 外观模式中的子系统封装
- 适配器模式中的接口适配
- 桥接模式中的接口与实现分离
- 任何需要清晰依赖关系的场景

通过合理使用模块，开发者可以编写更加模块化、可维护的代码，提高编译速度并减少依赖问题。

## 3.4 范围for循环增强

### 概念与原理

C++20对范围for循环进行了增强，引入了初始化语句，使得循环更加灵活和强大。这种增强允许在循环开始前初始化变量，提高了代码的可读性和简洁性。

范围for循环增强的主要特点：
- 支持初始化语句
- 提高代码可读性
- 减少变量作用域问题
- 使循环更加灵活

### 设计模式应用

#### 迭代器模式（Iterator Pattern）

范围for循环增强可以用于实现更简洁的迭代器模式：

```cpp
#include <iostream>
#include <vector>
#include <list>

// 传统迭代器模式
class Iterator {
public:
    virtual ~Iterator() = default;
    virtual bool hasNext() = 0;
    virtual int next() = 0;
};

class Container {
public:
    virtual ~Container() = default;
    virtual Iterator* createIterator() = 0;
};

class ConcreteIterator : public Iterator {
private:
    std::vector<int>& collection;
    size_t position = 0;
    
public:
    ConcreteIterator(std::vector<int>& c) : collection(c) {}
    
    bool hasNext() override {
        return position < collection.size();
    }
    
    int next() override {
        return collection[position++];
    }
};

class ConcreteContainer : public Container {
private:
    std::vector<int> items;
    
public:
    ConcreteContainer(const std::vector<int>& vals) : items(vals) {}
    
    Iterator* createIterator() override {
        return new ConcreteIterator(items);
    }
};

// 使用范围for循环增强的迭代器模式
template<typename T>
class ModernContainer {
private:
    std::vector<T> items;
    
public:
    ModernContainer(const std::vector<T>& vals) : items(vals) {}
    
    // 提供begin和end以支持范围for循环
    auto begin() { return items.begin(); }
    auto end() { return items.end(); }
    
    auto begin() const { return items.begin(); }
    auto end() const { return items.end(); }
    
    // 提供rbegin和rend以支持反向迭代
    auto rbegin() { return items.rbegin(); }
    auto rend() { return items.rend(); }
    
    // 获取容器大小
    size_t size() const { return items.size(); }
    
    // 访问元素
    T& operator[](size_t index) { return items[index]; }
    const T& operator[](size_t index) const { return items[index]; }
};

// 使用示例
int main() {
    // 传统迭代器模式
    std::vector<int> data = {1, 2, 3, 4, 5};
    ConcreteContainer container(data);
    
    Iterator* iterator = container.createIterator();
    std::cout << "Traditional Iterator Pattern: ";
    while (iterator->hasNext()) {
        std::cout << iterator->next() << " ";
    }
    std::cout << std::endl;
    
    delete iterator;
    
    std::cout << "\n--- Using enhanced range-based for loop ---\n" << std::endl;
    
    // 使用范围for循环增强的迭代器模式
    ModernContainer<int> modernContainer(data);
    
    // 基本范围for循环
    std::cout << "Basic range-based for loop: ";
    for (const auto& item : modernContainer) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    // 使用初始化语句的范围for循环
    std::cout << "Range-based for loop with init statement: ";
    for (size_t i = 0; const auto& item : modernContainer) {
        std::cout << "[" << i++ << "]:" << item << " ";
    }
    std::cout << std::endl;
    
    // 反向迭代
    std::cout << "Reverse iteration: ";
    for (const auto& item : std::ranges::reverse_view(modernContainer)) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    // 带条件的迭代
    std::cout << "Conditional iteration: ";
    for (size_t count = 0; const auto& item : modernContainer) {
        if (item % 2 == 0) {
            std::cout << item << " ";
            ++count;
            if (count >= 2) break;
        }
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### 组合模式（Composite Pattern）

范围for循环增强可以用于实现更简洁的组合模式：

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <string>

// 传统组合模式
class Component {
protected:
    std::string name;
    
public:
    Component(const std::string& n) : name(n) {}
    virtual ~Component() = default;
    
    virtual void operation() = 0;
    virtual void add(std::shared_ptr<Component> component) {}
    virtual void remove(std::shared_ptr<Component> component) {}
    virtual std::shared_ptr<Component> getChild(int index) { return nullptr; }
};

class Leaf : public Component {
public:
    Leaf(const std::string& n) : Component(n) {}
    
    void operation() override {
        std::cout << "Leaf " << name << " operation" << std::endl;
    }
};

class Composite : public Component {
private:
    std::vector<std::shared_ptr<Component>> children;
    
public:
    Composite(const std::string& n) : Component(n) {}
    
    void add(std::shared_ptr<Component> component) override {
        children.push_back(component);
    }
    
    void remove(std::shared_ptr<Component> component) override {
        // 简化实现，实际应该查找并删除
        if (!children.empty()) {
            children.pop_back();
        }
    }
    
    std::shared_ptr<Component> getChild(int index) override {
        if (index >= 0 && index < children.size()) {
            return children[index];
        }
        return nullptr;
    }
    
    void operation() override {
        std::cout << "Composite " << name << " operation" << std::endl;
        
        for (const auto& child : children) {
            child->operation();
        }
    }
};

// 使用范围for循环增强的组合模式
class ModernComponent {
protected:
    std::string name;
    
public:
    ModernComponent(const std::string& n) : name(n) {}
    virtual ~ModernComponent() = default;
    
    virtual void operation() = 0;
    virtual void add(std::shared_ptr<ModernComponent> component) {}
    virtual void remove(std::shared_ptr<ModernComponent> component) {}
    
    const std::string& getName() const { return name; }
};

class ModernLeaf : public ModernComponent {
public:
    ModernLeaf(const std::string& n) : ModernComponent(n) {}
    
    void operation() override {
        std::cout << "Leaf " << name << " operation" << std::endl;
    }
};

class ModernComposite : public ModernComponent {
private:
    std::vector<std::shared_ptr<ModernComponent>> children;
    
public:
    ModernComposite(const std::string& n) : ModernComponent(n) {}
    
    void add(std::shared_ptr<ModernComponent> component) override {
        children.push_back(component);
    }
    
    void remove(std::shared_ptr<ModernComponent> component) override {
        // 简化实现，实际应该查找并删除
        if (!children.empty()) {
            children.pop_back();
        }
    }
    
    void operation() override {
        std::cout << "Composite " << name << " operation" << std::endl;
        
        // 使用范围for循环增强
        for (size_t index = 0; const auto& child : children) {
            std::cout << "  Child[" << index++ << "] (" << child->getName() << "): ";
            child->operation();
        }
    }
    
    // 提供迭代器支持以使用范围for循环
    auto begin() { return children.begin(); }
    auto end() { return children.end(); }
    
    auto begin() const { return children.begin(); }
    auto end() const { return children.end(); }
    
    // 获取子组件数量
    size_t getChildCount() const { return children.size(); }
    
    // 获取子组件
    std::shared_ptr<ModernComponent> getChild(size_t index) {
        if (index < children.size()) {
            return children[index];
        }
        return nullptr;
    }
};

// 使用示例
int main() {
    // 传统组合模式
    auto root = std::make_shared<Composite>("Root");
    auto leaf1 = std::make_shared<Leaf>("Leaf 1");
    auto leaf2 = std::make_shared<Leaf>("Leaf 2");
    auto composite1 = std::make_shared<Composite>("Composite 1");
    auto leaf3 = std::make_shared<Leaf>("Leaf 3");
    auto leaf4 = std::make_shared<Leaf>("Leaf 4");
    
    composite1->add(leaf3);
    composite1->add(leaf4);
    
    root->add(leaf1);
    root->add(composite1);
    root->add(leaf2);
    
    std::cout << "Traditional Composite Pattern:" << std::endl;
    root->operation();
    
    std::cout << "\n--- Using enhanced range-based for loop ---\n" << std::endl;
    
    // 使用范围for循环增强的组合模式
    auto modernRoot = std::make_shared<ModernComposite>("Modern Root");
    auto modernLeaf1 = std::make_shared<ModernLeaf>("Modern Leaf 1");
    auto modernLeaf2 = std::make_shared<ModernLeaf>("Modern Leaf 2");
    auto modernComposite1 = std::make_shared<ModernComposite>("Modern Composite 1");
    auto modernLeaf3 = std::make_shared<ModernLeaf>("Modern Leaf 3");
    auto modernLeaf4 = std::make_shared<ModernLeaf>("Modern Leaf 4");
    
    modernComposite1->add(modernLeaf3);
    modernComposite1->add(modernLeaf4);
    
    modernRoot->add(modernLeaf1);
    modernRoot->add(modernComposite1);
    modernRoot->add(modernLeaf2);
    
    std::cout << "Modern Composite Pattern:" << std::endl;
    modernRoot->operation();
    
    // 使用范围for循环遍历组合对象
    std::cout << "\nIterating over composite children:" << std::endl;
    for (size_t i = 0; const auto& child : *modernRoot) {
        std::cout << "Child[" << i++ << "]: " << child->getName() << std::endl;
    }
    
    // 使用范围for循环和条件
    std::cout << "\nIterating with condition:" << std::endl;
    for (size_t count = 0; const auto& child : *modernRoot) {
        if (child->getName().find("Leaf") != std::string::npos) {
            std::cout << "Leaf component: " << child->getName() << std::endl;
            ++count;
            if (count >= 2) break;
        }
    }
    
    return 0;
}
```

### 实践意义

范围for循环增强的引入使得C++的循环更加灵活和强大，它允许在循环开始前初始化变量，提高了代码的可读性和简洁性。在设计模式实现中，范围for循环增强特别适用于：
- 迭代器模式中的简洁迭代
- 组合模式中的组件遍历
- 访问者模式中的元素访问
- 任何需要遍历集合的场景

通过合理使用范围for循环增强，开发者可以编写更加简洁、可读性强的循环代码，减少变量作用域问题并提高代码质量。

## 3.5 三路比较运算符

### 概念与原理

C++20引入了三路比较运算符（Spaceship Operator `<=>`），它简化了比较操作的定义，使得自定义类型的比较更加直观和一致。三路比较运算符返回一个比较类别对象，可以用于确定两个值的小于、等于或大于关系。

三路比较运算符的主要特点：
- 简化比较操作的定义
- 提供一致的比较语义
- 自动生成其他比较运算符
- 支持自定义比较逻辑

### 设计模式应用

#### 策略模式（Strategy Pattern）

三路比较运算符可以用于实现更简洁的策略模式：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <compare>

// 传统策略模式
class ComparisonStrategy {
public:
    virtual ~ComparisonStrategy() = default;
    virtual int compare(int a, int b) = 0;
};

class AscendingStrategy : public ComparisonStrategy {
public:
    int compare(int a, int b) override {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
};

class DescendingStrategy : public ComparisonStrategy {
public:
    int compare(int a, int b) override {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    }
};

class Context {
private:
    std::unique_ptr<ComparisonStrategy> strategy;
    
public:
    Context(std::unique_ptr<ComparisonStrategy> s) : strategy(std::move(s)) {}
    
    void setStrategy(std::unique_ptr<ComparisonStrategy> s) {
        strategy = std::move(s);
    }
    
    void sort(std::vector<int>& data) {
        std::sort(data.begin(), data.end(), [this](int a, int b) {
            return strategy->compare(a, b) < 0;
        });
    }
};

// 使用三路比较运算符的策略模式
class ModernComparisonStrategy {
public:
    virtual ~ModernComparisonStrategy() = default;
    virtual std::strong_ordering compare(int a, int b) = 0;
};

class ModernAscendingStrategy : public ModernComparisonStrategy {
public:
    std::strong_ordering compare(int a, int b) override {
        return a <=> b;
    }
};

class ModernDescendingStrategy : public ModernComparisonStrategy {
public:
    std::strong_ordering compare(int a, int b) override {
        return b <=> a;
    }
};

class ModernContext {
private:
    std::unique_ptr<ModernComparisonStrategy> strategy;
    
public:
    ModernContext(std::unique_ptr<ModernComparisonStrategy> s) : strategy(std::move(s)) {}
    
    void setStrategy(std::unique_ptr<ModernComparisonStrategy> s) {
        strategy = std::move(s);
    }
    
    void sort(std::vector<int>& data) {
        std::sort(data.begin(), data.end(), [this](int a, int b) {
            return strategy->compare(a, b) < 0;
        });
    }
};

// 使用三路比较运算符的自定义类型
class Product {
private:
    std::string name;
    double price;
    int rating;
    
public:
    Product(const std::string& n, double p, int r) : name(n), price(p), rating(r) {}
    
    // 使用三路比较运算符定义比较逻辑
    std::strong_ordering operator<=>(const Product& other) const {
        // 首先按价格比较
        if (auto cmp = price <=> other.price; cmp != 0) {
            return cmp;
        }
        // 价格相同则按评分比较
        if (auto cmp = rating <=> other.rating; cmp != 0) {
            return cmp;
        }
        // 评分相同则按名称比较
        return name <=> other.name;
    }
    
    // 获取产品信息
    const std::string& getName() const { return name; }
    double getPrice() const { return price; }
    int getRating() const { return rating; }
    
    // 打印产品信息
    void print() const {
        std::cout << "Product: " << name << ", Price: $" << price << ", Rating: " << rating << std::endl;
    }
};

// 使用示例
int main() {
    // 传统策略模式
    std::vector<int> data = {5, 2, 8, 1, 9};
    
    Context context(std::make_unique<AscendingStrategy>());
    context.sort(data);
    
    std::cout << "Traditional Strategy Pattern (Ascending): ";
    for (int num : data) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    context.setStrategy(std::make_unique<DescendingStrategy>());
    context.sort(data);
    
    std::cout << "Traditional Strategy Pattern (Descending): ";
    for (int num : data) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\n--- Using three-way comparison operator ---\n" << std::endl;
    
    // 使用三路比较运算符的策略模式
    ModernContext modernContext(std::make_unique<ModernAscendingStrategy>());
    modernContext.sort(data);
    
    std::cout << "Modern Strategy Pattern (Ascending): ";
    for (int num : data) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    modernContext.setStrategy(std::make_unique<ModernDescendingStrategy>());
    modernContext.sort(data);
    
    std::cout << "Modern Strategy Pattern (Descending): ";
    for (int num : data) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // 使用三路比较运算符的自定义类型
    std::cout << "\nUsing three-way comparison with custom types:" << std::endl;
    
    std::vector<Product> products = {
        Product("Laptop", 999.99, 5),
        Product("Phone", 699.99, 4),
        Product("Tablet", 299.99, 4),
        Product("Monitor", 399.99, 5),
        Product("Keyboard", 99.99, 3)
    };
    
    // 排序产品
    std::sort(products.begin(), products.end());
    
    std::cout << "Products sorted by price, then rating, then name:" << std::endl;
    for (const auto& product : products) {
        product.print();
    }
    
    // 查找产品
    Product targetProduct("Mouse", 49.99, 4);
    auto it = std::lower_bound(products.begin(), products.end(), targetProduct);
    
    std::cout << "\nProducts with price >= " << targetProduct.getPrice() << ":" << std::endl;
    for (; it != products.end(); ++it) {
        it->print();
    }
    
    return 0;
}
```

#### 模板方法模式（Template Method Pattern）

三路比较运算符可以用于实现更简洁的模板方法模式：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <compare>

// 传统模板方法模式
class DataProcessor {
protected:
    virtual bool compare(const std::string& a, const std::string& b) = 0;
    
public:
    virtual ~DataProcessor() = default;
    
    void processData(std::vector<std::string>& data) {
        // 模板方法
        preprocessData(data);
        sortData(data);
        postprocessData(data);
    }
    
protected:
    void preprocessData(std::vector<std::string>& data) {
        std::cout << "Preprocessing data..." << std::endl;
        // 预处理逻辑
    }
    
    void sortData(std::vector<std::string>& data) {
        std::cout << "Sorting data..." << std::endl;
        std::sort(data.begin(), data.end(), [this](const std::string& a, const std::string& b) {
            return compare(a, b);
        });
    }
    
    void postprocessData(std::vector<std::string>& data) {
        std::cout << "Postprocessing data..." << std::endl;
        // 后处理逻辑
    }
};

class LengthProcessor : public DataProcessor {
protected:
    bool compare(const std::string& a, const std::string& b) override {
        return a.length() < b.length();
    }
};

class AlphabeticalProcessor : public DataProcessor {
protected:
    bool compare(const std::string& a, const std::string& b) override {
        return a < b;
    }
};

// 使用三路比较运算符的模板方法模式
class ModernDataProcessor {
protected:
    virtual std::strong_ordering compare(const std::string& a, const std::string& b) = 0;
    
public:
    virtual ~ModernDataProcessor() = default;
    
    void processData(std::vector<std::string>& data) {
        // 模板方法
        preprocessData(data);
        sortData(data);
        postprocessData(data);
    }
    
protected:
    void preprocessData(std::vector<std::string>& data) {
        std::cout << "Preprocessing data..." << std::endl;
        // 预处理逻辑
    }
    
    void sortData(std::vector<std::string>& data) {
        std::cout << "Sorting data..." << std::endl;
        std::sort(data.begin(), data.end(), [this](const std::string& a, const std::string& b) {
            return compare(a, b) < 0;
        });
    }
    
    void postprocessData(std::vector<std::string>& data) {
        std::cout << "Postprocessing data..." << std::endl;
        // 后处理逻辑
    }
};

class ModernLengthProcessor : public ModernDataProcessor {
protected:
    std::strong_ordering compare(const std::string& a, const std::string& b) override {
        return a.length() <=> b.length();
    }
};

class ModernAlphabeticalProcessor : public ModernDataProcessor {
protected:
    std::strong_ordering compare(const std::string& a, const std::string& b) override {
        return a <=> b;
    }
};

// 使用三路比较运算符的自定义字符串类
class CustomString {
private:
    std::string value;
    
public:
    CustomString(const std::string& val) : value(val) {}
    
    // 使用三路比较运算符定义比较逻辑
    std::strong_ordering operator<=>(const CustomString& other) const {
        // 首先按长度比较
        if (auto cmp = value.length() <=> other.value.length(); cmp != 0) {
            return cmp;
        }
        // 长度相同则按字母顺序比较
        return value <=> other.value;
    }
    
    // 获取字符串值
    const std::string& getValue() const { return value; }
    
    // 转换为字符串
    operator std::string() const { return value; }
};

// 使用示例
int main() {
    // 传统模板方法模式
    std::vector<std::string> data = {"apple", "banana", "cherry", "date", "elderberry"};
    
    LengthProcessor lengthProcessor;
    lengthProcessor.processData(data);
    
    std::cout << "Length Processor Result: ";
    for (const auto& item : data) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    AlphabeticalProcessor alphabeticalProcessor;
    alphabeticalProcessor.processData(data);
    
    std::cout << "Alphabetical Processor Result: ";
    for (const auto& item : data) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\n--- Using three-way comparison operator ---\n" << std::endl;
    
    // 使用三路比较运算符的模板方法模式
    ModernLengthProcessor modernLengthProcessor;
    modernLengthProcessor.processData(data);
    
    std::cout << "Modern Length Processor Result: ";
    for (const auto& item : data) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    ModernAlphabeticalProcessor modernAlphabeticalProcessor;
    modernAlphabeticalProcessor.processData(data);
    
    std::cout << "Modern Alphabetical Processor Result: ";
    for (const auto& item : data) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    // 使用三路比较运算符的自定义类型
    std::cout << "\nUsing three-way comparison with custom types:" << std::endl;
    
    std::vector<CustomString> customStrings = {
        CustomString("apple"),
        CustomString("banana"),
        CustomString("cherry"),
        CustomString("date"),
        CustomString("elderberry")
    };
    
    // 排序自定义字符串
    std::sort(customStrings.begin(), customStrings.end());
    
    std::cout << "Custom strings sorted by length, then alphabetically:" << std::endl;
    for (const auto& str : customStrings) {
        std::cout << str.getValue() << " ";
    }
    std::cout << std::endl;
    
    // 比较自定义字符串
    CustomString str1("hello");
    CustomString str2("world");
    CustomString str3("hi");
    
    std::cout << "\nComparing custom strings:" << std::endl;
    std::cout << "hello <=> world: " << ((str1 <=> str2) < 0 ? "less" : "greater or equal") << std::endl;
    std::cout << "hello <=> hi: " << ((str1 <=> str3) < 0 ? "less" : "greater or equal") << std::endl;
    std::cout << "hi <=> hello: " << ((str3 <=> str1) < 0 ? "less" : "greater or equal") << std::endl;
    
    return 0;
}
```

### 实践意义

三路比较运算符的引入简化了比较操作的定义，使得自定义类型的比较更加直观和一致。在设计模式实现中，三路比较运算符特别适用于：
- 策略模式中的比较策略
- 模板方法模式中的排序算法
- 装饰器模式中的比较装饰
- 任何需要自定义比较逻辑的场景

通过合理使用三路比较运算符，开发者可以编写更加简洁、一致的比较代码，减少重复的比较逻辑并提高代码可维护性。

## 3.6 std::format与格式化模式

### 概念与原理

C++20引入了`std::format`库，它提供了一种类型安全、高效且可扩展的字符串格式化方法。`std::format`借鉴了Python的格式化字符串语法，使得字符串格式化更加直观和易用。

`std::format`的主要特点：
- 类型安全的格式化
- 高效的格式化实现
- 可扩展的格式化机制
- 支持位置参数和命名参数
- 提供格式化错误检查

### 设计模式应用

#### 建造者模式（Builder Pattern）

`std::format`可以用于实现更简洁的建造者模式：

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <format>

// 传统建造者模式
class Product {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    void setPartA(const std::string& part) { partA = part; }
    void setPartB(const std::string& part) { partB = part; }
    void setPartC(const std::string& part) { partC = part; }
    
    void show() const {
        std::cout << "Product parts:" << std::endl;
        std::cout << "  Part A: " << partA << std::endl;
        std::cout << "  Part B: " << partB << std::endl;
        std::cout << "  Part C: " << partC << std::endl;
    }
};

class Builder {
protected:
    Product product;
    
public:
    virtual ~Builder() = default;
    virtual void buildPartA() = 0;
    virtual void buildPartB() = 0;
    virtual void buildPartC() = 0;
    
    Product getResult() { return product; }
};

class ConcreteBuilder : public Builder {
public:
    void buildPartA() override {
        product.setPartA("Standard Part A");
    }
    
    void buildPartB() override {
        product.setPartB("Standard Part B");
    }
    
    void buildPartC() override {
        product.setPartC("Standard Part C");
    }
};

class Director {
private:
    Builder* builder;
    
public:
    Director(Builder* b) : builder(b) {}
    
    void construct() {
        builder->buildPartA();
        builder->buildPartB();
        builder->buildPartC();
    }
};

// 使用std::format的建造者模式
class ModernProduct {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    void setPartA(const std::string& part) { partA = part; }
    void setPartB(const std::string& part) { partB = part; }
    void setPartC(const std::string& part) { partC = part; }
    
    void show() const {
        std::cout << std::format("Product parts:\n  Part A: {}\n  Part B: {}\n  Part C: {}\n", 
                                partA, partB, partC);
    }
    
    std::string getDescription() const {
        return std::format("Product with parts: {}, {}, {}", partA, partB, partC);
    }
};

class ModernBuilder {
protected:
    ModernProduct product;
    
public:
    virtual ~ModernBuilder() = default;
    virtual void buildPartA() = 0;
    virtual void buildPartB() = 0;
    virtual void buildPartC() = 0;
    
    ModernProduct getResult() { return product; }
};

class StandardBuilder : public ModernBuilder {
public:
    void buildPartA() override {
        product.setPartA("Standard Part A");
    }
    
    void buildPartB() override {
        product.setPartB("Standard Part B");
    }
    
    void buildPartC() override {
        product.setPartC("Standard Part C");
    }
};

class PremiumBuilder : public ModernBuilder {
public:
    void buildPartA() override {
        product.setPartA("Premium Part A");
    }
    
    void buildPartB() override {
        product.setPartB("Premium Part B");
    }
    
    void buildPartC() override {
        product.setPartC("Premium Part C");
    }
};

class ModernDirector {
private:
    ModernBuilder* builder;
    
public:
    ModernDirector(ModernBuilder* b) : builder(b) {}
    
    void construct() {
        builder->buildPartA();
        builder->buildPartB();
        builder->buildPartC();
    }
    
    void constructWithReport() {
        std::cout << "Building product with std::format support:\n";
        construct();
        auto product = builder->getResult();
        std::cout << std::format("Completed: {}\n", product.getDescription());
    }
};

// 使用示例
int main() {
    // 传统建造者模式
    ConcreteBuilder concreteBuilder;
    Director director(&concreteBuilder);
    
    director.construct();
    Product product = concreteBuilder.getResult();
    
    std::cout << "Traditional Builder Pattern:" << std::endl;
    product.show();
    
    std::cout << "\n--- Using std::format ---\n" << std::endl;
    
    // 使用std::format的建造者模式
    StandardBuilder standardBuilder;
    ModernDirector modernDirector(&standardBuilder);
    
    modernDirector.constructWithReport();
    
    PremiumBuilder premiumBuilder;
    ModernDirector premiumDirector(&premiumBuilder);
    
    premiumDirector.constructWithReport();
    
    return 0;
}
```

#### 模板方法模式（Template Method Pattern）

`std::format`可以用于实现更简洁的模板方法模式：

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <format>

// 传统模板方法模式
class DataReporter {
public:
    virtual ~DataReporter() = default;
    
    void generateReport(const std::vector<std::string>& data) {
        // 模板方法
        prepareReport();
        processData(data);
        formatReport();
        finalizeReport();
    }
    
protected:
    virtual void prepareReport() {
        std::cout << "Preparing report..." << std::endl;
    }
    
    virtual void processData(const std::vector<std::string>& data) {
        std::cout << "Processing data..." << std::endl;
        for (const auto& item : data) {
            std::cout << "  " << item << std::endl;
        }
    }
    
    virtual void formatReport() {
        std::cout << "Formatting report..." << std::endl;
    }
    
    virtual void finalizeReport() {
        std::cout << "Finalizing report..." << std::endl;
    }
};

class CSVReporter : public DataReporter {
protected:
    void processData(const std::vector<std::string>& data) override {
        std::cout << "Processing data as CSV..." << std::endl;
        for (size_t i = 0; i < data.size(); ++i) {
            std::cout << data[i];
            if (i < data.size() - 1) {
                std::cout << ", ";
            }
        }
        std::cout << std::endl;
    }
    
    void formatReport() override {
        std::cout << "Formatting as CSV report..." << std::endl;
    }
};

// 使用std::format的模板方法模式
class ModernDataReporter {
public:
    virtual ~ModernDataReporter() = default;
    
    void generateReport(const std::vector<std::string>& data) {
        // 模板方法
        prepareReport();
        processData(data);
        formatReport();
        finalizeReport();
    }
    
protected:
    virtual void prepareReport() {
        std::cout << std::format("Preparing report...\n");
    }
    
    virtual void processData(const std::vector<std::string>& data) {
        std::cout << std::format("Processing {} data items...\n", data.size());
        for (const auto& item : data) {
            std::cout << std::format("  {}\n", item);
        }
    }
    
    virtual void formatReport() {
        std::cout << std::format("Formatting report...\n");
    }
    
    virtual void finalizeReport() {
        std::cout << std::format("Finalizing report...\n");
    }
};

class JSONReporter : public ModernDataReporter {
private:
    std::string reportContent;
    
protected:
    void prepareReport() override {
        std::cout << std::format("Preparing JSON report...\n");
        reportContent = "{\n  \"data\": [\n";
    }
    
    void processData(const std::vector<std::string>& data) override {
        std::cout << std::format("Processing {} data items as JSON...\n", data.size());
        
        for (size_t i = 0; i < data.size(); ++i) {
            reportContent += std::format("    \"{}\"", data[i]);
            if (i < data.size() - 1) {
                reportContent += ",";
            }
            reportContent += "\n";
        }
        
        reportContent += "  ]\n}";
    }
    
    void formatReport() override {
        std::cout << std::format("Formatting as JSON report...\n");
        std::cout << reportContent << std::endl;
    }
    
    void finalizeReport() override {
        std::cout << std::format("Finalizing JSON report...\n");
    }
};

class XMLReporter : public ModernDataReporter {
private:
    std::string reportContent;
    
protected:
    void prepareReport() override {
        std::cout << std::format("Preparing XML report...\n");
        reportContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<data>\n";
    }
    
    void processData(const std::vector<std::string>& data) override {
        std::cout << std::format("Processing {} data items as XML...\n", data.size());
        
        for (const auto& item : data) {
            reportContent += std::format("  <item>{}</item>\n", item);
        }
        
        reportContent += "</data>";
    }
    
    void formatReport() override {
        std::cout << std::format("Formatting as XML report...\n");
        std::cout << reportContent << std::endl;
    }
    
    void finalizeReport() override {
        std::cout << std::format("Finalizing XML report...\n");
    }
};

// 使用示例
int main() {
    // 传统模板方法模式
    std::vector<std::string> data = {"Item 1", "Item 2", "Item 3"};
    
    DataReporter* reporter = new CSVReporter();
    reporter->generateReport(data);
    
    std::cout << "\n--- Using std::format ---\n" << std::endl;
    
    // 使用std::format的模板方法模式
    ModernDataReporter* jsonReporter = new JSONReporter();
    jsonReporter->generateReport(data);
    
    std::cout << std::endl;
    
    ModernDataReporter* xmlReporter = new XMLReporter();
    xmlReporter->generateReport(data);
    
    delete reporter;
    delete jsonReporter;
    delete xmlReporter;
    
    return 0;
}
```

#### 策略模式（Strategy Pattern）

`std::format`可以用于实现更简洁的策略模式：

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <format>
#include <memory>

// 传统策略模式
class FormattingStrategy {
public:
    virtual ~FormattingStrategy() = default;
    virtual std::string format(const std::string& text) = 0;
};

class UppercaseStrategy : public FormattingStrategy {
public:
    std::string format(const std::string& text) override {
        std::string result = text;
        for (char& c : result) {
            c = toupper(c);
        }
        return result;
    }
};

class LowercaseStrategy : public FormattingStrategy {
public:
    std::string format(const std::string& text) override {
        std::string result = text;
        for (char& c : result) {
            c = tolower(c);
        }
        return result;
    }
};

class TextFormatter {
private:
    std::unique_ptr<FormattingStrategy> strategy;
    
public:
    TextFormatter(std::unique_ptr<FormattingStrategy> s) : strategy(std::move(s)) {}
    
    void setStrategy(std::unique_ptr<FormattingStrategy> s) {
        strategy = std::move(s);
    }
    
    std::string formatText(const std::string& text) {
        return strategy->format(text);
    }
};

// 使用std::format的策略模式
class ModernFormattingStrategy {
public:
    virtual ~ModernFormattingStrategy() = default;
    virtual std::string format(const std::string& text) = 0;
};

class TitleCaseStrategy : public ModernFormattingStrategy {
public:
    std::string format(const std::string& text) override {
        std::string result = text;
        bool newWord = true;
        
        for (char& c : result) {
            if (newWord && isalpha(c)) {
                c = toupper(c);
                newWord = false;
            } else if (isspace(c)) {
                newWord = true;
            } else {
                c = tolower(c);
            }
        }
        
        return result;
    }
};

class PrefixStrategy : public ModernFormattingStrategy {
private:
    std::string prefix;
    
public:
    PrefixStrategy(const std::string& p) : prefix(p) {}
    
    std::string format(const std::string& text) override {
        return std::format("{}: {}", prefix, text);
    }
};

class SuffixStrategy : public ModernFormattingStrategy {
private:
    std::string suffix;
    
public:
    SuffixStrategy(const std::string& s) : suffix(s) {}
    
    std::string format(const std::string& text) override {
        return std::format("{} ({})", text, suffix);
    }
};

class ModernTextFormatter {
private:
    std::unique_ptr<ModernFormattingStrategy> strategy;
    
public:
    ModernTextFormatter(std::unique_ptr<ModernFormattingStrategy> s) : strategy(std::move(s)) {}
    
    void setStrategy(std::unique_ptr<ModernFormattingStrategy> s) {
        strategy = std::move(s);
    }
    
    std::string formatText(const std::string& text) {
        return strategy->format(text);
    }
    
    void formatAndPrint(const std::string& text) {
        std::cout << std::format("Formatted text: {}\n", formatText(text));
    }
};

// 使用示例
int main() {
    // 传统策略模式
    TextFormatter formatter(std::make_unique<UppercaseStrategy>());
    
    std::string text = "Hello World";
    std::cout << "Traditional Strategy Pattern:" << std::endl;
    std::cout << "Original: " << text << std::endl;
    std::cout << "Uppercase: " << formatter.formatText(text) << std::endl;
    
    formatter.setStrategy(std::make_unique<LowercaseStrategy>());
    std::cout << "Lowercase: " << formatter.formatText(text) << std::endl;
    
    std::cout << "\n--- Using std::format ---\n" << std::endl;
    
    // 使用std::format的策略模式
    ModernTextFormatter modernFormatter(std::make_unique<TitleCaseStrategy>());
    
    std::cout << "Modern Strategy Pattern:" << std::endl;
    std::cout << "Original: " << text << std::endl;
    modernFormatter.formatAndPrint(text);
    
    modernFormatter.setStrategy(std::make_unique<PrefixStrategy>("INFO"));
    modernFormatter.formatAndPrint(text);
    
    modernFormatter.setStrategy(std::make_unique<SuffixStrategy("Important"));
    modernFormatter.formatAndPrint(text);
    
    return 0;
}
```

### 实践意义

`std::format`的引入为C++提供了一种类型安全、高效且可扩展的字符串格式化方法，它使得字符串格式化更加直观和易用。在设计模式实现中，`std::format`特别适用于：
- 建造者模式中的字符串构建
- 模板方法模式中的报告生成
- 策略模式中的格式化策略
- 任何需要字符串格式化的场景

通过合理使用`std::format`，开发者可以编写更加类型安全、高效的字符串格式化代码，减少格式化错误并提高代码可读性。

## 4. 模板元编程与设计模式

模板元编程（Template Metaprogramming, TMP）是C++中一种强大的编程技术，它利用模板在编译时执行计算和类型操作。模板元编程将C++编译器转变为一个图灵完备的函数式编程语言，允许在编译期间完成复杂的计算和类型决策。这种技术与设计模式的结合，能够产生高度优化、类型安全且零运行时开销的代码实现。

## 4.1 SFINAE与类型特征

### 概念与原理

SFINAE（Substitution Failure Is Not An Error，替换失败并非错误）是C++模板编程中的一个核心概念，它允许在模板参数替换失败时不产生编译错误，而是简单地从重载候选集中移除该模板。这一机制为类型特征的检测和条件编译提供了强大支持。

SFINAE的基本原理是：当模板参数替换导致无效类型或表达式时，编译器不会报错，而是忽略该模板特化。C++11通过`<type_traits>`头文件提供了一组标准类型特征，使SFINAE的使用更加便捷。C++17引入的`if constexpr`进一步简化了SFINAE的应用，使代码更加清晰易读。

### 设计模式应用

#### 策略模式（Strategy Pattern）

SFINAE可以用于实现编译时策略选择：

```cpp
#include <iostream>
#include <type_traits>
#include <string>

// 传统策略模式
class SortStrategy {
public:
    virtual ~SortStrategy() = default;
    virtual void sort(int* arr, size_t size) = 0;
};

class BubbleSortStrategy : public SortStrategy {
public:
    void sort(int* arr, size_t size) override {
        std::cout << "Using bubble sort" << std::endl;
        // 简化的冒泡排序实现
        for (size_t i = 0; i < size - 1; ++i) {
            for (size_t j = 0; j < size - i - 1; ++j) {
                if (arr[j] > arr[j + 1]) {
                    std::swap(arr[j], arr[j + 1]);
                }
            }
        }
    }
};

class QuickSortStrategy : public SortStrategy {
public:
    void sort(int* arr, size_t size) override {
        std::cout << "Using quick sort" << std::endl;
        // 简化的快速排序实现
        quickSortHelper(arr, 0, size - 1);
    }
    
private:
    void quickSortHelper(int* arr, int left, int right) {
        if (left >= right) return;
        
        int pivot = arr[(left + right) / 2];
        int i = left, j = right;
        
        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (arr[j] > pivot) j--;
            
            if (i <= j) {
                std::swap(arr[i], arr[j]);
                i++;
                j--;
            }
        }
        
        quickSortHelper(arr, left, j);
        quickSortHelper(arr, i, right);
    }
};

class Sorter {
private:
    SortStrategy* strategy;
    
public:
    Sorter(SortStrategy* s) : strategy(s) {}
    
    void setStrategy(SortStrategy* s) {
        strategy = s;
    }
    
    void sort(int* arr, size_t size) {
        strategy->sort(arr, size);
    }
};

// 使用SFINAE的编译时策略选择
template<typename T>
class SortSelector {
private:
    // 检测类型是否具有随机访问迭代器
    template<typename U>
    static auto test(int) -> decltype(
        std::declval<typename U::iterator>() + 1,
        std::true_type{}
    );
    
    template<typename>
    static std::false_type test(...);
    
public:
    // 根据类型特性选择排序算法
    static constexpr bool hasRandomAccess = decltype(test<T>(0))::value;
    
    template<typename Container>
    static void sort(Container& container) {
        if constexpr (hasRandomAccess) {
            std::cout << "Using quick sort for random access container" << std::endl;
            quickSort(container);
        } else {
            std::cout << "Using insertion sort for non-random access container" << std::endl;
            insertionSort(container);
        }
    }
    
private:
    template<typename Container>
    static void quickSort(Container& container) {
        // 简化的快速排序实现
        if (container.size() <= 1) return;
        
        auto pivot = container[container.size() / 2];
        size_t i = 0, j = container.size() - 1;
        
        while (i <= j) {
            while (container[i] < pivot) i++;
            while (container[j] > pivot) j--;
            
            if (i <= j) {
                std::swap(container[i], container[j]);
                i++;
                j--;
            }
        }
        
        // 递归排序左右两部分
        Container left(container.begin(), container.begin() + j + 1);
        Container right(container.begin() + i, container.end());
        
        quickSort(left);
        quickSort(right);
        
        // 合并结果
        container.clear();
        container.insert(container.end(), left.begin(), left.end());
        container.insert(container.end(), right.begin(), right.end());
    }
    
    template<typename Container>
    static void insertionSort(Container& container) {
        // 简化的插入排序实现
        if (container.empty()) return;
        
        for (auto it = std::next(container.begin()); it != container.end(); ++it) {
            auto value = *it;
            auto pos = it;
            
            while (pos != container.begin() && *(std::prev(pos)) > value) {
                *pos = *(std::prev(pos));
                --pos;
            }
            
            *pos = value;
        }
    }
};

// 使用示例
int main() {
    // 传统策略模式
    int arr[] = {5, 2, 8, 1, 9, 3};
    size_t size = sizeof(arr) / sizeof(arr[0]);
    
    Sorter sorter(new BubbleSortStrategy());
    sorter.sort(arr, size);
    
    sorter.setStrategy(new QuickSortStrategy());
    sorter.sort(arr, size);
    
    std::cout << "\n--- Using SFINAE for compile-time strategy selection ---\n" << std::endl;
    
    // 使用SFINAE的编译时策略选择
    std::vector<int> vec = {5, 2, 8, 1, 9, 3};
    SortSelector<std::vector<int>>::sort(vec);
    
    std::cout << "Sorted vector: ";
    for (int val : vec) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    std::list<int> lst = {5, 2, 8, 1, 9, 3};
    SortSelector<std::list<int>>::sort(lst);
    
    std::cout << "Sorted list: ";
    for (int val : lst) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 实践意义

SFINAE和类型特征的结合为C++提供了强大的编译时类型检查和条件编译能力。在设计模式实现中，SFINAE特别适用于：
- 策略模式中的编译时策略选择
- 工厂模式中的类型安全构造
- 访问者模式中的类型特化处理
- 任何需要根据类型特性进行编译时决策的场景

通过合理使用SFINAE，开发者可以编写更加类型安全、高效的代码，在编译时捕获类型错误，减少运行时开销。

## 4.2 模板特化与策略模式

### 概念与原理

模板特化是C++模板编程的核心机制之一，它允许为特定类型或类型模式提供专门的模板实现。模板特化分为完全特化和部分特化两种形式：

1. **完全特化**：为特定类型提供完全替代的模板实现
2. **部分特化**：为部分模板参数提供特化，其余参数保持泛型

模板特化与策略模式的结合，可以在编译时根据类型信息选择最优的实现策略，实现零运行时开销的策略选择。这种技术特别适用于性能敏感的代码，如数值计算、图形渲染等领域。

### 设计模式应用

#### 策略模式（Strategy Pattern）

模板特化可以用于实现类型安全的策略模式：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <cmath>

// 传统策略模式
class CalculationStrategy {
public:
    virtual ~CalculationStrategy() = default;
    virtual double calculate(double a, double b) = 0;
};

class AdditionStrategy : public CalculationStrategy {
public:
    double calculate(double a, double b) override {
        return a + b;
    }
};

class MultiplicationStrategy : public CalculationStrategy {
public:
    double calculate(double a, double b) override {
        return a * b;
    }
};

class PowerStrategy : public CalculationStrategy {
public:
    double calculate(double a, double b) override {
        return std::pow(a, b);
    }
};

class Calculator {
private:
    CalculationStrategy* strategy;
    
public:
    Calculator(CalculationStrategy* s) : strategy(s) {}
    
    void setStrategy(CalculationStrategy* s) {
        strategy = s;
    }
    
    double calculate(double a, double b) {
        return strategy->calculate(a, b);
    }
};

// 使用模板特化的策略模式
// 基础策略模板
template<typename T>
class CalculationStrategyT {
public:
    static T calculate(T a, T b) {
        // 默认实现：加法
        return a + b;
    }
};

// 针对int类型的特化：乘法
template<>
class CalculationStrategyT<int> {
public:
    static int calculate(int a, int b) {
        std::cout << "Using specialized int strategy (multiplication)" << std::endl;
        return a * b;
    }
};

// 针对double类型的特化：幂运算
template<>
class CalculationStrategyT<double> {
public:
    static double calculate(double a, double b) {
        std::cout << "Using specialized double strategy (power)" << std::endl;
        return std::pow(a, b);
    }
};

// 针对std::string类型的特化：连接
template<>
class CalculationStrategyT<std::string> {
public:
    static std::string calculate(const std::string& a, const std::string& b) {
        std::cout << "Using specialized string strategy (concatenation)" << std::endl;
        return a + b;
    }
};

// 使用模板特化的计算器
template<typename T>
class CalculatorT {
public:
    static T calculate(T a, T b) {
        return CalculationStrategyT<T>::calculate(a, b);
    }
};

// 更高级的模板特化策略模式
// 基础策略模板，带有策略类型参数
template<typename T, typename Strategy = void>
class AdvancedCalculator;

// 默认策略
template<typename T>
class AdvancedCalculator<T, void> {
public:
    static T calculate(T a, T b) {
        std::cout << "Using default strategy" << std::endl;
        return a + b;
    }
};

// 加法策略
struct AdditionStrategyTag {};
template<typename T>
class AdvancedCalculator<T, AdditionStrategyTag> {
public:
    static T calculate(T a, T b) {
        std::cout << "Using addition strategy" << std::endl;
        return a + b;
    }
};

// 乘法策略
struct MultiplicationStrategyTag {};
template<typename T>
class AdvancedCalculator<T, MultiplicationStrategyTag> {
public:
    static T calculate(T a, T b) {
        std::cout << "Using multiplication strategy" << std::endl;
        return a * b;
    }
};

// 针对double类型的幂运算策略特化
template<>
class AdvancedCalculator<double, MultiplicationStrategyTag> {
public:
    static double calculate(double a, double b) {
        std::cout << "Using specialized double power strategy" << std::endl;
        return std::pow(a, b);
    }
};

// 使用示例
int main() {
    // 传统策略模式
    Calculator calculator(new AdditionStrategy());
    std::cout << "5 + 3 = " << calculator.calculate(5, 3) << std::endl;
    
    calculator.setStrategy(new MultiplicationStrategy());
    std::cout << "5 * 3 = " << calculator.calculate(5, 3) << std::endl;
    
    calculator.setStrategy(new PowerStrategy());
    std::cout << "5 ^ 3 = " << calculator.calculate(5, 3) << std::endl;
    
    std::cout << "\n--- Using template specialization for strategy pattern ---\n" << std::endl;
    
    // 使用模板特化的策略模式
    std::cout << "int calculation: " << CalculatorT<int>::calculate(5, 3) << std::endl;
    std::cout << "double calculation: " << CalculatorT<double>::calculate(5, 3) << std::endl;
    std::cout << "string calculation: " << CalculatorT<std::string>::calculate("Hello, ", "World!") << std::endl;
    
    std::cout << "\n--- Using advanced template specialization strategy pattern ---\n" << std::endl;
    
    // 使用高级模板特化策略模式
    std::cout << "int with default: " << AdvancedCalculator<int>::calculate(5, 3) << std::endl;
    std::cout << "int with addition: " << AdvancedCalculator<int, AdditionStrategyTag>::calculate(5, 3) << std::endl;
    std::cout << "int with multiplication: " << AdvancedCalculator<int, MultiplicationStrategyTag>::calculate(5, 3) << std::endl;
    
    std::cout << "double with default: " << AdvancedCalculator<double>::calculate(5, 3) << std::endl;
    std::cout << "double with addition: " << AdvancedCalculator<double, AdditionStrategyTag>::calculate(5, 3) << std::endl;
    std::cout << "double with multiplication: " << AdvancedCalculator<double, MultiplicationStrategyTag>::calculate(5, 3) << std::endl;
    
    return 0;
}
```

### 实践意义

模板特化为策略模式提供了编译时策略选择的能力，实现了零运行时开销的策略决策。这种技术特别适用于：
- 性能敏感的算法选择
- 类型特定的优化实现
- 编译时配置和定制
- 任何需要根据类型信息选择最优策略的场景

通过合理使用模板特化，开发者可以编写更加高效、类型安全的代码，在保持代码灵活性的同时获得最佳性能。

## 4.3 编译时递归与访问者模式

### 概念与原理

编译时递归是模板元编程中的核心技术，它利用模板实例化过程中的递归特性在编译期间执行计算。与运行时递归不同，编译时递归完全在编译阶段完成，不产生任何运行时开销，但受到编译器递归深度的限制。

编译时递归通常通过模板特化实现递归终止条件，通过递归模板实例化实现递归过程。C++11引入的`constexpr`函数和C++14的`constexpr`增强进一步简化了编译时递归的实现，使其更加直观和易用。

访问者模式（Visitor Pattern）是一种行为设计模式，它允许在不修改对象结构的前提下定义作用于这些对象的新操作。访问者模式将操作从对象结构中分离出来，使得可以添加新的操作而不需要修改现有的类结构。

### 设计模式应用

#### 访问者模式（Visitor Pattern）

编译时递归可以用于实现高效的访问者模式：

```cpp
#include <iostream>
#include <string>
#include <variant>
#include <vector>

// 传统访问者模式
class Element;
class ConcreteElementA;
class ConcreteElementB;

class Visitor {
public:
    virtual ~Visitor() = default;
    virtual void visitConcreteElementA(ConcreteElementA* element) = 0;
    virtual void visitConcreteElementB(ConcreteElementB* element) = 0;
};

class Element {
public:
    virtual ~Element() = default;
    virtual void accept(Visitor* visitor) = 0;
};

class ConcreteElementA : public Element {
public:
    void accept(Visitor* visitor) override {
        visitor->visitConcreteElementA(this);
    }
    
    void operationA() {
        std::cout << "ConcreteElementA operation" << std::endl;
    }
};

class ConcreteElementB : public Element {
public:
    void accept(Visitor* visitor) override {
        visitor->visitConcreteElementB(this);
    }
    
    void operationB() {
        std::cout << "ConcreteElementB operation" << std::endl;
    }
};

class ConcreteVisitor : public Visitor {
public:
    void visitConcreteElementA(ConcreteElementA* element) override {
        std::cout << "Visiting ConcreteElementA" << std::endl;
        element->operationA();
    }
    
    void visitConcreteElementB(ConcreteElementB* element) override {
        std::cout << "Visiting ConcreteElementB" << std::endl;
        element->operationB();
    }
};

// 使用编译时递归的访问者模式
// 元函数列表
template<typename... Ts>
struct TypeList {};

// 编译时访问者基础结构
template<typename List>
struct VisitorCT;

// 递归情况：处理类型列表中的第一个类型
template<typename Head, typename... Tail>
struct VisitorCT<TypeList<Head, Tail...>> : VisitorCT<TypeList<Tail...>> {
    using Base = VisitorCT<TypeList<Tail...>>;
    
    // 访问当前类型的函数
    void visit(Head& element) {
        std::cout << "Visiting " << typeid(Head).name() << std::endl;
        element.process();
    }
    
    // 继承基类的访问函数
    using Base::visit;
};

// 递归终止条件：空类型列表
template<>
struct VisitorCT<TypeList<>> {
    // 空实现，递归终止
};

// 元素基类
template<typename Derived>
class ElementCT {
public:
    // 接受访问者
    template<typename Visitor>
    void accept(Visitor& visitor) {
        visitor.visit(static_cast<Derived&>(*this));
    }
};

// 具体元素类型
class ElementACT : public ElementCT<ElementACT> {
public:
    void process() {
        std::cout << "ElementACT processing" << std::endl;
    }
};

class ElementBCT : public ElementCT<ElementBCT> {
public:
    void process() {
        std::cout << "ElementBCT processing" << std::endl;
    }
};

class ElementCCT : public ElementCT<ElementCCT> {
public:
    void process() {
        std::cout << "ElementCCT processing" << std::endl;
    }
};

// 使用std::variant和编译时递归的现代访问者模式
template<typename... Elements>
class ModernVisitor {
public:
    // 使用std::variant存储不同类型的元素
    using ElementVariant = std::variant<Elements...>;
    
    // 访问所有元素
    void visitAll(const std::vector<ElementVariant>& elements) {
        for (const auto& element : elements) {
            std::visit([this](const auto& elem) {
                visitElement(elem);
            }, element);
        }
    }
    
private:
    // 访问单个元素
    template<typename Element>
    void visitElement(const Element& element) {
        std::cout << "Visiting " << typeid(Element).name() << std::endl;
        element.process();
    }
};

// 具体元素类型
class ModernElementA {
public:
    void process() const {
        std::cout << "ModernElementA processing" << std::endl;
    }
};

class ModernElementB {
public:
    void process() const {
        std::cout << "ModernElementB processing" << std::endl;
    }
};

class ModernElementC {
public:
    void process() const {
        std::cout << "ModernElementC processing" << std::endl;
    }
};

// 使用示例
int main() {
    // 传统访问者模式
    std::vector<Element*> elements;
    elements.push_back(new ConcreteElementA());
    elements.push_back(new ConcreteElementB());
    
    Visitor* visitor = new ConcreteVisitor();
    
    for (Element* element : elements) {
        element->accept(visitor);
    }
    
    // 清理资源
    for (Element* element : elements) {
        delete element;
    }
    delete visitor;
    
    std::cout << "\n--- Using compile-time recursion for visitor pattern ---\n" << std::endl;
    
    // 使用编译时递归的访问者模式
    using ElementTypeList = TypeList<ElementACT, ElementBCT, ElementCCT>;
    VisitorCT<ElementTypeList> ctVisitor;
    
    ElementACT elementA;
    ElementBCT elementB;
    ElementCCT elementC;
    
    ctVisitor.visit(elementA);
    ctVisitor.visit(elementB);
    ctVisitor.visit(elementC);
    
    std::cout << "\n--- Using std::variant and compile-time recursion for modern visitor pattern ---\n" << std::endl;
    
    // 使用std::variant和编译时递归的现代访问者模式
    ModernVisitor<ModernElementA, ModernElementB, ModernElementC> modernVisitor;
    
    std::vector<ModernVisitor<ModernElementA, ModernElementB, ModernElementC>::ElementVariant> modernElements;
    modernElements.emplace_back(ModernElementA{});
    modernElements.emplace_back(ModernElementB{});
    modernElements.emplace_back(ModernElementC{});
    
    modernVisitor.visitAll(modernElements);
    
    return 0;
}
```

### 实践意义

编译时递归与访问者模式的结合，为处理复杂对象结构提供了高效、类型安全的解决方案。这种技术特别适用于：
- 编译时类型遍历和处理
- 静态多态的实现
- 类型安全的操作分发
- 任何需要在编译时处理类型列表的场景

通过合理使用编译时递归，开发者可以编写更加高效、灵活的访问者模式实现，在保持代码可读性的同时获得最佳性能。

## 4.4 类型列表与组合模式

### 概念与原理

类型列表（Type List）是模板元编程中的一种重要技术，它允许在编译时操作和处理类型序列。类型列表本质上是一个包含多个类型的容器，可以在编译时进行遍历、转换和查询等操作。类型列表通常通过可变参数模板实现，为编译时编程提供了强大的抽象能力。

组合模式（Composite Pattern）是一种结构型设计模式，它允许将对象组合成树形结构以表示"部分-整体"的层次结构。组合模式使得客户端对单个对象和组合对象的使用具有一致性，简化了客户端代码。

类型列表与组合模式的结合，可以在编译时构建和操作类型层次结构，实现静态的组合模式，为类型系统的扩展和定制提供了强大支持。

### 设计模式应用

#### 组合模式（Composite Pattern）

类型列表可以用于实现编译时的组合模式：

```cpp
#include <iostream>
#include <string>
#include <type_traits>

// 传统组合模式
class Component {
protected:
    std::string name;
    
public:
    Component(const std::string& n) : name(n) {}
    virtual ~Component() = default;
    
    virtual void operation() = 0;
    virtual void add(Component* component) {}
    virtual void remove(Component* component) {}
    virtual Component* getChild(int index) { return nullptr; }
    
    const std::string& getName() const { return name; }
};

class Leaf : public Component {
public:
    Leaf(const std::string& n) : Component(n) {}
    
    void operation() override {
        std::cout << "Leaf " << name << " operation" << std::endl;
    }
};

class Composite : public Component {
private:
    std::vector<Component*> children;
    
public:
    Composite(const std::string& n) : Component(n) {}
    
    ~Composite() {
        for (Component* child : children) {
            delete child;
        }
    }
    
    void add(Component* component) override {
        children.push_back(component);
    }
    
    void remove(Component* component) override {
        // 简化实现，实际应该查找并删除
        if (!children.empty()) {
            children.pop_back();
        }
    }
    
    Component* getChild(int index) override {
        if (index >= 0 && index < children.size()) {
            return children[index];
        }
        return nullptr;
    }
    
    void operation() override {
        std::cout << "Composite " << name << " operation" << std::endl;
        
        for (Component* child : children) {
            child->operation();
        }
    }
};

// 使用类型列表的编译时组合模式
// 类型列表定义
template<typename... Ts>
struct TypeList {};

// 获取类型列表的大小
template<typename List>
struct TypeListSize;

template<typename... Ts>
struct TypeListSize<TypeList<Ts...>> {
    static constexpr size_t value = sizeof...(Ts);
};

// 获取类型列表中的第N个类型
template<typename List, size_t N>
struct TypeAt;

template<typename Head, typename... Tail, size_t N>
struct TypeAt<TypeList<Head, Tail...>, N> {
    using type = typename TypeAt<TypeList<Tail...>, N - 1>::type;
};

template<typename Head, typename... Tail>
struct TypeAt<TypeList<Head, Tail...>, 0> {
    using type = Head;
};

// 编译时组件基类
template<typename Derived>
class ComponentCT {
public:
    virtual ~ComponentCT() = default;
    
    void operation() {
        static_cast<Derived*>(this)->operationImpl();
    }
};

// 编译时叶子节点
template<typename Name>
class LeafCT : public ComponentCT<LeafCT<Name>> {
public:
    void operationImpl() {
        std::cout << "LeafCT<" << typeid(Name).name() << "> operation" << std::endl;
    }
};

// 编译时组合节点
template<typename Name, typename... Children>
class CompositeCT : public ComponentCT<CompositeCT<Name, Children...>> {
private:
    std::tuple<ComponentCT<Children>*...> children;
    
public:
    CompositeCT(ComponentCT<Children>*... childs) : children(childs...) {}
    
    void operationImpl() {
        std::cout << "CompositeCT<" << typeid(Name).name() << "> operation" << std::endl;
        
        // 使用折叠表达式遍历所有子节点
        (std::get<ComponentCT<Children>*>(children)->operation(), ...);
    }
    
    // 获取第N个子节点
    template<size_t N>
    auto getChild() {
        return std::get<N>(children);
    }
};

// 更高级的编译时组合模式，支持类型列表操作
template<typename List>
struct CompositeBuilder;

template<typename... Types>
struct CompositeBuilder<TypeList<Types...>> {
    // 构建叶子节点列表
    template<typename Name>
    static auto buildLeaves(Name) {
        return std::make_tuple(new LeafCT<Types>()...);
    }
    
    // 构建组合节点
    template<typename Name, typename... Children>
    static auto buildComposite(Name, Children*... children) {
        return new CompositeCT<Name, Types...>(children...);
    }
};

// 使用示例
int main() {
    // 传统组合模式
    Component* root = new Composite("Root");
    root->add(new Leaf("Leaf 1"));
    
    Component* composite = new Composite("Composite 1");
    composite->add(new Leaf("Leaf 2"));
    composite->add(new Leaf("Leaf 3"));
    
    root->add(composite);
    root->add(new Leaf("Leaf 4"));
    
    std::cout << "Traditional Composite Pattern:" << std::endl;
    root->operation();
    
    // 清理资源
    delete root;
    
    std::cout << "\n--- Using type list for compile-time composite pattern ---\n" << std::endl;
    
    // 使用类型列表的编译时组合模式
    using ComponentTypes = TypeList<int, double, std::string>;
    
    // 创建叶子节点
    auto leaf1 = new LeafCT<int>();
    auto leaf2 = new LeafCT<double>();
    auto leaf3 = new LeafCT<std::string>();
    
    // 创建组合节点
    auto composite1 = new CompositeCT<std::string, int, double>(leaf1, leaf2);
    auto composite2 = new CompositeCT<int, std::string, double, std::string>(leaf3, composite1);
    
    std::cout << "Compile-time Composite Pattern:" << std::endl;
    composite2->operation();
    
    // 使用类型列表构建器
    std::cout << "\n--- Using type list builder ---\n" << std::endl;
    
    auto leaves = CompositeBuilder<ComponentTypes>::buildLeaves(0);
    auto compositeFromBuilder = CompositeBuilder<ComponentTypes>::buildComposite(0, 
        std::get<0>(leaves), std::get<1>(leaves), std::get<2>(leaves));
    
    std::cout << "Composite from builder:" << std::endl;
    compositeFromBuilder->operation();
    
    // 清理资源
    delete composite1;
    delete composite2;
    delete compositeFromBuilder;
    
    return 0;
}
```

### 实践意义

类型列表与组合模式的结合，为编译时构建和操作类型层次结构提供了强大支持。这种技术特别适用于：
- 编译时类型系统的构建和操作
- 静态多态的实现
- 类型安全的组合结构
- 任何需要在编译时处理类型层次结构的场景

通过合理使用类型列表，开发者可以编写更加灵活、类型安全的组合模式实现，在保持代码可读性的同时获得编译时优化的好处。

## 4.5 模板递归与建造者模式

### 概念与原理

模板递归是模板元编程中的核心技术之一，它利用模板实例化过程中的递归特性在编译期间执行复杂的计算和构建操作。与运行时递归不同，模板递归完全在编译阶段完成，不产生任何运行时开销，但受到编译器递归深度的限制。

建造者模式（Builder Pattern）是一种创建型设计模式，它将复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。建造者模式特别适用于创建具有多个组成部分的复杂对象，它允许用户只指定复杂对象的类型和内容，而不需要了解内部的具体构建细节。

模板递归与建造者模式的结合，可以在编译时构建复杂对象，实现零运行时开销的对象创建过程，同时保持代码的灵活性和可读性。

### 设计模式应用

#### 建造者模式（Builder Pattern）

模板递归可以用于实现编译时的建造者模式：

```cpp
#include <iostream>
#include <string>
#include <memory>
#include <tuple>

// 传统建造者模式
class Product {
private:
    std::string partA;
    std::string partB;
    std::string partC;
    
public:
    void setPartA(const std::string& part) { partA = part; }
    void setPartB(const std::string& part) { partB = part; }
    void setPartC(const std::string& part) { partC = part; }
    
    void show() const {
        std::cout << "Product parts:" << std::endl;
        std::cout << "  Part A: " << partA << std::endl;
        std::cout << "  Part B: " << partB << std::endl;
        std::cout << "  Part C: " << partC << std::endl;
    }
};

class Builder {
public:
    virtual ~Builder() = default;
    virtual void buildPartA() = 0;
    virtual void buildPartB() = 0;
    virtual void buildPartC() = 0;
    virtual Product* getResult() = 0;
};

class ConcreteBuilder : public Builder {
private:
    Product* product;
    
public:
    ConcreteBuilder() : product(new Product()) {}
    
    ~ConcreteBuilder() {
        delete product;
    }
    
    void buildPartA() override {
        product->setPartA("Part A");
    }
    
    void buildPartB() override {
        product->setPartB("Part B");
    }
    
    void buildPartC() override {
        product->setPartC("Part C");
    }
    
    Product* getResult() override {
        return product;
    }
};

class Director {
private:
    Builder* builder;
    
public:
    Director(Builder* b) : builder(b) {}
    
    void setBuilder(Builder* b) {
        builder = b;
    }
    
    void construct() {
        builder->buildPartA();
        builder->buildPartB();
        builder->buildPartC();
    }
};

// 使用模板递归的编译时建造者模式
// 部分类型定义
template<typename T>
struct Part {
    using type = T;
    T value;
    
    Part(const T& v) : value(v) {}
};

// 产品类型定义
template<typename... Parts>
class ProductCT {
private:
    std::tuple<Parts...> parts;
    
public:
    ProductCT(Parts... p) : parts(p...) {}
    
    template<size_t I>
    auto getPart() const {
        return std::get<I>(parts);
    }
    
    void show() const {
        std::cout << "ProductCT parts:" << std::endl;
        showParts<0>();
    }
    
private:
    template<size_t I>
    void showParts() const {
        if constexpr (I < sizeof...(Parts)) {
            std::cout << "  Part " << (I + 1) << ": " << std::get<I>(parts).value << std::endl;
            showParts<I + 1>();
        }
    }
};

// 编译时建造者基类
template<typename ProductType, size_t PartIndex = 0>
class BuilderCT {
public:
    using Product = ProductType;
    
    template<typename T>
    auto addPart(const T& value) {
        if constexpr (PartIndex < std::tuple_size_v<ProductType>) {
            using PartType = typename std::tuple_element<PartIndex, ProductType>::type;
            return BuilderCT<ProductType, PartIndex + 1>{};
        } else {
            static_assert(PartIndex < std::tuple_size_v<ProductType>, "Too many parts added");
            return *this;
        }
    }
    
    ProductType build() {
        static_assert(PartIndex == std::tuple_size_v<ProductType>, "Not all parts added");
        return ProductType{};
    }
};

// 更高级的编译时建造者模式，支持部分构建
template<typename... PartTypes>
class AdvancedBuilderCT {
private:
    std::tuple<PartTypes...> parts;
    
public:
    AdvancedBuilderCT() = default;
    
    template<typename T>
    auto withPart(const T& value) {
        if constexpr (sizeof...(PartTypes) > 0) {
            return AdvancedBuilderCT<PartTypes..., T>{std::tuple_cat(parts, std::make_tuple(value))};
        } else {
            return AdvancedBuilderCT<T>{std::make_tuple(value)};
        }
    }
    
    auto build() {
        return ProductCT<PartTypes...>{parts};
    }
};

// 使用示例
int main() {
    // 传统建造者模式
    Builder* builder = new ConcreteBuilder();
    Director director(builder);
    
    director.construct();
    Product* product = builder->getResult();
    
    std::cout << "Traditional Builder Pattern:" << std::endl;
    product->show();
    
    delete product;
    delete builder;
    
    std::cout << "\n--- Using template recursion for compile-time builder pattern ---\n" << std::endl;
    
    // 使用模板递归的编译时建造者模式
    using ProductType = ProductCT<Part<int>, Part<std::string>, Part<double>>;
    
    auto builderCT = BuilderCT<ProductType>{};
    auto productCT = builderCT.build();
    
    std::cout << "Compile-time Builder Pattern:" << std::endl;
    productCT.show();
    
    std::cout << "\n--- Using advanced compile-time builder pattern ---\n" << std::endl;
    
    // 使用高级编译时建造者模式
    auto advancedBuilder = AdvancedBuilderCT<>{};
    auto advancedProduct = advancedBuilder
        .withPart(Part<int>{42})
        .withPart(Part<std::string>{"Hello"})
        .withPart(Part<double>{3.14})
        .build();
    
    std::cout << "Advanced Compile-time Builder Pattern:" << std::endl;
    advancedProduct.show();
    
    return 0;
}
```

### 实践意义

模板递归与建造者模式的结合，为编译时构建复杂对象提供了强大支持。这种技术特别适用于：
- 编译时对象的构建和配置
- 零运行时开销的对象创建
- 类型安全的构建过程
- 任何需要在编译时构建复杂对象的场景

通过合理使用模板递归，开发者可以编写更加高效、类型安全的建造者模式实现，在保持代码灵活性的同时获得最佳性能。

## 4.6 编译时反射与工厂模式

### 概念与原理

编译时反射（Compile-time Reflection）是模板元编程中的高级技术，它允许在编译期间检查和操作类型信息。与运行时反射不同，编译时反射完全在编译阶段完成，不产生任何运行时开销，但受到C++语言反射能力的限制。

工厂模式（Factory Pattern）是一种创建型设计模式，它提供了一种创建对象的最佳方式。在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。

编译时反射与工厂模式的结合，可以在编译时根据类型信息创建对象，实现类型安全的工厂模式，同时保持代码的灵活性和可读性。

### 设计模式应用

#### 工厂模式（Factory Pattern）

编译时反射可以用于实现类型安全的工厂模式：

```cpp
#include <iostream>
#include <string>
#include <memory>
#include <unordered_map>
#include <functional>

// 传统工厂模式
class Product {
public:
    virtual ~Product() = default;
    virtual void operation() = 0;
};

class ConcreteProductA : public Product {
public:
    void operation() override {
        std::cout << "ConcreteProductA operation" << std::endl;
    }
};

class ConcreteProductB : public Product {
public:
    void operation() override {
        std::cout << "ConcreteProductB operation" << std::endl;
    }
};

class Factory {
private:
    std::unordered_map<std::string, std::function<std::unique_ptr<Product>()>> products;
    
public:
    template<typename T>
    void registerProduct(const std::string& name) {
        products[name] = []() { return std::make_unique<T>(); };
    }
    
    std::unique_ptr<Product> createProduct(const std::string& name) {
        auto it = products.find(name);
        if (it != products.end()) {
            return it->second();
        }
        return nullptr;
    }
};

// 使用编译时反射的工厂模式
// 类型特征检测
template<typename T>
struct is_product {
    static constexpr bool value = false;
};

template<>
struct is_product<ConcreteProductA> {
    static constexpr bool value = true;
};

template<>
struct is_product<ConcreteProductB> {
    static constexpr bool value = true;
};

// 编译时工厂
template<typename... Products>
class FactoryCT {
private:
    // 编译时产品注册表
    template<typename Product>
    static constexpr bool isRegistered = is_product<Product>::value;
    
    // 编译时产品创建
    template<typename Product>
    static std::unique_ptr<Product> create() {
        if constexpr (isRegistered<Product>) {
            return std::make_unique<Product>();
        } else {
            static_assert(isRegistered<Product>, "Product type not registered");
            return nullptr;
        }
    }
    
public:
    // 根据类型创建产品
    template<typename Product>
    static std::unique_ptr<Product> createProduct() {
        return create<Product>();
    }
    
    // 根据字符串名称创建产品（需要运行时支持）
    static std::unique_ptr<Product> createProduct(const std::string& name) {
        return createProductByName(name, Products{}...);
    }
    
private:
    // 递归终止条件
    static std::unique_ptr<Product> createProductByName(const std::string&) {
        return nullptr;
    }
    
    // 递归查找并创建产品
    template<typename Head, typename... Tail>
    static std::unique_ptr<Product> createProductByName(const std::string& name, Head, Tail... tail) {
        if (name == typeid(Head).name()) {
            return std::make_unique<Head>();
        }
        return createProductByName(name, tail...);
    }
};

// 更高级的编译时反射工厂模式
// 类型列表定义
template<typename... Ts>
struct TypeList {};

// 类型特征
template<typename T>
struct type_name {
    static constexpr const char* value = typeid(T).name();
};

// 编译时工厂注册表
template<typename ProductList>
class FactoryRegistry;

template<typename... Products>
class FactoryRegistry<TypeList<Products...>> {
private:
    // 编译时产品类型检查
    template<typename T>
    static constexpr bool hasProduct = (std::is_same_v<T, Products> || ...);
    
public:
    // 创建产品
    template<typename T>
    static std::unique_ptr<T> create() {
        static_assert(hasProduct<T>, "Product type not registered");
        return std::make_unique<T>();
    }
    
    // 获取产品类型数量
    static constexpr size_t productCount = sizeof...(Products);
    
    // 检查是否包含特定产品类型
    template<typename T>
    static constexpr bool contains = hasProduct<T>;
};

// 使用示例
int main() {
    // 传统工厂模式
    Factory factory;
    factory.registerProduct<ConcreteProductA>("ProductA");
    factory.registerProduct<ConcreteProductB>("ProductB");
    
    auto productA = factory.createProduct("ProductA");
    auto productB = factory.createProduct("ProductB");
    
    std::cout << "Traditional Factory Pattern:" << std::endl;
    if (productA) {
        productA->operation();
    }
    if (productB) {
        productB->operation();
    }
    
    std::cout << "\n--- Using compile-time reflection for factory pattern ---\n" << std::endl;
    
    // 使用编译时反射的工厂模式
    using ProductList = TypeList<ConcreteProductA, ConcreteProductB>;
    
    // 根据类型创建产品
    auto ctProductA = FactoryCT<ConcreteProductA, ConcreteProductB>::createProduct<ConcreteProductA>();
    auto ctProductB = FactoryCT<ConcreteProductA, ConcreteProductB>::createProduct<ConcreteProductB>();
    
    std::cout << "Compile-time Factory Pattern:" << std::endl;
    if (ctProductA) {
        ctProductA->operation();
    }
    if (ctProductB) {
        ctProductB->operation();
    }
    
    // 根据名称创建产品
    auto ctProductByName = FactoryCT<ConcreteProductA, ConcreteProductB>::createProduct("class ConcreteProductA");
    if (ctProductByName) {
        ctProductByName->operation();
    }
    
    std::cout << "\n--- Using advanced compile-time reflection factory pattern ---\n" << std::endl;
    
    // 使用高级编译时反射工厂模式
    auto advancedProductA = FactoryRegistry<ProductList>::create<ConcreteProductA>();
    auto advancedProductB = FactoryRegistry<ProductList>::create<ConcreteProductB>();
    
    std::cout << "Advanced Compile-time Factory Pattern:" << std::endl;
    if (advancedProductA) {
        advancedProductA->operation();
    }
    if (advancedProductB) {
        advancedProductB->operation();
    }
    
    // 编译时类型检查
    std::cout << "Product count: " << FactoryRegistry<ProductList>::productCount << std::endl;
    std::cout << "Contains ConcreteProductA: " << FactoryRegistry<ProductList>::contains<ConcreteProductA> << std::endl;
    std::cout << "Contains int: " << FactoryRegistry<ProductList>::contains<int> << std::endl;
    
    return 0;
}
```

### 实践意义

编译时反射与工厂模式的结合，为类型安全的对象创建提供了强大支持。这种技术特别适用于：
- 编译时类型安全的对象创建
- 零运行时开销的类型检查
- 类型安全的工厂注册
- 任何需要在编译时根据类型信息创建对象的场景

通过合理使用编译时反射，开发者可以编写更加高效、类型安全的工厂模式实现，在保持代码灵活性的同时获得最佳性能。

## 4.7 元函数与单例模式

### 概念与原理

元函数（Metafunction）是模板元编程中的核心概念，它是在编译时执行的"函数"，接受类型作为参数并返回类型或编译时常量。元函数通常通过模板特化实现，为编译时计算提供了强大的抽象能力。

单例模式（Singleton Pattern）是一种创建型设计模式，它保证一个类只有一个实例，并提供全局访问点。单例模式通常用于需要全局唯一对象的场景，如配置管理器、日志记录器等。

元函数与单例模式的结合，可以在编译时实现类型安全的单例模式，确保单例的唯一性和线程安全性，同时保持代码的简洁性和可读性。

### 设计模式应用

#### 单例模式（Singleton Pattern）

元函数可以用于实现编译时的单例模式：

```cpp
#include <iostream>
#include <memory>
#include <mutex>

// 传统单例模式
class Singleton {
private:
    static Singleton* instance;
    static std::mutex mutex;
    
    Singleton() = default;
    ~Singleton() = default;
    
    // 禁用拷贝构造和赋值
    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;
    
public:
    static Singleton* getInstance() {
        std::lock_guard<std::mutex> lock(mutex);
        
        if (instance == nullptr) {
            instance = new Singleton();
        }
        
        return instance;
    }
    
    void doSomething() {
        std::cout << "Singleton is doing something!" << std::endl;
    }
};

Singleton* Singleton::instance = nullptr;
std::mutex Singleton::mutex;

// 使用智能指针的改进单例模式
class SmartSingleton {
private:
    static std::unique_ptr<SmartSingleton> instance;
    static std::mutex mutex;
    
    SmartSingleton() = default;
    
public:
    ~SmartSingleton() = default;
    
    // 禁用拷贝构造和赋值
    SmartSingleton(const SmartSingleton&) = delete;
    SmartSingleton& operator=(const SmartSingleton&) = delete;
    
    static SmartSingleton& getInstance() {
        std::lock_guard<std::mutex> lock(mutex);
        
        if (instance == nullptr) {
            instance = std::unique_ptr<SmartSingleton>(new SmartSingleton());
        }
        
        return *instance;
    }
    
    void doSomething() {
        std::cout << "SmartSingleton is doing something!" << std::endl;
    }
};

std::unique_ptr<SmartSingleton> SmartSingleton::instance = nullptr;
std::mutex SmartSingleton::mutex;

// 使用元函数的编译时单例模式
// 单例特征元函数
template<typename T>
struct is_singleton {
    static constexpr bool value = false;
};

// 单例持有者元函数
template<typename T>
struct SingletonHolder {
    static T& instance() {
        static T instance;
        return instance;
    }
};

// 单例标记
template<typename T>
struct SingletonMarker {
    static constexpr bool isSingleton = true;
};

// 编译时单例基类
template<typename Derived>
class SingletonCT {
public:
    static Derived& getInstance() {
        static_assert(SingletonMarker<Derived>::isSingleton, "Type not marked as singleton");
        return SingletonHolder<Derived>::instance();
    }
    
protected:
    SingletonCT() = default;
    virtual ~SingletonCT() = default;
    
    // 禁用拷贝构造和赋值
    SingletonCT(const SingletonCT&) = delete;
    SingletonCT& operator=(const SingletonCT&) = delete;
};

// 具体单例类
class MySingleton : public SingletonCT<MySingleton> {
    friend class SingletonCT<MySingleton>;
    
private:
    MySingleton() = default;
    
public:
    void doSomething() {
        std::cout << "MySingleton is doing something!" << std::endl;
    }
};

// 标记为单例
template<>
struct SingletonMarker<MySingleton> {
    static constexpr bool isSingleton = true;
};

// 更高级的编译时单例模式，支持多态
// 单例接口
class ISingleton {
public:
    virtual ~ISingleton() = default;
    virtual void doSomething() = 0;
};

// 单例工厂元函数
template<typename Interface, typename Implementation>
struct SingletonFactory {
    static Interface& getInstance() {
        static_assert(std::is_base_of_v<Interface, Implementation>, 
                     "Implementation must inherit from Interface");
        
        static Implementation instance;
        return instance;
    }
};

// 具体实现
class ConcreteSingleton : public ISingleton {
public:
    void doSomething() override {
        std::cout << "ConcreteSingleton is doing something!" << std::endl;
    }
};

// 使用示例
int main() {
    // 传统单例模式
    Singleton* singleton1 = Singleton::getInstance();
    Singleton* singleton2 = Singleton::getInstance();
    
    std::cout << "Traditional Singleton Pattern:" << std::endl;
    std::cout << "Same instance: " << (singleton1 == singleton2) << std::endl;
    singleton1->doSomething();
    
    std::cout << "\n--- Using smart pointer singleton ---\n" << std::endl;
    
    // 使用智能指针的改进单例模式
    SmartSingleton& smartSingleton1 = SmartSingleton::getInstance();
    SmartSingleton& smartSingleton2 = SmartSingleton::getInstance();
    
    std::cout << "Smart Singleton Pattern:" << std::endl;
    std::cout << "Same instance: " << (&smartSingleton1 == &smartSingleton2) << std::endl;
    smartSingleton1.doSomething();
    
    std::cout << "\n--- Using metafunction for compile-time singleton pattern ---\n" << std::endl;
    
    // 使用元函数的编译时单例模式
    MySingleton& mySingleton1 = MySingleton::getInstance();
    MySingleton& mySingleton2 = MySingleton::getInstance();
    
    std::cout << "Compile-time Singleton Pattern:" << std::endl;
    std::cout << "Same instance: " << (&mySingleton1 == &mySingleton2) << std::endl;
    mySingleton1.doSomething();
    
    std::cout << "\n--- Using advanced compile-time singleton pattern with polymorphism ---\n" << std::endl;
    
    // 使用高级编译时单例模式，支持多态
    ISingleton& polySingleton1 = SingletonFactory<ISingleton, ConcreteSingleton>::getInstance();
    ISingleton& polySingleton2 = SingletonFactory<ISingleton, ConcreteSingleton>::getInstance();
    
    std::cout << "Advanced Compile-time Singleton Pattern:" << std::endl;
    std::cout << "Same instance: " << (&polySingleton1 == &polySingleton2) << std::endl;
    polySingleton1.doSomething();
    
    return 0;
}
```

### 实践意义

元函数与单例模式的结合，为编译时实现类型安全的单例模式提供了强大支持。这种技术特别适用于：
- 编译时保证单例的唯一性
- 线程安全的单例实现
- 类型安全的单例访问
- 任何需要在编译时确保对象唯一性的场景

通过合理使用元函数，开发者可以编写更加高效、类型安全的单例模式实现，在保持代码简洁性的同时获得最佳性能和安全性。

## 4.8 类型擦除与桥接模式

### 概念与原理

类型擦除（Type Erasure）是一种编程技术，它允许在保持类型安全的同时隐藏具体的类型信息。类型擦除通过多态、模板或其他机制实现，使得不同类型的对象可以通过统一的接口进行操作，而不需要暴露具体的类型信息。

桥接模式（Bridge Pattern）是一种结构型设计模式，它将抽象部分与实现部分分离，使它们都可以独立地变化。桥接模式通过组合关系代替继承关系，避免了继承层次的爆炸，提高了系统的灵活性和可扩展性。

类型擦除与桥接模式的结合，可以实现更加灵活的桥接模式，允许在运行时动态切换实现，同时保持类型安全和代码简洁性。

### 设计模式应用

#### 桥接模式（Bridge Pattern）

类型擦除可以用于实现更加灵活的桥接模式：

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include <functional>

// 传统桥接模式
class Implementor {
public:
    virtual ~Implementor() = default;
    virtual void operationImpl() = 0;
};

class ConcreteImplementorA : public Implementor {
public:
    void operationImpl() override {
        std::cout << "ConcreteImplementorA operation" << std::endl;
    }
};

class ConcreteImplementorB : public Implementor {
public:
    void operationImpl() override {
        std::cout << "ConcreteImplementorB operation" << std::endl;
    }
};

class Abstraction {
protected:
    Implementor* implementor;
    
public:
    Abstraction(Implementor* impl) : implementor(impl) {}
    virtual ~Abstraction() = default;
    
    virtual void operation() {
        implementor->operationImpl();
    }
};

class RefinedAbstraction : public Abstraction {
public:
    RefinedAbstraction(Implementor* impl) : Abstraction(impl) {}
    
    void operation() override {
        std::cout << "RefinedAbstraction operation: ";
        implementor->operationImpl();
    }
};

// 使用类型擦除的桥接模式
// 类型擦除实现器
class TypeErasedImplementor {
private:
    // 使用std::function实现类型擦除
    std::function<void()> operation;
    
public:
    template<typename T>
    TypeErasedImplementor(T&& impl) : 
        operation([impl = std::forward<T>(impl)]() { impl.operationImpl(); }) {}
    
    void operationImpl() {
        operation();
    }
};

// 具体实现器（不需要继承自公共基类）
class ModernImplementorA {
public:
    void operationImpl() {
        std::cout << "ModernImplementorA operation" << std::endl;
    }
};

class ModernImplementorB {
public:
    void operationImpl() {
        std::cout << "ModernImplementorB operation" << std::endl;
    }
};

// 使用类型擦除的抽象
class TypeErasedAbstraction {
private:
    TypeErasedImplementor implementor;
    
public:
    template<typename T>
    TypeErasedAbstraction(T&& impl) : implementor(std::forward<T>(impl)) {}
    
    void operation() {
        std::cout << "TypeErasedAbstraction operation: ";
        implementor.operationImpl();
    }
};

// 更高级的类型擦除桥接模式，支持多态
// 多态包装器
template<typename Signature>
class PolymorphicWrapper;

template<typename R, typename... Args>
class PolymorphicWrapper<R(Args...)> {
private:
    // 使用std::function实现类型擦除
    std::function<R(Args...)> callable;
    
public:
    template<typename F>
    PolymorphicWrapper(F&& f) : callable(std::forward<F>(f)) {}
    
    R operator()(Args... args) const {
        return callable(args...);
    }
};

// 高级抽象
class AdvancedAbstraction {
private:
    PolymorphicWrapper<void()> operation;
    PolymorphicWrapper<void(const std::string&)> specializedOperation;
    
public:
    template<typename Impl>
    AdvancedAbstraction(Impl&& impl) : 
        operation([&impl]() { impl.operationImpl(); }),
        specializedOperation([&impl](const std::string& param) { impl.specializedOperationImpl(param); }) {}
    
    void operation() {
        std::cout << "AdvancedAbstraction operation: ";
        operation();
    }
    
    void specializedOperation(const std::string& param) {
        std::cout << "AdvancedAbstraction specialized operation with param '" << param << "': ";
        specializedOperation(param);
    }
};

// 高级实现器
class AdvancedImplementorA {
public:
    void operationImpl() {
        std::cout << "AdvancedImplementorA operation" << std::endl;
    }
    
    void specializedOperationImpl(const std::string& param) {
        std::cout << "AdvancedImplementorA specialized operation with '" << param << "'" << std::endl;
    }
};

class AdvancedImplementorB {
public:
    void operationImpl() {
        std::cout << "AdvancedImplementorB operation" << std::endl;
    }
    
    void specializedOperationImpl(const std::string& param) {
        std::cout << "AdvancedImplementorB specialized operation with '" << param << "'" << std::endl;
    }
};

// 使用示例
int main() {
    // 传统桥接模式
    Implementor* implA = new ConcreteImplementorA();
    Implementor* implB = new ConcreteImplementorB();
    
    Abstraction abstraction(implA);
    RefinedAbstraction refinedAbstraction(implB);
    
    std::cout << "Traditional Bridge Pattern:" << std::endl;
    abstraction.operation();
    refinedAbstraction.operation();
    
    delete implA;
    delete implB;
    
    std::cout << "\n--- Using type erasure for bridge pattern ---\n" << std::endl;
    
    // 使用类型擦除的桥接模式
    ModernImplementorA modernImplA;
    ModernImplementorB modernImplB;
    
    TypeErasedAbstraction typeErasedAbstractionA(modernImplA);
    TypeErasedAbstraction typeErasedAbstractionB(modernImplB);
    
    std::cout << "Type Erasure Bridge Pattern:" << std::endl;
    typeErasedAbstractionA.operation();
    typeErasedAbstractionB.operation();
    
    std::cout << "\n--- Using advanced type erasure bridge pattern with polymorphism ---\n" << std::endl;
    
    // 使用高级类型擦除桥接模式，支持多态
    AdvancedImplementorA advancedImplA;
    AdvancedImplementorB advancedImplB;
    
    AdvancedAbstraction advancedAbstractionA(advancedImplA);
    AdvancedAbstraction advancedAbstractionB(advancedImplB);
    
    std::cout << "Advanced Type Erasure Bridge Pattern:" << std::endl;
    advancedAbstractionA.operation();
    advancedAbstractionA.specializedOperation("parameter A");
    
    advancedAbstractionB.operation();
    advancedAbstractionB.specializedOperation("parameter B");
    
    return 0;
}
```

### 实践意义

类型擦除与桥接模式的结合，为更加灵活的桥接模式实现提供了强大支持。这种技术特别适用于：
- 运行时动态切换实现
- 减少继承层次的复杂性
- 提高代码的灵活性和可扩展性
- 任何需要将抽象与实现分离的场景

通过合理使用类型擦除，开发者可以编写更加灵活、可维护的桥接模式实现，在保持类型安全的同时获得最大的灵活性。

## 4.9 constexpr函数与策略模式

### 概念与原理

`constexpr`是C++11引入的关键字，用于声明可以在编译时求值的函数或变量。C++14进一步放宽了`constexpr`函数的限制，允许使用局部变量、循环和条件语句等。`constexpr`函数为编译时计算提供了强大支持，使C++具有了更强的编译时编程能力。

策略模式（Strategy Pattern）是一种行为设计模式，它定义了一系列算法，并将每个算法封装起来，使它们可以互相替换。策略模式让算法的变化独立于使用算法的客户，提高了代码的灵活性和可维护性。

`constexpr`函数与策略模式的结合，可以在编译时选择和执行策略，实现零运行时开销的策略模式，同时保持代码的简洁性和可读性。

### 设计模式应用

#### 策略模式（Strategy Pattern）

`constexpr`函数可以用于实现编译时的策略模式：

```cpp
#include <iostream>
#include <string>
#include <array>

// 传统策略模式
class SortStrategy {
public:
    virtual ~SortStrategy() = default;
    virtual void sort(int* arr, size_t size) = 0;
};

class BubbleSortStrategy : public SortStrategy {
public:
    void sort(int* arr, size_t size) override {
        std::cout << "Using bubble sort" << std::endl;
        // 简化的冒泡排序实现
        for (size_t i = 0; i < size - 1; ++i) {
            for (size_t j = 0; j < size - i - 1; ++j) {
                if (arr[j] > arr[j + 1]) {
                    std::swap(arr[j], arr[j + 1]);
                }
            }
        }
    }
};

class SelectionSortStrategy : public SortStrategy {
public:
    void sort(int* arr, size_t size) override {
        std::cout << "Using selection sort" << std::endl;
        // 简化的选择排序实现
        for (size_t i = 0; i < size - 1; ++i) {
            size_t minIndex = i;
            for (size_t j = i + 1; j < size; ++j) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex != i) {
                std::swap(arr[i], arr[minIndex]);
            }
        }
    }
};

class Sorter {
private:
    SortStrategy* strategy;
    
public:
    Sorter(SortStrategy* s) : strategy(s) {}
    
    void setStrategy(SortStrategy* s) {
        strategy = s;
    }
    
    void sort(int* arr, size_t size) {
        strategy->sort(arr, size);
    }
};

// 使用constexpr函数的编译时策略模式
// 编译时排序策略
struct BubbleSortTag {};
struct SelectionSortTag {};
struct QuickSortTag {};

// constexpr冒泡排序
template<size_t N>
constexpr std::array<int, N> bubbleSort(std::array<int, N> arr) {
    for (size_t i = 0; i < N - 1; ++i) {
        for (size_t j = 0; j < N - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// constexpr选择排序
template<size_t N>
constexpr std::array<int, N> selectionSort(std::array<int, N> arr) {
    for (size_t i = 0; i < N - 1; ++i) {
        size_t minIndex = i;
        for (size_t j = i + 1; j < N; ++j) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

// constexpr快速排序
template<size_t N>
constexpr std::array<int, N> quickSortHelper(std::array<int, N> arr, int left, int right) {
    if (left >= right) {
        return arr;
    }
    
    int pivot = arr[(left + right) / 2];
    int i = left, j = right;
    
    while (i <= j) {
        while (arr[i] < pivot) i++;
        while (arr[j] > pivot) j--;
        
        if (i <= j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
    
    arr = quickSortHelper(arr, left, j);
    arr = quickSortHelper(arr, i, right);
    
    return arr;
}

template<size_t N>
constexpr std::array<int, N> quickSort(std::array<int, N> arr) {
    return quickSortHelper(arr, 0, N - 1);
}

// 编译时策略选择器
template<typename SortTag>
struct SortSelector;

template<>
struct SortSelector<BubbleSortTag> {
    template<size_t N>
    static constexpr std::array<int, N> sort(std::array<int, N> arr) {
        return bubbleSort(arr);
    }
};

template<>
struct SortSelector<SelectionSortTag> {
    template<size_t N>
    static constexpr std::array<int, N> sort(std::array<int, N> arr) {
        return selectionSort(arr);
    }
};

template<>
struct SortSelector<QuickSortTag> {
    template<size_t N>
    static constexpr std::array<int, N> sort(std::array<int, N> arr) {
        return quickSort(arr);
    }
};

// 更高级的constexpr策略模式，支持条件编译时选择
// 编译时条件策略选择器
template<size_t N>
constexpr auto selectSortStrategy(std::array<int, N> arr) {
    if constexpr (N <= 10) {
        return bubbleSort(arr);
    } else if constexpr (N <= 100) {
        return selectionSort(arr);
    } else {
        return quickSort(arr);
    }
}

// 使用示例
int main() {
    // 传统策略模式
    int arr[] = {5, 2, 8, 1, 9, 3};
    size_t size = sizeof(arr) / sizeof(arr[0]);
    
    Sorter sorter(new BubbleSortStrategy());
    sorter.sort(arr, size);
    
    std::cout << "Sorted array: ";
    for (size_t i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    sorter.setStrategy(new SelectionSortStrategy());
    sorter.sort(arr, size);
    
    std::cout << "Sorted array: ";
    for (size_t i = 0; i < size; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\n--- Using constexpr functions for compile-time strategy pattern ---\n" << std::endl;
    
    // 使用constexpr函数的编译时策略模式
    constexpr std::array<int, 6> arr1 = {5, 2, 8, 1, 9, 3};
    
    // 编译时排序
    constexpr auto sorted1 = SortSelector<BubbleSortTag>::sort(arr1);
    constexpr auto sorted2 = SortSelector<SelectionSortTag>::sort(arr1);
    constexpr auto sorted3 = SortSelector<QuickSortTag>::sort(arr1);
    
    std::cout << "Compile-time Bubble Sort: ";
    for (int val : sorted1) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Compile-time Selection Sort: ";
    for (int val : sorted2) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Compile-time Quick Sort: ";
    for (int val : sorted3) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\n--- Using advanced constexpr strategy pattern with conditional selection ---\n" << std::endl;
    
    // 使用高级constexpr策略模式，支持条件编译时选择
    constexpr std::array<int, 5> smallArray = {5, 2, 8, 1, 9};
    constexpr std::array<int, 50> mediumArray = {5, 2, 8, 1, 9, 3, 7, 4, 6, 0, 
                                               15, 12, 18, 11, 19, 13, 17, 14, 16, 10,
                                               25, 22, 28, 21, 29, 23, 27, 24, 26, 20,
                                               35, 32, 38, 31, 39, 33, 37, 34, 36, 30,
                                               45, 42, 48, 41, 49, 43, 47, 44, 46, 40};
    constexpr std::array<int, 150> largeArray = {5, 2, 8, 1, 9, 3, 7, 4, 6, 0, 
                                                15, 12, 18, 11, 19, 13, 17, 14, 16, 10,
                                                25, 22, 28, 21, 29, 23, 27, 24, 26, 20,
                                                35, 32, 38, 31, 39, 33, 37, 34, 36, 30,
                                                45, 42, 48, 41, 49, 43, 47, 44, 46, 40,
                                                55, 52, 58, 51, 59, 53, 57, 54, 56, 50,
                                                65, 62, 68, 61, 69, 63, 67, 64, 66, 60,
                                                75, 72, 78, 71, 79, 73, 77, 74, 76, 70,
                                                85, 82, 88, 81, 89, 83, 87, 84, 86, 80,
                                                95, 92, 98, 91, 99, 93, 97, 94, 96, 90,
                                                105, 102, 108, 101, 109, 103, 107, 104, 106, 100,
                                                115, 112, 118, 111, 119, 113, 117, 114, 116, 110,
                                                125, 122, 128, 121, 129, 123, 127, 124, 126, 120,
                                                135, 132, 138, 131, 139, 133, 137, 134, 136, 130,
                                                145, 142, 148, 141, 149, 143, 147, 144, 146, 140};
    
    // 编译时条件策略选择
    constexpr auto sortedSmall = selectSortStrategy(smallArray);
    constexpr auto sortedMedium = selectSortStrategy(mediumArray);
    constexpr auto sortedLarge = selectSortStrategy(largeArray);
    
    std::cout << "Conditional selection for small array (size " << smallArray.size() << "): ";
    for (size_t i = 0; i < std::min(size_t(10), sortedSmall.size()); ++i) {
        std::cout << sortedSmall[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Conditional selection for medium array (size " << mediumArray.size() << "): ";
    for (size_t i = 0; i < std::min(size_t(10), sortedMedium.size()); ++i) {
        std::cout << sortedMedium[i] << " ";
    }
    std::cout << std::endl;
    
    std::cout << "Conditional selection for large array (size " << largeArray.size() << "): ";
    for (size_t i = 0; i < std::min(size_t(10), sortedLarge.size()); ++i) {
        std::cout << sortedLarge[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### 实践意义

`constexpr`函数与策略模式的结合，为编译时策略选择和执行提供了强大支持。这种技术特别适用于：
- 编译时算法选择和优化
- 零运行时开销的策略实现
- 编译时条件策略选择
- 任何需要在编译时执行策略的场景

通过合理使用`constexpr`函数，开发者可以编写更加高效、灵活的策略模式实现，在保持代码可读性的同时获得最佳性能。

## 5. 函数式编程思想与设计模式

### 5.1 函数式编程基础

#### 概念原理

函数式编程是一种编程范式，它将计算视为数学函数的求值，避免状态改变和可变数据。函数式编程的核心概念包括：

1. **纯函数**：对于相同的输入，总是返回相同的输出，没有可观察到的副作用。
2. **不可变性**：数据一旦创建就不能被修改，任何修改都会创建新的数据结构。
3. **高阶函数**：可以接受函数作为参数或返回函数的函数。
4. **函数组合**：将多个函数组合成一个更复杂的函数。
5. **延迟计算**：表达式的求值被推迟到实际需要值的时候。

C++从C++11开始引入了对函数式编程的支持，包括Lambda表达式、std::function、std::bind等特性，并在后续版本中不断加强这些功能。

#### 设计模式应用

函数式编程思想可以与多种设计模式结合，下面我们以命令模式和策略模式为例，展示如何使用函数式编程思想来改进这些模式。

##### 命令模式的函数式实现

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <memory>
#include <string>
#include <algorithm>

// 传统命令模式实现
class Command {
public:
    virtual ~Command() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

class Light {
public:
    void turnOn() {
        std::cout << "Light is on" << std::endl;
        isOn = true;
    }
    
    void turnOff() {
        std::cout << "Light is off" << std::endl;
        isOn = false;
    }
    
    bool getState() const { return isOn; }
    
private:
    bool isOn = false;
};

class LightOnCommand : public Command {
public:
    LightOnCommand(Light* light) : light(light) {}
    
    void execute() override {
        light->turnOn();
    }
    
    void undo() override {
        light->turnOff();
    }
    
private:
    Light* light;
};

class LightOffCommand : public Command {
public:
    LightOffCommand(Light* light) : light(light) {}
    
    void execute() override {
        light->turnOff();
    }
    
    void undo() override {
        light->turnOn();
    }
    
private:
    Light* light;
};

class RemoteControl {
public:
    void setCommand(std::unique_ptr<Command> command) {
        this->command = std::move(command);
    }
    
    void pressButton() {
        if (command) {
            command->execute();
        }
    }
    
    void pressUndo() {
        if (command) {
            command->undo();
        }
    }
    
private:
    std::unique_ptr<Command> command;
};

// 函数式命令模式实现
class FunctionalRemoteControl {
public:
    using CommandFunction = std::function<void()>;
    using UndoFunction = std::function<void()>;
    
    void setCommand(CommandFunction executeFunc, UndoFunction undoFunc) {
        execute = executeFunc;
        undo = undoFunc;
    }
    
    void pressButton() {
        if (execute) {
            execute();
        }
    }
    
    void pressUndo() {
        if (undo) {
            undo();
        }
    }
    
private:
    CommandFunction execute;
    UndoFunction undo;
};

// 更高级的函数式命令模式，支持命令组合和链式操作
class AdvancedFunctionalRemote {
public:
    using CommandFunction = std::function<void()>;
    
    // 添加单个命令
    void addCommand(CommandFunction cmd) {
        commands.push_back(cmd);
    }
    
    // 添加命令组合
    void addCommands(std::initializer_list<CommandFunction> cmds) {
        for (auto& cmd : cmds) {
            commands.push_back(cmd);
        }
    }
    
    // 执行所有命令
    void executeAll() {
        for (auto& cmd : commands) {
            cmd();
        }
    }
    
    // 执行最后一个命令
    void executeLast() {
        if (!commands.empty()) {
            commands.back()();
        }
    }
    
    // 清除所有命令
    void clear() {
        commands.clear();
    }
    
    // 获取命令数量
    size_t commandCount() const {
        return commands.size();
    }
    
private:
    std::vector<CommandFunction> commands;
};

// 使用示例
int main() {
    std::cout << "--- Traditional Command Pattern ---\n" << std::endl;
    
    Light light;
    RemoteControl remote;
    
    remote.setCommand(std::make_unique<LightOnCommand>(&light));
    remote.pressButton();  // Light is on
    
    remote.pressUndo();    // Light is off
    
    remote.setCommand(std::make_unique<LightOffCommand>(&light));
    remote.pressButton();  // Light is off
    
    remote.pressUndo();    // Light is on
    
    std::cout << "\n--- Functional Command Pattern ---\n" << std::endl;
    
    FunctionalRemoteControl functionalRemote;
    
    // 使用Lambda表达式创建命令
    functionalRemote.setCommand(
        [&light]() { light.turnOn(); },  // execute function
        [&light]() { light.turnOff(); }   // undo function
    );
    
    functionalRemote.pressButton();  // Light is on
    functionalRemote.pressUndo();    // Light is off
    
    std::cout << "\n--- Advanced Functional Command Pattern ---\n" << std::endl;
    
    AdvancedFunctionalRemote advancedRemote;
    
    // 添加多个命令
    advancedRemote.addCommand([&light]() { light.turnOn(); });
    advancedRemote.addCommand([&light]() { std::cout << "Light state: " << (light.getState() ? "on" : "off") << std::endl; });
    advancedRemote.addCommand([&light]() { light.turnOff(); });
    advancedRemote.addCommand([&light]() { std::cout << "Light state: " << (light.getState() ? "on" : "off") << std::endl; });
    
    // 执行所有命令
    advancedRemote.executeAll();
    
    std::cout << "\n--- Command Composition with Functional Programming ---\n" << std::endl;
    
    // 命令组合
    AdvancedFunctionalRemote compositionRemote;
    
    // 使用std::bind和Lambda创建更复杂的命令组合
    auto toggleLight = [&light]() {
        if (light.getState()) {
            light.turnOff();
        } else {
            light.turnOn();
        }
    };
    
    auto printState = [&light]() {
        std::cout << "Light state: " << (light.getState() ? "on" : "off") << std::endl;
    };
    
    // 添加命令组合
    compositionRemote.addCommands({toggleLight, printState, toggleLight, printState});
    
    // 执行命令组合
    compositionRemote.executeAll();
    
    return 0;
}
```

##### 策略模式的函数式实现

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <algorithm>
#include <string>
#include <numeric>

// 传统策略模式实现
class SortStrategy {
public:
    virtual ~SortStrategy() = default;
    virtual void sort(std::vector<int>& data) = 0;
};

class BubbleSortStrategy : public SortStrategy {
public:
    void sort(std::vector<int>& data) override {
        size_t n = data.size();
        for (size_t i = 0; i < n - 1; ++i) {
            for (size_t j = 0; j < n - i - 1; ++j) {
                if (data[j] > data[j + 1]) {
                    std::swap(data[j], data[j + 1]);
                }
            }
        }
    }
};

class QuickSortStrategy : public SortStrategy {
public:
    void sort(std::vector<int>& data) override {
        quickSortHelper(data, 0, data.size() - 1);
    }
    
private:
    void quickSortHelper(std::vector<int>& data, int left, int right) {
        if (left >= right) return;
        
        int pivot = data[(left + right) / 2];
        int i = left, j = right;
        
        while (i <= j) {
            while (data[i] < pivot) i++;
            while (data[j] > pivot) j--;
            
            if (i <= j) {
                std::swap(data[i], data[j]);
                i++;
                j--;
            }
        }
        
        quickSortHelper(data, left, j);
        quickSortHelper(data, i, right);
    }
};

class SortContext {
public:
    void setStrategy(std::unique_ptr<SortStrategy> strategy) {
        this->strategy = std::move(strategy);
    }
    
    void performSort(std::vector<int>& data) {
        if (strategy) {
            strategy->sort(data);
        }
    }
    
private:
    std::unique_ptr<SortStrategy> strategy;
};

// 函数式策略模式实现
class FunctionalSorter {
public:
    using SortFunction = std::function<void(std::vector<int>&)>;
    
    void setStrategy(SortFunction sortFunc) {
        this->sortFunc = sortFunc;
    }
    
    void sort(std::vector<int>& data) {
        if (sortFunc) {
            sortFunc(data);
        }
    }
    
private:
    SortFunction sortFunc;
};

// 更高级的函数式策略模式，支持策略组合和链式操作
class AdvancedFunctionalSorter {
public:
    using SortFunction = std::function<void(std::vector<int>&)>;
    using FilterFunction = std::function<bool(int)>;
    using TransformFunction = std::function<int(int)>;
    
    // 设置排序策略
    void setSortStrategy(SortFunction sortFunc) {
        this->sortFunc = sortFunc;
    }
    
    // 添加过滤策略
    void addFilter(FilterFunction filterFunc) {
        filters.push_back(filterFunc);
    }
    
    // 添加转换策略
    void addTransform(TransformFunction transformFunc) {
        transforms.push_back(transformFunc);
    }
    
    // 执行完整的处理流程：过滤 -> 转换 -> 排序
    void process(std::vector<int>& data) {
        // 应用所有过滤器
        for (auto& filter : filters) {
            data.erase(
                std::remove_if(data.begin(), data.end(), 
                    [&filter](int value) { return !filter(value); }),
                data.end()
            );
        }
        
        // 应用所有转换器
        for (auto& transform : transforms) {
            std::transform(data.begin(), data.end(), data.begin(), transform);
        }
        
        // 应用排序策略
        if (sortFunc) {
            sortFunc(data);
        }
    }
    
    // 清除所有策略
    void clear() {
        sortFunc = nullptr;
        filters.clear();
        transforms.clear();
    }
    
private:
    SortFunction sortFunc;
    std::vector<FilterFunction> filters;
    std::vector<TransformFunction> transforms;
};

// 使用示例
int main() {
    std::cout << "--- Traditional Strategy Pattern ---\n" << std::endl;
    
    std::vector<int> data = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    SortContext context;
    
    context.setStrategy(std::make_unique<BubbleSortStrategy>());
    context.performSort(data);
    
    std::cout << "Sorted with Bubble Sort: ";
    for (int val : data) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    // 重置数据
    data = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    context.setStrategy(std::make_unique<QuickSortStrategy>());
    context.performSort(data);
    
    std::cout << "Sorted with Quick Sort: ";
    for (int val : data) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\n--- Functional Strategy Pattern ---\n" << std::endl;
    
    data = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    
    FunctionalSorter functionalSorter;
    
    // 使用Lambda表达式作为策略
    functionalSorter.setStrategy([](std::vector<int>& data) {
        std::sort(data.begin(), data.end());
    });
    
    functionalSorter.sort(data);
    
    std::cout << "Sorted with std::sort: ";
    for (int val : data) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    std::cout << "\n--- Advanced Functional Strategy Pattern ---\n" << std::endl;
    
    data = {5, 2, 8, 1, 9, 3, 7, 4, 6, 10, 15, 12, 18, 11, 13};
    
    AdvancedFunctionalSorter advancedSorter;
    
    // 设置排序策略
    advancedSorter.setSortStrategy([](std::vector<int>& data) {
        std::sort(data.begin(), data.end(), [](int a, int b) {
            return a > b;  // 降序排序
        });
    });
    
    // 添加过滤策略：只保留偶数
    advancedSorter.addFilter([](int value) {
        return value % 2 == 0;
    });
    
    // 添加转换策略：将每个值乘以2
    advancedSorter.addTransform([](int value) {
        return value * 2;
    });
    
    // 执行处理
    advancedSorter.process(data);
    
    std::cout << "Processed data (filtered even numbers, multiplied by 2, sorted descending): ";
    for (int val : data) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    // 清除并重新设置策略
    advancedSorter.clear();
    
    data = {5, 2, 8, 1, 9, 3, 7, 4, 6, 10, 15, 12, 18, 11, 13};
    
    // 设置新的排序策略
    advancedSorter.setSortStrategy([](std::vector<int>& data) {
        std::stable_sort(data.begin(), data.end());  // 稳定排序
    });
    
    // 添加过滤策略：只保留大于5的数
    advancedSorter.addFilter([](int value) {
        return value > 5;
    });
    
    // 添加转换策略：计算每个数的平方根并取整
    advancedSorter.addTransform([](int value) {
        return static_cast<int>(std::sqrt(value));
    });
    
    // 执行处理
    advancedSorter.process(data);
    
    std::cout << "Processed data (filtered >5, square root, stable sorted): ";
    for (int val : data) {
        std::cout << val << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### 实践意义

函数式编程思想为设计模式的实现提供了新的视角和工具：

1. **简化实现**：使用函数和高阶函数可以简化许多设计模式的实现，减少样板代码。
2. **提高灵活性**：函数式方法使模式的实现更加灵活，可以轻松组合和重用。
3. **增强可读性**：使用Lambda表达式和函数组合可以使代码更加简洁和易读。
4. **减少副作用**：纯函数和不可变性可以减少副作用，使代码更加可预测和易于测试。
5. **支持并行**：函数式编程的无状态特性使代码更容易并行化。

通过将函数式编程思想与设计模式结合，开发者可以编写更加简洁、灵活和可维护的代码。

### 5.2 Lambda表达式与函数式设计模式

#### 概念原理

Lambda表达式是C++11引入的一个重要特性，它允许在代码中创建匿名函数对象。Lambda表达式的基本语法如下：

```cpp
[capture](parameters) -> return_type { body }
```

其中：
- `capture`：捕获列表，指定如何访问外部变量
- `parameters`：参数列表
- `return_type`：返回类型（可选，编译器可以自动推导）
- `body`：函数体

Lambda表达式的捕获方式包括：
- `[]`：不捕获任何外部变量
- `[&]`：以引用方式捕获所有外部变量
- `[=]`：以值方式捕获所有外部变量
- `[var]`：以值方式捕获变量var
- `[&var]`：以引用方式捕获变量var
- `[this]`：捕获当前类的this指针

Lambda表达式与函数式编程思想密切相关，它使得在C++中实现函数式设计模式变得更加简单和自然。

#### 设计模式应用

##### 观察者模式的Lambda实现

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <string>
#include <map>
#include <algorithm>

// 传统观察者模式实现
class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(const std::string& message) = 0;
};

class ConcreteObserver : public Observer {
public:
    ConcreteObserver(const std::string& name) : name(name) {}
    
    void update(const std::string& message) override {
        std::cout << name << " received message: " << message << std::endl;
    }
    
private:
    std::string name;
};

class Subject {
public:
    void addObserver(Observer* observer) {
        observers.push_back(observer);
    }
    
    void removeObserver(Observer* observer) {
        observers.erase(std::remove(observers.begin(), observers.end(), observer), observers.end());
    }
    
    void notifyObservers(const std::string& message) {
        for (Observer* observer : observers) {
            observer->update(message);
        }
    }
    
private:
    std::vector<Observer*> observers;
};

// Lambda观察者模式实现
class LambdaSubject {
public:
    using ObserverFunction = std::function<void(const std::string&)>;
    
    // 添加观察者，返回观察者ID
    size_t addObserver(ObserverFunction observer) {
        size_t id = nextId++;
        observers[id] = observer;
        return id;
    }
    
    // 移除观察者
    void removeObserver(size_t id) {
        observers.erase(id);
    }
    
    // 通知所有观察者
    void notifyObservers(const std::string& message) {
        for (auto& [id, observer] : observers) {
            observer(message);
        }
    }
    
    // 通知特定观察者
    void notifyObserver(size_t id, const std::string& message) {
        auto it = observers.find(id);
        if (it != observers.end()) {
            it->second(message);
        }
    }
    
    // 获取观察者数量
    size_t observerCount() const {
        return observers.size();
    }
    
private:
    std::map<size_t, ObserverFunction> observers;
    size_t nextId = 1;
};

// 高级Lambda观察者模式，支持主题过滤和消息转换
class AdvancedLambdaSubject {
public:
    using ObserverFunction = std::function<void(const std::string&)>;
    using FilterFunction = std::function<bool(const std::string&)>;
    using TransformFunction = std::function<std::string(const std::string&)>;
    
    struct ObserverInfo {
        ObserverFunction observer;
        FilterFunction filter;
        TransformFunction transformer;
        size_t id;
    };
    
    // 添加观察者，返回观察者ID
    size_t addObserver(ObserverFunction observer, 
                      FilterFunction filter = nullptr,
                      TransformFunction transformer = nullptr) {
        size_t id = nextId++;
        observers.push_back({observer, filter, transformer, id});
        return id;
    }
    
    // 移除观察者
    void removeObserver(size_t id) {
        observers.erase(
            std::remove_if(observers.begin(), observers.end(),
                [id](const ObserverInfo& info) { return info.id == id; }),
            observers.end()
        );
    }
    
    // 通知所有观察者
    void notifyObservers(const std::string& message) {
        for (const auto& info : observers) {
            // 应用过滤器
            if (info.filter && !info.filter(message)) {
                continue;
            }
            
            // 应用转换器
            std::string transformedMessage = message;
            if (info.transformer) {
                transformedMessage = info.transformer(message);
            }
            
            // 调用观察者
            info.observer(transformedMessage);
        }
    }
    
    // 获取观察者数量
    size_t observerCount() const {
        return observers.size();
    }
    
private:
    std::vector<ObserverInfo> observers;
    size_t nextId = 1;
};

// 使用示例
int main() {
    std::cout << "--- Traditional Observer Pattern ---\n" << std::endl;
    
    Subject subject;
    
    ConcreteObserver observer1("Observer 1");
    ConcreteObserver observer2("Observer 2");
    
    subject.addObserver(&observer1);
    subject.addObserver(&observer2);
    
    subject.notifyObservers("Hello, observers!");
    
    subject.removeObserver(&observer1);
    subject.notifyObservers("Observer 1 has been removed");
    
    std::cout << "\n--- Lambda Observer Pattern ---\n" << std::endl;
    
    LambdaSubject lambdaSubject;
    
    // 使用Lambda表达式添加观察者
    size_t id1 = lambdaSubject.addObserver([](const std::string& message) {
        std::cout << "Lambda Observer 1 received: " << message << std::endl;
    });
    
    size_t id2 = lambdaSubject.addObserver([](const std::string& message) {
        std::cout << "Lambda Observer 2 received: " << message << std::endl;
    });
    
    lambdaSubject.notifyObservers("Hello, lambda observers!");
    
    lambdaSubject.removeObserver(id1);
    lambdaSubject.notifyObservers("Lambda Observer 1 has been removed");
    
    std::cout << "\n--- Advanced Lambda Observer Pattern ---\n" << std::endl;
    
    AdvancedLambdaSubject advancedSubject;
    
    // 添加带过滤器的观察者
    size_t filterId1 = advancedSubject.addObserver(
        [](const std::string& message) {
            std::cout << "Filter Observer 1 received: " << message << std::endl;
        },
        [](const std::string& message) {
            return message.find("important") != std::string::npos;
        }
    );
    
    // 添加带转换器的观察者
    size_t transformId1 = advancedSubject.addObserver(
        [](const std::string& message) {
            std::cout << "Transform Observer 1 received: " << message << std::endl;
        },
        nullptr,  // 不过滤
        [](const std::string& message) {
            return "Transformed: " + message;
        }
    );
    
    // 添加带过滤器和转换器的观察者
    size_t bothId1 = advancedSubject.addObserver(
        [](const std::string& message) {
            std::cout << "Both Observer 1 received: " << message << std::endl;
        },
        [](const std::string& message) {
            return message.length() > 10;
        },
        [](const std::string& message) {
            return "Filtered & Transformed: " + message;
        }
    );
    
    // 通知观察者
    advancedSubject.notifyObservers("Short message");
    advancedSubject.notifyObservers("This is an important message");
    advancedSubject.notifyObservers("This is a long message that will be filtered and transformed");
    
    return 0;
}
```

##### 责任链模式的Lambda实现

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <string>
#include <memory>

// 传统责任链模式实现
class Handler {
public:
    virtual ~Handler() = default;
    virtual void handleRequest(const std::string& request) = 0;
    void setNext(std::shared_ptr<Handler> next) {
        this->next = next;
    }
    
protected:
    std::shared_ptr<Handler> next;
};

class ConcreteHandler1 : public Handler {
public:
    void handleRequest(const std::string& request) override {
        if (request == "request1") {
            std::cout << "ConcreteHandler1 handled " << request << std::endl;
        } else if (next) {
            next->handleRequest(request);
        }
    }
};

class ConcreteHandler2 : public Handler {
public:
    void handleRequest(const std::string& request) override {
        if (request == "request2") {
            std::cout << "ConcreteHandler2 handled " << request << std::endl;
        } else if (next) {
            next->handleRequest(request);
        }
    }
};

class ConcreteHandler3 : public Handler {
public:
    void handleRequest(const std::string& request) override {
        if (request == "request3") {
            std::cout << "ConcreteHandler3 handled " << request << std::endl;
        } else if (next) {
            std::cout << "No handler could process " << request << std::endl;
        }
    }
};

// Lambda责任链模式实现
class LambdaChainOfResponsibility {
public:
    using HandlerFunction = std::function<bool(const std::string&)>;
    
    // 添加处理器
    void addHandler(HandlerFunction handler) {
        handlers.push_back(handler);
    }
    
    // 处理请求
    void handleRequest(const std::string& request) {
        for (const auto& handler : handlers) {
            if (handler(request)) {
                return;  // 请求被处理，停止链
            }
        }
        std::cout << "No handler could process " << request << std::endl;
    }
    
    // 清除所有处理器
    void clear() {
        handlers.clear();
    }
    
private:
    std::vector<HandlerFunction> handlers;
};

// 高级Lambda责任链模式，支持条件处理器和后处理
class AdvancedLambdaChainOfResponsibility {
public:
    using HandlerFunction = std::function<bool(const std::string&)>;
    using PostProcessFunction = std::function<void(const std::string&, bool)>;
    
    struct HandlerInfo {
        HandlerFunction handler;
        PostProcessFunction postProcess;
        std::string name;
    };
    
    // 添加处理器
    void addHandler(const std::string& name, 
                   HandlerFunction handler,
                   PostProcessFunction postProcess = nullptr) {
        handlers.push_back({handler, postProcess, name});
    }
    
    // 处理请求
    void handleRequest(const std::string& request) {
        bool handled = false;
        
        for (const auto& info : handlers) {
            std::cout << "Trying handler: " << info.name << std::endl;
            
            if (info.handler(request)) {
                handled = true;
                
                // 执行后处理
                if (info.postProcess) {
                    info.postProcess(request, true);
                }
                
                std::cout << "Request handled by: " << info.name << std::endl;
                break;
            } else {
                // 执行后处理
                if (info.postProcess) {
                    info.postProcess(request, false);
                }
            }
        }
        
        if (!handled) {
            std::cout << "No handler could process " << request << std::endl;
        }
    }
    
    // 清除所有处理器
    void clear() {
        handlers.clear();
    }
    
    // 获取处理器数量
    size_t handlerCount() const {
        return handlers.size();
    }
    
private:
    std::vector<HandlerInfo> handlers;
};

// 使用示例
int main() {
    std::cout << "--- Traditional Chain of Responsibility Pattern ---\n" << std::endl;
    
    auto handler1 = std::make_shared<ConcreteHandler1>();
    auto handler2 = std::make_shared<ConcreteHandler2>();
    auto handler3 = std::make_shared<ConcreteHandler3>();
    
    handler1->setNext(handler2);
    handler2->setNext(handler3);
    
    handler1->handleRequest("request1");
    handler1->handleRequest("request2");
    handler1->handleRequest("request3");
    handler1->handleRequest("unknown");
    
    std::cout << "\n--- Lambda Chain of Responsibility Pattern ---\n" << std::endl;
    
    LambdaChainOfResponsibility lambdaChain;
    
    // 使用Lambda表达式添加处理器
    lambdaChain.addHandler([](const std::string& request) {
        if (request == "request1") {
            std::cout << "Lambda Handler 1 handled " << request << std::endl;
            return true;
        }
        return false;
    });
    
    lambdaChain.addHandler([](const std::string& request) {
        if (request == "request2") {
            std::cout << "Lambda Handler 2 handled " << request << std::endl;
            return true;
        }
        return false;
    });
    
    lambdaChain.addHandler([](const std::string& request) {
        if (request == "request3") {
            std::cout << "Lambda Handler 3 handled " << request << std::endl;
            return true;
        }
        return false;
    });
    
    lambdaChain.handleRequest("request1");
    lambdaChain.handleRequest("request2");
    lambdaChain.handleRequest("request3");
    lambdaChain.handleRequest("unknown");
    
    std::cout << "\n--- Advanced Lambda Chain of Responsibility Pattern ---\n" << std::endl;
    
    AdvancedLambdaChainOfResponsibility advancedChain;
    
    // 添加带后处理的处理器
    advancedChain.addHandler(
        "Authentication Handler",
        [](const std::string& request) {
            return request.find("auth") != std::string::npos;
        },
        [](const std::string& request, bool handled) {
            std::cout << "Authentication check for '" << request << "': " 
                      << (handled ? "passed" : "failed") << std::endl;
        }
    );
    
    advancedChain.addHandler(
        "Validation Handler",
        [](const std::string& request) {
            return request.find("valid") != std::string::npos;
        },
        [](const std::string& request, bool handled) {
            std::cout << "Validation check for '" << request << "': " 
                      << (handled ? "passed" : "failed") << std::endl;
        }
    );
    
    advancedChain.addHandler(
        "Logging Handler",
        [](const std::string& request) {
            std::cout << "Logging request: " << request << std::endl;
            return true;  // 总是处理请求
        },
        [](const std::string& request, bool handled) {
            std::cout << "Request '" << request << "' logged" << std::endl;
        }
    );
    
    // 处理请求
    advancedChain.handleRequest("auth_request");
    advancedChain.handleRequest("valid_request");
    advancedChain.handleRequest("simple_request");
    
    return 0;
}
```

#### 实践意义

Lambda表达式为设计模式的实现带来了以下优势：

1. **简化代码**：Lambda表达式可以减少样板代码，使实现更加简洁。
2. **提高灵活性**：Lambda表达式可以捕获外部变量，使实现更加灵活。
3. **增强可读性**：Lambda表达式可以使代码更加直观和易于理解。
4. **支持闭包**：Lambda表达式支持闭包，可以保存状态。
5. **减少类层次**：Lambda表达式可以减少不必要的类层次结构。

通过合理使用Lambda表达式，开发者可以编写更加简洁、灵活和高效的设计模式实现。

### 5.3 函数组合与管道模式

#### 概念原理

函数组合是函数式编程的核心概念之一，它允许将多个简单的函数组合成一个更复杂的函数。在数学中，函数组合表示为 `f ∘ g`，表示先应用函数 `g`，然后应用函数 `f`。

管道模式是一种设计模式，它将处理过程分解为一系列独立的阶段，每个阶段执行特定的操作，然后将结果传递给下一个阶段。管道模式与函数组合密切相关，可以看作是函数组合在数据处理领域的应用。

在C++中，我们可以使用Lambda表达式、std::function和模板来实现函数组合和管道模式。

#### 设计模式应用

##### 函数组合的实现

```cpp
#include <iostream>
#include <functional>
#include <string>
#include <vector>
#include <algorithm>

// 简单的函数组合实现
template<typename F, typename G>
auto compose(F f, G g) {
    return [f, g](auto x) {
        return f(g(x));
    };
}

// 支持多个函数的组合
template<typename F, typename... Rest>
auto compose(F f, Rest... rest) {
    return [f, rest...](auto x) {
        return f(compose(rest...)(x));
    };
}

// 管道模式的实现
template<typename T>
class Pipeline {
public:
    using ProcessFunction = std::function<T(const T&)>;
    
    // 添加处理步骤
    Pipeline& addStep(ProcessFunction step) {
        steps.push_back(step);
        return *this;
    }
    
    // 执行管道
    T process(const T& input) {
        T result = input;
        for (const auto& step : steps) {
            result = step(result);
        }
        return result;
    }
    
    // 清除所有步骤
    void clear() {
        steps.clear();
    }
    
    // 获取步骤数量
    size_t stepCount() const {
        return steps.size();
    }
    
private:
    std::vector<ProcessFunction> steps;
};

// 高级管道模式，支持分支和合并
template<typename T>
class AdvancedPipeline {
public:
    using ProcessFunction = std::function<T(const T&)>;
    using BranchCondition = std::function<bool(const T&)>;
    using MergeFunction = std::function<T(const T&, const T&)>;
    
    struct Step {
        ProcessFunction process;
        std::string name;
    };
    
    struct Branch {
        BranchCondition condition;
        AdvancedPipeline<T> truePipeline;
        AdvancedPipeline<T> falsePipeline;
        MergeFunction merge;
        std::string name;
    };
    
    // 添加处理步骤
    AdvancedPipeline& addStep(const std::string& name, ProcessFunction step) {
        steps.push_back({step, name});
        return *this;
    }
    
    // 添加分支
    AdvancedPipeline& addBranch(const std::string& name, 
                               BranchCondition condition,
                               MergeFunction merge = nullptr) {
        Branch branch;
        branch.condition = condition;
        branch.merge = merge;
        branch.name = name;
        branches.push_back(branch);
        return *this;
    }
    
    // 获取当前分支的true管道
    AdvancedPipeline& truePipeline(size_t branchIndex) {
        if (branchIndex < branches.size()) {
            return branches[branchIndex].truePipeline;
        }
        throw std::out_of_range("Branch index out of range");
    }
    
    // 获取当前分支的false管道
    AdvancedPipeline& falsePipeline(size_t branchIndex) {
        if (branchIndex < branches.size()) {
            return branches[branchIndex].falsePipeline;
        }
        throw std::out_of_range("Branch index out of range");
    }
    
    // 执行管道
    T process(const T& input) {
        T result = input;
        
        // 执行所有步骤
        for (const auto& step : steps) {
            std::cout << "Processing step: " << step.name << std::endl;
            result = step.process(result);
        }
        
        // 执行所有分支
        for (auto& branch : branches) {
            std::cout << "Processing branch: " << branch.name << std::endl;
            
            if (branch.condition(result)) {
                T trueResult = branch.truePipeline.process(result);
                
                if (branch.merge) {
                    result = branch.merge(result, trueResult);
                } else {
                    result = trueResult;
                }
            } else {
                T falseResult = branch.falsePipeline.process(result);
                
                if (branch.merge) {
                    result = branch.merge(result, falseResult);
                } else {
                    result = falseResult;
                }
            }
        }
        
        return result;
    }
    
    // 清除所有步骤和分支
    void clear() {
        steps.clear();
        branches.clear();
    }
    
private:
    std::vector<Step> steps;
    std::vector<Branch> branches;
};

// 使用示例
int main() {
    std::cout << "--- Function Composition ---\n" << std::endl;
    
    // 定义一些简单函数
    auto addOne = [](int x) { return x + 1; };
    auto multiplyByTwo = [](int x) { return x * 2; };
    auto square = [](int x) { return x * x; };
    
    // 使用函数组合
    auto composed1 = compose(multiplyByTwo, addOne);  // (x + 1) * 2
    auto composed2 = compose(square, multiplyByTwo, addOne);  // ((x + 1) * 2)^2
    
    int value = 5;
    std::cout << "Original value: " << value << std::endl;
    std::cout << "After composed1 (addOne then multiplyByTwo): " << composed1(value) << std::endl;
    std::cout << "After composed2 (addOne, multiplyByTwo, then square): " << composed2(value) << std::endl;
    
    std::cout << "\n--- Pipeline Pattern ---\n" << std::endl;
    
    // 创建管道处理字符串
    Pipeline<std::string> stringPipeline;
    
    stringPipeline.addStep([](const std::string& s) {
        std::string result = s;
        std::transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    });
    
    stringPipeline.addStep([](const std::string& s) {
        std::string result = s;
        // 移除空格
        result.erase(std::remove_if(result.begin(), result.end(), ::isspace), result.end());
        return result;
    });
    
    stringPipeline.addStep([](const std::string& s) {
        return "processed:" + s;
    });
    
    std::string input = "Hello World Pipeline";
    std::string output = stringPipeline.process(input);
    
    std::cout << "Original string: " << input << std::endl;
    std::cout << "Processed string: " << output << std::endl;
    
    std::cout << "\n--- Advanced Pipeline Pattern ---\n" << std::endl;
    
    // 创建高级管道处理数字
    AdvancedPipeline<int> numberPipeline;
    
    // 添加步骤
    numberPipeline.addStep("Add One", [](int x) { return x + 1; });
    numberPipeline.addStep("Multiply by Two", [](int x) { return x * 2; });
    
    // 添加分支
    numberPipeline.addBranch(
        "Check Even",
        [](int x) { return x % 2 == 0; },  // 条件：是否为偶数
        [](int original, int branched) { return original + branched; }  // 合并函数
    );
    
    // 设置true管道（偶数处理）
    numberPipeline.truePipeline(0)
        .addStep("Square", [](int x) { return x * x; });
    
    // 设置false管道（奇数处理）
    numberPipeline.falsePipeline(0)
        .addStep("Add Ten", [](int x) { return x + 10; });
    
    // 处理数字
    int num = 5;
    int result = numberPipeline.process(num);
    
    std::cout << "Original number: " << num << std::endl;
    std::cout << "Processed number: " << result << std::endl;
    
    // 处理偶数
    num = 6;
    result = numberPipeline.process(num);
    
    std::cout << "\nOriginal number: " << num << std::endl;
    std::cout << "Processed number: " << result << std::endl;
    
    return 0;
}
```

##### 数据处理管道的实现

```cpp
#include <iostream>
#include <vector>
#include <functional>
#include <algorithm>
#include <string>
#include <numeric>
#include <map>

// 数据项结构
struct DataItem {
    int id;
    std::string name;
    double value;
    std::string category;
    
    void print() const {
        std::cout << "ID: " << id << ", Name: " << name 
                  << ", Value: " << value << ", Category: " << category << std::endl;
    }
};

// 数据处理管道
class DataPipeline {
public:
    using FilterFunction = std::function<bool(const DataItem&)>;
    using TransformFunction = std::function<DataItem(const DataItem&)>;
    using AggregateFunction = std::function<void(const std::vector<DataItem>&)>;
    
    // 添加过滤器
    DataPipeline& addFilter(FilterFunction filter) {
        filters.push_back(filter);
        return *this;
    }
    
    // 添加转换器
    DataPipeline& addTransform(TransformFunction transform) {
        transforms.push_back(transform);
        return *this;
    }
    
    // 添加聚合器
    DataPipeline& addAggregate(AggregateFunction aggregate) {
        aggregates.push_back(aggregate);
        return *this;
    }
    
    // 处理数据
    void process(std::vector<DataItem>& data) {
        std::cout << "Original data count: " << data.size() << std::endl;
        
        // 应用所有过滤器
        for (auto& filter : filters) {
            data.erase(
                std::remove_if(data.begin(), data.end(), 
                    [&filter](const DataItem& item) { return !filter(item); }),
                data.end()
            );
            std::cout << "After filter, data count: " << data.size() << std::endl;
        }
        
        // 应用所有转换器
        for (auto& transform : transforms) {
            std::transform(data.begin(), data.end(), data.begin(), transform);
        }
        
        // 应用所有聚合器
        for (auto& aggregate : aggregates) {
            aggregate(data);
        }
    }
    
    // 清除所有处理步骤
    void clear() {
        filters.clear();
        transforms.clear();
        aggregates.clear();
    }
    
private:
    std::vector<FilterFunction> filters;
    std::vector<TransformFunction> transforms;
    std::vector<AggregateFunction> aggregates;
};

// 高级数据处理管道，支持分组和排序
class AdvancedDataPipeline {
public:
    using FilterFunction = std::function<bool(const DataItem&)>;
    using TransformFunction = std::function<DataItem(const DataItem&)>;
    using SortFunction = std::function<bool(const DataItem&, const DataItem&)>;
    using GroupFunction = std::function<std::string(const DataItem&)>;
    using AggregateFunction = std::function<void(const std::vector<DataItem>&)>;
    using GroupedAggregateFunction = std::function<void(const std::map<std::string, std::vector<DataItem>>&)>;
    
    // 添加过滤器
    AdvancedDataPipeline& addFilter(FilterFunction filter) {
        filters.push_back(filter);
        return *this;
    }
    
    // 添加转换器
    AdvancedDataPipeline& addTransform(TransformFunction transform) {
        transforms.push_back(transform);
        return *this;
    }
    
    // 添加排序器
    AdvancedDataPipeline& addSort(SortFunction sort) {
        sorts.push_back(sort);
        return *this;
    }
    
    // 添加分组器
    AdvancedDataPipeline& addGroup(GroupFunction group) {
        groupers.push_back(group);
        return *this;
    }
    
    // 添加聚合器
    AdvancedDataPipeline& addAggregate(AggregateFunction aggregate) {
        aggregates.push_back(aggregate);
        return *this;
    }
    
    // 添加分组聚合器
    AdvancedDataPipeline& addGroupedAggregate(GroupedAggregateFunction aggregate) {
        groupedAggregates.push_back(aggregate);
        return *this;
    }
    
    // 处理数据
    void process(std::vector<DataItem>& data) {
        std::cout << "Original data count: " << data.size() << std::endl;
        
        // 应用所有过滤器
        for (auto& filter : filters) {
            data.erase(
                std::remove_if(data.begin(), data.end(), 
                    [&filter](const DataItem& item) { return !filter(item); }),
                data.end()
            );
            std::cout << "After filter, data count: " << data.size() << std::endl;
        }
        
        // 应用所有转换器
        for (auto& transform : transforms) {
            std::transform(data.begin(), data.end(), data.begin(), transform);
        }
        
        // 应用所有排序器
        for (auto& sort : sorts) {
            std::sort(data.begin(), data.end(), sort);
        }
        
        // 应用所有聚合器
        for (auto& aggregate : aggregates) {
            aggregate(data);
        }
        
        // 如果有分组器，进行分组处理
        if (!groupers.empty()) {
            std::map<std::string, std::vector<DataItem>> groupedData;
            
            // 使用第一个分组器进行分组
            auto grouper = groupers[0];
            for (const auto& item : data) {
                std::string key = grouper(item);
                groupedData[key].push_back(item);
            }
            
            std::cout << "Data grouped into " << groupedData.size() << " categories" << std::endl;
            
            // 应用分组聚合器
            for (auto& aggregate : groupedAggregates) {
                aggregate(groupedData);
            }
        }
    }
    
    // 清除所有处理步骤
    void clear() {
        filters.clear();
        transforms.clear();
        sorts.clear();
        groupers.clear();
        aggregates.clear();
        groupedAggregates.clear();
    }
    
private:
    std::vector<FilterFunction> filters;
    std::vector<TransformFunction> transforms;
    std::vector<SortFunction> sorts;
    std::vector<GroupFunction> groupers;
    std::vector<AggregateFunction> aggregates;
    std::vector<GroupedAggregateFunction> groupedAggregates;
};

// 使用示例
int main() {
    std::cout << "--- Data Processing Pipeline ---\n" << std::endl;
    
    // 创建测试数据
    std::vector<DataItem> data = {
        {1, "Item A", 10.5, "Category 1"},
        {2, "Item B", 20.3, "Category 2"},
        {3, "Item C", 15.7, "Category 1"},
        {4, "Item D", 8.2, "Category 3"},
        {5, "Item E", 12.9, "Category 2"},
        {6, "Item F", 25.1, "Category 1"},
        {7, "Item G", 18.4, "Category 3"},
        {8, "Item H", 9.6, "Category 2"}
    };
    
    std::cout << "Original data:" << std::endl;
    for (const auto& item : data) {
        item.print();
    }
    
    // 创建数据处理管道
    DataPipeline pipeline;
    
    // 添加过滤器：只保留值大于10的项目
    pipeline.addFilter([](const DataItem& item) {
        return item.value > 10.0;
    });
    
    // 添加转换器：将值增加20%
    pipeline.addTransform([](const DataItem& item) {
        DataItem newItem = item;
        newItem.value *= 1.2;
        return newItem;
    });
    
    // 添加聚合器：计算值的总和
    pipeline.addAggregate([](const std::vector<DataItem>& items) {
        double sum = std::accumulate(items.begin(), items.end(), 0.0, 
            [](double acc, const DataItem& item) { return acc + item.value; });
        std::cout << "Total value: " << sum << std::endl;
    });
    
    // 添加聚合器：计算值的平均值
    pipeline.addAggregate([](const std::vector<DataItem>& items) {
        if (items.empty()) return;
        
        double sum = std::accumulate(items.begin(), items.end(), 0.0, 
            [](double acc, const DataItem& item) { return acc + item.value; });
        double average = sum / items.size();
        std::cout << "Average value: " << average << std::endl;
    });
    
    // 处理数据
    std::vector<DataItem> processedData = data;
    pipeline.process(processedData);
    
    std::cout << "\nProcessed data:" << std::endl;
    for (const auto& item : processedData) {
        item.print();
    }
    
    std::cout << "\n--- Advanced Data Processing Pipeline ---\n" << std::endl;
    
    // 创建高级数据处理管道
    AdvancedDataPipeline advancedPipeline;
    
    // 添加过滤器：只保留Category 1和Category 2的项目
    advancedPipeline.addFilter([](const DataItem& item) {
        return item.category == "Category 1" || item.category == "Category 2";
    });
    
    // 添加转换器：将名称转换为大写
    advancedPipeline.addTransform([](const DataItem& item) {
        DataItem newItem = item;
        std::transform(newItem.name.begin(), newItem.name.end(), newItem.name.begin(), ::toupper);
        return newItem;
    });
    
    // 添加排序器：按值降序排序
    advancedPipeline.addSort([](const DataItem& a, const DataItem& b) {
        return a.value > b.value;
    });
    
    // 添加分组器：按类别分组
    advancedPipeline.addGroup([](const DataItem& item) {
        return item.category;
    });
    
    // 添加分组聚合器：计算每组的平均值
    advancedPipeline.addGroupedAggregate([](const std::map<std::string, std::vector<DataItem>>& groupedData) {
        for (const auto& [category, items] : groupedData) {
            if (items.empty()) continue;
            
            double sum = std::accumulate(items.begin(), items.end(), 0.0, 
                [](double acc, const DataItem& item) { return acc + item.value; });
            double average = sum / items.size();
            
            std::cout << "Category " << category << " - Average value: " << average << std::endl;
        }
    });
    
    // 处理数据
    std::vector<DataItem> advancedProcessedData = data;
    advancedPipeline.process(advancedProcessedData);
    
    std::cout << "\nAdvanced processed data:" << std::endl;
    for (const auto& item : advancedProcessedData) {
        item.print();
    }
    
    return 0;
}
```

#### 实践意义

函数组合与管道模式为数据处理和业务逻辑实现提供了强大的工具：

1. **模块化设计**：将复杂处理过程分解为多个独立的步骤，提高代码的模块化和可维护性。
2. **可重用性**：每个处理步骤都可以独立开发和测试，然后在不同的管道中重用。
3. **灵活性**：可以轻松添加、删除或重新排列处理步骤，适应不同的需求。
4. **可读性**：管道模式使处理流程更加清晰，代码更加易读。
5. **并行处理**：管道中的不同步骤可以并行执行，提高处理效率。

通过函数组合和管道模式，开发者可以构建更加灵活、可维护和高效的数据处理系统。

### 5.4 不可变性与状态模式

#### 概念原理

不可变性是函数式编程的核心概念之一，它指的是对象一旦创建就不能被修改。在C++中，我们可以通过const关键字、const成员函数和返回const对象来实现不可变性。

状态模式是一种行为型设计模式，它允许一个对象在其内部状态改变时改变它的行为。传统状态模式通常使用可变状态，但我们可以结合不可变性原则，创建更加安全和可预测的状态模式实现。

不可变性与状态模式的结合可以带来以下好处：
1. **线程安全**：不可变对象天然是线程安全的，可以在多线程环境中安全共享。
2. **可预测性**：不可变对象的行为更加可预测，减少了副作用。
3. **简化测试**：不可变对象更容易测试，因为它们的状态不会改变。
4. **缓存友好**：不可变对象可以被安全地缓存，提高性能。

#### 设计模式应用

##### 不可变状态模式的实现

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include <functional>

// 不可变状态基类
class ImmutableState {
public:
    virtual ~ImmutableState() = default;
    virtual std::string getName() const = 0;
    virtual std::unique_ptr<ImmutableState> handleInput(const std::string& input) const = 0;
    virtual void printStatus() const = 0;
};

// 上下文类，持有当前状态的不可变引用
class ImmutableContext {
public:
    explicit ImmutableContext(std::unique_ptr<ImmutableState> initialState)
        : currentState(std::move(initialState)) {}
    
    // 处理输入并返回新的上下文
    ImmutableContext handleInput(const std::string& input) const {
        auto newState = currentState->handleInput(input);
        return ImmutableContext(std::move(newState));
    }
    
    // 获取当前状态名称
    std::string getCurrentStateName() const {
        return currentState->getName();
    }
    
    // 打印当前状态
    void printCurrentStatus() const {
        currentState->printStatus();
    }
    
private:
    std::unique_ptr<const ImmutableState> currentState;
};

// 具体状态实现
class LockedState : public ImmutableState {
public:
    std::string getName() const override {
        return "Locked";
    }
    
    std::unique_ptr<ImmutableState> handleInput(const std::string& input) const override {
        if (input == "unlock") {
            std::cout << "Unlocking the door..." << std::endl;
            return std::make_unique<UnlockedState>();
        } else {
            std::cout << "Door is locked. Please unlock first." << std::endl;
            return std::make_unique<LockedState>(*this);
        }
    }
    
    void printStatus() const override {
        std::cout << "The door is locked." << std::endl;
    }
};

class UnlockedState : public ImmutableState {
public:
    std::string getName() const override {
        return "Unlocked";
    }
    
    std::unique_ptr<ImmutableState> handleInput(const std::string& input) const override {
        if (input == "lock") {
            std::cout << "Locking the door..." << std::endl;
            return std::make_unique<LockedState>();
        } else if (input == "open") {
            std::cout << "Opening the door..." << std::endl;
            return std::make_unique<OpenState>();
        } else {
            std::cout << "Door is unlocked. You can lock or open it." << std::endl;
            return std::make_unique<UnlockedState>(*this);
        }
    }
    
    void printStatus() const override {
        std::cout << "The door is unlocked but closed." << std::endl;
    }
};

class OpenState : public ImmutableState {
public:
    std::string getName() const override {
        return "Open";
    }
    
    std::unique_ptr<ImmutableState> handleInput(const std::string& input) const override {
        if (input == "close") {
            std::cout << "Closing the door..." << std::endl;
            return std::make_unique<UnlockedState>();
        } else {
            std::cout << "Door is open. You can close it." << std::endl;
            return std::make_unique<OpenState>(*this);
        }
    }
    
    void printStatus() const override {
        std::cout << "The door is open." << std::endl;
    }
};

// 高级不可变状态模式，支持状态历史记录和回滚
class AdvancedImmutableContext {
public:
    explicit AdvancedImmutableContext(std::unique_ptr<ImmutableState> initialState)
        : currentState(std::move(initialState)) {
        history.push_back(std::make_unique<ImmutableState>(*currentState));
    }
    
    // 处理输入并返回新的上下文
    AdvancedImmutableContext handleInput(const std::string& input) const {
        auto newState = currentState->handleInput(input);
        AdvancedImmutableContext newContext(std::move(newState));
        
        // 复制历史记录
        for (const auto& state : history) {
            newContext.history.push_back(std::make_unique<ImmutableState>(*state));
        }
        
        // 添加新状态到历史记录
        newContext.history.push_back(std::make_unique<ImmutableState>(*newContext.currentState));
        
        return newContext;
    }
    
    // 回滚到前一个状态
    AdvancedImmutableContext rollback() const {
        if (history.size() <= 1) {
            std::cout << "Cannot rollback: no previous state available." << std::endl;
            return *this;
        }
        
        // 创建新的上下文，使用前一个状态
        auto previousState = std::make_unique<ImmutableState>(*history[history.size() - 2]);
        AdvancedImmutableContext newContext(std::move(previousState));
        
        // 复制历史记录（不包括最后一个状态）
        for (size_t i = 0; i < history.size() - 1; ++i) {
            newContext.history.push_back(std::make_unique<ImmutableState>(*history[i]));
        }
        
        std::cout << "Rolled back to previous state." << std::endl;
        return newContext;
    }
    
    // 获取当前状态名称
    std::string getCurrentStateName() const {
        return currentState->getName();
    }
    
    // 打印当前状态
    void printCurrentStatus() const {
        currentState->printStatus();
    }
    
    // 打印状态历史
    void printHistory() const {
        std::cout << "State history:" << std::endl;
        for (size_t i = 0; i < history.size(); ++i) {
            std::cout << i << ": " << history[i]->getName() << std::endl;
        }
    }
    
    // 获取历史记录大小
    size_t historySize() const {
        return history.size();
    }
    
private:
    std::unique_ptr<const ImmutableState> currentState;
    std::vector<std::unique_ptr<const ImmutableState>> history;
};

// 使用示例
int main() {
    std::cout << "--- Immutable State Pattern ---\n" << std::endl;
    
    // 创建初始上下文
    ImmutableContext context(std::make_unique<LockedState>());
    
    std::cout << "Initial state: " << context.getCurrentStateName() << std::endl;
    context.printCurrentStatus();
    
    // 处理输入
    context = context.handleInput("open");
    std::cout << "Current state: " << context.getCurrentStateName() << std::endl;
    context.printCurrentStatus();
    
    context = context.handleInput("unlock");
    std::cout << "Current state: " << context.getCurrentStateName() << std::endl;
    context.printCurrentStatus();
    
    context = context.handleInput("open");
    std::cout << "Current state: " << context.getCurrentStateName() << std::endl;
    context.printCurrentStatus();
    
    context = context.handleInput("close");
    std::cout << "Current state: " << context.getCurrentStateName() << std::endl;
    context.printCurrentStatus();
    
    context = context.handleInput("lock");
    std::cout << "Current state: " << context.getCurrentStateName() << std::endl;
    context.printCurrentStatus();
    
    std::cout << "\n--- Advanced Immutable State Pattern ---\n" << std::endl;
    
    // 创建高级上下文
    AdvancedImmutableContext advancedContext(std::make_unique<LockedState>());
    
    std::cout << "Initial state: " << advancedContext.getCurrentStateName() << std::endl;
    advancedContext.printCurrentStatus();
    
    // 处理一系列输入
    std::vector<std::string> inputs = {"unlock", "open", "close", "lock", "open"};
    
    for (const auto& input : inputs) {
        std::cout << "\nProcessing input: " << input << std::endl;
        advancedContext = advancedContext.handleInput(input);
        std::cout << "Current state: " << advancedContext.getCurrentStateName() << std::endl;
        advancedContext.printCurrentStatus();
    }
    
    // 打印历史记录
    std::cout << std::endl;
    advancedContext.printHistory();
    
    // 回滚到前一个状态
    std::cout << std::endl;
    advancedContext = advancedContext.rollback();
    std::cout << "Current state after rollback: " << advancedContext.getCurrentStateName() << std::endl;
    advancedContext.printCurrentStatus();
    
    // 再次回滚
    std::cout << std::endl;
    advancedContext = advancedContext.rollback();
    std::cout << "Current state after second rollback: " << advancedContext.getCurrentStateName() << std::endl;
    advancedContext.printCurrentStatus();
    
    return 0;
}
```

##### 不可变数据结构的实现

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>
#include <string>
#include <stdexcept>

// 不可变链表节点
template<typename T>
class ImmutableListNode {
public:
    ImmutableListNode(T value, std::shared_ptr<const ImmutableListNode<T>> next = nullptr)
        : value_(value), next_(next) {}
    
    const T& value() const { return value_; }
    std::shared_ptr<const ImmutableListNode<T>> next() const { return next_; }
    
    // 创建新节点，添加到列表头部
    std::shared_ptr<const ImmutableListNode<T>> prepend(T newValue) const {
        return std::make_shared<ImmutableListNode<T>>(newValue, shared_from_this());
    }
    
    // 创建新列表，移除第一个匹配的元素
    std::shared_ptr<const ImmutableListNode<T>> remove(const T& target) const {
        if (value_ == target) {
            return next_;  // 跳过当前节点
        } else if (next_) {
            auto newNext = next_->remove(target);
            if (newNext == next_) {
                return shared_from_this();  // 没有变化，返回当前节点
            } else {
                return std::make_shared<ImmutableListNode<T>>(value_, newNext);
            }
        } else {
            return shared_from_this();  // 没有找到目标，返回当前节点
        }
    }
    
    // 创建新列表，更新第一个匹配的元素
    std::shared_ptr<const ImmutableListNode<T>> update(const T& target, T newValue) const {
        if (value_ == target) {
            return std::make_shared<ImmutableListNode<T>>(newValue, next_);
        } else if (next_) {
            auto newNext = next_->update(target, newValue);
            if (newNext == next_) {
                return shared_from_this();  // 没有变化，返回当前节点
            } else {
                return std::make_shared<ImmutableListNode<T>>(value_, newNext);
            }
        } else {
            return shared_from_this();  // 没有找到目标，返回当前节点
        }
    }
    
    // 检查列表是否包含某个值
    bool contains(const T& target) const {
        if (value_ == target) {
            return true;
        } else if (next_) {
            return next_->contains(target);
        } else {
            return false;
        }
    }
    
    // 获取列表长度
    size_t length() const {
        return 1 + (next_ ? next_->length() : 0);
    }
    
    // 转换为向量
    std::vector<T> toVector() const {
        std::vector<T> result;
        const ImmutableListNode<T>* current = this;
        while (current) {
            result.push_back(current->value());
            current = current->next().get();
        }
        return result;
    }
    
    // 打印列表
    void print() const {
        std::cout << value_;
        if (next_) {
            std::cout << " -> ";
            next_->print();
        } else {
            std::cout << " -> nullptr" << std::endl;
        }
    }
    
private:
    T value_;
    std::shared_ptr<const ImmutableListNode<T>> next_;
};

// 不可变列表
template<typename T>
class ImmutableList {
public:
    // 创建空列表
    ImmutableList() : head_(nullptr) {}
    
    // 从节点创建列表
    explicit ImmutableList(std::shared_ptr<const ImmutableListNode<T>> head) : head_(head) {}
    
    // 添加元素到列表头部
    ImmutableList prepend(T value) const {
        return ImmutableList(std::make_shared<ImmutableListNode<T>>(value, head_));
    }
    
    // 移除元素
    ImmutableList remove(const T& value) const {
        if (!head_) {
            return *this;  // 空列表
        }
        return ImmutableList(head_->remove(value));
    }
    
    // 更新元素
    ImmutableList update(const T& target, T newValue) const {
        if (!head_) {
            return *this;  // 空列表
        }
        return ImmutableList(head_->update(target, newValue));
    }
    
    // 检查是否包含元素
    bool contains(const T& value) const {
        return head_ && head_->contains(value);
    }
    
    // 获取列表长度
    size_t length() const {
        return head_ ? head_->length() : 0;
    }
    
    // 检查列表是否为空
    bool isEmpty() const {
        return head_ == nullptr;
    }
    
    // 获取头部元素
    T head() const {
        if (!head_) {
            throw std::out_of_range("Cannot get head of empty list");
        }
        return head_->value();
    }
    
    // 获取尾部列表
    ImmutableList tail() const {
        if (!head_) {
            return *this;  // 空列表
        }
        return ImmutableList(head_->next());
    }
    
    // 转换为向量
    std::vector<T> toVector() const {
        return head_ ? head_->toVector() : std::vector<T>();
    }
    
    // 打印列表
    void print() const {
        if (head_) {
            head_->print();
        } else {
            std::cout << "Empty list" << std::endl;
        }
    }
    
private:
    std::shared_ptr<const ImmutableListNode<T>> head_;
};

// 使用示例
int main() {
    std::cout << "--- Immutable List ---\n" << std::endl;
    
    // 创建不可变列表
    ImmutableList<int> list;
    
    // 添加元素
    list = list.prepend(3).prepend(2).prepend(1);
    
    std::cout << "Original list: ";
    list.print();
    
    // 移除元素
    auto listWithout2 = list.remove(2);
    std::cout << "List without 2: ";
    listWithout2.print();
    
    // 更新元素
    auto listWithUpdated3 = list.update(3, 30);
    std::cout << "List with updated 3: ";
    listWithUpdated3.print();
    
    // 检查元素
    std::cout << "Contains 2: " << (list.contains(2) ? "Yes" : "No") << std::endl;
    std::cout << "Contains 5: " << (list.contains(5) ? "Yes" : "No") << std::endl;
    
    // 获取长度
    std::cout << "Length: " << list.length() << std::endl;
    
    // 获取头部和尾部
    std::cout << "Head: " << list.head() << std::endl;
    std::cout << "Tail: ";
    list.tail().print();
    
    // 转换为向量
    auto vector = list.toVector();
    std::cout << "As vector: ";
    for (int value : vector) {
        std::cout << value << " ";
    }
    std::cout << std::endl;
    
    // 演示不可变性
    std::cout << "\n--- Demonstrating Immutability ---\n" << std::endl;
    
    std::cout << "Original list: ";
    list.print();
    
    auto newList = list.prepend(0);
    std::cout << "New list after prepend: ";
    newList.print();
    
    std::cout << "Original list after new list creation: ";
    list.print();  // 原列表未改变
    
    auto modifiedList = list.remove(2);
    std::cout << "Modified list after remove: ";
    modifiedList.print();
    
    std::cout << "Original list after modification: ";
    list.print();  // 原列表未改变
    
    return 0;
}
```

#### 实践意义

不可变性与状态模式的结合为软件开发提供了强大的工具：

1. **线程安全**：不可变对象天然是线程安全的，可以在多线程环境中安全共享，无需同步机制。
2. **可预测性**：不可变对象的行为更加可预测，减少了副作用和意外状态改变。
3. **简化测试**：不可变对象更容易测试，因为它们的状态不会改变，测试结果更加可靠。
4. **缓存友好**：不可变对象可以被安全地缓存，提高性能，特别是在函数式编程中。
5. **历史记录**：不可变性使实现历史记录和撤销功能变得更加简单。

通过将不可变性原则与状态模式结合，开发者可以创建更加安全、可靠和可维护的状态管理系统。

### 5.5 高阶函数与访问者模式

#### 概念原理

高阶函数是函数式编程的核心概念之一，它是指接受函数作为参数或返回函数的函数。在C++中，我们可以使用函数指针、函数对象、Lambda表达式和std::function来实现高阶函数。

访问者模式是一种行为型设计模式，它允许在不修改对象结构的前提下，定义作用于这些对象的新操作。传统访问者模式通常使用虚函数和重载来实现，但我们可以结合高阶函数，创建更加灵活和可扩展的访问者模式实现。

高阶函数与访问者模式的结合可以带来以下好处：
1. **灵活性**：可以动态定义和组合访问操作，无需修改被访问的类。
2. **可扩展性**：可以轻松添加新的访问操作，而不影响现有的代码。
3. **代码复用**：可以组合多个高阶函数，创建更复杂的访问操作。
4. **类型安全**：利用C++的类型系统，在编译时检查访问操作的正确性。

#### 设计模式应用

##### 高阶函数访问者模式的实现

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include <functional>
#include <variant>
#include <map>

// 使用std::variant表示不同类型的元素
using Element = std::variant<class Circle, class Rectangle, class Triangle>;

// 图形基类
class Shape {
public:
    virtual ~Shape() = default;
    virtual std::string getName() const = 0;
    virtual double getArea() const = 0;
    virtual void accept(std::function<void(const Circle&)> circleVisitor,
                        std::function<void(const Rectangle&)> rectangleVisitor,
                        std::function<void(const Triangle&)> triangleVisitor) const = 0;
};

// 圆形类
class Circle : public Shape {
public:
    Circle(double radius) : radius_(radius) {}
    
    std::string getName() const override {
        return "Circle";
    }
    
    double getArea() const override {
        return 3.14159 * radius_ * radius_;
    }
    
    double getRadius() const {
        return radius_;
    }
    
    void accept(std::function<void(const Circle&)> circleVisitor,
               std::function<void(const Rectangle&)> /*rectangleVisitor*/,
               std::function<void(const Triangle&)> /*triangleVisitor*/) const override {
        circleVisitor(*this);
    }
    
private:
    double radius_;
};

// 矩形类
class Rectangle : public Shape {
public:
    Rectangle(double width, double height) : width_(width), height_(height) {}
    
    std::string getName() const override {
        return "Rectangle";
    }
    
    double getArea() const override {
        return width_ * height_;
    }
    
    double getWidth() const {
        return width_;
    }
    
    double getHeight() const {
        return height_;
    }
    
    void accept(std::function<void(const Circle&)> /*circleVisitor*/,
               std::function<void(const Rectangle&)> rectangleVisitor,
               std::function<void(const Triangle&)> /*triangleVisitor*/) const override {
        rectangleVisitor(*this);
    }
    
private:
    double width_;
    double height_;
};

// 三角形类
class Triangle : public Shape {
public:
    Triangle(double base, double height) : base_(base), height_(height) {}
    
    std::string getName() const override {
        return "Triangle";
    }
    
    double getArea() const override {
        return 0.5 * base_ * height_;
    }
    
    double getBase() const {
        return base_;
    }
    
    double getHeight() const {
        return height_;
    }
    
    void accept(std::function<void(const Circle&)> /*circleVisitor*/,
               std::function<void(const Rectangle&)> /*rectangleVisitor*/,
               std::function<void(const Triangle&)> triangleVisitor) const override {
        triangleVisitor(*this);
    }
    
private:
    double base_;
    double height_;
};

// 高阶函数访问者
class HighOrderVisitor {
public:
    // 创建一个打印访问者
    static auto createPrintVisitor() {
        return std::make_tuple(
            std::function<void(const Circle&)>([](const Circle& circle) {
                std::cout << "Circle with radius " << circle.getRadius() 
                          << ", area: " << circle.getArea() << std::endl;
            }),
            std::function<void(const Rectangle&)>([](const Rectangle& rectangle) {
                std::cout << "Rectangle with width " << rectangle.getWidth() 
                          << " and height " << rectangle.getHeight()
                          << ", area: " << rectangle.getArea() << std::endl;
            }),
            std::function<void(const Triangle&)>([](const Triangle& triangle) {
                std::cout << "Triangle with base " << triangle.getBase() 
                          << " and height " << triangle.getHeight()
                          << ", area: " << triangle.getArea() << std::endl;
            })
        );
    }
    
    // 创建一个面积计算访问者
    static auto createAreaVisitor() {
        return std::make_tuple(
            std::function<void(const Circle&)>([](const Circle& circle) {
                std::cout << "Circle area: " << circle.getArea() << std::endl;
            }),
            std::function<void(const Rectangle&)>([](const Rectangle& rectangle) {
                std::cout << "Rectangle area: " << rectangle.getArea() << std::endl;
            }),
            std::function<void(const Triangle&)>([](const Triangle& triangle) {
                std::cout << "Triangle area: " << triangle.getArea() << std::endl;
            })
        );
    }
    
    // 创建一个周长计算访问者
    static auto createPerimeterVisitor() {
        return std::make_tuple(
            std::function<void(const Circle&)>([](const Circle& circle) {
                double perimeter = 2 * 3.14159 * circle.getRadius();
                std::cout << "Circle perimeter: " << perimeter << std::endl;
            }),
            std::function<void(const Rectangle&)>([](const Rectangle& rectangle) {
                double perimeter = 2 * (rectangle.getWidth() + rectangle.getHeight());
                std::cout << "Rectangle perimeter: " << perimeter << std::endl;
            }),
            std::function<void(const Triangle&)>([](const Triangle& triangle) {
                // 假设是等腰三角形，计算斜边
                double base = triangle.getBase();
                double height = triangle.getHeight();
                double side = std::sqrt(height * height + (base/2) * (base/2));
                double perimeter = base + 2 * side;
                std::cout << "Triangle perimeter: " << perimeter << std::endl;
            })
        );
    }
    
    // 组合多个访问者
    template<typename... Visitors>
    static auto combineVisitors(Visitors... visitors) {
        return std::make_tuple(
            combineCircleVisitors(visitors...),
            combineRectangleVisitors(visitors...),
            combineTriangleVisitors(visitors...)
        );
    }
    
private:
    // 组合圆形访问者
    template<typename... Visitors>
    static auto combineCircleVisitors(Visitors... visitors) {
        return std::function<void(const Circle&)>([visitors...](const Circle& circle) {
            (std::get<0>(visitors)(circle), ...);
        });
    }
    
    // 组合矩形访问者
    template<typename... Visitors>
    static auto combineRectangleVisitors(Visitors... visitors) {
        return std::function<void(const Rectangle&)>([visitors...](const Rectangle& rectangle) {
            (std::get<1>(visitors)(rectangle), ...);
        });
    }
    
    // 组合三角形访问者
    template<typename... Visitors>
    static auto combineTriangleVisitors(Visitors... visitors) {
        return std::function<void(const Triangle&)>([visitors...](const Triangle& triangle) {
            (std::get<2>(visitors)(triangle), ...);
        });
    }
};

// 图形集合类
class ShapeCollection {
public:
    void addShape(std::shared_ptr<Shape> shape) {
        shapes_.push_back(shape);
    }
    
    // 接受访问者
    void accept(std::function<void(const Circle&)> circleVisitor,
                std::function<void(const Rectangle&)> rectangleVisitor,
                std::function<void(const Triangle&)> triangleVisitor) const {
        for (const auto& shape : shapes_) {
            shape->accept(circleVisitor, rectangleVisitor, triangleVisitor);
        }
    }
    
    // 获取形状数量
    size_t size() const {
        return shapes_.size();
    }
    
    // 清空集合
    void clear() {
        shapes_.clear();
    }
    
private:
    std::vector<std::shared_ptr<Shape>> shapes_;
};

// 高阶函数处理器
class HighOrderProcessor {
public:
    // 创建一个过滤器
    template<typename Predicate>
    static auto filter(Predicate predicate) {
        return [predicate](const std::vector<std::shared_ptr<Shape>>& shapes) {
            std::vector<std::shared_ptr<Shape>> result;
            for (const auto& shape : shapes) {
                if (predicate(shape)) {
                    result.push_back(shape);
                }
            }
            return result;
        };
    }
    
    // 创建一个映射器
    template<typename Mapper>
    static auto map(Mapper mapper) {
        return [mapper](const std::vector<std::shared_ptr<Shape>>& shapes) {
            std::vector<std::shared_ptr<Shape>> result;
            for (const auto& shape : shapes) {
                result.push_back(mapper(shape));
            }
            return result;
        };
    }
    
    // 创建一个归约器
    template<typename T, typename Reducer>
    static auto reduce(T initialValue, Reducer reducer) {
        return [initialValue, reducer](const std::vector<std::shared_ptr<Shape>>& shapes) {
            T result = initialValue;
            for (const auto& shape : shapes) {
                result = reducer(result, shape);
            }
            return result;
        };
    }
    
    // 组合多个处理器
    template<typename... Processors>
    static auto compose(Processors... processors) {
        return [processors...](const std::vector<std::shared_ptr<Shape>>& shapes) {
            std::vector<std::shared_ptr<Shape>> result = shapes;
            (result = processors(result), ...);
            return result;
        };
    }
};

// 使用示例
int main() {
    std::cout << "--- High-Order Function Visitor Pattern ---\n" << std::endl;
    
    // 创建图形集合
    ShapeCollection collection;
    collection.addShape(std::make_shared<Circle>(5.0));
    collection.addShape(std::make_shared<Rectangle>(4.0, 6.0));
    collection.addShape(std::make_shared<Triangle>(3.0, 4.0));
    collection.addShape(std::make_shared<Circle>(2.5));
    collection.addShape(std::make_shared<Rectangle>(2.0, 3.0));
    
    std::cout << "Using print visitor:" << std::endl;
    auto printVisitor = HighOrderVisitor::createPrintVisitor();
    collection.accept(std::get<0>(printVisitor), 
                     std::get<1>(printVisitor), 
                     std::get<2>(printVisitor));
    
    std::cout << "\nUsing area visitor:" << std::endl;
    auto areaVisitor = HighOrderVisitor::createAreaVisitor();
    collection.accept(std::get<0>(areaVisitor), 
                     std::get<1>(areaVisitor), 
                     std::get<2>(areaVisitor));
    
    std::cout << "\nUsing perimeter visitor:" << std::endl;
    auto perimeterVisitor = HighOrderVisitor::createPerimeterVisitor();
    collection.accept(std::get<0>(perimeterVisitor), 
                     std::get<1>(perimeterVisitor), 
                     std::get<2>(perimeterVisitor));
    
    std::cout << "\nUsing combined visitor (area + perimeter):" << std::endl;
    auto combinedVisitor = HighOrderVisitor::combineVisitors(areaVisitor, perimeterVisitor);
    collection.accept(std::get<0>(combinedVisitor), 
                     std::get<1>(combinedVisitor), 
                     std::get<2>(combinedVisitor));
    
    std::cout << "\n--- High-Order Function Processing ---\n" << std::endl;
    
    // 创建形状向量
    std::vector<std::shared_ptr<Shape>> shapes = {
        std::make_shared<Circle>(5.0),
        std::make_shared<Rectangle>(4.0, 6.0),
        std::make_shared<Triangle>(3.0, 4.0),
        std::make_shared<Circle>(2.5),
        std::make_shared<Rectangle>(2.0, 3.0)
    };
    
    // 过滤出面积大于10的形状
    auto areaFilter = HighOrderProcessor::filter([](const std::shared_ptr<Shape>& shape) {
        return shape->getArea() > 10.0;
    });
    
    auto largeShapes = areaFilter(shapes);
    std::cout << "Shapes with area > 10:" << std::endl;
    for (const auto& shape : largeShapes) {
        std::cout << shape->getName() << " (area: " << shape->getArea() << ")" << std::endl;
    }
    
    // 计算所有形状的总面积
    auto totalArea = HighOrderProcessor::reduce<double>(
        0.0,
        [](double acc, const std::shared_ptr<Shape>& shape) {
            return acc + shape->getArea();
        }
    );
    
    double sum = totalArea(shapes);
    std::cout << "\nTotal area of all shapes: " << sum << std::endl;
    
    // 组合处理器：先过滤，再计算总面积
    auto composedProcessor = HighOrderProcessor::compose(
        areaFilter,
        HighOrderProcessor::reduce<double>(0.0, [](double acc, const std::shared_ptr<Shape>& shape) {
            return acc + shape->getArea();
        })
    );
    
    double largeShapesArea = composedProcessor(shapes);
    std::cout << "Total area of shapes with area > 10: " << largeShapesArea << std::endl;
    
    return 0;
}
```

##### 函数式访问者模式的实现

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include <functional>
#include <map>
#include <any>

// 使用std::any和类型擦除实现更通用的访问者模式
class FunctionalVisitor {
public:
    // 访问者函数类型
    template<typename T>
    using VisitorFunction = std::function<void(const T&)>;
    
    // 添加访问者函数
    template<typename T>
    void addVisitor(VisitorFunction<T> visitor) {
        visitors_[typeid(T)] = [visitor](const std::any& object) {
            visitor(std::any_cast<const T&>(object));
        };
    }
    
    // 访问对象
    template<typename T>
    void visit(const T& object) const {
        auto it = visitors_.find(typeid(T));
        if (it != visitors_.end()) {
            it->second(object);
        } else {
            std::cout << "No visitor found for type: " << typeid(T).name() << std::endl;
        }
    }
    
    // 访问对象指针
    template<typename T>
    void visit(const std::shared_ptr<T>& object) const {
        if (object) {
            visit(*object);
        }
    }
    
    // 访问对象集合
    template<typename T>
    void visit(const std::vector<std::shared_ptr<T>>& objects) const {
        for (const auto& object : objects) {
            visit(object);
        }
    }
    
    // 访问异构对象集合
    void visit(const std::vector<std::any>& objects) const {
        for (const auto& object : objects) {
            auto it = visitors_.find(object.type());
            if (it != visitors_.end()) {
                it->second(object);
            } else {
                std::cout << "No visitor found for type: " << object.type().name() << std::endl;
            }
        }
    }
    
    // 组合多个访问者
    template<typename T>
    static VisitorFunction<T> combine(VisitorFunction<T> first, VisitorFunction<T> second) {
        return [first, second](const T& object) {
            first(object);
            second(object);
        };
    }
    
    // 创建条件访问者
    template<typename T>
    static VisitorFunction<T> conditional(std::function<bool(const T&)> condition, 
                                         VisitorFunction<T> trueVisitor, 
                                         VisitorFunction<T> falseVisitor = nullptr) {
        return [condition, trueVisitor, falseVisitor](const T& object) {
            if (condition(object)) {
                trueVisitor(object);
            } else if (falseVisitor) {
                falseVisitor(object);
            }
        };
    }
    
    // 创建映射访问者
    template<typename T, typename R>
    static std::function<R(const T&)> map(std::function<R(const T&)> mapper) {
        return mapper;
    }
    
    // 创建过滤访问者
    template<typename T>
    static VisitorFunction<T> filter(std::function<bool(const T&)> predicate, 
                                   VisitorFunction<T> visitor) {
        return [predicate, visitor](const T& object) {
            if (predicate(object)) {
                visitor(object);
            }
        };
    }
    
private:
    std::map<std::type_index, std::function<void(const std::any&)>> visitors_;
};

// 文档元素基类
class DocumentElement {
public:
    virtual ~DocumentElement() = default;
    virtual std::string getType() const = 0;
    virtual std::string getContent() const = 0;
};

// 文本元素
class TextElement : public DocumentElement {
public:
    TextElement(const std::string& text) : text_(text) {}
    
    std::string getType() const override {
        return "Text";
    }
    
    std::string getContent() const override {
        return text_;
    }
    
    const std::string& getText() const {
        return text_;
    }
    
private:
    std::string text_;
};

// 图像元素
class ImageElement : public DocumentElement {
public:
    ImageElement(const std::string& src, int width, int height) 
        : src_(src), width_(width), height_(height) {}
    
    std::string getType() const override {
        return "Image";
    }
    
    std::string getContent() const override {
        return src_;
    }
    
    const std::string& getSrc() const {
        return src_;
    }
    
    int getWidth() const {
        return width_;
    }
    
    int getHeight() const {
        return height_;
    }
    
private:
    std::string src_;
    int width_;
    int height_;
};

// 表格元素
class TableElement : public DocumentElement {
public:
    TableElement(int rows, int cols) : rows_(rows), cols_(cols) {}
    
    std::string getType() const override {
        return "Table";
    }
    
    std::string getContent() const override {
        return "Table with " + std::to_string(rows_) + " rows and " + std::to_string(cols_) + " columns";
    }
    
    int getRows() const {
        return rows_;
    }
    
    int getCols() const {
        return cols_;
    }
    
private:
    int rows_;
    int cols_;
};

// 文档类
class Document {
public:
    void addElement(std::shared_ptr<DocumentElement> element) {
        elements_.push_back(element);
    }
    
    const std::vector<std::shared_ptr<DocumentElement>>& getElements() const {
        return elements_;
    }
    
    void clear() {
        elements_.clear();
    }
    
    size_t size() const {
        return elements_.size();
    }
    
private:
    std::vector<std::shared_ptr<DocumentElement>> elements_;
};

// 使用示例
int main() {
    std::cout << "--- Functional Visitor Pattern ---\n" << std::endl;
    
    // 创建文档
    Document document;
    document.addElement(std::make_shared<TextElement>("Hello, World!"));
    document.addElement(std::make_shared<ImageElement>("image.jpg", 800, 600));
    document.addElement(std::make_shared<TableElement>(5, 3));
    document.addElement(std::make_shared<TextElement>("This is a functional visitor example."));
    document.addElement(std::make_shared<ImageElement>("logo.png", 200, 100));
    
    // 创建函数式访问者
    FunctionalVisitor visitor;
    
    // 添加文本访问者
    visitor.addVisitor<TextElement>([](const TextElement& text) {
        std::cout << "Text: " << text.getText() << std::endl;
    });
    
    // 添加图像访问者
    visitor.addVisitor<ImageElement>([](const ImageElement& image) {
        std::cout << "Image: " << image.getSrc() 
                  << " (" << image.getWidth() << "x" << image.getHeight() << ")" << std::endl;
    });
    
    // 添加表格访问者
    visitor.addVisitor<TableElement>([](const TableElement& table) {
        std::cout << "Table: " << table.getRows() << "x" << table.getCols() << std::endl;
    });
    
    // 访问所有元素
    std::cout << "Visiting all elements:" << std::endl;
    for (const auto& element : document.getElements()) {
        if (auto text = std::dynamic_pointer_cast<TextElement>(element)) {
            visitor.visit(text);
        } else if (auto image = std::dynamic_pointer_cast<ImageElement>(element)) {
            visitor.visit(image);
        } else if (auto table = std::dynamic_pointer_cast<TableElement>(element)) {
            visitor.visit(table);
        }
    }
    
    // 创建组合访问者
    auto printTextVisitor = [](const TextElement& text) {
        std::cout << "Text content: " << text.getText() << std::endl;
    };
    
    auto countTextVisitor = [](const TextElement& text) {
        static int count = 0;
        count++;
        std::cout << "Text #" << count << std::endl;
    };
    
    auto combinedTextVisitor = FunctionalVisitor::combine(printTextVisitor, countTextVisitor);
    
    // 创建条件访问者
    auto longTextVisitor = FunctionalVisitor::conditional<TextElement>(
        [](const TextElement& text) { return text.getText().length() > 20; },
        [](const TextElement& text) { 
            std::cout << "Long text: " << text.getText() << std::endl; 
        },
        [](const TextElement& text) { 
            std::cout << "Short text: " << text.getText() << std::endl; 
        }
    );
    
    std::cout << "\nUsing combined text visitor:" << std::endl;
    for (const auto& element : document.getElements()) {
        if (auto text = std::dynamic_pointer_cast<TextElement>(element)) {
            combinedTextVisitor(*text);
        }
    }
    
    std::cout << "\nUsing conditional text visitor:" << std::endl;
    for (const auto& element : document.getElements()) {
        if (auto text = std::dynamic_pointer_cast<TextElement>(element)) {
            longTextVisitor(*text);
        }
    }
    
    // 创建过滤访问者
    auto largeImageVisitor = FunctionalVisitor::filter<ImageElement>(
        [](const ImageElement& image) { return image.getWidth() > 300; },
        [](const ImageElement& image) {
            std::cout << "Large image: " << image.getSrc() 
                      << " (" << image.getWidth() << "x" << image.getHeight() << ")" << std::endl;
        }
    );
    
    std::cout << "\nUsing filtered image visitor:" << std::endl;
    for (const auto& element : document.getElements()) {
        if (auto image = std::dynamic_pointer_cast<ImageElement>(element)) {
            largeImageVisitor(*image);
        }
    }
    
    return 0;
}
```

#### 实践意义

高阶函数与访问者模式的结合为软件开发提供了强大的工具：

1. **灵活性**：可以动态定义和组合访问操作，无需修改被访问的类，提高了代码的灵活性。
2. **可扩展性**：可以轻松添加新的访问操作，而不影响现有的代码，符合开闭原则。
3. **代码复用**：可以组合多个高阶函数，创建更复杂的访问操作，提高代码复用性。
4. **类型安全**：利用C++的类型系统，在编译时检查访问操作的正确性，减少运行时错误。
5. **函数式思维**：将面向对象的访问者模式与函数式编程的高阶函数结合，提供更加抽象和通用的解决方案。

通过高阶函数与访问者模式的结合，开发者可以创建更加灵活、可扩展和类型安全的访问操作，适应不断变化的需求。

## 本章小结

函数式编程思想与设计模式的结合为现代C++开发提供了强大的工具和思维方式。本章探讨了函数式编程的核心概念及其与各种设计模式的融合应用。

### 关键要点

1. **函数式编程基础**：纯函数、无副作用、不可变性等概念为设计模式提供了新的实现思路。
2. **Lambda表达式**：作为C++11引入的重要特性，Lambda表达式使函数式编程在C++中变得更加自然和便捷。
3. **函数组合与管道模式**：将复杂处理过程分解为多个独立的步骤，提高代码的模块化和可维护性。
4. **不可变性与状态模式**：结合不可变性原则，创建更加安全和可预测的状态管理系统。
5. **高阶函数与访问者模式**：利用高阶函数的灵活性，创建更加动态和可扩展的访问操作。

### 实践建议

1. **合理选择**：根据具体需求选择合适的设计模式实现方式，不要盲目追求函数式风格。
2. **平衡考虑**：在面向对象和函数式编程之间找到平衡点，发挥两者的优势。
3. **性能意识**：注意函数式编程可能带来的性能开销，特别是在高频调用的场景中。
4. **团队协作**：确保团队成员理解函数式编程概念，以便更好地协作和维护代码。

函数式编程思想与设计模式的结合代表了现代C++开发的一个重要趋势，掌握这些技术将有助于开发者编写更加简洁、灵活和高效的代码。

## 6. 章节总结

现代C++的发展极大地丰富了设计模式的实现方式和应用场景。通过前五章的探讨，我们深入了解了现代C++特性与设计模式的融合，本章将对这些内容进行总结，归纳现代C++对设计模式的影响和最佳实践。

## 6.1 现代C++对设计模式的影响

### 6.1.1 语法特性对设计模式实现的影响

现代C++引入的语法特性从根本上改变了设计模式的实现方式：

1. **Lambda表达式**：简化了命令模式、策略模式等需要函数对象的模式实现，使代码更加简洁和直观。
2. **智能指针**：彻底改变了资源管理模式，使RAII原则的应用更加广泛和自然。
3. **右值引用和移动语义**：优化了对象复制和移动操作，提高了性能，特别是在工厂模式和建造者模式中。
4. **可变参数模板**：简化了抽象工厂和建造者模式的实现，提高了代码的灵活性。
5. **auto关键字和范围for循环**：减少了样板代码，提高了代码的可读性和维护性。

### 6.1.2 标准库对设计模式实现的影响

C++标准库的扩展为设计模式实现提供了更多支持：

1. **STL容器和算法**：提供了丰富的数据结构和算法，减少了实现迭代器模式、策略模式等的工作量。
2. **std::function和std::bind**：简化了函数对象的创建和使用，使命令模式、观察者模式等更加灵活。
3. **std::variant和std::optional**：提供了类型安全的联合类型和可选类型，简化了访问者模式和空对象模式的实现。
4. **并发库**：提供了线程、互斥锁、条件变量等并发原语，简化了主动对象模式和生产者-消费者模式的实现。
5. **std::format**：提供了类型安全的格式化功能，简化了建造者模式中复杂对象构建的实现。

### 6.1.3 编程范式对设计模式的影响

现代C++支持多种编程范式的融合，对设计模式产生了深远影响：

1. **泛型编程**：模板元编程使设计模式可以在编译时实现，提高了性能和类型安全性。
2. **函数式编程**：高阶函数、Lambda表达式等函数式特性为设计模式提供了新的实现思路。
3. **面向对象编程**：仍然是设计模式的主要应用领域，但现代C++特性使其实现更加简洁和高效。
4. **并发编程**：C++11及后续标准对并发的支持使并发设计模式的实现更加安全和便捷。

## 6.2 现代C++设计模式最佳实践

### 6.2.1 选择合适的设计模式实现方式

现代C++提供了多种实现设计模式的方式，选择合适的方式至关重要：

1. **传统面向对象实现**：适用于需要多态性和运行时多态的场景。
2. **模板实现**：适用于需要编译时多态和类型安全的场景。
3. **函数式实现**：适用于需要高阶函数和函数组合的场景。
4. **混合实现**：结合多种编程范式的优势，根据具体需求灵活选择。

### 6.2.2 遵循现代C++最佳实践

在使用现代C++特性实现设计模式时，应遵循以下最佳实践：

1. **优先使用智能指针**：避免原始指针和手动内存管理，减少内存泄漏和悬垂指针的风险。
2. **合理使用Lambda表达式**：避免过度复杂的Lambda表达式，保持代码的可读性。
3. **谨慎使用模板元编程**：权衡编译时计算和运行时性能，避免过度复杂的模板代码。
4. **充分利用标准库**：优先使用标准库提供的组件，减少重复造轮子。
5. **注重异常安全**：确保设计模式实现符合异常安全保证，特别是资源管理相关模式。

### 6.2.3 性能与可维护性的平衡

设计模式的实现需要在性能和可维护性之间找到平衡：

1. **避免过度工程**：不要为了使用设计模式而使用设计模式，根据实际需求选择合适的模式。
2. **性能分析**：对关键路径进行性能分析，确保设计模式实现不会成为性能瓶颈。
3. **代码审查**：定期进行代码审查，确保设计模式实现符合团队规范和最佳实践。
4. **文档和注释**：为复杂的设计模式实现提供充分的文档和注释，提高代码的可维护性。

## 6.3 现代C++设计模式应用场景

### 6.3.1 系统架构设计

现代C++设计模式在系统架构设计中扮演重要角色：

1. **微服务架构**：使用工厂模式和依赖注入实现服务的创建和管理。
2. **事件驱动架构**：使用观察者模式和发布-订阅模式实现事件的发布和处理。
3. **插件架构**：使用策略模式和命令模式实现插件系统的扩展和配置。
4. **分层架构**：使用外观模式和代理模式实现层之间的通信和访问控制。

### 6.3.2 并发与分布式系统

现代C++的并发特性为并发和分布式系统设计提供了强大支持：

1. **并发控制**：使用观察者模式实现线程间通信，使用主动对象模式封装并发访问。
2. **资源管理**：使用单例模式管理共享资源，使用享元模式减少内存占用。
3. **任务调度**：使用命令模式封装任务，使用策略模式实现不同的调度算法。
4. **分布式通信**：使用代理模式封装远程服务，使用适配器模式集成不同的通信协议。

### 6.3.3 用户界面与交互设计

现代C++设计模式在用户界面和交互设计中也有广泛应用：

1. **MVC架构**：使用观察者模式实现模型和视图的同步，使用命令模式封装用户操作。
2. **响应式界面**：使用观察者模式实现数据绑定，使用状态模式管理界面状态。
3. **插件系统**：使用工厂模式创建插件，使用装饰器模式扩展组件功能。
4. **国际化支持**：使用策略模式实现不同语言的本地化，使用抽象工厂模式创建本地化资源。

## 6.4 现代C++设计模式发展趋势

### 6.4.1 编译时设计模式的兴起

随着C++模板元编程能力的增强，编译时设计模式越来越受到关注：

1. **编译时多态**：使用模板和概念实现编译时多态，避免运行时开销。
2. **编译时验证**：使用静态断言和概念在编译时验证设计模式的正确性。
3. **编译时优化**：利用模板特化和SFINAE实现编译时优化，提高程序性能。
4. **编译时代码生成**：使用模板元编程生成代码，减少重复代码和错误。

### 6.4.2 函数式设计模式的普及

函数式编程思想在C++中的普及推动了函数式设计模式的发展：

1. **高阶函数模式**：使用高阶函数替代传统的面向对象模式，提高代码的灵活性。
2. **不可变数据结构**：使用不可变数据结构简化并发编程，提高代码的安全性。
3. **函数组合**：使用函数组合替代复杂的继承层次，提高代码的可维护性。
4. **惰性求值**：使用惰性求值技术优化性能，特别是在处理大数据集时。

### 6.4.3 异步设计模式的标准化

C++20引入的协程等特性正在推动异步设计模式的标准化：

1. **协程模式**：使用协程简化异步编程，提高代码的可读性。
2. **异步迭代器**：使用异步迭代器处理异步数据流，简化异步数据处理。
3. **异步生成器**：使用异步生成器实现惰性异步数据生成，提高资源利用效率。
4. **异步管道**：使用异步管道组合异步操作，提高异步代码的模块化程度。

## 6.5 现代C++设计模式学习路径

### 6.5.1 基础阶段

对于初学者，建议按照以下路径学习现代C++设计模式：

1. **掌握现代C++基础**：熟悉C++11/14/17/20的核心特性，包括智能指针、Lambda表达式、右值引用等。
2. **理解经典设计模式**：学习GoF设计模式的基本概念和应用场景，理解每个模式的意图和结构。
3. **实践简单模式**：从简单的设计模式开始实践，如单例模式、工厂模式、观察者模式等。
4. **阅读优秀代码**：阅读使用现代C++实现设计模式的优秀代码，学习最佳实践。

### 6.5.2 进阶阶段

对于有一定基础的开发者，建议深入学习以下内容：

1. **模板元编程**：学习模板元编程技术，理解编译时设计模式的实现原理。
2. **函数式编程**：学习函数式编程思想，理解函数式设计模式的优势和应用场景。
3. **并发编程**：学习C++并发编程技术，理解并发设计模式的实现和优化。
4. **性能优化**：学习性能分析和优化技术，理解如何优化设计模式的性能。

### 6.5.3 高级阶段

对于高级开发者，建议关注以下内容：

1. **语言特性前沿**：关注C++标准的最新发展，理解新特性对设计模式的影响。
2. **架构设计**：学习如何将设计模式应用于系统架构设计，理解模式之间的关系和组合。
3. **领域特定语言**：学习如何使用设计模式创建领域特定语言，提高代码的表达力。
4. **设计模式创新**：探索新的设计模式，或者对现有模式进行创新和改进。

## 6.6 现代C++设计模式资源推荐

### 6.6.1 书籍推荐

1. **《现代C++设计模式》**：深入探讨现代C++特性与设计模式的结合。
2. **《C++模板元编程实战》**：详细介绍模板元编程技术和编译时设计模式。
3. **《C++并发编程实战》**：全面介绍C++并发编程技术和并发设计模式。
4. **《函数式编程思维》**：介绍函数式编程思想及其在C++中的应用。

### 6.6.2 在线资源

1. **CppReference**：C++标准库和语言特性的权威参考。
2. **C++ Core Guidelines**：C++核心指南，包含现代C++最佳实践。
3. **GitHub上的现代C++项目**：学习实际项目中设计模式的应用。
4. **Stack Overflow**：解决现代C++设计模式实现中的具体问题。

### 6.6.3 社区与会议

1. **C++Now**：专注于现代C++和高级技术的国际会议。
2. **CppCon**：C++社区的大型年度会议，涵盖各种C++主题。
3. **本地C++用户组**：参与本地C++社区活动，与其他开发者交流经验。
4. **在线论坛和博客**：关注C++领域的知名博客和论坛，获取最新信息。

## 本章小结

现代C++的发展为设计模式的实现和应用带来了革命性的变化。通过本章的总结，我们归纳了现代C++对设计模式的影响、最佳实践、应用场景和发展趋势。

### 关键要点

1. **语法特性影响**：Lambda表达式、智能指针、右值引用等现代C++特性从根本上改变了设计模式的实现方式。
2. **标准库支持**：STL容器、算法、并发库等标准库组件为设计模式实现提供了强大支持。
3. **编程范式融合**：泛型编程、函数式编程等编程范式的融合为设计模式提供了新的实现思路。
4. **最佳实践**：选择合适的实现方式、遵循现代C++最佳实践、平衡性能与可维护性是成功应用设计模式的关键。
5. **发展趋势**：编译时设计模式、函数式设计模式、异步设计模式代表了未来发展方向。

### 实践建议

1. **循序渐进**：从基础开始，逐步掌握现代C++设计模式的实现和应用。
2. **理论结合实践**：在学习理论知识的同时，通过实践加深理解。
3. **持续学习**：关注C++标准的最新发展，不断更新知识和技能。
4. **社区参与**：积极参与C++社区，与其他开发者交流经验和见解。

现代C++设计模式是一个不断发展的领域，掌握这些技术将有助于开发者编写更加高效、可维护和可扩展的代码。通过持续学习和实践，我们可以更好地应用现代C++特性，解决实际问题，推动软件开发的进步。

## 7. 结语

## 7.1 回顾与展望

### 7.1.1 内容回顾

本书深入探讨了现代C++特性与设计模式的融合应用，从C++11到C++20，从智能指针到协程，从模板元编程到函数式编程，我们全面分析了现代C++如何改变和丰富设计模式的实现方式。

1. **现代C++与设计模式概述**：我们首先了解了C++的演进历程，以及设计模式在现代C++中的重要性。现代C++不仅仅是语法的扩展，更是编程思维和范式的革新。

2. **智能指针与资源管理模式**：深入探讨了unique_ptr、shared_ptr和weak_ptr如何改变资源管理模式，使RAII原则的应用更加自然和安全。

3. **C++20概念与设计模式**：分析了C++20引入的概念、协程、模块等新特性如何影响设计模式的实现，特别是概念如何提供编译时约束，协程如何简化异步编程。

4. **模板元编程与设计模式**：展示了模板技术如何实现编译时设计模式，通过SFINAE、模板特化等技术，在编译时完成传统设计模式的功能。

5. **函数式编程思想与设计模式**：探讨了函数式编程思想如何与面向对象设计模式融合，通过Lambda表达式、高阶函数等特性，创建更加灵活和可维护的代码。

6. **章节总结**：归纳了现代C++对设计模式的影响、最佳实践、应用场景和发展趋势，为读者提供了系统的学习路径和资源推荐。

### 7.1.2 未来展望

C++语言和设计模式的发展仍在继续，我们可以预见以下几个趋势：

1. **更多语言特性支持**：未来的C++标准可能会引入更多支持设计模式的特性，如反射、元类等，进一步简化设计模式的实现。

2. **编译时编程增强**：随着consteval、consteval函数等特性的增强，编译时编程将变得更加强大，更多设计模式可以在编译时实现。

3. **异步编程标准化**：协程和相关异步编程特性将继续发展，异步设计模式将更加标准化和易用。

4. **跨平台工具支持**：IDE和开发工具将提供更好的现代C++设计模式支持，包括代码生成、重构和验证等功能。

5. **性能与安全并重**：未来的设计模式实现将更加注重性能和安全性的平衡，特别是在系统级编程和嵌入式领域。

## 7.2 设计模式的本质

### 7.2.1 设计模式的核心价值

尽管实现方式在不断变化，但设计模式的核心价值始终不变：

1. **经验复用**：设计模式是前人经验的结晶，帮助我们避免重复发明轮子，直接应用经过验证的解决方案。

2. **沟通效率**：设计模式提供了一套通用的词汇和概念，使开发者之间的沟通更加高效和准确。

3. **系统思维**：设计模式帮助我们从整体角度思考系统设计，关注组件之间的关系和交互，而不仅仅是单个组件的实现。

4. **灵活性和可维护性**：通过应用设计模式，我们可以创建更加灵活、可扩展和易于维护的系统。

5. **质量保证**：设计模式经过长期验证，应用它们可以提高代码质量和系统可靠性。

### 7.2.2 设计模式的局限性

设计模式并非银弹，我们也需要认识到它们的局限性：

1. **过度设计风险**：不当使用设计模式可能导致过度设计，增加系统复杂性。

2. **性能开销**：某些设计模式可能引入额外的间接层，影响系统性能。

3. **学习曲线**：掌握设计模式需要时间和经验，对初学者来说有一定难度。

4. **适用性限制**：设计模式并非适用于所有场景，需要根据具体需求选择合适的模式。

5. **实现复杂性**：某些设计模式的实现可能比较复杂，特别是在没有语言特性支持的情况下。

## 7.3 现代C++设计模式的实践建议

### 7.3.1 实践原则

在实际应用现代C++设计模式时，建议遵循以下原则：

1. **需求驱动**：根据实际需求选择设计模式，而不是为了使用模式而使用模式。

2. **简洁优先**：优先选择简单、直接的解决方案，只有在必要时才引入复杂的设计模式。

3. **性能意识**：关注设计模式对性能的影响，特别是在关键路径上。

4. **团队协作**：确保团队成员对使用的设计模式有共同理解，避免沟通障碍。

5. **持续重构**：随着需求变化，持续重构和优化设计模式的应用。

### 7.3.2 实践策略

以下是一些实践策略，帮助更好地应用现代C++设计模式：

1. **渐进式应用**：从简单的设计模式开始，逐步引入更复杂的模式。

2. **代码审查**：通过代码审查确保设计模式的正确应用和实现。

3. **性能测试**：对关键设计模式进行性能测试，确保满足性能要求。

4. **文档记录**：为复杂的设计模式应用提供充分的文档，包括意图、结构和实现细节。

5. **培训分享**：定期组织团队内部分享和培训，提高团队整体的设计模式应用水平。

## 7.4 持续学习与成长

### 7.4.1 学习资源

为了持续学习和成长，建议关注以下资源：

1. **官方标准**：关注C++标准的最新发展，了解新特性对设计模式的影响。

2. **开源项目**：研究优秀的开源项目，学习现代C++设计模式的实际应用。

3. **技术社区**：参与C++技术社区，与其他开发者交流经验和见解。

4. **技术会议**：参加C++相关的技术会议，了解最新的发展趋势和最佳实践。

5. **专业书籍**：阅读现代C++和设计模式相关的专业书籍，系统学习理论知识。

### 7.4.2 实践项目

通过实践项目巩固和应用所学知识：

1. **个人项目**：在个人项目中尝试应用不同的设计模式，积累实践经验。

2. **开源贡献**：参与开源项目，学习如何在大型项目中应用设计模式。

3. **重构练习**：选择现有代码，尝试使用现代C++设计模式进行重构。

4. **代码审查**：参与代码审查，学习他人的设计模式应用经验。

5. **技术分享**：通过技术分享和博客写作，加深对设计模式的理解。

## 7.5 结语

现代C++的发展为设计模式的实现和应用带来了前所未有的机遇。通过将现代C++特性与经典设计模式相结合，我们可以创建更加高效、可维护和可扩展的软件系统。

本书的目的不仅是介绍现代C++设计模式的技术细节，更是希望能够激发读者对软件设计的思考，帮助读者建立系统化的设计思维。设计模式不是一成不变的教条，而是需要根据具体场景灵活应用的工具。

在未来的软件开发中，C++将继续演进，新的语言特性和编程范式将不断涌现。作为C++开发者，我们需要保持开放的心态，持续学习和适应新的变化，同时也要坚守软件设计的核心原则和价值。

希望本书能够成为您学习和应用现代C++设计模式的起点，而不是终点。通过不断的学习、实践和思考，我们可以在软件设计的道路上走得更远，创造出更加优秀的软件作品。

最后，祝愿每一位C++开发者都能在现代C++的世界中找到乐趣，实现自己的技术理想和职业目标。让我们一起推动C++和软件设计的发展，为构建更加美好的数字世界贡献力量。

---

**感谢您的阅读！**

如果您对本书内容有任何疑问、建议或反馈，欢迎通过以下方式联系我们：

- 邮箱：contact@example.com
- GitHub：https://github.com/example/modern-cpp-design-patterns
- 技术博客：https://blog.example.com

再次感谢您的支持！
