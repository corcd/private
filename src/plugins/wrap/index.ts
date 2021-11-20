/*
 * @Author: Whzcorcd
 * @Date: 2021-11-04 14:33:46
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-19 17:54:22
 * @Description: file content
 */
import { isFunction, isLegalParams, isLegalTarget } from "@/utils"
import { generateConfig } from '@/config/common'

const { independentSymbol } = generateConfig()

// @ts-ignore 浏览器端环境变量忽略检查
const privateRunServer = independentSymbol ? APP_PRIVATE_RUN_SERVER : process.env.run_server as string
// @ts-ignore 浏览器端环境变量忽略检查
const privateData = independentSymbol ? APP_PRIVATE_DATA : process.env.data

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

export const getPrivateProperty = () => {
  return privateData || {}
}

export const wrapPrivate = {
  include: (value: string[] = [], fn = <T>(v: T) => { }) => {
    isLegalParams(value)
    isFunction(fn)
    isLegalTarget(privateRunServer)
    value.includes(privateRunServer) && fn(getPrivateProperty())
  },
  exclude: (value: string[] = [], fn = <T>(v: T) => { }) => {
    isLegalParams(value)
    isFunction(fn)
    isLegalTarget(privateRunServer)
    !value.includes(privateRunServer) && fn(getPrivateProperty())
  },
}

export default { wrapPrivate, getPrivateProperty }