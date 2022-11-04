### Added
- Browser parameter to steps
- Reporting API method `addParameters`

## [5.0.3] - 2022-10-05
### Added
- Support reportSeleniumCommands and seleniumCommandsLogLevel for Cucumber and Jasmine reporting via `reportSeleniumCommands`, `seleniumCommandsLogLevel` flags
- _isLaunchMergeRequired_ config option support. Provided guide on merging launches manually [provided](README.md#manual-merge-launches)

## [5.0.2] - 2022-05-31
### Added
- [testCaseId](https://reportportal.io/docs/Test-case-ID%3Ewhat-is-it-test-case-id) reporting via [`ReportingApi.setTestCaseId`](README.md#setTestCaseId)
- Support nested steps for Cucumber reporting via `cucumberNestedSteps` flag
- `skippedIssue` parameter to not mark skipped tests as 'To Investigate' by default
- TypeScript definitions provided

### Updated
- `@reportportal/client-javascript` bumped to version `5.0.6`

### Changed
- Package size reduced

## [5.0.1] - 2021-10-05
### Fixed
- Compiled source code provided

## [5.0.0] - 2021-10-05
### Added
- Full compatibility with ReportPortal version 5.* (see [reportportal releases](https://github.com/reportportal/reportportal/releases))
