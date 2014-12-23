---
layout: post
title: 3D 图书展示
subline: 3D Book Showcase
categories: codebase
tags: [github-page, jekyll]
img: 18
demo-link: codebase/3DBookShowcase
demo-source: 3DBookShowcase.zip
---

这个demo只能在支持 CSS 3D transforms 的浏览器上运行。至于其他不支持css3的浏览器(IE什么的)就一边画圈圈去把。

在chrome上演示效果更佳：

![]({{ site.BASE_PATH }}/codebase/3DBookShowcase/img/2.png)

这本书有6个平面，以及里面的文章页。我们把书本的封面掀开，就可以看到里面的文章了。今天我们主要是用css3的transform 3d来完成。

这本书的主要结构：

```html
<div class="book">
	<div class="front">
		<div class="cover">
			<h2>
				<span>J.C. Salinger</span>
				<span>The Catcher in the Rye</span>
			</h2>
		</div>
		<div class="cover-back"></div>
	</div>
	<div class="page">
		<div class="bk-content active">
			<p>Oceanic flyingfish spotted danio fingerfish leaffish, Billfish halibut Atlantic cod threadsail poacher slender mola. Swallower muskellunge, turbot needlefish yellow perch trout dhufish dwarf gourami false moray southern smelt cod dwarf gourami. Betta blue catfish bottlenose electric ray sablefish.</p>
		</div>
		<div class="bk-content">
			<p>Oceanic flyingfish spotted danio fingerfish leaffish, Billfish halibut Atlantic cod threadsail poacher slender mola. Swallower muskellunge, turbot needlefish yellow perch trout dhufish dwarf gourami false moray southern smelt cod dwarf gourami. Betta blue catfish bottlenose electric ray sablefish.</p>
		</div>
		<div class="bk-content">
			<p>Oceanic flyingfish spotted danio fingerfish leaffish, Billfish halibut Atlantic cod threadsail poacher slender mola. Swallower muskellunge, turbot needlefish yellow perch trout dhufish dwarf gourami false moray southern smelt cod dwarf gourami. Betta blue catfish bottlenose electric ray sablefish.</p>
		</div>
	</div>
	<div class="back">
		<img src="img/1.png" alt="cat">
		<p>Holden Catfield is a seventeen-year-old dropout who has just been kicked out of his fourth school. Navigating his way through the challenges of growing up, Holden dissects the 'phony' aspects of society.</p>
	</div>
	<div class="right"></div>
	<div class="left">
		<h2>
			<span>J.C. Salinger</span>
			<span>The Catcher in the Rye</span>
		</h2>
	</div>
	<div class="top"></div>
	<div class="bottom"></div>
</div>
```

代码结构并不复杂，我们要做的是一本有3D效果的图书，所以书的封面、背面、书脊等部分，都要一一制作出来。

当我们用鼠标滑过书本的时候，要稍微给它一个旋转效果。

![]({{ site.BASE_PATH }}/codebase/3DBookShowcase/img/3.png)

具体来说，就是给这整本书X轴和Y轴各旋转35°。

```css
book.viewdefault:hover{
	translate: rotate3d(1,1,0,35deg);
}
```

点击VIEW按钮可以打开书本，通过旋转把封面掀开,并且把书本稍微放大。

![]({{ site.BASE_PATH }}/codebase/3DBookShowcase/img/4.png)

```css
book.viewinside{
	translate: rotate3d(0,1,0,0deg) translate3d(0,0,150px);
)

book.viewinside .front{
	translate: translate3d(0,0,20px) rotate3d(0,1,0,-160deg);
}
```

点击FLIP按钮同样是通过旋转把书本翻到后面，我给他做了个小小的延时，让书本先把关上的动画执行完毕，然后再把书本翻过来。具体看<a target="_blank" href="{{ site.BASE_PATH }}/{{ page.demo-link }}">Demo</a>。

```css
book.viewinside{
	translate: translate3d(0,0,0px) rotate3d(0,1,0,180deg);
)

book.viewinside:hover{
	translate: translate3d(0,0,0px) rotate3d(0,1,0,215deg);
}
```

总的来说难度不大。牢记css3的transform、transition的API就可以轻松实现了。