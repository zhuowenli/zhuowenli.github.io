/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Model Post
*/
'use strict';

var db = require('../db');

module.exports = db.model('Post', {
    tableName: 'posts',
    hasTimestamps: true,
    category: function() {
        return this.belongsTo('Category', 'category_id');
    },
});
