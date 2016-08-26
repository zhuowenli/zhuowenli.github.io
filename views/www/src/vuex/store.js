/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态
const state = {
    // TODO: 放置初始状态
    app: {
        RAD: Math.PI / 180,
        PI2: Math.PI * 2,
        windowWidth: 0,
        windowHeight: 0,
        windowWidthHalf: 0,
        windowHeightHalf: 0,
        wHOver: false,
        wWOver: false,
        canvasWidth: 0,
        canvasHeight: 0,
        canvasWidthHalf: 0,
        canvasHeightHalf: 0,
        mouseStatus: {
            x: 0,
            y: 0,
            cx: 0,
            cy: 0,
            px: 0,
            py: 0,
            deg: 0
        },
        ratio: 1,
        graphR: 0,
        loadFlag: false,
        mousedeg: 0,
        canPlayFlag: true,
        richFlag: false,
        onetime: false,
        ajax: false,
        pvHover: 0,
        canvasXY: {
            x: 0,
            y: 0
        },
        easeing: Power4.easeInOut,
        pvRatioAnimateFlag: false,
        circleAnimateFlag: false,
        subpageFlag: false,
        aboutFlag: false,
        spFlag: false,
        renderAboutInt: null,
        render2DInt: null,
        render3DInt: null,
        activeUser: 0,
        fetFlag: false,
        splash: false,
        webGL: true,
        webAudio: true,
        MODELZ: 0,
    },
};


// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    SAVE_APP(state, app) {
        state.app = app;
    }
};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations
});