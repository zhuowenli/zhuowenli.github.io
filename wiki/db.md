# 数据库


## 表结构

### posts

    {
        title       : { type: String },
        content     : { type: String },
        excerpt     : { type: String },                  // 简介
        status      : { type: Number, default: null }    // 文章状态，0: 待发布, 1: 发布中, 2: 已删除
        user_id     : { type: Number, default: 0 },      // 作者
        category_id : { type: Number},                   // 分类: 前端，设计，生活日志
        priority    : { type: Number },
        like_count  : { type: Number },                  // 喜欢数
        view_count  : { type: Number },
    }

### categorys

    {
        name        : '前端',
    }

### users

    {
        username    : { type: String },
        avatar_url  : { type: String },
        status      : { type: Number },
    }

### tags

    {
        name        : { type: String },
        priority    : { type: Number },
    }

### tag_logs

    {
        tag_id     : { type: ObjectId },  // 标签ID
        post_id     : { type: ObjectId }, // 对应文章ID
    }





