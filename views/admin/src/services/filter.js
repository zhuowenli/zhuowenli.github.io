/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Vue过滤器
 */

import timeFormat from './timeFormat';
import dateFormat from './dateFormat';

/**
 * Vue Filter
 * @param  {Object} Vue Vue主进程
 */
export default function (Vue) {
    /**
     * 日期格式化
     * @param  {Date}   date     日期时间
     * @param  {String} format   时间格式
     */
    Vue.filter('date', (date, format = 'yyyy-MM-dd hh:mm:ss') => dateFormat(date, format));
    /**
     * 剩余时间格式化
     * @param  {Number} time   剩余时间
     * @param  {String} format 格式
     */
    Vue.filter('timeFormat', (time, format = 'mm:ss') => timeFormat(time, format));
}