/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Migrations
 */
'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.table('images', table => {
        table.integer('width').unsigned().comment('宽');
        table.integer('height').unsigned().comment('高');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('images', table => {
        table.dropColumn('width');
        table.dropColumn('height');
    });
};
