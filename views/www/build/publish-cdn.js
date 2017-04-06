/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-02-16 15:29:49
 */

'use strict';

const fs = require('fs');
const path = require('path');
const color = require('cli-color');
const Promise = require('bluebird');

const timestamp = require('../.build.json').timestamp;
const qiniu = require('./qiniu');

const distPath = path.resolve(__dirname, '..', 'dist');
const namespace = `www/${timestamp}`;

function log(text, theme = 'green') {
    console.log(color[theme](text));
}

function upload(_path, _namespace) {
    return qiniu(_path, _namespace).then(res => {
        log(`上传成功: ${res.href}`);
    }, err => {
        err.file = _path;
        console.error(err);
    });
}

log('准备发布到 CDN...');

const data = fs.readdirSync(distPath);
const promises = [];

data.map(file => {
    const filePath = path.join(distPath, file);

    if(file === 'static') {
        const statics = fs.readdirSync(filePath);
        statics.map(item => {
            const staticPath = path.join(filePath, item);
            const space = path.join(namespace, file);

            log(staticPath, 'blue');

            promises.push(upload(staticPath, space));
            return item;
        });
    } else {
        log(`${filePath}`, 'blue');

        promises.push(upload(filePath, namespace));
    }
});

Promise.all(promises)
    .then(() => {
        log('\n准备更新后台时间戳...');

        const filePath = path.resolve(__dirname, '../../../', '.env')
        const env = fs.readFileSync(filePath).toString();
        const newEnv = env.replace(/BUILD_WWW=(\d+)/, `BUILD_WWW=${timestamp}`);

        fs.writeFileSync(filePath, newEnv);

        return true;
    })
    .then(() => log(`更新成功! 最新版本: ${timestamp}`), console.error);

