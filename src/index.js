/*
 * @Author: Whzcorcd
 * @Date: 2021-02-10 21:18:39
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-19 16:41:14
 * @Description: file content
 */
const VuePrivateConfig = {
  enabled: true,
}

const Private = {
  install: (Vue) => {
    const status = process.env.private || false
    const target = process.env.run_server || ''

    Vue.prototype.$privateConfig = VuePrivateConfig

    Vue.directive('private', (el, binding, vnode) => {
      const { arg, value } = binding

      switch (arg) {
        case 'select': {
          if (!Array.isArray(value) || typeof value === 'string') {
            throw new Error('PRIVATE: 非法的值')
          }
          const target = process.env.run_server || ''
          if (!value.includes(target)) {
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
          return status
        },
        getPrivateInfo() {
          return target
        },
      },
    })
  },
  config: VuePrivateConfig,
}

export default Private
