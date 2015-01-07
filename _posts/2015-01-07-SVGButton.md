---
layout: post
title: svg动画：弹性按钮
subline: Elastic Button with SVG
categories: codebase
tags: [svg, elastic, button, snap.svg]
img: 22
demo-link: codebase/SVGButton
demo-source: SVGButton.zip
---

可缩放矢量图形 ([SVG](http://www.w3.org/TR/SVG11/intro.html)) 是用于在 XML 中描述二维图形的一种语言，也是 [W3C推荐](http://www.w3.org/TR/SVG11/intro.html)语言。SVG 允许使用三种类型的图形对象：矢量图形（例如由直线和曲线组成的路径）、图像和文本。

SVG 绘图可以是交互式和动态的。例如，可使用脚本来定义和触发动画。

从本章开始，我会逐步给大家讲解关于SVG动画的一些实现，以及SVG的一些基本概念。

SVG采用的是使用文本来定义图形，这种文档结构非常适合于创建动画。要改变图形的位置、大小和颜色，只需要调整相应的属性就可以了。事实上，SVG有为各种事件处理而专门设计的属性，甚至很多还是专门为动画量身定做的。在SVG中，实现动画可以有下面几种方式：

- 使用SVG的动画元素。这个下面会重点介绍。
- 使用JavaScript。采用DOM操作启动和控制动画，本文及以后将大量采用这种方式来进行动画操作。
- [SMIL(Synchronized Multimedia Integration Language)](http://www.w3.org/TR/2008/REC-SMIL3-20081201/)。

现代浏览器基本上都支持SVG：[查看](http://caniuse.com/#search=svg)

![]({{ site.BASE_PATH }}/img/post/SVGButton/1.png)

ok，接下来进入正文。

------------------

##弹性按钮

今天我给大家分享的是弹性按钮的实现。

大家应该发现了。本站首页底部的*下一页*按钮，以及本文的*View Demo*、*Download Soure*等按钮，有个很酷炫的的点击效果。这是怎么实现的呢？

我实现的方法是将这个SVG按钮封装成一个组件，然后当用户点击按钮的时候，将svg按钮的路径替换成另外一个带有弹性的路径。

*路径(path)：在SVG的形状标签里，path是最强大的一个，掌握了path就足够处理常见的绘图问题了。有用过AI(Adobe Illustrator)的就知道，用路径工具可以画出直线和曲线，最终闭合后可以形成一个自定义形状图形。SVG的路径也是同样的道理。*

这样可以使按钮的效果更有趣，让交互效果显得更自然。当然，物极必反。在我们实际的使用中最好把握一个度，不要滥用效果，这可能会得不偿失。

好处也是相当的。特别是在移动端上。点击按钮能够反馈给用户更加流畅的动画效果，而不是死板的边框，变色等。

我们用到了[Snap.svg](http://snapsvg.io/)这个在现代浏览器下性能非常好的SVG动画插件。

下个是一个按钮的案例：

```html
<a class="nav-link" href="{{ site.BASE_PATH }}/{{ site.paginate_path | replace: ':num', paginator.previous_page }}">

	<span class="button" data-morph-active="M286.5,62.5c0,27.891-22.609,50.5-50.5,50.5c0,0-64.355-6-86-6c-21.645,0-86,6-86,6c-27.891,0-50.5-22.609-50.5-50.5l0,0C13.5,34.609,36.109,12,64,12c0,0,64.355,6,86,6c21.645,0,86-6,86-6C263.891,12,286.5,34.609,286.5,62.5L286.5,62.5z">

		<svg width="100%" height="100%" viewBox="0 0 300 125" preserveAspectRatio="none">
			<path d="M286.5,62.5C286.5,90.39099999999999,263.891,113,236,113C236,113,171.64499999999998,113,150,113C128.355,113,64,113,64,113C36.109,113,13.5,90.39099999999999,13.5,62.5C13.5,62.5,13.5,62.5,13.5,62.5C13.5,34.609,36.109,12,64,12C64,12,128.35500000000002,12,150,12C171.645,12,236,12,236,12C263.891,12,286.5,34.609,286.5,62.5C286.5,62.5,286.5,62.5,286.5,62.5C286.5,62.5,286.5,62.5,286.5,62.5"/>
		</svg>

	</span>
	<span class="text">按钮</span>
	
</a>
```

SVG放到`span.button`标签里面，用`data-morph-active`来保存点击后的路径，默认的路径就是`svg path`的`d`属性。当我们需要执行动画的时候，就把这两个元素对掉。


怎么获取到SVG的`path`？

我们可以通过API的路径工具来画一个形状出来。


![]({{ site.BASE_PATH }}/img/post/SVGButton/2.png)

导出SVG文件。然后，通过编辑器打开这个SVG文件。就可以看到是一个类似XML的代码，接下来复制粘贴就行了。

![]({{ site.BASE_PATH }}/img/post/SVGButton/3.png)

`span.button`通过绝对路径放入`a.nav-link`，并且宽高100%。当svg原始宽高大于外层固定的宽高时，它会按比例压缩大小。

```scss
// scss
.nav-link{
	margin: 0 10px;
	display: inline-block;
	position: relative;
	width: 9em;
	height: 3em;
	line-height: 3em;
	-webkit-tap-highlight-color: transparent;
	@include user-select(none);
	-webkit-touch-callout:none;
	.button{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		svg{
			fill: transparent; // 填充透明背景
			stroke: $green;    // 边框颜色
			stroke-width: 2px; // 
			stroke-linecap: round; // 表示描边端点表现方式。可用值有：butt, round, square, inherit
		}
	}
	.text{  // 文字
		display: block;
		text-align: center;
		position: relative;
		z-index: 2000;
		color: $green;
		@include user-select(none);
		-webkit-touch-callout:none;
	}
}
```

通过[Snap.svg](http://snapsvg.io/)，我们可以将SVG的路径替换成另一个路径。

```javascript
(function(){
	function extend(a,b){
		for(var key in b){
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			};
		}
		return a;
	}
	function SVGButton(el, options){
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.init();
	}
	SVGButton.prototype.options = {
		speed: {reset: 800, active: 150},
		easing: {reset: mina.elastic, active:mina.easein}
	};
	SVGButton.prototype.init = function() {
		console.log('SVGButton Init');
		this.shapeEl = this.el.querySelector('span.button');

		var s = Snap(this.shapeEl.querySelector('svg'));
		this.pathEl = s.select('path');
		this.paths = {
			reset: this.pathEl.attr('d'),
			active: this.shapeEl.getAttribute('data-morph-active')
		};
		this.initEvents();
	};
	SVGButton.prototype.initEvents = function(){
		this.el.addEventListener('mousedown', this.down.bind(this));
		this.el.addEventListener('touchstart', this.down.bind(this));

		this.el.addEventListener('mouseup', this.up.bind(this));
		this.el.addEventListener('touchend', this.up.bind(this));

		this.el.addEventListener('mouseout', this.up.bind(this));
	};
	SVGButton.prototype.down = function(){
		this.pathEl.stop().animate({'path': this.paths.active},this.options.speed.active,this.options.easing.active);
	};	
	SVGButton.prototype.up = function(){
		this.pathEl.stop().animate({'path': this.paths.reset},this.options.speed.reset,this.options.easing.reset);
	};
	[].slice.call( document.querySelectorAll( '.SVGButton a' ) ).forEach( function( el ) {
		new SVGButton( el );
	});

})();
```

正确的形变，和适当动画时间，就可以创造出非常棒的效果。

本例介绍的只是一种简单思路，希望你可以通过本文延伸拓展出更多的效果出来。:)
