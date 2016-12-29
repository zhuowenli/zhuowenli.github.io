/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : 管理后台-控制器主入口
*/
'use strict';

var ctrls = [
    require('./api/posts'),
    require('./api/tags'),
    require('./api/qiniu'),
    require('./index/index'),
    require('./build/index'),
];

module.exports = ctrls;
