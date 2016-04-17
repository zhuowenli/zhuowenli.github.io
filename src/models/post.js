const mongoose   = require('mongoose');
const {Schema}   = mongoose;
const {ObjectId} = Schema;
const config     = require('../config');

let PostSchema = new Schema({
    author      : { type: String, default: config.author }, // 作者
    content     : { type: String },
    title       : { type: String },
    cover       : { type: String },                         // 封面图
    like_count  : { type: Number },                         // 喜欢数
    category    : { type: Number, default: 3 },             // 分类，1:前端，2: 设计，3:生活日志
    tags        : { type: String },                         // 标签，英文逗号「,」分隔
    excerpt     : { type: String },                         // 简介
    created_time: { type: Date, default: Date.now },        // 创建时间
    updated_time: { type: Date, default: Date.now },        // 更新时间
    deleted_time: { type: Date, default: null },            // 删除时间
    status      : { type: Number, default: null }           // 文章状态，0: 待发布, 1: 发布中, 2: 已删除
});

PostSchema.index({created_time: -1});

mongoose.model('Post', PostSchema);
