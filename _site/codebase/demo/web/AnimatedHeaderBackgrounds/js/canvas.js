/* 
* @Author: 卓文理(zwlme.com)
* @Date:   2014-09-30 11:32:33
* @Descriptions: 
* @Last Modified by:   卓文理(zwlme.com)
* @Last Modified time: 2014-09-30 12:32:47
* @Version: 1.0.0
* @Requires: 
*/

;(function(){
    var width,height,largeHeader,canvas,ctx,circles,target,animateHeader = true;

    // Main
    initHeader(); // 加载canvas效果
    addListeners(); // 监听事件

    function initHeader(){
    	width = window.innerWidth;
    	height = window.innerHeight;
    	target = {x: 0,y: height};

    	largeHeader = document.getElementById('large-header');
    	largeHeader.style.height = height + 'px';

    	canvas = document.getElementById("canvas");
    	canvas.width = width;
    	canvas.height = height;
    	ctx = canvas.getContext('2d');

    	// 创建粒子
    	circles = [];
    	for (var i = 0; i < width*0.5; i++) {
    		var c = new Circle();
    		circles.push(c);
    	};
    	animate();
    }

    function addListeners () {
    	window.addEventListener('scroll',scrollCheck);
    	window.addEventListener('resize',resize);
    }

    function scrollCheck () {
    	if (document.body.scrollTop > height) {
    		animateHeader = false;
    	}else{
    		animateHeader = true;
    	}
    }

    function resize () {
    	width = window.innerWidth;
    	height = window.innerHeight;
    	largeHeader.style.height = height + 'px';
    	canvas.width = width;
    	canvas.height = height;
    }

    function animate () {
    	if(animateHeader){
    		ctx.clearRect(0,0,width,height);
    		for(var i in circles){
    			circles[i].draw();
    		}
    	}
    	requestAnimationFrame(animate); // 使用requestAnimationFrame
    }

    // canvas 粒子效果
    function Circle () {
    	var _this = this;

    	(function(){
    		_this.pos = {};
    		init();
    		console.log(_this);
    	})()

    	function init () {
    		_this.pos.x = Math.random() * width;
    		_this.pos.y = Math.random() * 100 + height;
    		_this.alpha = Math.random() * 0.3 + 0.1; // 透明度
    		_this.scale = Math.random() * 0.3 + 0.1; // 大小
    		_this.velocity = Math.random();
    	}

    	this.draw = function () {
    		if (_this.alpha <= 0) {
    			init();
    		}
    		_this.pos.y -= _this.velocity; // 粒子向上移动
    		_this.alpha -= 0.0005;         // 透明度逐渐减小
    		ctx.beginPath();
    		ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
    		ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha +')';
    		ctx.fill(); // 填充
    	}
    }
})();