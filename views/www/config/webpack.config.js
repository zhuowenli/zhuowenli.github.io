/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

// const webpack = require('webpack');
const utils = require('./utils');
const path = require('path');

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: '/dist',
        publicPath: './dist/',
        filename: 'app.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/src|vue-router\//,
                loader: 'babel',
                query: {
                    compact: false
                }
            }, {
                test: /\.css$/,
                loader: "style!css"
            }, {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.vue$/,
                loader: 'vue'
            },, {
                test: /\.html$/,
                loader: 'raw'
            }, {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 4096,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ],
        babel: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
        }
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['', '.js', '.vue'],
    },
    vue: {
        loaders: utils.cssLoaders()
    }
};