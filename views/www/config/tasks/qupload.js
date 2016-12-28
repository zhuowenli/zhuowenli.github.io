/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const gulp = require('gulp');
const exec = require('../lib/exec')

const quploadTask = function (callback) {
    setTimeout(() => exec('qshell qupload qupload.json').then((res) => {
        console.log(res);
        callback();
    }), 2000);
};

gulp.task('qupload', quploadTask);

module.exports = quploadTask;
