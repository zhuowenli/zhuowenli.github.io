---
title: 如何创建文字填充动画
categories: frontend
tags: [css3, svg, animation, javascript]
date: 2015-03-07
id: 23
---

在CSS3和SVG出现之前，我们脑海里可能会有一些酷炫的想法，因为技术的不支持一直没办法实现。但是，随着技术的发展，这些高大上的想法越来越有实现的可能。例如，我们现在有很多的方式来实现文字填充动画。

<!-- more -->

大概一年前，[Sara Soueidan](http://sarasoueidan.com/index.html)发表了一篇[Techniques for Creating Textured Text](http://tympanus.net/codrops/2013/12/02/techniques-for-creating-textured-text/)的文章。这篇神奇的文章告诉我们如何使用一些现代web技术、包括canvas等，来实现创建纹理文字的效果。如图：

![][img1]

看到这个，我们就会想，能不能让里面文字填充的背景动起来？我们可以实现文字的阴影或渐变的动画？或者使用一个视频(`video`)来填充文本如何？

这篇文章我将会分享如何创建图案填充的文本动画。当然，最好还要保留文本的文字选择能力，用于复制、粘贴等。

因为是**高度实验性**的代码，可能有大部分浏览器不支持，为了更好的体验效果请用chrome最新版浏览器来阅读该文章，谢谢。

## 方法1：使用`background-clip`

这个方式可能是我们脑海里第一个蹦出来的想法，虽然只有WebKit内核的浏览器支持，所以要加上`-webkit-`前缀。

html标签如下：

```html
<div class="box-with-text">
    Text
</div>
```

CSS是这样的：

```css
.box-with-text{
 background-image:url('img/1.jpg');
 -webkit-text-fill-color: transparent;
 -webkit-background-clip: text;
}
```

效果如下：

<div class="demo">
 <div class="box-with-text demo1">
     Text
 </div>
</div>

文字依然文本，所以我们可以选择和复制。其缺点是缺乏浏览器的支持。

但我们可以用CSS渐变与-webkit-前缀以除去非Webkit的浏览器的背景：

```css
.box-with-text{
 background-image:-webkit-linear-gradient(transparent, transparent),
        url('img/1.jpg');
 -webkit-text-fill-color: transparent;
 -webkit-background-clip: text;
}
```

不支持的浏览器将完全忽略了整个字符串，我们能够避免完全显示的背景图像。这简单的一招将使我们能够解决非Webkit内核的浏览器，如果我们不希望显示的图像话。

如果我们要实现填充动画，CSS可以实现。但是我们CSS动画只能实现改变背景的位置和大小，不能平滑地改变颜色。效果如图

```css
// scss
@include keyframes(stripes) {
  100% {
    background-position: 0 -50px;
  }
}

.box-with-text{
 background-image: -webkit-linear-gradient(crimson 50%, #FD0 50%);
 background-repeat: repeat;
 background-position: 0 0;
 background-size: 100% 50px;
 -webkit-text-fill-color: transparent;
 -webkit-background-clip: text;
 @include animation(stripes 2s linear infinite);
}
```

<div class="demo">
 <div class="box-with-text demo2">
     Text
 </div>
</div>

### 结论

使用该技术实现：只支持WebKit内核浏览器，有限的填充文字的动画效果。

## 方法2：使用SVG

SVG是一种奇妙的格式，它具有良好的浏览器支持。在SVG中，我们有三种方式来使文章填充图案：

- fill
- mask
- clip-path

我将会逐一使用这些方式来展示文字填充图案的效果。

如果你不了解SVG，建议你阅读[SVG规范](http://www.w3.org/TR/SVG/)，或者其他[SVG教程](https://docs.webplatform.org/wiki/svg/tutorials)等。

html使用方法如下：

```html
<svg viewBox="0 0 600 300">
 <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text">
  Text
    </text>
</svg>
```

在它的常规文本中，我们也可以自由的复制粘帖

<div class="demo">
 <svg viewBox="0 0 600 300">
  <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text1">
   Text
     </text>
 </svg>
</div>

在SVG中添加一个简单的linearGradient标签：

```html
<svg viewBox="0 0 600 300">
 <!-- Gradient -->
 <linearGradient id="gr-simple" x1="0" y1="0" x2="100%" y2="100%">
  <stop stop-color="hsl(50, 100%, 70%)" offset="10%"/>
  <stop stop-color="hsl(320, 100%, 50%)" offset="90%"/>
 </linearGradient>
 <!-- text -->
 <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text">
  Text
    </text>
</svg>
 ```

```css
.text {
 font: 12.5em/1 Open Sans, Impact;
 text-transform: uppercase;
 fill: url(#gr-simple);
}
```

就可以实现渐变填充的效果：

<div class="demo">
 <svg viewBox="0 0 600 300">
  <!-- Gradient -->
  <linearGradient id="gr-simple" x1="0" y1="0" x2="100%" y2="100%">
   <stop stop-color="hsl(50, 100%, 70%)" offset="10%"/>
   <stop stop-color="hsl(320, 100%, 50%)" offset="90%"/>
  </linearGradient>
  <!-- text -->
  <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text2">
   Text
     </text>
 </svg>
</div>

想了解更多关于`gradients`的知识可以阅读[Joni Trythall](http://www.sitepoint.com/author/jtrythall/)的文章[Getting Started with SVG Gradients](http://www.sitepoint.com/getting-started-svg-gradients/)

使用`fill`来填充颜色的方式也可以直接写在`text`的属性`fill`上，要使用`gradients`是必须定义ID，并且将之插入到`url()`中。

```html
<svg viewBox="0 0 600 300">
 <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text" fill="url(#gr-simple)">
  Text
    </text>
</svg>
```

当然，你喜欢使用css的话也行。

```css
.text {
 fill: url(#gr-simple);
}
```

我们可以设置`gradient`的字体颜色，但是我们需要使用SMIL来控制`gradient`的其他属性

```html
<!-- Gradient -->
<radialGradient id="gr-radial"
    cx="50%" cy="50%" r="70%">

    <!-- Animation for radius of gradient -->
    <animate attributeName="r"
             values="0%;150%;100%;0%"
             dur="5s" repeatCount="indefinite" />

    <!-- Animation for colors of stop-color -->
    <stop stop-color="#FFF" offset="0">
     <animate attributeName="stop-color"
             values="#333;#FFF;#FFF;#333"
             dur="5s" repeatCount="indefinite" />
    </stop>
    <stop stop-color="rgba(55,55,55,0)" offset="100%"/>
</radialGradient>
```

效果如下

<div class="demo">
 <svg viewBox="0 0 600 300" style="background: #000;">
  <!-- Gradient -->
  <radialGradient id="gr-radial" cx="50%" cy="50%" r="70%" >
   <!-- Gradient动画的半径 -->
   <animate attributeName="r" values="0%;150%;100%;0%" dur="5s" repeatCount="indefinite" />
   <!-- Gradient渐变色彩 -->
   <stop stop-color="#FFF" offset="0">
    <animate attributeName="stop-color" values="#333;#FFF;#FFF;#333" dur="5s" repeatCount="indefinite" />
   </stop>
   <stop stop-color="rgba(55,55,55,0)" offset="100%"/>
  </radialGradient>
  <!-- Text -->
  <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text3" >
   Text
  </text>
 </svg>
</div>

想了解更多关于SMIL的知识可以阅读Sara Soueidan的文章[A Guide to SVG Animations (SMIL)](http://css-tricks.com/guide-svg-animations-smil/)

现在我们来使用`<pattern>`试试。

<div class="demo">
 <svg viewBox="0 0 600 300" class="demo3">
  <pattern id="p-spots" viewBox="0 0 80 80" patternUnits="userSpaceOnUse" width="60" height="60" x="5" y="5" >
   <g class="g-spots">
    <circle r="5" cx="10" cy="10"/>
    <circle r="7" cx="30" cy="30"/>
    <circle r="5" cx="50" cy="10"/>
    <circle r="9" cx="70" cy="30"/>
    <circle r="11" cx="50" cy="50"/>
    <circle r="5" cx="10" cy="50"/>
    <circle r="7" cx="30" cy="70"/>
    <circle r="9" cx="70" cy="70"/>
   </g>
  </pattern>
  <!-- Text -->
  <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text" >
   Text
  </text>
 </svg>
</div>

`<pattern>`标签的代码如下：

```html
<pattern id="p-spots" viewBox="0 0 80 80" patternUnits="userSpaceOnUse" width="60" height="60" x="5" y="5" >
 <g class="g-spots">
  <circle r="5" cx="10" cy="10"/>
  <circle r="7" cx="30" cy="30"/>
  <circle r="5" cx="50" cy="10"/>
  <circle r="9" cx="70" cy="30"/>
  <circle r="11" cx="50" cy="50"/>
  <circle r="5" cx="10" cy="50"/>
  <circle r="7" cx="30" cy="70"/>
  <circle r="9" cx="70" cy="70"/>
 </g>
</pattern>
```

这里仅定义了圆的大小和位置，样式需要在css中定义。或者使用sass：

```scss
//scss
$colors: #1D4259, #0A7373, #30BF7C, #BAF266, #EEF272;
$max: length($colors);

.g-spots circle {
 @for $item from 1 through $max {
  &:nth-child(#{$max}n + #{$item}){
   fill: nth($colors, $item);
  }
 }
}
```

这样就会生成下面的css：

```css
.g-spots circle:nth-child(5n + 1) {
 fill: #1D4259;
}
.g-spots circle:nth-child(5n + 2) {
 fill: #0A7373;
}
.g-spots circle:nth-child(5n + 3) {
 fill: #30BF7C;
}
.g-spots circle:nth-child(5n + 4) {
 fill: #BAF266;
}
.g-spots circle:nth-child(5n + 5) {
 fill: #EEF272;
}
```

想了解更多有关于SVG patterns的，可以阅读[MDN-SVG教程](https://developer.mozilla.org/zh-TW/docs/Web/SVG/Tutorial/%E5%9B%BE%E6%A1%88)相关文章。

我是使用sass来做css的预编译的，所以可以很方便的指定动画的延时。代码如下：

```scss
// scss
$colors: #551F7A, #BA2799, #D9587A, #FFDD00, #FFF3A1;
$max: length($colors);

$time: 2s;
$time-step: $time/$max;

.g-stars polygon {
  stroke-width: 0;
  animation: stroke $time infinite;

  @for $item from 1 through $max {
    &:nth-child(#{$max}n + #{$item}){
      $color: nth($colors, $item);
      fill: $color;
      stroke: $color;
      animation-delay: -($time-step*$item);
    }
  }
}

@keyframes stroke {
 50% {
  stroke-width: 10;
 }
}
```

// 编译后的css

```css
// css
.g-stars polygon {
 stroke-width: 0;
 animation: stroke 2s infinite;
}
.g-stars polygon:nth-child(5n + 1) {
 fill: #551F7A;
 stroke: #551F7A;
 animation-delay: -0.4s;
}
.g-stars polygon:nth-child(5n + 2) {
 fill: #BA2799;
 stroke: #BA2799;
 animation-delay: -0.8s;
}

.g-stars polygon:nth-child(5n + 3) {
 fill: #D9587A;
 stroke: #D9587A;
 animation-delay: -1.2s;
}
.g-stars polygon:nth-child(5n + 4) {
 fill: #FFDD00;
 stroke: #FFDD00;
 animation-delay: -1.6s;
}
.g-stars polygon:nth-child(5n + 5) {
 fill: #FFF3A1;
 stroke: #FFF3A1;
 animation-delay: -2s;
}

@keyframes stroke {
 50% {
  stroke-width: 10;
 }
}
```

接下来我们把里面的圆圈替换成星星，并且让他放大缩小。

<div class="demo">
 <svg viewBox="0 0 600 300" class="demo4">
  <pattern id="p-stars" width="70" height="70" viewBox="0 0 120 120" patternUnits="userSpaceOnUse" >
   <g class="g-stars">
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549 " transform="scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(30,30) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(90,30) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(0,60) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(60,0) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(60,60) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(90,90) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(30,90) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(120,60) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(60,120) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(0,120) scale(.9,.9)"></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(-30,90) scale(.9,.9)"></polygon>
    <!-- Hack to make shapes full  -->
    <polygon></polygon>
    <polygon></polygon>
    <polygon></polygon>
    <polygon points="15 22.5 6.18322122 27.1352549 7.86707613 17.3176275 0.734152256 10.3647451 10.5916106 8.93237254 15 0 19.4083894 8.93237254 29.2658477 10.3647451 22.1329239 17.3176275 23.8167788 27.1352549" transform="translate(120,0) scale(.9,.9)"></polygon>
   </g>
  </pattern>
  <!-- Text -->
  <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text" >
   Text
  </text>
 </svg>
</div>

因为代码比较长，就不放出了，大家可以自己审查元素来查看。

当然我们也可以使用gif动画，虽然体积会比较庞大，但是可以创建出很好的效果。

<div class="demo">
 <svg viewBox="0 0 600 300" class="demo5">
  <!-- Pattern -->
  <pattern  id="p-fire"  viewBox="30 100 186 200" patternUnits="userSpaceOnUse" width="216" height="200" x="-70" y="35">
   <!-- Fire -->
   <image xlink:href="https://st-qn.gittt.cn/2015/03/07/fire.gif" width="256" height="300"/>
  </pattern>
  <!-- Text -->
  <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text" >
   Text
  </text>
 </svg>
</div>

pattern中用来使用图片的方法如下：

```html
<pattern id="p-fire" viewBox="30 100 186 200" patternUnits="userSpaceOnUse" width="216" height="200" x="-70" y="35" >
 <image xlink:href="/img/post/AnimateTextFills/fire.gif" width="256" height="300"/>
</pattern>
```

不同于`background-clip`，文本文字将正确的显示在最新的浏览器。

接下来我们来谈谈`stroke`，对于html来说，我们可以使用`text-shadow`的方式来模拟一个类`stroke`，但是这种方式很大的局限性。

![][img2]

如图，实现这样的效果可以使用如下代码：

```css
.box-with-text {
 text-shadow: -0px -0px 0 yellowgreen, 0px -0px 0 yellowgreen, 0px 0px 0 yellowgreen, -0px 0px 0 yellowgreen, -1px -1px 0 yellowgreen, 1px -1px 0 yellowgreen, 1px 1px 0 yellowgreen, -1px 1px 0 yellowgreen, -2px -2px 0 yellowgreen, 2px -2px 0 yellowgreen, 2px 2px 0 yellowgreen, -2px 2px 0 yellowgreen, 0 5px 15px rgba(0, 0, 0, 0.2);
 font: 26vmax/.85 Open Sans, Impact;
 color: #FFF;
}
```

用text-shadow实现起来确实非常的繁琐，而且代码相当的臃肿。

不同于HTML，`stroke`是可用于SVG的所有元素，包括文本。并且除了作为线条它们也可填充渐变和图案。

<div class="demo">
 <svg viewBox="0 0 600 300" class="demo6">
  <symbol id="s-text">
   <text text-anchor="middle" x="50%" y="50%" dy=".35em">
    Text
   </text>
  </symbol>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
 </svg>
</div>

对于这种类型的`stroke`，我们需要把许多颜色置入到文本中，可以使用下面的方法来实现。。

```html
<div class="demo">
 <svg viewBox="0 0 600 300" class="demo6">
  <symbol id="s-text">
   <text text-anchor="middle" x="50%" y="50%" dy=".35em">
    Text
   </text>
  </symbol>
  <!-- 复制多个文本 -->
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
  <use xlink:href="#s-text" class="text"></use>
 </svg>
</div>
```

用样式控制颜色和动画

```scss
$colors: #551F7A, #BA2799, #D9587A, #FFDD00, #FFF3A1;
$max: length($colors);

@include keyframes(stroke2) {
  100% {
    stroke-dashoffset: -400;
  }
}

//scss
.text {
 fill: none;
 stroke-width: 6;
 stroke-linejoin: round;
 stroke-dasharray: 70 330;
 stroke-dashoffset: 0;
 @include animation(stroke2 6s infinite linear);
 @for $item from 1 through $max {
  &:nth-child(#{$max}n + #{$item}){
   $color: nth($colors, $item);
   stroke: $color;
   @include animation-delay(#{-(1.2 * $item)}s);
  }
 }
}
```

编译出来的css就是这样：

```css
.text {
  fill: none;
  stroke-width: 6;
  stroke-linejoin: round;
  stroke-dasharray: 70 330;
  stroke-dashoffset: 0;
  animation: stroke2 6s infinite linear;
}

.text:nth-child(5n + 1) {
  stroke: #551F7A;
  animation-delay: -1.2s;
}

.text:nth-child(5n + 2) {
  stroke: #BA2799;
  animation-delay: -2.4s;
}

.text:nth-child(5n + 3) {
  stroke: #D9587A;
  animation-delay: -3.6s;
}

.text:nth-child(5n + 4) {
  stroke: #FFDD00;
  animation-delay: -4.8s;
}

.text:nth-child(5n + 5) {
  stroke: #FFF3A1;
  animation-delay: -6s;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
```

对于每一个`stroke`，我们单独设置一个动画延时，所有他们的路径就不会积聚在同一个地方，而是通过在一个字母上不同的位置循环。

### 结论

使用这种方法的文本可以使用CSS样式。我们也可以选择和复制的文本。另一大优势是，SVG具有非常好的浏览器的支持。因此，创建这类文本，SVG是最好的人选之一。

<hr>

未完待续......

[img1]: https://st-qn.gittt.cn/2015/03/07/1.png
[img2]: https://st-qn.gittt.cn/2015/03/07/2.png
