/*
 * @Author: Whzcorcd
 * @Date: 2021-11-14 16:26:22
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 22:13:41
 * @Description: file content
 */
import { cosmiconfigSync } from 'cosmiconfig'
import { isBrowser } from '@/utils'
import { CI_CONFIG_NAME, MODULE_NAME } from '@/keys'

export interface IConfig {
  enabled: boolean
  independentSymbol: boolean
  env: Array<{
    name: string
    cmd: {
      build: Array<string>
      serve: Array<string>
    }
    options: Record<string, string | number> | undefined
  }>
  common: Record<string, string | number> | undefined
  targets: Record<string, Record<string, string>>
}

export interface IConfigFromCI {
  [x: string]: string | number
}

export const loadConfigFromCI = () => {
  if (isBrowser()) {
    throw new Error('PRIVATE: the current environment is not Node Runtime')
  }

  const explorerSync = cosmiconfigSync(CI_CONFIG_NAME, {
    searchPlaces: [
      `.${CI_CONFIG_NAME}.js`
    ],
  })

  try {
    const result = explorerSync.search()
    if (result && result.config) {
      if (result.config?.private)
        return result.config.private as IConfigFromCI
      return null
    }
    throw new Error('PRIVATE: no CI config file found')
  } catch (error) {
    throw error
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