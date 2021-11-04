/*
 * @Author: Whzcorcd
 * @Date: 2021-06-01 20:18:13
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-06-01 20:20:22
 * @Description: file content
 */
/*
 * @Author: Whzcorcd
 * @Date: 2021-04-24 19:28:03
 * @LastEditors: Whzcorcd
 * @LastEditTime: 2021-04-24 21:21:45
 * @Description: file content
 */
'use strict'

module.exports = {
  types: [
    {
      value: 'WIP',
      name: '💪  WIP:      Work in progress'
    },
    {
      value: 'feat',
      name: '✨  feat:     A new feature'
    },
    {
      value: 'fix',
      name: '🐞  fix:      A bug fix'
    },
    {
      value: 'refactor',
      name:
        '🛠  refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'docs',
      name: '📚  docs:     Documentation only changes'
    },
    {
      value: 'test',
      name: '🏁  test:     Add missing tests or correcting existing tests'
    },
    {
      value: 'chore',
      name:
        "🗯  chore:    Changes that don't modify src or test files. Such as updating build tasks, package manager"
    },
    {
      value: 'style',
      name:
        '💅  style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'revert',
      name: '⏪  revert:   Revert to a commit'
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']
}
