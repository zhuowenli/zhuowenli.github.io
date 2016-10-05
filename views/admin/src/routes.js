/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

/* eslint-disable global-require */

const Home = r => require.ensure([], () => r(require('./views/Home.vue')), 'home');
const page404 = r => require.ensure([], () => r(require('./views/404.vue')), 'home');

const posts = r => require.ensure([], () => r(require('./views/posts/index.vue')), 'posts');
const postAdd = r => require.ensure([], () => r(require('./views/posts/add.vue')), 'posts');

module.exports = [
    {
        path: '/',
        name: 'home',
        component: Home
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
        path: '/posts/add',
        name: 'postAdd',
        component: postAdd,
        meta: {
            title: '写文章'
        },
    },
    {
        path: '*',
        name: '404',
        component: page404
    }
];

/* eslint-enable global-require */
