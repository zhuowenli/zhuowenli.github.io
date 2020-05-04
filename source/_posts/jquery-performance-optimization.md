---
title: jQuery性能优化
subtitle: jquery performance optimization
categories: frontend
tags: [github-page, jekyll, javascript, jquery]
date: 2014-08-20
---

人脑不是机器，记忆都会退化，我们需要文档辅助作知识沉淀

<!-- more -->

```js
$("input[checked='checked']");  // 比较快
$("input:checked"); // 比较慢
```

#### 合理使用选择器

* id和标签选择器最快，因为直接调用原生API

    ```js
    $("#box"); // document.getElementById | document.querySelector
    $("div");  // document.getElementsByTagName
    ```

* 类选择器在低版本浏览器比较慢，伪元素、属性选择器在不支持 `querySelector` 的浏览器很慢

* 尽可能优先使用符合CSS语法规范的CSS选择器表达式，以此来避免使用jQuery自定义的选择器表达式。因为当jQuery遇到单个id
，标签名，选择器就会快速调用浏览器支持的DOM方法查询

    ```js
    $("input[checked='checked']");  // 比较快
    $("input:checked"); // 比较慢
    ```

* 优先选择 `$.fn.find` 查找子元素，因为 `find` 之前的选择器并没有使用jQuery自带的 `Sizzie` 选择器引擎，而是使用元素API查找元素

    ```js
    $("#parent").find(".child"); // 最快
    $(".child,$("#parent")"); // 较快，内部会转换成第一条语句的形式，性能有一定损耗
    $("#parent .child"); // 不如上一个语句快
    ```

* 使用组合时，尽可能使右端更明确，因为Sizzie引擎是从右到左匹配的

    ```js
    $(".foo div.bar"); // 快
    $("div.foo .bar"); // 较慢
    ```

* 避免过度具体，简洁的DOM结构也有助于提升选择器性能

    ```js
    $(".foo .baz"); // 快
    $(".foo .bar .baz") // 慢
    ```

* 尽量避免使用通配符选择器

#### 尽可能少创建jQuery对象

* 如 `document.getElementById('nav')` ，比 `$("#nav")` 快
* 如获取元素id

    ```js
    $("div").click(function(){
        //生成了个jQuery对象
        var id = $(this).attr('id');
        //酱紫更直接
        var id = this.id;
    });
    ```

* 使用链式调用缓存jQuery对象

    ```html
    <div id="user" class="none">
        <p class="name"></p>
        <p class="city"></p>
    </div>
    ```

    ```js
    $("#user")
        .find('.name').html('zhangsan').end()
        .find('.city').html('xiamen').end()
        .removeClass('none');
    ```

* 做好jQuery对象的缓存

    ```js
    var box = $(".box");
    box.find('> .cls1');
    box.find('> .cls2');
    ```

#### 避免频繁操作DOM

* 复杂操作把元素从DOM移除在操作</p>

    ```js
    var $el = $('.box').detach();
    var $p  = $el.parent();

    // do something...

    $p.append($el);
    ```

* 在循环外执行DOM修改</p>

    ```js
    // 较好的做法
    var frag = document.creatElementFragment();
    $.each(arr,function(i,el){
        flag.appendChild(el);
    })
    $('.box')[0].addendChild(flag);

    //性能差
    $.each(arr,function(i,el){
        $('.box').prepend($(el));
    })
    ```

#### 使用事件代理

```js
$('ul').on('click',li,fn); // 较好
$('ul li').on('click',fn); // 较差
```

使用事件代理（委托），当有新元素添加进来的时候，不需要在为它绑定事件。
