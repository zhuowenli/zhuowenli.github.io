/*!
* @Author: 卓文理 www.zwlme.com
* @Email:  531840344@qq.com
* @Date:   2015-03-16 18:06:40
* @Last Modified by:   卓文理 www.zwlme.com
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
    },
    bindLinkJump: function(){
        var body = $('body'),
            a    = document.getElementsByTagName('a');
        $(a).bind('click', function(e){
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
    }
}
