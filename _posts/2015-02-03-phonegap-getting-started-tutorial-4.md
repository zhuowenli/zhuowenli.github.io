---
layout: post
title: PhoneGap入门教程(4) - 电量变化侦测
subline: PhoneGap Getting Started Tutorial
categories: frontend
tags: [PhoneGap, Android, Webapp]
img: 30
---

电量侦测插件提供了一系列事件，通过事件对象来返回电量使用情况。

电量状态的变化会触发下列几个事件：

- batterycritical 当程序侦测到电量降低到临界点时，触发该事件
- batterystatus   当程序侦测到电量至少发生1%的改变时，触发该事件
- batterylow      当程序侦测到电量降低到一个较低水平值时，触发该事件

##插件安装

电量侦测插件的完全限定名是`org.apache.cordova.battery-status`，可以使用下面的命令安装插件

```html
cordova plugin add org.apache.cordova.battery-status
```

###batterystatus事件

当程序侦测到电量至少发生1%的改变时，触发该事件。另外，当设备连接或断开电源也会触发该事件。

```js
window.addEventListener("batterystatus", yourCallbackFunction, false);
```

事件处理程序包含一个参数，该参数是一个对象，该对象包含以下两个属性：

- level: 获取电池电量的百分比(值范围是0-100). (Number)

- isPlugged: 表示是否连接电源. (Boolean)

例如下面的代码，用于监控电源状态：

```js
window.addEventListener("batterystatus", onBatteryStatus, false);

function onBatteryStatus(info) {
    console.log("电池电量: " + info.level + " 是否充电: " + info.isPlugged);
}
```


###batterycritical事件

当程序侦测到电量降低到临界点时，触发该事件。临界点的值由设备指定。

```js
window.addEventListener("batterycritical", yourCallbackFunction, false);
```

事件处理程序包含一个参数，该参数是一个对象，该对象包含以下两个属性：

- level: 获取电池电量的百分比(值范围是0-100). (Number)

- isPlugged: 表示是否连接电源. (Boolean)

```js
window.addEventListener("batterycritical", onBatteryCritical, false);

function onBatteryCritical(info) {
    alert("电池电量过低，仅剩 " + info.level + "%\n快去充电吧!");
}
```

###batterylow事件

当程序侦测到电量降低到一个较低水平值时，触发该事件。水平值由设备指定。

```js
window.addEventListener("batterylow", yourCallbackFunction, false);
```

事件处理程序包含一个参数，该参数是一个对象，该对象包含以下两个属性：

- level: 获取电池电量的百分比(值范围是0-100). (Number)

- isPlugged: 表示是否连接电源. (Boolean)

```js
window.addEventListener("batterylow", onBatteryLow, false);

function onBatteryLow(info) {
    alert("电池电量过低，仅剩 " + info.level + "%");
}
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
> PhoneGap入门教程(4) - 电量变化侦测
>
> [PhoneGap入门教程(5) - 程序内置浏览器窗口]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-5.html)
>
> [PhoneGap入门教程(6) - 设备信息和系统提示]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-6.html)

<br>

> 参考资料：
>
> [org.apache.cordova.battery-status](https://github.com/apache/cordova-plugin-battery-status/blob/master/doc/index.md)


[img1]: {{site.BASE_PATH}}/img/post/PhoneGap-3/1.png
[img2]: {{site.BASE_PATH}}/img/post/PhoneGap-3/2.png
[img3]: {{site.BASE_PATH}}/img/post/PhoneGap-3/3.png