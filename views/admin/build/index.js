/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-04-05 22:04:02
 */

'use strict';

const fs = require('fs');
const moment = require('moment');
const timestamp = moment().format('YYYYMMDDHHmm');

fs.writeFileSync('.build.json', JSON.stringify({ timestamp }), 'utf8');
