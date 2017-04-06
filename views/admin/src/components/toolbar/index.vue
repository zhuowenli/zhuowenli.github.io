<template lang="pug">
    .el-toolbar(:class="{pointing: pointing}")
        .title(v-if="meta.title") {{meta.title}}
        el-form()
            slot
</template>

<script>
    export default {
        name: 'el-toolbar',
        componentName: 'toolbar',
        props: {
            pointing: {
                default: false,
                type: Boolean
            }
        },
        data() {
            return {
                meta: this.$route.meta
            }
        }
    };
</script>

<style lang="scss">
    @import "../../stylesheets/common";

    .el-toolbar{
        height: 40px;
        margin-bottom: 24px;
        @include display-flex;
        .title{
            line-height: 40px;
            font-size: 22px;
            @include flex(1);
        }
        .el-form{
            width: auto;
            @include display-flex;
            &-item{
                margin-bottom: 0;
                margin-left: 20px;
                @include flex(1);
                @include display-flex;
                &__label{
                    white-space: nowrap;
                }
                &__content{
                    white-space: nowrap;
                    @include flex(1);
                }
            }
        }
    }
</style>