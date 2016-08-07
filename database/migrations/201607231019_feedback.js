/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Migrations
 */
'use strict';

exports.up = function(knex) {

    return knex.schema.createTable('feedbacks', table => {
        table.increments().primary();

        table.integer('user_id').unsigned();
        table.string('contact', 255).notNull();
        table.string('ua', 255);
        table.text('content');

        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('feedbacks');
};
