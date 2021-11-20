/*
 * @Author: Whzcorcd
 * @Date: 2021-11-18 11:33:56
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 21:57:05
 * @Description: file content
 */
import { createApp } from 'vue'
import PrivatePlugin from '@gdyfe/private'
import App from './App.vue'

const {
  VuePrivatePlugin,
  WrapPlugin: { wrapPrivate },
} = PrivatePlugin

wrapPrivate.include(['development', 'huawei'], () => {
  try {
    console.log('APP_PRIVATE_RUN_SERVER', APP_PRIVATE_RUN_SERVER)
    console.log('APP_PRIVATE_CONFIG', APP_PRIVATE_CONFIG)
    console.log('APP_PRIVATE_DATA', APP_PRIVATE_DATA)
  } catch (err) {
    console.log('process.env.data', process.env.data)
  }
})

createApp(App).use(VuePrivatePlugin).mount('#app')
