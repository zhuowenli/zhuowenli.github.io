<template lang="jade">
    .list
        .post-lists(v-if="!loading")
            .cover
                img(src="../../../statics/img/bg-design.png")
            section(v-for="post in posts")
                .post-lists__meta--top
                    .post-lists__number p{{post.id}}
                    h2.post-lists__title
                        router-link(:to="'/detail/' + post.id") {{post.title}}
                .post-lists__content.article
                    figure.images(v-if="post.images.length")
                        router-link.btn(:to="'/detail/' + post.id")
                            img(v-for="image in post.images" v-bind:src="image.url + '?imageView2/1/w/1000/h/600'")
                    .content(v-html="post.excerpt" v-if="post.excerpt")
                .post-lists__meta--bottom
                    p.more
                        router-link(:to="'/detail/' + post.id") Read More
                    p
                        like-counter(v-bind:id="post.id" v-model="post.like_count")
        loading(v-else)
</template>

<script>
    import mojs from 'mo-js';
    import marked from 'marked';
    import hljs from '../../../statics/js/highlight.js';
    import { fetchPostLists } from '../../models/posts';

    export default {
        name: 'list',
        data() {
            return {
                loading: false,
                posts: [],
                query: {
                    page: 1,
                    per_page: 30,
                    order_by: 'release_at'
                }
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            load() {
                return fetchPostLists(this.query).then(res => res.data);
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