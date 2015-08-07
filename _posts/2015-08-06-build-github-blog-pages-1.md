---
layout: post
title:  通过GitHub Pages创建博客（一）
subline: Build GitHub Blog Pages
categories: frontend
tags: [github, github pages, jekyll]
---

本系列文章将会教你如何通过GitHub，在GitHub上创建自己的博客或者项目主页。这里只是把自己在使用GitHub开发过程中的经验和总结分享给大家，方便大家逐步开始GitHub之旅。

[GitHub](https://github.com/)不仅为程序员提供了免费源代码托管空间，还为程序员提供了一个社交平台。不但允许大家在GitHub上创建自己的博客网站或主页（[github pages](https://pages.github.com/)），并且免费，不限流量，还可以绑定自己的域名。

但是GitHub提供的主页实际上是基于GitHub的源代码实现的，所以只支持上传静态的网页，不能在上面创建真正的博客系统。不过，万幸的是，GitHub支持一种叫[jekyll](http://jekyllcn.com/)的静态页面模板引擎，也就是说只要上传符合jekyll规范的文件，GitHub会用这种模板引擎为你转化静态页面和网站。

##关于jekyll

这个jekyll到底是什么？

实际上jekyll本质上就是一个**模板转化引擎**。同时它也是GitHub上的一个开源项目：[Jekyll](https://github.com/jekyll/jekyll)

jekyll本身基于Ruby，也可以看成是一种模板引擎[liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)的扩展。jekyll对liquid的主要扩展在于两点：

- 内建专用于博客网站的对象，可以在模板中引用这些对象：`page`、`site`等
- 对liquid进行了扩展，方便构建博客网站

类似其他的模板引擎一样，**标记**是模板引擎解析的关键，liquid设计了如下两种标记：

{% raw %}
- `{{ }}`：此标记表征的是将其中的变量转化成文本
- `{% %}`：此标记用于包含控制流关键字，比如：`{% if %}`、`{% for x in xx %}`
{% endraw %}

显而易见的是，有了这种标记的支持，再加上jekyll内建的对象，构建网站就方便不少了。

可能有朋友会更其他的服务器端脚本语言比较，比如`jsp`、`php`…，但是一定要记得的是，jekyll对模板的解析仅仅只有一次，它的目的就是将模板一次性的转化成静态网站，而不是上述的动态网站脚本语言。

更多内容可以去阅读jekyll的[帮助文档][jekyllcn]，或者GitHub

##关于GitHub-Pages

github-pages是一个免费的静态网站托管平台，由github提供，它具有以下几个特点：

- 无限免费空间，无限免费流量
- 具有项目主页和个人主页两种选择
- 支持页面生成，可以使用jekyll来布局页面，使用markdown来书写正文
- 可以自定义域名

对于普通的博主来说，用项目主页或者个人主页并无所谓。更多关于主页类型，请参见：[User, Organization and Project Pages](https://help.github.com/articles/user-organization-and-project-pages "https://help.github.com/articles/user-organization-and-project-pages")

github-pages**仅仅**为我们提供了**静态页面的托管**，不要说不能用wordpress，连基本的评论，访问统计都得自己想办法（幸好都有解决方案，接下去我们会慢慢介绍）。


###创建项目仓库

在创建博客之前，还需要用自己的帐号创建一个项目。在Git中，项目被称为仓库(Repository)，仓库顾名思义，当然可以包含代码或者非代码。将来我们的网页或者模板实际上都是保存在这个仓库中的。

登录后，访问[https://github.com/new](https://github.com/new)，创建仓库。


###项目主页

**项目主页**的目的是为项目提供一个展示功能的网页，方便项目推广。但是也可以用来做个人博客。对于博客来说，博客的整个网站目录必须是项目仓库的`gh-pages`分支。

通过[https://pages.github.com/](https://pages.github.com/)上的向导，可以在你的项目仓库中创建这样的分支，并且github还提供了多种模板供你选择：

![][themes]

通过向导自动创建的项目的访问地址类似这样`http://username.github.io/仓库名/`，在使用自定义域名前，你需要通过这样的链接访问项目主页。它是一个纯粹为项目推广准备的，因此并没有博客的结构，但是自定义模板的功能确实很不错。

手动创建分支的方法，也很简单，可以参考[Creating Project Pages manually](https://help.github.com/articles/creating-project-pages-manually)

###个人主页

每个帐号只能有一个仓库来存放个人主页，而且仓库的名字必须是`username/username.github.io`，这是特殊的命名约定。你可以通过`http://username.github.io`来访问你的个人主页。

通过向导很容易创建一个仓库，并测试成功。不过，同样的，没有博客的结构。需要注意的个人主页的网站内容是在master分支下的。

例如本站项目地址：[zhuowenli.github.io][zhuowenli.github.io]

##本地环境搭建

创建了仓库后，我们就需要管理它，无论是管理本地仓库还是远程仓库都需要Git客户端。Git客户端实际上十分强大，它本身就可以offline的创建本地仓库，而本地仓库和远程仓库之间的同步也是通过Git客户端完成的。

MAC下只要两行命令就可以安装好Git。打开终端，输入：

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
Homebrew可以很方便的在OS X下安装一些工具包。

```bash
brew install git
```

这里省略了windows下安装和使用Git客户端的基本技巧，你可以访问 [这个网站](http://git-scm.com/ "http://git-scm.com/") 下载Git客户端。具体步骤请自行谷歌百度。

###安装Ruby

jekyll本身基于Ruby开发，因此，想要在本地构建一个测试环境需要具有Ruby的开发和运行环境。

MAC默认带有ruby的运行环境了，这个步骤可以跳过。

至于在windows下，可以使用[Rubyinstaller](http://rubyinstaller.org/downloads/)安装。windows的安装还是一如既往的“无脑”，不多说了。

至于Linux下可以参考[如何快速正确的安装 Ruby, Rails 运行环境](https://ruby-china.org/wiki/install_ruby_guide)。

_附：[ruby安装说明](http://www.ruby-lang.org/zh_cn/downloads/)_

如果想要快速体验ruby开发，可以参考：[20分钟体验 Ruby](http://www.ruby-lang.org/zh_cn/documentation/quickstart/)

###安装Bundle

Ruby Rails 3 中引入Bundle来管理项目中所有gem依赖，该命令只能在一个含有Gemfile的目录下执行。这里使用Bundle，可以很方便的帮我们安装好那些乱七八糟的环境。

打开你安装好的`Git Bash`，或者MAC下的`终端`。然后直接使用下面命令安装即可：

```bash
$ gem install bundle
```

###Gemfile和Bundle安装

在根目录下创建一个叫`Gemfile`的文件，注意没有后缀，打开文件，输入以下内容：

```bash
source 'http://ruby.taobao.org/'
gem 'github-pages'
```

保存后，在命令行中执行

```bash
$ bundle install
```

该命令会根据当前目录下的Gemfile，安装所需要的所有软件。这一步所安装的东西，可以说跟github本身的环境是完全一致的，所以可以确保本地如果没有错误，上传后也不会有错误。而且可以在将来使用下面命令，随时更新环境，十分方便。

```bash
$ bundle update
```

###项目展示

接下来我们把，创建好的GitHub仓库**clone**到本地，例如：

```bash
$ git clone https://github.com/zhuowenli/zhuowenli.github.io.git
```

进入clone到本地的这个文件夹

```bash
$ cd zhuowenli.github.io
```


使用下面命令，就可以启动本地服务：

```bash
$ bundle exec jekyll serve
```

![][jekyll]

如图，每当本地的文件发生改变时，jekyll会自动编译发生改变的文件，在`_site`文件夹里面生成用来展示的静态html页面。

jekyll此时会在localhost的4000端口监听http请求，用浏览器访问[http://localhost:4000/][localhost]，本地的页面出现了！

![][localhost:4000]

至此，我们就知道了如何创建一个博客站，并且在线上及本地环境运行。接下来我会继续教大家如何从无到有一步一步的自定义创建博客，组织编辑内容，域名解析，评论统计等等。

敬请期待~

[localhost:4000]:{{site.qiniu}}/2015/08/06/localhost.png
[themes]:{{site.qiniu}}/2015/08/06/themes.png
[jekyll]:{{site.qiniu}}/2015/08/06/jekyll.png


[localhost]:http://localhost:4000/ "http://localhost:4000/"
[jekyllcn]:http://jekyllcn.com/ "http://jekyllcn.com/"
[zhuowenli.github.io]:https://github.com/zhuowenli/zhuowenli.github.io "https://github.com/zhuowenli/zhuowenli.github.io"