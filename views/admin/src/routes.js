/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

/* eslint-disable global-require */

const Home = r => require.ensure([], () => r(require('./views/Home.vue')), 'home');
const page404 = r => require.ensure([], () => r(require('./views/404.vue')), 'home');

const posts = r => require.ensure([], () => r(require('./views/posts/index.vue')), 'posts');
// const advancedAdmin = r => require.ensure([], () => r(require('./views/advanced/admin/index.vue')), 'advanced');
// const advancedAdminEdit = r => require.ensure([], () => r(require('./views/advanced/admin/edit.vue')), 'advanced');

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
        path: '*',
        name: '404',
        component: page404
    }
];

/* eslint-enable global-require */
