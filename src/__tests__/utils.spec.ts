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

import path from 'path';
// @ts-ignore
import { name as pjsonName, version as pjsonVersion } from '../../package.json';
import {
  getAgentInfo,
  getClientConfig,
  getCodeRef,
  getStartLaunchObj,
  getSystemAttributes,
  limit,
  parseTags,
  promiseErrorHandler,
} from '../utils';
import { options } from './mocks/optionsMock';

describe('utils', () => {
  it('promiseErrorHandler', async () => {
    const log = jest.spyOn(console, 'error');
    const promiseWithError = () => Promise.reject('error message');
    await promiseErrorHandler(promiseWithError());

    expect(log).toBeCalledTimes(1);
    expect(log).toBeCalledWith('error message');
  });

  describe('getClientConfig', () => {
    const { token, endpoint, launch, project, attributes, description } = options;
    const baseRes = {
      token,
      endpoint,
      launch,
      project,
      attributes,
      description,
    };

    it('getClientConfig with base config', () => {
      expect(getClientConfig(options)).toEqual(baseRes);
    });

    it('getClientConfig with extended config', () => {
      const additionalOptions = {
        rerun: true,
        rerunOf: '00000000-0000-0000-0000-000000000000',
        skippedIssue: true,
        mode: 'DEFAULT',
        debug: true,
        headers: { foo: 'bar' },
        restClientConfig: {
          agent: { keepAlive: true },
        },
        cucumberNestedSteps: true,
      };
      const extendedOptions = {
        ...options,
        ...additionalOptions,
      };
      const expectedRes = {
        ...baseRes,
        ...additionalOptions,
      };

      expect(getClientConfig(extendedOptions)).toEqual(expectedRes);
    });
  });

  it('getAgentInfo', () => {
    const agentInfo = getAgentInfo();

    expect(agentInfo.name).toBe(pjsonName);
    expect(agentInfo.version).toBe(pjsonVersion);
  });

  describe('getSystemAttributes', () => {
    it('basic configuration', () => {
      const expectedRes = [
        {
          key: 'agent',
          value: `${pjsonName}|${pjsonVersion}`,
          system: true,
        },
      ];

      expect(getSystemAttributes(options)).toEqual(expectedRes);
    });

    it('configuration with skippedIssue=false', () => {
      const expectedRes = [
        {
          key: 'agent',
          value: `${pjsonName}|${pjsonVersion}`,
          system: true,
        },
        {
          key: 'skippedIssue',
          value: 'false',
          system: true,
        },
      ];

      expect(getSystemAttributes({ ...options, skippedIssue: false })).toEqual(expectedRes);
    });
  });

  describe('getStartLaunchObj', () => {
    const systemAttributes = getSystemAttributes(options);

    it('config with attributes', () => {
      const { description, attributes, rerun, rerunOf, mode } = options;
      const expectedRes = {
        attributes: [...attributes, ...systemAttributes],
        description,
        rerun,
        rerunOf,
        mode,
      };

      expect(getStartLaunchObj(options)).toEqual(expectedRes);
    });

    it('config without attributes', () => {
      const newOptions = Object.assign(options, { attributes: undefined });
      const { description, rerun, rerunOf, mode } = newOptions;
      const expectedRes = { attributes: systemAttributes, description, rerun, rerunOf, mode };

      expect(getStartLaunchObj(options)).toEqual(expectedRes);
    });
  });

  describe('getCodeRef', () => {
    jest.spyOn(process, 'cwd').mockReturnValue(`C:${path.sep}project`);
    const testPath = `C:${path.sep}project${path.sep}__test__${path.sep}example.js`;
    const ancestors = [
      { name: 'suiteTitle_1', id: 'suite_id_1' },
      { name: 'suiteTitle_2', id: 'suite_id_2' },
    ];
    const testTitle = 'testTitle';

    it('should be correct codeRef ', () => {
      const codeRef = getCodeRef(testPath, testTitle, ancestors);
      const expectedRes = '__test__/example.js/suiteTitle_1/suiteTitle_2/testTitle';
      expect(codeRef).toBe(expectedRes);
    });
  });

  describe('parseTags', () => {
    const tags = [
      { name: '@cucumberKey:value', line: 1 },
      { name: '@value2', line: 19 },
    ];

    it('should return correct attributes', () => {
      const expectedRes = [{ key: 'cucumberKey', value: 'value' }, { value: 'value2' }];
      expect(parseTags(tags)).toEqual(expectedRes);
    });

    it('should return empty array', () => {
      expect(parseTags([''])).toEqual([]);
    });
  });
  describe('limit', () => {
    const baseUser = {
      name: 'UserName',
      surname: 'UserSurname',
      fullName: 'UserName UserSurname',
      age: 21,
      id: 2,
      tel: '12345',
      eMail: 'absdefg@yourMail.com',
      address: 'Some address',
      password: '*****',
    };

    const baseValues = new Array(9).fill('some value');

    it('should not changed value if argument is null', () => {
      expect(limit(null)).toBeNull();
    });

    it('should not changed value if argument is undefined', () => {
      expect(limit(undefined)).toBeUndefined();
    });

    it('should not changed value if argument is 0', () => {
      expect(limit(0)).toBe(0);
    });

    it('should not changed value if argument is ""', () => {
      expect(limit('')).toBe('');
    });

    it('should works correctly if string`s length less than 1000', () => {
      expect(limit('Value witch length less then 1000')).toBe('Value witch length less then 1000');
    });

    it('should works correctly with object that has less then 10 properties', () => {
      expect(limit(baseUser)).toEqual(baseUser);
    });

    it('should works correctly with object that has 10 properties or more', () => {
      const user = {
        ...baseUser,
        role: 'Some role',
        hobbies: 'Some hobbies',
      };

      const expectedObject = { ...baseUser, role: 'Some role', _: `1 more keys: [\"hobbies\"]` };

      expect(limit(user)).toEqual(expectedObject);
    });

    it('should works correctly with arrays witch length less then 10', () => {
      expect(limit(baseValues)).toEqual(baseValues);
    });

    it('should works correctly with arrays witch length 10 or more', () => {
      const valuesArray = [...baseValues, 'some value', 'some value'];
      const expectedArray = [...baseValues, 'some value', '(1 more items)'];

      expect(limit(valuesArray)).toEqual(expectedArray);
    });
  });
});
