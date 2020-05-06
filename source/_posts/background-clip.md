---
title: 使用background-clip实现透明边框
categories: frontend
tags: [css3, css-tricks]
date: 2014-09-19
id: 37
---

## 使用background-clip实现透明边框

你有没有在网页上见过透明边框的元素？

类似下面这样的效果：

![](https://st-qn.gittt.cn/2014/09/19/transparentborders.png)

你可能觉得实现效果非常简单，只需要以下代码：

```css
#lightbox{
 background: white;
 border: 20px solid rgba(0,0,0,0.3);
}
```

但是如果这样写的话，就会出现如下效果。

![](https://st-qn.gittt.cn/2014/09/19/gray.png)

在上面的截图中，边框已经用了`RGBa`设置为透明，但是边框却显示为不透明的灰色，这是因为该元素的白色背景透过透明边框显示了出来。

幸运的是，CSS3有个属性拯救了我们！这个属性就是`background-clip`，它正是用来指定在一个盒模型中，究竟哪一部分能够用来显示背景。它做的事儿正如它的名字一样：`background-clip`（背景剪裁）。它可以将盒子的指定部分的背景裁去。这一属性可以有三个值，而且也可以加上浏览器前缀。以下就是该属性的三种设置。你不用同时使用如下代码，这里仅是为了显示方便而已：

```css
#lightbox {
 -moz-background-clip: border; /* Firefox 3.6 */
 -webkit-background-clip: border; /* Safari 4? Chrome 6? */
 background-clip: border-box; /* Firefox 4, Safari 5, Opera 10, IE 9 */

 -moz-background-clip: padding; /* Firefox 3.6 */
 -webkit-background-clip: padding; /* Safari 4? Chrome 6? */
 background-clip: padding-box; /* Firefox 4, Safari 5, Opera 10, IE 9 */

 -moz-background-clip: content; /* Firefox 3.6 */
 -webkit-background-clip: content; /* Safari 4? Chrome 6? */
 background-clip: content-box; /* Firefox 4, Safari 5, Opera 10, IE 9 */
}
```

以下是图示：

![](https://st-qn.gittt.cn/2014/09/19/background-clip.png)

嗯，写到这你应该就知道`background-clip`的作用了：如果我们将background-clip设置为padding-box的话，白色背景就会在边框处被裁掉，然后透明边框就可以透出该元素下面的内容了，这也正是我们想要的效果！

![](https://st-qn.gittt.cn/2014/09/19/transparentborders.png)
