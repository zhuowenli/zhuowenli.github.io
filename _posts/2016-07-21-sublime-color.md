---
layout: post
title: 更舒服的写代码 - Sublime 配色方案
subline:
categories: diary
tags: [sublime]
---

首先，贴上我的配色！绿色的风格非常养眼。

![]({{site.qiniu}}/2016/07/21/01.png)

主要主题采用了[Material Theme](https://github.com/equinusocio/material-theme)这个主题，按下「Common + Shift + P」，输入`Material`安装下面这个3个插件即可。

![]({{site.qiniu}}/2016/07/21/02.png)

编辑器的代码配色是通过「Tyrann Alex」这个主题来修改颜色生成的。更多配色可以去[http://tmtheme-editor.herokuapp.com/](http://tmtheme-editor.herokuapp.com/)这个网站生成。

最后，贴上我的sublime-setting:

```json
{
    "binary_file_patterns":
    [
        ".git/",
        "node_modules/",
        "bower_components/",
        "vendor/"
    ],
    "color_scheme": "Packages/User/SublimeLinter/Tyrann Alex (SL).tmTheme",
    "default_encoding": "UTF-8",
    "default_line_ending": "unix",
    "fallback_encoding": "UTF-8",
    "folder_exclude_patterns":
    [
        ".git",
        ".sass-cache",
        "node_modules",
        "vendor"
    ],
    "font_face": "Monaco",
    "font_size": 15,
    "ignored_packages":
    [
        "Vintage"
    ],
    "material_theme_accent_lime": true,
    "material_theme_appbar_lime": true,
    "material_theme_compact_panel": true,
    "material_theme_compact_sidebar": true,
    "material_theme_contrast_mode": true,
    "material_theme_panel_separator": true,
    "material_theme_small_statusbar": true,
    "material_theme_small_tab": true,
    "material_theme_tree_headings": true,
    "overlay_scroll_bars": "disabled",
    "rulers":
    [
        100
    ],
    "show_encoding": true,
    "show_full_path": true,
    "tab_size": 4,
    "theme": "Material-Theme-Darker.sublime-theme",
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true,
    "word_wrap": true
}

```