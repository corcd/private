/*
 * @Author: Whzcorcd
 * @Date: 2021-02-11 14:26:07
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-20 21:46:44
 * @Description: file content
 */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import {
  terser
} from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const MODULE_NAME = 'private'

export default [
  {
    input: 'src/index.ts',
    output: [{
      name: MODULE_NAME,
      file: 'dist/index.js',
      format: 'umd',
      exports: 'named',
      extend: true,
      plugins: [
        terser({
          compress: {
            ecma: 5,
            pure_getters: true,
          },
        }),
      ],
    },
    {
      name: MODULE_NAME,
      file: 'dist/index.module.js',
      format: 'esm',
      exports: 'named',
      extend: true,
    },
    ],
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        browser: true,
        mainFields: ['browser']
      }),
      // nodePolyfills(
      //   { include: ['os', 'path', 'util'] }
      // ),
      json(),
      commonjs({
        ignoreDynamicRequires: true
      }),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime'
      }),
    ],
    external: [/@babel\/runtime/]
  },
  {
    input: 'src/plugin.ts',
    output: {
      name: MODULE_NAME,
      file: 'dist/plugin.js',
      format: 'umd',
      exports: 'named',
      extend: true,
      globals: {
        'webpack': 'webpack',
        'os': 'os',
        'path': 'path',
        'module': 'module',
        'fs': 'fs',
        'util': 'util'
      },
      plugins: [
        terser({
          compress: {
            ecma: 5,
            pure_getters: true,
          },
        }),
      ],
    },
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        preferBuiltins: true,
      }),
      nodePolyfills(
        { include: ['os', 'path', 'util'] }
      ),
      json(),
      commonjs({
        ignoreDynamicRequires: true
      }),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime'
      }),
    ],
    external: ['webpack', /@babel\/runtime/]
  },
  {
    input: 'src/private-cli.ts',
    output: {
      name: `${MODULE_NAME}-cli`,
      file: 'dist/private-cli.js',
      format: 'cjs',
      exports: 'named',
      extend: true,
    },
    plugins: [
      resolve({
        jsnext: true,
        main: true,
        preferBuiltins: true,
      }),
      // nodePolyfills(
      //   { include: ['os', 'path', 'util'] }
      // ),
      json(),
      commonjs({
        ignoreDynamicRequires: true
      }),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime'
      }),
    ],
    external: [/@babel\/runtime/]
  }
]