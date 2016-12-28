/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');

const updateQupload = require('../lib/updateQupload');

const publishBundleTask = function(next) {
    updateQupload().then(() => {
        gulpSequence('clean', 'production', 'qupload')(build);
    }, (res) => {
        console.log(res)
        next();
        process.exit();
    });

    function build() {
        const filePath = path.resolve(__dirname, '../../../../', '.env')
        const env = fs.readFileSync(filePath).toString();
        const newEnv = env.replace(/BUILD_WWW=(\d+)/, `BUILD_WWW=${process.env.TIMESTAMP}`);

        fs.writeFileSync(filePath, newEnv);

        next();
        process.exit();
    }
};

gulp.task('publish_bundle', publishBundleTask);

module.exports = publishBundleTask;