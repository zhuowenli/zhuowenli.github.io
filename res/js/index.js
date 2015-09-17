/*!
* @Author: 卓文理 www.zwlme.com
* @Email:  531840344@qq.com
* @Date:   2015-03-16 18:06:40
* @Last Modified by:   卓文理
* @Last Modified time: 2015-05-08 17:14:36
*/

var app = {
    init: function(){
        this.initPage();
        this.loadPage();
        this.bindLinkJump();
    },
    initPage: function(){
        var page = $('.page'),
            body = $('body');
        if (page.hasClass('home-page')) {
            this.bindHomeEvent();
        }
        if (page.hasClass('post-page')) {
            setTimeout(function() {
                body.addClass('scrollable');
            }, 1500);
        }
        this.consoleLog();
    },
    loadPage: function(){
        var body = $('body'),
            value    = 0,
            interval = setInterval(function(){
                value++;
                if (document.readyState === "interactive" || document.readyState === "complete" || document.readyState === "Loaded") {
                    if (!body.hasClass('loading')) {
                        body.addClass('loading');
                    };
                };
                if (value >= 16) {
                    body.removeClass('loading');
                    body.addClass('loaded');
                    clearInterval(interval);
                };
            },50);
        var article = $('.article-body');
        if (article.html()) {
            article.find('a').attr('target', '_blank');
        };
    },
    bindLinkJump: function(){
        var body = $('body'),
            jump    = $('.jump');
        jump.bind('click', function(e){
            e.preventDefault();
            var self = $(this);
            var link = self.attr('href');
            if (self.attr('target')) {
                window.open(link);
            }else{
                body.removeClass('scrollable');
                body.removeClass('loaded');
                body.addClass('quiting');
                setTimeout(function() {
                    window.location.href = link;
                    clearTimeout();
                }, 800);
            }
        })
    },
    bindHomeEvent: function(){
        var homePage  = $('#homePage'),
            selectNav = $('#selectNav'),
            previewMini = $('.preview-mini'),
            data;

        // 事件绑定
        selectNav.find('li').bind('mouseenter', function(event) {
            homePage.spinClass($(this).attr('class'));
        });
        previewMini.bind('click', function(event) {
            data = $(this).attr('data-class');
            homePage.spinClass(data);
        });

        // 转盘class操作
        $.prototype.spinClass = function(_class) {
            $(this).removeClass('show-frontend');
            $(this).removeClass('show-design');
            $(this).removeClass('show-diary');
            $(this).addClass('show-' + _class);
        };
    },
    consoleLog: function(){
        console.log("%c卓文理"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:16em;color:#fff;");
    }
}
