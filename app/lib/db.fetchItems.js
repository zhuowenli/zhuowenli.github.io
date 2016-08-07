/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : lib/db.fetchItems
 */
'use strict';

var lodash = require('lodash');

module.exports = function(db) {

    db.Collection = db.Collection.extend({
        page: 1,
        pageSize: 20,
        fetchItems: function(queryOptions, pagerOptions, fetchOptions) {
            var self = this;

            // fix queryOptions
            if(!queryOptions) {
                queryOptions = {};
            }

            // pagination
            var pageSize = +pagerOptions.page_size || this.pageSize;
            var ret = lodash.merge({
                total: 0,
                total_pages: 0,
                page_size: this.pageSize,
                page: this.page,
                items: []
            }, pagerOptions);

            return this.query(queryOptions).count('*')
            .then(total => {
                var minPage = 1;
                var totalPages = Math.ceil(total / pageSize);

                ret.page = Math.max(minPage, Math.min(totalPages, ret.page));
                ret.total_pages = totalPages;
                ret.page_size = pageSize;
                ret.total = total;
            })
            .then(() => {
                return self.query(queryOptions)
                .query({
                    offset: (ret.page - 1) * pageSize,
                    limit: pageSize
                })
                .fetch(fetchOptions);
            })
            .then(items => {
                ret.items = items;

                return ret;
            });
        }
    });

    return db;
};
