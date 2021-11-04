/*
 * @Author: Whzcorcd
 * @Date: 2021-02-11 14:26:07
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-04 16:26:15
 * @Description: file content
 */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
// import nodePolyfills from 'rollup-plugin-polyfill-node'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: 'private',
      file: 'dist/index.js',
      format: 'umd',
      exports: 'named',
      extend: true,
      globals: { 'webpack': 'webpack' },
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
      name: 'private',
      file: 'dist/index.module.js',
      format: 'esm',
      exports: 'named',
      extend: true,
      globals: { 'webpack': 'webpack' },
    },
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    // nodePolyfills(
    //   { include: ['os', 'path', 'util'] }
    // ),
    json(),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime'
    }),
  ],
  external: ['webpack', /@babel\/runtime/]
}
