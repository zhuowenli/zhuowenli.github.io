# 数据库

MongoDB，采用JSON作为数据结构！

## 表结构

### posts

    {
        author      : '卓文理',            // 作者
        content     : '具体文章内容...',
        title       : '文章标题',
        category    : 1,                  // 分类，1:前端，2: 设计，3:生活日志
        tags        : '前端,html5,ES2015', // 标签，英文逗号「,」分隔
        excerpt     : '文章摘要...',
        created_time: '1459172082',       // 创建时间
        updated_time: '1459172082',       // 更新时间
        deleted_time: '1459172082',       // 删除时间
        status      : 1                   // 文章状态，0: 待发布, 1: 发布中, 2: 已删除
    }

### categorys

    {
        id          : 1,
        name        : '前端',
        created_time: '1459172082',       // 创建时间
        updated_time: '1459172082',       // 更新时间
        deleted_time: '1459172082',       // 删除时间
    }

### tags

    {
        id          : 1,
        parent_id   : 0,                  // 父级ID
        name        : 'JavaScript',
        post_id     : 10086,              // 对应文章ID
        created_time: '1459172082',       // 创建时间
        updated_time: '1459172082',       // 更新时间
        deleted_time: '1459172082',       // 删除时间
    }





