/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-02-16 17:17:49
 */

'use strict';

const fs = require('fs');
const moment = require('moment');

const timestamp = moment().format('YYYYMMDDHHmm');

fs.writeFileSync('.build.json', JSON.stringify({ timestamp }), 'utf8');
