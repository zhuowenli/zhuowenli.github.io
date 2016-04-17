const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');

const config       = require('./config');
const webRouter    = require('./routes/web_router');
const apiRouter    = require('./routes/api_router');
const errorHander  = require('./common/error');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '..', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'assets')));

// 相关路由
app.use('/', webRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(errorHander.catch404);

// error handlers
app.use(errorHander.errorPage);

module.exports = app;
