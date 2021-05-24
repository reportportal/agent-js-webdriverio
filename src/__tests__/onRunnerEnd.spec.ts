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

const { Reporter } = require('../reporter');

describe('onRunnerEnd', () => {
  let reporter: typeof Reporter;
  beforeEach(() => {
    reporter = new Reporter(options);
    reporter.client = new RPClientMock(options.reportPortalClientConfig);
    reporter.tempLaunchId = 'tempLaunchId';
  });

  it('client.finishLaunch should be called with corresponding params', async () => {
    await reporter.onRunnerEnd();

    expect(reporter.client.finishLaunch).toBeCalledTimes(1);
    expect(reporter.client.finishLaunch).toBeCalledWith('tempLaunchId', {});
    expect(reporter.tempLaunchId).toBeNull();
    expect(reporter.isSynchronised).toBeTruthy();
  });

  it('client.getPromiseFinishAllItems with error', async () => {
    const log = jest.spyOn(console, 'log');
    reporter.client.getPromiseFinishAllItems = jest.fn().mockReturnValue(Promise.reject('error'));
    await reporter.onRunnerEnd();

    expect(reporter.client.finishLaunch).toBeCalledTimes(0);
    expect(reporter.isSynchronised).toBeTruthy();

    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith('error');
  });
});
