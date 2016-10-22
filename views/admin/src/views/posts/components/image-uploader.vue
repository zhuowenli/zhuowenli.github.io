<template lang="jade">
    .image-uploader()
        el-upload(
            thumbnail-mode
            type="drag"
            action="//up.qiniu.com/"
            v-bind:data="qiniu"
            v-bind:before-upload="handleBeforeUpload"
            v-bind:on-preview="handleUploadPreview"
            v-bind:on-success="handleUploadSuccess"
            v-bind:on-remove="handleUploadRemove"
        )
            template(v-if="images.length")
                .el-dragger__cover
                    .el-dragger__cover__content
                        img(v-bind:src="images[0].url")
            template(v-else)
                i.el-icon-upload
                .el-dragger__text
                    | 将文件拖到此处，或
                    em 点击上传
</template>

<script>
    import { fetchQiniuToken } from '../../../models/qiniu';

    export default {
        name: 'image-uploader',
        componentName: 'image-uploader',
        props: {
            value: [Array]
        },
        data() {
            return {
                upload: {},
                qiniu: {},
                images: this.value
            }
        },
        methods: {
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
                this.images = [this.upload];
                file.url = this.upload.url;

                return file;
            },
            handleUploadPreview(file) {
                window.open(file.url);
            },
            handleUploadRemove() {
                this.images = [];
            }
        },
        watch: {
            value(val) {
                this.images = val;
            },
            images(val) {
                this.$emit('input', val);
                this.$emit('change', val);
            }
        }
    };
</script>