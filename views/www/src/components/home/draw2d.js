// ======================================================================//
//
// LINES
//
// ======================================================================//

import {setMemoriOuter} from './init2d.js';

var lineObject = [
    [1,310,242,310,292,260,292],
    [1,-310,242,-310,292,-260,292],
    [0.3,329,305,329,311,181,311,181,305],
    [0.3,270,305,270,311],
    [0.3,330,316,180,316],
    [1,180,-352,180,-358,330,-358,330,-352,-330,-352],
    [1,270,-352,270,-358],
    [0.2,330,-364,180,-364]
];

const B1 = [330, 330];
const B2 = [330,-413];
const B3 = [109,-413];
const BTNCOLOR = ['rgba(223,245,255, 0.5)', 'rgba(223,245,255, 0)'];
const BARCHARTCOLOR = ['rgba(235,39,85,1)', 'rgba(109,126,132,1)', 'rgba(223,245,255,1)', 'rgba(223,245,255,1)', 'rgba(223,245,255,1)'];
const CENTERCOLOR = [168,215,215,1];
const MOUSEDEGCOLOR = [223,245,255];
const PVCOLOR = [168,215,215];
const PV2COLOR = [223,245,255,0.2];
const LNCOLOR = {'RGB':[109,126,132],'ALPHA':[1,1,0.3,0.3,0.3,1,1,0.2]};
const SOUSHOKUCOLOR  = {'RGB':[223,245,255],'ALPHA':[0.2,0.2]};
const BXCOLOR = {'RGB':[109,126,132],'ALPHA':[1,0.3]};
const MEMORICOLOR = {'RGB':[109,126,132],'ALPHA':[1,0.3]};
const GAISHUUCOLOR = {'RGB':[223,245,255],'ALPHA':[0.3,0.1,0.1,0.2]};
const HYOUCOLOR = {'RGB':[223,245,255],'ALPHA':[0.3,0.1,0.2,0.6,1,0.6]};
const FONTCOLOR = [223,245,255, 223,245,255, 37,45,48, 223,245,255 ];
const UACOLOR = [223,245,255,0.2];
const AVCOLOR = {'RGB':[223,245,255],'ALPHA':[0.1,0.4,1,0.4]};

let app = {};

function drawLN(app){

    app.ctxCR.save();

    app.ctxCR.translate(app.canvasWidthHalf, app.canvasHeightHalf);
    app.ctxCR.rotate(90 * Math.PI / 180);
    app.ctxCR.translate(-app.canvasWidthHalf, -app.canvasHeightHalf);

    // ==================================//
    // LINE
    // ==================================//

    app.ctxCR.lineWidth = 1 * app.ratio;
    for (var i = 0; i < lineObject.length; i++) {
        var r = LNCOLOR['RGB'][0];
        var g = LNCOLOR['RGB'][1];
        var b = LNCOLOR['RGB'][2];
        var alpha = LNCOLOR['ALPHA'][i];
        app.ctxCR.strokeStyle = 'rgba('+r+','+g+','+b+','+alpha+')';
        app.ctxCR.beginPath();

        for (var n = 1; n < lineObject[i].length; n+=2) {
            var x = app.canvasWidthHalf - lineObject[i][n] * app.ratio;
            var y = app.canvasHeightHalf - lineObject[i][n + 1] * app.ratio;
            app.ctxCR.lineTo(x,y);
        };
        app.ctxCR.stroke();
    };

    // ==================================//
    // BOX
    // ==================================//

    app.ctxCR.strokeStyle = 'rgba('+BXCOLOR['RGB'][0]+','+BXCOLOR['RGB'][1]+','+BXCOLOR['RGB'][2]+','+BXCOLOR['ALPHA'][0]+')';
    app.ctxCR.beginPath();
    var x = app.canvasWidthHalf - B1[0] * app.ratio;
    var y = app.canvasHeightHalf - B1[1] * app.ratio;
    app.ctxCR.rect(x,y, 151 * app.ratio, 6 * app.ratio);
    app.ctxCR.stroke();

    app.ctxCR.strokeStyle = 'rgba('+BXCOLOR['RGB'][0]+','+BXCOLOR['RGB'][1]+','+BXCOLOR['RGB'][2]+','+BXCOLOR['ALPHA'][1]+')';
    app.ctxCR.beginPath();
    var x = app.canvasWidthHalf - B2[0] * app.ratio;
    var y = app.canvasHeightHalf - B2[1] * app.ratio;
    app.ctxCR.rect(x,y, 215 * app.ratio, 4 * app.ratio);
    app.ctxCR.stroke();

    app.ctxCR.beginPath();
    var x = app.canvasWidthHalf - B3[0] * app.ratio;
    var y = app.canvasHeightHalf - B3[1] * app.ratio;
    app.ctxCR.rect(x,y, 438 * app.ratio, 4 * app.ratio);
    app.ctxCR.stroke();

    // ==================================//
    // MEMORI
    // ==================================//

    app.ctxCR.strokeStyle = 'rgba('+MEMORICOLOR['RGB'][0]+','+MEMORICOLOR['RGB'][1]+','+MEMORICOLOR['RGB'][2]+','+MEMORICOLOR['ALPHA'][0]+')';

    app.ctxCR.beginPath();
    var x1 = app.canvasWidthHalf - 330 * app.ratio;
    var x2 = app.canvasWidthHalf + 330 * app.ratio;
    var y2 = app.canvasHeightHalf + 394 * app.ratio;
    app.ctxCR.moveTo(x1,y1);
    app.ctxCR.lineTo(x1,y2);
    app.ctxCR.stroke();

    for (var i = 0; i < 7; i++) {
        app.ctxCR.beginPath();
        if(i === 6){
            var x1 = app.canvasWidthHalf - (330 - i*110) * app.ratio - 1 * app.ratio;
        }else{
            var x1 = app.canvasWidthHalf - (330 - i*110) * app.ratio;
        }
        var y1 = app.canvasHeightHalf + 394 * app.ratio;
        var y2 = app.canvasHeightHalf + 388 * app.ratio;
        app.ctxCR.moveTo(x1,y1);
        app.ctxCR.lineTo(x1,y2);
        app.ctxCR.stroke();
    };

    app.ctxCR.strokeStyle = 'rgba('+MEMORICOLOR['RGB'][0]+','+MEMORICOLOR['RGB'][1]+','+MEMORICOLOR['RGB'][2]+','+MEMORICOLOR['ALPHA'][1]+')';

    for (var i = 0; i < 133; i++) {
        app.ctxCR.beginPath();
        if(i === 132){
            var x1 = app.canvasWidthHalf - (330 - i*5) * app.ratio - 1 * app.ratio;
        }else{
            var x1 = app.canvasWidthHalf - (330 - i*5) * app.ratio;
        }
        var y1 = app.canvasHeightHalf + 397 * app.ratio;
        var y2 = app.canvasHeightHalf + 399 * app.ratio;
        app.ctxCR.moveTo(x1,y1);
        app.ctxCR.lineTo(x1,y2);
        app.ctxCR.stroke();
    };

    app.ctxCR.restore();
}

// ======================================================================//
//
// CIRCLE
//
// ======================================================================//

var jiten = 0;

function drawCR(app){

    // var lx1 = -app.mouseStatus.cy/100;
    // var ly1 = app.mouseStatus.cx /100;

    if(jiten < 361){
        jiten+= 0.1;
    }else{
        jiten = 0;
    }

    var lx1 = 0;
    var ly1 = 0;
    var lx2 = 0;
    var ly2 = 0;
    var lx3 = 0;
    var ly3 = 0;

    app.ctxCR.clearRect(0,0, app.canvasWidth, app.canvasHeight);
    app.ctxCR.lineWidth = 1 *app.ratio;

    // ==================================//
    // 蜀�捉繝｡繝｢繝ｪ
    // ==================================//
    app.ctxCR.save();

    app.ctxCR.translate(app.canvasWidthHalf+lx1, app.canvasHeightHalf+ly1);
    app.ctxCR.rotate(jiten/2 * Math.PI / 180);
    app.ctxCR.translate(-app.canvasWidthHalf+lx1, -app.canvasHeightHalf+ly1);

    app.ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][0]+')';
    app.ctxCR.beginPath();
    for (var i = app.MemoriInnerPosition.length - 1; i >= 0; i--) {
        app.ctxCR.moveTo(app.MemoriInnerPosition[i][0], app.MemoriInnerPosition[i][1]);
        app.ctxCR.lineTo(app.MemoriInnerPosition[i][2], app.MemoriInnerPosition[i][3]);
    };
    app.ctxCR.stroke();

    app.ctxCR.restore();

    // ==================================//
    // 螟門捉繝｡繝｢繝ｪ
    // ==================================//

    // var lx2 = -app.mouseStatus.cy/60;
    // var ly2 = app.mouseStatus.cx /60;

    app.ctxCR.save();

    app.ctxCR.translate(app.canvasWidthHalf+lx2, app.canvasHeightHalf+ly2);
    app.ctxCR.rotate(jiten * Math.PI / 180);
    app.ctxCR.translate(-app.canvasWidthHalf+lx2, -app.canvasHeightHalf+ly2);

    app.ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][1]+')';
    app.ctxCR.beginPath();
    for (var i = app.MemoriPosition.length - 1; i >= 0; i--) {
        app.ctxCR.moveTo(app.MemoriPosition[i][0],app.MemoriPosition[i][1]);
        app.ctxCR.lineTo(app.MemoriPosition[i][2],app.MemoriPosition[i][3]);
    };
    app.ctxCR.stroke();

    app.ctxCR.restore();

    // ==================================//
    // 螟門捉縺ｮ邱�
    // ==================================//

    app.ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][2]+')';
    app.ctxCR.beginPath();
    app.ctxCR.arc( app.canvasWidthHalf+lx2, app.canvasHeightHalf+ly2, app.graphRadius, 0, app.PI2, true );
    app.ctxCR.stroke();

    app.ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][3]+')';
    app.ctxCR.beginPath();
    app.ctxCR.arc( app.canvasWidthHalf+lx2, app.canvasHeightHalf+ly2, app.graphRadius - 50 *app.ratio, 0, app.PI2, true );
    app.ctxCR.stroke();

    // ==================================//
    // 螟門捉繧ｰ繝ｩ繝�
    // ==================================//

    app.ctxCR.lineWidth = 3 *app.ratio;
    for (var i = app.barChartPar.length - 1; i >= 0; i--) {
        var deg = app.barChartPar[i]*3.6;
        var endAngle = deg * app.RAD;
        app.ctxCR.strokeStyle = BARCHARTCOLOR[i];
        app.ctxCR.beginPath();
        app.ctxCR.arc(app.canvasWidthHalf+lx2,app.canvasHeightHalf+ly2, app.barChartRadius[i], 0, endAngle, false );
        app.ctxCR.stroke();
    };

    // ==================================//
    // 蜀�Κ縲√さ繝ｳ繝�Φ繝��PV豈皮紫
    // ==================================//

    // var lx3 = -app.mouseStatus.cy/30;
    // var ly3 = app.mouseStatus.cx /30;

    app.ctxCR.lineWidth = 1 *app.ratio;
    app.ctxCR.strokeStyle = 'rgba('+PVCOLOR[0]+','+PVCOLOR[1]+','+PVCOLOR[2]+',1)';

    if(app.pvRatioAnimateFlag){

        app.ctxCR.save();

            app.ctxCR.translate(lx3,ly3);

            for ( var i = 0; i < app.pvRatio.length; i ++ ) {
                var pvDegNow  = app.pvRatio[i] - 15;
                var pvDegNext = app.pvRatio[i] + 15;
                if(pvDegNow < app.mouseStatus.deg && pvDegNext > app.mouseStatus.deg){
                    app.pvHover = i;
                    app.ctxCR.fillStyle = 'rgba('+PVCOLOR[0]+','+PVCOLOR[1]+','+PVCOLOR[2]+',0.3)';
                }else{
                    app.ctxCR.fillStyle = 'rgba('+PVCOLOR[0]+','+PVCOLOR[1]+','+PVCOLOR[2]+',0)';
                }
                app.ctxCR.beginPath();
                app.ctxCR.rect(app.pvRatioXY[i][2],app.pvRatioXY[i][3],10 *app.ratio,10 *app.ratio);
                app.ctxCR.stroke();
                app.ctxCR.fill();
            }

            app.ctxCR.strokeStyle = 'rgba('+PV2COLOR[0]+','+PV2COLOR[1]+','+PV2COLOR[2]+','+PV2COLOR[3]+')';
            app.ctxCR.beginPath();
                for ( var i = 0; i < app.pvRatio.length; i ++ ) {
                    app.ctxCR.lineTo(app.pvRatioXY[i][0],app.pvRatioXY[i][1]);
                }
                var x = (app.graphRadius - 50 *app.ratio) * Math.cos(360*app.RAD) + app.canvasWidthHalf;
                var y = (app.graphRadius - 50 *app.ratio) * Math.sin(360*app.RAD) + app.canvasHeightHalf;
                app.ctxCR.lineTo(x,y);
            app.ctxCR.stroke();


        app.ctxCR.restore();

    }



    // ==================================//
    // 螟門捉陬�｣ｾ
    // ==================================//

    setMemoriOuter(app, 0);
    app.ctxCR.strokeStyle = 'rgba('+SOUSHOKUCOLOR['RGB'][0]+','+SOUSHOKUCOLOR['RGB'][1]+','+SOUSHOKUCOLOR['RGB'][2]+','+SOUSHOKUCOLOR['ALPHA'][0]+')';
    app.ctxCR.beginPath();
    app.ctxCR.arc(app.canvasWidthHalf,app.canvasHeightHalf, app.MemoriOuterR2, 0, app.MemoriOuterDegree * app.RAD, false );
    app.ctxCR.stroke();

    setMemoriOuter(app, 0);
    app.ctxCR.strokeStyle = 'rgba('+SOUSHOKUCOLOR['RGB'][0]+','+SOUSHOKUCOLOR['RGB'][1]+','+SOUSHOKUCOLOR['RGB'][2]+','+SOUSHOKUCOLOR['ALPHA'][1]+')';
    app.ctxCR.beginPath();
    app.ctxCR.arc(app.canvasWidthHalf,app.canvasHeightHalf, app.MemoriOuterR2+5 *app.ratio, 0, app.MemoriOuterDegree * app.RAD, false );
    app.ctxCR.stroke();

    app.ctxCR.beginPath();
    app.ctxCR.lineTo(app.gaishuuPosition[0],app.gaishuuPosition[1]);
    app.ctxCR.lineTo(app.gaishuuPosition[2],app.gaishuuPosition[3]);
    app.ctxCR.stroke();
    app.ctxCR.beginPath();
    app.ctxCR.lineTo(app.gaishuuPosition[4],app.gaishuuPosition[5]);
    app.ctxCR.lineTo(app.gaishuuPosition[6],app.gaishuuPosition[7]);
    app.ctxCR.stroke();

    // ==================================//
    // 繝槭え繧ｹ蠎ｧ讓�
    // ==================================//

    app.mouseDegBegin = app.mouseStatus.deg-18;
    app.mouseDegEnd = app.mouseStatus.deg+18;

    app.ctxCR.strokeStyle = 'rgba('+MOUSEDEGCOLOR[0]+','+MOUSEDEGCOLOR[1]+','+MOUSEDEGCOLOR[2]+',1)';
    app.ctxCR.beginPath();
    app.ctxCR.arc(app.canvasWidthHalf,app.canvasHeightHalf, app.MemoriOuterR1-1, app.mouseDegBegin * app.RAD, app.mouseDegEnd * app.RAD, false );
    app.ctxCR.stroke();

    var mdb1 = Math.cos(app.mouseDegBegin*app.RAD);
    var mdb2 = Math.sin(app.mouseDegBegin*app.RAD);
    var mde1 = Math.cos(app.mouseDegEnd*app.RAD);
    var mde2 = Math.sin(app.mouseDegEnd*app.RAD);

    var mx1 = app.graphRadius * mdb1 + app.canvasWidthHalf;
    var my1 = app.graphRadius * mdb2 + app.canvasHeightHalf;
    var mx2 = app.MemoriOuterR3 * mdb1 + app.canvasWidthHalf;
    var my2 = app.MemoriOuterR3 * mdb2 + app.canvasHeightHalf;
    var mx3 = app.graphRadius * mde1 + app.canvasWidthHalf;
    var my3 = app.graphRadius * mde2 + app.canvasHeightHalf;
    var mx4 = app.MemoriOuterR3 * mde1 + app.canvasWidthHalf;
    var my4 = app.MemoriOuterR3 * mde2 + app.canvasHeightHalf;

    app.ctxCR.lineWidth = 1 *app.ratio;
    app.ctxCR.strokeStyle = 'rgba('+MOUSEDEGCOLOR[0]+','+MOUSEDEGCOLOR[1]+','+MOUSEDEGCOLOR[2]+',0.2)';
    app.ctxCR.beginPath();
    app.ctxCR.lineTo(mx3,my3);
    app.ctxCR.lineTo(app.canvasWidthHalf,app.canvasHeightHalf);
    app.ctxCR.stroke();

    app.ctxCR.lineWidth = 2 *app.ratio;
    app.ctxCR.strokeStyle = 'rgba('+MOUSEDEGCOLOR[0]+','+MOUSEDEGCOLOR[1]+','+MOUSEDEGCOLOR[2]+',1)';
    app.ctxCR.beginPath();
    app.ctxCR.lineTo(mx1,my1);
    app.ctxCR.lineTo(mx2,my2);
    app.ctxCR.stroke();
    app.ctxCR.beginPath();
    app.ctxCR.lineTo(mx3,my3);
    app.ctxCR.lineTo(mx4,my4);
    app.ctxCR.stroke();

    // ==================================//
    // 繝槭え繧ｹ�亥渚蟇ｾ��
    // ==================================//

    app.mouseDegHantai = app.mouseStatus.deg-180;

    var mx5 = app.MemoriOuterR3 * Math.cos(app.mouseDegHantai*app.RAD) + app.canvasWidthHalf;
    var my5 = app.MemoriOuterR3 * Math.sin(app.mouseDegHantai*app.RAD) + app.canvasHeightHalf;
    var mx6 = (app.MemoriOuterR3-7 *app.ratio) * Math.cos(app.mouseDegHantai*app.RAD) + app.canvasWidthHalf;
    var my6 = (app.MemoriOuterR3-7 *app.ratio) * Math.sin(app.mouseDegHantai*app.RAD) + app.canvasHeightHalf;

    app.ctxCR.beginPath();
    app.ctxCR.moveTo(mx5,my5);
    app.ctxCR.lineTo(mx6,my6);
    app.ctxCR.stroke();

    // ==================================//
    // 譁�ｭ�
    // ==================================//

    app.degText = (app.mouseStatus.deg/3.6).toFixed(3);

    app.ctxCR.fillStyle = 'rgba('+FONTCOLOR[9]+','+FONTCOLOR[10]+','+FONTCOLOR[11]+',1)';
    app.ctxCR.font = 9 *app.ratio+"px 'Roboto'";
    app.ctxCR.fillText(app.degText,app.canvasWidthHalf+app.graphRadius+40 *app.ratio,app.canvasHeightHalf);
    app.ctxCR.font = 9 *app.ratio+"px 'Roboto'";
    app.ctxCR.fillText('10',app.gaishuuPosition[6]+15 *app.ratio,app.gaishuuPosition[7]+10 *app.ratio);

    // ==================================//
    // 蝗櫁ｻ｢
    // ==================================//

    app.ctxCR.translate(app.canvasWidthHalf, app.canvasHeightHalf);
    app.ctxCR.rotate(-90 * Math.PI / 180);
    app.ctxCR.translate(-app.canvasWidthHalf+0.5, -app.canvasHeightHalf+0.5);

    app.ctxCR.restore();
    app.ctxCR.save();
}


// ======================================================================//
//
// POINT
//
// ======================================================================//


function drawPT(app){

    // ==================================//
    // 荳ｭ蠢�
    // ==================================//

    app.ctxCR.save();

        app.ctxCR.translate(0.5 *app.ratio,0.5 *app.ratio);
        app.ctxCR.lineWidth = 2 *app.ratio;
        app.ctxCR.strokeStyle = 'rgba('+CENTERCOLOR[0]+','+CENTERCOLOR[1]+','+CENTERCOLOR[2]+','+CENTERCOLOR[3]+')';
        app.ctxCR.beginPath();
        app.ctxCR.moveTo(app.canvasWidthHalf-5 *app.ratio,app.canvasHeightHalf);
        app.ctxCR.lineTo(app.canvasWidthHalf+5 *app.ratio,app.canvasHeightHalf);
        app.ctxCR.moveTo(app.canvasWidthHalf,app.canvasHeightHalf-5 *app.ratio);
        app.ctxCR.lineTo(app.canvasWidthHalf,app.canvasHeightHalf+5 *app.ratio);
        app.ctxCR.stroke();

    app.ctxCR.restore();

    if(!app.wHOver){

    // ==================================//
    // 陦ｨ
    // ==================================//

        app.ctxCR.save();

            app.ctxCR.translate(app.canvasWidthHalf, app.canvasHeightHalf);
            app.ctxCR.rotate(90 * Math.PI / 180);
            app.ctxCR.translate(-app.canvasWidthHalf, -app.canvasHeightHalf);

            app.ctxCR.lineWidth = 1 *app.ratio;
            app.ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][0]+')';
            app.ctxCR.beginPath();
            app.ctxCR.rect(app.pointStatus.x,app.pointStatus.y,app.pointStatus.w,app.pointStatus.h);
            app.ctxCR.stroke();
            app.ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][1]+')';
            app.ctxCR.beginPath();
            for (var i = app.pointPosition.length - 1; i >= 0; i--) {
                app.ctxCR.moveTo(app.pointPosition[i][0],app.pointStatus.y);
                app.ctxCR.lineTo(app.pointPosition[i][0],app.pointPosition[i][3]);
                if(i < 5){
                    app.ctxCR.moveTo(app.pointStatus.x,app.pointPosition[i][1]);
                    app.ctxCR.lineTo(app.pointPosition[i][2],app.pointPosition[i][1]);
                }
            };

            app.ctxCR.stroke();
            app.ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][2]+')';
            app.ctxCR.beginPath();
            app.ctxCR.moveTo(app.pointStatus.x,app.pointStatus.oy + 6 *app.ratio);
            app.ctxCR.lineTo(app.pointStatus.ox,app.pointStatus.oy + 6 *app.ratio);
            app.ctxCR.lineTo(app.pointStatus.ox,app.pointStatus.oy + 12 *app.ratio);
            app.ctxCR.stroke();
            app.ctxCR.beginPath();
            app.ctxCR.moveTo(app.pointStatus.x - 6 *app.ratio,app.pointStatus.oy);
            app.ctxCR.lineTo(app.pointStatus.x - 6 *app.ratio,app.pointStatus.y);
            app.ctxCR.lineTo(app.pointStatus.x - 12 *app.ratio,app.pointStatus.y);
            app.ctxCR.stroke();

            // 笆�
            var rx1 = app.pointStatus.x + app.mouseStatus.px*(app.pointStatus.w/100) - 3 *app.ratio;
            var ry1 = app.pointStatus.y + app.mouseStatus.py*(app.pointStatus.h/100) - 3 *app.ratio;

            app.ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][3]+')';
            app.ctxCR.beginPath();
            app.ctxCR.rect(rx1,app.pointStatus.oy + 3 *app.ratio, 6 *app.ratio, 6 *app.ratio);
            app.ctxCR.stroke();
            app.ctxCR.beginPath();
            app.ctxCR.rect(app.pointStatus.x - 9 *app.ratio,ry1, 6 *app.ratio, 6 *app.ratio);
            app.ctxCR.stroke();

            app.ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][5]+')';
            app.ctxCR.beginPath();
            app.ctxCR.moveTo(rx1 + 3 *app.ratio,app.pointStatus.oy + 6 *app.ratio);
            app.ctxCR.lineTo(rx1 + 3 *app.ratio,ry1 + 3 *app.ratio);
            app.ctxCR.stroke();
            app.ctxCR.beginPath();
            app.ctxCR.moveTo(app.pointStatus.x - 6 *app.ratio,ry1 + 3 *app.ratio);
            app.ctxCR.lineTo(rx1 + 3 *app.ratio,ry1 + 3 *app.ratio);
            app.ctxCR.stroke();

            //笳�
            app.ctxCR.fillStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][4]+')';
            app.ctxCR.beginPath();
            app.ctxCR.arc(rx1 + 3 *app.ratio, ry1 + 3 *app.ratio, 1 *app.ratio,0,360*app.RAD,true);
            app.ctxCR.fill();

    // ==================================//
    // 蠎ｧ讓�
    // ==================================//

            app.ctxCR.fillStyle = 'rgba('+FONTCOLOR[0]+','+FONTCOLOR[1]+','+FONTCOLOR[2]+',1)';
            app.ctxCR.font = 9 *app.ratio+"px 'Roboto'";
            app.ctxCR.textAlign = "end";
            app.ctxCR.textBaseline = "top";
            app.ctxCR.fillText(app.windowWidth, app.textPosition[0], app.textPosition[1]);
            app.ctxCR.fillText(app.windowHeight, app.textPosition[2], app.textPosition[3]);

            app.ctxCR.fillStyle = 'rgba('+FONTCOLOR[3]+','+FONTCOLOR[4]+','+FONTCOLOR[5]+',1)';
            app.ctxCR.fillText('X', app.textPosition[8], app.textPosition[5]);
            app.ctxCR.fillText('Y', app.textPosition[8], app.textPosition[7]);

            app.ctxCR.fillStyle = 'rgba('+FONTCOLOR[6]+','+FONTCOLOR[7]+','+FONTCOLOR[8]+',1)';
            app.ctxCR.fillText((app.mouseStatus.x).toFixed(3), app.textPosition[4], app.textPosition[5]);
            app.ctxCR.fillText((app.mouseStatus.y).toFixed(3), app.textPosition[6], app.textPosition[7]);

        app.ctxCR.restore();

    }
}

function render2D(e){

    if (typeof e === "object") {
        app = e;
    }

    if(!app.spFlag){
        drawCR(app);
        drawPT(app);

        if(!app.wHOver){
            drawLN(app);
        }
    }

    app.render2DInt = window.requestAnimationFrame(render2D);
}

module.exports = {
    render2D
}













