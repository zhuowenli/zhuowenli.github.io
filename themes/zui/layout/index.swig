{% extends "_layout.swig" %}
{% import '_macro/article.swig' as post_template %}

{% block title %} {{ config.title }} {% endblock %}

{% block content %}
    <div id="primary" class="is-home">
        {% for post in page.posts %}
            {{ post_template.render(post) }}
        {% endfor %}
        {% include "_partial/pagination.swig" %}
    </div>
    {% include "_partial/widget.swig" %}
{% endblock %}
