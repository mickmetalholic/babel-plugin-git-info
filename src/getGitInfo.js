import { execSync } from 'child_process'

function getCmdOutput (command, options) {
  return execSync(command, Object.assign({}, {
    stdio: ['ignore', 'pipe', 'ignore']
  }, options)).toString().trim()
}

export function getCommitHash ({ repoDir, length }) {
  let commitHash = ''
  try {
    commitHash = getCmdOutput('git rev-parse HEAD', {
      cwd: repoDir
    })
  } catch (e) {}
  return length === -1 ? commitHash : commitHash.slice(0, length)
}

export function getCommitDate ({ repoDir }) {
  return getCmdOutput('git log -1 --format=%cd', {
    cwd: repoDir
  })
}

export function getCommitMessage ({ repoDir }) {
  return getCmdOutput('git log -1 --pretty=%B', {
    cwd: repoDir
  })
}

export function getBranchName ({ repoDir }) {
  return getCmdOutput('git rev-parse --abbrev-ref HEAD', {
    cwd: repoDir
  })
}
