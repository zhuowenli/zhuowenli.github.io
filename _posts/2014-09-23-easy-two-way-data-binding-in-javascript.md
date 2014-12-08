---
layout: post
title: JavaScript实现简单的双向数据绑定
subline: data binding with javascript
categories: frontend
tags: [javascript]
img: 11
---

<h2>
	JavaScript实现简单的双向数据绑定
</h2>

<p>
	双向数据绑定指的是，对象属性的变化的同时绑定UI，反之亦然。换句话说，如果我们有一个<code>user</code>对象和一个<code>name</code>属性，一旦我们给<code>user.name</code>赋了新值。那么在UI上就会同时显示新的值。同样的，如果UI上有一个输入框，输入新值就会使<code>user</code>对象的<code>name</code>属性发生改变。
</p>

<p>
	很多流行的JavaScript框架如Ember.js，Angular.js或者KnockoutJS，都将双向数据绑定作为自己的特性。但是这并不意味着实现一个双向数据绑定很困，也不是说要实现这些功能就要使用其他JS框架。实现双向数据绑定的底层思想很基础，可以分为三个步骤：
</p>
<ol>
	<li>我们需要一个方法来识别哪个UI元素绑定了相应的属性</li>
	<li>我们需要监视属性和UI元素的变化</li>
	<li>我们需要将所有的变化</li>
</ol>

<p>
	虽然实现的方法很多，但是最简单也是最有效的方法就是使用PubSub（发布者-订阅者）模式。这个思路很简单：我们使用自定义的<code>data</code>属性在HTML中指明绑定。所有绑定起来的javascript对象以及DOM元素都会订阅一个PubSub对象。只要javascript对象或者一个HTML输入元素被监听到了变化，就会触发绑定到PubSub对象上的事件，从而其他绑定的对象或者元素都会发生变化。
</p>

<h3>
	使用jQuery实现
</h3>

<p>
	使用jQuery来实现双向数据绑定是非常简单的。因为jQuery能够使我们轻松的订阅和发布DOM事件，以及我们自定义的事件：
</p>

```javascript
function DataBinder (object_id) {
	// 使用一个简单的jQuery对象作为简单的订阅者、发布者
	var pubSub = jQuery({});

	// 我们希望一个data元素可以在表单中指明绑定：data-bind-<object_id>="<property_name>"
	var data_attr = "bind-" + object_id,
		message   = object_id + ":keyup";

	// 使用data-binding属性和代理来监听哪个元素上发生了变化事件
	// 以便能够“广播”到所有的关联对象
	jQuery(document).on("keyup","[data-" + data_attr + "]",function(event){
		var $input = jQuery(this);
		pubSub.trigger(message,[$input.data(data_attr),$input.val()]);
	})

	// pubSub将变化传播到所有绑定的元素，设置input标签的值或者其他标签的HTML内容
	pubSub.on(message,function(event,prop_name,new_val){
		jQuery("[data-" + data_attr + "=" + prop_name + "]").each(function(){
			var $bound = jQuery(this);
			if ($bound.is("input,textarea,select")) {
				$bound.val(new_val);
			}else{
				$bound.html(new_val);
			}
		});
	});

	return pubSub;
}
```
<p>
	对于上面这个实现来说，可以按照以下代码简单的实现一个User模型：
</p>
```javascript
function User(uid) {
	var binder = new DataBinder(uid),
		user   = {
			attribute : {},

			// 属性设置器使用数据绑定器pubSub来发布
			set : function(attr_name,val) {
				this.attribute[attr_name] = val;
				binder.trigger(uid + ":keyup",[attr_name,val,this]);
			},

			get : function(attr_name) {
				return this.attribute[attr_name];
			},

			_binder : binder
		};

	binder.on(uid + ":keyup",function(event,attr_name,new_val,initiator) {
		if (initiator !== user) {
			user.set(attr_name,new_val);
		}
	});

	return user;
}
```
<p>
	现在，不管什么时候我们想把模型的属性绑定到UI上。我们只需要在相应的HTML元素上，加上<code>data</code>属性即可。
</p>
```html
// HTML

<input type="text" data-bind-1="name" >
<div data-bind-1="name"></div>
```
```javascript
// JavaScript 调用

var user = new User(1);
user.set("name","asd");
```
<p>
	input字段的值会自动反映反映出<code>user</code>对象的<code>name</code>属性。反之亦然。
</p>

<h3>
	使用原生JavaScript实现
</h3>
<p>
	在如今大多数项目中，都是使用了jQuery，因此完全可以使用上面的例子。但是，更进一步，如果我们移除了jQuery的依赖会怎么样？事实上，这并不困难（尤其是我们限定在只支持IE8以上的版本）。现在，我们就使用原生的JavaScript来实现一个自定义的PubSub已经监听DOM事件。
</p>
```javascript
function DataBinder(object_id){
	// 创建一个简单的pubSub对象
	var pubSub = {
			callbacks: {},
			on: function(msg,callback) {
				this.callbacks[msg] = this.callbacks[msg] || [];
				this.callbacks[msg].push(callback);
			},
			publish: function(msg) {
				this.callbacks[msg] = this.callbacks[msg] || [];
				for (var i = 0,len = this.callbacks[msg].length; i < len; i++) {
					this.callbacks[msg][i].apply(this,arguments);
				};
			}
		},

		data_attr = "data-bind-" + object_id,
		message   = object_id + ":change",

		changeHandler = function(event) {
			var target    = event.target || event.srcElement, // IE8兼容
				prop_name = target.getAttribute(data_attr);

			if (prop_name && prop_name !== "") {
				pubSub.publish(message,prop_name,target.value);
			}
		};

	// 监听事件变化，并代理到pubSub
	if (document.addEventListener) {
		document.addEventListener("keyup",changeHandler,false);
	} else{
		// IE8使用attachEvent而不是addEventListenter
		document.attachEvent("onkeyup",changeHandler);
	};

	// pubSub将变化传播到所有绑定元素
	pubSub.on(message,function(event,prop_name,new_val){
		var elements = document.querySelectorAll("[" + data_attr + "=" +prop_name + "]"),
			tag_name;
		for (var i = 0,len = elements.length; i < len; i++) {
			tag_name = elements[i].tagName.toLowerCase();

			if (tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
				elements[i].value = new_val;
			} else{
				elements[i].innerHTML = new_val;
			};
		};
	})

	return pubSub;
}
```
<p>
	这个模型可以勉强和上面的例子保持一致，除了在设置器中调用的那个<code>trigger</code>方法之外，它需要通过调用一个自定义的PubSub的publish方法来实现：
</p>
```javascript
function User(uid) {
	var binder = new DataBinder(uid),
		user   = {
			attribute : {},

			// 属性设置器使用数据绑定器pubSub来发布
			set : function(attr_name,val) {
				this.attribute[attr_name] = val;
				binder.publish(uid + ":change",attr_name,val,this);
			},

			get : function(attr_name) {
				return this.attribute[attr_name];
			},

			_binder : binder
		};

	binder.on(uid + ":change",function(event,attr_name,new_val,initiator) {
		if (initiator !== user) {
			user.set(attr_name,new_val);
		}
	});

	return user;
}
```
<p>
	我们用了不到100行的原生JavaScript代码实现了同样的效果，而不使用臃肿的JavaScript框架。
</p>

<!--more-->

<hr />

&nbsp;

原文：《<a href="http://www.lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript/"><span style="color: #000000;">Easy Two-Way Data Binding in JavaScript</span></a>》

译者：<a href="http://www.zwlme.com">卓文理</a>

<span style="color: #404040;">如需转载烦请注明出处：<a href="http://www.zwlme.com">www.zwlme.com</a></span>