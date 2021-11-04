/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 15:16:03
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 14:58:06
 * @Description: file content
 */
module.exports = {
  enabled: true,
  independentSymbol: true,
  targets:
  {
    cm: {
      APP_PORT: '80',
      APP_SSL_PORT: '443',
      APP_RUN_ENV: 'production'
    },
    vvku: {
      APP_PORT: '80',
      APP_SSL_PORT: '443',
      APP_RUN_ENV: 'production'
    }
  }
}
