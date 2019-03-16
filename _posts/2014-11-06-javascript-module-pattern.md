---
layout: post
title: Javascript 模块模式
subline: javascript module pattern
categories: frontend
tags: [javascript]
img: 14
---

<h2>Javascript 模块模式</h2>


<p>假设现在我们有一个小型的Js库，目的是用来增加一个数字：</p>
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
<p>但是，使用这个js库的人可以用<code>jspy.count = 5</code>的方法来改变这个值。并不是我们的最初目的。在其他的编程语言中你可以定义一个私有变量，但是Javascript并不能“真正”定义私有变量。然而，我们可以通过操作Javascript来实现，这就引出了一个最流行的Javascript设计模式，<strong>模块模式</strong>。</p>
<p>针对上面问题的解决方案如下：</p>
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
<p>首先我们创造一个<code>_count</code>变量，下划线表明它是一个私有变量。再Javascript中下划线并没有什么实际的意义，但是它是一个用来标明私有变量的普遍用法。现在函数就可以操纵、返回变量了：</p>
<p>然而，你注意到了我吧整个库包含在了一个自调用匿名函数中。这是一个在执行过程中马上被执行的函数。这个函数运行，定义了函数和变量然后到了<code>return {}</code>的部分，它告诉函数将其返回给变量<code>jspy</code>，或者换句话说，暴露给用户。我们暴露两个函数而不是<code>_count</code>变量，这意味着我们可以做如下操作：</p>
```javascript
jspy.incrementCount();
jspy.getCount();
```
<p>但是当我们试图进行如下操作时：</p>
```javascript
jspy._count; // undefined
```
<p>它返回undefined。</p>
<p>对于上面的这种设计模式有许多不同的实现方法。有人喜欢在return 中定义函数：</p>
```javascript
var jspy = (function(){
	var _count = 0;

	return {
		incrementCount : function(){
			_count++;
		},
		getCount : function(){
			return _count;
		}
	}
})();
```
<p>受到上面例子的启发，CHristian Heilmann提出了Revealing Module Pattern。他的方法是将所有方法定义为私有变量，也就是说，不在return中定义，但是在那里暴露给用户，如下所示：</p>
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
<p>这种设计模式有两个好处：</p>
<ul>
	<li>首先，它使我们更容易的了解暴露的函数。当你不在<code>return</code>中定义函数时，我们能轻松的了解到每一行就是一个暴露的函数，这时我们阅读代码更加轻松。</li>
	<li>其次，你可以用简短的名字（例如<code>add</code>）来暴露函数，但在定义的时候仍然可以使用冗余的定义方法（例如<code>incrementCount</code>）。</li>
</ul>
<hr>
<p>原文：《<a href="http://javascriptplayground.com/blog/2012/04/javascript-module-pattern/"><span style="color: #000000;">The JavaScript Module Pattern</span></a>》</p>
<p>译者：<a href="http://www.zhuowenli.com">卓文理</a></p>
<p><span style="color: #404040;">如需转载烦请注明出处：<a href="http://www.zhuowenli.com">www.zhuowenli.com</a></span></p>