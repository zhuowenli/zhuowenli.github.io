---
title: Javascript 模块模式
subtitle: javascript module pattern
categories: frontend
tags: [javascript]
date: 2014-11-06
---

## Javascript 模块模式

假设现在我们有一个小型的Js库，目的是用来增加一个数字：

```javascript
var jspy = {
 count: 0,

 incrementCount: function(){
  this.count++;
 },

 decrementCount: function(){
  this.count--;
 },

 getCount: function(){
  return this.count;
 }
};

```

但是，使用这个js库的人可以用 `jspy.count = 5` 的方法来改变这个值。并不是我们的最初目的。在其他的编程语言中你可以定义一个私有变量，但是Javascript并不能“真正”定义私有变量。然而，我们可以通过操作Javascript来实现，这就引出了一个最流行的Javascript设计模式，**模块模式**。

针对上面问题的解决方案如下：

```javascript
var jspy = (function(){
 var _count = 0;

 var incrementCount = function(){
  _count++;
 }

 var getCount = function(){
  return _count;
 }

 return {
  incrementCount : incrementCount,
  getCount : getCount
 };
})();

```

首先我们创造一个 `_count` 变量，下划线表明它是一个私有变量。再Javascript中下划线并没有什么实际的意义，但是它是一个用来标明私有变量的普遍用法。现在函数就可以操纵、返回变量了：
然而，你注意到了我吧整个库包含在了一个自调用匿名函数中。这是一个在执行过程中马上被执行的函数。这个函数运行，定义了函数和变量然后到了 `return {}` 的部分，它告诉函数将其返回给变量 `jspy` ，或者换句话说，暴露给用户。我们暴露两个函数而不是 `_count` 变量，这意味着我们可以做如下操作：

```javascript
jspy.incrementCount();
jspy.getCount();
```

但是当我们试图进行如下操作时：

```javascript
jspy._count; // undefined
```

它返回undefined。
对于上面的这种设计模式有许多不同的实现方法。有人喜欢在return 中定义函数：

```javascript
var jspy = (function(){
var_count = 0;

 return {
  incrementCount : function(){
   _count++;
  },
  getCount : function(){
return_count;
  }
 }
})();

```

受到上面例子的启发，CHristian Heilmann提出了Revealing Module Pattern。他的方法是将所有方法定义为私有变量，也就是说，不在return中定义，但是在那里暴露给用户，如下所示：

```javascript
var jspy = (function(){
 var _count = 0;
 var incrementCount = function(){
  _count++;
 }
 var resetCount = function(){
  _count = 0;
 }
 var getCount = function(){
  return _count;
 }
 return {
  add : incrementCount,
  reset : incrementCount,
  get : getCount
 };
})();
```

这种设计模式有两个好处：

- 首先，它使我们更容易的了解暴露的函数。当你不在 `return` 中定义函数时，我们能轻松的了解到每一行就是一个暴露的函数，这时我们阅读代码更加轻松。
- 其次，你可以用简短的名字（例如 `add` ）来暴露函数，但在定义的时候仍然可以使用冗余的定义方法（例如 `incrementCount` ）。

----

原文：《[The JavaScript Module Pattern](http://javascriptplayground.com/blog/2012/04/javascript-module-pattern/)》
译者：[卓文理](http://www.zhuowenli.com)
