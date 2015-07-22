---
layout: post
title: CSS3 Flex
subline: 
categories: frontend
tags: [css, css3, layout]
img: 1
---
[Flexbox](http://www.w3.org/html/ig/zh/css-flex-1/)(伸缩布局)是CSS3新增的布局模式。它可以简单快捷的创建一个具有弹性功能的布局，当屏幕宽度发生变化时，它可以让元素在伸缩容器(flex container)中进行自由的伸缩和扩展，从而可以轻易的调整布局。

在CSS 2.1 中定义了四种布局模式 ― 由一个盒与其兄弟、祖先盒的关系决定其尺寸与位置的算法：

- 块布局(block) ― 为了呈现文档而设计出来的布局模式
- 行内布局(inline) ― 为了呈现文本而设计出来的布局模式
- 表格布局(table) ― 为了用格子呈现 2D 数据而设计出来的布局模式
- 定位布局(position) ― 为了非常直接地定位元素而设计出来的布局模式，定位元素基本与其他元素毫无关系

伸缩布局与其他布局模式只有轻微的相似之处。它不具有浮动(floats)或者多栏(columns)等等在块布局中可以用的复杂、面向文本(text)/文档(document)的属性，换来的是简单、强大的用来分配空间与对齐内容的工具。在web应用与复杂页面中使用伸缩布局简直如鱼得水。


##兼容性

各个浏览器兼容写法如下：

```css
.foo{
	display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
	display: -moz-box; /* Firefox 17- */
	display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
	display: -moz-flex; /* Firefox 18+ */
	display: -ms-flexbox; /* IE 10 */
	display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
}
```
