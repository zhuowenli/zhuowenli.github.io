/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-02-16 15:56:26
 */

'use strict';

const path = require('path');
const qiniu = require('qiniu');

require('dotenv-safe').load({
    path: path.resolve(__dirname, '../../..', '.env'),
    sample: path.resolve(__dirname, '../../..', '.env.example')
});

// 要上传的空间
const bucket = 'zhuowenli';
const domain = 'http://zhuowenli.qiniudn.com';

// 需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = process.env.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY = process.env.QINIU_SECRET_KEY;

/**
 * 文件上传
 * @param {string} localFile 本地文件绝对路径
 * @param {string} [namespaces=''] 七牛远程目录
 * @returns
 */
module.exports = (localFile, namespaces = '') => {
    // 构建上传策略函数
    function uptoken(buckets, key) {
        const putPolicy = new qiniu.rs.PutPolicy(`${buckets}:${key}`);
        return putPolicy.token();
    }

    return new Promise((resolve, reject) => {
        const extra = new qiniu.io.PutExtra();
        // 上传到七牛后保存的文件名
        const key = `${namespaces}/${path.basename(localFile)}`;
        // 生成上传 Token
        const token = uptoken(bucket, key);

        qiniu.io.putFile(token, key, localFile, extra, (err, ret) => {
            if (!err) {
                ret.href = `${domain}/${ret.key}`;
                resolve(ret);
            } else {
                reject(err);
            }
        });
    });
};
