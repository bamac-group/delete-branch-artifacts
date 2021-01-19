const core = require('@actions/core')
const github = require('@actions/github')
const context = github.context
const octokit = github.getOctokit(core.getInput('github-token'))

function getBranch() {
  const branch = core.getInput('branch') || process.env.GITHUB_HEAD_REF
  if (!branch) {
    throw Error('Please set branch, using the `branch` input.')
  }
  return branch
}

async function getRuns(branch) {
  core.info(`repo: ${context.owner}/${context.repo}`)
  const data = await octokit.actions.listWorkflowRuns({
    owner: context.owner,
    repo: context.repo,
    branch: branch
  })
  return data
}

async function run() {
  try {
    const branch = getBranch()
    core.info(`getting workflow runs for branch ${branch}`)
    const runs = await getRuns(branch)
    core.info(runs)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
