/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : 剩余时间格式化
 */

/**
 * 剩余时间格式化
 * @param  {Number} time   剩余时间
 * @param  {String} format 时间格式
 * @return {String}        格式化后的字符串
 */
module.exports = (time, format = '') => {
    const zero = (n) => {
        if (n > 0) {
            return String(n <= 9 ? `0${n}` : n);
        }

        return '00';
    };

    const hash = {
        s: '00',
        m: '00',
        h: '00',
        d: '00',
        M: '00',
        y: '0',
    };

    if (time > 0) {
        hash.s = zero(time % 60);
        hash.m = Math.floor((time / 60)) > 0 ? zero(Math.floor((time / 60)) % 60) : '00';
        hash.h = Math.floor((time / 3600)) > 0 ? zero(Math.floor((time / 3600)) % 24) : '00';
        hash.d = Math.floor((time / 86400)) > 0 ? zero(Math.floor((time / 86400)) % 30) : '00';
    }

    return format.replace(/([yMdhmsqS])+/g, (all, t) => {
        let v = hash[t];

        if (v !== undefined) {
            if (all.length > 1) {
                v = `0${v}`;
                v = v.substr(v.length - 2);
            }
            return v;
        }

        return all;
    });
};
