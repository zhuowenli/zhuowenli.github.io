/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @site  : www.zhuowenli.com
 */

exports.matchPath = (req, url) => {
    let reg = new RegExp(url);


    if (url == '/' && url != req.url) return false;

    return reg.test(req.url);
};