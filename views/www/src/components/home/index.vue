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
    import {getApp} from '../../vuex/getters.js';
    import {saveApp} from '../../vuex/actions.js';

    const $html = $('html');

    export default {
        vuex: {
            getters: {
                app: getApp
            },
            actions: {
                saveApp,
            }
        },
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
            init() {
                const that = this;
                const app = Object.assign({}, this.app);
                const $center = $('.main-center');
                const $graph  = $('.main-graph');

                $center.css({width: app.centerWidth});
                $graph.css({width: app.centerWidth});

                setTimeout(function() {
                    // loadPageview();
                    setSize2D(that);
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
