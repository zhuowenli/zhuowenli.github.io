/* 
* @Author: 卓文理 www.zwlme.com
* @Email:  531840344@qq.com
* @Date:   2014-11-26 13:34:04
* @Last Modified by:   卓文理 www.zwlme.com
* @Last Modified time: 2014-11-26 13:53:41
*/

(function () {
	var container = document.getElementById('container'),
		loading   = document.getElementById('loading'),
		loader    = new PathLoader(document.getElementById('ld-loader-circle'));

	function init() {
		window.addEventListener('scroll',noscroll);
		classie.add(container,'loading');
		startLoading();
		// 3d字体
		console.log("%c卓文理"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:20em;color:#fff;");
	}

	function startLoading() {
		var simulationFn = function(instance){
			var progress = 0,
				interval = setInterval(function(){
					instance.setProgress(progress);
					if (document.readyState === "interactive") {
						progress = Math.min(progress + Math.random() * 0.01, 1);
						instance.setProgress(progress);
					};
					if (document.readyState === "loading") {
						progress = Math.min(progress + Math.random() * 0.03, 1);
						instance.setProgress(progress);
					};
					if (document.readyState === "complete" || document.readyState === "Loaded") {
						progress = Math.min(progress + Math.random() * 0.2, 1);
						PageLoaded(progress,interval);
					};
				},80);
		}
		loader.setProgressFn(simulationFn);
	}

	// 页面加载完成
	function PageLoaded(progress,interval){
		if (progress === 1) {
			classie.remove(container,'loading');
			classie.add(container,'loaded');
			clearInterval(interval);

			var onEndHeaderAnimation = function(ev){
				classie.add(document.body, 'layout-switch');
				window.removeEventListener('scroll',noscroll);
			}
		};
	}

	// 阻止滚动
	function noscroll(){
		window.scrollTo(0,0);
	}
	init();
})();