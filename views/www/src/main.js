/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import scss from './stylesheets/app.scss';

import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';
import {routerConfig} from './router-config.js';
import VueFilter from './services/filter.js';

import App from './components/App.vue';

// Install plugins
Vue.use(Router);
Vue.use(Resource);

// Filters
Vue.use(VueFilter);

// Set up a new router
var router = new Router({
    history: true,
    saveScrollPosition: true,
    transitionOnLoad: true
});

// Route config
routerConfig(router);

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
});

// Start up our app
router.start(App, '#app');