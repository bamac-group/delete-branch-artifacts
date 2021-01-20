const lib = require('../src/lib')
const core = require('@actions/core')
const github = require('@actions/github')

jest.mock('@actions/core')
jest.mock('@actions/github')

beforeAll(() => {
  github.getOctokit.mockImplementation(() => {})
})

describe('getBranch', () => {

  test('throws without branch', () => {
    const backupBranch = process.env.GITHUB_HEAD_REF
    delete process.env.GITHUB_HEAD_REF
    core.getInput.mockImplementation(() => { return })
    expect(() => { lib.getBranch() }).toThrow();
    process.env.GITHUB_HEAD_REF = backupBranch
  });

  test('returns branch from action input', () => {
    const mockedBranch = 'test_branch'
    core.getInput.mockImplementation(() => mockedBranch)
    expect(lib.getBranch()).toEqual(mockedBranch)
  })

  test('returns branch from environment', () => {
    const mockedBranch = 'test_branch'
    const backupBranch = process.env.GITHUB_HEAD_REF
    process.env.GITHUB_HEAD_REF = mockedBranch
    expect(lib.getBranch()).toEqual(mockedBranch)
    process.env.GITHUB_HEAD_REF = backupBranch
  })

})
