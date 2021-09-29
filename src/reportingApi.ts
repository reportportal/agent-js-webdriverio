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

import ClientPublicReportingAPI from '@reportportal/client-javascript/lib/publicReportingAPI';
import { RP_STATUSES } from '@reportportal/client-javascript/lib/constants/statuses';
import { Attachment, Attribute } from './models';
import { LOG_LEVELS } from './constants';

export const ReportingApi = {
  addAttributes: (attributes: Attribute[], suite?: string): void =>
    ClientPublicReportingAPI.addAttributes(attributes, suite),
  setDescription: (text: string, suite?: string): void =>
    ClientPublicReportingAPI.setDescription(text, suite),
  setLaunchStatus: (status: RP_STATUSES): void => ClientPublicReportingAPI.setLaunchStatus(status),
  setLaunchStatusPassed: (): void => ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.PASSED),
  setLaunchStatusFailed: (): void => ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.FAILED),
  setLaunchStatusSkipped: (): void => ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.SKIPPED),
  setLaunchStatusStopped: (): void => ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.STOPPED),
  setLaunchStatusInterrupted: (): void =>
    ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.INTERRUPTED),
  setLaunchStatusCancelled: (): void =>
    ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.CANCELLED),
  setLaunchStatusInfo: (): void => ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.INFO),
  setLaunchStatusWarn: (): void => ClientPublicReportingAPI.setLaunchStatus(RP_STATUSES.WARN),
  setStatus: (status: RP_STATUSES, suite?: string): void =>
    ClientPublicReportingAPI.setStatus(status, suite),
  setStatusPassed: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.PASSED, suite),
  setStatusFailed: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.FAILED, suite),
  setStatusSkipped: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.SKIPPED, suite),
  setStatusStopped: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.STOPPED, suite),
  setStatusInterrupted: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.INTERRUPTED, suite),
  setStatusCancelled: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.CANCELLED, suite),
  setStatusInfo: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.INFO, suite),
  setStatusWarn: (suite?: string): void =>
    ClientPublicReportingAPI.setStatus(RP_STATUSES.WARN, suite),
  log: (level: LOG_LEVELS, message: string, file?: Attachment, suite?: string): void =>
    ClientPublicReportingAPI.addLog({ level, file, message }, suite),
  trace: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(LOG_LEVELS.TRACE, message, file, suite),
  debug: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(LOG_LEVELS.DEBUG, message, file, suite),
  info: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(LOG_LEVELS.INFO, message, file, suite),
  warn: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(LOG_LEVELS.WARN, message, file, suite),
  error: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(LOG_LEVELS.ERROR, message, file, suite),
  fatal: (message: string, file?: Attachment, suite?: string): void =>
    ReportingApi.log(LOG_LEVELS.FATAL, message, file, suite),
  launchLog: (level: LOG_LEVELS, message: string, file?: Attachment): void =>
    ClientPublicReportingAPI.addLaunchLog({ level, message, file }),
  launchTrace: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(LOG_LEVELS.TRACE, message, file),
  launchDebug: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(LOG_LEVELS.DEBUG, message, file),
  launchInfo: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(LOG_LEVELS.INFO, message, file),
  launchWarn: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(LOG_LEVELS.WARN, message, file),
  launchError: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(LOG_LEVELS.ERROR, message, file),
  launchFatal: (message: string, file?: Attachment): void =>
    ReportingApi.launchLog(LOG_LEVELS.FATAL, message, file),
};
