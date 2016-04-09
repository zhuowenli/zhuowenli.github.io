## 3.0

出于某种莫名的冲♂动，本人打算弃用jekyll，重新整合网站的架构。

新的网站将采用NodeJS + Express + MongoDB + Jade作为技术驱动。网站托放在我那台经久不用的米国VPS上。

## Quick Start

安装依赖：

    npm install

由于全站采用ES2015开发，每次运行前需要执行Babel的编译代码操作：

    npm build

启动应用：

    node ./bin/www

一键编译代码并执行启动命令：

    npm start

## 目录结构

    .
    |---.babelrc
    |---favicon.ico
    |---package.json
    |---bin\                // 启动程序
        |---www
    |---build\              // 编译后的执行文件目录
    |---src\                // 开发目录
        |---app.js
        |---routes
            |---index.js
            |---users.js
    |---public\             // 静态资源目录
    |---views\              // 模板页面目录
        |---error.jade
        |---index.jade
        |---layout.jade
