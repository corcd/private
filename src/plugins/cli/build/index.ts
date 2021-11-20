/*
 * @Author: Whzcorcd
 * @Date: 2021-11-20 17:31:02
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 22:12:55
 * @Description: file content
 */
import { loadConfig } from '@/config/node'
import { findPackageManager, runCmd } from '../utils'

const build = async (env: string) => {
  const config = loadConfig()
  const tool = await findPackageManager()
  const envOptions = config.env.find(item => item.name === env)
  if (!envOptions) throw new Error('PRIVATE: no env options')

  runCmd(tool, ['run', ...envOptions.cmd.build], envOptions?.options, () => {
    console.log('build finish')
  })
}

export default build