/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-01-05 18:39:00
 */

const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    mode: 'production',
    output: {
        path: path.resolve(process.cwd(), './lib'),
        filename: 'app.js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        publicPath: '/lib/',
    },
    resolve: {
        alias: {
            '@src': path.resolve('./src/'),
            '@stylesheet': path.resolve('./src/stylesheet'),
        },
        extensions: ['.js', '.json'],
        modules: ['node_modules']
    },
    // externals: [
    //     nodeExternals()
    // ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader'
            },
            {
                test: /\.s(a|c)ss$/,
                loaders: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true }},
                    { loader: 'postcss-loader', options: { sourceMap: true }},
                    { loader: 'sass-loader', options: { sourceMap: true }},
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader?minimize=false'
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.svg(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    },
    optimization: {
        // minimize: false,
        runtimeChunk: false,
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '(c)2019 www.zhuowenli.com',
        }),
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
    ]
};
