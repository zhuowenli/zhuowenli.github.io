/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : 统一返回数据
 */
'use strict';

const lodash = require('lodash');

class ResponseData {
    constructor(ctx) {
        if(!ctx) {
            ctx = {};
        }

        let body = ctx.body;
        if(body instanceof Error) {
            ctx = body;
            this.code = ctx.code || ctx.status;

            if(process.env.NODE_ENV === 'development') {
                this.stack = ctx.stack;
            }
        }

        this.code = 0;
        if(ctx instanceof Error) {
            this.code = ctx.code || ctx.status;
        }

        // 是否包裹数据
        this.wrapData = ctx.wrapData !== false;

        // 包装通用数据
        this.message = ctx.message || '';
        this.data = ctx.data || ctx.body;
        this.metadata = ctx.metadata;

        this.errors = ctx.errors;
    }

    toJSON() {
        if(!this.wrapData) {
            return this.data;
        }

        let props = ['code', 'message', 'data', 'metadata', 'stack'];
        let ret = lodash.pick(this, props);

        // timestamp
        ret.timestamp = Date.now();

        return ret;
    }

    // toString() {
    //     return JSON.stringify(this);
    // }
}

module.exports = ResponseData;
