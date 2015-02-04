/* 
* @Author: 卓文理 www.zwlme.com
* @Email:  531840344@qq.com
* @Date:   2014-11-22 11:59:50
* @Last Modified by:   卓文理 www.zwlme.com
* @Last Modified time: 2015-02-04 14:45:59
*/

(function(){
	// 事件屏蔽(mousewheel，键盘)，参考：http://stackoverflow.com/a/4770179
	// esc: 27,
	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = [27, 32, 34, 35, 40],
		keyOr = [36],
		startY,endY;

	// 阻止默认事件
	function preventDefault(e){
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}

	function wheel(e){}

	// 按键监听
	function keydown(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				// preventDefault(e);
				// return;
				toggle('reveal')
			}
		}
	}

	// 按键监听
	function keyOrDown(e) {
		for (var i = keyOr.length; i--;) {
			if (e.keyCode === keyOr[i]) {
				toggle(0)
			}
		}
	}

	
	function touchmove(e) {
		preventDefault(e);
		toggle('reveal');
	}

	// 
	function disable_scroll() {
		window.onmousewheel = document.onmousewheel = wheel;
		document.onkeydown    = keydown;
		document.body.ontouchmove = touchmove;
	}

	// 文章页
	function enable_scroll() {
		window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
		document.onkeydown  = keyOrDown;
	}

	var docElem = window.document.documentElement,
		scorllVal,
		isRevealed,
		noscroll,
		isAnimating,
		header    = document.querySelector('.post-header'),
		container = document.getElementById('container'),
		content   = document.getElementById('content'),
		trigger   = document.getElementById('btnArrow');

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	function toggle(reveal) {
		isAnimating = true;

		if (reveal) {
			classie.add(container,'modify');
		}else{
			noscroll = true;
			disable_scroll();
			classie.remove(container,'modify');
		}

		setTimeout(function(){
			isRevealed = !isRevealed;
			isAnimating = false;
			if (reveal) {
				noscroll = false;
				enable_scroll();
			};
		},1200)
	}

	function scrollPage(){
		scorllVal = scrollY();
		if (noscroll) {
			if (scorllVal < 0) {
				return false;
			};
			window.scrollTo(0,0);
		};
		if (isAnimating) {
			return false;
		};
		if (scorllVal > 0 && !isRevealed) {
			toggle(1);
		};
		if (scorllVal <= 0 && isRevealed) {
			toggle(0);
		};
	}

	disable_scroll();


	var pageScroll = scrollY();
	noscroll = pageScroll === 0;

	if (pageScroll) {
		isRevealed = true;
		classie.add(container,'modify');
	};


	window.addEventListener('scroll',scrollPage);
	// 文章翻页
	trigger.addEventListener('click',function(){toggle('reveal')});
})();