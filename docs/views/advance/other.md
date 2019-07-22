# 其他

## 使用过的包

- NProgress 加载进度条
- Cookies cookies相关

## 侧边栏滚动问题

之前版本的滚动都是用 css 来做处理的

```css
overflow-y: scroll;

::-webkit-scrollbar {
  display: none;
}
```

首先这样写会有兼容性问题，在火狐或者其它低版本浏览器中都会比较不美观。其次在侧边栏收起的情况下，受限于 `element-ui`的 `menu` 组件的实现方式，不能使用该方式来处理。

所以现版本中使用了 `el-scrollbar` 来处理侧边栏滚动问题。 `el-scrollbar` 在 `ElementUI` 文档中并没有出现，是一个隐藏的组件哦^_^。

## 项目改造建议
- 【已完成】这个项目里的图标用的是svg，可以考虑使用font-icon
- 【待解决】vuex里的一些状态，并不需要，可以根据需求清理
- 【待解决】过滤器里的一些方法可以去掉，并根据需求添加新的过滤器

## 遇到的坑

- 偶尔报错 `This is probably not a problem with npm. There is likely additional logging output above.`，这是host的指向有问题，将/config/index.js下载的host指向0.0.0.0
- 遇到报错 `TypeError: Cannot read property 'tap' of undefined`，解决方法:
  - set "html-webpack-plugin": "^4.0.0-alpha" => "4.0.0-alpha"
  - remove node_modules
  - remove package-lock.json
  - npm install
- 路由内部参数使用/:id的方式，为的是与后台接口传参不冲突
- 主题色切换无效的bug是因为从线上加载出来的默认颜色值是唯一的，自己更改后会无法替换
- vue在计算属性中将data钩子中的某个变量A赋值给某个普通变量B，更改B，data中的A也会变
- 页面刷新时页面会先跳转到'/'，再跳转到'/指定路由'，并且跳转'/'时，name为null，第二次的跳转不能获取name
