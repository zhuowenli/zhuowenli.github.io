# 数据库

MongoDB，采用JSON作为数据结构！

## 表结构

### posts

    {
        author      : { type: String, default: config.author }, // 作者
        content     : { type: String },
        title       : { type: String },
        cover       : { type: String },                         // 封面图
        like_count  : { type: Number },                         // 喜欢数
        category    : { type: ObjectId},                        // 分类: 前端，设计，生活日志
        tags        : { type: String },                         // 标签: 英文逗号「,」分隔
        excerpt     : { type: String },                         // 简介
        created_time: { type: Date, default: Date.now },        // 创建时间
        updated_time: { type: Date, default: Date.now },        // 更新时间
        deleted_time: { type: Date, default: null },            // 删除时间
        status      : { type: Number, default: null }           // 文章状态，0: 待发布, 1: 发布中, 2: 已删除
    }

### categorys

    {
        name        : '前端',
        created_time: '1459172082',       // 创建时间
        updated_time: '1459172082',       // 更新时间
        deleted_time: '1459172082',       // 删除时间
    }

### tags

    {
        name        : { type: String },
        post_id     : { type: ObjectId },                  // 对应文章ID
        created_time: { type: Date, default: Date.now }, // 创建时间
        updated_time: { type: Date, default: Date.now }, // 更新时间
        deleted_time: { type: Date, default: null },     // 删除时间
    }





