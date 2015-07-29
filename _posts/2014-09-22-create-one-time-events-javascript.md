---
layout: post
title: 如何在javascript中创建一次性事件
subline: one time events with javascript
categories: frontend
tags: [javascript]
img: 11
---

<h2>如何在javascript中创建一次性事件</h2>

<p>
	有时候在我们页面中，一个事件只需要被调用一次。例如，点击一个缩略图来载入播放的视频，或者点击'more'标签用AJAX获取更多内容。然而，你可能会定义一个每次事件发生时都能被调用的事件。这样可能会产生一些问题，可能你的程序效率不高，浏览器占用了一些不必要的资源。最坏的情况可能会出现一些意想不到的事，或者重复载入已经存在的内容。
</p>
<p>
	幸运的是，在javascript中建立一次性事件是比较简单的事。过程如下：
</p>
<ul>
	<li>
		将一个事件处理器分配给一个元素，例如点击一个元素
	</li>
	<li>
		元素被点击时，处理器被调用
	</li>
	<li>
		移除处理器。未来在元素上执行点击操作时不再调用函数
	</li>
</ul>

<h3>
	jQuery
</h3>
<p>
	让我们来看一个最简单的实现方法。如果你使用jQuery，那么你就可以直接使用jQuery中的<code>one()</code>事件来创建一个一次性事件了。
</p>
```javascript
$("#myElement").one("click",function(){
	alert("该事件只会被执行一次！");
})
```
<p>
	它和其他jQuery事件方法类似。更多内容可以查看官方<a href="http://api.jquery.com/one/">API</a>。
</p>

###自移除事件处理器
<p>
	如果你使用原生的javascript，任何移除自身的处理函数都可以直接使用一条简单的代码。
</p>
```javascript
document.getElementById("myElement").addEventListenter("click",handler);
// handler函数
function handler(e){
	// 移除这个函数
	e.target.removeEventListenter(e.type,auguments.callee);

	alert("该事件只会被执行一次！");
}
```
<p>
	假设你的事件处理器的参数为<code>e</code>，下面这行代码：
</p>
```javascript
e.target.removeEventListenter(e.type,auguments.callee);
```
<p>
	将会在它第一次调用时移除事件处理器。无论你的事件类型以及处理器名称是什么都没关系，它甚至可以是一个行内匿名函数。	
</p>

<p>
	注意我的这个标准事件处理程序在IE8以下是不能工作的。旧版IE需要用一个叫做<code>detachEventand</code>的方法来调用并且事件类型需要加上<code>on</code>前缀。例如：<code>onclick</code>。但是，如果你是想支持旧版IE浏览器，你可能会使用jQuery，或者使用你自己定义的事件处理程序。
</p>

<p>
	如果你比较注重灵活的话，自移除事件处理器是最好的选择。
</p>

<h3>
	一个一次性事件创建函数
</h3>

<p>
	就像我一样，你可能会偷懒，或者忘了给这些一次性的事件处理器挨个加上移除处理器的方法。现在我直接创建一个函数来为我们完成这项烦人的工作。
</p>
```javascript
function onetime(node,type,callback) {
	// 创建事件
	node.addEventListenter(type,function(e) {
		// 移除事件
		e.target.removeEventListenter(e.type,arguments.callee);
		// 回调函数
		return callback(e);
	})
}
```
<p>
	我们现在就可以使用这个函数了，当我们需要创建一次性处理程序：
</p>
```javascript
// 调用onetime函数
onetime(document.getElementById("myElement"),"click",handler);
// handler函数
function handler(e) {
	alert("该事件只会被执行一次！");
}
```
<p>
	即使你并不需要在每个页面中都使用一次性事件，为JavaScript提供多种解决方案也是一件好事吧！
</p>

<!--more-->

<hr />

&nbsp;

原文：《<a href="http://www.sitepoint.com/create-one-time-events-javascript/"><span style="color: #000000;">How to Create One-Time Events in JavaScript</span></a>》

译者：<a href="http://www.zwlme.com">卓文理</a>

<span style="color: #404040;">如需转载烦请注明出处：<a href="http://www.zwlme.com">www.zwlme.com</a></span>