/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : qiniu
 */
'use strict';

var path = require('path');
var qiniu = require('qiniu');
var lodash = require('lodash');
var moment = require('moment');
var random = require('random-js')();
var Promise = require('bluebird');
var request = require('request-promise');

var logger = require('../services/logger');

// base config
qiniu.conf.ACCESS_KEY = process.env.QINIU_ACCESS_KEY;
qiniu.conf.SECRET_KEY = process.env.QINIU_SECRET_KEY;

// promisify
Promise.promisifyAll(qiniu.rs.Client.prototype);

// extend methods
lodash.assign(qiniu, {
    url: function(key) {
        var baseUrl = qiniu.conf.UP_HOST + '/';

        return baseUrl + key;
    },
    downlodUrl: function(url) {
        var policy = new qiniu.rs.GetPolicy(600);
        return policy.makeRequest(url);
    },
    uptoken: function(bucket, key) {
        var scope = bucket;
        if(key) {
            scope += ':' + key;
        }

        var putPolicy = new qiniu.rs.PutPolicy(scope);
        return putPolicy.token();
    },
    upload: function(filePath, key) {
        return new Promise((resolve, reject) => {
            var hasKey = !!key;

            // 如果没传过来 key 就自动生成一个
            if(!hasKey) {
                key = 'tmp/';

                var momentDate = moment();
                key += momentDate.format('YYYY/MM/DD') + '/';

                var name = momentDate.format('hh-mm-ss');
                name += random.string(5) + path.extname(filePath);

                key += name;
            }

            var bucket = process.env.QINIU_BUCKET;
            var token = this.uptoken(bucket, hasKey ? key : null);
            var extra = new qiniu.io.PutExtra();

            // support buffer
            var method = Buffer.isBuffer(filePath) ? 'put' : 'putFile';

            qiniu.io[method](token, key, filePath, extra, (err, ret) => {
                if(err) {
                    logger.error(err);

                    // qiniu error
                    // { code: 502, error: [SyntaxError: Unexpected token <] }
                    return reject(new Error(err.error));
                }

                logger.info('file upload ret:', ret);
                resolve(ret);
            });
        });
    },
    stat: function(key) {
        var client = new qiniu.rs.Client();

        var bucket = process.env.QINIU_BUCKET;

        bucket = 'danchaofan-dev';

        return client.statAsync(bucket, key);
    },
    imageInfo: function(key) {
        var baseUrl = process.env.QINIU_HOST;
        var url = baseUrl + key;

        return request({
            url: url + '?imageInfo',
            json: true
        })
        .then(info => {
            info.key = key;

            // info.url = url;

            return info;
        });
    }
});

module.exports = qiniu;