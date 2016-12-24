/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

exports.init = function(app) {
    const router = app.router;
    const {Tag} = app.models;
    const Tags = app.db.Collection.extend({
        model: Tag
    });

    router.get('/api/tags', function *() {
        const query = this.query;
        let tags = Tags.forge();

        tags = yield tags.fetchItems(qb => {
            query.order_by = query.order_by || 'id';
            qb.orderBy(query.order_by, query.order_status);
        }, {
            page: query.page,
            per_page: query.per_page,
        });

        this.body = tags;
    });
};

