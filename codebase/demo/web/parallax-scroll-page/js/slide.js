jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});	
namespace("KUI.com");
KUI.com.loadImages = function (imgs, fn, base){
	base = base ? (base+'/').replace(/\/+$/, '/'): JS.cwd();
	var list = JS.forEach(JS.toArray(imgs), function (url){
		if(JS.isString(url)){
			url = JS.getFullPath(url, base);
			this.push(JS.task(function (tk){
				var img = new Image();
				img.onerror = img.onload = function (){
					img.onload = img.onerror = null;
					setTimeout(function() {
						tk.done(img);
					}, 10);
				};
				img.src = url;
			}));
		}
	}, []);
	list.async = true;
	return JS.when(list).then(fn);
};

namespace("KUI");
KUI.Class('BaseSlide', {
	effects: {},
	initialize: function (opts){
		this.set({
			currentBtnClass: 'current',
			auto: true,
			loop: true,
			speed: 2500,
			toggleEvent: 'hover',
			navItem: 'a',
			listItem: 'li',
			disabledClass: 'btn-disabled',
			effect: 'scroll-x',
			effectSpeed: 500,
			tween: 'easeInOutCubic'
		}, opts);
		this.animOpts = {
			duration: this.get('effectSpeed'),
			easing: this.get('tween')
		};
		this.set('speed', this.get('speed') + this.get('effectSpeed'));
		this.addUI('body', opts.body);
		this.addUI(JS.subObj('list,nav,prev,next', opts, [
			'.std-slide-list',
			'.std-slide-nav',
			'.std-slide-prev',
			'.std-slide-next'
		]), this.ui.body);
		this.addUI({
			images: this.ui.list.find(this.get('listItem')),
			buttons: this.ui.nav.find(this.get('navItem'))
		});
		this._initUI();
		if (this.get('prevLoad')) {
			this.trigger('imageLoadStart');
			setTimeout(this.bind('_loadImages'), 10);
		}else{
			this.initEvent();
		}		
	},
	_setZIndex: function (){
		var z = this.count*4;
		JS.forEach(arguments, function (el){
			el.css('zIndex', z);
		});
	},
	_absUI: function (ui){
		ui.css({
			position: 'absolute',
			left: 0,
			top: 0
		});
	},
	_initUI: function (){
		var ui = this.ui,
			mod = this;
		if (!/rela|abso/.test(ui.body.css('position'))) {
			ui.body.css('position', 'relative');
		}
		ui.body.css('overflow', 'hidden');
		var count = ui.images.length;
		this.count = count;
		this.current = 0;
		this._prev = -1;
		this.end = count - 1;
		this.effectEnd = true;
		this._setZIndex(ui.list, ui.nav, ui.prev, ui.next);
		this.width = this.get('width') || ui.body.width();
		this.height = this.get('height') || ui.body.height();
		ui.images.each(function (i, item){
			var el = $(item);
			mod._absUI(el);
			$(item).data('kui.slide.index', i).css('zIndex', count*2 - i );
		});
		if (!ui.buttons.size()) {
			var tmpl = this.get('btnTmpl') || '{{#~}}<a href="javascript:void(0)">{{%1}}</a>{{/~}}';
			ui.nav.html(JS.tmpl(tmpl, Array(count)));
			ui.buttons = this.ui.nav.find(this.get('navItem'));
			ui.buttons.eq(0).addClass(this.get('currentBtnClass'));
		}
	},
	_loadImages: function (){
		var mod = this;		
		KUI.com.loadImages(JS.map(this.ui.images.find('img').get(), function (){
			return this.src;
		})).then(function (i, len){
			mod.trigger('imageLoadSuccess', i, len);
			mod.initEvent();
		}, function (img, step, i, len){
			mod.trigger('imageLoading', img, step, i, len);
		});
		return this;
	},
	initEvent: function (){
		var hover,
			mod = this,
			ui = this.ui,
			eventType = this.get('toggleEvent') == 'hover' ? 'mouseover' : 'click';
		ui.buttons.each(function (i){
			$(this).data('kui.slide.index', i);
		});
		ui.body.hover(function (){
			hover = true;
		}, function (){
			hover = false;
		}).mousemove(function(){
			hover = true;
        });
		ui.buttons[eventType](function (){
			mod.toggleTo($(this).data('kui.slide.index'));
		});
		ui.next.click(function (){
			mod.next();
		});
		ui.prev.click(function (){
			mod.prev();
		});
		this.initEffect();
		ui.prev.addClass(this.get('disabledClass'));
		this.on('toggle', function (begin, end){
			var css = this.get('disabledClass'),
				cur = this.get('currentBtnClass');
			ui.prev[begin ? 'addClass' : 'removeClass'](css);
			ui.next[end ? 'addClass' : 'removeClass'](css);
			ui.buttons.removeClass(cur).eq(this.current).addClass(cur);
		});
		if (this.get('auto')) {
			this.autoId = setInterval(function() {
				if (!hover) {
					mod.next();
				}				
			}, this.get('speed'));
		}
	},
	initEffect: function (){
		var type = this.get('effect') || 'scroll-x',
			eff = this.effects[type];
		if (eff) {
			JS.func(eff.init).call(this);
			this.toggleUI = JS.isFunction(eff) ? eff : eff.animate;
		}else{
			this.toggleUI = JS.noop;
			return log('Slide effect "'+ type + '" not found', 'error');
		}
	},
	toggleTo: function (n, rel){
		var to = JS.range(rel ? this.current + n : n, 0, this.end, this.get('loop'));
		if (to !== this.current) {
			this._prev = this.current;
			this.current = to;
			this.toggleUI();
			this.trigger('toggle', this.current === 0, this.current === this.end);
		}
		return this;
	},
	next: function (){
		return this.toggleTo(1, true);
	},
	prev: function (){		
		return this.toggleTo(-1, true);
	}
});

KUI.Class('Slide', {Extends: KUI.BaseSlide});
KUI.Slide.extent = function (){
	KUI.message.extend.apply(KUI.Slide.fn.effects, arguments);
};

KUI.Slide.extent('scroll-x', {
	init: function (){
		var left = 0,
			w = this.width;
		this._absUI(this.ui.list);
		this.ui.images.each(function (i, el){
			el = $(el);
			el.css('left', left);
			el.data('slide.offset', -left);
			left += Math.max(w, el.width());
		}).show();
	},
	animate: function (){
		this.ui.list.stop().animate({
			left: this.ui.images.eq(this.current).data('slide.offset')
		}, this.animOpts);
	}
});

KUI.Slide.extent('scroll-y', {
	init: function (){
		var top = 0,
			h = this.height;
		this._absUI(this.ui.list);
		this.ui.images.each(function (i, el){
			el = $(el);
			el.css('top', top);
			el.data('slide.offset', -top);
			top += Math.max(h, el.height());
		}).show();
	},
	animate: function (){
		this.ui.list.stop().animate({
			top: this.ui.images.eq(this.current).data('slide.offset')
		}, this.animOpts);
	}
});

KUI.Slide.extent('opacity', {
	init: function (){
		this.ui.images.each(function (){
			$(this).data('slide.zIndex', $(this).css('zIndex'));
		});
	},
	animate: function (){
		var items = this.ui.images,
			prev = items.eq(this._prev);
		items.hide();
		prev.stop().show().css({
			opacity:1,
			'zIndex': prev.data('slide.zIndex')
		});
		items.eq(this.current).show().stop().css({
			zIndex: this.count*3,
			opacity: 0
		}).animate({
			opacity: 1
		}, this.animOpts);
	}
});

KUI.Slide.extent('block', {
	init: function (){
		var w = Math.ceil(this.width/20),
			h = this.height,
			num = Math.ceil(this.width/w),
			html = [];
		this.mask = $('<div/>');
		for (var i = 0, j = num; i < j; i++) {
			html.push(JS.stringf('<a href="#" target="_blank" style="width:{{0}}px;height:{{1}}px;left:{{2}}px;top:0;background-position:-{{2}}px 0" data-left="{{2}}" data-width="{{0}}" data-height={{1}}></a>', [w, h, i*w]));
		}
		this.blocks = this.mask.html(html.join('')).find('a').css({
			position: 'absolute'
		});
		this._absUI(this.mask);
		this.mask.css('zIndex', this.count*3);
		this.ui.body.append(this.mask);
	},
	animate: function (){
		var mod = this,
			h = this.height,
			items = this.ui.images,
			cur = items.eq(this.current),
			prev = items.eq(this._prev);
		items.hide();
		prev.stop().show().css({
			opacity:1,
			'zIndex': prev.data('slide.zIndex')
		});
		var setPos,
			type = parseInt(Math.random()*4, 10);
		switch(type){
			case 0:setPos = function (i, b){return {top: i%2 ? h : -h};};
			break;
			case 1:setPos = function (i, b, w){return {width: w*3, left: b+20*(i%2?1:-1), top: i%2 ? 40 : -40};};
			break;
			case 2:setPos = function (i, b, w){return {top:h*i , height:0};};
			break;
			default:setPos =  function (i, b, w){return {top:0, width:0};};
		}
		this.blocks.each(function (i){
			$(this).stop().attr('href', cur.find('a').attr('href') || ('javas'+'\cript:void(0)')).css({
				opacity:0,
				backgroundImage: 'url('+cur.find('img').attr('src')+')'
			}).css(setPos(i, +this.getAttribute('data-left'), +this.getAttribute('data-width'), +this.getAttribute('data-height')));
		});
		JS.forEach(this.blocks.get().reverse(), function (el, i, arr, j){
			setTimeout(function() {
				$(el).animate({
					opacity: 1,
					top:0,
					width: el.getAttribute('data-width'),
					left: el.getAttribute('data-left'),
					height: el.getAttribute('data-height')
				}, mod.animOpts);
			}, (100/j)*(type ==2 ? 1 : i));
		});
	}
});