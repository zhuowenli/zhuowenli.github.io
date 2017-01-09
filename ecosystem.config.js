/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

module.exports = {
    apps: [
        {
            name: "blog",
            script: "./app/app.js",
            watch: true,
            env: {
                "NODE_ENV": "development",
            },
            env_production: {
                "NODE_ENV": "production"
            }
        }
    ]
}