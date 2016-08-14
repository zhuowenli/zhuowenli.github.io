/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Migrations
 */
'use strict';

exports.up = function (knex) {

    return knex.schema.createTable('users', table => {
        table.increments().primary();

        table.string('username', 255).notNull().comment('用户名');
        table.string('avatar_url', 255).comment('头像');
        table.integer('status').defaultTo(0).comment('状态');

        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users');
};
