/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import Home from './components/home/index.vue';
import Frontend from './components/frontend/index.vue';
import Design from './components/design/index.vue';
import Diary from './components/diary/index.vue';
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
        '/frontend': {
            name: 'frontend',
            component: Frontend
        },
        '/design': {
            name: 'design',
            component: Design
        },
        '/diary': {
            name: 'diary',
            component: Diary
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