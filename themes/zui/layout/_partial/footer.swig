<span class="copyright">
    {% set current = date(Date.now(), "YYYY") %}
        &copy;
    {% if theme.since and theme.since != current %}
        {{ theme.since }} -
    {% endif %}
    {{ current }}
    <span class="footer-author">{{ config.author }}.</span>
    <span class="power-by">
        {{ __('footer.powered', '<a class="hexo-link" href="https://hexo.io/">Hexo</a>') }}
    </span>
</span>

<nav class="nav-bottom">
    {% if theme.menu %}
        <ul id="menu-bottom" class="nav-bottom-items">
            {% for name, path in theme.menu %}
                <li class="menu-item">
                    <a href="{{ url_for(path) }}">
                        {% set itemName = 'menu.' + name.toLowerCase() %}
                        {% if itemName.startsWith('menu') %}
                            {{ name }}
                        {% else %}
                            {{ __(itemName) }}
                        {% endif %}
                    </a>
                </li>
            {% endfor %}
        </ul>
    {% endif %}
</nav>

{% if is_home() %}
<div class="sticky">
    <div class="text">Z</div>
    <div class="text">H</div>
    <div class="text">U</div>
    <div class="text">O</div>
    <div class="text">W</div>
    <div class="text">E</div>
    <div class="text">N</div>
    <div class="text">L</div>
    <div class="text">I</div>
</div>
{% endif %}
