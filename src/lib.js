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
    const { data: runs } = await octokit.actions.listWorkflowRunsForRepo({
        ...context.repo,
        branch: branch,
    })
    return runs.workflow_runs
}

async function getArtifacts(run_id) {
    const { data: runArtifacts } = await octokit.actions.listWorkflowRunArtifacts({
        ...context.repo,
        run_id
    })
    return runArtifacts.artifacts
}

async function deleteArtifact(artifact_id) {
    await octokit.actions.deleteArtifact({
        ...context.repo,
        artifact_id
    })
}

async function deleteArtifacts(runid) {
    const artifacts = await getArtifacts(runid)
    for (const artifact of artifacts) {
        await deleteArtifact(artifact.id)
        core.info(`deleted artifact ${artifact.name} (id:${artifact.id}) from workflow run id:${runid}`)
    }
}

module.exports = {
    getBranch,
    getRuns,
    deleteArtifacts
}