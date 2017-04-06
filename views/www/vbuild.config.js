/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-02-15 14:28:31
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
            title: '卓文理',
            template: './build/index.html'
        },
        resolve: true,
        copy: false,
        postcss: [
            require('autoprefixer')({
                browsers: ['ie > 8', 'last 4 versions'],
                remove: false
            })
        ],
        webpack(cfg) {
            cfg.resolve.modules.push(path.resolve('src'));
            cfg.resolve.alias = {
                vue: 'vue/dist/vue.js'
            };
            cfg.devtool = 'source-map';

            if(!options.dev) {
                const timestamp = require('./.build.json').timestamp;
                cfg.output.publicPath = `//zhuowenli.qiniudn.com/www/${timestamp}/`;
            }

            cfg.module.rules.map(rule => {
                if(rule.loader === 'vue-loader') {
                    rule.options = {
                        transformToRequire: {
                            video: 'poster'
                        }
                    };
                }
                return rule;
            });

            return cfg;
        },
        vendor: Object.keys(require('./package.json').dependencies),
    };

    return config;
};
