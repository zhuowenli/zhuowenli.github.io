<template>
    <div class="home">
        <div class="main-center"></div>
        <div class="main-right"></div>
        <div class="main-graph">
            <canvas class="graphic circle"></canvas>
        </div>
    </div>
</template>

<script>
    import {setSize2D} from "./init2d.js";
    import {render2D} from "./draw2d.js";
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
            const that = this;

            setTimeout(function() {
                that.init();
            }, 100);
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
                    setSize2D(app).then(() => {
                        render2D(app);
                    });
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
