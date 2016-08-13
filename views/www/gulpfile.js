/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const webpack = require('webpack-stream');
const webpackConfig = require('./config/webpack.config.js');

const gulp = require('gulp');
const connect = require('gulp-connect');
const gutil = require("gulp-util");
const plumber = require('gulp-plumber');

const path = require('path');

const dest = './dist';
const src = './src';

// Make a dev copy of the config source maps and debug enabled
const devConfig = Object.create(webpackConfig)
devConfig.devtool = 'source-map'
devConfig.debug = true

gulp.task('webpack', () => {
    return gulp.src(path.join(src, 'main.js'))
        .pipe(plumber({
            errorHandler(e) {
                console.log(e);
                this.emit('end');
            }
        }))
        .pipe(webpack(devConfig))
        .pipe(gulp.dest(dest))
        .pipe(connect.reload());
});

// Run the webserver
gulp.task('webserver', () => {
    connect.server({
        livereload: true,
        root: 'dist'
    });
});

// Copy file
gulp.task('copy', () => {
    const filesToCopy = [
        './index.html',
        './static/**/*'
    ];

    // return gulp.src(filesToCopy, {base: '.'})
    //     .pipe(gulp.dest(dest));
});

gulp.task('default', ['webpack', 'webserver', 'copy']);
