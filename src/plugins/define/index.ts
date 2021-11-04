/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 11:02:24
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 15:29:04
 * @Description: file content
 */
import { DefinePlugin } from 'webpack'
import { each, isString, cloneDeep } from 'lodash-es'
import { PRIVATE_RUN_SERVER, PRIVATE_STATUS, GLOBAL_KEY, loadConfig } from '@/config'

const deepJsonStringify = (definitions: any) => {
  return each(definitions, (val: any, key: string) => {
    definitions[key] = isString(val)
      ? JSON.stringify(val)
      : deepJsonStringify(definitions[key])
  })
}

export class PrivateDefinePlugin extends DefinePlugin {
  constructor() {
    const { targets } = loadConfig()
    const clonedDefinitions = cloneDeep(targets[PRIVATE_RUN_SERVER] || {})
    super(
      deepJsonStringify({
        [GLOBAL_KEY]: clonedDefinitions,
        PRIVATE_RUN_SERVER,
        PRIVATE_STATUS,
      })
    )
  }
}

export default PrivateDefinePlugin
