const { ReportingApi } = require('@reportportal/agent-js-webdriverio/src/reportingApi');

describe('Suite 1', () => {
  ReportingApi.addAttributes(
    [
      {
        key: 'runner',
        value: 'jasmine',
      },
      {
        value: 'suite_attribute',
      },
    ],
    'Suite 1',
  );
  it('Test should be PASSED', () => {
    browser.url('https://webdriver.io');
    const title = browser.getTitle();
    expect(title).toBe(
      'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    );
  });
  xit('Test should be SKIPPED', () => {
    browser.url('https://webdriver.io');
    const title = browser.getTitle();
    expect(title).toBe(
      'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    );
  });
  it('Test should be FAILED', () => {
    browser.url('https://webdriver.io');
    const title = browser.getTitle();
    expect(title).toBe(
      'WebdriverIO ·  Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    );
  });
  it('Test with custom attributes', () => {
    ReportingApi.addAttributes([
      {
        key: 'runner',
        value: 'jasmine',
      },
      {
        value: 'step_attribute',
      },
    ]);
    browser.url('https://webdriver.io');
    const title = browser.getTitle();
    expect(title).toBe('WebdriverIO');
  });
  describe('should be type:TEST', () => {
    ReportingApi.addAttributes(
      [
        {
          key: 'runner',
          value: 'jasmine',
        },
        {
          value: 'test_attribute',
        },
      ],
      'should be type:TEST',
    );
    it('test should be FAILED', () => {
      expect(true).toBe(false);
    });
  });
});
