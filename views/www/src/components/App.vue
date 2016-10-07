<template lang="jade">
    #app
        main-side-nav
        main.main
            router-view.page
        main-footer
</template>

<script>
    import MainSideNav from './side-nav.vue';
    import MainFooter from './footer.vue';

    export default {
        components: {
            MainSideNav,
            MainFooter
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
