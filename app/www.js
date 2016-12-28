/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : www 服务主入口
*/
'use strict';

const koa = require('koa');
const path = require('path');
const views = require('koa-views');
const serve = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaqs = require('koa-qs');
const ctrls = require('./controllers/www');
// const cors = require('koa-cors');
const historyApiFallback = require('koa-history-api-fallback');

const app = koa();

app.log = require('./services/logger');

// init db
app.db = require('./db');

// init models
app.models = require('./models');

koaqs(app);
// bodyParser
app.use(bodyParser());

// 响应头允许夸域
// app.use(cors());

/**
 * 兼容HTML5 history模式
 * 匹配静态资源
 */
app.use(historyApiFallback({
    rewrites: [
        {
            from: /^\/((list|search|detail).*|$)/,
            to(ctx) {
                const url = ctx.match[0];
                const page = ctx.match[2];

                // console.log(JSON.stringify(ctx, null, 2));

                if (/\/(node_modules|dist|static|api)\/.*$/.test(url)) {
                    return url.replace(`/${page}`, '');
                }

                return '/';
            }
        },
    ]
}));

// init views
const viewsPath = path.join(__dirname, '../views/www/');
app.use(views(viewsPath, {
    map: {
        html: 'ejs'
    }
}));

// init router
const router = app.router = new Router();
app.router.api = new Router({
    prefix: '/api'
});

// init ctrls
ctrls.forEach(ctrl => {
    ctrl.init(app);
});

// use routers
app.use(router.routes());
app.use(router.api.routes());
app.use(router.api.allowedMethods());

// static files, low priority
app.use(serve(viewsPath));

// node_modules
if(process.env.NODE_ENV === 'development') {
    app.use(serve(path.join(__dirname, '..')));
}

module.exports = app;