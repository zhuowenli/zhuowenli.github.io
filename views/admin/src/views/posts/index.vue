<template>
    <div>
        <header class="main-header">
            <div class="title">{{title}}</div>
            <div class="toolbar flex">
                <ul class="flex__item">
                    <router-link class="toolbar-item active" to="posts/add">
                        <i class="material-icons">add</i>
                    </router-link>
                    <a class="toolbar-item">
                        <i class="material-icons">lock</i>
                    </a>
                    <a class="toolbar-item">
                        <i class="material-icons">edit</i>
                    </a>
                    <a class="toolbar-item">
                        <i class="material-icons">delete</i>
                    </a>
                    <span class="toolbar-select-count" v-if="singleSelection">#{{singleSelection.id}} 已选中</span>
                </ul>
                <el-tabs>
                    <el-tab-pane label="ID"></el-tab-pane>
                    <el-tab-pane label="评论数"></el-tab-pane>
                    <el-tab-pane label="浏览数"></el-tab-pane>
                </el-tabs>
            </div>
        </header>
        <el-table
            :data="tableData"
            :height="height"
            border
            @selectionchange="handleSelectionChange"
            selection-mode="single"
            style="width: 100%"
            allow-no-selection>
            <el-table-column inline-template label="ID" width="55">
                <span>#{{row.id}}</span>
            </el-table-column>
            <el-table-column property="date" label="日期" width="120"></el-table-column>
            <el-table-column property="name" label="姓名" width="120"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
        </el-table>
        <el-pagination
            @sizechange="handleSizeChange"
            @currentchange="handleCurrentChange"
            :current-page="5"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'posts',
        data() {
            return {
                height: window.innerHeight - 285,
                title: '文章管理',
                tableData: [
                    {
                        id: 1,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        id: 2,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        id: 3,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        id: 4,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        id: 5,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }
                ],
                singleSelection: null
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.singleSelection = val;
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
        },
        mounted() {
            window.addEventListener('resize', () => {
                this.height = window.innerHeight - 285;
            });
        }
    }
</script>