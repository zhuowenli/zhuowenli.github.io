/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : 后台首页
*/
'use strict';

exports.init = function(app) {
    let router = app.router;
    let Feedback = app.models.Feedback;

    router.get('/', function *() {
        let feedbacks = yield Feedback.forge().fetchAll();

        yield this.render('index', {
            feedbacks: feedbacks.toJSON()
        });
    });

    // 前台
    router.get('/www', function *() {
        let url = this.protocol + '://';
        url += process.env.WWW_HOST;

        this.redirect(url);
    });
};
