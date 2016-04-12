const path = require('path');

let config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    // 文章
    post: {
        author: '卓文理',
        per_page: 20,
    },

    // 网站信息
    site: {
        name: '卓文理的个人网站',
        description: '',
        keywords: '卓文理,前端,前端开发,网页设计,交互设计',
        subtitle: 'The only way to do great work is to love what you do.',
        copyright: '@ 2016 卓文理',
        email: '531840344@qq.com',
    },

    // 社交信息
    social: {
        github: 'https://github.com/zhuowenli',
        zhihu: 'https://www.zhihu.com/people/zhuowenli',
        weibo: 'http://weibo.com/u/2173490394',
        wechat: ''
    },

    // mongodb 配置
    db: 'mongodb://localhost/blog',

    // 程序运行的端口
    port: 3000,
    host: 'localhost',
}

module.exports = config;