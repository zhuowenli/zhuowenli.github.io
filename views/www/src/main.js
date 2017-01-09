/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Promise from 'bluebird';

import VueFilter from './services/filter';
import routes from './routes';
import App from './components/App';
import LikeCounter from './components/like-counter/';
import Loading from './components/loading/';

// Install plugins
Vue.use(VueRouter);
Vue.use(VueFilter);

Vue.component(Loading.name, Loading);
Vue.component(LikeCounter.name, LikeCounter);

window.Promise = Promise;

// Set up a new router
const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (from.name === 'home') {
            return savedPosition;
        }

        return savedPosition;
    }
});


new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
