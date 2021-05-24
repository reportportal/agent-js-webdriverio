/*
 *  Copyright 2021 EPAM Systems
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import { options } from './mocks/optionsMock';
import { RPClientMock } from './mocks/RPClientMock';
import { suiteId, suiteName, testId, testName } from './mocks/data';

const { Reporter } = require('../reporter');

describe('finishing test reporting', () => {
  let reporter: typeof Reporter;
  beforeEach(() => {
    reporter = new Reporter(options);
    reporter.client = new RPClientMock(options.reportPortalClientConfig);
    reporter.tempLaunchId = 'tempLaunchId';
    reporter.storage.addSuite({ id: suiteId, name: suiteName });
    reporter.storage.addTest({ id: testId, name: testName });
  });

  it('reporter.finishTest method: client.finishTestItem should be called with corresponding params', () => {
    const testStats = {
      title: testName,
      state: 'passed',
    };
    const finishTestItemRQ = {
      status: testStats.state,
    };
    reporter.finishTest(testStats);

    expect(reporter.client.finishTestItem).toBeCalledTimes(1);
    expect(reporter.client.finishTestItem).toBeCalledWith(testId, finishTestItemRQ);
    expect(reporter.storage.getCurrentTest()).toBeNull();
  });

  describe('check finishing test with different statuses', () => {
    let spyOnFinishTest: jest.SpyInstance;
    beforeEach(() => {
      spyOnFinishTest = jest.spyOn(reporter, 'finishTest');
    });

    it('onTestPass: reporter.finishTest should be called with corresponding params', () => {
      const testStats = {
        title: testName,
        state: 'passed',
      };

      reporter.onTestPass(testStats);

      expect(spyOnFinishTest).toBeCalledTimes(1);
      expect(spyOnFinishTest).toBeCalledWith(testStats);
    });

    it(`onTestFail: client.sendLog should be called with corresponding params.
              reporter.finishTest should be called`, () => {
      const testStats = {
        title: testName,
        state: 'failed',
        errors: [
          {
            matcherName: 'toBe',
            message: 'Expected true to be false.',
            stack: 'error message',
            passed: false,
            expected: false,
            actual: true,
          },
        ],
      };

      reporter.onTestFail(testStats);

      expect(reporter.client.sendLog).toBeCalledTimes(1);
      expect(reporter.client.sendLog).toBeCalledWith(testId, {
        level: 'ERROR',
        message: testStats.errors[0].stack,
      });
      expect(spyOnFinishTest).toBeCalledTimes(1);
      expect(spyOnFinishTest).toBeCalledWith(testStats);
    });

    it('onTestSkip: reporter.finishTest should be called with corresponding params', () => {
      const testStats = {
        title: testName,
        state: 'skipped',
      };

      reporter.onTestSkip(testStats);

      expect(spyOnFinishTest).toBeCalledTimes(1);
      expect(spyOnFinishTest).toBeCalledWith(testStats);
    });
  });
});
