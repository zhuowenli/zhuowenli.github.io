/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import myXhr from '../services/myXhr';

module.exports = {
    fetchQiniuToken(options) {
        return myXhr.post('/api/token/qiniu', options);
    }
}