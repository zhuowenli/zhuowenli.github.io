/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-01-30 17:04:28
 */

import getRandomInt from './getRandomInt';

export default arr => arr[getRandomInt(0, arr.length - 1)];
