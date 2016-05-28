---
layout: post
title: 使用Nginx反向代理配置GitLab
subline:
categories: diary
tags: [gitlab, git, nginx]
---

首页要确保你的服务器里面有安装nginx：

```bash
sudo apt-get install -y nginx
```

因为GitLab自带了一个nginx，如果想利用原有 nginx，我想到了两种办法：

## 禁用GitLab的nginx

第一种方法可以直接禁用GitLab自带的nginx，然后使用自己安装的nginx。

### nginx添加配置

直接复制GitLab的server配置文件

```bash
cp /var/opt/gitlab/nginx/conf/gitlab-http.conf /etc/nginx/conf.d
```

### 禁用自带的nginx

```bash
vim /etc/gitlab/gitlab.rb
```

加入

```bash
nginx['enable'] = false
```

### 重启nginx、gitlab

```bash
sudo nginx -s reload
sudo gitlab-ctl reconfigure
```

### 权限配置

访问会报502。原本是 nginx 用户无法访问gitlab用户的 socket 文件，用户权限配置，因人而异。粗暴地:

```bash
sudo chmod -R 755 /var/opt/gitlab/gitlab-rails
```

## 利用nginx的反向代理

第二种方法是保留GitLab的nginx不变，但是可以使用我们安装的nginx来进行反向代理来配置服务器。

先检查下8181端口有没有被占用，有的话杀掉它，或者换个端口：

```bash
netstat -anpt | grep 8181
```

### 修改GitLab配置文件

```bash
vim /etc/gitlab/gitlab.rb
```

修改GitLab配置文件中的external_url为对应的端口号为8181：

```bash
external_url "http://git.zhuowenli.com:8181"
```

然后执行`GitLab reconfigure`命令

```bash
sudo gitlab-ctl reconfigure
```

### 修改自带nginx端口

```bash
vim /var/opt/gitlab/nginx/conf/gitlab-http.conf
```

修改`gitlab-http.conf`配置文件中的端口号为8181：

```bash
listen *:8181;
```

完成后重启GitLab

```bash
sudo gitlab-ctl restart
```

### 添加nginx配置文件

接下来就是打开nginx的配置目录，然后添加`gitlab-http.conf`

```bash
cd /etc/nginx/conf.d
touch gitlab-http.conf
vim gitlab-http.conf
```

往里面插入配置信息：

```bash
server{
    listen 80;
    server_name git.zhuowenli.com
    assess_log off;

    location / {
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8181;
    }
}
```

### 重启nginx

```bash
sudo nginx -s reload
```

这样就可以直接访问[http://git.zhuowenli.com](http://git.zhuowenli.com)了.

