const models     = require('../models');
const {Post}     = models;
const _          = require('lodash');

/**
 * 根据文章ID，查找一篇文章
 * @param {String} id 文章ID
 * @param {Function} callback 回调函数
 */
exports.getPost = (id, callback) => {
  Post.findOne({_id: id}, callback);
};

/**
 * 根据关键词，获取主题列表
 * @param  {String}   query    搜索关键词
 * @param  {Object}   option   搜索选项
 * @param  {Function} callback 回调函数
 */
exports.getPostByQuery = (query, option, callback) => {
    query.deleted_time = null;

    if (typeof option === "Function") {
        callback = option;
        option = {};
    }

    Post.find(query, null, option, (err, posts) => {
        if (err) {
            return callback(err);
        }
        if (posts.length === 0) {
            return callback(null, []);
        }

        let promises = [];

        _.forEach(posts, (post) => {
            let promise = new Promise((resolve, reject) => {
                if (!post.like_count) {
                    post.like_count = 0;
                }
                if (!post.cover) {
                    post.cover = '';
                }

                resolve(post);
            });

            promises.push(promise);
        });

        Promise.all(promises).then(() => {
            return callback(null, posts);
        });
    });
}

/**
 * 添加文章
 * @param  {Object}   data     文章对象
 * @param  {Function} callback 回调函数
 * @Data
 * - content : 内容
 * - title   : 标题
 * - category: 分类
 * - tags    : 标签
 * - excerpt : 简介
 */
exports.addPost = (data, callback) => {
    let post = new Post();

    _.assign(data, {
        status: 0,
        category: data.category || 3,
        created_time: parseInt(new Date().getTime()),
        updated_time: parseInt(new Date().getTime())
    });

    _.assign(post, data);

    post.save(callback);
};