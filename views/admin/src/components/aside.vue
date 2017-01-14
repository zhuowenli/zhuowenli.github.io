<template lang="pug">
    .aside
        .logo
            router-link(to="/posts/") 博客 · 后台
        el-menu(mode="vertical" default-active="/posts" router="router")
            el-menu-item(index="/posts/create")
                i.el-icon-edit
                | 写文章
            el-menu-item(index="/posts")
                i.el-icon-document
                | 文章管理
            el-menu-item(index="/tags")
                i.el-icon-star-on
                | 标签管理
            el-menu-item(index="/categorys")
                i.el-icon-star-on
                | 分类管理
            el-menu-item(index="/tuchuang")
                i.el-icon-picture
                | 图床
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

    .aside{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 240px;
        background: #fff;
        overflow: auto;
        .logo{
            display: inline-block;
            text-align: center;
            width: 100%;
            line-height: 70px;
            font-size: 20px;
            font-weight: 400;
            text-align: center;
            a{
                display: block;
                color: $blue;
            }
        }
        .el-menu{
            color: $light-black2;
            &-item{
                height: 50px;
                line-height: 50px;
                background: #fff;
                border-left: 2px solid  #fff;
                &.is-active{
                    background: $dark-white;
                    border-color: $blue;
                }
                &:hover{
                    border-color: $blue;
                }
            }
        }
    }
</style>