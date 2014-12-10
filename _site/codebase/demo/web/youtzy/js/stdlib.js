(function (win, srcName, none){
	if(win.JS){return;}
	var JS,
		_Fn = Function,
		_slice = [].slice,
		_concat = [].concat,
		_guid = +new Date(),
		_toString = {}.toString,
		_random = Math.random,
		_has = {}.hasOwnProperty,
		SPLIT_STR_RE = /[^, ]+/g;
	function has(o, k){
		return _has.call(o, k);
	}
	function noop(a) {
		return a;
	}
	function intt(n){
		return parseInt(n, 10);
	}
	function _A() {
		return _slice.call.apply(_slice, arguments);
	}
	function _type(t) {
		return function (s){
			return _toString.call(s) === '[object ' + t + ']';
		};
	}
	var isObject = _type('Object'),
		isString = _type('String'),
		isFn = _type('Function'),
		isFunction = function (s){
			return isFn(s) && s.call;
		},
		isNumber = _type('Number'),
		isBoolean = _type('Boolean'),
		isDate = _type('Date'),
		isRegExp = _type('RegExp'),
		isArray = _type('Array');
	function func(f, d) {
		return isFunction(f) ? f: (isFunction(d) ? d: noop);
	}
	function isEmpty(v) {
		return v === null || v === none;
	}
	function isNode(el, t) {
		return el && typeof el === 'object' && (t = el.nodeType) && (t === 1 || t === 9);
	}
	function isPlainObject(a) {
		return !!a && isObject(a) && isFunction(a.isPrototypeOf);
	}
	function arrayLike(o) {
		return typeof o === 'object' && isFinite(o.length) && o.nodeType === none && o.window !== o;
	}
	function forEach(o, f, z){
		if (o) {
			for (var i = 0, j = o.length; i < j; i++) {
				if (false === f.call(z || o[i], o[i], i, o, j)) {
					break;
				}
			}
		}
		return z || o;
	}
	function forIn(o, f, z){
		var k, i = 0;
		if (o) {
			for (k in o) {
				if (has(o, k) && false === f.call(z || o[k], o[k], k, o, i++)) {
					break;
				}
			}
		}
		return z || o;
	}
	function each(o, f, z) {
		return (o && arrayLike(o)) ? forEach(o, f, z) : forIn(o, f, z);
	}
	function bind(o, f){
		var args = _A(arguments, 2);
		return function() {
			return f.apply(o, args.concat(_A(arguments)));
		};
	}
	function map(a, f, o){
		return each(a, function (v, k, a, j){
			this.push(f.call(o||v, v, k, a, j));
		}, []);
	}
	function filter(a, f, o){
		return forEach(a, function (v, k, a, j){
			if (f.call(o || v, v, k, a, j)) {
				this.push(v);
			}
		}, []);
	}
	function indexOf(a, v, s){
		var j = a.length,
		i = 0;
		for (; i < j; i++) {
			if ((i in a) && (s ? a[i] === v : a[i] == v)) {
				return i;
			}
		}
		return -1;
	}
	function some(a, fn, o){
		for (var i = 0, j = a.length; i < j; i++) {
			if (fn.call(o || a[i], a[i], i, a, j)) {
				return true;
			}
		}
		return false;
	}
	function every(a, fn, o){
		for (var i = 0, j = a.length; i < j; i++) {
			if (!fn.call(o || a[i], a[i], i, a, j)) {
				return false;
			}
		}
		return true;
	}
	function reduce(a, fn, b, o){
		each(a, function (v, k, a, j){
			if (b === none) {
				b = v;
			}else{
				b = fn.call(o || v, b, v, k, a, j);
			}
		});
		return b;
	}
	function keys(o) {
		return forIn(o || {}, function (v, k){
			this.push(k);
		}, []);
	}
	function values(o){
		return forIn(o || {}, function (v, k){
			this.push(v);
		}, []);
	}
	function inArray(a, b, c){
		return (c ? filter : every)(isArray(a) ? a : [a], function (v){
			return indexOf(b, v) > -1;
		});
	}
	function remove(a, f, o){
		var q = func(f, function (v){
			return f === v;
		});
		for (var i = a.length; i--;) {
			if(q.call(o || a[i], a[i], i, a, o)){
				a.splice(i, 1);
			}
		}
		return a;
	}
	function arrayify(a){
		return forEach(a, function (v, i){
			this[i] = v;
		}, []);
	}
	function flatten(){
		return _concat.apply([], forEach(arguments, function (s){
			this.push(arrayLike(s) ? arrayify(s) : s);
		}, []));
	}
	function assy() {
		var args = _A(arguments),
			v = args.pop();
		return forEach(args, function (k){
			this[k] = v;
		}, {});
	}
	function Enum(keys, o){
		var n = 0;
		return forEach(keys, function (v, i){
			if (isArray(v)) {
				n = isNumber(v[1]) ? intt(v[1]) : n;
				v = v[0];
			}
			this[v] = n++;
		}, o || win);
	}
	function getGuid(g) {
		return (g || 'guid') + '_' + intt(_random()*9e5).toString(16) + '_' + (++_guid).toString(16);
	}
	function unique(arr, lax) {
		var ref = {},
			objs = [],
			items = [],
			key = getGuid('unique'),
			simple = '|string|boolean|number';
		forEach(arr, function (item, type, k){
			if (!isEmpty(item)){
				type = typeof item;
				if (simple.indexOf(type) > 0) {
					k = (lax ? '' : type) + item;
					if (!(k in ref)) {
						ref[k] = 1;
						items.push(item);
					}
				} else {
					if (!item[key]){
						item[key] = 1;
						objs.push(item);
						items.push(item);
					}
				}
			}
		});
		for (var i = objs.length; i--;) {
			try{delete objs[i][key];}catch(e){objs[i].removeAttribute(key);}			
		}
		return items;
	}
	function classify(f, p) {
		f = func(f, _Fn());
		f.fn = f.prototype = p || {};
		return f;
	}
	function fire(fs, o, d){
		var r;
		d = isArray(d) ? d : [];
		forEach(fs, function (f){
			if (isFunction(f)) {
				r =  f.apply(o, d);
				if (r === false) {
					return r;
				}
			}
		});
		return r;
	}
	function extend(o){
		var args, len, skip;
		function save(v, k){
			if (!skip || !(k in o)) {
				o[k] = v;
			}
		}
		if (o) {
			args = arguments;
			len = args.length;
			skip = false === args[len-1];
			for (var i = 1; i < len; i++) {
				forIn(args[i], save);
			}
		}
		return o;
	}
	function toArray(v, def) {
		v = isEmpty(v) ? (def || []) : v;
		if (isArray(v)) {
			return v.slice();
		}
		if (isString(v)) {
			return v.match(SPLIT_STR_RE) || [];
		}
		if(arrayLike(v)) {
			return arrayify(v);
		}
		return [v];
	}
	function clearObj(o){
		forIn(o, function(v, k, o) {
			delete o[k];
		});
	}
	function selfEx(a, b){
		return extend(this, isString(a) ? assy(a, b) : (isFunction(a) ? a.apply(this, _A(arguments, 1)) : a));
	}
	function Cache(def, isVF){
		this.__cache__ = {};
		if (def !== none) {
			this.def = def;
			this.isVF = isVF;
		}
	}
	extend(Cache.prototype, {
		has: function (k){
			return has(this.__cache__, k);
		},
		set: function (k, v){
			this.__cache__[k] = v;
		},
		get: function (k, def, isVF){
			var l = arguments.length,
				o = this.__cache__;
			if (l) {
				if (!this.has(k)) {
					if (l < 2){
						def = this.def;
						isVF = this.isVF;
					}
					if (def !== none) {
						this.set(k, 0);
						this.set(k, (isVF && isFunction(def)) ? def.call(this, k) : def);
					}
				}
			}
			return l ? o[k] : o;
		},
		clear: function (k){
			var c = this.__cache__;
			if(arguments.length){
				delete c[k];
			}else{
				clearObj(c);
			}
		}
	});
	function addCache(a, b){return new Cache(a, b);}
	function arrCache(){return addCache(function (){return [];}, true);}
	function objCache(){return addCache(function (){return {};}, true);}
	function subObj(arr, a, def, del){
		def = arrayLike(def) ? def : false;
		return forEach(toArray(arr), function (k, i){
			if (a && has(a, k)) {
				this[k] = a[k];
				if (del) {delete a[k];}
			}else if(def && (i in def)){
				this[k] = def[i];
			}
		}, {});
	}
	function size(o) {
		return isEmpty(o) ? 0 : (o.length === +o.length ? o.length : keys(o).length);
	}
	function groupBy(a, v) {
		v = v || '';
		var vf = isFunction(v),
		g = function (o){return vf ? v.call(o, o) : (v in o ? o[v] : '__nogroup__');};
		return forEach(a, function (o){this.get(g(o)).push(o);}, arrCache()).get();
	}
	function countBy(){
		return forIn(groupBy.apply(null, arguments), function (v, k){this[k] = v.length;}, {});
	}
	function get_set(args, g, s, o){
		var p = arrayify(args), k = p[0];
		if (p.length > 1) {
			k = assy(k, p[1]);
		}else if(isString(k) || isNumber(k)){
			return g.call(o, k);
		}
		JS.forIn(k, function (v, k){s.call(o, k, v);});
		return o;
	}
	var TaskAPI,
		TRIM_RE = /^\s+|\s+$/g,
		SPLIT_NS_RE = /[\w@\-\$\*!~\:>#]+/g,
		CLASS_RE = /^[A-Z]\w*$/,
		IEV_RE = /msie\s*(\d+)/i,
		TPLHASB_RE = /\{\{(\!|#)([\w~]+)\s*\}\}\n?([\s\S]*?)\{\{\/\2\s*\}\}\n?/,
		TPLBLOCK_RE = RegExp(TPLHASB_RE.source,'g'),
		TPLPROP_RE = /\{\{([\w~%]+)\}\}/g,
		EQUATION_RE = /([^=;&?# ]+)\s*=\s*([^=;&?# ]+)/g,
		RMB_RE = /(\d)(?=(\d{3})+($|\.))/g,
		DIR = {
			toString: _Fn("return '[object Namespace]'"),
			IS_NAMESPACE: true
		};
	function tplProp(tpl, o, r, i){
		return isFunction(tpl) ? tpl(o) : (tpl+'').replace(r || TPLPROP_RE, function (a, b){
			var v = b.indexOf('%') === 0 ? (i + (intt(b.slice(1))||0)) : (b == '~' ? o : JS.result(o[b], o));
			return isEmpty(v) ? '' : v;
		});
	}
	function tplBlockf(tpl, data){
		return isFunction(tpl) ? tpl(data) : (tpl+'').replace(TPLBLOCK_RE, function (tpl, no, bk, sub){
			var prop = bk.charAt(0) == '~' ? data : JS.result(data[bk], data);
			no = no == '!';
			return size(prop) ? (no ? '' : JS.map(JS.isArray(prop) ? prop : [prop], function (item, index){
				var _tpl = sub;
				if (TPLHASB_RE.test(sub)) {_tpl = tplBlockf(sub, item);}
				return tplProp(_tpl, item, TPLPROP_RE, index);
			}).join('')) : (no ? sub : '');
		});
	}
	function trim(s){return s.replace(TRIM_RE, '');}
	function createNS(){
		function ns(f){
			if (isFunction(f)) {
				ns.ready(f);
				return ns;
			}
			return selfEx.apply(ns, arguments);
		}
		return extend(ns, DIR);
	}
	function isNamespace(n){
		return n && isFunction(n) && n.IS_NAMESPACE;
	}
	function namespace(path) {
		var b = this,
			s = isString(path);
		if (s) {
			forEach(path.match(SPLIT_NS_RE) || [], function (p){
				if(has(b, p)) {
					if (!isNamespace(b[p])) {throw Error('Invalid namespace "' + p + '"');}
				} else {
					b[p] = createNS();
				}
				b = b[p];
			});
		}else{
			b = createNS();
		}
		return selfEx.apply(b, _A(arguments, s ? 1 : 0));
	}
	JS = namespace("JS");
	TaskAPI = {
		STATES: Enum(['done', 'error', ['progress', 1] , 'stop'], {}),
		update: function(d, i, s) {
			var e = this.thens,
			_do = i > this.STATES.error ? [] : toArray(e[i]);
			this.data = d;
			this.state = s;
			if (s !== 'progress') {
				_do = _do.concat(e[2]);
				e.length = 0;
				this.update = function() {return this;};
				this.isEnd = true;
			}
			fire(_do, this.context, d);
			return this;
		},
		then: function(a, b, c) {
			return each([a, b, c], function(f, i) {
				if (isFunction(f)) {
					if (this.isEnd) {
						if (i === this.STATES[this.state] || i > 1) {f.apply(this.context, this.data);}
					} else {
						this.thens[i].push(f);
					}
				}
			}, this);
		}
	};
	forIn(TaskAPI.STATES, function(i, s) {
		TaskAPI[s] = function() {return this.update(_A(arguments), i, s);};
	});
	function createTask(o) {
		var task = function() {return task.then.apply(task, arguments);};
		task.context = o || task;
		task.thens = [[], [], []];
		return extend(task, TaskAPI);
	}
	var MSG, StdCore, domEngine,
		doc = document,
		IEA = win.ActiveXObject,
		SPLIT_URL_RE = /^([^\?]+)(?:(\?[^#]+)?(#.*)?)?$/,
		NOSUB_RE = /^(#|html|body)/,
		Agent = navigator.userAgent,
		ie = IEA ? intt(toArray(Agent.match(IEV_RE),[0, 48])[1]) : false;
	function Event(obj, cxt){
		var E = arrCache(), F = addCache();
		obj = obj || {};
		cxt = cxt || obj;
		var _event = {
			hasEvent: function (type){return E.has(type);},
			on: function(n, f, z) {
				if (isString(n)) {
					var m = toArray(n);
					if (m.length > 1) {return forEach(m, function (v){_event.on(v, f, z);});}
					n = m[0];
					var s = E.get(n), g = _event.bind(f);
					s.push([f, g]);
					if ('lastCall' in s && z) {g.apply(_event, s.lastCall);}
				} else if (isFunction(n)) {
					this.__NotListening__ = n;
				} else if(isObject(n)){
					forIn(n, function (f, k){_event.on(k, f, z);});
				}
				return _event;
			},
			once: function(n, f, z) {
				var f1 = function(e) {
						_event.off(n, f1);
						f.call(this, e);
					};
				return _event.on(n, f1, z);
			},
			off: function(t, f) {
				if (!arguments.length) {
					E.clear();
				}else{
					forEach(toArray(t), function (e){
						var s = E.get(e);
						if (f) {
							remove(s, function (a){return a[0] === f;});
						}else{
							s.length = 0;
						}
					});
				}
				return _event;
			},
			bind: function (s){
				var m = this;
				return isFunction(s) ? bind(cxt, s) : F.get(s, function (){return m[s].apply(m, flatten(arguments, this));});
			},
			change: function (e, f, z){
				return isString(e) ? _event.on('change:' + e, f, z) :
					(isFunction(e) ? _event.on('change', e, f) : forIn(e, function (f, d){_event.change(d, f, z);}));
			},
			trigger: function(n) {
				var A = arguments,
				args = _A(A, 1),
				nl = this.__NotListening__,
				es = E.get(n);
				es.lastCall = args;
				if (isString(this.name) && MSG && this !== MSG) {MSG.send.apply(MSG, flatten(this.name + ':' + n, this, args));}
				return es.length ? fire(map(es, function (f){return f[1];}), this, args) :
					(nl ? nl.apply(cxt, A) : none);
			}
		};
		return extend(obj, _event, false);
	}
	function Data(obj){
		var db = {};
		return extend(obj || {}, {
			set: function (k, v){
				if (isObject(k)) {
					return forIn(extend.apply(null, arguments), function (w, s){this.set(s, w);}, this);
				}else{
					var d = db[k];
					db[k] = v = func(this.set[k]).call(this, v, d);
					if (isFunction(this.trigger)) {this.trigger('change:' + k, v, d);}
					return this;
				}
			},
			get: function (k){return k !== none ? func(this.get[k]).call(this, db[k]) : db;},
			has: function (k){return has(this.db, k);}
		}, false);
	}
	StdCore = {
		__initbefore__: noop,
		initialize: function() {this.callSuper.apply(this, flatten('initialize', arguments));},
		callSuper: function(n) {
			var k = '!turn-point',
				args = _A(arguments, 1),
				r, a;
			if (! (k in this)) {this[k] = this;}
			a = this[k]['super'];
			while (a && !has(a, n)) {a = a['super'];}
			if (a) {
				this[k] = a;
				r = a[n].apply(this, args);
			}
			delete this[k];
			return r;
		},
		toString: function() {return '[object ' + this.__guid__ + ']';},
		destroy: function() {
			this['class']._INSTANCE = null;
			this.trigger('destroy');
			clearObj(this);
			this.__isdestroyed__ = JS.now();
		},
		extend: selfEx,
		addUI: function (o, v, b){
			if (isString(o)) {
				o = assy(o, v);
				v = b;
			}
			return forIn(o, function(s, k) {
				this.ui[k] = JS.domEngine(s, isString(s) && NOSUB_RE.test(s) ? null : v);
			}, this).ui;
		}
	};
	function createInit(name, single) {
		function Class() {
			var ic = this['class'],
			a = _A(arguments);
			if (a[0] !== createInit) {return new Class(createInit, a);}
			if (single) {
				if (ic._INSTANCE) {return ic._INSTANCE;} else {ic._INSTANCE = this;}
			}
			this.__guid__ = getGuid(name);
			Event(Data(this)).set(this.defaults);
			this.ui = {};
			this.__initbefore__.apply(this, a[1]);
			this.initialize.apply(this, a[1]);
		}
		Class.toString = _Fn('return "[class ' + name + ']"');
		return Class;
	}
	function Class() {
		var single, _super, des, _class, run,
		name = '',
		ns = this,
		base = StdCore,
		exts = [];
		forEach(arguments, function(a) {
			if (isString(a)) {
				name = a;
			} else if (isArray(a) || a === JS.ready) {
				run = a;
			} else if (isFunction(a)) {
				exts.push({initialize: a});
			} else if (a === true) {
				single = true;
			} else if (isPlainObject(a)) {
				exts.push(a);
				_super = _super || a.Extends;
			}
		});
		if (name && !CLASS_RE.test(name)) {throw Error('Invalid class name "' + name + '"');}
		if (_super) {
			base = isFunction(_super) ? _super.fn : _super;
			if (!JS.isStdObject(base)) {throw Error("Invalid super class");}
		}
		des = new(classify(0, base))();
		_class = classify(createInit(name || '*', single), des);
		extend(des, {
			'super' : base,
			'class': _class
		});
		if (name) {
			if (has(ns, name)) {throw Error('class "' + name + '" is exists');}
			ns[name] = _class;
		}
		extend.apply(0, flatten(des, exts));
		if (run) {JS.when(run).then(function (){_class();});}
		return _class;
	}
	extend(JS, {
		Cache: addCache,
		arrCache: arrCache,
		objCache: objCache,
		fire: fire,
		ie: function (a, b){return ie ? [ie, ie === a, ie >= a && ie <= b][arguments.length] : false;},
		match: function(s, r) {
			var b = [], t;
			r.lastIndex = 0;
			do {
				t = r.exec(s);
				if (t) {b.push(t);}
			} while ( t && r.global );
			return b;
		},
		parseParam: function(str, en, r) {
			var f = func(en);
			return forEach(JS.match(str, r || EQUATION_RE), function(v, i) {this[v[1]] = f(v[2]);}, {});
		},
		toParam: function(obj, en, cr) {
			en = func(en);
			return map(obj, function (v, k){return k + '=' + en(v);}).join(cr || '&');
		},
		addParam: function (url, data){
			return url.replace(SPLIT_URL_RE, function (a, m, p, h){
				a = JS.toParam(extend({}, JS.parseParam(p), data));
				return m + (a ? ('?' + a) : '') + (h || '');
			});
		},
		addVersion: function (url, v){return JS.addParam(url, {_ver: (trim(v) == 'no-cache' ? (JS.now() + _random()) : v) + ""});},
		stringf: tplProp,
		tmpl: function(tpl, d) {return tplProp(tplBlockf(tpl, d), d);},
		prefix: function (str, n, w){
			str += '';
			n = intt(n) || 2;
			w = isString(w) ? w.charAt(0) : '0';
			while(str.length < n){str = w + str;}
			return str;
		},
		datef: (function() {
			var w = '\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d',
				R = 'yy,yyyy,M,MM,d,dd,H,HH,h,hh,m,mm,s,ss,ms,w,a'.split(',');
			return function(date, t) {
				var d = JS.toDate(date),
				z = JS.prefix,
				o = [0, d.getFullYear(), d.getMonth() + 1, 3, d.getDate(), 5, d.getHours(), 7, 8, 9, d.getMinutes(), 11, d.getSeconds(), 13, z(d.getMilliseconds(), 3), w.charAt(d.getDay())],
				a = o[6] > 12;
				o[0] = (o[1]+'').slice(-2);
				o[8] = o[6] - (a ? 12 : 0);
				for (var i = 13; i > 2; i-=2) {o[i] = z(o[i-1]);}
				o[16] = (a ? '\u4e0b' : '\u4e0a') + '\u5348';
				o = JS.subObj(R, false, o);
				return isString(t) ? JS.stringf(t, o) : o;
			};
		})(),
		toDiff: function(d) {
			return JS.subObj('d,dd,h,hh,m,mm,s,ss,ms', 0, reduce([8.64e7, 3.6e6, 6e4, 1e3, 1], function(a, b, i) {
				var v = Math.floor(d / b);
				d %= b;
				return a.concat(i == 4 ? intt(v/100) : v, JS.prefix(v));
			}, []));
		},
		toDate: function(d) {return JS.isDate(d) ? d: (new Date(isString(d) ? d.replace(/-/g, '/') : d));},
		result: function(v, o) {return isFunction(v) ? v.apply(o, _A(arguments, 2)) : v;},
		toRmb: function(n, f, l) {
			var s = parseFloat(n).toFixed(l === none ? 2 : l).toString().split('.');
			s[0] = s[0].replace(RMB_RE, '$1,');
			return (f === false ? '': '\uffe5') + s.join('.');
		},
		isStdObject: function(o) {return StdCore === o || StdCore.isPrototypeOf(o);},
		unicode: function (s){return s.replace(/[^\u0000-\u00FF]/g, function(c){return '\\'+escape(c).slice(1);});},
		toJSON: function (o, u){
			if (isPlainObject(o)) {
				return "{" + map(o, function (v, k){return '"'+ k + '":' + JS.toJSON(v, u);}) +"}";
			}else if(isArray(o)){
				return "["+map(o, function(v){return JS.toJSON(v, u);}).join(',') + ']';
			}
			return isString(o) ? ('"' + (u ? JS.unicode(o) : o) +'"') :
				(isNumber(o) || isBoolean(o) || isRegExp(o) ? o : (isDate(o) ? o.getTime() : null));
		},
		parseJSON: function(s) {try {return _Fn('return (' + s + ')')();} catch(e) {}},
		random: function(a) {
			return forEach(a, function (v, i, k, j){
				k = Math.floor(_random() * j);
				a[i] = a[k];
				a[k] = v;
			}, a);
		},
		range: function (v, a, b, c, k){
			if (a > b) {k = a; a = b; b = k;}
			return v > b ? (c ? a : b) : (v < a ? (c ? b : a) : v);
		},
		now: function() {return new Date().getTime();},
		trim: trim,
		aop: function (fn, a, b){
			var AF, _ = isFunction;
			if (!_(fn)) {throw Error('aop target is not a function');}
			AF = function (){
				var args = _A(arguments), ret;
				if (_(a)) {ret = a.call(this, args);}
				if (ret && ret.stop === true) {return ret.returnValue;}
				ret = fn.apply(this, args);
				if (_(b)) {ret = b.call(this, args, ret);}
				return ret;
			};
			AF._AOP_ORIGIN = fn._AOP_ORIGIN || fn;
			return AF;
		},
		task: function(init, o) {
			var t = createTask(o);
			if (isFunction(init)) {init.call(o, t, o);}
			return t;
		},
		isTask: function(t) {return t && t.update === TaskAPI.update;},
		toTask: function(a, o) {
			if (!JS.isTask(a)) {
				if (isNumber(a)) {
					return JS.task(function (tk){setTimeout(function() {tk.done();}, a);}, o);
				} else if (isFunction(a)) {
					a = a.call(o);
				} else if (a && (isString(a) || a.url)) {
					a = JS.load(a);
				} else if (isArray(a)) {
					a = JS.when(a, o);
				}
			}
			return a;
		},
		when: function(ts, o) {
			return JS.task(function(tk) {
				var check, q = toArray(ts),
					all = indexOf(q, true) > -1 || q.async,
					len = q.length,
					i = 0;
				function next() {
					var cur = JS.toTask(q.shift(), o);
					if (all && q.length) {next();}
					return JS.isTask(cur, o) ? cur.then(0, 0, check) : check(_A);
				}
				check = function(z) {
					i++;
					if (z !== _A) {tk.progress(z, intt(i / len * 100), i, len);}
					if (!all) {
						return q.length ? next() : tk.done(i, len);
					} else if (i >= len) {
						tk.done(i, len);
					}
				};
				next();
			}, o);
		},
		domEngine: function (f, g){return isFunction(f) ? f() : JS.find(f, g);},
		find: function (f, b){
			var g = document;
			if (b) {
				g = JS.find(b);
				if (isArray(g)) {g = g[0];}
			}
			if (isString(f)) {
				f = trim(f);
				if (f.charAt(0) == '#') {return g.getElementById(f.slice(1));}
				var tc = f.split('.'), cls = tc[1] ? (' ' + tc[1] + ' ') : 0;
				return JS.filter(g.getElementsByTagName(tc[0]), function (el){
					return cls ? (' ' + el.className + ' ').indexOf(cls) > -1 : true;
				});
			}
			return f;
		},
		some: some,
		every: every,
		forEach: forEach,
		map: map,
		indexOf: indexOf,
		reduce: reduce,
		filter: filter,
		remove: remove,
		forIn: forIn,
		each: each,
		inArray: inArray,
		has: has,
		size:size,
		func: func,
		assy: assy,
		noop: noop,
		intt: intt,
		args: _A,
		arrayify: arrayify,
		flatten: flatten,
		groupBy: groupBy,
		countBy: countBy,
		subObj: subObj,
		clearObj: clearObj,
		Event: Event,
		Data: Data,
		get_set: get_set,
		keys: keys,
		values: values,
		Enum: Enum,
		classify: classify,
		extend: extend,
		toArray: toArray,
		bind: bind,
		getGuid: getGuid,
		unique: unique,
		arrayLike: arrayLike,
		isString: isString,
		isObject: isObject,
		isArray: isArray,
		isNode: isNode,
		isNumber: isNumber,
		isDate: isDate,
		isRegExp: isRegExp,
		isBoolean: isBoolean,
		isFunction: isFunction,
		isPlainObject: isPlainObject,
		isEmpty: isEmpty
	});
	Class.call(JS, 'StdClass', function (){
		selfEx.apply(this, arguments);
		this.set(this.defaults);
	});
	MSG = JS.StdClass();
	MSG.send = MSG.trigger;
	var cwd, Std, base, setting, main,
		LN = srcName || 'stdlib',
		head = JS.find('head').pop() || doc.documentElement,
		URICache = addCache(),
		LoadCache = addCache(),
		DIRNAME_RE = /[^?#]*\//,
		DOT_RE = /\/\.\//g,
		RESLASH_RE = /([^:\/])\/\/+/g,
		DOT2_RE = /\/[^\/]+\/\.\.\//g,
		ABS_RE = /:\//,
		REL_RE = /^\./,
		ROOT_RE = /^\//,
		ROOT_DIR_RE = /^.*?\/\/.*?\//,
		PATHS_RE = /^([^\/\:]+)(\/.+)$/,
		URI_END_RE = /\.(css|js|php|jps|aspx?)(?=\?|$)/,
		HASH_END_RE = /#$/,
		ISCSS_RE = /\.css(?:\?|$)/i,
		ISREADY_RE = /^(loaded|complete|undefined)$/,
		BASE_RE = '^.*?\\/(?=('+LN+'[^\\/]*\\/)?'+LN+'[^\\/]*\\.js)',
		lt536 = (Agent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1")) * 1 < 536;
	function debug(s, t){
		try{
			return JS._log ? JS._log(s) : console[t || 'log'](s);
		}catch(e){}
	}
	function dirname(path) {return toArray(path.match(DIRNAME_RE))[0];	}
	function element(tag, attr, ap){
		var el = tag == 'text' ? doc.createTextNode(attr) : forIn(attr || {}, function (v, k){
			this.setAttribute(k, v);
		}, doc.createElement(tag));
		return ap ?  ap.appendChild(el) : el;
	}
	cwd = dirname(location.href);
	Std = JS.find("#stdlib_node") || JS.find("script").pop();
	main = Std.getAttribute('data-main');
	domEngine = win[Std.getAttribute('data-lib') || 'jQuery'];
	base = toArray((Std.hasAttribute ? Std.src : Std.getAttribute("src", 4)).match(BASE_RE), [cwd])[0];
	if (domEngine) {
		JS.domEngine = function (){return domEngine.apply(win, arguments);};
	}
	setting = {
		timeout: 7,
		charset: 'utf-8',
		alias: {},
		vars: {},
		paths: {'~': cwd},
		map: [],
		autoload: []
	};
	function config(conf, b){
		if (isString(conf)) {conf = assy(conf, b);}
		forIn(conf, function (v, type){
			var ini = setting[type];
			if(isPlainObject(ini)){
				if (isPlainObject(v)) {return extend(ini, v);}
			}else if (isArray(ini)) {
				setting[type] = filter(ini.concat(v), noop);
			}else{
				setting[type] = v;
			}
		});
		return setting;
	}
	function getRoot(path){return toArray(path.match(ROOT_DIR_RE), ['/'])[0];	}
	function trimPath(path) {
		path = path.replace(DOT_RE, "/").replace(RESLASH_RE, "$1\/");
		while (path.match(DOT2_RE)) {path = path.replace(DOT2_RE, "/");}
		return path;
	}
	function getFullPath(id, ref, ext) {
		if (!ABS_RE.test(id)) {
			if (ROOT_RE.test(id)) {
				id = getRoot(cwd) + id.slice(1);
			}else if(REL_RE.test(id) || ref){
				id = dirname(ref || cwd) + id;
			}else{
				id = base + id;
			}
		}
		if (ext) {
			if (HASH_END_RE.test(id)) {
				id = id.slice(0, -1);
			}else if (!URI_END_RE.test(id)) {
				id = id.split('?');
				id[0] += '.'+ext.replace(/\.+/g,'');
				id = id.join('?');
			}
		}
		return id;
	}
	function mapURI(uri, maps){
		forEach(maps, function (item, ret){
			uri = isFunction(item) ? item(uri) :
				(isArray(item) && isRegExp(item[0]) && item[0].test(uri) ? JS.addVersion(uri, item[1]) : uri);
		});
		return uri;
	}
	function formatURI(id, ref, ext){
		if (!isString(id)) {return '';}
		id = trim(id);
		ref = ref || '';
		ext = ext || 'js';
		return id ? URICache.get(ref + id + ext, function (){
			var uri = setting.alias[id] || id;
			uri = uri.replace(PATHS_RE, function (a, head, end){return  (setting.paths[head] || head) + end;});
			uri = trimPath(getFullPath(JS.stringf(uri, setting.vars, false), ref, ext));
			uri = mapURI(uri, setting.map);
			URICache.set(uri, uri);
			return uri;
		}, true) : '';
	}
	function removeLoader(node, css, then){
		if (!css) {head.removeChild(node);}
		node.onload = node.onerror = node.onreadystatechange = null;
		then();
	}
	function listenCss(node, then) {
		var end, sheet = node.sheet;
		if (lt536) {
			end = !!sheet;
		}else if (sheet) {
			try {end = !!sheet.cssRules;} catch (e) {end = e.name === "NS_ERROR_DOM_SECURITY_ERR";}
		}
		setTimeout(function() {return end ? then() : listenCss(node, then);}, 10);
	}
	function onResponse(node, then, css){
		if (css && (lt536 || !("onload" in node))) {return setTimeout(function() {listenCss(node, then);}, 1);}
		var timeout = setTimeout(function() {
			removeLoader(node, css, then);
		}, setting.timeout*1e3);
		node.onload = node.onerror = node.onreadystatechange = function() {
			if (ISREADY_RE.test(node.readyState)) {
				clearTimeout(timeout);
				removeLoader(node, css, then);
				node = none;
			}
		};
	}
	function request(url, charset) {
		return LoadCache.get(url, function (){
			var first = head.firstChild,
				css = ISCSS_RE.test(url),
				node = element(css ? "link" : "script");
			return JS.task(function (tk){
				onResponse(node, function (){tk.done(url);}, css);
				node.charset = charset || setting.charset;
				if (css) {
					node.rel = "stylesheet";
					node.href = url;
				}else {
					node.async = true;
					node.src = url;
				}
				node = first ? head.insertBefore(node, first) : head.appendChild(node);
			});
		}, true);
	}
	function load(url, fn, o){
		return JS.when(map(flatten(setting.autoload, toArray(url)), function (u){
			if (isFunction(u)) {u = u();}
			if (isString(u) && trim(u)) {u = assy('url', u);}
			return u && u.url ? function (){return request(formatURI(u.url), u.charset);} : u === true;
		}), o).then(fn);
	}
	extend(JS, {
		config: config,
		getRoot: getRoot,
		dirname: dirname,
		trimPath: trimPath,
		formatURI: formatURI,
		getFullPath: getFullPath,
		element: element,
		style: function (t){if (doc.createStyleSheet) {doc.createStyleSheet().cssText += t;} else {
				element('text', t, element('style', {type: 'text/css'},head));
		}},
		cwd: function (f){return cwd + (f || '');},
		base: function (f){return base + (f || '');},
		load: load
	});
	extend(DIR, {
		Class: Class,
		message: MSG,
		ready: function (fn){
			return JS.task(function (tk, o){
				load([], function (){
					return JS.domEngine(function (){
						func(fn).call(o, o);
						tk.done();						
					});
				});
			}, this);
		}
	});
	extend(JS, DIR, false);
	extend(win, {
		namespace: namespace,
		log: debug,
		imports: function (a, b){return b ? load(a) : config('autoload', toArray(a));}
	});
	if (main) {load(main);}
	log('JS-Stdlib 1.1.0');
})(this);