/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : api-posts
 */
'use strict';

exports.init = function(app) {
    const router = app.router;
    const Post = app.models.Post;
    const Posts = app.db.Collection.extend({
        model: Post
    });

    router.api.get('/posts', function *() {
        let query = this.query;
        let posts = Posts.forge();

        posts = yield posts.fetchItems(qb => {

            if (query.category_id) {
                qb.where('category_id', query.category_id);
            }

            qb.orderBy('id', 'asc'); //desc
        }, {
            page: query.page,
            per_page: query.per_page,
        }, {
            withRelated: ['category']
        });

        this.body = posts;
    });
};
