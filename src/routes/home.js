const {Post} = require('../proxy');
const config = require('../config');

exports.index = (req, res, callback) => {
    let page = parseInt(req.query.page, 10) || 1;
    page = page > 0 ? page : 1;

    let query = {};
    let limit = config.per_page;
    let options = {skip: (page - 1) * limit, limit: limit};

    Post.getPostByQuery(query, options, (err, post) => {
        console.log('err: ', err);
        console.log('post: ', post);
        res.render('index', { name: post });
    });

    // let data = {
    //     content: '我是内容内容内容内容内容内容内容内容内容内容内容内容内容',
    //     title: '第一篇文章！',
    //     category: 1,
    //     tags: '标签1,标签2,标签3',
    //     excerpt: '我是简介',
    // }

    // Post.addPost(data, (err, post) => {
    //     console.log('err: ', err);
    //     console.log('post: ', post);
    //     res.render('index', { name: err });
    // });
}

exports.create = (req, res, callback) => {

}