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
import { getClientConfig } from '../utils';
import { suiteId, suiteName, testId, testName } from './mocks/data';
import { LOG_LEVELS, STATUSES } from '../constants';

describe('reporterApiHandlers', () => {
  let reporter: Reporter;
  beforeEach(() => {
    reporter = new Reporter(options);
    reporter['client'] = new RPClientMock(getClientConfig(options));
    reporter['tempLaunchId'] = 'tempLaunchId';
    reporter['storage'].addSuite({ id: suiteId, name: suiteName });
    reporter['storage'].addTest({ id: testId, name: testName });
  });
  afterEach(() => {
    process.removeAllListeners();
  });

  describe('addAttributes', () => {
    const attributes = [{ key: 'key', value: 'value' }];

    it('reporter.addAttributes pass attributes', () => {
      const expectedRes = { id: testId, name: testName, attributes };
      reporter.addAttributes({ attributes });

      expect(reporter['storage'].getCurrentTest()).toEqual(expectedRes);
    });

    it('reporter.addAttributes pass attributes and suite', () => {
      reporter.addAttributes({ attributes, suite: suiteName });

      expect(reporter['storage'].getAdditionalSuiteData(suiteName)).toEqual({ attributes });
    });

    it('reporter.addAttributes pass wrong params', () => {
      const log = jest.spyOn(console, 'error');
      //@ts-ignore
      reporter.addAttributes({});

      expect(log).toBeCalledTimes(1);
      expect(log).toBeCalledWith('Attributes should be instance of Array');
    });
  });

  describe('setDescription', () => {
    const description = 'some text';

    it('reporter.setDescription pass description', () => {
      const expectedRes = { id: testId, name: testName, description };
      reporter.setDescription({ text: description });

      expect(reporter['storage'].getCurrentTest()).toEqual(expectedRes);
    });

    it('reporter.setDescription pass description and suite', () => {
      reporter.setDescription({ text: description, suite: suiteName });

      expect(reporter['storage'].getAdditionalSuiteData(suiteName)).toEqual({ description });
    });
  });

  describe('setLaunchStatus', () => {
    it('reporter.setLaunchStatus assign status to the launch', () => {
      reporter.setLaunchStatus(STATUSES.FAILED);

      expect(reporter['customLaunchStatus']).toBe(STATUSES.FAILED);
    });
  });

  describe('setStatus', () => {
    const status = STATUSES.INTERRUPTED;

    it('reporter.setStatus assign status to the test', () => {
      const expectedRes = { id: testId, name: testName, status };
      reporter.setStatus({ status });

      expect(reporter['storage'].getCurrentTest()).toEqual(expectedRes);
    });

    it('reporter.setStatus assign status to the suite', () => {
      reporter.setStatus({ status, suite: suiteName });

      expect(reporter['storage'].getAdditionalSuiteData(suiteName)).toEqual({ status });
    });
  });

  describe('logs attaching', () => {
    const log = {
      level: LOG_LEVELS.INFO,
      message: 'message',
    };

    it('reporter.sendLaunchLog attach log to the launch', () => {
      reporter.sendLaunchLog(log);

      expect(reporter['client'].sendLog).toBeCalledWith(
        'tempLaunchId',
        { level: 'INFO', message: 'message' },
        undefined,
      );
    });

    it(`reporter.sendTestItemLog pass log and suite as parameters.
    should update storage additional suite data`, () => {
      reporter.sendTestItemLog({ log, suite: suiteName });

      expect(reporter['storage'].getAdditionalSuiteData(suiteName)).toEqual({ logs: [log] });
    });

    it(`reporter.sendTestItemLog pass log as parameters.
    attach log to test. should call client.sendLog`, () => {
      reporter.sendTestItemLog({ log });

      expect(reporter['client'].sendLog).toBeCalledWith(
        testId,
        { level: 'INFO', message: 'message' },
        undefined,
      );
    });
  });
});
