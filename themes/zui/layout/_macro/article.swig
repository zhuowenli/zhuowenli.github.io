{% macro render(post) %}
<article class="post">
    <header class="post-header">
        <h1 class="post-title">
            <a class="post-link" href="{{ url_for(post.path) }}">{{ post.title }}</a>
        </h1>

        <time class="post-time">
            {{ full_date(post.date, 'MMM DD YYYY') }}
        </time>
    </header>

    <div class="post-excerpt post-content">
        {% set excerpt = "" %}
        {% if post.description %}
        {% set excerpt = post.description %}
        {% elif post.excerpt %}
        {% set excerpt = post.excerpt %}
        {% endif %}

        {% if excerpt %}{{ excerpt }}{% endif %}
    </div>
</article>
{% endmacro %}