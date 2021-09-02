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

import { Storage } from '../storage';

describe('storage', () => {
  const storage: Storage = new Storage();
  const suiteData = {
    id: 'suite_id',
    name: 'suite_name',
  };
  const testData = {
    id: 'test_id',
    name: 'test_name',
  };

  it('addSuite', () => {
    storage.addSuite(suiteData);
    expect(storage.getCurrentSuite()).toEqual(suiteData);
  });

  it('removeSuite', () => {
    storage.removeSuite(suiteData.id);
    expect(storage.getCurrentSuite()).toBeNull();
  });

  it('addAdditionalSuiteData should add suite data by passing key and data', () => {
    const storageKey = 'key';
    const expectedRes = { attributes: [{ value: 'value' }] };
    storage.addAdditionalSuiteData(storageKey, { attributes: [{ value: 'value' }] });
    expect(storage.getAdditionalSuiteData(storageKey)).toEqual(expectedRes);
  });

  it('addTest', () => {
    storage.addTest(testData);
    expect(storage.getCurrentTest()).toEqual(testData);
  });

  it('updateTest', () => {
    const additionalData = { attributes: [{ value: 'value' }] };
    storage.updateCurrentTest(additionalData);
    expect(storage.getCurrentTest()).toEqual({ ...testData, ...additionalData });
  });

  it('removeTest', () => {
    storage.removeTest(testData.id);
    expect(storage.getCurrentTest()).toBeNull();
  });
});
