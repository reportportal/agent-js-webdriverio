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

import ClientPublicReportingAPI from '@reportportal/client-javascript/publicReportingAPI';
import { STATUSES } from '@reportportal/client-javascript/constants';
import { Attachment, Attribute } from './models';
import { LOG_LEVELS, PREDEFINED_LOG_LEVELS } from './constants';

export const ReportingApi = {
  addAttributes: (attributes: Attribute[], suite?: string): void =>
    ClientPublicReportingAPI.addAttributes(attributes, suite),
  setDescription: (text: string, suite?: string): void =>
    ClientPublicReportingAPI.setDescription(text, suite),
  setTestCaseId: (testCaseId: string, suite?: string): void =>
    ClientPublicReportingAPI.setTestCaseId(testCaseId, suite),
  setLaunchStatus: (status: STATUSES): void => ClientPublicReportingAPI.setLaunchStatus(status),
  setLaunchStatusPassed: (): void => ClientPublicReportingAPI.setLaunchStatus(STATUSES.PASSED),
  setLaunchStatusFailed: (): void => ClientPublicReportingAPI.setLaunchStatus(STATUSES.FAILED),
  setLaunchStatusSkipped: (): void => ClientPublicReportingAPI.setLaunchStatus(STATUSES.SKIPPED),
  setLaunchStatusStopped: (): void => ClientPublicReportingAPI.setLaunchStatus(STATUSES.STOPPED),
  setLaunchStatusInterrupted: (): void =>
    ClientPublicReportingAPI.setLaunchStatus(STATUSES.INTERRUPTED),
  setLaunchStatusCancelled: (): void =>
    ClientPublicReportingAPI.setLaunchStatus(STATUSES.CANCELLED),
  setLaunchStatusInfo: (): void => ClientPublicReportingAPI.setLaunchStatus(STATUSES.INFO),
  setLaunchStatusWarn: (): void => ClientPublicReportingAPI.setLaunchStatus(STATUSES.WARN),
  setStatus: (status: STATUSES, suite?: string): void =>
    ClientPublicReportingAPI.setStatus(status, suite),
  setStatusPassed: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.PASSED, suite),
  setStatusFailed: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.FAILED, suite),
  setStatusSkipped: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.SKIPPED, suite),
  setStatusStopped: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.STOPPED, suite),
  setStatusInterrupted: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.INTERRUPTED, suite),
  setStatusCancelled: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.CANCELLED, suite),
  setStatusInfo: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.INFO, suite),
  setStatusWarn: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(STATUSES.WARN, suite),
  log: (
    level: LOG_LEVELS = PREDEFINED_LOG_LEVELS.INFO,
    message: string,
    file?: Attachment,
    suite?: string,
  ): void => ClientPublicReportingAPI.addLog({ level, file, message }, suite),
  trace: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(PREDEFINED_LOG_LEVELS.TRACE, message, file, suite),
  debug: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(PREDEFINED_LOG_LEVELS.DEBUG, message, file, suite),
  info: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(PREDEFINED_LOG_LEVELS.INFO, message, file, suite),
  warn: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(PREDEFINED_LOG_LEVELS.WARN, message, file, suite),
  error: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(PREDEFINED_LOG_LEVELS.ERROR, message, file, suite),
  fatal: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(PREDEFINED_LOG_LEVELS.FATAL, message, file, suite),
  launchLog: (level: LOG_LEVELS, message: string, file?: Attachment): void =>
    ClientPublicReportingAPI.addLaunchLog({ level, message, file }),
  launchTrace: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(PREDEFINED_LOG_LEVELS.TRACE, message, file),
  launchDebug: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(PREDEFINED_LOG_LEVELS.DEBUG, message, file),
  launchInfo: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(PREDEFINED_LOG_LEVELS.INFO, message, file),
  launchWarn: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(PREDEFINED_LOG_LEVELS.WARN, message, file),
  launchError: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(PREDEFINED_LOG_LEVELS.ERROR, message, file),
  launchFatal: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(PREDEFINED_LOG_LEVELS.FATAL, message, file),
};
