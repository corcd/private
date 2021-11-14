/*
 * @Author: Whzcorcd
 * @Date: 2021-11-04 14:34:36
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-14 16:28:50
 * @Description: file content
 */
import {
  isLegalTarget,
  isLegalParams,
} from '@/utils'
import { generateConfig } from '@/config/common'

// @ts-ignore 浏览器端环境变量忽略检查
const privateRunServer = APP_PRIVATE_RUN_SERVER
// @ts-ignore 浏览器端环境变量忽略检查
const privateStatus = APP_PRIVATE_STATUS
// @ts-ignore 浏览器端环境变量忽略检查
const privateData = APP_PRIVATE_DATA

const { enabled, independentSymbol } = generateConfig()

const VuePrivatePlugin = {
  install: (Vue: any) => {
    const globalPrototype = Vue.version.slice(0, 2) === '3.' ? Vue.config.globalProperties : Vue.prototype
    const target = independentSymbol
      ? privateRunServer
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
            ? privateStatus
            : process.env.private
        },
        privateRunServer() {
          return independentSymbol
            ? privateRunServer
            : process.env.run_server
        },
        privateData() {
          return independentSymbol
            ? privateData
            : process.env
        },
      },
    })
  }
}

export default VuePrivatePlugin