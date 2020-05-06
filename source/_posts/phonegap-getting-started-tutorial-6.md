---
title: PhoneGap入门教程(6) - 设备信息和系统提示
id: 25
categories: frontend
tags: [PhoneGap, Android, Webapp, javascript]
date: 2015-02-10
---

PhoneGap可以获取设备的相关信息。并且，在事件处理和其他操作中，会经常用到的基本操作就是使用系统提示，例如警告框、提示框、震动、蜂鸣等。

<!-- more -->

## 获取设备的基本信息

设备信息插件的完全限定名是`org.apache.cordova.device`，可以使用下列命令进行安装

```html
cordova plugin add org.apache.cordova.device
```

一旦安装了插件，就可以使用该插件公开的几个属性。这几个属性使用`window.device`对象可以访问，这些属性包含了设备硬件信息和软件相关信息：

- `device.cordova`： 获取Cordova版本号
- `device.platform`： 获取设备的操作系统名称。例如"Android"、"BlackBerry 10"、"iOS"、"WinCE"、"Tizen"等。

    ```js
    //   - "Android"
    //   - "BlackBerry 10"
    //   - Browser:         returns "MacIntel" on Mac
    //                      returns "Win32" on Windows
    //   - "iOS"
    //   - "WinCE"
    //   - "Tizen"
    var devicePlatform = device.platform;
    ```

- `device.uuid`：    获取设备的通用唯一识别码 (Universally Unique Identifier)

    ```js
    // Android: Returns a random 64-bit integer (as a string, again!)
    //          The integer is generated on the device's first boot
    //
    // BlackBerry: Returns the PIN number of the device
    //             This is a nine-digit unique integer (as a string, though!)
    //
    // iPhone: (Paraphrased from the UIDevice Class documentation)
    //         Returns a string of hash values created from multiple hardware identifies.
    //         It is guaranteed to be unique for every device and can't be tied
    //         to the user account.
    // Windows Phone 7 : Returns a hash of device+current user,
    // if the user is not defined, a guid is generated and will persist until the app is uninstalled
    // Tizen: returns the device IMEI (International Mobile Equipment Identity or IMEI is a number
    // unique to every GSM and UMTS mobile phone.
    var deviceID = device.uuid;
    ```

- `device.version`： 返回操作系统版本号

    ```js
    // Android:    Froyo OS would return "2.2"
    //             Eclair OS would return "2.1", "2.0.1", or "2.0"
    //             Version can also return update level "2.1-update1"
    //
    // BlackBerry: Torch 9800 using OS 6.0 would return "6.0.0.600"
    //
    // Browser:    Returns version number for the browser
    //
    // iPhone:     iOS 3.2 returns "3.2"
    //
    // Windows Phone 7: returns current OS version number, ex. on Mango returns 7.10.7720
    // Tizen: returns "TIZEN_20120425_2"
    var deviceVersion = device.version;
    ```

- `device.model`：   返回设备的型号名称，其内容一般上是设备生产商所设。即使是同一款产品，如果其系统版本号不同，返回的`device.name`的内容也可能不一样。

    ```js
    // Android:    Nexus One       returns "Passion" (Nexus One code name)
    //             Motorola Droid  returns "voles"
    // BlackBerry: Torch 9800      returns "9800"
    // Browser:    Google Chrome   returns "Chrome"
    //             Safari          returns "Safari"
    // iOS:     for the iPad Mini, returns iPad2,5; iPhone 5 is iPhone 5,1. See http://theiphonewiki.com/wiki/index.php?title=Models
    //
    var model = device.model;
    ```

## 系统消息提示对话框

系统消息提示对话框插件的完全限定名是`org.apache.cordova.dialogs`，可以使用下列命令进行安装

```html
cordova plugin add org.apache.cordova.dialogs
```

一旦安装了插件，就可以使用该插件公开的几个方法，他们都可以使用`window.navigator`对象访问。

- `navigator.notification.alert()`： 弹出对话框
- `navigator.notification.confirm()`： 弹出确认对话框
- `navigator.notification.prompt()`： 提示输入消息对话框

这几个方法与JavaScript内建的同名方法有些不同，它们调用的是系统内置的对话框。

### 提示警告框

`notification.alert()`方法弹出一个可以定制的警告或者对话窗口，语法格式如下：

```js
navigator.notification.alert(message, alertCallback, [title], [buttonName])
```

- `message`: 对话框信息. (String)

- `alertCallback`: 定义当警告对话框关闭的时候被调用的回调函数. (Function)

- `title`: 对话框标题. (String) (可选, 默认为`Alert`)

- `buttonName`: 按钮标签. (String) (可选, 默认为`OK`)

事例：

```js
function alertDismissed() {
    // do something
}

navigator.notification.alert(
    'You are the winner!',  // message
    alertDismissed,         // callback
    'Game Over',            // title
    'Done'                  // buttonName
);
```

### 确认对话框

`notification.confirm()`方法弹出一个可以定制的确认对话框，语法格式如下：

```js
navigator.notification.confirm(message, confirmCallback, [title], [buttonLabels])
```

- `message`: 对话框信息. (String)

- `confirmCallback`: 定义一个回调函数，按下按钮后触发此回调函数。该回调函数的参数为按下按钮的索引，也就是参数`buttonLabels`所定义的标签顺序。注意索引是从1开始的。 (Function)

- `title`: 对话框标题. (String) (可选, 默认为`Confirm`)

- `buttonLabels`: 定义按钮标签，如果声明多个按钮，那么该参数的值是以逗号为分隔符的字符串，顺序用作按钮标签。Android最多支持3个按钮，并且Android3.0之后序号按相反的顺序排列。 (Array) (可选, 默认为[`OK,Cancel`])

举个栗子：

```js
function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}

navigator.notification.confirm(
    'You are the winner!', // message
     onConfirm,            // callback to invoke with index of button pressed
    'Game Over',           // title
    ['Restart','Exit']     // buttonLabels
);
```

### 提示输入消息对话框

有时候需要用户输入一些消息来进行判断，而不仅仅是‘是’和‘否’，使用`notification.prompt()`方法可以实现这个目的。语法格式如下：

```js
navigator.notification.prompt(message, promptCallback, [title], [buttonLabels], [defaultText])
```

- `message`: 对话框信息. (String)

- `promptCallback`: 定义一个回调函数，按下按钮后触发此回调函数。该回调函数的参数是一个Object对象，其中包含两个属性： (Function)
    - 属性`buttonIndex`为按下按钮的索引，也就是参数`buttonLabels`所定义的标签顺序，注意索引是从1开始的；
    - 属性`input1`是输入文本的内容。

- `title`: 对话框标题. (String) (可选, 默认为`Prompt`)

- `buttonLabels`: 定义按钮标签，如果声明多个按钮，那么该参数的值是以逗号为分隔符的字符串，顺序用作按钮标签。Android最多支持3个按钮，并且Android3.0之后序号按相反的顺序排列。 (Array) (可选, 默认为[`OK,Cancel`])

- `defaultText`: 在输入框中显示预置的信息。 (String) (可选, 如果不定义，文本框中默认为空白)

举个栗子：

```js
function onPrompt(results) {
    alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
}

navigator.notification.prompt(
    'Please enter your name',  // message
    onPrompt,                  // callback to invoke
    'Registration',            // title
    ['Ok','Exit'],             // buttonLabels
    'Jane Doe'                 // defaultText
);
```

## 系统震动和蜂鸣提示

这个插件与[W3C震动规范](http://www.w3.org/TR/vibration/)对齐。

系统震动和蜂鸣提示插件的完全限定名是`org.apache.cordova.vibration`，可以使用下列命令进行安装

```html
cordova plugin add org.apache.cordova.vibration
```

一旦安装了插件，就可以使用该插件公开的几个方法，他们都可以使用`window.navigator`对象访问。

- `navigator.notification.beep()`： 弹出对话框
- `navigator.notification.vibrate()`： 弹出确认对话框

### 触发设备蜂鸣

使用`notification.beep()`方法可以使设备发出beep声。语法格式如下：

```js
navigator.notification.beep(times);
```

- `times`: 定义beep声重复的次数. (Number)

举个栗子：

```js
// Beep twice!
navigator.notification.beep(2);
```

#### 注意事项

- Android系统会播放在“Settings/Display & Sound”面板内指定的通知铃声(Notification ringtone).
- iOS将忽略控制发声的次数
  iOS没有原生的Beep API，PhoneGap通过使用多媒体API播放音频文件来实现播放beep声。因此，用户必须提供一个beep声音频文件，并且此文件的播放时长必须少于30s，该文件位于 www 根目录下，而且只能命名为 beep.wav 。
- **PhoneGap最新API把该方法归纳到上面设备基本信息上。**

### 触发设备震动

使用`navigator.vibrate()`方法可以使设备在指定时长震动。语法格式如下：

```js
navigator.vibrate(time)
```

or

```js
navigator.vibrate([time])
```

- `times`: 定义以毫秒为时长来震动设备，1000毫秒为1秒. (Number)

举个栗子：

```js
// Vibrate for 3 seconds
navigator.vibrate(3000);

// Vibrate for 3 seconds
navigator.vibrate([3000]);
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
> [PhoneGap入门教程(5) - 程序内置浏览器窗口]({{ site.SITE_PATH }}/frontend/phonegap-getting-started-tutorial-5.html)
>
> PhoneGap入门教程(6) - 设备信息和系统提示

<br>

> 参考资料：
>
> [Apache Cordova Plugin dialogs](https://github.com/apache/cordova-plugin-dialogs/blob/master/doc/index.md)
>
> [Apache Cordova Plugin vibration](https://github.com/apache/cordova-plugin-vibration/blob/master/doc/index.md)
