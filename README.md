# @reportportal/agent-js-webdriverio
Agent for integration Webdriver.io with ReportPortal.

## Development guide.

To develop new features locally and to test the reporter work please follow the next steps:

1. Install necessary dependencies using `npm install` or `npm i`.
2. Run `npm run build` command to compile TypeScript to JavaScript.

> For quickly launch examples you can use `npm run dev`, `npm run dev:cucumber` commands.  
> Make sure you set up `wdio.conf.js` in  `example-webdriverio` or  `example-webdriverio-cucumber` folders.  
> For more information check the instruction in README file in `examples-webdriverio` folder.


## Using `ReportingApi`:

To start using the `ReportingApi` in tests, just import it from `'@reportportal/agent-js-webdriverio'`:
```js
const { ReportingApi } = require('@reportportal/agent-js-webdriverio/src/reportingApi');
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
  This description will be adding to the suite
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

Example:
```js
// Jasmine
describe('manual statuses assigning' ,() => {
  ReportingAPI.setStatusFailed('manual statuses assigning'); // string must match the name of the suite
  ReportingAPI.setStatusPassed('manual statuses assigning'); // string must match the name of the suite
  ReportingAPI.setStatusSkipped('manual statuses assigning'); // string must match the name of the suite
  ReportingAPI.setStatusStopped('manual statuses assigning'); // string must match the name of the suite
  ReportingAPI.setStatusInterrupted('manual statuses assigning'); // string must match the name of the suite
  ReportingAPI.setStatusCancelled('manual statuses assigning'); // string must match the name of the suite
  ReportingAPI.setStatusInfo('manual statuses assigning'); // string must match the name of the suite
  ReportingAPI.setStatusWarn('manual statuses assigning'); // string must match the name of the suite
  it('should call ReportingApi to set statuses', () => {
    ReportingAPI.setStatusFailed();
    ReportingAPI.setStatusPassed();
    ReportingAPI.setStatusSkipped();
    ReportingAPI.setStatusStopped();
    ReportingAPI.setStatusInterrupted();
    ReportingAPI.setStatusCancelled();
    ReportingAPI.setStatusInfo();
    ReportingAPI.setStatusWarn();
  });
  // ... 
});
```
> **Note:** Pay attention if you want to provide custom status to the `suite` you should pass describe name as a parameter.  

### setLaunchStatus
Assign corresponding status to the current launch.  
`ReportingApi.setLaunchStatus(status: string);`  
**required**: `status`  
where `status` must be one of the following: *passed*, *failed*, *stopped*, *skipped*, *interrupted*, *cancelled*, *info*, *warn*  
Example:
```js
// Jasmine
it('launch should have status FAILED', () => {
    ReportingApi.setLaunchStatus('failed');
  // ...
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

Example:
```js
// Jasmine
it('should call ReportingApi to set launch statuses', () => {
    ReportingAPI.setLaunchStatusFailed();
    ReportingAPI.setLaunchStatusPassed();
    ReportingAPI.setLaunchStatusSkipped();
    ReportingAPI.setLaunchStatusStopped();
    ReportingAPI.setLaunchStatusInterrupted();
    ReportingAPI.setLaunchStatusCancelled();
    ReportingAPI.setLaunchStatusInfo();
    ReportingAPI.setLaunchStatusWarn();
});
```
