{% set themeConfig = theme.theme %}
<script type="text/javascript">
    var themeConfig = {
        color: '{{themeConfig.color}}',
        favicon: {
            enable: {{themeConfig.favicon.enable}},
            icon: '{{themeConfig.favicon.icon}}',
            hide_text: '{{themeConfig.favicon.hide_text}}',
            show_text: '{{themeConfig.favicon.show_text}}',
        }
    };
</script>