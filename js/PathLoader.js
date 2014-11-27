/* 
* @Author: 卓文理 www.zwlme.com
* @Email:  531840344@qq.com
* @Date:   2014-11-26 13:31:47
* @Last Modified by:   卓文理 www.zwlme.com
* @Last Modified time: 2014-11-26 13:49:54
*/

;(function(window){
	'use strict';
	function PathLoader(el){
		this.el = el;
		// clear stroke。
		// svg stroke属性，getTotalLength() 返回svg线条长度
		// stroke-dasharray  是指定画出的线段每段的长度
		// stroke-dashoffset 是指定每个小段的起始偏移量。
		this.el.style.strokeDasharray = this.el.style.strokeDashoffset = this.el.getTotalLength();
	}

	PathLoader.prototype._draw = function(val) {
		this.el.style.strokeDashoffset = this.el.getTotalLength() * (1 - val);
	};

	PathLoader.prototype.setProgress = function(val, callback) {
		this._draw(val);
		if (callback && typeof callback === 'function') {
			// 设置延时，使得最后的加载进度条动画效果可见。
			setTimeout(callback, 200);
		};
	};

	PathLoader.prototype.setProgressFn = function(fn) {
		if (typeof fn === 'function') {
			fn(this);
		};
	};

	// 添加到全局命名空间
	window.PathLoader = PathLoader;
})(window);