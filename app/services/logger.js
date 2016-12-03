/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : Servives Logger
*/
'use strict';

var winston = require('winston');

var logger;

if(process.env.NODE_ENV === 'development') {
    var prefix = process.env.DEBUG;
    var DebugTransport = require('../lib/winston.transports.debug')(prefix);

    logger = new winston.Logger({
        level: 'debug',
        colorize: true,
        transports: [
            new DebugTransport()
        ]
    });
} else {
    logger = new (winston.Logger)({
        transports: [
            new winston.transports.File({
                name: 'info-file',
                filename: 'dcf-info.log',
                level: 'info'
            }),
            new winston.transports.File({
                name: 'error-file',
                filename: 'dcf-error.log',
                level: 'error'
            })
        ]
    });
}

module.exports = logger;
