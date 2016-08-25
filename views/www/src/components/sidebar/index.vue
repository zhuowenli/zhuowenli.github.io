<template>
    <section class="main-sidebar">
        <side-subtitle></side-subtitle>
        <side-logo></side-logo>
        <side-nav></side-nav>
        <side-chart></side-chart>
        <side-window
            :width="app.windowWidth"
            :height="app.windowHeight">
        </side-window>
        <side-sns></side-sns>
    </section>
</template>

<script>
    import WeatherModels from '../../models/weather';
    import SideSubtitle from './subtitle.vue';
    import SideLogo from './logo.vue';
    import SideNav from './nav.vue';
    import SideChart from './chart.vue';
    import SideWindow from './window.vue';
    import SideSns from './sns.vue';

    export default {
        components: {
            SideSubtitle,
            SideLogo,
            SideNav,
            SideChart,
            SideWindow,
            SideSns
        },
        props: {
            app: Object
        }
    }
</script>

<style lang="scss">
    @import "./index";
</style>