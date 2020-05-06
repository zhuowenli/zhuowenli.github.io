{% macro render(post) %}
<article class="post">
    <header class="post-header">
        {% if is_home() %}
        <h1 class="post-title">
            <a class="post-link" href="{{ url_for(post.path) }}">{{ post.title }}</a>
        </h1>
        {% else %}
        <h1 class="post-title">{{ post.title }}</h1>
        {% endif %}

        <time class="post-time">
            {{ full_date(post.date, 'MMM DD YYYY') }}
        </time>
    </header>

    {% if is_home() %}
    <div class="post-excerpt post-content">
        {% set excerpt = "" %}
        {% if post.description %}
        {% set excerpt = post.description %}
        {% elif post.excerpt %}
        {% set excerpt = post.excerpt %}
        {% endif %}

        {% if excerpt %}{{ excerpt }}{% endif %}
    </div>
    {% else %}
    <div class="post-content">
        {{ post.content }}
    </div>
    {% endif %}

    {% if not is_home() %}
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
        {% include "../_partial/comments.swig" %}
    </footer>
    {% endif %}
</article>
{% endmacro %}