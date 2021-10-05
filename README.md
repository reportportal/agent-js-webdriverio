# @reportportal/agent-js-webdriverio

Agent for integration Webdriver.io with ReportPortal.

* More about [WebDriverIO](https://webdriver.io/)
* More about [ReportPortal](http://reportportal.io/)

## Installation

Install the agent in your project:
```cmd
npm install --save-dev @reportportal/agent-js-webdriverio
```

## Configuration

Create `wdio.conf.js` [Testrunner Configuration](https://webdriver.io/docs/configurationfile) file:
```js
const { Reporter } = require('@reportportal/agent-js-webdriverio');

const config = {
  token: '00000000-0000-0000-0000-00000000000',
  endpoint: 'http://your.reportportal.server:8080/api/v1',
  project: 'YourReportPortalProjectName',
  launch: 'YourLauncherName',
  mode: 'DEFAULT',
  debug: false,
  description: "Static launch description",
  attributes: [{ key: 'key', value: 'value' }, { value: 'value' }],
  attachPicturesToLogs: false,
  rerun: false,
  rerunOf: 'launchUuid of already existed launch',
};

exports.config = {
  // ...
  reporters: [[Reporter, config]],
  // ...
};
```
| Parameter             | Description                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| token                 | User's Report Portal token from which you want to send requests. It can be found on the profile page of this user.|
| endpoint              | URL of your server. For example 'https://server:8080/api/v1'.                                                     |
| launch                | Name of launch at creation.                                                                                       |
| project               | The name of the project in which the launches will be created.                                                    |
| rerun                 | *Default: false.* Enable [rerun](https://github.com/reportportal/documentation/blob/master/src/md/src/DevGuides/rerun.md)|
| rerunOf               | UUID of launch you want to rerun. If not specified, report portal will update the latest launch with the same name|
| mode                  | Launch mode. Allowable values *DEFAULT* (by default) or *DEBUG*.|
| attachPicturesToLogs  | Automatically add screenshots|
| debug                 | This flag allows seeing the logs of the client-javascript. Useful for debugging.|

## Reporting

This reporter provides Reporting API to use it directly in tests to send some additional data to the report.

## Using `ReportingApi`:

To start using the `ReportingApi` in tests, just import it from `'@reportportal/agent-js-webdriverio'`:
```js
const { ReportingApi } = require('@reportportal/agent-js-webdriverio');
```
### addAttributes

`ReportingApi.addAttributes(attributes: Array<Attribute>, suite?: string);`  
**required**: `attributes`  
```ts
interface Attribute {
  key?: string;
  value: string;
}
```

Examples:
```js
// Jasmine
describe('suite name', () => {
  ReportingApi.addAttributes([
    {
      key: 'suiteKey',
      value: 'suiteValue',
    },
    {
      value: 'suiteValue_2',
    },
  ], 'suite name'); // the second parameter must match the name of the suite
  it('test with attributes', () => {
    ReportingApi.addAttributes([
      {
        key: 'testKey',
        value: 'testValue',
      },
      {
        value: 'testValue_2',
      },
    ]);
    
    expect(true).eql(true);
  })
});
```
> **Note:** Pay attention if you want to provide attributes to the `suite` you should pass describe name as a second parameter.
```gherkin
// Cucumber - adding attributes to the `suite`
@testKey:testValue @testValueTwo
Feature: Test WDIO with cucumber
//...
```
```js
// Cucumber - adding attributes to the `step`
Given('I do something awesome', () => {
  ReportingApi.addAttributes([
    {
      key: 'stepKey',
      value: 'stepValue',
    },
    {
      value: 'stepValue_2',
    },
  ]);
  //...
});
```
> **Note:** Agent is not supported adding attributes to the `scenario`.  

### setDescription
`ReportingApi.setDescription(description: string, suite?: string);`  
**required**: `description`

Examples:
```js
// Jasmine
describe('suite name', () => {
  ReportingApi.setDescription('suite description', 'suite name'); // the second parameter must match the name of the suite
  it('test with attributes', () => {
    ReportingApi.setDescription('step description');
    expect(true).eql(true);
  })
});
```
> **Note:** Pay attention if you want to provide description to the `suite` you should pass describe name as a second parameter.

```gherkin
// Cucumber
Feature: Test WDIO with cucumber
  This description will be added to the suite
//...
```
```js
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setDescription('step description');
  //...
});
```
> **Note:** Agent is not supported adding description to the `scenario`. 

### setStatus
Assign corresponding status to the current test item or suite.  
`ReportingApi.setStatus(status: string, suite?: string);`  
**required**: `status`  
where `status` must be one of the following: *passed*, *failed*, *stopped*, *skipped*, *interrupted*, *cancelled*, *info*, *warn*  

Examples:
```js
// Jasmine
describe('should have status FAILED', () => {
  ReportingApi.setStatus('failed', 'should have status FAILED'); // the second parameter must match the name of the suite
  it('test with INFO status', () => {
    ReportingApi.setStatus('info');
    // ...
  })
});
```
> **Note:** Pay attention if you want to provide custom status to the `suite` you should pass describe name as a parameter.

```js
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setStatus('info');
  //...
});
```

##### setStatusFailed, setStatusPassed, setStatusSkipped, setStatusStopped, setStatusInterrupted, setStatusCancelled, setStatusInfo, setStatusWarn
Assign corresponding status to the current test item or suite.  
`ReportingApi.setStatusFailed(suite?: string);`  
`ReportingApi.setStatusPassed(suite?: string);`  
`ReportingApi.setStatusSkipped(suite?: string);`  
`ReportingApi.setStatusStopped(suite?: string);`  
`ReportingApi.setStatusInterrupted(suite?: string);`  
`ReportingApi.setStatusCancelled(suite?: string);`  
`ReportingApi.setStatusInfo(suite?: string);`  
`ReportingApi.setStatusWarn(suite?: string);`  

Examples:
```js
// Jasmine
describe('manual statuses assigning', () => {
  ReportingApi.setStatusInfo('manual statuses assigning'); // string must match the name of the suite
  it('should call ReportingApi to set statuses', () => {
    ReportingApi.setStatusInfo();
  });
  // ... 
});
```
> **Note:** Pay attention if you want to provide custom status to the `suite` you should pass describe name as a parameter.  

```js
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setStatusInfo();
  //...
});
```

### setLaunchStatus
Assign corresponding status to the current launch.  
`ReportingApi.setLaunchStatus(status: string);`  
**required**: `status`  
where `status` must be one of the following: *passed*, *failed*, *stopped*, *skipped*, *interrupted*, *cancelled*, *info*, *warn*  

Examples:
```js
// Jasmine
it('launch should have status FAILED', () => {
    ReportingApi.setLaunchStatus('failed');
  // ...
});
```
```js
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setLaunchStatus('failed');
  //...
});
```

##### setLaunchStatusFailed, setLaunchStatusPassed, setLaunchStatusSkipped, setLaunchStatusStopped, setLaunchStatusInterrupted, setLaunchStatusCancelled, setLaunchStatusInfo, setLaunchStatusWarn
Assign corresponding status to the current launch. 
`ReportingApi.setLaunchStatusFailed();`  
`ReportingApi.setLaunchStatusPassed();`  
`ReportingApi.setLaunchStatusSkipped();`  
`ReportingApi.setLaunchStatusStopped();`  
`ReportingApi.setLaunchStatusInterrupted();`  
`ReportingApi.setLaunchStatusCancelled();`  
`ReportingApi.setLaunchStatusInfo();`  
`ReportingApi.setLaunchStatusWarn();`

Examples:
```js
// Jasmine
it('should call ReportingApi to set launch statuses', () => {
    ReportingApi.setLaunchStatusInfo();
});
```
```js
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setLaunchStatusInfo();
  //...
});
```

### log
Send logs to report portal for the current test.  
`ReportingApi.log(level: LOG_LEVELS, message: string, file?: Attachmentm, suite?: string);`  
**required**: `level`, `message`  
where `level` can be one of the following: *TRACE*, *DEBUG*, *WARN*, *INFO*, *ERROR*, *FATAL*  

Examples:
```js
// Jasmine
it('should contain logs with attachments', () => {
  const fileName = 'test.jpg';
  const fileContent = fs.readFileSync(path.resolve(__dirname, './attachments', fileName));
  const attachment = {
    name: fileName,
    type: 'image/jpg',
    content: fileContent.toString('base64'),
  };
  ReportingApi.log('INFO', 'info log with attachment', attachment);
  // ...
});
```

##### info, debug, warn, error, trace, fatal
Send logs with corresponding level to report portal for the current suite/test. Should be called inside corresponding suite/test.  
`ReportingApi.info(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.debug(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.warn(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.error(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.trace(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.fatal(message: string, file?: Attachment, suite?: string);`  
**required**: `message`  

Examples:
```js
// Jasmine
describe('should containe suite log', () => {
  ReportingApi.info('Log message', null, 'should containe suite log'); // last parameter must match the name of the suite
  it('should contain logs with different levels', () => {
    ReportingApi.info('Log message');
    ReportingApi.debug('Log message');
    ReportingApi.warn('Log message');
    ReportingApi.error('Log message');
    ReportingApi.trace('Log message');
    ReportingApi.fatal('Log message');
    // ..
  });  
});
```
> **Note:** Pay attention if you want to provide log to the `suite` you should pass describe name as a last parameter.

### launchLog
Send logs to report portal for the current launch. Should be called inside the any test.  
`ReportingApi.launchLog(level: LOG_LEVELS, message: string, file?: Attachment);`  
**required**: `level`, `message`  
where `level` can be one of the following: *TRACE*, *DEBUG*, *WARN*, *INFO*, *ERROR*, *FATAL*  

Examples:
```js
// Jasmine
it('should contain logs with attachments', async (page) => {
  const fileName = 'test.jpg';
  const fileContent = fs.readFileSync(path.resolve(__dirname, './attachments', fileName));
  const attachment = {
    name: fileName,
    type: 'image/jpg',
    content: fileContent.toString('base64'),
  };
  ReportingApi.launchLog('INFO', 'info log with attachment', attachment); // this log attaching to the laucnh
  // ...
});
```
##### launchInfo, launchDebug, launchWarn, launchError, launchTrace, launchFatal
Send logs with corresponding level to report portal for the current launch. Should be called inside the any test.  
`ReportingApi.launchInfo(message: string, file?: Attachment);`  
`ReportingApi.launchDebug(message: string, file?: Attachment);`  
`ReportingApi.launchWarn(message: string, file?: Attachment);`  
`ReportingApi.launchError(message: string, file?: Attachment);`  
`ReportingApi.launchTrace(message: string, file?: Attachment);`  
`ReportingApi.launchFatal(message: string, file?: Attachment);`  
**required**: `message`  

Examples:
```js
// Jasmine
it('launch should contain logs with with different levels', () => {
    ReportingApi.launchInfo('Log message');
    ReportingApi.launchDebug('Log message');
    ReportingApi.launchWarn('Log message');
    ReportingApi.launchError('Log message');
    ReportingApi.launchTrace('Log message');
    ReportingApi.launchFatal('Log message');
  // ...
});
```
> **Note:** Pay attention if you want to provide log to the `launch` you should call ReportingApi methods inside test/it blocks.

#### Integration with Sauce Labs

To integrate with Sauce Labs just add attributes for the test case:

```js
[{
 "key": "SLID",
 "value": "# of the job in Sauce Labs"
}, {
 "key": "SLDC",
 "value": "EU (your job region in Sauce Labs)"
}]
```

## Copyright Notice
Licensed under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
license (see the LICENSE file).
