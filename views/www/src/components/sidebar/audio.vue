<template>
    <div class="side-audio">
        <div class="audio-status"><span class="now">-</span><span>/</span><span class="max">-</span></div>
        <div class="audio-btn"><svg viewBox="0 0 7 8.1"><polygon points="0,0 7,4 0,8.1 "/></svg></div>
        <hr></hr>
        <canvas class="audio-visual"></canvas>
        <audio class="audio-bgm" autobuffer autoloop loop><source src="/statics/media/black.mp3"></audio>
    </div>
</template>

<script>
    import Hr from '../ui/hr.vue';

    const AVCOLOR = {
        RGB: [26, 168, 151],
        ALPHA: [1, .4, 1, .4]
    };

    export default {
        components: {
            Hr
        },
        ready(){

        }
    }
</script>