# API

:::tip 
1. 项目的接口按照模块进行分类，例如 **登录** 和 **获取用户信息** 这种的接口放在 `@/api/base.js` ，像 **供应链金融** 的接口都放在 `@/api/supplyChainFinance.js` 中，方便管理和引用；
2. 命名与页面组件一致，例如 **供应链金融** 的页面均放在 `@/views/supplyChainFinance/` 中；
3. 当你开发完新的口以后，一定记得过来更新文档。
:::

## 开发

如果要开发新的模块的接口，需要在/src/api/下新建以模块名为名字的js，如果在旧模块新增接口，只需要找到该模块新增即可。下面以test.js为例：

```javascript
/**
 * 请严格按以下案例来书写接口注释，如果某个参数为选填，外加optional
 */

// 版本处理
import OnlineVersion from '@/api/version'
// 请求方法
import RM from '@/utils/fetch.js'
// 引入 $get 和 $post，getVersion方法里的字符串，是该api文件所在平台的名称，与/src/api/version.js中的平台名字保持一致
const { $get, $post } = new RM(new OnlineVersion().getVersion('supplyChainFinance'))

/**
 * 登录
 * @param {Sting} phone 电话号码
 * @param {Sting} password 密码
 */
export function login (phone, password) {
  return $post('/user/login', {
    data: {
      phone,
      password
    }
  })
}

/**
 * 授信审核
 * @param {Object} params 参数对象，包括：
 *        creditId          {Number} 授信ID
 *        proposeAmount     {Number} 建议授信额度
 *        proposeSingleLoan {Number} 建议单笔放款最高金额
 *        insideOpinion     {String} 内部审批意见
 *        outsideOpinion    {String} 外部审批意见
 *        operation         {Number} 同意或拒绝，同意: 1，拒绝：2
 */
export function creditCheck (params) {
  return $get('/scf/credit', {
    data: params
  })
}

/**
 * 授信申请查询
 * @param {Object} params 参数对象，包括：
 *        companyName {String, optional} 客户名称
 *        socialCode  {String, optional} 社会信用代码
 *        state       {String, optional} 授信状态 100:拒绝 200:通过 300:待审核
 *        perPage     {Number, optional} 每页显示数
 *        page        {Number, optional} 页码
 *        startTime   {String, optional} 开始时间
 *        endTime     {String, optional} 结束时间
 *        type        {Number, optional} 审核状态 1:待办 2:已办
 */
export function creditSearch (params) {
  return $get('/scf/credits', {
    data: params
  })
}

/**
 * 资金方列表
 */
export function fundParty () {
  return $get('/scf/fundParty')
}
```


## 引用
在 `@/api/base.js` 中有 **登录** 和 **获取用户信息** 两个接口，如果只想引用登录接口，建议：

```javascript
import { login } from '@/api/base.js'

// 使用login接口
login({
  userName: '',
  password: ''
}).then(res => {})
```

如果想引用base.js中的所有接口，建议：

```javascript
import { base } from '@/api'
 
// 使用login接口
base.login({
  userName: '',
  password: ''
}).then(res => {})
```

## 版本

**项目中，会有三个地方可以设置接口的版本号，分别是：**

1. 保存在vuex中，代码位于 `/src/store/modules/user.js` 中，由userInfo接口返回并保存，优先级最弱；
2. 保存在 `/src/api/version.js` 中，只在分模块上线时使用，优先级中等；
3. 在每个接口方法中用用参数来传递，优先级最高。

首先，介绍一下请求（fetch.js）的封装：

```javascript
import Vue from 'vue'
import recoFetch from 'reco-fetch'
import store from '@/store'
import router from '@/router'
import HandleToken from '@/utils/auth'
const handleToken = new HandleToken()

/**
 * 处理请求头数据和处理结果
 * @param { Number | String } 平台传递的API版本号
 */
class HandleParamAndResult {
  constructor (apiVersion) {
    // 域名
    this.api = 'https://mwapi.emao.com'
    // api版本号
    this.apiVersion = apiVersion
  }

  // 添加请求头
  _addHeaders () {
    // 自定义headers
    const headers = {
      'Accept': `application/json; version=${this.apiVersion || store.getters.version}`
    }
    // 动态添加token
    if (handleToken.getToken()) {
      headers.Authorization = `Bearer ${handleToken.getToken()}`
    }
    return headers
  }

  // 处理请求
  dealFetch (url, options) {
    const _this = this
    options.headers = this._addHeaders()

    // do something before request
    return new Promise((resolve, reject) => {
      recoFetch(_this.api + url, options).then(res => {
        // do something after success
        resolve(res)
      }).catch(err => {
        console.error('request err:', err)
        if ((Number(err.status) === 401 && err.code !== 401100) || err.status == 'error') {
          handleToken.removeToken()
          router.push({ path: '/login' })
          return
        }
        Vue.prototype.$message({
          message: err.msg,
          type: 'error',
          duration: 3000
        })
        reject(err)
      })
    })
  }
}

/**
 * 封装请求方法
 * @param { Number | String } 平台传递的版本号
 */
class RequestMethod {
  constructor (apiVersion) {
    // api版本
    this.apiVersion = apiVersion
    this.$get = this.$get.bind(this)
    this.$post = this.$post.bind(this)
    this.$put = this.$put.bind(this)
    this.$delete = this.$delete.bind(this)
    this.$upload = this.$upload.bind(this)
    this._v = this._v.bind(this)
  }

  /**
   * 根据请求方法传入的版本号是否有效来来出版本号
   * @param { Number | String } version 版本号
   */
  _v (version) {
    return version !== undefined ? version : this.apiVersion
  }

  /**
   * 整合请求方法
   * @param { String } url 接口路由
   * @param { Object } fetch配置 请求参数
   * @param { Number | String } version2 请求方法传递的版本号，优先级高于平台传递的版本号
   */
  _method (url, options, version2) {
    return new HandleParamAndResult(this._v(version2)).dealFetch(url, options)
  }

  /**
   * get方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   * @param { Number | String } version2 请求方法传递的版本号，优先级高于平台传递的版本号
   */
  $get (url, data, version2) {
    return this._method(url, {
      params: data,
      method: 'get'
    }, version2)
  }

  /**
   * post方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   * @param { Number | String } version2 请求方法传递的版本号，优先级高于平台传递的版本号
   */
  $post (url, data, version2) {
    return this._method(url, {
      body: data,
      method: 'post',
      type: 'json'
    }, version2)
  }

  /**
   * put方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   * @param { Number | String } version2 请求方法传递的版本号，优先级高于平台传递的版本号
   */
  $put (url, data, version2) {
    return this._method(url, {
      body: data,
      method: 'put',
      type: 'json'
    }, version2)
  }

  /**
   * delete方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   * @param { Number | String } version2 请求方法传递的版本号，优先级高于平台传递的版本号
   */
  $delete (url, data, version2) {
    return this._method(url, {
      params: data,
      method: 'delete'
    }, version2)
  }

  /**
   * 上传方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   * @param { Number | String } version2 请求方法传递的版本号，优先级高于平台传递的版本号
   */
  $upload (url, data, version2) {
    return this._method(url, {
      body: data,
      method: 'post',
      type: 'formData'
    }, version2)
  }
}

export default RequestMethod
```