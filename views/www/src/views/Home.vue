<template lang="jade">
    .home
        .home-index
            .home-index__about
                router-link(to="/about") 关于作者
            .home-index__text
                .logo
                    .lines
                    p 前端开发
            .home-index__bg
                video(autoplay webkit-playsinline autobuffer ref="video")
                    source(src="http://zhuowenli.qiniudn.com/video/bg.mp4" type="video/mp4")
</template>

<script>
    export default {
        name: 'home',
        mounted() {
            const $video = this.$refs.video;

           $video.play();
        }
    };
</script>