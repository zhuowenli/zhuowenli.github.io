const mongoose   = require('mongoose');
const {Schema}   = mongoose;
const {ObjectId} = Schema;
const config     = require('../config');

let TagsSchema = new Schema({
    parent_id   : { type: Number, default: 0 },      // 父级ID
    name        : { type: String },
    post_id     : { type: Number },                  // 对应文章ID
    created_time: { type: Date, default: Date.now }, // 创建时间
    updated_time: { type: Date, default: Date.now }, // 更新时间
    deleted_time: { type: Date, default: null },     // 删除时间
});

PostSchema.index({name: 1});

mongoose.model('Post', PostSchema);
