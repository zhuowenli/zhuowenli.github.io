<template>
    <div class="home">
        <div class="main-center"></div>
        <div class="main-right"></div>
        <div class="main-graph">
            <div class="hide">
                <div class="shadowbg"></div>
                <div class="shadow"></div>
                <div class="backgroundWrap">
                    <canvas class="background"></canvas>
                </div>
            </div>
            <div class="graphicmask table">
                <div class="cell">
                    <svg viewBox="0 0 681 681">
                        <path class="st0" style="stroke-dashoffset: 2136.623046875px; stroke-dasharray: 2136.623046875px;" d="M340.5,0.5c187.8,0,340,152.2,340,340s-152.2,340-340,340s-340-152.2-340-340S152.7,0.5,340.5,0.5"/>
                    </svg>
                </div>
            </div>
            <canvas class="graphic circle"></canvas>
        </div>
    </div>
</template>

<script>
    import {setSize2D, loadPageview} from "./init2d.js";

    const $html = $('html');

    export default {
        components: {
        },
        data () {
            return {
            }
        },
        ready() {
            this.init();
        },
        route: {
            activate(transition) {
                transition.next();
            },
            deactivate() {
                $('.main').css('opacity', 0);
            }
        },
        methods: {
            setSize() {
                const $container = $('.container');
                const $left   = $('.main-sidebar');
                const $right  = $('.main-right');
                const $center = $('.main-center');
                const $graph  = $('.main-graph');

                const leftWidth = $left.width() + 80;
                const rightWidth = $right.width() + 80;

                const centerWidth = $container.width() - leftWidth - rightWidth - 20;

                $center.css({width: centerWidth});
                $graph.css({width: centerWidth});

                this.centerWidth = centerWidth;
            },
            init() {

                this.setSize();

                setTimeout(function() {
                    // loadPageview();
                    setSize2D(this.centerWidth);
                }, 1000);

                setTimeout(function() {
                    $('.main').css('opacity', 1);
                }, 2000);
            }
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>
