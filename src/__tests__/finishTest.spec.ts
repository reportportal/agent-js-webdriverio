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

import { Reporter } from '../reporter';
import { options } from './mocks/optionsMock';
import { RPClientMock } from './mocks/RPClientMock';
import { suiteId, suiteName, testId, testName } from './mocks/data';
import { getClientConfig } from '../utils';
import { RP_STATUSES } from '../constants';

describe('finishing test reporting', () => {
  let reporter: Reporter;
  beforeEach(() => {
    reporter = new Reporter(options);
    reporter['client'] = new RPClientMock(getClientConfig(options));
    reporter['tempLaunchId'] = 'tempLaunchId';
    reporter['storage'].addSuite({ id: suiteId, name: suiteName });
    reporter['storage'].addTest({ id: testId, name: testName });
  });

  it('reporter.finishTest method: client.finishTestItem should be called with corresponding params', () => {
    const testStats: any = {
      title: testName,
      state: 'passed',
    };
    const finishTestItemRQ = {
      status: testStats.state,
    };
    reporter.finishTest(testStats);

    expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
    expect(reporter['client'].finishTestItem).toBeCalledWith(testId, finishTestItemRQ);
    expect(reporter['storage'].getCurrentTest()).toBeNull();
  });

  describe('check finishing test with different statuses', () => {
    let spyOnFinishTest: jest.SpyInstance;
    beforeEach(() => {
      spyOnFinishTest = jest.spyOn(reporter, 'finishTest');
    });

    it('onTestPass: reporter.finishTest should be called with corresponding params', () => {
      const testStats: any = {
        title: testName,
        state: 'passed',
      };

      reporter.onTestPass(testStats);

      expect(spyOnFinishTest).toBeCalledTimes(1);
      expect(spyOnFinishTest).toBeCalledWith(testStats);
    });

    describe('onTestFail method', () => {
      const testStats: any = {
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
      let spyOnUpdateCurrentTest: jest.SpyInstance;
      beforeEach(() => {
        spyOnUpdateCurrentTest = jest.spyOn(reporter['storage'], 'updateCurrentTest');
      });

      it(`client.sendLog should be called with corresponding params.
        storage.updateCurrentTest method should be called with corresponding params.
        reporter.finishTest should be called. test in storage have description`, () => {
        reporter['storage'].updateCurrentTest({ description: 'some text' });

        reporter.onTestFail(testStats);

        expect(reporter['client'].sendLog).toBeCalledTimes(1);
        expect(reporter['client'].sendLog).toBeCalledWith(testId, {
          level: 'ERROR',
          message: testStats.errors[0].stack,
        });
        expect(spyOnUpdateCurrentTest).toBeCalledWith({
          description: `some text\n\`\`\`error\nerror message\n\`\`\``,
        });
        expect(spyOnFinishTest).toBeCalledTimes(1);
        expect(spyOnFinishTest).toBeCalledWith(testStats);
      });

      it(`client.sendLog should be called with corresponding params.
        storage.updateCurrentTest method should be called with corresponding params.
        reporter.finishTest should be called. test in storage have no description`, () => {
        reporter.onTestFail(testStats);

        expect(reporter['client'].sendLog).toBeCalledTimes(1);
        expect(reporter['client'].sendLog).toBeCalledWith(testId, {
          level: 'ERROR',
          message: testStats.errors[0].stack,
        });
        expect(spyOnUpdateCurrentTest).toBeCalledWith({
          description: `\`\`\`error\nerror message\n\`\`\``,
        });
        expect(spyOnFinishTest).toBeCalledTimes(1);
        expect(spyOnFinishTest).toBeCalledWith(testStats);
      });
    });

    it('onTestSkip: reporter.finishTest should be called with corresponding params', () => {
      const testStats: any = {
        title: testName,
        state: 'skipped',
      };
      reporter.onTestStart = jest.fn();

      reporter.onTestSkip(testStats);

      expect(reporter.onTestStart).toHaveBeenCalledTimes(1);
      expect(reporter.onTestStart).toHaveBeenCalledWith(testStats);
      expect(spyOnFinishTest).toBeCalledTimes(1);
      expect(spyOnFinishTest).toBeCalledWith(testStats);
    });
  });

  describe('check finishing test with additional data', () => {
    const testStats: any = {
      title: testName,
      state: 'passed',
    };

    it('test with attributes, description, custom status', () => {
      const attributes = [
        {
          key: 'key1',
          value: 'value1',
        },
      ];
      const description = 'test_description';
      const finishTestItemRQ = {
        status: RP_STATUSES.INFO,
        attributes,
        description,
      };

      reporter.addAttributes({ attributes });
      reporter.setDescription({ text: description });
      reporter.setStatus({ status: RP_STATUSES.INFO });
      reporter.finishTest(testStats);

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(testId, finishTestItemRQ);
    });
  });
});
