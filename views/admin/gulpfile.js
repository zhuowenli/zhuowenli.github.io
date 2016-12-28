/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

const requireDir = require('require-dir');
const argv = require('yargs').argv;
const moment = require('moment');
const config = require('./config/config.json');
const timestamp = moment().format('YYYYMMDDHHmm');

config.timestamp = timestamp;

requireDir('./config/tasks/', { recurse: true });
