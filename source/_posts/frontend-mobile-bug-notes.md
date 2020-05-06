---
title: 移动前端开发BUG记录
id: 33
categories: diary
tags: [frontend, mobile, bug, notes, javascript]
date: 2015-01-06
---

记录各种奇葩问题。

<!-- more -->

## IOS

### 弹窗高度下榻问题

#### 表现形式

如下弹窗，最外层竖直水平居中。内容动态加载。

```html
<section id="pop" class="pop">
 <!-- add more -->
</section>
```

```javascript
var html = '';

html += '<div>......</div>';

$('section#pop').append(html);  // 填充弹窗
openPop();  // 显示弹窗
```

在iphone下会出现如下bug:

![][img1]

#### BUG原因

在iphone下，点击按钮触发弹窗渲染时。会先渲染最外层的`section#pop`，这时候`section#pop`是出于居中状态，并且高度为0。然后开始往`section#pop`里面填充内容。

这时候浏览器不会再去渲染弹窗居中的样式。而是让内容顺着弹窗最初的高度，往下填充内容。导致弹窗看起来整体的高度下塌。

但是，里面的链接，按钮等的位置其实是在整体居中的位置。而不是我们看上去的位置。所以点击按钮或链接会失效。

#### 解决办法

可以连同最外层的`section#pop`一起填充进去。例如：

```javascript
var html = '';
html += '<section id="pop-location" class="pop_state">';
html += ......
html += '</section>'
_content.append(html);  // 填充弹窗
openPop();  // 显示弹窗
```

### 移动端:active伪类事件失效

#### BUG原因

Safari Mobile 默认不使用`:active` 状态，除非元素上或`<body>`上有一个`touchstart` 事件处理器。

相关链接：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/%3Aactive](https://developer.mozilla.org/zh-CN/docs/Web/CSS/%3Aactive)

#### 解决办法

```
document.body.addEventListener('touchstart', function () {});
```

-----------------

## Android

### 字体图标显示不出来

#### 表现形式

字体图标在小米2的QQ浏览器上显示不出来，如图：

![][img2]

#### BUG原因

部分手机浏览器不支持 **&#xe + 3位16进制** 的Unicode字符，如`&#xe61a;`

#### 解决办法

把字体图标编码制作成 **&#xe + 4位16进制** 即可，如`&#xe601a`;

[img1]: https://st-qn.gittt.cn/2015/01/06/1.png
[img2]: https://st-qn.gittt.cn/2015/01/06/2.png
