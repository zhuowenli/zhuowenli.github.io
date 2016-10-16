const Upload = require('./src/');

Upload.install = function(Vue) {
    Vue.component(Upload.name, Upload);
};

module.exports = Upload;
