---
layout: post
title: 链接下划线动画效果
subline: Animating Link Underlines
categories: frontend
tags: [css, css3, animation]
img: 18
---

最近，我在构建这个网站的时候，加了个很有意思的效果。当你在首页把鼠标移到标题上的时候，链接的下划线就会从链接的中间向两边延伸开来。相信你已经注意到了吧！

要实现这个效果灰常的简单，不需要添加而外的DOM元素到HTML上。如果浏览器不支持CSS动画的话(那就只是一个普通的下划线而已)。

首先，我们需要把`text-decoration`设为`none`，并且添加`position: relative`。

```css
.entry-title a {
	position: relative;
	display: inline-block;
	color: #333;
}
```

然后，我们给链接添加一个`:before`，并且将`scale`缩放为0，并且给他一个过渡效果`transition: transform 0.3s cubic-bezier(0.7,0,0.3,1)`。告诉它动画持续0.3秒，动画效果为贝塞尔曲线`cubic-bezier(0.7,0,0.3,1)`。

```css
.entry-title a:before{
	content: '';
	width: 100%;
	height: 2px;
	position: absolute;
	left: 0;
	right: 0;
	bottom: -2px;
	background: #333; 
	visibility: hidden;

	/* 缩放 */
	-webkit-transform: scale(0);
	-moz-transform: scale(0);
	-ms-transform: scale(0);
	transform: scale(0);

	/* 过渡效果 */
	-webkit-transition: -webkit-transform 0.3s cubic-bezier(0.7,0,0.3,1);
	-moz-transition: -moz-transform 0.3s cubic-bezier(0.7,0,0.3,1);
	-ms-transition: -ms-transform 0.3s cubic-bezier(0.7,0,0.3,1);
	transition: transform 0.3s cubic-bezier(0.7,0,0.3,1);
}
```

最后，当鼠标滑动到链接的时候，让`:before`元素的`scale`还原为`1`。

```css
.entry-title a:hover:before{
	visibility: visible;
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-ms-transform: scale(1);
	transform: scale(1);
}
```

大功告成。去[首页](http://www.zwlme.com)看看效果吧！
