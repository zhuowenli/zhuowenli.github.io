/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : 日期时间格式化
 */

/**
 * 日期时间格式化
 * @param  {Date}   time   时间
 * @param  {String} format 格式化内容 'yyyy-MM-dd hh:mm:ss'
 * @return {String}        格式化后的时间 '2016-05-04 12:12:00'
 */
const dateFormat = (time, format = 'yyyy-MM-dd hh:mm:ss') => {
    const date = new Date(time);

    const map = {
        M: date.getMonth() + 1, // 月份
        d: date.getDate(),      // 日
        h: date.getHours(),     // 小时
        m: date.getMinutes(),   // 分
        s: date.getSeconds(),   // 秒
        q: Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(),                // 毫秒
    };

    return format.replace(/([yMdhmsqS])+/g, (all, t) => {
        let v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = `0${v}`;
                v = v.substr(v.length - 2);
            }
            return v;
        } else if (t === 'y') {
            return (String(date.getFullYear())).substr(4 - all.length);
        }
        return all;
    });
};

module.exports = dateFormat;
