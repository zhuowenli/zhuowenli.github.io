---
layout: post
title: SVG动画：loading 效果
subline: SVG loading effect
categories: codebase
tags: [svg, effect, loading, css3, javascript]
img: 24
demo-link: codebase/SVGLoading
demo-source: SVGLoading.zip
---

上文([SVG动画：弹性按钮](http://www.zwlme.com/codebase/SVGButton.html))给大家讲了SVG制作弹性按钮。我今天来继续给大家讲讲[本站](http://www.zwlme.com)的loading动画是怎么实现的。没错，又是用SVG。

今天我们将教大家如何用SVG，CSS动画以及JavaScript来创建一个简单页面预加载(preloading)效果。对一个网站来说，页面加载是至关重要的，而加载动画则可以让访客在等待中不至于那么无聊。这个教程的效果是源自于[Fontface Ninja](http://fontface.ninja/)这个网站。最初在一个页面显示logo图标和一个圆形的进度条，当进度条动画加载完全后，整个`div#loading`页面向上移动，同时把内容显示出来。

当然，老生常谈的是，这个效果在低版本的浏览器上不支持哟。

##THE HTML

首先先上html结构：

SVG进度条有两个路径，并且重叠在一起。上面的`.ld-loader-circlebg`作为背景使用，而`.ld-loader-circle`则是用来显示加载的进度值。

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

设置logo和进度条的位置。我们使用百分比来设置居中和高度。因为我们可能不知道logo的大小。

```scss
//scss
.ld-logo,.ld-loader{
	position: absolute;
	left: 50%;
	opacity: 0;
	cursor: default;
	pointer-events:none;
}
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

SVG进度条默认不要填充颜色，设置`stroke-width`为6，底层的颜色是`#ddd`，顶层的颜色为`#39A239`，然后给`.ld-loader-circle`的`stroke-dashoffset`添加一个`0.2s`过渡动画。

- `fill`: 填充颜色用
- `stroke`: 轮廓，可以理解为类似边框

```scss
// scss
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

动画加载中，也就是首次打开页面时的动画效果。

```scss
// scss
.loading{
	.ld-logo,.ld-loader{
		opacity: 1;
	}
	.ld-logo{
		@include animation(animInitialLogo 0.5s cubic-bezier(0.7,0,0.3,1) both);
	}
	.ld-loader{
		@include animation(animInitialLoader 0.5s cubic-bezier(0.7,0,0.3,1) both);
	}
}
```
上面既然使用了`animation`动画，那么接下来就是`keyframes`这个帧动画出马了。

```scss
// scss
// 初始化logo动画
@include keyframes(animInitialLogo){
	from { opacity: 0; }
}
// logo结束动画
@include keyframes(animLoadedLogo){
	to{
		@include transform(translate3d(-50%,100%,0) translate3d(0,50px,0) scale3d(0.65,0.65,1));
	}
}
// 初始化loader动画
@include keyframes(animInitialLoader){
	from{
		opacity: 0;
		@include transform(translate3d(-50%,0,0) scale3d(0.5,0.5,1));
	}
}
// loader结束动画
@include keyframes(animLoadedLoader){
	to{
		opacity: 0;
		@include transform(translate3d(-50%,-100%,0) scale3d(0.3,0.3,1));
	}
}
// 隐藏至头部的动画
@include keyframes(animLoadedHeader){
	to{
		opacity: 0;
		@include transform(translate3d(0,-100%,0) scale3d(0.3,0.3,1));
	}
}
// 显示内容
@include keyframes(animLoadedContent){
	from{
		opacity: 0;
		@include transform(scale3d(0.3,0.3,1));
	}
}
// scss的`%placeholders`占位符，可以用`@extend`来继承这个内容
%animLoadedContent{
	@include animation(animLoadedContent 1s cubic-bezier(0.7,0,0.3,1) both);
	@include transition-delay(0.15s);
}
```

loading加载完成后，就需要把logo跟loader隐藏掉。并且把`#loading`这个loading页面向上隐藏掉，同时把正文内容从下往上显示出来。

```scss
// scss
.loaded{
	.content {
		.article{
			@extend %animLoadedContent;
		}
		.header h1,.post-header h1{
			@extend %animLoadedContent;
		}
		.header h2{
			@extend %animLoadedContent;
			line-height: 1.5;
		}
	}
	#loading{
		@include animation(animLoadedHeader 1s cubic-bezier(0.7,0,0.3,1) forwards);
	}
	.ld-logo,.ld-loader{
		opacity: 1;
	}
	.ld-logo{
		@include transform-origin(50% 0);
		@include animation(animLoadedLogo 1s cubic-bezier(0.7,0,0.3,1) forwards);
	}
	.ld-loader{
		@include animation(animLoadedLoader 1s cubic-bezier(0.7,0,0.3,1) forwards);
	}
}
```
##THE JAVASCRIPT

该JavaScript由两部分组成，公共的路径加载动画操作，以及另一个具体的`element`加载操作。

首先把这个加载动画文件命名为pathLoader.js。

我们希望`stroke-dashoffset`能够以动画的形式来填充路径。

首先，设置`stroke-dashoffset`的长度为路径的长度(`getTotalLength()`)。然后我们让` stroke-dasharray`的值慢慢变小，直到0为止。

```js
	function PathLoader(el){
		this.el = el;
		// clear stroke
		// svg stroke属性，getTotalLength() 返回svg线条长度
		// stroke-dasharray  是指定画出的线段每段的长度
		// stroke-dashoffset 是指定每个小段的起始偏移量。
		this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
	}

	PathLoader.prototype._draw = function(val) {
		this.el.style.strokeDashoffset = this.el.getTotalLength() * (1 - val);
	};

	PathLoader.prototype.setProgress = function(val, callback) {
		this._draw(val);
		if (callback && typeof callback === 'function') {
			// 设置延时，使得最后的加载进度条动画效果可见。
			setTimeout(callback, 200);
		};
	};

	PathLoader.prototype.setProgressFn = function(fn) {
		if (typeof fn === 'function') {
			fn(this);
		};
	};

	// 添加到全局命名空间
	window.PathLoader = PathLoader;
```

该`setProgressFn`方法可以用来自定义一个交互效果。

例如，对于我们的演示我们没有使用任何预加载，而是模拟一个加载动画，设置0和1之间的随机值来设置时间间隔：

```js
function startLoading() {
	var simulationFn = function(instance){
		var progress = 0,
			interval = setInterval(function(){
				instance.setProgress(progress);
				if (document.readyState === "interactive" || document.readyState === "loading") {
					progress = Math.min(progress + Math.random() * 0.03, 1);
					instance.setProgress(progress);
					PageLoaded(progress,interval);
				};
				if (document.readyState === "complete" || document.readyState === "Loaded") {
					progress = Math.min(progress + Math.random() * 0.2, 1);
					PageLoaded(progress,interval);
				};
			},80);
	}
	loader.setProgressFn(simulationFn);
}
```

接下来，我们将这个文件命名为pageLoading.js，首先，我们先初始化和缓存一些变量。

```js
var container = document.getElementById('container'),
	loading   = document.getElementById('loading'),
	loader    = new PathLoader(document.getElementById('ld-loader-circle'));
```

当loading动画正在加载的时候，需要阻止页面滚动。并且给`.container`添加一个`loading`的class。然后执行上方的`startLoading()`方法。

```js
function init() {
	window.addEventListener('scroll',disableScroll);
	classie.add(container,'loading');
	startLoading();
}
// 阻止滚动
function disableScroll(){
	window.scrollTo(0,0);
}
```
执行`PageLoaded()`。当`progress`为1的时候，页面加载完成。

```js
// 页面加载完成
function PageLoaded(progress,interval){
	if (progress === 1) {
		classie.remove(container,'loading');
		classie.add(container,'loaded');
		clearInterval(interval);

		var onEndHeaderAnimation = function(ev){
			window.removeEventListener('scroll',disableScroll);
			classie.add(document.body, 'layout-switch');
		}
		onEndHeaderAnimation();
	};
}
```

That's all. 具体效果可以查看[DEMO]({{ site.SITE_PATH }}/codebase/SVGLoading)。

有任何疑问都可以在下方留言。

谢谢！

---------

<br>

相关文章

> [SVG动画：弹性按钮]({{ site.SITE_PATH }}/codebase/SVGButton.html)
>
> SVG动画：loading 效果