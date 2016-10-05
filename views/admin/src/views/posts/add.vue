<template lang="jade">
    form.editor(ref="editor")
        .editor-top
            input.editor-top__title(placeholder="文章标题" v-model="title")
        .editor-content
            .editor-content__toolbar
                ul
                    li
                        el-dropdown.material-icons(text="title" type="text" v-bind:icon-separate="false" menu-align="start" trigger="click")
                            el-dropdown-item(@click.native="handleMainClick(1)")
                                .h1 标题1
                            el-dropdown-item(@click.native="handleMainClick(2)")
                                .h2 标题2
                            el-dropdown-item(@click.native="handleMainClick(3)")
                                .h3 标题3
                    li
                        a.editor-content__toolbar-item(title="加粗")
                            i.material-icons format_bold
                    li
                        a.editor-content__toolbar-item(title="斜体")
                            i.material-icons format_italic
                    li
                        a.editor-content__toolbar-item(title="删除线")
                            i.material-icons strikethrough_s
                    li.separator
                    li
                        a.editor-content__toolbar-item(title="有序列表")
                            i.material-icons format_list_numbered
                    li
                        a.editor-content__toolbar-item(title="无序列表")
                            i.material-icons format_list_bulleted
                    li
                        a.editor-content__toolbar-item(title="引用")
                            i.material-icons format_quote
                    li
                        a.editor-content__toolbar-item(title="代码")
                            i.material-icons code
                    li.separator
                    li
                        a.editor-content__toolbar-item(title="链接")
                            i.material-icons insert_link
                    li
                        a.editor-content__toolbar-item(title="图片")
                            i.material-icons insert_photo
                    li
                        a.editor-content__toolbar-item(title="分割线")
                            i.material-icons linear_scale
            .editor-content__wrapper
                textarea(v-model="input" ref="textarea" v-bind:style="{minHeight: minHeight + 'px', height: height + 'px'}")
            .editor-content__preview(v-html="compiledMarkdown")
</template>

<script>
    import marked from 'marked';
    import _ from 'lodash/function';

    export default {
        data() {
            return {
                title: '',
                minHeight: window.innerHeight - 272,
                height: 0,
                input: '',
                rangeData: {
                    start: 0,
                    end: 0,
                    text: ""
                },
            }
        },
        mounted() {
            const $textarea = this.$refs.textarea;
            const $editor = this.$refs.editor;

            window.addEventListener('resize', () => {
                this.minHeight = window.innerHeight - 272;
                this.height = this.minHeight;

                setTimeout(() => {
                    this.height = $textarea.scrollHeight;
                }, 10);
            });

            $editor.addEventListener('scroll', () => {
                const top = $editor.scrollTop;

                if (top >= 80) {
                    $editor.classList.add('toolbar-floating');
                } else {
                    $editor.classList.remove('toolbar-floating');
                }
            });
        },
        computed: {
            compiledMarkdown() {
                const $textarea = this.$refs.textarea;

                marked.setOptions({
                    highlight(code) {
                        return require('highlight.js').highlightAuto(code).value;
                    }
                });

                if ($textarea) {
                    this.height = $textarea.scrollHeight;
                }

                return marked(this.input, { sanitize: true })
            }
        },
        methods: {
            // 获取 Textarea 的光标位置
            // 只使用W3C方法，忽略IE
            // http://www.planabc.net/2010/11/17/get_textarea_cursor_position/
            getCursorPosition() {
                const $textarea = this.$refs.textarea;
                const { rangeData } = this;

                rangeData.start = $textarea.selectionStart;
                rangeData.end = $textarea.selectionEnd;
                rangeData.text = (rangeData.start != rangeData.end)
                               ? $textarea.value.substring(rangeData.start, rangeData.end)
                               : "";

                this.rangeData = rangeData;
            },
            setCursorPosition() {
                const $textarea = this.$refs.textarea;
                const { rangeData } = this;

                $textarea.focus();
                $textarea.setSelectionRange(rangeData.start, rangeData.end);
            },
            updateTextareaData(str, before = 0, after = 0) {
                const $textarea = this.$refs.textarea;
                const tmpStr = $textarea.value;
                const { rangeData } = this;

                $textarea.value = tmpStr.substring(0, rangeData.start) + str + tmpStr.substring(rangeData.end, tmpStr.length);

                rangeData.end = rangeData.start + str.length - after;
                rangeData.start += before;

                this.rangeData = rangeData;
                this.input = $textarea.value;
                this.setCursorPosition();
            },
            handleMainClick(val) {
                const { rangeData, input } = this;

                this.getCursorPosition();

                const mark = "###".substring(3 - val);
                const isLineBefore = rangeData.start === 0
                                  || input.substring(rangeData.start - 1, rangeData.start) === '\n';
                const isLineAfter = rangeData.end === input.length
                                  || input.substring(rangeData.end, rangeData.end + 1) === '\n';
                const before = `${isLineBefore ? '' : '\n'}${mark} `;
                const after = ` ${mark}${isLineAfter ? '\n' : '\n\n'}`;

                this.updateTextareaData(before + rangeData.text + after, before.length, after.length);
            },
            update: _.debounce((e) => {
                this.input = e.target.value;
            }, 300),
        }
    };
</script>

<style lang="scss">
    @import "./add";
</style>