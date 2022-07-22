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
import { LaunchObj } from '../models';
import { getStartLaunchObj } from '../utils';
import { getClientConfig } from '../utils';
import { RunnerStats } from '@wdio/reporter';

describe('onRunnerStart', () => {
  const reporter: Reporter = new Reporter(options);
  const runner: Partial<RunnerStats> = { isMultiremote: false };
  reporter['client'] = new RPClientMock(getClientConfig(options));

  it('client.startLaunch should be called with corresponding params', () => {
    const launchDataRQ: LaunchObj = getStartLaunchObj(options);

    reporter.onRunnerStart(runner);

    expect(reporter['client'].startLaunch).toBeCalledTimes(1);
    expect(reporter['client'].startLaunch).toBeCalledWith(launchDataRQ);
    expect(reporter['tempLaunchId']).toBe('tempLaunchId');
  });
});
