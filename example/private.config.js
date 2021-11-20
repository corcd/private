/*
 * @Author: Whzcorcd
 * @Date: 2021-02-22 15:16:03
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 22:14:25
 * @Description: file content
 */
module.exports = {
  enabled: true,
  independentSymbol: false,
  env: [
    {
      name: 'development',
      cmd: {
        build: ['build'],
        serve: ['serve']
      },
      options: {
        private: false,
        run_server: 'development'
      }
    },
    {
      name: 'huawei',
      cmd: {
        build: ['build'],
        serve: ['serve']
      },
      options: {
        private: true,
        run_server: 'huawei'
      }
    }
  ],
  common: {
    'BASE_URL': '/',
    'APP_PORT': 80,
    'APP_SSL_PORT': 443,
    'APP_GATE_WAY': 'consoleapi.guangdianyun.tv',
    'APP_API_DMS_INFO': '//apiliveroom.dev.guangdianyun.tv/v1/Program/Login/getDmsInfo',
    'APP_API_SSL_DMS_INFO': '//apiliveroom.dev.guangdianyun.tv/v1/Program/Login/getDmsInfo',
    'APP_STATIC_DOMAIN': 'https://static.guangdianyun.tv',
    'APP_OSS_DOMAIN': 'https://static-pro.guangdianyun.tv',
    'APP_ICS_ADDR': 'mqttdms.aodianyun.com',
    'APP_X_CA_STAGE': ''
  },
  targets:
  {
    development: {
      'APP_RUN_ENV': 'development',
      'APP_X_CA_STAGE': 'TEST'
    },
    preview: {
      'APP_RUN_ENV': 'preview',
      'APP_X_CA_STAGE': 'PRE'
    },
    production: {
      'APP_RUN_ENV': 'production',
    },
    huawei: {
      'APP_SETTING': {
        value: 13
      },
      'APP_GATE_WAY': 'bgateway.huaguangyun.cn',
      'APP_API_DMS_INFO': '//cgateway.huaguangyun.cn/v1/Program/Login/getDmsInfo',
      'APP_API_SSL_DMS_INFO': '//cgateway.huaguangyun.cn/v1/Program/Login/getDmsInfo',
      'APP_STATIC_DOMAIN': 'https://static.huaguangyun.cn',
      'APP_OSS_DOMAIN': 'https://static.huaguangyun.cn',
      'APP_ICS_ADDR': 'mqttdms.huaguangyun.cn',
      'APP_RUN_ENV': 'production'
    }
  }
}
