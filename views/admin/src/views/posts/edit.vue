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

    import { fetchPostsByID, putPosts } from '../../models/posts';
    import { fetchQiniuToken } from '../../models/qiniu';

    export default {
        components: { EditorTop, EditorContent, ImageUploader },
        data() {
            return {
                loading: false,
                postStatus: false,
                post: {
                    images: [],
                    status: 0
                },
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

            this.loading = true;
            this.init();
        },
        methods: {
            load() {
                const { id } = this.$route.params;

                return fetchPostsByID(id)
                    .then(res => res.data)
                    .then(data => {
                        const post = {};

                        Object.assign(post, {
                            title: data.title,
                            content: data.content,
                            categories: data.category.title,
                            status: data.status,
                            excerpt: data.excerpt,
                            priority: data.priority,
                            user_id: data.user_id,
                            release_at: data.release_at,
                            images: data.images
                        });

                        return post;
                    });
            },
            init() {
                this.load().then(post => {
                    this.post = post;
                    this.loading = false;
                    this.postStatus = this.post.status === 1;
                });
            },
            handleStatusChange(val) {
                this.post.status = val ? 1 : 0;
            },
            notifyError(message, title = '提交失败') {
                this.$notify.error({ message, title });
            },
            handleSubmit() {
                const { id } = this.$route.params;
                const { post } = this;

                if (!post.title) return this.notifyError('请输入文章名');
                if (!post.content) return this.notifyError('请输入文章内容');
                if (!post.images || !post.images.length) return this.notifyError('请上传封面图');

                return putPosts(id, this.post)
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
    }
</script>

<style lang="scss">
    @import "./editor";
</style>