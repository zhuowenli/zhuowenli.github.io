const config = require('../config');
const common = require('./common');

exports.catch404 = (req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
};

exports.errorPage = (err, req, res, next) => {
    let _err = config.debug === true ? err : {};

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: _err,
        config: config,
        matchPath: (url) => common.matchPath(req, url)
    });
};