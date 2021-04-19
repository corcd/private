/*
 * @Author: Whzcorcd
 * @Date: 2021-02-10 21:18:39
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-04-19 15:42:06
 * @Description: file content
 */
import {
  isLegalTarget,
  isLegalParams,
  isLegalPattern,
  isFunction,
} from './utils'

const PrivateConfig = {
  enabled: true,
  independentSymbol: true,
}

const VuePrivatePlugin = {
  install: (Vue) => {
    Vue.prototype.$privateConfig = PrivateConfig

    Vue.directive('private', {
      inserted: (el, binding) => {
        if (!PrivateConfig.enabled) {
          return
        }

        const target = PrivateConfig.independentSymbol
          ? PRIVATE_RUN_SERVER
          : process.env.run_server
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
        getPrivateStatus() {
          const privateStatus = PrivateConfig.independentSymbol
            ? PRIVATE_STATUS
            : process.env.private
          return privateStatus
        },
        getPrivateInfo() {
          return target
        },
      },
    })
  },
  config: PrivateConfig,
}

export const wrapPrivate = (pattern = 'include', value = [], fn = () => {}) => {
  isLegalPattern(pattern)
  isLegalParams(value)
  isFunction(fn)

  const target = PrivateConfig.independentSymbol
    ? PRIVATE_RUN_SERVER
    : process.env.run_server
  const config = PrivateConfig.independentSymbol ? PRIVATE_CONFIG : process.env
  isLegalTarget(target)

  if (value.includes(target)) {
    pattern === 'include' && fn(config)
  } else {
    pattern === 'exclude' && fn(config)
  }
}

export const getPrivateProperty = () =>
  PrivateConfig.independentSymbol ? PRIVATE_CONFIG : process.env

export default VuePrivatePlugin
