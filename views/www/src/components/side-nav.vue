<template lang="jade">
    .side-nav
        a.btn.btn-touch(@click="handleBtnTouchClick")
            .icon.icon-round
        a.btn.btn-close(@click="handleBtnCloseClick")
            .icon.icon-close
        nav
            ul(@click="handleBtnCloseClick")
                router-link(to="/") Home
                router-link(to="/search") Search
                router-link(to="/list/frontend") Frontend
                router-link(to="/list/design") Design
                router-link(to="/list/diary") Diary
                router-link(to="/about") About
</template>

<script>
    export default {
        name: 'side-nav',
        props: {
            value: [Boolean]
        },
        data() {
            return {
                filter: this.value
            }
        },
        methods: {
            handleBtnTouchClick() {
                this.filter = !this.filter;
            },
            handleBtnCloseClick() {
                this.filter = false;
            },
        },
        watch: {
            value(val) {
                this.filter = val;
            },
            filter(val) {
                this.$emit('input', val);
            }
        }
    }
</script>

<style lang="scss">
    @import "../stylesheets/common";

    .btn-touch{
        position: fixed;
        top: 20px;
        left: 20px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        z-index: 201;
        .icon{
            display: inline-block;
            height: 24px;
            line-height: 1;
            color: #000;
            font-size: 24px;
            vertical-align: top;
            text-shadow: 0 0 1px #fff;
        }
    }

    .side-nav{
        z-index: 200;
        .btn-close, nav{
            display: none;
        }
    }

    .filter{
        .side-nav{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(#fff, 0.5);
            .btn-close{
                @extend .btn-touch;
                display: block;
                position: absolute;
                right: 20px;
                left: auto;
            }
            nav{
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                display: block;
                height: 60%;
                width: 100%;
                font-size: 48px;
                min-height: 7.2em;
                text-align: center;
                @include transform(translateY(-50%));
                @include perspective(1200px);
                ul{
                    display: inline-block;
                    margin: 0 auto;
                    height: 100%;
                    a{
                        display: block;
                        height: (100% / 6);
                        height: -webkit-cale(100% / 6);
                        height: cale(100% / 6);
                        min-height: 1.2em;
                        line-height: 1.2em;
                        color: #000;
                        cursor: pointer;
                        // @include transition(all .2s ease);
                        &:hover{
                            opacity: 0.5;
                        }
                    }
                }
            }
        }
    }

    @include max-screen-height(640px) {
        .filter .side-nav nav{
            height: 70%;
            font-size: 40px;
        }
    };
</style>