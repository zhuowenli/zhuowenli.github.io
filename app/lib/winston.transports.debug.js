/**
 * debug transport for winston
 *
 */

var util = require('util');
var debug = require('debug');
var lodash = require('lodash');
var winston = require('winston');

module.exports = function(prefix) {
    var loggers = {};

    var DebugLogger = function(options) {
        if(!options) {
            options = {};
        }

        this.name = options.name || 'debug-logger';

        this.level = options.level || 'info';
    };

    util.inherits(DebugLogger, winston.Transport);

    DebugLogger.prototype.name = 'debug';

    DebugLogger.prototype.log = function(level, msg, meta, callback) {
        var logger = loggers[level];
        if(!logger) {
            logger = loggers[level] = debug(prefix + ':' + level);

            if(level === 'error') {
                logger.log = console.error.bind(console);
            }
        }

        if(!lodash.isEmpty(meta)) {
            logger(msg, meta);
        }
        else {
            logger(msg);
        }

        // this.emit('logged');
        callback(null, true);
    };

    return DebugLogger;
};
