const { Given } = require('@cucumber/cucumber');

Given('I go to the website abc', () => {
  browser.url('http://www.google.com');
});
