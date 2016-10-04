<template lang="jade">
    #app
        main-header
        main-side-nav
        main.main
            router-view.page
</template>

<script>
    import MainHeader from './header.vue';
    import MainSideNav from './side-nav.vue';

    export default {
        components: {
            MainHeader,
            MainSideNav
        },
        data() {
            return {
                loading: false
            };
        },
        created() {
            this.init();
        },
        methods: {
            load() {
            },
            init() {
                // const that = this;
                // this.load().then(res => {});
            }
        }
    };
</script>

<style lang="scss">
    @import "../stylesheets/app.scss";
</style>
