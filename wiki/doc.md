# 接口文档

## 文章相关

### 获取文章列表

请求：

    GET: /api/posts

请求参数：

    {
        page        : 1,                  // 页码
        per_page    : 30,                 // 每页返回数量
        category_id : 1,                  // 分类ID（可选），0 || '':所有，1:前端，2: 设计，3:生活日志
        tag_id      : 123,                // 标签ID（可选）
        search      : 'hello world',      // 模糊查询（可选）
        status      : 1,                  // 文章状态（可选）
        order_by    : 'id',               // 排序方式（可选）
        order_status: 'desc',             // 排序方向（可选），asc: 正序，desc: 倒叙
    }

### 创建文章

请求：

    POST: /api/posts

请求参数：

    {
        author      : '卓文理',            // 作者
        content     : '具体文章内容...',
        title       : '文章标题',
        categories  : 'frontend',         // 分类，frontend:前端，design: 设计，diary:生活日志
        tags        : '前端,html5,ES2015', // 标签，英文逗号「,」分隔
        excerpt     : '文章摘要...',
        release_at  : '1459172082',       // 创建时间
        status      : 1,                  // 文章状态
        images      : [{url: xxx, width: xx}] // 图片
    }

### 获取文章详情

请求：

    GET: /api/posts/{:id}

### 更新文章

请求：

    PUT: /api/posts/{:id}

请求参数：

    {
        author      : '卓文理',            // 作者
        content     : '具体文章内容...',
        title       : '文章标题',
        categories  : 'frontend',         // 分类，frontend:前端，design: 设计，diary:生活日志
        tags        : '前端,html5,ES2015', // 标签，英文逗号「,」分隔
        excerpt     : '文章摘要...',
        release_at  : '1459172082',       // 创建时间
        status      : 1,                  // 文章状态
        images      : [{url: xxx, width: xx}] // 图片
    }

### 删除文章

请求：

    DELETE: /posts/{:id}
