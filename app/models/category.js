/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Model Category
*/
'use strict';

var db = require('../db');

module.exports = db.model('Category', {
    tableName: 'categorys',
    hasTimestamps: true,
});
