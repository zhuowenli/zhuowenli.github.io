<template>
    <div class="frontend">
        <div class="scroll">
            <div class="mCustomScrollbar" data-mcs-theme="dark">
                <section>
                    <div class="scrollinside">
                        <div class="banner">
                            <img src="../../../statics/img/fe.png">
                        </div>

                        <div class="insidetitle table">
                            <div class="cell number">
                                <div>02</div>
                            </div>
                            <div class="cell">
                                <h1 class="pagetitle">Frontend</h1>
                                <h2>Frontend & Technology.</h2>
                            </div>
                        </div>

                        <div class="entry" v-for='item in data'>
                            <div class="bg table">
                                <div class="bgL cell"></div>
                                <div class="bgM cell"></div>
                                <div class="bgR cell"></div>
                            </div>

                            <div class="header">
                                <a v-link="'/frontend/' + item.id">
                                    <h2>{{item.title}}</h2>
                                </a>
                            </div>

                            <div class="scroll">
                                <div class="mCustomScrollbar" data-mcs-theme="dark">
                                    <div class="entrydetail">
                                        <div v-if='item.excerpt' v-html='item.excerpt'></div>
                                        <div v-else v-html="item.content | marked"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="footer">
                                <a class="entrybtn" v-link="'/frontend/' + item.id">readme more</a>
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

    const $html = $('html');

    export default {
        components: {
        },
        data () {
            return {
                data: []
            }
        },
        filters: {
            marked
        },
        ready() {
            $(".scroll").mCustomScrollbar({
                axis:"y",
                scrollInertia:100
            });
        },
        route: {
            activate(transition) {
                const that = this;
                $html.addClass('fetch');

                return PostModels
                    .getPosts(this, {
                        page: 1,
                        per_page: 30,
                        category_id: 1
                    })
                    .then(res => {
                        const {data} = res.data;

                        data.map(item => {
                            // item.content = item.content.slice(0, 200) + '...';
                            console.log(item.content)
                        });

                        return data;
                    }, res => {
                        const {data} = res.data;
                    })
                    .then(data => {
                        $html.removeClass('fetch');
                        that.$set('data', data);

                        setTimeout(function() {
                            $('.main').animate({ opacity: 1 }, 500);
                        }, 300);
                    });

                transition.next();
            },
            deactivate() {
                $('.main').animate({ opacity: 0 }, 300);
            }
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>
