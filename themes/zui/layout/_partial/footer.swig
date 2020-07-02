<span class="copyright-year">
    {% set current = date(Date.now(), "YYYY") %}
        &copy;
    {% if theme.since and theme.since != current %}
        {{ theme.since }} -
    {% endif %}
    {{ current }}
    <span class="footer-author">{{ config.author }}.</span>
    <span class="power-by">{{ __('footer.powered', '<a href="https://hexo.io/">Hexo</a>') }}.</span>
    <span class="design-by">{{ __('footer.designed', '<a href="https://www.zhuowenli.com/">zhuowenli</a>') }}</span>
</span>

<nav id="nav-bottom">
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
