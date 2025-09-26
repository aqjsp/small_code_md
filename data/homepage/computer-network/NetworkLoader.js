/**
 * 计算机网络数据加载器
 * 自动生成，请勿手动修改
 */
class ComputerNetworkLoader {
  constructor() {
    this.articles = new Map();
    this.modules = new Map();
    this.initializeData();
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
    // 注册基础语法模块
    this.registerModule({
      id: "basic",
      name: "基础语法",
      description: "基础语法相关知识点",
      articleCount: 1,
      difficulty: "medium"
    });

    // 注册文章数据
    const articles = [
    {
      id: "network_001",
      title: "计算机网络基础概念",
      filename: "network_001.md",
      module: "basic",
      difficulty: "medium",
      estimatedTime: "10分钟",
      tags: ["computer-network","基础教程"],
      publishDate: "2025-09-26",
      order: 1,
      content: this.getNetwork001Content
    }
    ];

    articles.forEach(article => {
      this.registerArticle(article.module, article);
    });
  }

  /**
   * 注册模块
   */
  registerModule(module) {
    this.modules.set(module.id, module);
  }

  /**
   * 注册文章
   */
  registerArticle(moduleId, article) {
    if (!this.articles.has(moduleId)) {
      this.articles.set(moduleId, []);
    }
    this.articles.get(moduleId).push(article);
  }

  /**
   * 获取所有文章
   */
  getAllArticles() {
    const allArticles = [];
    for (const articles of this.articles.values()) {
      allArticles.push(...articles);
    }
    return allArticles.sort((a, b) => (a.order || 999) - (b.order || 999));
  }

  /**
   * 根据模块获取文章
   */
  getArticlesByModule(moduleId) {
    return this.articles.get(moduleId) || [];
  }

  /**
   * 根据ID获取文章
   */
  getArticleById(articleId) {
    for (const articles of this.articles.values()) {
      const article = articles.find(a => a.id === articleId);
      if (article) {
        return article;
      }
    }
    return null;
  }

  /**
   * 获取所有模块
   */
  getAllModules() {
    return Array.from(this.modules.values());
  }

  /**
   * 获取模块名称
   */
  getModuleName(moduleId) {
    const module = this.modules.get(moduleId);
    return module ? module.name : moduleId;
  }

  /**
   * 加载统计数据
   */
  loadStats() {
    return {
      totalArticles: this.getAllArticles().length,
      totalModules: this.modules.size,
      articlesByDifficulty: this.getArticlesByDifficulty(),
      recentArticles: this.getRecentArticles(5)
    };
  }

  /**
   * 按难度分组文章
   */
  getArticlesByDifficulty() {
    const articles = this.getAllArticles();
    return {
      easy: articles.filter(a => a.difficulty === 'easy').length,
      medium: articles.filter(a => a.difficulty === 'medium').length,
      hard: articles.filter(a => a.difficulty === 'hard').length
    };
  }

  /**
   * 获取最近文章
   */
  getRecentArticles(limit = 5) {
    return this.getAllArticles()
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, limit);
  }

  /**
   * 获取文章内容（Towxml渲染）
   */
  getArticleContent(articleId) {
    const methodName = 'get' + this.toCamelCase(articleId) + 'Content';
    if (typeof this[methodName] === 'function') {
      return this[methodName]();
    }
    return null;
  }

  /**
   * 搜索文章
   */
  searchArticles(keyword) {
    if (!keyword || keyword.trim() === '') {
      return this.getAllArticles();
    }
    
    const searchTerm = keyword.toLowerCase().trim();
    return this.getAllArticles().filter(article => {
      return article.title.toLowerCase().includes(searchTerm);
    });
  }

  /**
   * 获取文章浏览量（占位符方法）
   */
  getArticleViews(articleId) {
    // 这里可以实现真实的浏览量获取逻辑
    // 目前返回随机数作为示例
    return Math.floor(Math.random() * 1000) + 100;
  }

  /**
   * 获取上一篇和下一篇文章
   */
  getPrevNextArticles(articleId) {
    const allArticles = this.getAllArticles();
    const currentIndex = allArticles.findIndex(article => article.id === articleId);
    
    if (currentIndex === -1) {
      return { prevArticle: null, nextArticle: null };
    }
    
    const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
    const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
    
    return { prevArticle, nextArticle };
  }

  /**
   * 转换为驼峰命名（内部使用）
   */
  toCamelCase(str) {
    return str.replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
              .replace(/^[a-z]/, chr => chr.toUpperCase());
  }

  /**
   * 获取计算机网络基础概念内容（Towxml渲染）
   */
  getNetwork001Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 学习目标\r\n\r\n通过本文章的学习，你将掌握：\r\n\r\n- 计算机网络的基本概念\r\n- OSI七层模型的结构和功能\r\n- TCP/IP协议栈的组成\r\n- 网络通信的基本原理\r\n\r\n## 什么是计算机网络\r\n\r\n计算机网络是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统、网络管理软件及网络通信协议的管理和协调下，实现资源共享和信息传递的计算机系统。\r\n\r\n### 网络的基本功能\r\n\r\n1. **资源共享**：硬件资源、软件资源、数据资源的共享\r\n2. **数据通信**：不同计算机之间的信息传递\r\n3. **分布式处理**：将复杂任务分配给网络中的多台计算机处理\r\n4. **负载均衡**：合理分配网络资源，提高系统效率\r\n\r\n## OSI七层模型\r\n\r\nOSI（Open System Interconnection）开放系统互连参考模型是国际标准化组织制定的网络通信标准。\r\n\r\n### 七层结构\r\n\r\n1. **物理层（Physical Layer）**\r\n   - 功能：传输比特流\r\n   - 设备：集线器、中继器\r\n   - 协议：RS-232、RJ-45\r\n\r\n2. **数据链路层（Data Link Layer）**\r\n   - 功能：帧的传输、错误检测和纠正\r\n   - 设备：交换机、网桥\r\n   - 协议：Ethernet、PPP\r\n\r\n3. **网络层（Network Layer）**\r\n   - 功能：路径选择、逻辑地址\r\n   - 设备：路由器\r\n   - 协议：IP、ICMP、ARP\r\n\r\n4. **传输层（Transport Layer）**\r\n   - 功能：端到端的可靠传输\r\n   - 协议：TCP、UDP\r\n\r\n5. **会话层（Session Layer）**\r\n   - 功能：建立、管理和终止会话\r\n   - 协议：NetBIOS、RPC\r\n\r\n6. **表示层（Presentation Layer）**\r\n   - 功能：数据格式转换、加密解密\r\n   - 协议：SSL、JPEG、MPEG\r\n\r\n7. **应用层（Application Layer）**\r\n   - 功能：为应用程序提供网络服务\r\n   - 协议：HTTP、FTP、SMTP、DNS\r\n\r\n## TCP/IP协议栈\r\n\r\nTCP/IP是互联网的核心协议栈，采用四层模型：\r\n\r\n### 四层结构\r\n\r\n1. **网络接口层**\r\n   - 对应OSI的物理层和数据链路层\r\n   - 处理与物理网络的连接\r\n\r\n2. **网络层（互联网层）**\r\n   - 对应OSI的网络层\r\n   - 主要协议：IP、ICMP、ARP\r\n\r\n3. **传输层**\r\n   - 对应OSI的传输层\r\n   - 主要协议：TCP、UDP\r\n\r\n4. **应用层**\r\n   - 对应OSI的会话层、表示层、应用层\r\n   - 主要协议：HTTP、FTP、SMTP、DNS\r\n\r\n## 网络通信基本原理\r\n\r\n### 数据封装过程\r\n\r\n1. **应用层**：生成应用数据\r\n2. **传输层**：添加TCP/UDP头部，形成段（Segment）\r\n3. **网络层**：添加IP头部，形成包（Packet）\r\n4. **数据链路层**：添加帧头和帧尾，形成帧（Frame）\r\n5. **物理层**：转换为比特流传输\r\n\r\n### 数据解封装过程\r\n\r\n接收端按相反顺序进行解封装，最终得到原始应用数据。\r\n\r\n## 实践练习\r\n\r\n### 练习1：协议分析\r\n\r\n使用Wireshark等网络分析工具，捕获并分析HTTP请求的数据包结构。\r\n\r\n### 练习2：网络配置\r\n\r\n配置本地网络环境，理解IP地址、子网掩码、网关的作用。\r\n\r\n## 总结\r\n\r\n计算机网络是现代信息技术的基础，理解网络的基本概念和协议栈结构对于网络编程和系统管理至关重要。OSI模型提供了理论框架，而TCP/IP协议栈是实际应用的标准。\r\n\r\n## 下一步学习\r\n\r\n- 深入学习TCP/IP协议的具体实现\r\n- 了解网络安全基础知识\r\n- 学习网络编程技术", 'markdown', {
        base: '',
        theme: 'light',
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

module.exports = ComputerNetworkLoader;
