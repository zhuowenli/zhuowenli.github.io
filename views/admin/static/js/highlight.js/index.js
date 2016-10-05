var hljs = require('./highlight');

hljs.registerLanguage('bash', require('./languages/bash'));
hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('coffeescript', require('./languages/coffeescript'));
hljs.registerLanguage('htmlbars', require('./languages/htmlbars'));
hljs.registerLanguage('http', require('./languages/http'));
hljs.registerLanguage('java', require('./languages/java'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('less', require('./languages/less'));
hljs.registerLanguage('markdown', require('./languages/markdown'));
hljs.registerLanguage('nginx', require('./languages/nginx'));
hljs.registerLanguage('objectivec', require('./languages/objectivec'));
hljs.registerLanguage('php', require('./languages/php'));
hljs.registerLanguage('python', require('./languages/python'));
hljs.registerLanguage('ruby', require('./languages/ruby'));
hljs.registerLanguage('scss', require('./languages/scss'));
hljs.registerLanguage('sql', require('./languages/sql'));
hljs.registerLanguage('stylus', require('./languages/stylus'));
hljs.registerLanguage('swift', require('./languages/swift'));
hljs.registerLanguage('typescript', require('./languages/typescript'));
hljs.registerLanguage('vim', require('./languages/vim'));
hljs.registerLanguage('xml', require('./languages/xml'));

module.exports = hljs;