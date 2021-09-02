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

const attributes = [{ key: 'key', value: 'value' }];

describe('ReportingApi', () => {
  describe('addAttributes', () => {
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
});
