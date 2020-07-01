{% if page.comments and not is_home() %}
    <div class="comments" id="comments">
        {% if theme.disqus_shortname %}
            <div style="text-align:center;">
                <button class="btn" id="load-disqus" onclick="disqus.load();">加载 Disqus 评论</button>
            </div>
            <div id="disqus_thread">
                <noscript>
                    Please enable JavaScript to view the
                    <a href="//disqus.com/?ref_noscript">comments powered by Disqus.</a>
                </noscript>
            </div>
        {% elif theme.gitalk.enable %}
            <div id="gitalk-container"></div>
        {% endif %}
    </div>
{% endif %}
