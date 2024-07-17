
## [5.1.1] - 2024-06-26
### Changed
- `@reportportal/client-javascript` bumped to version `5.1.4`, new `launchUuidPrintOutput` types introduced: 'FILE', 'ENVIRONMENT'.
### Security
- Updated versions of vulnerable packages (braces, ws).
### Deprecated
- Node.js 12 usage. This minor version is the latest that supports Node.js 12.

## [5.1.0] - 2024-02-06
### Added
- `launchId` option to the config to attach run results to an existing launch. Related to parallel execution on one and several machines.
- Browser parameter to steps.
### Fixed
- Reporter breaks on skipped test for WebdriverIO + Mocha. Addressed [#46](https://github.com/reportportal/agent-js-webdriverio/issues/46).
- Fix error with launch finishing. Addressed [53](https://github.com/reportportal/agent-js-webdriverio/issues/53) and [47](https://github.com/reportportal/agent-js-webdriverio/issues/47). Thanks to [AlexGalichenko](https://github.com/AlexGalichenko).
### Changed
- `token` configuration option was renamed to `apiKey` to maintain common convention.
- `@reportportal/client-javascript` bumped to version `5.1.1`.
- Readme file updated.

## [5.0.3] - 2022-10-05
### Added
- Support reportSeleniumCommands and seleniumCommandsLogLevel for Cucumber and Jasmine reporting via `reportSeleniumCommands`, `seleniumCommandsLogLevel` flags.
- `isLaunchMergeRequired` config option support. Provided guide on merging launches manually [provided](README.md#manual-merge-launches).

## [5.0.2] - 2022-05-31
### Added
- [testCaseId](https://reportportal.io/docs/Test-case-ID%3Ewhat-is-it-test-case-id) reporting via [`ReportingApi.setTestCaseId`](README.md#setTestCaseId).
- Support nested steps for Cucumber reporting via `cucumberNestedSteps` flag.
- `skippedIssue` parameter to not mark skipped tests as 'To Investigate' by default.
- TypeScript definitions provided.
### Changed
- Package size reduced.
- `@reportportal/client-javascript` bumped to version `5.0.6`.

## [5.0.1] - 2021-10-05
### Fixed
- Compiled source code provided.

## [5.0.0] - 2021-10-05
### Added
- Full compatibility with ReportPortal version 5.* (see [reportportal releases](https://github.com/reportportal/reportportal/releases)).
