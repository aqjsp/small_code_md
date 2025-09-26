/**
 * 面经数据加载器
 * 自动生成，请勿手动修改
 */

// 引入Towxml库
const towxml = require('../../towxml/index');

class InterviewLoader {
  constructor() {
    this.interviews = new Map();
    this.companies = new Map();
    
    // 初始化Towxml实例 - 修复：towxml 是函数，不是构造函数
    this.towxml = require('../../towxml/index.js');
    
    this.loadDefaultData();
  }

  /**
   * 初始化数据
   */
  initializeData() {
    this.loadDefaultData();
  }

  /**
   * 加载默认数据
   */
  loadDefaultData() {
    // 注册阿里巴巴公司
    this.registerCompany({
      id: 'alibaba',
      name: '阿里巴巴',
      logo: '/images/companies/alibaba.png',
      description: '阿里巴巴公司面试经验分享'
    });

    // 注册字节跳动公司
    this.registerCompany({
      id: 'bytedance',
      name: '字节跳动',
      logo: '/images/companies/bytedance.png',
      description: '字节跳动公司面试经验分享'
    });

    // 注册拼多多公司
    this.registerCompany({
      id: 'pdd',
      name: '拼多多',
      logo: '/images/companies/pdd.png',
      description: '拼多多公司面试经验分享'
    });

    // 注册腾讯公司
    this.registerCompany({
      id: 'tencent',
      name: '腾讯',
      logo: '/images/companies/tencent.png',
      description: '腾讯公司面试经验分享'
    });

    // 阿里巴巴面经数据
    const alibabaInterviews = [
      {
        id: "ali_001",
        companyId: 'alibaba',
        title: "阿里巴巴Java后端开发工程师一面面经",
        position: "前端开发工程师",
        round: "技术面",
        date: "2025-09-26",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","前端开发"],
        difficulty: "困难",
        views: 0,
        likes: 0,
        content: this.getAli001Content,
        filePath: "data/interviews/alibaba/ali_001.md"
      },
      {
        id: "ali_002",
        companyId: 'alibaba',
        title: "阿里巴巴前端开发工程师二面面经",
        position: "前端开发工程师",
        round: "二面",
        date: "2025-12-20",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","React","前端工程化","性能优化"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getAli002Content,
        filePath: "data/interviews/alibaba/ali_002.md"
      },
      {
        id: "ali_003",
        companyId: 'alibaba',
        title: "阿里巴巴前端开发工程师三面面经",
        position: "前端开发工程师",
        round: "三面",
        date: "2025-12-21",
        duration: "90分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","React","架构设计","团队管理"],
        difficulty: "困难",
        views: 0,
        likes: 0,
        content: this.getAli003Content,
        filePath: "data/interviews/alibaba/ali_003.md"
      },
      {
        id: "ali_004",
        companyId: 'alibaba',
        title: "阿里巴巴前端开发工程师四面面经",
        position: "前端开发工程师",
        round: "技术面",
        date: "2025-09-26",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","前端开发"],
        difficulty: "简单",
        views: 0,
        likes: 0,
        content: this.getAli004Content,
        filePath: "data/interviews/alibaba/ali_004.md"
      },
      {
        id: "ali_005",
        companyId: 'alibaba',
        title: "阿里巴巴前端开发工程师5面面经",
        position: "前端开发工程师",
        round: "技术面",
        date: "2025-09-26",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","前端开发"],
        difficulty: "简单",
        views: 0,
        likes: 0,
        content: this.getAli005Content,
        filePath: "data/interviews/alibaba/ali_005.md"
      },
      {
        id: "ali_test_auto copy",
        companyId: 'alibaba',
        title: "自动检测测试面经",
        position: "全栈开发工程师",
        round: "一面",
        date: "2025-12-25",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Node.js","自动化测试"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getAliTestAutoCopyContent,
        filePath: "data/interviews/alibaba/ali_test_auto copy.md"
      },
      {
        id: "ali_test_auto",
        companyId: 'alibaba',
        title: "自动检测测试面经",
        position: "全栈开发工程师",
        round: "一面",
        date: "2025-12-25",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Node.js","自动化测试"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getAliTestAutoContent,
        filePath: "data/interviews/alibaba/ali_test_auto.md"
      },
      {
        id: "ali_test_debounce",
        companyId: 'alibaba',
        title: "防抖测试面经",
        position: "前端开发工程师",
        round: "技术面",
        date: "2025-09-26",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","前端开发"],
        difficulty: "简单",
        views: 0,
        likes: 0,
        content: this.getAliTestDebounceContent,
        filePath: "data/interviews/alibaba/ali_test_debounce.md"
      },
      {
        id: "ali_test_debounce_copy",
        companyId: 'alibaba',
        title: "抖音一面",
        position: "前端开发工程师",
        round: "技术面",
        date: "2025-09-26",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","前端开发"],
        difficulty: "简单",
        views: 0,
        likes: 0,
        content: this.getAliTestDebounceCopyContent,
        filePath: "data/interviews/alibaba/ali_test_debounce_copy.md"
      }
    ];

    // 注册阿里巴巴面经数据
    this.interviews.set('alibaba', alibabaInterviews);

    // 字节跳动面经数据
    const bytedanceInterviews = [
      {
        id: "byte_001",
        companyId: 'bytedance',
        title: "字节跳动前端开发工程师面试经验",
        position: "前端开发工程师",
        round: "一面",
        date: "2025-12-25",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","React","前端开发","算法"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getByte001Content,
        filePath: "data/interviews/bytedance/byte_001.md"
      },
      {
        id: "byte_002",
        companyId: 'bytedance',
        title: "字节跳动前端开发工程师面试经验",
        position: "前端开发工程师",
        round: "一面",
        date: "2025-12-25",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","React","前端开发","算法"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getByte002Content,
        filePath: "data/interviews/bytedance/byte_002.md"
      }
    ];

    // 注册字节跳动面经数据
    this.interviews.set('bytedance', bytedanceInterviews);

    // 拼多多面经数据
    const pddInterviews = [
      {
        id: "pdd_001",
        companyId: 'pdd',
        title: "拼多多前端开发工程师二面面经",
        position: "前端开发工程师",
        round: "二面",
        date: "2025-12-26",
        duration: "90分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","React","TypeScript","微前端"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getPdd001Content,
        filePath: "data/interviews/pdd/pdd_001.md"
      }
    ];

    // 注册拼多多面经数据
    this.interviews.set('pdd', pddInterviews);

    // 腾讯面经数据
    const tencentInterviews = [
      {
        id: "tx_001",
        companyId: 'tencent',
        title: "腾讯一面",
        position: "前端开发工程师",
        round: "技术面",
        date: "2025-09-26",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","前端开发"],
        difficulty: "简单",
        views: 0,
        likes: 0,
        content: this.getTx001Content,
        filePath: "data/interviews/tencent/tx_001.md"
      },
      {
        id: "tx_002",
        companyId: 'tencent',
        title: "腾讯前端开发工程师二面面经",
        position: "前端开发工程师",
        round: "二面",
        date: "2025-12-26",
        duration: "90分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","React","TypeScript","微前端"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getTx002Content,
        filePath: "data/interviews/tencent/tx_002.md"
      },
      {
        id: "tx_003",
        companyId: 'tencent',
        title: "阿里巴巴前端开发工程师四面面经",
        position: "前端开发工程师",
        round: "技术面",
        date: "2025-09-26",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","前端开发"],
        difficulty: "简单",
        views: 0,
        likes: 0,
        content: this.getTx003Content,
        filePath: "data/interviews/tencent/tx_003.md"
      },
      {
        id: "tx_004",
        companyId: 'tencent',
        title: "阿里巴巴前端开发工程师二面面经",
        position: "前端开发工程师",
        round: "二面",
        date: "2025-12-20",
        duration: "60分钟",
        format: "线上视频面试",
        result: "通过",
        tags: ["JavaScript","Vue.js","React","前端工程化","性能优化"],
        difficulty: "中等",
        views: 0,
        likes: 0,
        content: this.getTx004Content,
        filePath: "data/interviews/tencent/tx_004.md"
      }
    ];

    // 注册腾讯面经数据
    this.interviews.set('tencent', tencentInterviews);
  }

  /**
   * 注册公司
   */
  registerCompany(company) {
    this.companies.set(company.id, company);
  }

  /**
   * 获取所有公司
   */
  getAllCompanies() {
    return Array.from(this.companies.values());
  }

  /**
   * 获取所有公司（别名）
   */
  getCompanies() {
    return this.getAllCompanies();
  }

  /**
   * 根据公司ID获取公司信息
   */
  getCompanyById(companyId) {
    return this.companies.get(companyId);
  }

  /**
   * 获取公司的所有面经
   */
  getInterviewsByCompany(companyId) {
    const interviews = this.interviews.get(companyId) || [];
    // 从本地存储中加载每个面经的阅读次数
    return interviews.map(interview => {
      const storageKey = `interview_views_${interview.id}`;
      const storedViews = wx.getStorageSync(storageKey) || 0;
      return {
        ...interview,
        views: storedViews
      };
    });
  }

  /**
   * 根据ID获取面经
   */
  getInterviewById(interviewId) {
    for (const [companyId, interviews] of this.interviews) {
      const interview = interviews.find(item => item.id === interviewId);
      if (interview) {
        return interview;
      }
    }
    return null;
  }

  /**
   * 获取所有面经
   */
  getAllInterviews() {
    const allInterviews = [];
    for (const [companyId, interviews] of this.interviews) {
      interviews.forEach(interview => {
        allInterviews.push({
          ...interview,
          company: companyId
        });
      });
    }
    return allInterviews;
  }

  /**
   * 根据标签过滤面经
   */
  filterByTags(tags) {
    const results = [];
    for (const [companyId, interviews] of this.interviews) {
      interviews.forEach(interview => {
        const hasMatchingTag = tags.some(tag => 
          interview.tags.some(interviewTag => 
            interviewTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
        if (hasMatchingTag) {
          results.push({
            ...interview,
            company: companyId
          });
        }
      });
    }
    return results;
  }

  /**
   * 增加公司列表查看次数
   */
  incrementCompanyListViews() {
    // 在实际应用中，这里应该记录到数据库或本地存储
    // 目前返回成功状态
    return true;
  }

  /**
   * 增加面经查看次数
   */
  incrementViews(interviewId) {
    // 在实际应用中，这里应该记录到数据库或本地存储
    // 目前返回成功状态
    return true;
  }

  /**
   * 增加面经点赞次数
   */
  incrementLikes(interviewId) {
    // 在实际应用中，这里应该记录到数据库或本地存储
    // 目前返回成功状态
    return true;
  }

  /**
   * 增加面经详情查看次数
   */
  incrementInterviewDetailViews(interviewId) {
    // 在实际应用中，这里应该记录到数据库或本地存储
    // 目前返回成功状态
    return true;
  }

  /**
   * 增加文章详情查看次数
   */
  incrementArticleDetailViews(articleId) {
    // 在实际应用中，这里应该记录到数据库或本地存储
    // 目前返回成功状态
    return true;
  }

  /**
   * 获取公司列表总查看次数
   */
  getCompanyListTotalViews() {
    // 在实际应用中，这里应该从数据库或本地存储读取
    // 目前返回模拟数据
    return Math.floor(Math.random() * 10000) + 1000;
  }

  /**
   * 获取公司面经阅读人数
   */
  getCompanyInterviewReaderCount(companyId) {
    // 在实际应用中，这里应该从数据库或本地存储读取
    // 目前返回模拟数据
    return Math.floor(Math.random() * 5000) + 500;
  }



  /**
   * 加载面经内容
   */
  async loadInterviewContent(interviewId) {
    const interview = this.getInterviewById(interviewId);
    if (!interview) return null;
    
    const content = typeof interview.content === 'function' ? interview.content() : interview.content;
    
    return {
      ...interview,
      content: content
    };
  }

  /**
   * 搜索面经
   */
  searchInterviews(keyword) {
    const results = [];
    const searchKeyword = keyword.toLowerCase().trim();
    
    for (const [companyId, interviews] of this.interviews) {
      interviews.forEach(interview => {
        // 只按照标题进行模糊匹配
        if (interview.title.toLowerCase().includes(searchKeyword)) {
          results.push({
            ...interview,
            company: companyId
          });
        }
      });
    }
    return results;
  }

  /**
   * 获取热门面经
   */
  getPopularInterviews(limit = 10) {
    const allInterviews = [];
    for (const [companyId, interviews] of this.interviews) {
      interviews.forEach(interview => {
        allInterviews.push({
          ...interview,
          company: companyId
        });
      });
    }
    return allInterviews
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }

  /**
   * 获取面经内容（Towxml渲染）
   */
  getInterviewContent(interviewId) {
    const methodName = 'get' + this.toCamelCase(interviewId) + 'Content';
    if (typeof this[methodName] === 'function') {
      return this[methodName]();
    }
    return null;
  }

  /**
   * 转换为驼峰命名（内部使用）
   */
  toCamelCase(str) {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
              .replace(/^[a-z]/, chr => chr.toUpperCase());
  }

  /**
   * 获取最新面经
   */
  getLatestInterviews(limit = 10) {
    const allInterviews = [];
    for (const [companyId, interviews] of this.interviews) {
      interviews.forEach(interview => {
        allInterviews.push({
          ...interview,
          company: companyId
        });
      });
    }
    return allInterviews
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  /**
   * 增加面经查看次数
   */
  incrementViews(interviewId) {
    try {
      const storageKey = `interview_views_${interviewId}`;
      const currentViews = wx.getStorageSync(storageKey) || 0;
      const newViews = currentViews + 1;
      wx.setStorageSync(storageKey, newViews);
      return newViews;
    } catch (error) {
      console.error('Error incrementing views:', error);
      return 1;
    }
  }

  /**
   * 获取阿里巴巴Java后端开发工程师一面面经内容（Towxml渲染）
   */
  getAli001Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 📋 基本信息\r\n\r\n| 项目 | 详情 |\r\n|------|------|\r\n| **面试时间** | 2025年9月15日 14:00-14:45 |\r\n| **面试时长** | 45分钟 |\r\n| **面试官** | 技术专家 |\r\n| **面试形式** | 线上视频面试 |\r\n| **面试结果** | 通过 |\r\n\r\n## 🎯 面试重点\r\n\r\n本轮面试主要考察：\r\n- **Java基础**：集合、多线程、JVM等核心知识\r\n- **框架应用**：Spring、MyBatis等主流框架\r\n- **数据库**：MySQL优化、索引设计\r\n- **算法能力**：数据结构和算法题\r\n\r\n---\r\n\r\n## 💬 面试过程详录\r\n\r\n### 1. 自我介绍 (3分钟)\r\n\r\n**面试官**：\"请简单介绍一下自己和项目经验。\"\r\n\r\n**我**：\"我是一名Java后端开发工程师，有3年开发经验。主要负责电商平台的订单系统开发，使用Spring Boot、MySQL、Redis等技术栈。项目日均订单量10万+，在高并发优化、数据库设计等方面有一定经验。\"\r\n\r\n### 2. Java基础知识 (15分钟)\r\n\r\n**面试官**：\"HashMap的底层实现原理是什么？\"\r\n\r\n**我**：\"HashMap基于数组+链表+红黑树实现：\r\n- **数组**：存储桶(bucket)，默认容量16\r\n- **链表**：解决哈希冲突，链表长度>8时转红黑树\r\n- **红黑树**：优化查询性能，O(log n)复杂度\r\n\r\n**put过程**：\r\n1. 计算key的hash值\r\n2. 根据hash值定位数组索引\r\n3. 如果没有冲突直接放入\r\n4. 有冲突则加入链表或红黑树\r\n5. 容量超过阈值时扩容(resize)\"\r\n\r\n**面试官**：\"ConcurrentHashMap如何保证线程安全？\"\r\n\r\n**我**：\"JDK1.8的ConcurrentHashMap采用CAS+synchronized：\r\n- **CAS操作**：用于数组元素的原子性更新\r\n- **synchronized**：锁定链表或红黑树的头节点\r\n- **分段锁思想**：只锁定操作的桶，提高并发度\r\n\r\n相比JDK1.7的Segment分段锁，锁粒度更细，性能更好。\"\r\n\r\n**面试官**：\"线程池的核心参数有哪些？\"\r\n\r\n**我**：\"ThreadPoolExecutor有7个核心参数：\r\n1. **corePoolSize**：核心线程数\r\n2. **maximumPoolSize**：最大线程数\r\n3. **keepAliveTime**：空闲线程存活时间\r\n4. **unit**：时间单位\r\n5. **workQueue**：任务队列\r\n6. **threadFactory**：线程工厂\r\n7. **handler**：拒绝策略\r\n\r\n**执行流程**：\r\n1. 线程数<corePoolSize，创建新线程\r\n2. 核心线程满，任务入队列\r\n3. 队列满且线程数<maximumPoolSize，创建新线程\r\n4. 都满了执行拒绝策略\"\r\n\r\n### 3. Spring框架 (10分钟)\r\n\r\n**面试官**：\"Spring的IOC和AOP是什么？\"\r\n\r\n**我**：\"**IOC(控制反转)**：\r\n- 对象的创建和依赖关系由Spring容器管理\r\n- 通过依赖注入(DI)实现\r\n- 降低代码耦合度，提高可测试性\r\n\r\n**AOP(面向切面编程)**：\r\n- 将横切关注点(如日志、事务)从业务逻辑中分离\r\n- 通过动态代理实现\r\n- JDK动态代理(接口)或CGLIB(类)\r\n\r\n**应用场景**：事务管理、日志记录、权限控制等。\"\r\n\r\n**面试官**：\"Spring Boot的自动配置原理？\"\r\n\r\n**我**：\"Spring Boot自动配置基于条件注解：\r\n1. **@EnableAutoConfiguration**：启用自动配置\r\n2. **spring.factories**：定义自动配置类\r\n3. **@Conditional**：条件判断注解\r\n4. **@ConfigurationProperties**：属性绑定\r\n\r\n**工作流程**：\r\n1. 扫描classpath下的spring.factories\r\n2. 加载自动配置类\r\n3. 根据条件注解判断是否生效\r\n4. 创建相应的Bean\"\r\n\r\n### 4. 数据库相关 (10分钟)\r\n\r\n**面试官**：\"MySQL的索引类型有哪些？\"\r\n\r\n**我**：\"MySQL主要索引类型：\r\n\r\n**按数据结构分**：\r\n- **B+Tree索引**：最常用，支持范围查询\r\n- **Hash索引**：等值查询快，不支持范围查询\r\n- **全文索引**：用于文本搜索\r\n\r\n**按逻辑分**：\r\n- **主键索引**：唯一且非空\r\n- **唯一索引**：值唯一\r\n- **普通索引**：最基本的索引\r\n- **组合索引**：多个字段组成\r\n\r\n**使用原则**：\r\n- 查询频繁的字段建索引\r\n- 避免过多索引影响写性能\r\n- 遵循最左前缀原则\"\r\n\r\n**面试官**：\"如何优化慢SQL？\"\r\n\r\n**我**：\"慢SQL优化步骤：\r\n\r\n**1. 定位问题**：\r\n- 开启慢查询日志\r\n- 使用EXPLAIN分析执行计划\r\n\r\n**2. 优化策略**：\r\n- **索引优化**：添加合适索引\r\n- **SQL重写**：避免SELECT *，优化WHERE条件\r\n- **表结构优化**：字段类型、分区表\r\n- **查询优化**：分页优化、子查询优化\r\n\r\n**3. 监控验证**：\r\n- 对比优化前后性能\r\n- 持续监控执行计划\"\r\n\r\n### 5. 算法题 (7分钟)\r\n\r\n**面试官**：\"请实现一个LRU缓存。\"\r\n\r\n**我**：\"LRU(Least Recently Used)可以用HashMap+双向链表实现：\r\n\r\n```java\r\nclass LRUCache {\r\n    class Node {\r\n        int key, value;\r\n        Node prev, next;\r\n        Node(int k, int v) {\r\n            key = k;\r\n            value = v;\r\n        }\r\n    }\r\n    \r\n    private Map<Integer, Node> map;\r\n    private Node head, tail;\r\n    private int capacity;\r\n    \r\n    public LRUCache(int capacity) {\r\n        this.capacity = capacity;\r\n        this.map = new HashMap<>();\r\n        this.head = new Node(0, 0);\r\n        this.tail = new Node(0, 0);\r\n        head.next = tail;\r\n        tail.prev = head;\r\n    }\r\n    \r\n    public int get(int key) {\r\n        Node node = map.get(key);\r\n        if (node == null) return -1;\r\n        \r\n        // 移动到头部\r\n        moveToHead(node);\r\n        return node.value;\r\n    }\r\n    \r\n    public void put(int key, int value) {\r\n        Node node = map.get(key);\r\n        if (node != null) {\r\n            node.value = value;\r\n            moveToHead(node);\r\n        } else {\r\n            Node newNode = new Node(key, value);\r\n            if (map.size() >= capacity) {\r\n                // 删除尾部节点\r\n                Node tail = removeTail();\r\n                map.remove(tail.key);\r\n            }\r\n            map.put(key, newNode);\r\n            addToHead(newNode);\r\n        }\r\n    }\r\n    \r\n    private void moveToHead(Node node) {\r\n        removeNode(node);\r\n        addToHead(node);\r\n    }\r\n    \r\n    private void removeNode(Node node) {\r\n        node.prev.next = node.next;\r\n        node.next.prev = node.prev;\r\n    }\r\n    \r\n    private void addToHead(Node node) {\r\n        node.prev = head;\r\n        node.next = head.next;\r\n        head.next.prev = node;\r\n        head.next = node;\r\n    }\r\n    \r\n    private Node removeTail() {\r\n        Node last = tail.prev;\r\n        removeNode(last);\r\n        return last;\r\n    }\r\n}\r\n```\r\n\r\n**时间复杂度**：O(1)\r\n**空间复杂度**：O(capacity)\"\r\n\r\n---\r\n\r\n## 🤔 面试官提问汇总\r\n\r\n1. HashMap底层实现和扩容机制\r\n2. ConcurrentHashMap线程安全实现\r\n3. 线程池核心参数和执行流程\r\n4. Spring IOC和AOP原理\r\n5. Spring Boot自动配置机制\r\n6. MySQL索引类型和优化\r\n7. 慢SQL定位和优化方法\r\n8. LRU缓存算法实现\r\n\r\n---\r\n\r\n## 💡 我的提问\r\n\r\n**我**：\"请问团队主要使用哪些技术栈？\"\r\n\r\n**面试官**：\"我们主要使用Java技术栈，Spring Boot、Dubbo、MySQL、Redis等，也在逐步引入云原生技术。\"\r\n\r\n**我**：\"新人入职后的成长路径是怎样的？\"\r\n\r\n**面试官**：\"有完善的导师制度，会安排资深同事带你，还有定期的技术分享和培训。\"\r\n\r\n---\r\n\r\n## 📝 面试总结\r\n\r\n### ✅ 表现良好的地方\r\n- Java基础知识掌握扎实\r\n- 能够结合实际项目经验回答问题\r\n- 算法题思路清晰，代码实现正确\r\n- 对常用框架有深入理解\r\n\r\n### ⚠️ 需要改进的地方\r\n- JVM相关知识可以更深入\r\n- 分布式系统经验需要补充\r\n- 对阿里技术栈了解不够\r\n\r\n### 🎯 后续准备方向\r\n- 深入学习JVM原理和调优\r\n- 了解分布式系统设计\r\n- 学习阿里开源技术栈\r\n- 准备系统设计题\r\n\r\n---\r\n\r\n## 📚 相关资料推荐\r\n\r\n- 《深入理解Java虚拟机》\r\n- 《Java并发编程实战》\r\n- 《Spring源码深度解析》\r\n- 《高性能MySQL》\r\n- 《算法导论》\r\n\r\n---\r\n\r\n*面试时间：2025年9月15日*  \r\n*整理时间：2025年9月15日*  \r\n*状态：已通过，等待二面通知*", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取阿里巴巴前端开发工程师二面面经内容（Towxml渲染）
   */
  getAli002Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 基本信息\r\n\r\n**职位：** 前端开发工程师  \r\n**轮次：** 二面  \r\n**日期：** 2025-12-20  \r\n**时长：** 60分钟  \r\n**形式：** 线上视频面试  \r\n**结果：** 通过  \r\n**标签：** JavaScript, Vue.js, React, 前端工程化, 性能优化  \r\n**难度：** 中等  \r\n\r\n## 面试过程\r\n\r\n### 自我介绍\r\n面试官让我先做一个简单的自我介绍，重点介绍一下前端相关的项目经验。\r\n\r\n### 技术问题\r\n\r\n#### 1. JavaScript基础\r\n- 请解释一下JavaScript的事件循环机制\r\n- Promise和async/await的区别是什么？\r\n- 什么是闭包？请举个例子\r\n\r\n#### 2. Vue.js相关\r\n- Vue的响应式原理是什么？\r\n- Vue3相比Vue2有哪些重要改进？\r\n- 组件间通信有哪些方式？\r\n\r\n#### 3. React相关\r\n- React的虚拟DOM是如何工作的？\r\n- useEffect和useLayoutEffect的区别\r\n- React Hooks的使用场景和注意事项\r\n\r\n#### 4. 前端工程化\r\n- Webpack的工作原理\r\n- 如何优化前端项目的构建速度？\r\n- 前端监控和错误收集的方案\r\n\r\n#### 5. 性能优化\r\n- 前端性能优化的常见手段\r\n- 如何减少首屏加载时间？\r\n- 懒加载的实现原理\r\n\r\n### 算法题\r\n给定一个数组，找出其中两个数的和等于目标值的所有组合。\r\n\r\n```javascript\r\nfunction twoSum(nums, target) {\r\n    const map = new Map();\r\n    const result = [];\r\n    \r\n    for (let i = 0; i < nums.length; i++) {\r\n        const complement = target - nums[i];\r\n        if (map.has(complement)) {\r\n            result.push([map.get(complement), i]);\r\n        }\r\n        map.set(nums[i], i);\r\n    }\r\n    \r\n    return result;\r\n}\r\n```\r\n\r\n### 项目经验\r\n面试官详细询问了我之前做过的一个电商项目：\r\n- 项目的技术栈选择理由\r\n- 遇到的技术难点和解决方案\r\n- 性能优化的具体措施\r\n- 团队协作和代码规范\r\n\r\n## 面试感受\r\n\r\n这次二面比一面更加深入，主要考察前端的深度和广度。面试官很专业，问题由浅入深，既有基础概念也有实际应用。算法题难度适中，主要考察思路和代码实现能力。\r\n\r\n## 建议\r\n\r\n1. **扎实基础**：JavaScript基础一定要牢固，事件循环、闭包、原型链等核心概念要理解透彻\r\n2. **框架深入**：不仅要会用Vue/React，还要理解其底层原理\r\n3. **工程化能力**：现代前端开发离不开工程化，要了解构建工具和优化方案\r\n4. **项目经验**：准备好详细的项目介绍，包括技术选型、难点解决、性能优化等\r\n5. **算法练习**：虽然前端算法要求不如后端高，但基础的数据结构和算法还是要掌握\r\n\r\n## 总结\r\n\r\n整体面试体验很好，面试官很友善，会根据回答情况进行深入提问。建议大家在面试前充分准备，特别是要对自己的项目经验有深入的思考和总结。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取阿里巴巴前端开发工程师三面面经内容（Towxml渲染）
   */
  getAli003Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 📋 基本信息\r\n\r\n| 项目 | 详情 |\r\n|------|------|\r\n| **面试时间** | 2025年9月21日 14:00-15:30 |\r\n| **面试时长** | 90分钟 |\r\n| **面试官** | 技术总监 |\r\n| **面试形式** | 线上视频面试 |\r\n| **面试结果** | 通过 |\r\n\r\n**职位：** 前端开发工程师\r\n**轮次：** 三面\r\n**日期：** 2025年9月21日\r\n**时长：** 90分钟\r\n**形式：** 线上视频面试\r\n**结果：** 通过\r\n**标签：** JavaScript, Vue.js, React, 架构设计, 团队管理\r\n**难度：** 困难\r\n\r\n---\r\n\r\n## 💬 面试过程详录\r\n\r\n### 1. 技术架构讨论 (30分钟)\r\n\r\n**面试官**：\"请设计一个大型前端项目的技术架构。\"\r\n\r\n**我**：\"我会从以下几个维度来设计：\r\n\r\n1. **技术选型**\r\n   - 框架：Vue 3 + TypeScript\r\n   - 状态管理：Pinia\r\n   - 路由：Vue Router 4\r\n   - 构建工具：Vite\r\n   - UI组件库：Element Plus\r\n\r\n2. **项目结构**\r\n   - 微前端架构，主应用 + 子应用\r\n   - 公共组件库独立维护\r\n   - 工具函数库统一管理\r\n\r\n3. **工程化配置**\r\n   - ESLint + Prettier 代码规范\r\n   - Husky + lint-staged 提交检查\r\n   - Jest + Vue Test Utils 单元测试\r\n   - Cypress 端到端测试\r\n\r\n4. **性能优化**\r\n   - 路由懒加载\r\n   - 组件按需引入\r\n   - 图片懒加载和压缩\r\n   - CDN加速\r\n\r\n5. **监控和部署**\r\n   - Sentry错误监控\r\n   - 性能监控埋点\r\n   - CI/CD自动化部署\"\r\n\r\n**面试官**：\"微前端架构有什么优缺点？\"\r\n\r\n**我**：\"优点是技术栈独立、团队独立开发、部署独立；缺点是复杂度增加、通信成本高、首屏加载可能变慢。需要根据团队规模和业务复杂度来选择。\"\r\n\r\n### 2. 团队协作 (20分钟)\r\n\r\n**面试官**：\"如何在团队中推进技术方案？\"\r\n\r\n**我**：\"我认为需要考虑以下几个方面：\r\n\r\n1. **技术调研**：充分调研新技术的优缺点、学习成本、迁移成本\r\n2. **方案设计**：制定详细的技术方案和迁移计划\r\n3. **团队沟通**：组织技术分享，让团队了解新技术的价值\r\n4. **小范围试点**：先在小项目中验证可行性\r\n5. **逐步推广**：制定推广计划，提供培训和支持\r\n6. **效果评估**：定期评估效果，及时调整方案\"\r\n\r\n### 3. 技术深度 (25分钟)\r\n\r\n**面试官**：\"Vue 3的Composition API相比Options API有什么优势？\"\r\n\r\n**我**：\"主要优势包括：\r\n1. **逻辑复用**：更好的逻辑抽取和复用\r\n2. **类型推导**：更好的TypeScript支持\r\n3. **性能优化**：更细粒度的响应式控制\r\n4. **代码组织**：相关逻辑可以组织在一起\"\r\n\r\n**面试官**：\"如何进行前端性能优化？\"\r\n\r\n**我**：\"从几个维度来优化：\r\n1. **加载性能**：代码分割、懒加载、预加载\r\n2. **运行时性能**：虚拟滚动、防抖节流、避免重复渲染\r\n3. **网络优化**：HTTP/2、CDN、资源压缩\r\n4. **缓存策略**：浏览器缓存、应用缓存\r\n5. **监控分析**：性能监控、用户体验指标\"\r\n\r\n### 4. 算法题 (15分钟)\r\n\r\n**面试官**：\"实现一个LRU缓存。\"\r\n\r\n**我**：\"使用哈希表 + 双向链表实现：\r\n\r\n```javascript\r\nclass LRUCache {\r\n  constructor(capacity) {\r\n    this.capacity = capacity;\r\n    this.cache = new Map();\r\n  }\r\n  \r\n  get(key) {\r\n    if (this.cache.has(key)) {\r\n      const value = this.cache.get(key);\r\n      // 重新设置，移到最后\r\n      this.cache.delete(key);\r\n      this.cache.set(key, value);\r\n      return value;\r\n    }\r\n    return -1;\r\n  }\r\n  \r\n  put(key, value) {\r\n    if (this.cache.has(key)) {\r\n      this.cache.delete(key);\r\n    } else if (this.cache.size >= this.capacity) {\r\n      // 删除最久未使用的\r\n      const firstKey = this.cache.keys().next().value;\r\n      this.cache.delete(firstKey);\r\n    }\r\n    this.cache.set(key, value);\r\n  }\r\n}\r\n```\r\n\r\n时间复杂度O(1)，空间复杂度O(capacity)。\"\r\n\r\n---\r\n\r\n## 📝 面试总结\r\n\r\n### ✅ 表现良好的地方\r\n- 技术架构思路清晰，考虑全面\r\n- 团队协作经验丰富，有推进技术方案的实际经验\r\n- 对Vue 3等前端技术有深入理解\r\n- 性能优化有系统性思考\r\n- 算法题解答正确，思路清晰\r\n\r\n### ⚠️ 需要改进的地方\r\n- 对大规模系统的架构设计经验可以更丰富\r\n- 对新兴技术的了解可以更深入\r\n- 可以更多分享具体的项目案例\r\n\r\n### 🎯 面试官反馈\r\n- 技术基础扎实，有很好的工程化思维\r\n- 团队协作能力强，有技术推广经验\r\n- 学习能力强，对新技术保持敏感度\r\n- 符合高级前端工程师的要求\r\n\r\n---\r\n\r\n## 💡 我的提问\r\n\r\n**我**：\"请问团队目前的技术栈和未来规划？\"\r\n\r\n**面试官**：\"我们主要使用Vue 3 + TypeScript，正在推进微前端架构，未来会更多使用云原生技术。\"\r\n\r\n**我**：\"团队的成长机制是怎样的？\"\r\n\r\n**面试官**：\"有技术专家指导，定期技术分享，还有内部轮岗机会，可以接触不同的业务领域。\"\r\n\r\n---\r\n\r\n*面试时间：2025年9月21日*\r\n*整理时间：2025年9月21日*\r\n*状态：已通过*", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取阿里巴巴前端开发工程师四面面经内容（Towxml渲染）
   */
  getAli004Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 🎯 面试流程\r\n\r\n### 1. 自我介绍（5分钟）\r\nHR让我重新介绍一下自己，包括教育背景、工作经历和个人特点。\r\n\r\n### 2. 职业规划（15分钟）\r\n- 为什么选择前端开发？\r\n- 未来3-5年的职业规划是什么？\r\n- 对阿里巴巴的了解和期望\r\n- 为什么想加入阿里巴巴？\r\n\r\n### 3. 团队合作（10分钟）\r\n- 描述一次团队合作的经历\r\n- 如何处理团队冲突？\r\n- 你认为什么样的团队氛围最好？\r\n\r\n### 4. 个人品质（10分钟）\r\n- 你的优点和缺点是什么？\r\n- 如何处理工作压力？\r\n- 遇到挫折时如何调整心态？\r\n\r\n### 5. 薪资期望（5分钟）\r\n- 目前的薪资水平\r\n- 对新工作的薪资期望\r\n- 除了薪资还关注什么？\r\n\r\n---\r\n\r\n## 💡 问题详解\r\n\r\n### Q: 为什么选择前端开发？\r\n**A:** 我对用户界面和用户体验很感兴趣，前端开发能让我直接看到自己的代码变成用户可以交互的界面，这种成就感很强。而且前端技术发展很快，能让我保持学习的热情。\r\n\r\n### Q: 未来3-5年的职业规划？\r\n**A:** 短期内希望能在技术深度上有更大提升，成为团队的技术骨干；中期希望能带领小团队，积累管理经验；长期希望能成为技术专家或者技术管理者，为公司的技术发展贡献力量。\r\n\r\n### Q: 对阿里巴巴的了解？\r\n**A:** 阿里巴巴是中国领先的互联网公司，在电商、云计算、数字支付等领域都有很强的实力。我特别欣赏阿里的技术文化和开源精神，比如Ant Design、ECharts等优秀的开源项目。\r\n\r\n### Q: 描述一次团队合作经历？\r\n**A:** 在之前的项目中，我们团队需要在紧急时间内完成一个大型功能。我主动承担了前端架构设计的工作，与后端同事密切配合，制定了详细的接口规范，最终按时完成了项目。这次经历让我学会了如何在压力下保持团队协作。\r\n\r\n### Q: 如何处理工作压力？\r\n**A:** 我会先分析压力的来源，然后制定具体的解决方案。如果是技术问题，我会主动学习和请教；如果是时间压力，我会合理安排优先级；同时我也会通过运动和阅读来缓解压力。\r\n\r\n---\r\n\r\n## 📝 面试总结\r\n\r\n### ✅ 表现良好的地方\r\n- 回答问题思路清晰，逻辑性强\r\n- 对职业规划有明确的想法\r\n- 展现了良好的团队合作精神\r\n- 对公司有一定的了解和认同\r\n\r\n### ⚠️ 需要注意的地方\r\n- 可以更多展示个人的独特性\r\n- 对行业趋势的了解可以更深入\r\n- 可以准备更多具体的案例\r\n\r\n### 🎯 HR反馈\r\n- 个人素质不错，符合公司文化\r\n- 职业规划清晰，有上进心\r\n- 团队合作能力强\r\n- 学习能力和适应能力都很好\r\n\r\n---\r\n\r\n## 💡 我的提问\r\n\r\n**我：** \"请问公司的培训体系是怎样的？\"\r\n**HR：** \"我们有完善的新人培训体系，包括技术培训、业务培训和文化培训，还有导师制度。\"\r\n\r\n**我：** \"团队的工作氛围如何？\"\r\n**HR：** \"我们倡导开放、协作的工作氛围，鼓励创新和学习，团队关系都很融洽。\"\r\n\r\n**我：** \"什么时候能知道最终结果？\"\r\n**HR：** \"我们会在一周内给出最终结果，请保持电话畅通。\"\r\n\r\n---\r\n\r\n## 🎉 最终结果\r\n\r\n**状态：** ✅ 通过  \r\n**通知时间：** 2025年9月23日  \r\n**入职时间：** 2025年1月8日  \r\n\r\n---\r\n\r\n*面试时间：2025年9月22日*  \r\n*整理时间：2025年9月22日*  \r\n*状态：已通过，准备入职*", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取阿里巴巴前端开发工程师5面面经内容（Towxml渲染）
   */
  getAli005Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 📋 基本信息\r\n\r\n---\r\n\r\n## 🎯 面试流程\r\n\r\n### 1. 自我介绍（5分钟）\r\nHR让我重新介绍一下自己，包括教育背景、工作经历和个人特点。\r\n\r\n### 2. 职业规划（15分钟）\r\n- 为什么选择前端开发？\r\n- 未来3-5年的职业规划是什么？\r\n- 对阿里巴巴的了解和期望\r\n- 为什么想加入阿里巴巴？\r\n\r\n### 3. 团队合作（10分钟）\r\n- 描述一次团队合作的经历\r\n- 如何处理团队冲突？\r\n- 你认为什么样的团队氛围最好？\r\n\r\n### 4. 个人品质（10分钟）\r\n- 你的优点和缺点是什么？\r\n- 如何处理工作压力？\r\n- 遇到挫折时如何调整心态？\r\n\r\n### 5. 薪资期望（5分钟）\r\n- 目前的薪资水平\r\n- 对新工作的薪资期望\r\n- 除了薪资还关注什么？\r\n\r\n---\r\n\r\n## 💡 问题详解\r\n\r\n### Q: 为什么选择前端开发？\r\n**A:** 我对用户界面和用户体验很感兴趣，前端开发能让我直接看到自己的代码变成用户可以交互的界面，这种成就感很强。而且前端技术发展很快，能让我保持学习的热情。\r\n\r\n### Q: 未来3-5年的职业规划？\r\n**A:** 短期内希望能在技术深度上有更大提升，成为团队的技术骨干；中期希望能带领小团队，积累管理经验；长期希望能成为技术专家或者技术管理者，为公司的技术发展贡献力量。\r\n\r\n### Q: 对阿里巴巴的了解？\r\n**A:** 阿里巴巴是中国领先的互联网公司，在电商、云计算、数字支付等领域都有很强的实力。我特别欣赏阿里的技术文化和开源精神，比如Ant Design、ECharts等优秀的开源项目。\r\n\r\n### Q: 描述一次团队合作经历？\r\n**A:** 在之前的项目中，我们团队需要在紧急时间内完成一个大型功能。我主动承担了前端架构设计的工作，与后端同事密切配合，制定了详细的接口规范，最终按时完成了项目。这次经历让我学会了如何在压力下保持团队协作。\r\n\r\n### Q: 如何处理工作压力？\r\n**A:** 我会先分析压力的来源，然后制定具体的解决方案。如果是技术问题，我会主动学习和请教；如果是时间压力，我会合理安排优先级；同时我也会通过运动和阅读来缓解压力。\r\n\r\n---\r\n\r\n## 📝 面试总结\r\n\r\n### ✅ 表现良好的地方\r\n- 回答问题思路清晰，逻辑性强\r\n- 对职业规划有明确的想法\r\n- 展现了良好的团队合作精神\r\n- 对公司有一定的了解和认同\r\n\r\n### ⚠️ 需要注意的地方\r\n- 可以更多展示个人的独特性\r\n- 对行业趋势的了解可以更深入\r\n- 可以准备更多具体的案例\r\n\r\n### 🎯 HR反馈\r\n- 个人素质不错，符合公司文化\r\n- 职业规划清晰，有上进心\r\n- 团队合作能力强\r\n- 学习能力和适应能力都很好\r\n\r\n---\r\n\r\n## 💡 我的提问\r\n\r\n**我：** \"请问公司的培训体系是怎样的？\"\r\n**HR：** \"我们有完善的新人培训体系，包括技术培训、业务培训和文化培训，还有导师制度。\"\r\n\r\n**我：** \"团队的工作氛围如何？\"\r\n**HR：** \"我们倡导开放、协作的工作氛围，鼓励创新和学习，团队关系都很融洽。\"\r\n\r\n**我：** \"什么时候能知道最终结果？\"\r\n**HR：** \"我们会在一周内给出最终结果，请保持电话畅通。\"\r\n\r\n---\r\n\r\n## 🎉 最终结果\r\n\r\n**状态：** ✅ 通过  \r\n**通知时间：** 2025年9月23日  \r\n**入职时间：** 2025年1月8日  \r\n\r\n---\r\n\r\n*面试时间：2025年9月22日*  \r\n*整理时间：2025年9月22日*  \r\n*状态：已通过，准备入职*", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取自动检测测试面经内容（Towxml渲染）
   */
  getAliTestAutoCopyContent() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 基本信息\r\n\r\n**职位：** 全栈开发工程师  \r\n**轮次：** 一面  \r\n**日期：** 2025-12-25  \r\n**时长：** 60分钟  \r\n**形式：** 线上视频面试  \r\n**结果：** 通过  \r\n**标签：** JavaScript, Node.js, 自动化测试  \r\n**难度：** 中等  \r\n\r\n## 面试内容\r\n\r\n### 技术问题\r\n\r\n1. **JavaScript异步编程**\r\n   - Promise、async/await的使用\r\n   - 事件循环机制\r\n\r\n2. **Node.js相关**\r\n   - Express框架的使用\r\n   - 中间件的工作原理\r\n\r\n### 代码示例\r\n\r\n```javascript\r\nconst express = require('express');\r\nconst app = express();\r\n\r\napp.get('/api/test', async (req, res) => {\r\n  try {\r\n    const result = await someAsyncOperation();\r\n    res.json({ success: true, data: result });\r\n  } catch (error) {\r\n    res.status(500).json({ error: error.message });\r\n  }\r\n});\r\n\r\napp.listen(3000, () => {\r\n  console.log('Server running on port 3000');\r\n});\r\n```\r\n\r\n## 总结\r\n\r\n这是一个用于测试自动检测功能的面经文件。包含了基本的Markdown格式和代码块，用于验证自动转换脚本是否能正确检测新文件并将其转换为JavaScript代码。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取自动检测测试面经内容（Towxml渲染）
   */
  getAliTestAutoContent() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 基本信息\r\n\r\n**职位：** 全栈开发工程师  \r\n**轮次：** 一面  \r\n**日期：** 2025-12-25  \r\n**时长：** 60分钟  \r\n**形式：** 线上视频面试  \r\n**结果：** 通过  \r\n**标签：** JavaScript, Node.js, 自动化测试  \r\n**难度：** 中等  \r\n\r\n## 面试内容\r\n\r\n### 技术问题\r\n\r\n1. **JavaScript异步编程**\r\n   - Promise、async/await的使用\r\n   - 事件循环机制\r\n\r\n2. **Node.js相关**\r\n   - Express框架的使用\r\n   - 中间件的工作原理\r\n\r\n### 代码示例\r\n\r\n```javascript\r\nconst express = require('express');\r\nconst app = express();\r\n\r\napp.get('/api/test', async (req, res) => {\r\n  try {\r\n    const result = await someAsyncOperation();\r\n    res.json({ success: true, data: result });\r\n  } catch (error) {\r\n    res.status(500).json({ error: error.message });\r\n  }\r\n});\r\n\r\napp.listen(3000, () => {\r\n  console.log('Server running on port 3000');\r\n});\r\n```\r\n\r\n## 总结\r\n\r\n这是一个用于测试自动检测功能的面经文件。包含了基本的Markdown格式和代码块，用于验证自动转换脚本是否能正确检测新文件并将其转换为JavaScript代码。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取防抖测试面经内容（Towxml渲染）
   */
  getAliTestDebounceContent() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n这是一个用于测试防抖机制的面经文件。\r\n\r\n## 面试公司\r\n阿里巴巴\r\n\r\n## 面试岗位\r\n前端开发工程师\r\n\r\n## 面试内容\r\n测试防抖功能是否正常工作。\r\n\r\n```javascript\r\nfunction debounce(func, delay) {\r\n  let timeoutId;\r\n  return function(...args) {\r\n    clearTimeout(timeoutId);\r\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\r\n  };\r\n}\r\n```\r\n\r\n## 总结\r\n防抖机制可以有效避免重复执行。\r\n\r\n## 更新测试\r\n这是一个额外的更新，用于测试防抖机制。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取抖音一面内容（Towxml渲染）
   */
  getAliTestDebounceCopyContent() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n\r\n## 面试岗位\r\n前端开发工\r\n\r\n## 面试内容\r\n测试防抖功能是否正常工作。\r\n\r\n```javascript\r\nfunction debounce(func, delay) {\r\n  let timeoutId;\r\n  return function(...args) {\r\n    clearTimeout(timeoutId);\r\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\r\n  };\r\n}\r\n```\r\n\r\n## 总结\r\n防抖机制可以有效避免重复执行。\r\n\r\n## 更新测试\r\n这是一个额外的更新，用于测试防抖机制。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取字节跳动前端开发工程师面试经验内容（Towxml渲染）
   */
  getByte001Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n**职位：** 前端开发工程师  \r\n**轮次：** 一面  \r\n**面试时间：** 2025-12-25  \r\n**面试时长：** 60分钟  \r\n**面试形式：** 线上视频面试  \r\n**面试结果：** 通过  \r\n**标签：** JavaScript, React, 前端开发, 算法  \r\n**难度：** 中等  \r\n\r\n## 面试过程\r\n\r\n### 自我介绍\r\n面试官让我先做了一个简单的自我介绍，介绍了我的技术栈和项目经验。\r\n\r\n### 技术问题\r\n\r\n#### 1. JavaScript基础\r\n- 闭包的概念和应用场景\r\n- 事件循环机制\r\n- Promise和async/await的区别\r\n\r\n#### 2. React相关\r\n- React的生命周期\r\n- Hooks的使用和原理\r\n- 状态管理方案的选择\r\n\r\n#### 3. 算法题\r\n实现一个函数，判断一个字符串是否为回文字符串。\r\n\r\n```javascript\r\nfunction isPalindrome(str) {\r\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\r\n  return cleaned === cleaned.split('').reverse().join('');\r\n}\r\n```\r\n\r\n## 面试感受\r\n面试官很友好，问题难度适中，主要考察基础知识和编程能力。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取字节跳动前端开发工程师面试经验内容（Towxml渲染）
   */
  getByte002Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n**职位：** 前端开发工程师  \r\n**轮次：** 一面  \r\n**面试时间：** 2025-12-25  \r\n**面试时长：** 60分钟  \r\n**面试形式：** 线上视频面试  \r\n**面试结果：** 通过  \r\n**标签：** JavaScript, React, 前端开发, 算法  \r\n**难度：** 中等  \r\n\r\n## 面试过程\r\n\r\n### 自我介绍\r\n面试官让我先做了一个简单的自我介绍，介绍了我的技术栈和项目经验。\r\n\r\n### 技术问题\r\n\r\n#### 1. JavaScript基础\r\n- 闭包的概念和应用场景\r\n- 事件循环机制\r\n- Promise和async/await的区别\r\n\r\n#### 2. React相关\r\n- React的生命周期\r\n- Hooks的使用和原理\r\n- 状态管理方案的选择\r\n\r\n#### 3. 算法题\r\n实现一个函数，判断一个字符串是否为回文字符串。\r\n\r\n```javascript\r\nfunction isPalindrome(str) {\r\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\r\n  return cleaned === cleaned.split('').reverse().join('');\r\n}\r\n```\r\n\r\n## 面试感受\r\n面试官很友好，问题难度适中，主要考察基础知识和编程能力。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取拼多多前端开发工程师二面面经内容（Towxml渲染）
   */
  getPdd001Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n**职位：** 前端开发工程师  \r\n**轮次：** 二面  \r\n**面试时间：** 2025-12-26  \r\n**面试时长：** 90分钟  \r\n**面试形式：** 线上视频面试  \r\n**面试结果：** 通过  \r\n**标签：** JavaScript, React, TypeScript, 微前端  \r\n**难度：** 中等  \r\n\r\n## 面试过程\r\n\r\n### 技术问题\r\n\r\n1. **React Hooks 原理**\r\n   - 详细解释了 useState 和 useEffect 的实现原理\r\n   - 讨论了 Hooks 的闭包陷阱问题及解决方案\r\n\r\n2. **TypeScript 高级特性**\r\n   - 泛型的使用场景和最佳实践\r\n   - 条件类型和映射类型的应用\r\n\r\n3. **微前端架构**\r\n   - single-spa 框架的使用经验\r\n   - 微前端应用间的通信方案\r\n\r\n### 项目经验\r\n\r\n面试官重点询问了我在微前端项目中的实践经验，包括：\r\n- 如何解决样式隔离问题\r\n- 公共依赖的管理策略\r\n- 部署和发布流程的设计\r\n\r\n### 算法题\r\n\r\n给出了一道中等难度的动态规划题目，要求在30分钟内完成。\r\n\r\n## 面试感受\r\n\r\n面试官非常专业，问题有深度但不刁钻。整个过程比较轻松，能感受到腾讯技术团队的实力。\r\n\r\n## 总结\r\n\r\n这次面试让我对腾讯的技术栈有了更深入的了解，也发现了自己在某些领域还需要继续学习。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取腾讯一面内容（Towxml渲染）
   */
  getTx001Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("这是一个腾讯一面的记录。\r\n这是一个用于测试腾讯一面的记录文件。\r\n\r\n", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取腾讯前端开发工程师二面面经内容（Towxml渲染）
   */
  getTx002Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n**职位：** 前端开发工程师  \r\n**轮次：** 二面  \r\n**面试时间：** 2025-12-26  \r\n**面试时长：** 90分钟  \r\n**面试形式：** 线上视频面试  \r\n**面试结果：** 通过  \r\n**标签：** JavaScript, React, TypeScript, 微前端  \r\n**难度：** 中等  \r\n\r\n## 面试过程\r\n\r\n### 技术问题\r\n\r\n1. **React Hooks 原理**\r\n   - 详细解释了 useState 和 useEffect 的实现原理\r\n   - 讨论了 Hooks 的闭包陷阱问题及解决方案\r\n\r\n2. **TypeScript 高级特性**\r\n   - 泛型的使用场景和最佳实践\r\n   - 条件类型和映射类型的应用\r\n\r\n3. **微前端架构**\r\n   - single-spa 框架的使用经验\r\n   - 微前端应用间的通信方案\r\n\r\n### 项目经验\r\n\r\n面试官重点询问了我在微前端项目中的实践经验，包括：\r\n- 如何解决样式隔离问题\r\n- 公共依赖的管理策略\r\n- 部署和发布流程的设计\r\n\r\n### 算法题\r\n\r\n给出了一道中等难度的动态规划题目，要求在30分钟内完成。\r\n\r\n## 面试感受\r\n\r\n面试官非常专业，问题有深度但不刁钻。整个过程比较轻松，能感受到腾讯技术团队的实力。\r\n\r\n## 总结\r\n\r\n这次面试让我对腾讯的技术栈有了更深入的了解，也发现了自己在某些领域还需要继续学习。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取阿里巴巴前端开发工程师四面面经内容（Towxml渲染）
   */
  getTx003Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 🎯 面试流程\r\n\r\n### 1. 自我介绍（5分钟）\r\nHR让我重新介绍一下自己，包括教育背景、工作经历和个人特点。\r\n\r\n### 2. 职业规划（15分钟）\r\n- 为什么选择前端开发？\r\n- 未来3-5年的职业规划是什么？\r\n- 对阿里巴巴的了解和期望\r\n- 为什么想加入阿里巴巴？\r\n\r\n### 3. 团队合作（10分钟）\r\n- 描述一次团队合作的经历\r\n- 如何处理团队冲突？\r\n- 你认为什么样的团队氛围最好？\r\n\r\n### 4. 个人品质（10分钟）\r\n- 你的优点和缺点是什么？\r\n- 如何处理工作压力？\r\n- 遇到挫折时如何调整心态？\r\n\r\n### 5. 薪资期望（5分钟）\r\n- 目前的薪资水平\r\n- 对新工作的薪资期望\r\n- 除了薪资还关注什么？\r\n\r\n---\r\n\r\n## 💡 问题详解\r\n\r\n### Q: 为什么选择前端开发？\r\n**A:** 我对用户界面和用户体验很感兴趣，前端开发能让我直接看到自己的代码变成用户可以交互的界面，这种成就感很强。而且前端技术发展很快，能让我保持学习的热情。\r\n\r\n### Q: 未来3-5年的职业规划？\r\n**A:** 短期内希望能在技术深度上有更大提升，成为团队的技术骨干；中期希望能带领小团队，积累管理经验；长期希望能成为技术专家或者技术管理者，为公司的技术发展贡献力量。\r\n\r\n### Q: 对阿里巴巴的了解？\r\n**A:** 阿里巴巴是中国领先的互联网公司，在电商、云计算、数字支付等领域都有很强的实力。我特别欣赏阿里的技术文化和开源精神，比如Ant Design、ECharts等优秀的开源项目。\r\n\r\n### Q: 描述一次团队合作经历？\r\n**A:** 在之前的项目中，我们团队需要在紧急时间内完成一个大型功能。我主动承担了前端架构设计的工作，与后端同事密切配合，制定了详细的接口规范，最终按时完成了项目。这次经历让我学会了如何在压力下保持团队协作。\r\n\r\n### Q: 如何处理工作压力？\r\n**A:** 我会先分析压力的来源，然后制定具体的解决方案。如果是技术问题，我会主动学习和请教；如果是时间压力，我会合理安排优先级；同时我也会通过运动和阅读来缓解压力。\r\n\r\n---\r\n\r\n## 📝 面试总结\r\n\r\n### ✅ 表现良好的地方\r\n- 回答问题思路清晰，逻辑性强\r\n- 对职业规划有明确的想法\r\n- 展现了良好的团队合作精神\r\n- 对公司有一定的了解和认同\r\n\r\n### ⚠️ 需要注意的地方\r\n- 可以更多展示个人的独特性\r\n- 对行业趋势的了解可以更深入\r\n- 可以准备更多具体的案例\r\n\r\n### 🎯 HR反馈\r\n- 个人素质不错，符合公司文化\r\n- 职业规划清晰，有上进心\r\n- 团队合作能力强\r\n- 学习能力和适应能力都很好\r\n\r\n---\r\n\r\n## 💡 我的提问\r\n\r\n**我：** \"请问公司的培训体系是怎样的？\"\r\n**HR：** \"我们有完善的新人培训体系，包括技术培训、业务培训和文化培训，还有导师制度。\"\r\n\r\n**我：** \"团队的工作氛围如何？\"\r\n**HR：** \"我们倡导开放、协作的工作氛围，鼓励创新和学习，团队关系都很融洽。\"\r\n\r\n**我：** \"什么时候能知道最终结果？\"\r\n**HR：** \"我们会在一周内给出最终结果，请保持电话畅通。\"\r\n\r\n---\r\n\r\n## 🎉 最终结果\r\n\r\n**状态：** ✅ 通过  \r\n**通知时间：** 2025年9月23日  \r\n**入职时间：** 2025年1月8日  \r\n\r\n---\r\n\r\n*面试时间：2025年9月22日*  \r\n*整理时间：2025年9月22日*  \r\n*状态：已通过，准备入职*", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }

  /**
   * 获取阿里巴巴前端开发工程师二面面经内容（Towxml渲染）
   */
  getTx004Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 基本信息\r\n\r\n**职位：** 前端开发工程师  \r\n**轮次：** 二面  \r\n**日期：** 2025-12-20  \r\n**时长：** 60分钟  \r\n**形式：** 线上视频面试  \r\n**结果：** 通过  \r\n**标签：** JavaScript, Vue.js, React, 前端工程化, 性能优化  \r\n**难度：** 中等  \r\n\r\n## 面试过程\r\n\r\n### 自我介绍\r\n面试官让我先做一个简单的自我介绍，重点介绍一下前端相关的项目经验。\r\n\r\n### 技术问题\r\n\r\n#### 1. JavaScript基础\r\n- 请解释一下JavaScript的事件循环机制\r\n- Promise和async/await的区别是什么？\r\n- 什么是闭包？请举个例子\r\n\r\n#### 2. Vue.js相关\r\n- Vue的响应式原理是什么？\r\n- Vue3相比Vue2有哪些重要改进？\r\n- 组件间通信有哪些方式？\r\n\r\n#### 3. React相关\r\n- React的虚拟DOM是如何工作的？\r\n- useEffect和useLayoutEffect的区别\r\n- React Hooks的使用场景和注意事项\r\n\r\n#### 4. 前端工程化\r\n- Webpack的工作原理\r\n- 如何优化前端项目的构建速度？\r\n- 前端监控和错误收集的方案\r\n\r\n#### 5. 性能优化\r\n- 前端性能优化的常见手段\r\n- 如何减少首屏加载时间？\r\n- 懒加载的实现原理\r\n\r\n### 算法题\r\n给定一个数组，找出其中两个数的和等于目标值的所有组合。\r\n\r\n```javascript\r\nfunction twoSum(nums, target) {\r\n    const map = new Map();\r\n    const result = [];\r\n    \r\n    for (let i = 0; i < nums.length; i++) {\r\n        const complement = target - nums[i];\r\n        if (map.has(complement)) {\r\n            result.push([map.get(complement), i]);\r\n        }\r\n        map.set(nums[i], i);\r\n    }\r\n    \r\n    return result;\r\n}\r\n```\r\n\r\n### 项目经验\r\n面试官详细询问了我之前做过的一个电商项目：\r\n- 项目的技术栈选择理由\r\n- 遇到的技术难点和解决方案\r\n- 性能优化的具体措施\r\n- 团队协作和代码规范\r\n\r\n## 面试感受\r\n\r\n这次二面比一面更加深入，主要考察前端的深度和广度。面试官很专业，问题由浅入深，既有基础概念也有实际应用。算法题难度适中，主要考察思路和代码实现能力。\r\n\r\n## 建议\r\n\r\n1. **扎实基础**：JavaScript基础一定要牢固，事件循环、闭包、原型链等核心概念要理解透彻\r\n2. **框架深入**：不仅要会用Vue/React，还要理解其底层原理\r\n3. **工程化能力**：现代前端开发离不开工程化，要了解构建工具和优化方案\r\n4. **项目经验**：准备好详细的项目介绍，包括技术选型、难点解决、性能优化等\r\n5. **算法练习**：虽然前端算法要求不如后端高，但基础的数据结构和算法还是要掌握\r\n\r\n## 总结\r\n\r\n整体面试体验很好，面试官很友善，会根据回答情况进行深入提问。建议大家在面试前充分准备，特别是要对自己的项目经验有深入的思考和总结。", 'markdown', {
        base: '',
        theme: 'light',
        highlight: true,
        events: {
          tap: (e) => {
            console.log('towxml tap event:', e);
          }
        }
      });
    }
    return null;
  }
}

// 创建全局实例
const interviewLoader = new InterviewLoader();
interviewLoader.initializeData();

module.exports = { InterviewLoader, interviewLoader };
