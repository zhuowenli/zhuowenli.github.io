/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : 七牛上传token
 */
'use strict';

const moment = require('moment');
const random = require('random-js')();
const qiniu = require('../../../services/qiniu');

exports.init = function(app) {
    const router = app.router;
    const defaultBucket = process.env.QINIU_BUCKET;

    router.post('/api/token/qiniu', function *() {
        let data = this.request.body || {};

        let bucket = data.bucket || defaultBucket;
        let uploadKey = data.key;
        if(!uploadKey) {
            uploadKey = moment().format('YYYY/MM/DD/hh-mm-ss-') + random.string(5);
        }

        let putPolicy = new qiniu.rs.PutPolicy(bucket +':'+ uploadKey);
        putPolicy.returnBody  = '{"bucket":$(bucket),"key":$(key),"width":$(imageInfo.width),"height":$(imageInfo.height),"avinfo":$(avinfo)}';

        let fileUrl = process.env.QINIU_HOST + '/' + uploadKey;

        this.body = {
            token: putPolicy.token(),
            key: uploadKey,
            url: fileUrl
        };
    });
};