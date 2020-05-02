---
layout: post
title: 浅析 Media Query Level 4
subline: Media Query Level 4
categories: frontend
tags: [media query, css3, w3]
img: 25
---

目前主流浏览器对CSS3 Media Queries的支持度已经非常好，那么就展望看看[Media Query Level 4](http://dev.w3.org/csswg/mediaqueries-4/)。

前段时间抽空看了一下，就挑选几条感兴趣的说下。由于目前文档并非标准而只是工作草案，所以本文所列内容随时可能过期，只作为一个向导。

## update-frequency (更新频度)

查询设备的实际更新能力，取值也比较直观：

- `none`: 一旦渲染无法更新(比如打印机)
- `slow`: 更新缓慢(比如电子墨水)
- `normal`: 正常更新(比如我们更为熟悉的电脑屏幕)

这个查询可以为一些带有交互类的内容提供更多的外观控制，因为我们不是指定设备，而是根据设备的实际能力，对最终内容的样式加以优化。

例如，有一个链接在鼠标`hover`时会有下划线，当我们在打印时需要把下滑线显示出来：

```scss
a{
 text-decoration: none;
}
a:hover, a:focus{
 text-decoration: underline;
}
@media (update-frequency: none){  // 打印等设备
 a{
  text-decoration: underline;
  }
}
```

## light-level (环境光)

Level 4里添加了关于环境光的查询，这使得夜间模式变得可能。当然，现在已经有一些通过页面里的开关实现了类似开关灯的效果，效果其实也挺不错。甚至有一些浏览器单独实现了这样的一个模式，为夜间阅读注入特别的样式(主要是字体反白)。查询环境光需要光感传感器，由于现在手机上普遍已经搭载，所以light-level成为了一个很实际的功能。

目前取值有三：

- `dim`: (昏暗)
- `normal`: (普通)
- `washed`: (明亮环境，比如室外阳光下)

这个查询看起来不错，不过实际操作起来是非常有难度的，因为很难界定。用户代理必须自己设定光亮的阀值，不同光感组件精度不同，而且手机自有的调亮功能也会影响到准确性，更不要说电子墨水在强光下的反而效果优秀了。所以，就目前而言这个特性显得比较空泛。

下面是一个根据环境光来控制页面显示模式的demo：

```css
@media (light-level: normal) {
 p { background: url("texture.jpg"); color: #333 }
}
@media (light-level: dim) {
 p { background: #222; color: #ccc }
}
@media (light-level: washed) {
 p { background: white; color: black; font-size: 2em; }
}
```

# scripting (脚本能力)

我们长期依赖`noscript`标签完成脚本支持的提示，但如果能查询到浏览器的脚本情况而应用不同的样式，岂非更好？所以 `scripting` 用来查询当前文档对脚本的支持情况。取值同样有三：

- `enabled`: 支持脚本并且已启用
- `initial-only`: 仅支持页面初始化脚本
- `none`:    不支持脚本，或虽然支持但未启用

`initial-only` 比较少见，但却是有用的，比如对于打印机而言，我们有必要得到仅仅是初始化完成的页面，但可能并不需要其他后续的交互结果。另外，`none`代表了不支持和不启用两者，是否有必要对两者加以区分？个人认为，没什么必要。区别对待的话，也许我们可以提供更准确的提示语句，然而在这个脚本横行的时代，有点显得多余。

## pointer (指针)

`pointer`代表了指点的精度，是我看到目前为止，LV4最有用的一个查询。

目前，我们使用媒体查询往往只是通过宽度判断我们的设备大小，我们总是在默认越小的设备诸如平板和手机，其指点精度都不高，故而需要放大按钮的尺寸，尽管大体事实上确实如此，但我们显然需要更为直观的确定方式——直接查询指点的精度。

指点精度影响可以影响整个交互，所以显得额外重要，尤其是当标准试图将所有设备囊括其中时。

`pointer`取值同时有三：

- `none`: (无指点)
- `coarse`: (不精确，比如手指)
- `fine`: (精确，比如鼠标)

并且，缩放不影响值的判断。

现在，我们就可以更为直观地放大我们的按钮了：

```css
@media (pointer:coarse) {
 input[type="checkbox"], input[type="radio"] {
  min-width:30px;
  min-height:40px;
  background:transparent;
 }
}
```

## hover (悬停)

另一个重要的查询是 `hover`，即指点动作是否具有悬停能力。现代浏览器(特别是移动浏览器)对这个东西有各种特别处理。

`hover`同样有3个取值：

- `none`：设备不支持指针(pointer)，甚至没有指针系统
- `on-demand`：设备支持指针系统，但是他需要用户一个特定的操作。比如部分移动设备不能正常hover，但是**长按**的时候可以激活hover
- `hover`：正常悬停

当设备支持hover时，使用悬停来激活下拉菜单：

```css
@media (hover) {
 .menu > li        {display:inline-block;}
 .menu ul          {display:none; position:absolute;}
 .menu li:hover ul {display:block; list-style:none; padding:0;}
 /* ... */
}
```

## custom Media Queries (自定义查询)

自定义查询，顾名思义，就是将定义好的某种查询命名，并可以在后续过程中组合使用。相对Level 3，Level 4添加了很多新的查询类型，这使得自定义查询变得有意义。只是即便如此，自定义查询的可用度还是太小了些。

## 总结

以前看Media Query还是遥不可及的梦，但几年一过，变化还真是很大。

所以往前看一些总不会错的。虽然现在还用不上甚至显得鸡肋，但时间当真是转瞬，即逝。

毕竟，IE6都要死拉。啊哈哈哈哈哈哈···
