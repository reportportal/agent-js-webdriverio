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

import { Reporter } from '../reporter';
import { options } from './mocks/optionsMock';
import { RPClientMock } from './mocks/RPClientMock';
import { suiteId, suiteName } from './mocks/data';
import { getClientConfig } from '../utils';
import { CUCUMBER_TYPE, RP_STATUSES } from '../constants';

describe('onSuiteEnd', () => {
  const reporter = new Reporter(options);

  beforeEach(() => {
    reporter['client'] = new RPClientMock(getClientConfig(options));
    reporter['storage'].addSuite({ id: suiteId, name: suiteName });
  });

  describe('client.finishTestItem should be called with corresponding params', () => {
    const suiteStats: any = { tests: [{ state: RP_STATUSES.PASSED }] };

    it('test with basic config', () => {
      reporter.onSuiteEnd(suiteStats);

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {});
      expect(reporter['storage'].getCurrentSuite()).toEqual(null);
    });

    it('passes scenario with skippedIssue=false && cucumberNestedSteps=true for skipped steps', () => {
      reporter['options'].skippedIssue = false;
      reporter['options'].cucumberNestedSteps = true;
      const skippedSuite: any = { tests: [{
        state: RP_STATUSES.PASSED,
      }, {
        state: RP_STATUSES.SKIPPED,
      }, {
        state: RP_STATUSES.SKIPPED
      }]};
      reporter.onSuiteEnd({ ...skippedSuite, type: CUCUMBER_TYPE.SCENARIO});

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {
        status: RP_STATUSES.PASSED,
      });
      expect(reporter['storage'].getCurrentSuite()).toEqual(null);
    });

    it('fails scenario with skippedIssue=true && cucumberNestedSteps=true for skipped steps', () => {
      reporter['options'].skippedIssue = true;
      reporter['options'].cucumberNestedSteps = true;
      const skippedSuite: any = { tests: [{
        state: RP_STATUSES.PASSED,
      }, {
        state: RP_STATUSES.SKIPPED,
      }, {
        state: RP_STATUSES.SKIPPED
      }]};
      reporter.onSuiteEnd({ ...skippedSuite, type: CUCUMBER_TYPE.SCENARIO});

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {
        status: RP_STATUSES.FAILED,
      });
      expect(reporter['storage'].getCurrentSuite()).toEqual(null);
    });

    it('config with cucumberNestedSteps=true, no custom status', () => {
      reporter['options'].cucumberNestedSteps = true;

      reporter.onSuiteEnd({ ...suiteStats, type: CUCUMBER_TYPE.SCENARIO });

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {
        status: RP_STATUSES.PASSED,
      });
      expect(reporter['storage'].getCurrentSuite()).toEqual(null);
    });

    it('config with cucumberNestedSteps=true, no custom status, all steps=passed', () => {
      reporter['options'].cucumberNestedSteps = true;

      reporter.onSuiteEnd({
        ...suiteStats,
        type: CUCUMBER_TYPE.SCENARIO,
      });

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {
        status: RP_STATUSES.PASSED,
      });
      expect(reporter['storage'].getCurrentSuite()).toEqual(null);
    });

    it('config with cucumberNestedSteps=true, no custom status, some tests=failed', () => {
      reporter['options'].cucumberNestedSteps = true;

      reporter.onSuiteEnd({
        ...suiteStats,
        type: CUCUMBER_TYPE.SCENARIO,
        tests: [...suiteStats.tests, { state: RP_STATUSES.FAILED }],
      });

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {
        status: RP_STATUSES.FAILED,
      });
      expect(reporter['storage'].getCurrentSuite()).toEqual(null);
    });

    it('config with cucumberNestedSteps=true, with custom status', () => {
      reporter['options'].cucumberNestedSteps = true;
      reporter['storage'].addAdditionalSuiteData(suiteName, { status: RP_STATUSES.INFO });

      reporter.onSuiteEnd(suiteStats);

      expect(reporter['client'].finishTestItem).toBeCalledTimes(1);
      expect(reporter['client'].finishTestItem).toBeCalledWith(suiteId, {
        status: RP_STATUSES.INFO,
      });
      expect(reporter['storage'].getCurrentSuite()).toEqual(null);
    });
  });
});
