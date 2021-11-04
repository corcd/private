<!--
 * @Author: Whzcorcd
 * @Date: 2021-02-19 16:44:44
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 17:32:30
 * @Description: file content
-->
# @gdyfe/private

云平台前端私有化部署标准工具包 V2

V2 版本存在破坏性更新，若仍使用 [V1 版本](https://github.com/corcd/private/tree/v1.2.2)

## Install

- `npm install --save @gdyfe/private`

- `pnpm add @gdyfe/private`

- `yarn add @gdyfe/private`

- `dist/index.module.js` (ES Module)

## Description

`@gdyfe/private` 在 V2 版本分成了三个部分，分别为 `PrivateDefinePlugin`、`WarpPlugin` 和 `VuePrivatePlugin`

`PrivateDefinePlugin` 整合了原 `@gdyfe/private-define-plugin` 插件的能力，用以在 Webpack 环境下定义全局环境变量

`WarpPlugin` 即为原插件内 `wrapPrivate()` 方法和 `getPrivateProperty()` 方法的集合

`VuePrivatePlugin` 即为原 Vue 自定义指令插件

## Usage

### PrivateDefinePlugin

基于 Webpack 的私有化部署参数定义插件

```javascript
// webpack.config.js / vue.config.js
const PrivateDefinePlugin = require('@gdyfe/private').PrivateDefinePlugin

{
  ...
  plugins: [
    new PrivateDefinePlugin(),
    ...
  ]
}
```

### WarpPlugin

#### 引入

```javascript
import { WarpPlugin } from '@gdyfe/private'
const { wrapPrivate, getPrivateProperty } = WarpPlugin
```

#### wrapPrivate() 方法

包装函数，根据使用模式和匹配的环境变量参数，来决定是否执行回调函数

> 后续更新将考虑结合定制的 babel 插件在非对应环境中直接去除无副作用的函数部分

`const wrapPrivate: (pattern: string, value: string[], fn: Function) => void`

- pattern：使用模式，支持 `include` 和 `exclude`，`include` 表示允许执行，`exclude` 表示忽略执行
- value：接受一个字符串数组参数，其中包含的元素即为匹配的环境变量参数
- fn：回调函数

```javascript
import { wrapPrivate } from '@gdyfe/private'

wrapPrivate('include', ['***'], () => {
  // doing something
})
wrapPrivate('exclude', ['***'], () => {
  // doing something
})
```

### VuePrivatePlugin

#### 装载

```javascript
// Vue2 项目：
import Vue from 'vue'
import { VuePrivatePlugin } from '@gdyfe/private'

Vue.use(VuePrivatePlugin)


// Vue3 项目：
import { createApp } from 'vue'
import { VuePrivatePlugin } from '@gdyfe/private'

createApp(app).use(VuePrivatePlugin)
```

#### 正向选择

使用方式 `v-private:include="['**', '****']"`，接受一个数组参数（非 String），其中包含的元素即为 **允许渲染** 的环境变量参数

#### 反向选择

使用方式 `v-private:exclude="['**', '****']"`，接受一个数组参数（非 String），其中包含的元素即为 **禁止渲染** 的环境变量参数

#### 全局 getter 属性

提供全局注入的计算属性

- ~~`getPrivateStatus`~~ `this.privateStatus` 用于获取工具启用状态
- ~~`getPrivateInfo`~~ `this.privateInfo` 用于获取私有化部署的目标环境变量参数

## Configuration

~~使用 `Private.config` / `Vue.prototype.$privateConfig` 获取/设置工具配置~~

不再使用运行时配置，现在使用外部配置文件静态配置（例如：private.config.js/private.json/.privaterc 等）

配置项包含 `enabled` 、 `independentSymbol` 和 `targets`（示例见下文）

- `enabled` 表示是否启用插件自定义指令功能（默认值为 `true`）
- `independentSymbol` 表示是否使用独立命名的私有化数据获取标识（而非默认的 process.env 数据，默认值为 `true`）
- `targets` 表示对应键名的环境下私有化全局配置变量对象

## Sample

### private.config.js

```javascript
module.exports = {
  enabled: true,
  independentSymbol: true,
  targets:
  {
    cm: {
      APP_PORT: '80',
      APP_SSL_PORT: '443',
      APP_RUN_ENV: 'production'
    },
    vvku: {
      APP_PORT: '80',
      APP_SSL_PORT: '443',
      APP_RUN_ENV: 'production'
    }
  }
}
```

### Vue project

工程化依赖于内置插件 `PrivateDefinePlugin`，必须配套使用

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

## 项目依赖

Webpack >= 4.0.0

## Todo

- [x] 原生 Typescript 支持
- [x] 支持 Vue 3 生态
- [ ] 路由级的函数 API
- [ ] 低侵入式私有化权限控制

## License

MIT
