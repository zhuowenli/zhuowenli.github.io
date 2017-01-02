/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');

exports.init = function(app) {
    const router = app.router;

    router.post('/api/login', function *() {
        const postData = this.request.body;
        const data = {};

        const { password, username } = postData;

        if (process.env.LOGIN_USERNAME === username || process.env.LOGIN_PASSWORD === password) {
            data.result = true;

            this.cookies.set('username', username);
            this.cookies.set('password', password);
        } else {
            data.result = false;
        }

        this.body = data;
    });
};

