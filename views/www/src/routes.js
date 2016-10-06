/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

/* eslint-disable global-require */

const Home = r => require.ensure([], () => r(require('./views/Home.vue')), 'home');
const page404 = r => require.ensure([], () => r(require('./views/404.vue')), 'home');

module.exports = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '*',
        name: '404',
        component: page404
    }
];

/* eslint-enable global-require */
