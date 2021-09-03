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
