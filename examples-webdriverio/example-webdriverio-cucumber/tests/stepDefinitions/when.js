const { Given } = require('@cucumber/cucumber');
const { ReportingApi } = require('@reportportal/agent-js-webdriverio/src/reportingApi');

Given('I go to the website abc', () => {
  ReportingApi.addAttributes([
    {
      key: 'runner',
      value: 'cucumber',
    },
    {
      value: 'given_attribute',
    },
  ]);
  browser.url('http://www.google.com');
});
