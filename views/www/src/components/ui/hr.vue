<template>
    <div class="hr" :class="{dark: dark}">
        <div>
            <span class="b"></span>
            <span v-if="left" class="d left"></span>
            <span v-if="right" class="d right"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            dark: {
                type: Boolean,
                default: false
            },
            left: {
                type: Boolean,
                default: true
            },
            right: {
                type: Boolean,
                default: true
            },
        }
    }
</script>