/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 14:10:58
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-05 11:25:26
 * @Description: file content
 */
import { cosmiconfigSync } from 'cosmiconfig'
import { isBrowser } from '@/utils'

export interface IConfig {
  enabled: boolean
  independentSymbol: boolean
  targets: Record<string, Record<string, string>>
}

export const PRIVATE_RUN_SERVER: string = 'APP_PRIVATE_RUN_SERVER'
export const PRIVATE_STATUS: string = 'APP_PRIVATE_STATUS'
export const PRIVATE_CONFIG: string = 'APP_PRIVATE_CONFIG'
export const PRIVATE_GLOBAL_KEY: string = 'APP_PRIVATE_DATA'
export const MODULE_NAME: string = 'private'

export const generateConfig = () => {
  if (!isBrowser()) {
    throw new Error('PRIVATE: the current environment is not Browser Runtime')
  }

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

export const loadConfig = () => {
  if (isBrowser()) {
    throw new Error('PRIVATE: the current environment is not Node Runtime')
  }

  const explorerSync = cosmiconfigSync(MODULE_NAME, {
    searchPlaces: [
      `.${MODULE_NAME}rc`,
      `.${MODULE_NAME}rc.json`,
      `.${MODULE_NAME}rc.yaml`,
      `.${MODULE_NAME}rc.yml`,
      `.${MODULE_NAME}rc.js`,
      `.${MODULE_NAME}rc.cjs`,
      `${MODULE_NAME}.config.js`,
      `${MODULE_NAME}.config.cjs`,
    ],
  })

  try {
    const result = explorerSync.search()
    console.log('result', result)

    // if (result && result.config[PRIVATE_RUN_SERVER]) {
    //   return result.config[PRIVATE_RUN_SERVER]
    // }
    if (result && result.config) {
      return result.config as IConfig
    }
    throw new Error('PRIVATE: no private config file found')
  } catch (error) {
    throw error
  }
}
