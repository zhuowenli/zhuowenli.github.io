/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import Home from './components/home/index.vue';
import Pay from './components/Pay.vue';
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
        '/pay': {
            name: 'pay',
            component: Pay
        }
    });
}