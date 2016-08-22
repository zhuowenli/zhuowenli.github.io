/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import Home from './components/home/index.vue';
import Posts from './components/posts/index.vue';
import Detail from './components/posts/detail.vue';
import About from './components/about/index.vue';
import Contact from './components/contact/index.vue';
import page404 from "./components/404.vue";

export function routerConfig(router) {
    router.map({
        '*': {
            component: page404
        },
        '/': {
            name: 'home',
            component: Home
        },
        '/:type': {
            name: 'posts',
            component: Posts
        },
        '/:type/:id': {
            name: 'detail',
            component: Detail
        },
        '/about': {
            name: 'about',
            component: About
        },
        '/contact': {
            name: 'contact',
            component: Contact
        },
    });
}