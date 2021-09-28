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

//@ts-ignore
import ClientPublicReportingAPI from '@reportportal/client-javascript/lib/publicReportingAPI';
import { ReportingApi } from '../reportingApi';
import { suiteName } from './mocks/data';
import { LOG_LEVELS, STATUSES } from '../constants';

const attributes = [{ key: 'key', value: 'value' }];
const description = 'some text';

describe('ReportingApi', () => {
  describe('ReportingApi.addAttributes', () => {
    const spyOnAddAttributes = jest.spyOn(ClientPublicReportingAPI, 'addAttributes');

    it('should call clientPublicReportingApi.addAttributes method with text and undefined as parameter', () => {
      ReportingApi.addAttributes(attributes);

      expect(spyOnAddAttributes).toBeCalledWith(attributes, undefined);
    });

    it('should call clientPublicReportingApi.addAttributes method with text and suite as parameter', () => {
      ReportingApi.addAttributes(attributes, suiteName);

      expect(spyOnAddAttributes).toBeCalledWith(attributes, suiteName);
    });
  });

  describe('ReportingApi.setDescription', () => {
    const spyOnSetDescription = jest.spyOn(ClientPublicReportingAPI, 'setDescription');

    it('should call clientPublicReportingApi.setDescription method with text and undefined as parameter', () => {
      ReportingApi.setDescription(description);

      expect(spyOnSetDescription).toBeCalledWith(description, undefined);
    });

    it('should call clientPublicReportingApi.setDescription method with text and suite as parameter', () => {
      ReportingApi.setDescription(description, suiteName);

      expect(spyOnSetDescription).toBeCalledWith(description, suiteName);
    });
  });

  describe('ReportingApi.setLaunchStatus', () => {
    const reportingApiLaunchStatusMethods = [
      { method: 'setLaunchStatusPassed', status: 'passed' },
      { method: 'setLaunchStatusFailed', status: 'failed' },
      { method: 'setLaunchStatusSkipped', status: 'skipped' },
      { method: 'setLaunchStatusStopped', status: 'stopped' },
      { method: 'setLaunchStatusInterrupted', status: 'interrupted' },
      { method: 'setLaunchStatusCancelled', status: 'cancelled' },
      { method: 'setLaunchStatusInfo', status: 'info' },
      { method: 'setLaunchStatusWarn', status: 'warn' },
    ];
    const spySetStatus = jest
      .spyOn(ClientPublicReportingAPI, 'setLaunchStatus')
      .mockImplementation(() => {});

    reportingApiLaunchStatusMethods.forEach(({ method, status }) => {
      it(`${method}: should call ${method} method with "${status}" status`, () => {
        // @ts-ignore
        ReportingApi[method]();

        expect(spySetStatus).toBeCalledWith(status);
      });
    });

    it(`setLaunchStatus: should call setLaunchStatus method with "${STATUSES.CANCELLED}" status`, () => {
      ReportingApi.setLaunchStatus(STATUSES.CANCELLED);

      expect(spySetStatus).toBeCalledWith(STATUSES.CANCELLED);
    });
  });

  describe('ReportingApi.setStatus', () => {
    const reportingApiLaunchStatusMethods = [
      { method: 'setStatusPassed', status: 'passed' },
      { method: 'setStatusFailed', status: 'failed' },
      { method: 'setStatusSkipped', status: 'skipped' },
      { method: 'setStatusStopped', status: 'stopped' },
      { method: 'setStatusInterrupted', status: 'interrupted' },
      { method: 'setStatusCancelled', status: 'cancelled' },
      { method: 'setStatusInfo', status: 'info' },
      { method: 'setStatusWarn', status: 'warn' },
    ];
    const spySetStatus = jest
      .spyOn(ClientPublicReportingAPI, 'setStatus')
      .mockImplementation(() => {});

    reportingApiLaunchStatusMethods.forEach(({ method, status }) => {
      it(`${method}: should call ${method} method with "${status}" status`, () => {
        // @ts-ignore
        ReportingApi[method]();

        expect(spySetStatus).toBeCalledWith(status, undefined);
      });
    });

    it(`setStatus: should call setLaunchStatus method with "${STATUSES.CANCELLED}" status and suite`, () => {
      ReportingApi.setStatus(STATUSES.CANCELLED, suiteName);

      expect(spySetStatus).toBeCalledWith(STATUSES.CANCELLED, suiteName);
    });
  });

  describe('ReportingApi.launchLog', () => {
    const reportingApiLaunchLogMethods = [
      { method: 'launchTrace', level: 'TRACE' },
      { method: 'launchDebug', level: 'DEBUG' },
      { method: 'launchInfo', level: 'INFO' },
      { method: 'launchWarn', level: 'WARN' },
      { method: 'launchError', level: 'ERROR' },
      { method: 'launchFatal', level: 'FATAL' },
    ];

    it('should call clientPublicReportingApi.addLaunchLog method with default parameters', () => {
      jest.spyOn(ClientPublicReportingAPI, 'addLaunchLog').mockImplementation(() => {});

      ReportingApi.launchLog(LOG_LEVELS.INFO, 'message');

      expect(ClientPublicReportingAPI.addLaunchLog).toBeCalledWith({
        level: 'INFO',
        file: undefined,
        message: 'message',
      });
    });

    reportingApiLaunchLogMethods.forEach((item) => {
      it(`should call clientPublicReportingApi.addLaunchLog method with ${item.level}
         level parameter if we run ${item.method} method`, () => {
        jest.spyOn(ClientPublicReportingAPI, 'addLaunchLog').mockImplementation(() => {});
        // @ts-ignore
        ReportingApi[item.method]('message');

        expect(ClientPublicReportingAPI.addLaunchLog).toBeCalledWith({
          level: item.level,
          file: undefined,
          message: 'message',
        });
      });
    });
  });

  describe('ReportingApi.log', () => {
    const reportingApiLogMethods = [
      { method: 'trace', level: 'TRACE' },
      { method: 'debug', level: 'DEBUG' },
      { method: 'info', level: 'INFO' },
      { method: 'warn', level: 'WARN' },
      { method: 'error', level: 'ERROR' },
      { method: 'fatal', level: 'FATAL' },
    ];
    it('should call clientPublicReportingApi.addLog method with log and suite as parameters', () => {
      jest.spyOn(ClientPublicReportingAPI, 'addLog').mockImplementation(() => {});

      ReportingApi.log(LOG_LEVELS.INFO, 'message', null, 'suite');

      expect(ClientPublicReportingAPI.addLog).toBeCalledWith(
        { level: 'INFO', file: null, message: 'message' },
        'suite',
      );
    });

    it('should call clientPublicReportingApi.addLog with default parameters if there are no custom ones', () => {
      jest.spyOn(ClientPublicReportingAPI, 'addLog').mockImplementation(() => {});

      ReportingApi.log(LOG_LEVELS.INFO, 'message');

      expect(ClientPublicReportingAPI.addLog).toBeCalledWith(
        { level: 'INFO', file: undefined, message: 'message' },
        undefined,
      );
    });

    reportingApiLogMethods.forEach((item) => {
      it(`should call clientPublicReportingApi.addLog method with ${item.level}
         level parameter if we run ${item.method} method`, () => {
        jest.spyOn(ClientPublicReportingAPI, 'addLog').mockImplementation(() => {});
        // @ts-ignore
        ReportingApi[item.method]('message', null, 'suite');

        expect(ClientPublicReportingAPI.addLog).toBeCalledWith(
          { level: item.level, file: null, message: 'message' },
          'suite',
        );
      });
    });
  });
});
