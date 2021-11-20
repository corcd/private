/*
 * @Author: Whzcorcd
 * @Date: 2019-08-18 19:44:16
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-18 11:43:17
 * @Description: file content
 */
// vue.config.js
const PrivateDefinePlugin = require('@gdyfe/private/dist/plugin').default

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [new PrivateDefinePlugin()],
  },
  css: {
    sourceMap: false,
  },
}
