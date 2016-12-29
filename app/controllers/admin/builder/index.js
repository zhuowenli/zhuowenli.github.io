/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : api-users
 */
'use strict';

const path = require('path');
const { exec } = require('child_process');

let lock = false;

exports.init = function(app) {
    const router = app.router;

    router.get('/build', function *() {
        const cmd = 'npm run build';
        const cwd = path.resolve(__dirname, '../../../../');

        if (lock) {
            return this.body = {
                status: 'building'
            }
        }

        exec(cmd, { cwd }, (err, stdout, stderr) => {
            lock = false;

            if(err) {
                const errMsgs = [
                    '!!-- Exec Error --!!',
                    'Cmd: ['+ cmd +']',
                    'Error: ' + err,
                    'Stderr: ' + stderr,
                    'Stdout: ' + stdout,
                    '!!-- Exec Error End --!!'
                ];

                console.log(`> build error!`);
                console.log(errMsgs.join('\n'));
                return;
            }

            console.log(`> build success!`);
        });

        return this.body = {
            status: 'starting'
        }
    });
};
