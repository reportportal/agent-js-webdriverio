describe('Suite 1', () => {
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
  describe('should be type:TEST', () => {
    it('test should be FAILED', () => {
      expect(true).toBe(false);
    });
  });
});
