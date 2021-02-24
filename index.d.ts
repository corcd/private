/*
 * @Author: Whzcorcd
 * @Date: 2021-02-19 14:26:55
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-22 22:25:01
 * @Description: file content
 */
declare module '@gdyfe/private' {
  import Vue, { PluginFunction } from 'vue'
  module 'vue/types/vue' {
    interface Vue {
      $privateConfig: {
        enabled: boolean
        independentSymbol: boolean
      }
    }
  }

  class Private {
    static install: PluginFunction<never>
    static config: {
      enabled: boolean,
      independentSymbol: boolean
    }
  }
  export default Private
}
