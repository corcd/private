/*
 * @Author: Whzcorcd
 * @Date: 2021-11-20 16:42:02
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 21:42:47
 * @Description: file content
 */
import { Command } from 'commander'
import { version as _version, } from '../package.json'
// import create from '@/plugins/cli/create'
import build from '@/plugins/cli/build'
import serve from '@/plugins/cli/serve'

const program = new Command()

program.version(`@gdyfe/private private-cli ${_version}`, '-v, --version')

// program.command('create')
//   .description('create your gdy frontend project')
//   .alias('c')
//   .action(async () => {
//     await require('../create')()
//   })

program.command('build <env>')
  .description('build your gdy frontend project')
  .alias('b')
  .action(async (env: string) => {
    console.log(env)
    await build(env)
  })

program.command('serve <env>')
  .alias('s')
  .action(async (env: string) => {
    console.log(env)
    await serve(env)
  })

program.parse(process.argv)
