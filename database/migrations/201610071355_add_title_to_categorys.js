/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Migrations
 */
'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.table('categorys', table => {
        table.string('title', 255).notNull().comment('分类');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('categorys', table => {
        table.dropColumn('title');
    });
};
