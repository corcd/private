/*
 * @Author: Whzcorcd
 * @Date: 2021-02-19 14:26:55
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 15:30:20
 * @Description: file content
 */
declare module '@gdyfe/private' {
  import Vue, { PluginFunction } from 'vue'
  module 'vue/types/vue' {
    interface Vue {
      $privateConfig: {
        enabled: boolean
        independentSymbol: boolean
        target: string
      }
    }
  }

  class Private {
    static install: PluginFunction<never>
  }
  export default Private
}
