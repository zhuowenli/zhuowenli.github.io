/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : 主入口
*/
'use strict';

// env
require('dotenv-safe').load();

// koa
var koa = require('koa');
var onerror = require('koa-onerror');
var compose = require('koa-compose');
var favicon = require('koa-favicon');
var session = require('koa-session');

// init app, whit proxy
var app = koa();
app.proxy = true;

app.keys = ['rgmcPAPv6SunV7QM'];
app.use(session(app));

// subApps
var subApps = app.subApps = {
    admin: compose(require('./admin').middleware),
    api: compose(require('./api').middleware),
};
app.use(function *(next) {
    var subAppName = 'www';
    switch (this.hostname){
        case process.env.ADMIN_HOST:
            subAppName = 'admin';
            break;
        case process.env.API_HOST:
            subAppName = 'api';
            break;
    }

    app.subApp = null;
    if(subApps[subAppName]) {
        app.subApp = subAppName;

        return yield subApps[subAppName].call(this, next);
    }

    return yield next;
});

// favicon
// maxAge, 1 month
app.use(favicon(__dirname + '/../favicon.ico', {
    maxAge: 30 * 24 * 60 * 60 * 1000
}));

// 404
app.use(function *(){
    // redirect to onerror
    this.throw(404);
});

// Error handle
onerror(app, {
    json: function(err) {
        var data = err.data || {};
        var statusCode = err.status;

        // Boom error
        if(err.output) {
            statusCode = err.output.statusCode;
        }

        data.status = statusCode || 500;
        if(!data.message) {
            data.message = err.message;
        }

        if(app.env === 'development') {
            data.stack = err.stack.split('\n');
        }

        this.status = data.status;
        this.body = data;
    }
});

// Error report
if(app.env !== 'development') {
    app.on('error', function(err) {
        console.error('App error:', err);
    });
}


// start up
var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server listening:', port);

// exports
module.exports = app;
