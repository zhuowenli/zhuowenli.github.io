/*
 * @Author: 卓文理
 * @Email : 531840344@qq.com
 * @Desc  : lib/db.timestamp 序列化时日期字段，默认转换为时间戳
 */
'use strict';

const DEFAULT_TIMESTAMP_KEYS = ['created_at', 'updated_at'];

module.exports = function(db) {

    const Model = db.Model;

    let _serialize = Model.prototype.serialize;

    Model.prototype.serialize = function(options) {
        let attrs = _serialize.call(this, options);

        let timestamps = this.hasTimestamps;

        if(timestamps) {
            if(!Array.isArray(timestamps)) {
                timestamps = DEFAULT_TIMESTAMP_KEYS;
            }

            // only supoort, created & updated
            let createdKey = timestamps[0];
            let updatedKey = timestamps[1];

            // covert date to timestamp
            attrs[createdKey] = +attrs[createdKey] || 0;
            attrs[updatedKey] = +attrs[updatedKey] || 0;
        }

        return attrs;
    };

    return db;
};
