<template lang="jade">
    .meow
        .center
            h2 Meow!
            p
                | Seems like this page doesn't exist. But you can
                router-link(to="/") go home
                | .
            img.cat(src="../../static/img/bg-cat.jpg")
</template>

<script>
    export default {
        name: 'page404'
    };
</script>

<style lang="scss">
    @import "../stylesheets/common";

    .meow{
        position: relative;
        min-height: 100%;
        min-height: 100vh;
        height: 100%;
        height: 100vh;
        text-align: center;
        @include display-flex;
        @include align-items(center);
        @include justify-content(center);
        h2{
            position: relative;
            line-height: 1em;
            font-size: 152px;
            font-weight: bold;
            z-index: 2;
        }
        p{
            position: relative;
            padding: 0 16px;
            font-size: 16px;
            z-index: 2;
            margin-bottom: 60%;
            a{
                margin-left: 0.25em;
                color: #333;
                font-weight: bold;
                text-decoration: underline;
            }
        }
        .cat{
            position: absolute;
            bottom: 0;
            left: 50%;
            z-index: 1;
            max-width: 1187px;
            max-height: 686px;
            width: 100%;
            height: auto;
            pointer-events: none;
            @include transform(translateX(-50%));
        }
    }

    @include max-screen(640px) {
        .meow{
            h2{
                font-size: 120px;
            }
            .cat{
                bottom: 20%;
            }
        }
    }

    @include max-screen(480px) {
        .meow{
            h2{
                font-size: 88px;
            }
            .cat{
                bottom: 20%;
            }
        }
    }
</style>