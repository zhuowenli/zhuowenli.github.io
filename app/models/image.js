/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Model Image
*/
'use strict';

var db = require('../db');

module.exports = db.model('Image', {
    tableName: 'images',
    hasTimestamps: true
});