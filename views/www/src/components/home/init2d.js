/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import {getApp} from '../../vuex/getters.js';
import {saveApp} from '../../vuex/actions.js';

const $graphic = $('.graphic');

function setSize2D(e){
    const app = Object.assign({}, getApp(e));

    if(app.centerWidth > graphRO * 2 + 20){
        wWOver = false;
    }else{
        wWOver = true;
    }

    if(app.windowHeight > 840){
        wHOver = false;
    }else{
        wHOver = true;
    }

    if(wHOver && wWOver){
        graphR  = (app.centerWidth - 60)/2;
    }else if(!wHOver && wWOver){
        graphR  = (app.centerWidth - 60)/2;
    }else if(wHOver && !wWOver){
        graphR  = (app.windowHeight - 160)/2;
    }else{
        graphR  = graphRO;
    }

    graphRadius = graphR * ratio;

    canvasCR = $('.circle')[0];
    ctxCR = canvasCR.getContext('2d');
    canvasCR.width = canvasWidth;
    canvasCR.height = canvasHeight;

    $('.graphic').css({
        'width':canvasWidth/ratio,
        'height':canvasHeight/ratio,
        'margin-left':-canvasWidthHalf/ratio,
        'margin-top':-canvasHeightHalf/ratio
    });

    // ======================================================================//
    //
    // FOR POINTS
    //
    // ======================================================================//

    pointStatus = {
        w:140*ratio,
        h:70*ratio,
        x:canvasWidthHalf + graphRadius - 129*ratio,
        y:50*ratio,
        ox:canvasWidthHalf + graphRadius + 11,
        oy:50*ratio + 70*ratio
    };

    pointPosition = [];
    for (var i = 1; i < 10; i++) {
        var x1 = pointStatus.x + (pointStatus.w/10)*i;
        var y1 = pointStatus.y + (pointStatus.h/5)*i;
        var x2 = pointStatus.ox;
        var y2 = pointStatus.oy;
        pointPosition.push([x1,y1,x2,y2]);
    };

    textPosition = [];
    var tx1 = pointStatus.ox;
    var ty1 = pointStatus.oy + 17*ratio;
    var tx2 = pointStatus.x - 17*ratio;
    var ty2 = pointStatus.y - 2*ratio;
    var tx3 = pointStatus.x - 55*ratio;
    var ty3 = pointStatus.y - 2*ratio;
    var tx4 = pointStatus.x - 55*ratio;
    var ty4 = pointStatus.y + 12*ratio;
    var tx5 = pointStatus.x - 100*ratio;
    textPosition.push(tx1,ty1,tx2,ty2,tx3,ty3,tx4,ty4,tx5);

    // ======================================================================//
    //
    // FOR CIRCLE
    //
    // ======================================================================//

    MemoriPosition = [];
    for (var i = 360; i > 0; i--) {
        var x1 = (graphRadius) * Math.cos(i*RAD) + canvasWidthHalf;
        var y1 = (graphRadius) * Math.sin(i*RAD) + canvasHeightHalf;
        var x2 = (graphRadius - 50*ratio) * Math.cos(i*RAD) + canvasWidthHalf;
        var y2 = (graphRadius - 50*ratio) * Math.sin(i*RAD) + canvasHeightHalf;
        MemoriPosition.push([x1,y1,x2,y2]);
    };

    MemoriFlag = true;

    MemoriInnerPosition = [];
    for (var i = 360; i > 0; i-=2) {
        var x1 = (graphRadius - 70*ratio) * Math.cos(i*RAD) + canvasWidthHalf;
        var y1 = (graphRadius - 70*ratio) * Math.sin(i*RAD) + canvasHeightHalf;
        var x2 = (graphRadius - 74*ratio) * Math.cos(i*RAD) + canvasWidthHalf;
        var y2 = (graphRadius - 74*ratio) * Math.sin(i*RAD) + canvasHeightHalf;
        MemoriInnerPosition.push([x1,y1,x2,y2]);
    };


    barChartRadius = [];
    barChartPar = [0.001,0.001,0.001,0.001,0.001];
    for (var i = 5; i >= 0; i--) {barChartRadius.push(graphRadius - 40*ratio + i*5*ratio);};

    pvRatio = [0.001,0.001,0.001,0.001,0.001,0.001];
    MemoriOuterDegree = 36;
    MemoriOuterR1 = graphRadius + 10*ratio;
    MemoriOuterR2 = graphRadius + 25*ratio;
    MemoriOuterR3 = graphRadius + 17*ratio;
    gaishuuPosition = [];
    setMemoriOuter(0);


    // ======================================================================//
    //
    // OFFSET
    //
    // ======================================================================//

    if($graphic.length){
        var x = $graphic.offset().left;
        var y = $graphic.offset().top;
        canvasXY.x = x;
        canvasXY.y = y;
    }
}

function setMemoriOuter(deg){
    var x1 = MemoriOuterR1 * Math.cos(deg*RAD) + canvasWidthHalf;
    var y1 = MemoriOuterR1 * Math.sin(deg*RAD) + canvasHeightHalf;
    var x2 = MemoriOuterR2 * Math.cos(deg*RAD) + canvasWidthHalf;
    var y2 = MemoriOuterR2 * Math.sin(deg*RAD) + canvasHeightHalf;
    var x3 = MemoriOuterR1 * Math.cos((MemoriOuterDegree+deg)*RAD) + canvasWidthHalf;
    var y3 = MemoriOuterR1 * Math.sin((MemoriOuterDegree+deg)*RAD) + canvasHeightHalf;
    var x4 = MemoriOuterR2 * Math.cos((MemoriOuterDegree+deg)*RAD) + canvasWidthHalf;
    var y4 = MemoriOuterR2 * Math.sin((MemoriOuterDegree+deg)*RAD) + canvasHeightHalf;

    gaishuuPosition.push(x1,y1,x2,y2,x3,y3,x4,y4);
}

function loadPageview(){

    animatePv     = [];
    animatePvName = [];
    animateBarTo  = [];
    animatePvTo   = [];

    animatePv = {
        'name' :[],
        'view' :[],
        'line' :[],
        'day' :[],
        'circle':[]
    };

    animatePvFrom = [0,0,0,0,0,0,0];
    $day = $('.day');
    $v1 = $('.view1');
    $v2 = $('.view2');
    $v3 = $('.view3');
    $v4 = $('.view4');
    $v5 = $('.view5');
    $v6 = $('.view6');
    $total = $('.total');

    $dnames = $('.dnames');
    $onames = $('.onames');
    $bnames = $('.bnames');

    $.ajax({
        type: 'GET',
        url: 'http://newstech.sakura.ne.jp/ga/files/pageview.json',
        dataType: 'json',
        success: function(json){
            var pvlen = json['pageview'].length;

            var totalpv = 0;
            var totalarr = [];

            for(var i = 0; i < pvlen; i++){
                var p0 = Number(json['pageview'][i]['/']);
                var p1 = Number(json['pageview'][i]['/product/']);
                var p2 = Number(json['pageview'][i]['/about/']);
                var p3 = Number(json['pageview'][i]['/news/']);
                var p4 = Number(json['pageview'][i]['/recruit/']);
                var p5 = Number(json['pageview'][i]['/contact/']);
                var p6 = Number(json['pageview'][i]['ga:pageviews']);
                var total = p1+p2+p3+p4+p5;
                totalarr.push(total);
                totalpv += total;

                animateMax = [p1,p2,p3,p4,p5];
                var max = Math.max.apply(null, animateMax);
                var pv1 = p1/max * 65;
                var pv2 = p2/max * 65;
                var pv3 = p3/max * 65;
                var pv4 = p4/max * 65;
                var pv5 = p5/max * 65;

                // var bar1 = p1/total * 360;
                // var bar2 = p2/total * 360 + bar1;
                // var bar3 = p3/total * 360 + bar2;
                // var bar4 = p4/total * 360 + bar3;
                // var bar5 = p5/total * 360 + bar4;

                animatePv['circle'].push([pv1,pv2,pv3,pv4,pv5]);

                // animatePv['line'].push([0,bar1,bar2,bar3,bar4,bar5]);
                // animatePv['name'].push(['/','/about/','/about/','/about/','/about/','/about/']);

                animatePv['view'].push([p0,p1,p2,p3,p4,p5,p6]);

            }

            var day1 = totalarr[0]/totalpv * 360;
            var day2 = totalarr[1]/totalpv * 360 + day1;
            var day3 = totalarr[3]/totalpv * 360 + day2;
            var day4 = totalarr[4]/totalpv * 360 + day3;
            var day5 = totalarr[5]/totalpv * 360 + day4;

            animatePv['line'].push(0,day1,day2,day3,day4,day5);

            for (var i = 1; i < 7; i++) {
                var today = new Date();
                var month  = today.getMonth()+1;
                var day    = today.getDate()-i;
                var format = month +'.'+day;
                animatePv['day'].push(format);
            };

            /* BROWS */

            uaRatio = [];
            browsRatio = [0];
            browsName = [];

            var len = json['brows'].length;
            var total = 0;
            for (var i = 0; i < len; i++) {
                var num = Number(json['brows'][i][1]);
                total += num;
            };

            var bnum = 0;
            for (var i = 0; i < len; i++) {
                bnum += Number(json['brows'][i][1])/total * 360;
                var name = json['brows'][i][0];
                if(name === 'Internet Explorer'){
                    name = 'IE';
                }
                browsName.push(name);
                browsRatio.push(bnum);
            };

            /* OS */

            var bnum = 0;
            osRatio = [0];
            osName = [];
            var len = json['os'].length;
            var total = 0;
            for (var i = 0; i < len; i++) {
                var num = Number(json['os'][i][1]);
                total += num;
            };

            for (var i = len - 1; i >= 0; i--) {
                bnum += Number(json['os'][i][1])/total * 360;
                var name = json['os'][i][0];
                osName.push(name);
                osRatio.push(bnum);
            };

            /* DEVICE */

            var bnum = 0;
            dvRatio = [0];
            dvName = [];
            var len = json['device'].length;
            var total = 0;
            for (var i = 0; i < len; i++) {
                var num = Number(json['device'][i][1]);
                total += num;
            };
            for (var i = 0; i < len; i++) {
                bnum += Number(json['device'][i][1])/total * 360;
                var name = json['device'][i][0];
                dvName.push(name);
                dvRatio.push(bnum);
            };
            dvRatio.push(360);

            uaRatio.push(dvRatio);
            uaRatio.push(osRatio);
            uaRatio.push(browsRatio);

            onetime = true;
            ajax = true;

            uaID = 0;

            for (var n = 0; n < dvName.length; n++) {
                var html = '<li data-hv="'+uaID+'">'+dvName[n]+'</li>';
                $dnames.append(html);
                uaID++;
            };

            for (var n = 0; n < osName.length; n++) {
                var html = '<li data-hv="'+uaID+'">'+osName[n]+'</li>';
                $onames.append(html);
                uaID++;
            };

            for (var n = 0; n < browsName.length; n++) {
                var html = '<li data-hv="'+uaID+'">'+browsName[n]+'</li>';
                $bnames.append(html);
                uaID++;
            };


            /* PV */
            initRectXY();
            pvRatioAnimateFlag = true;

        }
    });
}

function initRectXY(){
    pvRatioXY = [];
    for ( var i = 0; i < animatePv['line'].length; i ++ ) {
        var x = (graphRadius - 50*ratio) * Math.cos(animatePv['line'][i]*RAD) + canvasWidthHalf;
        var y = (graphRadius - 50*ratio) * Math.sin(animatePv['line'][i]*RAD) + canvasHeightHalf;
        var x1 = Math.floor(x - 5*ratio);
        var y1 = Math.floor(y - 5*ratio);
        var px = (graphRadius - 50*ratio) * Math.cos((animatePv['line'][i]-90)*RAD) + canvasWidthHalf + canvasXY.x;
        var py = (graphRadius - 50*ratio) * Math.sin((animatePv['line'][i]-90)*RAD) + canvasHeightHalf + canvasXY.y;
        pvRatioXY.push([x,y,x1,y1,px,py]);
    }
}

module.exports = {
    setSize2D,
    loadPageview
}