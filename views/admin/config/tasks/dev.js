/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';
const path = require('path');

const ora = require('ora');
const gulp = require('gulp');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const handleErrors = require('../lib/handleErrors');
const config = require('../webpack.config');

const dest = './dist';
const src = './src';

const devTask = () => {
    Object.assign(config, {
        devtool: 'source-map',
        debug: true,
        output: Object.assign(config.output, {
            path: './dist',
            publicPath: './dist/',
        }),
        resolve: Object.assign(config.resolve, {
            alias: {
                vue: 'vue/dist/vue.common.js'
            },
        }),
        plugins: [
            // new webpack.DefinePlugin({
            //     'process.env': 'devlopment'
            // }),
            // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            // https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true
            })
        ]
    });

    const spinner = ora('building for local...');

    setTimeout(() => spinner.start(), 500);

    webpack(config, (err, stats) => {
        spinner.stop();

        if (err) {
            return handleErrors(err);
        };

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n');

        browserSync.reload();
    });
};

gulp.task('dev', devTask);

module.exports = devTask;


