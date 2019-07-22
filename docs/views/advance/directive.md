# 指令

## v-permission

功能：设置查看权限

```html
<!-- 接受字符串 -->
<span v-permission="'admin'"></span>

<!-- 接受数组 -->
<span v-permission="['admin']"></span>

<!-- 不加修饰符是将没有权限的模块隐藏，加上clear修饰符则是将没有权限的模块删除 -->
<span v-permission.clear="'admin'"></span>
```
