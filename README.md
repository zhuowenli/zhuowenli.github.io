## 博客3.0

[![Build Status](https://travis-ci.org/zhuowenli/zhuowenli.github.io.svg?branch=master)](https://travis-ci.org/zhuowenli/zhuowenli.github.io)

正在开发中，敬请期待...

## TODO LIST

- 服务端
    - [X] 持续集成
    - [X] webhooks
- 前台开发
    - [ ] 关于页
    - [ ] 关键词搜索列表
    - [X] 静态资源CDN
- 后台开发
    - [X] 登录
    - [ ] 标签管理
    - [ ] 分类管理

![](wiki/home.png)

## 技术栈

- 后端：Node.js + koa + MySQL + knex
- 前端：Vue.js + Vue Router + Webpack + ES2015

## Node.js 服务

这里仅提供 MacOS 的安装指导，其他系统平台请根据自身的情况适当的改变安装流程。

1. 安装 [Homebrew](https://github.com/Homebrew/brew)

    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

2. 安装 Node.js，至少 `6.x` 以上版本

    ```
    brew install node
    ```

3. 国内可安装 `cnpm` 镜像加速

    ```
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    ```

4. 安装全局 `npm` 依赖

    ```
    cnpm i -g pm2 knex nodemon gulp webpack
    # pm2 - 强大的服务管理工具
    # knex - SQL 构造器以及数据库迁移工具
    # nodemon - node 调试工具，用于代码改变后自动重启服务
    # gulp、webpack - 前端打包、流程管理工具
    ```

5. 安装项目依赖

    ```
    cnpm i
    ```

6. 创建项目配置

    可以根据自己机器适当修改配置，例如数据库端口、密码等

    ```
    cp .env.example .env
    ```

7. 初始化数据库

    执行此操作前请确认自己机器数据库服务已正常运行，
    另外由于 `bookshelf` 默认采用 JSON 标准格式存储日期，如果使用 mysql 请关闭严格模式：

    - https://github.com/TryGhost/Ghost/issues/5050#issuecomment-83613536
    - http://dba.stackexchange.com/questions/48704/mysql-5-6-datetime-incorrect-datetime-value-2013-08-25t1700000000-with-er

    ```
    # 表结构
    knex migrate:latest

    # 初始数据
    knex seed:run

    # 更多用法参见 `knex -h`
    ```

8. Nginx 配置

    如果需要可以参考项目 `nginx.conf.example`，本机记得还要改下 hosts 。

9. 启动项目

    ```
    npm run dev   # dev 环境
    npm run start # 线上环境
    ```

## 前后台页面编译

1. 进入前端文件目录
    ```
    cd views/admin  # 管理后台
    cd views/www    # 网站前台
    ```

2. 安装项目依赖
    ```
    cnpm i
    ```

3. 编译代码
    ```
    npm run dev
    ```
    编译完成后，就可以访问配置好的前后台页面了。

4. 发布编译、打包、压缩后的代码
    ```
    npm run publish_bundle
    ```

