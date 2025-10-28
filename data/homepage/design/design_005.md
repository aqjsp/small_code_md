# 第5章：行为型设计模式

## 目录

- [1. 责任链模式](#1-责任链模式)
  - [1.1 概念定义](#11-概念定义)
  - [1.2 历史背景](#12-历史背景)
  - [1.3 理论基础](#13-理论基础)
  - [1.4 数学模型](#14-数学模型)
  - [1.5 与软件质量属性的关系](#15-与软件质量属性的关系)
  - [1.6 实现方式](#16-实现方式)
  - [1.7 C++实现代码](#17-c实现代码)
  - [1.8 关键点总结](#18-关键点总结)
- [2. 命令模式](#2-命令模式)
  - [2.1 概念定义](#21-概念定义)
  - [2.2 历史背景](#22-历史背景)
  - [2.3 理论基础](#23-理论基础)
  - [2.4 数学模型](#24-数学模型)
  - [2.5 与软件质量属性的关系](#25-与软件质量属性的关系)
  - [2.6 实现方式](#26-实现方式)
  - [2.7 C++实现代码](#27-c实现代码)
  - [2.8 关键点总结](#28-关键点总结)
- [3. 迭代器模式](#3-迭代器模式)
  - [3.1 概念定义](#31-概念定义)
  - [3.2 历史背景](#32-历史背景)
  - [3.3 理论基础](#33-理论基础)
  - [3.4 数学模型](#34-数学模型)
  - [3.5 与软件质量属性的关系](#35-与软件质量属性的关系)
  - [3.6 实现方式](#36-实现方式)
  - [3.7 C++实现代码](#37-c实现代码)
  - [3.8 关键点总结](#38-关键点总结)
- [4. 中介者模式](#4-中介者模式)
  - [4.1 概念定义](#41-概念定义)
  - [4.2 历史背景](#42-历史背景)
  - [4.3 理论基础](#43-理论基础)
  - [4.4 数学模型](#44-数学模型)
  - [4.5 与软件质量属性的关系](#45-与软件质量属性的关系)
  - [4.6 实现方式](#46-实现方式)
  - [4.7 C++实现代码](#47-c实现代码)
  - [4.8 关键点总结](#48-关键点总结)
- [5. 备忘录模式](#5-备忘录模式)
  - [5.1 概念定义](#51-概念定义)
  - [5.2 历史背景](#52-历史背景)
  - [5.3 理论基础](#53-理论基础)
  - [5.4 数学模型](#54-数学模型)
  - [5.5 与软件质量属性的关系](#55-与软件质量属性的关系)
  - [5.6 实现方式](#56-实现方式)
  - [5.7 C++实现代码](#57-c实现代码)
  - [5.8 关键点总结](#58-关键点总结)
- [6. 观察者模式](#6-观察者模式)
  - [6.1 概念定义](#61-概念定义)
  - [6.2 历史背景](#62-历史背景)
  - [6.3 理论基础](#63-理论基础)
  - [6.4 数学模型](#64-数学模型)
  - [6.5 与软件质量属性的关系](#65-与软件质量属性的关系)
  - [6.6 实现方式](#66-实现方式)
  - [6.7 C++实现代码](#67-c实现代码)
  - [6.8 关键点总结](#68-关键点总结)
- [7. 状态模式](#7-状态模式)
  - [7.1 概念定义](#71-概念定义)
  - [7.2 历史背景](#72-历史背景)
  - [7.3 理论基础](#73-理论基础)
  - [7.4 数学模型](#74-数学模型)
  - [7.5 与软件质量属性的关系](#75-与软件质量属性的关系)
  - [7.6 实现方式](#76-实现方式)
  - [7.7 C++实现代码](#77-c实现代码)
  - [7.8 关键点总结](#78-关键点总结)
- [8. 策略模式](#8-策略模式)
  - [8.1 概念定义](#81-概念定义)
  - [8.2 历史背景](#82-历史背景)
  - [8.3 理论基础](#83-理论基础)
  - [8.4 数学模型](#84-数学模型)
  - [8.5 与软件质量属性的关系](#85-与软件质量属性的关系)
  - [8.6 实现方式](#86-实现方式)
  - [8.7 C++实现代码](#87-c实现代码)
  - [8.8 关键点总结](#88-关键点总结)
- [9. 模板方法模式](#9-模板方法模式)
  - [9.1 概念定义](#91-概念定义)
  - [9.2 历史背景](#92-历史背景)
  - [9.3 理论基础](#93-理论基础)
  - [9.4 数学模型](#94-数学模型)
  - [9.5 与软件质量属性的关系](#95-与软件质量属性的关系)
  - [9.6 实现方式](#96-实现方式)
  - [9.7 C++实现代码](#97-c实现代码)
  - [9.8 关键点总结](#98-关键点总结)
- [10. 访问者模式](#10-访问者模式)
  - [10.1 概念定义](#101-概念定义)
  - [10.2 历史背景](#102-历史背景)
  - [10.3 理论基础](#103-理论基础)
  - [10.4 数学模型](#104-数学模型)
  - [10.5 与软件质量属性的关系](#105-与软件质量属性的关系)
  - [10.6 实现方式](#106-实现方式)
  - [10.7 C++实现代码](#107-c实现代码)
  - [10.8 关键点总结](#108-关键点总结)
- [11. 空对象模式](#11-空对象模式)
  - [11.1 概念定义](#111-概念定义)
  - [11.2 历史背景](#112-历史背景)
  - [11.3 理论基础](#113-理论基础)
  - [11.4 数学模型](#114-数学模型)
  - [11.5 与软件质量属性的关系](#115-与软件质量属性的关系)
  - [11.6 实现方式](#116-实现方式)
  - [11.7 C++实现代码](#117-c实现代码)
  - [11.8 关键点总结](#118-关键点总结)
- [12. 章节总结](#12-章节总结)
  - [12.1 行为型设计模式的分类与特点](#121-行为型设计模式的分类与特点)
  - [12.2 行为型设计模式的设计原则](#122-行为型设计模式的设计原则)
  - [12.3 行为型设计模式的应用场景](#123-行为型设计模式的应用场景)
  - [12.4 行为型设计模式之间的关系](#124-行为型设计模式之间的关系)
  - [12.5 行为型设计模式的优缺点](#125-行为型设计模式的优缺点)
  - [12.6 行为型设计模式的最佳实践](#126-行为型设计模式的最佳实践)
  - [12.7 行为型设计模式的未来发展趋势](#127-行为型设计模式的未来发展趋势)

## 章节概述

行为型设计模式是GoF 23种设计模式中的第三大类，共包含11种模式，它们关注对象之间的通信和职责分配，以及算法的封装和对象之间的交互。与创建型模式和结构型模式不同，行为型模式不关注对象的创建和组合，而是专注于对象的行为和职责。

行为型设计模式可以帮助我们解决复杂的对象交互问题，使系统更加灵活、可扩展和易于维护。这些模式通过定义对象之间的通信方式、职责分配和算法封装，使系统能够更好地适应变化和需求。

本章将详细介绍11种行为型设计模式，包括责任链模式、命令模式、迭代器模式、中介者模式、备忘录模式、观察者模式、状态模式、策略模式、模板方法模式、访问者模式和空对象模式。对于每种模式，我们将从概念定义、历史背景、理论基础、数学模型、与软件质量属性的关系、实现方式、C++实现代码和关键点总结等方面进行全面分析。

## 学习目标

- 理解行为型设计模式的基本概念和特点
- 掌握11种行为型设计模式的原理和应用场景
- 学会如何在C++中实现各种行为型设计模式
- 了解行为型设计模式之间的关系和区别
- 掌握行为型设计模式的设计原则和最佳实践

## 1. 责任链模式

### 1.1 概念定义

责任链模式（Chain of Responsibility Pattern）是一种行为型设计模式，它允许你将请求沿着处理者链传递，直到有一个处理者能够处理它为止。这种模式创建了一个处理者对象的链，每个处理者都有机会处理请求，或者将其传递给链中的下一个处理者。

### 1.2 历史背景

责任链模式最早出现在Smalltalk-80的模型-视图-控制器（MVC）框架中，后来被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中。它的设计灵感来源于现实世界中的责任传递机制，如组织中的层级审批流程。

### 1.3 理论基础

责任链模式的理论基础基于以下几个核心概念：

1. **解耦**：将请求的发送者和接收者解耦，使多个对象都有机会处理请求。
2. **链式处理**：将处理者组织成链式结构，请求沿着链传递。
3. **动态组合**：可以在运行时动态地添加或删除处理者，改变处理链的结构。

### 1.4 数学模型

责任链模式可以用数学中的链式函数来表示：

设处理者集合为 H = {h₁, h₂, ..., hₙ}，请求集合为 R = {r₁, r₂, ..., rₘ}：

```
process(r) = h₁(r) ∘ h₂(r) ∘ ... ∘ hₙ(r)
```

其中，∘ 表示函数组合，如果 hᵢ(r) 处理了请求，则链终止，否则继续传递给下一个处理者。

### 1.5 与软件质量属性的关系

责任链模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为可以独立地添加或修改处理者。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的处理者。
3. **灵活性**：提高了灵活性，因为可以动态地配置处理链。
4. **性能**：可能影响性能，因为请求需要遍历整个链。
5. **可测试性**：提高了可测试性，因为可以独立地测试每个处理者。

### 1.6 实现方式

责任链模式的主要角色包括：

1. **处理者（Handler）**：定义一个处理请求的接口，包含抽象处理方法和后继处理者。
2. **具体处理者（Concrete Handler）**：实现处理者接口，处理它所负责的请求，如果不能处理则将请求转发给后继者。
3. **客户端（Client）**：创建处理链，并向链头的处理者提交请求。

### 1.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <memory>

// 请求类
class Request {
private:
    std::string type;
    std::string content;
    
public:
    Request(const std::string& t, const std::string& c) : type(t), content(c) {}
    
    std::string getType() const { return type; }
    std::string getContent() const { return content; }
};

// 抽象处理者
class Handler {
protected:
    std::shared_ptr<Handler> successor;
    
public:
    virtual ~Handler() = default;
    
    void setSuccessor(std::shared_ptr<Handler> handler) {
        successor = handler;
    }
    
    virtual void handleRequest(const Request& request) = 0;
};

// 具体处理者1 - 处理技术问题
class TechnicalSupportHandler : public Handler {
public:
    void handleRequest(const Request& request) override {
        if (request.getType() == "technical") {
            std::cout << "Technical Support: Handling request - " << request.getContent() << std::endl;
        } else if (successor) {
            successor->handleRequest(request);
        } else {
            std::cout << "No handler available for this request type." << std::endl;
        }
    }
};

// 具体处理者2 - 处理账单问题
class BillingSupportHandler : public Handler {
public:
    void handleRequest(const Request& request) override {
        if (request.getType() == "billing") {
            std::cout << "Billing Support: Handling request - " << request.getContent() << std::endl;
        } else if (successor) {
            successor->handleRequest(request);
        } else {
            std::cout << "No handler available for this request type." << std::endl;
        }
    }
};

// 具体处理者3 - 处理一般问题
class GeneralSupportHandler : public Handler {
public:
    void handleRequest(const Request& request) override {
        if (request.getType() == "general") {
            std::cout << "General Support: Handling request - " << request.getContent() << std::endl;
        } else if (successor) {
            successor->handleRequest(request);
        } else {
            std::cout << "No handler available for this request type." << std::endl;
        }
    }
};

// 客户端代码
int main() {
    // 创建处理者
    auto technicalHandler = std::make_shared<TechnicalSupportHandler>();
    auto billingHandler = std::make_shared<BillingSupportHandler>();
    auto generalHandler = std::make_shared<GeneralSupportHandler>();
    
    // 设置责任链
    technicalHandler->setSuccessor(billingHandler);
    billingHandler->setSuccessor(generalHandler);
    
    // 创建请求
    Request technicalRequest("technical", "Cannot connect to the server");
    Request billingRequest("billing", "Incorrect amount on invoice");
    Request generalRequest("general", "Information about company policies");
    Request unknownRequest("sales", "Product inquiry");
    
    // 提交请求
    std::cout << "Processing technical request:" << std::endl;
    technicalHandler->handleRequest(technicalRequest);
    
    std::cout << "\nProcessing billing request:" << std::endl;
    technicalHandler->handleRequest(billingRequest);
    
    std::cout << "\nProcessing general request:" << std::endl;
    technicalHandler->handleRequest(generalRequest);
    
    std::cout << "\nProcessing unknown request:" << std::endl;
    technicalHandler->handleRequest(unknownRequest);
    
    return 0;
}
```

### 1.8 关键点总结

1. **解耦发送者和接收者**：责任链模式将请求的发送者和接收者解耦，使多个对象都有机会处理请求。
2. **动态组合**：可以在运行时动态地添加或删除处理者，改变处理链的结构。
3. **简化对象连接**：对象只需要知道它的后继者，而不需要知道整个链的结构。
4. **性能考虑**：可能影响性能，因为请求需要遍历整个链。
5. **请求保证**：不能保证请求一定被处理，因为没有明确的接收者。
6. **调试困难**：调试可能比较困难，因为请求可能在链中的任何位置被处理。

## 2. 命令模式

### 2.1 概念定义

命令模式（Command Pattern）是一种行为型设计模式，它将请求封装为一个对象，从而允许你用不同的请求对客户进行参数化、排队或记录请求日志，以及支持可撤销的操作。

### 2.2 历史背景

命令模式最早起源于图形用户界面（GUI）开发，用于处理菜单、按钮等用户界面元素的交互。它被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中，成为23种经典设计模式之一。

### 2.3 理论基础

命令模式的理论基础基于以下几个核心概念：

1. **封装**：将请求封装为对象，使请求的发送者和接收者解耦。
2. **参数化**：将请求参数化，使不同的请求可以以相同的方式处理。
3. **可撤销性**：通过记录命令历史，支持操作的撤销和重做。

### 2.4 数学模型

命令模式可以用数学中的函数对象来表示：

设命令集合为 C = {c₁, c₂, ..., cₙ}，接收者集合为 R = {r₁, r₂, ..., rₘ}：

```
execute(cᵢ, rⱼ) = cᵢ(rⱼ)
undo(cᵢ, rⱼ) = inverse(cᵢ(rⱼ))
```

其中，inverse 表示操作的逆操作。

### 2.5 与软件质量属性的关系

命令模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为新的命令可以独立地添加。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的命令。
3. **灵活性**：提高了灵活性，因为可以动态地组合和执行命令。
4. **可重用性**：提高了可重用性，因为命令可以在不同的上下文中重用。
5. **性能**：可能影响性能，因为增加了额外的对象创建和方法调用。

### 2.6 实现方式

命令模式的主要角色包括：

1. **命令（Command）**：声明执行操作的接口。
2. **具体命令（Concrete Command）**：实现命令接口，将一个接收者对象绑定到一个动作。
3. **接收者（Receiver）**：知道如何实施与执行一个请求相关的操作。
4. **调用者（Invoker）**：要求该命令执行这个请求。
5. **客户端（Client）**：创建一个具体命令对象并设置它的接收者。

### 2.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <memory>
#include <vector>
#include <stack>

// 接收者
class Light {
public:
    void turnOn() {
        std::cout << "Light is on" << std::endl;
    }
    
    void turnOff() {
        std::cout << "Light is off" << std::endl;
    }
};

// 命令接口
class Command {
public:
    virtual ~Command() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

// 具体命令 - 开灯
class LightOnCommand : public Command {
private:
    std::shared_ptr<Light> light;
    
public:
    LightOnCommand(std::shared_ptr<Light> l) : light(l) {}
    
    void execute() override {
        light->turnOn();
    }
    
    void undo() override {
        light->turnOff();
    }
};

// 具体命令 - 关灯
class LightOffCommand : public Command {
private:
    std::shared_ptr<Light> light;
    
public:
    LightOffCommand(std::shared_ptr<Light> l) : light(l) {}
    
    void execute() override {
        light->turnOff();
    }
    
    void undo() override {
        light->turnOn();
    }
};

// 空命令
class NoCommand : public Command {
public:
    void execute() override {}
    void undo() override {}
};

// 调用者 - 遥控器
class RemoteControl {
private:
    std::shared_ptr<Command> command;
    std::stack<std::shared_ptr<Command>> commandHistory;
    
public:
    RemoteControl() {
        command = std::make_shared<NoCommand>();
    }
    
    void setCommand(std::shared_ptr<Command> cmd) {
        command = cmd;
    }
    
    void buttonWasPressed() {
        command->execute();
        commandHistory.push(command);
    }
    
    void undoButtonWasPressed() {
        if (!commandHistory.empty()) {
            auto lastCommand = commandHistory.top();
            lastCommand->undo();
            commandHistory.pop();
        }
    }
};

// 宏命令
class MacroCommand : public Command {
private:
    std::vector<std::shared_ptr<Command>> commands;
    
public:
    MacroCommand(const std::vector<std::shared_ptr<Command>>& cmds) : commands(cmds) {}
    
    void execute() override {
        for (auto& cmd : commands) {
            cmd->execute();
        }
    }
    
    void undo() override {
        for (auto it = commands.rbegin(); it != commands.rend(); ++it) {
            (*it)->undo();
        }
    }
};

// 客户端代码
int main() {
    // 创建接收者
    auto light = std::make_shared<Light>();
    
    // 创建命令
    auto lightOn = std::make_shared<LightOnCommand>(light);
    auto lightOff = std::make_shared<LightOffCommand>(light);
    
    // 创建调用者
    auto remote = std::make_shared<RemoteControl>();
    
    // 执行命令
    std::cout << "Turning on the light:" << std::endl;
    remote->setCommand(lightOn);
    remote->buttonWasPressed();
    
    std::cout << "\nTurning off the light:" << std::endl;
    remote->setCommand(lightOff);
    remote->buttonWasPressed();
    
    std::cout << "\nUndo last command:" << std::endl;
    remote->undoButtonWasPressed();
    
    std::cout << "\nUsing macro command:" << std::endl;
    std::vector<std::shared_ptr<Command>> partyOn = {lightOn, lightOff, lightOn};
    std::vector<std::shared_ptr<Command>> partyOff = {lightOff};
    
    auto partyOnMacro = std::make_shared<MacroCommand>(partyOn);
    auto partyOffMacro = std::make_shared<MacroCommand>(partyOff);
    
    std::cout << "Party on:" << std::endl;
    remote->setCommand(partyOnMacro);
    remote->buttonWasPressed();
    
    std::cout << "\nParty off:" << std::endl;
    remote->setCommand(partyOffMacro);
    remote->buttonWasPressed();
    
    return 0;
}
```

### 2.8 关键点总结

1. **封装请求**：命令模式将请求封装为对象，使请求的发送者和接收者解耦。
2. **参数化**：将请求参数化，使不同的请求可以以相同的方式处理。
3. **可撤销性**：通过记录命令历史，支持操作的撤销和重做。
4. **组合命令**：可以将多个命令组合成宏命令，实现复杂的操作。
5. **延迟执行**：支持请求的延迟执行和排队。
6. **额外复杂性**：增加了系统的复杂性，因为需要为每个操作创建命令对象。

## 3. 迭代器模式

### 3.1 概念定义

迭代器模式（Iterator Pattern）是一种行为型设计模式，它提供一种方法顺序访问一个聚合对象中各个元素，而又不暴露该对象的内部表示。

### 3.2 历史背景

迭代器模式最早出现在Smalltalk编程语言中，后来被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中。它的设计灵感来自于对集合对象的遍历需求，提供了一种统一的遍历接口。

### 3.3 理论基础

迭代器模式的理论基础基于以下几个核心概念：

1. **封装**：封装集合对象的内部结构，提供统一的访问接口。
2. **遍历**：提供一种统一的遍历机制，使客户端可以遍历不同类型的集合。
3. **分离**：将集合对象的遍历行为与集合对象本身分离。

### 3.4 数学模型

迭代器模式可以用数学中的序列和映射来表示：

设集合为 S = {s₁, s₂, ..., sₙ}，迭代器为 I：

```
I.first() → s₁
I.next() → sᵢ₊₁
I.isDone() → boolean
I.currentItem() → sᵢ
```

### 3.5 与软件质量属性的关系

迭代器模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为集合和遍历逻辑分离。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的集合类型。
3. **一致性**：提供了一致的遍历接口，使代码更加统一。
4. **封装性**：提高了封装性，因为集合的内部结构被隐藏。
5. **性能**：可能影响性能，因为增加了额外的间接访问。

### 3.6 实现方式

迭代器模式的主要角色包括：

1. **迭代器（Iterator）**：定义访问和遍历元素的接口。
2. **具体迭代器（Concrete Iterator）**：实现迭代器接口，跟踪当前遍历的位置。
3. **聚合（Aggregate）**：定义创建相应迭代器对象的接口。
4. **具体聚合（Concrete Aggregate）**：实现聚合接口，返回一个与具体聚合兼容的迭代器实例。

### 3.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>

// 迭代器接口
template <typename T>
class Iterator {
public:
    virtual ~Iterator() = default;
    virtual void first() = 0;
    virtual void next() = 0;
    virtual bool isDone() const = 0;
    virtual T currentItem() const = 0;
};

// 聚合接口
template <typename T>
class Aggregate {
public:
    virtual ~Aggregate() = default;
    virtual std::shared_ptr<Iterator<T>> createIterator() = 0;
    virtual int count() const = 0;
    virtual T getItem(int index) const = 0;
};

// 具体迭代器
template <typename T>
class ConcreteIterator : public Iterator<T> {
private:
    std::shared_ptr<Aggregate<T>> aggregate;
    int current;
    
public:
    ConcreteIterator(std::shared_ptr<Aggregate<T>> agg) : aggregate(agg), current(0) {}
    
    void first() override {
        current = 0;
    }
    
    void next() override {
        if (current < aggregate->count()) {
            current++;
        }
    }
    
    bool isDone() const override {
        return current >= aggregate->count();
    }
    
    T currentItem() const override {
        if (isDone()) {
            throw std::out_of_range("Iterator is out of bounds");
        }
        return aggregate->getItem(current);
    }
};

// 具体聚合
template <typename T>
class ConcreteAggregate : public Aggregate<T> {
private:
    std::vector<T> items;
    
public:
    void addItem(const T& item) {
        items.push_back(item);
    }
    
    int count() const override {
        return items.size();
    }
    
    T getItem(int index) const override {
        if (index < 0 || index >= items.size()) {
            throw std::out_of_range("Index out of bounds");
        }
        return items[index];
    }
    
    std::shared_ptr<Iterator<T>> createIterator() override {
        return std::make_shared<ConcreteIterator<T>>(std::shared_ptr<Aggregate<T>>(this));
    }
};

// 客户端代码
int main() {
    // 创建聚合对象
    auto aggregate = std::make_shared<ConcreteAggregate<std::string>>();
    
    // 添加元素
    aggregate->addItem("Item 1");
    aggregate->addItem("Item 2");
    aggregate->addItem("Item 3");
    aggregate->addItem("Item 4");
    aggregate->addItem("Item 5");
    
    // 创建迭代器
    auto iterator = aggregate->createIterator();
    
    // 遍历元素
    std::cout << "Iterating through the aggregate:" << std::endl;
    for (iterator->first(); !iterator->isDone(); iterator->next()) {
        std::cout << iterator->currentItem() << std::endl;
    }
    
    return 0;
}
```

### 3.8 关键点总结

1. **封装遍历**：迭代器模式封装了集合对象的遍历逻辑，使客户端无需了解集合的内部结构。
2. **统一接口**：提供了一致的遍历接口，使不同类型的集合可以使用相同的遍历方式。
3. **支持多种遍历**：可以为同一个集合提供多种不同的迭代器，支持不同的遍历方式。
4. **分离关注点**：将集合对象的遍历行为与集合对象本身分离，符合单一职责原则。
5. **简化集合接口**：简化了集合的接口，因为不需要在集合中实现多种遍历方法。
6. **额外开销**：增加了额外的对象创建和方法调用开销。

## 4. 中介者模式

### 4.1 概念定义

中介者模式（Mediator Pattern）是一种行为型设计模式，它定义一个中介对象来封装一系列对象的交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

### 4.2 历史背景

中介者模式最早出现在Smalltalk-80的模型-视图-控制器（MVC）框架中，后来被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中。它的设计灵感来自于现实世界中的中介机构，如房地产中介、调解员等。

### 4.3 理论基础

中介者模式的理论基础基于以下几个核心概念：

1. **解耦**：将对象之间的交互集中管理，减少对象之间的直接依赖。
2. **中心化**：将交互逻辑中心化，使系统更容易理解和维护。
3. **多对多转换为一对多**：将对象之间的多对多关系转换为一对多关系。

### 4.4 数学模型

中介者模式可以用数学中的中介函数来表示：

设对象集合为 O = {o₁, o₂, ..., oₙ}，中介者为 M：

```
M.mediate(oᵢ, message) → {
    for each oⱼ in O, j ≠ i:
        oⱼ.receive(message, oᵢ)
}
```

### 4.5 与软件质量属性的关系

中介者模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为交互逻辑集中在一个地方。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的同事类。
3. **灵活性**：提高了灵活性，因为可以独立地改变对象之间的交互。
4. **复杂性**：可能增加复杂性，因为中介者本身可能变得复杂。
5. **性能**：可能影响性能，因为所有通信都需要通过中介者。

### 4.6 实现方式

中介者模式的主要角色包括：

1. **中介者（Mediator）**：定义一个接口用于与各同事对象通信。
2. **具体中介者（Concrete Mediator）**：实现中介者接口，协调各同事对象的行为。
3. **同事类（Colleague）**：定义一个接口，知道其中介者对象。
4. **具体同事类（Concrete Colleague）**：实现同事类接口，通过中介者与其他同事通信。

### 4.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <map>

// 前向声明
class Colleague;

// 中介者接口
class Mediator {
public:
    virtual ~Mediator() = default;
    virtual void registerColleague(const std::string& name, std::shared_ptr<Colleague> colleague) = 0;
    virtual void sendMessage(const std::string& from, const std::string& to, const std::string& message) = 0;
    virtual void broadcastMessage(const std::string& from, const std::string& message) = 0;
};

// 同事类接口
class Colleague {
protected:
    std::shared_ptr<Mediator> mediator;
    std::string name;
    
public:
    Colleague(const std::string& n, std::shared_ptr<Mediator> m) : name(n), mediator(m) {}
    virtual ~Colleague() = default;
    
    std::string getName() const { return name; }
    
    virtual void receive(const std::string& from, const std::string& message) = 0;
    virtual void send(const std::string& to, const std::string& message) {
        mediator->sendMessage(name, to, message);
    }
    
    virtual void broadcast(const std::string& message) {
        mediator->broadcastMessage(name, message);
    }
};

// 具体中介者
class ConcreteMediator : public Mediator {
private:
    std::map<std::string, std::shared_ptr<Colleague>> colleagues;
    
public:
    void registerColleague(const std::string& name, std::shared_ptr<Colleague> colleague) override {
        colleagues[name] = colleague;
    }
    
    void sendMessage(const std::string& from, const std::string& to, const std::string& message) override {
        auto it = colleagues.find(to);
        if (it != colleagues.end()) {
            std::cout << from << " sends message to " << to << ": " << message << std::endl;
            it->second->receive(from, message);
        } else {
            std::cout << "Error: " << to << " not found!" << std::endl;
        }
    }
    
    void broadcastMessage(const std::string& from, const std::string& message) override {
        std::cout << from << " broadcasts message: " << message << std::endl;
        for (auto& pair : colleagues) {
            if (pair.first != from) {
                pair.second->receive(from, message);
            }
        }
    }
};

// 具体同事类1
class ConcreteColleague1 : public Colleague {
public:
    ConcreteColleague1(const std::string& name, std::shared_ptr<Mediator> mediator) 
        : Colleague(name, mediator) {}
    
    void receive(const std::string& from, const std::string& message) override {
        std::cout << name << " (Colleague1) received message from " << from << ": " << message << std::endl;
    }
    
    void doSomething() {
        std::cout << name << " (Colleague1) is doing something..." << std::endl;
        send("Colleague2", "Hello from Colleague1");
    }
};

// 具体同事类2
class ConcreteColleague2 : public Colleague {
public:
    ConcreteColleague2(const std::string& name, std::shared_ptr<Mediator> mediator) 
        : Colleague(name, mediator) {}
    
    void receive(const std::string& from, const std::string& message) override {
        std::cout << name << " (Colleague2) received message from " << from << ": " << message << std::endl;
    }
    
    void doSomething() {
        std::cout << name << " (Colleague2) is doing something..." << std::endl;
        broadcast("Hello everyone from Colleague2");
    }
};

// 客户端代码
int main() {
    // 创建中介者
    auto mediator = std::make_shared<ConcreteMediator>();
    
    // 创建同事
    auto colleague1 = std::make_shared<ConcreteColleague1>("Alice", mediator);
    auto colleague2 = std::make_shared<ConcreteColleague2>("Bob", mediator);
    auto colleague3 = std::make_shared<ConcreteColleague1>("Charlie", mediator);
    
    // 注册同事到中介者
    mediator->registerColleague("Alice", colleague1);
    mediator->registerColleague("Bob", colleague2);
    mediator->registerColleague("Charlie", colleague3);
    
    // 同事之间通过中介者通信
    std::cout << "=== Direct Communication ===" << std::endl;
    colleague1->doSomething();
    
    std::cout << "\n=== Broadcast Communication ===" << std::endl;
    colleague2->doSomething();
    
    return 0;
}
```

### 4.8 关键点总结

1. **解耦对象**：中介者模式将对象之间的交互集中管理，减少对象之间的直接依赖。
2. **中心化交互**：将交互逻辑中心化，使系统更容易理解和维护。
3. **简化对象协议**：简化了对象之间的协议，因为对象只需要与中介者通信。
4. **控制集中化**：将交互控制集中化，使系统更容易修改和扩展。
5. **中介者复杂性**：中介者本身可能变得复杂，特别是当对象之间的交互很多时。
6. **性能考虑**：可能影响性能，因为所有通信都需要通过中介者。

## 5. 备忘录模式

### 5.1 概念定义

备忘录模式（Memento Pattern）是一种行为型设计模式，它在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。

### 5.2 历史背景

备忘录模式最早出现在游戏开发中，用于实现游戏状态的保存和恢复。它被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中，成为23种经典设计模式之一。

### 5.3 理论基础

备忘录模式的理论基础基于以下几个核心概念：

1. **封装**：在不破坏对象封装性的前提下，捕获和恢复对象的状态。
2. **快照**：创建对象状态的快照，以便后续恢复。
3. **外部存储**：将状态存储在对象之外，使对象本身不需要知道如何存储状态。

### 5.4 数学模型

备忘录模式可以用数学中的状态函数来表示：

设对象状态为 S，备忘录为 M：

```
M = createMemento(S)  // 创建备忘录
S' = restoreFromMemento(M)  // 从备忘录恢复状态
```

### 5.5 与软件质量属性的关系

备忘录模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为状态管理逻辑集中化。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的状态管理功能。
3. **封装性**：保持了对象的封装性，因为状态管理逻辑与对象本身分离。
4. **资源消耗**：可能增加资源消耗，因为需要存储对象状态的副本。
5. **复杂性**：可能增加系统的复杂性，特别是当对象状态复杂时。

### 5.6 实现方式

备忘录模式的主要角色包括：

1. **发起人（Originator）**：创建一个备忘录，记录它的当前内部状态，并可以使用备忘录恢复内部状态。
2. **备忘录（Memento）**：存储发起人的内部状态，并防止除发起人以外的对象访问备忘录。
3. **管理者（Caretaker）**：负责保存备忘录，但不能对备忘录的内容进行操作或检查。

### 5.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <ctime>
#include <sstream>

// 前向声明
class Memento;

// 发起人
class Originator {
private:
    std::string state;
    time_t timestamp;
    
public:
    Originator(const std::string& s) : state(s) {
        timestamp = time(nullptr);
    }
    
    void setState(const std::string& s) {
        state = s;
        timestamp = time(nullptr);
    }
    
    std::string getState() const {
        return state;
    }
    
    time_t getTimestamp() const {
        return timestamp;
    }
    
    // 创建备忘录
    std::shared_ptr<Memento> createMemento() const;
    
    // 从备忘录恢复
    void restoreFromMemento(std::shared_ptr<Memento> memento);
    
    // 显示当前状态
    void display() const {
        std::cout << "State: " << state << ", Timestamp: " << timestamp << std::endl;
    }
};

// 备忘录
class Memento {
private:
    std::string state;
    time_t timestamp;
    
    // 只有Originator可以访问Memento的私有成员
    friend class Originator;
    
    Memento(const std::string& s, time_t t) : state(s), timestamp(t) {}
    
public:
    std::string getState() const {
        return state;
    }
    
    time_t getTimestamp() const {
        return timestamp;
    }
};

// Originator的方法实现
std::shared_ptr<Memento> Originator::createMemento() const {
    return std::make_shared<Memento>(state, timestamp);
}

void Originator::restoreFromMemento(std::shared_ptr<Memento> memento) {
    state = memento->getState();
    timestamp = memento->getTimestamp();
}

// 管理者
class Caretaker {
private:
    std::vector<std::shared_ptr<Memento>> mementos;
    Originator* originator;
    
public:
    Caretaker(Originator* orig) : originator(orig) {}
    
    void backup() {
        std::cout << "Caretaker: Saving Originator's state..." << std::endl;
        mementos.push_back(originator->createMemento());
    }
    
    void undo() {
        if (!mementos.empty()) {
            auto memento = mementos.back();
            mementos.pop_back();
            std::cout << "Caretaker: Restoring state to: " << memento->getState() << std::endl;
            originator->restoreFromMemento(memento);
        } else {
            std::cout << "Caretaker: No saved states to restore." << std::endl;
        }
    }
    
    void showHistory() const {
        std::cout << "Caretaker: Here's the list of mementos:" << std::endl;
        for (const auto& memento : mementos) {
            std::cout << "  " << memento->getState() << " (at " << memento->getTimestamp() << ")" << std::endl;
        }
    }
};

// 客户端代码
int main() {
    // 创建发起人
    auto originator = std::make_unique<Originator>("Initial State");
    auto caretaker = std::make_unique<Caretaker>(originator.get());
    
    // 显示初始状态
    std::cout << "Initial state:" << std::endl;
    originator->display();
    
    // 保存状态并修改
    caretaker->backup();
    originator->setState("State 1");
    std::cout << "\nAfter change:" << std::endl;
    originator->display();
    
    // 保存状态并修改
    caretaker->backup();
    originator->setState("State 2");
    std::cout << "\nAfter another change:" << std::endl;
    originator->display();
    
    // 保存状态并修改
    caretaker->backup();
    originator->setState("State 3");
    std::cout << "\nAfter final change:" << std::endl;
    originator->display();
    
    // 显示历史记录
    std::cout << "\nHistory:" << std::endl;
    caretaker->showHistory();
    
    // 恢复状态
    std::cout << "\nRestoring states:" << std::endl;
    caretaker->undo();
    originator->display();
    
    caretaker->undo();
    originator->display();
    
    caretaker->undo();
    originator->display();
    
    caretaker->undo(); // 尝试恢复更多状态
    
    return 0;
}
```

### 5.8 关键点总结

1. **状态保存**：备忘录模式可以在不破坏封装性的前提下，保存和恢复对象的状态。
2. **外部存储**：将状态存储在对象之外，使对象本身不需要知道如何存储状态。
3. **撤销操作**：支持撤销操作，使系统可以恢复到之前的状态。
4. **封装性**：保持了对象的封装性，因为状态管理逻辑与对象本身分离。
5. **资源消耗**：可能增加资源消耗，因为需要存储对象状态的副本。
6. **实现复杂性**：实现可能比较复杂，特别是当对象状态复杂或需要处理大量状态时。

## 6. 观察者模式

### 6.1 概念定义

观察者模式（Observer Pattern）是一种行为型设计模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

### 6.2 历史背景

观察者模式最早出现在Smalltalk-80的模型-视图-控制器（MVC）框架中，后来被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中。它的设计灵感来自于现实世界中的订阅-发布机制。

### 6.3 理论基础

观察者模式的理论基础基于以下几个核心概念：

1. **发布-订阅**：定义对象间的一种一对多的依赖关系。
2. **松耦合**：使观察者和主题之间保持松耦合。
3. **动态关系**：可以在运行时动态地添加或删除观察者。

### 6.4 数学模型

观察者模式可以用数学中的函数映射来表示：

设主题为 S，观察者集合为 O = {o₁, o₂, ..., oₙ}：

```
S.notify() → {
    for each oᵢ in O:
        oᵢ.update(S)
}
```

### 6.5 与软件质量属性的关系

观察者模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为主题和观察者之间是松耦合的。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的观察者。
3. **重用性**：提高了重用性，因为主题和观察者可以独立地重用。
4. **性能**：可能影响性能，因为通知所有观察者可能需要时间。
5. **更新顺序**：不保证观察者的更新顺序，可能导致不可预测的结果。

### 6.6 实现方式

观察者模式的主要角色包括：

1. **主题（Subject）**：定义一个接口，用于添加和删除观察者，以及通知观察者。
2. **具体主题（Concrete Subject）**：实现主题接口，存储观察者集合，并在状态改变时通知观察者。
3. **观察者（Observer）**：定义一个更新接口，用于接收主题的通知。
4. **具体观察者（Concrete Observer）**：实现观察者接口，定义在收到通知时的具体行为。

### 6.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <algorithm>

// 前向声明
class Observer;

// 主题接口
class Subject {
public:
    virtual ~Subject() = default;
    virtual void registerObserver(std::shared_ptr<Observer> observer) = 0;
    virtual void removeObserver(std::shared_ptr<Observer> observer) = 0;
    virtual void notifyObservers() = 0;
};

// 观察者接口
class Observer {
public:
    virtual ~Observer() = default;
    virtual void update(const std::string& message) = 0;
};

// 具体主题
class ConcreteSubject : public Subject {
private:
    std::vector<std::shared_ptr<Observer>> observers;
    std::string message;
    
public:
    void registerObserver(std::shared_ptr<Observer> observer) override {
        observers.push_back(observer);
    }
    
    void removeObserver(std::shared_ptr<Observer> observer) override {
        observers.erase(
            std::remove(observers.begin(), observers.end(), observer),
            observers.end());
    }
    
    void notifyObservers() override {
        for (auto& observer : observers) {
            observer->update(message);
        }
    }
    
    void setMessage(const std::string& msg) {
        message = msg;
        std::cout << "Subject: Message changed to '" << message << "'" << std::endl;
        notifyObservers();
    }
};

// 具体观察者1
class ConcreteObserver1 : public Observer {
private:
    std::string name;
    
public:
    ConcreteObserver1(const std::string& n) : name(n) {}
    
    void update(const std::string& message) override {
        std::cout << name << " (Observer1) received message: " << message << std::endl;
    }
};

// 具体观察者2
class ConcreteObserver2 : public Observer {
private:
    std::string name;
    
public:
    ConcreteObserver2(const std::string& n) : name(n) {}
    
    void update(const std::string& message) override {
        std::cout << name << " (Observer2) received message: " << message << std::endl;
    }
};

// 客户端代码
int main() {
    // 创建主题
    auto subject = std::make_shared<ConcreteSubject>();
    
    // 创建观察者
    auto observer1 = std::make_shared<ConcreteObserver1>("Alice");
    auto observer2 = std::make_shared<ConcreteObserver2>("Bob");
    auto observer3 = std::make_shared<ConcreteObserver1>("Charlie");
    
    // 注册观察者
    subject->registerObserver(observer1);
    subject->registerObserver(observer2);
    
    // 设置消息并通知观察者
    std::cout << "=== First Message ===" << std::endl;
    subject->setMessage("Hello World!");
    
    // 添加新观察者
    subject->registerObserver(observer3);
    
    // 设置消息并通知观察者
    std::cout << "\n=== Second Message ===" << std::endl;
    subject->setMessage("Observer Pattern Demo");
    
    // 移除一个观察者
    subject->removeObserver(observer2);
    
    // 设置消息并通知观察者
    std::cout << "\n=== Third Message ===" << std::endl;
    subject->setMessage("Goodbye!");
    
    return 0;
}
```

### 6.8 关键点总结

1. **一对多关系**：观察者模式定义了对象间的一种一对多的依赖关系。
2. **松耦合**：使观察者和主题之间保持松耦合，它们可以独立地变化。
3. **动态关系**：可以在运行时动态地添加或删除观察者。
4. **广播通信**：支持广播通信，一个主题可以同时通知多个观察者。
5. **更新顺序**：不保证观察者的更新顺序，可能导致不可预测的结果。
6. **意外更新**：可能导致意外的更新，特别是当观察者之间的依赖关系复杂时。

## 7. 状态模式

### 7.1 概念定义

状态模式（State Pattern）是一种行为型设计模式，它允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。

### 7.2 历史背景

状态模式最早出现在游戏开发中，用于管理游戏角色的不同状态。它被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中，成为23种经典设计模式之一。

### 7.3 理论基础

状态模式的理论基础基于以下几个核心概念：

1. **状态封装**：将状态封装为独立的对象，使状态转换和行为可以独立变化。
2. **多态性**：利用多态性，使对象在不同状态下表现出不同的行为。
3. **状态转换**：将状态转换逻辑封装在状态对象中，而不是在上下文对象中。

### 7.4 数学模型

状态模式可以用数学中的状态机来表示：

设状态集合为 S = {s₁, s₂, ..., sₙ}，事件集合为 E = {e₁, e₂, ..., eₘ}：

```
transition(sᵢ, eⱼ) → sₖ
action(sᵢ, eⱼ) → a
```

### 7.5 与软件质量属性的关系

状态模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为状态相关的行为被封装在独立的状态类中。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的状态。
3. **可读性**：提高了代码的可读性，因为状态相关的逻辑被组织在一起。
4. **对象数量**：可能增加对象数量，因为每个状态都需要一个类。
5. **复杂性**：可能增加系统的复杂性，特别是当状态转换逻辑复杂时。

### 7.6 实现方式

状态模式的主要角色包括：

1. **上下文（Context）**：定义客户端感兴趣的接口，维护一个具体状态类的实例。
2. **状态（State）**：定义一个接口，用于封装与上下文的一个特定状态相关的行为。
3. **具体状态（Concrete State）**：实现状态接口，定义与特定状态相关的行为。

### 7.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <memory>

// 前向声明
class Context;

// 状态接口
class State {
public:
    virtual ~State() = default;
    virtual void handle(Context* context) = 0;
    virtual std::string getName() const = 0;
};

// 上下文
class Context {
private:
    std::shared_ptr<State> state;
    
public:
    Context(std::shared_ptr<State> initialState) : state(initialState) {}
    
    void setState(std::shared_ptr<State> newState) {
        state = newState;
        std::cout << "Context: Transitioned to " << state->getName() << " state." << std::endl;
    }
    
    void request() {
        state->handle(this);
    }
};

// 具体状态A
class ConcreteStateA : public State {
public:
    void handle(Context* context) override;
    std::string getName() const override {
        return "State A";
    }
};

// 具体状态B
class ConcreteStateB : public State {
public:
    void handle(Context* context) override;
    std::string getName() const override {
        return "State B";
    }
};

// 具体状态C
class ConcreteStateC : public State {
public:
    void handle(Context* context) override;
    std::string getName() const override {
        return "State C";
    }
};

// 实现状态转换逻辑
void ConcreteStateA::handle(Context* context) {
    std::cout << "ConcreteStateA: Handling request." << std::endl;
    // 转换到状态B
    context->setState(std::make_shared<ConcreteStateB>());
}

void ConcreteStateB::handle(Context* context) {
    std::cout << "ConcreteStateB: Handling request." << std::endl;
    // 转换到状态C
    context->setState(std::make_shared<ConcreteStateC>());
}

void ConcreteStateC::handle(Context* context) {
    std::cout << "ConcreteStateC: Handling request." << std::endl;
    // 转换到状态A
    context->setState(std::make_shared<ConcreteStateA>());
}

// 客户端代码
int main() {
    // 创建上下文，初始状态为StateA
    auto context = std::make_unique<Context>(std::make_shared<ConcreteStateA>());
    
    std::cout << "Initial state: " << std::endl;
    
    // 发送请求，触发状态转换
    for (int i = 0; i < 6; ++i) {
        std::cout << "\nRequest " << i + 1 << ":" << std::endl;
        context->request();
    }
    
    return 0;
}
```

### 7.8 关键点总结

1. **状态封装**：状态模式将状态封装为独立的对象，使状态转换和行为可以独立变化。
2. **行为变化**：允许对象在其内部状态改变时改变它的行为。
3. **多态性**：利用多态性，使对象在不同状态下表现出不同的行为。
4. **状态转换**：将状态转换逻辑封装在状态对象中，而不是在上下文对象中。
5. **对象数量**：可能增加对象数量，因为每个状态都需要一个类。
6. **状态共享**：状态对象可以被多个上下文共享，但需要注意线程安全问题。

## 8. 策略模式

### 8.1 概念定义

策略模式（Strategy Pattern）是一种行为型设计模式，它定义一系列算法，把它们一个个封装起来，并且使它们可相互替换。策略模式使算法可独立于使用它的客户而变化。

### 8.2 历史背景

策略模式最早出现在商业应用中，用于处理不同的计算策略。它被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中，成为23种经典设计模式之一。

### 8.3 理论基础

策略模式的理论基础基于以下几个核心概念：

1. **算法封装**：将算法封装为独立的对象，使算法可以独立变化。
2. **多态性**：利用多态性，使客户端可以使用不同的策略而不需要了解其实现。
3. **运行时选择**：允许在运行时选择算法，而不是在编译时确定。

### 8.4 数学模型

策略模式可以用数学中的函数选择来表示：

设策略集合为 S = {s₁, s₂, ..., sₙ}，输入为 I：

```
result = sᵢ(I), where sᵢ ∈ S
```

### 8.5 与软件质量属性的关系

策略模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为算法被封装在独立的策略类中。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的策略。
3. **可重用性**：提高了可重用性，因为策略可以在不同的上下文中重用。
4. **对象数量**：可能增加对象数量，因为每个策略都需要一个类。
5. **性能**：可能影响性能，因为增加了额外的间接调用。

### 8.6 实现方式

策略模式的主要角色包括：

1. **策略（Strategy）**：定义所有支持的算法的公共接口。
2. **具体策略（Concrete Strategy）**：实现策略接口，提供具体的算法实现。
3. **上下文（Context）**：维护一个对策略对象的引用，用策略对象来配置。

### 8.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <memory>
#include <vector>

// 策略接口
class PaymentStrategy {
public:
    virtual ~PaymentStrategy() = default;
    virtual void pay(int amount) = 0;
    virtual std::string getName() const = 0;
};

// 具体策略1 - 信用卡支付
class CreditCardPayment : public PaymentStrategy {
private:
    std::string cardNumber;
    std::string name;
    
public:
    CreditCardPayment(const std::string& number, const std::string& holderName) 
        : cardNumber(number), name(holderName) {}
    
    void pay(int amount) override {
        std::cout << "Paid $" << amount << " using credit card ending in " 
                  << cardNumber.substr(cardNumber.length() - 4) << std::endl;
    }
    
    std::string getName() const override {
        return "Credit Card";
    }
};

// 具体策略2 - PayPal支付
class PayPalPayment : public PaymentStrategy {
private:
    std::string email;
    
public:
    PayPalPayment(const std::string& emailAddress) : email(emailAddress) {}
    
    void pay(int amount) override {
        std::cout << "Paid $" << amount << " using PayPal account " << email << std::endl;
    }
    
    std::string getName() const override {
        return "PayPal";
    }
};

// 具体策略3 - 现金支付
class CashPayment : public PaymentStrategy {
public:
    void pay(int amount) override {
        std::cout << "Paid $" << amount << " in cash" << std::endl;
    }
    
    std::string getName() const override {
        return "Cash";
    }
};

// 上下文
class ShoppingCart {
private:
    std::shared_ptr<PaymentStrategy> paymentStrategy;
    std::vector<int> items;
    
public:
    void setPaymentStrategy(std::shared_ptr<PaymentStrategy> strategy) {
        paymentStrategy = strategy;
    }
    
    void addItem(int price) {
        items.push_back(price);
    }
    
    void checkout() {
        int total = 0;
        for (int price : items) {
            total += price;
        }
        
        std::cout << "Shopping cart total: $" << total << std::endl;
        std::cout << "Paying using " << paymentStrategy->getName() << "..." << std::endl;
        paymentStrategy->pay(total);
    }
};

// 客户端代码
int main() {
    // 创建购物车
    auto cart = std::make_unique<ShoppingCart>();
    
    // 添加商品
    cart->addItem(100);
    cart->addItem(200);
    cart->addItem(50);
    
    // 使用信用卡支付
    std::cout << "=== Credit Card Payment ===" << std::endl;
    auto creditCard = std::make_shared<CreditCardPayment>("1234567890123456", "John Doe");
    cart->setPaymentStrategy(creditCard);
    cart->checkout();
    
    // 使用PayPal支付
    std::cout << "\n=== PayPal Payment ===" << std::endl;
    auto payPal = std::make_shared<PayPalPayment>("john.doe@example.com");
    cart->setPaymentStrategy(payPal);
    cart->checkout();
    
    // 使用现金支付
    std::cout << "\n=== Cash Payment ===" << std::endl;
    auto cash = std::make_shared<CashPayment>();
    cart->setPaymentStrategy(cash);
    cart->checkout();
    
    return 0;
}
```

### 8.8 关键点总结

1. **算法封装**：策略模式将算法封装为独立的对象，使算法可以独立变化。
2. **运行时选择**：允许在运行时选择算法，而不是在编译时确定。
3. **多态性**：利用多态性，使客户端可以使用不同的策略而不需要了解其实现。
4. **算法替换**：使算法可以相互替换，而不影响使用算法的客户端。
5. **对象数量**：可能增加对象数量，因为每个策略都需要一个类。
6. **策略选择**：客户端需要知道不同策略之间的区别，以便选择合适的策略。

## 9. 模板方法模式

### 9.1 概念定义

模板方法模式（Template Method Pattern）是一种行为型设计模式，它在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

### 9.2 历史背景

模板方法模式最早出现在框架开发中，用于定义框架的基本结构和扩展点。它被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中，成为23种经典设计模式之一。

### 9.3 理论基础

模板方法模式的理论基础基于以下几个核心概念：

1. **算法骨架**：定义算法的基本结构，将不变的步骤实现，将变化的步骤抽象。
2. **钩子方法**：提供可选的扩展点，允许子类在特定点插入自定义行为。
3. **控制反转**：父类控制算法的流程，子类提供具体的实现。

### 9.4 数学模型

模板方法模式可以用数学中的函数组合来表示：

设算法步骤为 S = {s₁, s₂, ..., sₙ}，其中 sᵢ 可以是固定步骤或可变步骤：

```
templateMethod() = s₁() ∘ s₂() ∘ ... ∘ sₙ()
```

### 9.5 与软件质量属性的关系

模板方法模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为算法的结构集中在一个地方。
2. **可扩展性**：提高了可扩展性，因为可以通过子类化来扩展算法。
3. **代码重用**：提高了代码重用，因为公共代码被提取到父类中。
4. **灵活性**：提供了灵活性，因为子类可以重定义算法的特定步骤。
5. **复杂性**：可能增加复杂性，特别是当算法步骤之间的关系复杂时。

### 9.6 实现方式

模板方法模式的主要角色包括：

1. **抽象类（Abstract Class）**：定义模板方法和抽象的原语操作。
2. **具体类（Concrete Class）**：实现原语操作，完成算法中与特定子类相关的步骤。

### 9.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <memory>

// 抽象类
class DataProcessor {
public:
    // 模板方法
    void processData() {
        loadData();
        if (validateData()) {
            transformData();
            saveData();
        } else {
            std::cout << "Data validation failed. Processing aborted." << std::endl;
        }
        
        // 钩子方法
        postProcess();
    }
    
    // 钩子方法，子类可以重写
    virtual void postProcess() {
        std::cout << "Default post-processing step." << std::endl;
    }
    
protected:
    // 原语操作
    virtual void loadData() = 0;
    virtual bool validateData() = 0;
    virtual void transformData() = 0;
    virtual void saveData() = 0;
};

// 具体类1 - CSV数据处理器
class CSVDataProcessor : public DataProcessor {
protected:
    void loadData() override {
        std::cout << "Loading data from CSV file." << std::endl;
    }
    
    bool validateData() override {
        std::cout << "Validating CSV data format." << std::endl;
        return true; // 假设验证成功
    }
    
    void transformData() override {
        std::cout << "Transforming CSV data to internal format." << std::endl;
    }
    
    void saveData() override {
        std::cout << "Saving processed data to database." << std::endl;
    }
    
    // 重写钩子方法
    void postProcess() override {
        std::cout << "CSV-specific post-processing: Creating backup." << std::endl;
    }
};

// 具体类2 - XML数据处理器
class XMLDataProcessor : public DataProcessor {
protected:
    void loadData() override {
        std::cout << "Loading data from XML file." << std::endl;
    }
    
    bool validateData() override {
        std::cout << "Validating XML schema." << std::endl;
        return true; // 假设验证成功
    }
    
    void transformData() override {
        std::cout << "Transforming XML data using XSLT." << std::endl;
    }
    
    void saveData() override {
        std::cout << "Saving processed data to JSON file." << std::endl;
    }
};

// 客户端代码
int main() {
    // 创建CSV数据处理器
    auto csvProcessor = std::make_unique<CSVDataProcessor>();
    std::cout << "=== Processing CSV Data ===" << std::endl;
    csvProcessor->processData();
    
    // 创建XML数据处理器
    auto xmlProcessor = std::make_unique<XMLDataProcessor>();
    std::cout << "\n=== Processing XML Data ===" << std::endl;
    xmlProcessor->processData();
    
    return 0;
}
```

### 9.8 关键点总结

1. **算法骨架**：模板方法模式定义了算法的基本结构，将不变的步骤实现，将变化的步骤抽象。
2. **控制反转**：父类控制算法的流程，子类提供具体的实现。
3. **代码重用**：提高了代码重用，因为公共代码被提取到父类中。
4. **钩子方法**：提供了可选的扩展点，允许子类在特定点插入自定义行为。
5. **扩展性**：提供了扩展性，因为可以通过子类化来扩展算法。
6. **限制灵活性**：限制了灵活性，因为算法的结构是固定的，子类只能重定义特定步骤。

## 10. 访问者模式

### 10.1 概念定义

访问者模式（Visitor Pattern）是一种行为型设计模式，它表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

### 10.2 历史背景

访问者模式最早出现在编译器开发中，用于处理抽象语法树的不同操作。它被收录在GoF的《设计模式：可复用面向对象软件的基础》一书中，成为23种经典设计模式之一。

### 10.3 理论基础

访问者模式的理论基础基于以下几个核心概念：

1. **操作分离**：将操作从数据结构中分离出来，使操作可以独立变化。
2. **双重分派**：通过双重分派机制，将操作分派给访问者和被访问元素。
3. **元素稳定**：适用于数据结构相对稳定，但操作经常变化的场景。

### 10.4 数学模型

访问者模式可以用数学中的函数映射来表示：

设元素集合为 E = {e₁, e₂, ..., eₙ}，访问者集合为 V = {v₁, v₂, ..., vₘ}：

```
vᵢ.visit(eⱼ) → result
```

### 10.5 与软件质量属性的关系

访问者模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为相关操作被集中在访问者中。
2. **可扩展性**：提高了可扩展性，因为可以轻松地添加新的操作。
3. **灵活性**：提高了灵活性，因为可以在不修改元素类的情况下添加新操作。
4. **复杂性**：增加了系统的复杂性，因为需要维护访问者和元素之间的双重分派。
5. **扩展困难**：添加新的元素需要修改所有访问者，扩展性较差。

### 10.6 实现方式

访问者模式的主要角色包括：

1. **访问者（Visitor）**：定义一个访问操作接口，用于访问具体元素。
2. **具体访问者（Concrete Visitor）**：实现访问者接口，定义具体的访问操作。
3. **元素（Element）**：定义一个accept方法，接收访问者对象。
4. **具体元素（Concrete Element）**：实现元素接口，定义具体的accept操作。
5. **对象结构（Object Structure）**：存储元素集合，可以遍历这些元素。

### 10.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>

// 前向声明
class Visitor;

// 元素接口
class Element {
public:
    virtual ~Element() = default;
    virtual void accept(std::shared_ptr<Visitor> visitor) = 0;
};

// 具体元素A
class ConcreteElementA : public Element, public std::enable_shared_from_this<ConcreteElementA> {
private:
    std::string name;
    
public:
    ConcreteElementA(const std::string& n) : name(n) {}
    
    std::string getName() const {
        return name;
    }
    
    void operationA() {
        std::cout << "ConcreteElementA: Performing operation A on " << name << std::endl;
    }
    
    void accept(std::shared_ptr<Visitor> visitor) override;
};

// 具体元素B
class ConcreteElementB : public Element, public std::enable_shared_from_this<ConcreteElementB> {
private:
    int value;
    
public:
    ConcreteElementB(int v) : value(v) {}
    
    int getValue() const {
        return value;
    }
    
    void operationB() {
        std::cout << "ConcreteElementB: Performing operation B with value " << value << std::endl;
    }
    
    void accept(std::shared_ptr<Visitor> visitor) override;
};

// 访问者接口
class Visitor {
public:
    virtual ~Visitor() = default;
    virtual void visit(std::shared_ptr<ConcreteElementA> element) = 0;
    virtual void visit(std::shared_ptr<ConcreteElementB> element) = 0;
};

// 实现元素的accept方法
void ConcreteElementA::accept(std::shared_ptr<Visitor> visitor) {
    visitor->visit(shared_from_this());
}

void ConcreteElementB::accept(std::shared_ptr<Visitor> visitor) {
    visitor->visit(shared_from_this());
}

// 具体访问者1
class ConcreteVisitor1 : public Visitor {
public:
    void visit(std::shared_ptr<ConcreteElementA> element) override {
        std::cout << "ConcreteVisitor1: Processing " << element->getName() << std::endl;
        element->operationA();
    }
    
    void visit(std::shared_ptr<ConcreteElementB> element) override {
        std::cout << "ConcreteVisitor1: Processing value " << element->getValue() << std::endl;
        element->operationB();
    }
};

// 具体访问者2
class ConcreteVisitor2 : public Visitor {
public:
    void visit(std::shared_ptr<ConcreteElementA> element) override {
        std::cout << "ConcreteVisitor2: Analyzing " << element->getName() << std::endl;
        std::cout << "  Name length: " << element->getName().length() << std::endl;
    }
    
    void visit(std::shared_ptr<ConcreteElementB> element) override {
        std::cout << "ConcreteVisitor2: Analyzing value " << element->getValue() << std::endl;
        std::cout << "  Square of value: " << element->getValue() * element->getValue() << std::endl;
    }
};

// 对象结构
class ObjectStructure {
private:
    std::vector<std::shared_ptr<Element>> elements;
    
public:
    void addElement(std::shared_ptr<Element> element) {
        elements.push_back(element);
    }
    
    void removeElement(std::shared_ptr<Element> element) {
        elements.erase(
            std::remove(elements.begin(), elements.end(), element),
            elements.end());
    }
    
    void accept(std::shared_ptr<Visitor> visitor) {
        for (auto& element : elements) {
            element->accept(visitor);
        }
    }
};

// 客户端代码
int main() {
    // 创建对象结构
    auto objectStructure = std::make_unique<ObjectStructure>();
    
    // 添加元素
    auto elementA1 = std::make_shared<ConcreteElementA>("Element A1");
    auto elementA2 = std::make_shared<ConcreteElementA>("Element A2");
    auto elementB1 = std::make_shared<ConcreteElementB>(10);
    auto elementB2 = std::make_shared<ConcreteElementB>(20);
    
    objectStructure->addElement(elementA1);
    objectStructure->addElement(elementA2);
    objectStructure->addElement(elementB1);
    objectStructure->addElement(elementB2);
    
    // 创建访问者
    auto visitor1 = std::make_shared<ConcreteVisitor1>();
    auto visitor2 = std::make_shared<ConcreteVisitor2>();
    
    // 使用访问者1
    std::cout << "=== Using ConcreteVisitor1 ===" << std::endl;
    objectStructure->accept(visitor1);
    
    // 使用访问者2
    std::cout << "\n=== Using ConcreteVisitor2 ===" << std::endl;
    objectStructure->accept(visitor2);
    
    return 0;
}
```

### 10.8 关键点总结

1. **操作分离**：访问者模式将操作从数据结构中分离出来，使操作可以独立变化。
2. **双重分派**：通过双重分派机制，将操作分派给访问者和被访问元素。
3. **元素稳定**：适用于数据结构相对稳定，但操作经常变化的场景。
4. **操作集中**：相关操作被集中在访问者中，提高了代码的可维护性。
5. **扩展困难**：添加新的元素需要修改所有访问者，扩展性较差。
6. **违反封装**：可能违反元素的封装原则，因为访问者需要了解元素的内部结构。

## 11. 空对象模式

### 11.1 概念定义

空对象模式（Null Object Pattern）是一种行为型设计模式，它用一个什么都不做的对象来代替NULL。这个空对象实现了与真实对象相同的接口，但它的方法体是空的或者返回默认值。

### 11.2 历史背景

空对象模式最早出现在面向对象编程中，用于解决空指针引用问题。它虽然未被收录在GoF的23种经典设计模式中，但被广泛认为是解决空指针问题的有效方案。

### 11.3 理论基础

空对象模式的理论基础基于以下几个核心概念：

1. **空对象**：创建一个表示"无"的对象，而不是使用null引用。
2. **统一接口**：空对象实现与真实对象相同的接口，使客户端可以统一处理。
3. **默认行为**：空对象提供默认行为或什么都不做，避免空指针异常。

### 11.4 数学模型

空对象模式可以用数学中的恒等函数来表示：

设对象集合为 O，空对象为 N：

```
for all o in O, o.method() → result
N.method() → default_value or no_operation
```

### 11.5 与软件质量属性的关系

空对象模式对软件质量属性的影响：

1. **可维护性**：提高了可维护性，因为不需要检查null引用。
2. **可读性**：提高了代码的可读性，因为减少了null检查代码。
3. **健壮性**：提高了系统的健壮性，因为避免了空指针异常。
4. **性能**：可能影响性能，因为需要创建额外的对象。
5. **复杂性**：可能增加系统的复杂性，特别是当空对象的行为复杂时。

### 11.6 实现方式

空对象模式的主要角色包括：

1. **抽象对象（Abstract Object）**：定义真实对象和空对象的共同接口。
2. **真实对象（Real Object）**：实现抽象对象接口，提供具体的行为。
3. **空对象（Null Object）**：实现抽象对象接口，提供默认行为或什么都不做。
4. **客户端（Client）**：使用抽象对象接口，不需要区分真实对象和空对象。

### 11.7 C++实现代码

```cpp
#include <iostream>
#include <string>
#include <memory>
#include <vector>

// 抽象对象
class Customer {
public:
    virtual ~Customer() = default;
    virtual std::string getName() const = 0;
    virtual bool isNil() const = 0;
    virtual void discount(double percentage) = 0;
    virtual double getDiscount() const = 0;
};

// 真实对象
class RealCustomer : public Customer {
private:
    std::string name;
    double discountRate;
    
public:
    RealCustomer(const std::string& n) : name(n), discountRate(0.0) {}
    
    std::string getName() const override {
        return name;
    }
    
    bool isNil() const override {
        return false;
    }
    
    void discount(double percentage) override {
        discountRate += percentage;
        if (discountRate > 100.0) {
            discountRate = 100.0;
        }
    }
    
    double getDiscount() const override {
        return discountRate;
    }
};

// 空对象
class NullCustomer : public Customer {
public:
    std::string getName() const override {
        return "Not Available";
    }
    
    bool isNil() const override {
        return true;
    }
    
    void discount(double percentage) override {
        // 什么都不做
    }
    
    double getDiscount() const override {
        return 0.0;
    }
    
    // 单例模式
    static std::shared_ptr<Customer> getInstance() {
        static std::shared_ptr<Customer> instance = std::make_shared<NullCustomer>();
        return instance;
    }
};

// 客户端
class CustomerFactory {
public:
    static std::vector<std::string> names;
    
    static std::shared_ptr<Customer> getCustomer(const std::string& name) {
        for (const auto& n : names) {
            if (n == name) {
                return std::make_shared<RealCustomer>(name);
            }
        }
        return NullCustomer::getInstance();
    }
};

// 初始化静态成员
std::vector<std::string> CustomerFactory::names = {"Alice", "Bob", "Charlie"};

// 客户端代码
int main() {
    // 获取客户
    auto customer1 = CustomerFactory::getCustomer("Alice");
    auto customer2 = CustomerFactory::getCustomer("Bob");
    auto customer3 = CustomerFactory::getCustomer("David"); // 不存在的客户
    
    // 处理客户
    std::vector<std::shared_ptr<Customer>> customers = {customer1, customer2, customer3};
    
    for (auto& customer : customers) {
        std::cout << "Customer: " << customer->getName() << std::endl;
        
        if (!customer->isNil()) {
            customer->discount(10.0);
            std::cout << "  Discount applied: " << customer->getDiscount() << "%" << std::endl;
        } else {
            std::cout << "  This is a null customer, no discount applied." << std::endl;
        }
        
        std::cout << std::endl;
    }
    
    // 不需要检查null
    for (auto& customer : customers) {
        std::cout << "Final discount for " << customer->getName() 
                  << ": " << customer->getDiscount() << "%" << std::endl;
    }
    
    return 0;
}
```

### 11.8 关键点总结

1. **空对象替代null**：空对象模式用一个什么都不做的对象来代替NULL，避免空指针异常。
2. **统一接口**：空对象实现与真实对象相同的接口，使客户端可以统一处理。
3. **默认行为**：空对象提供默认行为或什么都不做，避免空指针异常。
4. **简化代码**：简化了客户端代码，因为不需要检查null引用。
5. **性能考虑**：可能影响性能，因为需要创建额外的对象。
6. **单例模式**：空对象通常使用单例模式，因为所有空对象的行为相同。

## 12. 章节总结

### 12.1 行为型设计模式的分类与特点

行为型设计模式主要关注对象之间的通信和职责分配，可以分为以下几类：

1. **类行为模式**：使用继承机制在类间分配行为，如模板方法模式。
2. **对象行为模式**：使用组合或聚合在对象间分配行为，如责任链模式、命令模式、迭代器模式、中介者模式、备忘录模式、观察者模式、状态模式、策略模式、访问者模式和空对象模式。

### 12.2 行为型设计模式的设计原则

行为型设计模式遵循以下设计原则：

1. **单一职责原则**：每个类应该只有一个引起变化的原因。
2. **开闭原则**：对扩展开放，对修改关闭。
3. **里氏替换原则**：子类必须能够替换其基类。
4. **接口隔离原则**：不应该强迫客户依赖于它们不使用的方法。
5. **依赖倒置原则**：高层模块不应该依赖于低层模块，两者都应该依赖于抽象。

### 12.3 行为型设计模式的应用场景

行为型设计模式适用于以下场景：

1. **需要处理复杂的对象交互**：如中介者模式、观察者模式。
2. **需要封装算法或行为**：如策略模式、模板方法模式。
3. **需要管理对象状态**：如状态模式、备忘录模式。
4. **需要遍历集合对象**：如迭代器模式。
5. **需要处理请求**：如责任链模式、命令模式。
6. **需要添加新操作而不修改类**：如访问者模式。
7. **需要避免空指针异常**：如空对象模式。

### 12.4 行为型设计模式之间的关系

行为型设计模式之间存在以下关系：

1. **模板方法模式与策略模式**：模板方法模式使用继承来改变算法的部分，策略模式使用组合来改变整个算法。
2. **命令模式与策略模式**：命令模式将请求封装为对象，策略模式封装算法。
3. **观察者模式与中介者模式**：观察者模式定义一对多的依赖关系，中介者模式封装多对多的交互。
4. **状态模式与策略模式**：状态模式将行为与状态关联，策略模式封装算法。
5. **迭代器模式与访问者模式**：迭代器模式遍历对象结构，访问者模式对对象结构执行操作。

### 12.5 行为型设计模式的优缺点

行为型设计模式的优点：

1. **提高代码的可维护性**：通过封装变化，使代码更容易维护。
2. **提高代码的可扩展性**：通过抽象和接口，使代码更容易扩展。
3. **提高代码的可重用性**：通过组合和继承，使代码更容易重用。
4. **提高代码的灵活性**：通过多态和组合，使代码更加灵活。

行为型设计模式的缺点：

1. **增加系统的复杂性**：引入了更多的类和对象。
2. **可能影响性能**：增加了额外的间接调用。
3. **可能导致过度设计**：在简单场景下可能过度复杂化。
4. **学习成本高**：需要理解模式的概念和实现。

### 12.6 行为型设计模式的最佳实践

使用行为型设计模式的最佳实践：

1. **根据需求选择合适的模式**：不要为了使用模式而使用模式。
2. **保持简单**：在满足需求的前提下，尽量保持设计简单。
3. **理解模式的适用场景**：了解每个模式的适用场景和局限性。
4. **结合使用多种模式**：根据需要结合使用多种模式。
5. **重构时引入模式**：在重构过程中引入模式，而不是一开始就使用。
6. **文档化模式的使用**：在代码中记录模式的使用和目的。

### 12.7 行为型设计模式的未来发展趋势

行为型设计模式的未来发展趋势：

1. **与函数式编程结合**：将行为型模式与函数式编程概念结合。
2. **与响应式编程结合**：将行为型模式与响应式编程概念结合。
3. **与微服务架构结合**：在微服务架构中应用行为型模式。
4. **与人工智能结合**：在人工智能系统中应用行为型模式。
5. **模式语言的演进**：随着编程语言的发展，行为型模式的实现方式也在演进。

行为型设计模式是面向对象设计中的重要组成部分，它们帮助我们构建灵活、可维护和可扩展的软件系统。通过理解和应用这些模式，我们可以更好地处理对象之间的交互和职责分配，提高软件的质量和可维护性。