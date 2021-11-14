/*
 * @Author: Whzcorcd
 * @Date: 2021-11-07 16:57:53
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-07 21:51:42
 * @Description: file content
 */
const babel = require('@babel/core')
const p = require('./index')

const testCode = `
  wrapPrivate.include()
  wrapPrivate.exclude()

  wrapPrivate.include(["prod", "cmcc", "vvku"])
  wrapPrivate.exclude(["prod", "cmcc", "vvku"])

  function foo(){
    wrapPrivate.exclude(["prod", "cmcc", "vvku"], () => {
      function c() {}
      c()
    })
  }
  const score = ()=> {
    wrapPrivate.include(["prod", "cmcc", "vvku"], () => {})
  }
  const bar = ()=> {
    wrapPrivate.include(["prod", "cmcc", "vvku"], () => {
      const temp = 15214
      console.log(temp)
      const a = temp++
    })
  }
  const fooBar = wrapPrivate
  fooBar()
`;

it('Test privatePlugin', () => {
  const { code } = babel.transform(testCode, {
    plugins: [p],
  })
  expect(code).toMatchSnapshot()
})