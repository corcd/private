/*
 * @Author: Whzcorcd
 * @Date: 2021-02-10 21:18:39
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-04-14 16:38:19
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
        console.log('PRIVATE:', target);

        if (String(target).length === 0) {
          throw new Error('PRIVATE: 缺少必要的环境变量');
        }

        var arg = binding.arg,
            value = binding.value;

        switch (arg) {
          case 'include':
            {
              if (!Array.isArray(value) || typeof value === 'string') {
                throw new Error('PRIVATE: 非法的值');
              }

              if (!value.includes(target)) {
                el.parentNode && el.parentNode.removeChild(el);
              }

              break;
            }

          case 'exclude':
            {
              if (!Array.isArray(value) || typeof value === 'string') {
                throw new Error('PRIVATE: 非法的值');
              }

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
          var status = PrivateConfig.independentSymbol ? PRIVATE_STATUS : process.env["private"];
          return status;
        },
        getPrivateInfo: function getPrivateInfo() {
          var target = PrivateConfig.independentSymbol ? PRIVATE_RUN_SERVER : process.env.run_server;
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
  var fn = arguments.length > 2 ? arguments[2] : undefined;

  if (!Array.isArray(value) || typeof value === 'string') {
    throw new Error('PRIVATE: 非法的值');
  }

  if (typeof pattern !== 'string' || pattern !== 'include' && pattern !== 'exclude') {
    throw new Error('PRIVATE: 不合法的方式');
  }

  var target = PrivateConfig.independentSymbol ? PRIVATE_RUN_SERVER : process.env.run_server;

  if (value.includes(target)) {
    pattern === 'include' && fn();
  } else {
    pattern === 'exclude' && fn();
  }
};

export default VuePrivatePlugin;
export { wrapPrivate };
