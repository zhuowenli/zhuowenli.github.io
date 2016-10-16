<template lang="jade">
    form.editor(ref="editor")
        .editor-top
            input.editor-top__title(placeholder="文章标题" v-model="post.title")
        .editor-content
            .editor-content__toolbar
                ul
                    li
                        el-dropdown
                            span.el-dropdown-link
                                i.material-icons title
                            el-dropdown-menu(slot="dropdown")
                                el-dropdown-item(@click.native="handleMainClick(2)")
                                    .h2 标题2
                                el-dropdown-item(@click.native="handleMainClick(3)")
                                    .h3 标题3
                                el-dropdown-item(@click.native="handleMainClick(4)")
                                    .h4 标题4
                    li
                        a.editor-content__toolbar-item(title="加粗" @click="handleFormatBlod")
                            i.material-icons format_bold
                    li
                        a.editor-content__toolbar-item(title="斜体" @click="handleFormatItalic")
                            i.material-icons format_italic
                    li
                        a.editor-content__toolbar-item(title="删除线" @click="handleStrikethrough")
                            i.material-icons strikethrough_s
                    li.separator
                    li
                        a.editor-content__toolbar-item(title="有序列表" @click="handleFormatListNumbered")
                            i.material-icons format_list_numbered
                    li
                        a.editor-content__toolbar-item(title="无序列表" @click="handleFormatListBulleted")
                            i.material-icons format_list_bulleted
                    li
                        a.editor-content__toolbar-item(title="引用" @click="handleFormatQuote")
                            i.material-icons format_quote
                    li
                        a.editor-content__toolbar-item(title="代码" @click="handleFormatCode")
                            i.material-icons code
                    li.separator
                    li
                        a.editor-content__toolbar-item(title="链接" @click="handleInsertLink")
                            i.material-icons insert_link
                    li
                        a.editor-content__toolbar-item(title="图片" @click="handleInsertPhoto")
                            i.material-icons insert_photo
                    li
                        a.editor-content__toolbar-item(title="分割线" @click="handleLinearScale")
                            i.material-icons linear_scale
            .editor-content__wrapper
                el-input(type="textarea" ref="textarea" v-model="post.content" v-bind:autosize="{minRows: 23}")
            .editor-content__preview(v-if="post.content")
                div(v-html="compiledMarkdown")
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
                el-form-item(label="文章简介")
                    el-input(type="textarea" v-model="post.excerpt" v-bind:autosize="{minRows: 5}")
                el-form-item(label="文章封面")
                    el-upload(type="drag" thumbnail-mode action="//up.qiniu.com/")
                        i.el-icon-upload
                        .el-dragger__text
                            | 将文件拖到此处，或
                            em 点击上传
                        input(type="hidden" name="key" v-model="qiniu.key")
                        input(type="hidden" name="token" v-model="qiniu.token")
        .editor-bottom
            el-button 发布
            el-button(type="text") 取消
</template>

<script>
    import marked from 'marked';
    import _ from 'lodash/function';
    import hljs from '../../../static/js/highlight.js';
    import ElUpload from '../../components/upload';

    export default {
        components: { ElUpload },
        data() {
            return {
                minHeight: window.innerHeight - 272,
                height: 0,
                postStatus: false,
                rangeData: {
                    start: 0,
                    end: 0,
                    text: ""
                },
                post: {
                    title: '',
                    content: '',
                    categories: '',
                    status: 0,
                    excerpt: '',
                    priority: 0,
                    user_id: 1,
                    release_at: ''
                },
                qiniu: {
                    key: '123.png',
                    token: '123123'
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

            this.post.content = `## 标题内容 ##
### 标题内容 ###

**加粗文字** _斜体文字_ ~~删除线文字~~

1. 有序列表
2. 有序列表

![图片名称]()

---
[链接内容](http://www.baidu.com)
> 引用内容

\`\`\`
代码内容
\`\`\`
- 无序列表
- 无序列表
- 无序列表`;
        },
        computed: {
            compiledMarkdown() {
                const { textarea } = this.$refs;
                const $textarea = textarea.$refs.textarea;

                marked.setOptions({
                    highlight(code) {
                        return hljs.highlightAuto(code).value;
                    }
                });

                return marked(this.post.content, { sanitize: true })
            }
        },
        methods: {
            // 获取 Textarea 的光标位置
            // 只使用W3C方法，忽略IE
            // http://www.planabc.net/2010/11/17/get_textarea_cursor_position/
            getCursorPosition() {
                const { rangeData, post } = this;
                const { textarea } = this.$refs;
                const $textarea = textarea.$refs.textarea;

                Object.assign(rangeData, {
                    end: $textarea.selectionEnd,
                    start: $textarea.selectionStart,
                    text: (rangeData.start != rangeData.end)
                        ? post.content.substring(rangeData.start, rangeData.end) : "",
                    isLineBefore: rangeData.start === 0
                               || post.content.substring(rangeData.start - 1, rangeData.start) === '\n',
                    isLineAfter: rangeData.end === post.content.length
                               || post.content.substring(rangeData.end, rangeData.end + 1) === '\n',
                });

                this.rangeData = rangeData;
            },
            setCursorPosition() {
                const { rangeData } = this;
                const { textarea } = this.$refs;
                const $textarea = textarea.$refs.textarea;

                $textarea.focus();
                $textarea.setSelectionRange(rangeData.start, rangeData.end);
            },
            updateTextareaData(before, after, text = '') {
                const { rangeData } = this;
                const { textarea } = this.$refs;
                const $textarea = textarea.$refs.textarea;

                rangeData.text = rangeData.start === rangeData.end
                               ? text || ''
                               : rangeData.text || text;

                const str = before + rangeData.text + after;
                const tmpStr = $textarea.value;

                $textarea.value = tmpStr.substring(0, rangeData.start) + str + tmpStr.substring(rangeData.end, tmpStr.length);

                rangeData.end = rangeData.start + str.length - after.length;
                rangeData.start += before.length;

                this.rangeData = rangeData;
                this.post.content = $textarea.value;
                this.setCursorPosition();
            },
            handleMainClick(val) {
                this.getCursorPosition();

                const { rangeData } = this;
                const mark = "####".substring(4 - val);
                const before = `${rangeData.isLineBefore ? '' : '\n'}${mark} `;
                const after = ` ${mark}${rangeData.isLineAfter ? '\n' : '\n\n'}`;

                this.updateTextareaData(before, after, '标题内容');
            },
            handleFormatBlod() {
                this.getCursorPosition();
                this.updateTextareaData('**', '**', '加粗文字');
            },
            handleFormatItalic() {
                this.getCursorPosition();
                this.updateTextareaData('_', '_', '斜体文字');
            },
            handleStrikethrough() {
                this.getCursorPosition();
                this.updateTextareaData('~~', '~~', '删除线文字');
            },
            handleFormatListNumbered() {
                this.getCursorPosition();
                this.updateTextareaData('\n1. ', '', '有序列表');
            },
            handleFormatListBulleted() {
                this.getCursorPosition();
                this.updateTextareaData('\n- ', '', '无序列表');
            },
            handleFormatQuote() {
                this.getCursorPosition();
                this.updateTextareaData('\n> ', '', '引用内容');
            },
            handleFormatCode() {
                this.getCursorPosition();

                const { rangeData } = this;
                const mark = '```';
                const before = `${rangeData.isLineBefore ? '\n' : '\n\n'}${mark}\n`;
                const after = `\n${mark}${rangeData.isLineAfter ? '\n' : '\n\n'}`;

                this.updateTextareaData(before, after, '代码内容');
            },
            handleInsertLink() {
                this.getCursorPosition();
                this.updateTextareaData('[', ']()', '链接内容');
            },
            handleInsertPhoto() {
                this.getCursorPosition();

                const { rangeData } = this;
                const before = `${rangeData.isLineBefore ? '\n' : '\n\n'}![`;
                const after = `]()${rangeData.isLineAfter ? '\n' : '\n\n'}`;

                this.updateTextareaData(before, after, '图片名称');
            },
            handleLinearScale() {
                this.getCursorPosition();
                this.updateTextareaData('\n---\n', '');
            },
            handleStatusChange(val) {
                this.post.status = val ? 1 : 0;
            },
            update: _.debounce((e) => {
                this.post.content = e.target.value;
            }, 300),
        }
    };
</script>

<style lang="scss">
    @import "./add";
</style>