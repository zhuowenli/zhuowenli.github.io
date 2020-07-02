{% macro render(post) %}
<article class="post">
    <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <time class="post-time">
            {{ full_date(post.date, 'MMM DD YYYY') }}
        </time>
    </header>

    <div class="post-content">
        {{ post.content }}
    </div>

    <footer class="post-footer">
        {% if post.tags and post.tags.length %}
        <div class="post-tags">
            {% for tag in post.tags %}
            <a href="{{ url_for(tag.path) }}">{{ tag.name }}</a>
            {% endfor %}
        </div>
        {% endif %}

        {# Post Pagination #}
        {% include "../_partial/pagination.swig" %}

        {% if env.env !== 'development' %}
            {% include "../_partial/comments.swig" %}
        {% endif %}
    </footer>
</article>
{% endmacro %}