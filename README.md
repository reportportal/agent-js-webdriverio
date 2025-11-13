# @reportportal/agent-js-webdriverio

Agent to integrate Webdriver.io with ReportPortal.
* More about [WebDriverIO](https://webdriver.io/)
* More about [ReportPortal](http://reportportal.io/)

## Installation

Install the agent in your project:
```cmd
npm install --save-dev @reportportal/agent-js-webdriverio
```

## Configuration

Create `wdio.conf.js` [Testrunner Configuration](https://webdriver.io/docs/configurationfile) file:
```javascript
const { Reporter } = require('@reportportal/agent-js-webdriverio');
const config = {
  apiKey: '<API_KEY>',
  endpoint: 'https://your.reportportal.server/api/v1',
  project: 'Your reportportal project name',
  launch: 'Your launch name',
  description: 'Your launch description',
  attributes: [
      {
          key: 'key',
          value: 'value',
      },
      {
          value: 'value',
      },
  ],
};

exports.config = {
  // ...
  reporters: [[Reporter, config]],
  // ...
};
```

The full list of available options presented below.

### Authentication Options

The agent supports two authentication methods:
1. **API Key Authentication** (default)
2. **OAuth 2.0 Password Grant** (recommended for enhanced security)

**Note:**\
If both authentication methods are provided, OAuth 2.0 will be used.\
Either API key or complete OAuth 2.0 configuration is required to connect to ReportPortal.

| Option | Necessity   | Default | Description                                                                                                                                                    |
|--------|-------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| apiKey | Conditional |         | User's ReportPortal API key from which you want to send requests. It can be found on the profile page of this user. *Required only if OAuth is not configured. |
| oauth  | Conditional |         | OAuth 2.0 configuration object. When provided, OAuth authentication will be used instead of API key. See OAuth Configuration below.                            |

#### OAuth Configuration

The `oauth` object supports the following properties:

| Property              | Necessity  | Default  | Description                                                                                                                                                                                                                                                                                                                     |
|-----------------------|------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| tokenEndpoint         | Required   |          | OAuth 2.0 token endpoint URL for password grant flow.                                                                                                                                                                                                                                                                           |
| username              | Required   |          | Username for OAuth 2.0 password grant.                                                                                                                                                                                                                                                                                          |
| password              | Required   |          | Password for OAuth 2.0 password grant.                                                                                                                                                                                                                                                                                          |
| clientId              | Required   |          | OAuth 2.0 client ID.                                                                                                                                                                                                                                                                                                            |
| clientSecret          | Optional   |          | OAuth 2.0 client secret (optional, depending on your OAuth server configuration).                                                                                                                                                                                                                                               |
| scope                 | Optional   |          | OAuth 2.0 scope (optional, space-separated list of scopes).                                                                                                                                                                                                                                                                     |

**Note:** The OAuth interceptor automatically handles token refresh when the token is about to expire (1 minute before expiration).

##### OAuth 2.0 configuration example

```javascript
const rpConfig = {
  endpoint: 'https://your.reportportal.server/api/v2',
  project: 'Your reportportal project name',
  launch: 'Your launch name',
  oauth: {
    tokenEndpoint: 'https://your-oauth-server.com/oauth/token',
    username: 'your-username',
    password: 'your-password',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret', // optional
    scope: 'reportportal', // optional
  }
};
```

### General options

| Option                   | Necessity  | Default   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|--------------------------|------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| endpoint                 | Required   |           | URL of your server. For example 'https://server:8080/api/v2'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| launch                   | Required   |           | Name of launch at creation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| project                  | Required   |           | The name of the project in which the launches will be created.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| attributes               | Optional   | []        | Launch attributes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| description              | Optional   | ''        | Launch description.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| rerun                    | Optional   | false     | Enable [rerun](https://reportportal.io/docs/dev-guides/RerunDevelopersGuide).                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| rerunOf                  | Optional   | Not set   | UUID of launch you want to rerun. If not specified, ReportPortal will update the latest launch with the same name.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| mode                     | Optional   | 'DEFAULT' | Results will be submitted to Launches page <br/> *'DEBUG'* - Results will be submitted to Debug page.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| skippedIssue             | Optional   | true      | ReportPortal provides feature to mark skipped tests as not 'To Investigate'. <br/> Option could be equal boolean values: <br/> *true* - skipped tests considered as issues and will be marked as 'To Investigate' on ReportPortal. <br/> *false* - skipped tests will not be marked as 'To Investigate' on application.                                                                                                                                                                                                                         |
| debug                    | Optional   | false     | This flag allows seeing the logs of the client-javascript. Useful for debugging.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| launchId                 | Optional   | Not set   | The _ID_ of an already existing launch. The launch must be in 'IN_PROGRESS' status while the tests are running. Please note that if this _ID_ is provided, the launch will not be finished at the end of the run and must be finished separately. If this option used, launch related options (eg. description, attributes, rerun, rerunOf, mode) will not take any effect as they are used within launch start.                                                                                                                                |                            
| restClientConfig         | Optional   | Not set   | `axios` like http client [config](https://github.com/axios/axios#request-config). <br/> Visit [http-client-options](https://github.com/reportportal/client-javascript?tab=readme-ov-file#http-client-options) for more details. |
| headers                  | Optional   | {}        | The object with custom headers for internal http client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| launchUuidPrint          | Optional   | false     | Whether to print the current launch UUID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| launchUuidPrintOutput    | Optional   | 'STDOUT'  | Launch UUID printing output. Possible values: 'STDOUT', 'STDERR', 'FILE', 'ENVIRONMENT'. Works only if `launchUuidPrint` set to `true`. File format: `rp-launch-uuid-${launch_uuid}.tmp`. Env variable: `RP_LAUNCH_UUID`.                                                                                                                                                                                                                                                                                                                       |
| isLaunchMergeRequired    | Optional   | false     | Allows to merge several run's into one launch at the end of the run. Needs additional setup. See [Manual merge launches](#manual-merge-launches).                                                                                                                                                                                                                                                                                                                                                                                               |
| attachPicturesToLogs     | Optional   | false     | Automatically attach screenshots taken during test execution. See [Screenshots](#screenshots) for more details.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| cucumberNestedSteps      | Optional   | false     | [Report Cucumber steps as logs](#cucumber-scenario-based-reporting).                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| reportSeleniumCommands   | Optional   | false     | Add selenium logs to each test case.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| seleniumCommandsLogLevel | Optional   | 'info'    | If set `reportSeleniumCommands` to `true`, you need to provide log level witch can be one of: *'trace', 'debug', 'info', 'warn', 'error', 'fatal'*.                                                                                                                                                                                                                                                                                                                                                                                             |

The following options can be overridden using ENVIRONMENT variables:

| Option      | ENV variable    |
|-------------|-----------------|
| launchId    | RP_LAUNCH_ID    |

After completing the above configuration, you will be able to see a basic report of test results in ReportPortal.
To make the report more informative and utilize all features of ReportPortal, the agent provides additional features described below.

You can also refer the [example-webdriverio](https://github.com/reportportal/examples-js/tree/main/example-webdriverio) example to see how to use the agent with WebdriverIO in action.

## Asynchronous API

The client supports an asynchronous reporting (via the ReportPortal asynchronous API).
If you want the client to report through the asynchronous API, change `v1` to `v2` in the `endpoint` address.

**Note:** It is highly recommended to use the `v2` endpoint for reporting, especially for extensive test suites.

## Structure of reports

### Cucumber scenario-based reporting

By default, this agent reports the following structure:

- feature - SUITE
- scenario - TEST
- step - STEP

You may change this behavior to report steps to the log level by enabling scenario-based reporting:

- feature - TEST
- scenario - STEP
- step - log item (nested step)

To report scenarios as test cases and steps as logs, you need to pass an additional parameter to the agent config: `cucumberNestedSteps: true`.

## Screenshots

To attach screenshots to the test, the option `attachPicturesToLogs` need to be enabled in the agent config.

Then, in case the screenshot is taken within the test execution, it will be attached to the test result in ReportPortal automatically.

### Jasmine/Mocha

Examples:
```javascript
describe('suite name', () => {
    it('Test should be FAILED', async () => {
        await browser.url('https://webdriver.io');
        const title = await browser.getTitle();
        await browser.saveScreenshot('./screenshots/screenshot.png');

        expect(title).toBe('WebdriverIO');
    });
});
```

### Cucumber

```javascript
Given('I do something awesome', async () => {
    await browser.takeScreenshot();
    assert.strictEqual(this.value, expectedValue);
});
```

It is also may be useful to take the screenshot on test failure in the `afterStep` function for Cucumber in `wdio.conf.js` file:
```javascript
afterStep: async function(step, scenario, { error, result, duration, passed }, context) {
    if (!passed) {
        await browser.takeScreenshot();
    }
}
```

Another way to add any files to the test (not only screenshots) is to use the [ReportingAPI.log() method](#log).

## Reporting API

This reporter provides Reporting API to use it directly in tests to send some additional data to the report.

To start using the `ReportingApi` in tests, just import it from `'@reportportal/agent-js-webdriverio'`:
```javascript
const { ReportingApi } = require('@reportportal/agent-js-webdriverio');
```
### addAttributes

`ReportingApi.addAttributes(attributes: Array<Attribute>, suite?: string);`  
**required**: `attributes`  
```typescript
interface Attribute {
  key?: string;
  value: string;
}
```

Examples:
```javascript
// Jasmine/Mocha
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
```javascript
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
> **Note:** The agent does not support adding attributes to the `scenario`.  

### setDescription
`ReportingApi.setDescription(description: string, suite?: string);`  
**required**: `description`

Examples:
```javascript
// Jasmine/Mocha
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
```javascript
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setDescription('step description');
  //...
});
```
> **Note:** Agent is not supported adding description to the `scenario`.

### setTestCaseId
`ReportingApi.setTestCaseId(testCaseId: string, suite?: string);`  
**required**: `testCaseId`

Examples:
```javascript
// Jasmine/Mocha
describe('suite name', () => {
  ReportingApi.setTestCaseId('suiteTestCaseId', 'suite name'); // the second parameter must match the name of the suite
  it('some test', () => {
    ReportingApi.setTestCaseId('testCaseId');
    // ...
  })
});
```
> **Note:** Pay attention if you want to provide testCaseId to the `suite` you should pass describe name as a parameter.

```javascript
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setTestCaseId('testCaseId');
  //...
});
```

### setStatus
Assign corresponding status to the current test item or suite.  
`ReportingApi.setStatus(status: string, suite?: string);`  
**required**: `status`  
where `status` must be one of the following: *passed*, *failed*, *stopped*, *skipped*, *interrupted*, *cancelled*, *info*, *warn*  

Examples:
```javascript
// Jasmine/Mocha
describe('should have status FAILED', () => {
  ReportingApi.setStatus('failed', 'should have status FAILED'); // the second parameter must match the name of the suite
  it('test with INFO status', () => {
    ReportingApi.setStatus('info');
    // ...
  })
});
```
> **Note:** Pay attention if you want to provide custom status to the `suite` you should pass describe name as a parameter.

```javascript
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
```javascript
// Jasmine/Mocha
describe('manual statuses assigning', () => {
  ReportingApi.setStatusInfo('manual statuses assigning'); // string must match the name of the suite
  it('should call ReportingApi to set statuses', () => {
    ReportingApi.setStatusInfo();
  });
  // ... 
});
```
> **Note:** Pay attention if you want to provide custom status to the `suite` you should pass describe name as a parameter.  

```javascript
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
```javascript
// Jasmine/Mocha
it('launch should have status FAILED', () => {
    ReportingApi.setLaunchStatus('failed');
  // ...
});
```
```javascript
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
```javascript
// Jasmine/Mocha
it('should call ReportingApi to set launch statuses', () => {
    ReportingApi.setLaunchStatusInfo();
});
```
```javascript
// Cucumber
Given('I do something awesome', () => {
  ReportingApi.setLaunchStatusInfo();
  //...
});
```

### log

Send logs to the ReportPortal for the current test.  
`ReportingApi.log(level: LOG_LEVELS, message: string, file?: Attachmentm, suite?: string);`  
**required**: `level`, `message`  
where `level` can be one of the following: *TRACE*, *DEBUG*, *WARN*, *INFO*, *ERROR*, *FATAL*  

Examples:
```javascript
// Jasmine/Mocha
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

```javascript
// Cucumber
Given('I do something awesome', () => {
    const fileName = 'test.jpg';
    const fileContent = fs.readFileSync(path.resolve(__dirname, './attachments', fileName));
    const attachment = {
        name: fileName,
        type: 'image/jpg',
        content: fileContent.toString('base64'),
    };
    ReportingApi.log('INFO', 'info log with attachment', attachment);
    //...
});
```

##### info, debug, warn, error, trace, fatal
Send logs with corresponding level to the ReportPortal for the current suite/test. Should be called inside corresponding suite/test.  
`ReportingApi.info(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.debug(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.warn(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.error(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.trace(message: string, file?: Attachment, suite?: string);`  
`ReportingApi.fatal(message: string, file?: Attachment, suite?: string);`  
**required**: `message`  

Examples:
```javascript
// Jasmine/Mocha
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

```javascript
// Cucumber
Given('I do something awesome', () => {
    ReportingApi.info('Log message');
    ReportingApi.debug('Log message');
    ReportingApi.warn('Log message');
    ReportingApi.error('Log message');
    ReportingApi.trace('Log message');
    ReportingApi.fatal('Log message');
    //...
});
```

### launchLog

Send logs to the ReportPortal for the current launch. Should be called inside the any test.  
`ReportingApi.launchLog(level: LOG_LEVELS, message: string, file?: Attachment);`  
**required**: `level`, `message`  
where `level` can be one of the following: *TRACE*, *DEBUG*, *WARN*, *INFO*, *ERROR*, *FATAL*  

Examples:
```javascript
// Jasmine/Mocha
it('should send log with attachment to launch', async (page) => {
  const fileName = 'test.jpg';
  const fileContent = fs.readFileSync(path.resolve(__dirname, './attachments', fileName));
  const attachment = {
    name: fileName,
    type: 'image/jpg',
    content: fileContent.toString('base64'),
  };
  ReportingApi.launchLog('INFO', 'info log with attachment', attachment); // attaching log to the launch
  // ...
});
```

```javascript
// Cucumber
Given('I do something awesome', () => {
    const fileName = 'test.jpg';
    const fileContent = fs.readFileSync(path.resolve(__dirname, './attachments', fileName));
    const attachment = {
        name: fileName,
        type: 'image/jpg',
        content: fileContent.toString('base64'),
    };
    ReportingApi.launchLog('INFO', 'info log with attachment', attachment); // attaching log to the launch
    //...
});
```

##### launchInfo, launchDebug, launchWarn, launchError, launchTrace, launchFatal

Send logs with corresponding level to the ReportPortal for the current launch. Should be called inside the any test.  
`ReportingApi.launchInfo(message: string, file?: Attachment);`  
`ReportingApi.launchDebug(message: string, file?: Attachment);`  
`ReportingApi.launchWarn(message: string, file?: Attachment);`  
`ReportingApi.launchError(message: string, file?: Attachment);`  
`ReportingApi.launchTrace(message: string, file?: Attachment);`  
`ReportingApi.launchFatal(message: string, file?: Attachment);`  
**required**: `message`  

Examples:
```javascript
// Jasmine/Mocha
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

```javascript
// Cucumber
Given('I do something awesome', () => {
    ReportingApi.launchInfo('Log message');
    ReportingApi.launchDebug('Log message');
    ReportingApi.launchWarn('Log message');
    ReportingApi.launchError('Log message');
    ReportingApi.launchTrace('Log message');
    ReportingApi.launchFatal('Log message');
    //...
});
```

#### Integration with Sauce Labs

To integrate with Sauce Labs just add attributes for the test case:

```javascript
[{
 "key": "SLID",
 "value": "# of the job in Sauce Labs"
}, {
 "key": "SLDC",
 "value": "EU (your job region in Sauce Labs)"
}]
```

## Getting a single launch

For example, this configuration `specs: [‘./tests/**/*.spec.js’]` is used to execute each spec in a [separate worker process](https://webdriver.io/docs/configuration/#specs)).
There may also be a situation where tests are executed in parallel on different machines.
For the current agent implementation, this will result in multiple launches in ReportPortal.

If a single launch is required for such cases - there are several options for combining them within a single launch.

### Option 1

The reporter config supports the `launchId` parameter to specify the id of the already started launch.
This way, you can start the launch manually using `@reportportal/client-javascript` before the test run and then specify its id in the config or via environment variable.

1. Start the launch before the test run and store the Launch ID. E.g. in the [`onPrepare`](https://webdriver.io/docs/configuration/#onprepare) hook while running on a single machine:

```javascript
const { Reporter } = require('@reportportal/agent-js-webdriverio');
const RPClient = require('@reportportal/client-javascript');

const rpConfig = {
    // ...
};

exports.config = {
    // ...
    reporters: [[Reporter, rpConfig]],
    // ...
    onPrepare: async function (exitCode, config, capabilities, results) {
        async function startLaunch() {
            const client = new RPClient(rpConfig);
            const response = await client.startLaunch({
                name: rpConfig.launch,
                attributes: rpConfig.attributes,
                // etc
            }).promise;

            return response.id;
        }

        const launchId = await startLaunch();
        // The Launch ID can be set to the environment variable right here
        process.env.RP_LAUNCH_ID = launchId;
    },
}
```

**Note:** If the Launch ID is already known (e.g., created in a separate CI pipeline step before running tests), it can be set directly via the `RP_LAUNCH_ID` environment variable or in the agent configuration:

```javascript
const { Reporter } = require('@reportportal/agent-js-webdriverio');
const RPClient = require('@reportportal/client-javascript');

const rpConfig = {
    // ...
    launchId: 'Id of an already started launch', // or set it via environment variable RP_LAUNCH_ID
    // ...
};

exports.config = {
    // ...
    reporters: [[Reporter, rpConfig]],
    // ...
}
```

2. Finish the launch after the execution is completed. E.g. in the [`onComplete`](https://webdriver.io/docs/options/#oncomplete) hook while running on a single machine:

```javascript
const { Reporter } = require('@reportportal/agent-js-webdriverio');
const RPClient = require('@reportportal/client-javascript');

const rpConfig = {
    // ...
};

exports.config = {
    // ...
    reporters: [[Reporter, rpConfig]],
    // ...
    onComplete: async function (exitCode, config, capabilities, results) {
        const finishLaunch = async () => {
            const client = new RPClient(rpConfig);
            const launchTempId = client.startLaunch({ id: process.env.RP_LAUNCH_ID }).tempId;
            await client.finishLaunch(launchTempId, {}).promise;
        };

        await finishLaunch();
    },
}
```

This option may also be useful when running several test suites in parallel on different machines.
**Note:** In case of running specs in parallel on several machines, it is recommended to finish the launch after the test execution in a separate step within your CI pipeline.

### Option 2

Using this option a separate launch still will be created for each spec file, but at the end of the entire execution they will be merged into a single launch.

1. Specify the following option in the ReportPortal agent config:

```javascript
const rpConfig = {
    // ...
    isLaunchMergeRequired: true,
};
```

2. Add the following code to run the merge in WebdriverIO [`onComplete`](https://webdriver.io/docs/options/#oncomplete) hook:

```javascript
const fs = require('fs');
const glob = require('glob');
const { Reporter } = require('@reportportal/agent-js-webdriverio');
const RPClient = require('@reportportal/client-javascript');

const rpConfig = {
    // ...
    isLaunchMergeRequired: true,
};

exports.config = {
    // ...
    reporters: [[Reporter, rpConfig]],
    // ...
    onComplete: async function (exitCode, config, capabilities, results) {
        if (rpConfig.isLaunchMergeRequired) {
            try {
                const client = new RPClient(rpConfig);
                await client.mergeLaunches();
                console.log('Launches successfully merged!');
            } catch (error) {
                console.error(error);
            } finally {
                const files = glob.sync('rplaunch-*.tmp');
                const deleteTempFile = (filename) => {
                    fs.unlinkSync(filename);
                };
                files.forEach(deleteTempFile);
            }
        }
    },
}
```

## Manual merge launches

Please check the options described in [Getting a single launch](#getting-a-single-launch) section.

## Copyright Notice
Licensed under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
license (see the LICENSE file).
