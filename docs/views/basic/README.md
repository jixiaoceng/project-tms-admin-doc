# 指南

![vue](https://img.shields.io/badge/vue-3.9.2-brightgreen.svg)
![element-ui](https://img.shields.io/badge/element--ui-2.4.6-brightgreen.svg)

::: tip 说明
- 像路由、接口、页面组件均是按模块分组的，所以在添加新的路由、页面和接口时，一定要放置到对应的模块。接口、路由等纯js内容的模块都通过 `index.js` 对外暴露。
- 项目配置了 `ESLint` ，严格规范代码，当你没有按照规则进行书写代码时（例如：每个文件最后必须留一个空行，js语句末尾不可以添加 `;` ，过程中不需要修改的变量使用 `const` 声明，需要修改的使用 `let` 声明），会报错，请根据错误修正代码格式，或执行 `npm run lint` 。
:::

## 目录结构

```bash
├── build                      // 构建相关
├── public                     // 公共文件
│   ├── favicon.ico            // favicon图标
│   └── index.html             // html模板
├── src                        // 源代码
│   ├── api                    // 接口
│   ├── assets                 // 静态资源
│   ├── components             // 组件
│   ├── directive              // 指令
│   ├── customUI               // 自定义 UI库
│   ├── filters                // 过滤器
│   ├── iconFonts              // icon字体
│   ├── mixins                 // mixin
│   ├── mock                   // 接口模拟
│   ├── plugin                 // 插件
│   ├── router                 // 路由
│   ├── store                  // vuex
│   ├── styles                 // 全局样式
│   ├── utils                  // 工具
│   └── main.js                // 入口文件
├── .env.development           // npm run serve 时设置的全局变量
├── .env.production            // npm run build 时设置的全局变量
├── .babelrc.config.js         // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .gitignore                 // git 忽略项
└── package.json               // package.json
```

## 安装

```bash
# 克隆项目
git clone https://github.com/pp-jifangli/project-tms-admin

# 安装依赖
npm install # 或 yarn install # 或 cnpm install (推荐使用后两个npm install 初始化太慢)

# 本地开发 启动项目
npm run serve # 或 yarn run dev 或者 vue ui
```

<br/>

::: tip
npm 安装速度慢的问题，可以使用 `cnpm`。
:::

```bash
## 安装cnpm
npm install --registry=https://registry.npm.taobao.org

## 下面就可以使用cnpm来安装依赖了，例如
cnpm install vue
```

## 启动

```bash
npm run serve
```
启动后会自动打开浏览器访问 http://0.0.0.0:9527，默认路径的 IP 为 `0.0.0.0`，你可以将 IP 改为你本机的 IP，其他跟你的电脑连着同一个 wifi 的电脑和手机就可以你的启动的这个工程了。

## 按照eslint规范格式化代码

```bash
npm run lint
```

## 编译

```bash
npm run build
```

## 上线

### dev环境

::: warning
  1.需要更改.env.production文件里面的VUE_APP_BASE_API变量的值为https://dev.pplingo.com

  2.FTP推送代码，FTP地址：dev.pplingo.com，端口：8021，账号：devadmin，密码：qwer1234
:::

### stage环境

::: warning
  1.需要更改.env.production文件里面的VUE_APP_BASE_API变量的值为https://member.stage.pplingo.com

  2.build 之后把dist文件夹里面的文件复制到[www-Git仓库](https://github.com/pplingo/www.git)里面的admin文件夹下
:::

### 生产环境

::: warning
  1.需要更改.env.production文件里面的VUE_APP_BASE_API变量的值为https://member.lingoace.com

  2.build 之后把dist文件夹里面的文件复制到[www-Git仓库](https://github.com/pplingo/www.git)里面的admin文件夹下
:::

## 贡献

本文档项目地址 [tms-admin-doc](https://github.com/pp-jifangli/project-tms-admin-doc) 基于 [vuepress](https://github.com/vuejs/vuepress)开发。如果你觉得文档有需要优化的地方，请提交你的修改。

## 其他

### API

1. 数据请求已经做过封装，会对报错信息进行统一处理在页面不

### ESLint在本项目中规范

1. js语句末尾不得添加 `;` 
2. 不能声明没有使用的变量，如果确实要声明，请挂在到window对象上，或者本页面组件的data钩子上
3. 引号必须要使用单引号
4. 函数声明时的小括号两边需要留有空格
5. 代码行与行之间最多空一行，空行里不能有空格

