<template lang="jade">
    .detail
</template>

<script>
    import { fetchPostItem } from '../../models/posts';

    export default {
        name: 'detail',
        data() {
            return {
                post: null,
                id: null
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            load() {
                const {id} = this.$route.params;

                return fetchPostItem(id).then(res => {
                    const {data} = res;

                    return data;
                });
            },
            init() {

                this.load().then(data => {
                    console.log(data);
                    this.post = data;
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "./index.scss";
</style>