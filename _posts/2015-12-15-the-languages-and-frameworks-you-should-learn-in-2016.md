---
layout: post
title:  2016年你应该学习的语言和框架
subline: The Languages And Frameworks You Should Learn In 2016
categories: frontend
tags: [javascript, front-end]
---

2015年，软件开发界发生了很多变化。有很多流行的新语言发布了，也有很多重要的框架和工具发布了新版本。下面有一个我们觉得最重要的简短清单，同时也有我
们觉得值得你在2016年花时间精力去学习的新事物的一些建议。

![][1]

## 大趋势

在过去的几年里，有一个越来越明显的趋势是web应用的商业逻辑逐步从后端转移到了前端，然后后端变得只需要处理简单的数据API。这就让前端开发框架的选择变得尤为重要了。

另外一个重要的改变是2015年发布的 Edge 浏览器。这是IE的替代品，拥有全新的界面和更好的性能。跟IE不一样的是它同样采用了跟 FireFox 和 Chrome 一样的快速发布策略。这让JavaScript 开发者社区能够以周为单位获得最新版JavaScript 和 Web标准特性支持而不是像过去一样需要等很多年。

## 语言和平台

![][2]

**Python 3.5** 在今年发布了，带来了很多[新特性](https://docs.python.org/3/whatsnew/3.5.html) 比如 Asyncio,，为你带来了类似 node.js 的事件机制，还有type hints。 鉴于Python 3 终于真正地火起来了我们强烈建议你替换掉 Python 2. 几乎所有的库都已经支持 Python 3 了，所以现在是一个升级你的历史遗留代码的好时机。

**PHP 7** 是一个重大的新版本，这个版本修复了很多问题并且带来了新特性和性能提升（[看看概览](http://php.net/manual/en/migration70.new-features.php)） 。 PHP 7 大约比 PHP 5.6 快2倍， 这对一些大型项目还有WordPress 和 Drupal之类的CMS系统影响很大。 我们强烈推荐 [PHP之道](http://laravel-china.github.io/php-the-right-way/)，已经更新到最新的PHP7版本。 如果你需要更快的速度并且不介意换一个解释引擎的话，可以试试Facebook在用的 [HHVM](http://hhvm.com/)。

**JavaScript** 也以ES2015 标准 (大家通常叫做 ES6)的形式发布了更新。 为我们带来了激动人心的[新功能](https://github.com/lukehoban/es6features)。 感谢大多数浏览器版本的快速更新， 对 ES2015 的支持已经非常棒了，并且还有 Babel.js 这样的工具可以让你的新代码跑在低版本浏览器上。

**Node.js** 在这一年变化很多，开发者社区曾经分裂成 Node.js 和 io.js，然后又再度合并。 经历过这些之后的结局就是我们得到了一个有很多代码贡献者积极维护的项目，并且拥有了两个版本的 Node ： 一个稳定的LTS (长期支持) 版本，这个版本注重稳定性，比较适合长期项目和大公司，和一个非长期支持但是最快实现新特征的版本。

**Swift 2** 在今年初发布了。 这是 Apple 出品的旨在简化 iOS 和 OS X 开发的现代编程语言。 几周前， Swift 正式开源并已经兼容 Linux。这意味着你可以用它来编写服务端应用了。

**Go 1.5** 在几个月前发布了， 并带来了重大的架构调整。 在 2015 年它变得越来越流行并被早期创业项目和开源项目所采纳。这门语言是 [非常简单的](https://learnxinyminutes.com/docs/go/)，所以花一个周末你就能学会。

**TypeScript** 是一个可编译成 JavaScript 的静态类型语言 。这是由微软开发的，所以跟Visual Studio 和开源的 Visual Studio Code editors 完美地集成了。它很快就要大红大紫了，因为即将到来的 Angular 2 就是用它写的。静态类型对大型团队的大型项目特别有用，所以如果你正在大型团队中做大型项目，或者仅仅出于好奇，你也应该尝试一下 TypeScript 。

如果为了好玩儿，你也可以试试某种函数式编程语言比如 Haskell 或者 Clojure。也有有趣的高性能语言比如 Rust 和 Elixir。如果你在找一份程序员的工作的话， 职业开发语言比如Java (在第8版中有一些[很好的新特性](https://github.com/winterbe/java8-tutorial)) 和 C# (感谢 [Visual Studio Code](https://code.visualstudio.com/) 和 [.net core](https://github.com/dotnet/core) 实现了跨平台开发和运行) 都值得你在2016年投入时间。

**挑一个或几个学习**: Python 3, Go, PHP 7, ES2015, Node.js, Swift, TypeScript

## JavaScript 框架

![][3]

JavaScript框架是web开发技术栈中非常重要的一部分，所以我们单独拿一小节来说这个。今年有两个新标准—— [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) 和 [Web Assembly](http://www.2ality.com/2015/06/web-assembly.html)，基本改变了现代 Web APP的开发方式。还有一些我们觉得你在2016年应该保持关注的框架新版本发布。

[Angular.js](https://angularjs.org/) 已经成为了大型企业首选的 JavaScript 框架。 这个框架即将发布下一个大版本的消息相信大家已经听过一段时间了， 在今年初的时候 [Angular 2](https://angular.io/) 发布了开发者预览版。 相对 Angular 1 而言是一次颠覆性的重构，而对我们而言带来了巨大的改进。一旦正式发布就很有可能成为企业应用开发框架的首选，所以 Angular 2 的开发经验将会是你简历里很好的一个加分项。我们建议再等几个月直到最终版正式发布之后才用于生产，不过你不妨现在就读一读他们的 [快速上手指南](https://angular.io/docs/ts/latest/quickstart.html)。

[React](https://facebook.github.io/react/) 在2015年里持续升温并且持续升级，越来越多的新项目采用它开发。 几个月前他们发布了新的[开发工具](http://facebook.github.io/react/blog/2015/09/02/new-react-developer-tools.html) 。 Facebook 还发布了用于开发支持 Android 和 iOS 平台原生应用的 React Native 框架，这个框架使用了原生界面配合运行在后台的JavaScript线程实现基于React开发原生应用。 可以参考我们今年发表的 [React初级教程](http://tutorialzine.com/2015/04/first-webapp-react/) 。

[Polymer 1.0](https://www.polymer-project.org/1.0/) 是在5月份发布的。 这是第一个稳定且可用于生产的版本. Polymer 主要是基于 [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 标准, 这是一份将 HTML, JS 和 CSS 打包成独立组件并便于快速引用的标准。目前只有 Chrome 和 Opera 支持 Web Components标准，但是 Polymer 搞定了浏览器兼容性问题。

[Ember.js](http://emberjs.com/) 也发布了一个新版本。 Ember 2 带来了模块化功能、废弃了一些旧特性并提升了性能。 Ember 遵循语义化版本并且开发团队尽可能保证大家能够平滑升级。如果你需要一个稳定且易于升级的框架的话，Ember是个不错的选择。

**挑一个或几个学习**: Angular 2, React, Ember.js, Polymer, Web Components, Service Workers

## 前端

![][4]

[Bootstrap](http://getbootstrap.com/) 在过去的一年里变得更加流行了，正在成为Web开发的标配。 使用[SASS](http://sass-lang.com/) 并支持 flexbox 的第四版将在几个月之后发布，官方保证可以从V3平滑升级 (不会像2年前从 v2 升级到 v3 那样 )， 所以尽管放心，你学的第3版的相关知识照样会适用于第4版。

[Foundation](http://foundation.zurb.com/) 是另一个可替代Bootstrap的前端框架。 第6版在年初的时候发布了，这个版本主要侧重于模块化，你可以根据需要定制自己需要的部分以便缩短加载时间。

[MDL](http://www.getmdl.io/) 是一个Google官方发布的用于开发material design web app 的框架。 这个框架在今年初发布并和Polymer目标相似，但是更容易上手。我们曾经写过一篇 [精彩的 MDL 与 Bootstrap 差异总结](http://tutorialzine.com/2015/07/comparing-bootstrap-with-mdl/)。

CSS预处理器也在持续改良。[LESS](http://lesscss.org/) 和 [SASS](http://sass-lang.com/) 是当下最流行的两个，大部分功能都差不多。但是，最新的 Bootstrap 4 都已经转向了 SASS，所以2016年要学的CSS预处理器中 SASS 获得了一些优势。当然了，也还有更新的 [PostCSS](https://github.com/postcss/postcss) 工具值得留意，但是我们强烈建议先掌握了预处理器再来学这个。

**挑一个或几个学习**: Bootstrap, MDL, Foundation, SASS, LESS, PostCSS

## 后端

![][5]

这几年的Web开发有一个非常明显的趋势。越来越多的应用逻辑转移到了前端，然后后端仅仅是API。然而传统的后端生成页面的应用依然还有生存空间，所以我们觉得学一个经典的全站框架依然是非常重要的。

关键取决于你更喜欢那种语言，可选择的非常多。用PHP你可以选 [Symfony](https://symfony.com/), [Zend](http://framework.zend.com/), [Laravel](http://laravel.com/) (还有 [Lumen](http://lumen.laravel.com/), 这是新一代专注于API开发的框架), [Slim](http://www.slimframework.com/) 等。用Python 有 [Django](https://www.djangoproject.com/) 和 [Flask](http://flask.pocoo.org/) 。用 Ruby 有[Rails](http://rubyonrails.org/) 和 [Sinatra](http://rubyonrails.org/)。用Java有 [Play](https://www.playframework.com/) 和 [Spark](http://sparkjava.com/)。用Node.js你可以选择 [Express](http://expressjs.com/en/index.html), [Hapi](http://hapijs.com/) 和 [Sails.js](http://sailsjs.org/) ，还有 Go 语言的[Revel](http://revel.github.io/)。

[AWS Lambda](http://aws.amazon.com/lambda/)去年就已经发布了，但是这个概念到现在才稳定并能用于生产。这是一种可无限扩展的完全取代传统后端服务器的云服务。你可以根据API被访问时的特定条件或者路由来定义不同的响应方法。这意味着你可以完全不用管服务器。

另一个趋势是静态站点生成器比如 [Jekyll](http://jekyllrb.com/) 和 [Octopress](http://octopress.org/)([这里](http://www.staticgen.com/)有一个完整的同类清单)。这类工具的主要功能是把一堆文本和图片文件渲染成一个完整的静态网站。那些以前通常自己搭一个Wordpress博客程序的开发者现在更喜欢事先生成并直接上传一个静态网站。这样会更加安全（没有后端服务器也不需要数据库）并且性能非常好。结合 [MaxCDN](https://www.maxcdn.com/ ) 或 [CloudFlare](https://www.cloudflare.com/)之类的CDN服务可以让用户就近访问，明显减少等待时间。

**挑一个学习**: 传统的全栈后端框架, AWS Lambda, 一种静态生成器

## 内容管理系统（CMS）

![][6]

我们主要介绍两种最流行的 CMS系统。都是用PHP写的并且易于部署和上手。他们都因为PHP7的发布获得了明显的速度提升。

最近几年 [Wordpress](https://wordpress.org/) 已经变得早就不仅仅是个博客程序了。它是一个成熟的 CMS/框架，配合插件可以做任何一种网站。高质量的 Wordpress 皮肤是一个巨大的市场，很多自由职业者以 Wordpress 相关开发为生。配合类似 [WP-API](http://wp-api.org/) 之类的项目你可以把Wordpress变成一组 REST API 。

[Drupal 8](https://www.drupal.org/8) 在今年发布了。这是一次侧重现代开发最佳实践的重构。使用了 Symfony 2 组件、 Composer 包管理器 和 Twig 模板引擎。成千上万的网站在使用 Drupal，它确实是以内容为主的门户网站的一个很好的选择。

## 数据库

![][7]

这一年Web开发社区对 NoSQL 数据库失去了一些热情，重新回到了关系型数据库比如 Postgres 和 MySQL 身边。这方面著名的例外是 [RethinkDB](http://rethinkdb.com/) 和 [Redis](http://redis.io/) ，他们都很火，我强烈建议你在2016年都试试。

MySQL 是最火并且大部分主机供应商都支持的开源数据库。在5.7版里，MySQL 也提供了[JSON columns](https://dev.mysql.com/doc/refman/5.7/en/json.html) 来存储非关系型数据。如果你刚开始接触后端开发，你可能正在找连接到服务器已安装的数据库的方法。很可能是旧版本的，所以你没办法尝试 JSON 类型数据。MySQL已经包含在了很流行的 XAMPP 或 MAMP 之类的软件包里，所以上手很容易。

**挑一个学习**: Redis, RethinkDB, MySQL/MariaDB, PostgreSQL

## 移动应用

![][8]

移动平台一直在进步并且智能机的硬件配置现在跟低端笔记本的性能差不多了。这对于 hybrid 移动开发框架来说是个好消息，基于web技术开发的移动应用将得到更加顺滑、更像原生的体验了。

我们曾经写过一篇不错的 [Hybrid应用开发框架概览](http://tutorialzine.com/2015/10/comparing-the-top-frameworks-for-building-hybrid-mobile-apps/) 你或许会感兴趣。最火的 [Ionic 框架](http://ionicframework.com/) 和 [Meteor](https://www.meteor.com/) 都在最近发布了1.0版本且都适合做移动应用开发。Facebook 开源的 [React Native](https://facebook.github.io/react-native/)，可以在后台JavaScript进程里运行 React 组件并更新原生的UI界面，让你可以用几乎同一套代码同时写 iOS和Android应用。

**挑一个学习**: Ionic, React Native, Meteor

## 编辑器和开发工具

![][9]

[Atom](https://atom.io/)在今年发布了1.0。它是一款使用web技术开发的免费且功能强大的代码编辑器。它背后有一个很多大开发者社区(译者注：github)提供了很多扩展包。它提供好用的自动完成并集成了代码重构和校验工具。差点忘了它还有很多漂亮的皮肤可以选择，并且你可以自己写 CoffeeScript 和 CSS 来定制自己喜欢的皮肤。Facebook 已经这么干了，并且发布了名为 [Nuclide](http://nuclide.io/) 的编辑器。

微软在今年年初发布的 [Visual Studio Code](https://code.visualstudio.com/) 给了大家一个惊喜。这是一款支持多种语言并兼容 Windows, Linux 和 OS X 平台的轻量级IDE。它提供了强大的智能代码检查并集成了 ASP.Net 和 Node.js 的调试工具。

[NPM](https://www.npmjs.com/)，Node.js的包管理器，火得一塌糊涂并已经成为了前端和node开发者的标准包管理器。这是帮你的项目管理 JavaScript 依赖最简单的方法并且[上手](https://docs.npmjs.com/)很容易。

目前哪怕是一个人开发也有必要用 [Git](http://git-scm.com/)。它的分布式模型让你可以把任何一个文件夹变成一个版本控制仓库，然后你可以把这个仓库发布到 [Bitbucket](https://bitbucket.org/) 或 Github，同步到其他电脑上。如果你还没用过 Git，我们强烈建议你把它加入你2016年需要学习的清单里面。

**挑一个学习**: Atom, Visual Studio Code, NPM, Git

## 搞物联网

![][10]

树莓派基金会提前给我们送来了圣诞礼物，[Raspberry PI Zero](https://www.raspberrypi.org/blog/raspberry-pi-zero/) 一种只卖 5 美金的高性能电脑发布了。它搭载了Linux，所以你可以把它变成一台服务器，一个家用自动化装置，一面[智能镜子](https://www.raspberrypi.org/blog/magic-mirror/)，或者把它集成到别的电器里面打造一个你梦寐以求的能联网控制的咖啡机。2016年是你应该拥有树莓派的一年。

## 规划一个漂亮的2016年吧！

我们已经度过了非常棒的2015年，看起来2016年会更有意思。那么2016年你会想学些什么呢？

[1]:{{site.qiniu}}/2015/12/15/1.jpg
[2]:{{site.qiniu}}/2015/12/15/2.jpg
[3]:{{site.qiniu}}/2015/12/15/3.jpg
[4]:{{site.qiniu}}/2015/12/15/4.jpg
[5]:{{site.qiniu}}/2015/12/15/5.jpg
[6]:{{site.qiniu}}/2015/12/15/6.jpg
[7]:{{site.qiniu}}/2015/12/15/7.jpg
[8]:{{site.qiniu}}/2015/12/15/8.jpg
[9]:{{site.qiniu}}/2015/12/15/9.jpg
[10]:{{site.qiniu}}/2015/12/15/10.jpg


-----------------------

原文：[The Languages And Frameworks You Should Learn In 2016](http://tutorialzine.com/2015/12/the-languages-and-frameworks-you-should-learn-in-2016/)

翻译：H5

链接：[http://wx.h5.vc/post/translations/2015-12-14](http://wx.h5.vc/post/translations/2015-12-14)

来源：[爱奇舞——H5.vc](http://wx.h5.vc/)