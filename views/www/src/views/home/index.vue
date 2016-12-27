<template lang="jade">
    .home
        .home-index(:style="{opacity: opacity}")
            .home-index__about
                router-link(to="/about") 关于作者
            .home-index__text
                .logo
                    .lines
                    p 前端开发
            .home-index__bg
                video(autoplay playsinline webkit-playsinline muted ref="video")
                    source(src="http://zhuowenli.qiniudn.com/video/bg.mp4" type="video/mp4")
                canvas(ref="canvas")
            .home-index__bottom
                .lines
                a(@click="handleNewClick") 最新文章
        .post-lists(v-if="posts.length")
            section(v-for="post in posts")
                .post-lists__meta--top
                    .post-lists__number p{{post.id}}
                    h2.post-lists__title
                        router-link(:to="'/detail/' + post.id") {{post.title}}
                .post-lists__content.article
                    figure.images(v-if="post.images.length")
                        router-link.btn(:to="'/detail/' + post.id")
                            img(v-for="image in post.images" v-bind:src="image.url")
                    .content(v-html="post.excerpt" v-if="post.excerpt")
                .post-lists__meta--bottom
                    p.more
                        router-link(:to="'/detail/' + post.id") 阅读原文
                    p.like-counter
                        like-counter(v-bind:id="post.id" v-model="post.like_count")
</template>

<script>
    import marked from 'marked';
    import hljs from '../../../static/js/highlight.js';
    import { fetchPostLists } from '../../models/posts';

    export default {
        name: 'home',
        mounted() {
            this.init();
        },
        data() {
            return {
                checked: false,
                query: {
                    page: 1,
                    per_page: 10
                },
                posts: [],
                opacity: 1
            };
        },
        methods: {
            load() {
                return fetchPostLists(this.query).then(res => res.data);
            },
            init(){
                const { video } = this.$refs;
                const $video = $(video);
                const height = $(window).height();

                this.load().then(data => (this.posts = data));

                $video.on('canplaythrough', () => {
                    video.play();
                    this.draw();
                });

                setTimeout(() => (this.stop = true), 1.2e4);

                $(window).on('scroll', () => {
                    const scrollTop = $('body').scrollTop();
                    this.opacity = scrollTop > height + 200 ? 0 : 1;
                });
                $(window).on('resize', () => {
                    if (this.stop) {
                        this.draw()
                    };
                });
            },
            draw() {
                const { video, canvas } = this.$refs;

                if (!canvas) return;

                const ctx = canvas.getContext('2d');

                const $canvas = $(canvas);

                const videoWidth = 1280;
                const videoHeight = 720;
                const { availWidth, availHeight } = window.screen;

                let height = $canvas.height();
                let width = height * videoWidth / videoHeight;

                if (width > availWidth * 2) {
                    width = availWidth * 2;
                    height = width / videoWidth * videoHeight;
                }

                if (availWidth > videoWidth) {
                    $canvas.css({ left: 'auto', right: '-200px' });
                } else {
                    $canvas.css({ left: '0', right: 'auto' });
                }

                $canvas.css('width', width);

                canvas.width = width;
                canvas.height = height;

                const minWidth = Math.min(width, videoWidth);
                const minHeight = Math.min(height, videoHeight);
                const scrollTop = (minHeight - height) / -2 < 0 ? (minHeight - height) / -2 : 0;
                const scrollLeft = (minWidth - width) / -2;

                ctx.drawImage(video, scrollLeft, scrollTop, minWidth, minHeight);

                if (this.stop) return;

                window.requestAnimationFrame(this.draw);
            },
            handleNewClick() {
                const height = $('.home-index').height();

                $("html, body").stop().animate({ scrollTop: height }, '500', 'swing');
            },
            handleTopAction() {
                $("html, body").stop().animate({ scrollTop: 0 }, '500', 'swing');
            },
        }
    };
</script>

<style lang="scss">
    @import "./index.scss";
</style>