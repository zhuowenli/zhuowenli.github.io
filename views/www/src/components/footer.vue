<template lang="jade">
    footer.footer
        .container
            nav.footer-menu
                h4 分类
                ul
                    router-link(to="/frontend") 前端开发
                    router-link(to="/design") 设计网摘
                    router-link(to="/diary") 生活日志
            nav.footer-menu
                h4 关于
                ul
                    router-link(to="/about") 关于作者
                    router-link(to="/content") 联系作者
                    a(target="_blank" href="https://github.com/zhuowenli/") GitHub Profile
            nav.footer-menu
                h4 源码 (欢迎Star)
                ul
                    a(target="_blank" href="https://github.com/zhuowenli/zhuowenli.github.io") Star & Fork
                    a(target="_blank" href="https://github.com/zhuowenli/zhuowenli.github.io/issues") Pull requests
                    a(target="_blank" href="https://github.com/zhuowenli/zhuowenli.github.io/pulls") Issus
            router-link.footer-logo(to="/")
        .footer-social
            a(target="_blank" href="https://github.com/zhuowenli/zhuowenli.github.io")
                i.icon.icon-github
            a(target="_blank" href="https://www.zhihu.com/people/zhuowenli")
                i.icon.icon-zhihu
            a
                i.icon.icon-wechat
        p.copyright
            | © 2016 | site by
            router-link(to="/") 卓文理
</template>

<style lang="scss">
    @import "../stylesheets/common";

    .footer{
        position: relative;
        margin-top: 300px;
        padding-top: 60px;
        padding-bottom: 60px;
        background: #252525;
        &:before{
            content: '';
            position: absolute;
            top: -300px;
            right: 0;
            left: 0;
            height: 305px;
            width: 100%;
            background: transparent url('../../static/img/footerbar.png') center top no-repeat;
            background-size: cover;
        }
        .container{
            position: relative;
            width: 100%;
            max-width: 1000px;
            margin: 0 auto 30px;
            background: #252525;
            @include display-flex;
        }
        &-menu{
            @include flex(1);
            h4{
                padding-bottom: 10px;
                color: #fff;
                font-size: 15px;
                font-weight: bold;
            }
            a{
                display: block;
                line-height: 2;
                font-size: 14px;
                color: #999;
                @include transition(all 0.1s ease-in-out);
                &:hover, &:active{
                    color: #fff;
                }
            }
        }
        &-logo{
            display: inline-block;
            width: 250px;
            height: 60px;
            background: transparent url('../../static/img/logo-gray.png') center 0 no-repeat;
            background-size: 161px 60px;
        }
        &-social{
            text-align: center;
            font-size: 0;
            margin-bottom: 20px;
            a{
                display: inline-block;
                width: 48px;
                height: 48px;
                line-height: 48px;
                text-align: center;
                color: #fff;
                cursor: pointer;
                @include border-radius(48px);
                &:hover{
                    opacity: .8;
                }
                .icon{
                    font-size: 24px;
                }
            }
        }
        .copyright{
            text-align: center;
            color: #666;
            font-size: 12px;
            a{
                padding-left: 3px;
                color: #999;
                font-style: italic;
            }
        }
    }
</style>