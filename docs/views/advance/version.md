## 版本划分

### 版本号规则

#### 大版本代号划分

:::tip
后台项目根据人类历史时期进行划分，共有10个时代
(代号仅供参考，如有其他主题，可替换):
1. 石器时代，代号：**Stone**
2. 红铜时代，代号：**Copper**
3. 青铜时代，代号：**Bronze**
4. 铁器时代，代号：**Iron**
5. 黑暗时代，代号：**Dark**
6. 启蒙时代，代号：**Enlightenment**
7. 蒸汽时代，代号：**Steam**
8. 电气时代，代号：**Electricity**
9. 原子时代，代号：**Atomic**
10. 信息时代，代号：**Information**
:::

:::warning
* 对外版本号相对应的，**Stone** = V1，**Copper** = V2，以此类推
* 代号的应用范围为代码及文件名、目录名等
* 对外版本号则为接口中提供调用的版本号，即：application/json; version=2 在代码中为 **Copper**，接口中的版本号不需要加上 **V**
:::

#### 中版本代号划分

:::tip
中版本号根据英文的数字进行划分
* 1 = *One*
* 2 = *Two*
* 以此类推，
* 11 = *Eleven*
* 12 = *Twelve*
* ...
:::

:::warning
* V1.1 = **StoneOne**
* V1.3 = **StoneThree**
* V3.2 = **BronzeTwo**
:::

#### 小版本代号划分

:::tip
小版本号根据罗马数字进行划分

* 1 = I
* 2 = II
* 3 = III
* 4 = IV
* 5 = V
* ...
:::

:::warning
V1.1.3 = **StoneOneIII**
V3.1.9 = **BronzeOneIX**
V3.12.8 = **BronzeTwelveVIII**
:::

#### 最终呈现

```
V1.1 = app/Http/Actions/StoneOne
V3.12.8 = app/Http/Actions/BronzeTwelveVIII
```

### 根据版本号获取相应的路由

在登录之后，获取用户信息接口会返回给我们version，例如 `1.0.0` ，我们通过 `/src/utils/getVersion.js` 提供的getVersion方法，将 `1.0.0` 转化为 `Stone` ，然后我们再去 `/src/router/version/Stone` 获得路由，通过 `addRouter` 方法，添加到 `vue-router` 中，代码如下：

```javascript

```