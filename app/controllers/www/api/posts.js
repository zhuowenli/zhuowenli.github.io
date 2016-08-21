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
        let query = this.query;
        let posts = Posts.forge();

        posts = yield posts.fetchItems(qb => {
                if (query.category_id) {
                    qb.where('category_id', query.category_id);
                }

                qb.orderBy('id', 'desc'); //desc
            }, {
                page: query.page,
                per_page: query.per_page,
            }, {
                withRelated: ['category']
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

    router.post('/api/posts', function *() {
        const postData = this.request.body;
        const data = {};
        let {title, categories, tags, content, release_at} = postData;
        let category_id = 3;

        if (categories) {
            categories = categories.trim();
            category_id = CATES[categories] || 3;
        }

        // release_at = new Date(release_at).getTime();
        content = content ? content.trim() : '';
        title = title ? title.trim() : '';

        _.assign(data, {
            title,
            content,
            category_id,
            release_at,
            priority: 0,
            status: 0,
            user_id: 1,
        });

        let post = Post.forge(data);

        yield post.save();

        if (tags) {
            tags = tags.split(',');
        }

        if (tags && tags.length && typeof tags == 'object') {
            function saveTags(value) {
                return new Promise((resolve, reject) => {
                    Tag.forge({
                            name: value
                        })
                        .save()
                        .then(tag => {
                            resolve(tag.id);
                        });
                });
            }

            function saveTaglogs(id) {
                return Taglog.forge({
                    post_id: post.id,
                    tag_id: id
                }).save();
            }

            yield Promise.map(tags, value => {
                value = value.trim();

                let tag = Tag.where(qb => {
                        qb.where('name', value);
                    })
                    .fetch()
                    .then(res => {
                        if (res && res.id) {
                            saveTaglogs(res.id);
                        } else {
                            saveTags(value).then(id => {
                                saveTaglogs(id);
                            });
                        }
                    });

                return tag;
            });
        }
    });
};







