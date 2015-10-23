---
layout: post
title:  ECMAScript 6 模块架构
subline: Architecture of ECMAScript 6 Modules
categories: frontend
tags: [javascript, es6, ECMAScript, modules, 架构]
---

原文：[Architecture of ECMAScript 6 Modules](http://ponyfoo.com/articles/architecture-of-ecmascript-6-modules)

##技术背景

如果你还未熟悉当前的 ES6 模块规范，需要明白：

- *module*：一个代码单元，有若干的 *import* 和 *export*
- *export*：一个 module 可以通过具名的方式 `export` 一个值
- *imports*：一个 module 可以通过名字 `import` 一个由其他模块输入的值
- *module 实例对象*：一个 `Module` 构造器的实例化对象，作为模块的代表。这个对象的属性名来自于 module 的 exports
- *Loader*：也是一个对象，定义该如何获取 module，将其转换、编译成一个module 实例对象。每个 JavaScript 环境（浏览器、Node.js）都设计了一个默认的 Loader，为各自的环境定义 module 的语义。

##Import 和 Export

一开始先看看 ES6 的 moudle API：

```js
// libs/string.js

var underscoreRegex1 = /([a-z\d])([A-Z]+)/g,
    underscoreRegex2 = /\-|\s+/g;

export function underscore(string) {
  return string.replace(underscoreRegex1, '$1_$2')
               .replace(underscoreRegex2, '_')
               .toLowerCase();
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}
// app.js

import { capitalize } from "libs/string";

var app = {
  name: capitalize(document.title)
};

export app;
```

上面展示了 ES6 module 最基础的语法。一个模块可以输出具名的值，其他模块则可以导入这些值。

##避免作用域污染

如果一个模块有很多的 export，你应该会希不要在 import 它的模块里产生过多的顶级作用域变量。

例如，比如像 [Node.js fs](http://nodejs.org/api/fs.html) 这样的模块，有很多的 export，比如`rename`、`chown`、`chmod` 和 `stat` 等等。通过 ES6 module 的 API，也可以把这个模块所有的 export 包含到一个顶级的具名变量中。

```js
import "fs" as fs;

fs.rename(oldPath, newPath, function(err) {
  // continue
});
```

##打包

在上面的例子中，可以通过模块在文件系统中的位置将其加载到浏览器中，这也是浏览器端的 Loader 默认的工作方式。

在生产环境中，我需要把多个模块文件打包成一个。ES6 考虑到了这种情况，提供了字面量的方式来定义一个模块。

```js
module "libs/string" {
  var underscoreRegex1 = /([a-z\d])([A-Z]+)/g,
      underscoreRegex2 = /\-|\s+/g;

  export function underscore(string) {
    return string.replace(underscoreRegex1, '$1_$2')
                 .replace(underscoreRegex2, '_')
                 .toLowerCase();
  }

  export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substr(1);
  }
}

module "app" {
  import { capitalize } from "libs/string";

  var app = {
    name: capitalize(document.title)
  };

  export app;
}
```

使用这种语法定义的模块可以在别的模块中使用，不再需要通过 Loader 从服务端加载。

##位于其他地方的模块

在网页应用中，除了大多数被打包成一个文件的模块以外，其他模块，比如jQuery，通常是用 CDN 上加载的。

其实可以重载自带 Loader 的钩子，指定从什么地方下载模块。但 ES6 模块提供了一个简单的 API，将模块映射到物理位置。

```js
System.ondemand({
  "https://ajax.googleapis.com/jquery/2.4/jquery.module.js": "jquery",
  "backbone.js": ["backbone/events", "backbone/model"]
});
```

第一行指定到`https://ajax.googleapis.com/jquery/2.4/jquery.module.js` 获取`jquery` 模块。

第二行指定 `backbone/events` 和 `backone/model` 可以从 `backbone.js` 这个文件中获取。

`System.ondemand` 可以多次调用。因此类库可以给使用者提供一段代码用于加载类库。

##编译流程

接下来的几个小节，将介绍如何通过编译流程解决多个实用场景。

下面时编译流程的概览图：

![](http://zhuowenli.qiniudn.com/2015/10/08/1.png)

在 **fetch** 和 **translate** 之间的虚线箭头，表示通过异步的过程获取源码。

##更严格的模式（代码检测）

Lint 工具是 JavaScript 开发者工作流中至关重要的一环，但目前他们主要的是用方式就是通过编译工具来测试将错误输出到终端中。

使用 Module Loader 的 translate hook，可以添加静态检查，给到用户`SyntaxErrors` 。

```js
import { JSHINT } from "jshint";
import { options } from "app/jshintrc"

System.translate = function(source, options) {
  var errors = JSHINT(source, options), messages = [options.actualAddress];

  if (errors) {
    errors.forEach(function(error) {
      var message = '';
      message += error.line + ':' + error.character + ', ';
      message += error.reason;
      messages.push(message);
    });

    throw new SyntaxError(messages.join("\n"));
  }

  return source;
};
```

如果 linter 返回了错误，tranlate hook 会产生一个 `SyntaxError`，Loader 停止编译过程，抛出一个异常，就好像是产生了一个真的 `SyntaxError` 一样。

![](http://zhuowenli.qiniudn.com/2015/10/08/2.png)

##Import 可编译为 JavaScript 的模块（例如 CoffeeScript）

现在越来越多的模块使用编译为 JavaScript 的语言编写。利用 `translate` hook 可以在模块被加载之前将源代码编译为 JavaScript。

```js
System.translate = function(source, options) {
  if (!options.path.match(/\.coffee$/)) { return; }

  return CoffeeScript.translate(source);
};
```

上面的例子，所有以 `.coffee` 结尾的模块会被当作 CoffeeScript 编译为 JavaScript，在编译流程的其它环节看到的是编译后的 JavaScript。

![](http://zhuowenli.qiniudn.com/2015/10/08/3.png)

##验证和编译

还有其它一些编译器，比如 [TypeScript](http://typescript.codeplex.com/) 和 [Restrict Mode](http://restrictmode.org/) 即包含编译时验证和源码转译。

结合上面的技巧可以在浏览器中无缝地支持这些类库。

##使用已存在的类库作为模块

现存的一些类库，比如 jQuery，将 `jQuery` 变量 export 到全局对象上。

对于这类类库，应该可以在不修改类库的源码的情况下将它们 import 进来，像下面这样：

```
import { jQuery } from "jquery";

jQuery(function($) {
  $(".ui-button").button();
});
```

编译流程中的最后一步，**link** 可以手动地把源码文件处理成一个 *Module* 对象。

在这样的场景中，我门可以配置 Loader，把本来要写入到 `window` 上到属性都提取出来。

```js
function extractExports(loader, original) {
  source =
    `var exports = {};
    (function(window) {
      ${source};
    })(exports);
    exports;`

  return loader.eval(source);
}

System.link = function(source, options) {
  if (options.metadata.type === 'legacy') {
    return new Module(extractExports(this, source));
  }

  // returning undefined will result in the normal
  // parsing and registration behavior
}
```

为了让 **link** 决定是否适用自定义的 link 逻辑，`resolve` hook 应当为后面的 hook 提供模块的元信息（metadata）。

你可以在 `reslove` 的时候，通过一个 legacy 模块的列表来获取这样的metadata：

```js
var legacy = ["jquery", "backbone", "underscore"];

System.resolve = function(path, options) {
  if (legacy.indexOf(path) > -1) {
    return { name: path, metadata: { type: 'legacy' } };
  } else {
    return { name: path, metadata: { type: 'es6' } };
  }
}
```

![](http://zhuowenli.qiniudn.com/2015/10/08/4.png)

##在 ES6 模块中 import AMD 模块

同样，你可能需要在 ES6 模块中 import AMD 模块。例如下面这个简单的 AMD 模块：

```js
// libs/string.js

define(['exports'], function(exports) {
  var underscoreRegex1 = /([a-z\d])([A-Z]+)/g,
      underscoreRegex2 = /\-|\s+/g;

  exports.underscore = function(string) {
    return string.replace(underscoreRegex1, '$1_$2')
                 .replace(underscoreRegex2, '_')
                 .toLowerCase();
  }

  exports.capitalize = function(string) {
    return string.charAt(0).toUpperCase() + string.substr(1);
  }
});
```

To assimilate this module, you could use a similar technique to the one we used above for jQuery:
为了兼容这个模块，你可以使用类似的针对 jQuery 的技巧：

```js
var amd = ["string-utils"];

// Resolve
System.resolve = function(path, options) {
  if (amd.indexOf(path) > -1) {
    return { name: path, metadata: { type: 'amd' } };
  } else {
    return { name: path, metadata: { type: 'es6' } };
  }
};

function extractAMDExports(loader, source) {
  var loader = new Loader();
  loader.eval(`
    var module;
    var define = function(deps, callback) {
      module = { deps: deps, callback: callback };
    };
    ${source};
    module;
  `);

  // Assume synchronously available dependencies. See below
  // for a discussion of async dependencies.
  var exports = {};
  var deps = module.deps.map(function(name) {
    // AMD uses a special dependency named `exports` to
    // collect exports.
    if (name === 'exports') { return exports; }
    else { return loader.get(name); }
  });

  callback(deps);
  return exports;
}

System.link = function(source, options) {
  if (options.metadata.type === 'amd') {
    return new Module(extractAMDExports(this, source));
  }
}
```
有一点需要说清楚，这里特定的实现很简单，但是真实的 AMD 兼容的方案要比这复杂得多。这个简单的例子只是说明类似的方案是什么样子。

![](http://zhuowenli.qiniudn.com/2015/10/08/5.png)

##在 ES6 模块中 import Node 模块

在 ES6 模块中引入 node 模块的方案也没什么特别的，比如上面模块的 node 版本：

```js
var underscoreRegex1 = /([a-z\d])([A-Z]+)/g,
    underscoreRegex2 = /\-|\s+/g;

exports.underscore = function(string) {
  return string.replace(underscoreRegex1, '$1_$2')
               .replace(underscoreRegex2, '_')
               .toLowerCase();
}

exports.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}
```

You'd override the hooks in a similar way:

```js
var node = ["string-utils"];

// Resolve
System.resolve = function(path, options) {
  if (node.indexOf(path) > -1) {
    return { name: path, metadata: { type: 'node' } };
  } else {
    return { name: path, metadata: { type: 'es6' } };
  }
};

function extractNodeExports(loader, source) {
  var loader = new Loader();
  return loader.eval(`
    var exports = {};
    ${source};
    exports;
  `);
}

System.link = function(source, options) {
  if (options.metadata.type === 'node') {
    return new Module(extractNodeExports(this, source));
  }
}
```

##import 各种非 ES6 模块

为了兼容不同的模块系统，我们需要编写 resolove hook，在执行过程中获取模块的类型，然后在 `link` hook 中利用这些信息来处理模块源码。

为了简化这个过程，需要一个像 `require.js` 这样的 JavaScript 类库，为 ES6 Loader 而生，可以提供注册其他类型模块的便利，并在 `link` 阶段对代码进行融合。

##Import “单个 export” 的非 ES6 模块

其他某些模块系统支持有单个 export 的模块，而不是多个具名的 export。

上面使用的技巧也可以用来把单个 export 的模块注册到已知的预先约定的名称下。

看看下面这个 node 模块风格的“单个 export”模块：

```js
// string-utils/capitalize.js

module.exports = function(string) {
  return string.charAt(0).toUpperCase() + string.substr(1);
}
```

为了让这个模块可以在 ES6 模块中使用，要求 Loader 给 export 起一个约定的名字，便于 ES6 模块引入。

在本例中，我们将 export 命名为 `exports`，与现存的 node
实践保持一致。通过这样的处理，ES6 模块就可以引入这个模块了：

```js
// app.js

import { exports: capitalize } from "string-utils/capitalize";

console.log(capitalize("hello")) // "Hello"
```

在上面的代码中，我们把 `exports` 改名为了 `capitalize`。

为了实现上面的预定，我们需要在 link 代码的地方添加对 `module.exports =` 的处理。

```js
function extractNodeExports(loader, source) {
  var loader = new Loader();
  var exports = loader.eval(`
    var module = {};
    var exports = {};
    ${source};
    { single: module.exports, named: exports };
  `);

  if (exports.single !== undefined) {
    return { exports: exports.single }
  } else {
    return exports.named;
  }
}

System.link = function(source, options) {
  if (options.metadata.type === 'node') {
    return new Module(extractNodeExports(this, source));
  }
}
```

类似的方案也可以用来处理 AMD 模块只有“单个 export” 的情况。

##在 Node 模块中 import ES6 Module

当使用 node 模块时，我们可能希望这些 node 模块也可以 import 其他模块，但不用在意 node 模块的源码时什么样子。

之前用来 import 非 ES6 模块的方案有一个主要的优点就是，可以使用标准的 `System.get` 来 import 这些模块。

也就是说其实我们可以很容易的支持在 node 模块中的 `require`，只需要给 `System.get` 起一个别名即可：

```js
function extractNodeExports(loader, source) {
  var loader = new Loader();
  var exports = loader.eval(`
    var module = {};
    var exports = {};
    var require = System.get;
    ${source};
    { single: module.exports, named: exports };
  `);

  if (exports.single !== undefined) {
    return { exports: exports.single }
  } else {
    return exports.named;
  }
}
```

##Import 包含异步以来的 AMD 模块

在上面的例子中，我们其实做了这样的假设，其他模块的所有以来都是可以同步获取的，因此我们可以在 `link` hook 中使用 Sysem.get。然而 AMD 模块可以拥有异步的依赖，不过这些依赖可以在不执行模块的前提下获取。

针对这种情况，你可以在 `link` 函数中返回一列依赖以及一个回调函数，在依赖加载好之后 Loader 会执行这个回调函数，将依赖作为参数传入，接受一个 `Module` 实例作为返回值。

```js
var amd = ['string-utils'];

System.resolve = function(path, options) {
  if (amd.indexOf(path) !== -1) {
    options.metadata = { type: 'amd' };
  } else {
    options.metadata = { type: 'es6' };
  }
};

System.link = function(source, options) {
  if (options.metadata.type !== 'amd') { return; }

  var loader = new Loader();
  var [ imports, factory ] = loader.eval(`
    var dependencies, factory;
    function define(dependencies, factory) {
      imports = dependencies;
      factory = factory;
    }
    ${source};
    [ imports, factory ];
  `);

  var exportsPosition = imports.indexOf('exports');
  imports.splice(exportsPosition, 1);

  function execute(...args) {
    var exports = {};
    args.splice(exportsPosition, 0, [exports]);
    factory(...args);
    return new Module(exports);
  }

  return { imports: imports, execute: execute };
};
```

从 `link` hook 中返回 imports 和一个 callback，让它参与到 ES 模块两步加载的过程之中，只不过使用 AMD 规范将这两个阶段分开了。

![](http://zhuowenli.qiniudn.com/2015/10/08/6.png)

##解析 `require` 来 import Node 模块

因为 Node 模块使用一个动态的表达式来做 import，所以没有明确的方式来确保所有依赖加载完成之后才执行模块。

Browserify 也使用这种方式来分析第一次出现在 `require` 表达式中的模块，把它们当做被分析模块的依赖。AMD 的 CommonJS Wrapper 也是使用类似的一个方案。

我们可以在 link hook 中分析 Node 式的包，获取 `require` 代码行，把它们当做 `imports` 返回。

直到 `execute` 回调被执行，所有依赖的模块都已异步加载完成，可以同步得到，然后继续利用把 `require` 函数代理到 `System.get`。

```js
import { processImports } from "browserify";

System.link = function(source, options) {
  var imports = processImports(source);

  function execute() {
    return new Module(extractNodeExports(source));
  }

  return { imports: imports, execute: execute};
};
```

当然，这种方式只对部分 `require` 语句有效，对于动态表达式、条件语句或者 `try/catch` 就不起作用。这些也都是像 *Browserify* 这类系统的缺点。

![](http://zhuowenli.qiniudn.com/2015/10/08/7.png)

##互通性

让我们一起总结一下针对非 ES6 模块定义的策略：

- 非 ES6 模块可以使用 Loader 通过复写 `resolve` 和 `link` hook 来加载；
- 非 ES6 模块可以异步地加载其他依赖的模块，只要在 `link` 返回这些import 即可。执行通过 `System.get` 来同步获取。

也就是说所有的模块系统都可以把 Loader 作为中间件，互相连接到一起。
例如，一个 AMD 模块（比如 app），依赖一个 Node 风格的模块（string-utils）：

1. 当加载 `app` 时，`link` hook 将返回 `{ imports: ['string-utils'], execute: execute }`；
2. Loader 继续加载 `string-utils`，直到加载好了才会执行 `execute` 回调；
3. Loader 将下载 `string-utils`，应用 Node 式的 `link` hook；
4. `string-utils` 一旦加载完成，之前返回的 `execute` 回调就会被执行，`string-utils` 模块被当做了一个参数；
5. `execute` 回调将返回一个模块

这仅仅是一个示例；任何两个模块系统都可以通过 Loader 联通到一起。


##注意“单个 export” 的互通性

很多已有的模块系统不但支持 export 多个具名的值，也支持单值。

就目前来看，ES6 模块规范并没有完全支持这种特性，但是可以通过 Loader 来模拟。一种可行的策略就是 export 一个名称约定的值（例如，`exports`）。

我们这就看看 Loader 是如何支持 Node 风格的模块 import 另外一个“单个 export” 模块的。

同样的方式也可以用来支持联通两个支持 import 或者 export 单个值的模块系统。

我们需要对之前的方案进行增强以适应这种场景：

```js
var isSingle = new Symbol();

function extractNodeExports(loader, source) {
  var loader = new Loader();
  var exports = loader.eval(`
    var module = {};
    var exports = {};
    var require = System.get;
    ${source};
    { single: module.exports, named: exports };
  `);

  if (exports.single !== undefined) {
    return { exports: exports.single, [isSingle]: true };
  } else {
    return exports.named;
  }
}

System.link = function(source, options) {
  if (options.metadata.type === 'node') {
    return new Module(extractNodeExports(this, source));
  }
}
```

首先，我们创建了一个唯一的 Symbol 来标记一个包含单一 export 的模块。这将避免与那些 export `exports` 的 Node 风格模块搞混。

接下来，我们需要增强提供给 Node 式 `require` 的代码。之前只是简单的将其代理到 `System.get` 上。现在则判断 `isSingle` 标记，进行特殊处理。

```js
// this assumes that the `isSingle` Symbol is in scope
var require = function(name) {
  var module = System.get(name);
  if (module[isSingle]) {
    return module.exports;
  } else {
    return module;
  }
}
```

同样地，通过一个共享的 `isSingle` 标记，可以实现 AMD 和 Node 单一 exports 的互通。

就如之前描述的，ES5 模块将使用 `import {exports: underscore}` 来使用 `string-utils/underscore` 模块。

##与现存 Loader 相似的配置

`RequireJS` Loader 包含了一系列有用的配置，用户可以用来自定义 Loader。

本小节会讲给出一些这些配置的小例子，并展示在 ES Loader 中如何体现这些配置的。通常说来，编译流程提供的 hook 就可以实现这些配置。

##Base URL

在 `RequireJS` 中，可以指定一个 base URL，解析模块时，根据这个路径来做 resolve。

在 Browser Loader 中，默认的 base URL 即页面的 base URL。`System.resolve`在默认情况下会在模块名前加上 base URL，在后面上加上 `.js`。

浏览器默认的 Loader（`window.System`）同样也包含了一个 `baseURL` 配置，来设置 base URL，控制 `resolve` 的实现。

还有一种方式，可以通过 JavaScript 代码，重写 Loader 的 resolve hook 策略。

```js
var resolve = System.resolve;

System.resolve = function(name, ...args) {
  if (name.match(/fun/)) {
    return `/assets/javascripts/${name}.js"
  }
  return resolve(name, ...args);
};
```

##URL 参数

和 `RequireJS` 一样，可以复写 `resolve` hook 来指定额外的 URL 参数。

```js
var resolve = System.resolve;

System.resolve = function(...args) {
  return resolve(name, ...args) + "?bust=" + (new Date().getTime());
};
```

##超时

在 `RequireJS` Loader 中，可以设置一个超时时间，超时了就当做请求失败处理。

在 ES6 Loader 中，可以复写 `fetch` hook 的逻辑，在确定时间之后出发 fetch 失败。

```js
var fetch = System.fetch;

System.fetch = function(url, options) {
  setTimeout(function() {
    options.reject("Timeout");
  }, 5000);

  fetch(url, options);
};
```


##支持无规格的模块

`RequireJS` 提供了一种机制，来指定如何处理无规格的模块：

```js
requirejs.config({
  shim: {
    backbone: {
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    },
  }
});
```

上面的例子展示了方法之一，把**现成的类库当做模块来使用**。这种方案无需列出特定 export 名，运行起来没有太大的差别。

`link` hook 同样可以提供定义无规格模块依赖的方式。

```js
var config = {
  backbone: {
    deps: ['underscore', 'jquery'],
    exports: ['Backbone']
  }
}

function executeCallback(source, exportNames) {
  System.eval(source);
  var exports = {};
  exportNames.forEach(function(name) {
    exports[name] = System.global[name]
  });
  return new Module(exports);
}

System.link = function(source, options) {
  if (!config[options.normalized]) { return; }

  var { deps, exports: exportNames } = config[options.normalized];

  if (moduleConfig) {
    return {
      imports: moduleConfig.deps,
      execute: executeCallback(source, exportNames);
    }
  }
};
```

##在 HTML 中引用模块

在 Ember.js 、Angular.js 等目前流行的框架中，会在 HTML 中引用 JavaScript 对象：

```js
<!-- ember.js -->
{{#view App.FancyButton}}
<p>Fancy Button Contents</p>
{{/view}}
```

app 请求 Ember.js 把 `App.FancyButton` 构造函数定义的 HTML 渲染出来。注意 Ember 鼓励使用一个全局命名空间来在 JavaScript 和 HTML 间协调。

```html
<!-- angular -->
<button fancy-button>
  <p>Fancy Button Contents</p>
</button>
```

app 请求 Angular.js 将 `<button>` 替换成其他内容，这些内容定义在一个注册在全局的 `fancy-button` 指令中。

Angular 和 Ember 都是使用一个全局注册的名称，来定义一个 Controller 对象，将由框架控制的 HTML 加入到文档中。

```js
<!-- ember -->
{{control "fancy-button"}}
```

在上面的代码中，让 Ember.js 渲染一些 HTML，由一个 `App.FancyButtonView` 定义，并使用 `App.FancyButtonController` 的实例作为它的 controller。Ember 依赖一个全局的根命名空间来协调这些关系。

```html
<!-- angular -->
<div ng-controller="TodoCtrl">
  <span>{{remaining()}} of {{todos.length}} remaining</span>
</div>
```

应用让 Angular 使用一个名为 `TodoCtrl` 全局对象作为这部分 HTML 代码的 controller。在 Angular 中，controller 被用来控制与内部嵌套内容做数据绑定的 scope。

为了处理上面这种情况，使用一个 String 来引用模块，切需要动态地查询，ES6 模块提供了一个 API 在运行时查询这些模块。

```js
System.get('controllers/fancy-button');
```

像 Ember 或者 Angular 这样的框架可以使用这个 API 让用户在 THML 中引用模块的 exports。

在第一个 Ember 例子中，HTML 可以通过名字来引用模块，而不是通过一个全局的构造函数。

```js
<!-- ember.js -->
{{#view views/fancy-button}}
<p>Fancy Button Contents</p>
{{/view}}
```

模块看起来约摸时这样的：

```js
// views/fancy-button.js
import { View } from "ember";

export let view = View.extend({
  // contents
});
```

第二个 Angular 的例子可以改成这样：

```html
<!-- angular -->
<div ng-controller="controllers/todo">
  <span>{{remaining()}} of {{todos.length}} remaining</span>
</div>
```

JavaScript：

```js
// controllers/todo.js

export function Controller($scope) {
  // contents
}
```

上面的模式都是从全局命名空间切换到具名注册的模块。`System.get` 提供了一种方式来动态地查询已经加载好了的模块。

##在 HTML 中创建模块

新的 Web Component 规范提供了一种通过 HTML 创建 JavaScript 构造函数的方式：

```html
<element extends="button" name="x-fancybutton" constructor="FancyButton">
  <script>
    FancyButton.prototype.razzle = function () {
    };
    FancyButton.prototype.dazzle = function () {
    };
  </script>
</element>
```

```js
// app.js

var b = new FancyButton();
b.textContent = "Show time";
document.body.appendChild(b);
b.addEventListener("click", function (event) {
    event.target.dazzle();
});
b.razzle();
```

`<element>` 标记在全局创建了一个构造函数，这个规范在实现细节可能有所不同，但是可以像下面这样工作：

```js
// app.js

import { Element: FancyButton } from "web/x-fancybutton"

var b = new FancyButton();
b.textContent = "Show time";
document.body.appendChild(b);
b.addEventListener("click", function (event) {
    event.target.dazzle();
});
b.razzle();
```

> 这些内容最初是 [wycats 发布在 GitHub 上的 gist](http://nodejs.org/api/fs.html)，但我认为它值得大家给予更多的关注。
> 描述 ES6 模块化的资源很少，尤其是这样的细节。可以到这个 gist 下看看，有很多有趣的关于 ES6 模块的讨论。

----------

相关链接：

- [ECMAScript 6 modules: the future is now](http://restrictmode.org/)
- [ECMAScript 6 modules in future browsers](http://www.2ality.com/2013/11/es6-modules-browsers.html)
- [Traceur Compiler](https://github.com/google/traceur-compiler)
- [grunt-traceur](https://github.com/aaronfrost/grunt-traceur)
- [ES6 Compatibility Table](http://kangax.github.io/es5-compat-table/es6/)
- [ES6 Code Samples in my upcoming JavaScript Application Design book](https://github.com/bevacqua/buildfirst/tree/latest/ch05/17_harmony-traceur)

如果我你再找一个支持这些语法的玩具，我所知道的 [ModuleLoader/es6-module-loader](http://typescript.codeplex.com/) 是最跟的上规范的 polyfill。相信我，我看过了。

原文：[http://ponyfoo.com/articles/architecture-of-ecmascript-6-modules](http://ponyfoo.com/articles/architecture-of-ecmascript-6-modules)
