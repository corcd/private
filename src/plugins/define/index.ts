/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 11:02:24
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-05 11:09:33
 * @Description: file content
 */
import { DefinePlugin } from 'webpack'
import { each, isString, cloneDeep } from 'lodash-es'
import { PRIVATE_RUN_SERVER, PRIVATE_STATUS, PRIVATE_CONFIG, PRIVATE_GLOBAL_KEY, loadConfig } from '@/config'

const deepJsonStringify = (definitions: any) => {
  return each(definitions, (val: any, key: string) => {
    definitions[key] = isString(val)
      ? JSON.stringify(val)
      : deepJsonStringify(definitions[key])
  })
}

export class PrivateDefinePlugin extends DefinePlugin {
  constructor() {
    const { enabled, independentSymbol, targets } = loadConfig()
    const clonedDefinitions = cloneDeep(targets[PRIVATE_RUN_SERVER] || {})
    const config = {
      enabled,
      independentSymbol
    }
    super(
      deepJsonStringify({
        [PRIVATE_GLOBAL_KEY]: clonedDefinitions,
        [PRIVATE_CONFIG]: config,
        [PRIVATE_RUN_SERVER]: String(process.env.run_server) || '',
        [PRIVATE_STATUS]: Boolean(process.env.private) || false,
      })
    )
  }
}

export default PrivateDefinePlugin
