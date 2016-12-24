/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Model Taglog
*/
'use strict';

var db = require('../db');

module.exports = db.model('TagLog', {
    tableName: 'tag_logs',
    hasTimestamps: true,
    post() {
        return this.belongsTo('Post');
    },
    tag() {
        return this.belongsTo('Tag', 'tag_id');
    }
});