# hexo-theme-zui

> A super light and simple theme.

[Theme Demo](https://d2fan.com)

![Polar Bear](https://wx3.sinaimg.cn/large/e942863dly1fd36foz16ij21kw0xwjxw.jpg)

## Installation

1.Install plugin `hexo-renderer-scss`.

2.Download the theme to your Hexo theme folder.

```bash
npm install hexo-renderer-scss --save
git clone https://github.com/frostfan/hexo-theme-polarbear themes/polarbear
```

3.Modify `yoursite/_config.yml`

```yaml
# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: polarbear
```

4.Show all posts at your archive page，need to install plugin `hexo-generator-archive`

```bash
npm install hexo-generator-archive --save
```

Add these codes on `yoursite/_config.yml`

```yaml
archive_generator:
    per_page: 0
    yearly: false
    monthly: false
    daily: false
```

## Theme Config

Modify `polarbear/_config.yml`

## Site Analytics

```yaml
# Baidu Analytics
baidu_analytics:
# Google Analytics
google_analytics:
```

## Comment Function

```yaml
# Disqus
disqus_shortname:
# GitTalk
gittalk:
```

## More Functions

This theme is based on [Even](https://github.com/ahonn/hexo-theme-even)

You can add more features based on it. For example: appreciation, copyright, social icon, etc.
