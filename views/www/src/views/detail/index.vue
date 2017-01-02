<template lang="jade">
    .detail(:class="{trundle: trundle}")
        header.header(v-if="!loading")
            .header-bg(
                v-if="post.images.length"
                v-bind:style="'background-image: url(' + post.images[0].url + ')'"
            )
            .header-title
                h1 {{post.title}}
                p.subline(v-if="post.subline") {{post.subline}}
                p
                    | by
                    strong {{post.user.username}}
                    | - Posted in
                    strong
                        router-link(:to="'/list/' + post.category.title") {{post.category.name}}
                    | - Writed on
                    strong {{post.release_at | date}}
                p Views: {{post.view_count}} - Likes: {{post.like_count}}

        article.content(v-if="!loading")
            .article
                .excerpt(v-if="post.excerpt" v-html="post.excerpt")
                div(v-html="post.content")
                .like-counter
                    like-counter(v-bind:id="post.id" v-model="post.like_count")
            .comments
                .ds-thread(v-bind:data-thread-key="post.id" v-bind:data-title="post.title" v-bind:data-url="location.origin + location.pathname")
</template>

<script>
    import marked from 'marked';
    import hljs from '../../../static/js/highlight.js';
    import { fetchPostItem } from '../../models/posts';

    export default {
        name: 'detail',
        data() {
            return {
                post: null,
                id: null,
                loading: true,
                trundle: false,
                location: window.location
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            load() {
                const {id} = this.$route.params;

                return fetchPostItem(id).then(res => {
                    const {data} = res;

                    data.content = data.content.replace(/{{(\s*)site.qiniu(\s*)}}/g, 'http://zhuowenli.qiniudn.com');
                    data.content = this.markdown(data.content);
                    data.excerpt = this.markdown(data.excerpt);

                    return data;
                });
            },
            loadComments() {
                const duoshuoQuery = {short_name:"zhuowenli"};
                const ds = document.createElement('script');
                ds.type = 'text/javascript';ds.async = true;
                ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
                ds.charset = 'UTF-8';

                window.duoshuoQuery = duoshuoQuery;
                $('body').append($(ds));
            },
            init() {
                this.handleTopAction(0);
                this.loading = true;

                this.load().then(data => {
                    this.post = data;
                    this.loading = false;
                    this.bindScrollEvent();
                    this.loadComments();
                });
            },
            markdown(val) {
                if (!val) return '';

                marked.setOptions({
                    highlight(code) {
                        return hljs.highlightAuto(code).value;
                    }
                });

                return marked(val)
            },
            bindScrollEvent() {
                $(window).on('scroll', () => {
                    const scrollTop = $('body').scrollTop();

                    if (scrollTop > 1) {
                        this.trundle = true;
                    } else {
                        this.trundle = false;
                    }
                });
            },
            handleTopAction(time) {
                if (time) {
                    $("html, body").stop().animate({ scrollTop: 0 }, time, 'swing');
                } else {
                    $("html, body").scrollTop(0);
                }
            }
        },
        watch: {
            $route: 'init'
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>
