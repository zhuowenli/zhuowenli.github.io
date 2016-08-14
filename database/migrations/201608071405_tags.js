/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Migrations
 */
'use strict';

exports.up = function (knex) {

    return knex.schema.createTable('tags', table => {
        table.increments().primary();

        table.string('name', 255).notNull().comment('标签名');
        table.integer('priority').defaultTo(0).notNull().comment('权重');

        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('tags');
};
