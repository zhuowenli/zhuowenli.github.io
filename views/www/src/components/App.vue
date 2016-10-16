<template lang="jade">
    #app
        main-side-nav
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
    };
</script>

<style lang="scss">
    @import "../stylesheets/app.scss";
</style>
