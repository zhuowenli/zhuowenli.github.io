/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Promise from 'bluebird';
import ElementUI from 'element-ui';

import VueFilter from './services/filter';
import routes from './routes';
import App from './components/App.vue';
import Loading from './components/loading/';

Vue.component(Loading.name, Loading);

// Install plugins
Vue.use(VueRouter);
Vue.use(VueFilter);
Vue.use(ElementUI);

window.Promise = Promise;

// Set up a new router
const router = new VueRouter({
    routes,
    mode: 'hash', // history
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        return {
            x: 0,
            y: 0
        };
    }
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
