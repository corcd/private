/*
 * @Author: Whzcorcd
 * @Date: 2021-11-20 20:24:00
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 21:30:41
 * @Description: file content
 */
import which from 'which'
import childProcess from 'child_process'

export const findPackageManager = () => {
  const candidates = ['pnpm', 'yarn', 'npm', 'tnpm', 'cnpm']
  for (let i = 0; i < candidates.length; i++) {
    // 查找环境变量下指定的可执行文件的第一个实例
    const res = which.sync(candidates[i], { nothrow: true })
    if (res) {
      return Promise.resolve(candidates[i])
    }
  }
  return Promise.reject(new Error('PRIVATE: please install npm/yarn first'))
}

export const runCmd = (cmd: string, args: string[] = [], env = {}, cb = (code: number) => {}) => {
  const runner = childProcess.spawn(cmd, args, {
    env: Object.assign(process.env, env),
    stdio: 'inherit',
  })

  runner.on('error', (err) => {
    console.error(err)
  })
  runner.on('close', (code: number) => {
    if (cb && typeof cb === 'function') {
      cb(code)
    }
  })
}