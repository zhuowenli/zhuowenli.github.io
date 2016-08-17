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
                const content = res.replace(/^---\n[\w\W]*---(\s*)(\n*)/g, '');
                const create_at = matchDate(filename);

                if (matters && matters.length) {
                    const matter = matters[0];

                    _.assign(post, {
                        title: matchMatters(matter, 'title') || '没有标题',
                        categories: matchMatters(matter, 'categories'),
                        tags: matchMatters(matter, 'tags').replace(/\[|\]/ig, '').split(/,/),
                        content,
                        create_at,
                    });
                } else {
                    _.assign(post, {
                        title: '没有标题',
                        content,
                        create_at,
                    });
                }

                resolve(post)

            }, res => {
                console.log(res);
            });
    });
}

function readAllFiles() {
    const lists = fs.readdirSync('./_posts/');
    let data = [];

    return new Promise((resolve, reject) => {
        Promise.map(lists, (filename) => {
            return analysisFile(`./_posts/${filename}`)
                .then(res => {
                    data.push(res);
                }, res => {
                    console.log(res);
                });
        })
        .then((res) => {
            resolve(data);
        });
    });
}

readAllFiles()
    .then((res) => {
        console.log(res);
    });


