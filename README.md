# Delete Branch Artifacts

<p align="center">
  <a href="https://github.com/bamac-group/delete-branch-artifacts/actions"><img alt="javscript-action status" src="https://github.com/bamac-group/delete-branch-artifacts/workflows/units-test/badge.svg"></a>
</p>

This Action deletes all artifacts of workflow runs on a specific branch. For example it can be used to delete all artifacts that were created during a PR, after that PR was merged or closed.

## Inputs
tbd

## Example usage
tbd

## Development

### 1. Install the dependencies

```bash
npm install
```
### 2. Write code and tests
### 3. Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)
...
```

### 4. Package for distribution and release

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

```bash
npm run all
npm --no-git-tag-version version X.X.X
git add dist package*json
git commit -a -m "release: vX.X.X"
git tag vX.X.X
git push
```
## TODO
- add more tests