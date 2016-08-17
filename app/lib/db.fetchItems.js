/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : lib/db.fetchItems
 */
'use strict';

const _ = require('lodash');
const ResponseData = require('./response-data');

module.exports = function(db) {

    db.Collection = db.Collection.extend({
        page: 1,
        pageSize: 20,
        fetchItems: function(queryOptions, pagerOptions, fetchOptions) {
            const that = this;

            // fix options
            if(!queryOptions) {
                queryOptions = {};
            }
            if(!pagerOptions) {
                pagerOptions = {};
            }

            // pagination
            let pageSize = +pagerOptions.page_size || this.pageSize;
            let page = +pagerOptions.page || +pagerOptions.current_page || this.page;

            const metadata = {
                total: 0,
                total_pages: 0,
                per_page: pageSize,
                page: page,
            };

            let ret = new ResponseData({
                code: 200,
                metadata: metadata
            });

            return this.query(queryOptions).count('*')
                .then(total => {
                    const minPage = 1;
                    const totalPages = Math.ceil(total / pageSize);

                    _.assign(metadata, {
                        page: Math.max(minPage, metadata.page),
                        total_pages: totalPages,
                        per_page: pageSize,
                        total: total,
                    });
                })
                .then(() => {
                    return that.query(queryOptions)
                    .query({
                        offset: (metadata.page - 1) * pageSize,
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
