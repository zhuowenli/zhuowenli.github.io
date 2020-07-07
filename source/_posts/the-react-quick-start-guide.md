---
title:  React 入门教程
id: 21
categories: frontend
tags: [JavaScript, react]
date: 2015-07-29
---

这篇文章将概括性的介绍一下如何用 ReactJS 进行开发。我将介绍一些基础知识，不会有过于深入的分析。你可以结合这些[代码](https://github.com/zhuowenli/react-starter-kit)阅读本文。

<!-- more -->

<div class="atom">
  <div class="oval oval-forward"></div>
  <div class="oval oval-backward"></div>
  <div class="oval oval-horizontal"></div>
  <div class="circle"></div>
</div>

## 概念

React 的 API 非常少，简单、易懂、易用。在正式开始之前先介绍几个概念，一个一个来。

**React 元素** 是表现为 HTML 元素的 JavaScript 对象，他们并不真实存在于浏览器中。他们最终表现为类似`h1`, `div` 或 `section` 之类的浏览器元素。

**组件(Components)** 是开发人员创建的 React 元素。他们通常包含了用户界面的结构和功能。 比如 `NavBar`、 `LikeButton`、`ImageUploader`等等。

**JSX** 是一种创建 React 元素和 components 的技术。例如 `<h1>Hello</h1>` 是一个用 JSX 写的 React 元素。同样可以用纯 JavaScript 写成 `React.DOM.h1(null, 'Hello');`。JSX 读写起来更轻松，最终上线之前必须将 JSX 语句转为 JavaScript 语句。

**虚拟DOM** 是由 React 元素和 components 组成的 JavaScript 树形结构对象。React 将虚拟 DOM 渲染到浏览器中变成最终的用户界面。React 会观察虚拟 DOM 的变化，并自动将这些变化渲染到浏览器端。

理解了上面这些概念，我们可以开始使用 React 写一些例子了。下面会开发一系列功能，每一个例子都是在前一个例子的基础上进行改进。我们会编写一个类似 instagram 的照片流程序 - 没有比这更好的示例程序了。

下载所需要的[开发环境](https://github.com/zhuowenli/react-starter-kit)，直接在`script.js`文件里面开发就可以了。

## 渲染(render)

第一步是渲染虚拟元素（React 元素或 component）。注意，虚拟元素只存在于内存中，必须显式地告诉 React 将它渲染到浏览器上。

```js
React.render(<img src='http://zhuowenli.github.io/lib/img/icon.png' />, document.body)
```

查看代码：[JSBin](http://jsbin.com/detime/6/edit)

`render` 函数接收两个参数：虚拟元素和真实的浏览器 DOM 元素。React 将虚拟元素插入到指定的 DOM 元素中。上例中可以看到图片被渲染出来了。

## 组件(Components)

组件是 React 的精髓所在。它们是自定义的 React 元素，通常有一些功能和结构定义。

```js
var Photo = React.createClass({
    render: function() {
        return <img src='http://zhuowenli.github.io/lib/img/icon.png' />
    }
});

React.render(<Photo />, document.body);
```

查看代码：[JSBin](http://jsbin.com/detime/7/edit)

`createClass` 函数接收一个对象，这个对象实现了 `render` 方法。

这个`Photo`组件定义了 `<Photo />`元素，并且渲染到 `document.body` 里。

这个组件跟之前的渲染图片没有太大区别，但是它为将来添加自定义功能奠定了基础。

## 属性(Props)

可以把属性看做组件的配置参数，看起来非常像 HTML 属性。

```js
var Photo = React.createClass({
    render: function() {
        return (
            <div className='photo'>
                <img src={this.props.imageURL} />
                <span>{this.props.caption}</span>
            </div>
        );
    }
});

React.render(<Photo imageURL='http://zhuowenli.github.io/lib/img/icon.png' caption='Logo!' />, document.body);
```

查看代码：[JSBin](http://jsbin.com/detime/8/edit)

`imageURL` 和 `caption` 两个属性被传递到 `Photo` 组件内的 `render` 函数里。

`imageURL` 被用在 React 图片元素的 `src` 属性，`caption` 被用作 React `span` 元素内的文本。

组件不会改变它的属性，他们是静止不变的。如果组件里包含动态数据，就要用到状态(State)对象。

## 状态(State)

状态对象用来记录随时可能变化的数据。

```js
var Photo = React.createClass({
    toggleLiked: function() {
        this.setState({
            liked: !this.state.liked
        });
    },

    getInitialState: function() {
        return {
            liked: false
        };
    },

    render: function() {
        var buttonClass = this.state.liked ? 'active' : '';

        return (
            <div className='photo'>
                <img src={this.props.src} />

                <div className='bar'>
                    <button onClick={this.toggoleLiked} className={buttonClass}>
                        ♥
                    </button>
                    <span>{this.props.caption}</span>
                </div>
            </div>
        );
    }
});

React.render(<Photo src='http://zhuowenli.github.io/lib/img/icon.png' caption='Logo!') />, document.body);
```

查看代码：[JSBin](http://jsbin.com/detime/3/edit)

组件的状态给组件引入了一些复杂性。

这个组件有一个新的函数 `getInitialState`。 当组件初始化时 React 会去调用这个函数。根据它返回的对象来设置组件的初始状态（正如函数名所表达的那样）。

这个组件还有另一个新函数 `toggleLiked`。它调用了 `setState` 来切换 `liked` 的值。

在 `render` 函数里有个 `buttonClass` 的变量，根据 `liked` 状态被标记为 `'active'` 或 空值。

`buttonClass` 被用作 React `button` 元素的类名。这个按钮还将 `toggleLiked` 函数绑定到 `onClick` 事件上。

看看在浏览器中渲染出来是什么效果：

- 当组件里的按钮被点击时，触发 `toggleLiked` 函数
- `liked` 状态被改变
- React 重新渲染虚拟 DOM
- 新老虚拟 DOM 进行对比
- React 识别出变化的部分并渲染到浏览器

上例演示了通过点击按钮来改变类名

## 组合组件(Composition)

将一些小的组件(components)链接起来形成一个大的组合组件。例如 `Photo` 组件可以用在 `PhotoGallery` 组件中，如下：

```jsx
var Photo = React.createClass({
    toggleLiked: function() {
        this.setState({
            liked: !this.state.liked
        });
    },

    getInitialState: function() {
        return {
            liked: false
        };
    },

    render: function() {
        var buttonClass = this.state.liked ? 'active' : '';

        return (
            <div className='photo'>
                <img src={this.props.src} />

                <div className='bar'>
                    <button onClick={this.toggleLiked} className={buttonClass}>
                        ♥
                    </button>
                    <span>{this.props.caption}</span>
                </div>
            </div>
        );
    }
});

var PhotoGallery = React.createClass({
    render: function() {
        var photos = this.props.photos.map(function(photo) {
            return <Photo src={photo.url} caption={photo.caption} />
        });

        return (
            <div className='photo-gallery'>
                {photos}
            </div>
        );
    }
});

var data = [
    {
        url: 'http://zhuowenli.github.io/lib/img/icon.png',
        caption: 'Logo!'
    },
    {
        url: 'http://zhuowenli.github.io/lib/img/icon-72.png',
        caption: 'Small Logo'
    },
    {
        url: 'http://zhuowenli.github.io/lib/img/icon-152.png',
        caption: 'Large Logo'
    }
];

React.render(<PhotoGallery photos={data} />, document.body);
```

查看代码：[JSBin](http://jsbin.com/detime/10/edit)

`Photo` 组件跟之前的没什么两样。新组件 `PhotoGallery` 根据 3 条假数据生成了 3 个 `Photo` 组件。

## 结语

本文只是一篇 React 入门，我强烈推荐大家去读 [React 官方文档](http://reactjs.cn/react/docs/getting-started.html)，里面包含了所有你想要的细节。

如果本文有什么错误之处，欢迎在下方评论，或者给我提 pull request。尽情给我发邮件吧，我很乐意效劳。

P.S - 如果你准备开发一个更复杂的 React 应用，推荐阅读 [Flux 入门教程](/frontend/the-flux-quick-start-guide.html)。

<style type="text/css">
    .atom { position: relative; width: 200px; height: 200px; margin: 100px auto -50px;}
    .oval { width: 200px; height: 75px; border: 5px solid #61DAFB; border-radius: 50%; }
    .oval-forward { -moz-transform: rotate(65deg); -ms-transform: rotate(65deg); -webkit-transform: rotate(65deg); transform: rotate(65deg); }
    .oval-backward { margin-top: -75px; -moz-transform: rotate(-65deg); -ms-transform: rotate(-65deg); -webkit-transform: rotate(-65deg); transform: rotate(-65deg); }
    .oval-horizontal { margin-top: -75px; }
    .circle { width: 40px; height: 40px; background: #61DAFB; border-radius: 40px; position: absolute; top: 19px; left: 80px; -moz-animation: pulse 2s ease-in-out infinite; -ms-animation: pulse 2s ease-in-out infinite; -webkit-animation: pulse 2s ease-in-out infinite; animation: pulse 2s ease-in-out infinite; }
</style>
