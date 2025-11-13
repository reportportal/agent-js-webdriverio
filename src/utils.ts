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

import stringify from 'json-stringify-safe';
import path from 'path';
import { Reporters } from '@wdio/types';
import { Tag } from '@wdio/reporter/build/types';
// @ts-ignore
import { name as pjsonName, version as pjsonVersion } from '../package.json';
import { LAUNCH_MODES } from './constants';
import { Attribute, ClientConfig, LaunchObj, Suite } from './models';

export const promiseErrorHandler = (promise: Promise<any>): void => {
  promise.catch((err) => {
    console.error(err);
  });
};

export const getClientConfig = (options: Partial<Reporters.Options>): ClientConfig => {
  const {
    apiKey,
    endpoint,
    launch,
    project,
    rerun,
    rerunOf,
    skippedIssue,
    description,
    attributes,
    mode,
    debug,
    headers,
    restClientConfig,
    isLaunchMergeRequired,
    launchUuidPrint,
    launchUuidPrintOutput,
    oauth,
  } = options;

  return {
    apiKey,
    oauth,
    endpoint,
    launch,
    project,
    ...(rerun && { rerun }),
    ...(rerunOf && { rerunOf }),
    ...(skippedIssue && { skippedIssue }),
    ...(description && { description }),
    ...(attributes && { attributes }),
    ...(mode && { mode }),
    ...(debug && { debug }),
    ...(headers && { headers }),
    ...(restClientConfig && { restClientConfig }),
    launchUuidPrint,
    launchUuidPrintOutput,
    isLaunchMergeRequired,
  };
};

export const getAgentInfo = (): { version: string; name: string } => ({
  name: pjsonName,
  version: pjsonVersion,
});

export const getSystemAttributes = (config: Partial<Reporters.Options>): Attribute[] => {
  const { skippedIssue } = config;
  const systemAttributes = [
    {
      key: 'agent',
      value: `${pjsonName}|${pjsonVersion}`,
      system: true,
    },
  ];

  if (skippedIssue === false) {
    const skippedIssueAttribute = {
      key: 'skippedIssue',
      value: 'false',
      system: true,
    };
    systemAttributes.push(skippedIssueAttribute);
  }

  return systemAttributes;
};

export const getStartLaunchObj = (
  config: Partial<Reporters.Options>,
  launchObj: LaunchObj = {},
): LaunchObj => {
  const systemAttributes = getSystemAttributes(config);
  const { description, attributes, rerun, rerunOf, mode, launchId } = config;

  return {
    description,
    attributes: [...(attributes || []), ...systemAttributes],
    rerun,
    rerunOf,
    mode: mode || LAUNCH_MODES.DEFAULT,
    id: process.env.RP_LAUNCH_ID || launchId,
    ...launchObj,
  };
};

export const getCodeRef = (filePath: string, title: string, ancestors: Suite[]): string => {
  const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  const ancestorsTitles = ancestors.map((item) => item.name);
  return [relativePath, ...ancestorsTitles, title].join('/');
};

export const parseTags = (tags: string[] | Tag[]): Attribute[] => {
  return tags
    .map((item: string | Tag) => {
      if (typeof item === 'string') return null;
      const tag = item.name.slice(1);
      if (tag.includes(':')) {
        const [key, value] = tag.split(':');
        return { key, value };
      } else {
        return { value: tag };
      }
    })
    .filter(Boolean);
};

export const limit = (val: any): any => {
  if (!val) {
    return val;
  }

  const OBJ_LENGTH = 10;
  const ARR_LENGTH = 10;
  const STRING_LIMIT = 1000;
  const STRING_TRUNCATE = 200;

  let value = JSON.parse(stringify(val));

  switch (Object.prototype.toString.call(value)) {
    case '[object String]':
      if (value.length > STRING_LIMIT) {
        return `${value.substr(0, STRING_TRUNCATE)} ... (${
          value.length - STRING_TRUNCATE
        } more bytes)`;
      }

      return value;

    case '[object Array]': {
      const { length } = value;
      if (length > ARR_LENGTH) {
        value = value.slice(0, ARR_LENGTH);
        value.push(`(${length - ARR_LENGTH} more items)`);
      }

      return value.map(limit);
    }
    case '[object Object]': {
      const keys = Object.keys(value);
      const removed = [];
      for (let i = 0, l = keys.length; i < l; i += 1) {
        if (i < OBJ_LENGTH) {
          value[keys[i]] = limit(value[keys[i]]);
        } else {
          delete value[keys[i]];
          removed.push(keys[i]);
        }
      }

      if (removed.length) {
        value._ = `${keys.length - OBJ_LENGTH} more keys: ${JSON.stringify(removed)}`;
      }

      return value;
    }
    default: {
      return value;
    }
  }
};
