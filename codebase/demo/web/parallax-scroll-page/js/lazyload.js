g=0
namespace("KUI.widget");
KUI.widget.Class('LazyLoad', true, {
	initialize: function (opts){
		var obj = this, conf = JS.extend({diff: 0, effect: "fadeIn", speed: 200, attr: "lazy-src", skip_hide: false}, opts);
		this.conf = conf;
		this.getImages(conf.attr);
		JS.message.on('lazyload-update-imgs', function (){
			obj.getImages(conf.attr);
		});
		$(function() {obj.check();});
		$(window).on('scroll', function (){obj.check();});
		$(window).on("resize", function() {obj.check();});             
		if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
			$(window).on("pageshow", function(event) {
				if (event.originalEvent.persisted) {JS.forEach(obj.images, function() {obj.load(this);});}
			});
		}
	},
	getImages: function (attr){
		this.images = $('img[data-'+attr+']').get();
	},
	load: function (img){
		if (!img.loaded) {
			var $img = $(img), attr = 'data-'+this.conf.attr, src = $img.attr(attr), obj = this;
			$img.removeAttr(attr);
			$("<img />").on("load", function() {
				$img.hide().attr("src", src)[obj.conf.effect](obj.conf.speed);
				img.loaded = true;
				obj.trigger('load', img);
			}).attr("src", src);
			if(this.conf.debug){log(src);}
		}
	},
	check: function (){
		JS.remove(this.images, function (img){
			if (!this.conf.skip_hide || $(img).is(":visible")) {
				if(false !== this.isSee(img)){
					this.load(img);
					return true;
				}}
		}, this);
	},
	offset: function (el){
        var t=0, l=0;
        do{
            t+=el.offsetTop;
            l+=el.offsetLeft;
            el=el.offsetParent;
        }while(el);
        return {top:t, left: l};
    },
	isSee: function (img){
		var vT, vL,  xy, mT, mL, mB, mR, diff = this.conf.diff, vH, db=document.body,dd=document.documentElement;
		vT = Math.max(db.scrollTop, dd.scrollTop);
		vL = Math.max(db.scrollLeft, dd.scrollLeft);
		xy = this.offset($(img)[0]);
		mT = xy.top;
		mB = mT + $(img).height();
		if (mB + diff < vT) {return false;}
		mL = xy.left;
		mR = mL + $(img).width();
		if (mR + diff < vL) {return false;}
		if (mT - diff > Math.min(db.clientHeight, dd.clientHeight) + vT) {return false;}	
		return mL - diff <= vL + Math.min(db.clientWidth, dd.clientWidth);
	}
});