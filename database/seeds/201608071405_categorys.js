/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Seeds
 */
'use strict';

exports.seed = function(knex, Promise) {

    var now = new Date();

    return Promise.join(
        // categorys
        knex('categorys').del(),
        knex('categorys').insert({name: '前端开发'}),
        knex('categorys').insert({name: '设计网摘'}),
        knex('categorys').insert({name: '生活日志'})
    );
};
