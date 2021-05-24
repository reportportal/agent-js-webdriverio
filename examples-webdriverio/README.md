## Example for @reportportal/agent-js-webdriverio

## Run test example:

## Installation
Add test framework. Follow the instruction on the page [WDIO frameworks](https://webdriver.io/docs/frameworks)

Run:
```cmd
npm install or npm i
```

## Configuration 
Configure `wdio.config.js` file: 
```js
const { Reporter } = require('@reportportal/agent-js-webdriverio');

const config = {
  reportPortalClientConfig: {
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'http://your-instance:8080/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: 'Launch description',
    attributes: [{ key: 'key', value: 'value' }, { value: 'value' }], // launch attributes
    headers: { foo: 'bar' }, // optional headers for internal http client
  },
};

exports.config = {
  // ...
  services: [[Reporter, config]],
  framework: 'jasmine' // chosen framework
  // ...
};
```

To run the tests use command
```cmd
npm run test
```
