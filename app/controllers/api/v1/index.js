/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : api-index
 */
'use strict';

exports.init = function(app) {
    var router = app.router;
    let Feedback = app.models.Feedback;

    router.api.get('/', function *() {
        let feedbacks = yield Feedback.forge().fetchAll();

        this.body = feedbacks;
    });
};
