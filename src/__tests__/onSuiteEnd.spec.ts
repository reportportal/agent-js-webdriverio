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
import { suiteId, suiteName } from './mocks/data';
import { getClientConfig } from '../utils';
import { LOG_LEVELS } from '../constants';

describe('onSuiteEnd', () => {
  let reporter: Reporter;
  beforeEach(() => {
    reporter = new Reporter(options);
    reporter['client'] = new RPClientMock(getClientConfig(options));
    reporter['tempLaunchId'] = 'tempLaunchId';
    reporter['storage'].addSuite({ id: suiteId, name: suiteName });
  });

  it('client.finishTestItem should be called with corresponding params', () => {
    reporter.onSuiteEnd();

    expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
    expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {});
    expect(reporter['storage'].getCurrentSuite()).toEqual(null);
  });

  it('suite with logs. should call client.sendLog method', () => {
    reporter['storage'].addAdditionalSuiteData(suiteName, {
      logs: [
        { level: LOG_LEVELS.INFO, message: 'message' },
        { level: LOG_LEVELS.INFO, message: 'message_2' },
      ],
    });

    reporter.onSuiteEnd();

    expect(reporter['client'].sendLog).toBeCalledTimes(2);
    expect(reporter['client'].sendLog).toBeCalledWith(
      suiteId,
      {
        level: 'INFO',
        message: 'message',
      },
      undefined,
    );
    expect(reporter['client'].sendLog).toBeCalledWith(
      suiteId,
      {
        level: 'INFO',
        message: 'message_2',
      },
      undefined,
    );
  });
});
