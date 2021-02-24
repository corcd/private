<!--
 * @Author: Whzcorcd
 * @Date: 2021-02-19 16:44:44
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-24 15:14:38
 * @Description: file content
-->
# @gdyfe/private

基于 Vue 的私有化部署工具包

## Install

- `npm install --save @gdyfe/private`

- `dist/private.min.js` (不使用 webpack)

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

### include

正向选择，使用方式 `v-private:include="['**', '****']"`，接受一个数组参数（非 String），其中包含的元素即为 **允许渲染** 的环境变量参数

### exclude

反向选择，使用方式 `v-private:exclude="['**', '****']"`，接受一个数组参数（非 String），其中包含的元素即为 **禁止渲染** 的环境变量参数

### computed 属性

提供全局注入的计算属性，`getPrivateStatus` 用于获取工具启用状态，`getPrivateInfo` 用于获取私有化部署的目标环境变量参数

```javascript
computed: {
  getPrivateStatus() {
    ...
  },
  getPrivateInfo() {
    ...
  },
}
```

## API

使用 `Private.config` / `Vue.prototype.$privateConfig` 获取/设置工具配置

配置项包含 `enabled` 和 `independentSymbol`，`enabled` 表示是否启用插件自定义指令功能（默认为 `true`），`independentSymbol` 表示是否使用独立的私有化数据获取标识（而非 process.env 上数据，默认为 `true`）

## Sample

工具依赖于基于 webpack 的插件 `@gdyfe/private-define-plugin`，请配套使用

> 如想要手动使用，需提前定义全局环境变量 `process.env.private` & `process.env.run_server`

```html
<template id="t">
  <div class="container">
    <tooltip
      v-private:include="['cmcc', 'preview']"
      class="tooltip"
    >
  </div>
</template>
```

### License

MIT
