/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : api-posts
 */
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

const CATES = {
    frontend: 1,
    design: 2,
    diary: 3
}

exports.init = function(app) {
    const router = app.router;
    const {Tag, Taglog, Post} = app.models;
    const Posts = app.db.Collection.extend({
        model: Post
    });

    router.get('/api/posts', function *() {
        const query = this.query;
        let posts = Posts.forge();

        posts = yield posts.fetchItems(qb => {
            if (query.type) {
                qb.where('category_id', CATES[query.type]);
            }

            // 关键字搜索，模糊查询
            // 使用正则 /(a|b|c)/ 来尽可能多的匹配多个关键字。
            if (query.search) {
                const search = query.search.replace(/\s/g, '|');

                qb.where('title', 'REGEXP', `(${search})`)
                .orWhere('content', 'REGEXP', `(${search})`)
                .orWhere('excerpt', 'REGEXP', `(${search})`);
            }

            query.status = query.status || 0;
            query.order_by = query.order_by || 'id';
            query.order_status = query.order_status || 'desc';

            qb.where('status', query.status);
            qb.orderBy(query.order_by, query.order_status);
        }, {
            page: query.page,
            per_page: query.per_page,
        }, {
            withRelated: ['images', 'category']
        });

        posts.data.models.map(post => {
            let content = post.get('content');

            content = content
                    ? content.match(/(^.*?(\r?\n|\r)){0,8}/m)[0] + '...'
                    : '';

            post.set('content', content);
        });

        this.body = posts;
    });

    router.get('/api/posts/:id', function *() {
        const post = yield Post.where(qb => {
            qb.where('id', this.params.id);
        })
        .fetch({
            withRelated: ['images', 'category', 'user']
        });

        // update view_count
        let view_count = +post.get('view_count');

        yield post.save('view_count', view_count + 1);

        this.body = post;
    });
};







