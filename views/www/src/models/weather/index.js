/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

module.exports =  {
    getWeather(ctx) {
        return ctx.$http.get(`http://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: 'Xiamen,cn',
                appid: '1d3c089b6c07ff9d310991b93cd8b0c4'
            }
        });
    }
}