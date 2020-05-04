---
title:  Flux 入门教程
subtitle: The Flux Quick Start Guide
categories: frontend
tags: [javascript, react, flux]
date: 2015-07-30
---

本文将概括性的介绍如何使用 Flux 架构开发 JavaScript 应用，用尽可能少的篇幅带你熟悉 Flux 的核心概念。你可以结合这些[代码](https://github.com/zhuowenli/flux-starter-kit)阅读本文。 一起学习。你最好先对 React 有基本的了解，并且有一些开发 React 组件的经验。如果不熟悉也没关系，可以先读一读这篇文章 [React 入门教程](http://www.zhuowenli.com/frontend/the-react-quick-start-guide.html)。

<!-- more -->

<svg class="flux" width="89px" height="36px" viewBox="0 0 89 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M70.92,0.34 C67.466,0.34 64.249,1.344 61.535,3.069 L44.439,15.625 L35.428,9.008 C34.885,9.889 34.338,10.765 33.815,11.672 C33.689,11.89 33.572,12.111 33.448,12.329 L40.98,17.86 L25.175,29.466 C23.009,30.816 20.517,31.53 17.958,31.53 C10.421,31.53 4.288,25.398 4.288,17.86 C4.288,10.322 10.42,4.19 17.958,4.19 C20.517,4.19 23.01,4.903 25.175,6.254 L26.746,7.407 C27.395,6.285 28.068,5.189 28.747,4.101 L27.343,3.07 C24.63,1.344 21.412,0.341 17.958,0.341 C8.283,0.341 0.439,8.185 0.439,17.86 C0.439,27.535 8.282,35.379 17.958,35.379 C21.412,35.379 24.63,34.375 27.343,32.65 L44.439,20.095 L53.485,26.738 C54.039,25.83 54.592,24.919 55.139,23.97 C55.247,23.782 55.345,23.595 55.452,23.407 L47.899,17.86 L63.703,6.254 C65.869,4.904 68.362,4.19 70.92,4.19 C78.458,4.19 84.59,10.322 84.59,17.86 C84.59,25.398 78.458,31.53 70.92,31.53 C68.361,31.53 65.869,30.817 63.703,29.466 L62.155,28.329 C61.499,29.462 60.835,30.563 60.168,31.645 L61.536,32.649 C64.25,34.375 67.467,35.378 70.921,35.378 C80.596,35.378 88.44,27.534 88.44,17.859 C88.439,8.184 80.596,0.34 70.92,0.34 L70.92,0.34 Z" fill="#44B74A">
  </path>
</svg>

## 概念

Flux 是用来构建用户端 Web 应用的架构，它包含三个核心概念：`Views`, `Stores` 和 `Dispatcher`，还有一些次级概念：`Actions`, `Action Types`, `Action Creators` 和 `Web Utils`。

请耐心学习以下概念定义然后再看后面的教程。当你准备开始开发 Flux 应用之前，建议你再回过头来看一遍基本概念。

### 核心概念

- `Views` 即 React 组件。它们负责渲染界面，捕获用户事件，从 Stores 获取数据。
- `Stores` 用于管理数据。 一个 Store 管理一个区域的数据，当数据变化时它负责通知 Views。
- `Dispatcher` 接收新数据然后传递给 Stores，Stores 更新数据并通知 Views。

### 次级概念

- `Actions` 是传递给 Dispatcher 的对象，包含新数据和 Action Type。
- `Action Types` 指定了可以创建哪些 Actions，Stores 只会更新特定 Action Type 的 Actions 触发的数据。
- `Action Creators` 是 Actions 的创建者，并将其传递给 Dispatcher 或 Web Utils。
- `Web Utils` 是用于与外部 API's 通信的对象。例如 Actions Creator 可能需要从服务器请求数据。

是不是一次给的信息量太多啦？强烈建议结合这些[代码](https://github.com/zhuowenli/flux-starter-kit) 边看文章边敲代码，可以达到更好的学习效果。

提示：这里省略了 `constants` 和 `Web Utils`，是为了更快速简单地理解 Flux。更深入阅读 [官方示例](https://github.com/facebook/flux/tree/master/examples) 能很好地补充这些知识。

## Views

部署好 [开发代码](https://github.com/zhuowenli/flux-starter-kit) 后，你会看到在 `js` 目录下有个 `app.js` 文件。

```js
var React = require('react');
var Comments = require('./views/comments');
var CommentForm = require('./views/comment-form');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Comments />
                <CommentForm />
            </div>
        );
    }
});

React.render(<App />, document.getElementById('app'));
```

上面代码把 `Views` 渲染到 DOM 中。先忽略 `Comments`，看一下 `CommentFrom` 的实现。

```js
var React = require('react');

var CommentActionCreators = require('../actions/comment-action-creators');

var CommentForm = React.creatClass({
    onSubmit: function(e) {
        var textNode = this.refs.text.getDOMNode();
        var text = textNode.value;

        textNode.value = '';

        CommentActionCreators.createComment({
            text: text
        });
    },

    render: function() {
        return (
            <div className='comment-form'>
                <textarea ref='text' />
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        );
    }
});

module.exports = CommentForm;
```

`CommentForm` 依赖的 `CommentActionCreators` 是一个 Action Creator (正如它的名字一样)。

当表单提交时 `createComment` 函数传递了 `comment` 对象，它的值是根据 `textarea` 的值构造出来的。让我们开发这个 Action Creator 来接收 `comment`。

## Actions

在 `actions` 目录里创建 `comment-action-creators.js 文件。

```js
var AppDispatcher = require('../dispatcher/app-dispatcher');

module.exports = {

  createComment: function(comment) {
    var action= {
      actionType: "CREATE_COMMENT",
      comment: comment
    };

    AppDispatcher.dispatch(action);
  }
};
```

`createComment` 函数构造了一个 Action，包含 Action Type 和 comment 数据，并将这个 Action 传递给 Dispatcher 的 `dispatch` 函数。

接下来编写 Dispatcher 用于接收 Actions。

提示：也可以把这些逻辑写在 View 里面 - 直接跟 Dispatcher 通信，但最佳实践是用 Action Creator。它能降低代码的耦合度并给 Dispatcher 提供一个单独的接口。

## Dispatcher

在 `dispatcher` 目录下创建 `app-dispatcher.js` 文件。

```js
var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();
```

Flux 库的 Dispatcher 提供了一个 `dispatch` 函数，将接收到的 Actions 传递给所有注册的回调函数，回调函数由 Stores 提供。

提示：这里没有 Dispatcher 的具体实现，源码在[这里](https://github.com/facebook/flux/blob/master/src/Dispatcher.js#L181)。

## Stores

在 `stores` 目录下创建一个 `comment-store.js` 文件。

```js
var AppDispatcher = require('../dispatcher/app-dispatcher');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var comments = [];

var CommentStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getAll: function() {
        return comments;
    }
});

AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case "CREAT_COMMENT":
            comments.push(action.comment);
            CommentStore.emitChange();
            break;

        default:
    }
});

module.exports = CommentStore;
```

这段代码分为两部分：创建 Store 和 注册 Store。

Store 由 `EventEmitter.prototype` 和自定义对象整合而成。`EventEmitter.prototype` 给 Store 赋予了订阅和触发事件的能力。

自定义对象定义了订阅和取消订阅事件的函数，同时定义了 `getAll` 函数返回 `comments` 数据。

然后，通过 Dispatcher 注册了一个回调函数。当 Dispatcher 调用 `dispatch` 时传递 Actions 参数给每个注册过的回调函数。

----------------------------------------------------

现在我们需要一个 View 来展示 Store 的数据，并订阅数据的变化。

在 `views` 目录里有个 `comments.js` 文件。把它修改成如下所示：

```js
var React = require('react');

var CommentStore = require('../stores/comment-store');

function getStateFromStore() {
    return {
        comments: CommentStore.getAll()
    }
}

var Comments = React.createClass({
    onChange: function() {
        this.setState(getStateFromStore());
    },

    getInitialState: function() {
        return getStateFromStore();
    },

    componentDidMount: function() {
        CommentStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        CommentStore.removeChangeListener(this.onChange);
    },

    render: function() {
        var comments = this.state.comments.map(function(comment, index) {
            return (
                <div className='comment' key={'comment-' + index}>
                {comment.text}
                </div>
            );
        });

        return (
            <div className='comments'>
            {comments}
            </div>
        )
    }
});

module.exports = Comments;
```

`getStateFromStores` 函数从 Store 获取 comment 数据，并在 `getInitialState` 中设置为初始值。

在 `componentDidMount` 中，`onChange` 函数作为 `addChangeListener` 的回调函数，当 Store 触发 `change` 事件时 `onChange` 函数将被调用，即当 Store 数据变化时，它用于更新组件的 `state` 状态。

最后 `componentWillUnmount` 将 `onChange` 事件监听从 `Store` 移除。

## 结语

现在这个 Flux 应用可以运行起来了，同时我们也学习了 Flux 架构的核心概念：`Views`, `Stores` 和 `Dispatcher`。

- 当提交 comment 时，View 调用了 Action Creator
- Action Creator 创建一个 Action 并传给 Dispatcher
- Dispatcher 将 Action 发送给 Store 中注册的回调函数
- Store 更新 comment 数据，并触发一个 change 事件
- View 更新 state 并重新渲染界面

这就是 Flux 的本质，Dispatcher 发送数据给所有 Stores，后者通知 Views 进行更新。

要想更深入理解 Flux 架构，我建议阅读 [官方文档](https://facebook.github.io/flux/)，还有 [官方示例](https://github.com/facebook/flux/tree/master/examples)。

<style type="text/css">
    .flux{
        height: 140px;
        margin: 0 auto;
        display: block;
        width: 252px;
    }
</style>
