# www.zhuowenli.com

这是[www.zhuowenli.com](http://www.zhuowenli.com) 这个博客站的所有代码。

欢迎大家star或者fork。

如果遇到什么问题，你可以向我：

- 使用 [Issues](https://github.com/zhuowenli/zhuowenli.github.io/issues)
- 提 [Pull Requests](https://github.com/zhuowenli/zhuowenli.github.io/pulls)

##环境搭建

###安装Ruby

jekyll本身基于Ruby开发，因此，想要在本地构建一个jekyll的环境需要具有Ruby的开发和运行环境。

在windows下，可以使用[Rubyinstaller](http://rubyinstaller.org/downloads/)安装。[ruby安装说明](http://www.ruby-lang.org/zh_cn/downloads/)

###安装Bundle

直接使用下面命令即可：

`$ gem install bundle`


## 准备工作

clone项目到本地

`$ git clone https://github.com/zhuowenli/zhuowenli.github.io.git`

进入zhuowenli.github.io这个文件夹

`$ cd zhuowenli.github.io`

执行bundle命令下载依赖资源：

`$ bundle install`

资源加载完毕后，使用下面命令，启动本地服务：

`$ bundle exec jekyll serve`

浏览器输入 `localhost:4000` 来访问项目。