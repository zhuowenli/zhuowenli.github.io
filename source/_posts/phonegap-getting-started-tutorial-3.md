---
title: PhoneGap入门教程(3) - 原生插件安装和管理
id: 27
categories: frontend
tags: [PhoneGap, Android, Webapp, javascript]
date: 2015-02-03
---

PhoneGap需要通过插件来实现访问设备本地API的功能，PhoneGap1.x 和 PhoneGap2.x 都内置了许多插件。 但是实践表明，并不是所有的应用程序都会用到这么多的插件，所以PhoneGap3.x将插件独立出来，有需要才安装。

<!-- more -->

## 安装和管理插件

一旦需要某个插件，可以用`phonegap plugin add`命令将这个插件添加到工程中，语法格式如下：

```html
phonegap plugin add 插件完全限定名
```

例如，“设备基本信息”插件的完全限定名是`org.apache.cordova.device`，那么就可以使用下列命名添加（注意先`cd`到工程目录）

```html
phonegap plugin add org.apache.cordova.device
```

![][img1]

### 查看开发环境中安装的插件

现在，在Eclipse中刷新工程，就可以在src目录下看到新增的插件类Device.java。并且在 www\plugins\ 目录下新增了目录：org.apache.cordova.device\www。在其下还有一个名为 device.js 的文件，这个文件包含了用于调用该插件API的JavaScript文件。

![][img2]

并且，在res/xml/config.xml 配置文件中会添加对插件的引用，`feature`节点表明这是一个插件

```xml
<feature name="Device">
    <param name="android-package" value="org.apache.cordova.device.Device" />
</feature>
```

并且，在www目录下的 cordova_plugins.js 文件中，也可以看到被改变的JavaScript代码，这些代码用于注册新的插件。

```js
cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata =
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.2.13"
}
// BOTTOM OF METADATA
});
```

注意，在Android上使用某些插件的功能就必须添加授权，例如震动功能等。如果使用了`phonegap plugin add`命令来安装震动功能插件，右击AndroidManifest.xml 并选择 Open With > Text Editer 打开该文件，就可以看到`uses-sdk`元素和`application`元素之间的权限设置。

```xml
<!-- 允许程序访问震动设备 -->
<uses-permission android:name="android.premission.VIBRATE" />
```

### 查看和删除插件

如果想删除已经安装的插件，可以用`phonegap plugin remove`命令将这个插件从工程中删除，语法格式如下：

```html
phonegap plugin remove 插件完全限定名
```

在删除之前，可以使用如下命令查看已经安装的插件

```html
phonegap plugin list
```

![][img3]

### PhoneGap3.x原生插件功能目录

PhoneGap3.x 官方有很多插件可以使用，下列是这些插件的列表极其功能的简单说明（**加粗**为热门插件）

- **`org.apache.cordova.device`**   设备基本信息
- **`org.apache.cordova.network-information`**   网络连接事件
- `org.apache.cordova.battery-status`   电量侦测事件
- `org.apache.cordova.device-motion`   重力加速计
- `org.apache.cordova.device-orientation`   罗盘（指南针）
- **`org.apache.cordova.geolocation`**   地理定位

- **`org.apache.cordova.camera`**   照相机
- `org.apache.cordova.media-capture`   捕获照片、视频
- `org.apache.cordova.media`   媒体播放
- **`org.apache.cordova.file`**   文件系统管理
- `org.apache.cordova.file-transfer`   文件传输
- **`org.apache.cordova.dialogs`**   对话框

- `org.apache.cordova.vibration`   振动
- `org.apache.cordova.contacts`   联系人管理
- `org.apache.cordova.globalization`   全球化
- **`org.apache.cordova.splashscreen`**   启动屏幕
- **`org.apache.cordova.inappbrowser`**   内置浏览器窗口
- **`org.apache.cordova.console`**   调试主控台

同时，可以从下面的网址查询PhoneGap3.x适用的第三方插件，这些第三方插件也可以用`phonegap plugin`命令进行管理。

[http://plugins.cordova.io/](http://plugins.cordova.io/)

----------

> 相关文章:
>
> [PhoneGap入门教程(1) - 环境安装与配置]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-1.html)
>
> [PhoneGap入门教程(2) - 内核事件和基本用法]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-2.html)
>
> PhoneGap入门教程(3) - 原生插件安装和管理
>
> [PhoneGap入门教程(4) - 电量变化侦测]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-4.html)
>
> [PhoneGap入门教程(5) - 程序内置浏览器窗口]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-5.html)
>
> [PhoneGap入门教程(6) - 设备信息和系统提示]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-6.html)

<br>

> 参考资料：
>
> [Cordova Plugin Registry](http://plugins.cordova.io/)

[img1]: https://st-qn.gittt.cn/2015/02/03/1.png
[img2]: https://st-qn.gittt.cn/2015/02/03/2.png
[img3]: https://st-qn.gittt.cn/2015/02/03/3.png
