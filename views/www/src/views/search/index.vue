<template lang="jade">
    .search
        .search-intro
            h3 Web design and development blog.
            form.search-intro-form(@submit.prevent="handleSearchSubmit")
                input(type="text" placeholder="Search article" v-model="search")
                a.btn.btn-search(@click="handleSearchSubmit")
                    .icon.icon-search
        .search-category(v-if="tags.length")
            h3 关键词
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
                search: '',
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
            handleTagClick(val) {},
            handleSearchSubmit() {
                const { search } = this;

                if (search.trim()) {
                    this.$router.push({ path: `/search/${search.trim()}` });
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "./index.scss";
</style>