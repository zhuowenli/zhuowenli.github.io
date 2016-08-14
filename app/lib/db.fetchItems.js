/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : lib/db.fetchItems
 */
'use strict';

const lodash = require('lodash');

module.exports = function(db) {

    db.Collection = db.Collection.extend({
        page: 1,
        pageSize: 20,
        fetchItems: function(queryOptions, pagerOptions, fetchOptions) {
            const self = this;

            // fix queryOptions
            if(!queryOptions) {
                queryOptions = {};
            }

            // pagination
            const pageSize = Number(pagerOptions.per_page) || this.pageSize;
            const ret = {
                code: 0,
                data: [],
                metadata: {
                    total: 0,
                    total_pages: 0,
                    per_page: this.pageSize,
                    page: this.page,
                },
                timestamp: new Date().getTime()
            };

            lodash.merge(ret.metadata, pagerOptions);

            return this.query(queryOptions).count('*')
                .then(total => {
                    const minPage = 1;
                    const totalPages = Math.ceil(total / pageSize);

                    ret.metadata.page = Math.max(minPage, ret.metadata.page);
                    ret.metadata.total_pages = totalPages;
                    ret.metadata.per_page = pageSize;
                    ret.metadata.total = total;
                })
                .then(() => {
                    return self.query(queryOptions)
                    .query({
                        offset: (ret.metadata.page - 1) * pageSize,
                        limit: pageSize
                    })
                    .fetch(fetchOptions);
                })
                .then(data => {
                    ret.data = data;

                    return ret;
                });
        }
    });

    return db;
};
