/**
 * C++数据加载器
 * 自动生成，请勿手动修改
 */
class CppLoader {
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
      articleCount: 2,
      difficulty: "medium"
    });

    // 注册文章数据
    const articles = [
    {
      id: "cpp_001",
      title: "C++基础语法入门",
      filename: "cpp_001.md",
      module: "basic",
      difficulty: "medium",
      estimatedTime: "10分钟",
      tags: ["cpp","基础教程"],
      publishDate: "2025-09-26",
      order: 1,
      content: this.getCpp001Content
    },
    {
      id: "cpp_002",
      title: "C++基础语法入门",
      filename: "cpp_002.md",
      module: "basic",
      difficulty: "medium",
      estimatedTime: "10分钟",
      tags: ["cpp","基础教程"],
      publishDate: "2025-09-26",
      order: 2,
      content: this.getCpp002Content
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
   * 获取C++基础语法入门内容（Towxml渲染）
   */
  getCpp001Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 学习目标\r\n\r\n通过本文章的学习，你将掌握：\r\n\r\n- C++语言的基本特性\r\n- C++的数据类型和变量声明\r\n- 基本的输入输出操作\r\n- 控制结构的使用\r\n- 函数的定义和调用\r\n\r\n## C++语言简介\r\n\r\nC++是由Bjarne Stroustrup在贝尔实验室开发的一种通用编程语言。它是C语言的扩展，支持面向对象编程、泛型编程和过程化编程。\r\n\r\n### C++的特点\r\n\r\n1. **面向对象**：支持类、对象、继承、多态等特性\r\n2. **高效性**：接近底层，执行效率高\r\n3. **可移植性**：跨平台支持\r\n4. **丰富的库**：标准库功能强大\r\n5. **向下兼容**：兼容大部分C语言代码\r\n\r\n## 基本语法结构\r\n\r\n### Hello World程序\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    cout << \"Hello, World!\" << endl;\r\n    return 0;\r\n}\r\n```\r\n\r\n### 程序结构解析\r\n\r\n1. `#include <iostream>`：包含输入输出流库\r\n2. `using namespace std`：使用标准命名空间\r\n3. `int main()`：主函数，程序入口点\r\n4. `cout`：标准输出流对象\r\n5. `endl`：换行并刷新缓冲区\r\n\r\n## 数据类型\r\n\r\n### 基本数据类型\r\n\r\n```cpp\r\n// 整型\r\nint age = 25;\r\nshort year = 2025;\r\nlong population = 1400000000L;\r\nlong long bigNumber = 9223372036854775807LL;\r\n\r\n// 浮点型\r\nfloat price = 19.99f;\r\ndouble pi = 3.14159265359;\r\nlong double precision = 3.141592653589793238L;\r\n\r\n// 字符型\r\nchar grade = 'A';\r\nwchar_t unicode = L'中';\r\n\r\n// 布尔型\r\nbool isStudent = true;\r\nbool isWorking = false;\r\n```\r\n\r\n### 类型修饰符\r\n\r\n```cpp\r\n// 有符号和无符号\r\nsigned int temperature = -10;\r\nunsigned int count = 100;\r\n\r\n// 常量\r\nconst int MAX_SIZE = 1000;\r\nconst double PI = 3.14159;\r\n```\r\n\r\n## 变量和常量\r\n\r\n### 变量声明和初始化\r\n\r\n```cpp\r\n// 声明后赋值\r\nint number;\r\nnumber = 42;\r\n\r\n// 声明时初始化\r\nint score = 95;\r\ndouble average = 87.5;\r\n\r\n// 多变量声明\r\nint x = 1, y = 2, z = 3;\r\n\r\n// C++11统一初始化\r\nint value{100};\r\ndouble rate{0.05};\r\n```\r\n\r\n### 常量定义\r\n\r\n```cpp\r\n// const关键字\r\nconst int DAYS_IN_WEEK = 7;\r\n\r\n// #define预处理器\r\n#define PI 3.14159\r\n\r\n// constexpr（C++11）\r\nconstexpr int BUFFER_SIZE = 1024;\r\n```\r\n\r\n## 输入输出操作\r\n\r\n### 基本输出\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    int age = 20;\r\n    string name = \"Alice\";\r\n    \r\n    cout << \"姓名：\" << name << endl;\r\n    cout << \"年龄：\" << age << \"岁\" << endl;\r\n    \r\n    return 0;\r\n}\r\n```\r\n\r\n### 基本输入\r\n\r\n```cpp\r\n#include <iostream>\r\n#include <string>\r\nusing namespace std;\r\n\r\nint main() {\r\n    string name;\r\n    int age;\r\n    \r\n    cout << \"请输入姓名：\";\r\n    cin >> name;\r\n    \r\n    cout << \"请输入年龄：\";\r\n    cin >> age;\r\n    \r\n    cout << \"你好，\" << name << \"！你今年\" << age << \"岁。\" << endl;\r\n    \r\n    return 0;\r\n}\r\n```\r\n\r\n## 控制结构\r\n\r\n### 条件语句\r\n\r\n```cpp\r\n// if-else语句\r\nint score = 85;\r\n\r\nif (score >= 90) {\r\n    cout << \"优秀\" << endl;\r\n} else if (score >= 80) {\r\n    cout << \"良好\" << endl;\r\n} else if (score >= 70) {\r\n    cout << \"中等\" << endl;\r\n} else if (score >= 60) {\r\n    cout << \"及格\" << endl;\r\n} else {\r\n    cout << \"不及格\" << endl;\r\n}\r\n\r\n// switch语句\r\nchar grade = 'B';\r\n\r\nswitch (grade) {\r\n    case 'A':\r\n        cout << \"优秀\" << endl;\r\n        break;\r\n    case 'B':\r\n        cout << \"良好\" << endl;\r\n        break;\r\n    case 'C':\r\n        cout << \"中等\" << endl;\r\n        break;\r\n    default:\r\n        cout << \"其他\" << endl;\r\n        break;\r\n}\r\n```\r\n\r\n### 循环语句\r\n\r\n```cpp\r\n// for循环\r\nfor (int i = 1; i <= 10; i++) {\r\n    cout << i << \" \";\r\n}\r\ncout << endl;\r\n\r\n// while循环\r\nint count = 1;\r\nwhile (count <= 5) {\r\n    cout << \"第\" << count << \"次\" << endl;\r\n    count++;\r\n}\r\n\r\n// do-while循环\r\nint num;\r\ndo {\r\n    cout << \"请输入一个正数：\";\r\n    cin >> num;\r\n} while (num <= 0);\r\n```\r\n\r\n## 函数\r\n\r\n### 函数定义和调用\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\n// 函数声明\r\nint add(int a, int b);\r\nvoid printMessage(string message);\r\ndouble calculateArea(double radius);\r\n\r\nint main() {\r\n    int result = add(5, 3);\r\n    cout << \"5 + 3 = \" << result << endl;\r\n    \r\n    printMessage(\"Hello, C++!\");\r\n    \r\n    double area = calculateArea(5.0);\r\n    cout << \"半径为5的圆的面积：\" << area << endl;\r\n    \r\n    return 0;\r\n}\r\n\r\n// 函数定义\r\nint add(int a, int b) {\r\n    return a + b;\r\n}\r\n\r\nvoid printMessage(string message) {\r\n    cout << message << endl;\r\n}\r\n\r\ndouble calculateArea(double radius) {\r\n    const double PI = 3.14159;\r\n    return PI * radius * radius;\r\n}\r\n```\r\n\r\n### 函数重载\r\n\r\n```cpp\r\n// 同名函数，不同参数\r\nint max(int a, int b) {\r\n    return (a > b) ? a : b;\r\n}\r\n\r\ndouble max(double a, double b) {\r\n    return (a > b) ? a : b;\r\n}\r\n\r\nint max(int a, int b, int c) {\r\n    return max(max(a, b), c);\r\n}\r\n```\r\n\r\n## 实践练习\r\n\r\n### 练习1：计算器程序\r\n\r\n编写一个简单的计算器，支持加减乘除运算。\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    double num1, num2;\r\n    char operation;\r\n    \r\n    cout << \"请输入第一个数字：\";\r\n    cin >> num1;\r\n    \r\n    cout << \"请输入运算符（+、-、*、/）：\";\r\n    cin >> operation;\r\n    \r\n    cout << \"请输入第二个数字：\";\r\n    cin >> num2;\r\n    \r\n    double result;\r\n    switch (operation) {\r\n        case '+':\r\n            result = num1 + num2;\r\n            break;\r\n        case '-':\r\n            result = num1 - num2;\r\n            break;\r\n        case '*':\r\n            result = num1 * num2;\r\n            break;\r\n        case '/':\r\n            if (num2 != 0) {\r\n                result = num1 / num2;\r\n            } else {\r\n                cout << \"错误：除数不能为零！\" << endl;\r\n                return 1;\r\n            }\r\n            break;\r\n        default:\r\n            cout << \"错误：无效的运算符！\" << endl;\r\n            return 1;\r\n    }\r\n    \r\n    cout << num1 << \" \" << operation << \" \" << num2 << \" = \" << result << endl;\r\n    \r\n    return 0;\r\n}\r\n```\r\n\r\n### 练习2：数字猜测游戏\r\n\r\n编写一个数字猜测游戏，让用户猜测1-100之间的随机数。\r\n\r\n## 总结\r\n\r\nC++是一门功能强大的编程语言，本文介绍了C++的基础语法，包括数据类型、变量、输入输出、控制结构和函数。掌握这些基础知识是学习C++高级特性的前提。\r\n\r\n## 下一步学习\r\n\r\n- 学习C++面向对象编程\r\n- 了解C++内存管理\r\n- 掌握C++标准库的使用\r\n- 学习C++11/14/17/20新特性", 'markdown', {
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

  /**
   * 获取C++基础语法入门内容（Towxml渲染）
   */
  getCpp002Content() {
    const app = getApp();
    if (app && app.towxml) {
      return app.towxml("\r\n## 学习目标\r\n\r\n通过本文章的学习，你将掌握：\r\n\r\n- C++语言的基本特性\r\n- C++的数据类型和变量声明\r\n- 基本的输入输出操作\r\n- 控制结构的使用\r\n- 函数的定义和调用\r\n\r\n## C++语言简介\r\n\r\nC++是由Bjarne Stroustrup在贝尔实验室开发的一种通用编程语言。它是C语言的扩展，支持面向对象编程、泛型编程和过程化编程。\r\n\r\n### C++的特点\r\n\r\n1. **面向对象**：支持类、对象、继承、多态等特性\r\n2. **高效性**：接近底层，执行效率高\r\n3. **可移植性**：跨平台支持\r\n4. **丰富的库**：标准库功能强大\r\n5. **向下兼容**：兼容大部分C语言代码\r\n\r\n## 基本语法结构\r\n\r\n### Hello World程序\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    cout << \"Hello, World!\" << endl;\r\n    return 0;\r\n}\r\n```\r\n\r\n### 程序结构解析\r\n\r\n1. `#include <iostream>`：包含输入输出流库\r\n2. `using namespace std`：使用标准命名空间\r\n3. `int main()`：主函数，程序入口点\r\n4. `cout`：标准输出流对象\r\n5. `endl`：换行并刷新缓冲区\r\n\r\n## 数据类型\r\n\r\n### 基本数据类型\r\n\r\n```cpp\r\n// 整型\r\nint age = 25;\r\nshort year = 2025;\r\nlong population = 1400000000L;\r\nlong long bigNumber = 9223372036854775807LL;\r\n\r\n// 浮点型\r\nfloat price = 19.99f;\r\ndouble pi = 3.14159265359;\r\nlong double precision = 3.141592653589793238L;\r\n\r\n// 字符型\r\nchar grade = 'A';\r\nwchar_t unicode = L'中';\r\n\r\n// 布尔型\r\nbool isStudent = true;\r\nbool isWorking = false;\r\n```\r\n\r\n### 类型修饰符\r\n\r\n```cpp\r\n// 有符号和无符号\r\nsigned int temperature = -10;\r\nunsigned int count = 100;\r\n\r\n// 常量\r\nconst int MAX_SIZE = 1000;\r\nconst double PI = 3.14159;\r\n```\r\n\r\n## 变量和常量\r\n\r\n### 变量声明和初始化\r\n\r\n```cpp\r\n// 声明后赋值\r\nint number;\r\nnumber = 42;\r\n\r\n// 声明时初始化\r\nint score = 95;\r\ndouble average = 87.5;\r\n\r\n// 多变量声明\r\nint x = 1, y = 2, z = 3;\r\n\r\n// C++11统一初始化\r\nint value{100};\r\ndouble rate{0.05};\r\n```\r\n\r\n### 常量定义\r\n\r\n```cpp\r\n// const关键字\r\nconst int DAYS_IN_WEEK = 7;\r\n\r\n// #define预处理器\r\n#define PI 3.14159\r\n\r\n// constexpr（C++11）\r\nconstexpr int BUFFER_SIZE = 1024;\r\n```\r\n\r\n## 输入输出操作\r\n\r\n### 基本输出\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    int age = 20;\r\n    string name = \"Alice\";\r\n    \r\n    cout << \"姓名：\" << name << endl;\r\n    cout << \"年龄：\" << age << \"岁\" << endl;\r\n    \r\n    return 0;\r\n}\r\n```\r\n\r\n### 基本输入\r\n\r\n```cpp\r\n#include <iostream>\r\n#include <string>\r\nusing namespace std;\r\n\r\nint main() {\r\n    string name;\r\n    int age;\r\n    \r\n    cout << \"请输入姓名：\";\r\n    cin >> name;\r\n    \r\n    cout << \"请输入年龄：\";\r\n    cin >> age;\r\n    \r\n    cout << \"你好，\" << name << \"！你今年\" << age << \"岁。\" << endl;\r\n    \r\n    return 0;\r\n}\r\n```\r\n\r\n## 控制结构\r\n\r\n### 条件语句\r\n\r\n```cpp\r\n// if-else语句\r\nint score = 85;\r\n\r\nif (score >= 90) {\r\n    cout << \"优秀\" << endl;\r\n} else if (score >= 80) {\r\n    cout << \"良好\" << endl;\r\n} else if (score >= 70) {\r\n    cout << \"中等\" << endl;\r\n} else if (score >= 60) {\r\n    cout << \"及格\" << endl;\r\n} else {\r\n    cout << \"不及格\" << endl;\r\n}\r\n\r\n// switch语句\r\nchar grade = 'B';\r\n\r\nswitch (grade) {\r\n    case 'A':\r\n        cout << \"优秀\" << endl;\r\n        break;\r\n    case 'B':\r\n        cout << \"良好\" << endl;\r\n        break;\r\n    case 'C':\r\n        cout << \"中等\" << endl;\r\n        break;\r\n    default:\r\n        cout << \"其他\" << endl;\r\n        break;\r\n}\r\n```\r\n\r\n### 循环语句\r\n\r\n```cpp\r\n// for循环\r\nfor (int i = 1; i <= 10; i++) {\r\n    cout << i << \" \";\r\n}\r\ncout << endl;\r\n\r\n// while循环\r\nint count = 1;\r\nwhile (count <= 5) {\r\n    cout << \"第\" << count << \"次\" << endl;\r\n    count++;\r\n}\r\n\r\n// do-while循环\r\nint num;\r\ndo {\r\n    cout << \"请输入一个正数：\";\r\n    cin >> num;\r\n} while (num <= 0);\r\n```\r\n\r\n## 函数\r\n\r\n### 函数定义和调用\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\n// 函数声明\r\nint add(int a, int b);\r\nvoid printMessage(string message);\r\ndouble calculateArea(double radius);\r\n\r\nint main() {\r\n    int result = add(5, 3);\r\n    cout << \"5 + 3 = \" << result << endl;\r\n    \r\n    printMessage(\"Hello, C++!\");\r\n    \r\n    double area = calculateArea(5.0);\r\n    cout << \"半径为5的圆的面积：\" << area << endl;\r\n    \r\n    return 0;\r\n}\r\n\r\n// 函数定义\r\nint add(int a, int b) {\r\n    return a + b;\r\n}\r\n\r\nvoid printMessage(string message) {\r\n    cout << message << endl;\r\n}\r\n\r\ndouble calculateArea(double radius) {\r\n    const double PI = 3.14159;\r\n    return PI * radius * radius;\r\n}\r\n```\r\n\r\n### 函数重载\r\n\r\n```cpp\r\n// 同名函数，不同参数\r\nint max(int a, int b) {\r\n    return (a > b) ? a : b;\r\n}\r\n\r\ndouble max(double a, double b) {\r\n    return (a > b) ? a : b;\r\n}\r\n\r\nint max(int a, int b, int c) {\r\n    return max(max(a, b), c);\r\n}\r\n```\r\n\r\n## 实践练习\r\n\r\n### 练习1：计算器程序\r\n\r\n编写一个简单的计算器，支持加减乘除运算。\r\n\r\n```cpp\r\n#include <iostream>\r\nusing namespace std;\r\n\r\nint main() {\r\n    double num1, num2;\r\n    char operation;\r\n    \r\n    cout << \"请输入第一个数字：\";\r\n    cin >> num1;\r\n    \r\n    cout << \"请输入运算符（+、-、*、/）：\";\r\n    cin >> operation;\r\n    \r\n    cout << \"请输入第二个数字：\";\r\n    cin >> num2;\r\n    \r\n    double result;\r\n    switch (operation) {\r\n        case '+':\r\n            result = num1 + num2;\r\n            break;\r\n        case '-':\r\n            result = num1 - num2;\r\n            break;\r\n        case '*':\r\n            result = num1 * num2;\r\n            break;\r\n        case '/':\r\n            if (num2 != 0) {\r\n                result = num1 / num2;\r\n            } else {\r\n                cout << \"错误：除数不能为零！\" << endl;\r\n                return 1;\r\n            }\r\n            break;\r\n        default:\r\n            cout << \"错误：无效的运算符！\" << endl;\r\n            return 1;\r\n    }\r\n    \r\n    cout << num1 << \" \" << operation << \" \" << num2 << \" = \" << result << endl;\r\n    \r\n    return 0;\r\n}\r\n```\r\n\r\n### 练习2：数字猜测游戏\r\n\r\n编写一个数字猜测游戏，让用户猜测1-100之间的随机数。\r\n\r\n## 总结\r\n\r\nC++是一门功能强大的编程语言，本文介绍了C++的基础语法，包括数据类型、变量、输入输出、控制结构和函数。掌握这些基础知识是学习C++高级特性的前提。\r\n\r\n## 下一步学习\r\n\r\n- 学习C++面向对象编程\r\n- 了解C++内存管理\r\n- 掌握C++标准库的使用\r\n- 学习C++11/14/17/20新特性", 'markdown', {
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

module.exports = CppLoader;
