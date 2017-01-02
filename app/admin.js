/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : admin管理后台主入口
 */
'use strict';

var koa = require('koa');
var path = require('path');
var views = require('koa-views');
var serve = require('koa-static');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

var ctrls = require('./controllers/admin');

var app = koa();

// init db
app.db = require('./db');

// init models
app.models = require('./models');

// bodyParser
app.use(bodyParser({
    jsonLimit: '2mb',
    formLimit: '2mb'
}));

// init views
var viewsPath = path.join(__dirname, '../views/admin');

app.use(views(viewsPath, {
    map: {
        html: 'ejs'
    }
}));

// init router
var router = app.router = new Router();
app.router.api = new Router({
    prefix: ''
});

// 简单登录校验
app.use(function *(next) {
    const username = this.cookies.get('username');
    const password = this.cookies.get('password');
    const { url } = this.request;

    if (/^(\/api)?\/login/.test(url)) {
        return yield next;
    }

    if (process.env.LOGIN_USERNAME !== username || process.env.LOGIN_PASSWORD !== password) {
        this.redirect(`//${process.env.ADMIN_HOST}/login`);
    }

    yield next;
})

// init ctrls
ctrls.forEach(ctrl => {
    ctrl.init(app);
});

// use routers
app.use(router.routes());
app.use(router.api.routes());

// static files, low priority
// @!!danger, only use for admin
// @TODO: replace with koa-send
app.use(serve(path.join(__dirname, '..')));
app.use(serve(viewsPath));

// debug
global.app = app;

module.exports = app;
