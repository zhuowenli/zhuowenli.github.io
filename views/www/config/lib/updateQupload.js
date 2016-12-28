/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const Promise = require('bluebird');
const fs = require('fs');

const exec = require('./exec');
const config = require('../config.json');
const qupload = config.qupload;
const quploadPath = config.quploadPath;

const updateQupload = () => {
    return new Promise((resolve, reject) => {
        qupload.key_prefix += `${process.env.TIMESTAMP}/`;
        qupload.access_key = process.env.QINIU_ACCESS_KEY;
        qupload.secret_key = process.env.QINIU_SECRET_KEY;

        const str = JSON.stringify(qupload, null, 2);

        fs.writeFileSync(quploadPath, str);

        exec(`qshell account ${qupload.access_key} ${qupload.secret_key}`).then(resolve, reject);
    });
};

module.exports = updateQupload;
