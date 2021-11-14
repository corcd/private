/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 11:02:24
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-14 16:27:40
 * @Description: file content
 */
import webpack from 'webpack'
import { each, isString, cloneDeep } from 'lodash-es'
import { loadConfig } from '@/config/node'
import { PRIVATE_RUN_SERVER, PRIVATE_STATUS, PRIVATE_CONFIG, PRIVATE_GLOBAL_KEY } from '@/keys'

const deepJsonStringify = (definitions: any) => {
  return each(definitions, (val: any, key: string) => {
    definitions[key] = isString(val)
      ? JSON.stringify(val)
      : deepJsonStringify(definitions[key])
  })
}

export class PrivateDefinePlugin extends webpack.DefinePlugin {
  constructor() {
    const env = String(process.env.run_server)
    const isPrivate = Boolean(process.env.private) || false
    const { enabled, independentSymbol, targets } = loadConfig()
    super(
      deepJsonStringify({
        [PRIVATE_GLOBAL_KEY]: cloneDeep(targets[env] || {}),
        [PRIVATE_CONFIG]: cloneDeep({
          enabled,
          independentSymbol
        }),
        [PRIVATE_RUN_SERVER]: env || '',
        [PRIVATE_STATUS]: isPrivate
      })
    )
  }
}

export default PrivateDefinePlugin
