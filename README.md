<!--
 * @Author: Whzcorcd
 * @Date: 2021-02-19 16:44:44
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-19 17:27:50
 * @Description: file content
-->
# @gdyfe/private

基于 Vue 的私有化部署工具包

## Install

- `npm install --save @gdyfe/private`

- `dist/index.min.js` (不使用 Webpack)

## Usage

Vue-cli 项目：

```javascript
import Vue from 'vue'
import Private from '@gdyfe/private'

Vue.use(Private)
```

单独使用：

```html
<script src="vue.min.js"></script>
<!-- must place this line after vue.js -->
<script src="dist/private.min.js"></script>
```

## Methods

### select

使用方式 `v-private:select="['**', '****']"`，接受一个数组参数（非 String），其中包含的元素即为允许渲染的环境变量参数

### computed 属性

提供全局注入的计算属性，`getPrivateStatus` 用于获取工具启用状态，`getPrivateInfo` 用于获取私有化部署的目标环境变量参数

```javascript
computed: {
  getPrivateStatus() {
    return status
  },
  getPrivateInfo() {
    return target
  },
}
```

## API

使用 `Vue.prototype.$privateConfig` 获取/设置工具配置

## Sample

工具依赖于全局环境变量 `process.env.run_server`，需提前定义

```html
<template id="t">
  <div class="container">
    <tooltip
      v-private:select="['cmcc', 'preview']"
      class="tooltip"
    >
  </div>
</template>
```

### License

MIT
