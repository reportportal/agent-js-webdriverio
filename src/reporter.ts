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

import WDIOReporter, { AfterCommandArgs, SuiteStats, TestStats } from '@wdio/reporter';
import { Reporters } from '@wdio/types';
import RPClient from '@reportportal/client-javascript';
import { EVENTS } from '@reportportal/client-javascript/lib/constants/events';
import { Storage } from './storage';
import {
  getAgentInfo,
  getClientConfig,
  getCodeRef,
  getStartLaunchObj,
  parseTags,
  promiseErrorHandler,
} from './utils';
import { CUCUMBER_TYPE, FILE_TYPES, LOG_LEVELS, RP_STATUSES, TYPES } from './constants';
import { Attribute, FinishTestItem, LaunchObj, LogRQ, StartTestItem } from './models';

export class Reporter extends WDIOReporter {
  private client: RPClient;
  private tempLaunchId: string;
  private customLaunchStatus: string;
  private storage: Storage;
  private syncReporting: boolean;
  private testFilePath: string;

  constructor(options: Partial<Reporters.Options>) {
    super(options);

    const agentInfo = getAgentInfo();
    const clientConfig = getClientConfig(options);
    this.options = options;
    this.syncReporting = false;
    this.client = new RPClient(clientConfig, agentInfo);
    this.storage = new Storage();
    this.registerRPListeners();
  }

  registerRPListeners(): void {
    process.on(EVENTS.ADD_ATTRIBUTES, this.addAttributes.bind(this));
    process.on(EVENTS.SET_DESCRIPTION, this.setDescription.bind(this));
    process.on(EVENTS.SET_LAUNCH_STATUS, this.setLaunchStatus.bind(this));
    process.on(EVENTS.SET_STATUS, this.setStatus.bind(this));
    process.on(EVENTS.ADD_LOG, this.sendTestItemLog.bind(this));
    process.on(EVENTS.ADD_LAUNCH_LOG, this.sendLaunchLog.bind(this));
  }

  unregisterRPListeners(): void {
    process.off(EVENTS.ADD_ATTRIBUTES, this.addAttributes.bind(this));
    process.off(EVENTS.SET_DESCRIPTION, this.setDescription.bind(this));
    process.off(EVENTS.SET_LAUNCH_STATUS, this.setLaunchStatus.bind(this));
    process.off(EVENTS.SET_STATUS, this.setStatus.bind(this));
    process.off(EVENTS.ADD_LOG, this.sendTestItemLog.bind(this));
    process.off(EVENTS.ADD_LAUNCH_LOG, this.sendLaunchLog.bind(this));
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
    this.testFilePath = suiteStats.file;
    const ancestors = this.storage.getAllSuites();
    const codeRef = getCodeRef(this.testFilePath, name, ancestors);
    const suiteDataRQ: StartTestItem = {
      name,
      type: parentId ? TYPES.TEST : TYPES.SUITE,
      codeRef,
    };
    const isCucumberFeature = suiteStats.type === CUCUMBER_TYPE.FEATURE;
    if (isCucumberFeature && suiteStats.tags.length > 0) {
      suiteDataRQ.attributes = parseTags(suiteStats.tags);
    }
    if (isCucumberFeature && suiteStats.description) {
      suiteDataRQ.description = suiteStats.description;
    }
    const { tempId, promise } = this.client.startTestItem(suiteDataRQ, this.tempLaunchId, parentId);
    promiseErrorHandler(promise);
    const additionalData = this.storage.getAdditionalSuiteData(name);
    if (additionalData.logs?.length > 0) {
      additionalData.logs.forEach((log) => this.sendLog(tempId, log));
    }
    this.storage.addSuite({ id: tempId, name });
  }

  onTestStart(testStats: TestStats): void {
    const { id: parentId } = this.storage.getCurrentSuite();
    const { title: name } = testStats;
    const ancestors = this.storage.getAllSuites();
    const codeRef = getCodeRef(this.testFilePath, name, ancestors);
    const testItemDataRQ = {
      name,
      type: TYPES.STEP,
      codeRef,
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

  onTestFail(testStats: TestStats): void {
    const testItem = this.storage.getCurrentTest();
    testStats.errors.forEach((error: Error, idx) => {
      const logRQ: LogRQ = {
        level: LOG_LEVELS.ERROR,
        message: error.stack,
      };
      this.client.sendLog(testItem.id, logRQ);
      if (idx === testStats.errors.length - 1) {
        const lastError = `\`\`\`error\n${error.stack}\n\`\`\``;
        this.storage.updateCurrentTest({
          description: testItem.description ? `${testItem.description}\n${lastError}` : lastError,
        });
      }
    });
    this.finishTest(testStats);
  }

  finishTest(testStats: TestStats): void {
    const { id, attributes, description, status } = this.storage.getCurrentTest();
    const finishTestItemRQ: FinishTestItem = {
      status: testStats.state,
      ...(attributes && { attributes }),
      ...(description && { description }),
      ...(status && { status }),
    };
    const { promise } = this.client.finishTestItem(id, finishTestItemRQ);
    promiseErrorHandler(promise);
    this.storage.removeTest(id);
  }

  onSuiteEnd(): void {
    const { id, name } = this.storage.getCurrentSuite();
    const { status, attributes, description } = this.storage.getAdditionalSuiteData(name);
    const finishTestItemData = {
      ...(status && { status }),
      ...(attributes && { attributes }),
      ...(description && { description }),
    };
    const { promise } = this.client.finishTestItem(id, finishTestItemData);
    promiseErrorHandler(promise);
    this.storage.removeSuite(id);
  }

  async onRunnerEnd(): Promise<void> {
    try {
      await this.client.getPromiseFinishAllItems(this.tempLaunchId);
      const { promise } = await this.client.finishLaunch(this.tempLaunchId, {
        ...(this.customLaunchStatus && { status: this.customLaunchStatus }),
      });
      promiseErrorHandler(promise);
      this.tempLaunchId = null;
      this.customLaunchStatus = null;
    } catch (e) {
      console.error(e);
    } finally {
      this.unregisterRPListeners();
      this.isSynchronised = true;
    }
  }

  onAfterCommand(command: AfterCommandArgs): void {
    const hasScreenshot = /screenshot$/.test(command.endpoint) && !!command.result.value;
    const testItem = this.storage.getCurrentTest();
    if (hasScreenshot && this.options.attachPicturesToLogs && testItem) {
      const logRQ = {
        level: LOG_LEVELS.INFO,
        file: {
          name: 'screenshot',
          type: FILE_TYPES.PNG,
          content: command.result.value,
        },
      };
      this.sendLog(testItem.id, logRQ);
    }
  }

  addAttributes({ attributes, suite }: { attributes: Attribute[]; suite?: string }): void {
    if (!attributes || !(attributes instanceof Array)) {
      console.error('Attributes should be instance of Array');
      return;
    }
    if (attributes && suite) {
      const data = this.storage.getAdditionalSuiteData(suite);
      const newData = { attributes: (data.attributes || []).concat(attributes) };
      this.storage.addAdditionalSuiteData(suite, newData);
    } else {
      this.storage.updateCurrentTest({ attributes });
    }
  }

  setDescription({ text, suite }: { text: string; suite?: string }): void {
    if (text && suite) {
      this.storage.addAdditionalSuiteData(suite, { description: text });
    } else {
      this.storage.updateCurrentTest({ description: text });
    }
  }

  setLaunchStatus(status: RP_STATUSES): void {
    this.customLaunchStatus = status;
  }

  setStatus({ status, suite }: { status: RP_STATUSES; suite?: string }): void {
    if (status && suite) {
      this.storage.addAdditionalSuiteData(suite, { status });
    } else {
      this.storage.updateCurrentTest({ status });
    }
  }

  sendTestItemLog({ log, suite }: { log: LogRQ; suite?: string }): void {
    if (log && suite) {
      const data = this.storage.getAdditionalSuiteData(suite);
      const newData = { logs: (data.logs || []).concat(log) };
      this.storage.addAdditionalSuiteData(suite, newData);
    } else {
      const testItem = this.storage.getCurrentTest();
      if (testItem) {
        this.sendLog(testItem.id, log);
      }
    }
  }

  sendLaunchLog(log: LogRQ): void {
    this.sendLog(this.tempLaunchId, log);
  }

  sendLog(tempId: string, { level, message = '', file }: LogRQ): void {
    this.client.sendLog(
      tempId,
      {
        message,
        level,
      },
      file,
    );
  }
}
