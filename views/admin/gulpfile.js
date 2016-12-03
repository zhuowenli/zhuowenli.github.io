/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./config/webpack.config.js');

const gulp = require('gulp');
const connect = require('gulp-connect');

const path = require('path');

const dest = './dist';
const src = './src';

function watch (config) {
    return gulp.src(path.join(src, 'main.js'))
        .pipe(webpackStream(config))
        .on('error', function handleError () {
            this.emit('end'); // Recover from errors
        })
        .pipe(gulp.dest(dest))
        // .pipe(connect.reload());
}

// Make a dev copy of the config source maps and debug enabled
const config = Object.create(webpackConfig);

gulp.task('dev', () => {
    config.devtool = 'source-map';
    config.debug = true;

    watch(config);
});

gulp.task('publish', () => {
    config.debug = false;
    config.plugins = [
        new webpack.DefinePlugin({
            DEV: JSON.stringify(false)
        }),
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
        // ignore
    ];

    watch(config);
});

// Run the webserver
gulp.task('webserver', () => {
    // connect.server({
    //     livereload: true,
    //     root: '.'
    // });
});

gulp.task('default', ['dev', 'webserver']);
