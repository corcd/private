/*
 * @Author: Whzcorcd
 * @Date: 2021-11-04 14:34:36
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 15:09:37
 * @Description: file content
 */
import {
  isLegalTarget,
  isLegalParams,
} from '@/utils'
import { PRIVATE_RUN_SERVER, PRIVATE_STATUS, loadConfig } from '@/config'

const VuePrivatePlugin = {
  install: (Vue: any) => {
    const globalPrototype = Vue.version.slice(0, 2) === '3.' ? Vue.config.globalProperties : Vue.prototype
    const { enabled, independentSymbol } = loadConfig()
    const target = independentSymbol
      ? PRIVATE_RUN_SERVER
      : (process.env.run_server as string)

    globalPrototype.$privateConfig = { enabled, independentSymbol, target }

    Vue.directive('private', {
      inserted: (el: { parentNode: { removeChild: (arg0: any) => any } }, binding: { arg: any; value: any }) => {
        if (!enabled) {
          return
        }
        isLegalTarget(target)

        const { arg, value } = binding
        switch (arg) {
          case 'include': {
            isLegalParams(value)

            if (!value.includes(target)) {
              el.parentNode && el.parentNode.removeChild(el)
            }
            break
          }
          case 'exclude': {
            isLegalParams(value)

            if (value.includes(target)) {
              el.parentNode && el.parentNode.removeChild(el)
            }
            break
          }
          default:
            break
        }
      },
    })

    Vue.mixin({
      computed: {
        privateStatus() {
          return independentSymbol
            ? PRIVATE_STATUS
            : process.env.private
        },
        privateInfo() {
          return independentSymbol
            ? PRIVATE_RUN_SERVER
            : process.env.run_server
        },
      },
    })
  }
}

export default VuePrivatePlugin