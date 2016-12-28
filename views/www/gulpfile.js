/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

const path = require('path');
const requireDir = require('require-dir');
const argv = require('yargs').argv;
const moment = require('moment');
const config = require('./config/config.json');
const timestamp = moment().format('YYYYMMDDHHmm');

require('dotenv-safe').load({
    path: path.resolve(__dirname, '../..', '.env'),
    sample: path.resolve(__dirname, '../..', '.env.example')
});

process.env.TIMESTAMP = timestamp;

requireDir('./config/tasks/', { recurse: true });
