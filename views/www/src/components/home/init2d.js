/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import {getApp} from '../../vuex/getters.js';
import {saveApp} from '../../vuex/actions.js';
import Promise from 'bluebird';

const $graphic = $('.graphic');

function setSize2D(app){
    if(app.centerWidth > app.graphRO * 2 + 20){
        app.wWOver = false;
    }else{
        app.wWOver = true;
    }

    if(app.windowHeight > 840){
        app.wHOver = false;
    }else{
        app.wHOver = true;
    }

    if(app.wHOver && app.wWOver){
        app.graphR  = (app.centerWidth - 60) / 2;
    }else if(!app.wHOver && app.wWOver){
        app.graphR  = (app.centerWidth - 60) / 2;
    }else if(app.wHOver && !app.wWOver){
        app.graphR  = (app.windowHeight - 160) / 2;
    }else{
        app.graphR  = app.graphRO;
    }

    app.graphRadius = app.graphR * app.ratio;

    app.canvasCR = $('.circle')[0];
    app.ctxCR = app.canvasCR.getContext('2d');
    app.canvasCR.width = app.canvasWidth;
    app.canvasCR.height = app.canvasHeight;

    $('.graphic').css({
        'width': app.canvasWidth / app.ratio,
        'height': app.canvasHeight / app.ratio,
        'margin-left': -app.canvasWidthHalf / app.ratio,
        'margin-top': -app.canvasHeightHalf / app.ratio
    });

    // ======================================================================//
    //
    // FOR POINTS
    //
    // ======================================================================//

    app.pointStatus = {
        w: 140 * app.ratio,
        h: 70 * app.ratio,
        x: app.canvasWidthHalf + app.graphRadius - 129 * app.ratio,
        y: 50 * app.ratio,
        ox: app.canvasWidthHalf + app.graphRadius + 11,
        oy: 50 * app.ratio + 70 * app.ratio
    };

    app.pointPosition = [];
    for (let i = 1; i < 10; i++) {
        const x1 = app.pointStatus.x + (app.pointStatus.w / 10) * i;
        const y1 = app.pointStatus.y + (app.pointStatus.h / 5) * i;
        const x2 = app.pointStatus.ox;
        const y2 = app.pointStatus.oy;
        app.pointPosition.push([x1, y1, x2, y2]);
    };

    app.textPosition = [];
    const tx1 = app.pointStatus.ox;
    const ty1 = app.pointStatus.oy + 17 * app.ratio;
    const tx2 = app.pointStatus.x - 17 * app.ratio;
    const ty2 = app.pointStatus.y - 2 * app.ratio;
    const tx3 = app.pointStatus.x - 55 * app.ratio;
    const ty3 = app.pointStatus.y - 2 * app.ratio;
    const tx4 = app.pointStatus.x - 55 * app.ratio;
    const ty4 = app.pointStatus.y + 12 * app.ratio;
    const tx5 = app.pointStatus.x - 100 * app.ratio;
    app.textPosition.push(tx1, ty1, tx2, ty2, tx3, ty3, tx4, ty4, tx5);

    // ======================================================================//
    //
    // FOR CIRCLE
    //
    // ======================================================================//

    app.MemoriPosition = [];
    for (let i = 360; i > 0; i--) {
        const x1 = (app.graphRadius) * Math.cos(i * app.RAD) + app.canvasWidthHalf;
        const y1 = (app.graphRadius) * Math.sin(i * app.RAD) + app.canvasHeightHalf;
        const x2 = (app.graphRadius - 50 * app.ratio) * Math.cos(i * app.RAD) + app.canvasWidthHalf;
        const y2 = (app.graphRadius - 50 * app.ratio) * Math.sin(i * app.RAD) + app.canvasHeightHalf;
        app.MemoriPosition.push([x1, y1, x2, y2]);
    };

    app.MemoriFlag = true;
    app.MemoriInnerPosition = [];

    for (let i = 360; i > 0; i -= 2) {
        const x1 = (app.graphRadius - 70 * app.ratio) * Math.cos(i * app.RAD) + app.canvasWidthHalf;
        const y1 = (app.graphRadius - 70 * app.ratio) * Math.sin(i * app.RAD) + app.canvasHeightHalf;
        const x2 = (app.graphRadius - 74 * app.ratio) * Math.cos(i * app.RAD) + app.canvasWidthHalf;
        const y2 = (app.graphRadius - 74 * app.ratio) * Math.sin(i * app.RAD) + app.canvasHeightHalf;
        app.MemoriInnerPosition.push([x1, y1, x2, y2]);
    };


    app.barChartRadius = [];
    app.barChartPar = [0.001, 0.001, 0.001, 0.001, 0.001];
    for (let i = 5; i >= 0; i--) {
        app.barChartRadius.push(app.graphRadius - 40 * app.ratio + i * 5 * app.ratio);
    };

    app.pvRatio = [0.001,0.001,0.001,0.001,0.001,0.001];
    app.MemoriOuterDegree = 36;
    app.MemoriOuterR1 = app.graphRadius + 10 * app.ratio;
    app.MemoriOuterR2 = app.graphRadius + 25 * app.ratio;
    app.MemoriOuterR3 = app.graphRadius + 17 * app.ratio;
    app.gaishuuPosition = [];

    setMemoriOuter(app, 0);


    // ======================================================================//
    //
    // OFFSET
    //
    // ======================================================================//

    if($graphic.length){
        const x = $graphic.offset().left;
        const y = $graphic.offset().top;

        app.canvasXY.x = x;
        app.canvasXY.y = y;
    }

    return Promise.resolve();
}

function setMemoriOuter(app, deg){
    const x1 = app.MemoriOuterR1 * Math.cos(deg * app.RAD) + app.canvasWidthHalf;
    const y1 = app.MemoriOuterR1 * Math.sin(deg * app.RAD) + app.canvasHeightHalf;
    const x2 = app.MemoriOuterR2 * Math.cos(deg * app.RAD) + app.canvasWidthHalf;
    const y2 = app.MemoriOuterR2 * Math.sin(deg * app.RAD) + app.canvasHeightHalf;
    const x3 = app.MemoriOuterR1 * Math.cos((app.MemoriOuterDegree + deg) * app.RAD) + app.canvasWidthHalf;
    const y3 = app.MemoriOuterR1 * Math.sin((app.MemoriOuterDegree + deg) * app.RAD) + app.canvasHeightHalf;
    const x4 = app.MemoriOuterR2 * Math.cos((app.MemoriOuterDegree + deg) * app.RAD) + app.canvasWidthHalf;
    const y4 = app.MemoriOuterR2 * Math.sin((app.MemoriOuterDegree + deg) * app.RAD) + app.canvasHeightHalf;

    app.gaishuuPosition.push(x1, y1, x2, y2, x3, y3, x4, y4);
}

function loadPageview(){
}

module.exports = {
    setSize2D,
    loadPageview,
    setMemoriOuter
}