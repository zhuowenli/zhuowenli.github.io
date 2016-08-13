/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const webpack = require('webpack');
const utils = require('./utils');
const path = require('path');

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: '/dist',
        publicPath: ".",
        filename: "app.js"
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/src|vue-router\//,
                loader: 'babel'
            }, {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 5120,
                    name: path.join('/dist/static/', '[name].[hash:7].[ext]')
                }
            }
        ],
        babel: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
        },
        resolve: {
            modulesDirectories: ['node_modules']
        }
    },
    vue: {
        loaders: utils.cssLoaders()
    }
}