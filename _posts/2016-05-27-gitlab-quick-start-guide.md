---
layout: post
title: GitLab快速安装指南
subline: GitLab quick start guide
categories: diary
tags: [gitlab, git]
---

![][gitlab]

首先列一下我的服务器配置：

> 1 GB Memory / 30 GB Disk / SFO1 - Ubuntu 14.04

在 digitalocean 购买的vps，最便宜的配置一个月才$5。

可以用这个优惠链接注册（送$20哟）：[https://m.do.co/c/6ecb75692729](https://m.do.co/c/6ecb75692729)

## Ubuntu下安装GitLab

参照[官方安装文档](https://about.gitlab.com/downloads/#ubuntu1404)，直接通过omnibus packages的方式安装，安装过程非常的顺利。

```bash
# 安装依赖包
sudo apt-get install curl openssh-server ca-certificates postfix

# 添加 GitLab 仓库「我用的是美国的vps，用官方资源会快些」
curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
# 国内可用如下镜像
curl -sS http://packages.gitlab.cc/install/gitlab-ce/script.deb.sh | sudo bash

# 安装 GitLab 社区版
apt-get install gitlab-ce

# 初始化，初始化完自动启动 GitLab
sudo gitlab-ctl reconfigure
```

访问你的服务器ip，就可以访问 GitLab 了。


## 使用 digitalocean 系统镜像安装

如图，关机后Rebuild一下就可以了：

![][digitalocean]

具体教程看这里：[How To Use the GitLab One-Click Install Image to Manage Git Repositories](https://www.digitalocean.com/community/tutorials/how-to-use-the-gitlab-one-click-install-image-to-manage-git-repositories)

安装起来非常省事，不到10分钟就可以配置好了。

## 绑定域名

编辑gitlab.rb：

```bash
vim /etc/gitlab/gitlab.rb
```

修改external_url：

    external_url "http://git.zhuowenli.com"

每次修改 gitlab.rb，都要运行以下命令，让配置生效:

``` bash
sudo gitlab-ctl reconfigure
```

执行完成之后，访问你配置好的域名：[http://git.zhuowenli.com](http://git.zhuowenli.com)就可以访问 GitLab 了。

## 配置邮箱

参考官方文档：[SMTP settings](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/smtp.md)

同样是编辑gitlab.rb：

```bash
vim /etc/gitlab/gitlab.rb
```

我用的是gmail，所以使用了如下配置：

```bash
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.gmail.com"
gitlab_rails['smtp_port'] = 587
gitlab_rails['smtp_user_name'] = "xxxxxx@gmail.com"
gitlab_rails['smtp_password'] = "xxxxxx"
gitlab_rails['smtp_domain'] = "smtp.gmail.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_openssl_verify_mode'] = 'peer'
```

同样是运行以下命令，让配置生效:

```bash
sudo gitlab-ctl reconfigure
```

## 使用 GitLab 自带的 nginx 来配置多个二级域名访问

刚刚配置了[http://git.zhuowenli.com](http://git.zhuowenli.com)这个二级域名之后，会发现访问首页[http://www.zhuowenli.com](http://www.zhuowenli.com)居然也是会跑到 GitLab 页面去。不管什么域名，都是访问 GitLab 的页面。

怎么让页面正常访问呢？这时候就得来看看 GitLab 自带 nginx 了。

找到 nginx 的配置文件目录：

``` bash
cd /var/opt/gitlab/nginx/conf
```

可以看到里面有两个文件：`gitlab-http.conf`、`nginx.conf`

接下来我们再添加一个文件，比如：`www-http.conf`

```bash
touch www-http.conf
vim www-http.conf
```

添加配置信息：

```bash
server {
  listen 80;

  # 域名及文件位置
  server_name www.zhuowenli.com zhuowenli.com;
  root        /home/zhuowenli.com/;

  charset     utf-8;
  index       index.php index.html index.htm

  try_files   $uri $uri/ @rewrite;

  location @rewrite {
    rewrite ^/(.*)$ /index.php?_url=/$1;
  }

  location ~ \.html {
    add_header Cache-Control no-cache;
  }
}
```

编辑`nginx.conf`，把刚刚的配置信息include进去：

```bash
include /var/opt/gitlab/nginx/conf/www-http.conf;
```

重启 GitLab 服务：

```bash
sudo gitlab-ctl restart
```

大功告成！这样就可以配置多个域名了。

> 注意: 每次执行 `sudo gitlab-ctl reconfigure` 的时候，都会重置`nginx.conf`的内容。
> 所以在执行命令之前，记得备份配置文件。


[gitlab]:{{site.qiniu}}/2016/05/27/logo.svg
[digitalocean]:{{site.qiniu}}/2016/05/27/digitalocean.png