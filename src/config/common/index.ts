/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 14:10:58
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-19 17:58:53
 * @Description: file content
 */
// import { isBrowser } from '@/utils'

export const generateConfig = () => {
  // if (!isBrowser()) {
  //   throw new Error('PRIVATE: the current environment is not Browser Runtime')
  // }
  let privateConfig = null
  try {
    // @ts-ignore 浏览器端环境变量忽略检查
    privateConfig = APP_PRIVATE_CONFIG
  } catch (err) {
    privateConfig = process.env.config
  }
  
  return privateConfig ? {
    enabled: privateConfig.enabled,
    independentSymbol: privateConfig.independentSymbol
  } : {
    enabled: true,
    independentSymbol: true
  }
}
