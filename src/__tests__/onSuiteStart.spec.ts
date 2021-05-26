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
import { suiteName } from './mocks/data';
import { getClientConfig } from '../utils';

describe('onSuiteStart', () => {
  let reporter: Reporter;
  beforeEach(() => {
    reporter = new Reporter(options);
    reporter['client'] = new RPClientMock(getClientConfig(options));
    reporter['tempLaunchId'] = 'tempLaunchId';
  });

  it('client.startTestItem should be called with corresponding params', () => {
    const suiteStats: any = {
      title: suiteName,
    };
    reporter.onSuiteStart(suiteStats);

    expect(reporter['client'].startTestItem).toBeCalledTimes(1);
    expect(reporter['client'].startTestItem).toBeCalledWith(
      { name: suiteName, type: 'SUITE' },
      'tempLaunchId',
      null,
    );
  });

  it('client.startTestItem should create SUITE', () => {
    const suiteStats: any = {
      title: suiteName,
    };
    reporter.onSuiteStart(suiteStats);

    expect(reporter['client'].startTestItem).toBeCalledTimes(1);
    expect(reporter['client'].startTestItem).toBeCalledWith(
      { name: suiteName, type: 'SUITE' },
      'tempLaunchId',
      null,
    );
  });

  it('client.startTestItem should create TEST', () => {
    const suiteStats: any = {
      title: suiteName,
    };
    reporter['storage'].addSuite({ id: 'suite_parent_id', name: 'suite_parent_name' });
    reporter.onSuiteStart(suiteStats);

    expect(reporter['client'].startTestItem).toBeCalledTimes(1);
    expect(reporter['client'].startTestItem).toBeCalledWith(
      { name: suiteName, type: 'TEST' },
      'tempLaunchId',
      'suite_parent_id',
    );
    expect(reporter['storage'].getCurrentSuite()).toEqual({
      id: 'tempTestItemId',
      name: suiteName,
    });
  });
});
