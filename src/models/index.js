const mongoose = require('mongoose');
const config   = require('../config');


// 端口号省略则默认连接 27017，config.db 是配置好的数据库的名称
// mongodb 中不需要建立数据库，当你需要连接的数据库不存在时，会自动创建一个出来。
mongoose.connect(config.db, function (err) {
    if (err) {
        console.log('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./post');

exports.Post = mongoose.model('Post');
