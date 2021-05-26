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

export enum TYPES {
  SUITE = 'SUITE',
  STEP = 'STEP',
  STORY = 'STORY',
  TEST = 'TEST',
  SCENARIO = 'SCENARIO',
  BEFORE_CLASS = 'BEFORE_CLASS',
  BEFORE_GROUPS = 'BEFORE_GROUPS',
  BEFORE_METHOD = 'BEFORE_METHOD',
  BEFORE_SUITE = 'BEFORE_SUITE',
  BEFORE_TEST = 'BEFORE_TEST',
  AFTER_CLASS = 'AFTER_CLASS',
  AFTER_GROUPS = 'AFTER_GROUPS',
  AFTER_METHOD = 'AFTER_METHOD',
  AFTER_SUITE = 'AFTER_SUITE',
  AFTER_TEST = 'AFTER_TEST',
}

export enum LOG_LEVELS {
  ERROR = 'ERROR',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
}

export enum FILE_TYPES {
  XML = 'application/xml',
  HTML = 'application/html',
  JAVASCRIPT = 'application/javascript',
  JSON = 'application/json',
  PHP = 'application/php',
  CSS = 'application/css',
  TEXT = 'text/plain',
  PNG = 'image/png',
  JPG = 'image/jpg',
}
