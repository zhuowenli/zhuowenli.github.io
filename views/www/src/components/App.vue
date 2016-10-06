<template lang="jade">
    #app
        main-side-nav
        main.main
            router-view.page
</template>

<script>
    import MainSideNav from './side-nav.vue';

    export default {
        components: {
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
