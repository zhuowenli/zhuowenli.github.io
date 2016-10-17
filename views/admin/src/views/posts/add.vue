<template lang="jade">
    .editor(ref="editor")
        editor-top(v-model="post.title")
        editor-content(v-model="post.content")
        .editor-aside
            el-form(v-bind:model="post" label-position="top")
                el-form-item(label="文章分类")
                    el-select(v-model="post.categories" placeholder="请选择文章分类")
                        el-option(label="前端开发" value="frontend")
                        el-option(label="设计网摘" value="design")
                        el-option(label="生活日志" value="diary")
                el-form-item(label="文章状态")
                    el-switch(on-text="发布" off-text="隐藏" v-model="postStatus" @change="handleStatusChange")
                el-form-item(label="发布时间")
                    el-date-picker(type="datetime" placeholder="选择日期时间" align="right" v-model="post.release_at")
                el-form-item(label="文章封面")
                    el-upload(type="drag"
                            thumbnail-mode
                            action="//up.qiniu.com/"
                            v-bind:data="qiniu"
                            v-bind:before-upload="handleBeforeUpload"
                            v-bind:on-preview="handleUploadPreview"
                            v-bind:on-success="handleUploadSuccess")
                        i.el-icon-upload
                        .el-dragger__text
                            | 将文件拖到此处，或
                            em 点击上传
                el-form-item(label="文章简介")
                    el-input(type="textarea" v-model="post.excerpt" v-bind:autosize="{minRows: 5}")
        .editor-bottom
            el-button 发布
            el-button(type="text") 取消
</template>

<script>
    import { fetchQiniuToken } from '../../models/qiniu';
    import EditorContent from './components/editor-content';
    import EditorTop from './components/editor-top';

    export default {
        components: { EditorTop, EditorContent },
        data() {
            return {
                postStatus: false,
                post: {
                    title: '',
                    content: '',
                    categories: '',
                    status: 0,
                    excerpt: '',
                    priority: 0,
                    user_id: 1,
                    release_at: '',
                    images: []
                },
                upload: {},
                qiniu: {
                    key: '',
                    token: ''
                }
            }
        },
        mounted() {
            const $editor = this.$refs.editor;

            $editor.addEventListener('scroll', () => {
                const top = $editor.scrollTop;

                if (top >= 80) {
                    $editor.classList.add('toolbar-floating');
                } else {
                    $editor.classList.remove('toolbar-floating');
                }
            });
        },
        methods: {
            handleStatusChange(val) {
                this.post.status = val ? 1 : 0;
            },
            handleBeforeUpload(file) {
                const now    = new Date();
                const date   = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
                const random = parseInt(Math.random() * 1000);
                const key = [date, '/', now.getTime(), random, '.png'].join('');

                this.qiniu = {};
                this.upload = {};

                return fetchQiniuToken({key}).then((res) => {
                    const { data } = res;

                    this.qiniu.token = data.token;
                    this.qiniu.key = data.key;
                    this.upload.url = data.url;

                    return this.qiniu;
                });
            },
            handleUploadSuccess(file) {
                const res = file.response;

                this.upload.width = res.width;
                this.upload.height = res.height;
                this.upload.type = 0;
                this.post.images = [this.upload];

                file.url = this.upload.url;

                return file;
            },
            handleUploadPreview(file) {
                window.open(file.url);
            }
        },
        watch: {
            'post.title'() {
                console.log(this.post.title);
            }
        }
    };
</script>

<style lang="scss">
    @import "./add";
</style>