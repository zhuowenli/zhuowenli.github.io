---
layout: post
title: PhoneGap入门教程(5) - 程序内置浏览器窗口
subline: PhoneGap Getting Started Tutorial
categories: frontend
tags: [PhoneGap, Android, Webapp, javascript]
img: 31
---

使用`window.open()`方法可以让用户在应用程序内显示一个浏览器窗口，但是PhoneGap重写了这个方法。该方法与BOM（浏览器对象模型）的`window.open()`方法有很大的不同，其中一个最大的不同是该方法返回了一个`InAppBrowser`对象，用于引用这个新打开的窗口，从而可以在应用程序内控制这个窗口。

```js
var ref = window.open('http://zwlme.com', '_blank', 'location=yes');
```

这个新打开的窗口是一个`InAppBrowser`实例，一般称之为InAppBrowser窗口。

`InAppBrowser`浏览器插件的完全限定名是`org.apache.cordova.inappbrowser`，可以使用下列命令安装插件

```html
cordova plugin add org.apache.cordova.inappbrowser
```

## 打开一个新的窗口

当然，使用`window.open()`方法不当会在一个新的`InAppBrowser`实例中打开一个URL，也可以在当前浏览器或者在系统浏览器中打开一个URL。

该方法的语法格式如下。

```js
var ref = window.open(url, target, options);
```

- **ref**: 返回的`InAppBrowser`实例，使用它可以进一步的操作这个窗口
- **url**: 指定要加载的URL地址(String)。如果URL包含Unicode字符，首先使用`encodeURI()`进行编码。
- **target**: 指定加载的URL到目标位置，这个参数是可选的。默认是`_self`。

  - `_self`: 如果URL在白名单列表中，在Cordova WebView中打开URL，负责在`InAppBrowser`窗口中打开。
  - `_blank`: 在`InAppBrowser`窗口中打开
  - `_system`: 在系统浏览器中打开

- **option**: 参数可选。指定功能项，各功能之间使用逗号隔开，且不能包含空格。默认的值是`location=yes`

  - `location`: 用来设置`InAppBrowser`窗口是否出现地址栏。可选值为`yes`和`no`。

 <p>Android还可以设置下列功能项：</p>

  - `closebuttoncaption`: 用来设置Done按钮显示的文字。
  - `hidden`: 如果设置`yes`，则会先加载网页但是不显示出来。然后可以调用`show()`方法来显示该网页。虽然加载是不显示的，但加载完成后会触发加载完成事件。默认值为`no`，表示正常加载和显示。
  - `clearcache`: 如果设为`yes`，表示将会首先清除Cookies，然后加载网页。默认值为`no`。
  - `clearsessioncache`: 如果设为`yes`，表示将会首先清除Session，然后加载网页。默认值为`no`。

举个栗子：

```js
// 使用绝对路径
var ref  = window.open('http://zwlme.com', '_blank', 'location=yes');
// URL存在Unicode字符，因此应该用encodeURI()进行编码
var ref2 = window.open(encodeURI('http://www.baidu.com/s?wd=卓文理'), '_blank', 'location=yes');
// 使用相对地址
var ref  = window.open('next.html', '_self');
```

## 关闭窗口

可以使用`colse()`方法来关闭这个窗口。

```js
ref.close()
```

例如下列代码，可以实现窗口在打开5秒后关闭：

```js
function onDeviceReady(){
 // 打开一个窗口
 var ref = window.open('http://zwlme.com', '_blank', 'location=yes');
 // 打开5秒后关闭
 setTimeout(function(){
  ref.close();
 },5000);
}
```

## 显示隐藏的网页

打开网页时功能项`hidden`被设置为`yes`，则会先加载网页但是不显示出来。要想随后显示可以调用`show()`方法来实现。

```js
var ref = window.open('http://apache.org', '_blank', 'hidden=yes');
// 一段时间后...
ref.show();
```

## 事件处理

也可以使用`addEventListener()`和`removeEventListener()`监控和管理新窗口的事件。共有如下几个事件可以监听：

- __loadstart__: 当`InAppBrowser`窗口开始加载一个URL时触发该事件
- __loadstop__:  当`InAppBrowser`窗口完成加载一个URL时触发该事件
- __loaderror__: 当`InAppBrowser`窗口加载一个URL出错时触发该事件
- __exit__:      当`InAppBrowser`窗口关闭时触发该事件

`addEventListener`事件处理器包含一个参数，该参数是一个`InAppBrowserEvent`对象，该对象有如下属性：

- __type__:    事件名，可以是`loadstart`, `loadstop`, `loaderror`, 或 `exit`。 _(String)_

- __url__:     加载的URL地址。 _(String)_

- __code__:    返回出错代码，仅适用于`loaderror`事件。 _(Number)_

- __message__: 返回出错消息，进适用于`loaderror`事件。 _(String)_

```js
// 打开一个窗口
var ref = window.open('http://zwlme.com', '_blank', 'location=yes');

// 注册loadstart事件监听
ref.addEventListener('loadstart', function(event) { alert(event.url); });

// 注册loadstop事件监听
ref.addEventListener('loadstop', function(event) { alert(event.url); });

// 注册exit事件监听
ref.addEventListener('exit', function(event) { alert(event.type); });
```

## JavaScript脚本注入

`executeScript()`方法可以将一个JavaScript代码注入`InAppBrowser`窗口并执行，语法格式如下。

```js
ref.executeScript(details, callback);
```

参数`ref`是返回的`InAppBrowser`实例，参数`details`定义要注入的JavaScript代码详细信息，该参数是一个`Object`，可以定义两个属性，属性要么是`file`，要么是`code`。

- __file__: 指定一个JavaScript文件地址，这个文件中的代码将会注入到当前`InAppBrowser`窗口。
- __code__: 指定一个JavaScript代码字符串，这段代码将会注入到当前`InAppBrowser`窗口。

参数`callback`定义执行注入后的回调函数。如果插入的类型是`code`，`callback`函数将会被传递进一个参数（这个参数是一个`Array`类型），这是代码执行的返回值。对于多行代码，仅包含最后一行代码的返回值。

这个方法一般都应该在文档加载完成后被执行，例如下列代码，当文档加载完成后把一个JavaScript文件注入到当前加载的页面：

```js
var ref = window.open('http://zwlme.com', '_blank', 'location=yes');
ref.addEventListener('loadstop', function() {
    ref.executeScript({file: "myscript.js"});
});
```

## CSS样式注入

`insertCSS()`方法可以将一个CSS样式注入`InAppBrowser`窗口，语法格式如下。

```js
ref.insertCSS(details, callback);
```

参数`ref`是返回的`InAppBrowser`实例，参数`details`定义要注入的CSS样式代码详细信息，该参数是一个`Object`，可以定义两个属性，属性要么是`file`，要么是`code`。

- __file__: 指定一个CSS样式文件地址，这个文件中的代码将会注入到当前`InAppBrowser`窗口。
- __code__: 指定一个CSS样式代码字符串，这段代码将会注入到当前`InAppBrowser`窗口。

参数`callback`定义执行注入后的回调函数。

这个方法一般都应该在文档加载完成后被执行，例如下列代码，当文档加载完成后把一个CSS样式文件注入到当前加载的页面：

```js
var ref = window.open('http://zwlme.com', '_blank', 'location=yes');
ref.addEventListener('loadstop', function() {
    ref.insertCSS({file: "mystyles.css"});
});
```

----------

> 相关文章:
>
> [PhoneGap入门教程(1) - 环境安装与配置]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-1.html)
>
> [PhoneGap入门教程(2) - 内核事件和基本用法]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-2.html)
>
> [PhoneGap入门教程(3) - 原生插件安装和管理]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-3.html)
>
> [PhoneGap入门教程(4) - 电量变化侦测]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-4.html)
>
> PhoneGap入门教程(5) - 程序内置浏览器窗口
>
> [PhoneGap入门教程(6) - 设备信息和系统提示]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-6.html)

<br>

> 参考资料：
>
> [Apache Cordova Documentation - InAppBrowser](http://cordova.apache.org/docs/en/3.3.0/cordova_inappbrowser_inappbrowser.md.html)

[img1]: {{site.BASE_PATH}}/img/post/PhoneGap-3/1.png
[img2]: {{site.BASE_PATH}}/img/post/PhoneGap-3/2.png
[img3]: {{site.BASE_PATH}}/img/post/PhoneGap-3/3.png
