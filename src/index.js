import path from 'path'
import {
  getCommitHash,
  getCommitDate,
  getCommitMessage,
  getBranchName
} from './getGitInfo'

const cwd = process.cwd()

export default function ({ types: t }) {
  return {
    visitor: {
      Program (_, { opts }) {
        let {
          repoDir = '',
          hashLength = -1
        } = opts
        repoDir = path.resolve(cwd, repoDir)
        this.commitHash = getCommitHash({ repoDir, length: hashLength })
        this.commitDate = getCommitDate({ repoDir })
        this.commitMessage = getCommitMessage({ repoDir })
        this.branchName = getBranchName({ repoDir })
      },
      ReferencedIdentifier (path) {
        switch (path.node.name) {
          case 'GIT_COMMIT_HASH':
            path.replaceWith(t.stringLiteral(this.commitHash))
            break
          case 'GIT_COMMIT_DATE':
            path.replaceWith(t.stringLiteral(this.commitDate))
            break
          case 'GIT_COMMIT_MESSAGE':
            path.replaceWith(t.stringLiteral(this.commitMessage))
            break
          case 'GIT_BRANCH_NAME':
            path.replaceWith(t.stringLiteral(this.branchName))
            break
          default:
        }
      }
    }
  }
}
