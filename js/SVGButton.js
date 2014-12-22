(function(){
	function extend(a,b){
		for(var key in b){
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			};
		}
		return a;
	}
	function SVGButton(el, options){
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.init();
	}
	SVGButton.prototype.options = {
		speed: {reset: 800, active: 150},
		easing: {reset: mina.elastic, active:mina.easein}
	};
	SVGButton.prototype.init = function() {
		console.log('init');
		this.shapeEl = this.el.querySelector('span.button');

		var s = Snap(this.shapeEl.querySelector('svg'));
		this.pathEl = s.select('path');
		this.paths = {
			reset: this.pathEl.attr('d'),
			active: this.shapeEl.getAttribute('data-morph-active')
		};
		this.initEvents();
	};
	SVGButton.prototype.initEvents = function(){
		console.log('initEvents')
		this.el.addEventListener('mousedown', this.down.bind(this));
		this.el.addEventListener('touchstart', this.down.bind(this));

		this.el.addEventListener('mouseup', this.up.bind(this));
		this.el.addEventListener('touchend', this.up.bind(this));

		this.el.addEventListener('mouseout', this.up.bind(this));
	};
	SVGButton.prototype.down = function(){
		console.log('up')
		this.pathEl.stop().animate({'path': this.paths.active},this.options.speed.active,this.options.easing.active);
	};	
	SVGButton.prototype.up = function(){
		console.log('down')
		this.pathEl.stop().animate({'path': this.paths.reset},this.options.speed.reset,this.options.easing.reset);
	};
	[].slice.call( document.querySelectorAll( '.demo a' ) ).forEach( function( el ) {
		new SVGButton( el );
	});

})();