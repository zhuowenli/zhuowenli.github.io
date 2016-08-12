/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : db
*/
'use strict';

const knexfile = require('../knexfile');
const knex = require('knex')(
    knexfile[process.env.NODE_ENV]
);
const bookshelf = require('bookshelf');

const db = bookshelf(knex);

// https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
db.plugin('registry');

// https://github.com/tgriesser/bookshelf/wiki/Plugin:-Virtuals
// db.plugin('virtuals');

// db.fetchItems
require('./lib/db.fetchItems')(db);
require('./lib/db.timestamp')(db);

module.exports = db;
