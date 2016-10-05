/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Promise from 'bluebird';

import {
    Base,
    Dropdown,
    DropdownItem,
    Tabs,
    TabPane,
    Table,
    TableColumn,
    Tooltip,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Button,
    Pagination,
    // ...
} from 'element-ui';

import VueFilter from './services/filter';
import routes from './routes';
import App from './components/App.vue';

Vue.component(Button.name, Button);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Tooltip.name, Tooltip);

Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Pagination.name, Pagination);

// Install plugins
Vue.use(VueRouter);
Vue.use(VueFilter);

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
