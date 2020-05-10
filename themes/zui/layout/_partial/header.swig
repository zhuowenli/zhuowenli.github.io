{% if not is_home() %}
<h1 class="site-title">
    <a href="{{ url_for('.') }}" class="logo">{{ config.title }}</a>
</h1>
{% else %}
<div id="bounds">
    <div class="widget-shape">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle cx="115" cy="115" r="115"/>
            <circle cx="80" cy="80" r="80"/>
        </svg>
    </div>
    <div class="text">
        <span style="letter-spacing: 2px;">Hi!<br>I'm</span>
        <br>
        <span>{{ config.title }}</span>
    </div>
    <div class="small">Front End Developer<br>so cooooooool</div>
    <div class="animation-line"></div>
    <div class="icon">
        <a class="iconfont icon-github" href="https://github.com/zhuowenli" target="_blank" title="查看 GitHub"></a>
        <a class="iconfont icon-twitter" href="https://twitter.com/zhuo_wenli" target="_blank" title="查看 Twitter"></a>
        <a class="iconfont icon-weibo" href="https://weibo.com/imzwl" target="_blank" title="查看微博"></a>
        <a class="iconfont icon-email" href="mailto:zhuowenligg@gmail.com" target="_blank" title="联系我"></a>
        <a class="iconfont icon-rss" href="/atom.xml" target="_blank" title="订阅 RSS"></a>
    </div>
</div>
{% endif %}
