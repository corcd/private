(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.private = factory());
}(this, (function () { 'use strict';

  /*
   * @Author: Whzcorcd
   * @Date: 2021-02-10 21:18:39
   * @LastEditors: Whzcorcd
   * @LastEditTime: 2021-02-19 16:41:14
   * @Description: file content
   */
  var VuePrivateConfig = {
    enabled: true
  };
  var Private = {
    install: function install(Vue) {
      var status = process.env["private"] || false;
      var target = process.env.run_server || '';
      Vue.prototype.$privateConfig = VuePrivateConfig;
      Vue.directive('private', function (el, binding, vnode) {
        var arg = binding.arg,
            value = binding.value;

        switch (arg) {
          case 'select':
            {
              if (!Array.isArray(value) || typeof value === 'string') {
                throw new Error('PRIVATE: 非法的值');
              }

              var _target = process.env.run_server || '';

              if (!value.includes(_target)) {
                el.parentNode && el.parentNode.removeChild(el);
              }

              break;
            }
        }
      });
      Vue.mixin({
        computed: {
          getPrivateStatus: function getPrivateStatus() {
            return status;
          },
          getPrivateInfo: function getPrivateInfo() {
            return target;
          }
        }
      });
    },
    config: VuePrivateConfig
  };

  return Private;

})));
