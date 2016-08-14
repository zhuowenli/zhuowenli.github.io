/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Migrations
 */
'use strict';

exports.up = function (knex) {

    return knex.schema.createTable('categorys', table => {
        table.increments().primary();

        table.string('name', 255).notNull().comment('分类名');

        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('categorys');
};
