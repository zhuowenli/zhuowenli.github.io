---
layout: post
title: 移动前端开发BUG记录
subline: Frontend Mobile Development BUG Notes
categories: frontend
tags: [frontend, mobile, bug, notes]
img: 23
---

##IOS

####弹窗高度下榻问题

######表现形式

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

![]({{ site.BASE_PATH }}/img/post/BugNotes/1.png)

######BUG原因

在iphone下，点击按钮触发弹窗渲染时。会先渲染最外层的`section#pop`，这时候`section#pop`是出于居中状态，并且高度为0。然后开始往`section#pop`里面填充内容。

这时候浏览器不会再去渲染弹窗居中的样式。而是让内容顺着弹窗最初的高度，往下填充内容。导致弹窗看起来整体的高度下塌。

但是，里面的链接，按钮等的位置其实是在整体居中的位置。而不是我们看上去的位置。所以点击按钮或链接会失效。

######解决办法

可以连同最外层的`section#pop`一起填充进去。例如：

```javascript
var html = '';
html += '<section id="pop-location" class="pop_state">';
html += ......
html += '</section>'
_content.append(html);  // 填充弹窗
openPop();  // 显示弹窗
```

