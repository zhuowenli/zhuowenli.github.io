/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import LikeCounter from './component';

LikeCounter.install = function(Vue) {
    Vue.component(LikeCounter.name, LikeCounter);
};

module.exports = LikeCounter;