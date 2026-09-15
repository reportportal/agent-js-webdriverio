/*
 *  Copyright 2024 EPAM Systems
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

import type {
  Attachment as ClientAttachment,
  Attribute,
  ReportPortalConfig as ClientConfigBase,
  FinishTestItemOptions,
  LogOptions,
} from '@reportportal/client-javascript/models';
import { STATUSES, LOG_LEVELS } from '@reportportal/client-javascript/constants';
import { FILE_TYPES } from '../constants';

export type ClientConfig = ClientConfigBase;

export interface Config extends Omit<ClientConfig, 'skippedIsNotIssue'> {
  rerun?: boolean;
  rerunOf?: string;
  seleniumCommandsLogLevel?: LOG_LEVELS;
  reportSeleniumCommands?: boolean;
  launchId?: string;
  skippedIssue?: boolean;
}

// Client's Attachment types `type` as a plain string; narrowed here to the agent's FILE_TYPES.
export interface Attachment extends Omit<ClientAttachment, 'type'> {
  type: FILE_TYPES;
}

export interface BaseObj {
  [name: string]: string;
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
  status?: STATUSES;
  testCaseId?: string;
}

// Client's FinishTestItemOptions doesn't carry codeRef; the agent tracks it separately.
export interface FinishTestItem extends FinishTestItemOptions {
  codeRef?: string;
}

export interface AdditionalData {
  attributes?: Attribute[];
  description?: string;
  status?: STATUSES;
  logs?: LogOptions[];
  testCaseId?: string;
}

export interface AdditionalSuitesData {
  [name: string]: AdditionalData;
}
