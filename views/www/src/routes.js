/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

/* eslint-disable global-require */

const Home = r => require.ensure([], () => r(require('./views/Home')), 'home');
const page404 = r => require.ensure([], () => r(require('./views/404')), 'home');
const List = r => require.ensure([], () => r(require('./views/list')), 'list');
const Search = r => require.ensure([], () => r(require('./views/search')), 'search');
const Detail = r => require.ensure([], () => r(require('./views/detail')), 'detail');

module.exports = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/:type',
        name: 'list',
        component: List
    },
    {
        path: '/:type/:id',
        name: 'detail',
        component: Detail
    },
    {
        path: '*',
        name: '404',
        component: page404
    },
];

/* eslint-enable global-require */
