<template>
    <div>
        <header class="main-header">
            <div class="title">{{title}}</div>
            <div class="toolbar flex">
                <ul class="flex__item">
                    <el-tooltip class="toolbar-item active" content="写文章" placement="top">
                        <router-link class="" to="posts/add">
                            <i class="material-icons">add</i>
                        </router-link>
                    </el-tooltip>
                    <template v-if="singleSelection">
                        <el-tooltip class="toolbar-item" content="预览" placement="top">
                            <i class="material-icons">visibility</i>
                        </el-tooltip>
                        <el-tooltip class="toolbar-item" content="编辑" placement="top">
                            <i class="material-icons">edit</i>
                        </el-tooltip>
                        <el-tooltip class="toolbar-item" content="删除" placement="top">
                            <i class="material-icons">delete</i>
                        </el-tooltip>
                        <span class="toolbar-select-count">#{{singleSelection.id}} 已选中</span>
                    </template>
                </ul>
                <el-tabs>
                    <el-tab-pane label="ID"></el-tab-pane>
                    <el-tab-pane label="发布时间"></el-tab-pane>
                    <el-tab-pane label="浏览数"></el-tab-pane>
                    <el-tab-pane label="喜欢数"></el-tab-pane>
                </el-tabs>
            </div>
        </header>
        <el-table
            border
            allow-no-selection
            v-show="!loading"
            v-if="tableData"
            :data="tableData"
            :height="height"
            @selectionchange="handleSelectionChange"
            selection-mode="single"
            style="width: 100%">
            <el-table-column inline-template label="ID" width="60">
                <span>#{{row.id}}</span>
            </el-table-column>
            <el-table-column property="title" label="标题" width="300"></el-table-column>
            <el-table-column property="status" label="状态" width="95"></el-table-column>
            <el-table-column property="category.name" label="分类" width="95"></el-table-column>
            <el-table-column inline-template label="发布时间" width="168">
                <span>{{row.release_at | date}}</span>
            </el-table-column>
            <el-table-column property="view_count" label="浏览数" width="80"></el-table-column>
            <el-table-column property="like_count" label="喜欢数" width="80"></el-table-column>
            <el-table-column property="excerpt" label="简介"></el-table-column>
            <el-table-column inline-template label="操作" width="90">
                <span>
                    <router-link :to="'/posts/' + row.id + '/edit'">
                        <el-button>编辑</el-button>
                    </router-link>
                </span>
            </el-table-column>
        </el-table>
        <el-pagination
            v-show="!loading"
            v-if="metadata"
            layout="total, prev, pager, next"
            @currentchange="handleCurrentChange"
            :current-page="query.page"
            :page-size="query.per_page"
            :total="metadata.total">
        </el-pagination>
    </div>
</template>

<script>
    import { fetchPostLists } from '../../models/posts';

    export default {
        name: 'posts',
        data() {
            return {
                loading: false,
                height: window.innerHeight - 285,
                title: '文章管理',
                query: {
                    page: 1,
                    per_page: 30
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
                this.init();
            },
        }
    };
</script>