/* eslint-env jest */

import path from 'path'
import {
  getCommitHash,
  getCommitDate,
  getCommitMessage,
  getBranchName
} from '../src/getGitInfo'

describe('should get git info correctly', () => {
  const commitHash = '2da3b80cf33c7a5ae54fdc13597c5ca145e19e2c'
  const commitDate = 'Sun Apr 28 18:38:10 2019 +0800'
  const commitMessage = 'third commit'
  const branchName = 'dev'

  const options = { repoDir: path.resolve(__dirname, './dummyGitRepo') }

  test('should get the last commit hash', () => {
    expect(getCommitHash({ ...options, length: 7 })).toEqual(commitHash.slice(0, 7))
  })
  test('should get the last commit date', () => {
    expect(getCommitDate(options)).toEqual(commitDate)
  })
  test('should get the last commit message', () => {
    expect(getCommitMessage(options)).toEqual(commitMessage)
  })
  test('should get the branch name', () => {
    expect(getBranchName(options)).toEqual(branchName)
  })
})
