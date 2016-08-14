<template>
    <div class="vr {{class}}">
        <div>
            <span class="b"></span>
            <span v-if="top" class="d top"></span>
            <span v-if="bottom" class="d bottom"></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            class: {
                type: String,
                default: 'left',
            },
            top: {
                type: Boolean,
                default: true
            },
            bottom: {
                type: Boolean,
                default: true
            },

        }
    }
</script>