<template lang="jade">
    .search
        .search-intro
            h3 Front-end source for knowlege
            form.search-intro-form
                input(type="text" placeholder="Search...")
                a.btn.btn-search
                    .icon.icon-search
        .search-category
            h3 Search by tags
            ul
                li(v-for="tag in tags")
                    a(@click="handleTagClick(tag.name)") {{tag.name}}
</template>

<script>
    import { fetchTagLists } from '../../models/tags';

    export default {
        name: 'search',
        data() {
            return {
                query: {
                    page: 1,
                    per_page: 100
                },
                tags: []
            };
        },
        mounted() {
            this.init();
        },
        methods: {
            load() {
                return fetchTagLists(this.query).then(res => res.data);
            },
            init() {
                this.load().then(data => (this.tags = data));
            },
            handleTagClick(val) {}
        }
    };
</script>

<style lang="scss">
    @import "./index.scss";
</style>