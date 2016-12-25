## 博客3.0

正在开发中，敬请期待...

## TODO LIST

- 服务端
    - [x] 技术选型
    - [x] 架构设计
    - [x] 数据结构
    - [x] API设计
    - [x] 服务器配置
    - [ ] 持续集成
- 前台开发
    - [x] 技术选型
    - [x] 架构设计
    - [x] 路由机制
    - [x] 构建流程
    - [x] 侧栏交互
    - [x] 首页
    - [x] 文章列表
    - [x] 文章详情
    - [ ] 关于
    - [x] 搜索页
    - [x] 搜索列表页
- 后台开发
    - [x] 技术选型
    - [x] 架构设计
    - [x] 路由机制
    - [x] 构建流程
    - [x] 文章列表
    - [x] 文章编辑
    - [ ] 标签管理
    - [ ] 分类管理

![](wiki/home.png)

## 技术栈

- 后端：Node.js + koa + MySQL + knex
- 前端：Vue.js + Vue Router + Webpack + ES2015

## Quick Start

1. 安装 Homebrew

    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

2. 安装 `node` 要求至少 `6.0.0` 以上版本

    ```
    brew install node
    ```

3. 安装 `cnpm` 镜像加速，`npm` 国内访问太慢

    ```
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    ```

4. 安装全局 `npm` 依赖

    可以使用 `cnpm info knex` 查看各个包的详细信息

    ```
    cnpm i -g pm2 knex nodemon babel babel-eslint
    // 各模块说明
    // pm2 - 强大的服务管理工具
    // knex - SQL 构造器以及数据库迁移工具
    // nodemon - node 调试工具，用于代码改变后自动重启服务
    // balbel, balbel-eslint 用于 ES2015 语法兼容，用于 IDE 语法查错等
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
    // 表结构
    knex migrate:latest

    // 初始数据
    knex seed:run

    // 更多用法参见 `knex -h`
    ```

8. Nginx 配置

    如果需要可以参考项目 `nginx.conf.example`

9. 启动项目

    ```
    npm run dev // dev 环境
    npm run start // 线上环境
    ```
