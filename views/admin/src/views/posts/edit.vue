<template lang="pug">
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

    import { fetchPostsByID, putPosts } from '../../models/posts';
    import { fetchQiniuToken } from '../../models/qiniu';
    import { fetchTagLists } from '../../models/tags';

    export default {
        components: { EditorTop, EditorContent, ImageUploader },
        data() {
            return {
                loading: false,
                postStatus: false,
                tags: [],
                post: {
                    images: [],
                    status: 1
                },
                postTags: []
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
            loadTags() {
                return fetchTagLists().then(res => res.data);
            },
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

                        if (data.tags && data.tags.length) {
                            this.tags = [];
                            data.tags.map(item => this.tags.push(item.tag.name));
                        }

                        return post;
                    });
            },
            init() {
                this.load().then(data => {
                    this.post = data;
                    this.loading = false;
                    this.postStatus = data.status === 1;
                });

                this.loadTags().then(data => this.postTags = data);
            },
            handleStatusChange(val) {
                this.post.status = val ? 0 : 1;
            },
            notifyError(message, title = '提交失败') {
                this.$notify.error({ message, title });
            },
            handleSubmit() {
                const { id } = this.$route.params;
                const { post, tags } = this;

                if (!post.title) return this.notifyError('请输入文章名');
                if (!post.content) return this.notifyError('请输入文章内容');

                if (!post.images || !post.images.length) return this.notifyError('请上传封面图');

                if (tags && tags.length) {
                    post.tags = tags.join(',');
                }

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