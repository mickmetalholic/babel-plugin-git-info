/* eslint-env jest */

import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import { transformSync } from '@babel/core'
import babelPluginGitInfo from '../src'

describe('should replace identifiers with git infos with default options', () => {
  const options = {
    plugins: [babelPluginGitInfo]
  }

  const commitMessage = fs.readFileSync(path.resolve(__dirname, '../.git/COMMIT_EDITMSG'), 'utf-8').trim()
  const branchName = fs.readFileSync(path.resolve(__dirname, '../.git/HEAD'), 'utf-8').match(/ref: refs\/heads\/(.+)/)[1]
  const commitHash = fs.readFileSync(path.resolve(__dirname, `../.git/refs/heads/${branchName}`), 'utf-8').trim()
  const commitDate = execSync('git log -1 --format=%cd', { cwd: __dirname }).toString().trim()

  test('should replace `GIT_COMMIT_HASH` with last commit hash', () => {
    const { code } = transformSync('var test = GIT_COMMIT_HASH', options)
    expect(code).toEqual(`var test = "${commitHash}";`)
  })

  test('should replace `GIT_COMMIT_DATE` with last commit date', () => {
    const { code } = transformSync('var test = GIT_COMMIT_DATE', options)
    expect(code).toEqual(`var test = "${commitDate}";`)
  })

  test('should replace `GIT_COMMIT_MESSAGE` with last commit message', () => {
    const { code } = transformSync('var test = GIT_COMMIT_MESSAGE', options)
    expect(code).toEqual(`var test = "${commitMessage}";`)
  })

  test('should replace `GIT_BRANCH_NAME` with current branch name', () => {
    const { code } = transformSync('var test = GIT_BRANCH_NAME', options)
    expect(code).toEqual(`var test = "${branchName}";`)
  })
})

describe('should replace identifiers with git infos', () => {
  const options = {
    plugins: [
      [
        babelPluginGitInfo, {
          repoDir: 'tests/dummyGitRepo',
          hashLength: 10
        }
      ]
    ]
  }

  const commitHash = '2da3b80cf33c7a5ae54fdc13597c5ca145e19e2c'
  const commitDate = 'Sun Apr 28 18:38:10 2019 +0800'
  const commitMessage = 'third commit'
  const branchName = 'dev'

  test('should replace `GIT_COMMIT_HASH` with last commit hash', () => {
    const { code } = transformSync('var test = GIT_COMMIT_HASH', options)
    expect(code).toEqual(`var test = "${commitHash.slice(0, 10)}";`)
  })

  test('should replace `GIT_COMMIT_DATE` with last commit date', () => {
    const { code } = transformSync('var test = GIT_COMMIT_DATE', options)
    expect(code).toEqual(`var test = "${commitDate}";`)
  })

  test('should replace `GIT_COMMIT_MESSAGE` with last commit message', () => {
    const { code } = transformSync('var test = GIT_COMMIT_MESSAGE', options)
    expect(code).toEqual(`var test = "${commitMessage}";`)
  })

  test('should replace `GIT_BRANCH_NAME` with current branch name', () => {
    const { code } = transformSync('var test = GIT_BRANCH_NAME', options)
    expect(code).toEqual(`var test = "${branchName}";`)
  })
})
