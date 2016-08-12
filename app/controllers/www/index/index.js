/**
 * @description www-index
 * @description 包含所有入口，路由交由前端处理
 *
 *
 * @author xiaomi
 */
'use strict';

exports.init = function(app) {
    var router = app.router;

    router.get('/', function *() {
        yield this.render('index', {
            env: app.env
        });
    });
};
