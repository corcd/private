/*
 * @Author: Whzcorcd
 * @Date: 2021-11-04 14:57:50
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 22:14:15
 * @Description: file content
 */
module.exports = {
  enabled: true,
  independentSymbol: true,
  env: [
    {
      name: 'huawei',
      cmd: {
        build: ['build'],
        serve: ['serve']
      },
      options: {
        private: true,
        run_server: 'huawei'
      }
    }
  ],
  common: {
    APP_PORT: 80,
    APP_SSL_PORT: 443,
  },
  targets:
  {
    cm: {
      APP_RUN_ENV: 'production'
    },
    vvku: {
      APP_RUN_ENV: 'development'
    }
  }
}
