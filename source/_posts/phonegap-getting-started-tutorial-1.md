---
title: PhoneGap入门教程(1) - 环境搭建与配置
id: 30
categories: frontend
tags: [PhoneGap, NodeJS, Android, Webapp, JavaScript]
date: 2015-01-31
---

PhoneGap是一能够让你用普通的web技术编写出能够轻松调用API接口和进入应用商店的HTML5应用开发平台。

是唯一的一个支持7个平台的开源移动框架。它的优势是无以伦比的：开发成本低——据估算，至多Native App的五分之一！

PhoneGap就是一种中间件技术，可以通过搭建一个webview来执行网页程序，并且可以提供调用底层API的接口。本教程将会介绍如何在windows下开发android应用。IOS版本有时间另外讲。

<!-- more -->

## PhoneGap安装与配置

### 安装与配置

我们将使用NodeJS来管理开发。我们可以从下面的网址下载NodeJS。

[http://nodejs.org/](http://nodejs.org/)

如图，NodeJS会判断操作系统，不同系统INSTALL按钮指向的链接也不同。

![][img1]

### 安装PhoneGap

Android开发是在windows上进行的，所以下载windows版的NodeJS。安装好NodeJS之后，其中会包含了npm这个管理器。

从windows开始菜单选择“Node.js command prompt”应用，并执行。会打开一个命令行工具，这将自动设置npm管理器环境。

![][img2]

下面我们使用命令行来进行安装。

```html
npm install phonegap
```

回车执行后会自动下载最新版本的PhoneGap，过段时间即可安装完成。安装完成后，可在下面的位置看到phonegap文件夹，说明下载安装完成。

```html
C:\Users\用户名\AppData\Roaming\npm\node_modules\
```

![][img3]

## 建立PhoneGap for Android开发和测试环境

要为Android开发原生应用程序，一般会使用Eclipce这个IDE，并且在上面安装专门用于android开发的插件：ADT。

无论任何环境进行android应用程序开发都需要Android SDK 支持才行。

当然，Google已经封装了一个包含Eclipce、ADT、Android SDK的集成开发包提供下载。

```html
http://developer.android.com/sdk
```

### 安装ANT和配置环境

PhoneGap需要Apache Ant来编译工程，因此需要装Apache Ant，可以从下面的网址下载：

```html
http://ant.apache.org/bindownload.cgi
```

![][img4]

下载的ANT仅仅是个压缩包，只需解压到一个目录就行。我将之解压到(D:\Application\Android\ant)目录下，然后还要配置环境变量`ANT_HOME`指向这个文件位置。

为了在命令行中方便使用ant命令，我们可以将ant的bin路径添加到PATH变量中。

```html
;%ANT_HOME%\bin
```

这里的`%ANT_HOME%`实际上是使用前面定义的`ANT_HOME`环境变量。

![][img5]

![][img6]

### 配置Android环境

此外，还要配置Android环境变量。添加`ANDROID_HOME`环境变量，指向SDK目录(D:\Application\Android\sdk)，然后添加到PATH中。

```html
;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

这些同Android开发一样，这里就不再赘述了。

## 创建PhoneGap工程

下面我们使用PhoneGap来创建一个工程。使用管理员身份打开一个命令行窗口(cmd)，使用`cd`命令进入一个目录，将会在该目录创建工程。

使用PhoneGap create命令创建工程，命令如下：

```html
phonegap create <工程路径> <包名> <工程名>
```

例如：

```html
phonegap create kypapp "zhuowenli.kyp.com" "HelloWorld"
```

第一次参数对应的是创建的工程的目录(kypapp)，第二个参数是包名，第三个参数是程序名称，也就是安装打包后在手机上显示的名称。

![][img7]

执行后就会在F:\kypapp目录下创建PhoneGap工程，如图：

![][img8]

### 为PhoneGap工程添加Android平台

PhoneGap工程创建完成后还不知道要在哪种平台上开发和部署程序，可选的平台有很多，如Android，IOS，WP8，blackberry10等等。如果你要添加哪个平台，就必须事先添加这个平台的SDK。我们现在来创建Android平台。

首先cd进入PhoneGap工程目录

```html
cd kypapp
```

然后调用下面命令添加Android平台。

```html
phonegap build android
```

![][img9]

并且在F:\kypapp\platforms目录下，将可以看到配置好的Android文件夹。

![][img10]

## 使用ADT进行PhoneGap开发

启动Eclipse。

![][img11]

初次启动需要指定Android SDK的目录。单机“Browser...”按钮导航到D:\Application\Android\sdk目录。

![][img12]

点击OK后就可以进入开发环境了。

- **步骤1**  在主菜单上选择“File > New > Project”菜单栏，打开就能看到Android相关工程
  ![][img13]
- **步骤2**  选择“Android Project from Existing Code”目录，点击Next
  ![][img14]
- **步骤3**  点击“Browser...”按钮，导航到F:\kypapp\platforms\android目录（刚刚用PhoneGap添加的Android平台目录），将会在下面创建两个工程。
  ![][img15]
- **步骤4**  右击HelloWorld主目录，选择“Properties > Resource Filters”,删除“Exclude all:”下面的两条信息（选中，点击右侧Remove），然后点击OK。
  ![][img16]
  会发现assets底下多了个www文件夹啦。然后res下面的www文件夹可以删掉了。如图：
  ![][img17]

接下来在包浏览器中，打开“src > zhuowenli.kyp.com > CordovaApp.java”，这是主Java文件。
删除或注释掉下面一行代码：

```html
loadUrl(launchUrl);
```

替换为下面这行代码：

```html
super.loadUrl("file:///android_asset/www/index.html");
```

![][img18]

ok, 配置成功了。 接下来可以在菜单栏点击“Run As > Android Application”，就可以在AVD或者手机设备打包apk，并安装了。

[img1]: https://st-qn.gittt.cn/2015/01/31/1.png
[img2]: https://st-qn.gittt.cn/2015/01/31/2.png
[img3]: https://st-qn.gittt.cn/2015/01/31/3.png
[img4]: https://st-qn.gittt.cn/2015/01/31/4.png
[img5]: https://st-qn.gittt.cn/2015/01/31/5.png
[img6]: https://st-qn.gittt.cn/2015/01/31/6.png
[img7]: https://st-qn.gittt.cn/2015/01/31/7.png
[img8]: https://st-qn.gittt.cn/2015/01/31/8.png
[img9]: https://st-qn.gittt.cn/2015/01/31/9.png
[img10]: https://st-qn.gittt.cn/2015/01/31/10.png
[img11]: https://st-qn.gittt.cn/2015/01/31/11.png
[img12]: https://st-qn.gittt.cn/2015/01/31/12.png
[img13]: https://st-qn.gittt.cn/2015/01/31/13.png
[img14]: https://st-qn.gittt.cn/2015/01/31/14.png
[img15]: https://st-qn.gittt.cn/2015/01/31/15.png
[img16]: https://st-qn.gittt.cn/2015/01/31/16.png
[img17]: https://st-qn.gittt.cn/2015/01/31/17.png
[img18]: https://st-qn.gittt.cn/2015/01/31/18.png

---------

> 相关文章:
>
> PhoneGap入门教程(1) - 环境安装与配置
>
> [PhoneGap入门教程(2) - 内核事件和基本用法]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-2.html)
>
> [PhoneGap入门教程(3) - 原生插件安装和管理]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-3.html)
>
> [PhoneGap入门教程(4) - 电量变化侦测]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-4.html)
>
> [PhoneGap入门教程(5) - 程序内置浏览器窗口]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-5.html)
>
> [PhoneGap入门教程(6) - 设备信息和系统提示]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-6.html)
