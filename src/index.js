/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-01-30 15:04:05
 */

import $ from 'jquery';
import './stylesheet/app.scss';


const app = {
    init() {
        this.initPage();
        this.loadPage();
        this.bindLinkJump();
        // this.consoleLog();
    },
    initPage() {
        const page = $('.page');
        const body = $('body');

        if (page.hasClass('home-page')) {
            this.bindHomeEvent();
        }
        if (page.hasClass('post-page')) {
            setTimeout(() => {
                body.addClass('scrollable');
            }, 1500);
        }
    },
    loadPage() {
        const body = $('body');
        const article = $('.article-body');
        let value = 0;

        const interval = setInterval(() => {
            value += 1;

            if (
                document.readyState === 'interactive'
                || document.readyState === 'complete'
                || document.readyState === 'Loaded'
            ) {
                if (!body.hasClass('loading')) {
                    body.addClass('loading');
                }
            }

            if (value >= 16) {
                body.removeClass('loading');
                body.addClass('loaded');
                clearInterval(interval);
            }
        }, 50);

        if (article.html()) {
            article.find('a').attr('target', '_blank');
        }
    },
    bindLinkJump() {
        const body = $('body');
        const jump = $('.jump');

        jump.bind('click', function(e) {
            e.preventDefault();
            const self = $(this);
            const link = self.attr('href');
            if (self.attr('target')) {
                window.open(link);
            } else {
                body.removeClass('scrollable');
                body.removeClass('loaded');
                body.addClass('quiting');
                setTimeout(() => {
                    window.location.href = link;
                    clearTimeout();
                }, 800);
            }
        });
    },
    bindHomeEvent() {
        const homePage = $('#homePage');
        const selectNav = $('#selectNav');
        const previewMini = $('.preview-mini');
        let data;

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
            $(this).addClass(`show-${_class}`);
        };

        require.ensure([], () => require('./canvas'));

        // require('./canvas');
        // require.ensure([], (r) => r('./canvas'), 'canvas');
    },
    consoleLog() {
        console.log('%c卓文理', ' text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:16em;color:#fff;'); // eslint-disable-line
    }
};

app.init();

export default app;
