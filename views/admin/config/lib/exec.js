/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const exec = require('child_process').exec;
const Promise = require('bluebird');

module.exports = (cmd, callback, ops) => {
    ops = ops || {};

    return new Promise((resolve, reject) => {
        exec(cmd, ops, (err, stdout, stderr) => {
            if(err) {
                const errMsgs = [
                    '!!-- Exec Error --!!',
                    'Cmd: ['+ cmd +']',
                    'Error: ' + err,
                    'Stderr: ' + stderr,
                    'Stdout: ' + stdout,
                    '!!-- Exec Error End --!!'
                ];

                return reject(errMsgs.join('\n'));
            }

            resolve(String(stdout));
        });
    });
};