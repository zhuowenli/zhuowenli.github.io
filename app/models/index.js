/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Model 主入口
*/
'use strict';

const models = {
    User: require('./user'),
    Post: require('./post'),
    Category: require('./category'),
    Image: require('./image'),
    Tag: require('./tag'),
    TagLog: require('./tag_log'),
};

module.exports = models;