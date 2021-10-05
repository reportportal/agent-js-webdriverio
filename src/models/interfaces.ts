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

import { FILE_TYPES, LOG_LEVELS, TYPES } from '../constants';

export interface Config {
  token: string;
  endpoint: string;
  launch: string;
  project: string;
  description?: string;
  attributes?: Attribute[];
  headers?: BaseObj;
  mode?: 'DEFAULT' | 'DEBUG';
  debug?: boolean;
  skippedIssue?: boolean;
  isLaunchMergeRequired?: boolean;
  rerun?: boolean;
  rerunOf?: string;
}

export interface LaunchObj {
  name?: string;
  startTime?: Date | number;
  description?: string;
  attributes?: Attribute[];
  mode?: 'DEFAULT' | 'DEBUG';
  rerun?: boolean;
  rerunOf?: string;
  id?: string;
}

export interface LaunchFinishObj {
  endTime?: Date | number;
  status?: string;
}

export interface StartTestItem {
  name: string;
  type: TYPES;
  startTime?: Date | number;
  description?: string;
  attributes?: Attribute[];
  codeRef?: string;
}

export interface LogRQ {
  level?: LOG_LEVELS;
  message?: string;
  time?: number;
  file?: Attachment;
}

export interface Attachment {
  name: string;
  type: FILE_TYPES;
  content: string | Buffer;
}

export interface Attribute {
  value: string;
  key?: string;
  system?: boolean;
}

export interface BaseObj {
  [name: string]: string;
}

export interface Issue {
  issueType: string;
  comment?: string;
  externalSystemIssues?: ExternalSystemIssue[];
}

export interface ExternalSystemIssue {
  submitter: string;
  systemId: string;
  ticketId: string;
  url: string;
  submitDate?: Date | number;
}

export interface Suite {
  id: string;
  name: string;
  codeRef?: string;
}

export interface TestItem {
  id: string;
  name: string;
  attributes?: Attribute[];
  description?: string;
  status?: string;
}

export interface FinishTestItem {
  endTime?: Date | number;
  status?: string;
  issue?: Issue;
  codeRef?: string;
  attributes?: Attribute[];
}

export interface AdditionalData {
  attributes?: Attribute[];
  description?: string;
  status?: string;
  logs?: LogRQ[];
}

export interface AdditionalSuitesData {
  [name: string]: AdditionalData;
}
