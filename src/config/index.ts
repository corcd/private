/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 14:10:58
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 15:24:14
 * @Description: file content
 */
import { cosmiconfigSync } from 'cosmiconfig'

export interface IConfig {
  enabled: boolean
  independentSymbol: boolean
  targets: Record<string, Record<string, string>>
}

export const PRIVATE_RUN_SERVER: string = String(process.env.run_server) || ''
export const PRIVATE_STATUS: boolean = Boolean(process.env.private) || false
export const MODULE_NAME: string = 'private'
export const GLOBAL_KEY: string = 'PRIVATE_CONFIG'

export const loadConfig = () => {
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
    throw new Error(`No Private config found for: ${PRIVATE_RUN_SERVER}`)
  } catch (error) {
    throw error
  }
}
