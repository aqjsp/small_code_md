/**
 * Redis缓存数据加载器
 * 自动生成，请勿手动修改
 */
class RedisLoader {
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


    // 注册文章数据
    const articles = [

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


}

module.exports = RedisLoader;
