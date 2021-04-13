<!--
 * @Author: Whzcorcd
 * @Date: 2021-02-19 16:44:44
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-04-13 12:42:13
 * @Description: file content
-->
# @gdyfe/private

云平台私有化部署标准工具包，支持 Vue 2.x 生态

## Install

- `npm install --save @gdyfe/private`

- `dist/private.min.js` (不使用 webpack)

- `dist/index.module.js` (ES Module)

## Usage

VueCli 项目：

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

或

```html
<script src="vue.min.js"></script>
<!-- must place this line after vue.js -->
<script type="module" src="dist/index.module.js"></script>
```

## Configuration

使用 `Private.config` / `Vue.prototype.$privateConfig` 获取/设置工具配置

配置项包含 `enabled` 和 `independentSymbol`，`enabled` 表示是否启用插件自定义指令功能（默认为 `true`），`independentSymbol` 表示是否使用独立的私有化数据获取标识（而非 process.env 上数据，默认为 `true`）

## Methods

### include

正向选择，使用方式 `v-private:include="['**', '****']"`，接受一个数组参数（非 String），其中包含的元素即为 **允许渲染** 的环境变量参数

### exclude

反向选择，使用方式 `v-private:exclude="['**', '****']"`，接受一个数组参数（非 String），其中包含的元素即为 **禁止渲染** 的环境变量参数

### computed 属性

提供全局注入的计算属性

- `getPrivateStatus` 用于获取工具启用状态
- `getPrivateInfo` 用于获取私有化部署的目标环境变量参数

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

### wrapPrivate

包装函数，根据使用模式和匹配的环境变量参数，来决定是否执行回调函数

`const wrapPrivate: (pattern: string, value: any[], fn: Function) => void`

- pattern：使用模式，支持 `include` 和 `exclude`，`include` 表示允许执行，`exclude` 表示忽略执行
- value：接受一个数组参数（非 String），其中包含的元素即为匹配的环境变量参数
- fn：回调函数

```javascript
import { wrapPrivate } from '@gdyfe/private'

wrapPrivate('include', ['***'], () => {
  // doing something
})
```

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

## Todo

- [ ] 支持 Vue 3 生态
- [ ] 路由级的函数 API
- [ ] 低侵入式私有化权限控制

### License

MIT
