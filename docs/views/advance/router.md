# 路由

::: tip 说明
1. 路由分为两部分：
    - `/src/router/base/` 下的基础路由，包括登录、404等基础路由；
    - `/src/router/version/` 下的版本路由，这部分路由与版本相关，不同版本下的同一路由可能指向不同的页面组件
2. `/src/router/version/` 下的文件夹是版本号，再里面才是业务路由，见 [版本划分](version.html)。
:::

**路由路径**

```bash
├── base                 // 基础路由
└── version              // 版本控制路由
```

## 配置项

首先我们了解一些本项目配置路由时提供了哪些配置项。

```js
// 当设置 noredirect 的时候该路由在面包屑导航中不可被点击
redirect: noredirect
component: () => import(`@/${baseURI}creditReview`),
name: 'router-name' // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta: {
  title: 'title',   // 设置该路由在侧边栏和面包屑中展示的名字
  noCache: true,    // 如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  mustCache: true,   // 如果设置为true ,当前页面的上一个页面必须缓存（比如列表页A跳转详情页A1，列表页A需要缓存，但是列表页A跳转其他页面B是不需要缓存的，这时详情页A1需要设置mustCache：true，页面A组件必须设置为name，且格式为大驼峰）
  pubPage: ''   // 如果二级页面有单独通过地址跳转页面的需求，需要添加次属性，值为其对应的一级页面的路由地址

```

<br>

## 接口返回的权限树状数据

```json
{
  "permission": [
    {
      "icon": "icon-supply",
      "title": "供应链金融",
      "children": [
        {
          "icon": "icon-credit",
          "title": "授信管理",
          "children": [
            {
              "icon": "icon-home",
              "title": "授信管理",
              "children": [
                {
                  "icon": "icon-home",
                  "title": "授信申请查询",
                  "path": "\/supplyChainFinance\/creditSearch",
                  "children": ""
                },
                {
                  "icon": "icon-home",
                  "title": "授信申请审核",
                  "path": "\/supplyChainFinance\/creditReview",
                  "children": ""
                },
                {
                  "icon": "icon-home",
                  "title": "客户额度维护",
                  "path": "\/supplyChainFinance\/customerLine",
                  "children": ""
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

::: warning 注意事项
如果这里有一个需要非常注意的地方就是 `404` 页面一定要最后加载，详细的问题见 [addRoutes when you've got a wildcard route for 404s does not work](https://github.com/vuejs/vue-router/issues/1176)
:::

<br>
