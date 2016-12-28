/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const gulp   = require('gulp');
const del    = require('del');

const cleanTask = function (cb) {
    const cleanPaths = ['dist', '.qshell'];

    del(cleanPaths).then(() => {
        cb();
    });
};

gulp.task('clean', cleanTask);

module.exports = cleanTask;
