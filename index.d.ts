/*
 * @Author: Whzcorcd
 * @Date: 2021-02-19 14:26:55
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-19 14:29:33
 * @Description: file content
 */
declare module '@gdyfe/private' {
  import Vue, { PluginFunction } from 'vue'
  module 'vue/types/vue' {
    interface Vue {
      $privateConfig: {
        enabled: boolean
      }
    }
  }

  class Private {
    static install: PluginFunction<never>
    static config: {
      enabled: boolean
    }
  }
  export default Private
}
