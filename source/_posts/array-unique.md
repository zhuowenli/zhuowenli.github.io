---
title:  数组去重的几个方法
categories: frontend
tags: [javascript, unique, array]
date: 2015-03-13
id: 22
---

最近前端面试遇到的的一个问题：怎样去掉Javascript的Array的重复项，并且实现排序。这个问题看起来简单，但是其实暗藏杀机。 考的不仅仅是实现这个功能，更能看出你对JS代码的深入理解。

这几天想了一些方法，可以实现这个目的。

<!-- more -->

首先实现一个排序的方法：

```js
var seq = function(x, y){
    return x - y;
}
```

实现数组去重并排序：

```js
// 1.
Array.prototype.unique1 = function() {
    var n = [];
    for (var i = 0; i < this.length; i++) {
        // 判断有没有在数组里面，没有就填充进去
        if (n.indexOf(this[i]) == -1) {
            n.push(this[i]);
        };
    };
    return n.sort(seq); // 最后进行一次排序
};
```

```js
// 2.
Array.prototype.unique2 = function() {
    var n = {},
        r = [];
    for (var i = 0; i < this.length; i++) {
        // 使用哈希表，利用关键字的判断来去重
        // 如果哈希表中没有当前项
        if (!n[this[i]]) {
            n[this[i]] = true;
            r.push(this[i]);
        };
    };
    return r.sort(seq);
};
```

```js
// 3.
Array.prototype.unique3 = function() {
    var n = [this[0]];

    //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
    //那么表示第i项是重复的，忽略掉。否则存入结果数组
    for (var i = 1; i < this.length; i++) {
        if (this.indexOf(this[i]) == i) {
            n.push(this[i]);
        };
    };
    return n.sort(seq); // 最后进行一次排序
};
```

```js
// 4.
Array.prototype.unique4 = function() {
    this.sort(seq); // 先进行数组排序
    var n = [];
    for (var i = 0; i < this.length; i++) {
        // 如果当前项和上一项的值不一样时，则存入结果数组
        if (this[i] != this[i - 1]) {
            n.push(this[i]);
        };
    };
    return n;
};
```

```js
// 5.
Array.prototype.unique5 = function() {
    // 使用ES5的reduce方法。
    // 参考链接：http://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/#reduce
    return this.reduce(function(a, b){
        if (a.indexOf(b) < 0 ) {
            a.push(b);
        };
        return a;
    }, []);
};
```

其中1、3、5的方法都用到了数组`indexOf`方法。使用这个方法是为了寻找存入参数在数组中第一次出现的位置。显然，js引擎在调用这个方法的时候会挨个遍历数组直到找到目标为止，所以函数会花掉比较多的时间。

至于第2种的做法就是把已经出现过的字段，通过关键字的形式存入一个对象内，利用关键字索引要比`indexOf`遍历数组快得多。

第4种方法的思路是先把数组排序，然后比较相邻的两个值。这种方法也比第1种和第3种方法快了不少。
