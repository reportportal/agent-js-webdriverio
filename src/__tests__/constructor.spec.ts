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
  let reporter: Reporter;
  beforeEach(() => {
    reporter = new Reporter(options);
  });

  it('should store configuration data', () => {
    expect(reporter.options).toEqual(options);
  });

  it('isSynchronised should be FALSE', () => {
    expect(reporter.isSynchronised).toBeFalsy();
  });
});
