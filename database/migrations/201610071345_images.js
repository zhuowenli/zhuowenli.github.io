/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Migrations
 */
'use strict';

exports.up = function (knex) {
    return knex.schema.createTable('images', table => {
        table.increments().primary();

        table.string('imageable_type').defaultTo('posts').notNull();
        table.integer('imageable_id').defaultTo(0);
        table.string('url');

        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('images');
};
