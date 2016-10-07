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
        knex('categorys').insert({name: '前端开发', title: 'frontend'}),
        knex('categorys').insert({name: '设计网摘', title: 'design'}),
        knex('categorys').insert({name: '生活日志', title: 'diary'})
    );
};
