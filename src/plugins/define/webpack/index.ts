/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 11:02:24
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-19 16:43:54
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
    const { enabled, independentSymbol, common, targets } = loadConfig()
    super(
      deepJsonStringify(independentSymbol ? {
        [PRIVATE_GLOBAL_KEY]: cloneDeep(Object.assign(common || {}, targets[env] || {})),
        [PRIVATE_CONFIG]: cloneDeep({
          enabled,
          independentSymbol
        }),
        [PRIVATE_RUN_SERVER]: env || '',
        [PRIVATE_STATUS]: isPrivate
      } : {
        'process.env.data': cloneDeep(Object.assign(common || {}, targets[env] || {})),
        'process.env.config': cloneDeep({
          enabled,
          independentSymbol
        }),
        'process.env.run_server': env || '',
        'process.env.private': isPrivate
      })
    )
  }
}

export default PrivateDefinePlugin
