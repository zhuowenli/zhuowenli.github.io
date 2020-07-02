{# Website mata #}
{% include "./_head/meta.swig" %}

{# Website rss #}
{% if theme.rss === 'default' and config.feed and config.feed.path %}
    {{ feed_tag(config.feed.path) }}
{% elif theme.rss %}
    {{ feed_tag(theme.rss) }}
{% else %}
    {{ feed_tag('atom.xml') }}
{% endif %}

{# Website favicon #}
{% if theme.theme.favicon.icon %}
    <link rel="shortcut icon" type="image/x-icon" href="{{ url_for(theme.theme.favicon.icon) }}?v={{ theme.version }}" />
{% endif %}

{# Canonical, good for google search engine #}
<link rel="canonical" href="{{ config.url }}/{{ page.canonical_path.replace('index.html', '') }}"/>

{# Open Graph #}
{{ open_graph() }}

{# Theme styling #}
<link rel="stylesheet" type="text/css" href="{{ url_for('css/style.css') }}?v={{ theme.version }}" />

{# Theme Configuration #}
{% include "../_script/config.swig" %}

{# Analytics #}
{% if env.env !== 'development' %}
    {% include "../_script/analytics.swig" %}
{% endif %}
