/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : 首页
*/
'use strict';

exports.init = function(app) {
    var router = app.router;

    router.get('/', function *() {
        const publish = `${process.env.QINIU_HOST}/www/${process.env.BUILD_WWW}`;
        const local = '/dist';

        yield this.render('index', {
            src: app.env === 'development' ? local : publish
        });
    });
};
