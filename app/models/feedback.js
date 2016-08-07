/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Model Feedback
*/
'use strict';

var db = require('../db');

module.exports = db.model('Feedback', {
    tableName: 'feedbacks',
    hasTimestamps: true,
    // users: function() {
    //     return this.belongsToMany('User');
    // }
});
