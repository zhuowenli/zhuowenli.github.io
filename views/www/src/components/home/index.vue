<template>
    <div class="home">
        <div class="main-center" :style='{width: app.centerWidth + "px"}'>
            <div class="background">
                <video id='SceneVideo' loop="loop" controls='controls'>
                    <source src="http://zhuowenli.qiniudn.com/video/scene.mp4" type="video/mp4" />
                </video>
                <canvas id="SceneCanvas" :style='{
                        marginLeft: (app.centerWidth - 960) / 2 + "px",
                        marginTop: (app.centerHeight - 960) / 2 + "px"}'></canvas>
            </div>
        </div>
        <div class="main-right"></div>
        <div class="main-graph">
            <canvas class="graphic circle"></canvas>
        </div>
    </div>
</template>

<script>
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
                const $center = $('.main-center');
                const $graph  = $('.main-graph');

                setTimeout(function() {
                    $('.main').css('opacity', 1);
                }, 2000);

                this.video();
            },
            video() {
                const that = this;
                const $video = document.getElementById('SceneVideo');
                const $canvas = document.getElementById('SceneCanvas');
                const ctx = $canvas.getContext('2d');

                const width = 960;
                const height = 960;

                $video.play();

                $canvas.width = width;
                $canvas.height = height;

                function draw() {
                    const ww = that.app.windowWidth * that.app.windowWidth / 1920 * 1.25;
                    const wh = ww / 1920 * 1080;
                    const hh = that.app.windowHeight * that.app.windowHeight / 1080 * 1.25;
                    const hw = hh * 1920 / 1080;

                    const videoWidth = Math.min(ww, hw);
                    const videoHeight = Math.min(hh, wh);

                    ctx.drawImage($video, ((videoWidth - width) / -2), ((videoHeight - height) / -2), videoWidth, videoHeight);

                    window.requestAnimationFrame(draw)
                }

                draw();
            }
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>
