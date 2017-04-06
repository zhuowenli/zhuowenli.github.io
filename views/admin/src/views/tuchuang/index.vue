<template lang="pug">
    .tuchuang
        el-toolbar
        el-upload(
            thumbnail-mode
            type="drag"
            action="//up.qiniu.com/"
            v-bind:data="qiniu"
            v-bind:multiple="true"
            v-bind:default-file-list="images"
            v-bind:before-upload="handleBeforeUpload"
            v-bind:on-preview="handleUploadPreview"
            v-bind:on-success="handleUploadSuccess"
            v-bind:on-remove="handleUploadRemove"
        )
            i.el-icon-upload
            .el-dragger__text 将文件拖到此处，或
                em 点击上传
        el-form.tuchuang-list(:inline="true")
            template(v-for="img in images")
                el-form-item
                    el-input(v-model="img.url")
                el-form-item
                    el-button(type="primary" v-clipboard="img.url" @success="handleCopySuccess") 复制
</template>

<script>
    import { fetchQiniuToken } from '../../models/qiniu';

    export default {
        name: 'tuchuang',
        data() {
            return {
                upload: {},
                qiniu: {},
                images: []
            };
        },
        methods: {
            handleBeforeUpload() {
                const now = new Date();
                const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
                const random = parseInt(Math.random() * 1000, 10);
                const key = [date, '/', now.getTime(), random, '.png'].join('');
                this.qiniu = {};
                this.upload = {};

                return fetchQiniuToken({ key }).then((res) => {
                    const { data } = res;
                    this.qiniu.token = data.token;
                    this.qiniu.key = data.key;
                    this.upload.url = data.url;
                    this.upload.name = data.key;

                    return this.qiniu;
                });
            },
            handleUploadSuccess(file) {
                const { upload } = this;

                upload.width = file.width;
                upload.height = file.height;
                upload.type = 0;

                this.upload = upload;
                this.images.push(upload);

                file.url = this.upload.url;

                return file;
            },
            handleUploadPreview(file) {
                window.open(file.url);
            },
            handleUploadRemove() {
                this.images.pop();
            },
            handleCopySuccess() {
                this.$message({
                    message: '复制成功！',
                    type: 'success'
                });
            }
        },
        watch: {
            images(val) {
                console.log(val)
            }
        }
    };
</script>

<style lang="scss">
    @import "./index.scss";
</style>