<template lang="jade">
    .editor-top
        input.editor-top__title(type="text" placeholder="文章标题" v-bind:value="value" @input="handleInput")
</template>

<script>
    export default {
        props: {
            value: [String, Number]
        },
        methods: {
            handleInput(e) {
                this.$emit('input', e.target.value);
            }
        }
    }
</script>