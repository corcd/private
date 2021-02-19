/*
 * @Author: Whzcorcd
 * @Date: 2021-02-11 14:26:07
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-02-19 16:49:28
 * @Description: file content
 */
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'private',
      file: 'dist/private.min.js',
      format: 'iife',
      exports: 'auto',
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
      name: 'private',
      file: 'dist/index.js',
      format: 'umd',
      exports: 'auto',
      extend: true,
    },
    {
      name: 'private',
      file: 'dist/index.module.js',
      format: 'esm',
      exports: 'auto',
      extend: true,
    },
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
