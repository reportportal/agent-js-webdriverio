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

describe('reporter constructor', () => {
  const optionsWithDefaults = {
    seleniumCommandsLogLevel: 'info',
    ...options,
  };

  it('should store configuration data with default values', () => {
    const reporter = new Reporter(options);
    expect(reporter.options).toEqual(optionsWithDefaults);
  });

  it('isSynchronised should be FALSE', () => {
    const reporter = new Reporter(options);
    expect(reporter.isSynchronised).toBeFalsy();
  });

  it('should override options defaults via user provided options', () => {
    const reporterOptions = { ...options, seleniumCommandsLogLevel: 'debug' };
    const reporter = new Reporter(reporterOptions);
    expect(reporter.options).toEqual(reporterOptions);
  });
});
