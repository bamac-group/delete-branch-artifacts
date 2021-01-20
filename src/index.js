const core = require('@actions/core')
const lib = require('./lib.js')

async function run() {
  try {
    const branch = lib.getBranch()
    const runs = await lib.getRuns(branch)
    for (const run of runs) {
      await lib.deleteArtifacts(run.id)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
