/* 
* @Author: 卓文理 zhuowenli.sinaapp.com
* @Email:  531840344@qq.com
* @Date:   2014-11-22 10:19:22
* @Last Modified by:   卓文理 www.zwlme.com
* @Last Modified time: 2015-01-30 11:59:24
*/
(function(){
	var isMenuOpen = false,
		menu      = document.getElementById('menu'),
		btnMenu   = document.getElementById('btnMenu'),
		btnClose  = document.getElementById('btnClose'),
		container = document.getElementById('container'),

		SVGMenu   = document.getElementById('SVGMenu'),
		svg  = Snap(SVGMenu.querySelector('svg')),
		path = svg.select('path'),
		d    = path.attr('d'),

		open = SVGMenu.getAttribute('data-menu-open').split(';'),
		close = SVGMenu.getAttribute('data-menu-close').split(';'),
		openTotal  = open.length,
		closeTotal = close.length,
		isAnimating = false;

	// 打开菜单
	function openMenu(){
		classie.add(container,'menu-open');
	}
	function resetMenu(){
		classie.remove(container,'menu-open');
	}

	// 菜单操作
	function menuTriggle(event) {
		if (isAnimating) {
			return false;
		};
		isAnimating = true;

		if( isMenuOpen ){
			var closePos = 0,
				nextClose = function(closePos){
					if (closePos > closeTotal - 1) {
						isAnimating = false;
						return;
					}else{
						path.animate({'path' : close[closePos]}, closePos === 0 ? 300 : 400, closePos === 0 ? mina.easein : mina.elastic, function() {
							nextClose(closePos);
						});
						closePos++;
					}
				};

			nextClose(closePos);
			// classie.add(container, 'menu-close');

			resetMenu();
			// classie.remove(container, 'menu-close');
		}else{
			openMenu();
			var openPos = 0;
			var nextOpen = function(openPos){
					if (isNaN(openPos)) {
						openPos = 0;
					};
					if (openPos > openTotal - 1) {
						isAnimating = false;
						return;
					}else{
						path.animate( { 'path' : open[openPos] }, openPos === 0 ? 200 : 300, openPos === 0 ? mina.easein : mina.elastic, function() {
						// path.animate({'path' : open[openPos]}, 250, mina.easeinout, function(){
							isAnimating = false;
							nextOpen(openPos);
						});
						openPos++;
					}
				};
			nextOpen();
		}
		isMenuOpen = !isMenuOpen;
	}

	// 菜单按钮事件
	btnMenu.addEventListener('click',menuTriggle);
	if (btnClose) {
		btnClose.addEventListener('click',menuTriggle);
	};

	// close the menu element if the target it´s not the menu element or one of its descendants..
	container.addEventListener( 'click', function(ev) {
		var target = ev.target;
		if( isMenuOpen && target !== btnMenu ) {
			menuTriggle();
		}
	} );

})();