<!DOCTYPE html>
<html lang="{{ config.language }}">
<head>
    {% include '_partial/head.swig' %}
    <title>{% block title %}{% endblock %}</title>
</head>
<body>
    <div id="page">
        <header id="masthead">
            {%- include '_partial/header.swig' %}
        </header>

        <div id="content">
            {% block content %}{% endblock %}
        </div>

        <footer id="colophon">
            {%- include '_partial/footer.swig' %}
        </footer>

        <div class="back-to-top" id="back-to-top">
            <i class="iconfont icon-up"></i>
        </div>
    </div>
    {% if env.env !== 'development' %}
    {% include '_script/comments.swig' %}
    {% endif %}
    {% include '_script/libs.swig' %}
    {% include '_script/theme.swig' %}
</body>
</html>
