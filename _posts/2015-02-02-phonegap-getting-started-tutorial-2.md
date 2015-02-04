---
layout: post
title: PhoneGap入门教程(2) - 内核事件和基本用法
subline: PhoneGap Getting Started Tutorial
categories: frontend
tags: [PhoneGap, Android, Webapp]
img: 28
---

PhoneGap的大量操作都是通过响应事件来完成，在PhoneGap的整个生命周期内有很多内建的事件。

通过事件处理，可以获取设备的信息，并根据这些信息来实现一个应用程序。

##PhoneGap基本开发

一旦创建了工程，PhoneGap的开发就变得非常简单，只需要编写 www 目录下的index.html文件就可以进行开发了。对于Android工程，这个目录的位置在F:\kypapp\platforms\android\assets\www下。

在开发的过程中，需要引用的相关资源，例如图片、CSS样式文件、JS文件等，这些文件也必须放在www目录及其子目录底下才正被正常调用。

打开index.html，你会发现这是一个标准的html5文档。不同的是必须引用cordova.js这个文件，这是网页与设备实现交互功能的关键。

phonegap.js同cordova.js是一致的，可以引用任意一个。还有cordova_plugins.js文件也是必须引用的，这个是很重要的文件，用于定义插件列表。

其他不需要的资源就可以删掉了。

##事件处理

PhoneGap的整个生命周期可能产生下面所列的事件，这些事件默认是内置的，无需安装插件。

- deviceready：PhoneGap在完全载入时，将触发该事件
- pause：      当应用程序放在后台运行时，将触发该事件
- resume：     当应用程序从后台恢复到前台时，将触发该事件。
- backbutton： 在使用者按後退按钮时，将触发该事件。
- menubutton： 在使用者按功能表按钮时，将触发该事件。
- searchbutton：當使用者按 Android 上的搜尋按钮时，将触发该事件。
- startcallbutton： 當使用者按下開始呼叫按钮时，将触发该事件。
- endcallbutton：   當使用者按下結束通話按钮时，将触发该事件。
- volumedownbutton：当按下volume down调低音量按钮时触发事件
- volumeupbutton：  当按下volume up调高音量按钮时触发事件

但是，并不是所有的设备都支持这些事件，有一些可能是设备不支持，或者有的手机没有搜索、通话等按钮。

###内核事件

内核事件是设备运行时产生的包括`deviceready`、`pause`、`resume`事件。

####deviceready事件

只有当PhoneGap被完全加载才会触发该事件，对于任何一个PhoneGap应用程序来说，这个事件都十分重要，是一定会使用的。

为了安全起见，应该在DOM加载完毕后使用`document.addEventListener`附加`deviceready`事件监听器。

```js
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
}
```

完整实例：

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello World</title>
    </head>
    <body>
        <div class="app"></div>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript">
	        // 当DOM加载完毕，注册deviceready事件监听
	        function onLoad() {
	        	document.addEventListener("deviceready", onDeviceReady, false);
	        }
	        // 注册事件监听
	        function onDeviceReady() {
	        	//...
	        }
	        onLoad();
        </script>
    </body>
</html>
```

####pause和resume事件

当程序被放到后台的时候执行pause事件，当程序从后台恢复到前台执行的时候将触发resume事件。

注册相应的监听，可以用于处理相应的事件：

```js
function onLoad() {
	// 当DOM加载完毕，注册deviceready事件监听
	document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady(){
	// 注册事件监听
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
}
// 处理pause事件
function onPause(){
	console.log("-------------------pause-------------------");
}
// 处理resume事件
function onResume(){
	console.log("-------------------resume-------------------");
}
```

###侦听设备按键

一些设备带有功能键，如标准安卓设备就带有菜单键、返回键、搜索键等。在安卓4.0后可以取消上下左右、通话、搜索等按键。PhoneGap应用程序可以检测这些按键是否被点击，通过事件处理程序就可以自定义对这些操作的响应。

####backbutton事件

当用户点击后退按键时触发该事件，注意不是所有设备都提供了返回按键，因此一些设备不支持该事件。

当点击后退按钮时，系统一般会有一个默认的响应行为。如果想重写该行为，可以通过注册一个事件监听器来监听该行为。

```js
document.addEventListener("backbutton", yourCallbackFunction, false);
```

如果注册了该事件，默认的行为将会被取消掉。例如在Android系统上，点击后退按钮可以把程序放到后台，但是注册该事件后此默认行为将会被取消掉。

iOS没有后退键，所以不支持该程序。

####menubutton事件

当用户点击菜单按键时触发该事件，注意不是所有设备都提供了返回按键，因此一些设备不支持该事件。

```js
document.addEventListener("menubutton", yourCallbackFunction, false);
```

iOS没有菜单键，所以不支持该程序。

####searchbutton事件

当用户点击搜索按键时触发该事件，注意不是所有设备都提供了返回按键，因此一些设备不支持该事件。

```js
document.addEventListener("searchbutton", yourCallbackFunction, false);
```

iOS没有搜索键，所以不支持该程序。

####startcallbutton事件

当用户点击通话按键时触发该事件，注意不是所有设备都提供了返回按键，因此一些设备不支持该事件。

```js
document.addEventListener("startcallbutton", yourCallbackFunction, false);
```

注意，该事件仅适用于BlackBerry(OS10.0+)，Android和iOS不支持该事件。

####endcallbutton事件

当用户点击挂机按键（即通话结束键）时触发该事件，注意不是所有设备都提供了返回按键，因此一些设备不支持该事件。

```js
document.addEventListener("endcallbutton", yourCallbackFunction, false);
```

注意，该事件仅适用于BlackBerry(OS10.0+)，Android和iOS不支持该事件。

####volumeupbutton事件

当用户点击调高音量按键时触发该事件，注意不是所有设备都提供了返回按键，因此一些设备不支持该事件。

```js
document.addEventListener("volumeupbutton", yourCallbackFunction, false);
```

注意，该事件仅适用于BlackBerry(OS10.0+)，Android和iOS不支持该事件。

####volumedownbutton事件

当用户点击调低音量按键时触发该事件，注意不是所有设备都提供了返回按键，因此一些设备不支持该事件。

```js
document.addEventListener("volumedownbutton", yourCallbackFunction, false);
```

注意，该事件仅适用于BlackBerry(OS10.0+)，Android和iOS不支持该事件。

----------


> 相关文章:
>
> [PhoneGap入门教程(1) - 环境安装与配置]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-1.html)
>
> PhoneGap入门教程(2) - 内核事件和基本用法
>
> [PhoneGap入门教程(3) - 原生插件安装和管理]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-3.html)
>
> [PhoneGap入门教程(4) - 电量变化侦测]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-4.html)
>
> [PhoneGap入门教程(5) - 程序内置浏览器窗口]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-5.html)

<br>

> 参考资料：
>
> [Apache Cordova Documentation](http://cordova.apache.org/docs/zh/3.1.0/cordova_events_events.md.html#deviceready)
