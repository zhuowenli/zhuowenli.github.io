<template>
    <div class="container" v-el:$container>
        <section-sidebar
            :hide="hide">
        </section-sidebar>

        <section class="main-content">
            <router-view
                transition="app"
                transition-mode="out-in"
                keep-alive>
            </router-view>
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
            }
        },
        events: {
        },
        ready() {
            const that = this;

            const $html = document.getElementsByTagName('html')[0];
            const $container = that.$els.$container;

            setTimeout(function() {
                $html.classList.add('loaded');
            }, 100);

            setTimeout(function() {
                that.$set('sideon', true);
                loadedAnimate();
            }, 1200);

            function loadedAnimate() {

                $container.classList.add('hideprogress');

                setTimeout(function() {
                    $container.classList.add('showborder', 'hideexpand', 'showsidebar');

                    setTimeout(function() {
                        $container.classList.add('hideborder');
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
        },
    }
</script>

<style lang="scss">
    @import "./ui/index";
</style>
