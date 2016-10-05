<template lang="jade">
    .side-nav
        router-link.logo(to="/posts/") 博客后台
        router-link.create(to="/posts/add")
            i.material-icons create
            | 写文章
        el-menu(mode="vertical" router=true)
            el-menu-item-group(title="MAIN")
                el-menu-item(index="/posts")
                    i.material-icons text_fields
                    | 文章管理
                el-menu-item(index="/tags")
                    i.material-icons local_offer
                    | 标签管理
                el-menu-item(index="/categorys")
                    i.material-icons apps
                    | 分类管理
</template>

<script>
    export default {
        name: 'side-nav',
        data() {
            return {
            }
        },
        created() {
        }
    }
</script>

<style lang="scss">
    @import "../stylesheets/common";

    .side-nav{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 250px;
        @include user-select(none);
        background: $black;
        .logo{
            padding-left: 30px;
            line-height: 80px;
            font-size: 24px;
            font-weight: 400;
            color: #fff;
        }
        .create{
            display: block;
            width: 100%;
            height: 80px;
            padding: 28px 38px 28px 28px;
            line-height: 1;
            text-align: center;
            font-size: 24px;
            background: $green;
            color: #fff;
            i{
                vertical-align: top
            }
        }
        .el-menu{
            background: transparent;
            &-item-group{
                padding-left: 10px;
                &__title{
                    height: 40px;
                    line-height: 40px;
                    padding: 0;
                    color: $silver;
                    font-size: 12px;
                }
            }
            &-item{
                height: 40px;
                line-height: 40px;
                color: $gray;
                @include transition(color 0.1s ease-in-out);
                &.is-active, &:hover{
                    color: #fff;
                    font-weight: bold;
                    background: transparent;
                }
            }
        }
    }
</style>