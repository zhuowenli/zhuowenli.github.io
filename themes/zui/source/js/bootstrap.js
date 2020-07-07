$(document).ready(function () {
    Theme.cursor.init();
    Theme.backToTop.register();

    if (themeConfig.favicon.enable) {
        Theme.favicon.register();
    }
});
