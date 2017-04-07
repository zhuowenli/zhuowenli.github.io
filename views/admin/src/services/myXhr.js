/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Promise Ajax
 */

const myXhr = {};

const isDev = !/zhuowenli\.com/.test(window.location.href);

/**
 * 封装 Promise Ajax
 * @param  {Obejct} data ajax参数
 * @return {Promise}     返回promise对象
 */
myXhr.ajax = data => new Promise((resolve, reject) => {
    const param = Object.assign({}, data);
    param.dataType = param.dataType || 'json';

    $.ajax(param)
        .done((...argv) => resolve(...argv))
        .fail((...argv) => reject(...argv));
});

/**
 * 封装get、post、put、delete方法
 * @param  {String}   url      请求URL
 * @param  {Object}   param    请求参数
 * @param  {Function} cb       回调函数
 * @param  {String}   datatype 返回数据格式
 */
String('get, post, put, delete').replace(/\w+/g, (type) => {
    myXhr[type] = (url, data, callback, dataType) => {
        if ($.isFunction(data)) {
            dataType = callback;
            callback = data;
            data = undefined;
        }

        if(!/(https?:)?\/\//.test(url)) {
            url = isDev ? `//admin.zhuowenli.cn${url}` : `//admin.zhuowenli.com${url}`;
        }

        const params = {
            url,
            type,
            data,
            dataType,
            success: callback
        };

        return myXhr.ajax(params);
    };
});

export default myXhr;
