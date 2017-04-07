/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-04-05 22:02:38
 */

'use strict';

const path = require('path');

module.exports = (options, req) => {
    const config = {
        entry: 'src/main.js',
        filename: {
            js: '[name].js',
            css: 'style.css',
            static: 'static/[name].[ext]'
        },
        html: {
            title: '博客后台',
            template: './build/index.html'
        },
        resolve: true,
        postcss: [
            req('autoprefixer')({
                browsers: ['ie > 8', 'last 4 versions'],
                remove: false
            })
        ],
        webpack(cfg) {
            cfg.resolve.modules.push(path.resolve('src'));
            cfg.devtool = 'source-map';

            if(!options.dev) {
                const timestamp = require('./.build.json').timestamp;
                cfg.output.publicPath = `//zhuowenli.qiniudn.com/admin/${timestamp}/`;
            }

            return cfg;
        },
        vendor: Object.keys(require('./package.json').dependencies),
    };

    return config;
};
