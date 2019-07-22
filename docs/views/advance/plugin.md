# 插件

:::tip
vue提供的插件功能是非常方便的，会为 Vue 添加全局功能，包括但不限于：全局方法和属性、指令、过滤器、过渡、mixin、实力方法、API，例如 `vue-loader` 就是一个插件而已，它需要通过 `Vue.use(my-plugin-name)` 引入。
:::

**Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象：**

```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

**使用插件**

```javascript
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

// or 传入参数
Vue.use(MyPlugin, { someOption: true })
```

**eMao-Admin 项目中使用**

```javascript
import * as directives from '@/directive'
import * as filters from '@/filters'
import * as requests from '@/utils/fetch.js'
import * as components from '@/emaoUI'

const Plugin = {}
Plugin.install = Vue => {
  // 遍历注入所有的directive
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })

  // 遍历注入所有的filter
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })

  // 遍历注入所有的requests
  Object.keys(requests).forEach(key => {
    Vue.prototype[key] = requests[key]
  })

  // 遍历注入所有的components
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

export default Plugin
```