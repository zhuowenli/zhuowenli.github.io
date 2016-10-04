<template lang="jade">
    footer.footer
        .container
            .footer--main
                p.footer--title Vue2.0 Start Kit!
                a.footer--link(href="https://github.com/zhuowenli/vue2-starter-kit/issues") 意见反馈
                a.footer--link(href="https://github.com/zhuowenli/vue2-starter-kit/pulls") 贡献代码
            .footer--social
                a.footer--link(href="https://github.com/zhuowenli/vue2-starter-kit")
                    i.material-icons sentiment_satisfied
</template>

<style lang="scss">
    @import "../stylesheets/common";

    .footer{
        height: 120px;
        background-color: $light-black;
        &--main{
            display: inline-block;
            font-size: 0;
            padding-top: 40px;
        }
        &--title{
            line-height: 1;
            font-size: 22px;
            margin: 0;
            color: $light-gray;
        }
        &--link{
            display: inline-block;
            margin: 12px 18px 0 0;
            line-height: 1;
            font-size: 12px;
            color: $gray;
            @include transition(color 0.1s ease-in-out);
            &:hover{
                color: #fff;
            }
        }
        &--social{
            float: right;
            line-height: 120px;
            a{
                color: $gray;
                @include transition(color 0.1s ease-in-out);
                &:hover{
                    color: #fff;
                }
            }
            .material-icons{
                font-size: 48px;
            }
        }
    }
</style>