/*
 * @Author: Whzcorcd
 * @Date: 2021-02-10 21:18:39
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-04-14 16:38:19
 * @Description: file content
 */
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
        console.log('PRIVATE:', target)
        
        if (String(target).length === 0) {
          throw new Error('PRIVATE: 缺少必要的环境变量')
        }
        const { arg, value } = binding

        switch (arg) {
          case 'include': {
            if (!Array.isArray(value) || typeof value === 'string') {
              throw new Error('PRIVATE: 非法的值')
            }

            if (!value.includes(target)) {
              el.parentNode && el.parentNode.removeChild(el)
            }
            break
          }
          case 'exclude': {
            if (!Array.isArray(value) || typeof value === 'string') {
              throw new Error('PRIVATE: 非法的值')
            }

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
          const status = PrivateConfig.independentSymbol
            ? PRIVATE_STATUS
            : process.env.private
          return status
        },
        getPrivateInfo() {
          const target = PrivateConfig.independentSymbol
            ? PRIVATE_RUN_SERVER
            : process.env.run_server
          return target
        },
      },
    })
  },
  config: PrivateConfig,
}

export const wrapPrivate = (pattern = 'include', value = [], fn) => {
  if (!Array.isArray(value) || typeof value === 'string') {
    throw new Error('PRIVATE: 非法的值')
  }
  if (
    typeof pattern !== 'string' ||
    (pattern !== 'include' && pattern !== 'exclude')
  ) {
    throw new Error('PRIVATE: 不合法的方式')
  }

  const target = PrivateConfig.independentSymbol
    ? PRIVATE_RUN_SERVER
    : process.env.run_server

  if (value.includes(target)) {
    pattern === 'include' && fn()
  } else {
    pattern === 'exclude' && fn()
  }
}

export default VuePrivatePlugin
