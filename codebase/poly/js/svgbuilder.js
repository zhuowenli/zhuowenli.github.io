/* 
* @Author: 卓文理(zwlme.com)
* @Date:   2014-09-02 16:52:12
* @Descriptions: 
* @Last Modified by:   卓文理(zwlme.com)
* @Last Modified time: 2014-09-23 18:28:12
* @Version: 1.0.0
* @Requires: 
*/
function initInterface() {

    var exportSvg = document.getElementById('exportSvg');
    exportSvg.onclick = function() {
        var ns = 'http://www.w3.org/2000/svg';
        svg = document.createElementNS(ns, 'svg');
        svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', canvasWidth);
        svg.setAttribute('height', canvasHeight);
        svg.setAttribute('version', '1.1');
        for (i in triangles) {
            j = parseInt(i);
            var defs = document.createElementNS(ns, 'defs');
            var grad = document.createElementNS(ns, 'linearGradient');
            grad.setAttributeNS(null, 'id', 'gr' + i);
            grad.setAttributeNS(null, 'x1', '0%');
            grad.setAttributeNS(null, 'x2', '100%');
            grad.setAttributeNS(null, 'y1', '0%');
            grad.setAttributeNS(null, 'y2', '100%');

            var tmpVertex = new vertex(~~ ((triangles[j].v0.x + triangles[j].v1.x + triangles[j].v2.x) / 3), ~~ ((triangles[j].v0.y + triangles[j].v1.y + triangles[j].v2.y) / 3));
            tmpVertex.avColor();
            var cs1 = 'rgb(' + ~~ ((tmpVertex.red + triangles[j].v0.red) / 2) + ',' + ~~ ((tmpVertex.green + triangles[j].v0.green) / 2) + ',' + ~~ ((tmpVertex.blue + triangles[j].v0.blue) / 2) + ')';
            var cs2 = 'rgb(' + ~~ ((tmpVertex.red + triangles[j].v1.red + triangles[j].v2.red) / 3) + ',' + ~~ ((tmpVertex.green + triangles[j].v1.green + triangles[j].v2.green) / 3) + ',' + ~~ ((tmpVertex.blue + triangles[j].v1.blue + triangles[j].v2.blue) / 3) + ')';

            var stopTop = document.createElementNS(ns, 'stop');
            stopTop.setAttributeNS(null, 'offset', '0%');
            stopTop.setAttributeNS(null, 'stop-color', cs1);
            grad.appendChild(stopTop);
            var stopBottom = document.createElementNS(ns, 'stop');
            stopBottom.setAttributeNS(null, 'offset', '100%');
            stopBottom.setAttributeNS(null, 'stop-color', cs2);
            grad.appendChild(stopBottom);
            defs.appendChild(grad);
            svg.appendChild(defs);

            newPoly = document.createElementNS(ns, 'polygon');
            newPoly.setAttribute('id', 'triangle' + i);
            newPoly.setAttribute('points', triangles[j].v0.x + ',' + triangles[j].v0.y + ' ' + triangles[j].v1.x + ',' + triangles[j].v1.y + ' ' + triangles[j].v2.x + ',' + triangles[j].v2.y);
            newPoly.setAttribute('style', 'fill: url(#gr' + j + '); stroke: rgb(0, 0, 0); stroke-width: 0;');
            svg.appendChild(newPoly);
        }
        
        var text = (new XMLSerializer()).serializeToString(svg);
        var b64 = Base64.encode(text);
        document.getElementById('svgFile').innerHTML = ": <a target='_blank' href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n" + b64 + "' title='新窗口打开，右键另存为到本地'>点击查看SVG</a>";
        
    }

    var randomGenerator = document.getElementById('randomGenerator');
    randomGenerator.onclick = function() {
    
        for (i = 0; i < 25; i++) {
            var tVertex = new vertex(~~ (canvasWidth * Math.random()), ~~ (canvasHeight * Math.random()));
            vertices.push(tVertex);
            delete tVertex;
        }
        draw();
    }


    var holder = document.getElementById('holder');
    holder.ondragover = function() {
        this.className = 'hover';
        return false;
    };
    holder.ondragend = function() {
        this.className = 'normal';
        return false;
    };


    var recycler = document.getElementById('recycler');
    recycler.onclick = function() {
        vertices = [];
        draw();
        return false;
    };

    holder.ondrop = function(e) {
        this.className = 'normal';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
            reader = new FileReader();
        reader.onload = function(event) {
            img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                sourceImg.width = this.width;
                sourceImg.height = this.height;
                canvas.width = this.width;
                canvas.height = this.height;
                canvas.style.marginLeft = (-this.width)+'px';
                canvasWidth = this.width;
                canvasHeight = this.height;

                imgCtx.clearRect(0, 0, this.width, this.height);
                imgCtx.drawImage(this, 0, 0);
                delete this;
				$("#wrapper").toggleClass("transparent");                
            }
        };
        reader.readAsDataURL(file);

        return false;
    };

    $(function() {
        $("#opacitySlider").slider({
            value: 100,
            min: 0,
            max: 100,
            step: 1,
            slide: function(event, ui) {
                document.getElementById('canvas').style.opacity = ui.value / 100;
            }
        });
    })
}
