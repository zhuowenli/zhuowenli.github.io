/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : 后台首页
*/
'use strict';

exports.init = function(app) {
    var router = app.router;

    router.get('/', function *() {
        const publish = `${process.env.QINIU_HOST}/admin/${process.env.BUILD_ADMIN}`;
        const local = '/dist';

        yield this.render('index', {
            src: app.env === 'development' ? local : publish
        });
    });

    // 前台
    router.get('/www', function *() {
        let url = this.protocol + '://';
        url += process.env.WWW_HOST;

        this.redirect(url);
    });
};
