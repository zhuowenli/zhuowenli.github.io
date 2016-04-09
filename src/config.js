const path = require('path');

let config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    // 文章作者
    author: '卓文理',

    // 网站信息
    name: '卓文理',
    description: '',
    keywords: '卓文理,前端,前端开发,网页设计,交互设计',

    // mongodb 配置
    db: 'mongodb://localhost/blog',

    // 程序运行的端口
    port: 3000,
    host: 'localhost',
}

module.exports = config;