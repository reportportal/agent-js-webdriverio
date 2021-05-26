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

import pjson from '../../package.json';
import {
  getAgentInfo,
  getClientConfig,
  getStartLaunchObj,
  getSystemAttributes,
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
      const extendedOptions = {
        ...options,
        rerun: true,
        rerunOf: '00000000-0000-0000-0000-000000000000',
        skippedIssue: true,
        mode: 'DEFAULT',
        debug: true,
        headers: { foo: 'bar' },
        restClientConfig: {
          agent: { keepAlive: true },
        },
      };
      const extendedRes = {
        ...baseRes,
        rerun: true,
        rerunOf: '00000000-0000-0000-0000-000000000000',
        skippedIssue: true,
        mode: 'DEFAULT',
        debug: true,
        headers: { foo: 'bar' },
        restClientConfig: {
          agent: { keepAlive: true },
        },
      };

      expect(getClientConfig(extendedOptions)).toEqual(extendedRes);
    });
  });

  it('getAgentInfo', () => {
    const agentInfo = getAgentInfo();

    expect(agentInfo.name).toBe(pjson.name);
    expect(agentInfo.version).toBe(pjson.version);
  });

  it('getSystemAttributes', () => {
    const expectedRes = [
      {
        key: 'agent',
        value: `${pjson.name}|${pjson.version}`,
        system: true,
      },
    ];

    expect(getSystemAttributes()).toEqual(expectedRes);
  });

  describe('getStartLaunchObj', () => {
    const systemAttributes = getSystemAttributes();

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
});
