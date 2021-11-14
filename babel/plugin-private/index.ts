/*
 * @Author: Whzcorcd
 * @Date: 2021-11-07 16:46:09
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-11-07 21:50:34
 * @Description: file content
 */
const currentEnvironment = process.env.run_server || 'prod'

const privatePlugin = ({ types: t }) => {
  return {
    visitor: {
      ExpressionStatement(path) {
        if (
          t.isCallExpression(path.node.expression) &&
          t.isMemberExpression(path.node.expression.callee) &&
          path.node.expression.callee.object.name == 'wrapPrivate'
        ) {
          const envArr = path.node.expression.arguments[0]?.elements.map(item => item.value) || []
          const warpFunction = path.node.expression.arguments[1]

          switch (path.node.expression.callee.property.name) {
            case 'include':
              if (envArr.includes(currentEnvironment)) replaceNode()
              else path.remove()
              break
            case 'exclude':
              if (!envArr.includes(currentEnvironment)) replaceNode()
              else path.remove()
              break
            default:
              break
          }

          function replaceNode() {
            if (!warpFunction) {
              path.remove()
              return
            } else {
              if (warpFunction?.body && t.isArrowFunctionExpression(warpFunction)) {
                path.replaceWithMultiple(warpFunction.body.body)
                return
              }
            }
            return new TypeError('the second argument of the warp-function is not a valid arrow function')
          }
        }
      },
    },
  }
}

module.exports = privatePlugin