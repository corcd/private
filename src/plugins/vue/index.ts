/*
 * @Author: Whzcorcd
 * @Date: 2021-11-04 14:34:36
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-19 17:54:33
 * @Description: file content
 */
import {
  isLegalTarget,
  isLegalParams,
} from '@/utils'
import { generateConfig } from '@/config/common'

const { enabled, independentSymbol } = generateConfig()

// @ts-ignore 浏览器端环境变量忽略检查
const privateRunServer = independentSymbol ? APP_PRIVATE_RUN_SERVER : process.env.run_server as string
// @ts-ignore 浏览器端环境变量忽略检查
const privateStatus = independentSymbol ? APP_PRIVATE_STATUS : process.env.private as boolean
// @ts-ignore 浏览器端环境变量忽略检查
const privateData = independentSymbol ? APP_PRIVATE_DATA : process.env.data

const VuePrivatePlugin = {
  install: (Vue: any) => {
    const globalPrototype = Vue.version.slice(0, 2) === '3.' ? Vue.config.globalProperties : Vue.prototype
    globalPrototype.$privateConfig = { enabled, independentSymbol, target: privateRunServer }

    Vue.directive('private', {
      inserted: (el: { parentNode: { removeChild: (arg0: any) => any } }, binding: { arg: any; value: any }) => {
        if (!enabled) {
          return
        }
        isLegalTarget(privateRunServer)
        const { arg, value } = binding
        switch (arg) {
          case 'include': {
            isLegalParams(value)
            if (!value.includes(privateRunServer)) {
              el.parentNode && el.parentNode.removeChild(el)
            }
            break
          }
          case 'exclude': {
            isLegalParams(value)
            if (value.includes(privateRunServer)) {
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
          return privateStatus
        },
        privateRunServer() {
          return privateRunServer
        },
        privateData() {
          return privateData
        },
      },
    })
  }
}

export default VuePrivatePlugin