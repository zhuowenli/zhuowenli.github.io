/*
 * @Author: 绿间
 * @Email: zhuowenligg@gmail.com
 * @Date: 2018-12-11 11:48:49
 */

module.exports = {
    // presets: [
    //     [
    //         '@babel/env',
    //         {
    //             targets: {
    //                 chrome: '60'
    //             },
    //             useBuiltIns: 'usage',
    //         },
    //     ],
    // ],
    plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
};
