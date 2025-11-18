### Added
- Support for custom log levels. In addition to predefined log levels (TRACE, DEBUG, WARN, INFO, ERROR, FATAL), users can now pass any custom string as a log level when using `ReportingApi.log()` and `ReportingApi.launchLog()` methods.
### Changed
- `@reportportal/client-javascript` bumped to version `5.5.6`.

## [5.4.0] - 2025-11-13
### Added
- Full http/https proxy support with `noProxy` configuration, check [Proxy configuration options](https://github.com/reportportal/client-javascript?tab=readme-ov-file#proxy-configuration-options) for more details.
### Changed
- **Breaking change** Removed deprecated `token` option. The version [5.3.1](https://github.com/reportportal/agent-js-webdriverio/releases/tag/v5.3.1) is the latest that supports it.
- `@reportportal/client-javascript` bumped to version `5.5.4`.

## [5.3.1] - 2025-10-21
### Added
- OAuth 2.0 Password Grant authentication, check [Authentication Options](https://github.com/reportportal/agent-js-webdriverio?tab=readme-ov-file#authentication-options) for more details.
- Allow configuring the HTTP retry strategy via `restClientConfig.retry` and tune the [default policy](https://github.com/reportportal/client-javascript?tab=readme-ov-file#retry-configuration).
### Changed
- `@reportportal/client-javascript` bumped to version `5.4.3`.

## [5.3.0] - 2025-09-18
### Added
- Tags and description attaching for Cucumber scenarios, resolves [#70](https://github.com/reportportal/agent-js-webdriverio/issues/70), thanks to @DorAzouri-tipalti.
### Changed
- **Breaking change** Drop support of Node.js 14. The version [5.2.0](https://github.com/reportportal/agent-js-webdriverio/releases/tag/v5.2.0) is the latest that supports it.
- Revert time format back to milliseconds (based on [#217](https://github.com/reportportal/client-javascript/issues/217#issuecomment-2659843471)).
  This is also fixing the issue with agent installation on ARM processors.
- `@reportportal/client-javascript` bumped to version `5.4.1`.
### Security
- Updated versions of vulnerable packages (axios, form-data).

## [5.2.0] - 2024-09-23
### Changed
- **Breaking change** Drop support of Node.js 12. The version [5.1.1](https://github.com/reportportal/agent-js-webdriverio/releases/tag/v5.1.1) is the latest that supports it.
- The agent now supports reporting the time for launches, test items and logs with microsecond precision in the ISO string format.
For logs, microsecond precision is available on the UI from ReportPortal version 24.2.
- `@reportportal/client-javascript` bumped to version `5.3.0`.
### Deprecated
- Node.js 14 usage. This minor version is the latest that supports Node.js 14.

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
