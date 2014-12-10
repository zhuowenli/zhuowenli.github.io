/* 
* @Author: 卓文理(zwlme.com)
* @Date:   2014-09-02 16:29:50
* @Descriptions: 
* @Last Modified by:   卓文理(zwlme.com)
* @Last Modified time: 2014-09-24 14:22:20
* @Version: 1.0.0
* @Requires: 
*/

// 节点
function vertex(x, y) {
    this.x = x;
    this.y = y;
    this.r = snapSide / 4;
    this.red = 128;
    this.green = 128;
    this.blue = 128;
}


vertex.prototype.DrawNum = function(ctx, num) {

    this.avColor();
    ctx.beginPath();
    ctx.fillStyle = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',1)';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0, 0, 0, 1)";

    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.fill();
	ctx.strokeStyle = "rgba(255,255,255,0.5)";
	ctx.stroke();    
    ctx.closePath();
    ctx.shadowBlur = 0;
}


// Triangle

function triangle(v0, v1, v2) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;

    this.Circumcircle();
}

triangle.prototype.Circumcircle = function() {

    var A = this.v1.x - this.v0.x;
    var B = this.v1.y - this.v0.y;
    var C = this.v2.x - this.v0.x;
    var D = this.v2.y - this.v0.y;

    var E = A * (this.v0.x + this.v1.x) + B * (this.v0.y + this.v1.y);
    var F = C * (this.v0.x + this.v2.x) + D * (this.v0.y + this.v2.y);

    var G = 2.0 * (A * (this.v2.y - this.v1.y) - B * (this.v2.x - this.v1.x));

    var dx, dy;

    if (Math.abs(G) < DELTA) {
        // 同一条直线上，找到两端节点，创建中间节点
        var minx = Math.min(this.v0.x, this.v1.x, this.v2.x);
        var miny = Math.min(this.v0.y, this.v1.y, this.v2.y);
        var maxx = Math.max(this.v0.x, this.v1.x, this.v2.x);
        var maxy = Math.max(this.v0.y, this.v1.y, this.v2.y);

        this.center = new vertex((minx + maxx) / 2, (miny + maxy) / 2);

        dx = this.center.x - minx;
        dy = this.center.y - miny;
    }
    else {
        var cx = (D * E - B * F) / G;
        var cy = (A * F - C * E) / G;

        this.center = new vertex(cx, cy);

        dx = this.center.x - this.v0.x;
        dy = this.center.y - this.v0.y;
    }

    this.radius_squared = dx * dx + dy * dy;
    this.radius = Math.sqrt(this.radius_squared);
}


triangle.prototype.inCircumcircle = function(v) {
    var dx = (this.center.x - v.x) * (this.center.x - v.x);
    if (dx < this.radius_squared) {
        var dy = (this.center.y - v.y) * (this.center.y - v.y);
        if (dy < this.radius_squared) {
            var dist_squared = dx + dy;
            return (dist_squared <= this.radius_squared);
        } else {
            return false
        }
    } else {
        return false
    }
};
// InCircumcircle
triangle.prototype.inCircumcircle1 = function(v) {
    var dx = this.center.x - v.x;
    var dy = this.center.y - v.y;
    var dist_squared = dx * dx + dy * dy;

    return (dist_squared <= this.radius_squared);
};
triangle.prototype.Draw = function(ctx, num) {
    // 绘制边缘
    ctx.beginPath();

    var tmpVertex = new vertex(~~ ((this.v0.x + this.v1.x + this.v2.x) / 3), ~~ ((this.v0.y + this.v1.y + this.v2.y) / 3));
    tmpVertex.avColor();
    var lingrad = ctx.createLinearGradient(this.v0.x, this.v0.y, Math.max(this.v1.x, this.v2.x), Math.max(this.v1.y, this.v2.y));
    lingrad.addColorStop(0, 'rgb(' + ~~ ((tmpVertex.red + this.v0.red) / 2) + ',' + ~~ ((tmpVertex.green + this.v0.green) / 2) + ',' + ~~ ((tmpVertex.blue + this.v0.blue) / 2) + ')');
    lingrad.addColorStop(1, 'rgb(' + ~~ ((tmpVertex.red + this.v1.red + this.v2.red) / 3) + ',' + ~~ ((tmpVertex.green + this.v1.green + this.v2.green) / 3) + ',' + ~~ ((tmpVertex.blue + this.v1.blue + this.v2.blue) / 3) + ')');
    ctx.fillStyle = lingrad;
    ctx.moveTo(this.v0.x, this.v0.y);
    ctx.lineTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.lineTo(this.v0.x, this.v0.y);
    ctx.fill();
    ctx.closePath();

    delete tmpVertex;
    delete lingrad;
}

vertex.prototype.avColor = function() {
    var result = [0, 0, 0];
    var startX = 0,
        startY = 0;
    if (this.x < snapSide/2)  {    
        startX = 0;
    } else {
    if (this.x + snapSide / 2 > sourceImg.width)  {
        startX = sourceImg.width - snapSide
    } else {
        startX = this.x - snapSide / 2
    }
    }
    if (this.y < snapSide / 2)  {    
        startY = 0;                
    } else {
    if (this.y + snapSide / 2 > sourceImg.height)  {
        startY = sourceImg.height - snapSide
    } else {
        startY = this.y - snapSide / 2
    }
    }
    startX = ~~startX;
    startY = ~~startY;
    var tempColor = imgCtx.getImageData(startX, startY, snapSide, snapSide).data;

    for (i = 0; i < snapSide * snapSide; i++) {
        result[0] += tempColor[4 * i];
        result[1] += tempColor[4 * i + 1];
        result[2] += tempColor[4 * i + 2];
    }
    this.red = ~~ (result[0] / i);
    this.green = ~~ (result[1] / i);
    this.blue = ~~ (result[2] / i);

    return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
}

// edge
function edge(v0, v1) {
    if (v1.x > v0.x) {
        this.v0 = v0;
        this.v1 = v1;
    } else {
        this.v0 = v1;
        this.v1 = v0;
    }
    if (v1.x != v0.x) {this.hashCode = this.v0.x + ' ' + this.v0.y + ':' + this.v1.x + ' ' + this.v1.y} else {this.hashCode = this.v0.x + ' ' + Math.min(this.v0.y,this.v1.y) + ':' + this.v1.x + ' ' + Math.max(this.v0.y,this.v1.y)}
}


//------------------------------------------------------------
// triangulate
//
// 使用用德洛内三角算法计算顶点
//
// 节点: Vertex数组
//
// return: Triangles数组
//------------------------------------------------------------

function triangulate(vertices) {
    var triangles = [];

    var st = createBoundingTriangle(vertices);

    triangles.push(st);

    var i;
    for (i in vertices) {
        var vertex = vertices[i];
        addVertex(vertex, triangles);
    }

    for (i in triangles) {
        var triangle = triangles[i];
        if (triangle.v0 == st.v0 || triangle.v0 == st.v1 || triangle.v0 == st.v2 || triangle.v1 == st.v0 || triangle.v1 == st.v1 || triangle.v1 == st.v2 || triangle.v2 == st.v0 || triangle.v2 == st.v1 || triangle.v2 == st.v2) {
            delete triangles[i];
        }
    }

    var tempArray = new Array();
    for (var i = 0; i < triangles.length; i++) {
        if (triangles[i]) {
            tempArray.push(triangles[i]);
        }
    }
    triangles = tempArray;
    delete tempArray;
    //    console.log(triangles);
    return triangles;
}

// 在三角形内部空余的地方创建一个节点

function createBoundingTriangle(vertices) {
    var minx, miny, maxx, maxy;
    for (var i in vertices) {
        var vertex_ = vertices[i];
        if (minx === undefined || vertex_.x < minx) {
            minx = vertex_.x;
        }
        if (miny === undefined || vertex_.y < miny) {
            miny = vertex_.y;
        }
        if (maxx === undefined || vertex_.x > maxx) {
            maxx = vertex_.x;
        }
        if (maxy === undefined || vertex_.y > maxy) {
            maxy = vertex_.y;
        }
    }

    var dx = (maxx - minx) * 10;
    var dy = (maxy - miny) * 10;

    var stv0 = new vertex(minx - dx, miny - dy * 3);
    var stv1 = new vertex(minx - dx, maxy + dy);
    var stv2 = new vertex(maxx + dx * 3, maxy + dy);

    return new triangle(stv0, stv1, stv2);
}

// 更新节点
function addVertex(vertex, triangles) {
    var edges = [];

    var i;
    for (i in triangles) {
        var triangle_ = triangles[i];

        if (triangle_.inCircumcircle(vertex)) {
            edges.push(new edge(triangle_.v0, triangle_.v1));
            edges.push(new edge(triangle_.v1, triangle_.v2));
            edges.push(new edge(triangle_.v2, triangle_.v0));

            delete triangles[i];
        }
    }
    edges = uniqueEdges(edges);

    // 创建新的三角形和节点
    for (i in edges) {
        var edge_ = edges[i];
        triangles.push(new triangle(edge_.v0, edge_.v1, vertex));
    }
}

// 删除数组中重复的边线

function uniqueEdges(edges) {
    var uniqueEdges = [];
    var prevHash;
    edges.sort(function(a, b) {
        if (a.hashCode > b.hashCode) {
            return 1
        } else {
            return -1
        }
    });
    for (var i in edges) {
        var unique = true;
        if (edges[i].hashCode == prevHash) {
            unique = false
        }
        if (i != (edges.length - 1)) {
            if (edges[i].hashCode == edges[parseInt(i) + 1].hashCode) {
                prevHash = edges[i].hashCode;
                unique = false;
            }
        }
        if (unique) {
            uniqueEdges.push(edges[i]);
        }
    }
    return uniqueEdges;
}

