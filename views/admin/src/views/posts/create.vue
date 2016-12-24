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
                el-form-item(label="文字标签")
                    el-select(v-model="tags" multiple filterable allow-create placeholder="请选择文章标签")
                        el-option(v-for="item in postTags" v-bind:label="item.name" v-bind:value="item.name")
                el-form-item(label="发布时间")
                    el-date-picker(type="datetime" placeholder="选择日期时间" align="right" v-model="post.release_at")
                el-form-item(label="文章封面")
                    image-uploader(v-model="post.images")
                el-form-item(label="文章简介")
                    el-input(type="textarea" v-model="post.excerpt" v-bind:autosize="{minRows: 5}")
        .editor-bottom
            el-button(@click.native="handleSubmit") 保存
            el-button(type="text") 取消
</template>

<script>
    import EditorContent from './components/editor-content';
    import EditorTop from './components/editor-top';
    import ImageUploader from './components/image-uploader';

    import { fetchQiniuToken } from '../../models/qiniu';
    import { postPosts } from '../../models/posts';
    import { fetchTagLists } from '../../models/tags';
    import dateFormat from '../../services/dateFormat';

    export default {
        components: { EditorTop, EditorContent, ImageUploader },
        data() {
            return {
                postStatus: false,
                tags: [],
                postTags: [],
                post: {
                    title: '',
                    content: '',
                    categories: '',
                    status: 1,
                    excerpt: '',
                    priority: 0,
                    user_id: 1,
                    release_at: '',
                    images: []
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

            this.init();
        },
        methods: {
            init() {
                this.loadTags().then(data => this.postTags = data);
            },
            loadTags() {
                return fetchTagLists().then(res => res.data);
            },
            handleStatusChange(val) {
                this.post.status = val ? 0 : 1;
            },
            notifyError(message, title = '提交失败') {
                this.$notify.error({ message, title });
            },
            handleSubmit() {
                const { post, tags } = this;

                if (!post.title) return this.notifyError('请输入文章名');
                if (!post.content) return this.notifyError('请输入文章内容');
                if (!post.categories) return this.notifyError('请选择文章分类');
                if (!post.images || !post.images.length) return this.notifyError('请上传封面图');

                if (!post.release_at) {
                    post.release_at = dateFormat(new Date());
                }

                if (tags && tags.length) {
                    post.tags = tags.join(',');
                }

                return postPosts(this.post)
                    .then((res) => {
                        const { data } = res;
                        this.uploading = false;
                        this.$notify({
                            title: '成功',
                            message: '文章保存成功！',
                            type: 'success'
                        });

                        return data;
                    })
                    .then(() => {
                        this.$router.push({ path: '/posts' });
                    })
                    .catch((e) => {
                        const res = e.responseJSON;
                        const message = res.message ? res.message : '文章保存失败';
                        const title = `错误${res.code ? res.code : ''}`;

                        this.uploading = false;
                        this.$notify.error({ message, title, duration: 0 });
                    });
            }
        }
    };
</script>

<style lang="scss">
    @import "./editor.scss";
</style>