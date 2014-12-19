---
layout: post
title: 3D 图书展示
subline: 3D Book Showcase
categories: codebase
tags: [github-page, jekyll]
img: 22
---

<p>
	<a target="_blank" href="{{ site.BASE_PATH }}/codebase/3DBookShowcase/" class="demo">View Demo</a>
	<a target="_blank" href="{{ site.BASE_PATH }}/codebase/3DBookShowcase/2DBookShowcase.zip" class="demo">Download Source</a>
</p>


这个demo只能在支持 CSS 3D transforms 的浏览器上运行。至于其他不支持css3的浏览器就一边画圈圈去把。

在chrome上演示效果更佳：

##结构

主要结构

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

占位编辑。
未完待续...