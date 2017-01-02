<template lang="jade">
    #app(:class="{filter: filter}")
        main-side-nav(v-model="filter")
        main.main
            transition(name="fade" mode="out-in")
                router-view.page
        main-footer
</template>

<script>
    import MainSideNav from './side-nav.vue';
    import MainFooter from './footer.vue';

    export default {
        components: {
            MainSideNav,
            MainFooter,
        },
        data() {
            return {
                filter: false
            }
        },
        mounted() {
            this.loadComments();
        },
        methods: {
            loadComments() {
                const duoshuoQuery = {short_name:"zhuowenli"};
                const ds = document.createElement('script');
                ds.type = 'text/javascript';ds.async = true;
                ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
                ds.charset = 'UTF-8';

                window.duoshuoQuery = duoshuoQuery;
                $('body').append($(ds));
            },
        }
    };
</script>

<style lang="scss">
    @import "../stylesheets/app.scss";

    .filter{
        .main, .footer{
            @include filter(blur(12px));
            @include transition(all 0.5s ease);
        }
    }
</style>
