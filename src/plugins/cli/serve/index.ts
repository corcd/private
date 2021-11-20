/*
 * @Author: Whzcorcd
 * @Date: 2021-11-20 17:31:11
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 22:13:13
 * @Description: file content
 */
import { loadConfig } from '@/config/node'
import { findPackageManager, runCmd } from '../utils'

const serve = async (env: string) => {
  const config = loadConfig()
  const tool = await findPackageManager()
  const envOptions = config.env.find(item => item.name === env)
  if(!envOptions) throw new Error('PRIVATE: no env options')

  console.log(envOptions)
  
  runCmd(tool, ['run', ...envOptions.cmd.serve], envOptions?.options, () => {
    console.log('serve complete')
  })
}

export default serve