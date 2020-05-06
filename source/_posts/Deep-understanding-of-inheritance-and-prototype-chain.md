---
title: 深入理解继承与原型链
categories: frontend
tags: [inheritance, prototype chain, javascript]
date: 2014-08-26
id: 38
---

对于那些熟悉基于类的面向对象语言（java或c++）的开发者来说，javascript的语法是比较怪异的。由于javascript是一门动态语言，而且它没有类的概念（虽然 `class` 是个保留字，不能作为变量名来使用）。

继承方面，javascript中每个对象都有一个内部私有链接指向另一个对象，这个对象就是原对象的**原型**，这个原型也有自己的原型，知道对象的原型为 `null` 为止（也就是没有原型）。这种一级一级的链结构就称为**原型链**。

虽然这会被称为javascript的弱点之一，实际上这种原型继承的模式要比经典的继承模型还要强大。虽然在原型模型上构建一个经典模型是相当繁琐的，但是采用其他方式实现则会更加困难。

<!-- more -->

## 基于原型链的继承

### 继承属性

javascript对象有两种不同的属性，一种是对象自身的属性，另外一种是继承于原型链上的属性。下面代码演示了当访问一个对象时发生的行为。

```javascript
// 假定我们有个对象o，并且o所在的原型链如下：
// {a:1,b:2} ---> {b:3,c:4} ---> null
// 'a'和'b'是o自身的属性

// 该例中，用"对象.[[Prototype]]"来表示对象的原型
// 这只是一个纯粹的符号（ECMAScript标准中也是这样使用），不能在实际代码中使用

console.log(o.a); // 1
// a是o的自身属性吗？是的，该属性值为1

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性值为2

console.log(o.c); // 4
// c是o的自身属性吗？不是，那看看o.[[Prototype]]有没有？
// c是o.[[Prototype]]的自身属性吗？是的，该属性值为4

console.log(o.d); // undefined
// d是o的自身属性吗？不是，那看看o.[[Prototype]]上有没有？
// d是o.[[Prototype]]的自身属性吗？不是，那看看o.[[Prototype]].[[Prototype]]上有没有？
// o.[[Prototype]].[[Prototype]]为null，原型链已到顶端，没有d属性，返回undefined
```

### 继承方法

javascript并没有真正的“方法”，javascript中只有函数，而且任何函数都可以添加到对象上作为对象的属性。继承的函数与其他的属性是基本没有差别的，包括“属性遮蔽”（这种情况相当于其他语言的重写）。

当继承的函数被调用时， `this` 指向的继承的对象，而不是函数被声明的原型对象。

```javascript
var o = {
 a: 2,
 m: function(b){
  return this.a + 1;
 }
};

console.log(o.m()); // 3
// 当调用 o.m 时，'this'指向了o

var p = Object.create(o);
// p是一个对象，p.[[Prototype]]是o

p.a = 12; // 创建p的自身属性是a
console.log(p.m()); // 13
//调用p.m()时，'this'指向 p ，'this.a'是12
```

## 使用不同的方法来创建对象和生成原型链

### 使用普通语法创建对象

```javascript
var o = {a: 1};

// o这个对象继承了Object.prototype上面的所有属性
// 所以可以这样使用 o.hasOwnProperty('a')
// hasOwnProperty是Object.prototype的自身属性
// Object.prototype的原型是null，如下：
// o ---> Object.prototype ---> null

var a = ["yo","whadup","?"];

// 数组都继承于Array.prototype（indexOf，fprEach，等方法都是从它继承而来）
// 原型链如下：
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
 return 2;
}

// 函数都继承于Function.prototype（call，bind，等方法都是从它继承而来）
// 原型链如下：
// f ---> Function.prototype ---> Object.prototype ---> null
```

### 使用构造方法创建对象

在javascript中，构造方法其实就是一个普通函数，当使用 `new` 操作符来使用这个函数时，他就可以成为构造方法（构造函数）。

```javascript
function Graph() {
 this.vertexes = [];
 this.edges    = [];
}

Graph.prototype = {
 addVertex : function(v){
  this.vertexts.push(v);
 }
};

var g = new Graph();
// g是生成的对象，他的自身属性有'vertexes'和'edges'
// 在g被实例化时，g.[[Prototype]]指向了Graph.prototype
```

### 使用Object.create创建对象

ECMAScript 5中引入了一个新方法： `Object.create` ，可以调用这个方法来创建一个新对象，新对象的原型就是调用create方法时传入的第一个参数：

```javascript
var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null

var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

var d = Object.create(null);
// d ---> null
console.log(d.hasOwnProperty); // undefined , 因为d没有继承Object.prototype
```

## 性能

在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外试图访问不存在的属性时会遍历整个原型链。
遍历对象的属性时，原型链上的每个属性都是可枚举的。
检测对象的属性是定义在自身上还是原型链上，有必要使用 `hasOwnProperty` 方法，该方法所有对象继承自 `Object.prototype` 。
 `hasOwnProperty` 是javascript中唯一一个只涉及自身属性而不会遍历原型链的方法。

> 注意：仅仅通过判断值是否为 `undefined` 还不足以检测一个属性是否存在，一个属性可能恰好存在而其值为 `undefined` 。

## 不好的实践：扩展原生对象的原型

一个经常使用的不好实践是扩展 `Object.prototype` 或者其他内置对象的原型。
该技术被称为 `monkey patchind` ，他破坏了对象的封装性。虽然一些流行的框架（如Prototype.js）在使用该技术，但是该技术依然不是最好的实践，附加的非标准方法使得内置的类型混乱。
扩展内置对象原型的唯一正当理由是移植较新的javascript引擎的特性，如 `Arrey.forEach` 。

## 结论

在编写使用到原型继承模型的复杂代码前理解原型继承模型十分重要。同时，还要清楚代码中原型链的长度，并在必要时结束原型链，以避免可能存在的性能问题。更进一步，除非为了兼容新的javascript特性，否则永远不要扩展原生对象的原型。
