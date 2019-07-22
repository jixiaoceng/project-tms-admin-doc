# MOCK

:::tip
项目已经接入真实接口，为了在不影响已有代码的前提下进行开发，对接口（尤其针对登录接口）进行mock处理。<br>
新增依赖 **fetch-mock** ，如果本地没有，先执行 **npm install** 安装依赖。
:::

#### 启动MOCK

在启动项目时将 `npm run dev` 换为 `npm run dev:mock` 。

```bash
npm run dev:mock
```

#### 新增MOCK

mock相关文件均放在 `/src/mock` 目录下，请根据已有的登录接口MOCK进行处理，因为mock的response需要放在函数中通过return返回，所以请严格按照已有格式进行添加。

#### 登录权限调整

:::warning
因为mock主要针对登录权限做处理，所以详细讲一下这里。首先mock接口已经配置好，只需要调整权限内容就可以了。<br>

权限文件放在 `/src/mock/permission.js` 中，如果调整权限，请按照权限规则进行调整。
:::