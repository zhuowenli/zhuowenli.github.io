namespace("KUI.widget",{version:'1.0.4'});
namespace("KUI.fn");
namespace("KUI.def");
namespace("KUI.helper", function (){
	var bm = 'document.' + (/^BackCompat/i.test(document.compatMode) ? 'body' : 'documentElement'),
		HAS_WRAP = /^\{/,
		SAFE_RE = /function|settimeout|setinterval|parsejson/i,
		WS_RE = /^\w+(\s*,\s*\w+)?$/,
		keyFix = {right:'left',bottom:'top'},
		ie6Exp = {
			top: bm + '.scrollTop+',
			left: bm + '.scrollLeft+',
			right: bm + '.scrollLeft+'+bm+'.clientWidth-this.offsetWidth-',
			bottom: bm + '.scrollTop+'+bm+'.clientHeight-this.offsetHeight-'
		};
	function fixShake(){
		this.setFixedBg = JS.noop;
		var bg = document.documentElement.style;
		if (bg.backgroundAttachment != 'fixed') {
			bg.backgroundImage = 'url(about:blank)';
			bg.backgroundAttachment = 'fixed';
		}
	}
	var div = document.createElement('div'),  
		prefixs = 'Webkit,Moz,O,ms'.split(',');
	this.supports = function(prop) {  
		var dstyle = div.style;  
		if (prop in dstyle) return true;  
		prop = prop.replace(/^[a-z]/, function(val) {return val.toUpperCase();});
		for (var i =  prefixs.length; i--;) {if (prefixs[i] + prop in dstyle) {return true;}}
		return false;  
	}; 
	this.ie6Fixed = function (style, pos, bool, ori_p, fix){
		if (bool) {
			fixShake();
			style.position = 'absolute';
			JS.forIn(pos, function (v, k){
				var k2 = (keyFix[k] || k), fv = parseInt(fix[k2], 10) || 0;
				style.setExpression(k2, 'eval(' + ie6Exp[k] + '(' + v + ')-(' + fv + ')) + "px"');
			});
		}else{
			JS.forIn(pos, function (v, k){style.removeExpression(keyFix[k] || k);style[k] = v + 'px';});
			style.position = ori_p;
		}
	};
	this.initEasing = function (){
		jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
		var delay;
		KUI.helper.wscrollmsg=function (){JS.message.send('window-scroll', $(document).scrollTop());}
		$(window).scroll(KUI.helper.wscrollmsg);
		$.fn.KUI=function(a){this.attr('data-kui',a);clearTimeout(delay);delay=setTimeout(KUI.setup,10);};
		$.fn.addClassBy = function(w, cls){return this[(w?'add':'remove')+'Class'](cls);};
	};
	if (window.jQuery) {this.initEasing();this.initEasing = JS.noop;}
	this.parseConfig = function (el, k, rm){
		var conf, attr = JS.trim(el.getAttribute(k)||'');
		if (attr) {
			if(WS_RE.test(attr)){attr=attr.replace(/(\w+)/g,'$1:{}');}
			if(!HAS_WRAP.test(attr)){attr = ('{'+attr+'}').replace(/,\}/g,'}');}
			if(SAFE_RE.test(attr)){
				log('KUI config "' + attr + '" no safe', 'error');
			}else{
				conf = JS.parseJSON(attr);
				if (!conf) {log('KUI config "' + attr + '" parse error', 'error');}
					else if(rm){$(el).removeAttr(k);}
			}
		}
		return conf;
	};
	this.redirct = function (conf, val){
		var url = JS.stringf(conf.url, encodeURIComponent(val));
		if (conf.blank) {window.open(url, JS.now());}else{location.href=url;}
	};
	function load(node, conf, type){
		var use = JS.subObj('use', conf, false, true).use;
		conf = JS.assy(type, conf);
		JS.load(use, function (){KUI.helper.useConfig(node, conf);});
	}
	this.useConfig = function (node, conf){
		JS.forIn(conf, function (conf, type){
			if (/^[a-z]/.test(type)) {
				if (JS.isFunction(KUI.fn[type])) {KUI.fn[type].call(node, conf);}
					else if(JS.has(conf, 'use')){load(node, conf, type);}
					else{log('KUI fn "'+type+'" no found', 'error');}
			}else{
				if (JS.isFunction(KUI.widget[type])) {KUI.widget[type](JS.extend(JS.assy(conf.bindKey || 'widget', node), conf));}
					else if(JS.has(conf, 'use')){load(node, conf, type);}
					else{log('KUI widget "'+type+'" no found', 'error');}
			}
		});
	};
});
KUI.helper({
	getTimeByUrl: function (url, fn){
		$.ajax({
			url: JS.addVersion(url, 'no-cache'), dataType: 'text',
			success: function (time){
				if (/^\d{10}$/.test(time)) {time *= 1000;}else if(!/\D/g.test(time)){time *= 1;}
				JS.func(fn)(JS.toDate(time));
			}
		});
	},
	loadImages: function (imgs, fn, base){
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
	},
	setFixed: function (el, pos, bool){
		var node = $(el), style, ori_p;
		if (!node.size()) {return log('KUI setFixed empty', 'error');}
		style = node.get(0).style;
		if (node.prop('ori_position') === undefined) {node.prop('ori_position', style.position);}
		ori_p = node.prop('ori_position');
		pos = JS.subObj('top,left,bottom,right', pos, [0]);
		if ('right' in pos) {delete pos.left;}
		if ('bottom' in pos) {delete pos.top;}
		bool = bool !== false;
		return JS.ie(6) ? this.ie6Fixed(style, pos, bool, ori_p, $(node.get(0).offsetParent).offset()) :
			node.css(JS.extend(pos, {position: bool ? 'fixed' : ori_p}));
	}
});
KUI.setup = function (){
	$('body *[data-kui]').each(function (i){KUI.helper.useConfig(this, KUI.helper.parseConfig(this, 'data-kui', true));});
	setTimeout(KUI.helper.wscrollmsg, 40);
};
KUI(function (){
	KUI.helper.initEasing();
	KUI.def(KUI.helper.parseConfig(document.body, 'data-define'));
	KUI.setup();
	JS.message.send('KUI.Ready');
});
KUI.widget.Class('Base', {
	initConfig: function (conf, typeName){
		this.addUI('widget', conf.widget);
		this.fx = JS.isArray(conf.fx) ? conf.fx : [];
		this.name = conf.name;
		if (typeName) {this.ui.widget.data(typeName, this);}
		this.conf_fx = {duration: conf.speed,easing: conf.easing};
		this.conf = conf;
	}
});
KUI.widget.Class('Slider', {
	Extends: KUI.widget.Base,
	initialize: function (opts){
		var conf = JS.extend({
				tmpl: {},
				nav: '.k_slider_btn',
				content: '.k_slider_list',
				prevBtn: '.k_slider_prev',
				nextBtn: '.k_slider_next',
				disableCls: 'disabled',
				selectedCls: 'selected',
				fx: [],
				trigger: 'hover',
				effect: 'scrollx',
				speed: 300,
				easing: false,
				offset: 0,
				loading: true,
				group: 1,
				oneStep: false,
				loop: true,
				autoplay: true,
				interval: 3000
			}, opts), body, ui = this.ui;
		if (conf.oneStep) {conf.autoplay = opts.autoplay;}
		this.initConfig(conf, 'Slider');
		body = ui.widget;
		this.selectedIndex = -1;
		if (!body.size()) {return log('widget Slider not body', 'error');}
		this.addUI(JS.subObj('nav,content,prevBtn,nextBtn', conf), body);
		ui.contentItems = ui.content.children();
		this.count = ui.contentItems.size();
		this.groupSize = Math.ceil(this.count/conf.group);
		this.initEffect();
		if(this.groupSize < 2 && !conf.oneStep){return;}
		if (conf.oneStep) {this.groupSize = this.count;conf.loop=false;}
		if (!ui.nav.size() && conf.tmpl.nav) {ui.nav= $(JS.tmpl(conf.tmpl.nav, Array(this.groupSize))).appendTo(body);}
		ui.navItems = ui.nav.children();
		if (!ui.prevBtn.size() && conf.tmpl.prev) {ui.prevBtn = $(JS.tmpl(conf.tmpl.prev)).appendTo(body);}
		if (!ui.nextBtn.size() && conf.tmpl.next) {ui.nextBtn = $(JS.tmpl(conf.tmpl.next)).appendTo(body);}
		this.bindUIEvent();
		this.toggleTo(0, 'INIT');
		if (conf.loading) {
			ui.widget.addClass('loading');
			this.loadImages();
		}else{
			this._auto(this);
		}
	},
	_auto: function (obj){
		if (this.conf.autoplay) {setInterval(function() {if (!obj.hover) {obj.next();}}, this.conf.interval);}
	},
	loadImages: function (){
		var obj = this;
		KUI.helper.loadImages(JS.map(this.ui.content.find('img').get(), function (){
			return this.src;
		})).then(function (i, len){
			obj.trigger('loadend', i, len);
			obj._auto(obj);
			obj.ui.widget.removeClass('loading');
		}, function (img, step, i, len){
			obj.trigger('loading', img, step, i, len);
		});
		return this;
	},
	setRelPos: function (el){if (/^(static|)$/.test($(el).css('position'))) {$(el).css('position','relative');}},
	bindUIEvent: function (){
		var obj = this, delay, opts = this.conf, ui = this.ui, loop = opts.loop;
		this.setRelPos(ui.widget);
		this.setRelPos(ui.content.parent());
		ui.content.parent().css('overflow', 'hidden');
		ui.prevBtn.click(function (){if (loop||!$(this).hasClass(opts.disableCls)) {obj.prev();}});
		ui.nextBtn.click(function (){if (loop||!$(this).hasClass(opts.disableCls)) {obj.next();}});
		$(ui.prevBtn).add(ui.nextBtn).hover(function (){obj.hover = true;}, function (){obj.hover = false;});
		ui.widget.hover(function (){obj.hover = true;}, function (){obj.hover = false;})
			.mousemove(function (){obj.hover = true;});
		ui.navItems.each(function (i){this.CAROUSEL_INDEX = i;});
		if (opts.trigger == 'hover') {
			ui.navItems.hover(function (){
				var idx = this.CAROUSEL_INDEX;
				delay = setTimeout(function() {obj.toggleTo(idx);},100);
			}, function (){clearTimeout(delay);});
		}else{
			ui.navItems.click(function (e){
				obj.toggleTo(this.CAROUSEL_INDEX);
			});
		}
	},
	initEffect: function (){
		var effect = this.effects[this.conf.effect] || this.effects.display;
		if (effect && JS.isFunction(effect.init)) {effect.init.call(this);}
		this.effect = effect;
	},
	toggleTo: function (n, init, ordinal){
		var dbCls = this.conf.disableCls,
			nbCls = this.conf.selectedCls,
			loop = this.conf.loop,
			prev = this.selectedIndex,
			fx = this.conf.fx,
			ui = this.ui,
			max = this.groupSize-1;
		if (this.conf.oneStep) {max = this.count - this.conf.group;}
		n = JS.range(n, 0, max, this.conf.loop);
		ui.prevBtn.removeClass(dbCls).prop('disabled', false);
		ui.nextBtn.removeClass(dbCls).prop('disabled', false);
		if (n === 0) {this.trigger('firstItem');if(!loop){ui.prevBtn.addClass(dbCls).prop('disabled', true);}}
		if (n === max) {this.trigger('lastItem');if(!loop){ui.nextBtn.addClass(dbCls).prop('disabled', true);}}
		this.selectedIndex = n;
		ui.navItems.removeClass(nbCls).eq(n).addClass(nbCls);
		if(fx[0]){ui.navItems.eq(n).stop().animate(fx[0], this.conf_fx);}
		if(fx[1]){ui.navItems.eq(prev).stop().animate(fx[1], this.conf_fx);}
		this.trigger('toggle', prev, n);
		if (!init) {this.effect.animate.call(this, prev, n, ordinal);}
	},
	prev: function (){this.toggleTo(this.selectedIndex - 1, false, true);},
	next: function (){this.toggleTo(this.selectedIndex + 1, false, true);},
	continuous: function (a, b, c, d){
		var g = this.conf.group, box = this.ui.content, last, right, max = this.count - g,
			all = this.ui.contentItems, cur = Math.min(b*g, max), toItem = all.eq(cur),
			e2h = b === 0 && a == this.groupSize-1,
			h2e = a === 0 && b == this.groupSize-1;
		if (this.conf.oneStep) {toItem = all.eq(Math.min(this.count - this.conf.group, Math.max(b, 0)));}
		if (this.conf.loop) {
			if (c&&(e2h || h2e)) {
				last = all.slice(-1);
				right =  last.position()[d] + (d=='left' ? last.width() : last.height()) + this.conf.offset;
				all.slice(0, g).css('position', 'relative').css(d, right);
				if (h2e) {box.css(d, -right);}
			}
			if (a===0&&b===1) {
				box.css(d, 0);
				all.slice(0, g).css(d, 0);
			}
			if (b===0 && a===1) {all.slice(0, g).css(d, 0);}
		}
		box.stop().animate(JS.assy(d, -toItem.position()[d]), this.conf_fx);
	},
	effects: {
		display: {
			init: function (){this.ui.contentItems.hide().slice(0, this.conf.group).show();},
			animate: function (a, b){
				var g = this.conf.group;
				this.ui.contentItems.hide().slice(b*g, b*g+g).show();
			}
		},
		scrollx: {
			init: function (){
				this.ui.content.css({'width': '999999px','position': 'absolute'});
				this.ui.contentItems.css('float', 'left');
				var out = this.ui.content.parent();
				if (out.height() < 30) {out.height(this.ui.content.height());}				
			},
			animate: function (a, b, c){
				this.continuous(a, b, c, 'left');
			}
		},
		scrolly: {
			init: function (){
				this.ui.content.css({'position': 'absolute'});
			},
			animate: function (a, b, c){this.continuous(a, b, c, 'top');}
		},
		fade: {
			init: function (){
				this.group = 1;
				this.groupSize = this.count;
				this.ui.contentItems.each(function (i, el){$(el).css({zIndex: i ? 1 : 5,position: 'absolute',top: 0,left: 0});});
			},
			animate: function (a, b, c){
				var all = this.ui.contentItems, toItem = all.eq(b), fromItem = all.eq(a);
				all.css('zIndex', 1);
				toItem.css({zIndex: 5});
				fromItem.css({zIndex: 3});
				if (a != b) {
					toItem.css({opacity: 0});
					toItem.stop().animate({opacity: 1}, this.conf_fx);
				}
			}
		}
	}
});
KUI.widget.Class('Tabs', {
	Extends: KUI.widget.Base,
	initialize: function (opts){
		var conf = JS.extend({
				nav: '.k_tabs_btn',
				navItem: false,
				content: '.k_tabs_content',
				contentItem: false,
				selectedCls: 'selected',
				trigger: 'hover',
				fxItem: false,
				fx: false,
				speed: 200,
				toggleTo: 0,
				autoplay: false,
				easing: false,
				interval: 5000
			}, opts),
			exp = /this/,
			obj = this;
		if (!KUI.helper.supports('transition')) {conf.css3 = false;}
		this.initConfig(conf, 'Tabs');
		this.selectedIndex = 0;
		this.addUI(JS.subObj('nav,content,prevBtn,nextBtn', conf), this.ui.widget);
		this.ui.navItems = conf.navItem ? this.ui.nav.find(conf.navItem) : this.ui.nav.children();
		this.ui.contentItems = conf.contentItem ? this.ui.content.find(conf.contentItem) : this.ui.content.children();
		this.count = this.ui.navItems.size();
		if (conf.fxItem) {
			this.addUI({'fxItem': conf.fxItem}, this.ui.widget);
			if (this.fx.length) {
				JS.each(this.fx[0], function (v, k, o){
					if (exp.test(v)) {o[k] = JS.parseJSON('function(){try{return '+v+'}catch(e){log("KUI Tabs fxItem error","error")}}') || JS.noop;}
				});
			}
		}
		this.bindUIEvent();
		this.toggleTo(conf.toggleTo);
		if (conf.autoplay) {
			setInterval(function() {
				if (!obj.hover) {obj.next();}
			}, conf.interval);
		}
	},
	bindUIEvent: function (){
		var obj = this, delay, opts = this.conf, ui = this.ui;
		ui.navItems.each(function (i){this.TABS_INDEX = i;});
		ui.widget.hover(function (){obj.hover = true;}, function (){obj.hover = false;});
		if (opts.trigger == 'hover') {
			ui.navItems.hover(function (){
				var idx = this.TABS_INDEX;
				delay = setTimeout(function() {obj.toggleTo(idx);},100);
			}, function (){clearTimeout(delay);});
		}else{
			ui.navItems.click(function (){obj.toggleTo(this.TABS_INDEX);});
		}
	},
	next: function (){this.toggleTo((this.selectedIndex + 1)%this.count);},
	toggleTo: function (n){
		var nbCls = this.conf.selectedCls, prev = this.selectedIndex,
			ui = this.ui, all = ui.navItems, cur = all.eq(n), fx = this.fx;
		n = JS.range(n, 0, this.count-1, this.conf.loop);
		this.toggle(prev, n);
		this.selectedIndex = n;
		all.removeClass(nbCls).eq(n).addClass(nbCls);
		if (fx.length) {
			if (ui.fxItem) {
				ui.fxItem.stop().animate(JS.forIn(fx[0], function (v, k, o){
					this[k] = JS.isFunction(v) ? v.call(cur) : v;
				},{}), this.conf_fx);
			}else{
				all.eq(prev).stop().animate(fx[1], this.conf_fx);
				all.eq(n).stop().animate(fx[0], this.conf_fx);
			}
		}
		this.trigger('toggle', prev, n);
	},
	load: function (item, url){
		$.ajax({
			url: url,
			dataType: 'text',
			success: function (text){item.html(text);},
			complete: function (){item.removeClass('loading');}
		});
	},
	toggle: function (a, b){
		var all = this.ui.contentItems, pre = all.eq(a), cur = all.eq(b), css3 = this.conf.css3, ajax = cur.attr('data-ajax');
		if (a === b) {return;}
		if (ajax) {
			cur.addClass('loading');
			cur.removeAttr('data-ajax');
			this.load(cur, ajax);
		}
		if (JS.isArray(css3)) {
			clearTimeout(this.css3Timer);
			pre.addClass(css3[0]).removeClass(css3[2]);
			this.css3Timer = setTimeout(function() {
				pre.removeClass(css3[0]).hide().css({left: -9999});
				cur.show().css({left: 0,top: 0}).addClass(css3[2]);
			},  css3[1]);
		}else{
			cur.show();
			all.not(cur).hide();
		}
	}
});
KUI.widget.Class('LightCell', {
	Extends: KUI.widget.Base,
	initialize: function (opts){
		var conf = JS.extend({
				items: 'a img',
				opacity: 0.5,
				speed: 200,
				fxItem: false,
				fx:[]
			}, opts),
			obj = this,
			ui = this.ui,
			fxItem = JS.isString(fxItem) ? fxItem : false;
		this.initConfig(conf, 'LightCell');
		this.addUI({items: conf.items}, ui.widget);
		conf.opacity = JS.range(conf.opacity, 0, 1);
		ui.items.parent().css('background', '#000');
		function anim(el, fx){
			if (fx) {
				el = fxItem ? $(fxItem, el) : $(el);
				el.stop().animate(fx, obj.conf_fx);
			}
		}
		ui.widget.hover(null, function (){
			ui.items.fadeTo('fast', 1);
		});
		ui.items.hover(function (e){
			ui.items.not(this).css('opacity',  conf.opacity);
			$(this).stop().css('opacity', 1);
			anim(this, obj.fx[0]);
		}, function (){
			anim(this, obj.fx[1]);
		});
	}
});
KUI.widget.Class('CheckGroup', {
	Extends: KUI.widget.Base,
	initialize: function (opts){
		var conf = JS.extend({
				all: 'input.all_select',
				content: 'input:checkbox'
			}, opts),
			obj = this,
			ui = this.ui;
		this.initConfig(conf, 'CheckGroup');
		this.addUI(JS.subObj('all,content', conf), ui.widget);
		ui.content = ui.content.not(ui.all);
		ui.items = ui.all.add(ui.content);
		ui.all.click(function (){obj.allSelect(this.checked);});
		ui.content.click(function (){ui.all.prop('checked', ui.content.not(':checked').size() === 0);obj._change();});
		this.allSelect = function (checked){ui.items.prop('checked', checked !== false);obj._change();};
	},
	_change: function (){
		this.trigger('change', this.ui.content.filter(':checked').size());
	}
});
KUI.widget.Class('Menu', {
	Extends: KUI.widget.Base,
	initialize: function (opts){
		var conf = JS.extend({
				nav: '.k_menu_btn',
				content: '.k_menu_content',
				selectedCls: 'selected',
				fxItem: false,
				fx: false,
				alignTop: true,
				delay: 120,
				offset: -1,
				speed: 200
			}, opts);
		this.fxItem = JS.isString(conf.fxItem) ? conf.fxItem : false;
		this.initConfig(conf, 'Menu');
		this.addUI(JS.subObj('nav', conf), this.ui.widget);
		this.ui.navItems = this.ui.nav.children();
		this.bindUIEvent();
	},
	bindUIEvent: function (){
		var obj = this, delay, opts = this.conf, ui = this.ui, nbCls = opts.selectedCls, fxItem = this.fxItem;
		function anim(el, fx, enter){
			if (fx) {
				el = fxItem ? $(fxItem, el) : $(el);
				if (enter && obj.fx[2]) {el.css(obj.fx[2]);}
				el.stop().animate(fx, obj.conf_fx);
			}
		}
		ui.navItems.each(function (i){this.MENU_INDEX = i;}).hover(function (){
			var el = this;
			delay = setTimeout(function() {
				obj.toggleTo(el.MENU_INDEX);
				if (!obj.isIn) {anim(el, obj.fx[0], true);}	
				obj.isIn = true;				
			}, obj.isIn ? 16 : opts.delay);
		}, function (){
			clearTimeout(delay);
			anim(this, obj.fx[1]);
		});
		ui.nav.hover(false, function (){
			obj.isIn = false;
			clearTimeout(delay);
			ui.navItems.removeClass(nbCls);
		});
	},
	toggleTo: function (n){
		var nbCls = this.conf.selectedCls,
			ui = this.ui;
		n = JS.range(n, 0, this.count-1, this.conf.loop);
		ui.navItems.removeClass(nbCls).eq(n).addClass(nbCls);
		this.showContent(ui.navItems.eq(n));
		this.trigger('toggle', n);
	},
	load: function (item, url){
		$.ajax({
			url: url,
			dataType: 'text',
			success: function (text){item.html(text);},
			complete: function (){item.removeClass('loading');}
		});
	},
	showContent: function (btn){
		var cur = btn.find(this.conf.content),
			conf = this.conf,
			ajax = cur.attr('data-ajax');
		if (ajax) {
			cur.addClass('loading');
			cur.removeAttr('data-ajax');
			this.load(cur, ajax);
		}
		if (conf.alignTop) {
			var mb = btn.offset().top, bodyH = cur.outerHeight(), bt;
			mid = Math.max(this.ui.nav.offset().top, $(document).scrollTop() + (Math.max(18, $('html').prop('clientHeight') - bodyH) - 16)/2, btn.height() + mb - bodyH + 16);
			bt = Math.min(conf.offset, mid-mb);
			if (conf.topFx != false && !JS.isEmpty(this.nextBodyTop)) {
				cur.css({top: Math.min(-1, this.nextBodyTop - mb)});
				cur.stop().animate({top:bt});
			}else{
				cur.css({top:bt});
			}
			this.nextBodyTop = mid;
		}else{cur.css({left: conf.offset});}
		this.currentBody = cur;
	}
});
KUI.widget.Class('Number', {
	Extends: KUI.widget.Base,
	initialize: function (opts){
		var conf = JS.extend({
			min: 1,
			max: null,
			value: false,
			up: '.num_up',
			down: '.num_down',
			input: 'input:text',
			disabledCls: 'disabled'
		},opts), ui, obj = this;
		this.initConfig(conf, 'Number');
		ui = this.addUI(JS.subObj('up,down,input', conf), this.ui.widget);
		ui.input.attr('data-max', JS.intt(conf.max));
		ui.input.attr('data-min', JS.intt(conf.min));
		this.value = JS.intt(JS.isEmpty(conf.value) ? conf.value : ui.input.val()) || 0;
		ui.up.click(function (){obj.setVal(1);});
		ui.down.click(function (){obj.setVal(-1);});
		ui.input.keydown(function (e){var k = e.keyCode;if (k===38) {obj.setVal(1);}else if(k===40){obj.setVal(-1);}});
		ui.input.keyup(function (e){var k = e.keyCode;if(k!==8&&k!=34&&(k<37||k>39)){obj.val2int(this.value);}});
		ui.input.blur(function (){obj.val2int(this.value, true);});
		ui.input.on('updateRange', function (){obj.val2int(this.value);});
		this.setVal(0);
	},
	getRange: function (input){
		this.max =JS.intt(input.attr('data-max'));
		this.min = JS.intt(input.attr('data-min'));
	},
	val2int: function (val, blur){
		var v2 = val.replace(/\D/g,'');
		if (val || blur) {this.setVal((JS.intt(v2)||0) - this.value);}
	},
	setVal: function (n){
		if (!this.disabled) {
			var cls = this.conf.disabledCls;
			this.getRange(this.ui.input);
			this.value = JS.range(JS.intt(this.value) + n, this.min, this.max);
			this.ui.up.addClassBy(this.value === this.max, cls);
			this.ui.down.addClassBy(this.value === this.min, cls);
			this.ui.input.val(this.value);
			this.trigger('change', this.value);
			this.ui.input.trigger('change', {type:'change'});
		}
	}
});
KUI.fn({
	backTop: function (){
		KUI.fn.scrollTo.apply(this, arguments);
	},
	scrollTo: function (opts){
		var conf = JS.extend({effect: true, to: false, offset:0,speed:600,easing:'easeInQuart'}, opts),vp = $('body,html'), target = conf.to ? $(conf.to) : false;
		$(this).click(function (){
			var to = (target ? target.offset().top : 0) + conf.offset;
			if (conf.effect) {vp.animate({scrollTop: to},{speed:conf.speed,easing:conf.easing});}else{vp.scrollTop(to);}
			return false;
		});
	},
	showByTop: function (opts){
		var conf = JS.extend({top: 200, effect: true}, opts), el = this;
		JS.message.on('window-scroll', function (top){
			var f = conf.effect, vis = $(el).is(':visible');
			if (top > conf.top) {if (!vis) {return f ? $(el).fadeIn(200) : $(el).show();}}else{if (vis) {return f ? $(el).fadeOut(200) : $(el).hide();}}
		});
	},
	fixed: function (opts){
		KUI.helper.setFixed(this, JS.extend({}, opts));
	},
	overflowFixed: function (opts){
		var conf = JS.extend({offset:0, top:0, fx:false}, opts), el = $(this), isFixed, box = el.parents(conf.parent).eq(0);
		if (conf.fixSize !== false) {box.height(box.height());el.width(el.width());}
		function align(top){
			var over = top > box.offset().top - conf.offset;
			if (isFixed !== over) {
				isFixed = over;
				KUI.helper.setFixed(el, conf, over);
				if (over && conf.fixedCls) {
					el.addClass(conf.fixedCls);
					if (JS.isArray(conf.fx)) {el.css(conf.fx[0]).animate(conf.fx[1], conf.speed, conf.easing);}
				}else{el.removeClass(conf.fixedCls);}
			}		
		}
		JS.message.on('window-scroll', align);
		$(function (){align($(document).scrollTop());});
	},
	hover: function (opts){
		var conf = JS.extend({hoverCls:'hover', speed: 400, content: this, fx:[], freezeCls: 'KUI-freeze'}, opts),
			content = conf.content, Fx = conf.fx, fxItem = conf.fxItem, me = $(this);
		if (JS.isString(content)) {content = me.find(content);}
		function anim(el, fx, enter, fn){
			if (fx) {
				el = fxItem ? $(fxItem, el) : $(el);
				el.stop(true).animate(enter ? JS.each(fx, function (v, k){
					if (v=='auto' && (k == 'width' || k == 'height')) {
						var d = 'auto_'+k;
						v = el.data(d) || el[k]();
						el[k](0);
						el.data(d, v);
					}
					this[k] = v;
				}, {}) : fx, conf.speed, conf.easing, fn);
			}
		}
		$(content).each(function (){
			var conf = KUI.helper.parseConfig(this, 'data-config');
			$(this).data('KUI_hover_fx', conf ? conf.fx : Fx);
		}).hover(function (){
			if (!me.hasClass(conf.freezeCls)) {
				var el = this;
				function callback(){
					var fx = $(el).addClass(conf.hoverCls).data('KUI_hover_fx');
					anim(el, fx[0], true);
				}
				if (conf.delay) {
					clearTimeout(el.KUI_HOVER_DELAY_ID);
					el.KUI_HOVER_DELAY_ID = setTimeout(callback, conf.delay);
				}else{
					callback();
				}
			}
		}, function (){
			if (!me.hasClass(conf.freezeCls)) {
				var el = this, fx = $(this).data('KUI_hover_fx');
				clearTimeout(el.KUI_HOVER_DELAY_ID);
				if (conf.waitFxEnd) {
					anim(this, fx[1], false, function (){$(el).removeClass(conf.hoverCls);});
				}else{
					anim(this, fx[1]);
					$(el).removeClass(conf.hoverCls);
				}
			}
		});
	},
	defaultValue: function (opts){
		var conf = JS.extend({text:'\u8BF7\u8F93\u5165\u5173\u952E\u5B57', emptyCls: 'empty', style: '', label:false, effect: true, url:false, blank: false}, opts), el = this;
		if (conf.label) {conf.text = conf.emptyCls = conf.style = '';}
		if(el.value == ''){el.value = conf.text;$(el).addClass(conf.emptyCls);el.style.cssText+=conf.style;}
			else if(conf.label){log('hide');$(conf.label).hide();}
		function blur(){
			var val = JS.trim(this.value);
			if (val == '') {
				this.value = conf.text;
				if(conf.style){this.style.cssText=conf.style;}
				if (conf.label) {if(conf.effect){$(conf.label).fadeIn('slow');}else{$(conf.label).hide();}}else{$(this).addClass(conf.emptyCls);}
			}
		}
		function focus(){
			var val = JS.trim(this.value);
			if (val == conf.text) {this.value = '';}
			if (conf.label) {if(conf.effect){$(conf.label).fadeOut(200);}else{$(conf.label).hide();}}
			$(this).removeClass(conf.emptyCls);
			if(conf.style){this.style.cssText="";}
		}
		$(el).focus(focus).blur(blur);
		if (JS.isString(conf.url)) {
			$(el).keyup(function (e){
				var val = JS.trim(this.value);
				if (val && e.keyCode === 13) {KUI.helper.redirct(conf, val);}
			});
		}
	},
	toggleBtn: function (opts){
		var conf = JS.extend({btnCls: 'off',parent:'*', speed: 300, fx:[], html:[]}, opts), el = $(this), target;
		if (conf.content) {
			target = $(conf.content, conf.parent!='*' ? el.parents(conf.parent) : document);
		}else if(conf.sibling){
			target = el.siblings(conf.sibling);
		}else{
			target = el.parents(conf.parent).eq(0);
		}
		function anim(fx, html){
			if (fx) {if(JS.isString(fx)){target[fx](conf.speed);}else{target.animate(fx, conf.speed, conf.easing);}}
			if (html) {el.html(html);}
		}
		function open(){
			el.addClass(conf.btnCls);
			var fx = conf.fx[0];
			if(conf.contentCls){target.addClass(conf.contentCls);}
				else if(!fx){target.show();}
			anim(fx, conf.html[1]);
		}
		function close(){
			el.removeClass(conf.btnCls);
			var fx = conf.fx[1];
			if(conf.contentCls){target.removeClass(conf.contentCls);}
			 else if(!fx){target.hide();}
			 anim(fx, conf.html[0]);
		}
		target.find(conf.closeBtn).click(close);
		if(conf.cookie){var st=document.cookie.match('togglebtn_'+conf.cookie+'=(\\d+)');if(st){
			st=st[1]=='1';
			if(st){open();}else{close();};
			JS.message.send(conf.cookie+':toggleBtn', el, st);
		}}
		$(this).click(function (){
			var s = el.hasClass(conf.btnCls);
			if (s) {close();}else{open();}
			if(conf.cookie){document.cookie='togglebtn_'+conf.cookie+'='+(s?0:1)+';path=/;expires='+ new Date(JS.now() + 9e99).toGMTString();}
		});
	},
	countdown: function (opts){
		var tpl = '{{hh}}\u5C0F\u65F6{{mm}}\u5206{{ss}}\u79D2',
			conf = JS.extend({now: JS.now(),items: this,endTmpl:'\u5DF2\u622A\u6B62', tmpl: tpl, msTmpl:false, msLt:1.08e5, dayTmpl: '{{d}}\u5929' + tpl}, opts), clock,
			el = $(this), showBar = conf.items === this ? el : el.find(conf.items), dd = new Date() - JS.toDate(conf.now);
		function checkDate(){KUI.helper.getTimeByUrl(conf.serverTime, function (time){dd = new Date() - time;});}
		if (conf.serverTime) {checkDate();if(conf.checkInterval > 30000){setInterval(checkDate, conf.checkInterval);}}
		showBar.each(function (i, el){
			var sub = KUI.helper.parseConfig(this, 'data-config') || {};
			$(this).data(JS.subObj('tmpl,endTmpl,dayTmpl,endCls,endTag,msTmpl',sub,
				[conf.tmpl,conf.endTmpl,conf.dayTmpl,conf.endCls,conf.endTag,conf.msTmpl]));
			if (sub.getEndTime) {
				KUI.helper.getTimeByUrl(sub.getEndTime, function (time){$(el).data('endTime', JS.toDate(time).getTime());});
			}else{
				$(this).data('endTime', JS.toDate(sub.endTime || conf.endTime).getTime());
			}
		});
		clock = setInterval(function() {
			var sum = 0;
			showBar.each(function (){
				var diff, el = $(this), now = new Date() - dd, dfo, d2, ET = el.data('endTime'), _ms = '';
				if (ET) {
					diff = ET - now;
					sum++;
					if (diff < 0) {
						el.removeData('endtime');
						el.html(JS.stringf(el.data('endTmpl'), this));
						if (el.data('endCls')) {$(el.data('endTag') || this).addClass(el.data('endCls'));}
						JS.message.send('KUI.countdown.end', this, conf.data);
					}else{
						d2 = JS.toDiff(diff);
						dfo = {};
						if(conf.onlyHour){d2.h+=d2.d*24;d2.d=0;d2.dd="00";d2.hh=""+d2.h;}
						JS.forIn(d2, function (v, k){dfo[k]=v;dfo[k+'_arr'] = (''+v).split('');});
						if(conf.msTmpl && conf.msLt > diff){_ms = JS.stringf(el.data('msTmpl'), dfo)};
						el.html(JS.stringf(el.data(dfo.d > 0 ? 'dayTmpl' : 'tmpl') || el.data('tmpl'), dfo) + _ms);
					}
				}
			});
			if (sum === 0) {
				clearInterval(clock);
				JS.message.send('KUI.countdown.groupEnd', el);
			}
		}, conf.msTmpl ? 50 : 1000);
	},
	inbox: function (opts){
		var conf = JS.extend({openCls:'inbox_open', fx:[], subItems:false, iconCls:'inbox_icon', to: false, speed:600, width:56, easing:'easeOutSine', easing2:'easeInBack', easing3:'easeInOutElastic', offset:1.5}, opts), fn = KUI.fn.inbox,
		tag = conf.subItems ? $(conf.subItems, this) : $(this);
		if (!fn.proxy) {
			fn.icon = $('<div class="'+conf.iconCls+'" style="position:absolute;top:-9999px;z-index:'+
				($(conf.to).css('zIndex')-1)+'" ><img src="javascript:void(0)" width="'+conf.width+'"/></div>').appendTo(document.body);
			fn.proxy = $('<div style="position:absolute;top:-9px;width:1px;height:1px;visibility:hidden;" />').appendTo(document.body);
		}
		tag.mousedown(function (){fn.icon.find('img').attr('src', this.getAttribute('data-inbox-img'));});
		tag.click(function (){
			if(!this.getAttribute('data-inbox-img')){return;}
			var item = $(fn.icon), start = $(this).offset(), to = $(conf.to), pos =to.offset(), h = item.height(), d,
				fx = conf.fx, s = conf.speed, e1 = conf.easing, e3 = conf.easing3, of = conf.offset, c1 = conf.openCls;
			pos.top -= h - 20;
			pos.left += (to.outerWidth()-item.width())/2 - 2;
			d = start.top - pos.top;
			to.addClass(c1).animate(fx[0], 400,  e3);
			fn.proxy.css(start).stop().animate({top: pos.top}, {duration:s, easing:e1, step: function (n){
				var bl = (start.top - n)/d, e = Math.sin(bl*180*Math.PI/180);
				item.css('top', n - h*of*e);
			}});
			item.css(start).css('opacity', 1).show().stop().animate({left: pos.left}, s, e1, function (){
				item.animate({top:'+='+h+'px', opacity:0}, {easing:conf.easing2,complete: function (){item.hide();}});
				to.removeClass(c1).stop().animate(fx[1], 400,  e3);
			});
		});
	},
	showOnce: function (opts){
		var conf = JS.extend({speed: 300, fx:[], delay: 500}, opts), el = $(this), ck = document.cookie, fx=conf.fx;
		if (!('name' in conf)) {return log('showOnce not set name', 'error');}
		ck = JS.parseParam(ck);
		if(ck[conf.name] == '1' && !conf.debug){return;}
		document.cookie=conf.name+"=1;path=/;expires="+ new Date(JS.now() + 9e99).toGMTString();
		setTimeout(function() {
			if(JS.isArray(fx)&&!fx[0]){el.show();}else{if(JS.isString(fx)){el[fx](conf.speed);}else{el.show().css(fx[0]).animate(fx[1], conf.speed, conf.easing);}}
		}, conf.delay);		
	},
	imgPreload: function (opts){
		var conf = JS.extend({img:'img', loadingCls:'loading', speed:300, fade: false}, opts), el = $(this);
		el.find(conf.img).each(function (){
			var el = $(this), img = new Image();
			function show(){
				if(conf.fade){el.css({'opacity': 0, 'zoom': 1}).fadeTo(conf.speed, 1);}else{el.show();}
				el.parents('.'+conf.loadingCls).eq(0).removeClass(conf.loadingCls);
			}
			img.onerror = img.onload = function (){
				img.onload = img.onerror = null;
				setTimeout(show, 10);
			};
			img.src = this.src;
		});
	},
	upperCase: function (opts){
		var conf = JS.extend({lower:false,split:false,num:false}, opts), $el = $(this), timer, 
			fn = conf.lower ? 'toLowerCase' : 'toUpperCase';
		$el.focus(function (){
			var el = this;
			timer=setInterval(function(){if(el.value!=el.preValue){
				el.value=el.value[fn]();
				if(conf.num){el.value=el.value.replace(/\D+/g,'');}
				if (conf.split) {el.value = el.value.replace(/\s/g, '').replace(/(.)(?=(.{4})+$)/g,'$1 ');}
				el.preValue=el.value;
			}},10);
		}).blur(function (){
			clearInterval(timer);
		});
	}
});