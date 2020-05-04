---
title: background-blend-mode
subtitle: background-blend-mode
categories: frontend
tags: [css, css3, background-blend-mode]
date: 2015-09-11
---

CSS中的`background-blend-mode`（背景混合模式）属性定义了元素的多个背景之间如何互相混合。

使用`background-blend-mode`，你就可以实现在一个元素上混合多个背景层（图片或者颜色）。

该属性的值可以是一个或者多个的[`<blend-mode>`](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode)（混合模式）。混合模式让你可以指定混合的背景，从而改变背景交叉区域的颜色。使用特定颜色公式来混合基色和目标色。

混合模式应该按`background-image`属性同样的顺序定义。如果混合模式数量与背景图像的数量不相等，它会被截取至相等的数量。

## 语法

```css
background-blend-mode: <blend-mode>
```

```css
/* 单值 */
background-blend-mode: normal;

/* 双值，每个背景一个值 */
background-blend-mode: darken, luminosity;

background-blend-mode: initial;
background-blend-mode: inherit;
background-blend-mode: unset;
```

#### 值

一个`<blend-mode>`定义混合的模式，可以有多个值，用逗号间隔。

## 示例

在`luminosity`混合模式中，可以创建单色的背景效果。

下面的例子使用了`luminosity`作为`background-blend-mode`的值，使背景图片和背景颜色混合，让图片“失色”。[查看原图](https://st-qn.gittt.cn/2015/09/11/1.jpg)

```css
.el-1{
    background-image: url(https://st-qn.gittt.cn/2015/09/11/1.jpg);
    background-color: #000;
    background-blend-mode: luminosity;
}
```

效果如下：

<div class="demo">
    <div class="el el-1"></div>
</div>

-------

同样，您可以混合两个或多个重合在一起的图像，让他们重合在一起。

下例的`background-image`有两个值：一张图片以及一个线性的背景，然后使用`overlay`这个混合模式来进行混合。

```css
.el-2 {
    background-image: linear-gradient(to bottom, #f00, #0f0), url(https://st-qn.gittt.cn/2015/09/11/1.jpg);
    background-blend-mode: overlay;
}
```

效果如下：

<div class="demo">
    <div class="el el-2"></div>
</div>

如果你有两张背景图，你也可以把这两张图片混合在一起：[图1](https://st-qn.gittt.cn/2015/09/11/1.jpg) [图2](https://st-qn.gittt.cn/2015/09/11/2.jpg)

```css
.el-3 {
    background-image: url(https://st-qn.gittt.cn/2015/09/11/1.jpg), url(https://st-qn.gittt.cn/2015/09/11/2.jpg);
    background-color: olive;
    background-blend-mode: color-burn;
}
```

<div class="demo">
    <div class="el el-3"></div>
</div>

使用不同混合模式，就好呈现出不用的效果。

## 规范

[《Compositing and blending Level 1 background-blend-mode》](https://drafts.fxtf.org/compositing-1/#background-blend-mode)

## 浏览器兼容性

<iframe src="http://caniuse.com/css-backgroundblendmode/embed/"></iframe>

## 参考资料

- [Compositing and blending Level 1 background-blend-mode](https://drafts.fxtf.org/compositing-1/#background-blend-mode)
- [COMPOSITING AND BLENDING IN CSS](http://sarasoueidan.com/blog/compositing-and-blending-in-css/)

[1]:https://st-qn.gittt.cn/2015/09/11/1.jpg

<style type="text/css">
    .demo{
        margin: 40px 0;
        max-width: 800px;
    }
    .el{
        width: 800px;
        height: 500px;
        -webkit-background-size: 100%;
        background-size: 100%;
    }
    .el-1{
        background-image: url(https://st-qn.gittt.cn/2015/09/11/1.jpg);
        background-color: #000;
        background-blend-mode: luminosity;
    }
    .el-2 {
        background-image: linear-gradient(to bottom, #f00, #0f0), url(https://st-qn.gittt.cn/2015/09/11/1.jpg);
        background-blend-mode: overlay;
    }
    .el-3 {
        background-image: url(https://st-qn.gittt.cn/2015/09/11/1.jpg), url(https://st-qn.gittt.cn/2015/09/11/2.jpg);
        background-color: olive;
        background-blend-mode: color-burn;
    }
</style>
