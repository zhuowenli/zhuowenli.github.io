<template>
    <div class="container">
        <section-sidebar
            :hide="hide"
            :app="app">
        </section-sidebar>

        <section class="main-content">
            <div class="loadmask"><div class="body"><div class="dotted"></div></div></div>
            <div class="main hide">
                <router-view
                    transition="app"
                    transition-mode="out-in"
                    keep-alive>
                </router-view>
            </div>
        </section>

        <side-left :on="sideon"></side-left>
        <side-right :on="sideon"></side-right>
    </div>
</template>

<script>
    import SideLeft from './ui/side-left.vue';
    import SideRight from './ui/side-right.vue';
    import SectionSidebar from './sidebar/index.vue';
    import store from '../vuex/store';
    import {getApp} from '../vuex/getters.js';
    import {saveApp} from '../vuex/actions.js';

    export default {
        store: store,
        vuex: {
            getters: {
                app: getApp
            },
            actions: {
                saveApp,
            }
        },
        components: {
            SideLeft,
            SideRight,
            SectionSidebar
        },
        data () {
            return {
                authenticating: false,
                sideon: false,
                fetch: true
            }
        },
        methods: {
            loadedAnimate() {
                const $container = $('.container');

                $container.addClass('hideprogress');

                setTimeout(function() {
                    $container.addClass('showborder hideexpand showsidebar');

                    setTimeout(function() {
                        $container.addClass('hideborder');
                    }, 600);

                    setTimeout(function() {
                        const $hide = $('.hide');
                        const $hidechild = $('.hidechild');

                        $hidechild.children().css({"transition-delay": "0s"});
                        $hide.css({"transition-delay": "0s"});
                        $hidechild.removeClass('hidechild');
                        $hide.removeClass('hide');

                        $(".btn").each(function(t, a) {
                            const $this = $(this);
                            const length = $this.find(".name").text().length;
                            const $light = $this.find(".light").children();

                            for (let i = 0; length > i; i++){
                                $light.eq(i).addClass("o").css({
                                    "transition-delay": i / 50 + "s"
                                });
                            }
                        });
                    }, 1100);
                }, 1000);
            },
            setSize(){
                const app = Object.assign({}, this.app);
                const $container = $('.container');
                const $loadmask = $('.loadmask');
                const $left = $('.main-sidebar');
                const $right = $('.main-right');
                const $center = $('.main-center');
                const $graph  = $('.main-graph');
                const $main = $('.main');

                app.windowWidth = window.innerWidth;
                app.windowHeight = window.innerHeight;
                app.windowWidthHalf = app.windowWidth / 2;
                app.windowHeightHalf = app.windowHeight / 2;

                app.canvasRatio = 940;
                app.canvasWidth = app.canvasRatio * app.ratio;
                app.canvasHeight = app.canvasRatio * app.ratio;
                app.canvasWidthHalf = app.canvasWidth / 2;
                app.canvasHeightHalf = app.canvasHeight / 2;

                app.leftWidth = $left.width() + 80;
                app.rightWidth = $right.width() + 80 || 80;
                app.mainWidth = $container.width() - app.leftWidth;
                app.centerWidth = $container.width() - app.leftWidth - app.rightWidth - 20;
                app.centerWidthHalf = app.centerWidth / 2;
                app.centerHeight = app.windowHeight;

                app.graphR  = 330;
                app.graphRO = 330;

                app.wWOver = app.centerWidth > (app.graphRO * 2 + 20) ? false : true;
                app.wHOver = app.windowHeight > 840 ? false : true;

                if(app.wHOver && app.wWOver){
                    app.graphR  = (app.centerWidth - 60) / 2;
                }else if(!app.wHOver && app.wWOver){
                    app.graphR  = (app.centerWidth - 60) / 2;
                }else if(app.wHOver && !app.wWOver){
                    app.graphR  = (app.windowHeight - 160) / 2;
                }else{
                    app.graphR  = app.graphRO;
                }

                app.graphRadius = app.graphR * app.ratio;

                $loadmask.css({
                    'width': app.mainWidth,
                    'height': app.windowHeight
                });
                $main.css({
                    'width': app.mainWidth,
                    'height': app.windowHeight
                });

                const ua = navigator.userAgent;

                if ((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1)
                  || ua.indexOf('iPod') > 0
                  || ua.indexOf('Android') > 0) {
                    app.spFlag = true;
                }

                this.saveApp(app);
            },
            init() {
                const that = this;
                const $html = $('html');

                setTimeout(function() {
                    $html.addClass('loaded');
                    that.setSize();
                }, 100);

                setTimeout(function() {
                    that.$set('sideon', true);
                    that.loadedAnimate();
                }, 1000);

                $(window).resize(function() {
                    setTimeout(function() {
                        that.setSize();
                    }, 500);
                });
            }
        },
        ready() {
            const that = this;

            this.init();
        },
    }
</script>

<style lang="scss">
    @import "./ui/index";

    .loadmask {
        position: absolute;
        top: 0;
        left: 380px;
        z-index: 10;
        display: block;
        .body{
            position: relative;
            width: 100%;
            height: 100%;
            .dotted {
                position: absolute;
                top: -200px;
                left: 0;
                width: 100%;
                height: 200px;
                background-image: url("../../statics/img/bg-dotted.png");
                background-size: 30px;
                background-attachment: fixed;
                transition: all 1.5s;
            }
        }
    }

    .fetch{
        .loadmask .body .dotted{
            top: 120%;
        }
    }
</style>
