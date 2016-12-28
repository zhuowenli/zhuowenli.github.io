/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const webpack = require('webpack');
const config = require('./config.json');
const webpackConfig = require('./webpack.config.js');

webpackConfig.bail = true;
webpackConfig.output.path = './dist';
webpackConfig.output.publicPath = `//zhuowenli.qiniudn.com/admin/${config.timestamp}/`;
webpackConfig.plugins = [
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
];

module.exports = webpackConfig;
