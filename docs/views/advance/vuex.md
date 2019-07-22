# 公共状态

::: tip 说明
在 **eMao-Admin** 中，Vuex采用的是模块化处理方式，但是getter单独放在了外面；

因为 **Mutation** 只能是同步函数，所以只能触发一个commit来改变一个 **State** ； **Action** 可以是异步函数，可以同时触发多个commit来出发多个 **State** 的改变；所以根据这个特点，我们在设计Store的时候，遵循以下条件：

- 触发一个或同步触发多个 **State** 的情况使用 **Mutation**
- 异步触发多个 **Mutation** 或者配合 **Promise** 的情况使用 **Action**
- 获取 **State** 通过 **mapGetters**
- **mapState** 暂不使用

关于Vuex的系统知识，请见 [**Vuex精简**](https://recoluan.gitlab.io/views/frontEnd/2018/2018091001.html)。
:::

## app-程序本身

#### State

- **sidebar** 侧边栏打开状态、是否开启状态过渡
- **device** 打开设备
- **themeColo** 主题颜色
- **pageTitle** 页面头部文案

#### Mutation

- **TOGGLE_SIDEBAR** 是否开启侧边栏
- **OPEN_SIDEBAR** 开启侧边栏
- **CLOSE_SIDEBAR** 关闭侧边栏
- **TOGGLE_DEVICE** 打开设备是移动端还是PC端
- **CHANGE_THEME_COLOR** 切换主题颜色
- **SET_PAGE_TITLE** 设置页面头部文案

## user-用户

#### State

- **user** 用户
- **status** 状态
- **token** token
- **name** 名字
- **avatar** 头像
- **introduction** 介绍
- **roles** 角色
- **setting** 设置

#### Mutation

- **SET_TOKEN** 设置token
- **SET_INTRODUCTION** 设置介绍
- **SET_SETTING** 设置设置
- **SET_STATUS** 设置状态
- **SET_NAME** 设置名字
- **SET_AVATAR** 设置头像
- **SET_ROLES** 设置角色

#### Actions

- **LoginByUsername** 通过用户名登录，并提交SET_TOKEN
- **GetUserInfo** 获取用户信息，并提交SET_ROLES、SET_NAME、SET_AVATAR、SET_INTRODUCTION
- **LogOut** 登出，并提交（清空）SET_TOKEN，SET_ROLES
- **FedLogOut** 前端登出（获取用户信息失败），并提交（清空）SET_TOKE
- **ChangeRoles** 

## tagsView-标签

#### State

- **visitedViews** 浏览过的页面
- **cachedViews** 缓存的页面

#### Mutation

- **ADD_VISITED_VIEWS** 添加浏览过的页面
- **DEL_VISITED_VIEWS** 删除浏览过的页面
- **DEL_OTHERS_VIEWS** 删除其他页面
- **DEL_ALL_VIEWS** 删除所有页面

#### Actions

- **delVisitedViews** 提交DEL_VISITED_VIEWS
- **delOthersViews** 提交DEL_OTHERS_VIEWS

## errorLog-日志处理

#### State

- **logs** 日志池

#### Mutation

- **ADD_ERROR_LOG** 添加错误日志

## tabs-菜单

#### State

- **menuMap** 能够访问的菜单数组
- **moduleMenuIndex** 当前页面的所在模块
- **firstMenuIndex** 当前页面的所在一级菜单
- **secondMenuIndex** 当前页面的所在二级菜单

#### Mutation

- **SET_ROUTERS** 设置路由

#### Actions

- **SET_MENU_MAP** 设置菜单数组
- **SET_MODULE_MENU_INDEX** 设置当前页面的所在模块
- **SET_FIRST_MENU_INDEX** 设置当前页面的所在一级菜单
- **SET_SECOND_MENU_INDEX** 设置当前页面的所在二级菜单
- **SET_MENU_INDEX** 设置页面所在模块、所在一级菜单、所在二级菜单
