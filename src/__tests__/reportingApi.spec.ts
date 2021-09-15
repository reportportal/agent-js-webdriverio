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
import { STATUSES } from '../constants';

const attributes = [{ key: 'key', value: 'value' }];
const description = 'some text';

describe('ReportingApi', () => {
  describe('ReportingApi.addAttributes', () => {
    it('should call clientPublicReportingApi.addAttributes method with text and undefined as parameter', () => {
      const spyOnAddAttributes = spyOn(ClientPublicReportingAPI, 'addAttributes');
      ReportingApi.addAttributes(attributes);

      expect(spyOnAddAttributes).toBeCalledTimes(1);
      expect(spyOnAddAttributes).toBeCalledWith(attributes, undefined);
    });

    it('should call clientPublicReportingApi.addAttributes method with text and suite as parameter', () => {
      const spyOnAddAttributes = spyOn(ClientPublicReportingAPI, 'addAttributes');
      ReportingApi.addAttributes(attributes, suiteName);

      expect(spyOnAddAttributes).toBeCalledTimes(1);
      expect(spyOnAddAttributes).toBeCalledWith(attributes, suiteName);
    });
  });

  describe('ReportingApi.setDescription', () => {
    it('should call clientPublicReportingApi.setDescription method with text and undefined as parameter', () => {
      const spyOnSetDescription = spyOn(ClientPublicReportingAPI, 'setDescription');
      ReportingApi.setDescription(description);

      expect(spyOnSetDescription).toBeCalledTimes(1);
      expect(spyOnSetDescription).toBeCalledWith(description, undefined);
    });

    it('should call clientPublicReportingApi.setDescription method with text and suite as parameter', () => {
      const spyOnSetDescription = spyOn(ClientPublicReportingAPI, 'setDescription');
      ReportingApi.setDescription(description, suiteName);

      expect(spyOnSetDescription).toBeCalledTimes(1);
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
});
