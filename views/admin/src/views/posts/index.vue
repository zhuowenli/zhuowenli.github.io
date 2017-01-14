<template lang="pug">
    .posts
        el-toolbar
            el-form-item(label="排序")
                el-radio-group(v-model="query.order_by")
                    el-radio(label="id") ID
                    el-radio(label="release_at") 发布时间
                    el-radio(label="view_count") 浏览数
                    el-radio(label="like_count") 喜欢数
        el-table(
            border
            v-show="!loading"
            v-if="tableData"
            v-bind:data="tableData"
            @selection-change="handleSelectionChange"
            style="width: 100%"
        )
            el-table-column(inline-template label="ID" width="60" align="center")
                span {{'#' + row.id}}
            el-table-column(property="title" label="标题" width="300")
            el-table-column(property="status" label="状态" width="95")
            el-table-column(property="category.name" label="分类" width="95")
            el-table-column(inline-template label="发布时间" width="168")
                span {{row.release_at | date}}
            el-table-column(property="view_count" label="浏览数" width="80")
            el-table-column(property="like_count" label="喜欢数" width="80")
            el-table-column(property="excerpt" label="简介")
            el-table-column(inline-template label="操作" width="166" align="center")
                span
                    el-button(type="primary") 编辑
                    el-button(type="danger" ) 删除
        el-pagination(
            v-show="!loading"
            v-if="metadata"
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            v-bind:current-page="query.page"
            v-bind:page-size="query.per_page"
            v-bind:total="metadata.total"
        )
</template>

<script>
    import { fetchPostLists, deletePostsByID } from '../../models/posts';

    export default {
        name: 'posts',
        data() {
            return {
                loading: false,
                height: window.innerHeight - 285,
                title: '文章管理',
                query: {
                    page: 1,
                    per_page: 30,
                    order_by: 'id',
                },
                tableData: null,
                metadata: null,
                singleSelection: null
            };
        },
        mounted() {
            window.addEventListener('resize', () => {
                this.height = window.innerHeight - 285;
            });

            this.init();
        },
        methods: {
            load() {
                return fetchPostLists(this.query);
            },
            init() {
                this.loading = true;
                this.load().then((res) => {
                    const { data, metadata } = res;

                    this.tableData = data;
                    this.metadata = metadata;
                    this.loading = false;
                });
            },
            handleSelectionChange(val) {
                this.singleSelection = val;
            },
            handleCurrentChange(val) {
                this.query.page = val;
            },
            hanglePostPreview() {
                const post = this.singleSelection;
                const origin = window.location.origin.replace('admin', 'www');

                window.open(`${origin}/${post.category.title}/${post.id}`);
            },
            hanglePostEdit() {
                const post = this.singleSelection;
                this.$router.push({ path: `/posts/${post.id}/edit` });
            },
            hanglePostDelete() {
                const post = this.singleSelection;

                if (!post.id) return;

                let index = -1;

                this.tableData.map((data, i) => {
                    if (data.id === post.id) index = i;
                    return data;
                });

                this.$confirm('此操作将永久删除该文章, 是否继续?', '操作提示', { type: 'warning' })
                    .then(() => {
                        this.deleteData(post.id).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });

                            if (index !== -1) {
                                this.tableData.splice(index, 1);
                            }
                        });
                    }, () => {});
            },
            deleteData(id) {
                return deletePostsByID(id).then(res => res.data);
            }
        },
        watch: {
            query: {
                handler: 'init',
                deep: true
            }
        },
    };
</script>