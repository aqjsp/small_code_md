# 防抖测试面经

这是一个用于测试防抖机制的面经文件。

## 面试公司
阿里巴巴

## 面试岗位
前端开发工程师

## 面试内容
测试防抖功能是否正常工作。

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

## 总结
防抖机制可以有效避免重复执行。

## 更新测试
这是一个额外的更新，用于测试防抖机制。