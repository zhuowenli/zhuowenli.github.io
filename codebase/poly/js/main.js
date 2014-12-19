/* 
* @Author: 卓文理(zwlme.com)
* @Date:   2014-09-02 16:53:40
* @Descriptions: 
* @Last Modified by:   卓文理(zwlme.com)
* @Last Modified time: 2014-09-24 14:19:51
* @Version: 1.0.0
* @Requires: svgbuilder.js,lowpoly.js
*/
var ctx, imgCtx, info;
var canvas, sourceImg;
var snapSide = 6;
var currentIndex = 0;
var nearestV = new Array();
var vertices = new Array();
var triangles = new Array();
var DELTA = 1.0e-5;
var canvasWidth = 300,
    canvasHeight = 300;


function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    triangles = triangulate(vertices);

    for (var i in triangles) {
        triangles[i].Draw(ctx, i);
    }

    for (var i in vertices) {
        vertices[i].DrawNum(ctx, i);
    }
}

function reDraw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i in triangles) {
        triangles[i].Draw(ctx, i);
    }

    for (var i in vertices) {
        vertices[i].DrawNum(ctx, i);
    }
}

function verticesDetect(x, y) {
    nearestV.length = 0;
    for (i in vertices) {
        if (Math.abs(vertices[i].x - x) < snapSide) {
            if (Math.abs(vertices[i].y - y) < snapSide) {
                vertices[i].r = snapSide;
                nearestV.push(i);
            }
        } else {
            vertices[i].r = snapSide / 4;
        }
    }
    return nearestV;
}




function init() {
    svgBox = document.getElementById('svgBox');

    canvas = document.getElementById('canvas');
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    info = document.getElementById('info');
    sourceImg = document.getElementById('sourceImg');

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        imgCtx = sourceImg.getContext('2d');

    }

    initInterface();

    canvas.onmousedown = function(e) {
        var tempX = ~~ (e.pageX - canvas.offsetLeft);
        var tempY = ~~ (e.pageY - canvas.offsetTop);
        if (verticesDetect(tempX, tempY).length == 0) {
            var v = new vertex(tempX, tempY);
            v.avColor();
            vertices.push(v);
            draw();
            canvas.onmousemove = function(e) {
                var tempX = ~~ (e.pageX - canvas.offsetLeft);
                var tempY = ~~ (e.pageY - canvas.offsetTop);

                vertices[vertices.length - 1].x = tempX;
                vertices[vertices.length - 1].y = tempY;

                draw();
            }
            canvas.onmouseup = function(e) {
                var tempX = ~~ (e.pageX - canvas.offsetLeft);
                var tempY = ~~ (e.pageY - canvas.offsetTop);

                canvas.onmousemove = function(e) {
                    void(0)
                }
                tempVertex = verticesDetect(tempX, tempY);
                if (tempVertex.length > 1) {
                    vertices.splice(tempVertex[tempVertex.length - 1], 1);
                } else {
                    vertices[vertices.length - 1].r = snapSide / 4;
                }
                canvas.onmousemove = function(e) {

                    if (verticesDetect(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop).length > 0) {}
                    reDraw();
                }
            }
        } else {
            tempVertex = verticesDetect(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop)[0];
            canvas.onmousemove = function(e) {
                var tempX = ~~ (e.pageX - canvas.offsetLeft);
                var tempY = ~~ (e.pageY - canvas.offsetTop);

                vertices[tempVertex].x = tempX;
                vertices[tempVertex].y = tempY;
                draw();
            }
            canvas.onmouseup = function(e) {
                canvas.onmousemove = function(e) {
                    if (verticesDetect(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop).length > 0) {}
                    reDraw();
                }
            }
        }
    }
    draw();
}
