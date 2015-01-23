---
layout: post
title: SVG动画：loading 效果
subline: SVG loading effect
categories: codebase
tags: [svg, effect, loading]
img: 24
demo-link: codebase/SVGLoading
demo-source: SVGLoading.zip
---

上文([SVG动画：弹性按钮](http://www.zwlme.com/codebase/SVGButton.html))给大家讲了SVG制作弹性按钮。我今天来继续给大家讲讲[本站](http://www.zwlme.com)的loading动画是怎么实现的。没错，又是用SVG。

今天我们将教大家如何用SVG，CSS动画以及JavaScript来创建一个简单页面预加载(preloading)效果。对一个网站来说，页面加载是至关重要的，而加载动画则可以让访客在等待中不至于那么无聊。这个教程的效果是源自于[Fontface Ninja](http://fontface.ninja/)这个网站。最初在一个页面显示logo图标和一个圆形的进度条，当进度条动画加载完全后，整个`div#loading`页面向上移动，同时把内容显示出来。

当然，老生常谈的是，这个效果在低版本的浏览器上不支持哟。

##THE HTML

首先先上html结构：

```html
<div id="container" class="container modify">
	<div id="loading">
		<div class="ld-logo">
			<svg class="ld-inner" viewBox="0 0 612 792" enable-background="new 0 0 612 792" xml:space="preserve" style="height:250px;">
				<polyline fill="#39A239" points="506.6,217.5 171,217.5 171,241.7 395.1,241.7 141.7,523.7 171,523.7 431.6,241.7 506.6,241.8 506.6,258.2 260.8,523.7 268.1,523.7 461.8,523.7 461.8,596.6 126.2,596.6 126.2,620.7 484.2,620.7 484.6,523.9 506.6,523.7 506.6,645.1 103.8,645.1 103.8,572.9 439.4,572.9 439.4,548.3 216,548.3 209.5,548.3 469.8,265.8 439.4,265.8 178.3,548.3 103.6,548.3 103.6,532.5 350.7,265.8 149,265.8 149,193.2 484.2,193.2 484.1,168.7 126.2,168.7 126.2,265.8 103.4,265.8 103.4,145 506.6,145 "/>
			</svg>
		</div>
		<div class="ld-loader">
			<svg class="ld-inner" width="60px" height="60px" viewBox="0 0 80 80">
				<path class="ld-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
				<path id="ld-loader-circle" class="ld-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
			</svg>
		</div>
	</div>
	<div id="content" class="content">
		<!-- more content -->
	</div>
</div>
```

#THE SCSS

我们希望加载页面能够充满整个页面。所以给他一个100%的宽度，并且`position: fixed;`。

*下面是[SCSS](http://www.sass-lang.com/)的代码，你所看到的`@include`等等是我定义好的方法，如批量添加加`-webkit-`,`-moz-`等浏览器前缀的方法等等。*

```css
#loading{
	position: fixed;
	top: 0;
	z-index: 8000;
	min-height: 480px;
	width: 100%;
	height: 100%;
	background: #f1f1f1;
}
```
让logo和进度条绝对定位

```css
.ld-logo,.ld-loader{
	position: absolute;
	left: 50%;
	opacity: 0;
	cursor: default;
	pointer-events:none;
}
```

我们使用百分比来设置居中和高度。因为我们可能不知道logo的大小。

```scss
//scss
.ld-logo{
	@include inline-block;
	top: 40%;
	@include transform(translate3d(-50%,-50%,0));
	@include transition(opacity 0.3s cubic-bezier(0.7,0,0.3,1));
}
.ld-loader{
	bottom: 20%;
	@include transform(translate3d(-50%,0,0));
}
```

SVG我们给他一个`ld-inner`的class，让他成为块级元素，并且水平居中。

```css
.ld-inner{
	display: block;
	margin: 0 auto;
}
```
进度条的svg不要填充颜色，给他一个6的轮廓。
*fill: 填充颜色用*
```css
.ld-loader svg path{
	fill:none;
	stroke-width: 6;
	&.ld-loader-circlebg{
		stroke: #ddd;
	}
	&.ld-loader-circle{
		@include transition(stroke-dashoffset 0.2s);
		stroke: #39A239;
	}
}
```