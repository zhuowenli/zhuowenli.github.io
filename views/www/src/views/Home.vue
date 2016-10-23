<template lang="jade">
    .home
        .home-index(:style="{opacity: opacity}")
            .home-index__menu
                a.icon-list
            .home-index__about
                router-link(to="/about") 关于作者
            .home-index__text
                .logo
                    .lines
                    p 前端开发
            .home-index__bg
                video(autoplay webkit-playsinline autobuffer ref="video")
                    source(src="http://zhuowenli.qiniudn.com/video/bg.mp4" type="video/mp4")
            .home-index__bottom
                .lines
                a(@click="handleNewClick") 最新文章
        .home-new(v-if="posts.length")
            section(v-for="post in posts")
                .home-new__meta--top
                    .home-new__number p{{post.id}}
                    h2.home-new__title
                        router-link(:to="'/' + post.category.title + '/' + post.id") {{post.title}}
                .home-new__content.article
                    figure.images(v-if="post.images.length")
                        router-link(:to="'/' + post.category.title + '/' + post.id")
                            img(v-for="image in post.images" v-bind:src="image.url")
                    .content(v-html="post.excerpt" v-if="post.excerpt")
                    .content(v-html="post.content" v-else)
                .home-new__meta--bottom
                    p.more
                        router-link(:to="'/' + post.category.title + '/' + post.id") Read More
                    p.like-counter
                        like-counter(v-bind:id="post.id" v-model="post.like_count")
</template>

<script>
    import marked from 'marked';
    import hljs from '../../static/js/highlight.js';
    import { fetchPostLists } from '../models/posts';

    export default {
        name: 'home',
        mounted() {
            this.init();

            const height = $(window).height();

            $(window).on('scroll', () => {
                const scrollTop = $('body').scrollTop();

                if (scrollTop > height + 200) {
                    this.opacity = 0;
                } else {
                    this.opacity = 1;
                }
            });
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
                return fetchPostLists(this.query).then(res => {
                    const { data } = res;

                    data.map(item => {
                        item.excerpt = this.markdown(item.excerpt);
                        item.content = this.markdown(item.content);
                    });

                    return data;
                });
            },
            init(){
                const $video = this.$refs.video;
                $video.play();

                this.load().then(data => (this.posts = data));
            },
            markdown(val) {
                if (!val) return '';

                marked.setOptions({
                    highlight(code) {
                        return hljs.highlightAuto(code).value;
                    }
                });

                return marked(val, { sanitize: true })
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