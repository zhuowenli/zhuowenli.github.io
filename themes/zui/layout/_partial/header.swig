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
</div>
{% endif %}
