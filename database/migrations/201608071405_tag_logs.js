/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Migrations
 */
'use strict';

exports.up = function (knex) {

    return knex.schema.createTable('tag_logs', table => {
        table.increments().primary();

        table.integer('post_id').notNull().unsigned().comment('文章id');
        table.integer('tag_id').notNull().unsigned().comment('标签id');

        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tag_logs');
};
