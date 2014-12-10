/* 
* @Author: 卓文理(zwlme.com)
* @Date:   2014-09-30 10:44:42
* @Descriptions: 
* @Last Modified by:   卓文理(zwlme.com)
* @Last Modified time: 2014-09-30 10:57:10
* @Version: 1.0.0
* @Reference: http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
* @Requires:
*/

;(function(){
    var lastTime = 0,
    	vendors  = ['webkit','moz','ms','o'];

    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    	window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
    	window.cancelAnimationFrame  = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
    };

    if (!window.requestAnimationFrame) {
    	window.requestAnimationFrame = function(callback,element){
    		var currtime = new Date().getTime(),
    			timeToCall = Math.max(0, 16 - (currtime - lastTime)),
    			id = window.setTimeout(function() {
    				callback(currtime + timeToCall);
    			}, timeToCall);
    		lastTime = currtime + timeToCall;
    		return id;
    	}
    };

    if (!window.cancelAnimationFrame) {
    	window.cancelAnimationFrame = function (id) {
    		clearTimeout(id);
    	}
    };

})();