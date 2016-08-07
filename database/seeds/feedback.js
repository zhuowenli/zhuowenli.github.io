/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : Seeds
 */
'use strict';

exports.seed = function(knex, Promise) {

    var now = new Date();

    return Promise.join(
        // feedbacks
        knex('feedbacks').del(),
        knex('feedbacks').insert({contact: 'xxx', ua: 'curl/1.3', content: '111111', created_at: now}),
        knex('feedbacks').insert({contact: '12313112313', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36', content: '你们这个工具还是蛮好用的，但是要更新啥啥啥啥啥啥啥啥啥啥', created_at: now})
    );
};
