/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Posts Model
 */
'use strict';

import myXhr from '../services/myXhr';

module.exports = {
    fetchPostLists(options) {
        return myXhr.get('/api/posts', options);
    },
    fetchPostsByID(id) {
        return myXhr.get(`/api/posts/${id}`);
    }
}