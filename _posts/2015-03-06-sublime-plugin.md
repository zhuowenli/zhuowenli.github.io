---
layout: post
title: sublime前端必备插件
subline: Sublime Plugin
categories: diary
tags: [sublime, plugin]
img: 33
---

代码编辑器或者文本编辑器，对于程序员来说，就像剑与战士一样，谁都想拥有一把可以随心驾驭且锋利无比的宝剑，而每一位程序员，同样会去追求最适合自己的强大、灵活的编辑器，相信你和我一样，都不会例外。

不得不说，sublime简直是前端开发人员日常居家旅行杀人放火的必备神器。小巧绿色且速度非常快，跨平台支持Win/Mac/Linux，支持32与64位，支持各种流行编程语言的语法高亮、代码补全等，而且有着很多其他编辑器没有的超酷的特性，让它的好用达到了前所未有的程度。

sublime不是免费的，但可以永久免费使用，只是在保存的时候，偶尔会弹出要你购买注册的对话框，仅此而已。

## 插件介绍

#### Package Control

功能：安装包管理

简介：sublime插件控制台，提供添加、删除、禁用、查找插件等功能

使用：<https://sublime.wbond.net/installation>

安装方法：

`` CTRL+` `` ，出现控制台
粘贴以下代码至控制台

ST2：

```text
import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')
```

ST3：

```text
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

其他方法：

如果以上方法不能安装，请使用下面的方法

1. 选择菜单：Preferences > Browse Packages
2. 打开sublime插件安装包文件夹
3. 下载文件并复制到打开的文件夹
4. 重启sublime

#### Emmet

功能：编码快捷键，前端必备

简介：Emmet作为zen coding的升级版，对于前端来说，可是必备插件，如果你对它还不太熟悉，可以在其官网（[http://docs.emmet.io/](http://docs.emmet.io/)）上看下具体的演示视频。

使用：教程-[http://docs.emmet.io/cheat-sheet/](http://docs.emmet.io/cheat-sheet/)、[http://peters-playground.com/Emmet-Css-Snippets-for-Sublime-Text-2/](http://peters-playground.com/Emmet-Css-Snippets-for-Sublime-Text-2/)

![][img1]

#### JSFormat

功能：Javascript的代码格式化插件

简介：很多网站的JS代码都进行了压缩，一行式的甚至混淆压缩，这让我们看起来很吃力。而这个插件能帮我们把原始代码进行格式的整理，包括换行和缩进等等，是代码一目了然，更快读懂~

使用：在已压缩的JS文件中，右键选择jsFormat或者使用默认快捷键（`Ctrl+Alt+F`）

![][img2]

#### Alignment

功能：`=`号对齐

简介：变量定义太多，长短不一，可一键对齐

使用：默认快捷键`Ctrl+Alt+A`和QQ截屏冲突，可设置其他快捷键如：`Ctrl+Shift+Alt+A`；先选择要对齐的文本

![][img3]

#### Clipboard History

功能：粘贴板历史记录

简介：方便使用复制/剪切的内容

使用：

- `Ctrl+alt+v`：显示历史记录
- `Ctrl+alt+d`：清空历史记录
- `Ctrl+shift+v`：粘贴上一条记录（最旧）
- `Ctrl+shift+alt+v`：粘贴下一条记录（最新）

![][img4]

#### Bracket Highlighter

功能：代码匹配

简介：可匹配`[]`, `()`, `{}`, `“”`, `”`, `<tag></tag>`，高亮标记，便于查看起始和结束标记

使用：点击对应代码即可

![][img5]

#### jQuery

功能：jQ函数提示

简介：快捷输入jQ函数，是偷懒的好方法

![][img6]

#### Doc​Blockr

功能：生成优美注释

简介：标准的注释，包括函数名、参数、返回值等，并以多行显示，手动写比较麻烦

使用：输入`/*`、`/**`然后回车，还有很多用法，请参照

<https://sublime.wbond.net/packages/DocBlockr>

![][img7]

#### ConvertToUTF8

功能：文件转码成utf-8

简介：通过本插件，您可以编辑并保存目前编码不被 Sublime Text 支持的文件，特别是中日韩用户使用的 GB2312，GBK，BIG5，EUC-KR，EUC-JP ，ANSI等。ConvertToUTF8 同时支持 Sublime Text 2 和 3。

使用：安装插件后自动转换为utf-8格式

![][img8]

#### AutoFileName

功能：快捷输入文件名

简介：自动完成文件名的输入，如图片选取

使用：输入`/`即可看到相对于本项目文件夹的其他文件

![][img9]

#### IMESupport

功能：sublime中文输入法

简介：还在纠结 Sublime Text 中文输入法不能跟随光标吗？试试「IMESupport 」这个插件吧！目前只支持 Windows，在搜索等界面不能很好的跟随光标。

使用：`Ctrl + Shift + P` → 输入pci → 输入IMESupport → 回车

![][img10]

#### Trailing spaces

功能：检测并一键去除代码中多余的空格

简介：还在纠结代码中有多余的空格而显得代码不规范？或是有处女座情节？次插件帮你实现发现多余空格、一键删除空格、保存时自动删除多余空格，让你的代码规范清爽起来

使用：安装插件并重启，即可自动提示多余空格。一键删除多余空格：`CTRL+SHITF+T`（需配置），更多配置请点击标题。快捷键配置：在Preferences / Key Bindings – User加上代码（数组内）

```html
{ "keys": ["ctrl+shift+t"], "command": "delete_trailing_spaces" }
```

![][img11]

#### GBK Encoding Support

功能：中文识别

简介：Sublime Text 2可识别UTF-8格式的中文，不识别GBK和ANSI，因此打开很多含中文的文档都会出现乱码。可以通过安装插件GBK Support,来识别GBK和ANSI。

使用：

- Open a GBK File
- Save file with GBK encoding
- Change file encoding from utf8 to GBK or GBK to utf8

![][img12]

#### CSSREM

功能：px值转rem

简介：一个CSS的px值转rem值的Sublime Text 3自动完成插件。

使用：

参数配置文件：Sublime Text -> Preferences -> Package Settings -> cssrem

- `px_to_rem` - px转rem的单位比例，默认为40。
- `max_rem_fraction_length` - px转rem的小数部分的最大长度。默认为6。
- `available_file_types` - 启用此插件的文件类型。默认为：[".css", ".less", ".sass"]。

[https://github.com/flashlizi/cssrem](https://github.com/flashlizi/cssrem)

![][img13]

[img1]: {{site.qiniu}}/2015/03/06/1.gif
[img2]: {{site.qiniu}}/2015/03/06/2.gif
[img3]: {{site.qiniu}}/2015/03/06/3.gif
[img4]: {{site.qiniu}}/2015/03/06/4.gif
[img5]: {{site.qiniu}}/2015/03/06/5.gif
[img6]: {{site.qiniu}}/2015/03/06/6.gif
[img7]: {{site.qiniu}}/2015/03/06/7.gif
[img8]: {{site.qiniu}}/2015/03/06/8.gif
[img9]: {{site.qiniu}}/2015/03/06/9.gif
[img10]: {{site.qiniu}}/2015/03/06/10.gif
[img11]: {{site.qiniu}}/2015/03/06/11.gif
[img12]: {{site.qiniu}}/2015/03/06/12.jpg
[img13]: {{site.qiniu}}/2015/03/06/13.gif
