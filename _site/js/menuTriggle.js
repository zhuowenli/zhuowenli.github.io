/* 
* @Author: 卓文理 www.zwlme.com
* @Email:  531840344@qq.com
* @Date:   2014-11-22 10:19:22
* @Last Modified by:   卓文理 www.zwlme.com
* @Last Modified time: 2014-11-26 13:49:47
*/
(function(){
	var isMenuOpen,
		menu      = document.getElementById('menu'),
		btnMenu   = document.getElementById('btnMenu'),
		container = document.getElementById('container');
	// 打开菜单
	function openMenu(){
		classie.add(container,'menu-open');
	}
	function resetMenu(){
		classie.remove(container,'menu-open');
	}

	// 点击任意地方关闭菜单
	function bodyClickFn(event) {
		if (!classie.has(event.target,'menu')) {
			resetMenu();
			isMenuOpen = false;
			document.removeEventListener('click',bodyClickFn);
		}
	}

	// 菜单操作
	function menuTriggle(event) {
		if(isMenuOpen){
			isMenuOpen = false;
			resetMenu();
		}else{
			isMenuOpen = true;
			setTimeout(openMenu(),25);
			event.stopPropagation();
			event.preventDefault();
			document.addEventListener('click',bodyClickFn);
		}
	}

	// 菜单按钮事件
	btnMenu.addEventListener('click',menuTriggle);
})();