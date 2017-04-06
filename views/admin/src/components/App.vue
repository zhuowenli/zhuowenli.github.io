<template lang="jade">
    #app
        main-aside
        main.main
            router-view.container
</template>

<script>
    import MainAside from './aside.vue';

    export default {
        components: {
            MainAside
        }
    };
</script>

<style lang="scss">
    @import "../stylesheets/app.scss";
</style>
