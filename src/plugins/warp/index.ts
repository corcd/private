/*
 * @Author: Whzcorcd
 * @Date: 2021-11-04 14:33:46
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 15:22:18
 * @Description: file content
 */
import { isFunction, isLegalParams, isLegalPattern, isLegalTarget } from "@/utils"
import { PRIVATE_RUN_SERVER, loadConfig } from '@/config'

const wrapPrivate = (pattern = 'include', value: string[] = [], fn = <T>(v: T) => { }) => {
  isLegalPattern(pattern)
  for (const i in value) {
    isLegalParams(i)
  }
  isFunction(fn)

  const { independentSymbol, targets } = loadConfig()
  const privateConfig = (targets[PRIVATE_RUN_SERVER] || {})
  const target = independentSymbol
    ? PRIVATE_RUN_SERVER
    : (process.env.run_server as string)
  const config = independentSymbol ? privateConfig : process.env
  isLegalTarget(target)

  if (value.includes(target)) {
    pattern === 'include' && fn(config)
  } else {
    pattern === 'exclude' && fn(config)
  }
}

const getPrivateProperty = () => {
  const { independentSymbol, targets } = loadConfig()
  const privateConfig = (targets[PRIVATE_RUN_SERVER] || {})
  return independentSymbol ? privateConfig : process.env
}

export default { wrapPrivate, getPrivateProperty }