<template lang="jade">
    .el-loading(v-if="show")
        .el-loading-content(v-loading="show")
</template>

<script>
    export default {
        name: 'el-loading',
        componentName: 'loading',
        props: {
            loading: [Boolean]
        },
        data() {
            return {
                show: this.loading
            }
        },
        watch: {
            loading(val) {
                this.show = val;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../stylesheets/common";

    .el-loading{
        &-content{
            height: 100px;
        }
        &-mask{
            background: transparent !important;
        }
        &-bubble{
            background: $blue;
        }
    }
</style>