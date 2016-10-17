<template lang="jade">
    .editor-top
        input.editor-top__title(placeholder="文章标题" v-bind:value="title" @input="onInput")
</template>

<script>
    export default {
        props: ['title'],
        methods: {
            onInput(e) {
                this.$emit('input', e.target.value)
            }
        },
    }
</script>