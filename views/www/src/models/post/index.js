/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import Promise from 'bluebird';

module.exports =  {
    getPosts(ctx, options) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(ctx.$http.get(`/api/posts`, {
                    params: options
                }));
            }, 1000);
        });
    }
}