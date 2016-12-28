/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const browserSync = require('browser-sync');
const gulp = require('gulp');

const config = require('../config.json');

const browserSyncTask = () => {
    return browserSync.init(config.browserSync)
};

gulp.task('browserSync', browserSyncTask);

module.exports = browserSyncTask;
