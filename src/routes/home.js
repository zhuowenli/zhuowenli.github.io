const {Post} = require('../proxy');
const config = require('../config');
const common = require('../common/common');
const _      = require('lodash');

exports.index = (req, res, callback) => {
    let page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;

    let query = {};
    let limit = config.per_page;
    let options = {skip: (page - 1) * limit, limit: limit};

    // let data = {
    //     content: '啊实打实大大声的阿萨德阿萨德按时大大撒大大大',
    //     title: '撒的撒的爱上的',
    //     cover: 'http://zhuowenli.qiniudn.com/2015/09/06/1.png',
    //     category: 2,
    //     like_count: 12,
    //     tags: '标签1,标签2,标签3',
    //     excerpt: '爱萨达打算打算打算',
    // }

    // Post.addPost(data, (err, post) => {
    //     console.log('err: ', err);
    //     console.log('post: ', post);
    //     res.render('index', { name: err });
    // });

    Post.getPostByQuery(query, options, (err, posts) => {
        // console.log('err: ', err);
        // console.log('post: ', post);

        _.assign(posts, post =>{
            _.assign(post, {
                created_time: new Date(post.created_time).getTime(),
                updated_time: new Date(post.updated_time).getTime()
            });

            if (post.deleted_time) {
                post.deleted_time = new Date(post.deleted_time).getTime();
            }

        });

        //
        res.render('index', {
            styles: ['index'],
            posts: posts,
            config: config,
            matchPath: (url) => common.matchPath(req, url)
        });
    });
}

exports.create = (req, res, callback) => {

}