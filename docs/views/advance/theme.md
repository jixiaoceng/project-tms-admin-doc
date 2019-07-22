# 换肤

### 原理

::: tip 说明
**element-ui 2.0** 版本之后所有的样式都是基于 SCSS 编写的，所有的颜色都是基于几个基础颜色变量来设置的，所以就不难实现动态换肤了，只要找到那几个颜色变量修改它就可以了。 首先我们需要拿到通过 package.json 拿到 element-ui 的版本号，根据该版本号去请求相应的样式。拿到样式之后将样色，通过正则匹配和替换，将颜色变量替换成你需要的，之后动态添加 style 标签来覆盖原有的 css 样式。<br>
:::

**具体方法见代码：**

```html
<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"/>
</template>

<script>

const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color

export default {
  data() {
    return {
      chalk: '', // content of theme-chalk css
      theme: ORIGINAL_THEME
    }
  },
  watch: {
    theme(val, oldVal) {
      if (typeof val !== 'string') return
      // 新的样式集群
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      // 前面旧的样式集群
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))

      // 生成回调函数
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

          // 将新的样式放到一个id为id的style标签里，用来覆盖原来的样式文件，以达到换肤目的
          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }

      // 回调函数
      const chalkHandler = getHandler('chalk', 'chalk-style')

      // 如果从线上获取过样式文件，需要去获取，若以获取，只需要去重新赋值
      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }

      // 这段代码目的不明确，单从代码来看：如果前面没有样式如果没有写入style标签，这里重新填入
      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => {
        console.log('style', typeof style)
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })

      // 换肤成功提示
      this.$message({
        message: '换肤成功',
        type: 'success'
      })
    }
  },
  created() {
  },
  methods: {
    /**
     * 将样式文件里的旧主题颜色变为新主题颜色
     * @param style 样式文件
     * @param oldCluster 旧主题样式集群
     * @param newCluster 新主题样式集群
     */
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },
    // 获取线上的样式
    /**
     * 获取线上的样式
     * @param url 文件地址
     * @param callback 回调
     * @param variable 样式
     */
    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },
    /**
     * 获取主题集群
     * @param theme 主题颜色
     */
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>

<style>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
```