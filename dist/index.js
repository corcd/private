(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.private = global.private || {}));
}(this, (function (exports) { 'use strict';

  /*
   * @Author: Whzcorcd
   * @Date: 2021-04-19 15:06:26
   * @LastEditors: Whzcorcd
   * @LastEditTime: 2021-04-19 15:41:16
   * @Description: file content
   */
  var isLegalTarget = function isLegalTarget(value) {
    if (String(value).length === 0) {
      throw new Error('PRIVATE: 缺少必要的环境变量');
    }

    console.log('PRIVATE:', value);
    return true;
  };
  var isLegalParams = function isLegalParams(value) {
    if (!Array.isArray(value) || typeof value === 'string') {
      throw new Error('PRIVATE: 非法的值');
    }

    return true;
  };
  var isLegalPattern = function isLegalPattern(value) {
    if (typeof value !== 'string' || value !== 'include' && value !== 'exclude') {
      throw new Error('PRIVATE: 不合法的方式');
    }

    return true;
  };
  var isFunction = function isFunction(value) {
    if (typeof value !== 'function') {
      throw new Error('PRIVATE: 不合法的执行函数');
    }

    return true;
  };

  /*
   * @Author: Whzcorcd
   * @Date: 2021-02-10 21:18:39
   * @LastEditors: Whzcorcd
   * @LastEditTime: 2021-04-19 15:42:06
   * @Description: file content
   */
  var PrivateConfig = {
    enabled: true,
    independentSymbol: true
  };
  var VuePrivatePlugin = {
    install: function install(Vue) {
      Vue.prototype.$privateConfig = PrivateConfig;
      Vue.directive('private', {
        inserted: function inserted(el, binding) {
          if (!PrivateConfig.enabled) {
            return;
          }

          var target = PrivateConfig.independentSymbol ? PRIVATE_RUN_SERVER : process.env.run_server;
          isLegalTarget(target);
          var arg = binding.arg,
              value = binding.value;

          switch (arg) {
            case 'include':
              {
                isLegalParams(value);

                if (!value.includes(target)) {
                  el.parentNode && el.parentNode.removeChild(el);
                }

                break;
              }

            case 'exclude':
              {
                isLegalParams(value);

                if (value.includes(target)) {
                  el.parentNode && el.parentNode.removeChild(el);
                }

                break;
              }
          }
        }
      });
      Vue.mixin({
        computed: {
          getPrivateStatus: function getPrivateStatus() {
            var privateStatus = PrivateConfig.independentSymbol ? PRIVATE_STATUS : process.env["private"];
            return privateStatus;
          },
          getPrivateInfo: function getPrivateInfo() {
            return target;
          }
        }
      });
    },
    config: PrivateConfig
  };
  var wrapPrivate = function wrapPrivate() {
    var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'include';
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    isLegalPattern(pattern);
    isLegalParams(value);
    isFunction(fn);
    var target = PrivateConfig.independentSymbol ? PRIVATE_RUN_SERVER : process.env.run_server;
    var config = PrivateConfig.independentSymbol ? PRIVATE_CONFIG : process.env;
    isLegalTarget(target);

    if (value.includes(target)) {
      pattern === 'include' && fn(config);
    } else {
      pattern === 'exclude' && fn(config);
    }
  };
  var getPrivateProperty = function getPrivateProperty() {
    return PrivateConfig.independentSymbol ? PRIVATE_CONFIG : process.env;
  };

  exports.default = VuePrivatePlugin;
  exports.getPrivateProperty = getPrivateProperty;
  exports.wrapPrivate = wrapPrivate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
