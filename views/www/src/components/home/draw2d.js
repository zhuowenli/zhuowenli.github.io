// ======================================================================//
//
// LINES
//
// ======================================================================//

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

var B1 = [330, 330];
var B2 = [330,-413];
var B3 = [109,-413];

function drawLN(){

    ctxCR.save();

    ctxCR.translate(canvasWidthHalf, canvasHeightHalf);
    ctxCR.rotate(90 * Math.PI / 180);
    ctxCR.translate(-canvasWidthHalf, -canvasHeightHalf);

// ==================================//
// LINE
// ==================================//

    ctxCR.lineWidth = 1*ratio;
    for (var i = 0; i < lineObject.length; i++) {
        var r = LNCOLOR['RGB'][0];
        var g = LNCOLOR['RGB'][1];
        var b = LNCOLOR['RGB'][2];
        var alpha = LNCOLOR['ALPHA'][i];
        ctxCR.strokeStyle = 'rgba('+r+','+g+','+b+','+alpha+')';
        ctxCR.beginPath();
        for (var n = 1; n < lineObject[i].length; n+=2) {
            var x = canvasWidthHalf - lineObject[i][n]*ratio;
            var y = canvasHeightHalf - lineObject[i][n+1]*ratio;
            ctxCR.lineTo(x,y);
        };
        ctxCR.stroke();
    };

// ==================================//
// BOX
// ==================================//

    ctxCR.strokeStyle = 'rgba('+BXCOLOR['RGB'][0]+','+BXCOLOR['RGB'][1]+','+BXCOLOR['RGB'][2]+','+BXCOLOR['ALPHA'][0]+')';
    ctxCR.beginPath();
    var x = canvasWidthHalf - B1[0]*ratio;
    var y = canvasHeightHalf - B1[1]*ratio;
    ctxCR.rect(x,y, 151*ratio, 6*ratio);
    ctxCR.stroke();

    ctxCR.strokeStyle = 'rgba('+BXCOLOR['RGB'][0]+','+BXCOLOR['RGB'][1]+','+BXCOLOR['RGB'][2]+','+BXCOLOR['ALPHA'][1]+')';
    ctxCR.beginPath();
    var x = canvasWidthHalf - B2[0]*ratio;
    var y = canvasHeightHalf - B2[1]*ratio;
    ctxCR.rect(x,y, 215*ratio, 4*ratio);
    ctxCR.stroke();

    ctxCR.beginPath();
    var x = canvasWidthHalf - B3[0]*ratio;
    var y = canvasHeightHalf - B3[1]*ratio;
    ctxCR.rect(x,y, 438*ratio, 4*ratio);
    ctxCR.stroke();

// ==================================//
// MEMORI
// ==================================//

    ctxCR.strokeStyle = 'rgba('+MEMORICOLOR['RGB'][0]+','+MEMORICOLOR['RGB'][1]+','+MEMORICOLOR['RGB'][2]+','+MEMORICOLOR['ALPHA'][0]+')';

    ctxCR.beginPath();
    var x1 = canvasWidthHalf - 330*ratio;
    var x2 = canvasWidthHalf + 330*ratio;
    var y2 = canvasHeightHalf + 394*ratio;
    ctxCR.moveTo(x1,y1);
    ctxCR.lineTo(x1,y2);
    ctxCR.stroke();

    for (var i = 0; i < 7; i++) {
        ctxCR.beginPath();
        if(i === 6){
            var x1 = canvasWidthHalf - (330 - i*110)*ratio - 1*ratio;
        }else{
            var x1 = canvasWidthHalf - (330 - i*110)*ratio;
        }
        var y1 = canvasHeightHalf + 394*ratio;
        var y2 = canvasHeightHalf + 388*ratio;
        ctxCR.moveTo(x1,y1);
        ctxCR.lineTo(x1,y2);
        ctxCR.stroke();
    };

    ctxCR.strokeStyle = 'rgba('+MEMORICOLOR['RGB'][0]+','+MEMORICOLOR['RGB'][1]+','+MEMORICOLOR['RGB'][2]+','+MEMORICOLOR['ALPHA'][1]+')';

    for (var i = 0; i < 133; i++) {
        ctxCR.beginPath();
        if(i === 132){
            var x1 = canvasWidthHalf - (330 - i*5)*ratio - 1*ratio;
        }else{
            var x1 = canvasWidthHalf - (330 - i*5)*ratio;
        }
        var y1 = canvasHeightHalf + 397*ratio;
        var y2 = canvasHeightHalf + 399*ratio;
        ctxCR.moveTo(x1,y1);
        ctxCR.lineTo(x1,y2);
        ctxCR.stroke();
    };

    ctxCR.restore();

}

// ======================================================================//
//
// CIRCLE
//
// ======================================================================//

var jiten = 0;

function drawCR(){

    // var lx1 = -mouseStatus.cy/100;
    // var ly1 = mouseStatus.cx /100;

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

    ctxCR.clearRect(0,0,canvasWidth,canvasHeight);

    ctxCR.lineWidth = 1*ratio;

// ==================================//
// 蜀�捉繝｡繝｢繝ｪ
// ==================================//
    ctxCR.save();

        ctxCR.translate(canvasWidthHalf+lx1, canvasHeightHalf+ly1);
        ctxCR.rotate(jiten/2 * Math.PI / 180);
        ctxCR.translate(-canvasWidthHalf+lx1, -canvasHeightHalf+ly1);

        ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][0]+')';
        ctxCR.beginPath();
        for (var i = MemoriInnerPosition.length - 1; i >= 0; i--) {
            ctxCR.moveTo(MemoriInnerPosition[i][0],MemoriInnerPosition[i][1]);
            ctxCR.lineTo(MemoriInnerPosition[i][2],MemoriInnerPosition[i][3]);
        };
        ctxCR.stroke();

    ctxCR.restore();

// ==================================//
// 螟門捉繝｡繝｢繝ｪ
// ==================================//

    // var lx2 = -mouseStatus.cy/60;
    // var ly2 = mouseStatus.cx /60;

    ctxCR.save();

        ctxCR.translate(canvasWidthHalf+lx2, canvasHeightHalf+ly2);
        ctxCR.rotate(jiten * Math.PI / 180);
        ctxCR.translate(-canvasWidthHalf+lx2, -canvasHeightHalf+ly2);

        ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][1]+')';
        ctxCR.beginPath();
        for (var i = MemoriPosition.length - 1; i >= 0; i--) {
            ctxCR.moveTo(MemoriPosition[i][0],MemoriPosition[i][1]);
            ctxCR.lineTo(MemoriPosition[i][2],MemoriPosition[i][3]);
        };
        ctxCR.stroke();

    ctxCR.restore();

// ==================================//
// 螟門捉縺ｮ邱�
// ==================================//

    ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][2]+')';
    ctxCR.beginPath();
    ctxCR.arc( canvasWidthHalf+lx2, canvasHeightHalf+ly2, graphRadius, 0, PI2, true );
    ctxCR.stroke();

    ctxCR.strokeStyle = 'rgba('+GAISHUUCOLOR['RGB'][0]+','+GAISHUUCOLOR['RGB'][1]+','+GAISHUUCOLOR['RGB'][2]+','+GAISHUUCOLOR['ALPHA'][3]+')';
    ctxCR.beginPath();
    ctxCR.arc( canvasWidthHalf+lx2, canvasHeightHalf+ly2, graphRadius - 50*ratio, 0, PI2, true );
    ctxCR.stroke();

// ==================================//
// 螟門捉繧ｰ繝ｩ繝�
// ==================================//

    ctxCR.lineWidth = 3*ratio;
    for (var i = barChartPar.length - 1; i >= 0; i--) {
        var deg = barChartPar[i]*3.6;
        var endAngle = deg * RAD;
        ctxCR.strokeStyle = BARCHARTCOLOR[i];
        ctxCR.beginPath();
        ctxCR.arc(canvasWidthHalf+lx2,canvasHeightHalf+ly2, barChartRadius[i], 0, endAngle, false );
        ctxCR.stroke();
    };

// ==================================//
// 蜀�Κ縲√さ繝ｳ繝�Φ繝��PV豈皮紫
// ==================================//

    // var lx3 = -mouseStatus.cy/30;
    // var ly3 = mouseStatus.cx /30;

    ctxCR.lineWidth = 1*ratio;
    ctxCR.strokeStyle = 'rgba('+PVCOLOR[0]+','+PVCOLOR[1]+','+PVCOLOR[2]+',1)';

    if(pvRatioAnimateFlag){

        ctxCR.save();

            ctxCR.translate(lx3,ly3);

            for ( var i = 0; i < pvRatio.length; i ++ ) {
                var pvDegNow  = pvRatio[i] - 15;
                var pvDegNext = pvRatio[i] + 15;
                if(pvDegNow < mouseStatus.deg && pvDegNext > mouseStatus.deg){
                    pvHover = i;
                    ctxCR.fillStyle = 'rgba('+PVCOLOR[0]+','+PVCOLOR[1]+','+PVCOLOR[2]+',0.3)';
                }else{
                    ctxCR.fillStyle = 'rgba('+PVCOLOR[0]+','+PVCOLOR[1]+','+PVCOLOR[2]+',0)';
                }
                ctxCR.beginPath();
                ctxCR.rect(pvRatioXY[i][2],pvRatioXY[i][3],10*ratio,10*ratio);
                ctxCR.stroke();
                ctxCR.fill();
            }

            ctxCR.strokeStyle = 'rgba('+PV2COLOR[0]+','+PV2COLOR[1]+','+PV2COLOR[2]+','+PV2COLOR[3]+')';
            ctxCR.beginPath();
                for ( var i = 0; i < pvRatio.length; i ++ ) {
                    ctxCR.lineTo(pvRatioXY[i][0],pvRatioXY[i][1]);
                }
                var x = (graphRadius - 50*ratio) * Math.cos(360*RAD) + canvasWidthHalf;
                var y = (graphRadius - 50*ratio) * Math.sin(360*RAD) + canvasHeightHalf;
                ctxCR.lineTo(x,y);
            ctxCR.stroke();


          //   for ( var i = 0; i < pvRatio.length; i ++ ) {
                // mx = pvRatioXY[i][4] - mouseStatus.x;
                // my = pvRatioXY[i][5] - mouseStatus.y;
                // strokeLength = Math.sqrt(Math.pow(mx,2) + Math.pow(my,2));
                // if(strokeLength < 100){
                // }
          //   }


        ctxCR.restore();

    }





// ==================================//
// 螟門捉陬�｣ｾ
// ==================================//

    setMemoriOuter(0);
    ctxCR.strokeStyle = 'rgba('+SOUSHOKUCOLOR['RGB'][0]+','+SOUSHOKUCOLOR['RGB'][1]+','+SOUSHOKUCOLOR['RGB'][2]+','+SOUSHOKUCOLOR['ALPHA'][0]+')';
    ctxCR.beginPath();
    ctxCR.arc(canvasWidthHalf,canvasHeightHalf, MemoriOuterR2, 0, MemoriOuterDegree * RAD, false );
    ctxCR.stroke();

    setMemoriOuter(0);
    ctxCR.strokeStyle = 'rgba('+SOUSHOKUCOLOR['RGB'][0]+','+SOUSHOKUCOLOR['RGB'][1]+','+SOUSHOKUCOLOR['RGB'][2]+','+SOUSHOKUCOLOR['ALPHA'][1]+')';
    ctxCR.beginPath();
    ctxCR.arc(canvasWidthHalf,canvasHeightHalf, MemoriOuterR2+5*ratio, 0, MemoriOuterDegree * RAD, false );
    ctxCR.stroke();

    ctxCR.beginPath();
    ctxCR.lineTo(gaishuuPosition[0],gaishuuPosition[1]);
    ctxCR.lineTo(gaishuuPosition[2],gaishuuPosition[3]);
    ctxCR.stroke();
    ctxCR.beginPath();
    ctxCR.lineTo(gaishuuPosition[4],gaishuuPosition[5]);
    ctxCR.lineTo(gaishuuPosition[6],gaishuuPosition[7]);
    ctxCR.stroke();

// ==================================//
// 繝槭え繧ｹ蠎ｧ讓�
// ==================================//

    mouseDegBegin = mouseStatus.deg-18;
    mouseDegEnd   = mouseStatus.deg+18;

    ctxCR.strokeStyle = 'rgba('+MOUSEDEGCOLOR[0]+','+MOUSEDEGCOLOR[1]+','+MOUSEDEGCOLOR[2]+',1)';
    ctxCR.beginPath();
    ctxCR.arc(canvasWidthHalf,canvasHeightHalf, MemoriOuterR1-1, mouseDegBegin * RAD, mouseDegEnd * RAD, false );
    ctxCR.stroke();

    var mdb1 = Math.cos(mouseDegBegin*RAD);
    var mdb2 = Math.sin(mouseDegBegin*RAD);
    var mde1 = Math.cos(mouseDegEnd*RAD);
    var mde2 = Math.sin(mouseDegEnd*RAD);

    mx1 = graphRadius * mdb1 + canvasWidthHalf;
    my1 = graphRadius * mdb2 + canvasHeightHalf;
    mx2 = MemoriOuterR3 * mdb1 + canvasWidthHalf;
    my2 = MemoriOuterR3 * mdb2 + canvasHeightHalf;
    mx3 = graphRadius * mde1 + canvasWidthHalf;
    my3 = graphRadius * mde2 + canvasHeightHalf;
    mx4 = MemoriOuterR3 * mde1 + canvasWidthHalf;
    my4 = MemoriOuterR3 * mde2 + canvasHeightHalf;

    ctxCR.lineWidth = 1*ratio;
    ctxCR.strokeStyle = 'rgba('+MOUSEDEGCOLOR[0]+','+MOUSEDEGCOLOR[1]+','+MOUSEDEGCOLOR[2]+',0.2)';
    ctxCR.beginPath();
    ctxCR.lineTo(mx3,my3);
    ctxCR.lineTo(canvasWidthHalf,canvasHeightHalf);
    ctxCR.stroke();

    ctxCR.lineWidth = 2*ratio;
    ctxCR.strokeStyle = 'rgba('+MOUSEDEGCOLOR[0]+','+MOUSEDEGCOLOR[1]+','+MOUSEDEGCOLOR[2]+',1)';
    ctxCR.beginPath();
    ctxCR.lineTo(mx1,my1);
    ctxCR.lineTo(mx2,my2);
    ctxCR.stroke();
    ctxCR.beginPath();
    ctxCR.lineTo(mx3,my3);
    ctxCR.lineTo(mx4,my4);
    ctxCR.stroke();

// ==================================//
// 繝槭え繧ｹ�亥渚蟇ｾ��
// ==================================//

    mouseDegHantai = mouseStatus.deg-180;

    mx5 = MemoriOuterR3 * Math.cos(mouseDegHantai*RAD) + canvasWidthHalf;
    my5 = MemoriOuterR3 * Math.sin(mouseDegHantai*RAD) + canvasHeightHalf;
    mx6 = (MemoriOuterR3-7*ratio) * Math.cos(mouseDegHantai*RAD) + canvasWidthHalf;
    my6 = (MemoriOuterR3-7*ratio) * Math.sin(mouseDegHantai*RAD) + canvasHeightHalf;

    ctxCR.beginPath();
    ctxCR.moveTo(mx5,my5);
    ctxCR.lineTo(mx6,my6);
    ctxCR.stroke();

// ==================================//
// 譁�ｭ�
// ==================================//

    degText = (mouseStatus.deg/3.6).toFixed(3);

    ctxCR.fillStyle = 'rgba('+FONTCOLOR[9]+','+FONTCOLOR[10]+','+FONTCOLOR[11]+',1)';
    ctxCR.font = 9*ratio+"px 'Roboto'";
    ctxCR.fillText(degText,canvasWidthHalf+graphRadius+40*ratio,canvasHeightHalf);
    ctxCR.font = 9*ratio+"px 'Roboto'";
    ctxCR.fillText('10',gaishuuPosition[6]+15*ratio,gaishuuPosition[7]+10*ratio);

// ==================================//
// 蝗櫁ｻ｢
// ==================================//

    ctxCR.translate(canvasWidthHalf, canvasHeightHalf);
    ctxCR.rotate(-90 * Math.PI / 180);
    ctxCR.translate(-canvasWidthHalf+0.5, -canvasHeightHalf+0.5);

    ctxCR.restore();
    ctxCR.save();


}


// ======================================================================//
//
// POINT
//
// ======================================================================//


function drawPT(){

// ==================================//
// 荳ｭ蠢�
// ==================================//

    ctxCR.save();

        ctxCR.translate(0.5*ratio,0.5*ratio);
        ctxCR.lineWidth = 2*ratio;
        ctxCR.strokeStyle = 'rgba('+CENTERCOLOR[0]+','+CENTERCOLOR[1]+','+CENTERCOLOR[2]+','+CENTERCOLOR[3]+')';
        ctxCR.beginPath();
        ctxCR.moveTo(canvasWidthHalf-5*ratio,canvasHeightHalf);
        ctxCR.lineTo(canvasWidthHalf+5*ratio,canvasHeightHalf);
        ctxCR.moveTo(canvasWidthHalf,canvasHeightHalf-5*ratio);
        ctxCR.lineTo(canvasWidthHalf,canvasHeightHalf+5*ratio);
        ctxCR.stroke();

    ctxCR.restore();

    if(!wHOver){

// ==================================//
// 陦ｨ
// ==================================//

        ctxCR.save();

            ctxCR.translate(canvasWidthHalf, canvasHeightHalf);
            ctxCR.rotate(90 * Math.PI / 180);
            ctxCR.translate(-canvasWidthHalf, -canvasHeightHalf);

            ctxCR.lineWidth = 1*ratio;
            ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][0]+')';
            ctxCR.beginPath();
            ctxCR.rect(pointStatus.x,pointStatus.y,pointStatus.w,pointStatus.h);
            ctxCR.stroke();
            ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][1]+')';
            ctxCR.beginPath();
            for (var i = pointPosition.length - 1; i >= 0; i--) {
                ctxCR.moveTo(pointPosition[i][0],pointStatus.y);
                ctxCR.lineTo(pointPosition[i][0],pointPosition[i][3]);
                if(i < 5){
                    ctxCR.moveTo(pointStatus.x,pointPosition[i][1]);
                    ctxCR.lineTo(pointPosition[i][2],pointPosition[i][1]);
                }
            };

            ctxCR.stroke();
            ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][2]+')';
            ctxCR.beginPath();
            ctxCR.moveTo(pointStatus.x,pointStatus.oy + 6*ratio);
            ctxCR.lineTo(pointStatus.ox,pointStatus.oy + 6*ratio);
            ctxCR.lineTo(pointStatus.ox,pointStatus.oy + 12*ratio);
            ctxCR.stroke();
            ctxCR.beginPath();
            ctxCR.moveTo(pointStatus.x - 6*ratio,pointStatus.oy);
            ctxCR.lineTo(pointStatus.x - 6*ratio,pointStatus.y);
            ctxCR.lineTo(pointStatus.x - 12*ratio,pointStatus.y);
            ctxCR.stroke();

            // 笆�
            var rx1 = pointStatus.x + mouseStatus.px*(pointStatus.w/100) - 3*ratio;
            var ry1 = pointStatus.y + mouseStatus.py*(pointStatus.h/100) - 3*ratio;

            ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][3]+')';
            ctxCR.beginPath();
            ctxCR.rect(rx1,pointStatus.oy + 3*ratio, 6*ratio, 6*ratio);
            ctxCR.stroke();
            ctxCR.beginPath();
            ctxCR.rect(pointStatus.x - 9*ratio,ry1, 6*ratio, 6*ratio);
            ctxCR.stroke();

            ctxCR.strokeStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][5]+')';
            ctxCR.beginPath();
            ctxCR.moveTo(rx1 + 3*ratio,pointStatus.oy + 6*ratio);
            ctxCR.lineTo(rx1 + 3*ratio,ry1 + 3*ratio);
            ctxCR.stroke();
            ctxCR.beginPath();
            ctxCR.moveTo(pointStatus.x - 6*ratio,ry1 + 3*ratio);
            ctxCR.lineTo(rx1 + 3*ratio,ry1 + 3*ratio);
            ctxCR.stroke();

            //笳�
            ctxCR.fillStyle = 'rgba('+HYOUCOLOR['RGB'][0]+','+HYOUCOLOR['RGB'][1]+','+HYOUCOLOR['RGB'][2]+','+HYOUCOLOR['ALPHA'][4]+')';
            ctxCR.beginPath();
            ctxCR.arc(rx1 + 3*ratio, ry1 + 3*ratio, 1*ratio,0,360*RAD,true);
            ctxCR.fill();

// ==================================//
// 蠎ｧ讓�
// ==================================//

            ctxCR.fillStyle = 'rgba('+FONTCOLOR[0]+','+FONTCOLOR[1]+','+FONTCOLOR[2]+',1)';
            ctxCR.font = 9*ratio+"px 'Roboto'";
            ctxCR.textAlign = "end";
            ctxCR.textBaseline = "top";
            ctxCR.fillText(windowWidth,textPosition[0],textPosition[1]);
            ctxCR.fillText(windowHeight,textPosition[2],textPosition[3]);

            ctxCR.fillStyle = 'rgba('+FONTCOLOR[3]+','+FONTCOLOR[4]+','+FONTCOLOR[5]+',1)';
            ctxCR.fillText('X',textPosition[8],textPosition[5]);
            ctxCR.fillText('Y',textPosition[8],textPosition[7]);

            ctxCR.fillStyle = 'rgba('+FONTCOLOR[6]+','+FONTCOLOR[7]+','+FONTCOLOR[8]+',1)';
            ctxCR.fillText((mouseStatus.x).toFixed(3),textPosition[4],textPosition[5]);
            ctxCR.fillText((mouseStatus.y).toFixed(3),textPosition[6],textPosition[7]);

        ctxCR.restore();

    }

}

function render2D(){

    if(!spFlag){
        drawCR();
        drawPT();
        if(!wHOver){
            drawLN();
        }
    }

    drawUA();
    if(webAudio && !spFlag){
        drawAV();
        drawWave();
    }

    render2DInt = window.requestAnimationFrame(render2D);

// ==================================//
// 2D
// ==================================//

    if(ajax){

        ajax = false;
        $day.text(animatePv['day'][pvHover]);

        var circleTo = animatePv['circle'][pvHover];
        TweenLite.to(barChartPar,1,circleTo);

        var lineTo = animatePv['line'];
        TweenLite.to(pvRatio,0,lineTo);

        setTimeout(function(){
            ajax = true;

        // ==================================//
        // USER AGENT 竊凪�竊凪�竊凪�竊凪�竊�
        // ==================================//

            if(onetime){

                $('html').addClass('go');
                onetime = false;

                if(!spFlag){
                    // AJAX螳御ｺ�ｾ後荳蠎ｦ縺ｮ縺ｿ螳溯｡�
                    TweenLite.to(prevUARatio[0],0,dvRatio);
                    TweenLite.to(prevUARatio[1],0,osRatio);
                    TweenLite.to(prevUARatio[2],0,browsRatio);
                    var lineTo = animatePv['line'];
                    TweenLite.to(pvRatio,1,lineTo);
                }

            }

        // ==================================//
        // USER AGENT 竊鯛�竊鯛�竊鯛�竊鯛�竊�
        // ==================================//

            var viewTo = animatePv['view'][pvHover];
            TweenLite.to(animatePvFrom,1,viewTo);
            viewTo.onUpdate = function(){
                $v1.text(Math.floor(animatePvFrom[0]));
                $v2.text(Math.floor(animatePvFrom[1]));
                $v3.text(Math.floor(animatePvFrom[2]));
                $v4.text(Math.floor(animatePvFrom[3]));
                $v5.text(Math.floor(animatePvFrom[4]));
                $v6.text(Math.floor(animatePvFrom[5]));
                $total.text(Math.floor(animatePvFrom[6]));
            }

        },1000);

    }

}



$(function(){
    if(!subpageFlag){
        loadPageview();
        setSize2D();
        if(!spFlag){
            initUA();
        }
        render2D();
    }
});



















