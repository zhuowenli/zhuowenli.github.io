/**
 * @description 中间件合并、转发
 *
 * @author xiaomi
 */
'use strict';

const lodash = require('lodash');
const compose = require('koa-compose');
const ResponseData = require('../lib/response-data');

module.exports = function(subApp, options) {
    options = lodash.merge({
        wrapResponse: true
    }, options);

    // Response adp
    // 数据返回格式转换，适配老系统格式
    subApp.middleware.unshift(function *(next) {
        yield next;

        let body = this.body;
        let status = this.status;

        if(
            !body ||
            status === 404 ||
            typeof body !== 'object' ||
            // ignore stream
            typeof body.pipe === 'function'
        ) {
            return;
        }

        // 统一接口返回格式
        if(options.wrapResponse && !(body instanceof ResponseData)) {
            this.body = new ResponseData(this);
        }
    });

    return compose(subApp.middleware);
};