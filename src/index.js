/*
 * @Author: Whzcorcd
 * @Date: 2021-02-10 21:18:39
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-24 14:57:56
 * @Description: file content
 */
const VuePrivateConfig = {
  enabled: true,
  independentSymbol: true,
}

const Private = {
  install: (Vue) => {
    Vue.prototype.$privateConfig = VuePrivateConfig

    Vue.directive('private', (el, binding, vnode) => {
      if (!VuePrivateConfig.enabled) {
        return
      }

      const target = VuePrivateConfig.independentSymbol
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
    })

    Vue.mixin({
      computed: {
        getPrivateStatus() {
          const status = VuePrivateConfig.independentSymbol
            ? PRIVATE_STATUS
            : process.env.private
          return status
        },
        getPrivateInfo() {
          const target = VuePrivateConfig.independentSymbol
            ? PRIVATE_RUN_SERVER
            : process.env.run_server
          return target
        },
      },
    })
  },
  config: VuePrivateConfig,
}

export default Private
