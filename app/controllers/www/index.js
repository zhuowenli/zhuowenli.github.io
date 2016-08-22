/**
 * @description www-控制器主入口
 *
 * @author xiaomi
 */

var ctrls = [
    require('./api/posts'),
    require('./api/users'),
    require('./api/likes'),
    require('./index/index'),
];

module.exports = ctrls;
