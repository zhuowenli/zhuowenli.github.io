{% if theme.gitalk.enable %}
<script src="{{ url_for('lib') }}/gitalk.min.js"></script>
<script type="text/javascript">
    const gitalk = new Gitalk({
        clientID: '{{theme.gitalk.clientID}}',
        clientSecret: '{{theme.gitalk.clientSecret}}',
        repo: '{{theme.gitalk.repo}}',
        owner: '{{theme.gitalk.owner}}',
        admin: '{{theme.gitalk.admin}}'.split(','),
        pagerDirection: '{{theme.gitalk.pagerDirection}}',
        id: `{{page.subtitle || page.title}}`,
        number: {{page.id || -1}},
        distractionFreeMode: true
    });
    if (document.querySelector('#gitalk-container')) {
        gitalk.render('gitalk-container');
    }
</script>
{% endif %}
