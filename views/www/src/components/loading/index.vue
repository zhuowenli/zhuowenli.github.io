<template lang="pug">
    .loader
</template>

<script>

    export default {
        name: 'loading',
        props: {
            show: Boolean
        }
    }
</script>

<style lang="scss">
    .loader{
        width: 100%;
        height: 600px;
        background: #fff url('../../../static/img/loader.gif') center center no-repeat;
        background-size: 800px auto;
    }
</style>