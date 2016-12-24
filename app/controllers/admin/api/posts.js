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
    const {Tag, TagLog, Post, Image} = app.models;
    const Posts = app.db.Collection.extend({
        model: Post
    });

    router.get('/api/posts', function *() {
        const query = this.query;
        let posts = Posts.forge();

        posts = yield posts.fetchItems(qb => {
                if (query.category_id) {
                    qb.where('category_id', query.category_id);
                }

                qb.orderBy(query.order_by || 'id', 'desc'); //desc
            }, {
                page: query.page,
                per_page: query.per_page,
            }, {
                withRelated: ['images', 'category', 'tags.tag']
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

        let {title, categories, tags, content, excerpt, release_at, status, images} = postData;
        let category_id = 3;

        if (categories) {
            categories = categories.trim();
            category_id = CATES[categories] || 3;
        }

        release_at = new Date(release_at);
        content = content ? content.trim() : '';
        title = title ? title.trim() : '';

        _.assign(data, {
            title,
            content,
            category_id,
            release_at,
            status,
            excerpt,
            priority: 0,
            user_id: 1,
        });

        let post = Post.forge(data);

        yield post.save();

        // images
        if (images && images.length && typeof images == 'object') {
            images = yield Promise.map(images, image => {
                image = Image.forge({
                    imageable_type: 'posts',
                    imageable_id: post.id,
                    url: image.url,
                    width: image.width || 0,
                    height: image.height || 0,
                });

                return image.save();
            });

            post.set('images', images);
        }

        if (tags) {
            tags = tags.split(',');

            if (tags.length && typeof tags == 'object') {
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

                function saveTagLogs(id) {
                    return TagLog.forge({
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
                                saveTagLogs(res.id);
                            } else {
                                saveTags(value).then(id => {
                                    saveTagLogs(id);
                                });
                            }
                        });

                    return tag;
                });
            }
        }

        this.body = post;
    });

    router.get('/api/posts/:id', function *() {
        const post = yield Post.where(qb => {
            qb.where('id', this.params.id);
        })
        .fetch({
            withRelated: ['images', 'category', 'user', 'tags.tag']
        });

        // update view_count
        let view_count = +post.get('view_count');

        yield post.save('view_count', view_count + 1);

        this.body = post;
    });

    router.put('/api/posts/:id', function *() {
        const post = yield Post.where({
            id: this.params.id
        }).fetch();

        if (!post) {
            this.throw(404);
        }

        const postData = this.request.body;
        const data = {};

        let {title, categories, tags, content, release_at, priority, status, excerpt, images} = postData;
        let category_id = 3;

        if (categories) {
            categories = categories.trim();
            category_id = CATES[categories] || 3;
        }

        release_at = new Date(release_at);
        content = content ? content.trim() : '';
        title = title ? title.trim() : '';
        priority = priority || 0;

        _.assign(data, {
            title,
            content,
            category_id,
            release_at,
            priority,
            status,
            excerpt,
        });

        // save post
        yield post.save(data, {patch: true});

        // images
        if (images && images.length) {
            // clean
            yield Image.where({
                imageable_type: 'posts',
                imageable_id: post.id
            }).destroy();

            images = yield Promise.map(images, image => {
                image = Image.forge({
                    imageable_type: 'posts',
                    imageable_id: post.id,
                    url: image.url,
                    width: image.width || 0,
                    height: image.height || 0,
                });

                return image.save();
            });

            post.set('images', images);
        }

        if (tags) {
            tags = tags.split(',');
        }

        if (tags && tags.length && typeof tags == 'object') {
            // clean
            yield TagLog.where({
                post_id: post.id
            }).destroy();

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

            function saveTagLogs(id) {
                return TagLog.forge({
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
                            saveTagLogs(res.id);
                        } else {
                            saveTags(value).then(id => {
                                saveTagLogs(id);
                            });
                        }
                    });

                return tag;
            });
        }

        this.body = post;
    });

    router.delete('/api/posts/:id', function *() {
        const post = yield Post.where({
            id: this.params.id
        }).fetch();

        if (!post) {
            this.throw(404);
        }

        // clean
        yield Image.where({
            imageable_type: 'posts',
            imageable_id: post.id
        }).destroy();

        // clean
        yield TagLog.where({
            post_id: post.id
        }).destroy();

        // clean
        yield Post.where({
            id: post.id
        }).destroy();

        this.body = post;
    });
};







