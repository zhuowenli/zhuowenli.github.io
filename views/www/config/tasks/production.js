/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const gulp = require('gulp');
const gulpUtil = require('gulp-util');
const webpack = require('webpack');
let lock = true;

const productionTask = function (callback) {
    const webpackProdConfig = require('../webpack.prod.config.js');

    webpack(webpackProdConfig, (err, stats) => {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err)
        };

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');

        if (lock) {
            lock = false;
            callback();
        }
    });
};

gulp.task('production', productionTask);
module.exports = productionTask;
