/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const fecha = require('fecha');

const fs = require('fs');
const path = require('path');
const http = require('http');
const querystring = require('querystring');

const menuDir = './_posts/'; // md文件存储目录


// 读取文件
const readFile = filename => {
    return new Promise((resolve, reject) => {
        let callback = (err, res) => {
            if(err){
                reject(err);
            } else {
                resolve(res);
            }
        };

        fs.readFile(filename, 'utf-8', callback);
    });
}

// 分析文件内容
const analysisFile = filename => {
    const post = {};

    function matchMatters(text, key) {
        const reg = new RegExp(`${key}\:(\s*)(.+)`, 'i');
        const arr = text.match(reg);

        if (arr && arr.length) {
            return arr[2];
        } else {
            return '';
        }
    }

    function matchDate(name) {
        const arr = name.match(/(\d+)-(\d+)-(\d+)/);

        if (arr && arr.length) {
            return fecha.format(new Date(arr[0]), 'YYYY-MM-DD HH:mm:ss');
        } else {
            return fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        }
    }

    return new Promise((resolve, reject) => {
        readFile(filename)
            .then(res => {
                res = String(res);

                if (!res.length) reject();

                const matters = res.match(/^---\n[\w\W]*---\n/g);
                const release_at = matchDate(filename);
                let content = res.replace(/^---\n[\w\W]*---(\s*)(\n*)/g, '');
                content = content.replace('{{ site.qiniu }}', 'http://zhuowenli.qiniudn.com');
                content = content.replace('{{site.qiniu}}', 'http://zhuowenli.qiniudn.com');

                if (matters && matters.length) {
                    const matter = matters[0];

                    _.assign(post, {
                        title: matchMatters(matter, 'title') || '没有标题',
                        categories: matchMatters(matter, 'categories'),
                        tags: matchMatters(matter, 'tags').replace(/\[|\]/ig, ''),
                        content,
                        release_at,
                    });
                } else {
                    _.assign(post, {
                        title: '没有标题',
                        content,
                        release_at,
                    });
                }

                resolve(post)

            }, res => {
                console.log(res);
            });
    });
}

// 获取目录下所有文件，并执行文件分析。
function readAllFiles() {
    const lists = fs.readdirSync(menuDir);
    let data = [];

    return new Promise((resolve, reject) => {
        Promise.each(lists, (filename, i) => {
            return analysisFile(path.join(menuDir, filename))
                .then(res => {
                    data.push(res);
                }, res => {
                    console.log(res);
                });
        })
        .then((res) => {
            console.log('> 资源加载完毕');
            resolve(data);
        });
    });
}

function runPost(data, callback) {

    const postData = querystring.stringify(data);

    // const api = 'http://www.zhuowenli.cn/api/posts'; // API接口
    const options = {
        hostname: 'www.zhuowenli.cn',
        port: '80',
        path: '/api/posts',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-length': Buffer.byteLength(postData)
        }
    }

    const req = http.request(options, res => {
        let data = '';
        let dataLen = 0;

        res.setEncoding('utf8');
        res.on('data', function(chunk) {
                dataLen += chunk.length;
                data += chunk.toString();
            })
            .on('end', function() {
                // console.log(data);
            });

        callback();
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(postData);

    req.end();
}

function init() {
    console.log('> 资源加载中...');

    readAllFiles()
        .then((res) => {
            console.log('> 资源上传中...');

            res.map((data, i) => {
                runPost(data, () => {
                    console.log(`> 第${i + 1}篇文章上传成功`);
                });
            });
        });
}

init();

