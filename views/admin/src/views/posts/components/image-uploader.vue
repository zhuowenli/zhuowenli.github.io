<template lang="jade">
    .image-uploader()
        el-upload(
            drag
            action="//up.qiniu.com/"
            v-bind:show-file-list="false"
            v-bind:data="qiniu"
            v-bind:before-upload="handleBeforeUpload"
            v-bind:on-success="handleUploadSuccess"
        )
            img(v-bind:src="images[0].url + '?imageView2/1/w/215/h/180'" v-if="images.length")
            .el-upload-dragger__interact(v-if="images.length" v-bind:class="{show: showInteract}" @mouseenter="showInteract = true" @mouseleave="showInteract = false")
                span.btn
                    i.el-icon-upload2
                    span 继续上传
                a.btn(@click.stop="handleUploadPreview" target="_blank" v-bind:href="upload.url")
                    i.el-icon-view
                    span 查看图片
                span.btn(@click.stop="handleUploadRemove")
                    i.el-icon-delete2
                    span 删除
            .el-upload-dragger__inner(v-else)
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
                upload: this.value.length ? this.value[0] : {},
                qiniu: {},
                images: this.value || [],
                showInteract: false,
            };
        },
        methods: {
            handleBeforeUpload(file) {
                const now = new Date();
                const date = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
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
                const { upload } = this;

                upload.width = file.width;
                upload.height = file.height;
                upload.type = 0;

                this.upload = upload;
                this.images = [upload];

                file.url = this.upload.url;

                return file;
            },
            handleUploadPreview() {},
            handleUploadRemove() {
                this.images = [];
                this.upload = {};
            }
        },
        watch: {
            value(val) {
                this.images = val;
                this.upload = val.length ? val[0] : {};
            },
            images(val) {
                this.$emit('input', val);
                this.$emit('change', val);
            }
        }
    };
</script>

<style lang="scss">
    .image-uploader{
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .el-upload-dragger{
            width: 215px;
            height: 180px;
            &__interact{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                background-color: rgba(0,0,0,.72);
                text-align: center;
                opacity: 0;
                transition: opacity .3s ease;
                &.show{
                    opacity: 1;
                }
                .btn{
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    flex-direction: column;
                    width: 56px;
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                    transition: transform .3s cubic-bezier(.23,1,.32,1) .1s,opacity .3s cubic-bezier(.23,1,.32,1) .1s;
                    i{
                        color: #fff;
                        display: block;
                        font-size: 24px;
                        line-height: inherit;
                        margin: 0 auto 5px;
                    }
                    span{
                        opacity: 0;
                        transition: opacity .15s linear;
                    }
                    &:hover{
                        transform: translateY(-13px);
                        span{
                            opacity: 1;
                        }
                    }
                }
            }
            &__inner{
                color: #888;
                em{
                    font-style: normal;
                }
            }
        }
    }
</style>
