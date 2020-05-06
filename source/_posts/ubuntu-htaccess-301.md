---
title: Ubuntu下使用.htaccess实现301重定向
id: 18
category: diary
tags: [ubuntu, 301, htaccess, lamp]
date: 2015-09-10
---

最近在[DigitalOcean][DigitalOcean]搞了台服务器(一个月只要$5哟~)，顺便把博客迁移到这上面。博主有两个域名：[zwlme.com][zwlme]、[zhuowenli.com][zhuowenli]，然后就想让所有的域名都可以直接跳转到[www.zhuowenli.com][zhuowenli]这个主域名上。

尝试了几个方案，最终觉得用`.htaccess`来实现域名跳转到[www.zhuowenli.com][zhuowenli]会比较友好。

今天博主就来给大家分享如何使用`.htaccess`实现301重定向。

## 绑定域名

首先，我们需要把两个域名都通过A记录解析到服务器上。

```bash
// zhuowenli.com
记录类型  主机记录  记录值
A        www     [:服务器ip地址]  // 将域名解析为www.zhuowenli.com
A        @       [:服务器ip地址]  // 将域名解析为zhuowenli.com（不带www）


// zwlme.com
记录类型  主机记录  记录值
A        www     [:服务器ip地址]  // 将域名解析为www.zhuowenli.com
A        @       [:服务器ip地址]  // 将域名解析为zwlme.com（不带www）
```

## 服务配置

博主在购买服务器的时候，选择了有lamp的镜像，所以只要配置下Apache，把网站根目录指向博客根目录下的`_site`文件就行了，具体过程：

略。

## 设置重定向

在网站根目录下创建`.htaccess`文件，然后编辑该文件：

```bash
# 切换到网站根目录
# 创建.htaccess
touch .htaccess

# 编辑该文件
vim .htaccess
```

输入如下代码：

```bash
#启动重写引擎
RewriteEngine On

#匹配以www.zhuowenli.com、zwlme.com、或者zhuowenli.com开头的域名
RewriteCond %{http_host} ^(www.)?zwlme.com$ [NC,OR]
RewriteCond %{http_host} ^zhuowenli.com$ [NC]

#这些域名的任何网址都重定向到www.zhuowenli.com，返回码是301
RewriteRule ^(.*)$ http://www.zhuowenli.com/$1 [R=301,L]
```

然后，还没完呢！

## 重新配置Apache（基于LAMP）

编辑配置文件：

```bash
# 切换到Apache配置目录
cd /etc/apache2

# 执行ls命令会发现下列文件、文件夹
apache2.conf  conf-available  conf-enabled  envvars  magic  mods-available  mods-enabled  ports.conf  sites-available  sites-enabled

# 编辑配置文件
vim apache2.conf
```

将`apache2.conf`下所有的 `AllowOverride None` 改为 `AllowOverride All`

```bash
AllowOverride None

# 改为：
AllowOverride All
```

启用`mod_rewrite.so`模块：

```bash
# 将mods-available目录下的rewrite.load复制到mods-enabled下
cp mods-available/rewrite.load mods-enabled/
```

OK！配置完毕，接下来重启下Apache服务就行啦

```bash
sudo /etc/init.d/apache2 restart
```

最后，你就会发现：访问[zwlme.com](http://zwlme.com)、[www.zhuowenli.com][zwlme]或者[zhuowenli.com](http://zhuowenli.com)的时候，域名都会自动跳转到[www.zhuowenli.com][zhuowenli]这个主域名了！。

[zwlme]:http://www.zhuowenli.com "http://www.zhuowenli.com"
[zhuowenli]:http://www.zhuowenli.com "http://www.zhuowenli.com"
[DigitalOcean]:https://www.digitalocean.com/?refcode=6ecb75692729 "DigitalOcean"
