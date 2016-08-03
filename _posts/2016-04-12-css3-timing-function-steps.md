---
layout: post
title: CSS3 timing-function：steps() 详解
subline:
categories: frontend
tags: [css, css3]
---

在应用 CSS3 渐变/动画时，有个控制时间的属性 `<timing-function>`。它的取值中除了常用到的三次贝塞尔曲线以外，还有个让人比较困惑的 `steps()` 函数。在许多相关文章里，关于这个函数的解释都比较含糊其辞，比如：

> `steps()` 第一个参数 number 为指定的间隔数，即把动画分为 n 步阶段性展示，第二个参数默认为 end，设置最后一步的状态，start 为结束时的状态，end 为开始时的状态。

又如：

> steps 有两个参数
>
> 第一个肯定是分几步执行完
> 第二个有两个值
> start 第一帧是第一步动画结束
> end 第一帧是第一步动画开始

年少无知的我轻易就相信了大家的说法，每次应用 `steps()` 函数时都要先考虑一番：嗯，start 对应末态，end 对应初态，末态是 OOOO，初态是 XXXX……卧槽！跑起来不对！

## 一探究竟

被坑得团团转之后，只好向组织求助。于是查到了这样的规定：

> steps: specifies a stepping function, described above, taking two parameters. The first parameter specifies the number of intervals in the function. It must be a positive integer (greater than 0). The second parameter, which is optional, is either the value ‘start’ or ‘end’, and specifies the point at which the change of values occur within the interval. If the second parameter is omitted, it is given the value ‘end’.

粗略翻译如下：*steps 函数指定了一个阶跃函数，第一个参数指定了时间函数中的间隔数量（必须是正整数）；第二个参数可选，接受 start 和 end 两个值，指定在每个间隔的起点或是终点发生阶跃变化，默认为 end。*

这样理解起来可能还是有点抽象，我们来个实例：

```css
#demo {
  animation-iteration-count: 2;
  animation-duration: 3s;
}
```

这是一个 3s * 2 的动画，我们分别对它应用 `steps(3, start)` 和 `steps(3, end)`，做出阶跃函数曲线如下：

### steps(3, start)

![]({{site.qiniu}}/2016/04/12/1.png)

`steps()` 第一个参数将动画分割成三段。当指定跃点为 `start` 时，动画在每个计时周期的起点发生阶跃（即图中空心圆 → 实心圆）。**由于第一次阶跃发生在第一个计时周期的起点处（0s），所以我们看到的第一步动画（初态）就为 1/3 的状态，因此在视觉上动画的过程为 1/3 → 2/3 → 1 。**

如果翻译成 JavaScript，大致如下：

```js
var animateAtStart = function (steps, duration) {
    var current = 0;
    var interval = duration / steps;
    var timer = function () {
        current++;
        applyStylesAtStep(current);
        if (current < steps) {
            setTimeout(timer, interval);
        }
    };
    timer();
};
```

### steps(3, end)

![]({{site.qiniu}}/2016/04/12/2.png)

当指定跃点为 end，**动画则在每个计时周期的终点发生阶跃**（即图中空心圆 → 实心圆）。**由于第一次阶跃发生在第一个计时周期结束时（1s），所以我们看到的初态为 0% 的状态；而在整个动画周期完成处（3s），虽然发生阶跃跳到了 100% 的状态，但同时动画结束，所以 100% 的状态不可视。因此在视觉上动画的过程为 0 → 1/3 → 2/3**（回忆一下数电里的异步清零，当所有输出端都为高电平的时候触发清零，所以全为高电平是暂态）。

同样翻译成 JavaScript 如下：

```js
var animateAtEnd = function (steps, duration) {
    var current = 0;
    var interval = duration / steps;
    var timer = function () {
        applyStylesAtStep(current);
        current++;
        if (current < steps) {
            setTimeout(timer, interval);
        }
    };
    timer();
};
```

如果这样的解释还是让你觉得云里雾里，可以参考[交互 DEMO]({{site.qiniu}}/2016/04/12/demo.html)

## 实际应用

虽然写了这么多，但还是不得不说一句 timing-function: steps() 在实际设计中的应用少之又少，但是配合一些奇淫技巧还是能做出一些不错的效果：

### 1.定时遮罩

```scss
$precent: 5; // 进度百分比
$duration: 2s; // 动画时长
@keyframes toggle {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
.progress-right {
    // 初态为 opacity: 0; 动画周期结束后为 opacity: 1;
    opacity: 1;
    animation: toggle ($duration * 50 / $precent) step-end; // step-end = steps(1, end)
}
.progress-cover {
    // 初态为 opacity: 1; 动画周期结束后为 opacity: 0;
    opacity: 0;
    animation: toggle ($duration * 50 / $precent) step-start; // step-start = steps(1, start)
}
```

这里的关键是使用了 `step-start` 与 `step-end` 控制动画，因为动画只有两个关键帧，参考上文可以得出：

> step-start：动画一开始就跳到 100% 直到周期结束
>
> step-end：保持 0% 的样式直到周期结束

要注意的是，timing-function 是作用于每两个关键帧之间，而不是整个动画（[the ‘animation-timing-function’ applies between keyframes, not over the entire animation](http://www.w3.org/TR/css3-animations/#animation-timing-function-property)），所以就有了张鑫旭老师在小tip: [CSS3 animation渐进实现点点点等待提示效果](http://www.zhangxinxu.com/wordpress/2013/06/css3-animation-%E7%82%B9%E7%82%B9%E7%82%B9%E7%AD%89%E5%BE%85%E6%8F%90%E7%A4%BA%E6%95%88%E6%9E%9C/)一文中得出的结论：

> step-start, 顾名思意，“一步一步开始”，表现在动画中就是一帧一帧播放、一顿一顿画面

### 2. Sprite 精灵动画

使用 CSS3 Animation 来实现游戏开发中的精灵动画：

```scss
$spriteWidth: 140px; // 精灵宽度
@keyframes run {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -($spriteWidth * 12) 0; // 12帧
  }
}
#sprite {
  width: $spriteWidth;
  height: 144px;
  background: url("../images/sprite.png") 0 0 no-repeat;
  animation: run 0.6s steps(12) infinite;
}
```

其原理是：使用一张含有多帧静态画面的图片，通过切换 `background-position` 使其变为连续的动画。