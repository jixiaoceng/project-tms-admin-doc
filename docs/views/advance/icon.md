# 图标

## 什么是 icon fonts?
利用字体工具把我们平时 Web 上用的图形图标（icons）转换成 web fonts，就成了 icon fonts，它可以借助 CSS 的 @font-face 嵌入到网页里，用以显示 icons。因为字体是矢量化图形，它天生具有「分辨率无关」的特性，在任何分辨率和PPI下面，都可以做到完美缩放，不会像传统位图， 如：png，jpeg，放大后有锯齿或模糊现象。

## 为什么要用 icon fonts？
除了「分辨率无关」这个最大的优点之外，icon fonts 还具有：

- 文件小：相比图片几十几百KB的容量，icon fonts 几乎是羽翼级轻量。
- 加载性能好：因为图标都被打包进一套字体内，http request 减少。这如同我们常用的 css sprites 技术。
- 支持CSS样式：和普通字体一样，你可以利用CSS来定义大小、颜色、阴影、hover状态、透明度、渐变等等…
- 兼容性好：web fonts 起源很早，别说主流浏览器，连IE6/7都能良好支持。除了一些老的移动端浏览器，如Android 2.1以下的初代浏览器，Opera mini 这类自限型浏览器。

## 如何制作 icon fonts？
**icon fonts 的制作主要有两条思路：**

- 利用字体工具手动制作
- 利用在线工具自动生成

**我们使用的是阿里妈妈MUX倾力打造的矢量图标管理、交流平台——[iconfont](http://iconfont.cn/)**

设计师可以将图标上传到Iconfont平台；前端工程师可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用。

## 如何去使用 icon fonts？

### unicode引用
unicode是字体在网页端最原始的应用方式，特点是：

- 兼容性最好，支持ie6+，及所有现代浏览器。
- 支持按字体的方式去动态调整图标大小，颜色等等。
- 但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。
- 注意：新版iconfont支持多色图标，这些多色图标在unicode模式下将不能使用，如果有需求建议使用symbol的引用方式

unicode使用步骤如下：

**第一步：拷贝项目下面生成的font-face**

```css
@font-face {
  font-family: 'emao-icon';
  src: url('iconfont.eot');
  src: url('iconfont.eot?#iefix') format('embedded-opentype'),
  url('iconfont.woff') format('woff'),
  url('iconfont.ttf') format('truetype'),
  url('iconfont.svg#emao-icon') format('svg');
}
```

**第二步：定义使用iconfont的样式**

```css
.emao-icon{
  font-family:"emao-icon" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
```

**第三步：挑选相应图标并获取字体编码，应用于页面**

```html
<i class="emao-icon">&#x33;</i>
```

### font-class引用（这也是目前我们在使用的方式）

font-class是unicode使用方式的一种变种，主要是解决unicode书写不直观，语意不明确的问题。

与unicode使用方式相比，具有如下特点：

- 兼容性良好，支持ie8+，及所有现代浏览器。
- 相比于unicode语意明确，书写更直观。可以很容易分辨这个icon是什么。
- 因为使用class来定义图标，所以当要替换图标时，只需要修改class里面的unicode引用。
- 不过因为本质上还是使用的字体，所以多色图标还是不支持的。

使用步骤如下：

**第一步：引入项目下面生成的fontclass代码：**

```html
<link rel="stylesheet" type="text/css" href="./iconfont.css">
```

**第二步：挑选相应图标并获取类名，应用于页面：**

```html
<i class="emao-icon icon-xxx"></i>
```


### symbol引用
这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个svg的集合，与另外两种相比具有如下特点：

- 支持多色图标了，不再受单色限制。
- 通过一些技巧，支持像字体那样，通过font-size,color来调整样式。
- 兼容性较差，支持 ie9+,及现代浏览器。
- 浏览器渲染svg的性能一般，还不如png。

使用步骤如下：

**第一步：引入项目下面生成的symbol代码：**

```html
<script src="./iconfont.js"></script>
```

**第二步：加入通用css代码（引入一次就行）：**

```html
<style type="text/css">
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>
```

**第三步：挑选相应图标并获取类名，应用于页面：**

```html
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-xxx"></use>
</svg>
```

## eMao-Admin 中的制作和使用

**制作**

1. 在 **iconFont** 网站创建icon项目，其中 **FontClass/Symbol** 前缀要设置为 `icon` ，**Font Family** 设置为 `emao-icon`
2. 将设计师设计好的svg文件制作成fontIcon添加到项目里；或者在平台选择合适的icon添加到购物车，然后再批量添加到项目里
3. 下载后，将解压好的iconfont.css和后缀为`eot`、`svg`、`ttf`、`woff`的四个字体文件复制到`/src/fonts`的文件夹内覆盖已有文件

**使用**

```html
<i class="emao-icon icon-xxx"></i>
```
