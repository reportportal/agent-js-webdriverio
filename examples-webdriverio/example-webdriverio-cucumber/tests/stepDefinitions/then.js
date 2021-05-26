const { Then } = require('@cucumber/cucumber');
const assert = require('assert');

Then(/^I expect the title of the page "([^"]*)"$/, (title) => {
  assert.strictEqual(title, 'Google_2');
});
