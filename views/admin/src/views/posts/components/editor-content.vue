<template lang="jade">
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
            el-input(
                autosize
                ref="textarea"
                type="textarea"
                v-model="input"
                v-bind:input="{minRows: 23}"
            )
        .editor-content__preview(v-if="input")
            div(v-html="compiledMarkdown")
</template>

<script type="text/javascript">
    import marked from 'marked';
    import _ from 'lodash/function';
    import hljs from '../../../../statics/js/highlight.js';

    export default {
        props: {
            value: [String]
        },
        data() {
            return {
                input: this.value,
                rangeData: {
                    start: 0,
                    end: 0,
                    text: ""
                },
            }
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

                return marked(this.input);
            }
        },
        methods: {
            // 获取 Textarea 的光标位置
            // 只使用W3C方法，忽略IE
            // http://www.planabc.net/2010/11/17/get_textarea_cursor_position/
            getCursorPosition() {
                const { rangeData, input } = this;
                const { textarea } = this.$refs;
                const $textarea = textarea.$refs.textarea;

                Object.assign(rangeData, {
                    end: $textarea.selectionEnd,
                    start: $textarea.selectionStart,
                    text: (rangeData.start != rangeData.end)
                        ? input.substring(rangeData.start, rangeData.end) : "",
                    isLineBefore: rangeData.start === 0
                               || input.substring(rangeData.start - 1, rangeData.start) === '\n',
                    isLineAfter: rangeData.end === input.length
                               || input.substring(rangeData.end, rangeData.end + 1) === '\n',
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
                this.input = $textarea.value;
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
            update: _.debounce((e) => {
                this.input = e.target.value;
            }, 300),
        },
        watch: {
            value(val) {
                this.input = val;
            },
            input(val) {
                this.$emit('input', val);
                this.$emit('change', val);
            }
        }
    }
</script>
