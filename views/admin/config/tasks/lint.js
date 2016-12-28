/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const gulp = require('gulp');
const gulpEslint = require('gulp-eslint');
const handleErrors = require('../lib/handleErrors');

const lintTask = function (cb) {
    return gulp.src(['src/**/*.{js,vue}', '!node_modules/**', '!dist/**'])
        .pipe(gulpEslint())
        .pipe(gulpEslint.format('../../node_modules/eslint-friendly-formatter'))
        .pipe(gulpEslint.failAfterError())
        .on('error', handleErrors);
};

gulp.task('lint', lintTask);

module.exports = lintTask;
