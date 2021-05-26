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

import WDIOReporter, { SuiteStats, TestStats } from '@wdio/reporter';
import { Reporters } from '@wdio/types';
import RPClient from '@reportportal/client-javascript';
import { Storage } from './storage';
import { getAgentInfo, getStartLaunchObj, getClientConfig, promiseErrorHandler } from './utils';
import { LOG_LEVELS, TYPES } from './constants';
import { FinishTestItem, LaunchObj, LogRQ, StartTestItem } from './models';

// reference - https://www.npmjs.com/package/@wdio/reporter
export class Reporter extends WDIOReporter {
  private client: RPClient;
  private tempLaunchId: string;
  private storage: Storage;
  private syncReporting: boolean;

  constructor(options: Partial<Reporters.Options>) {
    super(options);

    const agentInfo = getAgentInfo();
    const clientConfig = getClientConfig(options);
    this.options = options;
    this.syncReporting = false;
    this.client = new RPClient(clientConfig, agentInfo);
    this.storage = new Storage();
  }

  get isSynchronised(): boolean {
    return this.syncReporting;
  }

  set isSynchronised(val: boolean) {
    this.syncReporting = val;
  }

  onRunnerStart(): void {
    const launchDataRQ: LaunchObj = getStartLaunchObj(this.options);
    const { tempId, promise } = this.client.startLaunch(launchDataRQ);
    promiseErrorHandler(promise);
    this.tempLaunchId = tempId;
  }

  onSuiteStart(suiteStats: SuiteStats): void {
    const suiteItem = this.storage.getCurrentSuite();
    const parentId = suiteItem ? suiteItem.id : null;
    const { title: name } = suiteStats;
    const suiteDataRQ: StartTestItem = {
      name,
      type: parentId ? TYPES.TEST : TYPES.SUITE,
    };
    const { tempId, promise } = this.client.startTestItem(suiteDataRQ, this.tempLaunchId, parentId);
    promiseErrorHandler(promise);
    this.storage.addSuite({ id: tempId, name });
  }

  // onHookStart() {}

  // onHookEnd() {}

  onTestStart(testStats: TestStats): void {
    const { id: parentId } = this.storage.getCurrentSuite();
    const { title: name } = testStats;
    const testItemDataRQ = {
      name,
      type: TYPES.STEP,
    };
    const { tempId, promise } = this.client.startTestItem(
      testItemDataRQ,
      this.tempLaunchId,
      parentId,
    );
    promiseErrorHandler(promise);
    this.storage.addTest({ name, id: tempId });
  }

  onTestPass(testStats: TestStats): void {
    this.finishTest(testStats);
  }

  onTestSkip(testStats: TestStats): void {
    this.finishTest(testStats);
  }

  // onTestRetry(testStats: TestStats): void {}

  onTestFail(testStats: TestStats): void {
    const { id } = this.storage.getCurrentTest();
    testStats.errors.forEach((error: Error) => {
      const logRQ: LogRQ = {
        level: LOG_LEVELS.ERROR,
        message: error.stack,
      };
      this.client.sendLog(id, logRQ);
    });
    this.finishTest(testStats);
  }

  finishTest(testStats: TestStats): void {
    const { id } = this.storage.getCurrentTest();
    const finishTestItemRQ: FinishTestItem = {
      status: testStats.state,
    };
    const { promise } = this.client.finishTestItem(id, finishTestItemRQ);
    promiseErrorHandler(promise);
    this.storage.removeTest(id);
  }

  onSuiteEnd(): void {
    const { id } = this.storage.getCurrentSuite();
    const { promise } = this.client.finishTestItem(id, {});
    promiseErrorHandler(promise);
    this.storage.removeSuite(id);
  }

  async onRunnerEnd(): Promise<void> {
    try {
      await this.client.getPromiseFinishAllItems(this.tempLaunchId);
      const { promise } = this.client.finishLaunch(this.tempLaunchId, {});
      promiseErrorHandler(promise);
      this.tempLaunchId = null;
    } catch (e) {
      console.error(e);
    } finally {
      this.isSynchronised = true;
    }
  }

  // onBeforeCommand() {}

  // onAfterCommand() {}
}
