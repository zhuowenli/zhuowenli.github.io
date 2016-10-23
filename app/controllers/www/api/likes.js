/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : api-posts
 */
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

exports.init = function(app) {
    const router = app.router;
    const {Post} = app.models;

    router.post('/api/likes', function *() {
        const {id} = this.request.body;
        const post = yield Post.where(qb => {
            qb.where('id', id);
        })
        .fetch({
            withRelated: ['category', 'user']
        });

        // update like_count
        let like_count = +post.get('like_count');

        yield post.save('like_count', like_count + 1);

        this.body = {
            id: post.id,
            like_count: like_count + 1
        };
    });
}