<template>
    <div class="container">
        <section-sidebar
            :hide="hide">
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

    export default {
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
        ready() {
            const that = this;

            const $html = $('html');
            const $container = $('.container');

            setTimeout(function() {
                $html.addClass('loaded');
            }, 100);

            setTimeout(function() {
                that.$set('sideon', true);
                loadedAnimate();
            }, 1000);

            function loadedAnimate() {

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
            }

            const $wW = $('.wW');
            const $wH = $('.wH');
            const $loadmask = $('.loadmask');
            const $sidebar = $('.main-sidebar');
            const $right = $('.main-right');
            const $main = $('.main');

            setSize();

            function setSize(){
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;
                const leftWidth = $sidebar.width() + 80;
                const rightWidth = $right.width() + 80;
                const subpageWidth = $container.width() - leftWidth;

                $wW.text(windowWidth);
                $wH.text(windowHeight);

                $loadmask.css({
                    'width': subpageWidth,
                    'height': windowHeight
                });
                $main.css({
                    'width': subpageWidth,
                    'height': windowHeight
                });
            }

            $(window).resize(function() {
                setTimeout(function() {
                    setSize();
                }, 500);
            });
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
