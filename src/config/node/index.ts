/*
 * @Author: Whzcorcd
 * @Date: 2021-11-14 16:26:22
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-14 16:28:18
 * @Description: file content
 */
import { cosmiconfigSync } from 'cosmiconfig'
import { isBrowser } from '@/utils'
import { MODULE_NAME } from '@/keys'

export interface IConfig {
  enabled: boolean
  independentSymbol: boolean
  targets: Record<string, Record<string, string>>
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