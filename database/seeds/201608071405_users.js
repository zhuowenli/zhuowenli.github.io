/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Seeds
 */
'use strict';

exports.seed = function(knex, Promise) {

    var now = new Date();

    return Promise.join(
        knex('users').del(),
        knex('users').insert({username: '卓文理', status: 0})
    );
};
