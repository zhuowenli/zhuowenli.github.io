/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : www 服务主入口
*/
'use strict';

var koa = require('koa');
var path = require('path');
var views = require('koa-views');
var serve = require('koa-static');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var koaqs = require('koa-qs');
var ctrls = require('./controllers/www');
const cors = require('koa-cors');

var app = koa();

app.log = require('./services/logger');

// init db
app.db = require('./db');

// init models
app.models = require('./models');

// init router
var router = app.router = new Router();
app.router.api = new Router({
    prefix: '/api'
});

koaqs(app);
// bodyParser
app.use(bodyParser());

// 响应头允许夸域
app.use(cors());

// 登录相关
// var oauth = require('./oauth');
// app.use(oauth.initialize());
// app.use(oauth.session());

// init views
var viewsPath = path.join(__dirname, '../views/www/dist/');
app.use(views(viewsPath, {
    map: {
        html: 'ejs'
    }
}));

// init router
var router = app.router = new Router();
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
// app.use(router.api.allowedMethods());

// static files, low priority
app.use(serve(viewsPath));

// node_modules
if(process.env.NODE_ENV === 'development') {
    app.use(serve(path.join(__dirname, '..')));
}

module.exports = app;