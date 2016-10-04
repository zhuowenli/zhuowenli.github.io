<template lang="jade">
    header.header
</template>

<style lang="scss">
    @import "../stylesheets/common";

    .header{
        position: absolute;
        top: 0;
        left: 250px;
        right: 0;
        height: 80px;
        padding: 0 30px;
        background: $black;
        @include user-select(none);
    }
</style>