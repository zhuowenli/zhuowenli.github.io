/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Posts Model
 */
'use strict';

import myXhr from '../services/myXhr';

module.exports = {
    postLikes(id) {
        return myXhr.post('/api/likes', { id });
    },
}