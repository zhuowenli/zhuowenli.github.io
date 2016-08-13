<template>
    <audio id="bgm" :autobuffer="autobuffer" :autoloop="autoloop" :loop="loop"><source src="/statics/media/black.mp3"></audio>
</template>

<script>
    export default {
        props: {
            loop: Boolean,
            autoloop: Boolean,
            autobuffer: Boolean,
            play: String
        },
        data() {
            return {}
        },
    }
</script>