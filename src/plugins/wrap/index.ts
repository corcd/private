/*
 * @Author: Whzcorcd
 * @Date: 2021-11-04 14:33:46
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-15 15:12:30
 * @Description: file content
 */
import { isFunction, isLegalParams, isLegalPattern, isLegalTarget } from "@/utils"
import { generateConfig } from '@/config/common'

// @ts-ignore 浏览器端环境变量忽略检查
const privateRunServer = APP_PRIVATE_RUN_SERVER
// @ts-ignore 浏览器端环境变量忽略检查
const privateData = APP_PRIVATE_DATA

const { independentSymbol } = generateConfig()

// export const wrapPrivate = (pattern = 'include', value: string[] = [], fn = <T>(v: T) => { }) => {
//   isLegalPattern(pattern)
//   for (const i in value) {
//     isLegalParams(i)
//   }
//   isFunction(fn)

//   const target = independentSymbol
//     ? privateRunServer
//     : (process.env.run_server as string)
//   const config = independentSymbol ? (privateData || {}) : process.env

//   isLegalTarget(target)

//   if (value.includes(target)) {
//     pattern === 'include' && fn(config)
//   } else {
//     pattern === 'exclude' && fn(config)
//   }
// }

export const wrapPrivate = {
  include: (value: string[] = [], fn = <T>(v: T) => { }) => {
    isLegalParams(value)
    isFunction(fn)

    const target = independentSymbol
      ? privateRunServer
      : (process.env.run_server as string)
    const config = independentSymbol ? (privateData || {}) : process.env

    isLegalTarget(target)
    value.includes(target) && fn(config)
  },
  exclude: (value: string[] = [], fn = <T>(v: T) => { }) => {
    isLegalParams(value)
    isFunction(fn)

    const target = independentSymbol
      ? privateRunServer
      : (process.env.run_server as string)
    const config = independentSymbol ? (privateData || {}) : process.env

    isLegalTarget(target)
    !value.includes(target) && fn(config)
  },
}

export const getPrivateProperty = () => {
  return independentSymbol ? (privateData || {}) : process.env
}

export default { wrapPrivate, getPrivateProperty }