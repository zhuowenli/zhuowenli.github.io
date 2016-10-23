<template lang="jade">
    .list
        .post-lists(v-if="!loading")
            .cover
                img(src="../../../static/img/bg-design.png")
            section(v-for="post in posts")
                .post-lists__meta--top
                    .post-lists__number p{{post.id}}
                    h2.post-lists__title
                        router-link(:to="'/' + post.category.title + '/' + post.id") {{post.title}}
                .post-lists__content.article
                    figure.images(v-if="post.images.length")
                        router-link(:to="'/' + post.category.title + '/' + post.id")
                            img(v-for="image in post.images" v-bind:src="image.url")
                    .content(v-html="post.excerpt" v-if="post.excerpt")
                    .content(v-html="post.content" v-else)
                .post-lists__meta--bottom
                    p.more
                        router-link(:to="'/' + post.category.title + '/' + post.id") Read More
                    p
                        like-counter(v-bind:id="post.id" v-model="post.like_count")
</template>

<script>
    import mojs from 'mo-js';
    import marked from 'marked';
    import hljs from '../../../static/js/highlight.js';
    import { fetchPostLists } from '../../models/posts';

    export default {
        name: 'list',
        data() {
            return {
                loading: false,
                posts: [],
                query: {
                    page: 1,
                    per_page: 30
                }
            };
        },
        mounted() {
            this.init();
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
            init() {
                const {type} = this.$route.params;

                this.handleTopAction();
                this.query.type = type;
                this.loading = true;
                this.load().then(data => {
                    this.posts = data;
                    this.loading = false;
                });
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
            Animocon() {
                const $buttons = document.querySelectorAll('.btn-like');
                const $likes = document.querySelectorAll('.icon-like-fill');
                const timelines = {};

                $buttons.forEach(($button, i) => {
                    const $like = $likes[i];
                    const { dataset } = $button;
                    const likeTweens = [
                        // ring animation
                        new mojs.Shape({
                            parent: $button,
                            duration: 750,
                            type: 'circle',
                            radius: {0: 40},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {35:0},
                            opacity: 0.2,
                            top: '45%',
                            easing: mojs.easing.bezier(0, 1, 0.5, 1)
                        }),
                        new mojs.Shape({
                            parent: $button,
                            duration: 500,
                            delay: 100,
                            type: 'circle',
                            radius: {0: 20},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.2,
                            x : 40,
                            y : -60,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Shape({
                            parent: $button,
                            duration: 500,
                            delay: 180,
                            type: 'circle',
                            radius: {0: 10},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.5,
                            x: -10,
                            y: -80,
                            isRunLess: true,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Shape({
                            parent: $button,
                            duration: 800,
                            delay: 240,
                            type: 'circle',
                            radius: {0: 20},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.3,
                            x: -70,
                            y: -10,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Shape({
                            parent: $button,
                            duration: 800,
                            delay: 240,
                            type: 'circle',
                            radius: {0: 20},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.4,
                            x: 80,
                            y: -50,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Shape({
                            parent: $button,
                            duration: 1000,
                            delay: 300,
                            type: 'circle',
                            radius: {0: 15},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.2,
                            x: 20,
                            y: -100,
                            easing: mojs.easing.sin.out
                        }),
                        new mojs.Shape({
                            parent: $button,
                            duration: 600,
                            delay: 330,
                            type: 'circle',
                            radius: {0: 25},
                            fill: 'transparent',
                            stroke: '#F35186',
                            strokeWidth: {5:0},
                            opacity: 0.4,
                            x: -40,
                            y: -90,
                            easing: mojs.easing.sin.out
                        }),
                        // icon scale animation
                        new mojs.Tween({
                            duration : 1200,
                            easing: mojs.easing.ease.out,
                            onUpdate: function(progress) {
                                if(progress > 0.3) {
                                    const elasticOutProgress = mojs.easing.elastic.out(1.43 * progress - 0.43);

                                    $like.style.WebkitTransform = $like.style.transform = `scale3d(${elasticOutProgress},${elasticOutProgress},1)`;
                                } else {
                                    $like.style.WebkitTransform = $like.style.transform = 'scale3d(0,0,1)';
                                }
                            }
                        })
                    ];

                    timelines[i] = new mojs.Timeline();
                    dataset.checked = dataset.checked || 0;

                    for(let j = 0, len = likeTweens.length; j < len; j += 1) {
                        timelines[i].add(likeTweens[j]);
                    }

                    $button.addEventListener('click', () => {
                        if (Number(dataset.checked)) {
                            $button.style.color = '#C0C1C3';
                        } else {
                            $button.style.color = '#F35186';
                            timelines[i].replay();
                        }

                        dataset.checked = Number(dataset.checked) ? 0 : 1;
                    });
                });
            },
            handleTopAction() {
                $("html, body").stop().animate({ scrollTop: 0 }, '500', 'swing');
            },
        },
        watch: {
            '$route': 'init'
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>