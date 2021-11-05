/*
 * @Author: Whzcorcd
 * @Date: 2021-04-19 15:06:26
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-05 10:43:49
 * @Description: file content
 */
export const isBrowser = () => this === window

export const isLegalTarget = <T>(value: T) => {
  if (String(value).length === 0) {
    throw new Error('PRIVATE: 缺少必要的环境变量')
  }
  console.log('PRIVATE:', value)
  return true
}

export const isLegalParams = <T>(value: T) => {
  if (!Array.isArray(value) || typeof value === 'string') {
    throw new Error('PRIVATE: 非法的值')
  }
  return true
}

export const isLegalPattern = <T>(value: T) => {
  if (
    typeof value !== 'string' ||
    (value !== 'include' && value !== 'exclude')
  ) {
    throw new Error('PRIVATE: 不合法的方式')
  }
  return true
}

export const isFunction = <T>(value: T) => {
  if (typeof value !== 'function') {
    throw new Error('PRIVATE: 不合法的执行函数')
  }
  return true
}
