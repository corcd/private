/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 14:10:58
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-14 16:27:29
 * @Description: file content
 */
// import { isBrowser } from '@/utils'

export const generateConfig = () => {
  // if (!isBrowser()) {
  //   throw new Error('PRIVATE: the current environment is not Browser Runtime')
  // }

  // @ts-ignore 浏览器端环境变量忽略检查
  const privateConfig = APP_PRIVATE_CONFIG
  return privateConfig ? {
    enabled: privateConfig.enabled,
    independentSymbol: privateConfig.independentSymbol
  } : {
    enabled: true,
    independentSymbol: true
  }
}
