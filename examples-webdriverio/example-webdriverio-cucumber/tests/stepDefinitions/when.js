const { Given } = require('@cucumber/cucumber');
const { ReportingApi } = require('@reportportal/agent-js-webdriverio/src/reportingApi');

Given('I go to the website abc', async () => {
  ReportingApi.addAttributes([
    {
      key: 'runner',
      value: 'cucumber',
    },
    {
      value: 'given_attribute',
    },
  ]);
  ReportingApi.setDescription('when description');
  await browser.url('http://www.google.com');
  await browser.saveScreenshot('./screenshot.png');
  ReportingApi.trace('TRACE message log');
});
