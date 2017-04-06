/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

/* eslint-disable global-require */

const Home = r => require.ensure([], () => r(require('./views/Home')), 'home');
const page404 = r => require.ensure([], () => r(require('./views/404')), 'home');

const posts = r => require.ensure([], () => r(require('./views/posts/')), 'posts');
const postCreate = r => require.ensure([], () => r(require('./views/posts/create')), 'posts');
const postEdit = r => require.ensure([], () => r(require('./views/posts/edit')), 'posts');

const tuchuang = r => require.ensure([], () => r(require('./views/tuchuang/')), 'tuchuang');

module.exports = [
    {
        path: '/',
        name: 'home',
        component: posts,
        meta: {
            title: '文章管理'
        },
    },
    {
        path: '/posts',
        name: 'posts',
        component: posts,
        meta: {
            title: '文章管理'
        },
    },
    {
        path: '/posts/create',
        name: 'postCreate',
        component: postCreate,
        meta: {
            title: '写文章'
        },
    },
    {
        path: '/posts/:id/edit',
        name: 'postEdit',
        component: postEdit,
        meta: {
            title: '编辑'
        },
    },
    {
        path: '/tuchuang',
        name: 'tuchuang',
        component: tuchuang,
        meta: {
            title: '图床工具'
        },
    },
    {
        path: '*',
        name: '404',
        component: page404
    }
];

/* eslint-enable global-require */
