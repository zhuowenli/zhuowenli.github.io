---
layout: post
title: 构建高性能CSS3动画
subline: Bulid high performance CSS3 animation
categories: frontend
tags: [css, css3, animation, performance]
img: 19
---

高性能移动Web相较PC的场景需要考虑的因素也相对更多更复杂，我们总结为以下几点： 流量、功耗与流畅度。 

在PC时代我们更多的是考虑体验上的流畅度，而在Mobile端本身丰富的场景下，需要额外关注对用户基站网络流量使用的情况，设备耗电量的情况。

关于流畅度，主要体现在前端动画中，在现有的前端动画体系中，通常有两种模式：JS动画与CSS3动画。 

JS动画是通过JS动态改写样式实现动画能力的一种方案，在PC端兼容低端浏览器中不失为一种推荐方案。

而在移动端，我们选择性能更优浏览器原生实现方案：CSS3动画。

然而，CSS3动画在移动多终端设备场景下，相比PC会面对更多的性能问题，主要体现在动画的卡顿与闪烁。

目前对提升移动端CSS3动画体验的主要方法有几点：

##尽可能多的利用硬件能力，如使用3D变形来开启GPU加速

```css
-webkit-transform: translate3d(0, 0, 0);
-moz-transform: translate3d(0, 0, 0);
-ms-transform: translate3d(0, 0, 0);
transform: translate3d(0, 0, 0);
```

如动画过程有闪烁（通常发生在动画开始的时候），可以尝试下面的Hack：

```css
-webkit-backface-visibility: hidden;
-moz-backface-visibility: hidden;
-ms-backface-visibility: hidden;
backface-visibility: hidden;

-webkit-perspective: 1000;
-moz-perspective: 1000;
-ms-perspective: 1000;
perspective: 1000;
```

如下面一个元素通过`translate3d`右移`500px`的动画流畅度会明显优于使用`left`属性：

```css
#ball-1 {
  transition: -webkit-transform .5s ease;
  -webkit-transform: translate3d(0, 0, 0);
}
#ball-1.slidein {
  -webkit-transform: translate3d(500px, 0, 0);
}


#ball-2 {
  transition: left .5s ease;
  left: 0;
}
#ball-2.slidein {
  left: 500px;
}
```

注：3D变形会消耗更多的内存与功耗，应确实有性能问题时才去使用它，兼在权衡

###动画实践

- CSS动画属性会触发整个页面的重排`relayout`、重绘`repaint`、重组`recomposite`

- Paint通常是其中最花费性能的，尽可能避免使用触发paint的CSS动画属性，这也是为什么我们推荐在CSS动画中使用`webkit-transform: translateX(3em)`的方案代替使用`left: 3em`，因为left会额外触发layout与paint，而`webkit-transform`只触发整个页面composite

```css
div {
  -webkit-animation-duration: 5s;
  -webkit-animation-name: move;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  width: 200px;
  height: 200px;
  margin: 100px;
  background-color: #808080;
  position: absolute;
}
```
```css
@-webkit-keyframes move{
    from {
        left: 100px;
    }
    to {
        left: 200px;
    }
}
```

如下图使用`left`将持续触发页面重绘，表现为红色边框：

![](https://camo.githubusercontent.com/654764ba444aec1ecf9252045a3d28017848791d/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3637373131342f313735353536312f61386662396339342d363636362d313165332d383738382d6163356235656634656632342e676966)

```css
@-webkit-keyframes move{
    from {
        -webkit-transform: translateX(100px);
    }
    to {
        -webkit-transform: translateX(200px);
    }
}
```

如下图使用`-webkit-transform`页面只发生重组，表现为橙色边框：

![](https://camo.githubusercontent.com/8e251fb2c0aa600041b8d28e881472990c84745c/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3637373131342f313735353536322f61616566323632652d363636362d313165332d386538332d3365373730663236396166302e676966)

CSS属性在CSS动画中行为表:

![](https://camo.githubusercontent.com/9a7812cd5a327c5384eea3d3c33aa875543aef56/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3637373131342f313735323338332f31663863356538652d363631632d313165332d393732352d3330366637653563373366352e706e67)

##尽可能少的使用box-shadows与gradients

`box-shadows`与`gradients`往往都是页面的性能杀手，尤其是在一个元素同时都使用了它们，所以拥抱扁平化设计吧。

##尽可能的让动画元素不在文档流中，以减少重排

```css
position: fixed;
position: absolute;
```


原文：[高性能 CSS3 动画](https://github.com/AlloyTeam/Mars/blob/master/performance/high-performance-css3-animation.md)

作者：[元彦](https://github.com/yuanyan)
