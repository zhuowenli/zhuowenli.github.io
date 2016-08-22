<template>
    <div class="design">
        <div class="scroll">
            <div class="mCustomScrollbar" data-mcs-theme="dark">
                <section>
                    <div class="scrollinside">
                        <div class="banner" v-if='post && post.src'>
                            <img :src="post.src">
                        </div>

                        <div class="insidetitle table" v-if='post && post.id'>
                            <div class="cell number">
                                <div>0{{post.id}}</div>
                            </div>
                            <div class="cell">
                                <h1 class="pagetitle">{{post.title}}</h1>
                                <h2>{{post.sub_title}}</h2>
                            </div>
                        </div>

                        <div class="entry" v-for='item in data'>
                            <div class="bg table">
                                <div class="bgL cell"></div>
                                <div class="bgM cell"></div>
                                <div class="bgR cell"></div>
                            </div>

                            <div class="header">
                                <a v-link="'/' + type + '/' + item.id">
                                    <h2>{{item.title}}</h2>
                                </a>
                            </div>

                            <div class="scroll">
                                <div class="mCustomScrollbar" data-mcs-theme="dark">
                                    <div class="table entrydetail">
                                        <div v-html="item.content | marked"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="footer">
                                <a class="entrybtn" v-link="'/' + type + '/' + item.id">readme more</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import PostModels from '../../models/post/';
    import marked from 'marked';
    import Promise from 'bluebird';

    const $html = $('html');
    const POSTS = {
        frontend: {
            id: 1,
            title: 'Frontend',
            sub_title: 'Frontend & Technology.',
            src: '/statics/img/fe.png'
        },
        design: {
            id: 2,
            title: 'design',
            sub_title: 'Web Design.'
        },
        diary: {
            id: 3,
            title: 'diary',
            sub_title: 'Something With My Life.'
        },
    }

    export default {
        components: {
        },
        data () {
            return {
                data: [],
                post: {},
                type: ''
            }
        },
        filters: {
            marked
        },
        route: {
            activate(transition) {

                this.init();

                transition.next();
            },
            deactivate() {
                $('.main').animate({ opacity: 0 }, 300);
            },
            canReuse: false
        },
        methods: {
            load(category_id) {
                return PostModels.getPosts(this, {
                    page: 1,
                    per_page: 30,
                    category_id
                });
            },
            init() {
                const that = this;
                const {type} = this.$route.params;
                const post = POSTS[type];

                $html.addClass('fetch');

                this.$set('post', post);
                this.$set('type', type);

                this.load(post.id)
                    .then(res => {
                        const {data} = res.data;

                        data.map(item => {
                            item.content = item.content.replace('{{ site.BASE_PATH }}', 'http://zhuowenli.qiniudn.com');
                        });

                        return data;
                    })
                    .then(data => {
                        $html.removeClass('fetch');

                        that.$set('data', data);

                        setTimeout(function() {
                            $(".scroll").mCustomScrollbar({
                                axis:"y",
                                scrollInertia:100
                            });
                            $('.main').animate({ opacity: 1 }, 500);
                        }, 300);
                    });
            }
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>