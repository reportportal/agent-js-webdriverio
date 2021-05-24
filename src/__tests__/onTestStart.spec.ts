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
import { suiteId, suiteName, testName } from './mocks/data';

const { Reporter } = require('../reporter');

describe('onTestStart', () => {
  const reporter: typeof Reporter = new Reporter(options);
  reporter.client = new RPClientMock(options.reportPortalClientConfig);
  reporter.tempLaunchId = 'tempLaunchId';
  reporter.storage.addSuite({ id: suiteId, name: suiteName });

  it('client.startTestItem should be called with corresponding params', () => {
    const testStats = {
      title: testName,
    };
    reporter.onTestStart(testStats);

    expect(reporter.client.startTestItem).toBeCalledTimes(1);
    expect(reporter.client.startTestItem).toBeCalledWith(
      { name: testName, type: 'STEP' },
      reporter.tempLaunchId,
      suiteId,
    );
    expect(reporter.storage.getCurrentTest()).toEqual({ id: 'tempTestItemId', name: testName });
  });
});
