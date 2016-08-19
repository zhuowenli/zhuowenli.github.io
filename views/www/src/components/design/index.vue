<template>
    <div class="design">
        <div class="scroll">
            <div class="mCustomScrollbar" data-mcs-theme="dark">
                <section>
                    <div class="scrollinside">
                        <div class="insidetitle table">
                            <div class="cell number">
                                <div>03</div>
                            </div>
                            <div class="cell">
                                <h1 class="pagetitle">DESIGN</h1>
                                <h2>Web Design.</h2>
                            </div>
                        </div>

                        <div class="entry" v-for='item in data'>
                            <div class="bg table">
                                <div class="bgL cell"></div>
                                <div class="bgM cell"></div>
                                <div class="bgR cell"></div>
                            </div>

                            <div class="header">
                                <a v-link="'/design/' + item.id">
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
                                <a class="entrybtn" v-link="'/design/' + item.id">readme more</a>
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
                scrollInertia:100,
                callbacks: {
                    whileScrolling() {
                    }
                }
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
                        category_id: 2
                    })
                    .then(res => {
                        const {data} = res.data;

                        $html.removeClass('fetch');
                        that.$set('data', data);

                        setTimeout(function() {
                            $('.main').animate({ opacity: 1 }, 500);
                        }, 300);
                    }, res => {
                        const {data} = res.data;
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
